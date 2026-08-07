import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CravingWaveAndSpike } from "@/components/DoseFigures";
import { blogPosts } from "@/lib/blogData";
import { DOSE_ARTICLES } from "@/lib/doseArticles";
import { PHOTOS } from "@/lib/photos";
import {
  Wrap,
  Section,
  SectionHead,
  SubHead,
  PageHero,
  PhotoRow,
  StackList,
  EditorialList,
  EditorialRow,
  Stat,
  CalloutBand,
  Prose,
  ButtonPrimary,
  ButtonGhost,
  CtaRow,
} from "@/components/design";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "The Science of Recovery — Dopamine, Sleep & Cravings | AAfiends",
  description:
    "What actually happens in your brain in the first 90 days sober: D.O.S.E. chemistry, D2 receptor repair, why a craving peaks in 20 minutes, and why sleep beats willpower. Plain English, cited sources, biology before framework.",
  alternates: { canonical: "https://aafiends.com/the-science" },
  keywords: [
    "science of addiction recovery", "dopamine recovery timeline", "how long to reset dopamine",
    "D2 receptor recovery alcohol", "why do cravings last 20 minutes", "DOSE brain chemicals",
    "sleep and addiction recovery", "cold plunge dopamine", "biology of sobriety",
  ],
  openGraph: {
    title: "The Science of Recovery — Dopamine, Sleep & Cravings",
    description:
      "D.O.S.E. chemistry, receptor repair, and the craving wave. The biology behind the first 90 days, in plain English.",
    url: "https://aafiends.com/the-science",
    type: "article",
  },
};

// The four chemicals, each beside a photograph of somebody earning it. Every
// figure and number here came off the old D.O.S.E. infographic — nothing has
// been dropped, only re-laid so a reader meets a face while learning it.
const DOSE = [
  {
    photo: PHOTOS.trailGroup,
    letter: "D",
    name: "Dopamine, the engine",
    role: "Drive, motivation and anticipation · pillar 1, the engine",
    earn: "Cold plunge (+250%), morning sunlight, brisk walking, task completion.",
    stat: "~14 months",
    statBody: "of sobriety for D2 and D3 receptors to repair and upregulate",
    flip: false,
  },
  {
    photo: PHOTOS.meetingCircle,
    letter: "O",
    name: "Oxytocin, the network",
    role: "Bonding, trust and safety · pillar 2, the network",
    earn: "Sitting in AA rooms, calling your sponsor, peer outreach, 12th step service.",
    stat: "Buffer",
    statBody: "a direct biological buffer against cortisol and craving isolation",
    flip: true,
  },
  {
    photo: PHOTOS.kitchenFuel,
    letter: "S",
    name: "Serotonin, the mirror",
    role: "Emotional calm and baseline mood · pillar 3, the mirror",
    earn: "Fermented foods (kefir, kimchi), fiber, tryptophan, stillness and meditation.",
    stat: "~90%",
    statBody: "of the body's serotonin is produced in the gut microbiome",
    flip: false,
  },
  {
    photo: PHOTOS.bridgeRunner,
    letter: "E",
    name: "Endorphins, the resilience",
    role: "Pain masking and the natural high · the engine, resilience",
    earn: "Intense cardio or lifting, heat and sauna, spicy capsaicin, deep laughter.",
    stat: "Opioid",
    statBody: "your internal opioid system, activated safely through physical challenge",
    flip: true,
  },
];

// The six mechanisms, each tied to the chemical it repairs. This is the
// "why every daily move is on the list" answer in one screen.
const MECHANISMS = [
  {
    n: "01",
    title: "Sleep",
    chem: "serotonin · GABA",
    body: "Deep sleep clears metabolic waste and rebuilds GABA — the brake pedal of the nervous system. Less craving, less anxiety, less fog. It is the single highest-leverage input on this page.",
  },
  {
    n: "02",
    title: "Morning light",
    chem: "dopamine",
    body: "Ten to fifteen minutes of outdoor light sets the body clock: a clean dopamine bump now, and melatonin arriving on time tonight. It costs nothing and it fixes two pillars at once.",
  },
  {
    n: "03",
    title: "Cold or a brisk walk",
    chem: "dopamine · endorphins",
    body: "An earned lift with no crash afterwards. Cold immersion has been measured raising baseline dopamine substantially and holding it for hours — the opposite shape to a substance spike.",
  },
  {
    n: "04",
    title: "Movement",
    chem: "dopamine · endorphins",
    body: "Daily movement is what reinstalls the D2 and D3 reward receptors the substance burned out. This is the mechanism behind 'it gets better' — and it is physical, not attitudinal.",
  },
  {
    n: "05",
    title: "Meetings and service",
    chem: "oxytocin",
    body: "Connection releases oxytocin, which is a direct biological buffer against cortisol and the craving that isolation produces. The fellowship is not just moral support; it is chemistry.",
  },
  {
    n: "06",
    title: "Stillness and surrender",
    chem: "serotonin · cortisol down",
    body: "Handing over what you cannot control shifts you out of fight-or-flight and lowers the cortisol that feeds the loop. This is where Step 3 and Step 11 stop being abstract.",
  },
];

