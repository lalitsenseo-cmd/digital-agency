import { MetadataRoute } from "next";
import { getServicePageSlugs, getServicePage } from "@/lib/service-pages";
import { getAllPosts } from "@/lib/posts";

// Dynamic sitemap — naya service page ya blog post Keystatic me add karte hi
// yahan apne aap aa jaayega. Manually kuch edit karne ki zaroort nahi.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.clickbriz.com";

  // Coded / static pages (Keystatic me nahi hain)
  const staticPages = [
    "", "/about", "/contact", "/services", "/blog",
    "/seo-services", // main SEO hub (coded)
    "/seo-audit",    // tool (coded)
    "/sitemap",      // HTML sitemap page
    "/write-for-us", // guest post page
  ];

  // Service + city pages — Keystatic se, sirf published
  const serviceSlugs = await getServicePageSlugs();
  const servicePages: string[] = [];
  for (const slug of serviceSlugs) {
    const page = await getServicePage(slug);
    if (page && page.published) servicePages.push(`/${slug}`);
  }

  // Blog posts — Keystatic se (getAllPosts sirf published deta hai)
  const posts = await getAllPosts();
  const blogPages = posts.map((p) => `/blog/${p.slug}`);

  const allPages = [...staticPages, ...servicePages, ...blogPages];

  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "daily" : "weekly",
    priority:
      page === "" ? 1.0 :
      page.includes("seo-services-in") ? 0.8 :
      page.startsWith("/blog/") ? 0.6 :
      0.7,
  }));
}
