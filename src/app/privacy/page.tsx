import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy & Your Data — Plain Language",
  description:
    "What AA Fiends collects, where it lives, who can see it, and how to delete it — in plain language. Your recovery telemetry belongs to you: private vault storage, in-browser wearable parsing, no data sales.",
  alternates: { canonical: "https://aafiends.com/privacy" },
};

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "The short version",
    body: [
      "Your recovery data belongs to you. Check-ins, cravings, sleep, and anything you tell the Mirror are stored in a private vault tied to your account that only you can access through the app. We do not sell your data, we do not share it with advertisers, and you can use most of the site — the journal, the protocol, the science — without an account at all.",
    ],
  },
  {
    title: "What we collect, and when",
    body: [
      "Nothing, if you just read. The public pages — journal downloads, the framework, the blog, the book — require no account and no personal information.",
      "Your account basics, if you sign in. Login runs through Google via Firebase Authentication; we receive your email address and display name. Use a pseudonym display name if you prefer — we honor Traditions 11 and 12.",
      "Your check-ins, if you track. Daily telemetry (sleep, meetings, cravings, BIO 12 checks, journal entries, and conversations with the AI Mirror) is written to your own private vault in our database (Google Firebase/Firestore), keyed to your account.",
      "Your wearable files, if you upload them. Garmin .fit, Apple Health export.xml, and Google Fit CSV files are parsed in your own browser — the raw file is not uploaded to a server. Only the extracted daily numbers (sleep, heart rate, steps) are saved to your private vault, in the same format as a manual check-in.",
    ],
  },
  {
    title: "Who can see it",
    body: [
      "You. Vault data is readable only by your authenticated account, enforced by database security rules.",
      "The AI, when you ask it. When you use the Mirror (the AI check-in), the text or audio you submit is processed by an AI model (Google Gemini) to generate the reflection. That processing happens per-request; the Mirror exists to serve you, not to profile you.",
      "Not advertisers, not data brokers, not anyone else. We don't sell or rent your data. If a legal obligation ever required disclosure, we'd comply with the law — that's the only exception.",
    ],
  },
  {
    title: "Deleting your data",
    body: [
      "Email aafiends@gmail.com from your account email and ask. We'll delete your account and vault contents. This is a small operation run by people in recovery — deletion is handled by a human, promptly.",
    ],
  },
  {
    title: "Honesty about what this is",
    body: [
      "AA Fiends is a small, member-built beta — not a hospital system. We use Google Firebase's standard security (authentication, per-user security rules, encryption in transit) rather than custom infrastructure, and we label sample data as sample data. If the way we handle data ever changes materially, this page changes first.",
      "This page is a plain-language summary, not a legal contract. Questions or concerns: aafiends@gmail.com — a human reads it.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col font-sans relative overflow-hidden">
      <SiteHeader />

      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-20 flex flex-col gap-12 relative z-10">
        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#10b981]/10 flex items-center justify-center border border-[#10b981]/30 text-[#10b981]">
            <Lock size={32} />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-[#10b981] uppercase tracking-widest block mb-1">
              Data Over Denial — Including Ours
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
              Privacy &amp; Your Data
            </h1>
          </div>
        </div>

        <p className="text-lg text-neutral-300 leading-relaxed">
          A recovery app asks for the most private data there is. Here is exactly what happens to yours — in plain
          language, because that&apos;s the whole brand.
        </p>

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
          <Link href="/terms" className="text-[#10b981] hover:text-emerald-300 underline underline-offset-4">
            terms &amp; medical disclaimer
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
