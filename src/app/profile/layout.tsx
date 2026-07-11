import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your AA Fiends profile and settings.",
  alternates: { canonical: "https://aafiends.com/profile" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
