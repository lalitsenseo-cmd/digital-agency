"use client";
import { useState, useEffect, useRef } from "react";

const OFFERS = [
  {
    emoji: "🎁",
    title: "Wait! Don't Leave Yet",
    subtitle: "We have a special gift for you",
    offer: "FREE SEO Audit",
    desc: "Get a complete SEO analysis of your website — absolutely free, no strings attached!",
    cta: "Claim My Free SEO Audit",
    secondary: "No thanks, I'll pass",
  },
  {
    emoji: "🚀",
    title: "Hold On!",
    subtitle: "A special offer just for you",
    offer: "Free Consultation",
    desc: "Talk to our expert for 30 minutes — completely FREE with zero commitment required!",
    cta: "Book My Free Consultation",
    secondary: "Maybe later",
  },
  {
    emoji: "💡",
    title: "Before You Go...",
    subtitle: "Your solution is right here",
    offer: "312% Traffic Growth",
    desc: "Our clients see an average of 312% traffic increase. Are you ready to grow?",
    cta: "Yes, I Want to Grow!",
    secondary: "Skip this",
  },
];

export default function ExitIntentPopup() {
  const [show, setShow]             = useState(false);
  const [leaving, setLeaving]       = useState(false);
  const [offer]                     = useState(() => OFFERS[Math.floor(Math.random() * OFFERS.length)]);
  const [email, setEmail]           = useState("");
  const [submitted, setSubmitted]   = useState(false);
  const [emailError, setEmailError] = useState("");
  const timerRef                    = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("exit_popup_shown")) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) {
        setShow(true);
        sessionStorage.setItem("exit_popup_shown", "true");
      }
    };

    timerRef.current = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem("exit_popup_shown", "true");
    }, 3000);

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

 const handleClose = () => {
  setShow(false);
};

  const handleSubmit = () => {
    if (!email.trim()) {
      setEmailError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setSubmitted(true);
  };

  if (!show) return null;

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes ei-overlay-in  { from { opacity:0; } to { opacity:1; } }
        @keyframes ei-overlay-out { from { opacity:1; } to { opacity:0; } }
        @keyframes ei-modal-in    { from { opacity:0; transform:scale(0.88) translateY(32px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes ei-modal-out   { from { opacity:1; transform:scale(1); } to { opacity:0; transform:scale(0.92); } }
        @keyframes ei-bounce      { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        @keyframes ei-pulse       { 0%,100% { box-shadow:0 0 0 0 rgba(30,58,138,0.45); } 60% { box-shadow:0 0 0 14px rgba(30,58,138,0); } }
        @keyframes ei-check       { from { stroke-dashoffset:40; } to { stroke-dashoffset:0; } }

        .ei-overlay {
          position:fixed; inset:0; z-index:99999;
          background:rgba(0,0,0,0.55);
          display:flex; align-items:center; justify-content:center;
          padding:16px;
          backdrop-filter:blur(4px);
        }
        .ei-modal {
          background:#fff; border-radius:24px;
          width:100%; max-width:460px;
          box-shadow:0 40px 100px rgba(0,0,0,0.28);
          overflow:hidden; position:relative;
        }
        .ei-header {
          background:linear-gradient(135deg,#1e3a8a 0%,#3730a3 100%);
          padding:30px 28px 22px;
          text-align:center; position:relative;
        }
        .ei-close {
          position:absolute; top:14px; right:14px;
          background:rgba(255,255,255,0.15); border:none; cursor:pointer;
          color:#fff; width:34px; height:34px; border-radius:50%;
          font-size:18px; line-height:1;
          display:flex; align-items:center; justify-content:center;
          transition:background 0.2s;
        }
        .ei-close:hover { background:rgba(255,255,255,0.28); }
        .ei-emoji {
          font-size:52px; display:block; margin-bottom:12px;
          animation:ei-bounce 2.2s ease-in-out infinite;
        }
        .ei-title    { color:#fff; font-size:22px; font-weight:800; margin:0 0 5px; line-height:1.2; }
        .ei-subtitle { color:rgba(255,255,255,0.78); font-size:14px; margin:0; }
        .ei-body { padding:24px 28px 26px; text-align:center; }
        .ei-limited-badge {
          display:inline-block;
          background:linear-gradient(135deg,#f59e0b,#d97706);
          color:#fff; font-size:11px; font-weight:800;
          padding:4px 14px; border-radius:999px;
          text-transform:uppercase; letter-spacing:1.2px;
          margin-bottom:14px;
        }
        .ei-offer-title { font-size:28px; font-weight:800; color:#1e3a8a; margin:0 0 8px; line-height:1.15; }
        .ei-offer-desc  { font-size:14px; color:#64748b; line-height:1.65; margin:0 0 20px; }
        .ei-trust { display:flex; justify-content:center; gap:18px; flex-wrap:wrap; margin-bottom:20px; }
        .ei-trust-item { display:flex; align-items:center; gap:5px; font-size:12px; color:#64748b; font-weight:600; }
        .ei-input {
          width:100%; padding:13px 16px; border-radius:12px;
          border:2px solid #e2e8f0; font-size:14px;
          color:#1e293b; outline:none; transition:border-color 0.2s;
          font-family:inherit; margin-bottom:6px; box-sizing:border-box;
        }
        .ei-input:focus { border-color:#1e3a8a; }
        .ei-input::placeholder { color:#94a3b8; }
        .ei-input-error { font-size:12px; color:#dc2626; margin:0 0 10px; text-align:left; }
        .ei-cta-btn {
          width:100%; padding:14px;
          background:linear-gradient(135deg,#1e3a8a,#3730a3);
          color:#fff; border:none; cursor:pointer;
          border-radius:12px; font-size:15px; font-weight:700;
          font-family:inherit; margin-bottom:10px; transition:all 0.2s;
          animation:ei-pulse 2.2s infinite;
        }
        .ei-cta-btn:hover { transform:translateY(-2px); }
        .ei-secondary-btn {
          background:none; border:none; cursor:pointer;
          color:#94a3b8; font-size:12px; font-family:inherit;
          text-decoration:underline; padding:4px;
          transition:color 0.2s; display:block; margin:0 auto;
        }
        .ei-secondary-btn:hover { color:#64748b; }
        .ei-privacy {
          font-size:11px; color:#94a3b8; margin-top:12px;
          display:flex; align-items:center; justify-content:center; gap:4px;
        }
        .ei-success { padding:36px 28px; text-align:center; }
        .ei-success-circle {
          width:72px; height:72px; border-radius:50%;
          background:#f0fdf4; border:3px solid #22c55e;
          display:flex; align-items:center; justify-content:center;
          margin:0 auto 16px;
        }
        .ei-success-circle svg { width:32px; height:32px; }
        .ei-success-circle svg path {
          stroke:#22c55e; stroke-width:3;
          stroke-dasharray:40; stroke-dashoffset:40;
          fill:none; stroke-linecap:round; stroke-linejoin:round;
          animation:ei-check 0.5s 0.1s ease forwards;
        }
        .ei-success-title { font-size:22px; font-weight:800; color:#1e293b; margin:0 0 8px; }
        .ei-success-desc  { font-size:14px; color:#64748b; line-height:1.6; margin:0 0 20px; }
        .ei-success-btn {
          display:inline-block;
          background:linear-gradient(135deg,#1e3a8a,#3730a3);
          color:#fff; padding:12px 28px; border-radius:12px;
          font-size:14px; font-weight:700; text-decoration:none; transition:all 0.2s;
        }
        .ei-success-btn:hover { transform:translateY(-2px); }
        @media (max-width:480px) {
          .ei-modal  { border-radius:20px; }
          .ei-header { padding:24px 20px 18px; }
          .ei-body   { padding:20px 20px 22px; }
          .ei-offer-title { font-size:24px; }
          .ei-trust { gap:12px; }
        }
      `}</style>

      <div className="ei-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
        <div className="ei-modal">
          {submitted ? (
            <div className="ei-success">
              <div className="ei-success-circle">
                <svg viewBox="0 0 24 24"><path d="M5 12l5 5L19 7" /></svg>
              </div>
              <p className="ei-success-title">You're All Set!</p>
              <p className="ei-success-desc">
                Thank you for your interest! Our team will reach out to you shortly.<br />
                In the meantime, explore what we can do for you.
              </p>
              <a href="/contact" className="ei-success-btn">View Our Services →</a>
            </div>
          ) : (
            <>
              <div className="ei-header">
                <button className="ei-close" onClick={handleClose} aria-label="Close">×</button>
                <span className="ei-emoji">{offer.emoji}</span>
                <p className="ei-title">{offer.title}</p>
                <p className="ei-subtitle">{offer.subtitle}</p>
              </div>
              <div className="ei-body">
                <span className="ei-limited-badge">🔥 Limited Time Offer</span>
                <p className="ei-offer-title">{offer.offer}</p>
                <p className="ei-offer-desc">{offer.desc}</p>
                <div className="ei-trust">
                  <span className="ei-trust-item">⭐ 4.9/5 Rating</span>
                  <span className="ei-trust-item">👥 500+ Clients</span>
                  <span className="ei-trust-item">✅ No Spam Ever</span>
                </div>
                <input
                  className="ei-input"
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
                {emailError && <p className="ei-input-error">⚠️ {emailError}</p>}
                <button className="ei-cta-btn" onClick={handleSubmit}>{offer.cta} 🚀</button>
                <button className="ei-secondary-btn" onClick={handleClose}>{offer.secondary}</button>
                <p className="ei-privacy">🔒 Your information is 100% secure — we never share your data</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}