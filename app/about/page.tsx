import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";
import { getPageData, buildMetadata } from "@/lib/get-page-data";
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

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "68px", fontFamily: "Inter, sans-serif" }}>
        {/* HERO SECTION */}
        <section style={{ background: "linear-gradient(135deg, #eff6ff 0%, #fff 100%)", padding: "4rem 2rem", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
            <span style={{ display: "inline-block", background: "#2563eb", color: "#fff", padding: "0.4rem 1rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1rem" }}>
              About NexGen Digital
            </span>
            <h1 style={{ fontSize: "3rem", fontWeight: 800, color: "#0f1117", marginBottom: "1rem", lineHeight: 1.2 }}>
              Digital Marketing Agency <br />Built by Results, Not Promises
            </h1>
            <p style={{ fontSize: "1.15rem", color: "#6b7280", maxWidth: "700px", margin: "0 auto 2rem" }}>
              Founded by Lalit Sen in Faridabad, NexGen Digital helps Indian businesses grow online through SEO, Google Ads, Social Media, and Python Automation.
            </p>
          </div>
        </section>

        {/* STORY SECTION */}
        <section style={{ padding: "4rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0f1117", marginBottom: "1.5rem" }}>Our Story</h2>
          <p style={{ fontSize: "1.05rem", color: "#4b5563", lineHeight: 1.8, marginBottom: "1rem" }}>
            NexGen Digital started with one simple belief — Indian businesses deserve digital marketing that actually delivers ROI, not just vanity metrics. We combine data-driven strategies with creative execution to help our clients dominate their markets online.
          </p>
          <p style={{ fontSize: "1.05rem", color: "#4b5563", lineHeight: 1.8 }}>
            From small local stores to scaling startups, we have helped 50+ businesses 3x their organic traffic, generate consistent leads through paid ads, and build strong social media presence.
          </p>
        </section>

        {/* WHY US SECTION */}
        <section style={{ background: "#f8f9fb", padding: "4rem 2rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0f1117", marginBottom: "2rem", textAlign: "center" }}>Why Businesses Choose Us</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {[
                { title: "Google Certified Team", desc: "Certified experts in Google Ads, Analytics, and SEO best practices." },
                { title: "100% Transparent Reporting", desc: "Weekly reports with real numbers — no jargon, no fluff." },
                { title: "Dedicated Account Manager", desc: "One point of contact who knows your business inside out." },
                { title: "ROI-Focused Approach", desc: "Every strategy mapped to revenue, not impressions." },
              ].map((item, i) => (
                <div key={i} style={{ background: "#fff", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.07)" }}>
                  <CheckCircle size={24} color="#2563eb" style={{ marginBottom: "0.8rem" }} />
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f1117", marginBottom: "0.5rem" }}>{item.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section style={{ padding: "4rem 2rem", textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>Ready to Grow?</h2>
          <p style={{ color: "#6b7280", marginBottom: "2rem", fontSize: "1.05rem" }}>Get a free consultation — we will get back within 24 hours.</p>
          <a href="/contact" style={{ display: "inline-block", background: "#2563eb", color: "#fff", padding: "0.9rem 2rem", borderRadius: "8px", fontWeight: 600, textDecoration: "none" }}>
            Get Free Consultation
          </a>
        </section>

        <DashboardContent content={page?.content} />
      </main>
      <Footer />
    </>
  );
}