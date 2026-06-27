import { TrendingUp, Shield, Zap, Award, ArrowRight, Phone } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getSection } from "@/lib/get-section";
import { WhatsAppButton } from "./PremiumFeatures";
import Link from "next/link";

type Props = {
  slug: string;
  color: string;
  bg: string;
  cmsContent?: string | null;
};

const featureIcons = [TrendingUp, Shield, Zap, Award];

export default async function ServicePage({ slug, color, bg, cmsContent }: Props) {
  const d = await getSection(`service-${slug}`);

  const heroTitle      = d?.heroTitle      || "Service Page";
  const heroDesc       = d?.heroDesc       || "";
  const heroBadge      = d?.heroBadge      || "Faridabad's #1 Digital Agency";
  const heroImage      = d?.heroImage      || "/SEO_Services_Click_Briz.jpg";
  const heroImageAlt   = d?.heroImageAlt   || heroTitle;

  const stats: { value: string; label: string }[] = d?.stats || [
    { value: "120+", label: "Clients Ranked"     },
    { value: "4.9★", label: "Google Rating"      },
    { value: "6+",   label: "Years Experience"   },
    { value: "300%", label: "Avg Traffic Growth" },
  ];

  const features: { title: string; desc: string }[] = d?.features || [
    { title: "Performance Focused", desc: "Every strategy tied to measurable business outcomes"      },
    { title: "100% White-Hat",      desc: "No shortcuts — only sustainable, Google-approved tactics" },
    { title: "Fast Implementation", desc: "Quick wins first, long-term compounding results"           },
    { title: "Proven Results",      desc: "120+ businesses ranked on Page 1 of Google"               },
  ];

  // Main article HTML content
  const articleContent: string = d?.articleContent || cmsContent || "";
  const hasCmsContent = articleContent && articleContent.trim() !== "" && articleContent !== "<br>";

  // Sidebar
  const sidebarCta: { heading: string; desc: string; btn: string } = d?.sidebarCta || {
    heading: "Free Consultation",
    desc:    "Find out exactly what's holding your website back.",
    btn:     "Get Free Audit →",
  };
  const founderName:  string = d?.founderName  || "Lalit Sen";
  const founderRole:  string = d?.founderRole  || "Founder & SEO Strategist";
  const founderDesc:  string = d?.founderDesc  || "6+ years of experience helping businesses rank on Google and generate consistent organic leads.";
  const founderImage: string = d?.founderImage || "/founder.png";

  const sidebarServices: string[] = d?.sidebarServices || [
    "Technical SEO", "On-Page SEO", "Local SEO",
    "Off-Page SEO",  "SEO Audit",   "Keyword Research",
    "Content Marketing", "Google Business Profile",
  ];
  const sidebarAreas: string[] = d?.sidebarAreas || [];
  const sidebarTimeline: string[] = d?.sidebarTimeline || [
    "3-6 months: First rankings",
    "6-12 months: Significant growth",
    "12+ months: Market dominance",
  ];

  // Pricing
  const pricingHeading:  string = d?.pricingHeading  || "Transparent Pricing";
  const pricingSubtitle: string = d?.pricingSubtitle || "No hidden fees. Choose a plan that fits your business goals.";
  const pricingPlans: {
    name: string; price: string; period: string; desc: string;
    features: string[]; popular?: boolean;
  }[] = d?.pricingPlans || [
    {
      name: "Starter", price: "₹6,500", period: "/mo",
      desc: "Perfect for small businesses getting started online.",
      features: [
        "SEO Audit + Basic Optimization",
        "Keyword Research (10–15 keywords)",
        "Meta Title & Description Optimization",
        "Google Search Console & Analytics Setup",
        "Google Business Profile Setup",
      ],
    },
    {
      name: "Growth", price: "₹15,999", period: "/mo",
      desc: "For businesses ready to scale aggressively.",
      popular: true,
      features: [
        "Full SEO (On-Page, Off-Page & Technical)",
        "Advanced Keyword Research (25–40 keywords)",
        "Meta Optimization + Content Optimization (up to 15 pages)",
        "Google Ads or Meta Ads Management",
      ],
    },
    {
      name: "Enterprise", price: "₹28,000", period: "/mo",
      desc: "Full-service digital transformation for serious brands.",
      features: [
        "Everything in Growth",
        "Advanced SEO Strategy (On-Page, Off-Page, Technical & Content)",
        "Python Automation / Dashboard",
        "10–15 Quality Backlinks / Month",
        "High-Intent Keyword Expansion (50+)",
      ],
    },
  ];

  // Why choose us
  const whyHeading:  string = d?.whyHeading  || "Why Businesses Choose Clickbriz";
  const whySubtitle: string = d?.whySubtitle || "We don't just rank websites — we grow businesses.";
  const whyCards: { icon: string; title: string; desc: string }[] = d?.whyCards || [
    { icon: "🎯", title: "Business-First Approach",  desc: "Every strategy tied to your revenue goals — not just rankings."            },
    { icon: "🔍", title: "Manual Audits",             desc: "Real experts analyze your site — not just automated tool reports."          },
    { icon: "📊", title: "Transparent Reporting",     desc: "Monthly reports showing exactly what's working and what's improving."       },
    { icon: "⚡", title: "Fast Implementation",       desc: "Quick wins first — high impact fixes prioritized from day one."             },
    { icon: "🛡️", title: "100% White-Hat",            desc: "No shortcuts, no penalties — only Google-approved SEO tactics."            },
    { icon: "📈", title: "Realistic Expectations",    desc: "Honest timelines and projections based on your actual market."              },
  ];

  // CTA
  const ctaHeading:    string = d?.ctaHeading    || "Ready to Dominate Google Search?";
  const ctaSubheading: string = d?.ctaSubheading || "Get a free audit and a custom strategy designed for your business goals.";
  const ctaButton:     string = d?.ctaButton     || "Get Free SEO Audit";

  // Internal links
  const internalLinksHeading: string = d?.internalLinksHeading || "Our Services";
  const internalLinks: { label: string; href: string }[] = d?.internalLinks || [
    { label: "SEO Services",             href: "/seo-services"                    },
    { label: "SEO Services in Faridabad",href: "/seo-services-in-faridabad"       },
    { label: "SEO Services in Noida",    href: "/seo-services-in-noida"           },
    { label: "SEO Services in Delhi",    href: "/seo-services-in-delhi"           },
    { label: "SEO Services in Gurgaon",  href: "/seo-services-in-gurgaon"         },
    { label: "SEO Services in Delhi NCR",href: "/seo-services-in-delhi-ncr"       },
    { label: "SEO Services in Ballabgarh",href:"/seo-services-in-ballabgarh"      },
    { label: "SEO Services in Ghaziabad",href: "/seo-services-in-ghaziabad"       },
  ];

  // Breadcrumb label from slug
  const slugLabel = slug
    .split("-")
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <>
      <WhatsAppButton />
      <Navbar />

      <style suppressHydrationWarning>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }

        body { background:#fff !important; }
        .sp { font-family:'Inter',sans-serif; background:#fff; color:#1e293b; }

        /* ── HERO ── */
        .sp-hero {
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 40%, #6d28d9 100%);
          padding: 9rem 2rem 5rem;
          position: relative; overflow: hidden;
        }
        .sp-hero::after {
          content:''; position:absolute; inset:0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events:none;
        }
        .sp-hero-inner { max-width:1100px; margin:0 auto; position:relative; z-index:2; }
        .sp-breadcrumb { display:flex; align-items:center; gap:8px; margin-bottom:1.5rem; }
        .sp-breadcrumb a { font-size:13px; color:rgba(255,255,255,0.7); text-decoration:none; transition:color 0.2s; }
        .sp-breadcrumb a:hover { color:#fff; }
        .sp-breadcrumb-sep { color:rgba(255,255,255,0.4); font-size:13px; }
        .sp-breadcrumb-cur { font-size:13px; color:#fff; font-weight:600; }

        .sp-hero-grid { display:grid; grid-template-columns:1fr 380px; gap:4rem; align-items:center; }

        .sp-hero-badge {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.2);
          padding:7px 16px; border-radius:999px; margin-bottom:1.5rem;
          backdrop-filter:blur(10px);
        }
        .sp-hero-badge-dot { width:7px; height:7px; background:#60a5fa; border-radius:50%; box-shadow:0 0 8px #60a5fa; }
        .sp-hero-badge-text { font-size:11px; font-weight:700; color:#bfdbfe; letter-spacing:1.5px; text-transform:uppercase; }

        .sp-h1 {
          font-family:'Plus Jakarta Sans',sans-serif;
          font-size:clamp(2.2rem,4vw,3.2rem);
          font-weight:800; color:#fff; line-height:1.1;
          letter-spacing:-0.03em; margin:0 0 1.25rem;
        }
        .sp-h1-accent { color:#93c5fd; }
        .sp-hero-desc { font-size:1.05rem; color:rgba(255,255,255,0.8); line-height:1.75; margin-bottom:2rem; max-width:520px; }
        .sp-hero-btns { display:flex; gap:12px; flex-wrap:wrap; }
        .sp-btn-primary {
          background:#fff; color:#1e3a8a;
          padding:13px 26px; border-radius:10px;
          font-weight:700; font-size:14px; text-decoration:none;
          display:inline-flex; align-items:center; gap:8px;
          transition:all 0.25s; box-shadow:0 4px 20px rgba(0,0,0,0.2);
        }
        .sp-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(0,0,0,0.3); }
        .sp-btn-secondary {
          background:rgba(255,255,255,0.1); color:#fff;
          padding:13px 22px; border-radius:10px;
          font-weight:600; font-size:14px; text-decoration:none;
          border:1px solid rgba(255,255,255,0.25);
          display:inline-flex; align-items:center; gap:8px;
          transition:all 0.25s; backdrop-filter:blur(10px);
        }
        .sp-btn-secondary:hover { background:rgba(255,255,255,0.18); }

        /* STATS BAR */
        .sp-statsbar { background:#1e3a8a; padding:1.75rem 2rem; }
        .sp-statsbar-inner { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; }
        .sp-stat { text-align:center; }
        .sp-stat-val { font-family:'Plus Jakarta Sans',sans-serif; font-size:2rem; font-weight:800; color:#fff; }
        .sp-stat-lbl { font-size:12px; color:#93c5fd; margin-top:2px; font-weight:500; }

        /* FEATURES */
        .sp-features { background:#f8fafc; padding:4rem 2rem; }
        .sp-features-inner { max-width:1100px; margin:0 auto; }
        .sp-features-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:20px; }
        .sp-feature-card {
          background:#fff; border:1px solid #e2e8f0; border-radius:14px;
          padding:1.5rem; transition:all 0.25s;
        }
        .sp-feature-card:hover { border-color:#3b82f6; box-shadow:0 8px 30px rgba(59,130,246,0.12); transform:translateY(-3px); }
        .sp-feature-icon {
          width:44px; height:44px; border-radius:10px;
          background:linear-gradient(135deg,#1e3a8a,#3730a3);
          display:flex; align-items:center; justify-content:center; margin-bottom:1rem;
          box-shadow:0 4px 14px rgba(30,58,138,0.3);
        }
        .sp-feature-title { font-size:15px; font-weight:700; color:#1e293b; margin-bottom:6px; }
        .sp-feature-desc { font-size:13px; color:#64748b; line-height:1.6; }

        /* MAIN CONTENT + SIDEBAR */
        .sp-content-wrap {
          max-width:1100px; margin:0 auto; padding:5rem 2rem;
          display:grid; grid-template-columns:1fr 300px; gap:4rem; align-items:start;
        }

        /* ARTICLE */
        .sp-article { color:#334155; font-size:16px; line-height:1.85; }
        .sp-article h2 {
          font-family:'Plus Jakarta Sans',sans-serif;
          font-size:clamp(1.4rem,2.5vw,1.85rem);
          font-weight:700; color:#1e3a8a; line-height:1.2;
          letter-spacing:-0.02em; margin:3rem 0 1.1rem;
          padding-bottom:0.75rem; border-bottom:2px solid #e2e8f0;
        }
        .sp-article h2:first-child { margin-top:0; }
        .sp-article h3 {
          font-family:'Plus Jakarta Sans',sans-serif;
          font-size:1.1rem; font-weight:600; color:#3730a3;
          margin:1.75rem 0 0.65rem;
          display:flex; align-items:center; gap:8px;
        }
        .sp-article h3::before {
          content:''; width:6px; height:6px;
          background:linear-gradient(135deg,#1e3a8a,#6d28d9);
          border-radius:50%; flex-shrink:0;
        }
        .sp-article p { margin-bottom:1.4rem; color:#475569; font-size:16px; line-height:1.9; max-width:680px; }
        .sp-article strong { color:#0f172a; font-weight:700; }
        .sp-article ul { margin:1rem 0 1.75rem; padding:0; list-style:none; display:flex; flex-direction:column; gap:8px; }
        .sp-article ul li {
          position:relative; padding:12px 16px 12px 46px;
          background:#f8fafc; border:1px solid #e2e8f0;
          border-radius:10px; color:#334155; font-size:15px; line-height:1.6; transition:all 0.2s;
        }
        .sp-article ul li::before {
          content:''; position:absolute; left:14px; top:50%; transform:translateY(-50%);
          width:20px; height:20px;
          background:linear-gradient(135deg,#1e3a8a,#3730a3);
          border-radius:50%;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:center; background-size:10px;
          box-shadow:0 2px 8px rgba(30,58,138,0.3);
        }
        .sp-article ul li:hover { border-color:#93c5fd; background:#eff6ff; transform:translateX(3px); }
        .sp-article ol { margin:1rem 0 1.75rem; padding:0; list-style:none; counter-reset:step; display:flex; flex-direction:column; gap:10px; }
        .sp-article ol li {
          position:relative; padding:16px 18px 16px 62px;
          background:#f8fafc; border:1px solid #e2e8f0; border-left:3px solid #1e3a8a;
          border-radius:10px; color:#334155; font-size:15px; line-height:1.65;
          counter-increment:step; transition:all 0.2s;
        }
        .sp-article ol li::before {
          content:counter(step); position:absolute; left:14px; top:50%; transform:translateY(-50%);
          width:34px; height:34px; background:linear-gradient(135deg,#1e3a8a,#3730a3);
          color:#fff; border-radius:8px; display:flex; align-items:center; justify-content:center;
          font-weight:800; font-size:14px; font-family:'Plus Jakarta Sans',sans-serif;
          box-shadow:0 3px 10px rgba(30,58,138,0.3);
        }
        .sp-article ol li:hover { background:#eff6ff; border-left-color:#3b82f6; }
        .sp-article img { width:100%; border-radius:16px; margin:1.5rem 0 2rem; box-shadow:0 10px 40px rgba(30,58,138,0.2); }

        /* SIDEBAR */
        .sp-sidebar { position:sticky; top:120px; }
        .sp-sidebar-card {
          background:#fff; border:1px solid #e2e8f0; border-radius:16px; padding:1.5rem;
          margin-bottom:1.25rem; box-shadow:0 4px 20px rgba(0,0,0,0.06);
        }
        .sp-sidebar-card-title {
          font-family:'Plus Jakarta Sans',sans-serif; font-size:14px; font-weight:800; color:#0f172a;
          margin-bottom:1rem; padding-bottom:0.75rem; border-bottom:2px solid #e2e8f0;
        }
        .sp-sidebar-item {
          display:flex; align-items:center; gap:10px;
          padding:8px 0; border-bottom:1px solid #f1f5f9; font-size:13px; color:#475569;
        }
        .sp-sidebar-item:last-child { border-bottom:none; }
        .sp-sidebar-dot { width:8px; height:8px; border-radius:50%; background:linear-gradient(135deg,#1e3a8a,#6d28d9); flex-shrink:0; }
        .sp-cta-card { background:linear-gradient(135deg,#1e3a8a,#3730a3); border-radius:16px; padding:1.75rem; text-align:center; }
        .sp-cta-card h3 { font-family:'Plus Jakarta Sans',sans-serif; font-size:16px; font-weight:800; color:#fff; margin-bottom:0.5rem; }
        .sp-cta-card p { font-size:13px; color:rgba(255,255,255,0.75); margin-bottom:1.25rem; line-height:1.6; }
        .sp-cta-card-btn {
          display:block; background:#fff; color:#1e3a8a; padding:11px 20px; border-radius:10px;
          font-weight:700; font-size:14px; text-decoration:none; text-align:center;
          transition:all 0.2s; box-shadow:0 4px 14px rgba(0,0,0,0.15);
        }
        .sp-cta-card-btn:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(0,0,0,0.2); }

        /* CTA SECTION */
        .sp-cta-section {
          background:linear-gradient(135deg,#1e3a8a 0%,#3730a3 50%,#6d28d9 100%);
          padding:5rem 2rem; text-align:center; position:relative; overflow:hidden;
        }
        .sp-cta-section::before {
          content:''; position:absolute; top:-100px; right:-100px;
          width:400px; height:400px;
          background:radial-gradient(circle,rgba(255,255,255,0.08) 0%,transparent 70%);
          border-radius:50%;
        }
        .sp-cta-inner { max-width:600px; margin:0 auto; position:relative; z-index:2; }
        .sp-cta-inner h2 { font-family:'Plus Jakarta Sans',sans-serif; font-size:clamp(1.8rem,3vw,2.4rem); font-weight:800; color:#fff; margin-bottom:1rem; }
        .sp-cta-inner p { color:rgba(255,255,255,0.8); font-size:16px; margin-bottom:2rem; line-height:1.7; }
        .sp-cta-btns { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }

        /* INTERNAL LINKS */
        .internal-link {
          display:flex; align-items:center; gap:8px; padding:10px 14px;
          background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px;
          font-size:13px; font-weight:500; color:#1e3a8a; text-decoration:none; transition:all 0.2s;
        }
        .internal-link:hover { background:#eff6ff; border-color:#93c5fd; }

        /* RESPONSIVE */
        @media(max-width:900px) {
          .sp-hero-grid { grid-template-columns:1fr; }
          .sp-hero-img-card { display:none; }
          .sp-content-wrap { grid-template-columns:1fr; }
          .sp-sidebar { position:static; }
          .sp-statsbar-inner { grid-template-columns:repeat(2,1fr); }
        }
        @media(max-width:640px) {
          .sp-hero { padding:7rem 1.25rem 3.5rem; }
          .sp-content-wrap { padding:3rem 1.25rem; }
        }
      `}</style>

      <div className="sp">

        {/* ── HERO ── */}
        <section className="sp-hero">
          <div className="sp-hero-inner">

            {/* Breadcrumb */}
            <div className="sp-breadcrumb">
              <Link href="/" className="sp-breadcrumb-a" style={{fontSize:"13px",color:"rgba(255,255,255,0.7)",textDecoration:"none"}}>
                Home
              </Link>
              <span className="sp-breadcrumb-sep">/</span>
              <span className="sp-breadcrumb-cur">{slugLabel}</span>
            </div>

            <div className="sp-hero-grid">

              {/* Left — text */}
              <div style={{animation:"fadeUp 0.7s ease-out both"}}>
                <div className="sp-hero-badge">
                  <span className="sp-hero-badge-dot" />
                  <span className="sp-hero-badge-text">{heroBadge}</span>
                </div>
                <h1 className="sp-h1">
                  {heroTitle.split(" ").slice(0, -2).join(" ")}{" "}
                  <span className="sp-h1-accent">
                    {heroTitle.split(" ").slice(-2).join(" ")}
                  </span>
                </h1>
                <p className="sp-hero-desc">{heroDesc}</p>
                <div className="sp-hero-btns">
                  <a href="/contact" className="sp-btn-primary">
                    {ctaButton} <ArrowRight size={15} />
                  </a>
                  <a href="tel:+918527004901" className="sp-btn-secondary">
                    <Phone size={14} /> Call Now
                  </a>
                </div>
              </div>

              {/* Right — image card */}
              <div
                className="sp-hero-img-card"
                style={{
                  overflow:"hidden", borderRadius:"20px",
                  border:"1px solid rgba(255,255,255,0.15)",
                  boxShadow:"0 20px 60px rgba(0,0,0,0.4)",
                  animation:"fadeUp 0.8s ease-out 0.2s both",
                }}
              >
                <img
                  src={heroImage}
                  alt={heroImageAlt}
                  style={{width:"100%",height:"380px",objectFit:"cover",display:"block"}}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <div className="sp-statsbar">
          <div className="sp-statsbar-inner">
            {stats.map((s, i) => (
              <div key={i} className="sp-stat">
                <div className="sp-stat-val">{s.value}</div>
                <div className="sp-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEATURES ── */}
        <section className="sp-features">
          <div className="sp-features-inner">
            <div className="sp-features-grid">
              {features.map((f, i) => {
                const Icon = featureIcons[i % featureIcons.length];
                return (
                  <div key={i} className="sp-feature-card">
                    <div className="sp-feature-icon"><Icon size={22} color="#fff" /></div>
                    <div className="sp-feature-title">{f.title}</div>
                    <div className="sp-feature-desc">{f.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT + SIDEBAR ── */}
        <main>
          <div className="sp-content-wrap">

            {/* Article */}
            {hasCmsContent ? (
              <article
                className="sp-article"
                dangerouslySetInnerHTML={{ __html: articleContent }}
              />
            ) : (
              <article className="sp-article">
                <h2>{slugLabel}</h2>
                <p>Content coming soon. Please check back later.</p>
              </article>
            )}

            {/* Sidebar */}
            <aside className="sp-sidebar">

              {/* CTA card */}
              <div className="sp-cta-card" style={{marginBottom:"1.25rem"}}>
                <h3>{sidebarCta.heading}</h3>
                <p>{sidebarCta.desc}</p>
                <a href="/contact" className="sp-cta-card-btn">{sidebarCta.btn}</a>
              </div>

              {/* Founder card */}
              <div className="sp-sidebar-card" style={{
                textAlign:"center", padding:"1.5rem",
                background:"linear-gradient(135deg,#1e3a8a,#3730a3)",
                border:"none",
              }}>
                <img
                  src={founderImage}
                  alt={`${founderName} — Clickbriz Digital`}
                  style={{
                    width:"100px", height:"100px", borderRadius:"50%",
                    objectFit:"cover", objectPosition:"top",
                    border:"3px solid #93c5fd",
                    boxShadow:"0 4px 20px rgba(30,58,138,0.3)",
                    marginBottom:"1rem",
                  }}
                />
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"15px",color:"#fff",marginBottom:"4px"}}>
                  {founderName}
                </div>
                <div style={{fontSize:"12px",color:"#93c5fd",fontWeight:600,marginBottom:"8px"}}>
                  {founderRole}
                </div>
                <div style={{fontSize:"12px",color:"rgba(255,255,255,0.75)",lineHeight:1.6}}>
                  {founderDesc}
                </div>
              </div>

              {/* Services list */}
              {sidebarServices.length > 0 && (
                <div className="sp-sidebar-card">
                  <div className="sp-sidebar-card-title">📋 Our Services</div>
                  {sidebarServices.map((s, i) => (
                    <div key={i} className="sp-sidebar-item">
                      <span className="sp-sidebar-dot" />{s}
                    </div>
                  ))}
                </div>
              )}

              {/* Areas (only if provided) */}
              {sidebarAreas.length > 0 && (
                <div className="sp-sidebar-card">
                  <div className="sp-sidebar-card-title">📍 Areas We Cover</div>
                  {sidebarAreas.map((s, i) => (
                    <div key={i} className="sp-sidebar-item">
                      <span className="sp-sidebar-dot" />{s}
                    </div>
                  ))}
                </div>
              )}

              {/* Timeline */}
              {sidebarTimeline.length > 0 && (
                <div className="sp-sidebar-card">
                  <div className="sp-sidebar-card-title">⚡ Expected Results</div>
                  {sidebarTimeline.map((s, i) => (
                    <div key={i} className="sp-sidebar-item">
                      <span className="sp-sidebar-dot" />{s}
                    </div>
                  ))}
                </div>
              )}

            </aside>
          </div>
        </main>

        {/* ── PRICING ── */}
        <section style={{background:"#f8fafc",padding:"4rem 2rem"}}>
          <div style={{maxWidth:"1100px",margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:"3rem"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:"6px",background:"#eff6ff",border:"1px solid #bfdbfe",padding:"6px 14px",borderRadius:"999px",fontSize:"11px",fontWeight:700,color:"#1e3a8a",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"1rem"}}>
                💰 Pricing
              </div>
              <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:800,color:"#0f172a",margin:"0 0 0.75rem"}}>
                {pricingHeading}
              </h2>
              <p style={{color:"#64748b",fontSize:"16px",maxWidth:"550px",margin:"0 auto"}}>
                {pricingSubtitle}
              </p>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"24px",alignItems:"start"}}>
              {pricingPlans.map((plan, i) => (
                <div key={i} style={{
                  background: plan.popular ? "linear-gradient(135deg,#1e3a8a,#3730a3)" : "#fff",
                  border: plan.popular ? "2px solid #3730a3" : "2px solid #e2e8f0",
                  borderRadius:"16px", padding:"2rem", position:"relative",
                  boxShadow: plan.popular ? "0 20px 60px rgba(30,58,138,0.3)" : "none",
                }}>
                  {plan.popular && (
                    <div style={{position:"absolute",top:"-14px",left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#f59e0b,#d97706)",color:"#fff",fontSize:"11px",fontWeight:800,padding:"5px 16px",borderRadius:"999px",letterSpacing:"1px",whiteSpace:"nowrap"}}>
                      ⚡ MOST POPULAR
                    </div>
                  )}
                  <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"20px",fontWeight:800,color:plan.popular?"#fff":"#1e3a8a",marginBottom:"6px"}}>
                    {plan.name}
                  </h3>
                  <p style={{fontSize:"13px",color:plan.popular?"rgba(255,255,255,0.75)":"#64748b",marginBottom:"1.5rem"}}>
                    {plan.desc}
                  </p>
                  <div style={{marginBottom:"1.5rem",paddingBottom:"1.5rem",borderBottom:`1px solid ${plan.popular?"rgba(255,255,255,0.2)":"#e2e8f0"}`}}>
                    <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"2.5rem",fontWeight:800,color:plan.popular?"#fff":"#0f172a"}}>
                      {plan.price}
                    </span>
                    <span style={{fontSize:"14px",color:plan.popular?"rgba(255,255,255,0.7)":"#64748b"}}>
                      {plan.period}
                    </span>
                  </div>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{display:"flex",alignItems:"flex-start",gap:"10px",marginBottom:"10px"}}>
                      <div style={{width:"20px",height:"20px",borderRadius:"50%",background:plan.popular?"rgba(255,255,255,0.2)":"linear-gradient(135deg,#1e3a8a,#3730a3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:"2px"}}>
                        <span style={{color:"#fff",fontSize:"11px"}}>✓</span>
                      </div>
                      <span style={{fontSize:"14px",color:plan.popular?"rgba(255,255,255,0.9)":"#334155"}}>{f}</span>
                    </div>
                  ))}
                  <a href="/contact" style={{display:"block",marginTop:"1.5rem",textAlign:"center",padding:"12px",borderRadius:"10px",background:plan.popular?"#fff":"#eff6ff",color:"#1e3a8a",fontWeight:700,fontSize:"14px",textDecoration:"none",border:plan.popular?"none":"2px solid #bfdbfe"}}>
                    Get Started →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section style={{background:"#f8fafc",padding:"4rem 2rem"}}>
          <div style={{maxWidth:"1100px",margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:"3rem"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:"6px",background:"#eff6ff",border:"1px solid #bfdbfe",padding:"6px 14px",borderRadius:"999px",fontSize:"11px",fontWeight:700,color:"#1e3a8a",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"1rem"}}>
                ⭐ Why Choose Us
              </div>
              <h2 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:800,color:"#0f172a",margin:"0 0 0.75rem"}}>
                {whyHeading}
              </h2>
              <p style={{color:"#64748b",fontSize:"16px",maxWidth:"550px",margin:"0 auto"}}>
                {whySubtitle}
              </p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"20px"}}>
              {whyCards.map((item, i) => (
                <div key={i} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:"14px",padding:"1.5rem",borderLeft:"4px solid #1e3a8a",transition:"all 0.25s",boxShadow:"0 2px 12px rgba(30,58,138,0.06)"}}>
                  <div style={{fontSize:"28px",marginBottom:"0.75rem"}}>{item.icon}</div>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"15px",color:"#0f172a",marginBottom:"6px"}}>{item.title}</div>
                  <div style={{fontSize:"13px",color:"#64748b",lineHeight:1.65}}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="sp-cta-section">
          <div className="sp-cta-inner">
            <h2>{ctaHeading}</h2>
            <p>{ctaSubheading}</p>
            <div className="sp-cta-btns">
              <a href="/contact" className="sp-btn-primary">
                {ctaButton} <ArrowRight size={15} />
              </a>
              <a href="tel:+918527004901" className="sp-btn-secondary">
                <Phone size={14} /> +91 85270 04901
              </a>
            </div>
          </div>
        </section>

        {/* ── INTERNAL LINKS ── */}
        <section style={{background:"#eff6ff",padding:"3rem 2rem",borderTop:"1px solid #bfdbfe"}}>
          <div style={{maxWidth:"1100px",margin:"0 auto"}}>
            <h3 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:"16px",fontWeight:700,color:"#1e3a8a",marginBottom:"1.5rem"}}>
              {internalLinksHeading}
            </h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"10px"}}>
              {internalLinks.map((item, i) => (
                <a key={i} href={item.href} className="internal-link">
                  <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#1e3a8a",flexShrink:0}} />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}