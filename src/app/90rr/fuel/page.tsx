import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogContent from "@/components/BlogContent";
import { doseFuel } from "@/lib/doseArticles";
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
  title: `${doseFuel.title} | AAfiends`,
  description: doseFuel.excerpt,
  alternates: { canonical: "https://aafiends.com/90rr/fuel" },
  openGraph: {
    title: doseFuel.title,
    description: doseFuel.excerpt,
    type: "article",
    url: "https://aafiends.com/90rr/fuel",
  },
  twitter: { card: "summary_large_image", title: doseFuel.title, description: doseFuel.excerpt },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: doseFuel.title,
  description: doseFuel.excerpt,
  author: { "@type": "Person", name: "MT" },
  publisher: { "@type": "Organization", name: "AA Fiends", url: "https://aafiends.com" },
  datePublished: doseFuel.date,
  mainEntityOfPage: `https://aafiends.com/90rr/${doseFuel.slug}`,
};

export default function DoseFuelPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <SiteHeader />

      <PageHero
        photo={PHOTOS.kitchenFuel}
        height="short"
        title={
          <>
            The DOSE kitchen: <em>food &amp; drink that rebuilds all four chemicals.</em>
          </>
        }
        lede={doseFuel.excerpt}
        meta={`${doseFuel.author} · ${doseFuel.date} · ${doseFuel.readTime}`}
      />

      <Section tight>
        <Wrap>
          <div className="mx-auto max-w-3xl">
            <BlogContent post={doseFuel} />
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
