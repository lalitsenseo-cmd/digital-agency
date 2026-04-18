import { CheckCircle, ArrowRight, Phone } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getSection } from "@/lib/get-section";

type Props = { slug: string; color: string; bg: string; };

export default async function ServicePage({ slug, color, bg }: Props) {
  const d = await getSection(`service-${slug}`);

  const heroTitle = d?.heroTitle || "Service Page";
  const heroDesc = d?.heroDesc || "";
  const offersHeading = d?.offersHeading || "What's Included";
  const offersSubheading = d?.offersSubheading || "Everything we do to grow your business";
  const offers: { title: string; desc: string }[] = d?.offers || [];
  const benefitsHeading = d?.benefitsHeading || "Why Choose NexGen Digital?";
  const benefits: string[] = d?.benefits || [];
  const faqsHeading = d?.faqsHeading || "Frequently Asked Questions";
  const faqs: { q: string; a: string }[] = d?.faqs || [];
  const ctaHeading = d?.ctaHeading || "Ready to Get Started?";
  const ctaSubheading = d?.ctaSubheading || "Free consultation — no commitment.";
  const ctaButton = d?.ctaButton || "Get Free Consultation";

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "68px", background: "#fff", fontFamily: "Inter, sans-serif" }}>
        <section style={{ background: `linear-gradient(135deg, ${bg} 0%, #fff 100%)`, padding: "4rem 2rem 3rem", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", color: "#0f1117", marginBottom: "1.25rem" }}>{heroTitle}</h1>
            <p style={{ fontSize: "1.1rem", color: "#6b7280", maxWidth: "600px", margin: "0 auto 2rem", lineHeight: 1.7 }}>{heroDesc}</p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/contact" style={{ background: color, color: "#fff", padding: "13px 28px", borderRadius: "10px", fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "15px", display: "flex", alignItems: "center", gap: "8px", boxShadow: `0 4px 20px ${color}40`, textDecoration: "none" }}>
                {ctaButton} <ArrowRight size={16} />
              </a>
              <a href="tel:+919876543210" style={{ background: "#fff", color: "#374151", padding: "13px 24px", borderRadius: "10px", fontWeight: 600, border: "1px solid #e5e7eb", fontSize: "15px", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
                <Phone size={15} /> Call Now
              </a>
            </div>
          </div>
        </section>

        <section style={{ padding: "4rem 2rem", background: "#fff" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{offersHeading}</h2>
              <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>{offersSubheading}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {offers.map((item, i) => (
                <div key={i} style={{ background: "#f8f9fb", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "1.5rem", borderTop: `3px solid ${color}` }}>
                  <h3 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "16px", fontWeight: 700, color: "#0f1117", marginBottom: "0.5rem" }}>{item.title}</h3>
                  <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "4rem 2rem", background: bg }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", textAlign: "center", marginBottom: "2.5rem" }}>{benefitsHeading}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
              {benefits.map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", background: "#fff", borderRadius: "12px", padding: "1rem 1.25rem", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <CheckCircle size={18} color={color} style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "14px", color: "#374151", fontWeight: 500, lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "4rem 2rem", background: "#fff" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", textAlign: "center", marginBottom: "2.5rem" }}>{faqsHeading}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ background: "#f8f9fb", borderRadius: "12px", padding: "1.25rem 1.5rem", border: "1px solid #e5e7eb" }}>
                  <h3 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "15px", fontWeight: 700, color: "#0f1117", marginBottom: "0.5rem" }}>{faq.q}</h3>
                  <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "4rem 2rem", background: color }}>
          <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", color: "#fff", marginBottom: "1rem" }}>{ctaHeading}</h2>
            <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "2rem" }}>{ctaSubheading}</p>
            <a href="/contact" style={{ background: "#fff", color, padding: "14px 32px", borderRadius: "10px", fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "15px", display: "inline-block", textDecoration: "none" }}>
              {ctaButton} →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}