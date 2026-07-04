"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, ChevronDown, ChevronRight, CheckCircle2, Circle, Rocket, GraduationCap,
  Wrench, ClipboardList, Camera, ArrowUpRight, KeyRound, Video, PenTool, Sparkles,
  Clapperboard, Trophy, CalendarDays, Layers,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  COURSE_META, WEEKS, PREP_TASKS, PROMPT_FORMULAS, THIRTY_DAY_CHALLENGE, CAPSTONE_RUBRIC,
} from "@/data/ai4aaCourse";
import {
  useCourseProgress, overallProgressPct, prepDoneCount, weekHomeworkDone, isWeekComplete,
} from "@/lib/useCourseProgress";
import {
  AI4AA_ACCENT, ToolComparisonCards, AIStackDiagram, WeeklyRhythm, CameraMilestones,
} from "@/components/ai4aa/Infographics";

const PREP_ICON: Record<string, any> = { KeyRound, Video, PenTool, Sparkles, Camera };

export default function CourseDashboardPage() {
  const { user, profile, loading, logout } = useAuth();
  const router = useRouter();
  const { progress, loading: progressLoading, togglePrep } = useCourseProgress();

  const [prepOpen, setPrepOpen] = useState(true);
  const [toolsOpen, setToolsOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/ai4aa");
      else if (!profile) router.push("/onboarding");
    }
  }, [user, profile, loading, router]);

  if (loading || !user || (!profile && user)) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#00f0ff] uppercase tracking-widest font-black text-sm animate-pulse">
        Initializing course...
      </div>
    );
  }

  const pct = overallProgressPct(progress);
  const prepDone = prepDoneCount(progress);
  const weeksComplete = WEEKS.filter((w) => isWeekComplete(progress, w.slug)).length;
  const prepAllDone = prepDone === PREP_TASKS.length;

  const fadeIn = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#051024] sticky top-0 z-40 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg md:text-2xl font-black uppercase tracking-tighter text-white">AI4AA — {COURSE_META.title}</h1>
            <p className="text-[10px] font-mono text-neutral-500 font-bold uppercase tracking-widest">{COURSE_META.durationLabel}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-white/5">
              <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">{user?.email}</span>
            </span>
            <button onClick={logout} className="p-2.5 rounded-full bg-neutral-900 border border-white/5 hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white" title="Log Out">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8">
        {/* Welcome + progress */}
        <motion.section initial="hidden" animate="visible" variants={fadeIn} className="bg-gradient-to-br from-[#051024] to-[#0a0a0f] border border-[#00f0ff]/20 rounded-3xl p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-400"><Rocket size={13} /> Your course</span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Welcome back. Let&apos;s build your AI fluency — on camera.</h2>
            <p className="text-sm text-neutral-400 max-w-2xl leading-relaxed">{COURSE_META.philosophy}</p>
          </div>

          {/* Progress bar */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-black uppercase tracking-widest text-neutral-400">Overall progress</span>
              <span className="font-black text-cyan-400">{progressLoading ? "…" : `${pct}%`}</span>
            </div>
            <div className="w-full h-2.5 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            <Stat label="Weeks complete" value={`${weeksComplete}/${WEEKS.length}`} icon={GraduationCap} />
            <Stat label="Prep done" value={`${prepDone}/${PREP_TASKS.length}`} icon={ClipboardList} />
            <Stat label="Camera reps" value={`${weeksComplete}`} icon={Camera} />
          </div>
        </motion.section>

        {/* Prep / start here */}
        <section className="bg-[#0a0a0f] border border-white/10 rounded-3xl overflow-hidden">
          <button onClick={() => setPrepOpen((v) => !v)} className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${prepAllDone ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" : "bg-cyan-500/10 border-cyan-500/40 text-cyan-400"}`}>
                {prepAllDone ? <CheckCircle2 size={20} /> : <Rocket size={20} />}
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">Week 0 · Before you start</div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">Onboarding &amp; prep</h3>
                <p className="text-xs text-neutral-500 mt-0.5">{prepDone} of {PREP_TASKS.length} done{prepAllDone ? " — you're ready for Week 1" : ""}</p>
              </div>
            </div>
            <ChevronDown className={`text-neutral-500 transition-transform ${prepOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {prepOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="p-5 md:p-6 pt-0 flex flex-col gap-2">
                  {PREP_TASKS.map((t) => {
                    const Icon = PREP_ICON[t.icon] ?? Sparkles;
                    const checked = !!progress.prep[t.id];
                    return (
                      <button key={t.id} onClick={() => togglePrep(t.id)} className={`text-left flex items-start gap-3 rounded-xl border p-4 transition-colors ${checked ? "border-emerald-500/40 bg-emerald-500/5" : "border-white/10 bg-[#050505] hover:border-white/20"}`}>
                        {checked ? <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" /> : <Circle size={18} className="text-neutral-600 shrink-0 mt-0.5" />}
                        <div className="min-w-0">
                          <div className={`text-sm font-bold flex items-center gap-2 ${checked ? "text-white" : "text-neutral-200"}`}><Icon size={13} className="text-cyan-400" /> {t.title}</div>
                          <div className="text-xs text-neutral-500 mt-1 leading-relaxed">{t.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* The 6 weeks */}
        <section className="flex flex-col gap-4">
          <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2"><GraduationCap size={18} className="text-cyan-400" /> The 6 weeks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WEEKS.map((w) => {
              const c = AI4AA_ACCENT[w.accent] ?? AI4AA_ACCENT.cyan;
              const complete = isWeekComplete(progress, w.slug);
              const hwDone = weekHomeworkDone(progress, w.slug);
              return (
                <Link key={w.slug} href={`/ai4aa/dashboard/week/${w.slug}`} className="group bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:border-white/25 hover:-translate-y-0.5 transition-all">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} ${c.text} flex items-center justify-center font-black`}>{w.num}</div>
                    {complete ? <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-400"><CheckCircle2 size={13} /> Done</span>
                      : <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">~{w.estMinutes}m</span>}
                  </div>
                  <div>
                    <div className={`text-[10px] font-black uppercase tracking-widest ${c.text} mb-1`}>{w.theme}</div>
                    <h4 className="text-white font-black leading-tight">{w.title}</h4>
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed flex-1">{w.tools}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">HW {hwDone}/{w.homework.length}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${c.text} group-hover:gap-2 transition-all`}>Open <ChevronRight size={12} /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Study tools */}
        <section className="bg-[#0a0a0f] border border-white/10 rounded-3xl overflow-hidden">
          <button onClick={() => setToolsOpen((v) => !v)} className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/40 text-violet-400 flex items-center justify-center"><Wrench size={20} /></div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">Reference</div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">Study tools &amp; cheat sheets</h3>
                <p className="text-xs text-neutral-500 mt-0.5">Tool comparison, the AI stack, prompt formulas, camera milestones, the 30-day challenge, and the capstone rubric.</p>
              </div>
            </div>
            <ChevronDown className={`text-neutral-500 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {toolsOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="p-5 md:p-6 pt-0 flex flex-col gap-8">
                  <ToolBlock title="The three tools at a glance" icon={Layers}><ToolComparisonCards /></ToolBlock>
                  <ToolBlock title="The AI stack — right tool, right layer" icon={Layers}><AIStackDiagram /></ToolBlock>
                  <ToolBlock title="The weekly broadcast rhythm" icon={Clapperboard}><WeeklyRhythm /></ToolBlock>

                  <ToolBlock title="Prompt formulas that work" icon={Sparkles}>
                    <div className="flex flex-col gap-2">
                      {PROMPT_FORMULAS.map((f) => (
                        <div key={f.goal} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                          <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-1">{f.goal}</div>
                          <div className="text-sm text-neutral-300 font-mono leading-relaxed">{f.formula}</div>
                        </div>
                      ))}
                    </div>
                  </ToolBlock>

                  <ToolBlock title="On-camera milestones" icon={Camera}><CameraMilestones /></ToolBlock>

                  <ToolBlock title="Your 30-day post-course challenge" icon={CalendarDays}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {THIRTY_DAY_CHALLENGE.map((d) => (
                        <div key={d.range} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                          <div className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">{d.range}</div>
                          <div className="text-sm text-neutral-300 leading-relaxed">{d.task}</div>
                        </div>
                      ))}
                    </div>
                  </ToolBlock>

                  <ToolBlock title="Final capstone rubric" icon={Trophy}>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="text-[10px] uppercase tracking-widest text-neutral-500">
                            <th className="py-2 pr-4 font-bold">Criteria</th>
                            <th className="py-2 pr-4 font-bold text-emerald-400">Excellent</th>
                            <th className="py-2 pr-4 font-bold text-cyan-400">Good</th>
                            <th className="py-2 font-bold text-amber-400">Needs work</th>
                          </tr>
                        </thead>
                        <tbody>
                          {CAPSTONE_RUBRIC.map((r) => (
                            <tr key={r.criteria} className="border-t border-white/5 align-top">
                              <td className="py-2.5 pr-4 font-bold text-white whitespace-nowrap">{r.criteria}</td>
                              <td className="py-2.5 pr-4 text-neutral-400">{r.excellent}</td>
                              <td className="py-2.5 pr-4 text-neutral-500">{r.good}</td>
                              <td className="py-2.5 text-neutral-600">{r.needsWork}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </ToolBlock>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Link to recovery app */}
        <Link href="/dashboard" className="group flex items-center justify-between bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 hover:border-[#10b981]/30 transition-colors">
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-widest">Your AAfiends recovery dashboard</h4>
            <p className="text-xs text-neutral-500 mt-0.5">Sobriety tracker, check-ins, and biometrics — the app you&apos;re learning to reverse-engineer.</p>
          </div>
          <ArrowUpRight className="text-[#10b981] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={20} />
        </Link>
      </main>
    </div>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="bg-[#050505]/60 border border-white/10 rounded-xl p-3 flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0"><Icon size={16} /></div>
      <div className="min-w-0">
        <div className="text-[9px] uppercase tracking-widest text-neutral-500 font-black">{label}</div>
        <div className="text-lg font-black text-white leading-tight">{value}</div>
      </div>
    </div>
  );
}

function ToolBlock({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-black text-white uppercase tracking-tight flex items-center gap-2"><Icon size={15} className="text-violet-400" /> {title}</h4>
      {children}
    </div>
  );
}
