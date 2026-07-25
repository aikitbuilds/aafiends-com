import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogData";
import { DOSE_ARTICLES } from "@/lib/doseArticles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aafiends.com";
  const now = new Date();

  const postEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // The DOSE field guides were missing entirely — they're long-form cited
  // content living under /90rr/<slug>, and among the best SEO assets here.
  const doseEntries: MetadataRoute.Sitemap = DOSE_ARTICLES.map((a) => ({
    url: `${base}/90rr/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...postEntries,
    ...doseEntries,
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/90rr`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/90-r-and-r`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/the-science`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/protocol`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/framework`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/90rr/shopping-list`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/90rr/builder`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/prep90`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/glossary`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/data`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/aivy`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/watch`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/book1`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/ai4aa`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    // Current journal PDFs (Beta 1). The previous entries here still pointed at
    // retired Alpha "v3" filenames, which 404'd for crawlers.
    { url: `${base}/90rr/90rr-month1-reset-journal-beta1.pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/90rr/90rr-month1-reset-journal-beta1-booklet.pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/90rr/90rr-7day-starter-beta1.pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/90rr/90rr-7day-starter-beta1-booklet.pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/90rr/90rr-refill-pages-beta1.pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/90rr/90rr-refill-pages-beta1-booklet.pdf`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];
}
