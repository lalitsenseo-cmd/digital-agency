"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, ArrowRight, ChevronRight } from "lucide-react";

const megaMenu = [
  {
    category: "MARKETING",
    icon: "📈",
    items: [
      {
        label: "SEO Services", href: "/seo-services", desc: "All SEO solutions",
        submenu: [
          { label: "SEO Services in Faridabad",          href: "/seo-services-in-faridabad"          },
          { label: "SEO Services in Noida",              href: "/seo-services-in-noida"              },
          { label: "SEO Services in Delhi",              href: "/seo-services-in-delhi"              },
          { label: "SEO Services in Delhi/NCR",          href: "/seo-services-in-delhi-ncr"          },
          { label: "SEO Services in Gurgaon",            href: "/seo-services-in-gurgaon"            },
          { label: "SEO Services in Ballabgarh",         href: "/seo-services-in-ballabgarh"         },
          { label: "SEO Services in Naharpar Faridabad", href: "/seo-services-in-naharpar-faridabad" },
          { label: "SEO Services in Ghaziabad",          href: "/seo-services-in-ghaziabad"          },
        ],
      },
      { label: "Local SEO",     href: "/local-seo",     desc: "Dominate local search"    },
      { label: "Ecommerce SEO", href: "/ecommerce-seo", desc: "Boost product visibility" },
      { label: "Technical SEO", href: "/technical-seo", desc: "Fix & optimize site"      },
      { label: "Amazon SEO",    href: "/amazon-seo",    desc: "Rank on Amazon"           },
    ],
  },
  {
    category: "PAID ADS",
    icon: "🎯",
    items: [
      { label: "Google Ads (PPC)", href: "/google-ads",    desc: "9× ROAS achieved"     },
      { label: "Meta Ads",         href: "/meta-ads",      desc: "Facebook & Instagram" },
      { label: "YouTube Ads",      href: "/youtube-ads",   desc: "Video ad campaigns"   },
      { label: "Ecommerce PPC",    href: "/ecommerce-ppc", desc: "Shopping campaigns"   },
    ],
  },
  {
    category: "DEVELOPMENT",
    icon: "🌐",
    items: [
      { label: "Website Development", href: "/website-development",  desc: "90+ Lighthouse score"  },
      { label: "WordPress",           href: "/wordpress-development", desc: "Custom WP sites"       },
      { label: "Ecommerce Store",     href: "/ecommerce-development", desc: "Shopify & WooCommerce" },
      { label: "Python Automation",   href: "/python-development",    desc: "Save 30+ hrs/week"     },
    ],
  },
  {
    category: "SOCIAL & BRAND",
    icon: "📱",
    items: [
      { label: "Social Media Marketing", href: "/social-media-marketing", desc: "120+ leads in 60 days" },
      { label: "Instagram Marketing",    href: "/instagram-marketing",    desc: "Reels & growth"        },
      { label: "Content Writing",        href: "/content-writing",        desc: "SEO-optimized content" },
      { label: "Logo & Branding",        href: "/branding",               desc: "Brand identity design" },
    ],
  },
];

const mobileAllServices = megaMenu.flatMap(cat =>
  cat.items.flatMap((item: any) => [
    { label: item.label, href: item.href },
    ...(item.submenu ? item.submenu.map((s: any) => ({ label: "↳ " + s.label, href: s.href })) : []),
  ])
);

