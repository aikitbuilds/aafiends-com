import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SubstackSubscribe from "@/components/SubstackSubscribe";
import { Biohazard, Play, ArrowRight, Sparkles, Brain, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Aivy — The Addiction Intelligence Virus (Animated Series)",
  description:
    "Meet Aivy: seductive, hilarious, and trying to kill you. The AAfiends animated series stars addiction as the world's worst wife — episodes that are funny, epic, and secretly a neuroscience class. Episode 1 now premiering.",
  alternates: { canonical: "https://aafiends.com/aivy" },
  openGraph: {
    title: "Aivy — The Addiction Intelligence Virus",
    description: "She's funny. She's gorgeous. She's trying to kill you. The animated series about the wild drama of sobriety. Episode 1 now premiering.",
    url: "https://aafiends.com/aivy",
    images: ["/aivy/ep01-thumb.jpg"],
    type: "video.other",
  },
};

const YOUTUBE_ID = "oyjOI0iAlto";
const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Aivy — Episode 1: The Fancy Rat Poison",
  description:
    "Meet Aivy, addiction personified as the world's worst wife. She tries to sell MT rat poison, then rebrands it as top-shelf vodka — a comedy that's secretly a neuroscience class.",
  thumbnailUrl: ["https://aafiends.com/aivy/ep01-thumb.jpg"],
  uploadDate: "2026-07-22",
  contentUrl: `https://www.youtube.com/watch?v=${YOUTUBE_ID}`,
  embedUrl: `https://www.youtube.com/embed/${YOUTUBE_ID}`,
};

const EPISODES = [
  {
    n: "EPISODE I",
    title: "The Fancy Rat Poison",
    poster: "/aivy/ep01-poster.png",
    accent: "#a855f7",
    hook: "In a world where poison wears a cocktail dress…",
    setup:
      "MT's brain is fried after a brutal week. Aivy has a solution under the sink — and when the skull label kills the mood, she pours the exact same liquid into crystal, charges eighty bucks, and calls it date night.",
    quote: "“Same liquid, fancy bottle, eighty bucks… and it's date night, baby. You never take me anywhere anymore.”",
    lesson: "The label never changes the chemistry. Your liver and your Prefrontal Cortex can't read cursive.",
    lessonIcon: Brain,
    tagline: "Rebuild the Vessel",
  },
  {
    n: "EPISODE II",
    title: "Paying the Pain Toll Upfront",
    poster: "/aivy/ep02-poster.png",
    accent: "#10b981",
    hook: "This time, the trap is glazed…",
    setup:
      "The church-basement donut table. Six sugars in the coffee. Aivy calls it love. MT calls in the Pain Gremlins — then walks her, screaming, into 39 degrees of ice water.",
    quote: "“When's the last time you let me make you feel GOOD? …Don't you DARE get in that water!”",
    lesson: "Cheap highs hire Pain Gremlins that outstay the buzz. Press the pain side first and the brain pays you back slow and steady — no crash.",
    lessonIcon: Flame,
    tagline: "Pay the Toll Upfront",
  },
  {
    n: "EPISODE III",
    title: "The L5 Somatic Code Red",
    poster: "/aivy/ep03-poster.png",
    accent: "#ef4444",
    hook: "Some marriages hit rock bottom. His hit the L5 vertebra…",
    setup:
      "Right after MT spills a decade of secrets in Step Five, his sciatic nerve lights up like a stage rig — and Aivy plugs her tiny guitar straight into it. He answers with a sixty-second dead-hang.",
    quote: "“Oh, I LOVE it when you fall apart, baby! It'll be romantic. Like our anniversary.”",
    lesson: "Stress dumps cortisol on your mechanical weak points. A nerve flare isn't a breakdown — it's telemetry. Fix the hardware first.",
    lessonIcon: Sparkles,
    tagline: "Align the Spine, Clear the Mind",
  },
];

