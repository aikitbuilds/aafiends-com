import LandingClient from "./LandingClient";
import SubstackLatest from "@/components/SubstackLatest";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  alternates: { canonical: "https://aafiends.com" }
};

export default function Page() {
  return <LandingClient substackLatest={<SubstackLatest />} />;
}
