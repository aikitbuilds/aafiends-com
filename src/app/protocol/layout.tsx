import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The BIO 12 Protocol — 12 Daily Biological Imperatives for Recovery",
  description: "The 12 biological imperatives that protect your baseline in early sobriety: movement, sleep, nutrition, and breath — four pillars, three daily actions each, with the science behind every check.",
  alternates: { canonical: "https://aafiends.com/protocol" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
