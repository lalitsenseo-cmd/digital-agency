"use client";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "#0f1117", color: "#9ca3af", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3.5rem 2rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2.5rem", marginBottom: "2.5rem" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
              <div style={{ width: "32px", height: "32px", background: "#2563eb", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "14px", color: "#fff" }}>N</span>
              </div>
              <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "16px", color: "#fff" }}>NexGen<span style={{ color: "#2563eb" }}>.</span></span>
            </div>
            <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#6b7280" }}>Results-driven digital marketing agency in Faridabad helping businesses grow online.</p>
            <p style={{ fontSize: "13px", color: "#4b5563", marginTop: "0.75rem" }}>Founded by <span style={{ color: "#9ca3af" }}>Lalit Sen</span></p>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: "14px", color: "#fff", marginBottom: "1rem" }}>Services</h4>
            {[
              { l: "SEO Services", h: "/seo-services" },
              { l: "Google Ads", h: "/google-ads" },
              { l: "Social Media Marketing", h: "/social-media-marketing" },
              { l: "Website Development", h: "/website-development" },
              { l: "Python Development", h: "/python-development" },
            ].map(s => (
              <a key={s.h} href={s.h} style={{ display: "block", fontSize: "13px", color: "#6b7280", marginBottom: "8px", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}>{s.l}</a>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: "14px", color: "#fff", marginBottom: "1rem" }}>Company</h4>
            {[
              { l: "About Us", h: "/about" },
              { l: "Blog", h: "/blog" },
              { l: "Contact", h: "/contact" },
              { l: "Privacy Policy", h: "#" },
              { l: "Terms of Service", h: "#" },
            ].map(s => (
              <a key={s.l} href={s.h} style={{ display: "block", fontSize: "13px", color: "#6b7280", marginBottom: "8px", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}>{s.l}</a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: "14px", color: "#fff", marginBottom: "1rem" }}>Contact</h4>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>📞 +91 85270 04901</p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>✉️ lalitsen.seo@gmail.com</p>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "1.25rem" }}>📍 Faridabad, Haryana, India</p>
            <a href="/contact" style={{
              background: "#2563eb", color: "#fff", padding: "9px 18px",
              borderRadius: "8px", fontSize: "13px", fontWeight: 700,
              fontFamily: "Plus Jakarta Sans, sans-serif", textDecoration: "none",
              display: "inline-block",
            }}>Free Consultation</a>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "12px", color: "#4b5563" }}>© {year} NexGen Digital by Lalit Sen. All rights reserved.</p>
          <p style={{ fontSize: "12px", color: "#4b5563" }}>Faridabad, Haryana 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
