import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSection } from "@/lib/get-section";
import ContactPageClient from "@/components/ContactPageClient";
import { WhatsAppButton } from "@/components/PremiumFeatures";
import { Sparkles, Clock, Shield, Zap } from "lucide-react";
import type { Metadata } from "next";
import { getPageData, buildMetadata } from "@/lib/get-page-data";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("contact");
  return buildMetadata(page, {
    title: "Contact Us | NexGen Digital",
    description: "Free consultation. Get back within 24 hours.",
  });
}

export default async function ContactPage() {
  const d = await getSection("contact-main");

  return (
    <>
      <WhatsAppButton />
      <Navbar />

      <style>{`
        @keyframes glow-pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

        .contact-page { background: #0A0A0A; color: #fff; font-family: 'Inter', sans-serif; }

        .contact-hero {
          position: relative;
          padding: 8rem 2rem 4rem;
          background: radial-gradient(ellipse at top, #1c1410 0%, #0a0a0a 50%, #000000 100%);
          overflow: hidden;
        }
        .contact-hero-orb-1 {
          position: absolute; top: 10%; right: 10%; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.35) 0%, transparent 70%);
          border-radius: 50%; filter: blur(60px);
          animation: glow-pulse 4s ease-in-out infinite;
          pointer-events: none;
        }
        .contact-hero-orb-2 {
          position: absolute; bottom: -10%; left: 5%; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(234, 88, 12, 0.25) 0%, transparent 70%);
          border-radius: 50%; filter: blur(80px);
          animation: glow-pulse 6s ease-in-out infinite;
          pointer-events: none;
        }

        .contact-hero-content {
          position: relative; z-index: 2;
          max-width: 900px; margin: 0 auto;
          text-align: center;
          animation: fadeInUp 0.8s ease-out;
        }

        .contact-hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(249, 115, 22, 0.15);
          border: 1px solid rgba(249, 115, 22, 0.3);
          padding: 8px 18px; border-radius: 999px;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }
        .contact-hero-badge-dot {
          width: 8px; height: 8px; background: #F97316;
          border-radius: 50%; box-shadow: 0 0 12px #F97316;
        }
        .contact-hero-badge-text {
          font-size: 12px; font-weight: 600; color: #FDBA74;
          letter-spacing: 1.5px; text-transform: uppercase;
        }

        .contact-hero-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2.5rem, 5vw, 3.75rem);
          font-weight: 800; color: #fff;
          line-height: 1.1; letter-spacing: -0.03em;
          margin: 0 0 1.5rem;
        }
        .contact-hero-gradient {
          background: linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FED7AA 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .contact-hero-desc {
          font-size: 1.2rem; color: #A3A3A3;
          max-width: 700px; margin: 0 auto 2.5rem;
          line-height: 1.7;
        }

        .contact-hero-trust {
          display: flex; gap: 14px; flex-wrap: wrap;
          justify-content: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .trust-item {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(249, 115, 22, 0.2);
          padding: 10px 18px; border-radius: 12px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .trust-item:hover {
          background: rgba(249, 115, 22, 0.08);
          border-color: rgba(249, 115, 22, 0.4);
          transform: translateY(-2px);
        }
        .trust-icon-wrap {
          width: 30px; height: 30px;
          background: linear-gradient(135deg, #F97316, #EA580C);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
        }
        .trust-text-label {
          font-size: 10px; font-weight: 700;
          color: #FDBA74;
          letter-spacing: 1px; text-transform: uppercase;
          margin-bottom: 2px;
        }
        .trust-text-value {
          font-size: 13px; font-weight: 700;
          color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        @media (max-width: 640px) {
          .contact-hero { padding: 6rem 1.25rem 3rem; }
          .contact-hero-trust { gap: 10px; }
          .trust-item { padding: 8px 12px; }
          .trust-text-value { font-size: 12px; }
        }
      `}</style>

      <div className="contact-page">
        <main>

          <section className="contact-hero">
            <div className="contact-hero-orb-1"></div>
            <div className="contact-hero-orb-2"></div>
            <div className="contact-hero-content">
              <div className="contact-hero-badge">
                <span className="contact-hero-badge-dot"></span>
                <span className="contact-hero-badge-text">Let's Talk Business</span>
              </div>
              <h1 className="contact-hero-title">
                {(d?.heroHeading || "Let's Grow Your Business Together").split(' ').slice(0, -2).join(' ')}{' '}
                <span className="contact-hero-gradient">
                  {(d?.heroHeading || "Let's Grow Your Business Together").split(' ').slice(-2).join(' ')}
                </span>
              </h1>
              <p className="contact-hero-desc">
                {d?.heroSubheading || "Get a free consultation from our experts. We'll analyze your business and share a custom growth strategy — no commitment required."}
              </p>

              <div className="contact-hero-trust">
                <div className="trust-item">
                  <div className="trust-icon-wrap">
                    <Clock size={14} color="#fff" />
                  </div>
                  <div>
                    <div className="trust-text-label">Response Time</div>
                    <div className="trust-text-value">Within 24 Hours</div>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon-wrap">
                    <Shield size={14} color="#fff" />
                  </div>
                  <div>
                    <div className="trust-text-label">Consultation</div>
                    <div className="trust-text-value">100% Free</div>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon-wrap">
                    <Zap size={14} color="#fff" />
                  </div>
                  <div>
                    <div className="trust-text-label">No Commitment</div>
                    <div className="trust-text-value">Zero Obligation</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <ContactPageClient
            infoHeading={d?.infoHeading || "Get In Touch"}
            contactInfo={d?.contactInfo || []}
            formHeading={d?.formHeading || "Free Consultation Form"}
            services={d?.services || []}
            budgets={d?.budgets || []}
            successMessage={d?.successMessage || "We'll get back within 24 hours."}
          />

        </main>
      </div>
      <Footer />
    </>
  );
}