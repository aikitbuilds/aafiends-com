import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CrisisSupport from "@/components/CrisisSupport";
import {
  Wrap,
  Section,
  SectionHead,
  EditorialList,
  CtaRow,
  ButtonPrimary,
} from "@/components/design";

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
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteHeader />

      {/* Opener. Crisis resources sit inside it, above the fold, because
          someone reading the FAQ at 2am may not be reading it calmly. */}
      <Section tight>
        <Wrap>
          <h1 className="font-display max-w-[16ch] text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.025em] text-[#f2efe6] [&_em]:font-display-italic [&_em]:text-[#e0a45c]">
            Questions, <em>answered.</em>
          </h1>
          <p className="mt-5 max-w-[68ch] text-[1.05rem] leading-relaxed text-[#b8b4a6]">
            What it costs, what happens to your data, whether this replaces AA or treatment, and how
            anonymity works. If your question isn&rsquo;t here, ask &mdash; a human in recovery reads
            every message.
          </p>
          <div className="mt-10 max-w-[74ch]">
            <CrisisSupport />
          </div>
        </Wrap>
      </Section>

      <Section band>
        <Wrap>
          <SectionHead>
            Straight answers, <em>in plain language.</em>
          </SectionHead>

          <EditorialList>
            {FAQS.map((f) => (
              <div
                key={f.q}
                className="grid gap-3 border-b border-[#1d231d] px-1 py-7 sm:grid-cols-[1fr_1.6fr] sm:gap-10"
              >
                <h3 className="font-display text-[1.3rem] leading-tight text-[#f2efe6]">{f.q}</h3>
                <div>
                  <p className="max-w-[70ch] text-[15.5px] leading-relaxed text-[#b8b4a6]">{f.a}</p>
                  {f.link && (
                    <Link
                      href={f.link.href}
                      className="font-measure mt-3.5 inline-block text-[13px] text-[#4cc07a] no-underline transition-colors hover:text-[#5fd08c]"
                    >
                      {f.link.label} &rarr;
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </EditorialList>
        </Wrap>
      </Section>

      <Section tight>
        <Wrap>
          <SectionHead lede={<p>Ask directly — a human in recovery reads every message.</p>}>
            Something else <em>on your mind?</em>
          </SectionHead>
          <CtaRow>
            <ButtonPrimary href="/contact">Contact us</ButtonPrimary>
          </CtaRow>
        </Wrap>
      </Section>

      <SiteFooter />
    </div>
  );
}
