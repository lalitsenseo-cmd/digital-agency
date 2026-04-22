import ServicePage from "@/components/ServicePage";
import type { Metadata } from "next";
import { getPageData, buildMetadata } from "@/lib/get-page-data";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("social-media-marketing");
  return buildMetadata(page, {
    title: "Social Media Marketing | Clickbriz Digital",
    description: "Instagram, Facebook, LinkedIn marketing that builds real brand presence.",
  });
}

export default function SocialMediaPage() {
  return <ServicePage slug="social-media-marketing" color="#7c3aed" bg="#f5f3ff" />;
}