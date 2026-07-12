import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Mail, BookOpen, LifeBuoy } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact AAfiends — Questions, Feedback & the 90 R&R Fellowship",
  description:
    "Get in touch with AAfiends. Questions about the 90 Days R&R recovery journal, the Fellowship cohort, feedback, or partnerships — reach us at aafiends@gmail.com or send a message.",
  alternates: { canonical: "https://aafiends.com/contact" },
  openGraph: {
    title: "Contact AAfiends",
    description: "Questions, feedback, or the 90 R&R Fellowship — reach us at aafiends@gmail.com.",
    url: "https://aafiends.com/contact",
    siteName: "AAfiends",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col">
      <SiteHeader />
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-14 md:py-20 flex flex-col gap-12">
        <section className="flex flex-col gap-4">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#10b981]">Get in touch</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-[0.95]">
            Talk to us
          </h1>
          <p className="text-lg text-neutral-300 max-w-2xl leading-relaxed">
            Questions about the journal or the Fellowship, feedback, an idea, or you just want to say hi — we read every
            message. Reach us any time at{" "}
            <a href="mailto:aafiends@gmail.com" className="text-[#10b981] font-bold hover:underline">aafiends@gmail.com</a>.
          </p>
        </section>

        <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-white/10">
          <Image src="/recovery_hero_hope.png" alt="You are not alone \u2014 reach out" fill className="object-cover object-[center_28%]" sizes="(max-width: 768px) 100vw, 1024px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/10 to-transparent" />
          <p className="absolute bottom-5 left-6 right-6 text-white font-black uppercase tracking-tight text-xl md:text-2xl drop-shadow">You reached out. That&apos;s the hardest rep.</p>
        </div>

        <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 items-start">
          <ContactForm />

          <aside className="flex flex-col gap-4">
            <a href="mailto:aafiends@gmail.com" className="bg-[#09090b] border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:border-[#10b981]/40 transition-colors">
              <Mail className="text-[#10b981] shrink-0" size={22} />
              <div>
                <div className="text-sm font-black text-white uppercase tracking-wide">Email</div>
                <div className="text-sm text-neutral-400">aafiends@gmail.com</div>
              </div>
            </a>
            <Link href="/90rr" className="bg-[#09090b] border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:border-[#10b981]/40 transition-colors">
              <BookOpen className="text-[#f59e0b] shrink-0" size={22} />
              <div>
                <div className="text-sm font-black text-white uppercase tracking-wide">Get the free journal</div>
                <div className="text-sm text-neutral-400">Download the 90 R&amp;R workbook</div>
              </div>
            </Link>
            <div className="bg-[#0a0a0a] border border-red-500/25 rounded-2xl p-5 flex items-start gap-3">
              <LifeBuoy className="text-red-400 shrink-0 mt-0.5" size={20} />
              <p className="text-xs text-neutral-300 leading-relaxed">
                In crisis? We&apos;re not a crisis line. Call or text <a href="tel:988" className="text-red-300 underline">988</a>,
                or text HOME to 741741. You matter.
              </p>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
