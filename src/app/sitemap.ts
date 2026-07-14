import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aafiends.com";
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/data`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/gad`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/12-and-12`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/ai4aa`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/90-r-and-r`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/90rr`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/90rr/builder`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/prep90`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/protocol`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/90rr/90RR-Journal-Month1-Alpha1-BOOKLET-v3.pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/90rr/90RR-Journal-Month1-Alpha1-v3.pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/90rr/90RR-Starter-7Day-Alpha1-BOOKLET-v3.pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/90rr/90RR-Starter-7Day-Alpha1-v3.pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];
}
