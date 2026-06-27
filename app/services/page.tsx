import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WhatsAppButton } from "@/components/PremiumFeatures";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Clickbriz Digital — SEO, Ads, Web & Python",
  description:
    "Explore all Clickbriz Digital services — SEO, Google & Meta Ads, PPC, social media marketing, ecommerce, website & Python development. One agency, every digital growth solution.",
  alternates: { canonical: "https://www.clickbriz.com/services" },
  robots: "index,follow",
};

// ── Saari services yahan se control hoti hain. Naya page add/hata karne ke liye
//    bas yahan ek line jod/hata do (real page ka path daalo). ──
const CATEGORIES: {
  title: string;
  emoji: string;
  items: { label: string; href: string; desc: string }[];
}[] = [
  {
    title: "SEO Services",
    emoji: "🔍",
    items: [
      { label: "SEO Services", href: "/seo-services", desc: "Rank higher on Google & grow organic traffic." },
      { label: "Local SEO", href: "/local-seo", desc: "Get found by nearby customers & on Google Maps." },
      { label: "Technical SEO", href: "/technical-seo", desc: "Fix crawl, speed & indexing issues for better rankings." },
      { label: "Amazon SEO", href: "/amazon-seo", desc: "Rank your products higher in Amazon search." },
      { label: "Ecommerce SEO", href: "/ecommerce-seo", desc: "Drive organic sales for your online store." },
      { label: "SEO Audit", href: "/seo-audit", desc: "Free, in-depth audit of what's holding you back." },
    ],
  },
  {
    title: "Paid Ads & PPC",
    emoji: "🎯",
    items: [
      { label: "Google Ads", href: "/google-ads", desc: "High-intent search & display campaigns that convert." },
      { label: "Meta Ads", href: "/meta-ads", desc: "Facebook & Instagram ads that drive real leads." },
      { label: "YouTube Ads", href: "/youtube-ads", desc: "Video ads that build brand & bring traffic." },
      { label: "Ecommerce PPC", href: "/ecommerce-ppc", desc: "Profitable paid campaigns for online stores." },
    ],
  },
  {
    title: "Social Media",
    emoji: "📱",
    items: [
      { label: "Social Media Marketing", href: "/social-media-marketing", desc: "Grow your brand across every social platform." },
      { label: "Instagram Marketing", href: "/instagram-marketing", desc: "Build a strong, engaged Instagram presence." },
    ],
  },
  {
    title: "Web & Development",
    emoji: "💻",
    items: [
      { label: "Website Development", href: "/website-development", desc: "Fast, modern, conversion-focused websites." },
      { label: "WordPress Development", href: "/wordpress-development", desc: "Custom WordPress sites that are easy to manage." },
      { label: "Ecommerce Development", href: "/ecommerce-development", desc: "Online stores built to sell & scale." },
      { label: "Python Development", href: "/python-development", desc: "Automation, dashboards & custom Python tools." },
    ],
  },
  {
    title: "Content & Branding",
    emoji: "✍️",
    items: [
      { label: "Content Writing", href: "/content-writing", desc: "SEO content that ranks & converts readers." },
      { label: "Branding", href: "/branding", desc: "Logos & brand identity that stand out." },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <WhatsAppButton />
      <Navbar />

      <style suppressHydrationWarning>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        body { background:#fff !important; }
        .srv { font-family:'Inter',sans-serif; background:#fff; color:#1e293b; }

        .srv-hero {
          background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 55%,#3730a3 100%);
          padding:8rem 2rem 4rem; position:relative; overflow:hidden;
        }
        .srv-hero::after {
          content:""; position:absolute; inset:0;
          background:radial-gradient(circle at 80% 20%,rgba(96,165,250,0.18),transparent 55%);
        }
        .srv-hero-inner { max-width:1100px; margin:0 auto; position:relative; z-index:2; text-align:center; }
        .srv-badge {
          display:inline-flex; align-items:center; gap:7px; background:rgba(255,255,255,0.1);
          border:1px solid rgba(255,255,255,0.2); padding:6px 16px; border-radius:999px; margin-bottom:1.5rem;
        }
        .srv-badge-dot { width:7px; height:7px; background:#60a5fa; border-radius:50%; box-shadow:0 0 8px #60a5fa; }
        .srv-badge-text { font-size:11px; font-weight:700; color:#bfdbfe; letter-spacing:1.5px; text-transform:uppercase; }
        .srv-h1 {
          font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(2rem,4vw,3rem); font-weight:800;
          color:#fff; line-height:1.15; margin-bottom:1rem;
        }
        .srv-h1-accent { color:#60a5fa; }
        .srv-hero-desc { font-size:1.05rem; color:rgba(255,255,255,0.82); line-height:1.7; max-width:620px; margin:0 auto 2rem; }
        .srv-hero-btns { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
        .srv-btn-primary {
          display:inline-flex; align-items:center; gap:8px; background:#fff; color:#1e3a8a;
          padding:13px 26px; border-radius:10px; font-weight:700; font-size:14px; text-decoration:none; transition:all .25s;
        }
        .srv-btn-primary:hover { transform:translateY(-2px); box-shadow:0 10px 30px rgba(0,0,0,0.25); }
        .srv-btn-secondary {
          display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.1); color:#fff;
          padding:13px 26px; border-radius:10px; font-weight:700; font-size:14px; text-decoration:none;
          border:1px solid rgba(255,255,255,0.25); transition:all .25s;
        }
        .srv-btn-secondary:hover { background:rgba(255,255,255,0.18); }

        .srv-section { max-width:1100px; margin:0 auto; padding:3.5rem 2rem 0; }
        .srv-cat-title {
          font-family:'Plus Jakarta Sans',sans-serif; font-size:1.5rem; font-weight:800; color:#0f172a;
          margin-bottom:1.5rem; display:flex; align-items:center; gap:10px;
        }
        .srv-cat-title span.emoji { font-size:1.4rem; }
        .srv-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:18px; }
        .srv-card {
          display:block; background:#fff; border:1px solid #e2e8f0; border-left:4px solid #1e3a8a;
          border-radius:14px; padding:1.4rem 1.5rem; text-decoration:none; transition:all .2s;
          box-shadow:0 2px 12px rgba(30,58,138,0.05);
        }
        .srv-card:hover { transform:translateY(-3px); box-shadow:0 12px 30px rgba(30,58,138,0.13); border-left-color:#3730a3; }
        .srv-card-title {
          font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; font-size:1.05rem; color:#1e3a8a;
          margin-bottom:6px; display:flex; align-items:center; justify-content:space-between;
        }
        .srv-card-title svg { color:#94a3b8; transition:transform .2s; }
        .srv-card:hover .srv-card-title svg { transform:translateX(4px); color:#1e3a8a; }
        .srv-card-desc { font-size:13px; color:#64748b; line-height:1.6; }

        .srv-cta { background:linear-gradient(135deg,#1e3a8a,#3730a3); margin-top:4rem; padding:4rem 2rem; text-align:center; }
        .srv-cta h2 { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(1.6rem,3vw,2.2rem); font-weight:800; color:#fff; margin-bottom:0.75rem; }
        .srv-cta p { color:rgba(255,255,255,0.82); font-size:16px; margin-bottom:1.75rem; }
        .srv-cta-btns { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }

        @media (max-width:640px) {
          .srv-hero { padding:7rem 1.25rem 3rem; }
          .srv-section { padding:2.5rem 1.25rem 0; }
        }
      `}</style>

      <div className="srv">
        {/* HERO */}
        <section className="srv-hero">
          <div className="srv-hero-inner" style={{ animation: "fadeUp 0.6s ease-out both" }}>
            <div className="srv-badge">
              <span className="srv-badge-dot" />
              <span className="srv-badge-text">Clickbriz Digital</span>
            </div>
            <h1 className="srv-h1">
              Everything You Need to <span className="srv-h1-accent">Grow Online</span>
            </h1>
            <p className="srv-hero-desc">
              From SEO and paid ads to websites and Python automation — explore our full range
              of digital services designed to bring you more traffic, leads, and sales.
            </p>
            <div className="srv-hero-btns">
              <a href="/contact" className="srv-btn-primary">
                Get a Free Consultation <ArrowRight size={15} />
              </a>
              <a href="tel:+918527004901" className="srv-btn-secondary">
                <Phone size={14} /> Call Now
              </a>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        {CATEGORIES.map((cat) => (
          <section key={cat.title} className="srv-section">
            <h2 className="srv-cat-title">
              <span className="emoji">{cat.emoji}</span> {cat.title}
            </h2>
            <div className="srv-grid">
              {cat.items.map((item) => (
                <Link key={item.href} href={item.href} className="srv-card">
                  <div className="srv-card-title">
                    {item.label} <ArrowRight size={16} />
                  </div>
                  <div className="srv-card-desc">{item.desc}</div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* BOTTOM CTA */}
        <section className="srv-cta">
          <h2>Not sure which service you need?</h2>
          <p>Tell us your goals — we'll recommend the right plan for your business.</p>
          <div className="srv-cta-btns">
            <a href="/contact" className="srv-btn-primary">
              Get Free Consultation <ArrowRight size={15} />
            </a>
            <a href="tel:+918527004901" className="srv-btn-secondary">
              <Phone size={14} /> +91 85270 04901
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
