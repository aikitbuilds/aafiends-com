import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { PHOTOS } from "@/lib/photos";
import type { Photo } from "@/lib/photos";
import {
  Wrap,
  Section,
  SectionHead,
  SubHead,
  PageHero,
  PhotoRow,
  Figure,
  Prose,
  ButtonPrimary,
  ButtonGhost,
  ButtonQuiet,
  CtaRow,
} from "@/components/design";

export const metadata: Metadata = {
  title: "The Framework — 12 Steps, 12 Traditions & G.A.D.",
  description:
    "How AA Fiends works the program: the 12 Steps as the manual, the 12 Traditions as the grid, and G.A.D. — a practical, non-religious way to work Steps 3 and 11, built for skeptics in early recovery.",
  alternates: { canonical: "https://aafiends.com/framework" },
};

const ANCHORS = [
  { href: "#steps", label: "The Steps" },
  { href: "#traditions", label: "The Traditions" },
  { href: "#gad", label: "G.A.D. — the Higher Power" },
];

// The two commissioned brand illustrations, described as photos so they get the
// same frame, radius and caption treatment as every other image on the site.
const GRID_ART: Photo = {
  src: "/aa_fellowship_gad.png",
  file: "aa_fellowship_gad.png",
  alt: "The Network Grid — the fellowship that keeps you plugged in",
  caption: "The grid. Online.",
  ratio: "4:5",
};

const ARCHITECT_ART: Photo = {
  src: "/grand_architect_divine.png",
  file: "grand_architect_divine.png",
  alt: "Grand Architect Divine — handing over the admin password",
  caption: "Admin override. Access granted.",
  ratio: "4:5",
};

/** Question-and-answer rows, ruled rather than boxed. */
function FactList({
  items,
  className = "",
}: {
  items: { title: string; body: ReactNode }[];
  className?: string;
}) {
  return (
    <div className={`border-t border-[#1d231d] ${className}`}>
      {items.map((f) => (
        <div key={f.title} className="border-b border-[#1d231d] px-1 py-6">
          <h3 className="font-display text-[1.25rem] leading-tight text-[#f2efe6]">{f.title}</h3>
          <p className="mt-2 max-w-[62ch] text-[15.5px] leading-relaxed text-[#b8b4a6]">{f.body}</p>
        </div>
      ))}
    </div>
  );
}

/** The AIV verse. One rule, one italic serif voice, no gradient panel. */
function Verse({ children }: { children: ReactNode }) {
  return (
    <div className="font-display mt-10 max-w-[56ch] space-y-4 border-l border-[#2a322a] pl-6 text-[1.05rem] italic leading-relaxed text-[#b8b4a6]">
      {children}
    </div>
  );
}

