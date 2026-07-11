import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Dashboard",
  description: "Your AA Fiends member dashboard.",
  alternates: { canonical: "https://aafiends.com/dashboard" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
