"use client";

// 90 R&R seat reservation + intake. Google sign-in → 5 quick icon questions →
// first name / area → optional deposit. Answers are saved to the signed-in
// user's own Firestore doc (users/{uid}.rrReservation), which the existing
// security rules already allow — so no rules change is needed. Joining is never
// blocked on payment: the deposit is optional and can be paid later.

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import {
  LogIn, MapPin, Compass, Shield, Anchor, Navigation, Wine, Pill, Zap, HelpCircle,
  Sprout, Users, ShieldCheck, MessageSquare, UserCheck, Search, Ghost, BedDouble,
  Flame, Briefcase, CheckCircle2, Rocket, type LucideIcon,
} from "lucide-react";
import { RESERVATION, buildDepositUrl } from "@/data/rrFellowship";

interface Opt { id: string; icon: LucideIcon; text: string; }
interface Q { id: string; title: string; options: Opt[]; }

const QUESTIONS: Q[] = [
  {
    id: "recovery_stage", title: "Where are you in recovery?",
    options: [
      { id: "just_deciding", icon: Compass, text: "Just deciding" },
      { id: "first_90_days", icon: Shield, text: "First 90 days" },
      { id: "3_12_months", icon: Anchor, text: "3–12 months" },
      { id: "a_year_plus", icon: Navigation, text: "A year or more" },
    ],
  },
  {
    id: "struggle", title: "What are you up against?",
    options: [
      { id: "alcohol", icon: Wine, text: "Alcohol" },
      { id: "opioids_pills", icon: Pill, text: "Opioids / pills" },
      { id: "stimulants", icon: Zap, text: "Stimulants" },
      { id: "other_multiple", icon: HelpCircle, text: "Other / a few" },
    ],
  },
  {
    id: "program", title: "In a program right now?",
    options: [
      { id: "not_yet", icon: Sprout, text: "Not yet" },
      { id: "aa_na", icon: Users, text: "AA / NA" },
      { id: "clinical", icon: ShieldCheck, text: "Rehab / outpatient" },
      { id: "therapy", icon: MessageSquare, text: "Therapy" },
    ],
  },
  {
    id: "sponsor", title: "Do you have a sponsor?",
    options: [
      { id: "yes", icon: UserCheck, text: "Yes" },
      { id: "not_yet", icon: Ghost, text: "Not yet" },
      { id: "looking", icon: Search, text: "Looking" },
      { id: "unsure", icon: HelpCircle, text: "What's that?" },
    ],
  },
  {
    id: "challenge", title: "Biggest challenge right now?",
    options: [
      { id: "sleep_body", icon: BedDouble, text: "Sleep & body" },
      { id: "cravings", icon: Flame, text: "Cravings" },
      { id: "feeling_alone", icon: Ghost, text: "Feeling alone" },
      { id: "stress_work", icon: Briefcase, text: "Stress & work" },
    ],
  },
];

const ACCENTS = [
  { border: "border-[#00f0ff]/30", sel: "bg-[#00f0ff]/20 border-[#00f0ff]", text: "text-[#00f0ff]", hover: "hover:bg-[#00f0ff]/10" },
  { border: "border-[#10b981]/30", sel: "bg-[#10b981]/20 border-[#10b981]", text: "text-[#10b981]", hover: "hover:bg-[#10b981]/10" },
  { border: "border-[#f59e0b]/30", sel: "bg-[#f59e0b]/20 border-[#f59e0b]", text: "text-[#f59e0b]", hover: "hover:bg-[#f59e0b]/10" },
  { border: "border-[#a855f7]/30", sel: "bg-[#a855f7]/20 border-[#a855f7]", text: "text-[#a855f7]", hover: "hover:bg-[#a855f7]/10" },
];

