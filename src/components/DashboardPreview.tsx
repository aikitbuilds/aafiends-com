"use client";

// Public, no-login preview of the real Operator Dashboard, built for the
// homepage so prospective/beta users can see what their own dashboard would
// look like before signing up. Uses static sample data on purpose (no
// Firestore read, no auth) - labeled "SAMPLE DATA" throughout so nothing here
// reads as a real claim. Mirrors the actual LedgerTab's chart shape/colors
// and TelemetryLog's result-card layout so the preview isn't a lie about
// what the product looks like once you're in.

import { useAuth } from "@/contexts/AuthContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Activity, ArrowRight, CheckCircle2, Sparkles, AlertTriangle, ListChecks } from "lucide-react";

const SAMPLE_LEDGER = [
  { date: "06-20", hrv: 42, sleepHours: 5.8, sciaticaPainLevel: 7, cravingIntensity: 8 },
  { date: "06-21", hrv: 45, sleepHours: 6.1, sciaticaPainLevel: 6, cravingIntensity: 7 },
  { date: "06-22", hrv: 44, sleepHours: 6.0, sciaticaPainLevel: 6, cravingIntensity: 6 },
  { date: "06-23", hrv: 49, sleepHours: 6.7, sciaticaPainLevel: 5, cravingIntensity: 6 },
  { date: "06-24", hrv: 51, sleepHours: 6.9, sciaticaPainLevel: 5, cravingIntensity: 5 },
  { date: "06-25", hrv: 53, sleepHours: 7.2, sciaticaPainLevel: 4, cravingIntensity: 4 },
  { date: "06-26", hrv: 52, sleepHours: 7.0, sciaticaPainLevel: 4, cravingIntensity: 4 },
  { date: "06-27", hrv: 56, sleepHours: 7.4, sciaticaPainLevel: 3, cravingIntensity: 3 },
  { date: "06-28", hrv: 58, sleepHours: 7.6, sciaticaPainLevel: 3, cravingIntensity: 3 },
  { date: "06-29", hrv: 60, sleepHours: 7.8, sciaticaPainLevel: 2, cravingIntensity: 2 },
];

const SAMPLE_MIRROR = {
  theWhy:
    "Cravings tracked highest on days with under 6.5 hours of sleep and no meeting logged. Your last 4 check-ins show the inverse pattern holding: more sleep and fellowship contact, lower craving intensity.",
  gentleAlerts: [
    "Two days this week with no meeting logged and elevated cravings — worth a look.",
  ],
  reliefPlan: [
    "Protect the 65°F / lights-out window tonight — sleep is your strongest lever right now.",
    "Call your sponsor before the evening dip, not after.",
  ],
};

export default function DashboardPreview() {
  const { login } = useAuth();

  return (
    <div className="w-full bg-[#141814] border border-[#4cc07a]/20 rounded-[2rem] p-6 md:p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono font-bold text-[#4cc07a] bg-[#4cc07a]/10 px-3 py-1 rounded-full border border-[#4cc07a]/30 w-fit flex items-center gap-2">
              <Activity size={14} /> Sample Data — Your Dashboard, Populated
            </span>
            <h3 className="text-2xl md:text-3xl font-semibold text-[#f2efe6] tracking-tight mt-4">
              This Is What You&apos;ll See Every Day
            </h3>
            <p className="text-[#b8b4a6] text-sm md:text-base mt-2 max-w-xl">
              Log ten seconds of telemetry. The Mirror reflects it back. The Ledger proves the pattern over time — this is real chart output from the live app, loaded here with sample numbers so you can see it before signing up.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Ledger chart preview */}
          <div className="lg:col-span-3 bg-[#0d0f0d] border border-[#1d231d] rounded-2xl p-4 md:p-6">
            <p className="text-[10px] font-mono text-[#7d7a70] mb-2">
              The Ledger — Hardware vs Software Correlation
            </p>
            <div className="w-full h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={SAMPLE_LEDGER} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="date" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#4cc07a" fontSize={10} tickLine={false} axisLine={false} domain={[0, "dataMax + 20"]} />
                  <YAxis yAxisId="right" orientation="right" stroke="#c2603f" fontSize={10} tickLine={false} axisLine={false} domain={[0, 10]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#141814", borderColor: "#1d231d", borderRadius: "8px" }}
                    itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
                    labelStyle={{ color: "#a1a1aa", fontSize: "10px", marginBottom: "4px" }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: "10px", paddingTop: "14px" }} />
                  <Line yAxisId="left" type="monotone" dataKey="hrv" name="HRV (ms)" stroke="#4cc07a" strokeWidth={2} dot={false} />
                  <Line yAxisId="left" type="monotone" dataKey="sleepHours" name="Sleep (hrs)" stroke="#5fd08c" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="sciaticaPainLevel" name="Pain (1-10)" stroke="#c2603f" strokeWidth={2} dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="cravingIntensity" name="Cravings (1-10)" stroke="#f87171" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Mirror reflection preview */}
          <div className="lg:col-span-2 bg-[#0d0f0d] border border-[#1d231d] rounded-2xl p-4 md:p-6 flex flex-col gap-4">
            <p className="text-[10px] font-mono text-[#7d7a70]">The Compassionate Mirror</p>

            <div className="flex items-center gap-2 text-[#4cc07a]">
              <CheckCircle2 size={16} />
              <span className="text-xs font-semibold text-[#f2efe6]">Baseline Held.</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold text-blue-400 flex items-center gap-1.5">
                <Sparkles size={11} /> The Why
              </span>
              <p className="text-xs text-[#b8b4a6] leading-relaxed">{SAMPLE_MIRROR.theWhy}</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle size={11} /> Gentle Alerts
              </span>
              {SAMPLE_MIRROR.gentleAlerts.map((a, i) => (
                <p key={i} className="text-xs text-[#b8b4a6] leading-relaxed flex gap-2">
                  <span className="text-amber-500">-</span> {a}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold text-[#4cc07a] flex items-center gap-1.5">
                <ListChecks size={11} /> Relief Plan
              </span>
              <ol className="flex flex-col gap-1">
                {SAMPLE_MIRROR.reliefPlan.map((s, i) => (
                  <li key={i} className="text-xs text-[#b8b4a6] leading-relaxed flex gap-2">
                    <span className="text-[#4cc07a] font-bold">{i + 1}.</span> {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#1d231d]">
          <p className="text-xs text-[#7d7a70] font-mono">
            Currently in closed beta — a few trusted testers at a time.
          </p>
          <button
            onClick={login}
            className="py-3 px-8 rounded-full bg-[#4cc07a] hover:bg-[#2c7a4d] text-black text-sm font-semibold transition-all duration-300 hover: flex items-center justify-center gap-2 shrink-0"
          >
            [ Start Your Rebuild ] <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
