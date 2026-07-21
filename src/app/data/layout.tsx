import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Dashboard",
  description: "See how sleep, HRV, and meeting attendance prove your recovery baseline is healing — sync Garmin, Apple Health, or Google Fit data free.",
  alternates: { canonical: "https://aafiends.com/data" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
