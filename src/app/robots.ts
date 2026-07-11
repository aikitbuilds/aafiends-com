import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/profile", "/onboarding"],
    },
    sitemap: "https://aafiends.com/sitemap.xml",
  };
}
