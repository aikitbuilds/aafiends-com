import Link from "next/link";
import Image from "next/image";
import { Download, ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BookFeedbackModal from "@/components/BookFeedbackModal";
import { BOOK1_HTML } from "@/data/book1Content";
import "./book1.css";

const PDF_HREF = "/book1/AIV-Recovery-Field-Manual-Book1.pdf";

export default function Book1Page() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans">
      <div className="print:hidden">
        <SiteHeader />
      </div>

      {/* HERO — dark, on-brand, hidden when printing */}
      <section className="print:hidden w-full max-w-7xl mx-auto px-6 py-16 md:py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <span className="inline-flex items-center gap-2 border border-[#c23b21]/40 bg-[#c23b21]/10 text-[#e8543d] px-4 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest mb-6">
            <Sparkles size={14} /> Coming Soon &middot; Read the Beta Now
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05] mb-5 uppercase">
            The AIV Recovery <br className="hidden lg:block" />
            Field Manual
          </h1>
          <p className="text-lg text-neutral-300 max-w-xl leading-relaxed mb-2 font-medium">
            Book One: <span className="text-[#e8a33d] italic">The Engine</span> — a practical survival guide for healing the hardware first.
          </p>
          <p className="text-sm text-neutral-500 max-w-xl leading-relaxed mb-8 font-mono">
            12 chapters &middot; written by MT &middot; free to read while it&apos;s in beta
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            <a href="#read" className="py-3.5 px-7 rounded-full bg-[#e8a33d] hover:bg-[#d99228] text-black text-sm font-black uppercase tracking-widest transition-all flex items-center gap-2">
              Start Reading <ArrowRight size={16} />
            </a>
            <a
              href={PDF_HREF}
              download
              className="py-3.5 px-7 rounded-full border border-white/20 text-white text-sm font-black uppercase tracking-widest hover:border-[#e8a33d]/60 hover:text-[#e8a33d] transition-all flex items-center gap-2"
            >
              <Download size={16} /> Download PDF
            </a>
            <Link
              href="/contact"
              className="py-3.5 px-7 rounded-full border border-white/20 text-white text-sm font-black uppercase tracking-widest hover:border-[#10b981]/60 hover:text-[#10b981] transition-all flex items-center gap-2"
            >
              <MessageSquare size={16} /> Give Feedback
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end w-full max-w-sm">
          <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <Image src="/book1/book1-cover.png" alt="The AIV Recovery Field Manual — Book One: The Engine" fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* DISCLAIMER — always visible, on screen and in print */}
      <section className="w-full max-w-4xl mx-auto px-6 pb-10 print:max-w-none print:px-0">
        <div className="bg-[#1a1210] border border-[#4a2c1a] border-l-4 border-l-[#e8543d] rounded-lg p-6 text-sm leading-relaxed text-neutral-300 print:bg-white print:text-black print:border-black">
          <p className="font-black text-[#e8543d] uppercase tracking-widest text-xs mb-3 print:text-black">Disclaimer</p>
          <p className="mb-3">
            This book draws on my own life story, thirty years of lived experience with addiction, my personal research, and my ongoing AA sobriety journey. The manuscript was compiled and drafted with the help of AI, working from my own notes, journals, and voice recordings &mdash; grounded in my own research and in established best practices in addiction recovery, exercise and sleep science, and mindfulness-based relapse prevention. Every statistic is sourced; every story is either mine or a composite with names changed.
          </p>
          <p className="mb-3">
            This is peer support and personal experience, not medical, psychiatric, or clinical advice, and it is not a substitute for professional treatment. AAFiends is not affiliated with or endorsed by Alcoholics Anonymous World Services, Inc.
          </p>
          <p className="text-[#e8543d]/90 font-bold print:text-black">
            In crisis? Call or text <a href="tel:988" className="underline">988</a> &middot; Text HOME to <a href="sms:741741&body=HOME" className="underline">741741</a> &middot; SAMHSA <a href="tel:18006624357" className="underline">1-800-662-4357</a>
          </p>
        </div>
      </section>

      {/* THE BOOK — white background, print-friendly, id="read" for the hero CTA anchor */}
      <section id="read" className="w-full bg-[#f9f6f0] print:bg-white">
        <div className="max-w-4xl mx-auto px-6 py-14 print:max-w-none print:px-0 print:py-0">
          <div className="book1-content" dangerouslySetInnerHTML={{ __html: BOOK1_HTML }} />
        </div>
      </section>

      <div className="print:hidden">
        <div className="w-full bg-[#050505] py-12 px-6 text-center border-t border-white/5">
          <p className="text-neutral-400 text-sm max-w-xl mx-auto mb-5">
            This is a beta. If something felt generic, confusing, or worth cutting &mdash; tell me. That feedback shapes the final edition and Books Two and Three.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={PDF_HREF} download className="py-3 px-6 rounded-lg bg-white text-black text-sm font-black tracking-widest uppercase flex items-center gap-2">
              <Download size={16} /> Download the PDF
            </a>
            <Link href="/contact" className="py-3 px-6 rounded-lg bg-[#10b981] text-black text-sm font-black tracking-widest uppercase flex items-center gap-2">
              <MessageSquare size={16} /> Send Feedback
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>

      <BookFeedbackModal />
    </div>
  );
}