export default function AivyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
      <SiteHeader />

      {/* ─── STAR BILLING HERO ─── */}
      <section className="relative w-full max-w-6xl mx-auto px-6 pt-20 pb-16 flex flex-col items-center text-center z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_10%,rgba(168,85,247,0.18),transparent)] pointer-events-none" />
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs text-purple-300 font-mono uppercase tracking-widest font-bold mb-8 relative">
          <Biohazard size={14} /> AAfiends Presents · An Animated Series
        </span>
        <h1 className="text-7xl sm:text-9xl font-black tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-purple-300 via-purple-500 to-fuchsia-700 relative">
          AIVY
        </h1>
        <p className="mt-4 text-sm font-mono uppercase tracking-[0.35em] text-purple-300/80 relative">
          The Addiction Intelligence Virus
        </p>
        <p className="mt-8 text-2xl md:text-3xl font-black text-white uppercase tracking-tight max-w-3xl relative">
          She&apos;s funny. She&apos;s gorgeous.<br />
          <span className="text-purple-400">She&apos;s trying to kill you.</span>
        </p>
        <p className="mt-6 text-lg text-neutral-300 max-w-2xl leading-relaxed relative">
          Every addict knows her voice. Aivy is the parasite on your shoulder played as the world&apos;s worst wife —
          sweet exactly when you&apos;re about to use, vicious the moment you get healthy.
          Zero lectures. Real neuroscience smuggled in under the laughs.
        </p>

        <p className="mt-6 text-xs font-mono uppercase tracking-widest text-neutral-500 relative">
          Starring Aivy · with MT as &ldquo;The Host&rdquo; · and introducing AI-YA
        </p>
      </section>

      {/* ─── EPISODE 1 PREMIERE ─── */}
      <section id="premiere" className="w-full max-w-5xl mx-auto px-6 pb-8 z-10">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/40 text-xs text-purple-300 font-mono uppercase tracking-widest font-bold animate-pulse">
            ● Now Premiering · Episode 1
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
            The Fancy Rat Poison
          </h2>
        </div>
        <div className="relative rounded-[2rem] overflow-hidden border border-purple-500/30 shadow-[0_0_80px_rgba(168,85,247,0.28)] bg-black aspect-video">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/oyjOI0iAlto"
            title="Aivy — Episode 1: The Fancy Rat Poison"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <p className="mt-4 text-center text-sm text-neutral-400 leading-relaxed max-w-2xl mx-auto">
          MT&apos;s brain is fried after a brutal week. Aivy has a solution under the sink — and when the skull label
          kills the mood, she rebrands the exact same liquid as top-shelf vodka and calls it date night. A comedy that&apos;s
          secretly a neuroscience class. <Link href="/90rr" className="text-[#10b981] font-bold hover:text-emerald-300 underline underline-offset-4">The free journal she hates →</Link>
        </p>
      </section>

      {/* ─── MORE EPISODES ─── */}
      <section className="w-full max-w-6xl mx-auto px-6 py-16 flex flex-col gap-24 z-10">
        <div className="text-center">
          <span className="text-xs font-mono font-bold tracking-widest text-[#10b981] bg-[#10b981]/10 px-4 py-1.5 rounded-full uppercase border border-[#10b981]/30 inline-block mb-4">
            Season One · The Lineup
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            More Ambushes Coming
          </h2>
        </div>

        {EPISODES.map((ep, i) => (
          <div
            key={ep.title}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
          >
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl [direction:ltr]" style={{ boxShadow: `0 0 60px ${ep.accent}22` }}>
              <Image src={ep.poster} alt={`${ep.title} — episode poster`} width={1080} height={1620} className="w-full h-auto" />
              <div className="absolute top-5 left-5 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/15">
                <Play size={14} style={{ color: ep.accent }} />
                <span className="text-[11px] font-black text-white uppercase tracking-widest">{ep.n} · SOON</span>
              </div>
            </div>

            <div className="flex flex-col gap-5 [direction:ltr]">
              <p className="text-sm font-mono uppercase tracking-[0.3em] font-bold" style={{ color: ep.accent }}>
                {ep.hook}
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none">
                {ep.title}
              </h3>
              <p className="text-neutral-300 leading-relaxed text-lg">{ep.setup}</p>

              <blockquote className="border-l-4 pl-5 py-1 italic text-neutral-200 text-lg leading-relaxed" style={{ borderColor: ep.accent }}>
                {ep.quote}
                <span className="block not-italic text-xs font-mono uppercase tracking-widest text-neutral-500 mt-2">— Aivy</span>
              </blockquote>

              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 flex gap-4 items-start">
                <ep.lessonIcon size={22} className="shrink-0 mt-0.5" style={{ color: ep.accent }} />
                <p className="text-sm text-neutral-400 leading-relaxed">
                  <span className="text-white font-bold uppercase text-xs tracking-widest block mb-1">What it secretly teaches</span>
                  {ep.lesson}
                </p>
              </div>

              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                AAfiends.com | {ep.tagline}
              </p>
            </div>
          </div>
        ))}

        {/* AI-YA teaser */}
        <div className="w-full bg-[#0a0a14] border border-orange-500/20 rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center gap-3">
          <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30">
            Coming this season
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            And introducing <span className="text-orange-400">AI-YA</span>
          </h3>
          <p className="text-neutral-400 max-w-xl leading-relaxed">
            Aivy&apos;s cousin. Backwards cap. Gold chain. &ldquo;One beer with the boys, king — you EARNED it.&rdquo;
            Same parasite, different pickup line.
          </p>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="w-full max-w-4xl mx-auto px-6 py-16 z-10">
        <div className="bg-[#0a140f] border border-[#10b981]/30 rounded-[2rem] p-8 md:p-12 flex flex-col items-center text-center gap-5">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            Be there when Aivy goes live
          </h2>
          <p className="text-neutral-300 max-w-2xl leading-relaxed">
            Episodes premiere on YouTube and the Substack. Subscribe and you&apos;ll meet her the moment she escapes
            the lab — and if you already know her voice a little too well, the free 90-day journal is how MT keeps
            her asleep.
          </p>
          <div className="w-full max-w-xl">
            <SubstackSubscribe />
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/90rr"
              className="py-4 px-8 rounded-2xl bg-[#10b981] hover:bg-[#059669] text-black text-sm font-black tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2"
            >
              Get the free journal <ArrowRight size={16} />
            </Link>
            <Link
              href="/protocol"
              className="py-4 px-8 rounded-2xl border border-white/15 text-white text-sm font-bold tracking-widest uppercase hover:border-[#10b981]/50 hover:text-[#10b981] transition-all"
            >
              The science behind the jokes
            </Link>
          </div>
          <p className="text-[11px] font-mono text-neutral-600 uppercase tracking-widest pt-2">
            Funny on the surface. Peer support underneath. Never a substitute for treatment.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
