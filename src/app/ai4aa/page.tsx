"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { COURSE_META, WEEKS, PREP_TASKS } from "@/data/ai4aaCourse";
import { ToolComparisonCards, CameraMilestones } from "@/components/ai4aa/Infographics";
import { PHOTOS, type Photo } from "@/lib/photos";
import {
  Wrap,
  Section,
  SectionHead,
  PageHero,
  PhotoRow,
  Figure,
  StackList,
  CalloutBand,
  ButtonPrimary,
  ButtonQuiet,
  CtaRow,
} from "@/components/design";

/** Course photography lives in /public/images/ai4aa but is placed with the
 *  same Figure/PhotoRow frames as the main library. */
const STUDIO: Photo = {
  src: "/images/ai4aa/ai4aa_hero_biology_real.png",
  file: "ai4aa-hero-biology.png",
  alt: "A man working at a home studio desk with three monitors labelled research, productivity and build, a podcast microphone in front of him",
  caption: "Research, productivity, build — one screen each.",
  ratio: "5:4",
};

const CURRICULUM: Photo = {
  src: "/images/ai4aa/curriculum_app_real.png",
  file: "ai4aa-curriculum.png",
  alt: "A woman at a kitchen table by a window working through a dashboard on her laptop, a notebook and coffee beside her",
  caption: "Six weeks, two sessions a week, at your own table.",
  ratio: "16:9",
};

const ARCHITECT: Photo = {
  src: "/images/ai4aa/the_architect_real.png",
  file: "ai4aa-architect.png",
  alt: "MT seen from behind at a home recording desk, lit by a ring light, a microphone and a code editor in front of him",
  caption: "Not a tech guru. A guy in the trench.",
  ratio: "5:4",
};