export default function ReserveFlow() {
  const { user, loading, login } = useAuth();
  const seatsOpen = RESERVATION.seatsTotal - RESERVATION.seatsClaimed;

  const [checking, setChecking] = useState(true);
  const [reserved, setReserved] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [firstName, setFirstName] = useState("");
  const [area, setArea] = useState("");
  const [amount, setAmount] = useState<number>(RESERVATION.suggestedDeposit);
  const [saving, setSaving] = useState(false);
  const [noteSaved, setNoteSaved] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!user) { setChecking(false); return; }
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const data = snap.exists() ? snap.data() : null;
        if (active && data && (data as Record<string, unknown>).rrReservation) setReserved(true);
      } catch { /* ignore — treat as not reserved */ }
      if (active) setChecking(false);
    })();
    return () => { active = false; };
  }, [user]);

  const pickOption = (qid: string, oid: string) => {
    setAnswers((p) => ({ ...p, [qid]: oid }));
    setTimeout(() => setStep((s) => s + 1), 260);
  };

  const submit = async () => {
    if (!user || saving) return;
    setSaving(true);
    try {
      await setDoc(doc(db, "users", user.uid), {
        rrReservation: {
          ...answers,
          firstName: firstName || user.displayName || "",
          area,
          email: user.email || "",
          displayName: user.displayName || "",
          depositIntent: amount,
          depositStatus: "unpaid",
          status: "reserved",
          createdAt: new Date().toISOString(),
        },
      }, { merge: true });
      setReserved(true);
    } catch (e) {
      console.error("Failed to save reservation", e);
    }
    setSaving(false);
  };

  const markPayLater = async () => {
    if (!user) return;
    setNoteSaved("later");
    try {
      await setDoc(doc(db, "users", user.uid), {
        rrReservation: { depositStatus: "later" },
      }, { merge: true });
    } catch (e) {
      console.error("Failed to save pay-later note", e);
    }
  };

  const SeatDots = () => (
    <div className="mb-8 flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 flex-wrap justify-center max-w-xs">
        {Array.from({ length: RESERVATION.seatsTotal }).map((_, i) => (
          <span key={i} className={`w-4 h-4 rounded-full ${i < seatsOpen ? "bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "bg-white/10"}`} />
        ))}
      </div>
      <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
        <span className="text-[#10b981] font-bold">{seatsOpen} of {RESERVATION.seatsTotal}</span> seats open · Mid-August 2026
      </p>
    </div>
  );

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <section id="reserve" className="scroll-mt-24 max-w-3xl mx-auto w-full pb-12 relative z-10">
      <div className="bg-[#09090b] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#10b981] via-[#f59e0b] to-[#10b981]" />
        <div className="mb-8 text-center flex flex-col gap-3">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">Reserve Your Seat</h2>
        </div>
        <SeatDots />
        {children}
      </div>
    </section>
  );

  if (loading || checking) {
    return <Shell><p className="text-center text-neutral-500 font-mono text-xs uppercase tracking-widest animate-pulse">Loading…</p></Shell>;
  }

  if (!user) {
    return (
      <Shell>
        <p className="text-neutral-400 text-sm leading-relaxed max-w-lg mx-auto text-center mb-8">
          Hold one of the {RESERVATION.seatsTotal} seats. Sign in first so we know who you are — then answer five quick taps to hold your seat. A deposit is <span className="text-white font-bold">optional</span> — pay now, later, or whatever you can. Use a pseudonym if you prefer; we honor anonymity.
        </p>
        <div className="flex justify-center">
          <button onClick={login} className="px-10 py-5 bg-white hover:bg-neutral-200 text-black font-black text-base uppercase tracking-widest rounded-2xl transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center gap-3">
            <LogIn size={20} /> Sign in with Google
          </button>
        </div>
        <p className="mt-6 text-center text-[11px] font-mono text-neutral-600 uppercase tracking-widest">Signing in just saves your seat &amp; answers to your private profile.</p>
      </Shell>
    );
  }

  if (reserved) {
    return (
      <Shell>
        <div className="flex flex-col items-center text-center gap-5">
          <CheckCircle2 size={64} className="text-[#10b981]" />
          <h3 className="text-2xl font-black uppercase tracking-tight text-white">You&apos;re in. Seat held.</h3>
          <p className="text-neutral-400 text-sm max-w-md leading-relaxed">
            Your intake is saved and your seat is held — <span className="text-white font-bold">no payment needed to join</span>. A deposit is optional and just helps fund the cohort: <span className="text-white font-bold">${RESERVATION.suggestedDeposit}</span> suggested, or pay whatever you can, whenever you can. No one is turned away for lack of funds.
          </p>
          <div className="flex gap-3 justify-center flex-wrap my-2">
            {RESERVATION.quickAmounts.map((amt) => (
              <button key={amt} onClick={() => setAmount(amt)}
                className={`px-6 py-3 rounded-xl font-black text-lg border transition-all ${amount === amt ? "bg-[#10b981] text-black border-[#10b981]" : "bg-white/5 text-white border-white/10 hover:border-[#10b981]/50"}`}>
                ${amt}
              </button>
            ))}
          </div>
          <a href={buildDepositUrl(amount)} target="_blank" rel="noopener noreferrer"
            className="px-12 py-5 bg-[#10b981] hover:bg-[#059669] text-black font-black text-lg uppercase tracking-widest rounded-2xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center gap-3">
            <Rocket size={20} /> Deposit ${amount} via Venmo <span className="text-black/60 font-bold normal-case tracking-normal">(optional)</span>
          </a>
          {noteSaved === "later" ? (
            <p className="text-sm text-[#10b981] font-bold">Got it — your seat&apos;s held. You can deposit anytime from this page.</p>
          ) : (
            <button onClick={markPayLater} className="text-xs font-mono text-neutral-400 hover:text-white underline underline-offset-4 uppercase tracking-widest">
              I&apos;ll pay later →
            </button>
          )}
          <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">We&apos;ll email your cohort details before the mid-August kickoff.</p>
        </div>
      </Shell>
    );
  }

  if (step >= QUESTIONS.length) {
    return (
      <Shell>
        <p className="text-center text-xs font-mono uppercase tracking-widest text-[#10b981] mb-6">Last step · who to reach</p>
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black text-neutral-500 uppercase tracking-widest">First name or handle</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="What do we call you?"
              className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-neutral-700 focus:outline-none focus:border-[#10b981]/50" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black text-neutral-500 uppercase tracking-widest flex items-center gap-1.5"><MapPin size={12} /> Your area (city / state)</label>
            <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="e.g. Houston, TX"
              className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-neutral-700 focus:outline-none focus:border-[#10b981]/50" />
          </div>
          <button onClick={submit} disabled={saving}
            className="mt-3 w-full py-5 bg-[#10b981] hover:bg-[#059669] text-black font-black uppercase tracking-widest text-sm rounded-2xl transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            {saving ? "Saving…" : "Hold my seat →"}
          </button>
          <button onClick={() => setStep(QUESTIONS.length - 1)} className="text-[11px] font-mono text-neutral-600 hover:text-white uppercase tracking-widest">← Back</button>
        </div>
      </Shell>
    );
  }

  const q = QUESTIONS[step];
  return (
    <Shell>
      <div className="mb-6">
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#10b981] to-[#f59e0b] transition-all" style={{ width: `${(step / QUESTIONS.length) * 100}%` }} />
        </div>
        <p className="text-center text-[11px] font-mono uppercase tracking-widest text-neutral-500 mt-3">Question {step + 1} of {QUESTIONS.length}</p>
      </div>
      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white text-center mb-7 leading-tight">{q.title}</h3>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto">
        {q.options.map((o, i) => {
          const Icon = o.icon; const a = ACCENTS[i % 4]; const isSel = answers[q.id] === o.id;
          return (
            <button key={o.id} onClick={() => pickOption(q.id, o.id)}
              className={`flex flex-col items-center justify-center text-center gap-3 p-5 sm:p-7 min-h-[130px] rounded-2xl border transition-all shadow-lg ${isSel ? `${a.sel} scale-95` : `bg-[#050505] ${a.border} ${a.hover}`}`}>
              <Icon size={34} className={isSel ? a.text : "text-neutral-400"} />
              <span className={`text-sm sm:text-base font-bold uppercase tracking-wider leading-tight ${isSel ? a.text : "text-neutral-200"}`}>{o.text}</span>
            </button>
          );
        })}
      </div>
      {step > 0 && (
        <div className="text-center mt-6">
          <button onClick={() => setStep((s) => s - 1)} className="text-[11px] font-mono text-neutral-600 hover:text-white uppercase tracking-widest">← Back</button>
        </div>
      )}
    </Shell>
  );
}
