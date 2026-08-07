import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PostVisual from "@/components/PostVisual";
import { blogPosts, BLOG_SERIES, seriesPosts, PILLAR_STYLES, type BlogPost } from "@/lib/blogData";
import { Wrap, Section, SectionHead } from "@/components/design";

/**
 * The blog index — rebuilt August 2026 on the "Dawn Ledger" world (DESIGN.md).
 *
 * It used to be three grids of identically sized cards, each one a thumbnail,
 * a pill, a title and a chevron. Eighteen of those in a column is a wall, not
 * a table of contents. This is a contents page instead: one photograph per
 * series, then a rule between every entry, the title in the display serif and
 * the measurement — part, date, read time — in mono underneath it.
 *
 * Every href, every series grouping and every post's own words are unchanged.
 * Nothing on this page is hidden behind a scroll observer, so a fast scroll
 * can't land on empty black.
 */

/**
 * Puts the amber italic on the last word of a heading without editing the
 * copy — series titles come from data and must stay exactly as written.
 */
function emphasizeTail(title: string) {
  const words = title.trim().split(" ");
  if (words.length < 2) return <em>{title}</em>;
  const tail = words.pop();
  return (
    <>
      {words.join(" ")} <em>{tail}</em>
    </>
  );
}

function PostRow({ post, part }: { post: BlogPost; part?: number }) {
  const meta = [
    part ? `Part ${String(part).padStart(2, "0")}` : PILLAR_STYLES[post.pillar].label,
    post.date,
    post.readTime,
  ];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid items-baseline gap-x-8 gap-y-2 border-b border-[#1d231d] px-1 py-7 no-underline transition-colors hover:bg-[#141814] sm:grid-cols-[1fr_auto]"
    >
      <div>
        <h3 className="font-display text-[clamp(1.3rem,2.3vw,1.7rem)] leading-[1.15] text-[#f2efe6] transition-colors group-hover:text-[#4cc07a]">
          {post.title}
        </h3>
        <p className="mt-2.5 max-w-[62ch] text-[15.5px] leading-relaxed text-[#b8b4a6]">
          {post.excerpt}
        </p>
        <p className="font-measure mt-3.5 text-[13px] text-[#7d7a70]">{meta.join(" · ")}</p>
      </div>
      <span
        className="hidden shrink-0 text-[#4cc07a] transition-transform group-hover:translate-x-1 sm:block"
        aria-hidden
      >
        <ChevronRight size={18} />
      </span>
    </Link>
  );
}

export default function BlogIndex() {
  const seriesCategories = new Set(BLOG_SERIES.map((s) => s.category));

  const standalone = blogPosts
    .filter((post) => !post.category || !seriesCategories.has(post.category))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <SiteHeader />

      <main>
        {/* ── Masthead ──────────────────────────────────────── */}
        <Section tight>
          <Wrap>
            <h1 className="font-display max-w-[15ch] text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[1.04] tracking-[-0.025em] text-[#f2efe6] [&_em]:font-display-italic [&_em]:text-[#e0a45c]">
              Data over <em>denial.</em>
            </h1>
            <p className="mt-6 max-w-[58ch] text-[clamp(1.05rem,1.5vw,1.2rem)] leading-[1.6] text-[#b8b4a6]">
              Short, real, cited breakdowns of the biology behind recovery — the actual numbers
              behind the Engine, Mirror, and Network pillars, not just the philosophy.
            </p>
          </Wrap>
        </Section>

        {/* ── The series ────────────────────────────────────── */}
        {BLOG_SERIES.map((s, i) => {
          const posts = seriesPosts(s);
          if (posts.length === 0) return null;
          return (
            <Section key={s.id} id={s.id} band={i % 2 === 0} tight>
              <Wrap>
                <PostVisual post={posts[0]} className="mb-12 max-w-[980px]" />
                <SectionHead lede={<p>{s.tagline}</p>}>{emphasizeTail(s.title)}</SectionHead>
                <div className="mt-10 border-t border-[#1d231d] sm:mt-12">
                  {posts.map((post, idx) => (
                    <PostRow key={post.slug} post={post} part={idx + 1} />
                  ))}
                </div>
              </Wrap>
            </Section>
          );
        })}

        {/* ── Everything else ───────────────────────────────── */}
        {standalone.length > 0 && (
          <Section tight>
            <Wrap>
              <SectionHead
                lede={
                  <p>
                    One question per piece, answered with the research that is actually there —
                    sleep, cold, cravings, wearables, and what the first ninety days really do.
                  </p>
                }
              >
                The rest of the <em>research.</em>
              </SectionHead>
              <div className="mt-10 border-t border-[#1d231d] sm:mt-12">
                {standalone.map((post) => (
                  <PostRow key={post.slug} post={post} />
                ))}
              </div>
            </Wrap>
          </Section>
        )}

        <Section tight>
          <Wrap>
            <p className="max-w-[58ch] border-t border-[#1d231d] pt-8 text-[#b8b4a6]">
              Deeper dives on each of these run on The Deficit, our long-form Substack — link coming
              soon.
            </p>
          </Wrap>
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}
