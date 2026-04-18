import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";
import { getPageData, buildMetadata } from "@/lib/get-page-data";
import { getSection } from "@/lib/get-section";
import DashboardContent from "@/components/DashboardContent";
import type { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("about");
  return buildMetadata(page, {
    title: "About Us | NexGen Digital Marketing Agency Faridabad",
    description: "NexGen Digital is founded by Lalit Sen — a results-driven digital marketing agency in Faridabad.",
  });
}

export default async function AboutPage() {
  const page = await getPageData("about");
  const d = await getSection("about-main");

  const heroBadge = d?.heroBadge || "About NexGen Digital";
  const heroHeading = d?.heroHeading || "Digital Marketing Agency Built by Results, Not Promises";
  const heroSubheading = d?.heroSubheading || "Founded by Lalit Sen in Faridabad, NexGen Digital helps Indian businesses grow online.";
  const storyHeading = d?.storyHeading || "Our Story";
  const storyParagraphs: string[] = d?.storyParagraphs || [];
  const whyUsHeading = d?.whyUsHeading || "Why Businesses Choose Us";
  const whyUsCards: { title: string; desc: string }[] = d?.whyUsCards || [];
  const ctaHeading = d?.ctaHeading || "Ready to Grow?";
  const ctaSubheading = d?.ctaSubheading || "Get a free consultation.";
  const ctaButtonText = d?.ctaButtonText || "Get Free Consultation";
  const ctaButtonLink = d?.ctaButtonLink || "/contact";

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "68px", fontFamily: "Inter, sans-serif" }}>
        <section style={{ background: "linear-gradient(135deg, #eff6ff 0%, #fff 100%)", padding: "4rem 2rem", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
            <span style={{ display: "inline-block", background: "#2563eb", color: "#fff", padding: "0.4rem 1rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1rem" }}>
              {heroBadge}
            </span>
            <h1 style={{ fontSize: "3rem", fontWeight: 800, color: "#0f1117", marginBottom: "1rem", lineHeight: 1.2 }}>
              {heroHeading}
            </h1>
            <p style={{ fontSize: "1.15rem", color: "#6b7280", maxWidth: "700px", margin: "0 auto 2rem" }}>
              {heroSubheading}
            </p>
          </div>
        </section>

        <section style={{ padding: "4rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0f1117", marginBottom: "1.5rem" }}>{storyHeading}</h2>
          {storyParagraphs.map((p, i) => (
            <p key={i} style={{ fontSize: "1.05rem", color: "#4b5563", lineHeight: 1.8, marginBottom: "1rem" }}>{p}</p>
          ))}
        </section>

        <section style={{ background: "#f8f9fb", padding: "4rem 2rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0f1117", marginBottom: "2rem", textAlign: "center" }}>{whyUsHeading}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {whyUsCards.map((item, i) => (
                <div key={i} style={{ background: "#fff", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.07)" }}>
                  <CheckCircle size={24} color="#2563eb" style={{ marginBottom: "0.8rem" }} />
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f1117", marginBottom: "0.5rem" }}>{item.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "4rem 2rem", textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>{ctaHeading}</h2>
          <p style={{ color: "#6b7280", marginBottom: "2rem", fontSize: "1.05rem" }}>{ctaSubheading}</p>
          <a href={ctaButtonLink} style={{ display: "inline-block", background: "#2563eb", color: "#fff", padding: "0.9rem 2rem", borderRadius: "8px", fontWeight: 600, textDecoration: "none" }}>
            {ctaButtonText}
          </a>
        </section>

        <DashboardContent content={page?.content} />
      </main>
      <Footer />
    </>
  );
}