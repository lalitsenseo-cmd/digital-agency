import ServicePage from "@/components/ServicePage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Python Development Services | NexGen Digital",
  description: "Custom Python development — automation scripts, data dashboards, web scraping, APIs. Save time and scale your business.",
};
export default function PythonPage() {
  return <ServicePage slug="python-development" color="#d97706" bg="#fffbeb" />;
}
