import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aafiendscom.web.app";
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/data`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/gad`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/12-and-12`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/stories`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/ai4aa`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
