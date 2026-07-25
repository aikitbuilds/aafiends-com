import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CrisisSupport from "@/components/CrisisSupport";
import StoryDisclaimer from "@/components/StoryDisclaimer";
import SubstackSubscribe from "@/components/SubstackSubscribe";
import EpisodeVideoEmbed from "@/components/EpisodeVideoEmbed";
import EpisodeThumbnail from "@/components/EpisodeThumbnail";
import {
  Biohazard,
  Lock,
  CalendarClock,
  Film,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  EPISODES,
  UPCOMING,
  getReleased,
  getUpcoming,
  formatReleaseDate,
} from "@/data/episodesData";

export const metadata: Metadata = {
  title: "Aivy — The Addiction Intelligence Virus (Animated Series)",
  description:
    "Meet Aivy: seductive, hilarious, and trying to kill you. The AAfiends animated series stars addiction as the world's worst wife — episodes that are funny, epic, and secretly a neuroscience class. Released & upcoming episodes.",
  alternates: { canonical: "https://aafiends.com/aivy" },
  openGraph: {
    title: "Aivy — The Addiction Intelligence Virus",
    description:
      "She's funny. She's gorgeous. She's trying to kill you. The animated series about the wild drama of sobriety. Watch episodes now.",
    url: "https://aafiends.com/aivy",
    images: ["/thumbnails/ep01.jpg"],
    type: "video.other",
  },
};

const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Aivy — Episode 1: The Fancy Rat Poison",
  description:
    "Meet Aivy, addiction personified as the world's worst wife. She tries to sell MT rat poison, then rebrands it as top-shelf vodka — a comedy that's secretly a neuroscience class.",
  thumbnailUrl: ["https://aafiends.com/thumbnails/ep01.jpg"],
  uploadDate: "2026-07-22",
  contentUrl: `https://www.youtube.com/watch?v=oyjOI0iAlto`,
  embedUrl: `https://www.youtube.com/embed/oyjOI0iAlto`,
};

export default function AivyPage() {
  const releasedEpisodes = getReleased();
  const comingSoonEpisodes = getUpcoming();

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <SiteHeader />

      {/* ─── STAR BILLING HERO ─── */}
      <section className="relative w-full max-w-6xl mx-auto px-6 pt-16 pb-12 flex flex-col items-center text-center z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_10%,rgba(168,85,247,0.18),transparent)] pointer-events-none" />
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs text-purple-300 font-mono uppercase tracking-widest font-bold mb-6 relative">
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

      {/* ─── RELEASED EPISODES GRID ─── */}
      <section className="w-full max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8 z-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Film size={20} className="text-[#10b981]" />
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Released Episodes
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-neutral-400">
            {releasedEpisodes.length} {releasedEpisodes.length === 1 ? "EPISODE" : "EPISODES"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {releasedEpisodes.map((ep) => (
            <article
              key={ep.slug}
              className="rounded-2xl border border-white/10 bg-[#0a1428]/40 hover:border-[#10b981]/40 transition-all duration-300 flex flex-col overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {ep.youtubeId ? (
                <EpisodeVideoEmbed
                  youtubeId={ep.youtubeId}
                  thumbnail={ep.thumbnail}
                  title={ep.title}
                  episodeNumber={ep.number}
                />
              ) : (
                <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
                  <EpisodeThumbnail
                    src={ep.thumbnail}
                    alt={ep.title}
                    episodeNumber={ep.number}
                  />
                </div>
              )}

              <div className="p-6 flex flex-col gap-4 flex-1 justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#10b981] bg-[#10b981]/10 px-2.5 py-0.5 rounded-full uppercase">
                      EP {ep.number < 10 ? `0${ep.number}` : ep.number} · {ep.tagline}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {formatReleaseDate(ep.releaseDate)}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white leading-tight">
                    {ep.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#10b981]/90 italic">
                    &ldquo;{ep.hook}&rdquo;
                  </p>

                  <p className="text-sm text-neutral-300 font-light leading-relaxed mt-1">
                    {ep.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {ep.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded-md hover:text-neutral-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── COMING SOON GRID ─── */}
      {comingSoonEpisodes.length > 0 && (
        <section className="w-full max-w-6xl mx-auto px-6 py-8 flex flex-col gap-8 z-10">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <CalendarClock size={20} className="text-amber-400" />
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Coming Soon
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-neutral-400">
              NEXT UP
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {comingSoonEpisodes.map((ep) => (
              <article
                key={ep.slug}
                className="rounded-2xl border border-white/10 bg-[#0a0a0a] flex flex-col overflow-hidden relative group"
              >
                <div className="relative w-full aspect-video overflow-hidden">
                  <EpisodeThumbnail
                    src={ep.thumbnail}
                    alt={ep.title}
                    episodeNumber={ep.number}
                    dimmed
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 backdrop-blur-[2px]">
                    <div className="w-12 h-12 rounded-full bg-black/70 border border-white/20 text-amber-400 flex items-center justify-center shadow-lg">
                      <Lock size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-amber-300 uppercase bg-black/80 border border-amber-500/30 px-3 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 bg-black/80 border border-amber-500/40 px-3 py-1 rounded-full text-[11px] font-mono font-bold text-amber-200 shadow-md flex items-center gap-1.5">
                    <CalendarClock size={13} className="text-amber-400" />
                    <span>Coming {formatReleaseDate(ep.releaseDate)}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-3 flex-1 justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full uppercase">
                        EP {ep.number < 10 ? `0${ep.number}` : ep.number} · {ep.tagline}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-white leading-tight">
                      {ep.title}
                    </h3>

                    <p className="text-xs font-semibold text-amber-300/90 italic">
                      &ldquo;{ep.hook}&rdquo;
                    </p>

                    <p className="text-sm text-neutral-400 font-light leading-relaxed mt-1">
                      {ep.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {ep.hashtags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ─── IN THE WORKS / SLATE A ─── */}
      <section className="w-full max-w-6xl mx-auto px-6 py-8 z-10">
        <div className="bg-[#0a1428]/30 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#10b981] bg-[#10b981]/10 px-3 py-1 rounded-full uppercase">
                Slate A — Recovery Arc
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-2">
                In the Works
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-neutral-400 hidden sm:inline-block">
              IN PRODUCTION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            {UPCOMING.map((item) => (
              <div
                key={item.number}
                className="rounded-2xl border border-white/10 bg-[#050505] p-5 flex flex-col justify-between gap-3 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded">
                    EP 0{item.number}
                  </span>
                  <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">
                    In Production
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mt-1 font-light">
                    {item.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI-YA TEASER ─── */}
      <section className="w-full max-w-6xl mx-auto px-6 py-8 z-10">
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

      {/* ─── CTA & CRISIS SUPPORT ─── */}
      <section className="w-full max-w-6xl mx-auto px-6 py-12 flex flex-col gap-8 z-10">
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

        <StoryDisclaimer />
        <CrisisSupport />
      </section>

      <SiteFooter />
    </div>
  );
}
