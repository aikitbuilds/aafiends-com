import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aafiends.com"),
  title: {
    template: "%s · AA Fiends",
    default: "AA Fiends | Recovery Dashboard & AI Coach for Any Addiction",
  },
  description: "AA Fiends is a recovery dashboard and AI coach built by people in recovery — for any addiction, not just alcohol. Track sleep, meetings, cravings, and the BIO 12 daily protocol to prove your baseline is healing. Data over denial.",
  keywords: ["AA recovery app", "sobriety tracker", "addiction recovery dashboard", "AI recovery coach", "12 step tracker", "alcoholics anonymous app", "opioid recovery app", "quit nicotine tracker", "gambling addiction recovery", "porn addiction recovery", "recovery habit tracker", "BIO 12 protocol", "addiction intelligence virus"],
  openGraph: {
    title: "AA Fiends | Recovery Dashboard & AI Coach for Sobriety",
    description: "Track sleep, meetings, and cravings to prove your baseline is healing. Built by AA members, for AA members.",
    url: "https://aafiends.com",
    siteName: "AA Fiends",
    images: ["/og-image.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@aafiends",
    title: "AA Fiends | Recovery Dashboard & AI Coach for Sobriety",
    description: "Track sleep, meetings, and cravings to prove your baseline is healing.",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AAfiends",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

import { AuthProvider } from "@/contexts/AuthContext";
import { VocabularyProvider } from "@/contexts/VocabularyContext";
import VanguardTest from "@/components/VanguardTest";
import GarminSimulator from "@/components/GarminSimulator";
import PWARegister from "@/components/PWARegister";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#050505]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              { 
                "@type": "Organization", 
                "name": "AA Fiends", 
                "url": "https://aafiends.com", 
                "logo": "https://aafiends.com/logo.png",
                "email": "aafiends@gmail.com",
                "description": "Recovery dashboard and AI coach for any addiction — built by people in recovery.",
                "sameAs": [
                  "https://aivirus.org",
                  "https://aafiends.substack.com",
                  "https://www.youtube.com/@aafiends",
                  "https://racefiends.com"
                ] 
              },
              { "@type": "WebSite", "name": "AA Fiends", "url": "https://aafiends.com" },
            ],
          }) }}
        />
        <VocabularyProvider>
          <AuthProvider>
            {children}
            <VanguardTest />
            <GarminSimulator />
            <PWARegister />
          </AuthProvider>
        </VocabularyProvider>
      </body>
    </html>
  );
}
