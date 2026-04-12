"use client";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const services = [
  { label: "SEO Services", href: "/seo-services" },
  { label: "Google Ads (PPC)", href: "/google-ads" },
  { label: "Social Media Marketing", href: "/social-media-marketing" },
  { label: "Website Development", href: "/website-development" },
  { label: "Python Development", href: "/python-development" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "#fff",
      borderBottom: "1px solid rgba(0,0,0,0.07)",
      backdropFilter: "blur(12px)",
      transition: "box-shadow 0.3s",
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "36px", height: "36px", background: "#2563eb", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "16px", color: "#fff" }}>N</span>
          </div>
          <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "18px", color: "#0f1117" }}>
            NexGen<span style={{ color: "#2563eb" }}>.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hidden md:flex">
          <a href="/" style={{ fontSize: "14px", fontWeight: 500, color: "#6b7280", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#0f1117"}
            onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}>Home</a>

          {/* Services dropdown */}
          <div style={{ position: "relative" }}
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}>
            <button style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "14px", fontWeight: 500, color: "#6b7280",
              display: "flex", alignItems: "center", gap: "4px", fontFamily: "Inter, sans-serif",
            }}>
              Services <ChevronDown size={14} />
            </button>
            {dropdown && (
              <div style={{
                position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
                background: "#fff", border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "12px", padding: "8px", marginTop: "8px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)", minWidth: "220px",
                animation: "fadeIn 0.15s ease",
              }}>
                {services.map(s => (
                  <a key={s.href} href={s.href} style={{
                    display: "block", padding: "10px 14px", borderRadius: "8px",
                    fontSize: "14px", color: "#374151", fontWeight: 500,
                    transition: "background 0.15s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#2563eb"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#374151"; }}
                  >{s.label}</a>
                ))}
              </div>
            )}
          </div>

          {["Blog", "About", "Contact"].map(item => (
            <a key={item} href={`/${item.toLowerCase()}`}
              style={{ fontSize: "14px", fontWeight: 500, color: "#6b7280", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#0f1117"}
              onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}>{item}</a>
          ))}

          <a href="/contact" style={{
            background: "#2563eb", color: "#fff", padding: "9px 20px",
            borderRadius: "8px", fontSize: "14px", fontWeight: 600,
            fontFamily: "Plus Jakarta Sans, sans-serif",
            transition: "background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
            onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}>
            Free Consultation
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden"
          style={{ background: "none", border: "none", cursor: "pointer", color: "#0f1117" }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: "#fff", borderTop: "1px solid rgba(0,0,0,0.07)",
          padding: "1rem 2rem 1.5rem",
        }}>
          {[{ label: "Home", href: "/" }, ...services, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }].map(item => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}
              style={{ display: "block", padding: "10px 0", fontSize: "15px", fontWeight: 500, color: "#374151", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
              {item.label}
            </a>
          ))}
          <a href="/contact" onClick={() => setOpen(false)}
            style={{ display: "block", marginTop: "1rem", background: "#2563eb", color: "#fff", padding: "12px", borderRadius: "8px", textAlign: "center", fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            Free Consultation
          </a>
        </div>
      )}
    </nav>
  );
}
