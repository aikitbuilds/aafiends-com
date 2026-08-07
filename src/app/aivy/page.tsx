import type { Metadata } from "next";
import { Lock } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CrisisSupport from "@/components/CrisisSupport";
import StoryDisclaimer from "@/components/StoryDisclaimer";
import SubstackSubscribe from "@/components/SubstackSubscribe";
import EpisodeVideoEmbed from "@/components/EpisodeVideoEmbed";
import EpisodeThumbnail from "@/components/EpisodeThumbnail";
import { PHOTOS, type Photo } from "@/lib/photos";
import {
  Wrap,
  Section,
  SectionHead,
  SubHead,
  PageHero,
  Figure,
  StackList,
  ButtonPrimary,
  ButtonGhost,
  ButtonQuiet,
  CtaRow,
} from "@/components/design";
import {
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

/** The series artwork is the subject of this page, so the opener is a frame
 *  from the pilot rather than a library photograph. */
const SERIES_ART: Photo = {
  src: "/thumbnails/ep01.jpg",
  file: "ep01.jpg",
  alt: "Title art for the animated series Aivy — episode one, The Fancy Rat Poison, with Aivy holding a bottle",
  ratio: "16:9",
};

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export default function AivyPage() {
  const releasedEpisodes = getReleased();
  const comingSoonEpisodes = getUpcoming();

  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <SiteHeader />

      <PageHero
        photo={SERIES_ART}
        height="short"
        title={
          <>
            She&rsquo;s funny. She&rsquo;s gorgeous. <em>She&rsquo;s trying to kill you.</em>
          </>
        }
        lede="Aivy is the Addiction Intelligence Virus — the parasite on your shoulder, played as the world's worst wife. Sweet exactly when you're about to use, vicious the moment you get healthy. Zero lectures, and the neuroscience is smuggled in under the laughs."
        meta={`${releasedEpisodes.length} episodes live · ${comingSoonEpisodes.length} coming · starring Aivy, with MT as “The Host”`}
      >
        <CtaRow>
          <ButtonPrimary href="/watch">Watch the episodes</ButtonPrimary>
          <ButtonGhost href="/90rr">Get the free journal</ButtonGhost>
        </CtaRow>
      </PageHero>

      {/* ── Released ─────────────────────────────────────────── */}
      <Section id="episodes">
        <Wrap>
          <SectionHead
            lede={
              <p>
                Same toxic love story, a new costume every time. Press play on any of them &mdash;
                or open them on YouTube.
              </p>
            }
          >
            The episodes, <em>in order.</em>
          </SectionHead>

          <div className="mt-10 border-t border-[#1d231d] sm:mt-14">
            {releasedEpisodes.map((ep) => (
              <article
                key={ep.slug}
                className="grid gap-7 border-b border-[#1d231d] py-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12"
              >
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

                <div>
                  <p className="font-measure text-[13px] text-[#4cc07a]">
                    Episode {pad(ep.number)} · {formatReleaseDate(ep.releaseDate)}
                  </p>
                  <SubHead className="mt-2">{ep.title}</SubHead>
                  <p className="font-display-italic mt-2.5 text-[1.1rem] leading-snug text-[#e0a45c]">
                    &ldquo;{ep.hook}&rdquo;
                  </p>
                  <p className="mt-4 max-w-[56ch] text-[15.5px] text-[#b8b4a6]">{ep.description}</p>
                  <p className="font-measure mt-5 text-[12.5px] leading-relaxed text-[#7d7a70]">
                    {ep.tagline} · {ep.hashtags.map((t) => `#${t}`).join(" ")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ── Coming soon ──────────────────────────────────────── */}
      {comingSoonEpisodes.length > 0 && (
        <Section band>
          <Wrap>
            <SectionHead
              lede={<p>Written, storyboarded, and dated. Release days are listed with each one.</p>}
            >
              Already <em>in the can.</em>
            </SectionHead>

            <div className="mt-10 border-t border-[#1d231d] sm:mt-14">
              {comingSoonEpisodes.map((ep) => (
                <article
                  key={ep.slug}
                  className="grid gap-7 border-b border-[#1d231d] py-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12"
                >
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

                  <div>
                    <p className="font-measure text-[13px] text-[#e0a45c]">
                      Episode {pad(ep.number)} · {formatReleaseDate(ep.releaseDate)}
                    </p>
                    <SubHead className="mt-2">{ep.title}</SubHead>
                    <p className="font-display-italic mt-2.5 text-[1.1rem] leading-snug text-[#e0a45c]">
                      &ldquo;{ep.hook}&rdquo;
                    </p>
                    <p className="mt-4 max-w-[56ch] text-[15.5px] text-[#b8b4a6]">
                      {ep.description}
                    </p>
                    <p className="font-measure mt-5 text-[12.5px] leading-relaxed text-[#7d7a70]">
                      {ep.tagline} · {ep.hashtags.map((t) => `#${t}`).join(" ")}
                    </p>
                  </div>
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
            lede={
              <p>
                Slate A, the recovery arc. Three episodes in production, titles set and dates still
                open.
              </p>
            }
          >
            What comes <em>next.</em>
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

      {/* ── Ai-Ya ────────────────────────────────────────────── */}
      <Section band tight>
        <Wrap>
          <SectionHead>
            And introducing <em>AI-YA.</em>
          </SectionHead>
          <p className="mt-5 max-w-[56ch] text-[#b8b4a6]">
            Aivy&apos;s cousin. Backwards cap. Gold chain. &ldquo;One beer with the boys, king
            &mdash; you EARNED it.&rdquo; Same parasite, different pickup line. Coming this season.
          </p>
        </Wrap>
      </Section>

      {/* ── Subscribe ────────────────────────────────────────── */}
      <Section>
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <Figure photo={PHOTOS.meetingCircle} />
            <div>
              <SectionHead>
                Be there when Aivy <em>goes live.</em>
              </SectionHead>
              <p className="mt-5 max-w-[52ch] text-[#b8b4a6]">
                Episodes premiere on YouTube and the Substack. Subscribe and you&apos;ll meet her
                the moment she escapes the lab &mdash; and if you already know her voice a little
                too well, the free 90-day journal is how MT keeps her asleep.
              </p>
              <div className="mt-7 max-w-xl">
                <SubstackSubscribe />
              </div>
              <CtaRow>
                <ButtonPrimary href="/90rr">Get the free journal</ButtonPrimary>
                <ButtonQuiet href="/protocol">The science behind the jokes</ButtonQuiet>
              </CtaRow>
              <p className="font-measure mt-6 text-[12.5px] text-[#7d7a70]">
                Funny on the surface. Peer support underneath. Never a substitute for treatment.
              </p>
            </div>
          </div>
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
