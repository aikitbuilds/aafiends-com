import type { Metadata } from "next";
import { Lock } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CrisisSupport from "@/components/CrisisSupport";
import StoryDisclaimer from "@/components/StoryDisclaimer";
import EpisodeVideoEmbed from "@/components/EpisodeVideoEmbed";
import EpisodeThumbnail from "@/components/EpisodeThumbnail";
import type { Photo } from "@/lib/photos";
import {
  Wrap,
  Section,
  SectionHead,
  SubHead,
  PageHero,
  StackList,
  ButtonPrimary,
  ButtonGhost,
  CtaRow,
} from "@/components/design";
import {
  UPCOMING,
  getReleased,
  getUpcoming,
  formatReleaseDate,
} from "@/data/episodesData";

export const metadata: Metadata = {
  title: "Aivy — The Episodes | AAfiends Data Over Denial",
  description:
    "Same toxic love story, a new costume every time. Watch released and upcoming episodes of Aivy — comedy on top, real addiction science underneath.",
};

/** The episode artwork leads this page, so the opener is a frame from the
 *  most recent release rather than a library photograph. */
const INDEX_ART: Photo = {
  src: "/thumbnails/ep03.png",
  file: "ep03.png",
  alt: "Title art for Aivy episode three, The First Week, showing Aivy changing shape across seven nights",
  ratio: "16:9",
};

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export default function WatchPage() {
  const releasedEpisodes = getReleased();
  const comingSoonEpisodes = getUpcoming();

  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <SiteHeader />

      <PageHero
        photo={INDEX_ART}
        height="short"
        title={
          <>
            The episodes, <em>in order.</em>
          </>
        }
        lede="Same toxic love story, a new costume every time. Comedy on top, real addiction science underneath."
        meta={`${releasedEpisodes.length} released · ${comingSoonEpisodes.length} dated · ${UPCOMING.length} in production`}
      >
        <CtaRow>
          <ButtonPrimary href="#released">Start with episode 1</ButtonPrimary>
          <ButtonGhost href="/aivy">Meet Aivy</ButtonGhost>
        </CtaRow>
      </PageHero>

      {/* ── Released ─────────────────────────────────────────── */}
      <Section id="released">
        <Wrap>
          <SectionHead
            lede={<p>Press play here, or open any episode directly on YouTube.</p>}
          >
            Released <em>so far.</em>
          </SectionHead>

          <div className="mt-10 grid gap-x-10 gap-y-12 sm:mt-14 md:grid-cols-2">
            {releasedEpisodes.map((ep) => (
              <article key={ep.slug} className="border-t border-[#1d231d] pt-6">
                <div className="overflow-hidden rounded-[14px] bg-[#141814]">
                  {ep.youtubeId ? (
                    <EpisodeVideoEmbed
                      youtubeId={ep.youtubeId}
                      thumbnail={ep.thumbnail}
                      title={ep.title}
                      episodeNumber={ep.number}
                    />
                  ) : (
                    <EpisodeThumbnail
                      src={ep.thumbnail}
                      alt={`Title art for Aivy episode ${ep.number}, ${ep.title}`}
                      episodeNumber={ep.number}
                    />
                  )}
                </div>

                <p className="font-measure mt-5 text-[13px] text-[#4cc07a]">
                  Episode {pad(ep.number)} · {formatReleaseDate(ep.releaseDate)}
                </p>
                <SubHead className="mt-2">{ep.title}</SubHead>
                <p className="font-display-italic mt-2.5 text-[1.05rem] leading-snug text-[#e0a45c]">
                  &ldquo;{ep.hook}&rdquo;
                </p>
                <p className="mt-4 max-w-[54ch] text-[15.5px] text-[#b8b4a6]">{ep.description}</p>
                <p className="font-measure mt-5 text-[12.5px] leading-relaxed text-[#7d7a70]">
                  {ep.tagline} · {ep.hashtags.map((t) => `#${t}`).join(" ")}
                </p>
              </article>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ── Coming soon ──────────────────────────────────────── */}
      {comingSoonEpisodes.length > 0 && (
        <Section band>
          <Wrap>
            <SectionHead lede={<p>Finished and dated. Each one lands on the day listed.</p>}>
              Coming <em>next.</em>
            </SectionHead>

            <div className="mt-10 grid gap-x-10 gap-y-12 sm:mt-14 md:grid-cols-2">
              {comingSoonEpisodes.map((ep) => (
                <article key={ep.slug} className="border-t border-[#1d231d] pt-6">
                  <div className="relative overflow-hidden rounded-[14px] bg-[#141814]">
                    <EpisodeThumbnail
                      src={ep.thumbnail}
                      alt={`Title art for Aivy episode ${ep.number}, ${ep.title}`}
                      episodeNumber={ep.number}
                      dimmed
                    />
                    <span className="font-measure absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-[10px] bg-[#0d0f0d]/85 px-3 py-1.5 text-[12px] text-[#e0a45c]">
                      <Lock size={13} aria-hidden="true" /> Coming{" "}
                      {formatReleaseDate(ep.releaseDate)}
                    </span>
                  </div>

                  <p className="font-measure mt-5 text-[13px] text-[#e0a45c]">
                    Episode {pad(ep.number)} · {formatReleaseDate(ep.releaseDate)}
                  </p>
                  <SubHead className="mt-2">{ep.title}</SubHead>
                  <p className="font-display-italic mt-2.5 text-[1.05rem] leading-snug text-[#e0a45c]">
                    &ldquo;{ep.hook}&rdquo;
                  </p>
                  <p className="mt-4 max-w-[54ch] text-[15.5px] text-[#b8b4a6]">{ep.description}</p>
                  <p className="font-measure mt-5 text-[12.5px] leading-relaxed text-[#7d7a70]">
                    {ep.tagline} · {ep.hashtags.map((t) => `#${t}`).join(" ")}
                  </p>
                </article>
              ))}
            </div>
          </Wrap>
        </Section>
      )}

      {/* ── The next slate ───────────────────────────────────── */}
      <Section>
        <Wrap>
          <SectionHead
            lede={<p>Slate A, the recovery arc. Titles set, dates still open.</p>}
          >
            In the <em>works.</em>
          </SectionHead>
          <StackList
            items={UPCOMING.map((item) => ({
              n: pad(item.number),
              title: item.title,
              body: item.tagline,
              maps: "in production",
            }))}
          />
        </Wrap>
      </Section>

      <Section band tight>
        <Wrap>
          <div className="flex flex-col gap-6">
            <StoryDisclaimer />
            <CrisisSupport />
          </div>
        </Wrap>
      </Section>

      <SiteFooter />
    </div>
  );
}
