"use client";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#0f1117", color: "#cbd5e1", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "3rem", marginBottom: "3rem" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
              <div style={{ width: "42px", height: "42px", background: "#2563eb", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(37,99,235,0.4)" }}>
                <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "20px", color: "#fff" }}>N</span>
              </div>
              <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "22px", color: "#fff" }}>
                NexGen<span style={{ color: "#2563eb" }}>.</span>
              </span>
            </div>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#cbd5e1", marginBottom: "1rem" }}>
              Results-driven digital marketing agency in Faridabad helping businesses grow online through SEO, Ads, and automation.
            </p>
            <p style={{ fontSize: "14px", color: "#94a3b8" }}>
              Founded by <span style={{ color: "#fff", fontWeight: 600 }}>Lalit Sen</span>
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: "16px", color: "#fff", marginBottom: "1.25rem", letterSpacing: "0.02em" }}>
              Services
            </h4>
            {[
              { l: "SEO Services", h: "/seo-services" },
              { l: "Google Ads", h: "/google-ads" },
              { l: "Social Media Marketing", h: "/social-media-marketing" },
              { l: "Website Development", h: "/website-development" },
              { l: "Python Development", h: "/python-development" },
            ].map(s => (
              <a key={s.h} href={s.h} style={{ display: "block", fontSize: "15px", color: "#cbd5e1", marginBottom: "12px", textDecoration: "none", transition: "color 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#2563eb"; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#cbd5e1"; e.currentTarget.style.transform = "translateX(0)"; }}>
                {s.l}
              </a>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: "16px", color: "#fff", marginBottom: "1.25rem", letterSpacing: "0.02em" }}>
              Company
            </h4>
            {[
              { l: "About Us", h: "/about" },
              { l: "Blog", h: "/blog" },
              { l: "Contact", h: "/contact" },
              { l: "Privacy Policy", h: "#" },
              { l: "Terms of Service", h: "#" },
            ].map(s => (
              <a key={s.l} href={s.h} style={{ display: "block", fontSize: "15px", color: "#cbd5e1", marginBottom: "12px", textDecoration: "none", transition: "color 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#2563eb"; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#cbd5e1"; e.currentTarget.style.transform = "translateX(0)"; }}>
                {s.l}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: "16px", color: "#fff", marginBottom: "1.25rem", letterSpacing: "0.02em" }}>
              Contact Us
            </h4>

            <a href="tel:+918527004901" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", fontSize: "15px", color: "#cbd5e1", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "#cbd5e1"}>
              <div style={{ width: "32px", height: "32px", background: "rgba(37,99,235,0.15)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Phone size={15} color="#60a5fa" />
              </div>
              +91 85270 04901
            </a>

            <a href="mailto:lalitsen.seo@gmail.com" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", fontSize: "15px", color: "#cbd5e1", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = "#cbd5e1"}>
              <div style={{ width: "32px", height: "32px", background: "rgba(37,99,235,0.15)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Mail size={15} color="#60a5fa" />
              </div>
              lalitsen.seo@gmail.com
            </a>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem", fontSize: "15px", color: "#cbd5e1" }}>
              <div style={{ width: "32px", height: "32px", background: "rgba(37,99,235,0.15)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MapPin size={15} color="#60a5fa" />
              </div>
              Faridabad, Haryana, India
            </div>

            <a href="/contact" style={{
              background: "#2563eb",
              color: "#fff",
              padding: "12px 22px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 700,
              fontFamily: "Plus Jakarta Sans, sans-serif",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
              transition: "background 0.2s, transform 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1d4ed8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#2563eb"; e.currentTarget.style.transform = "translateY(0)"; }}>
              Free Consultation <ArrowRight size={15} />
            </a>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.75rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
          <p style={{ fontSize: "14px", color: "#94a3b8" }}>
            © {year} NexGen Digital by <span style={{ color: "#fff", fontWeight: 600 }}>Lalit Sen</span>. All rights reserved.
          </p>
          <p style={{ fontSize: "14px", color: "#94a3b8" }}>
            Made with ♥ in Faridabad, Haryana 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}