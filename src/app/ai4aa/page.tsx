"use client";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShieldCheck, Clock, Lock, Rocket } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { COURSE_META, WEEKS, PREP_TASKS } from "@/data/ai4aaCourse";
import { ToolComparisonCards, CameraMilestones } from "@/components/ai4aa/Infographics";

export default function AI4AAPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/ai4aa/dashboard");
  }, [user, router]);

  const [openWeek, setOpenWeek] = useState<number | null>(0);
  const toggleWeek = (i: number) => setOpenWeek(openWeek === i ? null : i);

  // Blueprint = Week 0 prep + the 6 real weeks, driven by the course data so the
  // preview always matches what's inside the login.
  const blueprint = [
    {
      title: "WEEK 0 · PREPARATION",
      goal: "Get set up before Week 1 — accounts, your recording corner, and your first prompt.",
      items: PREP_TASKS.map((t) => ({ title: t.title, desc: t.description })),
    },
    ...WEEKS.map((w) => ({
      title: `WEEK ${w.num} · ${w.title}`,
      goal: w.theme,
      items: [
        { title: "Tools", desc: w.tools },
        { title: "On-camera skill", desc: `${w.cameraSkill} — deliverable: ${w.cameraDeliverable}.` },
        ...w.teachingPoints.slice(0, 3).map((tp) => ({ title: tp.title, desc: tp.body })),
      ],
    })),
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.08),transparent_60%)] pointer-events-none z-0"></div>

      <SiteHeader />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-16 md:py-24 flex flex-col gap-28 relative z-20">
        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-12 items-center min-h-[64vh] pt-8 relative">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-start gap-6 text-left">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-xs text-[#00f0ff] font-mono uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
              {COURSE_META.durationLabel}
            </span>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              AI Crash <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#10b981]">Course</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed font-medium">
              Master <span className="text-[#00f0ff] font-bold">Perplexity</span>, <span className="text-[#3b82f6] font-bold">Gemini</span>, and <span className="text-[#ff6b00] font-bold">Claude</span> in 6 weeks — while you build real on-camera confidence for your future podcast or YouTube channel.
            </p>
            <p className="text-sm md:text-base text-neutral-500 max-w-xl font-mono uppercase tracking-widest">
              Zero technical background required. Every session is a rehearsal for going live.
            </p>
            <div className="pt-4">
              <Link href="#registration">
                <button className="py-4 px-10 rounded-2xl bg-[#ff6b00] hover:bg-[#e66000] text-white text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:shadow-[0_0_30px_rgba(255,107,0,0.6)]">
                  <Rocket size={20} className="text-white" /> Enroll Free
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="relative w-full aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.15)] group">
            <Image src="/images/ai4aa/ai4aa_hero_biology_real.png" alt="AI Crash Course" fill className="object-cover object-[center_20%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
          </motion.div>
        </section>

        {/* Dual goal */}
        <section className="grid md:grid-cols-2 gap-6 md:gap-8">
          {[
            { tag: "/* MISSION 1: AI FLUENCY */", color: "#00f0ff", text: COURSE_META.dualGoal[0] },
            { tag: "/* MISSION 2: ON-CAMERA PRESENCE */", color: "#ff6b00", text: COURSE_META.dualGoal[1] },
          ].map((c) => (
            <div key={c.tag} className="rounded-3xl border border-white/10 bg-[#09090b] shadow-xl p-8">
              <span className="font-mono font-bold mb-3 block text-sm uppercase tracking-widest" style={{ color: c.color }}>{c.tag}</span>
              <p className="text-xl leading-relaxed text-neutral-300 font-medium">{c.text}</p>
            </div>
          ))}
        </section>

        {/* The three tools */}
        <section className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">Your AI Team</h2>
            <p className="text-neutral-400 font-mono uppercase tracking-widest">Three tools, three jobs.</p>
          </div>
          <ToolComparisonCards />
        </section>

        {/* Blueprint */}
        <section className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">The 6-Week Blueprint</h2>
            <p className="text-neutral-400 font-mono uppercase tracking-widest">What you&apos;ll learn, week by week.</p>
          </div>
          <div className="relative max-w-4xl mx-auto w-full aspect-[16/7] rounded-2xl overflow-hidden border border-[#00f0ff]/20">
            <Image src="/images/ai4aa/curriculum_app_real.png" alt="The AI4AA curriculum, week by week" fill className="object-cover" sizes="(max-width: 768px) 100vw, 900px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </div>
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-4">
            {blueprint.map((week, index) => (
              <div key={index} className="bg-[#09090b] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
                <button onClick={() => toggleWeek(index)} className="w-full flex items-center justify-between p-6 md:p-7 bg-white/5 hover:bg-white/10 transition-colors text-left">
                  <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">{week.title}</h3>
                  <ChevronDown className={`text-white transition-transform duration-300 flex-shrink-0 ml-4 ${openWeek === index ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openWeek === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="p-6 md:p-7 pt-0 border-t border-white/5 flex flex-col gap-5 mt-6">
                        <div className="bg-[#00f0ff]/10 border-l-4 border-[#00f0ff] p-4 rounded-r-lg">
                          <p className="text-[#00f0ff] font-mono text-xs uppercase tracking-widest font-bold mb-1">Focus</p>
                          <p className="text-neutral-200 font-medium">{week.goal}</p>
                        </div>
                        <div className="flex flex-col gap-4">
                          {week.items.map((item, sIdx) => (
                            <div key={sIdx} className="flex flex-col gap-1">
                              <h4 className="text-[#ff6b00] font-bold tracking-wide uppercase text-sm">{item.title}</h4>
                              <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
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

        {/* On-camera journey */}
        <section className="flex flex-col gap-8">
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">Your On-Camera Journey</h2>
            <p className="text-neutral-400 font-mono uppercase tracking-widest">From a 30-second intro to a full capstone.</p>
          </div>
          <div className="max-w-3xl mx-auto w-full">
            <CameraMilestones />
          </div>
        </section>

        {/* Course specs */}
        <section>
          <div className="w-full bg-gradient-to-br from-[#09090b] to-[#051024] border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-[0_0_40px_rgba(0,240,255,0.05)]">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest font-bold">Start Date</p>
              <p className="text-2xl font-black text-white uppercase tracking-tight">Mid-July 2026 <span className="text-[#00f0ff] text-sm tracking-widest block sm:inline mt-1 sm:mt-0 sm:ml-2">(Closed Beta)</span></p>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/10"></div>
            <div className="flex flex-col gap-2 text-center md:text-left">
              <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest font-bold">Format</p>
              <p className="text-2xl font-black text-white uppercase tracking-tight">12 Sessions <span className="text-neutral-400 text-sm tracking-widest block sm:inline mt-1 sm:mt-0 sm:ml-2">(2×/week, 60-min)</span></p>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/10"></div>
            <div className="flex flex-col gap-2 text-center md:text-left">
              <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest font-bold">Cost</p>
              <p className="text-2xl font-black text-[#10b981] uppercase tracking-tight">100% Free.</p>
              <p className="text-[10px] font-mono text-neutral-500 max-w-[200px] mx-auto md:mx-0 leading-tight uppercase tracking-wider">Tradition 7: self-supporting through our own effort.</p>
            </div>
          </div>
        </section>

        {/* Meet the Architect */}
        <section className="grid md:grid-cols-2 gap-12 items-center bg-[#09090b] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <div className="relative w-full aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(255,107,0,0.15)]">
            <Image src="/images/ai4aa/the_architect_real.png" alt="The Architect" fill className="object-cover object-[center_20%] grayscale hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent"></div>
          </div>
          <div className="flex flex-col gap-6 text-left">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-[1.1]">
              MEET THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b00] to-[#f59e0b]">ARCHITECT</span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-medium italic">
              &quot;I&apos;m not a tech guru — I&apos;m a guy in the trench. After burning out from high-level tech operations, I used these exact AI tools to rebuild my own baseline. I&apos;m not teaching theory; I&apos;m sharing the blueprints that saved my sobriety. I&apos;m building this alongside you.&quot;
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-12 h-1 bg-[#ff6b00] rounded-full"></div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">— Michael T.</span>
            </div>
          </div>
        </section>

        {/* Safety promise */}
        <section className="flex flex-col gap-12 pt-4">
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">The Vanguard Safety Promise</h2>
            <p className="text-neutral-400 font-mono uppercase tracking-widest">Built for recovery first.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#050505] border border-[#10b981]/20 p-8 rounded-[2rem] flex flex-col items-center text-center gap-6 shadow-[0_0_30px_rgba(16,185,129,0.05)] hover:bg-[#10b981]/5 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-[#10b981]/10 flex items-center justify-center"><ShieldCheck className="w-8 h-8 text-[#10b981]" /></div>
              <h3 className="text-xl font-black uppercase text-white tracking-wide">Sobriety First</h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-medium">We build tech to serve our lives, not escape them. We teach you how to turn it off.</p>
            </div>
            <div className="bg-[#050505] border border-[#00f0ff]/20 p-8 rounded-[2rem] flex flex-col items-center text-center gap-6 shadow-[0_0_30px_rgba(0,240,255,0.05)] hover:bg-[#00f0ff]/5 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-[#00f0ff]/10 flex items-center justify-center"><Clock className="w-8 h-8 text-[#00f0ff]" /></div>
              <h3 className="text-xl font-black uppercase text-white tracking-wide">No Screen Addiction</h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-medium">Strict 60-minute session caps and a 9:00 PM digital curfew.</p>
            </div>
            <div className="bg-[#050505] border border-[#a855f7]/20 p-8 rounded-[2rem] flex flex-col items-center text-center gap-6 shadow-[0_0_30px_rgba(168,85,247,0.05)] hover:bg-[#a855f7]/5 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-[#a855f7]/10 flex items-center justify-center"><Lock className="w-8 h-8 text-[#a855f7]" /></div>
              <h3 className="text-xl font-black uppercase text-white tracking-wide">Anonymity Guaranteed</h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-medium">Your data, your recovery. We respect Traditions 11 &amp; 12.</p>
            </div>
          </div>
        </section>

        {/* Registration */}
        <section id="registration" className="scroll-mt-32 max-w-4xl mx-auto w-full pb-12 relative z-10">
          <div className="bg-[#09090b] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#ff6b00] via-[#00f0ff] to-[#10b981]"></div>
            <div className="mb-10 text-center flex flex-col gap-4">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">Enroll:<br /><span className="text-[#00f0ff]">AI Crash Course</span></h2>
              <p className="text-xs font-mono text-neutral-400 bg-neutral-900/50 p-4 rounded-xl border border-white/5 uppercase tracking-widest leading-relaxed">
                <span className="text-[#ff6b00] font-black">Disclaimer:</span> We respect Traditions 11 and 12 regarding anonymity. Use a pseudonym if you prefer — signing in just saves your progress, homework, and prep to your private profile.
              </p>
            </div>
            <div className="flex justify-center mt-10 mb-4">
              <button onClick={login} className="w-full md:w-auto px-12 py-6 bg-white hover:bg-neutral-200 text-black font-black text-lg md:text-xl uppercase tracking-widest rounded-2xl transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] flex justify-center items-center gap-4 group">
                <Image src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={32} height={32} className="w-8 h-8 group-hover:scale-110 transition-transform" />
                Sign in &amp; Start <span className="hidden sm:inline font-mono text-sm text-neutral-500 font-bold ml-2">(Google)</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
