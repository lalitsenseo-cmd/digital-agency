import { ArrowRight } from "lucide-react";
import { getSection } from "@/lib/get-section";

export default async function Hero() {
  const d = await getSection("home-hero");

  const tagline       = d?.tagline          || "We Help Your Business Get Found with AI-Driven Marketing";
  const h1            = d?.heading          || "Drive Traffic, Leads & Revenue with AI-Powered Digital Marketing Agency";
  const subheading    = d?.subheading       || "To succeed in business, you first need to succeed in search results. Our digital marketing services connect you with your customers' journey from end to end — from discovery to retention.";
  const primaryText   = d?.primary_cta_text   || "Get Free Consultation";
  const primaryLink   = d?.primary_cta_link   || "/contact";
  const secondaryText = d?.secondary_cta_text || "Our Services";
  const secondaryLink = d?.secondary_cta_link || "/seo-services";
  const heroImage     = d?.hero_image         || "/hero-person.png";

  return (
    <>
      <style>{`
        @keyframes floatImg  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes floatS1   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)}  }
        @keyframes floatS2   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)}  }
        @keyframes popIn     { from{opacity:0;transform:scale(0.75) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes fadeInL   { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeInR   { from{opacity:0;transform:translateX(28px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes dotBlink  { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes rotateDash{ from{stroke-dashoffset:0} to{stroke-dashoffset:-200} }

        /* ── HERO — exact viewport fit ── */
        .tm {
          position: relative;
          width: 100%;
          height: calc(100vh - 138px);
          min-height: 580px;
          overflow: hidden;

          /* Rich dark-orange gradient like TechMagnate but in ClickBriz brand */
          background:
            radial-gradient(ellipse at 70% 50%, rgba(109,40,217,0.3) 0%, transparent 55%),
            radial-gradient(ellipse at 20% 80%, rgba(30,58,138,0.2) 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #3730a3 70%, #1e1b4b 100%);
        }

        /* Dot matrix — right half only */
        .tm-dotmatrix {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1.2px, transparent 1.2px);
          background-size: 24px 24px;
          mask-image: linear-gradient(to right, transparent 45%, rgba(0,0,0,0.7) 100%);
        }

        /* ── MAIN GRID ── */
        .tm-grid {
          position: relative; z-index: 2;
          max-width: 1240px; margin: 0 auto;
          height: 100%;
          display: grid;
          grid-template-columns: 55% 45%;
          align-items: center;
          padding: 0 48px;
        }

        /* ── LEFT ── */
        .tm-left { animation: fadeInL 0.75s ease-out; padding-right: 32px; }

        .tm-tagline {
          font-size: 14px; font-weight: 600; color: #93c5fd;
          margin-bottom: 1rem;
          display: flex; align-items: center; gap: 8px;
        }
        .tm-tagline-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #1e3a8a; box-shadow: 0 0 8px #93c5fd;
          flex-shrink: 0;
          animation: dotBlink 2s ease-in-out infinite;
        }

        .tm-h1 {
          font-size: clamp(1.9rem, 3vw, 2.9rem);
          font-weight: 900; color: #fff;
          line-height: 1.12; letter-spacing: -0.025em;
          margin: 0 0 1.25rem;
        }

        .tm-sub {
          font-size: 0.95rem; color: rgba(255,255,255,0.85);
          line-height: 1.78; margin-bottom: 2rem;
          max-width: 520px;
        }

        .tm-btns { display: flex; gap: 14px; flex-wrap: wrap; }
        .tm-btn-p {
          display: inline-flex; align-items: center; gap: 9px;
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          color: #fff; padding: 13px 26px; border-radius: 999px;
          font-size: 14px; font-weight: 700; text-decoration: none;
          box-shadow: 0 8px 28px rgba(30,58,138,0.45);
          transition: all 0.3s; white-space: nowrap;
        }
        .tm-btn-p:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(30,58,138,0.6); }
        .tm-btn-s {
          display: inline-flex; align-items: center; gap: 9px;
          background: transparent; color: #fff;
          padding: 13px 26px; border-radius: 999px;
          font-size: 14px; font-weight: 600; text-decoration: none;
          border: 1.5px solid rgba(255,255,255,0.5);
          transition: all 0.3s; white-space: nowrap;
        }
        .tm-btn-s:hover { border-color: rgba(30,58,138,0.5); background: rgba(30,58,138,0.07); color: #93c5fd; }

        /* ── RIGHT ── */
        .tm-right {
          position: relative;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          animation: fadeInR 0.75s ease-out 0.15s both;
          overflow: hidden;
        }

        /* Dashed circle behind person */
        .tm-circle-svg {
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 420px; height: 420px;
          opacity: 0.35;
        }
        .tm-circle-dash {
          stroke-dasharray: 8 6;
          animation: rotateDash 20s linear infinite;
          transform-origin: center;
          transform-box: fill-box;
        }

        /* Glow blob */
        .tm-glow {
          position: absolute;
          bottom: -40px; left: 50%;
          transform: translateX(-50%);
          width: 360px; height: 360px; border-radius: 50%;
          background: radial-gradient(circle, rgba(30,58,138,0.28) 0%, transparent 65%);
          filter: blur(50px);
        }

        /* Person image */
        .tm-person-img {
          position: relative; z-index: 3;
          height: 88%;
          max-height: 500px;
          width: auto;
          object-fit: contain;
          object-position: bottom center;
          filter: drop-shadow(0 20px 50px rgba(30,58,138,0.25));
          animation: floatImg 7s ease-in-out infinite;
          display: block;
        }

        /* Placeholder when no image */
        .tm-person-placeholder {
          position: relative; z-index: 3;
          height: 75%;
          max-height: 420px;
          width: 260px;
          background: rgba(30,58,138,0.06);
          border: 2px dashed rgba(30,58,138,0.2);
          border-radius: 20px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 12px; color: rgba(30,58,138,0.4);
          font-size: 13px; font-weight: 600;
          text-align: center; padding: 20px;
        }

        /* ── STAT BUBBLES — positioned relative to right col ── */
        .tm-stat {
          position: absolute;
          background: rgba(255,255,255,0.97);
          border-radius: 14px;
          padding: 14px 18px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.15);
          animation: popIn 0.65s ease-out both;
          z-index: 10;
          min-width: 130px;
        }
        .tm-stat-val {
          font-size: 22px; font-weight: 900; line-height: 1;
          margin-bottom: 4px;
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .tm-stat-lbl {
          font-size: 11px; font-weight: 600; color: #555; line-height: 1.4;
        }

        .tm-stat-1 {
          top: 18%; right: 8px;
          animation-delay: 0.6s;
          animation: popIn 0.65s ease-out 0.6s both, floatS1 5s ease-in-out 1.2s infinite;
        }
        .tm-stat-2 {
          top: 45%; right: 4px;
          animation-delay: 0.85s;
          animation: popIn 0.65s ease-out 0.85s both, floatS2 6s ease-in-out 1.5s infinite;
        }
        .tm-stat-3 {
          bottom: 12%; left: 12px;
          animation-delay: 1.05s;
          animation: popIn 0.65s ease-out 1.05s both, floatS1 7s ease-in-out 1.8s infinite;
        }

        /* ── MOBILE ── */
        @media (max-width: 860px) {
          .tm { height: auto; padding-bottom: 48px; }
          .tm-grid {
            grid-template-columns: 1fr;
            padding: 48px 24px 0;
            gap: 0; align-items: start;
          }
          .tm-left { padding-right: 0; }
          .tm-btns { flex-direction: column; align-items: flex-start; }
          .tm-right { height: 320px; margin-top: 32px; }
          .tm-person-img { height: 300px; }
          .tm-stat-1 { right: 0; }
          .tm-stat-2 { right: 0; }
          .tm-stat-3 { left: 0; bottom: 0; }
        }
      `}</style>

      <section className="tm">
        <div className="tm-dotmatrix" />

        <div className="tm-grid">

          {/* LEFT */}
          <div className="tm-left">
            <div className="tm-tagline">
              <span className="tm-tagline-dot" />
              {tagline}
            </div>
            <h1 className="tm-h1">{h1}</h1>
            <p className="tm-sub">{subheading}</p>
            <div className="tm-btns">
              <a href={primaryLink}   className="tm-btn-p">{primaryText}   <ArrowRight size={15}/></a>
              <a href={secondaryLink} className="tm-btn-s">{secondaryText} <ArrowRight size={15}/></a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="tm-right">
            <div className="tm-glow" />

            {/* Dashed orbit circle */}
            <svg className="tm-circle-svg" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="tm-circle-dash" cx="210" cy="210" r="200" stroke="#1e3a8a" strokeWidth="1.5"/>
              <circle cx="210" cy="210" r="155" stroke="rgba(30,58,138,0.2)" strokeWidth="1"/>
            </svg>

            {/* Person image — add /public/hero-person.png (background removed) */}
            <img
              src={heroImage}
              alt="Digital Marketing Expert"
              className="tm-person-img"
            />

            {/* Stat bubbles — positioned inside right col */}
            <div className="tm-stat tm-stat-1">
              <div className="tm-stat-val">+312%</div>
              <div className="tm-stat-lbl">Avg. Growth<br/>in Traffic</div>
            </div>
            <div className="tm-stat tm-stat-2">
              <div className="tm-stat-val">9× ROAS</div>
              <div className="tm-stat-lbl">Avg. Return<br/>on Ad Spend</div>
            </div>
            <div className="tm-stat tm-stat-3">
              <div className="tm-stat-val">250+</div>
              <div className="tm-stat-lbl">Clients Served<br/>Across India</div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}