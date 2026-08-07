"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SubstackSubscribe from "@/components/SubstackSubscribe";
import { CravingWaveAndSpike } from "@/components/DoseFigures";
import { PHOTOS } from "@/lib/photos";
import {
  Wrap,
  Section,
  SectionHead,
  SubHead,
  PageHero,
  PhotoRow,
  Figure,
  StackList,
  EditorialRow,
  EditorialList,
  Stat,
  ButtonPrimary,
  ButtonGhost,
  ButtonQuiet,
  CtaRow,
  PullQuote,
} from "@/components/design";

/** The four chemicals, each with the photograph of someone earning it. */
const DOSE = [
  {
    photo: PHOTOS.coldLake,
    letter: "D",
    name: "Dopamine, the engine",
    role: "Drive, motivation & anticipation",
    earn: "a cold plunge, morning sunlight, a brisk walk, one hard task finished before noon.",
    stat: "+250%",
    statBody: "dopamine after cold exposure, held for hours without the crash",
    flip: false,
  },
  {
    photo: PHOTOS.meetingCircle,
    letter: "O",
    name: "Oxytocin, the network",
    role: "Bonding, trust & safety",
    earn: "sitting in the rooms, calling your sponsor, reaching out to another alcoholic, 12th-step service.",
    stat: "Buffer",
    statBody: "a direct biological counter to cortisol and craving isolation",
    flip: true,
  },
  {
    photo: PHOTOS.kitchenJournal,
    letter: "S",
    name: "Serotonin, the mirror",
    role: "Baseline mood & emotional calm",
    earn: "sleep, daylight, fibre and fermented food, ten minutes of stillness with the journal open.",
    stat: "~90%",
    statBody: "of the body's serotonin is made in the gut, not the head",
    flip: false,
  },
  {
    photo: PHOTOS.bridgeRunner,
    letter: "E",
    name: "Endorphins, the resilience",
    role: "Pain relief & the natural high",
    earn: "hard cardio or lifting, sauna heat, spicy food, laughing until it hurts.",
    stat: "Opioid",
    statBody: "your internal system, activated safely through physical challenge",
    flip: true,
  },
];

