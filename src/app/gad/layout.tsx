import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grand Architect Divine (G.A.D.)",
  description: "Struggling with the Higher Power part of AA? G.A.D. (Grand Architect Divine) is a practical, non-religious way to work Steps 3 and 11 — built for skeptics in early recovery.",
  alternates: { canonical: "https://aafiends.com/gad" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
