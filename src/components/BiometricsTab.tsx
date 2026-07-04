"use client";

// Dashboard-embeddable biometric view. Surfaces the same telemetry the
// standalone /data page shows, so real Garmin/wearable data (once connected)
// renders right inside the dashboard. Until a device is wired up it shows
// clearly-labeled SAMPLE data so the layout can be seen populated.
//
// Honesty note (MASTER-PLAN "no fabricated numbers"): every figure here is
// tagged "Sample" and the panel carries a disclaimer — nothing implies a live
// reading. When the wearable pipeline lands, swap `sampleGarminData` /
// `sampleStats` for the real feed and drop the isSample flag.

import Link from "next/link";
import { Moon, HeartPulse, BrainCircuit, Watch, ArrowUpRight, AlertTriangle } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const sampleGarminData = [
  { day: "Day -6", sleep: 5.2, hr: 62, stress: 45 },
  { day: "Day -5", sleep: 6.1, hr: 60, stress: 38 },
  { day: "Day -4", sleep: 5.8, hr: 61, stress: 42 },
  { day: "Day -3", sleep: 7.4, hr: 58, stress: 28 },
  { day: "Day -2", sleep: 7.8, hr: 57, stress: 24 },
  { day: "Day -1", sleep: 7.5, hr: 58, stress: 25 },
  { day: "Today", sleep: 7.2, hr: 58, stress: 22 },
];

export default function BiometricsTab() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      {/* Sample-data disclaimer */}
      <div className="flex items-start gap-2 text-xs text-amber-400/80 bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3">
        <AlertTriangle size={14} className="shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          These are <strong>sample figures</strong> so you can see the layout populated. Your live Garmin / wearable
          data will appear here once a device is connected — nothing below is a real-time reading yet.
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sleep */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <Moon size={18} />
              <span className="font-bold uppercase text-xs tracking-wider">Sleep</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">Last Night · Sample</span>
          </div>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-3xl font-black text-white">7h 12m</span>
            <span className="text-emerald-400 font-bold text-sm mb-1">Score 84</span>
          </div>
          <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full" style={{ width: "84%" }}></div>
          </div>
        </div>

        {/* Resting HR */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <HeartPulse size={18} />
              <span className="font-bold uppercase text-xs tracking-wider">Resting HR</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">7-Day Avg · Sample</span>
          </div>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-3xl font-black text-white">58</span>
            <span className="text-neutral-400 font-bold text-sm mb-1">bpm</span>
          </div>
          <div className="flex gap-1 h-8 items-end">
            {[62, 60, 59, 61, 58, 57, 58].map((bpm, i) => (
              <div key={i} className="flex-1 bg-emerald-500/20 rounded-t-sm" style={{ height: `${(bpm / 70) * 100}%` }}></div>
            ))}
          </div>
        </div>

        {/* Stress */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <BrainCircuit size={18} />
              <span className="font-bold uppercase text-xs tracking-wider">Stress</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">Current · Sample</span>
          </div>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-3xl font-black text-emerald-400">22</span>
            <span className="text-neutral-400 font-bold text-sm mb-1">/ 100</span>
          </div>
          <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full" style={{ width: "22%" }}></div>
          </div>
        </div>
      </div>

      {/* 7-day chart */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 sm:p-6">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm flex items-center gap-2">
              <Watch size={16} className="text-emerald-400" /> 7-Day Telemetry Overlay
            </h4>
            <p className="text-neutral-500 text-[11px] font-mono mt-1">Sleep · Resting HR · Stress</p>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/70 border border-emerald-500/20 rounded-full px-2.5 py-1">
            Sample Data
          </span>
        </div>

        <div className="w-full h-[300px] -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleGarminData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="day" stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="#10b981" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
              <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" fontSize={11} tickLine={false} axisLine={false} domain={[0, 12]} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "12px" }}
                itemStyle={{ fontWeight: "bold" }}
                labelStyle={{ color: "#888", marginBottom: "4px", fontSize: "12px", textTransform: "uppercase" }}
              />
              <Line yAxisId="left" type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3, fill: "#0a0a0a", stroke: "#ef4444", strokeWidth: 2 }} name="Stress" />
              <Line yAxisId="left" type="monotone" dataKey="hr" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3, fill: "#0a0a0a", stroke: "#10b981", strokeWidth: 2 }} name="Resting HR (bpm)" />
              <Line yAxisId="right" type="monotone" dataKey="sleep" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, fill: "#0a0a0a", stroke: "#3b82f6", strokeWidth: 2 }} name="Sleep (hrs)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Link to the full standalone data page */}
      <Link
        href="/data"
        className="group flex items-center justify-between bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 hover:border-emerald-500/30 transition-colors"
      >
        <div>
          <h4 className="text-sm font-black text-white uppercase tracking-widest">Open the full telemetry view</h4>
          <p className="text-xs text-neutral-400 mt-0.5">The complete Data Over Denial breakdown — protocols, Garmin sync, and the daily inventory.</p>
        </div>
        <ArrowUpRight className="text-emerald-400 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={20} />
      </Link>
    </div>
  );
}
