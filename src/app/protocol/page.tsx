"use client";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import { motion } from "framer-motion";
import {
  MessageSquareHeart,
  Brain,
  AlertCircle,
  HeartHandshake,
  Users,
  Phone,
  Home,
  ArrowDown,
  Sparkles,
  Play,
  BarChart3,
  Activity,
  Image as ImageIcon
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

function FlowArrow() {
  return (
    <div className="flex flex-col items-center gap-1 py-10">
      <div className="w-px h-12 bg-gradient-to-b from-stone-700 to-transparent" />
      <ArrowDown size={24} className="text-stone-600 mt-2" />
    </div>
  );
}

export default function SanctuaryProtocolPage() {
  return (
    <div className="min-h-screen bg-stone-900 text-stone-300 font-sans selection:bg-teal-500/30 selection:text-teal-200 pb-24">
      <SiteHeader />
      
      {/* ─── HEADER ─── */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="pt-24 pb-16 px-6 text-center relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(20,184,166,0.05),transparent)] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 bg-stone-800/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-semibold text-teal-400 shadow-sm border border-stone-700/50">
              <Sparkles size={14} className="text-teal-500" />
              Honesty is the foundation of healing
            </span>
          </motion.div>
          
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-stone-100 tracking-tight mb-6 leading-tight"
          >
            Your Recovery, <span className="text-teal-400">Understood.</span>
          </motion.h1>
          
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-stone-400 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Stop guessing why you feel off. Turn your raw, daily struggles into a clear, supportive path forward.
          </motion.p>
        </div>
      </motion.header>

      <main className="max-w-4xl mx-auto px-6 py-8 relative z-10">
        
        {/* ─── SECTION 1: THE CHECK-IN ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="w-full flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="text-center mb-10">
            <h2 className="text-2xl font-bold text-stone-100 mb-3 tracking-tight">
              Step 1: Dump Your Reality (No Filter)
            </h2>
            <p className="text-stone-400 max-w-lg mx-auto leading-relaxed">
              Don&apos;t try to sound perfect. Just tell the app exactly how you feel physically and mentally today.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="w-full max-w-xl bg-stone-800/60 backdrop-blur-sm rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-stone-700/50"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-stone-700/80 flex items-center justify-center border border-stone-600/50">
                  <MessageSquareHeart size={20} className="text-stone-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-200 text-sm">Morning Check-In</h3>
                  <p className="text-xs text-stone-500">Today at 5:00 AM</p>
                </div>
              </div>

              {/* Voice Memo Interface */}
              <div className="self-end bg-stone-700/80 text-stone-200 p-4 rounded-2xl rounded-tr-sm w-full max-w-[90%] md:max-w-[85%] shadow-sm border border-stone-600/30 flex flex-col gap-3">
                
                {/* Audio Waveform Player */}
                <div className="flex items-center gap-3 bg-stone-800/80 p-3 rounded-xl border border-stone-600/30">
                  <button className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-stone-900 shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:scale-105 transition-transform flex-shrink-0">
                    <Play size={18} fill="currentColor" className="ml-1" />
                  </button>
                  <div className="flex-1 h-8 flex items-center gap-1.5 opacity-80 px-2 overflow-hidden">
                    {[10, 20, 15, 30, 25, 40, 20, 10, 15, 35, 20, 10, 5, 25].map((h, i) => (
                      <div 
                        key={i} 
                        className="w-1.5 bg-teal-400 rounded-full animate-pulse" 
                        style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }} 
                      />
                    ))}
                  </div>
                  <div className="text-xs font-mono text-stone-400 tracking-widest font-bold">00:45</div>
                </div>

                <p className="leading-relaxed text-[15px] italic text-stone-300">
                  &ldquo;Day 16. I woke up feeling like I got hit by a truck. My lower back hurts, I&apos;m irritated at everyone, and I just want to numb out right now. Going to try to make the 6:30 AM meeting.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <FlowArrow />

        {/* ─── SECTION 2: THE COMPASSIONATE MIRROR ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="w-full flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="text-center mb-10">
            <h2 className="text-2xl font-bold text-stone-100 mb-3 tracking-tight">
              Step 2: Understand Your Body &amp; Mind
            </h2>
            <p className="text-stone-400 max-w-xl mx-auto leading-relaxed">
              The app decodes your symptoms using biology and recovery steps to tell you exactly why you feel this way—and what will help right now.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="w-full max-w-2xl bg-stone-800/80 backdrop-blur-md rounded-[2rem] p-1 shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-stone-700/50 overflow-hidden"
          >
            {/* Dashboard Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-700/50 bg-stone-900/50">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-teal-400" />
                <span className="text-xs font-bold text-stone-300 uppercase tracking-widest">Telemetry Analysis</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-stone-600"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-stone-600"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-stone-600"></div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 sm:p-8 flex flex-col gap-6 bg-gradient-to-b from-stone-800/20 to-transparent">
              
              {/* The Why */}
              <div className="flex flex-col sm:flex-row items-start gap-4 p-5 rounded-2xl bg-indigo-900/10 border border-indigo-500/10 transition-transform hover:-translate-y-1 duration-300">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <Brain size={24} className="text-indigo-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold text-indigo-300">The &ldquo;Why&rdquo;</h4>
                    <span className="text-[10px] font-mono text-indigo-400/50 uppercase hidden sm:block">GABA Rebound Detected</span>
                  </div>
                  <p className="text-indigo-200/70 text-sm leading-relaxed">
                    You aren&apos;t going backwards! Your nervous system is just exhausted and healing. Your muscles are tense from stress. This is normal.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Gentle Alert */}
                <div className="flex flex-col gap-4 p-5 rounded-2xl bg-rose-900/10 border border-rose-500/10 transition-transform hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                      <AlertCircle size={20} className="text-rose-400" />
                    </div>
                    <h4 className="text-sm font-bold text-rose-300">Gentle Alert</h4>
                  </div>
                  <p className="text-rose-200/70 text-sm leading-relaxed">
                    Your brain is tired and craving an escape. Recognize this trigger before it grows.
                  </p>
                </div>

                {/* Relief Plan */}
                <div className="flex flex-col gap-4 p-5 rounded-2xl bg-teal-900/10 border border-teal-500/10 transition-transform hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <HeartHandshake size={20} className="text-teal-400" />
                    </div>
                    <h4 className="text-sm font-bold text-teal-300">Relief Plan</h4>
                  </div>
                  <p className="text-teal-200/70 text-sm leading-relaxed font-medium">
                    Don&apos;t push through. Hydrate, use a heat pad, and hit the 6:30 meeting.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <FlowArrow />

        {/* ─── SECTION 3: REAL WORLD CONNECTION ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="w-full flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="text-center mb-10">
            <h2 className="text-2xl font-bold text-stone-100 mb-3 tracking-tight">
              Step 3: Rebuild Your Life
            </h2>
            <p className="text-stone-400 max-w-xl mx-auto leading-relaxed">
              Your private check-ins safely translate into real-world strength and connection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <motion.div variants={fadeUp} className="bg-stone-800/60 backdrop-blur-sm rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-stone-700/50 flex flex-col gap-5 hover:border-stone-600/50 transition-colors group">
              <div className="w-full h-40 rounded-2xl bg-stone-700/50 border border-stone-600/30 flex items-center justify-center overflow-hidden relative">
                <ImageIcon size={32} className="text-stone-500/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex items-end p-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/20 backdrop-blur-md">
                    <Users size={16} className="text-blue-400" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-200 mb-2 group-hover:text-blue-400 transition-colors">The Fellowship</h3>
                <p className="text-[15px] text-stone-400 leading-relaxed">
                  You take the app&apos;s advice, hit the meeting, and meet someone who feels exactly the same way. You aren&apos;t alone.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-stone-800/60 backdrop-blur-sm rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-stone-700/50 flex flex-col gap-5 hover:border-stone-600/50 transition-colors group">
              <div className="w-full h-40 rounded-2xl bg-stone-700/50 border border-stone-600/30 flex items-center justify-center overflow-hidden relative">
                <ImageIcon size={32} className="text-stone-500/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex items-end p-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/20 backdrop-blur-md">
                    <Phone size={16} className="text-purple-400" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-200 mb-2 group-hover:text-purple-400 transition-colors">True Honesty</h3>
                <p className="text-[15px] text-stone-400 leading-relaxed">
                  The app helps you organize your thoughts before calling your sponsor, so you don&apos;t hide your struggles.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-stone-800/60 backdrop-blur-sm rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-stone-700/50 flex flex-col gap-5 hover:border-stone-600/50 transition-colors group">
              <div className="w-full h-40 rounded-2xl bg-stone-700/50 border border-stone-600/30 flex items-center justify-center overflow-hidden relative">
                <ImageIcon size={32} className="text-stone-500/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex items-end p-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20 backdrop-blur-md">
                    <Home size={16} className="text-emerald-400" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-200 mb-2 group-hover:text-emerald-400 transition-colors">Rebuilding Trust</h3>
                <p className="text-[15px] text-stone-400 leading-relaxed">
                  Weeks of logged natural sleep and steady routines quietly prove to your family that you are doing the real work.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ─── FOOTER: OUR CORE BELIEFS ─── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="w-full mt-24 pt-16 border-t border-stone-800"
        >
          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col gap-2">
              <h4 className="text-stone-200 font-bold text-base">1. Honesty Over Hiding</h4>
              <p className="text-sm text-stone-500 leading-relaxed">
                If you feel it, write it down. If you hide it, it grows.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-stone-200 font-bold text-base">2. Biology Matters</h4>
              <p className="text-sm text-stone-500 leading-relaxed">
                You can&apos;t just &apos;think&apos; your way out of a tired body. Eat, sleep, and heal the physical engine.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-stone-200 font-bold text-base">3. Connection is the Cure</h4>
              <p className="text-sm text-stone-500 leading-relaxed">
                Isolation leads back to the start. We use this app to connect to the rooms, not to hide in our phones.
              </p>
            </div>
          </motion.div>
        </motion.section>
      </main>
      <SiteFooter />
    </div>
  );
}
