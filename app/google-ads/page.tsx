import ServicePage from "@/components/ServicePage";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Google Ads & PPC Services | NexGen Digital",
  description: "Expert Google Ads, Meta Ads and PPC management. ROI-focused campaigns that bring real leads and sales.",
};
export default function GoogleAdsPage() {
  return <ServicePage slug="google-ads" color="#16a34a" bg="#f0fdf4" />;
}
