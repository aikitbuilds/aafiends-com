"use client";

// Reusable AI4AA course infographics, used on the course dashboard and the
// per-week pages. All accent classes are literal strings so Tailwind's static
// scanner keeps them.

import { Search, Sparkles, Terminal, ArrowDown, Clock, Camera } from "lucide-react";
import { TOOL_COMPARISON, WEEKLY_RHYTHM, CAMERA_MILESTONES } from "@/data/ai4aaCourse";

export const AI4AA_ACCENT: Record<string, { text: string; bg: string; border: string; dot: string }> = {
  cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/40", dot: "bg-cyan-500" },
  blue: { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/40", dot: "bg-blue-500" },
  orange: { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/40", dot: "bg-orange-500" },
  violet: { text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/40", dot: "bg-violet-500" },
  amber: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/40", dot: "bg-amber-500" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/40", dot: "bg-emerald-500" },
};

const TOOL_ICON: Record<string, typeof Search> = {
  Perplexity: Search,
  Gemini: Sparkles,
  Claude: Terminal,
};

/** The AI Stack — three layers, research → productivity → build. */
export function AIStackDiagram() {
  const layers = [
    { layer: "Research Layer", tool: "Perplexity", accent: "cyan", task: "Find facts, trends, and competitive intel — all cited." },
    { layer: "Productivity Layer", tool: "Gemini", accent: "blue", task: "Draft docs, automate workflows, run meetings." },
    { layer: "Build Layer", tool: "Claude", accent: "orange", task: "Code, logic, complex documents, and apps." },
  ];
  return (
    <div className="flex flex-col items-stretch gap-2">
      {layers.map((l, i) => {
        const c = AI4AA_ACCENT[l.accent];
        const Icon = TOOL_ICON[l.tool] ?? Search;
        return (
          <div key={l.layer} className="flex flex-col items-center gap-2">
            <div className={`w-full rounded-2xl border ${c.border} ${c.bg} p-4 sm:p-5 flex items-center gap-4`}>
              <div className={`w-11 h-11 rounded-xl border ${c.border} bg-[#0a0a0a] flex items-center justify-center ${c.text} shrink-0`}>
                <Icon size={20} />
              </div>
              <div className="min-w-0">
                <div className={`text-[10px] font-black uppercase tracking-widest ${c.text}`}>{l.layer}</div>
                <div className="text-white font-black text-sm">{l.tool}</div>
                <div className="text-neutral-400 text-xs leading-snug mt-0.5">{l.task}</div>
              </div>
            </div>
            {i < layers.length - 1 && <ArrowDown size={16} className="text-neutral-600" />}
          </div>
        );
      })}
    </div>
  );
}

/** Three-tool comparison cards. */
export function ToolComparisonCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {TOOL_COMPARISON.map((t) => {
        const c = AI4AA_ACCENT[t.accent] ?? AI4AA_ACCENT.cyan;
        const Icon = TOOL_ICON[t.tool] ?? Search;
        return (
          <div key={t.tool} className={`bg-[#0a0a0a] border ${c.border} rounded-2xl p-5 flex flex-col gap-3`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} ${c.text} flex items-center justify-center`}>
                <Icon size={18} />
              </div>
              <div>
                <div className="text-white font-black uppercase tracking-tight text-sm">{t.tool}</div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${c.text}`}>{t.role}</div>
              </div>
            </div>
            <div className="text-xs text-neutral-300 leading-relaxed"><span className="text-neutral-500">Best for:</span> {t.bestFor}</div>
            <div className="text-xs text-neutral-400 leading-relaxed"><span className="text-neutral-500">2026 standout:</span> {t.standout}</div>
            <div className="flex gap-2 mt-auto pt-2 text-[10px] font-mono uppercase tracking-widest">
              <span className={`px-2 py-1 rounded ${c.bg} ${c.text}`}>Code: {t.coding.split(" ")[0]}</span>
              <span className="px-2 py-1 rounded bg-white/5 text-neutral-400">Web: {t.web.split(" ")[0]}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** The weekly broadcast rhythm as a proportional timeline. */
export function WeeklyRhythm() {
  const total = WEEKLY_RHYTHM.reduce((s, x) => s + x.minutes, 0);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full h-3 rounded-full overflow-hidden border border-white/10">
        {WEEKLY_RHYTHM.map((s, i) => {
          const shades = ["bg-cyan-500", "bg-blue-500", "bg-violet-500", "bg-fuchsia-500", "bg-orange-500", "bg-amber-500", "bg-emerald-500"];
          return <div key={s.segment} className={shades[i % shades.length]} style={{ width: `${(s.minutes / total) * 100}%` }} title={`${s.segment} · ${s.minutes}m`} />;
        })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {WEEKLY_RHYTHM.map((s) => (
          <div key={s.segment} className="flex items-start gap-2 text-xs">
            <Clock size={13} className="text-neutral-600 shrink-0 mt-0.5" />
            <span className="text-neutral-300"><span className="text-white font-bold">{s.segment}</span> <span className="text-neutral-600">· {s.minutes}m</span> — {s.purpose}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Week-by-week on-camera skill progression. */
export function CameraMilestones({ current }: { current?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {CAMERA_MILESTONES.map((m) => {
        const active = current === m.week;
        return (
          <div
            key={m.week}
            className={`flex items-center gap-3 rounded-xl border p-3 ${active ? "border-amber-500/50 bg-amber-500/10" : "border-white/10 bg-[#0a0a0a]"}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-black ${active ? "bg-amber-500 text-black" : "bg-white/5 text-neutral-400"}`}>
              {m.week}
            </div>
            <div className="min-w-0">
              <div className="text-white text-xs font-bold flex items-center gap-1.5"><Camera size={12} className="text-neutral-500" /> {m.skill}</div>
              <div className="text-neutral-500 text-[11px] leading-snug">{m.deliverable}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
