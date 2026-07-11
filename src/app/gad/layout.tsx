import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grand Architect Divine (G.A.D.)",
  description: "The spiritual framing of AA Fiends.",
  alternates: { canonical: "https://aafiends.com/gad" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
