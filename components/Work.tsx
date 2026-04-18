import { getSection } from "@/lib/get-section";
import WorkClient from "./WorkClient";

export default async function Work() {
  const d = await getSection("home-work");

  const label = d?.label || "Our Work";
  const heading = d?.heading || "Results That Speak";
  const subheading = d?.subheading || "Real projects. Real numbers. No fluff.";
  const projects = d?.projects || [];

  return <WorkClient label={label} heading={heading} subheading={subheading} projects={projects} />;
}