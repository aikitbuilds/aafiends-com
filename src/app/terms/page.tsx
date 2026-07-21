import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ScrollText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use & Medical Disclaimer",
  description:
    "The terms of using AA Fiends in plain language: peer support, not medical care; not affiliated with AA World Services; crisis resources; and what the Fellowship deposit does and doesn't buy.",
  alternates: { canonical: "https://aafiends.com/terms" },
};

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "What AA Fiends is — and isn't",
    body: [
      "AA Fiends is peer support and self-tracking, built by people in recovery for people in recovery. It is not medical advice, not therapy, not professional addiction treatment, and not a substitute for any of them. Nothing on this site — the journal, the protocol, the Mirror, the book, the blog — is a diagnosis or a prescription.",
      "AA Fiends is not affiliated with or endorsed by Alcoholics Anonymous World Services, Inc. We honor the Traditions; we don't speak for AA.",
    ],
  },
  {
    title: "Medical disclaimer — read this one",
    body: [
      "Withdrawal from alcohol, benzodiazepines, and some other substances can be medically dangerous and, in some cases, fatal. Talk to a doctor before you stop cold. The BIO 12 protocol and the 90 R&R program are habit scaffolding for early recovery — they assume you have medical clearance to be doing them.",
      "If you are in crisis right now: call or text 988 (Suicide & Crisis Lifeline), text HOME to 741741 (Crisis Text Line), or call SAMHSA's free 24/7 helpline at 1-800-662-4357. If it's an emergency, call 911.",
    ],
  },
  {
    title: "Your account and your conduct",
    body: [
      "Use a pseudonym if you like — anonymity is honored here. Don't use the platform to harass anyone, impersonate anyone, or post anything illegal. We can suspend accounts that abuse the community; this is a recovery space first.",
      "You own your recovery data. We store it for you, not from you — see the privacy page for exactly how that works and how to delete it.",
    ],
  },
  {
    title: "The Fellowship deposit",
    body: [
      "A 90 R&R Fellowship seat is reserved with a $20 deposit or a pay-what-you-can contribution. The deposit reserves your seat and is applied to your cohort; it is not payment for professional treatment, and the Fellowship is self-supporting through our own contributions (Tradition 7).",
    ],
  },
  {
    title: "Beta software, honest limits",
    body: [
      "AA Fiends is beta software provided as-is. We work hard to keep it accurate and available, but we make no warranties — data displays can have bugs, streaks can miscount, and the AI Mirror can be wrong. Verify anything that matters with a human you trust.",
      "These terms are written in plain language on purpose and may be updated as the platform grows; material changes will show up on this page. Questions: aafiends@gmail.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden">
      <SiteHeader />

      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-20 flex flex-col gap-12 relative z-10">
        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#f59e0b]/10 flex items-center justify-center border border-[#f59e0b]/30 text-[#f59e0b]">
            <ScrollText size={32} />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-[#f59e0b] uppercase tracking-widest block mb-1">
              The Fine Print, Unfine
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
              Terms &amp; Medical Disclaimer
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {SECTIONS.map((s) => (
            <section key={s.title} className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 flex flex-col gap-4">
              <h2 className="text-xl font-black text-white uppercase tracking-tight">{s.title}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 40)} className="text-neutral-400 leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <p className="text-sm text-neutral-500 leading-relaxed">
          See also:{" "}
          <Link href="/privacy" className="text-[#10b981] hover:text-emerald-300 underline underline-offset-4">
            privacy &amp; your data
          </Link>{" "}
          ·{" "}
          <Link href="/faq" className="text-[#10b981] hover:text-emerald-300 underline underline-offset-4">
            FAQ
          </Link>
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
