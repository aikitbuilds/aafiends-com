import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Dashboard",
  description: "Your telemetry dashboard. Track sleep, meetings, and cravings.",
  alternates: { canonical: "https://aafiends.com/data" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
