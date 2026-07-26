import Link from "next/link";
import type { Metadata } from "next";
import { Sparkles, ArrowRight, ChevronRight, Video, AlertCircle } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PostVisual from "@/components/PostVisual";
import { BLOG_SERIES, seriesPosts } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Book Two (Draft) — Addicted World: Pleasure and Pain with AI | AAfiends",
  description:
    "Five chapters, published as they're written. What happens to a species that engineered scarcity out of existence and left the reward on tap.",
  alternates: { canonical: "https://aafiends.com/book2" },
};

export default function Book2Page() {
  const syntheticVoidSeries = BLOG_SERIES.find((s) => s.id === "the-synthetic-void");
  const posts = syntheticVoidSeries ? seriesPosts(syntheticVoidSeries) : [];

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 flex flex-col gap-12">
        {/* HERO */}
        <section className="w-full flex flex-col lg:flex-row items-center gap-10 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-6 md:p-10">
          <div className="flex-1 flex flex-col items-start">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 border border-[#00f0ff]/40 bg-[#00f0ff]/10 text-[#00f0ff] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest">
                <Sparkles size={14} /> Status: Draft
              </span>
              <span className="inline-flex items-center gap-1.5 border border-white/10 bg-white/5 text-neutral-400 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest">
                <Video size={14} /> Episodes in Production
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight uppercase mb-4">
              Addicted World: <br className="hidden sm:block" />
              <span className="text-[#00f0ff]">Pleasure and Pain with AI</span>
            </h1>

            <p className="text-neutral-300 font-light text-base sm:text-lg leading-relaxed mb-6">
              Book Two is being written in public. Five chapters, published as they&apos;re written. What happens to a species that engineered scarcity out of existence and left the reward on tap.
            </p>

            {posts.length > 0 && (
              <Link
                href={`/blog/${posts[0].slug}`}
                className="py-3.5 px-7 rounded-full bg-[#00f0ff] hover:bg-[#00c8d6] text-black text-sm font-black uppercase tracking-widest transition-all flex items-center gap-2"
              >
                Read Chapter 1 <ArrowRight size={16} />
              </Link>
            )}
          </div>

          <div className="flex-1 w-full max-w-xl">
            <div className="w-full aspect-[1200/630] rounded-2xl overflow-hidden bg-[#050505] border border-white/10 relative shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/blog/synthetic-void/series-banner.svg"
                alt="Addicted World: Pleasure and Pain with AI — Book Two"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* FRAMING BLOCK */}
        <section className="bg-[#0a0a0a] border border-[#00f0ff]/20 rounded-2xl p-6 md:p-8 text-neutral-300 leading-relaxed font-light">
          <h2 className="text-xl font-black text-white uppercase tracking-tight mb-3 flex items-center gap-2">
            <span className="text-[#00f0ff]">■</span> Book Two is being written in public
          </h2>
          <p className="text-base text-neutral-300 leading-relaxed mb-3">
            Book One was about the disease inside one person. This one is about the machine we built around all of us: a world that engineered scarcity out of existence and left the reward on tap. Each chapter ships here as a draft, and as an episode of <em>The Synthetic Void</em>, before any of it is finished. If a chapter is wrong, I&apos;d rather find out now than in print.
          </p>
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            — MT &middot; Author of AAfiends &amp; The Synthetic Void
          </p>
        </section>

        {/* CHAPTER LIST */}
        <section className="flex flex-col gap-6">
          <div className="flex justify-between items-end border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#00f0ff] uppercase">Table of Contents</span>
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">The 5 Chapters</h2>
            </div>
            <span className="text-xs font-mono text-neutral-500">{posts.length} Chapters Published</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <div
                key={post.slug}
                className="rounded-3xl overflow-hidden flex flex-col group transition-all duration-300 border border-white/10 hover:border-[#00f0ff]/40 bg-[#0a0a0a]"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  <div className="w-full h-44 relative">
                    <PostVisual icon={post.icon} pillar={post.pillar} variant="card" image={post.heroImage} />
                  </div>
                  <div className="p-6 flex flex-col flex-1 gap-3">
                    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                      <span className="text-[#00f0ff]">Part 0{index + 1}</span>
                      <span className="text-neutral-500">{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-black text-white leading-tight group-hover:text-[#00f0ff] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-4">
                      <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">{post.date}</span>
                      <span className="text-[#00f0ff] group-hover:translate-x-1 transition-transform">
                        <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* SUBSTACK & CRISIS FOOTER */}
        <section className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-4 text-center">
          <p className="text-sm text-neutral-400 leading-relaxed max-w-2xl mx-auto font-light">
            I&apos;ve got a little sobriety and a lot of miles in this trench — I&apos;m not standing on a mountain with the final answer, and you might read all this and land somewhere different. That&apos;s fine. This is just what I&apos;ve learned, and what&apos;s held so far.
          </p>
          <p className="text-xs text-neutral-500 font-mono uppercase tracking-widest">
            The longer, rawer version of each chapter lands on our Substack, <strong className="text-white">The Deficit</strong>.
          </p>
          <div className="border-t border-white/5 pt-4 text-xs text-neutral-400 max-w-xl mx-auto leading-relaxed">
            <p className="text-rose-400 font-bold mb-1 flex items-center justify-center gap-1.5">
              <AlertCircle size={14} /> In dark spot? Call or text 988 anytime.
            </p>
            <p className="text-[11px] text-neutral-500">
              Not medical advice. Peer support and personal experience only. AAfiends is not affiliated with Alcoholics Anonymous World Services.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
