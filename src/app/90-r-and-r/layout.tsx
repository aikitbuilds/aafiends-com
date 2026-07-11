import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "90 Days Recovery & Restructure",
  description: "A biology-first cohort for the first 90 days. Daily telemetry that proves your baseline is healing.",
  alternates: { canonical: "https://aafiends.com/90-r-and-r" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
