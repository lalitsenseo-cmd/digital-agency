import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.clickbriz.com";

  const staticPages = [
    "", "/about", "/blog", "/contact",
    "/seo-services", "/local-seo", "/ecommerce-seo",
    "/technical-seo", "/amazon-seo",
    "/google-ads", "/meta-ads", "/youtube-ads", "/ecommerce-ppc",
    "/website-development", "/wordpress-development",
    "/ecommerce-development", "/python-development",
    "/social-media-marketing", "/instagram-marketing",
    "/content-writing", "/branding", "/seo-audit",
  ];

  const cityPages = [
    "/seo-services-in-faridabad",
    "/seo-services-in-noida",
    "/seo-services-in-delhi",
    "/seo-services-in-delhi-ncr",
    "/seo-services-in-gurgaon",
    "/seo-services-in-ballabgarh",
    "/seo-services-in-naharpar-faridabad",
    "/seo-services-in-ghaziabad",
  ];

  const allPages = [...staticPages, ...cityPages];

  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "daily" : "weekly",
    priority: page === "" ? 1.0 : page.includes("seo-services-in") ? 0.8 : 0.7,
  }));
}