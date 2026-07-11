import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "12 Steps & 12 Traditions",
  description: "The 12 Steps and 12 Traditions of AA, adapted for the modern era of data over denial.",
  alternates: { canonical: "https://aafiends.com/12-and-12" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
