import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CrashCourseSection from "@/components/CrashCourseSection";
import CrisisSupport from "@/components/CrisisSupport";
import { DoseStack, DoseMap, CravingWaveAndSpike, SmartImage } from "@/components/DoseFigures";
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
  EditorialList,
  EditorialRow,
  Stat,
  ButtonGhost,
  ButtonQuiet,
  CtaRow,
  PullQuote,
} from "@/components/design";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The 90 R&R Crash Course — Seven Days, One Sitting | AAfiends",
  description:
    "Eighty minutes, seven days, one printed journal. It covers what the disease actually is, the four chemicals you rebuild, and then walks day by day from Day Zero to Day Seven. Watch it once with the booklet in front of you and you can start the same day.",
  alternates: { canonical: "https://aafiends.com/90rr" },
};

const VERSION = "Beta 1";
// Beta 1 — featured downloads
const MONTHLY_PDF = "/90rr/90rr-month1-reset-journal-beta1.pdf";
const STARTER_PDF = "/90rr/90rr-7day-starter-beta1.pdf";
const REFILL_PDF = "/90rr/90rr-refill-pages-beta1.pdf";
const MONTHLY_BOOKLET = "/90rr/90rr-month1-reset-journal-beta1-booklet.pdf";
const STARTER_BOOKLET = "/90rr/90rr-7day-starter-beta1-booklet.pdf";
const REFILL_BOOKLET = "/90rr/90rr-refill-pages-beta1-booklet.pdf";

// Alpha 1 — archived downloads
const ALPHA_MONTHLY = "/90rr/90rr-month1-reset-journal-v5.pdf";
const ALPHA_STARTER = "/90rr/90rr-7day-starter-v5.pdf";
const ALPHA_REFILL = "/90rr/90rr-refill-pages-v5.pdf";
const ALPHA_MONTHLY_BOOKLET = "/90rr/90rr-month1-reset-journal-booklet-v5.pdf";
const ALPHA_STARTER_BOOKLET = "/90rr/90rr-7day-starter-booklet-v5.pdf";
const ALPHA_REFILL_BOOKLET = "/90rr/90rr-refill-pages-booklet-v5.pdf";

const PILLARS = [
  {
    n: "1",
    name: "The Engine",
    sub: "Body · Hardware",
    doseTag: "Directly rebuilds Dopamine & Endorphins through sleep, morning light, movement, and physical recovery.",
    qr: "engine",
    photo: PHOTOS.bridgeRunner,
    qrLabel: "The BIO 12 protocol",
    qrUrl: "https://aivirus.org/bio12",
    body:
      "Your body is the hardware the addiction ran down. Before the mind can hold a spiritual idea, the nervous system has to stop screaming. We stabilize it with the basics, measured daily: sleep, morning light, movement, real fuel, and hydration.",
    tracks: ["Sleep: bedtime, hours, quality", "Morning ignition: water, light, movement", "Fuel & hydration", "Physical pain / body signals"],
  },
  {
    n: "2",
    name: "The Network",
    sub: "Community · Social",
    doseTag: "Triggers Oxytocin release — your biological buffer against isolation and craving loops.",
    qr: "network",
    photo: PHOTOS.meetingCircle,
    qrLabel: "The 12 & 12",
    qrUrl: "https://aafiends.com/framework#traditions",
    body:
      "Addiction is a disease of isolation. The Network is the antidote and it is biological: sitting in a room, calling a sponsor, and helping another person releases oxytocin, a direct buffer against the next craving.",
    tracks: ["Meetings & the rooms", "Sponsor / Vanguard check-ins", "Peer outreach", "Service"],
  },
  {
    n: "3",
    name: "The Mirror",
    sub: "Spirit · Mind",
    doseTag: "Restores Serotonin and calms the nervous system through daily stillness and surrender.",
    qr: "mirror",
    photo: PHOTOS.windowStillness,
    qrLabel: "G.A.D. — spiritual framing",
    qrUrl: "https://aafiends.com/framework#gad",
    body:
      "An honest daily read that strips the ego out of self-evaluation. The Mirror is where you set down self-will: a moment of stillness, an honest look at where you tried to force outcomes, gratitude, and a rating of your own clarity.",
    tracks: ["Stillness / prayer / meditation", "Surrendering what you cannot control", "Ego & resentment check", "Gratitude & clarity"],
  },
];

