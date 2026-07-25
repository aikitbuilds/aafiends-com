import type { Metadata } from "next";
import { Brain } from "lucide-react";
import DoseArticleLayout from "@/components/DoseArticleLayout";
import { doseMirror } from "@/lib/doseArticles";

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

export default function DoseMirrorPage() {
  return <DoseArticleLayout post={doseMirror} accent="#00f0ff" kicker="DOSE Field Guide · The Mirror" iconName="brain" />;
}