export default function Navbar() {
  const [scrolled, setScrolled]                     = useState(false);
  const [open, setOpen]                             = useState(false);
  const [dropdown, setDropdown]                     = useState(false);
  const [hoveredItem, setHoveredItem]               = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setDropdown(true); };
  const closeMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => { setDropdown(false); setHoveredItem(null); }, 350);
  };

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const activeSubmenu = megaMenu
    .flatMap(c => c.items)
    .find((item: any) => item.submenu && item.label === hoveredItem)?.submenu ?? null;

  return (
    <>
      <style>{`
        .nav-link {
          font-size:14px; font-weight:500; color:#334155;
          font-family:Inter,sans-serif; text-decoration:none;
          transition:color 0.3s; position:relative;
        }
        .nav-link:hover { color:#1e3a8a; }
        .nav-link::after {
          content:''; position:absolute; bottom:-6px; left:50%;
          transform:translateX(-50%); width:0; height:2px;
          background:linear-gradient(90deg,#1e3a8a,#3730a3);
          transition:width 0.3s; border-radius:2px;
        }
        .nav-link:hover::after { width:100%; }

        .nav-cta {
          background:linear-gradient(135deg,#1e3a8a,#3730a3);
          color:#fff; padding:10px 22px; border-radius:10px;
          font-size:14px; font-weight:700; text-decoration:none;
          box-shadow:0 4px 20px rgba(30,58,138,0.4);
          transition:all 0.3s; display:inline-flex; align-items:center;
        }
        .nav-cta:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(30,58,138,0.6); }

        .mega-wrap {
          position:fixed; top:138px; left:0; right:0;
          background:#ffffff;
          border-top:1px solid rgba(30,58,138,0.15);
          border-bottom:1px solid rgba(30,58,138,0.1);
          padding:32px 0 24px;
          box-shadow:0 32px 80px rgba(0,0,0,0.12);
          transition:opacity 0.25s, transform 0.25s, visibility 0.25s;
          z-index:101;
        }
        .mega-wrap.hidden-menu { opacity:0; visibility:hidden; transform:translateY(-8px); pointer-events:none; }
        .mega-wrap.visible-menu { opacity:1; visibility:visible; transform:translateY(0); pointer-events:auto; }

        .mega-inner {
          max-width:1200px; margin:0 auto; padding:0 2rem;
          display:grid; grid-template-columns:repeat(4,1fr);
          position:relative; z-index:1;
        }

        .mega-col { padding:0 16px; border-right:1px solid rgba(0,0,0,0.08); }
        .mega-col:last-child { border-right:none; }
        .mega-col:first-child { padding-left:0; }

        .mega-cat-head {
          display:flex; align-items:center; gap:8px;
          margin-bottom:14px; padding-bottom:10px;
          border-bottom:1px solid rgba(30,58,138,0.15);
        }
        .mega-cat-icon {
          font-size:15px; width:28px; height:28px;
          background:rgba(30,58,138,0.08); border-radius:7px;
          display:flex; align-items:center; justify-content:center;
        }
        .mega-cat-label { font-size:10px; font-weight:700; letter-spacing:1.5px; color:#1e3a8a; }

        .mega-item {
          display:block; padding:9px 10px; border-radius:9px;
          text-decoration:none; transition:all 0.2s; margin-bottom:3px;
        }
        .mega-item:hover { background:rgba(30,58,138,0.06); }
        .mega-item-label {
          font-size:13px; font-weight:600; color:#111111;
          display:flex; align-items:center;
          margin-bottom:2px; line-height:1.3; transition:color 0.2s;
        }
        .mega-item:hover .mega-item-label { color:#1e3a8a; }
        .mega-item-desc { font-size:11px; color:#6b7280; }
        .mega-arrow { opacity:0; transition:all 0.2s; margin-left:auto; flex-shrink:0; }
        .mega-item:hover .mega-arrow { opacity:1; transform:translateX(2px); }

        .mega-item-sub { background:rgba(30,58,138,0.04); border:1px solid rgba(30,58,138,0.12); }
        .mega-item-sub:hover { background:rgba(30,58,138,0.1); border-color:rgba(30,58,138,0.3); }
        .mega-item-sub .mega-item-label { color:#1e3a8a; }
        .sub-chevron { margin-left:auto; flex-shrink:0; color:#1e3a8a; transition:transform 0.2s; }
        .mega-item-sub:hover .sub-chevron { transform:translateX(2px); }

        .submenu-panel {
          position:absolute; top:0; bottom:0; left:25%; right:0;
          background:#f8fafc; border-left:2px solid rgba(30,58,138,0.2);
          padding:28px 24px 24px;
          transition:opacity 0.18s, visibility 0.18s; z-index:20;
        }
        .submenu-panel.sub-hidden { opacity:0; visibility:hidden; pointer-events:none; }
        .submenu-panel.sub-visible { opacity:1; visibility:visible; pointer-events:auto; }
        .submenu-inner { height:100%; }
        .submenu-head {
          display:flex; align-items:center; gap:10px;
          margin-bottom:16px; padding-bottom:12px;
          border-bottom:1px solid rgba(30,58,138,0.12);
        }
        .submenu-back {
          display:inline-flex; align-items:center; gap:6px;
          background:rgba(30,58,138,0.08); border:1px solid rgba(30,58,138,0.2);
          color:#1e3a8a; font-size:12px; font-weight:600;
          padding:5px 12px; border-radius:999px; cursor:pointer;
          text-decoration:none; transition:all 0.2s;
        }
        .submenu-back:hover { background:rgba(30,58,138,0.15); }
        .submenu-title { font-size:10px; font-weight:700; color:#1e3a8a; letter-spacing:1.5px; text-transform:uppercase; }
        .submenu-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; }
        .submenu-item {
          display:flex; align-items:center; gap:10px;
          padding:11px 14px; border-radius:10px;
          text-decoration:none; color:#111111; font-size:13px; font-weight:500;
          border:1px solid rgba(0,0,0,0.08); transition:all 0.2s; background:#ffffff;
        }
        .submenu-item:hover {
          background:rgba(30,58,138,0.06); border-color:rgba(30,58,138,0.25);
          color:#1e3a8a; transform:translateX(3px);
        }
        .submenu-dot {
          width:6px; height:6px; border-radius:50%;
          background:rgba(30,58,138,0.4); flex-shrink:0; transition:all 0.2s;
        }
        .submenu-item:hover .submenu-dot { background:#1e3a8a; box-shadow:0 0 8px rgba(30,58,138,0.4); }

        .mega-footer {
          max-width:1200px; margin:16px auto 0; padding:14px 2rem 0;
          border-top:1px solid rgba(0,0,0,0.08);
          display:flex; align-items:center; justify-content:space-between;
          position:relative; z-index:2;
        }
        .mega-footer-text { font-size:13px; color:#4b5563; }
        .mega-footer-cta {
          background:linear-gradient(135deg,#1e3a8a,#3730a3);
          color:#fff; padding:8px 18px; border-radius:8px;
          font-size:13px; font-weight:700; text-decoration:none;
          display:inline-flex; align-items:center; gap:6px;
          box-shadow:0 4px 16px rgba(30,58,138,0.35); transition:all 0.25s;
        }
        .mega-footer-cta:hover { box-shadow:0 6px 24px rgba(30,58,138,0.55); transform:translateY(-1px); }

        .mobile-link {
          display:block; padding:12px 0; font-size:15px; font-weight:500;
          color:#334155; text-decoration:none;
          border-bottom:1px solid #e2e8f0; transition:color 0.2s;
        }
        .mobile-link:hover { color:#1e3a8a; }
        .mobile-sub-link {
          display:block; padding:9px 0 9px 16px; font-size:13px;
          color:#64748b; text-decoration:none;
          border-bottom:1px solid #f1f5f9; transition:color 0.2s;
        }
        .mobile-sub-link:hover { color:#1e3a8a; }

        .seo-audit-btn {
          background:linear-gradient(135deg,#1e3a8a,#3730a3);
          color:#fff; text-decoration:none;
          padding:10px 16px; border-radius:10px;
          font-size:13px; font-weight:700;
          display:flex; align-items:center; gap:6px;
          font-family:Inter,sans-serif;
          box-shadow:0 4px 16px rgba(30,58,138,0.4);
          white-space:nowrap; transition:all 0.3s;
        }
        .seo-audit-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(30,58,138,0.6); }
      `}</style>

      <nav
        style={{
          position:"fixed", top:48, left:0, right:0, zIndex:100,
          background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.9)",
          borderBottom:`1px solid ${scrolled ? "rgba(30,58,138,0.2)" : "rgba(30,58,138,0.1)"}`,
          backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
          transition:"all 0.3s",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.1)" : "none",
        }}>

        <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 2rem", height:"90px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>

          {/* LOGO */}
          <a href="/" style={{ display:"flex", alignItems:"center", textDecoration:"none" }}>
            <img src="/logo.png" alt="Clickbriz" style={{ height:"90px", width:"auto" }} />
          </a>

          {/* DESKTOP NAV */}
          <div style={{ display:"flex", alignItems:"center", gap:"2.25rem" }} className="hidden md:flex">
            <a href="/" className="nav-link">Home</a>

            <div style={{ position:"relative", paddingBottom:"60px", marginBottom:"-60px" }}>
              <button
                onClick={() => { setDropdown(!dropdown); if (dropdown) setHoveredItem(null); }}
                style={{
                  background:"none", border:"none", cursor:"pointer",
                  fontSize:"14px", fontWeight:500,
                  color: dropdown ? "#1e3a8a" : "#334155",
                  display:"flex", alignItems:"center", gap:"4px",
                  fontFamily:"Inter,sans-serif", transition:"color 0.3s", padding:0,
                }}>
                Services
                <ChevronDown size={14} style={{ transform: dropdown ? "rotate(180deg)" : "rotate(0deg)", transition:"transform 0.3s" }} />
              </button>

              <div
                className={`mega-wrap ${dropdown ? "visible-menu" : "hidden-menu"}`}
                onMouseEnter={openMenu}
                onMouseLeave={closeMenu}
              >
                <div className="mega-inner">
                  {megaMenu.map((col) => (
                    <div key={col.category} className="mega-col">
                      <div className="mega-cat-head">
                        <div className="mega-cat-icon">{(col as any).icon}</div>
                        <span className="mega-cat-label">{col.category}</span>
                      </div>
                      {col.items.map((item: any) => (
                        item.submenu ? (
                          <a
                            key={item.label}
                            href={item.href}
                            className="mega-item mega-item-sub"
                            onMouseEnter={() => setHoveredItem(item.label)}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="mega-item-label">
                              {item.label}
                              <ChevronRight size={12} className="sub-chevron" />
                            </div>
                            <div className="mega-item-desc">{item.desc}</div>
                          </a>
                        ) : (
                          <a
                            key={item.href}
                            href={item.href}
                            className="mega-item"
                            onMouseEnter={() => setHoveredItem(null)}
                          >
                            <div className="mega-item-label">
                              {item.label}
                              <ArrowRight size={11} className="mega-arrow" />
                            </div>
                            <div className="mega-item-desc">{item.desc}</div>
                          </a>
                        )
                      ))}
                    </div>
                  ))}
                </div>

                <div
                  className={`submenu-panel ${activeSubmenu ? "sub-visible" : "sub-hidden"}`}
                  onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="submenu-inner">
                    <div className="submenu-head">
                      <span className="submenu-back" onMouseEnter={() => setHoveredItem(null)}>← Back</span>
                      <span className="submenu-title">📍 Select Your City</span>
                    </div>
                    <div className="submenu-grid">
                      {(activeSubmenu ?? []).map((s: any) => (
                        <a key={s.href} href={s.href} className="submenu-item">
                          <span className="submenu-dot" />
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mega-footer">
                  <span className="mega-footer-text">Not sure which service fits? Let's talk.</span>
                  <a href="/contact" className="mega-footer-cta">
                    Free Consultation <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>

            {["Blog", "About", "Contact"].map(item => (
              <a key={item} href={`/${item.toLowerCase()}`} className="nav-link">{item}</a>
            ))}

            <a href="/contact" className="nav-cta">Free Consultation</a>
          </div>

          {/* ✅ SEO AUDIT BUTTON — hamburger ki jagah */}
          <a href="/seo-audit" className="seo-audit-btn">
            🔍 Free SEO Audit
          </a>

        </div>

        {/* MOBILE MENU */}
        {open && (
          <div style={{ background:"rgba(255,255,255,0.98)", borderTop:"1px solid rgba(30,58,138,0.15)", padding:"1.25rem 2rem 1.75rem", backdropFilter:"blur(20px)" }}>
            <a href="/" onClick={() => setOpen(false)} className="mobile-link">Home</a>
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                style={{
                  width:"100%", background:"none", border:"none", cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"12px 0", borderBottom:"1px solid #e2e8f0",
                  color: mobileServicesOpen ? "#1e3a8a" : "#334155",
                  fontSize:"15px", fontWeight:500, fontFamily:"Inter,sans-serif",
                }}>
                Services
                <ChevronDown size={15} style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)", transition:"transform 0.3s" }} />
              </button>
              {mobileServicesOpen && (
                <div style={{ background:"#f8fafc", borderRadius:"8px", margin:"6px 0" }}>
                  {mobileAllServices.map(item => (
                    <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="mobile-sub-link">
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            {["Blog","About","Contact"].map(item => (
              <a key={item} href={`/${item.toLowerCase()}`} onClick={() => setOpen(false)} className="mobile-link">{item}</a>
            ))}
            <a href="/contact" onClick={() => setOpen(false)} style={{
              display:"block", marginTop:"1.25rem",
              background:"linear-gradient(135deg,#1e3a8a,#3730a3)",
              color:"#fff", padding:"14px", borderRadius:"10px",
              textAlign:"center", fontWeight:700, textDecoration:"none",
              boxShadow:"0 4px 20px rgba(30,58,138,0.4)",
            }}>Free Consultation</a>
          </div>
        )}
      </nav>
    </>
  );
}