import type { Metadata } from "next";
import JournalBuilder from "@/components/JournalBuilder";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { PHOTOS } from "@/lib/photos";
import { PageHero } from "@/components/design";

export const metadata: Metadata = {
  title: "Build Your Own 90 R&R Journal — Customizable Printable Workbook",
  description:
    "Customize your own printable recovery journal: toggle the fields you want, pick full-page or fold-and-staple half-page, and print or save as PDF. Free from AAfiends.",
  alternates: { canonical: "https://aafiends.com/90rr/builder" },
  openGraph: {
    title: "Build Your Own 90 R&R Journal",
    description: "Toggle fields, pick full or half-page, print or save as PDF.",
    url: "https://aafiends.com/90rr/builder",
    siteName: "AAfiends",
    type: "website",
  },
};

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-[#0d0f0d] text-[#f2efe6]">
      <div className="no-print">
        <SiteHeader />
        <PageHero
          photo={PHOTOS.writingHands}
          height="short"
          title={
            <>
              Build your <em>own journal.</em>
            </>
          }
          lede="Keep the rows that fit your recovery, drop the ones that don’t, add your own, then print full-page or as a fold-and-staple half-page mini-book. Nothing to install — your layout saves on this device."
        />
      </div>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8">
        <JournalBuilder />
      </main>

      <div className="no-print">
        <SiteFooter />
      </div>
    </div>
  );
}
