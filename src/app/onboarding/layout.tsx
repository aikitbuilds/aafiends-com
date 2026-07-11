import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Join AA Fiends and start tracking your baseline.",
  alternates: { canonical: "https://aafiends.com/onboarding" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
