import ServicePage from "@/components/ServicePage";
import type { Metadata } from "next";
import { getPageData, buildMetadata } from "@/lib/get-page-data";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("google-ads");
  return buildMetadata(page, {
    title: "Google Ads & PPC Services | NexGen Digital",
    description: "Expert Google Ads, Meta Ads and PPC management.",
  });
}

export default function GoogleAdsPage() {
  return <ServicePage slug="google-ads" color="#16a34a" bg="#f0fdf4" />;
}