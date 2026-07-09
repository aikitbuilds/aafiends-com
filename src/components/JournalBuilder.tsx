"use client";

import { useEffect, useState } from "react";
import { Printer, Plus, Trash2, RotateCcw } from "lucide-react";

type RowType = "check" | "scale10" | "scale0" | "field" | "note";
interface Row { id: string; section: Section; label: string; type: RowType; enabled: boolean; }
type Section = "Engine" | "Network" | "Mirror" | "Tonight";
const SECTIONS: Section[] = ["Engine", "Network", "Mirror", "Tonight"];
const SECTION_COLOR: Record<Section, string> = { Engine: "#12805c", Network: "#7b44c4", Mirror: "#128da6", Tonight: "#b9791b" };

const DEFAULTS: Row[] = [
  ["Engine", "Bedtime", "field"], ["Engine", "Woke", "field"], ["Engine", "Hours slept", "field"], ["Engine", "Wake-ups", "field"],
  ["Engine", "Sleep quality", "scale10"],
  ["Engine", "Water first thing", "check"], ["Engine", "Morning light / outside", "check"], ["Engine", "Movement (walk / lift)", "check"],
  ["Engine", "Cold or contrast", "check"], ["Engine", "Stillness (breath / prayer)", "check"],
  ["Engine", "Ate real meals", "check"], ["Engine", "Gut-support food", "check"], ["Engine", "Hydrated all day", "check"], ["Engine", "No liver-taxing painkillers", "check"],
  ["Engine", "Pain today", "scale0"],
  ["Engine", "Cardio (min)", "field"], ["Engine", "Miles", "field"], ["Engine", "Yoga (min)", "field"], ["Engine", "Streak #", "field"],
  ["Network", "Went to a meeting", "check"], ["Network", "Called sponsor / peer", "check"], ["Network", "Did a small service", "check"], ["Network", "Asked for help", "check"],
  ["Mirror", "Stillness / prayer", "check"], ["Mirror", "Surrendered what I can't control", "check"], ["Mirror", "Ego check — didn't force it", "check"], ["Mirror", "Evening tech curfew", "check"],
  ["Mirror", "Clarity today", "scale10"],
  ["Tonight", "Mood", "scale10"], ["Tonight", "Craving", "scale0"],
  ["Tonight", "What held the line today?", "note"], ["Tonight", "Grateful for…", "note"],
].map(([section, label, type], i) => ({ id: `d${i}`, section: section as Section, label: label as string, type: type as RowType, enabled: true }));

const KEY = "aaf-journal-builder-v1";

