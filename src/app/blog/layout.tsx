import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Science of Recovery",
  description: "The science of recovery in plain English: dopamine, sleep, cravings, and what the research says actually works in your first 90 days sober.",
  alternates: { canonical: "https://aafiends.com/blog" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
