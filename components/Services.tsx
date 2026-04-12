"use client";
import { Search, TrendingUp, Share2, Globe, Cpu, Code2, ArrowRight } from "lucide-react";

const services = [
  { icon: Search, title: "SEO Services", desc: "Rank higher on Google with on-page, off-page, technical SEO and local SEO strategies.", href: "/seo-services", color: "#2563eb", bg: "#eff6ff" },
  { icon: TrendingUp, title: "Google Ads (PPC)", desc: "ROI-focused Google, Meta & LinkedIn ad campaigns that bring real leads and sales.", href: "/google-ads", color: "#16a34a", bg: "#f0fdf4" },
  { icon: Share2, title: "Social Media Marketing", desc: "Build brand presence on Instagram, Facebook, LinkedIn with engaging content strategy.", href: "/social-media-marketing", color: "#7c3aed", bg: "#f5f3ff" },
  { icon: Globe, title: "Website Development", desc: "Fast, beautiful websites — WordPress, Next.js, landing pages and e-commerce stores.", href: "/website-development", color: "#dc2626", bg: "#fef2f2" },
  { icon: Cpu, title: "Python Development", desc: "Custom automation scripts, dashboards, web scrapers and APIs for your business.", href: "/python-development", color: "#d97706", bg: "#fffbeb" },
  { icon: Code2, title: "Full Digital Package", desc: "Complete end-to-end digital solution — strategy, build, ads, and ongoing growth.", href: "/contact", color: "#0891b2", bg: "#ecfeff" },
];

export default function Services() {
  return (
    <section id="services" style={{ padding: "5rem 2rem", background: "#fff" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Our Services</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", marginBottom: "1rem" }}>
            Everything You Need to Grow Online
          </h2>
          <p style={{ color: "#6b7280", maxWidth: "500px", margin: "0 auto" }}>
            From getting found on Google to converting visitors into customers — we handle it all.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <a key={i} href={s.href} style={{
                background: "#fff", border: "1px solid #e5e7eb",
                borderRadius: "16px", padding: "1.75rem",
                textDecoration: "none", display: "block",
                transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = s.color + "40"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
              >
                <div style={{
                  width: "48px", height: "48px", background: s.bg,
                  borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.25rem",
                }}>
                  <Icon size={22} color={s.color} />
                </div>
                <h3 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "17px", fontWeight: 700, color: "#0f1117", marginBottom: "0.6rem" }}>{s.title}</h3>
                <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6, marginBottom: "1.25rem" }}>{s.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: s.color, fontSize: "13px", fontWeight: 600 }}>
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
