import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogContent from "@/components/BlogContent";
import { dailyDose } from "@/lib/doseArticles";
import { PHOTOS } from "@/lib/photos";
import {
  Wrap,
  Section,
  SectionHead,
  PageHero,
  CtaRow,
  ButtonPrimary,
  ButtonGhost,
  ButtonQuiet,
} from "@/components/design";

export const metadata: Metadata = {
  title: "The Daily Dose — Supplements & Superfoods That Rebuild D.O.S.E. | AAfiends",
  description:
    "What I actually take to rebuild dopamine, oxytocin, serotonin and endorphins after a 30-year run — the full ledger, what each item does, when I take it, what the evidence really says, and what it costs per day.",
  alternates: { canonical: "https://aafiends.com/90rr/daily-dose" },
  openGraph: {
    title: "The Daily Dose — Supplements & Superfoods That Rebuild D.O.S.E.",
    description:
      "What I actually take to rebuild dopamine, oxytocin, serotonin and endorphins after a 30-year run — the full ledger, what each item does, when I take it, what the evidence really says, and what it costs per day.",
    type: "article",
    url: "https://aafiends.com/90rr/daily-dose",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Daily Dose — Supplements & Superfoods That Rebuild D.O.S.E.",
    description:
      "What I actually take to rebuild dopamine, oxytocin, serotonin and endorphins after a 30-year run — the full ledger, what each item does, when I take it, what the evidence really says, and what it costs per day.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: dailyDose.title,
  description: dailyDose.excerpt,
  author: { "@type": "Person", name: "MT" },
  publisher: { "@type": "Organization", name: "AA Fiends", url: "https://aafiends.com" },
  datePublished: dailyDose.date,
  mainEntityOfPage: `https://aafiends.com/90rr/${dailyDose.slug}`,
};

export default function DailyDosePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <SiteHeader />

      <PageHero
        photo={PHOTOS.gymLift}
        height="short"
        title={
          <>
            The Daily Dose — <em>supplements &amp; superfoods that rebuild D.O.S.E.</em>
          </>
        }
        lede={dailyDose.excerpt}
        meta={`${dailyDose.author} · ${dailyDose.date} · ${dailyDose.readTime}`}
      />

      <Section tight>
        <Wrap>
          <div className="mx-auto max-w-3xl">
            <BlogContent post={dailyDose} />
          </div>
        </Wrap>
      </Section>

      <Section band tight>
        <Wrap>
          <SectionHead
            lede={
              <p>
                The 90 R&amp;R journal turns everything in this guide into a ten-second daily check
                across the three pillars.
              </p>
            }
          >
            Track it daily. <em>That is where it sticks.</em>
          </SectionHead>
          <CtaRow>
            <ButtonPrimary href="/90rr">Get the journal</ButtonPrimary>
            <ButtonGhost href="/90rr/shopping-list">Shopping lists</ButtonGhost>
            <ButtonQuiet href="/90rr">Back to 90 R&amp;R</ButtonQuiet>
          </CtaRow>
        </Wrap>
      </Section>

      <SiteFooter />
    </div>
  );
}
