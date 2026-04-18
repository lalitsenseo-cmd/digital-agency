import ServicePage from "@/components/ServicePage";
import type { Metadata } from "next";
import { getPageData, buildMetadata } from "@/lib/get-page-data";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("website-development");
  return buildMetadata(page, {
    title: "Website Development Services | NexGen Digital",
    description: "WordPress, Next.js and custom website development.",
  });
}

export default function WebDevPage() {
  return <ServicePage slug="website-development" color="#dc2626" bg="#fef2f2" />;
}