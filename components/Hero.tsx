"use client";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function Hero() {
  return (
    <section style={{
      paddingTop: "7rem", paddingBottom: "5rem",
      background: "linear-gradient(135deg, #f8faff 0%, #eff6ff 50%, #f0fdf4 100%)",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "center" }}>
          {/* Left */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "#eff6ff", border: "1px solid #bfdbfe",
              borderRadius: "999px", padding: "5px 14px", marginBottom: "1.5rem",
            }}>
              <Star size={12} fill="#2563eb" color="#2563eb" />
              <span style={{ fontSize: "13px", color: "#2563eb", fontWeight: 600, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                Top Rated Digital Agency
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
              fontWeight: 800, lineHeight: 1.1,
              marginBottom: "1.25rem",
              fontFamily: "Plus Jakarta Sans, sans-serif",
              color: "#0f1117",
            }}>
              Grow Your Business With <span style={{ color: "#2563eb" }}>Digital Marketing</span> That Works
            </h1>

            <p style={{ fontSize: "1.1rem", color: "#6b7280", lineHeight: 1.7, marginBottom: "2rem", fontFamily: "Inter, sans-serif" }}>
              SEO, Google Ads, Social Media, Website Development & Python Automation — complete digital solutions for Indian businesses.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "2rem" }}>
              {["Google Certified Agency", "100% Transparent Reporting", "Dedicated Account Manager"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <CheckCircle size={16} color="#16a34a" fill="#dcfce7" />
                  <span style={{ fontSize: "14px", color: "#374151", fontWeight: 500 }}>{f}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a href="/contact" style={{
                background: "#2563eb", color: "#fff",
                padding: "14px 28px", borderRadius: "10px",
                fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif",
                fontSize: "15px", display: "flex", alignItems: "center", gap: "8px",
                transition: "background 0.2s, transform 0.2s",
                boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#1d4ed8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#2563eb"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Get Free Consultation <ArrowRight size={16} />
              </a>
              <a href="/seo-services" style={{
                background: "#fff", color: "#374151",
                padding: "14px 28px", borderRadius: "10px",
                fontWeight: 600, fontFamily: "Plus Jakarta Sans, sans-serif",
                fontSize: "15px", border: "1px solid #e5e7eb",
                transition: "border-color 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#2563eb"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Our Services
              </a>
            </div>
          </div>

          {/* Right - Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
              { n: "50+", l: "Happy Clients", c: "#2563eb", bg: "#eff6ff" },
              { n: "3×", l: "Average ROI", c: "#16a34a", bg: "#f0fdf4" },
              { n: "₹2Cr+", l: "Ad Spend Managed", c: "#7c3aed", bg: "#f5f3ff" },
              { n: "98%", l: "Client Retention", c: "#dc2626", bg: "#fef2f2" },
            ].map(s => (
              <div key={s.l} style={{
                background: s.bg, border: `1px solid ${s.c}20`,
                borderRadius: "16px", padding: "1.5rem", textAlign: "center",
              }}>
                <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "2rem", fontWeight: 800, color: s.c }}>{s.n}</div>
                <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px", fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