const SPECS = [
  { label: "Start date", value: "Mid-July 2026", note: "Closed beta" },
  { label: "Format", value: "12 sessions", note: "2×/week, 60-min" },
  { label: "Cost", value: "100% free", note: "Tradition 7: self-supporting through our own effort." },
];

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
      title: "Week 0 · Preparation",
      goal: "Get set up before Week 1 — accounts, your recording corner, and your first prompt.",
      items: PREP_TASKS.map((t) => ({ title: t.title, desc: t.description })),
    },
    ...WEEKS.map((w) => ({
      title: `Week ${w.num} · ${w.title}`,
      goal: w.theme,
      items: [
        { title: "Tools", desc: w.tools },
        { title: "On-camera skill", desc: `${w.cameraSkill} — deliverable: ${w.cameraDeliverable}.` },
        ...w.teachingPoints.slice(0, 3).map((tp) => ({ title: tp.title, desc: tp.body })),
      ],
    })),
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <SiteHeader />

      <PageHero
        photo={PHOTOS.lateLearning}
        height="short"
        title={
          <>
            A free AI crash course, <em>for the rebuild.</em>
          </>
        }
        lede="Master Perplexity, Gemini and Claude in six weeks — while you build real on-camera confidence for your future podcast or YouTube channel. Zero technical background required, and every session is a rehearsal for going live."
        meta={COURSE_META.durationLabel}
      >
        <CtaRow>
          <ButtonPrimary href="#registration">Enroll free</ButtonPrimary>
          <ButtonQuiet href="/90rr">Get the free 90-day journal</ButtonQuiet>
        </CtaRow>
      </PageHero>

      {/* ── Why this sits on a recovery site ─────────────────── */}
      <Section>
        <Wrap>
          <SectionHead>
            Purpose is <em>relapse protection.</em>
          </SectionHead>
          <PhotoRow photo={STUDIO} flip>
            <p className="max-w-[52ch] text-[#b8b4a6]">
              Early recovery hands you back hours the addiction used to eat. This course fills them
              with a skill, a voice, and a reason to get up. It&apos;s vocational training for the
              rebuild, same as the{" "}
              <Link
                href="/90rr"
                className="text-[#f2efe6] underline decoration-[#1d231d] underline-offset-4 transition-colors hover:decoration-[#4cc07a]"
              >
                journal
              </Link>{" "}
              is training for the day.
            </p>
          </PhotoRow>
        </Wrap>
      </Section>

      {/* ── The two missions ─────────────────────────────────── */}
      <Section band>
        <Wrap>
          <SectionHead>
            Two missions, <em>one course.</em>
          </SectionHead>
          <StackList
            items={[
              { n: "01", title: "AI fluency", body: COURSE_META.dualGoal[0], maps: "6 weeks" },
              {
                n: "02",
                title: "On-camera presence",
                body: COURSE_META.dualGoal[1],
                maps: "12 sessions",
              },
            ]}
          />
        </Wrap>
      </Section>

      {/* ── The three tools ──────────────────────────────────── */}
      <Section>
        <Wrap>
          <SectionHead
            lede={
              <p>
                Perplexity researches, Gemini produces, Claude builds. You learn which one to reach
                for before you learn any of them deeply.
              </p>
            }
          >
            Three tools. <em>Three jobs.</em>
          </SectionHead>
          <div className="mt-10 sm:mt-14">
            <ToolComparisonCards />
          </div>
        </Wrap>
      </Section>

      {/* ── The blueprint ────────────────────────────────────── */}
      <Section band>
        <Wrap>
          <SectionHead lede={<p>What you&apos;ll learn, week by week. Open any week to read it.</p>}>
            The six-week <em>blueprint.</em>
          </SectionHead>

          <Figure photo={CURRICULUM} className="mt-10 sm:mt-14" />

          <div className="mt-10 border-t border-[#1d231d]">
            {blueprint.map((week, index) => (
              <div key={week.title} className="border-b border-[#1d231d]">
                <button
                  onClick={() => toggleWeek(index)}
                  aria-expanded={openWeek === index}
                  className="flex w-full items-center justify-between gap-6 px-1 py-6 text-left transition-colors hover:bg-[#0d0f0d]"
                >
                  <h3 className="font-display text-[1.2rem] leading-tight text-[#f2efe6] sm:text-[1.35rem]">
                    {week.title}
                  </h3>
                  <ChevronDown
                    size={20}
                    aria-hidden="true"
                    className={`shrink-0 text-[#7d7a70] transition-transform duration-200 ${
                      openWeek === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openWeek === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="px-1 pb-8">
                        <p className="max-w-[62ch] text-[#b8b4a6]">
                          <b className="font-semibold text-[#f2efe6]">Focus:</b> {week.goal}
                        </p>
                        <dl className="mt-6 border-t border-[#1d231d]">
                          {week.items.map((item, sIdx) => (
                            <div key={sIdx} className="border-b border-[#1d231d] py-4">
                              <dt className="font-display text-[1.05rem] leading-tight text-[#f2efe6]">
                                {item.title}
                              </dt>
                              <dd className="mt-1 max-w-[62ch] text-[15px] text-[#b8b4a6]">
                                {item.desc}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ── On-camera journey ────────────────────────────────── */}
      <Section>
        <Wrap>
          <SectionHead
            lede={<p>Every session is a rehearsal. The camera work grows with the tooling.</p>}
          >
            From a 30-second intro <em>to a full capstone.</em>
          </SectionHead>
          <div className="mt-10 max-w-3xl sm:mt-14">
            <CameraMilestones />
          </div>
        </Wrap>
      </Section>

      {/* ── Course specs ─────────────────────────────────────── */}
      <Section band tight>
        <Wrap>
          <SectionHead>
            What it costs, <em>and what it asks.</em>
          </SectionHead>
          <dl className="mt-10 border-t border-[#1d231d] sm:mt-14">
            {SPECS.map((s) => (
              <div
                key={s.label}
                className="grid grid-cols-1 items-baseline gap-x-6 gap-y-1 border-b border-[#1d231d] px-1 py-6 sm:grid-cols-[11rem_1fr_auto]"
              >
                <dt className="text-[15.5px] text-[#b8b4a6]">{s.label}</dt>
                <dd className="font-measure text-[1.15rem] text-[#4cc07a]">{s.value}</dd>
                <dd className="font-measure max-w-[42ch] text-[12.5px] text-[#7d7a70] sm:text-right">
                  {s.note}
                </dd>
              </div>
            ))}
          </dl>
        </Wrap>
      </Section>

      {/* ── Meet the architect ───────────────────────────────── */}
      <Section>
        <Wrap>
          <SectionHead>
            Meet <em>the Architect.</em>
          </SectionHead>
          <PhotoRow photo={ARCHITECT}>
            <blockquote className="max-w-[50ch]">
              <p className="font-display-italic text-[clamp(1.15rem,2vw,1.5rem)] leading-[1.45] text-[#f2efe6]">
                &ldquo;I&apos;m not a tech guru &mdash; I&apos;m a guy in the trench. After burning
                out from high-level tech operations, I used these exact AI tools to rebuild my own
                baseline. I&apos;m not teaching theory; I&apos;m sharing the blueprints that saved
                my sobriety. I&apos;m building this alongside you.&rdquo;
              </p>
              <cite className="font-measure mt-5 block text-[13px] not-italic text-[#7d7a70]">
                — MT
              </cite>
            </blockquote>
          </PhotoRow>
        </Wrap>
      </Section>

      {/* ── Safety promise ───────────────────────────────────── */}
      <Section band>
        <Wrap>
          <SectionHead lede={<p>Built for recovery first. The tool serves the life, not the other way round.</p>}>
            The Vanguard <em>safety promise.</em>
          </SectionHead>
          <StackList
            items={[
              {
                n: "01",
                title: "Sobriety first",
                body: "We build tech to serve our lives, not escape them. We teach you how to turn it off.",
              },
              {
                n: "02",
                title: "No screen addiction",
                body: "Strict 60-minute session caps and a 9:00 PM digital curfew.",
                maps: "60 min · 9pm curfew",
              },
              {
                n: "03",
                title: "Anonymity guaranteed",
                body: "Your data, your recovery. We respect Traditions 11 & 12.",
                maps: "traditions 11 & 12",
              },
            ]}
          />
        </Wrap>
      </Section>

      {/* ── Registration ─────────────────────────────────────── */}
      <Section id="registration" className="scroll-mt-32">
        <Wrap>
          <SectionHead
            lede={
              <p>
                Signing in saves your progress, homework and prep to your private profile. Nothing
                else.
              </p>
            }
          >
            Enroll in the <em>AI crash course.</em>
          </SectionHead>

          <CalloutBand className="mt-8 max-w-[64ch]">
            <p className="text-[15px] leading-relaxed text-[#b8b4a6]">
              <b className="font-semibold text-[#f2efe6]">Disclaimer:</b> We respect Traditions 11
              and 12 regarding anonymity. Use a pseudonym if you prefer &mdash; signing in just
              saves your progress, homework, and prep to your private profile.
            </p>
          </CalloutBand>

          <div className="mt-8">
            <button
              onClick={login}
              className="inline-flex items-center gap-3 rounded-[10px] bg-[#f2efe6] px-6 py-[15px] text-base font-semibold text-[#0d0f0d] transition-[background-color,transform] duration-200 hover:bg-[#ffffff] active:scale-[0.98]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              Sign in with Google and start
            </button>
          </div>
        </Wrap>
      </Section>

      <SiteFooter />
    </div>
  );
}
