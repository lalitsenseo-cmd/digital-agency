"use client";

const BRANDS_ROW1 = [
  "Rahul Enterprises", "TechSphere India", "BuildRight Infra",
  "FashionHub", "EduEdge Coaching", "DataWorks Solutions",
  "GreenLeaf Organics", "SwiftLogix", "NovaMed Clinics",
];

const BRANDS_ROW2 = [
  "UrbanNest Realty", "PeakFit Studio", "CloudSync Tech",
  "BrightMinds Academy", "TasteKraft Foods", "FinEdge Advisors",
  "StyleCraft Boutique", "AutoPro Services", "DigiVision Media",
];

export default function TrustedBrands() {
  return (
    <>
      <style>{`
        .tb-section {
          padding: 80px 0;
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }
        .tb-section::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 2px;
          background: linear-gradient(90deg, transparent, #1e3a8a, transparent);
        }
        .tb-header {
          text-align: center;
          padding: 0 24px;
          margin-bottom: 52px;
        }
        .tb-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          padding: 6px 16px; border-radius: 999px;
          font-size: 11px; font-weight: 800; color: #1e3a8a;
          letter-spacing: 1.8px; text-transform: uppercase;
          margin-bottom: 16px;
        }
        .tb-heading {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 900; color: #0f172a;
          letter-spacing: -0.03em; line-height: 1.1;
          margin-bottom: 14px;
        }
        .tb-heading span {
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .tb-sub {
          color: #64748b; font-size: 15px;
          max-width: 560px; margin: 0 auto;
          line-height: 1.65;
        }

        /* MARQUEE */
        .tb-marquee-wrap {
          position: relative;
          overflow: hidden;
          margin-bottom: 16px;
        }
        .tb-marquee-wrap::before,
        .tb-marquee-wrap::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 140px;
          z-index: 2;
          pointer-events: none;
        }
        .tb-marquee-wrap::before {
          left: 0;
          background: linear-gradient(90deg, #ffffff, transparent);
        }
        .tb-marquee-wrap::after {
          right: 0;
          background: linear-gradient(-90deg, #ffffff, transparent);
        }

        .tb-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: scroll-left 28s linear infinite;
        }
        .tb-track-rev {
          animation: scroll-right 32s linear infinite;
        }
        .tb-track:hover,
        .tb-track-rev:hover {
          animation-play-state: paused;
        }

        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        .tb-logo-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 18px 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 180px;
          height: 72px;
          transition: all 0.3s ease;
          cursor: default;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        .tb-logo-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #1e3a8a, #3730a3);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .tb-logo-card:hover {
          border-color: #93c5fd;
          background: #eff6ff;
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(30,58,138,0.12);
        }
        .tb-logo-card:hover::before { opacity: 1; }

        .tb-logo-text {
          font-size: 14px;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 0.3px;
          white-space: nowrap;
          transition: color 0.3s;
        }
        .tb-logo-card:hover .tb-logo-text {
          color: #1e3a8a;
        }
        .tb-logo-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #93c5fd;
          margin-right: 8px;
          flex-shrink: 0;
        }

        /* BOTTOM TRUST LINE */
        .tb-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 40px;
          padding: 0 24px;
        }
        .tb-trust-line {
          flex: 1;
          max-width: 200px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #bfdbfe);
        }
        .tb-trust-line.rev {
          background: linear-gradient(-90deg, transparent, #bfdbfe);
        }
        .tb-trust-text {
          color: #64748b;
          font-size: 13px;
          font-weight: 600;
          text-align: center;
          letter-spacing: 0.3px;
        }
        .tb-trust-text span { color: #1e3a8a; }
      `}</style>

      <section className="tb-section">
        <div className="tb-header">
          <div className="tb-badge">✦ Our Clients</div>
          <h2 className="tb-heading">
            Trusted by <span>50+ Businesses</span>
          </h2>
          <p className="tb-sub">
            From local startups to established brands — Clickbriz helps businesses across India grow online with proven digital strategies.
          </p>
        </div>

        {/* Row 1 — Left scroll */}
        <div className="tb-marquee-wrap" style={{ marginBottom: 16 }}>
          <div className="tb-track">
            {[...BRANDS_ROW1, ...BRANDS_ROW1].map((brand, i) => (
              <div key={i} className="tb-logo-card">
                <div className="tb-logo-dot" />
                <span className="tb-logo-text">{brand}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — Right scroll */}
        <div className="tb-marquee-wrap">
          <div className="tb-track tb-track-rev">
            {[...BRANDS_ROW2, ...BRANDS_ROW2].map((brand, i) => (
              <div key={i} className="tb-logo-card">
                <div className="tb-logo-dot" />
                <span className="tb-logo-text">{brand}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom trust line */}
        <div className="tb-trust">
          <div className="tb-trust-line" />
          <p className="tb-trust-text">
            <span>50+</span> businesses trust Clickbriz for their digital growth
          </p>
          <div className="tb-trust-line rev" />
        </div>
      </section>
    </>
  );
}