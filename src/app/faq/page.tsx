import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ — Cost, Privacy, AA Affiliation & How It Works",
  description:
    "Straight answers about AA Fiends: what the 90 R&R journal costs (nothing), what the Fellowship deposit is, what happens to your health data, whether this replaces AA or treatment (it doesn't), and how anonymity works.",
  alternates: { canonical: "https://aafiends.com/faq" },
};

const FAQS: { q: string; a: string; link?: { href: string; label: string } }[] = [
  {
    q: "What does this cost?",
    a: "The 90 R&R printable journal, the journal builder, the BIO 12 protocol, the blog, and the beta book are all free — no signup, no card, no catch. The in-person 90 R&R Fellowship cohort is limited to 12 seats and reserved with a $20 deposit, or pay what you can. Per Tradition 7, the fellowship is self-supporting through our own contributions.",
    link: { href: "/90rr", label: "Get the free journal" },
  },
  {
    q: "Is AA Fiends affiliated with Alcoholics Anonymous?",
    a: "No. AA Fiends is built by people in recovery, for people in recovery, and honors the Traditions — but it is not affiliated with or endorsed by Alcoholics Anonymous World Services, Inc. It's a companion to whatever program you work, not a replacement for the rooms.",
  },
  {
    q: "Is this a replacement for treatment, therapy, or medical detox?",
    a: "No. AA Fiends is peer support and self-tracking — not medical advice, not professional treatment, and not a substitute for either. Withdrawal from alcohol and some other substances can be medically dangerous; talk to a doctor before you quit cold. If you're in crisis right now, call or text 988, text HOME to 741741, or call SAMHSA at 1-800-662-4357.",
  },
  {
    q: "What happens to my health data?",
    a: "Your daily check-ins and any wearable data you upload are stored in a private vault tied to your account that only you can access — we don't sell it, and wearable files (Garmin .fit, Apple Health, Google Fit) are parsed in your own browser before anything is saved. The full plain-language breakdown is on the privacy page.",
    link: { href: "/privacy", label: "Read the privacy page" },
  },
  {
    q: "Do I need a wearable (Garmin, Apple Watch, Whoop) to use this?",
    a: "No. The printable journal needs a pen. The dashboard works with 10-second manual check-ins — sliders and taps. Wearable uploads are an optional layer of proof on top, never a requirement.",
  },
  {
    q: "Can I stay anonymous?",
    a: "Yes. Use a pseudonym anywhere your name would appear — we honor Traditions 11 and 12. The Fellowship operates the same way: your seat is yours, your anonymity is yours.",
  },
  {
    q: "Is this only for alcohol?",
    a: "No. AA Fiends started in the rooms of AA, but the same Addiction Intelligence Virus runs on opioids, nicotine, cannabis, gambling, and more. The defense is identical: daily data, the BIO 12 protocol, and the fellowship.",
    link: { href: "/protocol", label: "See the BIO 12 protocol" },
  },
  {
    q: "What's the difference between the free journal and the Fellowship?",
    a: "Same system, different support level. The journal (free, printable, self-paced) gives you the daily pages and the full online guide. The Fellowship is a 12-seat cohort that works the same 90 days together — one intensive bootcamp day to launch, then daily accountability until Day 90. Starts together, finishes together.",
    link: { href: "/90-r-and-r", label: "Explore the Fellowship" },
  },
];

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteHeader />

      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-20 flex flex-col gap-12 relative z-10">
        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#10b981]/10 flex items-center justify-center border border-[#10b981]/30 text-[#10b981]">
            <HelpCircle size={32} />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-[#10b981] uppercase tracking-widest block mb-1">
              Straight Answers
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
              Questions, Answered
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {FAQS.map((f) => (
            <div key={f.q} className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 flex flex-col gap-3 hover:border-[#10b981]/30 transition-colors">
              <h2 className="text-xl font-black text-white tracking-tight">{f.q}</h2>
              <p className="text-neutral-400 leading-relaxed">{f.a}</p>
              {f.link && (
                <Link
                  href={f.link.href}
                  className="w-fit text-sm font-black uppercase tracking-widest text-[#10b981] hover:text-emerald-300 transition-colors"
                >
                  {f.link.label} →
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 text-center flex flex-col gap-4">
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Something else on your mind?</h2>
          <p className="text-neutral-400 leading-relaxed">
            Ask directly — a human in recovery reads every message.
          </p>
          <Link
            href="/contact"
            className="mx-auto py-3 px-8 rounded-2xl bg-[#10b981] hover:bg-[#059669] text-black text-sm font-black tracking-widest uppercase transition-all w-fit"
          >
            Contact us
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
