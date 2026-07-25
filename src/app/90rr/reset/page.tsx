import type { Metadata } from "next";
import DoseArticleLayout from "@/components/DoseArticleLayout";
import { doseReset } from "@/lib/doseArticles";

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

export default function DoseResetPage() {
  return <DoseArticleLayout post={doseReset} accent="#00f0ff" kicker="DOSE Field Guide · The Reset" iconName="snowflake" />;
}
