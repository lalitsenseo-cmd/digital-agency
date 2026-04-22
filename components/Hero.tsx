import { ArrowRight, CheckCircle, Sparkles, Phone, Award, Star, Shield, Zap } from "lucide-react";
import { getSection } from "@/lib/get-section";

export default async function Hero() {
  const d = await getSection("home-hero");

  const badge = d?.badge || "Faridabad's #1 Digital Agency";
  const h1 = d?.heading_part1 || "Grow Your Business With";
  const hHl = d?.heading_highlight || "Digital Marketing";
  const h2 = d?.heading_part2 || "That Works";
  const subheading = d?.subheading || "SEO, Google Ads, Social Media, Website Development & Python Automation — complete digital solutions for Indian businesses.";
  const features: string[] = d?.features || ["Google Certified Agency", "100% Transparent Reporting", "Dedicated Account Manager"];
  const primaryText = d?.primary_cta_text || "Get Free Consultation";
  const primaryLink = d?.primary_cta_link || "/contact";
  const secondaryText = d?.secondary_cta_text || "Our Services";
  const secondaryLink = d?.secondary_cta_link || "/seo-services";
  const stats: { number: string; label: string; color: string }[] = d?.stats || [
    { number: "120+", label: "Happy Clients", color: "orange" },
    { number: "3×", label: "Average ROI", color: "orange" },
    { number: "₹2Cr+", label: "Ad Spend Managed", color: "orange" },
    { number: "98%", label: "Client Retention", color: "orange" },
  ];

  return (
    <>
      <style>{`
        @keyframes glow-pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

        .hero-premium {
          position: relative;
          padding: 9rem 2rem 5rem;
          background: radial-gradient(ellipse at top, #1c1410 0%, #0a0a0a 50%, #000000 100%);
          overflow: hidden;
        }
        .hero-orb-1 {
          position: absolute; top: 10%; right: 10%; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.35) 0%, transparent 70%);
          border-radius: 50%; filter: blur(80px);
          animation: glow-pulse 4s ease-in-out infinite;
          pointer-events: none;
        }
        .hero-orb-2 {
          position: absolute; bottom: 10%; left: 5%; width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(234, 88, 12, 0.25) 0%, transparent 70%);
          border-radius: 50%; filter: blur(100px);
          animation: glow-pulse 6s ease-in-out infinite;
          pointer-events: none;
        }

        .hero-grid {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 4rem; align-items: center;
        }
        .hero-left { animation: fadeInUp 0.8s ease-out; }
        .hero-right { animation: fadeInUp 0.8s ease-out 0.2s both; }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(249, 115, 22, 0.15);
          border: 1px solid rgba(249, 115, 22, 0.3);
          padding: 8px 18px; border-radius: 999px;
          margin-bottom: 1.75rem;
          backdrop-filter: blur(10px);
        }
        .hero-badge-dot {
          width: 8px; height: 8px; background: #F97316;
          border-radius: 50%; box-shadow: 0 0 12px #F97316;
        }
        .hero-badge-text {
          font-size: 12px; font-weight: 600; color: #FDBA74;
          letter-spacing: 1.5px; text-transform: uppercase;
        }

        .hero-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2.2rem, 4.5vw, 3.75rem);
          font-weight: 800; color: #fff; line-height: 1.1;
          letter-spacing: -0.03em; margin: 0 0 1.5rem;
        }
        .hero-gradient-text {
          background: linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FED7AA 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .hero-desc {
          font-size: 1.15rem; color: #A3A3A3;
          line-height: 1.7; margin-bottom: 2rem;
        }

        .hero-features {
          display: flex; flex-direction: column; gap: 12px;
          margin-bottom: 2rem;
        }
        .hero-feature-item {
          display: flex; align-items: center; gap: 12px;
        }
        .hero-feature-icon {
          width: 22px; height: 22px;
          background: linear-gradient(135deg, #F97316, #EA580C);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
        }
        .hero-feature-text {
          font-size: 14px; color: #E5E5E5; font-weight: 500;
        }

        .hero-buttons {
          display: flex; flex-wrap: wrap; gap: 12px;
          margin-bottom: 2.5rem;
        }
        .btn-primary {
          background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
          color: #fff; padding: 16px 30px; border-radius: 12px;
          font-weight: 700; font-size: 15px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: inline-flex; align-items: center; gap: 10px;
          text-decoration: none;
          box-shadow: 0 10px 40px rgba(249, 115, 22, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset;
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 50px rgba(249, 115, 22, 0.6), 0 0 0 1px rgba(255,255,255,0.2) inset;
        }
        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          color: #fff; padding: 16px 26px; border-radius: 12px;
          font-weight: 600; font-size: 15px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: inline-flex; align-items: center; gap: 10px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .btn-secondary:hover {
          background: rgba(249, 115, 22, 0.08);
          border-color: rgba(249, 115, 22, 0.3);
        }

        .trust-row {
          display: flex; gap: 14px; flex-wrap: wrap;
        }
        .trust-pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(249, 115, 22, 0.2);
          padding: 8px 14px; border-radius: 999px;
          font-size: 12px; font-weight: 600; color: #C4C4C4;
          backdrop-filter: blur(10px);
        }
        .trust-pill-icon {
          color: #FB923C;
        }

        .stats-wrapper {
          position: relative;
          width: 100%;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .founder-bg-image {
          position: absolute;
          top: 25%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 110%;
          height: auto;
          max-height: 600px;
          object-fit: contain;
          opacity: 0.5;
          z-index: 1;
          filter: grayscale(10%) contrast(1.15);
          -webkit-mask-image: radial-gradient(ellipse at center, black 55%, transparent 85%);
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 75%);
          pointer-events: none;
        }

        .stats-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          width: 100%;
        }
        .stat-card {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(234, 88, 12, 0.04) 100%);
          border: 1px solid rgba(249, 115, 22, 0.2);
          border-radius: 20px;
          padding: 2rem 1.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
        }
        .stat-card::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.6), transparent);
        }
        .stat-card:hover {
          transform: translateY(-6px);
          border-color: rgba(249, 115, 22, 0.4);
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(234, 88, 12, 0.08) 100%);
          box-shadow: 0 20px 60px rgba(249, 115, 22, 0.25);
        }
        .stat-number {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 2.5rem; font-weight: 800;
          background: linear-gradient(135deg, #F97316 0%, #FB923C 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
          line-height: 1;
        }
        .stat-label {
          font-size: 12px; color: #A3A3A3;
          font-weight: 500; letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .hero-premium { padding: 7rem 1.25rem 4rem; }
          .stat-card { padding: 1.5rem 1rem; }
          .stat-number { font-size: 2rem; }
        }
      `}</style>

      <section className="hero-premium">
        <div className="hero-orb-1"></div>
        <div className="hero-orb-2"></div>

        <div className="hero-grid">
          
          <div className="hero-left">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              <span className="hero-badge-text">{badge}</span>
            </div>

            <h1 className="hero-title">
              {h1} <span className="hero-gradient-text">{hHl}</span> {h2}
            </h1>

            <p className="hero-desc">{subheading}</p>

            <div className="hero-features">
              {features.map(f => (
                <div key={f} className="hero-feature-item">
                  <div className="hero-feature-icon">
                    <CheckCircle size={12} color="#fff" strokeWidth={3} />
                  </div>
                  <span className="hero-feature-text">{f}</span>
                </div>
              ))}
            </div>

            <div className="hero-buttons">
              <a href={primaryLink} className="btn-primary">
                {primaryText} <ArrowRight size={16} />
              </a>
              <a href={secondaryLink} className="btn-secondary">
                <Sparkles size={14} /> {secondaryText}
              </a>
            </div>

            <div className="trust-row">
              <span className="trust-pill">
                <Award size={12} className="trust-pill-icon" /> Google Partner
              </span>
              <span className="trust-pill">
                <Star size={12} className="trust-pill-icon" /> 5-Star Rated
              </span>
              <span className="trust-pill">
                <Shield size={12} className="trust-pill-icon" /> White-Hat
              </span>
            </div>
          </div>

          <div className="hero-right">
            <div className="stats-wrapper">
              <img src="/founder.png" alt="Founder - Clickbriz" className="founder-bg-image" />
              <div className="stats-grid">
                {stats.map((s, i) => (
                  <div key={i} className="stat-card">
                    <div className="stat-number">{s.number}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}