export default function JournalBuilder() {
  const [format, setFormat] = useState<"full" | "half">("half");
  const [days, setDays] = useState(7);
  const [rows, setRows] = useState<Row[]>(DEFAULTS);
  const [newLabel, setNewLabel] = useState("");
  const [newType, setNewType] = useState<RowType>("check");
  const [newSection, setNewSection] = useState<Section>("Engine");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) { const c = JSON.parse(raw); if (c.rows) { setRows(c.rows); setFormat(c.format || "half"); setDays(c.days || 7); } }
    } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify({ format, days, rows })); } catch { /* ignore */ }
  }, [format, days, rows]);

  const toggle = (id: string) => setRows((r) => r.map((x) => x.id === id ? { ...x, enabled: !x.enabled } : x));
  const remove = (id: string) => setRows((r) => r.filter((x) => x.id !== id));
  const add = () => {
    if (!newLabel.trim()) return;
    setRows((r) => [...r, { id: `c${Date.now()}`, section: newSection, label: newLabel.trim(), type: newType, enabled: true }]);
    setNewLabel("");
  };
  const reset = () => { setRows(DEFAULTS); setFormat("half"); setDays(7); };

  const printCss = `@media print {
    @page { size: ${format === "half" ? "5.5in 8.5in" : "8.5in 11in"}; margin: 0.5in; }
    .no-print { display: none !important; }
    .jb-sheet { page-break-after: always; box-shadow: none !important; margin: 0 !important; border: none !important; }
    html, body { background: #fff !important; }
  }`;

  return (
    <div className="flex flex-col gap-6">
      <style dangerouslySetInnerHTML={{ __html: printCss }} />

      {/* controls */}
      <div className="no-print grid lg:grid-cols-[1fr_1.1fr] gap-6">
        <div className="bg-[#09090b] border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-xl overflow-hidden border border-white/10">
              {(["half", "full"] as const).map((f) => (
                <button key={f} onClick={() => setFormat(f)} className={`px-4 py-2 text-xs font-black uppercase tracking-widest ${format === f ? "bg-[#10b981] text-black" : "bg-transparent text-neutral-400"}`}>
                  {f === "half" ? "Half-page 5.5×8.5" : "Full-page 8.5×11"}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-400">
              Days
              <input type="number" min={1} max={31} value={days} onChange={(e) => setDays(Math.max(1, Math.min(31, +e.target.value || 1)))}
                className="w-16 bg-[#050505] border border-white/10 rounded-lg px-2 py-1.5 text-white" />
            </label>
            <button onClick={reset} className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-white uppercase tracking-widest"><RotateCcw size={13} /> Reset</button>
          </div>

          <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1">
            {SECTIONS.map((sec) => (
              <div key={sec}>
                <div className="text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: SECTION_COLOR[sec] }}>{sec}</div>
                <div className="flex flex-col gap-1">
                  {rows.filter((r) => r.section === sec).map((r) => (
                    <div key={r.id} className="flex items-center gap-2 group">
                      <button onClick={() => toggle(r.id)} className="flex items-center gap-2 flex-1 text-left">
                        <span className="w-4 h-4 rounded border flex items-center justify-center shrink-0" style={{ borderColor: r.enabled ? SECTION_COLOR[sec] : "#3f3f46", background: r.enabled ? SECTION_COLOR[sec] : "transparent" }}>
                          {r.enabled && <span className="text-black text-[10px] font-black">✓</span>}
                        </span>
                        <span className={`text-sm ${r.enabled ? "text-neutral-200" : "text-neutral-600 line-through"}`}>{r.label}</span>
                        <span className="text-[9px] font-mono text-neutral-600 uppercase">{r.type}</span>
                      </button>
                      <button onClick={() => remove(r.id)} className="opacity-0 group-hover:opacity-100 text-neutral-600 hover:text-red-400"><Trash2 size={13} /></button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
            <input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Add your own row…"
              className="flex-1 min-w-[140px] bg-[#050505] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-neutral-600" />
            <select value={newSection} onChange={(e) => setNewSection(e.target.value as Section)} className="bg-[#050505] border border-white/10 rounded-lg px-2 py-2 text-xs text-white">
              {SECTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={newType} onChange={(e) => setNewType(e.target.value as RowType)} className="bg-[#050505] border border-white/10 rounded-lg px-2 py-2 text-xs text-white">
              <option value="check">Checkbox</option><option value="scale10">Scale 1–10</option><option value="scale0">Scale 0–10</option><option value="field">Field</option><option value="note">Note lines</option>
            </select>
            <button onClick={add} className="inline-flex items-center gap-1 bg-[#10b981] text-black text-xs font-black uppercase tracking-widest px-3 py-2 rounded-lg"><Plus size={13} /> Add</button>
          </div>

          <button onClick={() => window.print()} className="inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black text-sm font-black uppercase tracking-widest px-6 py-3.5 rounded-xl">
            <Printer size={16} /> Print / Save as PDF
          </button>
          <p className="text-[11px] text-neutral-600 leading-relaxed">
            Half-page prints two per sheet-worth of size — fold &amp; staple into a mini-book. In the print dialog choose “Save as PDF,” or print on 32&nbsp;lb paper. Your layout is saved on this device.
          </p>
        </div>

        {/* live preview (first day) */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-4 overflow-auto max-h-[560px]">
          <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">Live preview · Day 1</div>
          <Sheet day={1} rows={rows} format={format} />
        </div>
      </div>

      {/* print target: all days */}
      <div className="hidden print:block">
        {Array.from({ length: days }).map((_, i) => (
          <div key={i} className="jb-sheet"><Sheet day={i + 1} rows={rows} format={format} /></div>
        ))}
      </div>
    </div>
  );
}

function Sheet({ day, rows, format }: { day: number; rows: Row[]; format: "full" | "half" }) {
  const on = rows.filter((r) => r.enabled);
  return (
    <div className="jb-preview bg-white text-[#1c2b33] rounded-lg mx-auto p-6" style={{ width: format === "half" ? "5.5in" : "8.5in", minHeight: format === "half" ? "8.5in" : "11in", fontFamily: "Helvetica, Arial, sans-serif" }}>
      <div className="flex items-baseline justify-between border-b-2 pb-1 mb-3" style={{ borderColor: "#12805c" }}>
        <div className="text-2xl font-black">DAY {day}</div>
        <div className="text-[10px] tracking-widest text-neutral-500">DATE __________ · SOBER · DAY ____</div>
      </div>
      {SECTIONS.map((sec) => {
        const items = on.filter((r) => r.section === sec);
        if (!items.length) return null;
        return (
          <div key={sec} className="mb-3">
            <div className="text-white text-[11px] font-black uppercase tracking-wide rounded px-2 py-1 mb-1.5" style={{ background: SECTION_COLOR[sec] }}>
              {sec === "Tonight" ? "Tonight · Reflect" : `The ${sec}`}
            </div>
            <div className="flex flex-col gap-1">
              {items.map((r) => <RowView key={r.id} r={r} />)}
            </div>
          </div>
        );
      })}
      <div className="text-[7px] text-neutral-400 mt-2 border-t pt-1">Not affiliated with A.A.W.S. · Peer support, not medical advice · In crisis: 988 · aafiends.com/90rr</div>
    </div>
  );
}

function RowView({ r }: { r: Row }) {
  if (r.type === "check") return (<div className="flex items-center gap-2 text-[11px]"><span className="inline-block w-3 h-3 border border-neutral-500 rounded-sm" />{r.label}</div>);
  if (r.type === "field") return (<div className="flex items-center gap-2 text-[11px]"><span className="font-bold">{r.label}</span><span className="flex-1 border-b border-dotted border-neutral-400" /></div>);
  if (r.type === "note") return (<div className="text-[11px]"><div className="font-bold mb-0.5">{r.label}</div><div className="border-b border-dotted border-neutral-400 h-3" /><div className="border-b border-dotted border-neutral-400 h-3 mt-1" /></div>);
  const max = r.type === "scale0" ? 10 : 10; const start = r.type === "scale0" ? 0 : 1;
  return (
    <div className="flex items-center gap-1.5 text-[11px]">
      <span className="font-bold whitespace-nowrap">{r.label}</span>
      <span className="flex gap-1">{Array.from({ length: max - start + 1 }).map((_, i) => (
        <span key={i} className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-neutral-400 text-[7px] text-neutral-500">{start + i}</span>
      ))}</span>
    </div>
  );
}
