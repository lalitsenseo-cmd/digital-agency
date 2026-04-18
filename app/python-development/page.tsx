import ServicePage from "@/components/ServicePage";
import type { Metadata } from "next";
import { getPageData, buildMetadata } from "@/lib/get-page-data";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("python-development");
  return buildMetadata(page, {
    title: "Python Development Services | NexGen Digital",
    description: "Custom Python automation, dashboards, web scrapers and APIs.",
  });
}

export default function PythonDevPage() {
  return <ServicePage slug="python-development" color="#d97706" bg="#fffbeb" />;
}