const STEPS = [
  { n: 1, phase: "Reset", full: "We admitted we were powerless over our addiction — that our lives had become unmanageable.", why: "Stop fighting reality. Naming that willpower alone has failed is not defeat — it is the first honest data point." },
  { n: 2, phase: "Reset", full: "Came to believe that a Power greater than ourselves could restore us to sanity.", why: "You do not have to define it. You only have to accept you are not the highest power — and that help exists." },
  { n: 3, phase: "Reset", full: "Made a decision to turn our will and our lives over to the care of God as we understood Him.", why: "Hand over the wheel. This lowers the cortisol that feeds the craving loop and lets you stop white-knuckling." },
  { n: 4, phase: "Restructure", full: "Made a searching and fearless moral inventory of ourselves.", why: "A code-audit of the behavioral loops — resentments, fears, patterns — that keep relapsing you." },
  { n: 5, phase: "Restructure", full: "Admitted to God, to ourselves, and to another human being the exact nature of our wrongs.", why: "Secrets keep you sick. Said out loud to one trusted person, they lose their grip." },
  { n: 6, phase: "Restructure", full: "Were entirely ready to have these defects of character removed.", why: "Willingness, not perfection. You just have to stop defending the old patterns." },
  { n: 7, phase: "Restructure", full: "Humbly asked to have our shortcomings removed.", why: "You cannot think your way out of character; you ask, and then you act differently." },
  { n: 8, phase: "Recalibrate", full: "Made a list of all persons we had harmed, and became willing to make amends to them all.", why: "Name the wreckage. Willingness first — the action comes next." },
  { n: 9, phase: "Recalibrate", full: "Made direct amends to such people wherever possible, except when to do so would injure them or others.", why: "Clear the emotional debt. This is where the shame that fuels using finally drains out." },
  { n: 10, phase: "Every day", full: "Continued to take personal inventory and when we were wrong promptly admitted it.", why: "This journal is your Step 10 — a daily check so small resentments never compound." },
  { n: 11, phase: "Every day", full: "Sought through prayer and meditation to improve our conscious contact with a Higher Power, praying only for knowledge of its will for us and the power to carry that out.", why: "The Mirror pillar in practice — stillness that keeps you connected instead of self-driven." },
  { n: 12, phase: "Every day", full: "Having had a spiritual awakening as the result of these steps, we tried to carry this message to others, and to practice these principles in all our affairs.", why: "Service protects the giver. Carrying it to the next person is how the streak becomes a life." },
];

const SCIENCE = [
  ["Sleep", "Deep sleep clears metabolic waste and rebuilds GABA — less craving, less anxiety, less fog."],
  ["Morning light", "10–15 minutes of outdoor light sets the body clock: a clean dopamine bump now, melatonin on time tonight."],
  ["Fermented / gut food", "Up to ~90% of serotonin is made in the gut. Rebuilding the microbiome restores calm, steady mood."],
  ["Cold or a brisk walk", "A clean dopamine and adrenaline lift you earned — teaching the brain to feel good without a substance."],
  ["Meetings & service", "Connection releases oxytocin, the biological opposite of isolation and its cravings."],
  ["Surrender / stillness", "Handing over what you cannot control shifts you out of fight-or-flight, lowering the cortisol that drives the loop."],
];

const ECOSYSTEM = [
  { name: "AAfiends", tag: "The Dashboard", url: "https://aafiends.com", qr: "how", desc: "Daily telemetry, the AI Mirror, the BIO 12 protocol, and the AI4AA course. Your recovery command center." },
  { name: "RaceFiends", tag: "The Pavement", url: "https://racefiends.com", qr: "race", desc: "Running accountability with honest stakes. Movement is Pillar 1 — rebuild the baseline on the trail." },
  { name: "AIVirus", tag: "The Diagnosis", url: "https://aivirus.org", qr: "aiv", desc: "Meet the Addiction Intelligence Virus across its vectors — and the BIO 12 firewall that starves it." },
];

const DOSE = [
  { l: "D", name: "Dopamine", tag: "Reward · Drive", body: "Motivation and focus. Earned back with cold, daylight, movement, and finishing hard things.", earn: "Cold plunge · walk · sunlight" },
  { l: "O", name: "Oxytocin", tag: "Bonding · Safety", body: "The bonding chemical — your biological buffer against the next craving. Isolation starves it.", earn: "Meetings · sponsor call · service" },
  { l: "S", name: "Serotonin", tag: "Mood · Calm", body: "Your steady baseline mood — about 90% of it is made in the gut, not the head.", earn: "Gut-friendly food · sun · sleep" },
  { l: "E", name: "Endorphins", tag: "Pain Relief", body: "Your built-in painkiller and natural high — paid for with physical effort, not a bottle.", earn: "Hard workout · heat · laughter" },
];

