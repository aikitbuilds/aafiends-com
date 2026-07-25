import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { DoseMap, DoseStack, CravingWaveAndSpike } from "@/components/DoseFigures";
import { blogPosts } from "@/lib/blogData";
import { DOSE_ARTICLES } from "@/lib/doseArticles";
import { ArrowRight, Activity, Brain, Moon, Sun, Snowflake, Users, Wind, ExternalLink } from "lucide-react";

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

// The six mechanisms, each tied to the chemical it repairs. This is the
// "why every daily move is on the list" answer in one screen.
const MECHANISMS = [
  {
    icon: Moon,
    title: "Sleep",
    chem: "Serotonin · GABA",
    body: "Deep sleep clears metabolic waste and rebuilds GABA — the brake pedal of the nervous system. Less craving, less anxiety, less fog. It is the single highest-leverage input on this page.",
    color: "#00f0ff",
  },
  {
    icon: Sun,
    title: "Morning light",
    chem: "Dopamine",
    body: "Ten to fifteen minutes of outdoor light sets the body clock: a clean dopamine bump now, and melatonin arriving on time tonight. It costs nothing and it fixes two pillars at once.",
    color: "#f59e0b",
  },
  {
    icon: Snowflake,
    title: "Cold or a brisk walk",
    chem: "Dopamine · Endorphins",
    body: "An earned lift with no crash afterwards. Cold immersion has been measured raising baseline dopamine substantially and holding it for hours — the opposite shape to a substance spike.",
    color: "#10b981",
  },
  {
    icon: Activity,
    title: "Movement",
    chem: "Dopamine · Endorphins",
    body: "Daily movement is what reinstalls the D2 and D3 reward receptors the substance burned out. This is the mechanism behind 'it gets better' — and it is physical, not attitudinal.",
    color: "#a855f7",
  },
  {
    icon: Users,
    title: "Meetings & service",
    chem: "Oxytocin",
    body: "Connection releases oxytocin, which is a direct biological buffer against cortisol and the craving that isolation produces. The fellowship is not just moral support; it is chemistry.",
    color: "#e8543d",
  },
  {
    icon: Wind,
    title: "Stillness & surrender",
    chem: "Serotonin · cortisol down",
    body: "Handing over what you cannot control shifts you out of fight-or-flight and lowers the cortisol that feeds the loop. This is where Step 3 and Step 11 stop being abstract.",
    color: "#3b82f6",
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
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-20 pb-14">
        <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#10b981] uppercase tracking-widest bg-[#10b981]/10 px-4 py-1.5 rounded-full border border-[#10b981]/30 mb-7">
          <Brain size={14} /> Evidence &amp; mechanism
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-none mb-7">
          The science, <br /><span className="text-[#10b981]">briefly.</span>
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-neutral-300 leading-relaxed mb-5">
          Nothing in the protocol is a chore for its own sake. Every daily move repairs a specific part of the
          neurochemistry the substance broke down — and this page is the map of which move repairs what.
        </p>
        <p className="max-w-3xl text-base text-neutral-500 leading-relaxed">
          Written for someone in the first ninety days, not for a journal. Plain English, real sources, and no claim
          we can&apos;t point at. This is peer support and cited science, not medical advice.
        </p>
      </section>

      {/* D.O.S.E. */}
      <section id="dose" className="w-full max-w-7xl mx-auto px-6 py-14 border-t border-white/5 flex flex-col gap-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-5">
            D.O.S.E. — your four chemicals
          </h2>
          <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
            The substance faked all four at once through a single door, so the brain turned the volume down to survive.
            That down-regulation is the deficit you feel as grey fog and craving. Recovery pays the four back
            separately, through four different earned inputs.
          </p>
        </div>
        <DoseMap />
      </section>

      {/* The stack */}
      <section id="order" className="w-full max-w-7xl mx-auto px-6 py-14 border-t border-white/5 flex flex-col gap-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-5">
            Why biology comes first
          </h2>
          <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
            Before a spiritual concept can hold in a panicked mind, sleep, gut serotonin, and the dopamine baseline
            have to stabilize. The vessel comes first — then the framework does the deeper structural work.
          </p>
        </div>
        <DoseStack />
      </section>

      {/* Craving wave */}
      <section id="cravings" className="w-full max-w-7xl mx-auto px-6 py-14 border-t border-white/5 flex flex-col gap-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-5">
            The craving wave
          </h2>
          <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
            A craving is a neurochemical event with a shape: a roughly ninety-second adrenaline surge, a peak at
            fifteen to twenty minutes, then a decline — provided you do not feed it. Compare that to the spike-and-crash
            of a substance and the case for the earned slope makes itself.
          </p>
        </div>
        <CravingWaveAndSpike />
      </section>

      {/* Mechanisms grid */}
      <section id="mechanisms" className="w-full max-w-7xl mx-auto px-6 py-14 border-t border-white/5">
        <div className="max-w-3xl mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-5">
            Six moves, six mechanisms
          </h2>
          <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
            This is the whole daily protocol, and the reason each item earns its place on the list.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MECHANISMS.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.title} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-7 flex flex-col gap-4 hover:border-white/25 transition-colors relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5" style={{ backgroundColor: m.color }} />
                <div className="flex items-center gap-4">
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${m.color}1a`, border: `1px solid ${m.color}55`, color: m.color }}
                  >
                    <Icon size={22} />
                  </span>
                  <div>
                    <h3 className="text-white font-black uppercase tracking-tight leading-none">{m.title}</h3>
                    <div className="text-[10px] font-mono uppercase tracking-widest mt-1.5" style={{ color: m.color }}>
                      {m.chem}
                    </div>
                  </div>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">{m.body}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-[#0a1a14] border border-[#10b981]/30 rounded-2xl p-7 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
          <p className="text-neutral-300 text-sm leading-relaxed max-w-2xl">
            <span className="text-[#10b981] font-bold">These six are the BIO 12 protocol.</span> Twelve daily actions
            across four pillars — Movement, Sleep, Nutrition, Breath — scored as one honest number every day.
          </p>
          <Link
            href="/protocol"
            className="shrink-0 inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-black font-black uppercase tracking-widest text-xs py-3.5 px-6 rounded-xl transition-colors"
          >
            The BIO 12 protocol <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* DOSE field guides */}
      <section id="guides" className="w-full max-w-7xl mx-auto px-6 py-14 border-t border-white/5">
        <div className="max-w-3xl mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none mb-4">
            The field guides
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            Long-form, cited, and practical — each one ends with a print-and-go list.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DOSE_ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={`/90rr/${a.slug}`}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-7 flex flex-col gap-3 hover:border-[#10b981]/50 transition-colors group"
            >
              <h3 className="text-white font-black uppercase tracking-tight leading-snug group-hover:text-[#10b981] transition-colors">
                {a.title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed line-clamp-4 flex-1">{a.excerpt}</p>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-neutral-500 group-hover:text-[#10b981] transition-colors mt-2">
                Read guide <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Research articles */}
      <section id="research" className="w-full max-w-7xl mx-auto px-6 py-14 border-t border-white/5">
        <div className="max-w-3xl mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none mb-4">
            The research, in plain English
          </h2>
          <p className="text-neutral-400 text-base leading-relaxed">
            Each post takes one finding and explains what it means for your next ninety days.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-7 flex flex-col gap-3 hover:border-[#10b981]/50 transition-colors group"
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">
                {p.date} · {p.readTime}
              </div>
              <h3 className="text-white font-black uppercase tracking-tight leading-snug group-hover:text-[#10b981] transition-colors">
                {p.title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3 flex-1">{p.excerpt}</p>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-neutral-500 group-hover:text-[#10b981] transition-colors mt-2">
                Read <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mt-8 border border-white/15 hover:border-[#10b981]/50 hover:text-[#10b981] text-white font-black uppercase tracking-widest text-sm py-3.5 px-7 rounded-xl transition-colors"
        >
          All research posts <ArrowRight size={16} />
        </Link>
      </section>

      {/* Sources */}
      <section className="w-full max-w-7xl mx-auto px-6 py-14 border-t border-white/5">
        <h2 className="text-sm font-black text-neutral-500 uppercase tracking-widest mb-5">Primary sources</h2>
        <ul className="flex flex-col gap-3 max-w-3xl">
          {SOURCES.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 text-sm text-neutral-400 hover:text-white transition-colors leading-relaxed"
              >
                <ExternalLink size={14} className="shrink-0 mt-0.5" /> {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-neutral-600 text-xs mt-6 leading-relaxed max-w-2xl">
          Individual articles carry their own citations. Recovery timelines vary substantially between people and
          substances; figures here describe general patterns, not a promise about your case. AAfiends is peer support,
          not medical advice — and alcohol or benzodiazepine withdrawal can be dangerous, so detox under medical
          supervision if you are physically dependent.
        </p>
      </section>

      {/* CTA */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 border-t border-white/5">
        <div className="w-full bg-[#0a140f] border border-[#10b981]/30 rounded-[2rem] p-10 md:p-14 flex flex-col items-start gap-6">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
            Knowing the mechanism <br /><span className="text-[#10b981]">changes nothing on its own.</span>
          </h2>
          <p className="text-neutral-300 text-base md:text-lg leading-relaxed max-w-2xl">
            The journal turns all of the above into ten seconds a day: sleep, movement, meeting, mood, and one score.
            Free, printable, no signup.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/90rr" className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-black font-black uppercase tracking-widest text-sm py-4 px-8 rounded-xl transition-colors">
              Get the free 90-day journal <ArrowRight size={16} />
            </Link>
            <Link href="/protocol" className="inline-flex items-center gap-2 border border-white/20 hover:border-[#10b981]/50 hover:text-[#10b981] text-white font-black uppercase tracking-widest text-sm py-4 px-8 rounded-xl transition-colors">
              The BIO 12 protocol
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
