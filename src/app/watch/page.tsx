import Metadata from "next";
import Link from "next/link";
import { Lock, CalendarClock, Play, Film, Sparkles } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CrisisSupport from "@/components/CrisisSupport";
import StoryDisclaimer from "@/components/StoryDisclaimer";
import EpisodeVideoEmbed from "@/components/EpisodeVideoEmbed";
import EpisodeThumbnail from "@/components/EpisodeThumbnail";
import {
  EPISODES,
  UPCOMING,
  getReleased,
  getUpcoming,
  formatReleaseDate,
} from "@/data/episodesData";

export const metadata = {
  title: "Aivy — The Episodes | AAfiends Data Over Denial",
  description:
    "Same toxic love story, a new costume every time. Watch released and upcoming episodes of Aivy — comedy on top, real addiction science underneath.",
};

export default function WatchPage() {
  const releasedEpisodes = getReleased();
  const comingSoonEpisodes = getUpcoming();

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans flex flex-col justify-between">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col gap-16 w-full">
        {/* Hero Header */}
        <section className="text-center flex flex-col gap-4 max-w-3xl mx-auto">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20 px-3.5 py-1.5 rounded-full uppercase self-center flex items-center gap-1.5">
            <Sparkles size={12} className="text-[#10b981]" />
            DATA OVER DENIAL
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
            Aivy — <span className="text-[#10b981]">the Episodes</span>
          </h1>
          <p className="text-neutral-300 font-light text-base sm:text-lg leading-relaxed italic">
            &ldquo;Same toxic love story, a new costume every time. Comedy on top, real science underneath.&rdquo;
          </p>
        </section>

        {/* Released Episodes Grid */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Film size={20} className="text-[#10b981]" />
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                Released Episodes
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-neutral-400">
              {releasedEpisodes.length} {releasedEpisodes.length === 1 ? "EPISODE" : "EPISODES"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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

        {/* Coming Soon Grid */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <CalendarClock size={20} className="text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                Coming Soon
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-neutral-400">
              NEXT UP
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {comingSoonEpisodes.map((ep) => (
              <article
                key={ep.slug}
                className="rounded-2xl border border-white/10 bg-[#0a0a0a] flex flex-col overflow-hidden relative group"
              >
                {/* Thumbnail Dimmed + Lock Badge */}
                <div className="relative w-full aspect-video overflow-hidden">
                  <EpisodeThumbnail
                    src={ep.thumbnail}
                    alt={ep.title}
                    episodeNumber={ep.number}
                    dimmed
                  />

                  {/* Lock / Ribbon Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 backdrop-blur-[2px]">
                    <div className="w-12 h-12 rounded-full bg-black/70 border border-white/20 text-amber-400 flex items-center justify-center shadow-lg">
                      <Lock size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-amber-300 uppercase bg-black/80 border border-amber-500/30 px-3 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>

                  {/* Date Pill Top Right */}
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

        {/* Upcoming Teaser: In The Works */}
        <section className="flex flex-col gap-6 bg-[#0a1428]/30 border border-white/10 rounded-3xl p-6 sm:p-8">
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
        </section>

        {/* Story Disclaimer & Crisis Support Section */}
        <section className="w-full pt-4 flex flex-col gap-6">
          <StoryDisclaimer />
          <CrisisSupport />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
