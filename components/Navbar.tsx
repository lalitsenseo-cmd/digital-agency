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
    <>
      <style>{`
        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: #C4C4C4;
          font-family: Inter, sans-serif;
          text-decoration: none;
          transition: color 0.3s ease;
          position: relative;
        }
        .nav-link:hover { color: #FB923C; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #F97316, #EA580C);
          transition: width 0.3s ease;
          border-radius: 2px;
        }
        .nav-link:hover::after { width: 100%; }

        .nav-cta {
          background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
          color: #fff;
          padding: 10px 22px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(249, 115, 22, 0.4);
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
        }
        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(249, 115, 22, 0.6);
        }

        .nav-logo-box {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(249, 115, 22, 0.4);
          transition: transform 0.3s ease;
        }
        .nav-logo-wrap:hover .nav-logo-box { transform: rotate(-5deg) scale(1.05); }

        .dropdown-item {
          display: block;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 14px;
          color: #C4C4C4;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .dropdown-item:hover {
          background: rgba(249, 115, 22, 0.12);
          color: #FB923C;
          padding-left: 18px;
        }

        .mobile-link {
          display: block;
          padding: 12px 0;
          font-size: 15px;
          font-weight: 500;
          color: #E5E5E5;
          text-decoration: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          transition: color 0.2s;
        }
        .mobile-link:hover { color: #FB923C; }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10, 10, 10, 0.9)" : "rgba(10, 10, 10, 0.75)",
        borderBottom: `1px solid ${scrolled ? "rgba(249, 115, 22, 0.2)" : "rgba(249, 115, 22, 0.1)"}`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        transition: "all 0.3s ease",
        boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.5)" : "none",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          <a href="/" className="nav-logo-wrap" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div className="nav-logo-box">
              <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "18px", color: "#fff" }}>N</span>
            </div>
            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "20px", color: "#fff" }}>
              NexGen<span style={{ background: "linear-gradient(135deg, #F97316, #FB923C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>.</span>
            </span>
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: "2.25rem" }} className="hidden md:flex">
            <a href="/" className="nav-link">Home</a>

            <div style={{ position: "relative", paddingBottom: "20px", marginBottom: "-20px" }}
              onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}>
              <button style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "14px", fontWeight: 500,
                color: dropdown ? "#FB923C" : "#C4C4C4",
                display: "flex", alignItems: "center", gap: "4px",
                fontFamily: "Inter, sans-serif",
                transition: "color 0.3s ease",
                padding: 0,
              }}>
                Services <ChevronDown size={14} style={{ transform: dropdown ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }} />
              </button>
              <div style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: dropdown ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-8px)",
                background: "rgba(15, 15, 15, 0.98)",
                border: "1px solid rgba(249, 115, 22, 0.2)",
                borderRadius: "14px",
                padding: "10px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(249, 115, 22, 0.08) inset",
                minWidth: "240px",
                opacity: dropdown ? 1 : 0,
                visibility: dropdown ? "visible" : "hidden",
                transition: "opacity 0.3s, transform 0.3s, visibility 0.3s",
                pointerEvents: dropdown ? "auto" : "none",
                backdropFilter: "blur(20px)",
              }}>
                {services.map(s => (
                  <a key={s.href} href={s.href} className="dropdown-item">{s.label}</a>
                ))}
              </div>
            </div>

            {["Blog", "About", "Contact"].map(item => (
              <a key={item} href={`/${item.toLowerCase()}`} className="nav-link">{item}</a>
            ))}

            <a href="/contact" className="nav-cta">Free Consultation</a>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden"
            style={{
              background: "rgba(249, 115, 22, 0.1)",
              border: "1px solid rgba(249, 115, 22, 0.3)",
              cursor: "pointer",
              color: "#FB923C",
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div style={{
            background: "rgba(10, 10, 10, 0.98)",
            borderTop: "1px solid rgba(249, 115, 22, 0.15)",
            padding: "1.25rem 2rem 1.75rem",
            backdropFilter: "blur(20px)",
          }}>
            {[{ label: "Home", href: "/" }, ...services, { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }].map(item => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="mobile-link">
                {item.label}
              </a>
            ))}
            <a href="/contact" onClick={() => setOpen(false)}
              style={{
                display: "block",
                marginTop: "1.25rem",
                background: "linear-gradient(135deg, #F97316, #EA580C)",
                color: "#fff",
                padding: "14px",
                borderRadius: "10px",
                textAlign: "center",
                fontWeight: 700,
                fontFamily: "Plus Jakarta Sans, sans-serif",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(249, 115, 22, 0.4)",
              }}>
              Free Consultation
            </a>
          </div>
        )}
      </nav>
    </>
  );
}