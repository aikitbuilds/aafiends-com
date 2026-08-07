import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  Wrap,
  Section,
  SectionHead,
  EditorialList,
  CtaRow,
  ButtonPrimary,
} from "@/components/design";

export const metadata: Metadata = {
  title: "The Language of the Grid — AAfiends Glossary",
  description:
    "Every term used across AAfiends, RaceFiends and AIVirus, defined in one line each: D.O.S.E., BIO 12, AIV, VSE, the Mirror, the Ledger, G.A.D., the Vanguard types and more.",
  alternates: { canonical: "https://aafiends.com/glossary" },
  keywords: ["AAfiends glossary", "BIO 12 meaning", "DOSE meaning recovery", "AIV addiction intelligence virus", "VSE score"],
};

type Term = {
  term: string;
  short: string;
  body: string;
  href?: string;
};

/** `lead` + `em` reassemble `name` — the heading carries one amber italic phrase. */
type Group = { name: string; lead: string; em: string; blurb: string; terms: Term[] };

const GROUPS: Group[] = [
  {
    name: "The biology",
    lead: "The",
    em: "biology.",
    blurb: "Start here. Everything else in the system sits on top of these four words.",
    terms: [
      {
        term: "D.O.S.E.",
        short: "Your four brain chemicals",
        body: "Dopamine (drive), Oxytocin (bonding), Serotonin (baseline mood) and Endorphins (pain relief). Almost everything that feels good runs on these four. A substance fakes all four at once through one door; recovery earns them back through four separate daily inputs.",
        href: "/the-science",
      },
      {
        term: "BIO 12",
        short: "The daily biological protocol",
        body: "Twelve simple daily actions across four pillars — Movement, Sleep, Nutrition and Breath — that rebuild D.O.S.E. naturally. It is the 'firewall' half of the system: the part that stabilizes the body before any framework work happens.",
        href: "/protocol",
      },
      {
        term: "The craving wave",
        short: "A craving has a shape and an ending",
        body: "The physical adrenaline surge lasts roughly ninety seconds; the craving itself peaks around fifteen to twenty minutes and passes within thirty if you do not feed it. Ride it, don't fight it.",
        href: "/the-science#cravings",
      },
      {
        term: "Baseline",
        short: "Where your mood and drive sit when nothing is happening",
        body: "The substance dragged it below zero by forcing the brain to remove its own dopamine receptors. 'Holding the baseline' means keeping the daily inputs steady enough that it climbs back.",
      },
    ],
  },
  {
    name: "The framework",
    lead: "The",
    em: "framework.",
    blurb: "The AA layer that runs on top of a stabilized body — the part that handles resentment, ego and wreckage.",
    terms: [
      {
        term: "The 12 Steps",
        short: "The open-source defense",
        body: "The framework adapted from Alcoholics Anonymous, in plain language. Grouped here as Reset (1–3), Restructure (4–7), Recalibrate (8–9) and Every Day (10–12).",
        href: "/framework",
      },
      {
        term: "G.A.D.",
        short: "Grand Architect Divine",
        body: "A deliberately non-denominational way of saying 'a Power greater than ourselves'. It exists so the skeptic and the believer can both work Steps 3 and 11 without arguing about vocabulary first. No belief is required to begin.",
        href: "/framework#gad",
      },
      {
        term: "90 R&R",
        short: "90 Days Recovery & Restructure",
        body: "The flagship program and the printable journal behind it — a biology-first system for the first, hardest ninety days.",
        href: "/90rr",
      },
      {
        term: "Step 10",
        short: "The daily inventory",
        body: "The daily check that stops small resentments from compounding. The journal and the dashboard are both, structurally, a Step 10.",
      },
    ],
  },
  {
    name: "The threat",
    lead: "The",
    em: "threat.",
    blurb: "The diagnostic language. Lives primarily on AIVirus.org.",
    terms: [
      {
        term: "AIV",
        short: "Addiction Intelligence Virus",
        body: "The model this ecosystem is built on: addiction behaves less like a moral failing and more like a system infection that hijacks the brain's reward wiring. Originally 'Alcohol Intelligence Virus'; broadened once it became clear the same code runs on every vector.",
      },
      {
        term: "Vector",
        short: "One strain of the same virus",
        body: "The ten documented delivery mechanisms — alcohol, opioids, nicotine, cannabis, gambling, pornography, social media, shopping, work, gaming. Different payload, identical architecture.",
      },
      {
        term: "The firewall",
        short: "What keeps the virus starved",
        body: "The daily biological protocol (BIO 12) plus the fellowship. The virus does not attack a strong system — it waits for a depleted one.",
      },
      {
        term: "H.A.L.T.",
        short: "Hungry, Angry, Lonely, Tired",
        body: "The four states the virus scans for. Each one is a biological opening, which is precisely why the protocol targets food, connection and sleep rather than resolve.",
      },
    ],
  },
  {
    name: "The dashboard",
    lead: "The",
    em: "dashboard.",
    blurb: "What the words on the app screens mean.",
    terms: [
      {
        term: "Telemetry",
        short: "Your daily numbers",
        body: "Sleep, hydration, movement, meetings, mood and cravings — logged in about ten seconds a day. 'Data over denial' is the point: the log is harder to argue with than memory.",
      },
      {
        term: "The Mirror",
        short: "The AI reflection",
        body: "Reads back what actually changed in your check-in data, in plain language. It reflects; it does not diagnose or advise.",
      },
      {
        term: "The Ledger",
        short: "The record over time",
        body: "The chart and the streak — the pattern across weeks rather than the feeling of a single day.",
      },
      {
        term: "VSE",
        short: "Vanguard Score, out of 10",
        body: "One honest daily number combining the three pillars: Surrender + D.O.S.E. + Community. Not a grade — a trend line.",
      },
      {
        term: "The Grid",
        short: "The community layer",
        body: "Meetings, sponsor, service — the connection half of the protocol. Also the name for the three-site ecosystem as a whole.",
      },
      {
        term: "The Vanguard types",
        short: "Eagle, Elephant, Turtle, Chameleon, Tiger",
        body: "Five profiles from the onboarding diagnostic describing how a person's particular vulnerability tends to show up. A framing device for self-awareness, not a clinical instrument.",
      },
    ],
  },
  {
    name: "The ecosystem",
    lead: "The",
    em: "ecosystem.",
    blurb: "Three sites, three jobs.",
    terms: [
      {
        term: "AIVirus.org",
        short: "The diagnosis",
        body: "Understand the threat: the ten vectors, the statistics, the 7-stage infection pathway. Answers 'what is wrong with me?'",
      },
      {
        term: "AAfiends.com",
        short: "The treatment",
        body: "Run the daily program: the journal, BIO 12, the dashboard, the framework. Answers 'what do I do about it?'",
      },
      {
        term: "RaceFiends.com",
        short: "The movement",
        body: "Running accountability with a partner and a small honest stake. Movement is Pillar 1 of BIO 12. Answers 'who do I do it with?'",
      },
    ],
  },
];

