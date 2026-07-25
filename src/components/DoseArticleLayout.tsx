import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogContent from "@/components/BlogContent";
import { DoseHero } from "@/components/DoseFigures";
import type { BlogPost } from "@/lib/blogData";

/**
 * Shared layout for the /90rr DOSE field guides — added 2026-07-24.
 * Reuses the proven BlogContent section renderer, but with a code-rendered
 * DoseHero banner instead of the blog's PostVisual, and its own CTA that
 * points back into the 90 R&R journal + shopping list rather than /dashboard.
 */
export default function DoseArticleLayout({
  post,
  accent,
  kicker,
  iconName,
  Icon,
}: {
  post: BlogPost;
  accent: string;
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
    <div className="min-h-screen bg-[#050505] font-sans text-neutral-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/90rr"
          className="mb-6 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#10b981] transition-colors hover:text-emerald-300"
        >
          <ChevronLeft size={14} /> Back to 90 R&amp;R
        </Link>

        <DoseHero kicker={kicker} title={post.title} sub={post.excerpt} accent={accent} iconName={iconName} Icon={Icon} />

        <div className="mb-10 mt-5 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500">
          <span>{post.author}</span>
          <span className="h-1 w-1 rounded-full bg-neutral-600" />
          <span>{post.date}</span>
          <span className="h-1 w-1 rounded-full bg-neutral-600" />
          <span>{post.readTime}</span>
        </div>

        <BlogContent post={post} />

        {/* CTA */}
        <div className="mt-16 rounded-3xl border border-[#10b981]/20 bg-[#10b981]/[0.04] p-8 text-center sm:p-10">
          <h3 className="mb-2 text-xl font-black text-white">Track it daily. That is where it sticks.</h3>
          <p className="mx-auto mb-6 max-w-sm text-sm font-light text-neutral-400">
            The 90 R&amp;R journal turns everything in this guide into a ten-second daily check across the three pillars.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/90rr"
              className="inline-block rounded-full bg-[#10b981] px-8 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-emerald-400"
            >
              Get the Journal
            </Link>
            <Link
              href="/90rr/shopping-list"
              className="inline-block rounded-full border border-white/15 px-8 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white/5"
            >
              Shopping Lists
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