export default function FrameworkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <SiteHeader />

      <main className="flex-1">
        <PageHero
          photo={PHOTOS.meetingCircle}
          height="short"
          title={
            <>
              The manual, the grid <em>&amp; the architect.</em>
            </>
          }
          lede="One page, three parts. The 12 Steps fix the infected individual. The 12 Traditions protect the community you plug into. And G.A.D. is how a skeptic hands over the admin password without pretending to be religious."
        />

        <Section tight>
          <Wrap>
            <Prose>
              <p>
                This is the operating system the <Link href="/90rr">90 R&amp;R journal</Link> runs on
                every day.
              </p>
            </Prose>
            <nav className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
              {ANCHORS.map((a) => (
                <a
                  key={a.href}
                  href={a.href}
                  className="text-[15px] text-[#b8b4a6] underline decoration-[#1d231d] underline-offset-4 transition-colors hover:text-[#f2efe6] hover:decoration-[#4cc07a]"
                >
                  {a.label}
                </a>
              ))}
            </nav>
          </Wrap>
        </Section>

        {/* ── The Steps ────────────────────────────────────────── */}
        <Section id="steps" band className="scroll-mt-28">
          <Wrap>
            <SectionHead lede={<p>Part one: the manual.</p>}>
              The 12 Steps — <em>the anti-virus scan.</em>
            </SectionHead>

            <Verse>
              <p>
                &quot;The Twelve Steps are the manual to clear away the shame,
                <br />
                To sweep out old resentments and stop playing the blame game.&quot;
              </p>
            </Verse>

            <PhotoRow photo={PHOTOS.writingHands}>
              <SubHead>How they work</SubHead>
              <p className="mt-4 max-w-[52ch] text-[#b8b4a6]">
                The 12 Steps act as the ultimate anti-virus scan — clearing out the corrupted files
                (resentments, fears, and guilt) from your past. The AIV is a highly adaptive pathogen
                that isolates you before it attacks, and the Steps are how you sweep the infection
                out of your own system, one honest pass at a time.
              </p>
            </PhotoRow>

            <div className="mt-14 max-w-[62ch]">
              <SubHead>Worked daily, not framed</SubHead>
              <p className="mt-4 text-[#b8b4a6]">
                Steps 1&ndash;3 reset the operator, 4&ndash;9 restructure the wreckage, and
                10&ndash;12 run every single day — that daily loop is exactly what the journal
                tracks.
              </p>
              <CtaRow>
                <ButtonQuiet href="/90rr#steps">
                  All 12 Steps, annotated for the first 90 days, live in the journal guide
                </ButtonQuiet>
              </CtaRow>
            </div>
          </Wrap>
        </Section>

        {/* ── The Traditions ───────────────────────────────────── */}
        <Section id="traditions" className="scroll-mt-28">
          <Wrap>
            <SectionHead lede={<p>Part two: the grid.</p>}>
              The 12 Traditions — <em>the network node.</em>
            </SectionHead>

            <Verse>
              <p>
                &quot;You cannot beat a symbiote by sitting in your room,
                <br />
                Just staring at the ceiling in a spiral of your gloom.
                <br />
                The virus loves a lonely host, a disconnected node,
                <br />
                It thrives when you are isolated on a heavy road.
              </p>
              <p>
                The Twelve Traditions build the Grid, the fellowship of friends,
                <br />
                Where nobody&rsquo;s the boss of you, and healing never ends.&quot;
              </p>
            </Verse>

            <PhotoRow photo={PHOTOS.porchSteps} flip>
              <SubHead>Why they&rsquo;re needed</SubHead>
              <p className="mt-4 max-w-[52ch] text-[#b8b4a6]">
                The Steps fix the infected individual — the Traditions protect the community so
                it&rsquo;s always there when you need to plug in. They ensure AAFiends and the AA
                fellowship remain ego-free, completely self-supporting, and focused strictly on
                keeping the next person sober.
              </p>
            </PhotoRow>

            <div className="mt-14 grid items-center gap-9 lg:grid-cols-2 lg:gap-14">
              <Figure photo={GRID_ART} />
              <FactList
                items={[
                  {
                    title: "Where it lives",
                    body: "In the meeting rooms, on phone calls with your sponsor, and in the text threads with other Initiates.",
                  },
                  {
                    title: "When to use it",
                    body: "Continuously. Especially when the H.A.L.T. triggers hit (Hungry, Angry, Lonely, Tired). You plug into the grid, and the shared power keeps your battery charged.",
                  },
                ]}
              />
            </div>
          </Wrap>
        </Section>

        {/* ── G.A.D. ───────────────────────────────────────────── */}
        <Section id="gad" band className="scroll-mt-28">
          <Wrap>
            <SectionHead lede={<p>Part three: the Grand Architect Divine.</p>}>
              G.A.D. — <em>the admin password.</em>
            </SectionHead>

            <Verse>
              <p>
                &quot;I tried to be the boss of me, the master of the code,
                <br />
                But every time I ran the script, my system would implode.
                <br />I fought the word of &lsquo;God&rsquo; because my ego was too big,
                <br />I thought I was a genius, but my life was out of sync.
              </p>
              <p>
                But G.A.D. is just the Architect who built the starry sky,
                <br />
                Who holds the master password when my brain goes all awry.
                <br />I hand the keyboard over now, I let the Builder steer,
                <br />
                And suddenly the glitching stops, the signal&rsquo;s running clear.&quot;
              </p>
            </Verse>

            <PhotoRow photo={PHOTOS.windowStillness} flip>
              <SubHead>Why we call it G.A.D.</SubHead>
              <p className="mt-4 max-w-[52ch] text-[#b8b4a6]">
                The traditional AA program asks us to turn our will over to &quot;God as we
                understood Him&quot; (Step 3). But for many logical, tech-minded people or those with
                religious baggage, the word &quot;God&quot; triggers the Ego to put its defenses up.
                By viewing God as the Grand Architect Divine (G.A.D.), it makes the spiritual
                solution undeniable: you didn&rsquo;t write the original code for your biology or the
                universe, which means you aren&rsquo;t the Master Programmer. You cannot debug a
                virus using the same infected brain that caught it. You must hand the Admin Password
                back to the Architect.
              </p>
            </PhotoRow>

            <div className="mt-14 grid items-center gap-9 lg:grid-cols-2 lg:gap-14">
              <Figure photo={ARCHITECT_ART} />
              <FactList
                items={[
                  {
                    title: "Where it lives",
                    body: "In your daily surrender (Step 3) and quiet meditation (Step 11).",
                  },
                  {
                    title: "When to use it",
                    body: "First thing in the morning before the AIV boots up, and the exact moment you feel your willpower failing.",
                  },
                  {
                    title: "How it works",
                    body: "You stop trying to outsmart the glitch. You pause, admit you are out of your depth, and ask the Grand Architect for the next right instruction.",
                  },
                ]}
              />
            </div>
          </Wrap>
        </Section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <Section>
          <Wrap>
            <SectionHead
              lede={
                <p>
                  The Steps, the Grid, and the Architect only count when they&rsquo;re worked daily.
                  The 90 R&amp;R journal turns all three into a two-minute morning and evening
                  check-in.
                </p>
              }
            >
              Now put the framework <em>to work.</em>
            </SectionHead>
            <CtaRow>
              <ButtonPrimary href="/90rr">Get the free journal</ButtonPrimary>
              <ButtonGhost href="/protocol">See the BIO 12 protocol</ButtonGhost>
            </CtaRow>
          </Wrap>
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}
