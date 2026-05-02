import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSection } from "@/lib/get-section";
import ContactPageClient from "@/components/ContactPageClient";
import { WhatsAppButton } from "@/components/PremiumFeatures";
import { Clock, Shield, Zap } from "lucide-react";
import type { Metadata } from "next";
import { getPageData, buildMetadata } from "@/lib/get-page-data";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("contact");
  return buildMetadata(page, {
    title: "Contact Us | Clickbriz Digital",
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
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glow-pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.6; } }

        body { background: #fff !important; }
        .contact-page { background: #ffffff; color: #0f172a; font-family: 'Inter', sans-serif; }

        /* HERO — Dark Blue */
        .contact-hero {
          position: relative;
          padding: 8rem 2rem 4rem;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #3730a3 70%, #1e1b4b 100%);
          overflow: hidden;
        }
        .contact-hero-orb-1 {
          position: absolute; top: 10%; right: 10%; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(147,197,253,0.2) 0%, transparent 70%);
          border-radius: 50%; filter: blur(60px);
          animation: glow-pulse 4s ease-in-out infinite;
          pointer-events: none;
        }
        .contact-hero-orb-2 {
          position: absolute; bottom: -10%; left: 5%; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(55,48,163,0.25) 0%, transparent 70%);
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
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 8px 18px; border-radius: 999px;
          margin-bottom: 2rem; backdrop-filter: blur(10px);
        }
        .contact-hero-badge-dot {
          width: 8px; height: 8px; background: #93c5fd;
          border-radius: 50%; box-shadow: 0 0 12px #93c5fd;
        }
        .contact-hero-badge-text {
          font-size: 12px; font-weight: 600; color: #bfdbfe;
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
          background: linear-gradient(135deg, #93c5fd 0%, #bfdbfe 50%, #e0f2fe 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .contact-hero-desc {
          font-size: 1.2rem; color: rgba(255,255,255,0.8);
          max-width: 700px; margin: 0 auto 2.5rem; line-height: 1.7;
        }

        .contact-hero-trust {
          display: flex; gap: 14px; flex-wrap: wrap;
          justify-content: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.15);
        }
        .trust-item {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 10px 18px; border-radius: 12px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .trust-item:hover {
          background: rgba(255,255,255,0.18);
          transform: translateY(-2px);
        }
        .trust-icon-wrap {
          width: 30px; height: 30px;
          background: rgba(255,255,255,0.2);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .trust-text-label {
          font-size: 10px; font-weight: 700;
          color: rgba(255,255,255,0.7);
          letter-spacing: 1px; text-transform: uppercase; margin-bottom: 2px;
        }
        .trust-text-value {
          font-size: 13px; font-weight: 700; color: #fff;
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

          {/* HERO — Dark Blue */}
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

          {/* CONTACT FORM — Light */}
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