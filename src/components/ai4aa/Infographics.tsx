"use client";

// Reusable AI4AA course infographics, used on the course dashboard and the
// per-week pages. All accent + gradient classes are literal strings so
// Tailwind's static scanner keeps them.

import { useEffect, useRef, useState } from "react";
import { Search, Sparkles, Terminal, ArrowDown, Clock, Camera, Zap, TrendingDown } from "lucide-react";
import { TOOL_COMPARISON, WEEKLY_RHYTHM, CAMERA_MILESTONES } from "@/data/ai4aaCourse";
import { PROMPT_ANATOMY, type CaseMetric, type AnatomyPart } from "@/data/ai4aaVisuals";

export const AI4AA_ACCENT: Record<string, { text: string; bg: string; border: string; dot: string; grad: string }> = {
  cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/40", dot: "bg-cyan-500", grad: "from-cyan-500 to-blue-500" },
  blue: { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/40", dot: "bg-blue-500", grad: "from-blue-500 to-violet-500" },
  orange: { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/40", dot: "bg-orange-500", grad: "from-orange-500 to-amber-500" },
  violet: { text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/40", dot: "bg-violet-500", grad: "from-violet-500 to-fuchsia-500" },
  amber: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/40", dot: "bg-amber-500", grad: "from-amber-500 to-orange-500" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/40", dot: "bg-emerald-500", grad: "from-emerald-500 to-teal-500" },
  pink: { text: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/40", dot: "bg-pink-500", grad: "from-pink-500 to-rose-500" },
};

const TOOL_ICON: Record<string, typeof Search> = {
  Perplexity: Search,
  Gemini: Sparkles,
  Claude: Terminal,
};

/** Fires `true` once the element scrolls into view — used to trigger grow animations. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/** The AI Stack — three vivid layers, research → productivity → build. */
export function AIStackDiagram() {
  const layers = [
    { layer: "Research Layer", tool: "Perplexity", accent: "cyan", task: "Find facts, trends, and competitive intel — all cited." },
    { layer: "Productivity Layer", tool: "Gemini", accent: "blue", task: "Draft docs, automate workflows, run meetings." },
    { layer: "Build Layer", tool: "Claude", accent: "orange", task: "Code, logic, complex documents, and apps." },
  ];
  return (
    <div className="flex flex-col items-stretch gap-1">
      {layers.map((l, i) => {
        const c = AI4AA_ACCENT[l.accent];
        const Icon = TOOL_ICON[l.tool] ?? Search;
        return (
          <div key={l.layer} className="flex flex-col items-center gap-1">
            <div className={`w-full rounded-2xl border ${c.border} bg-gradient-to-r ${c.grad} p-[1.5px] shadow-lg`}>
              <div className="flex items-center gap-4 rounded-2xl bg-[#0a0a0f] p-4 sm:p-5">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.grad} flex items-center justify-center text-white shrink-0 shadow-md`}>
                  <Icon size={22} />
                </div>
                <div className="min-w-0">
                  <div className={`text-[10px] font-black uppercase tracking-widest ${c.text}`}>{l.layer}</div>
                  <div className="text-white font-black">{l.tool}</div>
                  <div className="text-neutral-400 text-xs leading-snug mt-0.5">{l.task}</div>
                </div>
              </div>
            </div>
            {i < layers.length - 1 && <ArrowDown size={18} className="text-neutral-600" />}
          </div>
        );
      })}
    </div>
  );
}

/** Three-tool comparison cards, with gradient headers. */
export function ToolComparisonCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {TOOL_COMPARISON.map((t) => {
        const c = AI4AA_ACCENT[t.accent] ?? AI4AA_ACCENT.cyan;
        const Icon = TOOL_ICON[t.tool] ?? Search;
        return (
          <div key={t.tool} className={`rounded-2xl border ${c.border} bg-[#0a0a0a] overflow-hidden flex flex-col`}>
            <div className={`bg-gradient-to-r ${c.grad} px-5 py-4 flex items-center gap-3`}>
              <div className="w-10 h-10 rounded-xl bg-black/25 text-white flex items-center justify-center backdrop-blur">
                <Icon size={18} />
              </div>
              <div>
                <div className="text-white font-black uppercase tracking-tight text-sm">{t.tool}</div>
                <div className="text-white/80 text-[10px] font-bold uppercase tracking-widest">{t.role}</div>
              </div>
            </div>
            <div className="p-5 flex flex-col gap-3 flex-1">
              <div className="text-xs text-neutral-300 leading-relaxed"><span className="text-neutral-500">Best for:</span> {t.bestFor}</div>
              <div className="text-xs text-neutral-400 leading-relaxed"><span className="text-neutral-500">2026 standout:</span> {t.standout}</div>
              <div className="flex gap-2 mt-auto pt-2 text-[10px] font-mono uppercase tracking-widest">
                <span className={`px-2 py-1 rounded ${c.bg} ${c.text}`}>Code: {t.coding.split(" ")[0]}</span>
                <span className="px-2 py-1 rounded bg-white/5 text-neutral-400">Web: {t.web.split(" ")[0]}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Anatomy of a prompt — weak vs. strong, with the strong prompt color-coded. */
export function PromptAnatomy() {
  const parts = PROMPT_ANATOMY.strong.parts;
  return (
    <div className="flex flex-col gap-4">
      {/* Weak */}
      <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
        <div className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-1.5">✗ Weak prompt</div>
        <p className="text-neutral-400 text-sm font-mono">&ldquo;{PROMPT_ANATOMY.weak}&rdquo;</p>
      </div>

      {/* Strong — color-coded segments */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-3">✓ Strong prompt — every part has a job</div>
        <p className="text-sm font-mono leading-loose">
          {parts.map((p: AnatomyPart, i) => {
            const c = AI4AA_ACCENT[p.accent] ?? AI4AA_ACCENT.cyan;
            return (
              <span key={i} className={`${c.bg} ${c.text} rounded px-1.5 py-0.5 mx-0.5 whitespace-normal`}>
                {p.example}
              </span>
            );
          })}
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2">
        {parts.map((p: AnatomyPart, i) => {
          const c = AI4AA_ACCENT[p.accent] ?? AI4AA_ACCENT.cyan;
          return (
            <span key={i} className={`inline-flex items-center gap-1.5 text-[11px] font-bold rounded-full border ${c.border} ${c.bg} ${c.text} px-2.5 py-1`}>
              <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} /> {p.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/** Before/after time-savings bars for a case study. */
export function BeforeAfterBars({ metric }: { metric: CaseMetric }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const max = Math.max(metric.before, metric.after);
  const beforePct = (metric.before / max) * 100;
  const afterPct = (metric.after / max) * 100;
  const saved = Math.round(((metric.before - metric.after) / metric.before) * 100);

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-black text-white uppercase tracking-tight flex items-center gap-2">
          <Zap size={15} className="text-amber-400" /> {metric.label}
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2.5 py-1">
          <TrendingDown size={12} /> {saved}% faster
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {/* Before */}
        <div>
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
            <span className="text-neutral-500">Before AI</span>
            <span className="text-neutral-300">{metric.before} {metric.unit}</span>
          </div>
          <div className="h-3 rounded-full bg-neutral-900 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-1000 ease-out" style={{ width: inView ? `${beforePct}%` : "0%" }} />
          </div>
        </div>
        {/* After */}
        <div>
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
            <span className="text-emerald-400">With AI</span>
            <span className="text-white">{metric.after} {metric.unit}</span>
          </div>
          <div className="h-3 rounded-full bg-neutral-900 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000 ease-out delay-200" style={{ width: inView ? `${afterPct}%` : "0%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** The weekly broadcast rhythm as a proportional timeline. */
export function WeeklyRhythm() {
  const total = WEEKLY_RHYTHM.reduce((s, x) => s + x.minutes, 0);
  const shades = ["bg-cyan-500", "bg-blue-500", "bg-violet-500", "bg-fuchsia-500", "bg-orange-500", "bg-amber-500", "bg-emerald-500"];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full h-4 rounded-full overflow-hidden border border-white/10">
        {WEEKLY_RHYTHM.map((s, i) => (
          <div key={s.segment} className={shades[i % shades.length]} style={{ width: `${(s.minutes / total) * 100}%` }} title={`${s.segment} · ${s.minutes}m`} />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {WEEKLY_RHYTHM.map((s, i) => (
          <div key={s.segment} className="flex items-start gap-2 text-xs">
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 ${shades[i % shades.length]}`} />
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
            className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${active ? "border-amber-500/50 bg-gradient-to-r from-amber-500/15 to-transparent" : "border-white/10 bg-[#0a0a0a]"}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-black ${active ? "bg-gradient-to-br from-amber-500 to-orange-500 text-black" : "bg-white/5 text-neutral-400"}`}>
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
