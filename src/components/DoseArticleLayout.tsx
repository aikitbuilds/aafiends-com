import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogContent from "@/components/BlogContent";
import PostVisual from "@/components/PostVisual";
import type { BlogPost } from "@/lib/blogData";
import { Wrap, SubHead, CalloutBand, ButtonPrimary, ButtonGhost, CtaRow } from "@/components/design";

/**
 * Shared layout for the /90rr DOSE field guides.
 *
 * Rebuilt August 2026 to inherit the same editorial masthead as /blog/[slug]:
 * title in the display serif, standfirst, one mono measurement line, then a
 * documentary lead photograph and the body in <Prose>. The old DoseHero
 * banner — a radial-gradient panel with a dot grid, an icon tile and a
 * letter-spaced pill above the H1 — is exactly the shape DESIGN.md retires,
 * so the guides now read like the rest of the site instead of like a console.
 *
 * `kicker` survives as the guide's series line and now sits *under* the
 * title with the rest of the measurement, where it is information rather than
 * an eyebrow. `accent`, `iconName` and `Icon` stay in the signature so the
 * four /90rr pages keep type-checking; the world's colour comes from the
 * shared tokens now, not from a per-page hex.
 */
export default function DoseArticleLayout({
  post,
  kicker,
}: {
  post: BlogPost;
  accent?: string;
  kicker: string;
  iconName?: string;
  Icon?: LucideIcon;
}) {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: "MT" },
    publisher: { "@type": "Organization", name: "AA Fiends", url: "https://aafiends.com" },
    datePublished: post.date,
    mainEntityOfPage: `https://aafiends.com/90rr/${post.slug}`,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <SiteHeader />

      <main className="pb-24 pt-10 sm:pt-16">
        <Wrap>
          <div className="mx-auto max-w-[68ch]">
            <Link
              href="/90rr"
              className="inline-flex items-center gap-1.5 text-[15px] text-[#b8b4a6] no-underline transition-colors hover:text-[#f2efe6]"
            >
              <ChevronLeft size={16} aria-hidden /> Back to 90 R&amp;R
            </Link>

            <h1 className="font-display mt-7 text-[clamp(2.25rem,5.4vw,3.75rem)] leading-[1.06] tracking-[-0.025em] text-[#f2efe6]">
              {post.title}
            </h1>

            <p className="mt-6 max-w-[58ch] text-[clamp(1.05rem,1.5vw,1.2rem)] leading-[1.6] text-[#b8b4a6]">
              {post.excerpt}
            </p>

            <div className="font-measure mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 border-t border-[#1d231d] pt-5 text-[13px] text-[#7d7a70]">
              <span className="text-[#4cc07a]">{post.date}</span>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
              <span aria-hidden>·</span>
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <span>{kicker}</span>
            </div>
          </div>
        </Wrap>

        <Wrap className="mt-10 sm:mt-12">
          <PostVisual post={post} priority className="mx-auto max-w-[980px]" />
        </Wrap>

        <Wrap className="mt-12 sm:mt-16">
          <div className="mx-auto max-w-[68ch]">
            <BlogContent post={post} />
          </div>
        </Wrap>

        <Wrap className="mt-20">
          <div className="mx-auto max-w-[68ch]">
            <CalloutBand>
              <SubHead>
                Track it daily. <em>That is where it sticks.</em>
              </SubHead>
              <p className="mt-3 max-w-[52ch] text-[#b8b4a6]">
                The 90 R&amp;R journal turns everything in this guide into a ten-second daily check
                across the three pillars.
              </p>
              <CtaRow>
                <ButtonPrimary href="/90rr">Get the journal</ButtonPrimary>
                <ButtonGhost href="/90rr/shopping-list">See the shopping lists</ButtonGhost>
              </CtaRow>
            </CalloutBand>
          </div>
        </Wrap>
      </main>

      <SiteFooter />
    </div>
  );
}
