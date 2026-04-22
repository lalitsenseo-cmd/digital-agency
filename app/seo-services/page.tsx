import ServicePage from "@/components/ServicePage";
import type { Metadata } from "next";
import { getPageData, buildMetadata } from "@/lib/get-page-data";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("seo-services");
  return buildMetadata(page, {
    title: "SEO Services in India | Clickbriz Digital",
    description: "Professional SEO services — on-page, off-page, technical SEO.",
  });
}

export default async function SEOPage() {
  const page = await getPageData("seo-services");
  return (
    <ServicePage 
      slug="seo-services" 
      color="#2563eb" 
      bg="#eff6ff" 
      cmsContent={page?.content}
    />
  );
}