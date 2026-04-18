import { getSection } from "@/lib/get-section";
import ContactClient from "./ContactClient";

export default async function Contact() {
  const d = await getSection("home-contact");
  return (
    <ContactClient
      label={d?.label || "Contact Us"}
      heading={d?.heading || "Let's Grow Your Business"}
      subheading={d?.subheading || "Free consultation — we'll get back within 24 hours."}
      whatsapp={d?.whatsapp || "+91 85270 04901"}
      email={d?.email || "lalitsen.seo@gmail.com"}
      phone={d?.phone || "+91 85270 04901"}
      formHeading={d?.form_heading || "Free Consultation"}
      successMessage={d?.success_message || "We'll get back within 24 hours."}
      services={d?.services || []}
    />
  );
}