export default function LandingClient({ substackLatest }: { substackLatest: React.ReactNode }) {
  const { user, loading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.push("/dashboard");
  }, [user, loading, router]);

  // The one authored motion moment on this page: the craving wave draws itself
  // when it first enters view. Content is visible at rest either way — this
  // adds to visibility, it never gates it.
  const waveRef = useRef<HTMLDivElement>(null);
  const [waveSeen, setWaveSeen] = useState(false);
  useEffect(() => {
    const el = waveRef.current;
    if (!el || waveSeen) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setWaveSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [waveSeen]);

  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <SiteHeader />

      <PageHero
        photo={PHOTOS.dawnRoad}
        title={
          <>
            Data over denial. <em>Every morning.</em>
          </>
        }
        lede="AAfiends is a 90-day, biology-first recovery system built by people in recovery. Track sleep, meetings, and cravings, and watch the numbers prove your baseline is healing."
        meta="Free printable journal · no signup · 12 cohort seats"
      >
        <CtaRow>
          <ButtonPrimary href="/90rr">Get the free 90-day journal</ButtonPrimary>
          <ButtonGhost href="/90-r-and-r">Reserve a cohort seat</ButtonGhost>
          <button
            onClick={login}
            className="text-[15px] text-[#b8b4a6] underline decoration-[#1d231d] underline-offset-4 transition-colors hover:text-[#f2efe6] hover:decoration-[#4cc07a]"
          >
            Already tracking? Sign in
          </button>
        </CtaRow>
      </PageHero>

      {/* ── One path, four steps ─────────────────────────────────
          The order carries information, so it earns its numbers. */}
      <Section tight>
        <Wrap>
          <SectionHead
            lede={
              <p>
                Four moves, in order. Everything else on this site is detail hanging off one of
                them.
              </p>
            }
          >
            Where to <em>start.</em>
          </SectionHead>
          <StackList
            items={[
              {
                n: "01",
                title: <Link href="/prep90" className="no-underline hover:text-[#4cc07a]">Prep</Link>,
                body: "Clear the house, stock the kitchen, tell one person. The hour before day one.",
                maps: "prep kit",
              },
              {
                n: "02",
                title: <Link href="/90rr" className="no-underline hover:text-[#4cc07a]">Journal</Link>,
                body: "Print it or track it. Ninety days of ten-second entries, by hand or on the dashboard.",
                maps: "free · no signup",
              },
              {
                n: "03",
                title: <Link href="/protocol" className="no-underline hover:text-[#4cc07a]">BIO 12</Link>,
                body: "The daily protocol that rebuilds the baseline. Twelve inputs, run every day.",
                maps: "daily firewall",
              },
              {
                n: "04",
                title: <Link href="/90-r-and-r" className="no-underline hover:text-[#4cc07a]">Fellowship</Link>,
                body: "Twelve seats, one cohort, the first and hardest ninety days done alongside other people.",
                maps: "12 seats · mid-aug 2026",
              },
            ]}
          />
        </Wrap>
      </Section>

      {/* ── The biology ──────────────────────────────────────── */}
      <Section id="biology" band>
        <Wrap>
          <SectionHead
            lede={
              <p>
                Almost everything that feels good runs on four brain chemicals. The substance faked
                all four at once through a single door, so your brain turned the volume down to
                compensate. That deficit is the grey fog and the craving.{" "}
                <strong>Recovery is teaching the body to make its own again</strong>, in small clean
                doses you earn.
              </p>
            }
          >
            Your body is the hardware. <em>Start there.</em>
          </SectionHead>

          {DOSE.map((d) => (
            <PhotoRow key={d.letter} photo={d.photo} flip={d.flip}>
              <SubHead>
                <span className="text-[#4cc07a]">{d.letter}</span> · {d.name}
              </SubHead>
              <p className="mt-1.5 text-[15.5px] text-[#7d7a70]">{d.role}</p>
              <p className="mt-4 max-w-[48ch] text-[#b8b4a6]">
                <b className="font-semibold text-[#f2efe6]">Earn it:</b> {d.earn}
              </p>
              <Stat value={d.stat}>{d.statBody}</Stat>
            </PhotoRow>
          ))}

          <CtaRow className="mt-14">
            <ButtonPrimary href="/the-science">The science, in plain English</ButtonPrimary>
            <ButtonGhost href="/protocol">The BIO 12 firewall</ButtonGhost>
          </CtaRow>
        </Wrap>
      </Section>

      {/* ── Order of operations ──────────────────────────────── */}
      <Section>
        <Wrap>
          <SectionHead
            lede={
              <p>
                This is not a rejection of the 12 Steps. It is what makes them hold. A panicked,
                exhausted, dehydrated nervous system cannot carry a spiritual idea.{" "}
                <strong>Stabilize the vessel, then do the deeper work.</strong>
              </p>
            }
          >
            Biology first. <em>Then</em> the framework.
          </SectionHead>

          <StackList
            items={[
              {
                n: "01",
                title: "The Vessel — hardware and biology",
                body: "Body first: sleep, light, movement, fuel. The D.O.S.E. chemistry above, run daily.",
                maps: "dopamine · endorphins",
              },
              {
                n: "02",
                title: "The Network — community",
                body: "Rooms, sponsor, calling another alcoholic, service. You can't out-think this alone.",
                maps: "step 12 · oxytocin",
              },
              {
                n: "03",
                title: "The Mirror — mind and spirit",
                body: "Stillness, the honest daily read, surrender. The steps do the deeper work here.",
                maps: "steps 4–11 · serotonin",
              },
              {
                n: "04",
                title: "The daily score",
                body: "One number out of ten, every day. Measured, not felt. That is the capstone.",
                maps: "VSE / 10 · daily",
              },
            ]}
          />
          <p className="mt-6 max-w-[58ch] text-[15.5px] text-[#b8b4a6]">
            <b className="font-semibold text-[#f2efe6]">Why this order?</b> Before spiritual
            concepts can hold in a panicked mind, sleep, gut serotonin, and dopamine baseline must
            stabilize. Higher Power as you understand it; one number, every day.
          </p>
        </Wrap>
      </Section>

      {/* ── The craving wave ─────────────────────────────────── */}
      <Section band>
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <SectionHead
                lede={
                  <p>
                    The physical adrenaline surge lasts about ninety seconds. The craving itself
                    peaks and passes within twenty to thirty minutes if you do not feed it. Knowing
                    it has a ceiling and an ending is what turns an emergency into weather.
                  </p>
                }
              >
                A craving is a wave, <em>not a wall.</em>
              </SectionHead>
              <div className="mt-7 flex gap-10">
                <div className="font-measure text-[13px] text-[#b8b4a6]">
                  <strong className="mb-1 block text-[1.6rem] font-medium tracking-[-0.01em] text-[#4cc07a]">
                    90 sec
                  </strong>
                  the adrenaline surge
                </div>
                <div className="font-measure text-[13px] text-[#b8b4a6]">
                  <strong className="mb-1 block text-[1.6rem] font-medium tracking-[-0.01em] text-[#4cc07a]">
                    20–30 min
                  </strong>
                  peak to gone, unfed
                </div>
              </div>
            </div>
            <div ref={waveRef} className={waveSeen ? "in-view" : undefined}>
              <CravingWaveAndSpike />
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── Three steps, every day ───────────────────────────── */}
      <Section>
        <Wrap>
          <SectionHead>
            Three steps. <em>Every day.</em>
          </SectionHead>
          <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <Figure photo={PHOTOS.writingHands} />
            <StackList
              className="mt-0"
              items={[
                {
                  n: "01",
                  title: "Log your telemetry",
                  body: "Ten seconds of sliders and taps. Sleep, meetings, cravings, movement.",
                },
                {
                  n: "02",
                  title: "The Mirror reflects it back",
                  body: "The AI coach reads what changed and says the thing you'd rather not.",
                },
                {
                  n: "03",
                  title: "The Ledger proves the streak",
                  body: "The pattern, over time. Evidence your baseline is healing.",
                },
              ]}
            />
          </div>
        </Wrap>
      </Section>

      {/* ── Layer two: the framework ─────────────────────────── */}
      <Section band>
        <Wrap>
          <SectionHead
            lede={
              <p>
                Biology stabilizes the vessel. It does not clear a resentment, repair a
                relationship, or dismantle an ego. That is what the framework and the fellowship are
                for — three defenses that run on top of a steady baseline.
              </p>
            }
          >
            With the body back online, <em>the Steps do the deeper work.</em>
          </SectionHead>
          <EditorialList>
            <EditorialRow
              href="/data"
              title="The data"
              body="Track physical telemetry — sleep, hydration, triggers. Prove to yourself the engine is healing."
              go="The dashboard"
            />
            <EditorialRow
              href="/framework#gad"
              title="G.A.D."
              body="Hand over the admin password. Use the 12 Steps to clear resentments and restore spiritual sanity."
              go="Grand Architect Divine"
            />
            <EditorialRow
              href="/framework#traditions"
              title="The community"
              body="You can't out-think a virus alone. Hit meetings, call your sponsor, and stay connected."
              go="The grid"
            />
          </EditorialList>
        </Wrap>
      </Section>

      {/* ── 90 Days R&R — the flagship ───────────────────────── */}
      <Section id="program">
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <Figure photo={PHOTOS.trailGroup} ratio="5:4" />
            <div>
              <p className="font-measure mb-4 text-[13.5px] text-[#e0a45c]">
                12 seats · opens mid-August 2026
              </p>
              <SectionHead>
                90 Days R&amp;R — <em>recovery &amp; restructure</em>
              </SectionHead>
              <p className="mt-5 max-w-[52ch] text-[#b8b4a6]">
                A biology-first cohort for the first, hardest 90 days. Opens with a one-day
                intensive, then daily telemetry that proves your baseline is healing.{" "}
                <b className="font-semibold text-[#f2efe6]">
                  Reserve a seat with a $20 deposit, or pay what you can.
                </b>
              </p>
              <p className="mt-4 max-w-[52ch] text-[#b8b4a6]">
                Not ready for a cohort? The printable journal is free, no signup, right now.
              </p>
              <CtaRow>
                <ButtonPrimary href="/90rr">Download the free journal</ButtonPrimary>
                <ButtonGhost href="/90-r-and-r">Explore the fellowship</ButtonGhost>
                <ButtonQuiet href="/90-r-and-r#reserve">Reserve a seat</ButtonQuiet>
              </CtaRow>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── The symbiote — brand storytelling ────────────────── */}
      <Section band>
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Figure photo={PHOTOS.carTalk} ratio="5:4" />
            <div>
              <SectionHead>
                The symbiote <em>on my shoulder</em>
              </SectionHead>
              <p className="mt-4 max-w-[50ch] text-[15.5px] text-[#7d7a70]">
                The Addiction Intelligence Virus, in the only form that ever really landed.
              </p>
              <div className="mt-7 max-w-[54ch] space-y-4 border-l border-[#2a322a] pl-6 font-display text-[1.05rem] italic leading-relaxed text-[#b8b4a6]">
                <p>
                  I thought I was the boss of me, the captain of the ship,
                  <br />
                  Who only needed one quick drink to let the tension slip.
                  <br />
                  But there&rsquo;s a heavy, dark companion riding on my back,
                  <br />
                  A sneaky, slimy symbiote preparing to attack.
                </p>
                <p>
                  It whispers, &lsquo;Hey, we&rsquo;ve had a day&hellip; you&rsquo;ve worked so
                  hard, my guy!&rsquo;
                  <br />
                  But it&rsquo;s just the A.I.V. again, constructing a new lie.
                  <br />I hand the Admin Password to the monster in my head,
                  <br />
                  And wake up fully clothed with half a pizza in my bed.
                </p>
                <p>
                  So how do I defeat a bug that uses my own voice?
                  <br />I plug into the Fellowship and make a better choice.
                  <br />I hand the master keyboard to the Grand Architect Divine,
                  <br />
                  And track my daily habits just to hold the baseline fine.
                </p>
              </div>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── Aivy ─────────────────────────────────────────────── */}
      <Section>
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Link href="/aivy" className="group block overflow-hidden rounded-[14px]">
              <div className="relative aspect-video bg-[#141814]">
                <Image
                  src="/aivy/ep01-thumb.jpg"
                  alt="Aivy, the animated series — episode one"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Link>
            <div>
              <p className="font-measure mb-4 text-[13.5px] text-[#e0a45c]">
                New series · episode 1 is live
              </p>
              <SectionHead>
                Meet <em>Aivy</em>
              </SectionHead>
              <p className="mt-5 max-w-[52ch] text-[#b8b4a6]">
                She&rsquo;s funny. She&rsquo;s gorgeous. She&rsquo;s trying to kill you. Our
                animated series turns addiction into the world&rsquo;s worst wife — a comedy
                that&rsquo;s secretly a neuroscience class.
              </p>
              <CtaRow>
                <ButtonPrimary href="/aivy">Watch episode 1</ButtonPrimary>
                <ButtonQuiet href="/watch">All episodes</ButtonQuiet>
              </CtaRow>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── Book One ─────────────────────────────────────────── */}
      <Section band>
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <Figure photo={PHOTOS.readingTable} />
            <div>
              <p className="font-measure mb-4 text-[13.5px] text-[#e0a45c]">
                Book One: The Engine · 12 chapters · beta open
              </p>
              <SectionHead>
                The AIV Recovery <em>Field Manual</em>
              </SectionHead>
              <p className="mt-5 max-w-[52ch] text-[#b8b4a6]">
                The book behind AAfiends — MT&rsquo;s own recovery, written down. Biology first:
                sleep, movement, nutrition, and breath, before you touch the mind or the meetings.
                The full beta is free to read right now, HTML or PDF, and every page is looking for
                your notes before the final edition ships.
              </p>
              <CtaRow>
                <ButtonPrimary href="/book1">Read the beta</ButtonPrimary>
                <ButtonQuiet href="/book1">Download the PDF</ButtonQuiet>
              </CtaRow>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── AI4AA ────────────────────────────────────────────── */}
      <Section>
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Figure photo={PHOTOS.lateLearning} className="lg:order-2" />
            <div>
              <SectionHead>
                Purpose is <em>relapse protection.</em>
              </SectionHead>
              <p className="mt-5 max-w-[52ch] text-[#b8b4a6]">
                Early recovery hands you back hours the addiction used to eat. This free six-week AI
                crash course fills them with a skill, a voice, and a reason to get up — vocational
                training for the rebuild. Zero technical background required.
              </p>
              <CtaRow>
                <ButtonPrimary href="/ai4aa">Access the course</ButtonPrimary>
              </CtaRow>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── Beyond alcohol ───────────────────────────────────── */}
      <Section band>
        <Wrap>
          <SectionHead
            lede={
              <p>
                AAfiends started in the rooms of AA, but the same Addiction Intelligence Virus runs
                on more than alcohol: opioids, nicotine, cannabis, gambling, and more. The defense is
                the same for all of them — daily data, the BIO 12 protocol, and the fellowship.
                Learn how the virus works, then starve it.
              </p>
            }
          >
            One virus. <em>Many faces.</em>
          </SectionHead>
          <CtaRow>
            <ButtonPrimary href="/protocol">The BIO 12 firewall</ButtonPrimary>
            <ButtonGhost href="https://aivirus.org/the-virus" external>
              See the 10 vectors
            </ButtonGhost>
            <ButtonQuiet href="https://aivirus.org/data" external>
              The statistics
            </ButtonQuiet>
          </CtaRow>
        </Wrap>
      </Section>

      {/* ── Why we track ─────────────────────────────────────── */}
      <Section>
        <Wrap>
          <PullQuote cite="— Why We Track, from the AAfiends journal">
            We&rsquo;re dumping the excuses, we are looking at what&rsquo;s real — tracking daily
            habits, not just hiding how we feel.
          </PullQuote>
        </Wrap>
      </Section>

      {/* ── Substack ─────────────────────────────────────────── */}
      <Section band tight>
        <Wrap>
          <SectionHead>
            Latest from the <em>Substack</em>
          </SectionHead>
          <div className="mt-10">{substackLatest}</div>

          <div className="mt-14 border-t border-[#1d231d] pt-10">
            <SubHead>Get it in your inbox</SubHead>
            <p className="mt-3 max-w-[52ch] text-[#b8b4a6]">
              The podcast and newsletter every week. No spam, just biology-first recovery strategies
              you can use immediately.
            </p>
            <div className="mt-6 max-w-xl">
              <SubstackSubscribe />
            </div>
          </div>
        </Wrap>
      </Section>

      <SiteFooter />
    </div>
  );
}
