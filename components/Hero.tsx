import { ArrowRight, CheckCircle, Star } from "lucide-react";
import { getSection } from "@/lib/get-section";

const colorMap: Record<string, { c: string; bg: string }> = {
  blue: { c: "#2563eb", bg: "#eff6ff" },
  green: { c: "#16a34a", bg: "#f0fdf4" },
  purple: { c: "#7c3aed", bg: "#f5f3ff" },
  red: { c: "#dc2626", bg: "#fef2f2" },
};

export default async function Hero() {
  const d = await getSection("home-hero");

  const badge = d?.badge || "Top Rated Digital Agency";
  const h1 = d?.heading_part1 || "Grow Your Business With";
  const hHl = d?.heading_highlight || "Digital Marketing";
  const h2 = d?.heading_part2 || "That Works";
  const subheading = d?.subheading || "SEO, Google Ads, Social Media, Website Development & Python Automation — complete digital solutions for Indian businesses.";
  const features: string[] = d?.features || ["Google Certified Agency", "100% Transparent Reporting", "Dedicated Account Manager"];
  const primaryText = d?.primary_cta_text || "Get Free Consultation";
  const primaryLink = d?.primary_cta_link || "/contact";
  const secondaryText = d?.secondary_cta_text || "Our Services";
  const secondaryLink = d?.secondary_cta_link || "/seo-services";
  const stats: { number: string; label: string; color: string }[] = d?.stats || [
    { number: "50+", label: "Happy Clients", color: "blue" },
    { number: "3×", label: "Average ROI", color: "green" },
    { number: "₹2Cr+", label: "Ad Spend Managed", color: "purple" },
    { number: "98%", label: "Client Retention", color: "red" },
  ];

  return (
    <section style={{
      paddingTop: "7rem", paddingBottom: "5rem",
      background: "linear-gradient(135deg, #f8faff 0%, #eff6ff 50%, #f0fdf4 100%)",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "999px", padding: "5px 14px", marginBottom: "1.5rem" }}>
              <Star size={12} fill="#2563eb" color="#2563eb" />
              <span style={{ fontSize: "13px", color: "#2563eb", fontWeight: 600, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{badge}</span>
            </div>

            <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.25rem", fontFamily: "Plus Jakarta Sans, sans-serif", color: "#0f1117" }}>
              {h1} <span style={{ color: "#2563eb" }}>{hHl}</span> {h2}
            </h1>

            <p style={{ fontSize: "1.1rem", color: "#6b7280", lineHeight: 1.7, marginBottom: "2rem", fontFamily: "Inter, sans-serif" }}>
              {subheading}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "2rem" }}>
              {features.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <CheckCircle size={16} color="#16a34a" fill="#dcfce7" />
                  <span style={{ fontSize: "14px", color: "#374151", fontWeight: 500 }}>{f}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a href={primaryLink} style={{ background: "#2563eb", color: "#fff", padding: "14px 28px", borderRadius: "10px", fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "15px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 20px rgba(37,99,235,0.3)" }}>
                {primaryText} <ArrowRight size={16} />
              </a>
              <a href={secondaryLink} style={{ background: "#fff", color: "#374151", padding: "14px 28px", borderRadius: "10px", fontWeight: 600, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "15px", border: "1px solid #e5e7eb" }}>
                {secondaryText}
              </a>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {stats.map((s, i) => {
              const color = colorMap[s.color] || colorMap.blue;
              return (
                <div key={i} style={{ background: color.bg, border: `1px solid ${color.c}20`, borderRadius: "16px", padding: "1.5rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "2rem", fontWeight: 800, color: color.c }}>{s.number}</div>
                  <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px", fontWeight: 500 }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}