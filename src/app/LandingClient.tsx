"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import DashboardPreview from "@/components/DashboardPreview";
import FeaturedGrid from "@/components/FeaturedGrid";
import SubstackSubscribe from "@/components/SubstackSubscribe";
import {
  Users, HeartPulse, Brain, Zap, Biohazard, Shield, ExternalLink, ArrowRight, BrainCircuit, Activity, Lock, LineChart, Sparkles, Network
} from "lucide-react";

export default function LandingClient({ substackLatest }: { substackLatest: React.ReactNode }) {
  const { user, loading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden">
      
      <SiteHeader />

      {/* SECTION 1: HERO */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative w-full min-h-[90vh] flex items-center justify-center px-6 md:px-12 py-24 z-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center gap-16 mt-10">
          
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div variants={fadeIn} className="flex items-center gap-2 border border-[#10b981]/30 bg-[#10b981]/10 text-[#10b981] px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-8 backdrop-blur-md">
              <Lock size={14} /> Exclusive Beta &middot; Limited Spots
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-5xl sm:text-6xl lg:text-[6rem] font-black tracking-tight text-white leading-[1.05] mb-6 drop-shadow-lg uppercase">
              Data Over <br className="hidden lg:block" />
              <span className="text-[#10b981]">Denial.</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg sm:text-xl text-neutral-300 max-w-2xl leading-relaxed mb-6 font-medium">
              AAfiends is a recovery dashboard and AI coach built by AA members — track sleep, meetings, and cravings to prove your baseline is healing.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a0a] border border-white/10 text-xs sm:text-sm font-bold text-neutral-300">
                <LineChart size={14} className="text-[#10b981]" /> Daily Telemetry
              </span>
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a0a] border border-white/10 text-xs sm:text-sm font-bold text-neutral-300">
                <Sparkles size={14} className="text-[#10b981]" /> AI Mirror
              </span>
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a0a] border border-white/10 text-xs sm:text-sm font-bold text-neutral-300">
                <Network size={14} className="text-[#10b981]" /> Community Grid
              </span>
            </motion.div>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={login}
                className="py-4 px-8 rounded-full bg-[#10b981] hover:bg-[#059669] text-black text-base font-black uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105 flex items-center justify-center gap-2"
              >
                [ Start Your Rebuild ] <ArrowRight size={18} />
              </button>
              <a
                href="#dashboard-preview"
                className="py-4 px-8 rounded-full border border-white/15 text-white text-base font-bold uppercase tracking-widest transition-all duration-300 hover:border-[#10b981]/50 hover:text-[#10b981] flex items-center justify-center gap-2"
              >
                See How It Works
              </a>
            </motion.div>

            <motion.div variants={fadeIn} className="w-full max-w-2xl bg-[#0a1a14] border border-[#10b981]/20 rounded-2xl p-6 shadow-lg italic text-neutral-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
              <p className="mb-4 relative z-10">"I used to think my willpower was all I'd ever need,<br/>
              A stubborn kind of ego that I always tried to feed.<br/>
              I'd swear to everyone I loved, 'I'm only having one!'<br/>
              Then wake up in a panic 'fore the rising of the sun.</p>

              <p className="mb-4 relative z-10">So we're dumping the excuses, we are looking at what's real,<br/>
              We are tracking daily habits, not just hiding how we feel.<br/>
              It's Data Over Denial—shining light into the dark,<br/>
              To heal the broken body and restore the inner spark.</p>

              <p className="relative z-10">We plug into the meetings like a charger to a phone,<br/>
              Because nobody in the trenches ever makes it out alone.<br/>
              The Twelve Steps are the manual to clear away the pride,<br/>
              To sweep the old resentments and the heavy guilt aside."</p>
            </motion.div>
          </div>

          <div className="flex-1 relative flex justify-center lg:justify-end items-center w-full max-w-lg lg:max-w-none mt-10 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[500px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-[#10b981]/30 shadow-[0_20px_50px_rgba(16,185,129,0.2)] z-10 group bg-neutral-900"
            >
              <img src="/main_hero_gauntlet.png" alt="Data Over Denial" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-black text-2xl uppercase tracking-widest">Baseline Calibrated</h3>
                <div className="flex items-center gap-2 mt-2 text-sm font-bold text-[#10b981]">
                  <Activity size={16} /> System Active
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </motion.section>

      {/* NEW SECTION 3: THE THREAT (INTRODUCING THE AIV) */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        id="threat" className="w-full max-w-7xl mx-auto px-6 py-24 flex flex-col gap-10 relative z-20 border-t border-white/5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <motion.div variants={fadeIn} className="relative rounded-[2rem] overflow-hidden border border-red-500/50 shadow-[0_0_50px_rgba(220,38,38,0.3)] bg-[#09090b] aspect-square lg:aspect-auto lg:h-[600px] group">
            <img src="/aiv_image1.png" alt="The AIV Symbiote" className="w-full h-full object-cover grayscale-[20%] sepia-[10%] hue-rotate-[-30deg] transform group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-red-900/20 mix-blend-multiply pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
            
            <div className="absolute top-6 left-6 flex items-center gap-2 bg-red-600/90 backdrop-blur-sm px-4 py-2 rounded-full border border-red-400/30 shadow-[0_0_20px_rgba(220,38,38,0.5)] z-20">
              <Biohazard size={16} className="text-white" />
              <span className="text-xs font-black text-white uppercase tracking-widest">Active Threat</span>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="flex flex-col gap-8">
            <div>
              <span className="text-sm font-mono font-bold tracking-widest text-red-500 bg-red-500/10 px-4 py-1.5 rounded-full uppercase border border-red-500/30 shadow-[0_0_15px_rgba(220,38,38,0.2)] flex items-center gap-2 w-fit mb-6">
                <Biohazard size={16} /> (Alcohol/Addiction Intelligence Virus)
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-2">
                THE SYMBIOTE <br/><span className="text-red-500">ON MY SHOULDER</span>
              </h2>
            </div>

            <div className="w-full bg-neutral-900/40 border border-white/10 p-6 md:p-8 rounded-2xl font-mono text-sm sm:text-base text-neutral-300 leading-relaxed shadow-inner">
              <p className="mb-4">"I thought I was the boss of me, the captain of the ship,<br/>
              Who only needed one quick drink to let the tension slip.<br/>
              But there's a heavy, dark companion riding on my back,<br/>
              A sneaky, slimy symbiote preparing to attack.</p>

              <p className="mb-4">It whispers, 'Hey, we've had a day... you've worked so hard, my guy!'<br/>
              But it's just the A.I.V. again, constructing a new lie.<br/>
              I hand the Admin Password to the monster in my head,<br/>
              And wake up fully clothed with half a pizza in my bed.</p>

              <p className="mb-4">What does this little gremlin eat to keep its battery charged?<br/>
              It feasts upon my ego when it's getting too enlarged.<br/>
              It gobbles up resentments, every grudge I won't let go,<br/>
              And thrives on isolation when I'm hiding, sad and low.</p>

              <p>So how do I defeat a bug that uses my own voice?<br/>
              I plug into the Fellowship and make a better choice.<br/>
              I hand the master keyboard to the Grand Architect Divine,<br/>
              And track my daily habits just to hold the baseline fine."</p>
            </div>
            
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION 3.5: DASHBOARD PREVIEW */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        id="dashboard-preview" className="w-full max-w-7xl mx-auto px-6 py-24 relative z-20 border-t border-white/5"
      >
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-bold tracking-widest text-[#10b981] bg-[#10b981]/10 px-4 py-1.5 rounded-full uppercase border border-[#10b981]/30 inline-block mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none">
            Three Steps. Every Day.
          </h2>
        </div>

        {/* 3-STEP EXPLAINER (P1-3 fix) */}
        <motion.div variants={fadeIn} className="max-w-4xl mx-auto mb-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 bg-[#0a0a0a] border border-white/10 rounded-2xl p-4">
            <span className="w-8 h-8 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] font-black flex items-center justify-center shrink-0">1</span>
            <p className="text-sm text-neutral-300"><span className="text-white font-bold">Log your telemetry.</span> 10 seconds, sliders and taps.</p>
          </div>
          <div className="flex items-center gap-3 bg-[#0a0a0a] border border-white/10 rounded-2xl p-4">
            <span className="w-8 h-8 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] font-black flex items-center justify-center shrink-0">2</span>
            <p className="text-sm text-neutral-300"><span className="text-white font-bold">The Mirror reflects it back.</span> AI reads what changed.</p>
          </div>
          <div className="flex items-center gap-3 bg-[#0a0a0a] border border-white/10 rounded-2xl p-4">
            <span className="w-8 h-8 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] font-black flex items-center justify-center shrink-0">3</span>
            <p className="text-sm text-neutral-300"><span className="text-white font-bold">The Ledger proves the streak.</span> The pattern, over time.</p>
          </div>
        </motion.div>

        <motion.div variants={fadeIn}>
          <DashboardPreview />
        </motion.div>
      </motion.section>

      {/* SECTION 4: THE THREE FOUNDATIONS */}
      <motion.section
        id="foundations"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        className="w-full max-w-7xl mx-auto px-6 py-24 flex flex-col gap-16 relative z-20 border-t border-white/5"
      >
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-4">
            Alcohol Intelligence Virus Defenses
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl max-w-3xl mx-auto font-mono">
            Protocols established to maintain baseline and quarantine threats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <motion.div variants={fadeIn}>
            <Link href="/data" className="flex flex-col gap-6 p-8 bg-[#0a0a0a] rounded-[2rem] border border-white/10 hover:border-[#10b981]/50 transition-all shadow-xl group h-full cursor-pointer block">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center border border-[#10b981]/30 text-[#10b981]">
                  <Activity size={24} />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none">
                  The Data <br/><span className="text-[#10b981] text-base font-mono mt-1 block">(The Dashboard)</span>
                </h3>
              </div>
              <p className="text-neutral-400 text-base leading-relaxed">
                Track physical telemetry—sleep, hydration, and triggers. Prove to yourself the engine is healing.
              </p>
            </Link>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div variants={fadeIn}>
            <Link href="/gad" className="flex flex-col gap-6 p-8 bg-[#0a0a0a] rounded-[2rem] border border-white/10 hover:border-blue-500/50 transition-all shadow-xl group h-full cursor-pointer block">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/30 text-blue-400">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none">
                  G.A.D. <br/><span className="text-blue-400 text-base font-mono mt-1 block">(Grand Architect Divine)</span>
                </h3>
              </div>
              <p className="text-neutral-400 text-base leading-relaxed">
                Hand over the admin password. Use the 12 Steps to clear resentments and restore spiritual sanity.
              </p>
            </Link>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div variants={fadeIn}>
            <Link href="/12-and-12" className="flex flex-col gap-6 p-8 bg-[#0a0a0a] rounded-[2rem] border border-white/10 hover:border-purple-500/50 transition-all shadow-xl group h-full cursor-pointer block">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/30 text-purple-400">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none">
                  The Community <br/><span className="text-purple-400 text-base font-mono mt-1 block">(The Grid)</span>
                </h3>
              </div>
              <p className="text-neutral-400 text-base leading-relaxed">
                You can't out-think a virus alone. Hit meetings, call your sponsor, and stay connected.
              </p>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* AI4AA FEATURED COURSE (Updated) */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        className="w-full flex flex-col py-12 relative z-20 max-w-7xl mx-auto px-6 border-t border-white/5"
      >
        <div className="w-full bg-[#051024] border border-blue-500/30 rounded-[2rem] overflow-hidden flex flex-col md:flex-row items-stretch shadow-[0_0_40px_rgba(59,130,246,0.15)] group relative">
          
          <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
            <img src="/hopeful_hero_2.png" alt="AI4AA Course" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#051024] hidden md:block"></div>
          </div>

          <div className="md:w-1/2 p-10 md:p-12 flex flex-col justify-center relative z-10">
            <div className="flex items-center gap-3 justify-start mb-4">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">Training Module</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none mb-4">
              ai4aa Foundation Course: <br className="hidden md:block mt-2" /><span className="text-blue-400">Data Over Denial</span>
            </h2>
            <p className="text-neutral-300 text-base leading-relaxed mb-8">
              A 6-week tech crash course exclusively for the recovery community. Zero technical background required.
            </p>
            <Link href="/ai4aa" className="w-fit">
              <button className="py-3 px-6 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/50 text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-3 hover:bg-blue-500 hover:text-white">
                <BrainCircuit size={18} />
                Access Course
              </button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 90 DAYS R&R FELLOWSHIP — featured program */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        className="w-full flex flex-col py-12 relative z-20 max-w-7xl mx-auto px-6 border-t border-white/5"
      >
        <div className="w-full bg-[#0a140f] border border-[#10b981]/30 rounded-[2rem] overflow-hidden flex flex-col md:flex-row-reverse items-stretch shadow-[0_0_40px_rgba(16,185,129,0.15)] group relative">

          <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
            <img src="/recovery_hero_vibrant.png" alt="90 Days R&R Fellowship" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-[#0a140f]/30 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a140f] hidden md:block"></div>
          </div>

          <div className="md:w-1/2 p-10 md:p-12 flex flex-col justify-center relative z-10">
            <div className="flex items-center gap-3 flex-wrap mb-4">
              <span className="text-xs font-mono font-bold text-[#10b981] uppercase tracking-widest bg-[#10b981]/10 px-3 py-1 rounded-full border border-[#10b981]/30">Flagship Program</span>
              <span className="text-xs font-mono font-bold text-[#f59e0b] uppercase tracking-widest bg-[#f59e0b]/10 px-3 py-1 rounded-full border border-[#f59e0b]/30">12 Seats · Mid-Aug 2026</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none mb-4">
              90 Days <span className="text-[#10b981]">R&amp;R</span> <br className="hidden md:block" /><span className="text-neutral-400 text-2xl md:text-3xl">Recovery &amp; Restructure</span>
            </h2>
            <p className="text-neutral-300 text-base leading-relaxed mb-8">
              A biology-first cohort for the first, hardest 90 days. Opens with a 1-day intensive bootcamp, then daily telemetry that proves your baseline is healing. Reserve a seat with a $20 deposit — or pay what you can. <span className="text-white font-bold">Or download the free printable journal — no signup needed.</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/90rr" className="w-fit">
                <button className="py-3 px-6 rounded-lg bg-white text-black text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-2 hover:bg-neutral-200 shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                  ↓ Free Printable Journal
                </button>
              </Link>
              <Link href="/90-r-and-r" className="w-fit">
                <button className="py-3 px-6 rounded-lg bg-[#10b981] text-black text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-3 hover:bg-[#059669] shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <HeartPulse size={18} />
                  Explore the Fellowship
                </button>
              </Link>
              <Link href="/90-r-and-r#reserve" className="w-fit">
                <button className="py-3 px-6 rounded-lg bg-transparent text-[#10b981] border border-[#10b981]/50 text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-2 hover:bg-[#10b981]/10">
                  Reserve a Seat <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* BEYOND ALCOHOL — multi-addiction tie-in (Phase 3.4) */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 relative z-20 border-t border-white/5">
        <div className="w-full bg-[#0a0a0a] border border-red-500/20 rounded-[2rem] p-8 md:p-12 flex flex-col gap-6 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full border border-red-500/30">
              <Biohazard size={14} /> Beyond Alcohol
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
            One virus. <span className="text-red-500">Many faces.</span>
          </h2>
          <p className="text-neutral-300 text-base md:text-lg leading-relaxed max-w-3xl">
            AAfiends started in the rooms of AA — but the same Addiction Intelligence Virus runs on more than alcohol:
            opioids, nicotine, cannabis, gambling, and more. The defense is the same for all of them: daily data, the
            BIO 12 protocol, and the fellowship. Learn how the virus works, then starve it.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://aivirus.org/the-virus" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-sm py-3.5 px-7 rounded-xl transition-colors">
              See the 10 vectors <ArrowRight size={16} />
            </a>
            <a href="https://aivirus.org/bio12" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#10b981]/10 hover:bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40 font-black uppercase tracking-widest text-sm py-3.5 px-7 rounded-xl transition-colors">
              <Shield size={16} /> The BIO 12 firewall
            </a>
          </div>
        </div>
      </section>

      {/* SUBSTACK SECTION */}
      <section className="w-full py-16 bg-[#050505] relative z-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse"></span>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
              Latest from the AA Fiends Substack
            </h2>
          </div>
          
          {substackLatest}

          <div className="mt-12 bg-[#09090b] border border-[#27272a] rounded-[2rem] p-8 md:p-10 relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a855f7] to-transparent opacity-50" />
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-4">
              Get it in your inbox
            </h3>
            <p className="text-sm text-neutral-400 mb-8 max-w-lg mx-auto">
              We send out the podcast and newsletter every week. No spam, just biology-first recovery strategies you can use immediately.
            </p>
            <div className="max-w-xl mx-auto">
              <SubstackSubscribe />
            </div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM — featured showcase of all three sites */}
      <FeaturedGrid />

      {/* FOOTER */}
      <SiteFooter />

    </div>
  );
}