export default function GlossaryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <SiteHeader />

      <Section tight>
        <Wrap>
          <h1 className="font-display max-w-[15ch] text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.025em] text-[#f2efe6] [&_em]:font-display-italic [&_em]:text-[#e0a45c]">
            The language <em>of the grid.</em>
          </h1>
          <p className="mt-5 max-w-[68ch] text-[1.05rem] leading-relaxed text-[#b8b4a6]">
            This system has its own vocabulary — useful once you&apos;re in it, a wall when
            you&apos;re not. Every term we use, defined in one line. If a word on any of the three
            sites doesn&apos;t make sense, it&apos;s here.
          </p>
        </Wrap>
      </Section>

      {GROUPS.map((g, i) => (
        <Section key={g.name} band={i % 2 === 0} tight>
          <Wrap>
            <SectionHead lede={<p>{g.blurb}</p>}>
              {g.lead} <em>{g.em}</em>
            </SectionHead>

            <EditorialList>
              <dl>
                {g.terms.map((t) => (
                  <div
                    key={t.term}
                    className="grid gap-2 border-b border-[#1d231d] px-1 py-6 sm:grid-cols-[15rem_1fr] sm:gap-10"
                  >
                    <div>
                      <dt className="font-display text-[1.3rem] leading-tight text-[#f2efe6]">
                        {t.term}
                      </dt>
                      <p className="font-measure mt-1.5 text-[12.5px] leading-relaxed text-[#7d7a70]">
                        {t.short}
                      </p>
                    </div>
                    <dd className="max-w-[70ch] text-[15.5px] leading-relaxed text-[#b8b4a6]">
                      {t.body}
                      {t.href && (
                        <>
                          {" "}
                          <Link
                            href={t.href}
                            className="whitespace-nowrap text-[#f2efe6] underline decoration-[#2a322a] underline-offset-4 transition-colors hover:decoration-[#4cc07a]"
                          >
                            More &rarr;
                          </Link>
                        </>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </EditorialList>
          </Wrap>
        </Section>
      ))}

      <Section tight>
        <Wrap>
          <SectionHead
            lede={
              <p>
                You do not need any of these words to begin. The journal is free, printable, and
                needs no signup.
              </p>
            }
          >
            Now skip the vocabulary <em>and just start.</em>
          </SectionHead>
          <CtaRow>
            <ButtonPrimary href="/90rr">Get the free 90-day journal</ButtonPrimary>
          </CtaRow>
        </Wrap>
      </Section>

      <SiteFooter />
    </div>
  );
}
