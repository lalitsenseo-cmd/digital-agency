export default function robots() {
  const isVercel = process.env.VERCEL_URL?.includes("vercel.app");

  return {
    rules: [
      {
        userAgent: "*",
        allow: isVercel ? [] : ["/"],
        disallow: isVercel ? ["/"] : ["/admin/"],
      },
    ],
    host: "https://www.clickbriz.com",
    sitemap: "https://www.clickbriz.com/sitemap.xml",
  };
}