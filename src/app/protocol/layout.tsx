import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The BIO 12 Protocol",
  description: "The 12 biological imperatives to protect your baseline.",
  alternates: { canonical: "https://aafiends.com/protocol" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
