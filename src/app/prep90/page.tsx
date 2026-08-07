// The destination for the Preps & Tools QR code in the printed journal.
import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { PHOTOS } from "@/lib/photos";
import {
  Wrap,
  Section,
  SectionHead,
  PageHero,
  Figure,
  ButtonGhost,
  CtaRow,
  CalloutBand,
} from "@/components/design";

export const metadata: Metadata = {
  title: "Preps & Tools — 90 R&R | AAfiends",
  description:
    "Everything to gather before Day 1 of the 90 Days R&R journal: gear, protocols, the movement guide, and a starter grocery list.",
};

const JOURNAL_PDF = "/90rr/90RR-Journal-Month1-Alpha1.pdf";

const GEAR = [
  ["Apple cider vinegar + sea salt", "Morning hydration — stabilizes energy and mood before caffeine."],
  ["A watch (Garmin / Apple / Whoop / Oura)", "Turns “I slept okay” into real data — hours, wake-ups, HRV."],
  ["A simple scale", "A weekly body check — one data point, no obsessing."],
  ["Good pens you enjoy", "You write here every day. Make it something you like holding."],
  ["Water bottle", "Keep it on you. Hydration is Pillar 1."],
  ["Yoga mat", "Floor mobility, stretching, and the intensive day."],
  ["Walking shoes", "Zone 2 walk-runs are the backbone of movement."],
  ["A quiet spot", "A corner for 5 minutes of stillness or prayer."],
];

const PROTOCOLS = [
  ["Sleep-tracking", "Log hours, wake-ups, and HRV every morning on Side A. Deep sleep rebuilds GABA — your natural brake against cravings."],
  ["The Power-Nap Protocol", "Afternoon crash? Set a 36-minute alarm: ~5 minutes to fall asleep + ~30 of real rest. Longer and you wake up groggy."],
  ["The 6 AM meeting", "Anchor the day early. It front-loads connection and starts the streak before the day gets away from you."],
  ["DOSE contrast", "Cold exposure or a brisk walk gives a clean dopamine and adrenaline lift — the brain learns to feel good without a substance."],
];

const MOVEMENT = [
  ["Weights", "2–3x a week. Rebuild the body that heavy use ran down. Start light, log it."],
  ["Zone 2 walk-run", "Easy aerobic pace you can still talk through. Track streak #, miles, and time each day."],
  ["Yoga / mobility", "Decompress the spine and calm the nervous system. Great on rest days."],
];

const GROCERIES = ["Kefir", "Yogurt", "Kimchi", "Eggs", "Fatty fish / omega-3", "Leafy greens", "Berries", "Bone broth", "Sea salt & electrolytes", "Plenty of water"];

/* The design-system button shapes, as anchors, so the PDF keeps its `download`
   attribute. Same classes as ButtonPrimary / ButtonGhost. */
const BTN_BASE =
  "inline-block rounded-[10px] px-6 py-[15px] text-base font-semibold no-underline transition-[background-color,border-color,transform] duration-200 active:scale-[0.98]";

function DownloadPrimary({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} download className={`${BTN_BASE} bg-[#4cc07a] text-[#08130c] hover:bg-[#5fd08c]`}>
      {children}
    </a>
  );
}

