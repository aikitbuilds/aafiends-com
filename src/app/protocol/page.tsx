import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  Footprints, Moon, Apple, Wind, ShieldCheck, ShieldAlert, ArrowRight, Flame,
  type LucideIcon,
} from "lucide-react";

// The BIO 12 — the four-pillar daily protocol (Movement / Sleep / Nutrition /
// Breath), 3 imperatives each = 12 daily "firewall" checks. This public page is
// the canonical reference; the interactive tracker lives in the member
// dashboard (Bio12Tab).

type PillarDef = {
  name: string;
  sub: string;
  icon: LucideIcon;
  color: string;
  why: string;
  items: { label: string; note: string }[];
};

const PILLARS: PillarDef[] = [
  {
    name: "Movement",
    sub: "Imperatives 1–3",
    icon: Footprints,
    color: "#f97316",
    why: "A clean dopamine and adrenaline lift you earned — teaching the brain to feel good without a substance.",
    items: [
      { label: "Get outside / walk (20+ min)", note: "Outdoor light plus movement sets the body clock and gives the brain a clean dopamine bump it didn't have to steal." },
      { label: "Strength or mobility work", note: "Load the body on purpose. Rebuilding physical capacity is the most concrete daily proof that the engine is healing." },
      { label: "Cold plunge or contrast shower", note: "A brisk, earned adrenaline spike — voluntary discomfort that resets the stress response instead of feeding it." },
    ],
  },
  {
    name: "Sleep",
    sub: "Imperatives 4–6",
    icon: Moon,
    color: "#3b82f6",
    why: "Deep sleep clears metabolic waste and rebuilds GABA — less craving, less anxiety, less fog.",
    items: [
      { label: "7+ hours last night", note: "Duration matters. A short night downregulates the same dopamine receptors the addiction did." },
      { label: "Screen curfew (9 PM)", note: "Blue light and doomscrolling push melatonin back and hand the evening to the AIV's favorite hunting hours." },
      { label: "Consistent wake time", note: "The regularity matters as much as the total hours — a stable wake time anchors the entire circadian repair job." },
    ],
  },
  {
    name: "Nutrition",
    sub: "Imperatives 7–9",
    icon: Apple,
    color: "#10b981",
    why: "Up to ~90% of serotonin is made in the gut. Rebuilding the microbiome restores calm, steady mood.",
    items: [
      { label: "Hydrate (8+ cups)", note: "Dehydration reads as fatigue, headache, and irritability — all of which the virus is happy to blame on sobriety." },
      { label: "Protein + whole foods", note: "Steady fuel instead of sugar spikes. Amino acids are the raw material for the neurotransmitters you're rebuilding." },
      { label: "Omega-3 / fermented (gut)", note: "Feed the gut that feeds your mood. Fermented food and omega-3s are the cheapest mood stabilizers available." },
    ],
  },
  {
    name: "Breath",
    sub: "Imperatives 10–12",
    icon: Wind,
    color: "#06b6d4",
    why: "Handing over what you cannot control shifts you out of fight-or-flight, lowering the cortisol that drives the loop.",
    items: [
      { label: "NSDR / breathwork session", note: "Non-sleep deep rest pays back part of the sleep debt and downshifts the nervous system on demand." },
      { label: "5-min meditation", note: "The Mirror pillar in practice — five minutes of stillness that keeps you connected instead of self-driven." },
      { label: "Box-breathe a craving down", note: "Four counts in, hold, out, hold. A craving is a wave; controlled breath is how you stay standing while it passes." },
    ],
  },
];

const THREAT_LEVELS = [
  { range: "12 of 12", label: "MINIMAL", color: "#34d399", note: "Firewall at full strength. The AIV has nothing to feed on today." },
  { range: "10–11", label: "LOW", color: "#2dd4bf", note: "Defenses solid — close out the last couple." },
  { range: "7–9", label: "GUARDED", color: "#fbbf24", note: "Holding, but there are gaps in the wall." },
  { range: "4–6", label: "ELEVATED", color: "#fb923c", note: "Exposure rising. Knock out a few more." },
  { range: "0–3", label: "CRITICAL", color: "#f87171", note: "Firewall down — this is exactly where the virus thrives." },
];

