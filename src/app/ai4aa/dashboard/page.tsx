"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
      <div className="min-h-screen bg-[#0d0f0d] flex items-center justify-center text-[#7fb3a3] font-semibold text-sm">
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
    <div className="min-h-screen bg-[#0d0f0d] text-[#f2efe6] font-sans">
      {/* Header */}
      <header className="border-b border-[#1d231d] bg-[#141814] sticky top-0 z-40 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg md:text-2xl font-semibold tracking-tighter text-[#f2efe6]">AI4AA — {COURSE_META.title}</h1>
            <p className="text-[10px] font-mono text-[#7d7a70] font-bold">{COURSE_META.durationLabel}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#141814] border border-[#1d231d]">
              <span className="w-2 h-2 rounded-full bg-[#4cc07a]"></span>
              <span className="text-[10px] font-mono font-bold text-[#b8b4a6]">{user?.email}</span>
            </span>
            <button onClick={logout} className="p-2.5 rounded-full bg-[#141814] border border-[#1d231d] hover:bg-neutral-800 transition-colors text-[#b8b4a6] hover:text-[#f2efe6]" title="Log Out">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8">
        {/* Welcome + progress */}
        <motion.section initial="hidden" animate="visible" variants={fadeIn} className="bg-gradient-to-br from-[#141814] to-[#0a0a0f] border border-[#7fb3a3]/20 rounded-[14px] p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold text-cyan-400"><Rocket size={13} /> Your course</span>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#f2efe6] tracking-tight">Welcome back. Let&apos;s build your AI fluency — on camera.</h2>
            <p className="text-sm text-[#b8b4a6] max-w-2xl leading-relaxed">{COURSE_META.philosophy}</p>
          </div>

          {/* Progress bar */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#b8b4a6]">Overall progress</span>
              <span className="font-semibold text-cyan-400">{progressLoading ? "…" : `${pct}%`}</span>
            </div>
            <div className="w-full h-2.5 bg-[#141814] rounded-full overflow-hidden border border-[#1d231d]">
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
        <section className="bg-[#0a0a0f] border border-[#1d231d] rounded-[14px] overflow-hidden">
          <button onClick={() => setPrepOpen((v) => !v)} className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${prepAllDone ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" : "bg-cyan-500/10 border-cyan-500/40 text-cyan-400"}`}>
                {prepAllDone ? <CheckCircle2 size={20} /> : <Rocket size={20} />}
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#7d7a70] font-bold">Week 0 · Before you start</div>
                <h3 className="text-lg font-semibold text-[#f2efe6] tracking-tight">Onboarding &amp; prep</h3>
                <p className="text-xs text-[#7d7a70] mt-0.5">{prepDone} of {PREP_TASKS.length} done{prepAllDone ? " — you're ready for Week 1" : ""}</p>
              </div>
            </div>
            <ChevronDown className={`text-[#7d7a70] transition-transform ${prepOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {prepOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="p-5 md:p-6 pt-0 flex flex-col gap-2">
                  {PREP_TASKS.map((t) => {
                    const Icon = PREP_ICON[t.icon] ?? Sparkles;
                    const checked = !!progress.prep[t.id];
                    return (
                      <button key={t.id} onClick={() => togglePrep(t.id)} className={`text-left flex items-start gap-3 rounded-xl border p-4 transition-colors ${checked ? "border-emerald-500/40 bg-emerald-500/5" : "border-[#1d231d] bg-[#0d0f0d] hover:border-[#2a322a]"}`}>
                        {checked ? <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" /> : <Circle size={18} className="text-[#7d7a70] shrink-0 mt-0.5" />}
                        <div className="min-w-0">
                          <div className={`text-sm font-bold flex items-center gap-2 ${checked ? "text-[#f2efe6]" : "text-[#f2efe6]"}`}><Icon size={13} className="text-cyan-400" /> {t.title}</div>
                          <div className="text-xs text-[#7d7a70] mt-1 leading-relaxed">{t.description}</div>
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
          <h3 className="text-lg font-semibold text-[#f2efe6] tracking-tight flex items-center gap-2"><GraduationCap size={18} className="text-cyan-400" /> The 6 weeks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WEEKS.map((w) => {
              const c = AI4AA_ACCENT[w.accent] ?? AI4AA_ACCENT.cyan;
              const complete = isWeekComplete(progress, w.slug);
              const hwDone = weekHomeworkDone(progress, w.slug);
              return (
                <Link key={w.slug} href={`/ai4aa/dashboard/week/${w.slug}`} className="group bg-[#141814] border border-[#1d231d] rounded-2xl overflow-hidden flex flex-col hover:border-[#2a322a] hover:-translate-y-1 transition-all shadow-lg">
                  {/* Banner */}
                  <div className="relative h-32 w-full overflow-hidden">
                    {w.image ? (
                      <Image src={w.image} alt={w.title} width={800} height={600} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500" />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${c.grad} opacity-30`} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141814] via-[#141814]/40 to-transparent" />
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${c.grad}`} />
                    <div className={`absolute top-3 left-3 w-9 h-9 rounded-xl bg-gradient-to-br ${c.grad} text-[#f2efe6] flex items-center justify-center font-semibold shadow-lg`}>{w.num}</div>
                    {complete && <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-semibold text-black bg-emerald-500 rounded-full px-2 py-1"><CheckCircle2 size={12} /> Done</span>}
                  </div>
                  {/* Body */}
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <div className={`text-[10px] font-semibold ${c.text}`}>{w.theme}</div>
                    <h4 className="text-[#f2efe6] font-semibold leading-tight">{w.title}</h4>
                    <p className="text-xs text-[#7d7a70] leading-relaxed flex-1">{w.tools}</p>
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex-1 h-1.5 rounded-full bg-[#141814] overflow-hidden">
                        <div className={`h-full rounded-full bg-gradient-to-r ${c.grad} transition-all`} style={{ width: `${(hwDone / w.homework.length) * 100}%` }} />
                      </div>
                      <span className="text-[10px] font-mono text-[#7d7a70]">{hwDone}/{w.homework.length}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#1d231d]">
                      <span className="text-[10px] font-mono text-[#7d7a70]">~{w.estMinutes}m</span>
                      <span className={`text-[10px] font-semibold flex items-center gap-1 ${c.text} group-hover:gap-2 transition-all`}>Open <ChevronRight size={12} /></span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Study tools */}
        <section className="bg-[#0a0a0f] border border-[#1d231d] rounded-[14px] overflow-hidden">
          <button onClick={() => setToolsOpen((v) => !v)} className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/40 text-violet-400 flex items-center justify-center"><Wrench size={20} /></div>
              <div>
                <div className="text-[10px] font-mono text-[#7d7a70] font-bold">Reference</div>
                <h3 className="text-lg font-semibold text-[#f2efe6] tracking-tight">Study tools &amp; cheat sheets</h3>
                <p className="text-xs text-[#7d7a70] mt-0.5">Tool comparison, the AI stack, prompt formulas, camera milestones, the 30-day challenge, and the capstone rubric.</p>
              </div>
            </div>
            <ChevronDown className={`text-[#7d7a70] transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
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
                        <div key={f.goal} className="bg-[#141814] border border-[#1d231d] rounded-xl p-4">
                          <div className="text-[10px] font-semibold text-cyan-400 mb-1">{f.goal}</div>
                          <div className="text-sm text-[#b8b4a6] font-mono leading-relaxed">{f.formula}</div>
                        </div>
                      ))}
                    </div>
                  </ToolBlock>

                  <ToolBlock title="On-camera milestones" icon={Camera}><CameraMilestones /></ToolBlock>

                  <ToolBlock title="Your 30-day post-course challenge" icon={CalendarDays}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {THIRTY_DAY_CHALLENGE.map((d) => (
                        <div key={d.range} className="bg-[#141814] border border-[#1d231d] rounded-xl p-4">
                          <div className="text-[10px] font-semibold text-amber-400 mb-1">{d.range}</div>
                          <div className="text-sm text-[#b8b4a6] leading-relaxed">{d.task}</div>
                        </div>
                      ))}
                    </div>
                  </ToolBlock>

                  <ToolBlock title="Final capstone rubric" icon={Trophy}>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="text-[10px] text-[#7d7a70]">
                            <th className="py-2 pr-4 font-bold">Criteria</th>
                            <th className="py-2 pr-4 font-bold text-emerald-400">Excellent</th>
                            <th className="py-2 pr-4 font-bold text-cyan-400">Good</th>
                            <th className="py-2 font-bold text-amber-400">Needs work</th>
                          </tr>
                        </thead>
                        <tbody>
                          {CAPSTONE_RUBRIC.map((r) => (
                            <tr key={r.criteria} className="border-t border-[#1d231d] align-top">
                              <td className="py-2.5 pr-4 font-bold text-[#f2efe6] whitespace-nowrap">{r.criteria}</td>
                              <td className="py-2.5 pr-4 text-[#b8b4a6]">{r.excellent}</td>
                              <td className="py-2.5 pr-4 text-[#7d7a70]">{r.good}</td>
                              <td className="py-2.5 text-[#7d7a70]">{r.needsWork}</td>
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
        <Link href="/dashboard" className="group flex items-center justify-between bg-[#141814] border border-[#1d231d] rounded-2xl p-5 hover:border-[#4cc07a]/30 transition-colors">
          <div>
            <h4 className="text-sm font-semibold text-[#f2efe6]">Your AAfiends recovery dashboard</h4>
            <p className="text-xs text-[#7d7a70] mt-0.5">Sobriety tracker, check-ins, and biometrics — the app you&apos;re learning to reverse-engineer.</p>
          </div>
          <ArrowUpRight className="text-[#4cc07a] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={20} />
        </Link>
      </main>
    </div>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="bg-[#0d0f0d]/60 border border-[#1d231d] rounded-xl p-3 flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0"><Icon size={16} /></div>
      <div className="min-w-0">
        <div className="text-[9px] text-[#7d7a70] font-semibold">{label}</div>
        <div className="text-lg font-semibold text-[#f2efe6] leading-tight">{value}</div>
      </div>
    </div>
  );
}

function ToolBlock({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-semibold text-[#f2efe6] tracking-tight flex items-center gap-2"><Icon size={15} className="text-violet-400" /> {title}</h4>
      {children}
    </div>
  );
}
