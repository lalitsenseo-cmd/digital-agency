import ServicePage from "@/components/ServicePage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Social Media Marketing Services | NexGen Digital",
  description: "Professional social media marketing — Instagram, Facebook, LinkedIn management. Content creation and growth strategy.",
};
export default function SMMPage() {
  return <ServicePage slug="social-media-marketing" color="#7c3aed" bg="#f5f3ff" />;
}
