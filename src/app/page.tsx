import LandingClient from "./LandingClient";
import SubstackLatest from "@/components/SubstackLatest";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "AA Fiends | 90-Day Recovery Journal, Dashboard & AI Coach",
  },
  description:
    "A biology-first 90-day recovery system for any addiction: a free printable journal, the BIO 12 daily protocol, and a dashboard that proves your baseline is healing. Data over denial.",
  alternates: { canonical: "https://aafiends.com" },
};

export default function Page() {
  return <LandingClient substackLatest={<SubstackLatest />} />;
}
