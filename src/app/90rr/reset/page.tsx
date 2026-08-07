import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogContent from "@/components/BlogContent";
import { doseReset } from "@/lib/doseArticles";
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
  title: `${doseReset.title} | AAfiends`,
  description: doseReset.excerpt,
  alternates: { canonical: "https://aafiends.com/90rr/reset" },
  openGraph: {
    title: doseReset.title,
    description: doseReset.excerpt,
    type: "article",
    url: "https://aafiends.com/90rr/reset",
  },
  twitter: { card: "summary_large_image", title: doseReset.title, description: doseReset.excerpt },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: doseReset.title,
  description: doseReset.excerpt,
  author: { "@type": "Person", name: "MT" },
  publisher: { "@type": "Organization", name: "AA Fiends", url: "https://aafiends.com" },
  datePublished: doseReset.date,
  mainEntityOfPage: `https://aafiends.com/90rr/${doseReset.slug}`,
};

export default function DoseResetPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <SiteHeader />

      <PageHero
        photo={PHOTOS.coldLake}
        height="short"
        title={
          <>
            The Reset: <em>how to regulate dopamine without a substance.</em>
          </>
        }
        lede={doseReset.excerpt}
        meta={`${doseReset.author} · ${doseReset.date} · ${doseReset.readTime}`}
      />

      <Section tight>
        <Wrap>
          <div className="mx-auto max-w-3xl">
            <BlogContent post={doseReset} />
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
