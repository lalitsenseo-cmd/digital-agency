import ServicePage from "@/components/ServicePage";
import type { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Website Design & Development | NexGen Digital",
  description: "Professional website design and development — WordPress, Next.js, landing pages, e-commerce. Fast, mobile-friendly websites.",
};
export default function WebDevPage() {
  return <ServicePage slug="website-development" color="#dc2626" bg="#fef2f2" />;
}
