import LandingClient from "./LandingClient";
import SubstackLatest from "@/components/SubstackLatest";

export default function Page() {
  return <LandingClient substackLatest={<SubstackLatest />} />;
}
