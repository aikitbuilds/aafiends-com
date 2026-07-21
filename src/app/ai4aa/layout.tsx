import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ai4aa Foundation Course — Vocational AI Training for People in Recovery",
  description: "Purpose is relapse protection. A 6-week AI crash course built for the recovery community — new skills, on-camera confidence, and a reason to get up. Zero technical background required.",
  alternates: { canonical: "https://aafiends.com/ai4aa" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
