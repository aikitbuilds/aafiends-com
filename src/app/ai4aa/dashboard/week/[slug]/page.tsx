"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Circle, Target, Clapperboard,
  Wrench, PlayCircle, Lightbulb, Users, ClipboardCheck, Clock, GraduationCap,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getWeek, WEEKS } from "@/data/ai4aaCourse";
import { useCourseProgress, weekHomeworkDone } from "@/lib/useCourseProgress";
import { AI4AA_ACCENT, AIStackDiagram, ToolComparisonCards, CameraMilestones, PromptAnatomy, BeforeAfterBars } from "@/components/ai4aa/Infographics";
import { CASE_METRICS } from "@/data/ai4aaVisuals";

export default function WeekPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const slug = String(params?.slug ?? "");
  const week = getWeek(slug);

  const { progress, toggleHomework, toggleWeekComplete } = useCourseProgress();

  useEffect(() => {
    if (!loading && !user) router.push("/ai4aa");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#00f0ff] uppercase tracking-widest font-black text-sm animate-pulse">
        Loading session...
      </div>
    );
  }

  if (!week) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-4 text-center px-6">
        <p className="text-neutral-300 font-bold">That session doesn&apos;t exist.</p>
        <Link href="/ai4aa/dashboard" className="text-cyan-400 font-bold uppercase tracking-widest text-sm hover:underline">← Back to course</Link>
      </div>
    );
  }

  const c = AI4AA_ACCENT[week.accent] ?? AI4AA_ACCENT.cyan;
  const idx = WEEKS.findIndex((w) => w.slug === week.slug);
  const prev = idx > 0 ? WEEKS[idx - 1] : null;
  const next = idx < WEEKS.length - 1 ? WEEKS[idx + 1] : null;
  const done = !!progress.weeks[week.slug]?.completed;
  const hwDone = weekHomeworkDone(progress, week.slug);

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#051024]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/ai4aa/dashboard" className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Course home
          </Link>
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Week {week.num} of {WEEKS.length}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-10">
        {/* Hero */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl ${c.bg} border ${c.border} ${c.text} flex items-center justify-center text-lg font-black`}>
              {week.num}
            </div>
            <div>
              <div className={`text-[11px] font-black uppercase tracking-widest ${c.text}`}>Week {week.num} · {week.theme}</div>
              <div className="text-neutral-500 text-[11px] font-mono flex items-center gap-2"><Clock size={11} /> ~{week.estMinutes} min · {week.level}</div>
            </div>
          </div>
          {week.image && (
            <img src={week.image} alt={week.title} className="w-full rounded-2xl object-cover aspect-video border border-white/10" />
          )}
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">{week.title}</h1>

          <div className={`rounded-2xl border ${c.border} ${c.bg} p-5`}>
            <div className={`text-[10px] font-black uppercase tracking-widest ${c.text} mb-2 flex items-center gap-1.5`}><PlayCircle size={13} /> Opening hook</div>
            <p className="text-neutral-200 leading-relaxed italic">&ldquo;{week.hook}&rdquo;</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoChip icon={Wrench} label="Tools" value={week.tools} />
            <InfoChip icon={Clapperboard} label="Camera skill" value={week.cameraSkill} />
          </div>
        </motion.section>

        {/* Outcomes */}
        <Section title="By the end of this week" icon={Target} accent={c}>
          <ul className="flex flex-col gap-2">
            {week.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-2 text-sm text-neutral-300 leading-relaxed">
                <CheckCircle2 size={16} className={`${c.text} shrink-0 mt-0.5`} /> {o}
              </li>
            ))}
          </ul>
        </Section>

        {/* Teaching points */}
        <Section title="Key teaching points" icon={Lightbulb} accent={c}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {week.teachingPoints.map((tp) => (
              <div key={tp.title} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                <div className="text-white font-bold text-sm mb-1">{tp.title}</div>
                <div className="text-neutral-400 text-xs leading-relaxed">{tp.body}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Student lesson */}
        <Section title="Student lesson" icon={GraduationCap} accent={c}>
          <div className="flex flex-col gap-4">
            {week.studentLesson.map((p, i) => (
              <p key={i} className="text-neutral-300 leading-relaxed">{p}</p>
            ))}
          </div>

          {week.keyMoves && (
            <div className="mt-5 overflow-x-auto">
              <div className="text-[11px] font-black uppercase tracking-widest text-neutral-500 mb-3">{week.keyMoves.heading}</div>
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-neutral-500">
                    <th className="py-2 pr-4 font-bold">Move</th>
                    <th className="py-2 pr-4 font-bold">How</th>
                    <th className="py-2 font-bold">When</th>
                  </tr>
                </thead>
                <tbody>
                  {week.keyMoves.rows.map((r) => (
                    <tr key={r.move} className="border-t border-white/5 align-top">
                      <td className={`py-3 pr-4 font-bold ${c.text} whitespace-nowrap`}>{r.move}</td>
                      <td className="py-3 pr-4 text-neutral-300">{r.how}</td>
                      <td className="py-3 text-neutral-500">{r.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Contextual infographic */}
          {week.num === 1 && <div className="mt-6"><ToolComparisonCards /></div>}
          {week.num === 2 && <div className="mt-6"><PromptAnatomy /></div>}
          {week.num === 5 && <div className="mt-6"><AIStackDiagram /></div>}
        </Section>

        {/* Live demo */}
        <Section title="Live demo — follow along" icon={PlayCircle} accent={c}>
          <ol className="flex flex-col gap-2">
            {week.demoScript.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-neutral-300 leading-relaxed">
                <span className={`w-6 h-6 rounded-lg ${c.bg} ${c.text} flex items-center justify-center text-xs font-black shrink-0`}>{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </Section>

        {/* Case study */}
        <Section title={`Case study — ${week.caseStudy.name}`} icon={Users} accent={c}>
          <p className="text-neutral-300 leading-relaxed mb-3">{week.caseStudy.scenario}</p>
          <ul className="flex flex-col gap-1.5 mb-3">
            {week.caseStudy.approach.map((a) => (
              <li key={a} className="flex items-start gap-2 text-sm text-neutral-400 leading-relaxed"><span className={`${c.text}`}>›</span> {a}</li>
            ))}
          </ul>
          <p className={`text-sm font-bold ${c.text} leading-relaxed mb-4`}>{week.caseStudy.result}</p>
          {CASE_METRICS[week.slug] && (
            <div className="mb-4"><BeforeAfterBars metric={CASE_METRICS[week.slug]} /></div>
          )}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">Discuss / reflect</div>
            <ul className="flex flex-col gap-2">
              {week.caseStudy.discussion.map((q) => (
                <li key={q} className="text-sm text-neutral-300 leading-relaxed">• {q}</li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Camera skill */}
        <Section title="On-camera skill this week" icon={Clapperboard} accent={c}>
          <p className="text-neutral-300 leading-relaxed mb-4">
            <span className="text-white font-bold">{week.cameraSkill}.</span> Your deliverable: {week.cameraDeliverable}.
          </p>
          <CameraMilestones current={week.num} />
        </Section>

        {/* Homework */}
        <Section title="Homework" icon={ClipboardCheck} accent={c}>
          <p className="text-xs text-neutral-500 mb-4">{hwDone} of {week.homework.length} done — tap to check off. Progress saves to your profile.</p>
          <div className="flex flex-col gap-2">
            {week.homework.map((hw, i) => {
              const checked = !!progress.weeks[week.slug]?.homework?.[String(i)];
              return (
                <button
                  key={i}
                  onClick={() => toggleHomework(week.slug, i)}
                  className={`text-left flex items-start gap-3 rounded-xl border p-4 transition-colors ${checked ? `${c.border} ${c.bg}` : "border-white/10 bg-[#0a0a0a] hover:border-white/20"}`}
                >
                  {checked ? <CheckCircle2 size={18} className={`${c.text} shrink-0 mt-0.5`} /> : <Circle size={18} className="text-neutral-600 shrink-0 mt-0.5" />}
                  <div className="min-w-0">
                    <div className={`text-sm font-bold ${checked ? "text-white" : "text-neutral-200"}`}>{hw.title}</div>
                    <div className="text-xs text-neutral-500 mt-0.5">
                      <span className={c.text}>{hw.tool}</span> → {hw.deliverable}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Section>

        {/* Mark complete */}
        <button
          onClick={() => toggleWeekComplete(week.slug)}
          className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-colors border ${
            done ? "bg-emerald-600 border-emerald-500 text-white" : `${c.bg} ${c.border} ${c.text} hover:brightness-110`
          }`}
        >
          {done ? <><CheckCircle2 size={16} /> Week {week.num} complete</> : <>Mark Week {week.num} complete</>}
        </button>

        {/* Prev / next */}
        <div className="grid grid-cols-2 gap-3">
          {prev ? (
            <Link href={`/ai4aa/dashboard/week/${prev.slug}`} className="flex items-center gap-2 bg-[#0a0a0a] border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors">
              <ArrowLeft size={16} className="text-neutral-500 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-neutral-600">Previous</div>
                <div className="text-sm font-bold text-white truncate">Week {prev.num}</div>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/ai4aa/dashboard/week/${next.slug}`} className="flex items-center justify-end gap-2 bg-[#0a0a0a] border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors text-right">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-neutral-600">Next</div>
                <div className="text-sm font-bold text-white truncate">Week {next.num}</div>
              </div>
              <ArrowRight size={16} className="text-neutral-500 shrink-0" />
            </Link>
          ) : <div />}
        </div>
      </main>
    </div>
  );
}

function InfoChip({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-3 flex items-start gap-2.5">
      <Icon size={15} className="text-neutral-500 shrink-0 mt-0.5" />
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">{label}</div>
        <div className="text-xs text-neutral-300 leading-snug">{value}</div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, accent, children }: { title: string; icon: any; accent: { text: string }; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
        <Icon size={18} className={accent.text} /> {title}
      </h2>
      {children}
    </section>
  );
}
