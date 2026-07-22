import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogData";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aafiends.com";
  const now = new Date();

  const postEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...postEntries,
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/data`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/framework`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/aivy`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/ai4aa`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/90-r-and-r`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/90rr`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/90rr/builder`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/prep90`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/protocol`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/book1`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/90rr/90RR-Journal-Month1-Alpha1-BOOKLET-v3.pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/90rr/90RR-Journal-Month1-Alpha1-v3.pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/90rr/90RR-Starter-7Day-Alpha1-BOOKLET-v3.pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/90rr/90RR-Starter-7Day-Alpha1-v3.pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];
}
