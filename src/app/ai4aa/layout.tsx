import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ai4aa Foundation Course",
  description: "A 6-week tech crash course exclusively for the recovery community. Zero technical background required.",
  alternates: { canonical: "https://aafiends.com/ai4aa" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
