import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ArrowRight, BookMarked } from "lucide-react";

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

type Group = { name: string; blurb: string; terms: Term[] };

const GROUPS: Group[] = [
  {
    name: "The biology",
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
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans">
      <SiteHeader />

      <section className="w-full max-w-5xl mx-auto px-6 pt-20 pb-12">
        <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#10b981] uppercase tracking-widest bg-[#10b981]/10 px-4 py-1.5 rounded-full border border-[#10b981]/30 mb-7">
          <BookMarked size={14} /> Plain-English decoder
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-none mb-7">
          The language <br /><span className="text-[#10b981]">of the grid.</span>
        </h1>
        <p className="max-w-3xl text-lg text-neutral-300 leading-relaxed">
          This system has its own vocabulary — useful once you&apos;re in it, a wall when you&apos;re not. Every term
          we use, defined in one line. If a word on any of the three sites doesn&apos;t make sense, it&apos;s here.
        </p>
      </section>

      {GROUPS.map((g) => (
        <section key={g.name} className="w-full max-w-5xl mx-auto px-6 py-10 border-t border-white/5">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">{g.name}</h2>
          <p className="text-neutral-500 text-sm leading-relaxed mb-8 max-w-2xl">{g.blurb}</p>

          <dl className="flex flex-col gap-4">
            {g.terms.map((t) => (
              <div key={t.term} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-3">
                  <dt className="text-white font-black uppercase tracking-tight text-lg shrink-0">{t.term}</dt>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#10b981]">{t.short}</span>
                </div>
                <dd className="text-neutral-400 text-sm leading-relaxed">
                  {t.body}
                  {t.href && (
                    <Link
                      href={t.href}
                      className="inline-flex items-center gap-1.5 ml-2 text-[#10b981] hover:underline font-bold whitespace-nowrap"
                    >
                      More <ArrowRight size={12} />
                    </Link>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      <section className="w-full max-w-5xl mx-auto px-6 py-16 border-t border-white/5">
        <div className="w-full bg-[#0a140f] border border-[#10b981]/30 rounded-[2rem] p-10 flex flex-col items-start gap-5">
          <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight leading-none">
            Now skip the vocabulary <br /><span className="text-[#10b981]">and just start.</span>
          </h2>
          <p className="text-neutral-300 leading-relaxed max-w-2xl">
            You do not need any of these words to begin. The journal is free, printable, and needs no signup.
          </p>
          <Link href="/90rr" className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-black font-black uppercase tracking-widest text-sm py-4 px-8 rounded-xl transition-colors">
            Get the free 90-day journal <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
