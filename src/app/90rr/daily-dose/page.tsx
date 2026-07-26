import type { Metadata } from "next";
import DoseArticleLayout from "@/components/DoseArticleLayout";
import { dailyDose } from "@/lib/doseArticles";

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

export default function DailyDosePage() {
  return <DoseArticleLayout post={dailyDose} accent="#10b981" kicker="Featured · Resupply" iconName="brain" />;
}