export default function Bio12ProtocolPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden">
      <SiteHeader />

      <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-20 flex flex-col gap-20 relative z-10">
        {/* Header */}
        <section className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-xs text-[#10b981] font-mono uppercase tracking-widest font-bold">
            <ShieldCheck size={14} /> The Daily Firewall
          </span>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white">
            The BIO 12 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#06b6d4]">Protocol</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed font-medium">
            The 12 biological imperatives that protect your baseline — four pillars, three actions each, checked off
            every single day. Before the mind can hold a spiritual idea, the nervous system has to stop screaming.
            This is how you quiet it.
          </p>
          <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">
            The BIO 12 is the biology leg of the{" "}
            <Link href="/framework" className="text-[#10b981] font-bold hover:text-emerald-300 underline underline-offset-4">
              framework
            </Link>{" "}
            and the daily engine of the{" "}
            <Link href="/90rr" className="text-[#10b981] font-bold hover:text-emerald-300 underline underline-offset-4">
              90 R&amp;R journal
            </Link>
            .
          </p>
        </section>

        {/* The 12, by pillar */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">The 12 Imperatives</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              Four Pillars. Three Actions Each.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((p, pi) => {
              const Icon = p.icon;
              return (
                <div key={p.name} className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col">
                  <div className="px-6 py-5 flex items-center justify-between" style={{ backgroundColor: `${p.color}1a`, borderBottom: `1px solid ${p.color}40` }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-black" style={{ backgroundColor: p.color }}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-white font-black uppercase tracking-tight text-lg leading-none">{p.name}</h3>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: p.color }}>{p.sub}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <p className="text-sm text-neutral-400 leading-relaxed italic border-l-2 pl-4" style={{ borderColor: p.color }}>
                      {p.why}
                    </p>
                    {p.items.map((item, i) => (
                      <div key={item.label} className="flex gap-4">
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shrink-0 mt-0.5 text-black"
                          style={{ backgroundColor: p.color }}
                        >
                          {pi * 3 + i + 1}
                        </span>
                        <div>
                          <p className="text-white font-bold text-sm">{item.label}</p>
                          <p className="text-neutral-400 text-sm leading-relaxed">{item.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Threat levels */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">Scoring</span>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              Your Threat Level
            </h2>
            <p className="text-neutral-300 leading-relaxed max-w-3xl mt-2">
              Count how many of the 12 you completed today. The score isn&apos;t a grade — it&apos;s a weather report
              on how exposed you are to the virus right now. Ten or better keeps the streak alive.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {THREAT_LEVELS.map((t) => (
              <div key={t.label} className="flex items-center gap-4 bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 flex-wrap sm:flex-nowrap">
                {t.label === "MINIMAL" || t.label === "LOW" ? (
                  <ShieldCheck size={22} style={{ color: t.color }} className="shrink-0" />
                ) : (
                  <ShieldAlert size={22} style={{ color: t.color }} className="shrink-0" />
                )}
                <span className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest w-16 shrink-0">{t.range}</span>
                <span className="font-black uppercase tracking-tight w-28 shrink-0" style={{ color: t.color }}>{t.label}</span>
                <span className="text-sm text-neutral-400 leading-relaxed">{t.note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0a140f] border border-[#10b981]/30 rounded-[2rem] p-8 md:p-12 flex flex-col items-center text-center gap-5">
          <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#f59e0b] uppercase tracking-widest bg-[#f59e0b]/10 px-3 py-1 rounded-full border border-[#f59e0b]/30">
            <Flame size={14} /> Streak rule: 10 of 12 keeps the flame
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            Track the 12, every day
          </h2>
          <p className="text-neutral-300 max-w-2xl leading-relaxed">
            The printable journal carries the BIO 12 on paper; the member dashboard tracks it with a live threat level
            and streak. Same 12 checks either way — pick your weapon.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/90rr"
              className="py-4 px-8 rounded-2xl bg-[#10b981] hover:bg-[#059669] text-black text-sm font-black tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2"
            >
              Get the free journal <ArrowRight size={16} />
            </Link>
            <Link
              href="/dashboard"
              className="py-4 px-8 rounded-2xl border border-white/15 text-white text-sm font-bold tracking-widest uppercase hover:border-[#10b981]/50 hover:text-[#10b981] transition-all"
            >
              Open the dashboard tracker
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
