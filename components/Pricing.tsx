import { getSection } from "@/lib/get-section";
import PricingClient from "./PricingClient";

export default async function Pricing() {
  const d = await getSection("home-pricing");
  return (
    <PricingClient
      label={d?.label || "Pricing"}
      heading={d?.heading || "Simple, Transparent Pricing"}
      subheading={d?.subheading || "No hidden fees. No surprises. Cancel anytime."}
      plans={d?.plans || []}
    />
  );
}