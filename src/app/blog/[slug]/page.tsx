import { blogPosts, getPostBySlug, PILLAR_STYLES } from "@/lib/blogData";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PostVisual from "@/components/PostVisual";
import BlogContent from "@/components/BlogContent";
import SubstackSubscribe from "@/components/SubstackSubscribe";
import { Wrap, SubHead, CalloutBand, ButtonPrimary, ButtonQuiet, CtaRow } from "@/components/design";

/**
 * The article template every post on /blog inherits — rebuilt August 2026 on
 * the "Dawn Ledger" world (DESIGN.md). One change here lands on all 18 posts.
 *
 * The masthead is a magazine masthead and nothing else: the title in the
 * display serif at a real size, a standfirst, then a single mono line of
 * measurement — date, read time, byline, series. There is no eyebrow chip
 * above the title, because the title is the first thing on the page.
 *
 * The lead photograph is wider than the column, the column is 68ch, and the
 * body is in <Prose>, which is the surface tuned for reading a long argument
 * on a phone at one in the morning.
 */

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://aafiends.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://aafiends.com/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

/** The measure. 68ch of Public Sans at 17px — inside the 65–75ch band. */
const COLUMN = "mx-auto max-w-[68ch]";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const pillar = PILLAR_STYLES[post.pillar];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "AA Fiends", url: "https://aafiends.com" },
    datePublished: post.date,
    mainEntityOfPage: `https://aafiends.com/blog/${post.slug}`,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <SiteHeader />

      <main className="pb-24 pt-10 sm:pt-16">
        {/* ── Masthead ──────────────────────────────────────── */}
        <Wrap>
          <div className={COLUMN}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[15px] text-[#b8b4a6] no-underline transition-colors hover:text-[#f2efe6]"
            >
              <ChevronLeft size={16} aria-hidden /> Back to the blog
            </Link>

            <h1 className="font-display mt-7 text-[clamp(2.25rem,5.4vw,3.75rem)] leading-[1.06] tracking-[-0.025em] text-[#f2efe6]">
              {post.title}
            </h1>

            <p className="mt-6 max-w-[58ch] text-[clamp(1.05rem,1.5vw,1.2rem)] leading-[1.6] text-[#b8b4a6]">
              {post.excerpt}
            </p>

            {/* The measurement line. Mono, below the title, never above it. */}
            <div className="font-measure mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 border-t border-[#1d231d] pt-5 text-[13px] text-[#7d7a70]">
              <span className="text-[#4cc07a]">{post.date}</span>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
              <span aria-hidden>·</span>
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <span>{post.category ?? pillar.label}</span>
            </div>
          </div>
        </Wrap>

        {/* ── The lead photograph ───────────────────────────── */}
        <Wrap className="mt-10 sm:mt-12">
          <PostVisual post={post} priority className="mx-auto max-w-[980px]" />
        </Wrap>

        {/* ── The body ──────────────────────────────────────────
            BlogContent carries its own <Prose> per text block, so the
            measure holds while charts and figures stay free to break it. */}
        <Wrap className="mt-12 sm:mt-16">
          <div className={COLUMN}>
            <BlogContent post={post} />
          </div>
        </Wrap>

        {/* ── End of article ────────────────────────────────── */}
        <Wrap className="mt-20">
          <div className={COLUMN}>
            <CalloutBand>
              <SubHead>
                See how this shows up in <em>your own data.</em>
              </SubHead>
              <p className="mt-3 max-w-[52ch] text-[#b8b4a6]">
                The Mirror pillar turns ideas like this into a daily check-in and a trend line, not
                just a read.
              </p>
              <CtaRow>
                <ButtonPrimary href="/dashboard">Open my dashboard</ButtonPrimary>
                <ButtonQuiet href="/blog">Back to all the writing</ButtonQuiet>
              </CtaRow>
            </CalloutBand>

            <div className="mt-14 border-t border-[#1d231d] pt-10">
              <SubHead>
                Get the next one in <em>your inbox.</em>
              </SubHead>
              <p className="mt-3 max-w-[52ch] text-[#b8b4a6]">
                The Deficit is the long-form version of everything above — the full citation list,
                the caveats, and the podcast. No spam.
              </p>
              <div className="mt-6 max-w-xl">
                <SubstackSubscribe />
              </div>
            </div>
          </div>
        </Wrap>
      </main>

      <SiteFooter />
    </div>
  );
}
