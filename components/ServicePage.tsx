import { CheckCircle, ArrowRight, Phone, Sparkles, TrendingUp, Star } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getSection } from "@/lib/get-section";

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
  const benefitsHeading = d?.benefitsHeading || "Why Choose NexGen Digital?";
  const benefits: string[] = d?.benefits || [];
  const faqsHeading = d?.faqsHeading || "Frequently Asked Questions";
  const faqs: { q: string; a: string }[] = d?.faqs || [];
  const ctaHeading = d?.ctaHeading || "Ready to Get Started?";
  const ctaSubheading = d?.ctaSubheading || "Free consultation — no commitment.";
  const ctaButton = d?.ctaButton || "Get Free Consultation";

  const hasCmsContent = cmsContent && cmsContent.trim() !== '' && cmsContent !== '<br>';

  return (
    <>
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .premium-page {
          background: #0A0E1A;
          color: #fff;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }

        .hero-premium {
          position: relative;
          padding: 8rem 2rem 6rem;
          background: radial-gradient(ellipse at top, #1e1b4b 0%, #0a0e1a 50%, #000000 100%);
          overflow: hidden;
        }
        .hero-orb-1 {
          position: absolute;
          top: 10%;
          right: 10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(60px);
          animation: glow-pulse 4s ease-in-out infinite;
        }
        .hero-orb-2 {
          position: absolute;
          bottom: 10%;
          left: 5%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(80px);
          animation: glow-pulse 6s ease-in-out infinite;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          animation: fadeInUp 0.8s ease-out;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(139, 92, 246, 0.15);
          border: 1px solid rgba(139, 92, 246, 0.3);
          padding: 8px 18px;
          border-radius: 999px;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }
        .hero-badge-dot {
          width: 8px;
          height: 8px;
          background: #8B5CF6;
          border-radius: 50%;
          box-shadow: 0 0 12px #8B5CF6;
        }
        .hero-badge-text {
          font-size: 12px;
          font-weight: 600;
          color: #C4B5FD;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .hero-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin: 0 0 1.5rem;
        }
        .hero-gradient-text {
          background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #06B6D4 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .hero-desc {
          font-size: 1.2rem;
          color: #A1A1AA;
          max-width: 600px;
          margin: 0 auto 2.5rem;
          line-height: 1.7;
        }
        .hero-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 4rem;
        }
        .btn-primary {
          background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
          color: #fff;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          box-shadow: 0 10px 40px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset;
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 50px rgba(139, 92, 246, 0.5), 0 0 0 1px rgba(255,255,255,0.2) inset;
        }
        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          color: #fff;
          padding: 16px 28px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 600px;
          margin: 0 auto;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .stat-value {
          font-size: 2.2rem;
          font-weight: 800;
          font-family: 'Plus Jakarta Sans', sans-serif;
          margin-bottom: 4px;
          letter-spacing: -0.02em;
        }
        .stat-1 { background: linear-gradient(135deg, #8B5CF6, #EC4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .stat-2 { background: linear-gradient(135deg, #EC4899, #06B6D4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .stat-3 { background: linear-gradient(135deg, #06B6D4, #8B5CF6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .stat-label {
          font-size: 11px;
          color: #71717A;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 500;
        }

        .section-premium {
          position: relative;
          padding: 6rem 2rem;
          background: #0A0E1A;
        }
        .section-premium-alt {
          background: linear-gradient(180deg, #0A0E1A 0%, #13111C 50%, #0A0E1A 100%);
        }
        .section-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          color: #A78BFA;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .section-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0 0 1rem;
        }
        .section-subtitle {
          font-size: 1.1rem;
          color: #A1A1AA;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .offers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .offer-card {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(236, 72, 153, 0.04) 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
        }
        .offer-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent);
        }
        .offer-card:hover {
          transform: translateY(-5px);
          border-color: rgba(139, 92, 246, 0.3);
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(236, 72, 153, 0.08) 100%);
          box-shadow: 0 20px 60px rgba(139, 92, 246, 0.15);
        }
        .offer-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #8B5CF6, #EC4899);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          box-shadow: 0 8px 25px rgba(139, 92, 246, 0.35);
        }
        .offer-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
        }
        .offer-desc {
          font-size: 14px;
          color: #A1A1AA;
          line-height: 1.7;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 14px;
        }
        .benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          padding: 1.2rem 1.4rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .benefit-item:hover {
          background: rgba(139, 92, 246, 0.08);
          border-color: rgba(139, 92, 246, 0.25);
          transform: translateX(4px);
        }
        .benefit-check {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #8B5CF6, #EC4899);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
        }
        .benefit-text {
          font-size: 15px;
          color: #E4E4E7;
          font-weight: 500;
          line-height: 1.5;
        }

        .faq-grid {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-width: 800px;
          margin: 0 auto;
        }
        .faq-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.5rem 1.75rem;
          transition: all 0.3s ease;
        }
        .faq-item:hover {
          border-color: rgba(139, 92, 246, 0.25);
          background: rgba(139, 92, 246, 0.05);
        }
        .faq-question {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.75rem;
        }
        .faq-answer {
          font-size: 15px;
          color: #A1A1AA;
          line-height: 1.7;
        }

        .cta-section {
          position: relative;
          padding: 6rem 2rem;
          background: linear-gradient(135deg, #1e1b4b 0%, #13111C 100%);
          overflow: hidden;
        }
        .cta-orb {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(80px);
        }
        .cta-content {
          position: relative;
          z-index: 2;
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }

        .cms-section {
          padding: 6rem 2rem;
          background: #0A0E1A;
          position: relative;
        }
        .cms-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }
        .cms-content {
          font-family: Inter, sans-serif;
          color: #A1A1AA;
          font-size: 16px;
          line-height: 1.8;
        }
        .cms-content h1,
        .cms-content h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
          margin: 3.5rem 0 1.5rem;
          position: relative;
          padding-left: 1.5rem;
          font-size: clamp(1.7rem, 3vw, 2.2rem);
          letter-spacing: -0.02em;
        }
        .cms-content h1::before,
        .cms-content h2::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.3em;
          bottom: 0.3em;
          width: 4px;
          background: linear-gradient(180deg, #8B5CF6, #EC4899);
          border-radius: 4px;
        }
        .cms-content h1:first-child,
        .cms-content h2:first-child { margin-top: 0; }

        .cms-content h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #fff;
          margin: 2.5rem 0 1rem;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .cms-content h3::before {
          content: '';
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #8B5CF6, #EC4899);
          border-radius: 10px;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: center;
          background-size: 18px;
        }

        .cms-content h4 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #C4B5FD;
          margin: 2rem 0 0.75rem;
        }

        .cms-content p {
          margin-bottom: 1.25rem;
          color: #A1A1AA;
          font-size: 16px;
          line-height: 1.85;
        }

        .cms-content strong {
          color: #fff;
          font-weight: 700;
          background: linear-gradient(120deg, rgba(139, 92, 246, 0.25) 0%, rgba(236, 72, 153, 0.25) 100%);
          background-repeat: no-repeat;
          background-size: 100% 30%;
          background-position: 0 90%;
          padding: 0 2px;
        }

        .cms-content ul,
        .cms-content ol {
          margin: 1.5rem 0 2rem;
          padding: 0;
          list-style: none;
        }
        .cms-content ul li {
          position: relative;
          padding: 16px 20px 16px 56px;
          margin-bottom: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          color: #E4E4E7;
          font-size: 15px;
          line-height: 1.6;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .cms-content ul li::before {
          content: '';
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #8B5CF6, #EC4899);
          border-radius: 50%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: center;
          background-size: 12px;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
        }
        .cms-content ul li:hover {
          transform: translateX(6px);
          border-color: rgba(139, 92, 246, 0.3);
          background: rgba(139, 92, 246, 0.08);
        }

        .cms-content ol { counter-reset: step; }
        .cms-content ol li {
          position: relative;
          padding: 20px 22px 20px 72px;
          margin-bottom: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          color: #E4E4E7;
          font-size: 15px;
          line-height: 1.6;
          counter-increment: step;
          transition: all 0.3s ease;
        }
        .cms-content ol li::before {
          content: counter(step);
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
          color: #fff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 16px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
        }

        .cms-content a {
          color: #A78BFA;
          text-decoration: none;
          font-weight: 600;
          border-bottom: 2px solid rgba(167, 139, 250, 0.3);
          transition: all 0.2s;
        }
        .cms-content a:hover { border-bottom-color: #A78BFA; }

        .cms-content blockquote {
          position: relative;
          margin: 2.5rem 0;
          padding: 2rem 2rem 2rem 3.5rem;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%);
          border-left: 4px solid #8B5CF6;
          border-radius: 0 16px 16px 0;
          font-size: 1.1rem;
          color: #E4E4E7;
          font-style: italic;
        }
        .cms-content blockquote::before {
          content: '"';
          position: absolute;
          left: 1rem;
          top: 0.5rem;
          font-size: 4rem;
          background: linear-gradient(135deg, #8B5CF6, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: Georgia, serif;
          line-height: 1;
          opacity: 0.6;
        }

        .cms-content hr {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent);
          margin: 3.5rem 0;
        }

        .cms-content img {
          max-width: 100%;
          height: auto;
          border-radius: 16px;
          margin: 2rem 0;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .cms-content > *:first-child { margin-top: 0 !important; }

        @media (max-width: 640px) {
          .hero-premium { padding: 5rem 1.25rem 4rem; }
          .section-premium { padding: 4rem 1.25rem; }
          .cms-section { padding: 4rem 1.25rem; }
          .hero-stats { grid-template-columns: repeat(3, 1fr); gap: 12px; }
          .stat-value { font-size: 1.5rem; }
        }
      `}</style>

      <div className="premium-page">
        <main>
          <section className="hero-premium">
            <div className="hero-orb-1"></div>
            <div className="hero-orb-2"></div>
            <div className="hero-content">
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
              <div className="hero-stats">
                <div>
                  <div className="stat-value stat-1">120+</div>
                  <div className="stat-label">Clients Ranked</div>
                </div>
                <div>
                  <div className="stat-value stat-2">4.9★</div>
                  <div className="stat-label">Google Rating</div>
                </div>
                <div>
                  <div className="stat-value stat-3">6yrs</div>
                  <div className="stat-label">Experience</div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-premium section-premium-alt">
            <div className="section-container">
              <div className="section-header">
                <span className="section-badge">
                  <Sparkles size={12} /> What We Offer
                </span>
                <h2 className="section-title">{offersHeading}</h2>
                <p className="section-subtitle">{offersSubheading}</p>
              </div>
              <div className="offers-grid">
                {offers.map((item, i) => (
                  <div key={i} className="offer-card">
                    <div className="offer-icon">
                      <CheckCircle size={24} color="#fff" />
                    </div>
                    <h3 className="offer-title">{item.title}</h3>
                    <p className="offer-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {hasCmsContent && (
            <section className="cms-section">
              <div className="cms-wrapper">
                <div className="section-header">
                  <span className="section-badge">
                    <TrendingUp size={12} /> Deep Dive
                  </span>
                  <h2 className="section-title">Everything you need to know</h2>
                  <p className="section-subtitle">Detailed insights into our proven methodology</p>
                </div>
                <div
                  className="cms-content"
                  dangerouslySetInnerHTML={{ __html: cmsContent! }}
                />
              </div>
            </section>
          )}

          <section className="section-premium section-premium-alt">
            <div className="section-container">
              <div className="section-header">
                <span className="section-badge">
                  <Star size={12} /> Why Us
                </span>
                <h2 className="section-title">{benefitsHeading}</h2>
              </div>
              <div className="benefits-grid">
                {benefits.map((b, i) => (
                  <div key={i} className="benefit-item">
                    <div className="benefit-check">
                      <CheckCircle size={14} color="#fff" strokeWidth={3} />
                    </div>
                    <span className="benefit-text">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

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