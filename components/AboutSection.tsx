
const FUNNEL_LAYERS = [
  {
    label: "Focused Marketing",
    items: ["Data & AI insights", "Real-time optimization", "Performance tracking", "ROI-driven decisions"],
    bg: "linear-gradient(135deg, #1e3a8a, #3730a3)",  // ← blue
    width: "100%",
  },
  {
    label: "Growth Strategies",
    items: ["Audience-based targeting", "Platform-specific execution", "Consistent brand messaging", "Scalable growth"],
    bg: "linear-gradient(135deg, #1e40af, #1e3a8a)",  // ← darker blue
    width: "80%",
  },
  {
    label: "Higher ROI",
    items: ["Traffic acquisition", "Lead nurturing", "Conversion optimization", "Retention & growth"],
    bg: "linear-gradient(135deg, #3730a3, #6d28d9)",  // ← purple
    width: "60%",
  },
];

const FEATURES = [
  "Performance-Focused Digital Marketing",
  "Full-Funnel Solutions for Higher ROI",
  "Personalized, Multi-Platform Growth Strategies",
];

export default function AboutSection() {
  return (
    <>
      <style>{`
        .about-section {
          position: relative;
          padding: 6rem 2rem;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);
          overflow: hidden;
        }
        .about-section::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 2px;
          background: linear-gradient(90deg, transparent, #1e3a8a, transparent);
        }
        .about-orb {
          position: absolute;
          top: 20%; left: -10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(30,58,138,0.1) 0%, transparent 70%);
          border-radius: 50%; filter: blur(80px);
          pointer-events: none;
        }
        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .about-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          padding: 6px 16px; border-radius: 999px;
          font-size: 11px; font-weight: 700; color: #1e3a8a;
          letter-spacing: 1.5px; text-transform: uppercase;
          margin-bottom: 1.25rem;
        }
        .about-heading {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 900; color: #0f172a;
          line-height: 1.1; letter-spacing: -0.03em;
          margin: 0 0 1.25rem;
        }
        .about-heading span {
          background: linear-gradient(135deg, #1e3a8a, #93c5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .about-desc {
          color: #64748b; font-size: 15px;
          line-height: 1.75; margin-bottom: 1.75rem;
        }
        .about-features-title {
          color: #0f172a; font-size: 15px;
          font-weight: 700; margin-bottom: 1rem;
        }
        .about-feature-item {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 12px;
        }
        .about-feature-icon {
          width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(30,58,138,0.4);
        }
        .about-feature-text {
          color: #334155; font-size: 14px; font-weight: 500;
        }
        .about-conclusion {
          color: #64748b; font-size: 14px;
          line-height: 1.75; margin-top: 1.5rem;
          padding: 16px 20px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 12px;
          border-left: 3px solid #1e3a8a;
        }
        .funnel-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .funnel-layer {
          border-radius: 8px;
          padding: 16px 20px;
          position: relative;
          transition: all 0.3s ease;
          cursor: default;
        }
        .funnel-layer:hover {
          transform: scaleX(1.02);
          box-shadow: 0 8px 24px rgba(30,58,138,0.3);
        }
        .funnel-layer-label {
          font-size: 11px; font-weight: 800;
          color: rgba(255,255,255,0.7);
          text-transform: uppercase; letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .funnel-items {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px 16px;
        }
        .funnel-item {
          font-size: 11px; color: rgba(255,255,255,0.9);
          font-weight: 500;
        }
        .funnel-arrow {
          width: 0; height: 0;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          border-top: 12px solid rgba(30,58,138,0.3);
        }
        @media (max-width: 768px) {
          .about-container { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>

      <section className="about-section">
        <div className="about-orb" />
        <div className="about-container">

          {/* Left — Text */}
          <div>
            <span className="about-badge">✦ About Us</span>
            <h2 className="about-heading">
              Clickbriz - Growth Driven Digital Marketing Agency
            </h2>
            <p className="about-desc">
              Clickbriz is a results-driven digital marketing agency delivering measurable outcomes through data-driven strategies. With full-funnel digital marketing audits, we help you find growth gaps and key opportunities to maximise conversions across all touchpoints.
            </p>

            <p className="about-features-title">Our Strategic Approach Includes:</p>

            {FEATURES.map((f) => (
              <div key={f} className="about-feature-item">
                <div className="about-feature-icon">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="about-feature-text">{f}</span>
              </div>
            ))}

            <p className="about-conclusion">
              Together, these approaches create a powerful framework for long-term success. Our digital marketing services use deep insights and proven methodologies to guide your brand toward the right audience, better visibility, and stronger business performance.
            </p>
          </div>

          {/* Right — Funnel */}
          <div className="funnel-wrapper">
            {FUNNEL_LAYERS.map((layer, i) => (
              <>
                <div
                  key={layer.label}
                  className="funnel-layer"
                  style={{
                    background: layer.bg,
                    width: layer.width,
                  }}
                >
                  <div className="funnel-layer-label">{layer.label}</div>
                  <div className="funnel-items">
                    {layer.items.map((item) => (
                      <div key={item} className="funnel-item">• {item}</div>
                    ))}
                  </div>
                </div>
                {i < FUNNEL_LAYERS.length - 1 && (
                  <div className="funnel-arrow" key={`arrow-${i}`} />
                )}
              </>
            ))}

            {/* Bottom label */}
<div style={{
  marginTop: 16, textAlign: "center",
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  borderRadius: 12, padding: "12px 24px",
}}>
  <div style={{ color: "#1e3a8a", fontWeight: 800, fontSize: 18 }}>Higher ROI</div>
  <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>The outcome of every strategy</div>
</div>
          </div>

        </div>
      </section>
    </>
  );
}