// Free wearable sync for non-Garmin users: parse an Apple Health export
// (export.xml) or a Google Fit / Google Takeout CSV in the browser and pull the
// same per-day recovery telemetry (resting HR / HRV / sleep) the .fit path
// produces. Output matches FitDay so the upload UI + Firestore write are shared.
//
// Both formats vary, so extraction is defensive and best-effort — validate
// against a real export and tighten the field matching if needed.

import type { FitDay } from "./fitParse";

export interface HealthParseResult {
  days: FitDay[];
  source: string;
  warnings: string[];
}

// ---- Apple Health (export.xml) ----------------------------------------------
// Records look like:
//   <Record type="HKQuantityTypeIdentifierRestingHeartRate" ... startDate="2026-01-01 08:00:00 -0600" ... value="58"/>
//   <Record type="HKQuantityTypeIdentifierHeartRateVariabilitySDNN" ... unit="ms" value="45.2"/>
//   <Record type="HKCategoryTypeIdentifierSleepAnalysis" startDate="..." endDate="..." value="HKCategoryValueSleepAnalysisAsleepCore"/>

function appleDate(str: string | undefined): Date | null {
  if (!str) return null;
  // "2026-01-01 23:10:00 -0600" -> "2026-01-01T23:10:00-06:00"
  const iso = str.replace(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}) ([+-]\d{2})(\d{2})/, "$1T$2$3:$4");
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
}

