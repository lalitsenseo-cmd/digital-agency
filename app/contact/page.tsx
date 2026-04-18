import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSection } from "@/lib/get-section";
import ContactPageClient from "@/components/ContactPageClient";
import type { Metadata } from "next";
import { getPageData, buildMetadata } from "@/lib/get-page-data";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("contact");
  return buildMetadata(page, {
    title: "Contact Us | NexGen Digital",
    description: "Free consultation. Get back within 24 hours.",
  });
}

export default async function ContactPage() {
  const d = await getSection("contact-main");

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "68px", fontFamily: "Inter, sans-serif" }}>
        <section style={{ background: "linear-gradient(135deg, #eff6ff 0%, #fff 100%)", padding: "3.5rem 2rem 3rem", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", color: "#0f1117", marginBottom: "1rem" }}>
              {d?.heroHeading || "Let's Grow Your Business Together"}
            </h1>
            <p style={{ color: "#6b7280", fontSize: "1.05rem" }}>
              {d?.heroSubheading || "Free consultation."}
            </p>
          </div>
        </section>

        <ContactPageClient
          infoHeading={d?.infoHeading || "Get In Touch"}
          contactInfo={d?.contactInfo || []}
          formHeading={d?.formHeading || "Free Consultation Form"}
          services={d?.services || []}
          budgets={d?.budgets || []}
          successMessage={d?.successMessage || "We'll get back within 24 hours."}
        />
      </main>
      <Footer />
    </>
  );
}