const SOURCES = [
  { label: "SAMHSA — National Survey on Drug Use and Health", url: "https://www.samhsa.gov/data/" },
  { label: "NIDA — Trends & Statistics, Drugs and the Brain", url: "https://nida.nih.gov/research-topics/trends-statistics" },
  { label: "Learn.Genetics (University of Utah) — Drug Use Changes the Brain Over Time", url: "https://learn.genetics.utah.edu/content/addiction/brainchange/" },
  { label: "Neurobiology of Addiction — StatPearls / NCBI Bookshelf", url: "https://www.ncbi.nlm.nih.gov/books/NBK597351/" },
  { label: "Reward Circuitry in Addiction — PMC / NIH", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5509624/" },
];

export default function TheSciencePage() {
  const featured = blogPosts.slice(0, 6);

  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <SiteHeader />

      <main className="flex-1">
        <PageHero
          photo={PHOTOS.coldLake}
          height="short"
          title={
            <>
              The science, <em>briefly.</em>
            </>
          }
          lede="Nothing in the protocol is a chore for its own sake. Every daily move repairs a specific part of the neurochemistry the substance broke down — and this page is the map of which move repairs what."
        />

        <Section tight>
          <Wrap>
            <Prose>
              <p>
                Written for someone in the first ninety days, not for a journal. Plain English, real
                sources, and no claim we can&rsquo;t point at. This is peer support and cited
                science, not medical advice.
              </p>
            </Prose>
          </Wrap>
        </Section>

        {/* ── D.O.S.E. ─────────────────────────────────────────── */}
        <Section id="dose" band>
          <Wrap>
            <SectionHead
              lede={
                <p>
                  The substance faked all four at once through a single door, so the brain turned
                  the volume down to survive. That down-regulation is the deficit you feel as grey
                  fog and craving. <strong>Recovery pays the four back separately</strong>, through
                  four different earned inputs.
                </p>
              }
            >
              D.O.S.E. — <em>your four chemicals.</em>
            </SectionHead>

            <div className="mt-10 grid gap-9 border-t border-[#1d231d] pt-9 sm:mt-12 lg:grid-cols-2 lg:gap-14">
              <div>
                <SubHead>Substance hijack: flood, then crash</SubHead>
                <p className="mt-3 max-w-[56ch] text-[15.5px] text-[#b8b4a6]">
                  A single unnatural hit floods all four chemicals at once, so the brain
                  down-regulates the D2 and D3 receptors to survive. What is left is a severe
                  baseline deficit: the grey fog and the intense craving.
                </p>
              </div>
              <div>
                <SubHead>Natural recovery: four separate inputs</SubHead>
                <p className="mt-3 max-w-[56ch] text-[15.5px] text-[#b8b4a6]">
                  Four targeted daily habits rebuild the receptors naturally, without a crash —
                  steady baseline mood, resilience, and genuine pleasure restored over 90+ days.
                </p>
              </div>
            </div>

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
          </Wrap>
        </Section>

        {/* ── Order of operations ──────────────────────────────── */}
        <Section id="order">
          <Wrap>
            <SectionHead
              lede={
                <p>
                  Before a spiritual concept can hold in a panicked mind, sleep, gut serotonin, and
                  the dopamine baseline have to stabilize. The vessel comes first — then the
                  framework does the deeper structural work.
                </p>
              }
            >
              Why biology <em>comes first.</em>
            </SectionHead>

            <StackList
              items={[
                {
                  n: "01",
                  title: "The Vessel — hardware and biology",
                  body: "Body plus D.O.S.E. chemistry: sleep, light, movement, fuel. Start here and stabilize the hardware.",
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
                  title: "The daily score — the capstone",
                  body: "The Vanguard Score, one number out of ten, measured every day rather than felt.",
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
        <Section id="cravings" band>
          <Wrap>
            <SectionHead
              lede={
                <p>
                  A craving is a neurochemical event with a shape: a roughly ninety-second adrenaline
                  surge, a peak at fifteen to twenty minutes, then a decline — provided you do not
                  feed it. Compare that to the spike-and-crash of a substance and the case for the
                  earned slope makes itself.
                </p>
              }
            >
              The craving <em>wave.</em>
            </SectionHead>
            <div className="mt-12">
              <CravingWaveAndSpike />
            </div>
          </Wrap>
        </Section>

        {/* ── Six moves, six mechanisms ────────────────────────── */}
        <Section id="mechanisms">
          <Wrap>
            <SectionHead
              lede={
                <p>
                  This is the whole daily protocol, and the reason each item earns its place on the
                  list.
                </p>
              }
            >
              Six moves, <em>six mechanisms.</em>
            </SectionHead>

            <StackList
              items={MECHANISMS.map((m) => ({
                n: m.n,
                title: m.title,
                body: m.body,
                maps: m.chem,
              }))}
            />

            <CalloutBand className="mt-10">
              <p className="max-w-[62ch] text-[15.5px] text-[#b8b4a6]">
                <b className="font-semibold text-[#f2efe6]">These six are the BIO 12 protocol.</b>{" "}
                Twelve daily actions across four pillars — Movement, Sleep, Nutrition, Breath —
                scored as one honest number every day.
              </p>
              <CtaRow className="mt-5">
                <ButtonGhost href="/protocol">The BIO 12 protocol</ButtonGhost>
              </CtaRow>
            </CalloutBand>
          </Wrap>
        </Section>

        {/* ── DOSE field guides ────────────────────────────────── */}
        <Section id="guides" band>
          <Wrap>
            <SectionHead
              lede={<p>Long-form, cited, and practical — each one ends with a print-and-go list.</p>}
            >
              The field <em>guides.</em>
            </SectionHead>
            <EditorialList>
              {DOSE_ARTICLES.map((a) => (
                <EditorialRow
                  key={a.slug}
                  href={`/90rr/${a.slug}`}
                  title={a.title}
                  body={a.excerpt}
                  go="Read guide"
                />
              ))}
            </EditorialList>
          </Wrap>
        </Section>

        {/* ── Research articles ────────────────────────────────── */}
        <Section id="research">
          <Wrap>
            <SectionHead
              lede={
                <p>
                  Each post takes one finding and explains what it means for your next ninety days.
                </p>
              }
            >
              The research, <em>in plain English.</em>
            </SectionHead>
            <EditorialList>
              {featured.map((p) => (
                <EditorialRow
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  title={p.title}
                  body={p.excerpt}
                  go={`${p.date} · ${p.readTime}`}
                />
              ))}
            </EditorialList>
            <CtaRow>
              <ButtonGhost href="/blog">All research posts</ButtonGhost>
            </CtaRow>
          </Wrap>
        </Section>

        {/* ── Sources ──────────────────────────────────────────── */}
        <Section band tight>
          <Wrap>
            <SectionHead>
              Primary <em>sources.</em>
            </SectionHead>
            <ul className="mt-8 flex max-w-[70ch] flex-col gap-3">
              {SOURCES.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2.5 text-[15px] leading-relaxed text-[#b8b4a6] underline decoration-[#1d231d] underline-offset-4 transition-colors hover:text-[#f2efe6] hover:decoration-[#4cc07a]"
                  >
                    <ExternalLink size={15} className="mt-1 shrink-0" /> {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <CalloutBand className="mt-10">
              <p className="max-w-[70ch] text-[14.5px] leading-relaxed text-[#7d7a70]">
                Individual articles carry their own citations. Recovery timelines vary substantially
                between people and substances; figures here describe general patterns, not a promise
                about your case. AAfiends is peer support, not medical advice — and alcohol or
                benzodiazepine withdrawal can be dangerous, so detox under medical supervision if you
                are physically dependent.
              </p>
            </CalloutBand>
          </Wrap>
        </Section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <Section>
          <Wrap>
            <SectionHead
              lede={
                <p>
                  The journal turns all of the above into ten seconds a day: sleep, movement,
                  meeting, mood, and one score. Free, printable, no signup.
                </p>
              }
            >
              Knowing the mechanism <em>changes nothing on its own.</em>
            </SectionHead>
            <CtaRow>
              <ButtonPrimary href="/90rr">Get the free 90-day journal</ButtonPrimary>
              <ButtonGhost href="/protocol">The BIO 12 protocol</ButtonGhost>
            </CtaRow>
          </Wrap>
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}
