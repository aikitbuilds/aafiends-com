// Client-side .fit file parsing for the free "upload your Garmin data" path
// (no Terra, no paid API). Decodes a .fit file with the official Garmin FIT SDK
// and pulls per-day recovery telemetry — resting HR, HRV, and sleep — into the
// SAME shape the app already stores at users/{uid}/private_vault/telemetry_{date}
// (hardware: { sleepHours, hrv, rhr }), so uploaded data flows straight onto the
// Ledger chart and the Data tab.
//
// FIT wellness fields vary by device and export type, so extraction is
// deliberately defensive: we scan several message types and take what's there.
// Requires the dependency: `npm install @garmin/fitsdk`.

export interface FitDay {
  date: string; // YYYY-MM-DD
  rhr?: number; // resting heart rate (bpm)
  hrv?: number; // HRV (ms)
  sleepHours?: number; // total sleep (hours)
  /** which workout data we saw that day, if any (activity files) */
  workout?: { avgHr?: number; durationMin?: number };
}

export interface FitParseResult {
  days: FitDay[];
  fileType: string; // e.g. "wellness/monitoring", "activity", "unknown"
  messageCounts: Record<string, number>;
  warnings: string[];
}

function toDateKey(ts: unknown): string | null {
  if (!ts) return null;
  const d = ts instanceof Date ? ts : new Date(ts as any);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().split("T")[0];
}

// Pull the first defined value among several candidate field names off a message.
function pick(msg: Record<string, any>, keys: string[]): number | undefined {
  for (const k of keys) {
    const v = msg?.[k];
    if (typeof v === "number" && !isNaN(v)) return v;
  }
  return undefined;
}

/**
 * Decode a .fit ArrayBuffer into per-day telemetry rows.
 * Kept framework-agnostic so it can be unit-tested or called from a route.
 */
export async function parseFitFile(buffer: ArrayBuffer): Promise<FitParseResult> {
  // Dynamic import so the SDK only loads when a user actually uploads a file.
  const { Decoder, Stream } = await import("@garmin/fitsdk");
  const stream = Stream.fromArrayBuffer(buffer);

  if (!Decoder.isFIT(stream)) {
    throw new Error("That doesn't look like a valid .fit file.");
  }
  const decoder = new Decoder(stream);
  const { messages } = decoder.read({ convertDateTimesToDates: true });

  const messageCounts: Record<string, number> = {};
  for (const key of Object.keys(messages)) {
    const arr = (messages as any)[key];
    if (Array.isArray(arr) && arr.length) messageCounts[key] = arr.length;
  }

  const byDate = new Map<string, FitDay>();
  const warnings: string[] = [];
  const ensure = (date: string): FitDay => {
    let d = byDate.get(date);
    if (!d) {
      d = { date };
      byDate.set(date, d);
    }
    return d;
  };

  const m = messages as Record<string, any[]>;

  // --- Resting heart rate ---------------------------------------------------
  for (const msg of m.restingHeartRateMesgs ?? []) {
    const date = toDateKey(msg.timestamp ?? msg.localTimestamp);
    const rhr = pick(msg, ["restingHeartRate", "restingHr", "value"]);
    if (date && rhr) ensure(date).rhr = rhr;
  }
  for (const msg of m.monitoringMesgs ?? []) {
    const date = toDateKey(msg.timestamp ?? msg.localTimestamp);
    const rhr = pick(msg, ["restingHeartRate"]);
    if (date && rhr) {
      const day = ensure(date);
      // keep the lowest resting HR seen for the day
      day.rhr = day.rhr ? Math.min(day.rhr, rhr) : rhr;
    }
  }

  // --- HRV ------------------------------------------------------------------
  for (const msg of m.hrvStatusSummaryMesgs ?? []) {
    const date = toDateKey(msg.timestamp ?? msg.localTimestamp);
    const hrv = pick(msg, ["lastNightAverage", "weeklyAverage", "lastNight5MinHigh"]);
    if (date && hrv) ensure(date).hrv = hrv;
  }
  // Fallback: average raw HRV values by date.
  if (!(m.hrvStatusSummaryMesgs ?? []).length && (m.hrvValueMesgs ?? []).length) {
    const acc = new Map<string, { sum: number; n: number }>();
    for (const msg of m.hrvValueMesgs ?? []) {
      const date = toDateKey(msg.timestamp ?? msg.localTimestamp);
      const v = pick(msg, ["value", "hrv"]);
      if (date && v) {
        const a = acc.get(date) ?? { sum: 0, n: 0 };
        a.sum += v;
        a.n += 1;
        acc.set(date, a);
      }
    }
    for (const [date, a] of acc) if (a.n) ensure(date).hrv = Math.round(a.sum / a.n);
  }

  // --- Sleep ----------------------------------------------------------------
  // Prefer a sleep summary if present; otherwise infer from the span of
  // sleep-level records for the night.
  for (const msg of m.sleepAssessmentMesgs ?? []) {
    const date = toDateKey(msg.timestamp ?? msg.localTimestamp);
    const secs = pick(msg, ["totalSleepTime", "combinedAwakeScore"]);
    if (date && secs && secs > 1000) ensure(date).sleepHours = +(secs / 3600).toFixed(1);
  }
  if (!(m.sleepAssessmentMesgs ?? []).length && (m.sleepLevelMesgs ?? []).length) {
    const spans = new Map<string, { min: number; max: number }>();
    for (const msg of m.sleepLevelMesgs ?? []) {
      const t = msg.timestamp instanceof Date ? msg.timestamp.getTime() : new Date(msg.timestamp).getTime();
      const date = toDateKey(msg.timestamp);
      if (!date || isNaN(t)) continue;
      const s = spans.get(date) ?? { min: t, max: t };
      s.min = Math.min(s.min, t);
      s.max = Math.max(s.max, t);
      spans.set(date, s);
    }
    for (const [date, s] of spans) {
      const hrs = (s.max - s.min) / 3_600_000;
      if (hrs > 0.5 && hrs < 16) ensure(date).sleepHours = +hrs.toFixed(1);
    }
  }

  // --- Activity fallback (workout files) ------------------------------------
  for (const msg of m.sessionMesgs ?? []) {
    const date = toDateKey(msg.startTime ?? msg.timestamp);
    const avgHr = pick(msg, ["avgHeartRate"]);
    const dur = pick(msg, ["totalTimerTime", "totalElapsedTime"]);
    if (date) {
      const day = ensure(date);
      day.workout = { avgHr, durationMin: dur ? Math.round(dur / 60) : undefined };
    }
  }

  let fileType = "unknown";
  if (m.monitoringMesgs?.length || m.sleepLevelMesgs?.length || m.hrvStatusSummaryMesgs?.length || m.restingHeartRateMesgs?.length) {
    fileType = "wellness/monitoring";
  } else if (m.sessionMesgs?.length || m.recordMesgs?.length) {
    fileType = "activity";
    warnings.push("This looks like a workout file — it has heart-rate from the activity but usually not daily sleep/RHR/HRV. For recovery data, export your daily wellness .fit from Garmin Connect (Account → Export Your Data).");
  }

  const days = Array.from(byDate.values())
    .filter((d) => d.rhr != null || d.hrv != null || d.sleepHours != null || d.workout)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  if (!days.length) warnings.push("No recognizable telemetry was found in this file.");

  return { days, fileType, messageCounts, warnings };
}