const EARNED = [
  { title: "Feed the factory", desc: "Protein, fermented food and fiber hand the body raw materials for Serotonin.", href: "/90rr/fuel" },
  { title: "Anchor the dopamine", desc: "Cold immersion raises baseline dopamine up to +250% — held for hours, no crash.", href: "/90rr/reset" },
  { title: "Move it back online", desc: "A daily walk reinstalls the D2/D3 reward receptors burned out by the substance.", href: "/90rr/reset" },
];

const GUIDES = [
  { href: "/90rr/daily-dose", tag: "The Engine · Resupply", title: "Daily Dose", desc: "Supplements & superfoods that rebuild D.O.S.E., graded by real evidence." },
  { href: "/90rr/fuel", tag: "The Engine · Food", title: "DOSE Kitchen", desc: "Grocery list that rebuilds all 4 chemicals from raw materials up." },
  { href: "/90rr/reset", tag: "The Reset · Cold", title: "Regulate Dopamine", desc: "Cold immersion & walking — plus a $600 cold plunge build." },
  { href: "/90rr/meditation", tag: "The Mirror · Stillness", title: "Vipassana Guide", desc: "Sit with cravings: 15 & 30 min guides built on Atomic Habits." },
  { href: "/90rr/shopping-list", tag: "Print & Go", title: "Shopping Lists", desc: "DOSE grocery list & cold plunge parts list in one place." },
];

const BETA_EDITIONS = [
  { title: "7-Day Quick Start", sub: "Print & go · easy share", desc: "One week to test-drive the system.", full: STARTER_PDF, half: STARTER_BOOKLET },
  { title: "30-Day · Month 1", sub: "Includes Vipassana + Yoga spread", desc: "A month of daily Action Logs with weekly review + practice pages.", full: MONTHLY_PDF, half: MONTHLY_BOOKLET },
  { title: "Refill Pages", sub: "For a 3-ring binder", desc: "Daily pages + weekly review, no intro.", full: REFILL_PDF, half: REFILL_BOOKLET },
];

const ALPHA_EDITIONS = [
  { title: "7-Day Quick Start", sub: "Alpha 1 · classic", full: ALPHA_STARTER, half: ALPHA_STARTER_BOOKLET },
  { title: "30-Day · Month 1", sub: "Alpha 1 · classic", full: ALPHA_MONTHLY, half: ALPHA_MONTHLY_BOOKLET },
  { title: "Refill Pages", sub: "Alpha 1 · classic", full: ALPHA_REFILL, half: ALPHA_REFILL_BOOKLET },
];