/** A ruled row — the packing-list unit. Rules, not cards. */
function ListRow({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-[#1d231d] py-5">
      <h3 className="font-display text-[1.2rem] leading-tight text-[#f2efe6]">{term}</h3>
      <p className="mt-1.5 max-w-[56ch] text-[15.5px] text-[#b8b4a6]">{children}</p>
    </div>
  );
}

export default function Prep90Page() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <SiteHeader />

      <PageHero
        photo={PHOTOS.kitchenFuel}
        title={
          <>
            Preps and <em>tools.</em>
          </>
        }
        lede="Gather what you can before you start. None of it has to be fancy — the point is to make the daily reps easy so you actually do them."
        meta="Before day 1 · 8 things to gather · 10 groceries"
      >
        <CtaRow>
          <DownloadPrimary href={JOURNAL_PDF}>Download the journal</DownloadPrimary>
          <ButtonGhost href="/90-r-and-r#reserve">Reserve a seat</ButtonGhost>
        </CtaRow>
      </PageHero>

      {/* Where people arrive from — the crash course sends them here at Day 3. */}
      <Section tight>
        <Wrap>
          <CalloutBand>
            <p className="text-[#b8b4a6]">
              Sent here from the crash course? This is the extended list.{" "}
              <Link
                href="/90rr#crash-course"
                className="text-[#f2efe6] underline decoration-[#1d231d] underline-offset-4 transition-colors hover:decoration-[#4cc07a]"
              >
                Watch the 90 R&amp;R Crash Course on /90rr
              </Link>
              .
            </p>
          </CalloutBand>
        </Wrap>
      </Section>

      {/* ── Gear ─────────────────────────────────────────────── */}
      <Section band>
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <SectionHead
              lede={
                <p>
                  Eight things, most of which you already own. None of it is the point on its own —
                  it just removes the friction between waking up and doing the reps.
                </p>
              }
            >
              Gear to <em>have.</em>
            </SectionHead>
            <Figure photo={PHOTOS.writingHands} />
          </div>

          <div className="mt-12 grid border-t border-[#1d231d] sm:mt-16 md:grid-cols-2 md:gap-x-14">
            {GEAR.map(([term, body]) => (
              <ListRow key={term} term={term}>
                {body}
              </ListRow>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ── Protocols ────────────────────────────────────────── */}
      <Section>
        <Wrap>
          <SectionHead
            lede={
              <p>
                Four small habits that do most of the work in the first weeks. Each one is a lever on
                a specific piece of chemistry, not a chore for its own sake.
              </p>
            }
          >
            Protocols and <em>tips.</em>
          </SectionHead>

          <div className="mt-12 grid items-start gap-8 sm:mt-16 lg:grid-cols-2 lg:gap-16">
            <Figure photo={PHOTOS.coldLake} />
            <div className="border-t border-[#1d231d]">
              {PROTOCOLS.map(([term, body]) => (
                <ListRow key={term} term={term}>
                  {body}
                </ListRow>
              ))}
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── Movement ─────────────────────────────────────────── */}
      <Section band>
        <Wrap>
          <SectionHead>
            The movement <em>guide.</em>
          </SectionHead>

          <div className="mt-12 grid items-start gap-8 sm:mt-16 lg:grid-cols-2 lg:gap-16">
            <div className="border-t border-[#1d231d]">
              {MOVEMENT.map(([term, body]) => (
                <ListRow key={term} term={term}>
                  {body}
                </ListRow>
              ))}
            </div>
            <Figure photo={PHOTOS.gymLift} className="lg:order-2" />
          </div>
        </Wrap>
      </Section>

      {/* ── Groceries ────────────────────────────────────────── */}
      <Section>
        <Wrap>
          <SectionHead
            lede={
              <p>
                One shop, ten items. Most of your serotonin is made in the gut, so the first week of
                food matters more than any supplement.
              </p>
            }
          >
            Starter <em>groceries.</em>
          </SectionHead>
          <p className="font-measure mt-4 text-[13px] text-[#4cc07a]">gut · dopamine · calm</p>

          <ul className="mt-10 grid border-t border-[#1d231d] sm:mt-14 sm:grid-cols-2 sm:gap-x-14 lg:grid-cols-3">
            {GROCERIES.map((item) => (
              <li key={item} className="border-b border-[#1d231d] py-3.5 text-[#f2efe6]">
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-[58ch] text-[15.5px] text-[#b8b4a6]">
            Skip the energy drinks and heavy sugar — they spike, then crash you.
          </p>
        </Wrap>
      </Section>

      {/* ── Close ────────────────────────────────────────────── */}
      <Section band>
        <Wrap>
          <SectionHead>
            Get the <em>journal.</em>
          </SectionHead>
          <p className="mt-5 max-w-[52ch] text-[#b8b4a6]">
            Print it, gather your preps, and start Day 1. The full guide lives on the journal page.
          </p>
          <CtaRow>
            <DownloadPrimary href={JOURNAL_PDF}>Download the journal</DownloadPrimary>
            <ButtonGhost href="/90-r-and-r#reserve">Reserve a seat</ButtonGhost>
          </CtaRow>

          <p className="font-measure mt-14 max-w-[62ch] border-t border-[#1d231d] pt-6 text-[13px] leading-relaxed text-[#7d7a70]">
            90 Days R&amp;R · Biology First · Data Over Denial · Not affiliated with Alcoholics
            Anonymous World Services, Inc.
          </p>
        </Wrap>
      </Section>

      <SiteFooter />
    </div>
  );
}
