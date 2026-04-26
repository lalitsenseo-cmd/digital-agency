// app/[slug]/page.tsx
// Ye file AUTOMATICALLY sab seo-services-in-* pages handle karegi

import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { getLocationBySlug, seoLocations } from "@/app/data/seo-locations";

// Build time pe sab pages generate honge
export async function generateStaticParams() {
  return seoLocations.map((l) => ({ slug: l.slug }));
}

// SEO Meta
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const loc = getLocationBySlug(params.slug);
  if (!loc) return {};
  return {
    title: `SEO Services in ${loc.city} | #1 SEO Agency | ClickBriz`,
    description: `Best SEO services in ${loc.city}. ClickBriz helps local businesses rank #1 on Google. Get free SEO audit today. Call +91 85270 04901.`,
  };
}

const SEO_SERVICES = [
  { icon: "🔍", title: "On-Page SEO",      desc: "Title tags, meta, content optimization" },
  { icon: "🔗", title: "Link Building",     desc: "High-DA backlinks from authority sites"  },
  { icon: "📍", title: "Local SEO",         desc: "Google Business Profile & maps ranking"  },
  { icon: "⚙️", title: "Technical SEO",     desc: "Site speed, Core Web Vitals, schema"     },
  { icon: "📝", title: "Content Strategy",  desc: "SEO blogs, landing pages, copy"          },
  { icon: "📊", title: "SEO Reporting",     desc: "Monthly rank & traffic reports"          },
];

