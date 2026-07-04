import { ArrowRight } from "lucide-react";
import { getSection } from "@/lib/get-section";

export default async function Hero() {
  const d = await getSection("home-hero");

  const tagline       = d?.tagline            || "We Help Your Business Get Found with AI-Driven Marketing";
  const h1            = d?.heading            || "Drive Traffic, Leads & Revenue with AI-Powered Digital Marketing Agency";
  const subheading    = d?.subheading         || "AI-powered SEO, Local SEO, Global SEO, LLM SEO, Google Ads, Social Media, Website Development and Python Automation - integrated digital solutions designed to accelerate growth, visibility and conversions.";
  const primaryText   = d?.primary_cta_text   || "Get Free Consultation";
  const primaryLink   = d?.primary_cta_link   || "/contact";
  const secondaryText = d?.secondary_cta_text || "Our Services";
  const secondaryLink = d?.secondary_cta_link || "/seo-services";

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes fadeInL  { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeInR  { from{opacity:0;transform:translateX(32px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes dotBlink { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes popIn    { from{opacity:0;transform:scale(0.8) translateY(14px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes floatUp  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }

        .tm {
          position: relative;
          width: 100%;
          height: calc(100vh - 138px);
          min-height: 600px;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 70% 50%, rgba(109,40,217,0.35) 0%, transparent 55%),
            radial-gradient(ellipse at 15% 80%, rgba(30,58,138,0.25) 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #3730a3 70%, #1e1b4b 100%);
        }

        /* ── VIDEO ── */
        .tm-video-wrap {
          position: absolute;
          top: 0; right: 0;
          width: 100%; height: 100%;
          z-index: 1; overflow: hidden;
          animation: fadeInR 1s ease-out 0.2s both;
        }
        .tm-video-wrap video {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center center;
          display: block;
        }
.tm-vb-left {
  position:absolute;inset:0;z-index:2;
  background:linear-gradient(to right,
    rgba(15,23,42,0.88) 0%,
    rgba(30,58,138,0.72) 20%,
    rgba(30,58,138,0.28) 42%,
    rgba(30,58,138,0.06) 60%,
    transparent 72%
  );
}
        .tm-vb-top {
          position:absolute;inset:0;z-index:2;
          background:linear-gradient(to bottom,rgba(15,23,42,0.5) 0%,transparent 22%);
        }
        .tm-vb-bottom {
          position:absolute;inset:0;z-index:2;
          background:linear-gradient(to top,rgba(30,27,75,0.55) 0%,rgba(30,27,75,0.15) 22%,transparent 45%);
        }

        /* Dot matrix */
        .tm-dots {
          position:absolute;inset:0;pointer-events:none;z-index:2;
          background-image:radial-gradient(circle,rgba(255,255,255,0.12) 1.2px,transparent 1.2px);
          background-size:24px 24px;
          mask-image:linear-gradient(to right,transparent 42%,rgba(0,0,0,0.55) 100%);
        }

        /* ── GRID ── */
        .tm-grid {
          position: relative; z-index: 5;
          width: 100%; max-width: 1240px;
          margin: 0 auto; height: 100%;
          display: grid;
          grid-template-columns: 60% 45%;
          align-items: center;
          padding: 90px 48px 0 20px;   /* ← top padding se tagline neeche aayegi */
        }

        /* ── LEFT ── */
        .tm-left { padding-right: 36px; animation: fadeInL 0.75s ease-out; }

        .tm-tagline {
          font-size: 13.5px; font-weight: 600; color: #93c5fd;
          margin-bottom: 1rem;
          display: flex; align-items: center; gap: 8px;
        }
        .tm-tagline-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #1e3a8a; box-shadow: 0 0 8px #93c5fd;
          flex-shrink: 0; animation: dotBlink 2s ease-in-out infinite;
        }
        .tm-h1 {
          font-size: clamp(1.85rem, 3vw, 2.85rem);
          font-weight: 900; color: #fff;
          line-height: 1.12; letter-spacing: -0.025em;
          margin: 0 0 1.1rem;
        }
        .tm-h1 span {
          background: linear-gradient(90deg, #60a5fa, #a78bfa, #60a5fa);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmer 3s linear infinite;
        }
.tm-sub {
  font-size: 0.88rem; color: rgba(255,255,255,0.82);
  line-height: 1.75; margin-bottom: 1.8rem; max-width: 480px;
  position: relative; z-index: 10;
}
        .tm-btns { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 1.8rem; }
        .tm-btn-p {
          display: inline-flex; align-items: center; gap: 9px;
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          color: #fff; padding: 13px 26px; border-radius: 999px;
          font-size: 14px; font-weight: 700; text-decoration: none;
          box-shadow: 0 8px 28px rgba(30,58,138,0.5); transition: all 0.3s; white-space: nowrap;
        }
        .tm-btn-p:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(30,58,138,0.65); }
        .tm-btn-s {
          display: inline-flex; align-items: center; gap: 9px;
          background: transparent; color: #fff;
          padding: 13px 26px; border-radius: 999px;
          font-size: 14px; font-weight: 600; text-decoration: none;
          border: 1.5px solid rgba(255,255,255,0.45); transition: all 0.3s; white-space: nowrap;
        }
        .tm-btn-s:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.75); }

        /* ── STATS ── */
        .tm-stats { display: flex; gap: 11px; flex-wrap: wrap; }
        .tm-stat {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 14px; padding: 11px 16px; min-width: 100px;
          animation: popIn 0.6s ease-out both, floatUp 5s ease-in-out infinite;
        }
        .tm-stat:nth-child(1){ animation-delay: 0.5s, 1.2s; }
        .tm-stat:nth-child(2){ animation-delay: 0.7s, 1.5s; }
        .tm-stat:nth-child(3){ animation-delay: 0.9s, 1.8s; }
        .tm-stat-val { font-size: 19px; font-weight: 900; color: #fff; line-height: 1; margin-bottom: 3px; }
        .tm-stat-lbl { font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.6); line-height: 1.35; }

        /* ── MOBILE ── */
        @media(max-width:860px){
          .tm { height: auto; }
          .tm-grid { grid-template-columns: 1fr; padding: 36px 24px 300px; height: auto; }
          .tm-left { padding-right: 0; }
          .tm-btns { flex-direction: column; align-items: flex-start; }
          .tm-video-wrap { width: 100%; top: auto; bottom: 0; height: 260px; }
          .tm-vb-left { background: linear-gradient(to bottom, rgba(15,23,42,0.95) 0%, transparent 55%); }
        }
      `}</style>

      <section className="tm">

        {/* Left decorative rings */}
<div style={{
  position:"absolute", left:"-60px", top:"50%",
  transform:"translateY(-50%)",
  width:"280px", height:"280px",
  border:"1px solid rgba(147,197,253,0.12)",
  borderRadius:"50%", zIndex:3, pointerEvents:"none",
}}/>
<div style={{
  position:"absolute", left:"-90px", top:"50%",
  transform:"translateY(-50%)",
  width:"380px", height:"380px",
  border:"1px solid rgba(147,197,253,0.07)",
  borderRadius:"50%", zIndex:3, pointerEvents:"none",
}}/>
<div style={{
  position:"absolute", left:"10px", top:"20%",
  width:"6px", height:"6px", borderRadius:"50%",
  background:"rgba(147,197,253,0.5)", zIndex:3, pointerEvents:"none",
}}/>
<div style={{
  position:"absolute", left:"30px", top:"70%",
  width:"4px", height:"4px", borderRadius:"50%",
  background:"rgba(167,139,250,0.5)", zIndex:3, pointerEvents:"none",
}}/>

        {/* VIDEO — right 50%, no floating cards */}
        <div className="tm-video-wrap">
          <video autoPlay loop muted playsInline>
            <source src="/videos/clickbriz-hero.mp4" type="video/mp4" />
          </video>
          <div className="tm-vb-left"/>
          <div className="tm-vb-top"/>
          <div className="tm-vb-bottom"/>
        </div>

        <div className="tm-dots"/>

        <div className="tm-grid">
          <div className="tm-left">

            {/* TAGLINE */}
            <div className="tm-tagline">
              <span className="tm-tagline-dot"/>
              {tagline}
            </div>

            {/* HEADING */}
            <h1 className="tm-h1">
              Drive Traffic, Leads &amp; Revenue with AI&#8209;Powered Digital Marketing Agency
            </h1>

            <p className="tm-sub">{subheading}</p>

            <div className="tm-btns">
              <a href={primaryLink}   className="tm-btn-p">{primaryText}   <ArrowRight size={15}/></a>
              <a href={secondaryLink} className="tm-btn-s">{secondaryText} <ArrowRight size={15}/></a>
            </div>

            {/* STATS */}
            <div className="tm-stats">
              <div className="tm-stat">
                <div className="tm-stat-val">312%</div>
                <div className="tm-stat-lbl">Traffic Growth</div>
              </div>
              <div className="tm-stat">
                <div className="tm-stat-val">9× ROAS</div>
                <div className="tm-stat-lbl">Ad Returns</div>
              </div>
              <div className="tm-stat">
                <div className="tm-stat-val">250+</div>
                <div className="tm-stat-lbl">Happy Clients</div>
              </div>
            </div>

          </div>

          {/* RIGHT — video fills from behind */}
          <div style={{height:"100%"}}/>
        </div>

      </section>
    </>
  );
}