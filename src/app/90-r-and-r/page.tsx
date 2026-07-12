"use client";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown, ShieldCheck, Lock, EyeOff, PhoneCall, ArrowRight, Check,
  Flame, Rocket, RefreshCw, Crosshair, Home, Zap, Users,
  CalendarCheck, Activity, Gauge, BookOpen, Sparkles, UserCheck, Radio, HeartPulse,
  type LucideIcon,
} from "lucide-react";
import {
  RR_META, WHO_ITS_FOR, BOOTCAMP, PHASES, PILLARS, DELIVERABLES, SAFETY,
  RESERVATION,
} from "@/data/rrFellowship";
import ReserveFlow from "@/components/rr/ReserveFlow";

const ICONS: Record<string, LucideIcon> = {
  Flame, Rocket, RefreshCw, Crosshair, Home, Zap, Users, CalendarCheck,
  Activity, Gauge, BookOpen, Sparkles, UserCheck, Radio, Lock, ShieldCheck,
  PhoneCall, EyeOff, HeartPulse,
};

export default function RRFellowshipPage() {
  const [openPhase, setOpenPhase] = useState<number | null>(0);
  const togglePhase = (i: number) => setOpenPhase(openPhase === i ? null : i);

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_60%)] pointer-events-none z-0"></div>

      <SiteHeader />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-16 md:py-24 flex flex-col gap-28 relative z-20">
        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-12 items-center min-h-[64vh] pt-8 relative">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-start gap-6 text-left">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-xs text-[#10b981] font-mono uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              {RESERVATION.seatsTotal} Seats · {RR_META.startLabel}
            </span>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              90 Days to <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#f59e0b]">Rebuild.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed font-medium">
              The <span className="text-[#10b981] font-bold">Recovery &amp; Restructure</span> Fellowship — a biology-first cohort for the first, hardest 90 days. One <span className="text-[#f59e0b] font-bold">1-day intensive bootcamp</span> to launch, then daily telemetry that proves your baseline is healing.
            </p>
            <p className="text-sm md:text-base text-neutral-500 max-w-xl font-mono uppercase tracking-widest">
              {RR_META.tagline} · 12 seats · Starts together, finishes together.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link href="#reserve">
                <button className="py-4 px-10 rounded-2xl bg-[#10b981] hover:bg-[#059669] text-black text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]">
                  <Rocket size={20} /> Reserve Your Seat
                </button>
              </Link>
              <Link href="#blueprint">
                <button className="py-4 px-10 rounded-2xl border border-white/15 text-white text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:border-[#10b981]/50 hover:text-[#10b981] flex items-center justify-center gap-3">
                  See the 90 Days
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="relative w-full aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(16,185,129,0.15)] group">
            <Image src="/recovery_hero_hope.png" alt="90 Days Recovery & Restructure" fill className="object-cover object-[center_20%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-white font-black text-2xl uppercase tracking-widest">Day 90: The Clearance</h3>
              <div className="flex items-center gap-2 mt-2 text-sm font-bold text-[#10b981]">
                <Activity size={16} /> Baseline Bulletproofed
              </div>
            </div>
          </motion.div>
        </section>

        {/* The two R's */}
        <section className="grid md:grid-cols-2 gap-6 md:gap-8">
          {RR_META.missions.map((c) => (
            <div key={c.tag} className="rounded-3xl border border-white/10 bg-[#09090b] shadow-xl p-8">
              <span className="font-mono font-bold mb-3 block text-sm uppercase tracking-widest" style={{ color: c.color }}>{c.tag}</span>
              <p className="text-xl leading-relaxed text-neutral-300 font-medium">{c.text}</p>
            </div>
          ))}
        </section>

        {/* Who it's for */}
        <section className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">Who It Is For</h2>
            <p className="text-neutral-400 font-mono uppercase tracking-widest">Built for the trench — traditional or tactical.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {WHO_ITS_FOR.map((w) => {
              const Icon = ICONS[w.icon];
              return (
                <div key={w.title} className="bg-[#09090b] border border-white/10 rounded-[2rem] p-8 flex flex-col gap-4 shadow-xl hover:-translate-y-1 transition-all" style={{ boxShadow: `0 0 30px ${w.color}0d` }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${w.color}1a`, color: w.color }}>
                    {Icon && <Icon size={26} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{w.title}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: w.color }}>{w.sub}</p>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">{w.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* The 1-Day Bootcamp */}
        <section className="relative">
          <div className="w-full bg-gradient-to-br from-[#09090b] to-[#1a1206] border border-[#f59e0b]/30 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_40px_rgba(245,158,11,0.08)] flex flex-col gap-8">
            <div className="flex flex-col gap-4 max-w-3xl">
              <span className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-xs text-[#f59e0b] font-mono uppercase tracking-widest font-bold">
                <Crosshair size={14} /> {BOOTCAMP.label}
              </span>
              <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">{BOOTCAMP.title}</h2>
              <p className="text-neutral-300 text-base md:text-lg leading-relaxed">{BOOTCAMP.intro}</p>
            </div>
            <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-[#f59e0b]/20">
              <Image src="/baptism_by_sweat.png" alt="The one-day bootcamp intensive" fill className="object-cover object-[center_35%]" sizes="(max-width: 768px) 100vw, 900px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1206] via-transparent to-transparent" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {BOOTCAMP.agenda.map((a, i) => {
                const Icon = ICONS[a.icon];
                return (
                  <div key={a.title} className="flex gap-4 bg-[#050505]/60 border border-white/10 rounded-2xl p-6">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/30 flex items-center justify-center text-[#f59e0b]">
                      {Icon && <Icon size={20} />}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-white font-black uppercase tracking-wide text-sm flex items-center gap-2">
                        <span className="text-[#f59e0b]/50 font-mono">{String(i + 1).padStart(2, "0")}</span> {a.title}
                      </h4>
                      <p className="text-neutral-400 text-sm leading-relaxed">{a.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* The 90-Day Blueprint */}
        <section id="blueprint" className="scroll-mt-24 flex flex-col gap-10">
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">The 90-Day Blueprint</h2>
            <p className="text-neutral-400 font-mono uppercase tracking-widest">Three phases, mapped to your biochemistry.</p>
          </div>
          <div className="relative max-w-4xl mx-auto w-full aspect-[16/8] rounded-2xl overflow-hidden border border-white/10">
            <Image src="/dopamine_receptors_infographic.png" alt="How the brain rebuilds its dopamine receptors over 90 days" fill className="object-cover" sizes="(max-width: 768px) 100vw, 900px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </div>
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-4">
            {PHASES.map((phase, index) => (
              <div key={index} className="bg-[#09090b] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
                <button onClick={() => togglePhase(index)} className="w-full flex items-center justify-between p-6 md:p-7 bg-white/5 hover:bg-white/10 transition-colors text-left">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">{phase.title}</h3>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#10b981]">{phase.window}</span>
                  </div>
                  <ChevronDown className={`text-white transition-transform duration-300 flex-shrink-0 ml-4 ${openPhase === index ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openPhase === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="p-6 md:p-7 pt-0 border-t border-white/5 flex flex-col gap-5 mt-6">
                        <div className="bg-[#10b981]/10 border-l-4 border-[#10b981] p-4 rounded-r-lg">
                          <p className="text-[#10b981] font-mono text-xs uppercase tracking-widest font-bold mb-1">Goal</p>
                          <p className="text-neutral-200 font-medium">{phase.goal}</p>
                        </div>
                        <div className="flex flex-col gap-4">
                          {phase.items.map((item, sIdx) => (
                            <div key={sIdx} className="flex gap-3">
                              <Check size={16} className="text-[#f59e0b] mt-1 shrink-0" />
                              <div className="flex flex-col gap-0.5">
                                <h4 className="text-white font-bold tracking-wide text-sm">{item.title}</h4>
                                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* The Three Pillars */}
        <section className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">Three Pillars</h2>
            <p className="text-neutral-400 font-mono uppercase tracking-widest">The Engine. The Network. The Mirror.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <div key={p.name} className="bg-[#09090b] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col shadow-xl">
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent"></div>
                </div>
                <div className="p-7 flex flex-col gap-3">
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{p.name}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: p.color }}>{p.sub}</p>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What you get */}
        <section className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">What You Get · 90 Days</h2>
            <p className="text-neutral-400 font-mono uppercase tracking-widest">The full kit — the day you sit down.</p>
          </div>
          <div className="relative max-w-3xl mx-auto w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <Image src="/90rr/preview-daily.png" alt="The printable 90 R&R journal page you fill in each day" fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 720px" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DELIVERABLES.map((d) => {
              const Icon = ICONS[d.icon];
              return (
                <div key={d.title} className="bg-[#09090b] border border-white/10 rounded-3xl p-6 flex flex-col gap-3 hover:border-[#10b981]/40 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-center text-[#10b981]">
                    {Icon && <Icon size={20} />}
                  </div>
                  <h3 className="text-white font-black uppercase tracking-tight text-sm">{d.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{d.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Program specs band */}
        <section>
          <div className="w-full bg-gradient-to-br from-[#09090b] to-[#051024] border border-white/10 rounded-[2rem] p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-[0_0_40px_rgba(16,185,129,0.05)]">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest font-bold">Kickoff</p>
              <p className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">{RR_META.startLabel}</p>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Exact date shared with your cohort</p>
            </div>
            <div className="flex flex-col gap-2 text-center md:text-left">
              <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest font-bold">Format</p>
              <p className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">1-Day Bootcamp<span className="text-neutral-400 text-sm block">+ 90-day cohort</span></p>
            </div>
            <div className="flex flex-col gap-2 text-center md:text-left">
              <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest font-bold">Seats</p>
              <p className="text-xl md:text-2xl font-black text-[#f59e0b] uppercase tracking-tight">{RESERVATION.seatsTotal} Only</p>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Small, closed cohort</p>
            </div>
            <div className="flex flex-col gap-2 text-center md:text-left">
              <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest font-bold">Deposit</p>
              <p className="text-xl md:text-2xl font-black text-[#10b981] uppercase tracking-tight">${RESERVATION.suggestedDeposit}<span className="text-neutral-400 text-sm"> or PWYC</span></p>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Tradition 7 · pay what you can</p>
            </div>
          </div>
        </section>

        {/* Safety promise */}
        <section className="flex flex-col gap-12">
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">The Vanguard Safety Promise</h2>
            <p className="text-neutral-400 font-mono uppercase tracking-widest">Recovery first. Always.</p>
          </div>
          <div className="relative max-w-4xl mx-auto w-full aspect-[16/7] rounded-2xl overflow-hidden border border-white/10">
            <Image src="/sponsor_alerts.png" alt="Your sponsor and the Vanguard stay in the loop" fill className="object-cover" sizes="(max-width: 768px) 100vw, 900px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {SAFETY.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <div key={s.title} className="bg-[#050505] p-8 rounded-[2rem] flex flex-col items-center text-center gap-6 transition-colors" style={{ border: `1px solid ${s.color}33` }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${s.color}1a`, color: s.color }}>
                    {Icon && <Icon className="w-8 h-8" />}
                  </div>
                  <h3 className="text-xl font-black uppercase text-white tracking-wide">{s.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed font-medium">{s.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Reservation — Google sign-in + quick intake + deposit */}
        <ReserveFlow />
        <p className="max-w-3xl mx-auto w-full text-[11px] font-mono text-neutral-400 bg-neutral-900/50 p-4 rounded-xl border border-white/5 uppercase tracking-widest leading-relaxed text-center">
          <span className="text-[#f59e0b] font-black">Note:</span> We honor Traditions 7, 11 &amp; 12. The Fellowship is self-supporting through our own contributions — use a pseudonym if you prefer. Your deposit reserves a seat and is applied to your cohort; it is not professional treatment.
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
