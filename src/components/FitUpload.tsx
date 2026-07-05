"use client";

// Free wearable sync: upload a Garmin .fit, an Apple Health export.xml, or a
// Google Fit .csv; parse it in the browser and write the recovery telemetry
// (resting HR / HRV / sleep) to your own private_vault so it shows on the Ledger
// chart and the Data tab. No Terra, no paid API, no server.

import { useRef, useState } from "react";
import { doc, writeBatch, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { parseFitFile, type FitDay } from "@/lib/fitParse";
import { parseAppleHealth, parseGoogleFit } from "@/lib/healthParse";
import { UploadCloud, Moon, HeartPulse, Activity, CheckCircle2, AlertTriangle, Loader2, FileUp } from "lucide-react";

type Status = "idle" | "parsing" | "preview" | "saving" | "saved" | "error";

export default function FitUpload() {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [days, setDays] = useState<FitDay[]>([]);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [savedCount, setSavedCount] = useState(0);

  const savableDays = days.filter((d) => d.rhr != null || d.hrv != null || d.sleepHours != null);

  async function handleFile(file: File) {
    setStatus("parsing");
    setError(null);
    setWarnings([]);
    setFileName(file.name);
    try {
      const ext = file.name.toLowerCase().split(".").pop() || "";
      let result: { days: FitDay[]; warnings: string[] };
      if (ext === "fit") {
        result = await parseFitFile(await file.arrayBuffer());
      } else if (ext === "xml") {
        result = parseAppleHealth(await file.text());
      } else if (ext === "csv") {
        result = parseGoogleFit(await file.text());
      } else {
        throw new Error("Unsupported file. Upload a Garmin .fit, an Apple Health export.xml, or a Google Fit .csv.");
      }
      setDays(result.days);
      setWarnings(result.warnings);
      setStatus("preview");
    } catch (e: any) {
      console.error("Health file parse failed", e);
      setError(e?.message || "Could not read that file.");
      setStatus("error");
    }
  }

  async function save() {
    if (!user || !savableDays.length) return;
    setStatus("saving");
    try {
      const batch = writeBatch(db);
      for (const d of savableDays) {
        const hardware: Record<string, number> = {};
        if (d.sleepHours != null) hardware.sleepHours = d.sleepHours;
        if (d.hrv != null) hardware.hrv = d.hrv;
        if (d.rhr != null) hardware.rhr = d.rhr;
        const ref = doc(db, "users", user.uid, "private_vault", `telemetry_${d.date}`);
        batch.set(ref, { date: d.date, timestamp: serverTimestamp(), hardware, source: "fit_upload" }, { merge: true });
      }
      await batch.commit();
      setSavedCount(savableDays.length);
      setStatus("saved");
    } catch (e: any) {
      console.error("FIT save failed", e);
      setError(e?.message || "Couldn't save to your telemetry.");
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setDays([]);
    setError(null);
    setWarnings([]);
    setFileName("");
    setSavedCount(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="bg-[#0a0a0a] border border-emerald-500/20 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
          <UploadCloud size={18} />
        </div>
        <div>
          <h4 className="text-sm font-black text-white uppercase tracking-tight">Upload Wearable Data</h4>
          <p className="text-[11px] text-neutral-500 leading-snug">Garmin, Apple Health, or Google Fit — parsed in your browser, saved to your private telemetry.</p>
        </div>
      </div>

      {/* Idle / drop zone */}
      {(status === "idle" || status === "error") && (
        <>
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full border border-dashed border-white/15 hover:border-emerald-500/40 rounded-xl py-8 flex flex-col items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <FileUp size={22} className="text-emerald-400" />
            <span className="text-sm font-bold">Choose a file — .fit, .xml, or .csv</span>
            <span className="text-[11px] text-neutral-600 text-center max-w-xs leading-relaxed">Garmin: export a .fit &nbsp;·&nbsp; Apple Health: Profile → Export All Health Data → export.xml &nbsp;·&nbsp; Google Fit: Takeout → Daily activity metrics .csv</span>
          </button>
          <input ref={inputRef} type="file" accept=".fit,.FIT,.xml,.csv" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          {error && (
            <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <AlertTriangle size={14} className="shrink-0" /> {error}
            </div>
          )}
        </>
      )}

      {status === "parsing" && (
        <div className="flex items-center gap-2 text-sm text-neutral-400 py-6 justify-center">
          <Loader2 size={16} className="animate-spin text-emerald-400" /> Reading {fileName}…
        </div>
      )}

      {/* Preview */}
      {status === "preview" && (
        <div className="flex flex-col gap-3">
          {warnings.map((w, i) => (
            <div key={i} className="flex items-start gap-2 text-[11px] text-amber-400/80 bg-amber-500/5 border border-amber-500/20 rounded-lg px-3 py-2">
              <AlertTriangle size={12} className="shrink-0 mt-0.5" /> {w}
            </div>
          ))}

          {savableDays.length > 0 ? (
            <>
              <div className="text-[11px] text-neutral-500">Found <span className="text-white font-bold">{savableDays.length}</span> day{savableDays.length === 1 ? "" : "s"} of recovery data in <span className="text-neutral-300">{fileName}</span>:</div>
              <div className="overflow-x-auto max-h-52 overflow-y-auto rounded-xl border border-white/5">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-[#0a0a0a]">
                    <tr className="text-[10px] uppercase tracking-widest text-neutral-500">
                      <th className="py-2 px-3 font-bold">Date</th>
                      <th className="py-2 px-3 font-bold"><Moon size={11} className="inline text-emerald-400" /> Sleep</th>
                      <th className="py-2 px-3 font-bold"><HeartPulse size={11} className="inline text-emerald-400" /> RHR</th>
                      <th className="py-2 px-3 font-bold"><Activity size={11} className="inline text-emerald-400" /> HRV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savableDays.map((d) => (
                      <tr key={d.date} className="border-t border-white/5">
                        <td className="py-2 px-3 text-neutral-300 font-mono">{d.date}</td>
                        <td className="py-2 px-3 text-white">{d.sleepHours != null ? `${d.sleepHours}h` : "—"}</td>
                        <td className="py-2 px-3 text-white">{d.rhr != null ? `${d.rhr} bpm` : "—"}</td>
                        <td className="py-2 px-3 text-white">{d.hrv != null ? `${d.hrv} ms` : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-2">
                <button onClick={save} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <CheckCircle2 size={14} /> Save {savableDays.length} day{savableDays.length === 1 ? "" : "s"} to my telemetry
                </button>
                <button onClick={reset} className="px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">Cancel</button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 py-4">
              <p className="text-sm text-neutral-400 text-center">No sleep / resting-HR / HRV data found in this file.</p>
              <button onClick={reset} className="text-xs font-bold uppercase tracking-widest text-emerald-400 hover:underline">Try another file</button>
            </div>
          )}
        </div>
      )}

      {status === "saving" && (
        <div className="flex items-center gap-2 text-sm text-neutral-400 py-6 justify-center">
          <Loader2 size={16} className="animate-spin text-emerald-400" /> Saving to your telemetry…
        </div>
      )}

      {status === "saved" && (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <p className="text-sm text-white font-bold text-center">Saved {savedCount} day{savedCount === 1 ? "" : "s"} to your telemetry.</p>
          <p className="text-[11px] text-neutral-500 text-center">It now shows on your Mirror/Ledger chart. Refresh to see it plotted.</p>
          <button onClick={reset} className="text-xs font-bold uppercase tracking-widest text-emerald-400 hover:underline">Upload another</button>
        </div>
      )}
    </div>
  );
}
