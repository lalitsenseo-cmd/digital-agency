"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  {
    value: 9.4,
    suffix: "X",
    label: "Average ROAS across all paid campaigns",
    decimal: true,
  },
  {
    value: 162,
    suffix: "%",
    label: "Year-over-Year Growth in Online Revenue",
    decimal: false,
  },
  {
    value: 127,
    suffix: "%",
    label: "Growth in High-Intent MQLs (Marketing Qualified Leads)",
    decimal: false,
  },
];

function useInView(ref: React.RefObject<HTMLElement>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function Counter({ target, suffix, decimal, animate }: {
  target: number; suffix: string; decimal: boolean; animate: boolean;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!animate) return;
    let start: number | null = null;
    const dur = 2000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(parseFloat((ease * target).toFixed(decimal ? 1 : 0)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [animate, target, decimal]);

  return (
    <span>{decimal ? val.toFixed(1) : Math.floor(val)}{suffix}</span>
  );
}

export default function StatsNumbers() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref);

  return (
    <>
      <style>{`
        .sn-section {
          padding: 80px 24px;
          background: linear-gradient(180deg, #050505 0%, #0a0a0a 100%);
          position: relative;
          overflow: hidden;
        }
        .sn-section::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 500px; height: 2px;
          background: linear-gradient(90deg, transparent, #F97316, transparent);
        }
        .sn-orb {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 300px;
          background: radial-gradient(ellipse, rgba(249,115,22,0.08) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .sn-container {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .sn-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .sn-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(249,115,22,0.1);
          border: 1px solid rgba(249,115,22,0.25);
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          color: #FB923C;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .sn-heading {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 12px;
        }
        .sn-heading span {
          background: linear-gradient(135deg, #F97316, #FB923C);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .sn-sub {
          color: #737373;
          font-size: 15px;
        }
        .sn-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          position: relative;
        }
        .sn-item {
          padding: 40px 40px;
          position: relative;
          transition: all 0.3s ease;
          cursor: default;
        }
        .sn-item:hover {
          background: rgba(249,115,22,0.04);
        }
        .sn-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0; top: 10%; bottom: 10%;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(249,115,22,0.3), transparent);
        }
        .sn-item::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(249,115,22,0.4), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .sn-item:hover::before { opacity: 1; }
        .sn-num {
          font-size: clamp(3.5rem, 6vw, 5.5rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #F97316 0%, #FB923C 60%, #FDBA74 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .sn-num.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .sn-label {
          color: #737373;
          font-size: 15px;
          line-height: 1.6;
          max-width: 260px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
        }
        .sn-label.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .sn-border {
          border: 1px solid rgba(249,115,22,0.15);
          border-radius: 20px;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .sn-grid {
            grid-template-columns: 1fr;
          }
          .sn-item:not(:last-child)::after {
            right: 10%; left: 10%;
            top: auto; bottom: 0;
            width: auto; height: 1px;
            background: linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent);
          }
          .sn-item { padding: 32px 24px; }
        }
      `}</style>

      <section className="sn-section" ref={ref}>
        <div className="sn-orb" />
        <div className="sn-container">

          {/* Header */}
          <div className="sn-header">
            <div className="sn-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4M12 16h.01"/>
              </svg>
              Numbers That Prove Our Impact
            </div>
            <h2 className="sn-heading">
              Stats That Define <span>Clickbriz</span>
            </h2>
            <p className="sn-sub">Data-Driven Results That Speak For Themselves</p>
          </div>

          {/* Stats */}
          <div className="sn-border">
            <div className="sn-grid">
              {STATS.map((s, i) => (
                <div key={i} className="sn-item">
                  <div className={`sn-num ${visible ? "visible" : ""}`}
                    style={{ transitionDelay: `${i * 0.15}s` }}>
                    <Counter
                      target={s.value}
                      suffix={s.suffix}
                      decimal={s.decimal}
                      animate={visible}
                    />
                  </div>
                  <div className={`sn-label ${visible ? "visible" : ""}`}
                    style={{ transitionDelay: `${i * 0.15 + 0.2}s` }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}