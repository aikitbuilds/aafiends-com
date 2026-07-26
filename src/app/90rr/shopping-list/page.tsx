import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogContent from "@/components/BlogContent";
import { DoseHero } from "@/components/DoseFigures";
import { doseFuel, doseReset, dailyDose } from "@/lib/doseArticles";
import type { BlogPost, BlogSection } from "@/lib/blogData";

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
    <div className="min-h-screen bg-[#050505] font-sans text-neutral-100">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/90rr"
          className="mb-6 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#10b981] transition-colors hover:text-emerald-300"
        >
          <ChevronLeft size={14} /> Back to 90 R&amp;R
        </Link>
        <DoseHero
          kicker="90 R&R · Print & Go"
          title="The DOSE Shopping Lists"
          sub="Three runs: the grocery list that rebuilds all four chemicals, the supplement & superfood resupply ledger, and the parts to build a 40°F cold plunge."
          accent="#f59e0b"
          iconName="shopping-cart"
        />
        <div className="mt-10">
          <BlogContent post={listPost} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
