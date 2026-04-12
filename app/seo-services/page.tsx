import ServicePage from "@/components/ServicePage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "SEO Services in India | NexGen Digital",
  description: "Professional SEO services — on-page, off-page, technical SEO, local SEO. Rank higher on Google and get more organic traffic.",
};
export default function SEOPage() {
  return <ServicePage slug="seo-services" color="#2563eb" bg="#eff6ff" />;
}
