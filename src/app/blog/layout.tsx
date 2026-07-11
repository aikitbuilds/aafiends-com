import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Science of Recovery",
  description: "The research behind the AA Fiends app, in plain English.",
  alternates: { canonical: "https://aafiends.com/blog" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