/* The design-system button shapes, as anchors, so each PDF keeps its `download`
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

function DownloadGhost({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      download
      className={`${BTN_BASE} border border-[#f2efe6]/35 text-[#f2efe6] hover:border-[#f2efe6]`}
    >
      {children}
    </a>
  );
}

const DL_LINK =
  "font-measure text-[13px] text-[#4cc07a] underline decoration-[#1d231d] underline-offset-4 transition-colors hover:decoration-[#4cc07a]";

/** The printed journal's QR codes — a scannable bridge from paper to page. */
function QR({ img, label, url }: { img: string; label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3.5 rounded-[14px] border border-[#1d231d] p-3 pr-6 no-underline transition-colors hover:border-[#2a322a]"
    >
      <Image
        src={`/90rr/qr_${img}.png`}
        alt={`QR code linking to ${label}`}
        width={64}
        height={64}
        className="h-16 w-16 rounded-lg bg-white p-1"
      />
      <span className="flex flex-col">
        <span className="font-measure text-[11px] text-[#7d7a70]">Scan or tap</span>
        <span className="text-[15px] font-semibold leading-tight text-[#f2efe6]">{label}</span>
        <span className="font-measure text-[12px] text-[#4cc07a]">
          {url.replace("https://", "")}
        </span>
      </span>
    </a>
  );
}

/** A ruled row. Rules, not cards. */
function ListRow({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-[#1d231d] py-5">
      <h3 className="font-display text-[1.2rem] leading-tight text-[#f2efe6]">{term}</h3>
      <p className="mt-1.5 max-w-[56ch] text-[15.5px] text-[#b8b4a6]">{children}</p>
    </div>
  );
}

export default function NinetyRRPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <SiteHeader />

      <PageHero
        photo={PHOTOS.writingHands}
        title={
          <>
            The 90 R&amp;R <em>journal.</em>
          </>
        }
        lede="The detailed online companion to the printable Recovery & Restructure workbook. Every chemical, every pillar, every step, and the science behind them."
        meta={`Free · no signup · ${VERSION}`}
      >
        <CtaRow>
          <DownloadPrimary href={MONTHLY_PDF}>Download Month 1 ({VERSION})</DownloadPrimary>
          <DownloadGhost href={STARTER_PDF}>The 7-day starter</DownloadGhost>
        </CtaRow>
        <p className="font-measure mt-6 text-[12.5px] text-[#f2efe6]/70">
          PDF · US Letter · print double-sided · {VERSION} — always the latest version on this page.
        </p>
        <p className="mt-4 max-w-[52ch] text-[15px] text-[#f2efe6]/90">
          Want structure and accountability with it?{" "}
          <Link
            href="/90-r-and-r"
            className="underline decoration-[#e0a45c]/60 underline-offset-4 transition-colors hover:decoration-[#e0a45c]"
          >
            The 12-seat R&amp;R Fellowship cohort
          </Link>{" "}
          works this same journal together — starts mid-August.
        </p>
      </PageHero>

      {/* ── The manifesto, in one line ───────────────────────── */}
      <Section tight>
        <Wrap>
          <PullQuote>
            Stabilize the hardware, then run the software. Biology first, framework second — one
            structured, inclusive system.
          </PullQuote>
        </Wrap>
      </Section>

      {/* ── The approach ─────────────────────────────────────── */}
      <Section band>
        <Wrap>
          <SectionHead
            lede={
              <p>
                Three moves, in that order. Everything else in the journal hangs off one of them.
              </p>
            }
          >
            Biology first, <em>then the framework.</em>
          </SectionHead>

          <StackList
            items={[
              {
                n: "01",
                title: "Body is hardware",
                body: "Addiction ran the nervous system down. Before any spiritual idea can hold, biology has to stabilize: sleep, daylight, and D.O.S.E. chemistry restored in small, clean doses.",
              },
              {
                n: "02",
                title: "Layer the framework",
                body: "On top of a stabilizing body, the AA 12-Step framework and the Network (rooms, sponsor, service) do the deeper structural work to clear wreckage and ego.",
              },
              {
                n: "03",
                title: "One inclusive system",
                body: "A measured daily system (VSE score out of 10) with Higher Power “as you understand it.” Zero belief required to begin — structure anyone can lean on.",
              },
            ]}
          />

          <div className="mt-14">
            <DoseStack />
          </div>

          <div className="mt-10">
            <SmartImage
              src="/90rr/img/approach-hero.jpg"
              alt="A man sitting on the edge of his bed in early morning light, steadying himself before the day starts"
              caption="The vessel comes first · Stabilize the hardware before running the software"
              accent="#4cc07a"
            />
          </div>
        </Wrap>
      </Section>

      {/* ── The biology: D.O.S.E. ────────────────────────────── */}
      <Section>
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <SectionHead
              lede={
                <p>
                  Almost everything that feels good runs on four brain chemicals. The substance faked
                  all four at once through one door — so your brain turned the volume down to
                  compensate. Recovery is teaching the body to make its own again in small, clean
                  doses you <strong>earn</strong>.
                </p>
              }
            >
              D.O.S.E. — your <em>four chemicals.</em>
            </SectionHead>
            <Figure photo={PHOTOS.coldLake} />
          </div>

          <div className="mt-14">
            <DoseMap />
          </div>

          <StackList
            items={DOSE.map((ch) => ({
              n: ch.l,
              title: ch.name,
              body: (
                <>
                  {ch.body}{" "}
                  <span className="font-semibold text-[#f2efe6]">Earn it:</span> {ch.earn}
                </>
              ),
              maps: ch.tag,
            }))}
          />

          <div className="mt-16">
            <SubHead>Earn it, three ways</SubHead>
            <EditorialList>
              {EARNED.map((e) => (
                <EditorialRow
                  key={e.title}
                  href={e.href}
                  title={e.title}
                  body={e.desc}
                  go="Read the field guide"
                />
              ))}
            </EditorialList>
          </div>
        </Wrap>
      </Section>

      {/* ── The 3-pillar system ──────────────────────────────── */}
      <Section band>
        <Wrap>
          <SectionHead
            lede={
              <p>
                Three daily systems hold a single day of sobriety: <strong>Surrender</strong> +{" "}
                <strong>D.O.S.E.</strong> + <strong>Community</strong> = 1 day sober. Score all three
                as your daily VSE out of 10.
              </p>
            }
          >
            The three-pillar <em>system.</em>
          </SectionHead>

          <div className="mt-8">
            <QR img="how" label="The AAfiends dashboard" url="https://aafiends.com" />
          </div>

          {PILLARS.map((p, i) => (
            <PhotoRow key={p.name} photo={p.photo} flip={i % 2 === 1}>
              <SubHead>
                <span className="font-measure text-[1.1rem] text-[#4cc07a]">{p.n}</span> · {p.name}
              </SubHead>
              <p className="font-measure mt-1.5 text-[13px] text-[#7d7a70]">{p.sub}</p>
              <p className="mt-4 max-w-[52ch] text-[#b8b4a6]">{p.body}</p>
              <p className="mt-4 max-w-[52ch] text-[15.5px] text-[#b8b4a6]">
                <span className="font-semibold text-[#f2efe6]">Chemical tie:</span> {p.doseTag}
              </p>
              <ul className="mt-6 border-t border-[#1d231d] text-[15px] text-[#b8b4a6]">
                {p.tracks.map((t) => (
                  <li key={t} className="border-b border-[#1d231d] py-2.5">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <QR img={p.qr} label={p.qrLabel} url={p.qrUrl} />
              </div>
            </PhotoRow>
          ))}
        </Wrap>
      </Section>

      {/* ── The practice spread ──────────────────────────────── */}
      <Section>
        <Wrap>
          <SectionHead
            lede={
              <p>
                Two facing pages built directly into the workbook: <strong>Vipassana</strong> to sit
                with a craving instead of obeying it, and <strong>Yoga &amp; Walking</strong> —
                moving meditation that earns slow-release dopamine.
              </p>
            }
          >
            The practice spread — <em>stillness and movement.</em>
          </SectionHead>
          <p className="font-measure mt-5 text-[13px] text-[#e0a45c]">New in {VERSION}</p>

          <div className="mt-12 grid gap-8 sm:mt-16 sm:grid-cols-2">
            <figure>
              <div className="overflow-hidden rounded-[14px] border border-[#1d231d] bg-white">
                <Image
                  src="/90rr/90rr-beta1-practice-vipassana.png"
                  alt="The Vipassana practice page from the printed journal, with prompts for sitting with a craving"
                  width={1275}
                  height={1650}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="font-measure mt-3 text-[12.5px] text-[#7d7a70]">
                Vipassana &middot; sit with the craving
              </figcaption>
            </figure>
            <figure>
              <div className="overflow-hidden rounded-[14px] border border-[#1d231d] bg-white">
                <Image
                  src="/90rr/90rr-beta1-practice-yoga.png"
                  alt="The Yoga and Walking practice page from the printed journal, with space to log moving meditation"
                  width={1275}
                  height={1650}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="font-measure mt-3 text-[12.5px] text-[#7d7a70]">
                Yoga &amp; Walking &middot; meditation in motion
              </figcaption>
            </figure>
          </div>

          <div className="mt-12">
            <SmartImage
              src="/90rr/img/practice-stillness.jpg"
              alt="A woman sitting cross-legged on a bare floor, eyes closed, waiting out a craving"
              caption="Vipassana in practice · Sitting still until the 20-minute craving wave recedes"
              accent="#7fb3a3"
            />
          </div>
        </Wrap>
      </Section>

      {/* ── The 12 Steps ─────────────────────────────────────── */}
      <Section id="steps" band className="scroll-mt-28">
        <Wrap>
          <SectionHead
            lede={
              <p>
                <strong>With the body coming back online, the Steps do the deeper work</strong> of
                restructuring character, repairing wreckage, and building daily spiritual discipline.
                Take “God as we understood Him” to mean a Higher Power as you understand it; no
                belief is required to begin.
              </p>
            }
          >
            The 12 Steps, <em>in plain language.</em>
          </SectionHead>

          <StackList
            items={STEPS.map((s) => ({
              n: String(s.n).padStart(2, "0"),
              title: <span className="block max-w-[56ch]">{s.full}</span>,
              body: (
                <>
                  <span className="font-semibold text-[#f2efe6]">What it asks:</span> {s.why}
                </>
              ),
              maps: s.phase,
            }))}
          />

          <div className="mt-10">
            <QR
              img="steps"
              label="The 12 Steps & 12 Traditions"
              url="https://aafiends.com/framework"
            />
          </div>

          <p className="font-measure mt-8 max-w-[70ch] text-[12.5px] leading-relaxed text-[#7d7a70]">
            The Twelve Steps are adapted from Alcoholics Anonymous. AAfiends is not affiliated with
            or endorsed by A.A. World Services, Inc.
          </p>
        </Wrap>
      </Section>

      {/* ── The science ──────────────────────────────────────── */}
      <Section>
        <Wrap>
          <SectionHead
            lede={
              <p>
                Nothing in the journal is a chore for its own sake. Each daily move repairs a
                specific part of the neurochemistry the substance broke down.
              </p>
            }
          >
            The science, <em>briefly.</em>
          </SectionHead>

          <div className="mt-12 sm:mt-16">
            <CravingWaveAndSpike />
          </div>

          <div className="mt-14 grid border-t border-[#1d231d] md:grid-cols-2 md:gap-x-14">
            {SCIENCE.map(([t, d]) => (
              <ListRow key={t} term={t}>
                {d}
              </ListRow>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <QR
              img="science"
              label="The research, in plain English"
              url="https://aafiends.com/blog"
            />
            <QR img="engine" label="The BIO 12 protocol" url="https://aivirus.org/bio12" />
          </div>
        </Wrap>
      </Section>

      {/* ── Know the enemy ───────────────────────────────────── */}
      <Section band>
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            <div>
              <SectionHead>
                The A.I.V. — one virus, <em>many faces.</em>
              </SectionHead>
              <p className="mt-6 max-w-[62ch] text-[#b8b4a6]">
                We do not treat addiction as a moral failing. It behaves like a virus — the{" "}
                <strong className="font-semibold text-[#f2efe6]">
                  Addiction Intelligence Virus
                </strong>{" "}
                — an adaptive infection of the brain&apos;s reward system. Alcohol, opioids,
                nicotine, gambling, sugar: the surface differs, the mechanism is identical. It floods
                dopamine, forces the brain to down-regulate its own receptors, and leaves you in a
                baseline deficit. The three pillars are the firewall that starves it.
              </p>
              <div className="mt-8">
                <QR img="aiv" label="Meet the virus — the vectors" url="https://aivirus.org/the-virus" />
              </div>
            </div>
            <figure className="relative aspect-square overflow-hidden rounded-[14px] bg-[#0d0f0d]">
              <Image
                src="/aiv_threat.png"
                alt="An illustration of the Addiction Intelligence Virus as a dark shape coiled around the brain's reward system"
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover"
              />
            </figure>
          </div>
        </Wrap>
      </Section>

      {/* ── The Daily Dose ───────────────────────────────────── */}
      <Section>
        <Wrap>
          <SectionHead
            lede={
              <p>
                Supplements and superfoods that rebuild <strong>D.O.S.E.</strong> — what I take, when
                I take it, what the evidence actually says, and what it costs a day. Called the{" "}
                <strong>Daily Dose</strong> because dopamine doesn&apos;t bank overnight any more
                than sobriety does. Twenty-four hours is the unit for both.
              </p>
            }
          >
            The <em>Daily Dose.</em>
          </SectionHead>

          <div className="mt-2 flex flex-wrap gap-x-12 gap-y-2">
            <Stat value="$0.55">a day for the Core Five</Stat>
            <Stat value="3">checkpoints, not a schedule</Stat>
            <Stat value="24h">the only unit that counts</Stat>
          </div>

          <div className="-mx-2 mt-12 overflow-x-auto px-2 sm:mt-16">
            <Image
              src="/90rr/img/dd-dose-map.svg"
              alt="Which supplements and superfoods restock each of the four chemicals"
              width={1200}
              height={820}
              className="h-auto w-full min-w-[720px] rounded-[14px] border border-[#1d231d]"
            />
          </div>

          <CtaRow>
            <ButtonGhost href="/90rr/daily-dose">Read the full ledger</ButtonGhost>
            <ButtonQuiet href="/90rr/shopping-list">Print the shopping list</ButtonQuiet>
          </CtaRow>

          <p className="mt-8 max-w-[70ch] text-[13px] leading-relaxed text-[#7d7a70]">
            Not medical advice. Supplements interact with medications — talk to your doctor first,
            especially about 5-HTP if you take an antidepressant.
          </p>
        </Wrap>
      </Section>

      {/* ── DOSE field guides ────────────────────────────────── */}
      <Section band>
        <Wrap>
          <SectionHead
            lede={
              <p>
                Field guides on rebuilding <strong>D.O.S.E.</strong> naturally, with real food and
                earned habits. Ends with print-and-go lists.
              </p>
            }
          >
            Earn your <em>four chemicals.</em>
          </SectionHead>

          <div className="mt-10 border-t border-[#1d231d] sm:mt-14">
            {GUIDES.map((g) => (
              <Link
                key={g.href + g.title}
                href={g.href}
                className="grid items-center gap-2 border-b border-[#1d231d] px-1 py-6 no-underline transition-colors hover:bg-[#0d0f0d] sm:grid-cols-[1fr_2fr_auto] sm:gap-6"
              >
                <div>
                  <h3 className="font-display text-[1.3rem] leading-tight text-[#f2efe6]">
                    {g.title}
                  </h3>
                  <p className="font-measure mt-1 text-[12.5px] text-[#7d7a70]">{g.tag}</p>
                </div>
                <p className="max-w-[58ch] text-[15px] text-[#b8b4a6]">{g.desc}</p>
                <span className="font-measure whitespace-nowrap text-[13px] text-[#4cc07a]">
                  Read guide →
                </span>
              </Link>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ── The crash course ─────────────────────────────────── */}
      <Section>
        <Wrap>
          <CrashCourseSection starterPdf={STARTER_PDF} starterBookletPdf={STARTER_BOOKLET} />
        </Wrap>
      </Section>

      {/* ── Download the journal ─────────────────────────────── */}
      <Section band className="scroll-mt-28">
        <Wrap>
          <SectionHead
            lede={
              <p>
                <strong>{VERSION}</strong> is the current workbook — single-page Action Log facing a
                ruled Notes &amp; Insight page, plus the new Vipassana + Yoga practice spread. Pick
                any length below; each comes full-size or as a fold-and-staple booklet.
              </p>
            }
          >
            Download the <em>journal.</em>
          </SectionHead>
          <p className="font-measure mt-5 text-[13px] text-[#e0a45c]">
            Current · {VERSION} layout
          </p>

          <div className="mt-10 border-t border-[#1d231d] sm:mt-14">
            {BETA_EDITIONS.map((o) => (
              <div
                key={o.title}
                className="grid items-center gap-3 border-b border-[#1d231d] px-1 py-6 sm:grid-cols-[1.1fr_1.5fr_auto] sm:gap-8"
              >
                <div>
                  <h3 className="font-display text-[1.3rem] leading-tight text-[#f2efe6]">
                    {o.title}
                  </h3>
                  <p className="font-measure mt-1 text-[12.5px] text-[#7d7a70]">{o.sub}</p>
                </div>
                <p className="max-w-[46ch] text-[15px] text-[#b8b4a6]">{o.desc}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-end">
                  <a href={o.full} download className={DL_LINK}>
                    Full size · 8.5×11
                  </a>
                  <a href={o.half} download className={DL_LINK}>
                    Half size · booklet
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-[70ch]">
            <SubHead>Two ways to print</SubHead>
            <p className="mt-3 text-[15px] leading-relaxed text-[#b8b4a6]">
              <strong className="font-semibold text-[#f2efe6]">Full size (8.5×11):</strong> print
              double-sided, flip on the <strong className="font-semibold text-[#f2efe6]">long</strong>{" "}
              edge so each Action Log lines up with its Notes page.
            </p>
            <p className="mt-2.5 text-[15px] leading-relaxed text-[#b8b4a6]">
              <strong className="font-semibold text-[#f2efe6]">Half size (booklet):</strong> print
              double-sided, flip on the{" "}
              <strong className="font-semibold text-[#f2efe6]">short</strong> edge, fold stack in
              half and staple twice on spine — 5.5×8.5&quot; mini-book.
            </p>
          </div>

          {/* Alpha 1 — archived, still downloadable for anyone who prefers it. */}
          <details className="group mt-12 border-t border-[#1d231d] pt-6">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-[15px] font-semibold text-[#b8b4a6] transition-colors hover:text-[#f2efe6]">
              <ChevronRight
                size={16}
                className="text-[#e0a45c] transition-transform group-open:rotate-90"
                aria-hidden="true"
              />
              Older version · Alpha 1 (classic two-page day)
            </summary>
            <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-[#7d7a70]">
              The original layout — two-page day (morning left, evening right). Archived for anyone
              who prefers it. No longer updated.
            </p>
            <div className="mt-6 border-t border-[#1d231d]">
              {ALPHA_EDITIONS.map((o) => (
                <div
                  key={o.title}
                  className="grid items-center gap-3 border-b border-[#1d231d] px-1 py-5 sm:grid-cols-[1fr_auto] sm:gap-8"
                >
                  <div>
                    <h4 className="font-display text-[1.15rem] leading-tight text-[#b8b4a6]">
                      {o.title}
                    </h4>
                    <p className="font-measure mt-1 text-[12px] text-[#7d7a70]">{o.sub}</p>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-end">
                    <a href={o.full} download className={DL_LINK}>
                      Full size
                    </a>
                    <a href={o.half} download className={DL_LINK}>
                      Booklet
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </details>

          <CtaRow className="mt-12">
            <DownloadPrimary href={MONTHLY_PDF}>Download Month 1 ({VERSION})</DownloadPrimary>
            <ButtonGhost href="/90rr/builder">Build your own custom journal</ButtonGhost>
            <ButtonQuiet href="/90-r-and-r#reserve">Reserve a seat in the Fellowship</ButtonQuiet>
          </CtaRow>
        </Wrap>
      </Section>

      {/* ── Peek inside ──────────────────────────────────────── */}
      <Section>
        <Wrap>
          <SectionHead
            lede={
              <p>
                {VERSION} puts the whole day on one <strong>Action Log</strong> — sleep, movement,
                meeting, mood and score — facing a ruled <strong>Notes &amp; Insight</strong> page.
              </p>
            }
          >
            What a day <em>looks like.</em>
          </SectionHead>

          <div className="mt-12 grid gap-8 sm:mt-16 sm:grid-cols-2">
            <figure>
              <div className="overflow-hidden rounded-[14px] border border-[#1d231d] bg-white">
                <Image
                  src="/90rr/90rr-beta1-day-actionlog.png"
                  alt="The Action Log page from the printed journal — one day of sleep, movement, meeting, mood and score"
                  width={1275}
                  height={1650}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="font-measure mt-3 text-[12.5px] text-[#7d7a70]">
                Action Log &middot; the whole day, one page
              </figcaption>
            </figure>
            <figure>
              <div className="overflow-hidden rounded-[14px] border border-[#1d231d] bg-white">
                <Image
                  src="/90rr/90rr-beta1-day-notes.png"
                  alt="The ruled Notes and Insight page that faces each Action Log in the printed journal"
                  width={1275}
                  height={1650}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="font-measure mt-3 text-[12.5px] text-[#7d7a70]">
                Notes &amp; Insight &middot; facing page
              </figcaption>
            </figure>
          </div>
        </Wrap>
      </Section>

      {/* ── The whole grid ───────────────────────────────────── */}
      <Section band>
        <Wrap>
          <SectionHead
            lede={<p>R&amp;R is one front in a larger fight. Same disease, attacked from three angles.</p>}
          >
            The whole <em>grid.</em>
          </SectionHead>

          <EditorialList>
            {ECOSYSTEM.map((e) => (
              <EditorialRow
                key={e.name}
                href={e.url}
                title={e.name}
                body={e.desc}
                go={e.tag}
                external
              />
            ))}
          </EditorialList>

          <div className="mt-10 flex flex-wrap gap-4">
            {ECOSYSTEM.map((e) => (
              <QR key={e.qr} img={e.qr} label={`Visit ${e.name}`} url={e.url} />
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ── Crisis support & safety ──────────────────────────── */}
      <Section tight>
        <Wrap>
          <CrisisSupport />
          <p className="font-measure mt-6 max-w-[76ch] text-[12.5px] leading-relaxed text-[#7d7a70]">
            Not medical advice · Peer support and personal experience only · Not affiliated with
            Alcoholics Anonymous World Services, Inc.
          </p>
        </Wrap>
      </Section>

      <SiteFooter />
    </div>
  );
}
