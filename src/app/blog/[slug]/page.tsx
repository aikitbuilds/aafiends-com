import { blogPosts, getPostBySlug, PILLAR_STYLES } from "@/lib/blogData";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PostVisual from "@/components/PostVisual";
import BlogContent from "@/components/BlogContent";

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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const style = PILLAR_STYLES[post.pillar];

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
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <SiteHeader />

      {/* Hero */}
      <div className="w-full h-[32vh] md:h-[38vh] relative">
        <PostVisual icon={post.icon} pillar={post.pillar} variant="hero" image={post.heroImage} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-[#10b981] hover:text-emerald-300 mb-4 transition-colors">
              <ChevronLeft size={14} /> Back to The Science
            </Link>
            <span className={`inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${style.border} ${style.bg} ${style.text} mb-3`}>
              {style.label}
            </span>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight mb-3">{post.title}</h1>
            <div className="flex items-center gap-3 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              <span>{post.author}</span>
              <span className="w-1 h-1 rounded-full bg-neutral-600"></span>
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-neutral-600"></span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <BlogContent post={post} />

        {/* CTA */}
        <div className="mt-16 border border-[#10b981]/20 bg-[#10b981]/[0.04] p-8 sm:p-10 rounded-3xl text-center">
          <h3 className="text-xl font-black text-white mb-2">See how this shows up in your own data.</h3>
          <p className="text-sm text-neutral-400 max-w-sm mx-auto mb-6 font-light">
            The Mirror pillar turns ideas like this into a daily check-in and a trend line, not just a read.
          </p>
          <Link
            href="/dashboard"
            className="inline-block py-3 px-8 rounded-full bg-[#10b981] hover:bg-emerald-400 text-black text-sm font-black tracking-widest uppercase transition-all"
          >
            Open My Dashboard
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
