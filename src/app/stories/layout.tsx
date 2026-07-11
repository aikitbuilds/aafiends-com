import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Stories",
  description: "Real recovery stories from the AA Fiends community.",
  alternates: { canonical: "https://aafiends.com/stories" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
