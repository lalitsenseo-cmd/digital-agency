import { CheckCircle, ArrowRight, Phone, Sparkles, TrendingUp, Star, Award, Shield, Zap } from "lucide-react";
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

export default async function ServicePage({ slug, color, bg, cmsContent }: Props) {
  const d = await getSection(`service-${slug}`);

  const heroTitle = d?.heroTitle || "Service Page";
  const heroDesc = d?.heroDesc || "";
  const offersHeading = d?.offersHeading || "What's Included";
  const offersSubheading = d?.offersSubheading || "Everything we do to grow your business";
  const offers: { title: string; desc: string }[] = d?.offers || [];
  const benefitsHeading = d?.benefitsHeading || "Why Choose Clickbriz Digital?";
  const benefits: string[] = d?.benefits || [];
  const faqsHeading = d?.faqsHeading || "Frequently Asked Questions";
  const faqs: { q: string; a: string }[] = d?.faqs || [];
  const ctaHeading = d?.ctaHeading || "Ready to Get Started?";
  const ctaSubheading = d?.ctaSubheading || "Free consultation — no commitment.";
  const ctaButton = d?.ctaButton || "Get Free Consultation";

  const hasCmsContent = cmsContent && cmsContent.trim() !== '' && cmsContent !== '<br>';

  return (
    <>
      <WhatsAppButton />
      <Navbar />

      <style suppressHydrationWarning>{`
        @keyframes glow-pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInSection { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes badge-glow { 0%,100% { box-shadow: 0 0 20px rgba(30,58,138,0.3); } 50% { box-shadow: 0 0 30px rgba(30,58,138,0.5); } }

        .premium-page { background: #ffffff; color: #0f172a; font-family: 'Inter', sans-serif; }

        .premium-page section {
          animation: fadeInSection 0.8s ease-out both;
        }

        /* ── HERO — dark blue gradient ── */
        .hero-premium {
          position: relative;
          padding: 8rem 2rem 4rem;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #3730a3 70%, #1e1b4b 100%);
          overflow: hidden;
        }
        .hero-orb-1 {
          position: absolute; top: 10%; right: 10%; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(147,197,253,0.2) 0%, transparent 70%);
          border-radius: 50%; filter: blur(60px);
          animation: glow-pulse 4s ease-in-out infinite;
        }
        .hero-orb-2 {
          position: absolute; bottom: 10%; left: 5%; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(55,48,163,0.25) 0%, transparent 70%);
          border-radius: 50%; filter: blur(80px);
          animation: glow-pulse 6s ease-in-out infinite;
        }
        .hero-content {
          position: relative; z-index: 2; max-width: 900px; margin: 0 auto; text-align: center;
          animation: fadeInUp 0.8s ease-out;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 8px 18px; border-radius: 999px; margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }
        .hero-badge-dot {
          width: 8px; height: 8px; background: #93c5fd;
          border-radius: 50%; box-shadow: 0 0 12px #93c5fd;
        }
        .hero-badge-text {
          font-size: 12px; font-weight: 600; color: #bfdbfe;
          letter-spacing: 1.5px; text-transform: uppercase;
        }
        .hero-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800; color: #fff; line-height: 1.05;
          letter-spacing: -0.04em; margin: 0 0 1.5rem;
        }
        .hero-gradient-text {
          background: linear-gradient(135deg, #93c5fd 0%, #bfdbfe 50%, #e0f2fe 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .hero-desc {
          font-size: 1.2rem; color: rgba(255,255,255,0.8);
          max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.7;
        }
        .hero-buttons {
          display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 3rem;
        }
        .btn-primary {
          background: #fff;
          color: #1e3a8a; padding: 16px 32px; border-radius: 12px;
          font-weight: 700; font-size: 15px;
          display: inline-flex; align-items: center; gap: 10px; text-decoration: none;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 50px rgba(0,0,0,0.3);
          background: #eff6ff;
        }
        .btn-secondary {
          background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);
          color: #fff; padding: 16px 28px; border-radius: 12px;
          font-weight: 600; font-size: 15px;
          border: 1px solid rgba(255,255,255,0.2);
          display: inline-flex; align-items: center; gap: 10px; text-decoration: none;
          transition: all 0.3s ease;
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.18);
        }

        .trust-badges {
          display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
          margin-bottom: 3rem; padding: 0 1rem;
        }
        .trust-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 10px 16px; border-radius: 10px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .trust-badge:hover {
          background: rgba(255,255,255,0.18);
        }
        .trust-badge-icon {
          width: 28px; height: 28px;
          background: rgba(255,255,255,0.2);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
        }
        .trust-badge-text {
          font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.9);
          letter-spacing: 0.3px;
        }

        .hero-stats {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
          max-width: 600px; margin: 0 auto;
          padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.15);
        }
        .stat-value {
          font-size: 2.2rem; font-weight: 800;
          font-family: 'Plus Jakarta Sans', sans-serif;
          margin-bottom: 4px; letter-spacing: -0.02em;
          display: inline-block; color: #fff;
        }
        .stat-label {
          font-size: 11px; color: rgba(255,255,255,0.6);
          letter-spacing: 1px; text-transform: uppercase; font-weight: 500;
        }

        /* ── LIGHT SECTIONS ── */
        .section-premium { position: relative; padding: 6rem 2rem; background: #ffffff; }
        .section-premium-alt { background: linear-gradient(180deg, #f8fafc 0%, #eff6ff 50%, #f8fafc 100%); }
        .section-container { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }
        .section-header { text-align: center; margin-bottom: 4rem; }
        .section-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          padding: 6px 14px; border-radius: 999px;
          font-size: 11px; font-weight: 600; color: #1e3a8a;
          letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 1rem;
        }
        .section-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800; color: #0f172a; line-height: 1.1;
          letter-spacing: -0.03em; margin: 0 0 1rem;
        }
        .section-subtitle {
          font-size: 1.1rem; color: #64748b;
          max-width: 600px; margin: 0 auto; line-height: 1.6;
        }

        /* ── OFFER CARDS ── */
        .offers-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .offer-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 20px; padding: 2rem;
          position: relative; overflow: hidden;
          transition: all 0.4s ease;
          box-shadow: 0 2px 12px rgba(30,58,138,0.06);
        }
        .offer-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #1e3a8a, #3730a3);
        }
        .offer-card:hover {
          transform: translateY(-5px);
          border-color: #93c5fd;
          box-shadow: 0 20px 60px rgba(30,58,138,0.12);
        }
        .offer-icon {
          width: 48px; height: 48px;
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.25rem;
          box-shadow: 0 8px 25px rgba(30,58,138,0.3);
        }
        .offer-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.25rem; font-weight: 700; color: #0f172a;
          margin-bottom: 0.75rem; letter-spacing: -0.01em;
        }
        .offer-desc { font-size: 14px; color: #64748b; line-height: 1.7; }

        /* ── BENEFITS ── */
        .benefits-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; }
        .benefit-item {
          display: flex; align-items: flex-start; gap: 14px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px; padding: 1.2rem 1.4rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(30,58,138,0.04);
        }
        .benefit-item:hover {
          background: #eff6ff;
          border-color: #93c5fd;
          transform: translateX(4px);
        }
        .benefit-check {
          width: 24px; height: 24px;
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 2px;
          box-shadow: 0 4px 12px rgba(30,58,138,0.3);
        }
        .benefit-text { font-size: 15px; color: #334155; font-weight: 500; line-height: 1.5; }

        /* ── FAQS ── */
        .faq-grid { display: flex; flex-direction: column; gap: 14px; max-width: 800px; margin: 0 auto; }
        .faq-item {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 16px; padding: 1.5rem 1.75rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(30,58,138,0.04);
        }
        .faq-item:hover {
          border-color: #93c5fd;
          background: #eff6ff;
        }
        .faq-question {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 17px; font-weight: 700; color: #0f172a; margin-bottom: 0.75rem;
        }
        .faq-answer { font-size: 15px; color: #64748b; line-height: 1.7; }

        /* ── CTA ── */
        .cta-section {
          position: relative; padding: 6rem 2rem;
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #1e1b4b 100%);
          overflow: hidden;
        }
        .cta-orb {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
          border-radius: 50%; filter: blur(80px);
        }
        .cta-content { position: relative; z-index: 2; max-width: 700px; margin: 0 auto; text-align: center; }
        .cta-section .section-title { color: #fff; }
        .cta-section .section-subtitle { color: rgba(255,255,255,0.8); }
        .cta-section .section-badge {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          color: #bfdbfe;
        }

        /* ── CMS SECTION ── */
        .cms-section {
          padding: 6rem 2rem;
          background: #f8fafc;
          position: relative; overflow: hidden;
        }
        .cms-section::before {
          content: ''; position: absolute; top: 0; left: 50%;
          transform: translateX(-50%); width: 300px; height: 2px;
          background: linear-gradient(90deg, transparent, #1e3a8a, transparent);
        }
        .cms-wrapper { max-width: 900px; margin: 0 auto; position: relative; z-index: 2; }
        .cms-content { font-family: Inter, sans-serif; color: #475569; font-size: 16px; line-height: 1.8; }
        .cms-content h1, .cms-content h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800; color: #0f172a; line-height: 1.2;
          margin: 3.5rem 0 1.5rem; position: relative; padding-left: 1.5rem;
          font-size: clamp(1.7rem, 3vw, 2.2rem); letter-spacing: -0.02em;
        }
        .cms-content h1::before, .cms-content h2::before {
          content: ''; position: absolute; left: 0; top: 0.3em; bottom: 0.3em;
          width: 4px; background: linear-gradient(180deg, #1e3a8a, #3730a3); border-radius: 4px;
        }
        .cms-content h1:first-child, .cms-content h2:first-child { margin-top: 0; }
        .cms-content h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.35rem; font-weight: 700; color: #1e3a8a;
          margin: 2.5rem 0 1rem;
        }
        .cms-content h4 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.15rem; font-weight: 700; color: #3730a3; margin: 2rem 0 0.75rem;
        }
        .cms-content p { margin-bottom: 1.25rem; color: #475569; font-size: 16px; line-height: 1.85; }
        .cms-content strong { color: #0f172a; font-weight: 700; }
        .cms-content ul, .cms-content ol { margin: 1.5rem 0 2rem; padding: 0; list-style: none; }
        .cms-content ul li {
          position: relative; padding: 14px 20px 14px 52px; margin-bottom: 10px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px; color: #334155;
          font-size: 15px; line-height: 1.6;
          transition: all 0.3s ease;
        }
        .cms-content ul li::before {
          content: ''; position: absolute; left: 16px; top: 50%;
          transform: translateY(-50%); width: 22px; height: 22px;
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          border-radius: 50%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: center; background-size: 11px;
          box-shadow: 0 3px 10px rgba(30,58,138,0.3);
        }
        .cms-content ul li:hover {
          transform: translateX(4px);
          border-color: #93c5fd;
          background: #eff6ff;
        }
        .cms-content ol { counter-reset: step; }
        .cms-content ol li {
          position: relative; padding: 18px 20px 18px 68px; margin-bottom: 12px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-left: 3px solid #1e3a8a;
          border-radius: 12px; color: #334155;
          font-size: 15px; line-height: 1.6;
          counter-increment: step; transition: all 0.3s ease;
        }
        .cms-content ol li::before {
          content: counter(step); position: absolute;
          left: 16px; top: 50%; transform: translateY(-50%);
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          color: #fff; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 15px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          box-shadow: 0 4px 14px rgba(30,58,138,0.3);
        }
        .cms-content ol li:hover {
          background: #eff6ff;
          border-left-color: #3730a3;
        }
        .cms-content a {
          color: #1e3a8a; text-decoration: none; font-weight: 600;
          border-bottom: 2px solid rgba(30,58,138,0.3); transition: all 0.2s;
        }
        .cms-content a:hover { border-bottom-color: #1e3a8a; }
        .cms-content blockquote {
          position: relative; margin: 2.5rem 0; padding: 2rem 2rem 2rem 3.5rem;
          background: #eff6ff;
          border-left: 4px solid #1e3a8a; border-radius: 0 16px 16px 0;
          font-size: 1.1rem; color: #334155; font-style: italic;
        }
        .cms-content hr {
          border: none; height: 1px;
          background: linear-gradient(90deg, transparent, #bfdbfe, transparent);
          margin: 3.5rem 0;
        }
        .cms-content img { max-width: 100%; height: auto; border-radius: 16px; margin: 2rem 0; box-shadow: 0 10px 40px rgba(30,58,138,0.1); }

        @media (max-width: 640px) {
          .hero-premium { padding: 5rem 1.25rem 3rem; }
          .section-premium { padding: 4rem 1.25rem; }
          .cms-section { padding: 4rem 1.25rem; }
          .hero-stats { grid-template-columns: repeat(3, 1fr); gap: 12px; }
          .stat-value { font-size: 1.5rem; }
          .trust-badges { gap: 8px; }
          .trust-badge { padding: 8px 12px; }
          .trust-badge-text { font-size: 11px; }
        }
      `}</style>

      <div className="premium-page">
        <main>
          {/* HERO — Dark Blue */}
          <section className="hero-premium">
            <div className="hero-orb-1"></div>
            <div className="hero-orb-2"></div>
            <div className="hero-content">
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: "8px", marginBottom: "1.25rem", flexWrap: "wrap",
              }}>
                <Link href="/" style={{ fontSize: "13px", color: "#93c5fd", textDecoration: "none", fontWeight: 500 }}>
                  Home
                </Link>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>/</span>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>
                  {slug.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                </span>
              </div>
              <div className="hero-badge">
                <span className="hero-badge-dot"></span>
                <span className="hero-badge-text">Faridabad's #1 Digital Agency</span>
              </div>
              <h1 className="hero-title">
                {heroTitle.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="hero-gradient-text">
                  {heroTitle.split(' ').slice(-2).join(' ')}
                </span>
              </h1>
              <p className="hero-desc">{heroDesc}</p>
              <div className="hero-buttons">
                <a href="/contact" className="btn-primary">
                  {ctaButton} <ArrowRight size={18} />
                </a>
                <a href="tel:+918527004901" className="btn-secondary">
                  <Phone size={16} /> Call Now
                </a>
              </div>

              <div className="trust-badges">
                <div className="trust-badge">
                  <div className="trust-badge-icon"><Award size={16} color="#fff" /></div>
                  <span className="trust-badge-text">Google Partner</span>
                </div>
                <div className="trust-badge">
                  <div className="trust-badge-icon"><Star size={16} color="#fff" /></div>
                  <span className="trust-badge-text">5-Star Rated</span>
                </div>
                <div className="trust-badge">
                  <div className="trust-badge-icon"><Shield size={16} color="#fff" /></div>
                  <span className="trust-badge-text">100% White-Hat</span>
                </div>
                <div className="trust-badge">
                  <div className="trust-badge-icon"><Zap size={16} color="#fff" /></div>
                  <span className="trust-badge-text">Fast Results</span>
                </div>
              </div>

              <div className="hero-stats">
                <div>
                  <div className="stat-value">120+</div>
                  <div className="stat-label">Clients Ranked</div>
                </div>
                <div>
                  <div className="stat-value">4.9★</div>
                  <div className="stat-label">Google Rating</div>
                </div>
                <div>
                  <div className="stat-value">6yrs</div>
                  <div className="stat-label">Experience</div>
                </div>
              </div>
            </div>
          </section>

          {/* OFFERS — Light */}
          <section className="section-premium section-premium-alt">
            <div className="section-container">
              <div className="section-header">
                <span className="section-badge"><Sparkles size={12} /> What We Offer</span>
                <h2 className="section-title">{offersHeading}</h2>
                <p className="section-subtitle">{offersSubheading}</p>
              </div>
              <div className="offers-grid">
                {offers.map((item, i) => (
                  <div key={i} className="offer-card">
                    <div className="offer-icon"><CheckCircle size={24} color="#fff" /></div>
                    <h3 className="offer-title">{item.title}</h3>
                    <p className="offer-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CMS CONTENT */}
          {hasCmsContent && (
            <section className="cms-section">
              <div className="cms-wrapper">
                <div className="section-header">
                  <span className="section-badge"><TrendingUp size={12} /> Deep Dive</span>
                  <h2 className="section-title">Everything you need to know</h2>
                  <p className="section-subtitle">Detailed insights into our proven methodology</p>
                </div>
                <div className="cms-content" dangerouslySetInnerHTML={{ __html: cmsContent! }} />
              </div>
            </section>
          )}

          {/* BENEFITS — Light */}
          <section className="section-premium section-premium-alt">
            <div className="section-container">
              <div className="section-header">
                <span className="section-badge"><Star size={12} /> Why Us</span>
                <h2 className="section-title">{benefitsHeading}</h2>
              </div>
              <div className="benefits-grid">
                {benefits.map((b, i) => (
                  <div key={i} className="benefit-item">
                    <div className="benefit-check"><CheckCircle size={14} color="#fff" strokeWidth={3} /></div>
                    <span className="benefit-text">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs — Light */}
          <section className="section-premium">
            <div className="section-container">
              <div className="section-header">
                <span className="section-badge">FAQs</span>
                <h2 className="section-title">{faqsHeading}</h2>
              </div>
              <div className="faq-grid">
                {faqs.map((faq, i) => (
                  <div key={i} className="faq-item">
                    <h3 className="faq-question">{faq.q}</h3>
                    <p className="faq-answer">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA — Dark Blue */}
          <section className="cta-section">
            <div className="cta-orb"></div>
            <div className="cta-content">
              <span className="section-badge">Let's Talk</span>
              <h2 className="section-title">{ctaHeading}</h2>
              <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>{ctaSubheading}</p>
              <a href="/contact" className="btn-primary" style={{ display: 'inline-flex' }}>
                {ctaButton} <ArrowRight size={18} />
              </a>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}