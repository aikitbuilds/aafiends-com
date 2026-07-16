import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book One: The Engine — The AIV Recovery Field Manual (Beta)",
  description:
    "Read the full beta of Book One: The Engine — the biology-first pillar of the AIV Recovery Field Manual. Free HTML and PDF, written from MT's own recovery, compiled with AI. Feedback welcome.",
  alternates: { canonical: "https://aafiends.com/book1" },
  openGraph: {
    title: "Book One: The Engine — The AIV Recovery Field Manual",
    description:
      "A practical survival guide for healing the hardware first — 12 chapters, free to read, beta feedback welcome.",
    url: "https://aafiends.com/book1",
    images: ["/book1/book1-cover.png"],
    type: "book",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