export default function SlugPage({ params }: { params: { slug: string } }) {
  const loc = getLocationBySlug(params.slug);

  // Agar slug seo location nahi hai to 404
  if (!loc) notFound();

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }

        .slp { background:#000; color:#fff; font-family:Inter,sans-serif; padding-top:138px; }

        .slp-hero {
          position:relative; padding:60px 2rem 72px;
          background:radial-gradient(ellipse at top, #1a0800 0%, #0a0a0a 50%, #000 100%);
          text-align:center; overflow:hidden;
        }
        .slp-orb {
          position:absolute; top:-10%; left:50%; transform:translateX(-50%);
          width:700px; height:400px; border-radius:50%;
          background:radial-gradient(circle,rgba(249,115,22,0.18) 0%,transparent 65%);
          filter:blur(80px); pointer-events:none;
        }
        .slp-inner { position:relative; z-index:2; max-width:800px; margin:0 auto; animation:fadeUp 0.8s ease-out; }

        .slp-breadcrumb {
          font-size:13px; color:#737373; margin-bottom:1.5rem;
          display:flex; align-items:center; justify-content:center; gap:6px; flex-wrap:wrap;
        }
        .slp-breadcrumb a { color:#F97316; text-decoration:none; }

        .slp-badge {
          display:inline-flex; align-items:center; gap:7px;
          background:rgba(249,115,22,0.12); border:1px solid rgba(249,115,22,0.28);
          padding:6px 16px; border-radius:999px; margin-bottom:1.5rem;
          font-size:11px; font-weight:700; color:#FDBA74; letter-spacing:1.4px; text-transform:uppercase;
        }
        .slp-badge-dot { width:6px; height:6px; border-radius:50%; background:#F97316; box-shadow:0 0 8px #F97316; }

        .slp-h1 {
          font-size:clamp(2rem,4vw,3.2rem); font-weight:900;
          line-height:1.1; letter-spacing:-0.03em; margin:0 0 1.25rem; color:#fff;
        }
        .slp-hl {
          background:linear-gradient(135deg,#F97316 0%,#FB923C 50%,#FED7AA 100%);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmer 4s linear infinite;
        }
        .slp-sub { font-size:1.05rem; color:#9A9A9A; line-height:1.75; margin-bottom:2rem; }

        .slp-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-bottom:2.5rem; }
        .slp-btn-p {
          display:inline-flex; align-items:center; gap:9px;
          background:linear-gradient(135deg,#F97316,#EA580C);
          color:#fff; padding:14px 28px; border-radius:999px;
          font-size:14px; font-weight:700; text-decoration:none;
          box-shadow:0 8px 28px rgba(249,115,22,0.45); transition:all 0.3s;
        }
        .slp-btn-p:hover { transform:translateY(-2px); box-shadow:0 14px 40px rgba(249,115,22,0.6); }
        .slp-btn-s {
          display:inline-flex; align-items:center; gap:9px;
          background:transparent; color:#fff; padding:14px 28px; border-radius:999px;
          font-size:14px; font-weight:600; text-decoration:none;
          border:1.5px solid rgba(255,255,255,0.22); transition:all 0.3s;
        }
        .slp-btn-s:hover { border-color:rgba(249,115,22,0.5); color:#FB923C; }

        .slp-stats { display:flex; gap:2rem; justify-content:center; flex-wrap:wrap; }
        .slp-stat { text-align:center; }
        .slp-stat-val {
          font-size:2rem; font-weight:900;
          background:linear-gradient(135deg,#F97316,#FB923C);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .slp-stat-lbl { font-size:12px; color:#737373; margin-top:3px; }

        .slp-divider { height:1px; background:rgba(255,255,255,0.07); max-width:1100px; margin:0 auto; }

        .slp-section { padding:64px 2rem; max-width:1100px; margin:0 auto; }
        .slp-section-title { font-size:clamp(1.6rem,3vw,2.2rem); font-weight:800; color:#fff; margin:0 0 0.75rem; }
        .slp-section-sub { font-size:1rem; color:#8A8A8A; line-height:1.7; margin-bottom:2.5rem; }

        .slp-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .slp-card {
          background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07);
          border-radius:16px; padding:24px 20px; transition:all 0.3s;
        }
        .slp-card:hover { border-color:rgba(249,115,22,0.35); background:rgba(249,115,22,0.05); transform:translateY(-4px); }
        .slp-card-icon { font-size:28px; margin-bottom:12px; }
        .slp-card-title { font-size:15px; font-weight:700; color:#fff; margin-bottom:6px; }
        .slp-card-desc { font-size:13px; color:#737373; line-height:1.6; }

        .slp-why-list { display:flex; flex-direction:column; gap:14px; }
        .slp-why-item { display:flex; align-items:flex-start; gap:12px; }
        .slp-why-check {
          width:22px; height:22px; border-radius:50%; flex-shrink:0; margin-top:1px;
          background:linear-gradient(135deg,#F97316,#EA580C);
          display:flex; align-items:center; justify-content:center;
        }
        .slp-why-text { font-size:14px; color:#E5E5E5; line-height:1.6; }

        .slp-areas { display:flex; gap:10px; flex-wrap:wrap; margin-top:1rem; }
        .slp-area-tag {
          background:rgba(249,115,22,0.08); border:1px solid rgba(249,115,22,0.2);
          color:#FB923C; font-size:13px; font-weight:600; padding:7px 16px; border-radius:999px;
        }

        .slp-cta {
          background:linear-gradient(135deg,#1a0800,#0f0500);
          border:1px solid rgba(249,115,22,0.2); border-radius:24px;
          padding:56px 48px; text-align:center;
          max-width:1100px; margin:0 auto 80px; position:relative; overflow:hidden;
        }
        .slp-cta-orb {
          position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
          width:500px; height:300px; border-radius:50%;
          background:radial-gradient(circle,rgba(249,115,22,0.15) 0%,transparent 65%);
          filter:blur(60px); pointer-events:none;
        }
        .slp-cta-title { font-size:clamp(1.6rem,3vw,2.2rem); font-weight:800; color:#fff; margin:0 0 1rem; position:relative; z-index:2; }
        .slp-cta-sub { font-size:1rem; color:#8A8A8A; margin-bottom:2rem; position:relative; z-index:2; }
        .slp-cta-btn {
          display:inline-flex; align-items:center; gap:10px;
          background:linear-gradient(135deg,#F97316,#EA580C);
          color:#fff; padding:15px 32px; border-radius:999px;
          font-size:15px; font-weight:700; text-decoration:none;
          box-shadow:0 10px 36px rgba(249,115,22,0.45); transition:all 0.3s; position:relative; z-index:2;
        }
        .slp-cta-btn:hover { transform:translateY(-2px); box-shadow:0 16px 48px rgba(249,115,22,0.6); }

        .slp-seo { padding:0 2rem 64px; max-width:1100px; margin:0 auto; }
        .slp-seo h2 { font-size:1.4rem; font-weight:700; color:#fff; margin:2rem 0 0.75rem; }
        .slp-seo p  { font-size:14px; color:#737373; line-height:1.8; }

        @media (max-width:768px) {
          .slp-grid { grid-template-columns:1fr 1fr; }
          .slp-cta { padding:40px 24px; margin:0 1.25rem 60px; }
        }
        @media (max-width:480px) {
          .slp-grid { grid-template-columns:1fr; }
        }
      `}</style>

      <div className="slp">

        {/* HERO */}
        <section className="slp-hero">
          <div className="slp-orb" />
          <div className="slp-inner">
            <div className="slp-breadcrumb">
              <a href="/">Home</a> /
              <a href="/seo-services">SEO Services</a> /
              <span>{loc.city}</span>
            </div>

            <div className="slp-badge">
              <span className="slp-badge-dot" />
              #1 SEO Agency in {loc.city}
            </div>

            <h1 className="slp-h1">
              SEO Services in <span className="slp-hl">{loc.city}</span>
            </h1>

            <p className="slp-sub">
              Dominate Google search results in {loc.city}, {loc.state}. ClickBriz delivers
              data-driven SEO strategies that drive real traffic, qualified leads, and measurable
              revenue growth for businesses across {loc.city}.
            </p>

            <div className="slp-btns">
              <a href="/contact" className="slp-btn-p">Get Free SEO Audit <ArrowRight size={15}/></a>
              <a href="tel:+918527004901" className="slp-btn-s"><Phone size={14}/> Call Now</a>
            </div>

            <div className="slp-stats">
              {[
                { val: "+312%", lbl: "Avg Traffic Growth" },
                { val: "90+",   lbl: "Clients Ranked #1"  },
                { val: "6mo",   lbl: "Avg Time to Results"},
              ].map(s => (
                <div key={s.val} className="slp-stat">
                  <div className="slp-stat-val">{s.val}</div>
                  <div className="slp-stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="slp-divider" />

        {/* SERVICES */}
        <section className="slp-section">
          <h2 className="slp-section-title">Our SEO Services in {loc.city}</h2>
          <p className="slp-section-sub">Comprehensive SEO solutions tailored for {loc.city} businesses.</p>
          <div className="slp-grid">
            {SEO_SERVICES.map(s => (
              <div key={s.title} className="slp-card">
                <div className="slp-card-icon">{s.icon}</div>
                <div className="slp-card-title">{s.title}</div>
                <div className="slp-card-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="slp-divider" />

        {/* WHY US */}
        <section className="slp-section">
          <h2 className="slp-section-title">Why Choose ClickBriz for SEO in {loc.city}?</h2>
          <p className="slp-section-sub">Faridabad-based agency with deep understanding of {loc.state} markets.</p>
          <div className="slp-why-list">
            {[
              `Local market expertise — we understand ${loc.city} customer behaviour`,
              "Google-certified team with 5+ years of proven SEO track record",
              "100% white-hat SEO — no penalties, sustainable long-term rankings",
              "Dedicated account manager & monthly transparent reporting",
              `Proven results: +312% avg traffic growth for ${loc.city} clients`,
              "Fast communication — same day response guaranteed",
            ].map((item, i) => (
              <div key={i} className="slp-why-item">
                <div className="slp-why-check"><CheckCircle size={12} color="#fff" strokeWidth={3}/></div>
                <span className="slp-why-text">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="slp-divider" />

        {/* NEARBY AREAS */}
        {loc.nearby && (
          <section className="slp-section">
            <h2 className="slp-section-title">Areas We Serve in & Around {loc.city}</h2>
            <p className="slp-section-sub">We provide SEO services across {loc.city} and surrounding localities.</p>
            <div className="slp-areas">
              {loc.nearby.map((area: string) => (
                <span key={area} className="slp-area-tag">{area}</span>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="slp-cta">
          <div className="slp-cta-orb" />
          <h2 className="slp-cta-title">Ready to Rank #1 in {loc.city}?</h2>
          <p className="slp-cta-sub">Get a FREE SEO audit worth ₹5,000 — no strings attached.</p>
          <a href="tel:+918527004901" className="slp-cta-btn">
            <Phone size={16}/> +91 85270 04901
          </a>
        </div>

        {/* SEO TEXT */}
        <div className="slp-seo">
          <h2>Best SEO Company in {loc.city}</h2>
          <p>ClickBriz is a leading SEO agency based in Faridabad serving clients across {loc.city}, {loc.state}. Our certified SEO experts use proven strategies to help your business rank higher on Google.</p>
          {loc.businessHubs && (
            <>
              <h2>SEO Services for {loc.city} Business Districts</h2>
              <p>We serve businesses across {loc.businessHubs.join(", ")} and all major commercial areas in {loc.city}.</p>
            </>
          )}
          <h2>How SEO Works for {loc.city} Businesses</h2>
          <p>When someone in {loc.city} searches "best [your service] near me" — we make sure your business appears at the top.</p>
        </div>

      </div>
    </>
  );
}