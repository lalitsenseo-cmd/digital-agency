import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Sirf PRODUCTION (aapka main domain www.clickbriz.com) pe Google index kare.
  // Vercel ke preview/test deployments (*.vercel.app) poori tarah block.
  const isProduction = process.env.VERCEL_ENV === "production";

  if (!isProduction) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }], // sab block (preview/dev)
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/keystatic"], // private paths
      },
    ],
    host: "https://www.clickbriz.com",
    sitemap: "https://www.clickbriz.com/sitemap.xml",
  };
}
