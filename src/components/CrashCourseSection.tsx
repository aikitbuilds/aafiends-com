"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Download, ExternalLink, Clock, ChevronDown, BookOpen } from "lucide-react";
import {
  CRASH_COURSE_YOUTUBE_ID,
  CRASH_COURSE_RUNTIME,
  CRASH_COURSE_CHAPTERS,
  CourseChapter,
} from "@/lib/constants";

interface CrashCourseSectionProps {
  starterPdf: string;
  starterBookletPdf: string;
}

export default function CrashCourseSection({
  starterPdf,
  starterBookletPdf,
}: CrashCourseSectionProps) {
  const [activeSeconds, setActiveSeconds] = useState<number | null>(null);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${CRASH_COURSE_YOUTUBE_ID}?rel=0${
    activeSeconds !== null ? `&start=${activeSeconds}&autoplay=1` : ""
  }`;

  return (
    <section id="crash-course" className="flex flex-col gap-8 scroll-mt-28">
      {/* Header Block */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10b981]/15 border border-[#10b981]/40 text-xs font-mono font-bold text-[#10b981] uppercase tracking-widest">
            <Play size={12} className="fill-[#10b981]" /> Video Course · {CRASH_COURSE_RUNTIME}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <BookOpen size={13} className="text-[#f59e0b]" /> Paired with 7-Day Starter Booklet
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          The 90 R&amp;R Crash Course
        </h2>
        <p className="text-lg text-[#10b981] font-mono uppercase tracking-wide font-bold">
          Everything you need in one sitting. Then you start.
        </p>

        <p className="text-base text-neutral-300 max-w-3xl leading-relaxed">
          Eighty minutes, seven days, one printed journal. It covers what the disease actually is, the four chemicals you rebuild, and then walks day by day from Day Zero to Day Seven. Watch it once with the booklet in front of you and you can start the same day.
        </p>
      </div>

      {/* Video Embed */}
      <div className="w-full flex flex-col gap-4">
        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl relative">
          <iframe
            src={embedUrl}
            title="The 90 R&R Crash Course — Seven Days, One Sitting"
            className="w-full h-full border-0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Chapter List Accordion */}
        <details className="w-full bg-[#09090b] border border-white/10 rounded-2xl p-4 sm:p-5 group text-left">
          <summary className="cursor-pointer list-none flex items-center justify-between text-xs sm:text-sm font-black uppercase tracking-[0.15em] text-neutral-300 hover:text-white transition-colors">
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-[#10b981]" />
              Course Chapters ({CRASH_COURSE_CHAPTERS.length} chapters · {CRASH_COURSE_RUNTIME})
            </span>
            <ChevronDown size={18} className="text-neutral-500 group-open:rotate-180 transition-transform" />
          </summary>

          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-1.5">
            {CRASH_COURSE_CHAPTERS.map((ch: CourseChapter) => (
              <button
                key={ch.seconds}
                type="button"
                onClick={() => setActiveSeconds(ch.seconds)}
                className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl text-left text-xs sm:text-sm transition-all ${
                  activeSeconds === ch.seconds
                    ? "bg-[#10b981]/20 border border-[#10b981]/40 text-white font-bold"
                    : "hover:bg-white/5 border border-transparent text-neutral-300 hover:text-white"
                }`}
              >
                <span className="font-medium leading-tight flex-1 pr-4">{ch.title}</span>
                <span className="font-mono text-[11px] sm:text-xs font-bold text-[#10b981] bg-[#10b981]/10 px-2.5 py-1 rounded-md shrink-0">
                  {ch.timestamp}
                </span>
              </button>
            ))}
          </div>
        </details>
      </div>

      {/* Booklet Pairing Banner & Download Buttons */}
      <div className="bg-[#09090b] border border-[#10b981]/30 rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10.5px] font-mono font-bold uppercase tracking-widest text-[#f59e0b]">
            ★ Paired Starter Booklet
          </span>
          <p className="text-sm font-bold text-white">
            Print this first — the video follows it page for page.
          </p>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Have the physical 7-Day Starter in your hands while watching. Mark your date, name your people, and log Day 0 before the video ends.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={starterPdf}
            download
            className="py-3.5 px-5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-black text-xs font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Download size={15} /> ↓ 7-Day Starter (Full Size)
          </a>
          <a
            href={starterBookletPdf}
            download
            className="py-3.5 px-5 rounded-xl border border-[#10b981]/60 text-[#10b981] hover:bg-[#10b981]/10 text-xs font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2"
          >
            <Download size={15} /> ↓ 7-Day Booklet (Half Size)
          </a>
        </div>
      </div>

      {/* Extended Prep Link */}
      <div className="text-xs text-neutral-400 font-mono flex items-center gap-2">
        <span>Sent here from Day 3 in the video?</span>
        <Link
          href="/prep90"
          className="text-[#10b981] font-bold hover:underline flex items-center gap-1"
        >
          View extended shopping &amp; supplement prep lists on /prep90 <ExternalLink size={12} />
        </Link>
      </div>
    </section>
  );
}
