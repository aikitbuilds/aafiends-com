import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogContent from "@/components/BlogContent";
import { doseFuel, doseReset, dailyDose } from "@/lib/doseArticles";
import type { BlogPost, BlogSection } from "@/lib/blogData";
import { PHOTOS } from "@/lib/photos";
import {
  Wrap,
  Section,
  SectionHead,
  PageHero,
  CtaRow,
  ButtonPrimary,
  ButtonQuiet,
} from "@/components/design";

export const metadata: Metadata = {
  title: "The DOSE Shopping Lists — Grocery, Supplements + Cold Plunge Build | AAfiends",
  description:
    "Print-ready shopping lists from all three 90 R&R DOSE field guides: the grocery run that rebuilds dopamine, oxytocin, serotonin and endorphins, the supplement & superfood resupply ledger, and the parts list to build a 40°F cold plunge from a chest freezer.",
  alternates: { canonical: "https://aafiends.com/90rr/shopping-list" },
};

// Pull the shopping-list sections straight out of the three articles so the
// lists never drift out of sync with the guides they came from.
const fuelLists = doseFuel.sections.filter(
  (s): s is Extract<BlogSection, { type: "shoppinglist" }> => s.type === "shoppinglist"
);
const resetLists = doseReset.sections.filter(
  (s): s is Extract<BlogSection, { type: "shoppinglist" }> => s.type === "shoppinglist"
);
const dailyDoseLists = dailyDose.sections.filter(
  (s): s is Extract<BlogSection, { type: "shoppinglist" }> => s.type === "shoppinglist"
);

const intro: BlogSection = {
  type: "markdown",
  content: `
Everything from all three DOSE field guides, stripped down to what you actually buy. Screenshot it, print it, take it with you. Each item links back to the guide that explains *why* it's on the list.
  `,
};

const listPost: BlogPost = {
  ...doseFuel,
  slug: "shopping-list",
  title: "The DOSE Shopping Lists",
  sources: [],
  sections: [
    intro,
    {
      type: "markdown",
      content: `## The Kitchen — from [The DOSE Kitchen](/90rr/fuel)`,
    },
    ...fuelLists,
    {
      type: "markdown",
      content: `## The Cold Plunge & The Free Menu — from [The Reset](/90rr/reset)`,
    },
    ...resetLists,
    {
      type: "markdown",
      content: `## The Resupply — from [The Daily Dose](/90rr/daily-dose)`,
    },
    ...dailyDoseLists,
  ],
};

export default function ShoppingListPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d0f0d] text-[#f2efe6]">
      <SiteHeader />

      <PageHero
        photo={PHOTOS.kitchenFuel}
        height="short"
        title={
          <>
            The DOSE <em>shopping lists.</em>
          </>
        }
        lede="Three runs: the grocery list that rebuilds all four chemicals, the supplement & superfood resupply ledger, and the parts to build a 40°F cold plunge."
      />

      <Section tight>
        <Wrap>
          <div className="mx-auto max-w-3xl">
            <BlogContent post={listPost} />
          </div>
        </Wrap>
      </Section>

      <Section band tight>
        <Wrap>
          <SectionHead
            lede={
              <p>
                Print the list, do the run, then log it. The 90 R&amp;R journal turns the shopping
                into a ten-second daily check.
              </p>
            }
          >
            You bought it. <em>Now use it.</em>
          </SectionHead>
          <CtaRow>
            <ButtonPrimary href="/90rr">Get the journal</ButtonPrimary>
            <ButtonQuiet href="/90rr">Back to 90 R&amp;R</ButtonQuiet>
          </CtaRow>
        </Wrap>
      </Section>

      <SiteFooter />
    </div>
  );
}
