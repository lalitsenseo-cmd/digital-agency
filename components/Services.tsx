import { Search, TrendingUp, Share2, Globe, Cpu, Code2, ArrowRight } from "lucide-react";
import { getSection } from "@/lib/get-section";

const iconMap: Record<string, any> = {
  Search, TrendingUp, Share2, Globe, Cpu, Code2,
};

const colorMap: Record<string, { c: string; bg: string }> = {
  blue: { c: "#2563eb", bg: "#eff6ff" },
  green: { c: "#16a34a", bg: "#f0fdf4" },
  purple: { c: "#7c3aed", bg: "#f5f3ff" },
  red: { c: "#dc2626", bg: "#fef2f2" },
  amber: { c: "#d97706", bg: "#fffbeb" },
  cyan: { c: "#0891b2", bg: "#ecfeff" },
};

export default async function Services() {
  const d = await getSection("home-services");

  const label = d?.label || "Our Services";
  const heading = d?.heading || "Everything You Need to Grow Online";
  const subheading = d?.subheading || "From getting found on Google to converting visitors into customers — we handle it all.";
  const services: { icon: string; title: string; desc: string; href: string; color: string }[] = d?.services || [];

  return (
    <section id="services" style={{ padding: "5rem 2rem", background: "#fff" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>{label}</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", marginBottom: "1rem" }}>
            {heading}
          </h2>
          <p style={{ color: "#6b7280", maxWidth: "500px", margin: "0 auto" }}>
            {subheading}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] || Search;
            const color = colorMap[s.color] || colorMap.blue;
            return (
              <a key={i} href={s.href} style={{
                background: "#fff", border: "1px solid #e5e7eb",
                borderRadius: "16px", padding: "1.75rem",
                textDecoration: "none", display: "block",
                transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
              }}>
                <div style={{
                  width: "48px", height: "48px", background: color.bg,
                  borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.25rem",
                }}>
                  <Icon size={22} color={color.c} />
                </div>
                <h3 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "17px", fontWeight: 700, color: "#0f1117", marginBottom: "0.6rem" }}>{s.title}</h3>
                <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6, marginBottom: "1.25rem" }}>{s.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: color.c, fontSize: "13px", fontWeight: 600 }}>
                  Learn More <ArrowRight size={14} />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}