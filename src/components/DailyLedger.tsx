"use client";

/**
 * DailyLedger — the digital twin of the 90 R&R paper journal (Side A + Side B).
 *
 * Goal: a 1:1 structural match with the printable PDF so a member can move from
 * the paper workbook to the app with zero relearning. Same three pillars
 * (Engine / Network / Mirror), same fields, same "Today's Score" that feeds the
 * Vanguard Scoring Engine (see src/lib/vse.ts — this finally wires it into the UI).
 *
 * Persistence: users/{uid}/private_vault/{YYYY-MM-DD} via setDoc(merge) — the same
 * doc LedgerTab charts from, so a ledger check-in shows up on the trend chart and
 * no firestore.rules change is needed.
 */

import { useEffect, useMemo, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { computeVSEScore, type IgnitionAdherence } from "@/lib/vse";
import {
  Activity, Users, Eye, HeartPulse, MessageSquare, PenLine, Gauge,
  Sun, Moon, Check, Save, Star,
} from "lucide-react";

/* ---- pillar palette (matches the PDF) ---- */
const ENGINE = "#10b981";
const NETWORK = "#a855f7";
const MIRROR = "#22d3ee";
const AMBER = "#f59e0b";
const RED = "#ef4444";

/* ---- milestones (identical to the printed journal) ---- */
const MILESTONES: Record<number, string> = {
  1: "Sanctuary Day — clear the supply, clean your space, set your sobriety date.",
  3: "Deepest deficit. The 'lead-suit' low is normal. Keep choices small.",
  4: "Gut reset begins — fermented food (kefir) tonight if you can.",
  7: "Start gentle spine decompression. Pain is a signal, not a nuisance.",
  14: "Circadian lock — you may begin waking before your alarm.",
  21: "Three weeks. The fog begins to lift. Hold the line.",
  28: "Boredom is not danger. Sit in the quiet without reaching.",
  30: "Phase 1 complete — the Reset holds. Onward to the Restructure.",
};

/* ---- ledger shape (mirror of the paper Side A / Side B) ---- */
interface Ledger {
  // Side A · Engine
  bedtime: string; woke: string; hoursSlept: string; wakeUps: string; sleepQuality: number;
  ignWater: boolean; ignLight: boolean; ignMovement: boolean; ignCold: boolean; ignStillness: boolean;
  fuelMeals: boolean; fuelGut: boolean; fuelHydrated: boolean; fuelNoPainkillers: boolean;
  pain: number; painWhere: string;
  // Side A · Network
  netMeeting: boolean; netSponsor: boolean; netService: boolean; netAskedHelp: boolean;
  // Side A · Mirror
  mirStillness: boolean; mirSurrender: boolean; mirEgoCheck: boolean; mirTechCurfew: boolean; clarity: number;
  // Side B · meeting & connection
  wentToMeeting: boolean; meetingWhen: string; meetingWhere: string; meetingTopic: string; connectedWith: string;
  // Side B · feelings
  mood: number; craving: number; haltHungry: boolean; haltAngry: boolean; haltLonely: boolean; haltTired: boolean;
  // Side B · reflect
  heldLine: string; gratefulFor: string;
}

const EMPTY: Ledger = {
  bedtime: "", woke: "", hoursSlept: "", wakeUps: "", sleepQuality: 0,
  ignWater: false, ignLight: false, ignMovement: false, ignCold: false, ignStillness: false,
  fuelMeals: false, fuelGut: false, fuelHydrated: false, fuelNoPainkillers: false,
  pain: 0, painWhere: "",
  netMeeting: false, netSponsor: false, netService: false, netAskedHelp: false,
  mirStillness: false, mirSurrender: false, mirEgoCheck: false, mirTechCurfew: false, clarity: 0,
  wentToMeeting: false, meetingWhen: "", meetingWhere: "", meetingTopic: "", connectedWith: "",
  mood: 0, craving: 0, haltHungry: false, haltAngry: false, haltLonely: false, haltTired: false,
  heldLine: "", gratefulFor: "",
};

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* ---- small building blocks ---- */
function Banner({ icon: Icon, title, sub, color }: { icon: any; title: string; sub: string; color: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl px-4 py-2.5 mb-4" style={{ background: color }}>
      <Icon size={17} className="text-black/80 shrink-0" />
      <div className="leading-tight">
        <div className="text-sm font-black uppercase tracking-wide text-black">{title}</div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-black/70">{sub}</div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, label, color }: { checked: boolean; onChange: (v: boolean) => void; label: string; color: string }) {
  return (
    <button type="button" onClick={() => onChange(!checked)}
      className="flex items-center gap-2.5 text-left w-full py-1 group">
      <span className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors"
        style={{ borderColor: checked ? color : "#3f3f46", background: checked ? color : "transparent" }}>
        {checked && <Check size={13} className="text-black" strokeWidth={3.5} />}
      </span>
      <span className={`text-sm ${checked ? "text-white" : "text-neutral-300"} group-hover:text-white transition-colors`}>{label}</span>
    </button>
  );
}

function Scale({ label, value, onChange, min, max, color }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; color: string }) {
  const nums = []; for (let i = min; i <= max; i++) nums.push(i);
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-bold text-neutral-200 w-28 shrink-0">{label}</span>
      <div className="flex gap-1 flex-wrap">
        {nums.map((n) => {
          const on = value === n;
          return (
            <button key={n} type="button" onClick={() => onChange(on ? 0 : n)}
              className="w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center border transition-colors"
              style={{ borderColor: on ? color : "#3f3f46", background: on ? color : "transparent", color: on ? "#000" : "#a1a1aa" }}>
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TextField({ label, value, onChange, placeholder, wide, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; wide?: boolean; type?: string }) {
  return (
    <label className={`flex flex-col gap-1 ${wide ? "w-full" : ""}`}>
      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-neutral-600 focus:border-white/30 focus:outline-none" />
    </label>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-[#09090b] border border-white/10 rounded-2xl p-5 md:p-6">{children}</div>;
}

export default function DailyLedger({ daysSober = 0 }: { daysSober?: number }) {
  const { user } = useAuth();
  const [L, setL] = useState<Ledger>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const set = <K extends keyof Ledger>(k: K, v: Ledger[K]) => setL((s) => ({ ...s, [k]: v }));

  const dateKey = todayKey();
  const milestone = daysSober > 0 ? MILESTONES[daysSober] : undefined;

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    (async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid, "private_vault", dateKey));
        if (snap.exists() && snap.data().ledger) setL({ ...EMPTY, ...snap.data().ledger });
      } catch (e) { console.error("ledger load", e); }
      finally { setLoading(false); }
    })();
  }, [user, dateKey]);

  /* ---- VSE: the 5 paper score-metrics → the Vanguard Scoring Engine ---- */
  const vse = useMemo(() => {
    const coreIgn = L.ignWater && L.ignLight && L.ignMovement;
    const anyIgn = L.ignWater || L.ignLight || L.ignMovement || L.ignCold || L.ignStillness;
    const ignition: IgnitionAdherence = coreIgn ? "complete" : anyIgn ? "partial" : "failed";
    return computeVSEScore({
      circadianAlignment: Number(L.hoursSlept) >= 7,
      ignitionSequence: ignition,
      fellowshipSync: L.netMeeting || L.netSponsor,
      biologicalMaintenance: (L.fuelMeals || L.fuelGut) && L.ignMovement,
      structuralBoundaries: L.mirTechCurfew,
    });
  }, [L]);

  const bandColor = vse.band === "optimal" ? ENGINE : vse.band === "baseline" ? "#4ade80" : vse.band === "alert" ? AMBER : RED;

  const scoreMetrics = [
    { label: "Slept 7+ hrs", on: Number(L.hoursSlept) >= 7 },
    { label: "Morning ignition", on: vse.categoryScores.ignitionSequence > 0 },
    { label: "Meeting / call", on: L.netMeeting || L.netSponsor },
    { label: "Body cared for", on: (L.fuelMeals || L.fuelGut) && L.ignMovement },
    { label: "Tech curfew", on: L.mirTechCurfew },
  ];

  const save = async () => {
    if (!user || saving) return;
    setSaving(true);
    try {
      await setDoc(doc(db, "users", user.uid, "private_vault", dateKey), {
        date: dateKey,
        source: "ledger",
        updatedAt: serverTimestamp(),
        ledger: L,
        vse: { score: vse.score, band: vse.band },
        hardware: { sleepHours: Number(L.hoursSlept) || null },
        software: { cravingIntensity: L.craving || null, sciaticaPainLevel: L.pain || null },
      }, { merge: true });
      setSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } catch (e) { console.error("ledger save", e); }
    finally { setSaving(false); }
  };

  if (loading) {
    return <div className="h-64 flex items-center justify-center text-xs font-mono uppercase tracking-widest text-neutral-500 animate-pulse">Loading today’s ledger…</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* header: day + sober badge */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-black text-white tracking-tight">DAY {daysSober || "—"}</h2>
            <span className="text-sm font-mono text-neutral-500">· {dateKey}</span>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 mt-1">Side A · track as you go &nbsp;·&nbsp; Side B · reflect &amp; score</p>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 px-3 py-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Sober · Day {daysSober || 0}</span>
          </div>
        </div>
      </div>

      {milestone && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5">
          <Star size={15} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-100/90"><span className="font-black text-amber-400 uppercase tracking-wide">Milestone · </span>{milestone}</p>
        </div>
      )}

      {/* ============ SIDE A ============ */}
      <Card>
        <Banner icon={HeartPulse} title="The Engine" sub="Body · do it, then tick it" color={ENGINE} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <TextField label="Bedtime" value={L.bedtime} onChange={(v) => set("bedtime", v)} />
          <TextField label="Woke" value={L.woke} onChange={(v) => set("woke", v)} />
          <TextField label="Hours slept" type="number" value={L.hoursSlept} onChange={(v) => set("hoursSlept", v)} />
          <TextField label="Wake-ups" type="number" value={L.wakeUps} onChange={(v) => set("wakeUps", v)} />
        </div>
        <div className="mb-4"><Scale label="Sleep quality" value={L.sleepQuality} onChange={(v) => set("sleepQuality", v)} min={1} max={10} color={ENGINE} /></div>
        <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1.5"><Sun size={13} /> Morning ignition</p>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-0.5 mb-4">
          <Toggle checked={L.ignWater} onChange={(v) => set("ignWater", v)} label="Water first thing" color={ENGINE} />
          <Toggle checked={L.ignLight} onChange={(v) => set("ignLight", v)} label="Morning light / outside" color={ENGINE} />
          <Toggle checked={L.ignMovement} onChange={(v) => set("ignMovement", v)} label="Movement (walk / lift)" color={ENGINE} />
          <Toggle checked={L.ignCold} onChange={(v) => set("ignCold", v)} label="Cold or contrast (optional)" color={ENGINE} />
          <Toggle checked={L.ignStillness} onChange={(v) => set("ignStillness", v)} label="Stillness (breath / prayer)" color={ENGINE} />
        </div>
        <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">Fuel &amp; body</p>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-0.5 mb-4">
          <Toggle checked={L.fuelMeals} onChange={(v) => set("fuelMeals", v)} label="Ate real meals" color={ENGINE} />
          <Toggle checked={L.fuelGut} onChange={(v) => set("fuelGut", v)} label="Gut-support food" color={ENGINE} />
          <Toggle checked={L.fuelHydrated} onChange={(v) => set("fuelHydrated", v)} label="Hydrated all day" color={ENGINE} />
          <Toggle checked={L.fuelNoPainkillers} onChange={(v) => set("fuelNoPainkillers", v)} label="No liver-taxing painkillers" color={ENGINE} />
        </div>
        <div className="flex flex-col gap-3">
          <TextField label="Any pain today? where" wide value={L.painWhere} onChange={(v) => set("painWhere", v)} placeholder="back, hip, head…" />
          <Scale label="Pain (0 = none)" value={L.pain} onChange={(v) => set("pain", v)} min={0} max={10} color={ENGINE} />
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <Banner icon={Users} title="The Network" sub="People · reach out" color={NETWORK} />
          <div className="grid gap-0.5">
            <Toggle checked={L.netMeeting} onChange={(v) => set("netMeeting", v)} label="Went to a meeting" color={NETWORK} />
            <Toggle checked={L.netSponsor} onChange={(v) => set("netSponsor", v)} label="Called sponsor / peer" color={NETWORK} />
            <Toggle checked={L.netService} onChange={(v) => set("netService", v)} label="Did a small service" color={NETWORK} />
            <Toggle checked={L.netAskedHelp} onChange={(v) => set("netAskedHelp", v)} label="Asked for help" color={NETWORK} />
          </div>
        </Card>
        <Card>
          <Banner icon={Eye} title="The Mirror" sub="Spirit · get honest" color={MIRROR} />
          <div className="grid gap-0.5 mb-4">
            <Toggle checked={L.mirStillness} onChange={(v) => set("mirStillness", v)} label="Stillness / prayer" color={MIRROR} />
            <Toggle checked={L.mirSurrender} onChange={(v) => set("mirSurrender", v)} label="Surrendered what I can't control" color={MIRROR} />
            <Toggle checked={L.mirEgoCheck} onChange={(v) => set("mirEgoCheck", v)} label="Ego check — did not force it" color={MIRROR} />
            <Toggle checked={L.mirTechCurfew} onChange={(v) => set("mirTechCurfew", v)} label="Evening tech curfew" color={MIRROR} />
          </div>
          <Scale label="Clarity today" value={L.clarity} onChange={(v) => set("clarity", v)} min={1} max={10} color={MIRROR} />
        </Card>
      </div>

      {/* ============ SIDE B ============ */}
      <div className="flex items-center gap-3 mt-2">
        <Moon size={16} className="text-purple-400" />
        <h3 className="text-xl font-black text-white">Tonight <span className="text-neutral-500 font-mono text-sm">· Side B — reflect &amp; score</span></h3>
      </div>

      <Card>
        <Banner icon={MessageSquare} title="Meeting & Connection" sub="Who you saw / reached" color={NETWORK} />
        <div className="mb-4"><Toggle checked={L.wentToMeeting} onChange={(v) => set("wentToMeeting", v)} label="I went to a meeting today" color={NETWORK} /></div>
        <div className="grid md:grid-cols-3 gap-3 mb-4">
          <TextField label="Date / time" value={L.meetingWhen} onChange={(v) => set("meetingWhen", v)} />
          <TextField label="Location / group" value={L.meetingWhere} onChange={(v) => set("meetingWhere", v)} />
          <TextField label="Speaker or topic" value={L.meetingTopic} onChange={(v) => set("meetingTopic", v)} />
        </div>
        <TextField label="Who I connected with (calls, texts, service)" wide value={L.connectedWith} onChange={(v) => set("connectedWith", v)} />
      </Card>

      <Card>
        <Banner icon={Activity} title="Feelings & Awareness" sub="How today actually felt" color={MIRROR} />
        <div className="flex flex-col gap-3 mb-4">
          <Scale label="Mood" value={L.mood} onChange={(v) => set("mood", v)} min={1} max={10} color={MIRROR} />
          <Scale label="Craving" value={L.craving} onChange={(v) => set("craving", v)} min={0} max={10} color={AMBER} />
        </div>
        <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">H.A.L.T. — am I…</p>
        <div className="flex flex-wrap gap-x-8 gap-y-1">
          <Toggle checked={L.haltHungry} onChange={(v) => set("haltHungry", v)} label="Hungry" color={MIRROR} />
          <Toggle checked={L.haltAngry} onChange={(v) => set("haltAngry", v)} label="Angry" color={MIRROR} />
          <Toggle checked={L.haltLonely} onChange={(v) => set("haltLonely", v)} label="Lonely" color={MIRROR} />
          <Toggle checked={L.haltTired} onChange={(v) => set("haltTired", v)} label="Tired" color={MIRROR} />
        </div>
      </Card>

      <Card>
        <Banner icon={PenLine} title="Reflect" sub="Land it on paper" color={ENGINE} />
        <label className="flex flex-col gap-1 mb-4">
          <span className="text-sm font-bold text-neutral-200">What held the line today?</span>
          <textarea value={L.heldLine} onChange={(e) => set("heldLine", e.target.value)} rows={2}
            className="bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-white/30 focus:outline-none resize-none" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-bold text-neutral-200">Grateful for…</span>
          <textarea value={L.gratefulFor} onChange={(e) => set("gratefulFor", e.target.value)} rows={2}
            className="bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-white/30 focus:outline-none resize-none" />
        </label>
      </Card>

      {/* Today's score → VSE */}
      <Card>
        <Banner icon={Gauge} title="Today's Score" sub="Auto-filled from your check-in" color={AMBER} />
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
          {scoreMetrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center text-center gap-1.5">
              <span className="w-11 h-11 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: m.on ? ENGINE : "#3f3f46", background: m.on ? `${ENGINE}22` : "transparent" }}>
                {m.on ? <Check size={18} style={{ color: ENGINE }} strokeWidth={3} /> : <span className="text-neutral-600 text-xs">2</span>}
              </span>
              <span className="text-[10px] font-bold text-neutral-300 leading-tight">{m.label}</span>
              <span className="text-[9px] text-neutral-600">2 pts</span>
            </div>
          ))}
        </div>
        {/* gauge */}
        <div className="flex items-center gap-4">
          <div className="text-4xl font-black" style={{ color: bandColor }}>{vse.score}<span className="text-lg text-neutral-600">/10</span></div>
          <div className="flex-1">
            <div className="h-3 rounded-full bg-[#0a0a0a] overflow-hidden border border-white/10">
              <div className="h-full rounded-full transition-all" style={{ width: `${vse.score * 10}%`, background: bandColor }} />
            </div>
            <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest text-neutral-500 mt-1">
              <span>Redline &lt;5</span><span>Alert 5–6</span><span>Stable 7–8</span><span>Optimal 9–10</span>
            </div>
          </div>
        </div>
        <p className="text-xs mt-3" style={{ color: bandColor }}>{vse.bandLabel}</p>
      </Card>

      {/* save */}
      <div className="flex items-center gap-4 pb-4">
        <button type="button" onClick={save} disabled={saving || !user}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black text-sm font-black uppercase tracking-widest px-6 py-3 transition-colors">
          <Save size={16} /> {saving ? "Saving…" : "Save today’s ledger"}
        </button>
        {savedAt && <span className="text-xs font-mono text-emerald-400">Saved at {savedAt} · syncs to your trend chart</span>}
        {!user && <span className="text-xs font-mono text-neutral-500">Sign in to save.</span>}
      </div>
    </div>
  );
}