function attr(tag: string, name: string): string | undefined {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`));
  return m ? m[1] : undefined;
}

function* recordTags(xml: string, type: string): Generator<string> {
  // Match each <Record ...> opening tag for the given type. Apple exports place
  // `type` as the first attribute, so this stays cheap on huge files.
  const re = new RegExp(`<Record type="${type}"[^>]*?>`, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) yield m[0];
}

export function parseAppleHealth(xml: string): HealthParseResult {
  const warnings: string[] = [];
  const byDate = new Map<string, FitDay>();
  const ensure = (date: string): FitDay => {
    let d = byDate.get(date);
    if (!d) { d = { date }; byDate.set(date, d); }
    return d;
  };

  // Resting HR — average per day.
  const rhrAcc = new Map<string, { sum: number; n: number }>();
  for (const tag of recordTags(xml, "HKQuantityTypeIdentifierRestingHeartRate")) {
    const d = appleDate(attr(tag, "startDate"));
    const v = parseFloat(attr(tag, "value") ?? "");
    if (d && !isNaN(v)) {
      const key = d.toISOString().split("T")[0];
      const a = rhrAcc.get(key) ?? { sum: 0, n: 0 };
      a.sum += v; a.n += 1; rhrAcc.set(key, a);
    }
  }
  for (const [date, a] of rhrAcc) if (a.n) ensure(date).rhr = Math.round(a.sum / a.n);

  // HRV (SDNN) — average per day.
  const hrvAcc = new Map<string, { sum: number; n: number }>();
  for (const tag of recordTags(xml, "HKQuantityTypeIdentifierHeartRateVariabilitySDNN")) {
    const d = appleDate(attr(tag, "startDate"));
    const v = parseFloat(attr(tag, "value") ?? "");
    if (d && !isNaN(v)) {
      const key = d.toISOString().split("T")[0];
      const a = hrvAcc.get(key) ?? { sum: 0, n: 0 };
      a.sum += v; a.n += 1; hrvAcc.set(key, a);
    }
  }
  for (const [date, a] of hrvAcc) if (a.n) ensure(date).hrv = Math.round(a.sum / a.n);

  // Sleep — sum "Asleep*" durations, attribute to the wake (endDate) day.
  const sleepAcc = new Map<string, number>(); // seconds
  for (const tag of recordTags(xml, "HKCategoryTypeIdentifierSleepAnalysis")) {
    const value = attr(tag, "value") ?? "";
    if (!/Asleep/i.test(value)) continue; // skip InBed / Awake
    const start = appleDate(attr(tag, "startDate"));
    const end = appleDate(attr(tag, "endDate"));
    if (!start || !end) continue;
    const secs = (end.getTime() - start.getTime()) / 1000;
    if (secs <= 0) continue;
    const key = end.toISOString().split("T")[0];
    sleepAcc.set(key, (sleepAcc.get(key) ?? 0) + secs);
  }
  for (const [date, secs] of sleepAcc) {
    const hrs = secs / 3600;
    if (hrs > 0.5 && hrs < 16) ensure(date).sleepHours = +hrs.toFixed(1);
  }

  const days = Array.from(byDate.values())
    .filter((d) => d.rhr != null || d.hrv != null || d.sleepHours != null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  if (!days.length) warnings.push("No resting-HR, HRV, or sleep records were found. Make sure you exported from the Apple Health app (Profile → Export All Health Data) and picked export.xml.");
  return { days, source: "apple_health", warnings };
}

// ---- Google Fit / Google Takeout (CSV) --------------------------------------
// Takeout "Daily activity metrics" CSVs have a Date column plus columns like
// "Min heart rate (bpm)", "Average heart rate (bpm)", and sleep-duration columns
// in milliseconds. HRV is not exported. We use min HR as a resting-HR proxy.

function splitCsvLine(line: string): string[] {
  // Simple split — Google Fit daily CSVs use plain numeric fields, no quoted commas.
  return line.split(",").map((s) => s.trim());
}

export function parseGoogleFit(csv: string): HealthParseResult {
  const warnings: string[] = [];
  const lines = csv.split(/\r?\n/).filter((l) => l.trim().length);
  if (lines.length < 2) return { days: [], source: "google_fit", warnings: ["That CSV looks empty."] };

  const header = splitCsvLine(lines[0]).map((h) => h.toLowerCase());
  console.log("Google Fit CSV header:", header);
  const findCol = (pred: (h: string) => boolean) => header.findIndex(pred);

  const dateCol = findCol((h) => h === "date" || h.includes("date"));
  const restCol = findCol((h) => h.includes("resting heart rate"));
  const minHrCol = findCol((h) => h.includes("min heart rate"));
  const avgHrCol = findCol((h) => h.includes("average heart rate"));
  const sleepCols = header
    .map((h, i) => ({ h, i }))
    .filter(({ h }) => h.includes("sleep") && (h.includes("duration") || h.includes("ms") || h.includes("min")))
    .map(({ i }) => i);

  if (dateCol < 0) {
    warnings.push("Couldn't find a Date column in this CSV. Use the Google Takeout 'Daily activity metrics' export.");
    return { days: [], source: "google_fit", warnings };
  }

  const days: FitDay[] = [];
  for (let r = 1; r < lines.length; r++) {
    const cells = splitCsvLine(lines[r]);
    const rawDate = cells[dateCol];
    if (!rawDate) continue;
    const date = new Date(rawDate);
    if (isNaN(date.getTime())) continue;
    const key = date.toISOString().split("T")[0];

    const day: FitDay = { date: key };
    const num = (i: number) => (i >= 0 ? parseFloat(cells[i]) : NaN);

    const rest = num(restCol);
    const minHr = num(minHrCol);
    if (!isNaN(rest)) day.rhr = Math.round(rest);
    else if (!isNaN(minHr)) day.rhr = Math.round(minHr); // proxy

    // Sum sleep duration columns (values usually in ms).
    let sleepMs = 0;
    for (const i of sleepCols) {
      const v = num(i);
      if (!isNaN(v)) sleepMs += v;
    }
    if (sleepMs > 0) {
      const hrs = sleepMs / 3_600_000;
      if (hrs > 0.5 && hrs < 16) day.sleepHours = +hrs.toFixed(1);
    }

    const avg = num(avgHrCol);
    if (day.rhr == null && !isNaN(avg)) day.rhr = Math.round(avg); // last-resort proxy

    if (day.rhr != null || day.sleepHours != null) days.push(day);
  }

  days.sort((a, b) => (a.date < b.date ? 1 : -1));
  if (!days.length) warnings.push("No heart-rate or sleep columns were recognized. Google Fit doesn't export HRV; use the Takeout 'Daily activity metrics' CSV.");
  else warnings.push("Note: Google Fit doesn't export HRV, and resting HR is estimated from your minimum daily heart rate.");
  return { days, source: "google_fit", warnings };
}
