"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PostVisual, { PILLAR_STYLES } from "@/components/PostVisual";
import { blogPosts } from "@/lib/blogData";

/**
 * AAFiends science blog index — added 2026-07-04 (Michael: "create 5-8
 * science based blogs about aafiends.com... more details will be on the
 * substack based on these teaser blogs"). Modeled on racefiends.web.app/blog's
 * card-grid layout, re-themed to AAFiends' emerald/black system and using
 * SiteHeader/SiteFooter (the RaceFiends blog has its own bespoke header —
 * this one stays consistent with the rest of aafiends.com instead).
 */
export default function BlogIndex() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 flex flex-col gap-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col gap-4 max-w-2xl mx-auto"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#10b981] bg-[#10b981]/10 px-3 py-1 rounded-full uppercase self-center">
            The Science
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            Data Over <span className="text-[#10b981]">Denial</span>
          </h1>
          <p className="text-neutral-400 font-light text-base leading-relaxed">
            Short, real, cited breakdowns of the biology behind recovery — the actual numbers behind the Engine, Mirror, and Network pillars, not just the philosophy.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {[...blogPosts]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((post) => {
              const style = PILLAR_STYLES[post.pillar];
              return (
                <motion.div
                  key={post.slug}
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                  className="rounded-3xl overflow-hidden flex flex-col group transition-all duration-300 border border-white/10 hover:border-white/20 bg-[#0a0a0a]"
                >
                  <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                    <div className="w-full h-40 relative">
                      <PostVisual icon={post.icon} pillar={post.pillar} variant="card" />
                    </div>
                    <div className="p-6 flex flex-col flex-1 gap-3">
                      <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                        <span className={`${style.text} flex items-center gap-1.5`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                          {style.label}
                        </span>
                        <span className="text-neutral-500">{post.readTime}</span>
                      </div>
                      <h2 className="text-lg font-black text-white leading-tight group-hover:text-[#10b981] transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed flex-1">{post.excerpt}</p>
                      <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-4">
                        <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">{post.date}</span>
                        <span className="text-[#10b981] group-hover:translate-x-1 transition-transform">
                          <ChevronRight size={16} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
        </motion.div>

        <div className="text-center border-t border-white/5 pt-10">
          <p className="text-xs text-neutral-500 font-mono uppercase tracking-widest">
            Deeper dives on each of these run on The Deficit, our long-form Substack — link coming soon.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
