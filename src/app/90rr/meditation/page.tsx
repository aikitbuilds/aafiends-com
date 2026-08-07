import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogContent from "@/components/BlogContent";
import { doseMirror } from "@/lib/doseArticles";
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
  title: `${doseMirror.title} | AAfiends`,
  description: doseMirror.excerpt,
  alternates: { canonical: "https://aafiends.com/90rr/meditation" },
  openGraph: {
    title: doseMirror.title,
    description: doseMirror.excerpt,
    type: "article",
    url: "https://aafiends.com/90rr/meditation",
  },
  twitter: { card: "summary_large_image", title: doseMirror.title, description: doseMirror.excerpt },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: doseMirror.title,
  description: doseMirror.excerpt,
  author: { "@type": "Person", name: "MT" },
  publisher: { "@type": "Organization", name: "AA Fiends", url: "https://aafiends.com" },
  datePublished: doseMirror.date,
  mainEntityOfPage: `https://aafiends.com/90rr/${doseMirror.slug}`,
};

export default function DoseMirrorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <SiteHeader />

      <PageHero
        photo={PHOTOS.windowStillness}
        height="short"
        title={
          <>
            The Mirror — Vipassana. <em>Learning to sit with the craving instead of obeying it.</em>
          </>
        }
        lede={doseMirror.excerpt}
        meta={`${doseMirror.author} · ${doseMirror.date} · ${doseMirror.readTime}`}
      />

      <Section tight>
        <Wrap>
          <div className="mx-auto max-w-3xl">
            <BlogContent post={doseMirror} />
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
