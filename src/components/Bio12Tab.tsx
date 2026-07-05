"use client";

// BIO 12 — the four-pillar daily protocol (Movement / Sleep / Nutrition /
// Breath), 3 actions each = 12 daily "firewall" checks. Complementary to the
// Engine check-in: this is the behavioral streak tracker with a Threat Level
// that drops from CRITICAL → MINIMAL as more of the day's 12 are completed.
//
// Persists one doc per day at users/{uid}/private_vault/bio12_{date} (owner-
// writable under existing rules). LedgerTab ignores these docs (no hardware/
// software fields), so the chart stays clean.

import { useEffect, useMemo, useState } from "react";
import { doc, getDoc, setDoc, collection, query, orderBy, limit, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Footprints, Moon, Apple, Wind, ShieldAlert, ShieldCheck, Flame, CheckCircle2, Circle } from "lucide-react";

interface Pillar {
  key: string;
  name: string;
  icon: any;
  accent: { text: string; bg: string; border: string; grad: string; ring: string };
  items: { id: string; label: string }[];
}

const PILLARS: Pillar[] = [
  {
    key: "movement", name: "Movement", icon: Footprints,
    accent: { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/40", grad: "from-orange-500 to-amber-500", ring: "ring-orange-500/40" },
    items: [
      { id: "walk", label: "Get outside / walk (20+ min)" },
      { id: "strength", label: "Strength or mobility work" },
      { id: "cold", label: "Cold plunge or contrast shower" },
    ],
  },
  {
    key: "sleep", name: "Sleep", icon: Moon,
    accent: { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/40", grad: "from-blue-500 to-violet-500", ring: "ring-blue-500/40" },
    items: [
      { id: "hours", label: "7+ hours last night" },
      { id: "curfew", label: "Screen curfew (9 PM)" },
      { id: "waketime", label: "Consistent wake time" },
    ],
  },
  {
    key: "nutrition", name: "Nutrition", icon: Apple,
    accent: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/40", grad: "from-emerald-500 to-teal-500", ring: "ring-emerald-500/40" },
    items: [
      { id: "hydrate", label: "Hydrate (8+ cups)" },
      { id: "protein", label: "Protein + whole foods" },
      { id: "gut", label: "Omega-3 / fermented (gut)" },
    ],
  },
  {
    key: "breath", name: "Breath", icon: Wind,
    accent: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/40", grad: "from-cyan-500 to-blue-500", ring: "ring-cyan-500/40" },
    items: [
      { id: "nsdr", label: "NSDR / breathwork session" },
      { id: "meditate", label: "5-min meditation" },
      { id: "box", label: "Box-breathe a craving down" },
    ],
  },
];

const ALL_IDS = PILLARS.flatMap((p) => p.items.map((i) => `${p.key}_${i.id}`));
const TOTAL = ALL_IDS.length; // 12

// Threat level by number of the 12 completed today.
function threatFor(done: number) {
  if (done >= 12) return { label: "MINIMAL", color: "text-emerald-400", bar: "from-emerald-500 to-teal-400", border: "border-emerald-500/40", bg: "bg-emerald-500/10", icon: ShieldCheck, note: "Firewall at full strength. The AIV has nothing to feed on today." };
  if (done >= 10) return { label: "LOW", color: "text-teal-400", bar: "from-teal-500 to-emerald-400", border: "border-teal-500/40", bg: "bg-teal-500/10", icon: ShieldCheck, note: "Defenses solid — close out the last couple." };
  if (done >= 7) return { label: "GUARDED", color: "text-amber-400", bar: "from-amber-500 to-yellow-400", border: "border-amber-500/40", bg: "bg-amber-500/10", icon: ShieldAlert, note: "Holding, but there are gaps in the wall." };
  if (done >= 4) return { label: "ELEVATED", color: "text-orange-400", bar: "from-orange-500 to-amber-500", border: "border-orange-500/40", bg: "bg-orange-500/10", icon: ShieldAlert, note: "Exposure rising. Knock out a few more." };
  return { label: "CRITICAL", color: "text-red-400", bar: "from-red-500 to-orange-500", border: "border-red-500/40", bg: "bg-red-500/10", icon: ShieldAlert, note: "Firewall down — this is exactly where the virus thrives." };
}

function dateKey(d = new Date()) {
  return d.toISOString().split("T")[0];
}

export default function Bio12Tab() {
  const { user } = useAuth();
  const today = dateKey();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [history, setHistory] = useState<{ date: string; done: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!user) { setLoading(false); return; }
      try {
        const todaySnap = await getDoc(doc(db, "users", user.uid, "private_vault", `bio12_${today}`));
        if (active && todaySnap.exists()) setChecked((todaySnap.data() as any).items ?? {});

        // Pull recent docs to build the streak + history strip.
        const snap = await getDocs(query(collection(db, "users", user.uid, "private_vault"), orderBy("date", "desc"), limit(60)));
        const rows: { date: string; done: number }[] = [];
        snap.forEach((d) => {
          const data = d.data() as any;
          if (data?.type === "bio12" && data?.date) {
            const items = data.items ?? {};
            rows.push({ date: data.date, done: Object.values(items).filter(Boolean).length });
          }
        });
        if (active) setHistory(rows);
      } catch (e) {
        console.error("BIO12 load failed", e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [user, today]);

  const doneCount = useMemo(() => ALL_IDS.filter((id) => checked[id]).length, [checked]);
  const threat = threatFor(doneCount);

  // Streak = consecutive days (ending today or yesterday) with >= 10 of 12.
  const streak = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of history) map.set(r.date, r.done);
    map.set(today, doneCount); // include live today
    let s = 0;
    const cur = new Date();
    // allow the streak to "hold" if today isn't done yet but yesterday was
    if ((map.get(today) ?? 0) < 10) cur.setDate(cur.getDate() - 1);
    for (let i = 0; i < 400; i++) {
      const k = dateKey(cur);
      if ((map.get(k) ?? 0) >= 10) { s++; cur.setDate(cur.getDate() - 1); }
      else break;
    }
    return s;
  }, [history, doneCount, today]);

  async function toggle(id: string) {
    if (!user) return;
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try {
      await setDoc(
        doc(db, "users", user.uid, "private_vault", `bio12_${today}`),
        { type: "bio12", date: today, items: next, timestamp: serverTimestamp() },
        { merge: true }
      );
    } catch (e) {
      console.error("BIO12 save failed", e);
    }
  }

  const last7 = useMemo(() => {
    const map = new Map(history.map((r) => [r.date, r.done]));
    map.set(today, doneCount);
    const days: { date: string; done: number }[] = [];
    const cur = new Date();
    cur.setDate(cur.getDate() - 6);
    for (let i = 0; i < 7; i++) {
      const k = dateKey(cur);
      days.push({ date: k, done: map.get(k) ?? 0 });
      cur.setDate(cur.getDate() + 1);
    }
    return days;
  }, [history, doneCount, today]);

  const ThreatIcon = threat.icon;

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      {/* Threat level gauge */}
      <div className={`rounded-2xl border ${threat.border} ${threat.bg} p-5 sm:p-6 flex flex-col gap-4`}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${threat.bar} flex items-center justify-center text-black shrink-0`}>
              <ThreatIcon size={24} />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Threat Level Today</div>
              <div className={`text-2xl font-black uppercase tracking-tight ${threat.color}`}>{threat.label}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Protocol</div>
              <div className="text-xl font-black text-white">{doneCount}<span className="text-neutral-600 text-sm">/{TOTAL}</span></div>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 px-3 py-1.5">
              <Flame size={14} className="text-orange-400" />
              <span className="text-sm font-black text-orange-400">{streak}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">day{streak === 1 ? "" : "s"}</span>
            </div>
          </div>
        </div>
        <div className="h-2.5 rounded-full bg-neutral-900 overflow-hidden">
          <div className={`h-full rounded-full bg-gradient-to-r ${threat.bar} transition-all duration-500`} style={{ width: `${(doneCount / TOTAL) * 100}%` }} />
        </div>
        <p className="text-xs text-neutral-400 leading-relaxed">{threat.note}</p>
      </div>

      {/* 4 pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PILLARS.map((p) => {
          const Icon = p.icon;
          const pillarDone = p.items.filter((i) => checked[`${p.key}_${i.id}`]).length;
          return (
            <div key={p.key} className={`bg-[#0a0a0a] border ${p.accent.border} rounded-2xl overflow-hidden`}>
              <div className={`bg-gradient-to-r ${p.accent.grad} px-4 py-3 flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-black/25 text-white flex items-center justify-center"><Icon size={16} /></div>
                  <span className="text-white font-black uppercase tracking-tight text-sm">{p.name}</span>
                </div>
                <span className="text-white/90 text-xs font-black">{pillarDone}/{p.items.length}</span>
              </div>
              <div className="p-3 flex flex-col gap-2">
                {p.items.map((i) => {
                  const id = `${p.key}_${i.id}`;
                  const on = !!checked[id];
                  return (
                    <button
                      key={id}
                      onClick={() => toggle(id)}
                      disabled={loading}
                      className={`text-left flex items-center gap-3 rounded-xl border p-3 transition-colors ${on ? `${p.accent.border} ${p.accent.bg}` : "border-white/10 bg-[#050505] hover:border-white/20"}`}
                    >
                      {on ? <CheckCircle2 size={18} className={`${p.accent.text} shrink-0`} /> : <Circle size={18} className="text-neutral-600 shrink-0" />}
                      <span className={`text-sm ${on ? "text-white font-bold" : "text-neutral-300"}`}>{i.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 7-day history strip */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5">
        <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-4">Last 7 Days</div>
        <div className="flex items-end justify-between gap-2 h-24">
          {last7.map((d) => {
            const pct = (d.done / TOTAL) * 100;
            const t = threatFor(d.done);
            const isToday = d.date === today;
            return (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex-1 flex items-end">
                  <div className={`w-full rounded-md bg-gradient-to-t ${t.bar} transition-all`} style={{ height: `${Math.max(pct, 4)}%` }} title={`${d.done}/${TOTAL}`} />
                </div>
                <span className={`text-[9px] font-mono ${isToday ? "text-white font-bold" : "text-neutral-600"}`}>{d.date.slice(5)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
