"use client";
import { useState } from "react";

export default function CTAForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", website: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <style suppressHydrationWarning>{`
        .cta-section {
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #1e3a8a 100%);
          padding: 72px 24px;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .cta-section::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        }
        .cta-orb-left {
          position: absolute;
          top: -60px; left: -80px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .cta-orb-right {
          position: absolute;
          bottom: -60px; right: -80px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .cta-container {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          text-align: center;
        }
        .cta-heading {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 14px;
        }
        .cta-heading span {
          background: linear-gradient(135deg, #bfdbfe, #e0f2fe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cta-sub {
          color: rgba(255,255,255,0.75);
          font-size: 15px;
          margin-bottom: 36px;
          line-height: 1.6;
        }
        .cta-form {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 32px;
        }
        .cta-input {
          flex: 1;
          min-width: 180px;
          max-width: 240px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 10px;
          padding: 14px 18px;
          font-size: 14px;
          color: #fff;
          outline: none;
          transition: all 0.25s;
          font-family: inherit;
        }
        .cta-input::placeholder { color: rgba(255,255,255,0.5); }
        .cta-input:focus {
          border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.15);
          box-shadow: 0 0 0 3px rgba(255,255,255,0.1);
        }
        .cta-btn {
          background: #fff;
          color: #1e3a8a;
          border: none;
          border-radius: 10px;
          padding: 14px 32px;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s;
          box-shadow: 0 8px 28px rgba(0,0,0,0.2);
          font-family: inherit;
          white-space: nowrap;
        }
        .cta-btn:hover {
          background: #eff6ff;
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.3);
        }
        .cta-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          flex-wrap: wrap;
        }
        .cta-trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.8);
          font-size: 13px;
          font-weight: 600;
        }
        .cta-trust-icon {
          width: 28px;
          height: 28px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }
        .cta-success {
          padding: 32px;
          text-align: center;
        }
        .cta-success-icon {
          width: 60px; height: 60px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
          font-size: 24px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }
        @media (max-width: 640px) {
          .cta-section { padding: 52px 20px; }
          .cta-input { max-width: 100%; }
          .cta-btn { width: 100%; }
          .cta-trust { gap: 16px; }
        }
      `}</style>

      <section className="cta-section">
        <div className="cta-orb-left" />
        <div className="cta-orb-right" />

        <div className="cta-container">
          {sent ? (
            <div className="cta-success">
              <div className="cta-success-icon">✓</div>
              <h3 style={{ color: "#fff", fontSize: "1.4rem", fontWeight: 900, marginBottom: 8 }}>
                We'll be in touch soon!
              </h3>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14 }}>
                Our team will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <>
              <h2 className="cta-heading">
                Ready to Improve Your <span>Digital Performance?</span>
              </h2>
              <p className="cta-sub">
                Get a free consultation and learn how we optimise every channel for growth
              </p>

              <form className="cta-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="cta-input"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="cta-input"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="cta-input"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Website (Optional)"
                  className="cta-input"
                  value={form.website}
                  onChange={e => setForm({ ...form, website: e.target.value })}
                />
                <button type="submit" className="cta-btn">
                  Submit →
                </button>
              </form>

              <div className="cta-trust">
                <div className="cta-trust-item">
                  <div className="cta-trust-icon">⭐</div>
                  100+ Happy Clients
                </div>
                <div className="cta-trust-item">
                  <div className="cta-trust-icon">🏆</div>
                  Award Winning Agency
                </div>
                <div className="cta-trust-item">
                  <div className="cta-trust-icon">🚀</div>
                  5+ Years Experience
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}