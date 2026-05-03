const INDUSTRIES = [
  { icon: "🛒", label: "Ecommerce" },
  { icon: "🏠", label: "Real Estate" },
  { icon: "🏥", label: "Healthcare" },
  { icon: "👗", label: "Fashion & Apparel" },
  { icon: "💎", label: "Jewelry & Luxury Brands" },
  { icon: "🚗", label: "Automotive" },
  { icon: "🏭", label: "B2B Brand" },
  { icon: "🔧", label: "Home Services" },
  { icon: "📦", label: "Consumer Goods" },
  { icon: "🎓", label: "Education & EdTech" },
  { icon: "⚙️", label: "Manufacturing" },
  { icon: "🛍️", label: "D2C Brands" },
  { icon: "💻", label: "SaaS & Technology" },
  { icon: "🍽️", label: "Food & Beverage" },
  { icon: "💰", label: "Finance" },
];

export default function Industries() {
  return (
    <>
      <style suppressHydrationWarning>{`
        .ind-section {
          padding: 80px 24px;
  background: linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%);
          position: relative;
          overflow: hidden;
        }
        .ind-section::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 2px;
          background: linear-gradient(90deg, transparent, #1e3a8a, transparent);
        }
        .ind-orb {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 700px; height: 400px;
          background: radial-gradient(ellipse, rgba(30,58,138,0.06) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .ind-container {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .ind-header {
          text-align: center;
          margin-bottom: 52px;
        }
        .ind-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          padding: 6px 16px; border-radius: 999px;
          font-size: 11px; font-weight: 800; color: #1e3a8a;;
          letter-spacing: 1.8px; text-transform: uppercase;
          margin-bottom: 16px;
        }
        .ind-heading {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 900; color: #0f172a;
          letter-spacing: -0.03em; line-height: 1.1;
          margin-bottom: 14px;
        }
        .ind-heading span {
          background: linear-gradient(135deg, #1e3a8a, #93c5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ind-sub {
          color: #64748b; font-size: 15px;
          max-width: 680px; margin: 0 auto;
          line-height: 1.7;
        }
        .ind-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }
        .ind-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          padding: 12px 22px;
          font-size: 14px;
          font-weight: 600;
          color: #334155;
          cursor: default;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .ind-tag::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(30,58,138,0.1), rgba(55,48,163,0.05));
          opacity: 0;
          transition: opacity 0.25s;
          border-radius: 999px;
        }
        .ind-tag:hover {
          border-color: rgba(30,58,138,0.4);
          color: #F5F5F5;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(30,58,138,0.15);
        }
        .ind-tag:hover::before { opacity: 1; }
        .ind-icon {
          font-size: 18px;
          line-height: 1;
          position: relative;
          z-index: 1;
          transition: transform 0.25s;
        }
        .ind-tag:hover .ind-icon { transform: scale(1.2); }
        .ind-text {
          position: relative;
          z-index: 1;
          white-space: nowrap;
        }
        @media (max-width: 640px) {
          .ind-section { padding: 52px 16px; }
          .ind-tag { padding: 10px 16px; font-size: 13px; }
        }
      `}</style>

      <section className="ind-section">
        <div className="ind-orb" />
        <div className="ind-container">

          <div className="ind-header">
            <div className="ind-badge">✦ Industries We Serve</div>
            <h2 className="ind-heading">
              Industry-Focused <span>Digital Expertise</span>
            </h2>
            <p className="ind-sub">
              We understand the unique challenges businesses face across industries. Using data, market insights, and user behavior, we build campaigns that increase visibility, attract high-quality leads, and accelerate digital growth.
            </p>
          </div>

          <div className="ind-grid">
            {INDUSTRIES.map((ind) => (
              <div key={ind.label} className="ind-tag">
                <span className="ind-icon">{ind.icon}</span>
                <span className="ind-text">{ind.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}