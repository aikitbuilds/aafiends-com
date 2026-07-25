import type { Metadata } from "next";
import DoseArticleLayout from "@/components/DoseArticleLayout";
import { doseFuel } from "@/lib/doseArticles";

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

export default function DoseFuelPage() {
  return <DoseArticleLayout post={doseFuel} accent="#10b981" kicker="DOSE Field Guide · The Engine" iconName="wine" />;
}
