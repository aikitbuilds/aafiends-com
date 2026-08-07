import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Wrap, Section, SectionHead, Prose, CalloutBand } from "@/components/design";

export const metadata: Metadata = {
  title: "Terms of Use & Medical Disclaimer",
  description:
    "The terms of using AA Fiends in plain language: peer support, not medical care; not affiliated with AA World Services; crisis resources; and what the Fellowship deposit does and doesn't buy.",
  alternates: { canonical: "https://aafiends.com/terms" },
};

/**
 * `title` carries the heading with one amber italic phrase; `body` is the
 * legal text and is reproduced verbatim — restyle it, never rewrite it.
 * `urgent` marks the clause that has to be noticed, not just read.
 */
const SECTIONS: { id: string; title: ReactNode; body: string[]; urgent?: boolean }[] = [
  {
    id: "what-this-is",
    title: (
      <>
        What AA Fiends is — <em>and isn&rsquo;t.</em>
      </>
    ),
    body: [
      "AA Fiends is peer support and self-tracking, built by people in recovery for people in recovery. It is not medical advice, not therapy, not professional addiction treatment, and not a substitute for any of them. Nothing on this site — the journal, the protocol, the Mirror, the book, the blog — is a diagnosis or a prescription.",
      "AA Fiends is not affiliated with or endorsed by Alcoholics Anonymous World Services, Inc. We honor the Traditions; we don't speak for AA.",
    ],
  },
  {
    id: "medical-disclaimer",
    title: (
      <>
        Medical disclaimer — <em>read this one.</em>
      </>
    ),
    urgent: true,
    body: [
      "Withdrawal from alcohol, benzodiazepines, and some other substances can be medically dangerous and, in some cases, fatal. Talk to a doctor before you stop cold. The BIO 12 protocol and the 90 R&R program are habit scaffolding for early recovery — they assume you have medical clearance to be doing them.",
      "If you are in crisis right now: call or text 988 (Suicide & Crisis Lifeline), text HOME to 741741 (Crisis Text Line), or call SAMHSA's free 24/7 helpline at 1-800-662-4357. If it's an emergency, call 911.",
    ],
  },
  {
    id: "account-and-conduct",
    title: (
      <>
        Your account and <em>your conduct.</em>
      </>
    ),
    body: [
      "Use a pseudonym if you like — anonymity is honored here. Don't use the platform to harass anyone, impersonate anyone, or post anything illegal. We can suspend accounts that abuse the community; this is a recovery space first.",
      "You own your recovery data. We store it for you, not from you — see the privacy page for exactly how that works and how to delete it.",
    ],
  },
  {
    id: "fellowship-deposit",
    title: (
      <>
        The <em>Fellowship deposit.</em>
      </>
    ),
    body: [
      "A 90 R&R Fellowship seat is reserved with a $20 deposit or a pay-what-you-can contribution. The deposit reserves your seat and is applied to your cohort; it is not payment for professional treatment, and the Fellowship is self-supporting through our own contributions (Tradition 7).",
    ],
  },
  {
    id: "beta-software",
    title: (
      <>
        Beta software, <em>honest limits.</em>
      </>
    ),
    body: [
      "AA Fiends is beta software provided as-is. We work hard to keep it accurate and available, but we make no warranties — data displays can have bugs, streaks can miscount, and the AI Mirror can be wrong. Verify anything that matters with a human you trust.",
      "These terms are written in plain language on purpose and may be updated as the platform grows; material changes will show up on this page. Questions: aafiends@gmail.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <SiteHeader />

      <Section tight>
        <Wrap>
          <h1 className="font-display max-w-[16ch] text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.025em] text-[#f2efe6] [&_em]:font-display-italic [&_em]:text-[#e0a45c]">
            Terms &amp; <em>medical disclaimer.</em>
          </h1>
          <p className="mt-5 max-w-[68ch] text-[1.05rem] leading-relaxed text-[#b8b4a6]">
            The fine print, written the way the rest of the site is written: plain language, no
            hedging, and the one clause that can actually hurt you called out where you can&apos;t
            miss it.
          </p>
        </Wrap>
      </Section>

      {SECTIONS.map((s, i) => (
        <Section key={s.id} id={s.id} band={i % 2 === 0} tight>
          <Wrap>
            <SectionHead>{s.title}</SectionHead>
            {s.urgent ? (
              <CalloutBand tone="urgent" className="mt-8 max-w-[74ch]">
                <Prose>
                  {s.body.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </Prose>
              </CalloutBand>
            ) : (
              <Prose className="mt-8">
                {s.body.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </Prose>
            )}
          </Wrap>
        </Section>
      ))}

      <Section tight>
        <Wrap>
          <p className="text-[15px] text-[#7d7a70]">
            See also:{" "}
            <Link
              href="/privacy"
              className="text-[#b8b4a6] underline decoration-[#1d231d] underline-offset-4 transition-colors hover:text-[#f2efe6] hover:decoration-[#4cc07a]"
            >
              privacy &amp; your data
            </Link>{" "}
            ·{" "}
            <Link
              href="/faq"
              className="text-[#b8b4a6] underline decoration-[#1d231d] underline-offset-4 transition-colors hover:text-[#f2efe6] hover:decoration-[#4cc07a]"
            >
              FAQ
            </Link>
          </p>
        </Wrap>
      </Section>

      <SiteFooter />
    </div>
  );
}
