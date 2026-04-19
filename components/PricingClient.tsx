"use client";
import { Check, Zap, Sparkles } from "lucide-react";
import { useState } from "react";

type Plan = {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  desc: string;
  features: string[];
  popular: boolean;
  color: string;
};

export default function PricingClient({
  label, heading, subheading, plans,
}: {
  label: string;
  heading: string;
  subheading: string;
  plans: Plan[];
}) {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <style>{`
        .pricing-section {
          position: relative;
          padding: 6rem 2rem;
          background: linear-gradient(180deg, #0A0A0A 0%, #171717 50%, #0A0A0A 100%);
          overflow: hidden;
        }
        .pricing-section::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 2px;
          background: linear-gradient(90deg, transparent, #F97316, transparent);
        }
        .pricing-orb {
          position: absolute;
          top: 40%; left: 50%;
          transform: translate(-50%, -50%);
          width: 800px; height: 400px;
          background: radial-gradient(ellipse, rgba(249, 115, 22, 0.1) 0%, transparent 70%);
          border-radius: 50%; filter: blur(100px);
          pointer-events: none;
        }

        .pricing-container {
          max-width: 1200px; margin: 0 auto;
          position: relative; z-index: 2;
        }

        .pricing-header {
          text-align: center; margin-bottom: 3rem;
        }
        .pricing-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(249, 115, 22, 0.1);
          border: 1px solid rgba(249, 115, 22, 0.25);
          padding: 6px 14px; border-radius: 999px;
          font-size: 11px; font-weight: 600; color: #FB923C;
          letter-spacing: 1.5px; text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .pricing-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800; color: #fff;
          line-height: 1.1; letter-spacing: -0.03em;
          margin: 0 0 1rem;
        }
        .pricing-heading-gradient {
          background: linear-gradient(135deg, #F97316 0%, #FB923C 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .pricing-subheading {
          font-size: 1.1rem; color: #A3A3A3;
          max-width: 600px; margin: 0 auto 2rem;
          line-height: 1.6;
        }

        .pricing-toggle {
          display: inline-flex;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(249, 115, 22, 0.15);
          border-radius: 999px;
          padding: 4px;
          backdrop-filter: blur(10px);
        }
        .pricing-toggle button {
          padding: 9px 22px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          background: transparent;
          color: #A3A3A3;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .pricing-toggle button.active {
          background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
          color: #fff;
          box-shadow: 0 4px 16px rgba(249, 115, 22, 0.4);
        }
        .pricing-toggle button .save-badge {
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 4px;
        }
        .pricing-toggle button:not(.active) .save-badge {
          background: rgba(16, 185, 129, 0.15);
          color: #6EE7B7;
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          align-items: stretch;
        }

        .plan-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 2.5rem 2rem;
          position: relative;
          display: flex;
          flex-direction: column;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
        }
        .plan-card:hover {
          transform: translateY(-5px);
          border-color: rgba(249, 115, 22, 0.3);
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.06) 0%, rgba(234, 88, 12, 0.02) 100%);
        }

        .plan-card.popular {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(234, 88, 12, 0.08) 100%);
          border: 2px solid rgba(249, 115, 22, 0.5);
          box-shadow: 0 20px 60px rgba(249, 115, 22, 0.25);
          transform: scale(1.02);
        }
        .plan-card.popular::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 24px;
          background: linear-gradient(135deg, #F97316, #EA580C, #FB923C);
          z-index: -1;
          opacity: 0.3;
          filter: blur(10px);
        }
        .plan-card.popular:hover {
          transform: scale(1.02) translateY(-5px);
          box-shadow: 0 30px 80px rgba(249, 115, 22, 0.4);
        }

        .popular-badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
          color: #fff;
          padding: 6px 18px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
          box-shadow: 0 8px 24px rgba(249, 115, 22, 0.5);
          letter-spacing: 0.5px;
        }

        .plan-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #F97316, #FB923C);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }
        .plan-desc {
          font-size: 13px;
          color: #A3A3A3;
          margin-bottom: 1.5rem;
          line-height: 1.6;
          min-height: 40px;
        }
        .plan-price {
          margin-bottom: 2rem;
          padding-bottom: 1.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .plan-price-amount {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 2.75rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.03em;
        }
        .plan-price-period {
          font-size: 14px;
          color: #71717A;
          margin-left: 4px;
        }

        .plan-features {
          list-style: none;
          margin: 0 0 2rem;
          padding: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .plan-feature {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .plan-feature-icon {
          width: 20px; height: 20px;
          background: linear-gradient(135deg, #F97316, #EA580C);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
          box-shadow: 0 3px 10px rgba(249, 115, 22, 0.4);
        }
        .plan-feature-text {
          font-size: 13px;
          color: #C4C4C4;
          line-height: 1.6;
        }

        .plan-cta {
          text-decoration: none;
          padding: 14px;
          border-radius: 12px;
          text-align: center;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          display: block;
          transition: all 0.3s ease;
          letter-spacing: 0.3px;
        }
        .plan-cta.popular-cta {
          background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
          color: #fff;
          box-shadow: 0 8px 30px rgba(249, 115, 22, 0.4);
        }
        .plan-cta.popular-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(249, 115, 22, 0.6);
        }
        .plan-cta.regular-cta {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(249, 115, 22, 0.25);
          color: #FB923C;
        }
        .plan-cta.regular-cta:hover {
          background: rgba(249, 115, 22, 0.1);
          border-color: rgba(249, 115, 22, 0.5);
          color: #fff;
        }

        @media (max-width: 640px) {
          .pricing-section { padding: 4rem 1.25rem; }
          .plan-card { padding: 2rem 1.5rem; }
          .plan-card.popular { transform: scale(1); }
          .plan-card.popular:hover { transform: translateY(-5px); }
        }
      `}</style>

      <section id="pricing" className="pricing-section">
        <div className="pricing-orb"></div>

        <div className="pricing-container">
          <div className="pricing-header">
            <span className="pricing-badge">
              <Sparkles size={12} /> {label}
            </span>
            <h2 className="pricing-heading">
              {heading.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="pricing-heading-gradient">
                {heading.split(' ').slice(-1).join(' ')}
              </span>
            </h2>
            <p className="pricing-subheading">{subheading}</p>

            <div className="pricing-toggle">
              <button 
                onClick={() => setYearly(false)} 
                className={!yearly ? 'active' : ''}
              >
                Monthly
              </button>
              <button 
                onClick={() => setYearly(true)} 
                className={yearly ? 'active' : ''}
              >
                Yearly <span className="save-badge">-20%</span>
              </button>
            </div>
          </div>

          <div className="plans-grid">
            {plans.map(plan => (
              <div key={plan.id} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && (
                  <div className="popular-badge">
                    <Zap size={11} fill="#fff" /> MOST POPULAR
                  </div>
                )}
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-desc">{plan.desc}</p>
                <div className="plan-price">
                  <span className="plan-price-amount">
                    ₹{(yearly ? plan.priceYearly : plan.priceMonthly).toLocaleString("en-IN")}
                  </span>
                  <span className="plan-price-period">/mo</span>
                </div>
                <ul className="plan-features">
                  {plan.features.map(f => (
                    <li key={f} className="plan-feature">
                      <div className="plan-feature-icon">
                        <Check size={12} color="#fff" strokeWidth={3} />
                      </div>
                      <span className="plan-feature-text">{f}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="/contact" 
                  className={`plan-cta ${plan.popular ? 'popular-cta' : 'regular-cta'}`}
                >
                  Get Started →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}