import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import JournalBuilder from "@/components/JournalBuilder";

export const metadata: Metadata = {
  title: "Build Your Own 90 R&R Journal — Customizable Printable Workbook",
  description:
    "Customize your own printable recovery journal: toggle the fields you want, pick full-page or fold-and-staple half-page, and print or save as PDF. Free from AAfiends.",
  alternates: { canonical: "https://aafiends.com/90rr/builder" },
  openGraph: {
    title: "Build Your Own 90 R&R Journal",
    description: "Toggle fields, pick full or half-page, print or save as PDF.",
    url: "https://aafiends.com/90rr/builder",
    siteName: "AAfiends",
    type: "website",
  },
};

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100">
      <div className="no-print border-b border-white/5 bg-[#051024]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/90rr" className="inline-flex items-center gap-2 text-sm font-bold text-neutral-300 hover:text-white uppercase tracking-widest">
            <ArrowLeft size={16} /> Back to the journal
          </Link>
          <div className="text-sm font-black tracking-tight text-white uppercase">Journal <span className="text-[#10b981]">Builder</span></div>
        </div>
      </div>
      <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8">
        <header className="no-print flex flex-col gap-3">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#f59e0b]">Make it yours</span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white leading-[0.95]">Build your own journal</h1>
          <p className="text-neutral-300 max-w-2xl leading-relaxed">
            Keep the rows that fit your recovery, drop the ones that don&apos;t, add your own, then print full-page or as a
            fold-and-staple half-page mini-book. Nothing to install — your layout saves on this device.
          </p>
        </header>
        <JournalBuilder />
      </main>
    </div>
  );
}
