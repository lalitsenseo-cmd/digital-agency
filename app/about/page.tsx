import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, Award, Sparkles, TrendingUp, Target, Eye, Zap, Heart, Users, Trophy, Linkedin, Twitter, Mail, Rocket, Star } from "lucide-react";
import { getPageData, buildMetadata } from "@/lib/get-page-data";
import { getSection } from "@/lib/get-section";
import { WhatsAppButton } from "@/components/PremiumFeatures";
import type { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData("about");
  return buildMetadata(page, {
    title: "About Us | Clickbriz Digital Marketing Agency Faridabad",
    description: "Clickbriz Digital is founded by Lalit Sen — a results-driven digital marketing agency in Faridabad.",
  });
}

export default async function AboutPage() {
  const page = await getPageData("about");
  const d = await getSection("about-main");

  const heroBadge = d?.heroBadge || "About Clickbriz Digital";
  const heroHeading = d?.heroHeading || "Digital Marketing Agency Built by Results, Not Promises";
  const heroSubheading = d?.heroSubheading || "Founded by Lalit Sen in Faridabad, Clickbriz Digital helps Indian businesses grow online through proven strategies, transparent work, and measurable results.";
  const storyHeading = d?.storyHeading || "Our Story";
  const storyParagraphs: string[] = d?.storyParagraphs || [];
  const whyUsHeading = d?.whyUsHeading || "Why Businesses Choose Us";
  const whyUsCards: { title: string; desc: string }[] = d?.whyUsCards || [];
  const ctaHeading = d?.ctaHeading || "Ready to Grow?";
  const ctaSubheading = d?.ctaSubheading || "Get a free consultation and let's discuss how we can accelerate your business growth.";
  const ctaButtonText = d?.ctaButtonText || "Get Free Consultation";
  const ctaButtonLink = d?.ctaButtonLink || "/contact";

  const cmsContent = page?.content;
  const hasCmsContent = cmsContent && cmsContent.trim() !== '' && cmsContent !== '<br>';

  const values = [
    { icon: Zap, title: "Innovation", desc: "Always ahead with latest SEO and digital marketing strategies." },
    { icon: Heart, title: "Integrity", desc: "100% white-hat practices. No shortcuts. No fake promises." },
    { icon: Trophy, title: "Excellence", desc: "Obsessed with quality work and exceptional client results." },
    { icon: Target, title: "Results", desc: "Data-driven approach focused on measurable business growth." },
  ];

  const milestones = [
    { year: "2020", title: "Founded", desc: "Clickbriz Digital started by Lalit Sen in Faridabad with a mission to deliver honest digital marketing." },
    { year: "2022", title: "50+ Clients", desc: "Crossed 50 happy clients milestone with consistent ranking results across multiple industries." },
    { year: "2024", title: "100+ Projects", desc: "Completed 100+ successful SEO campaigns and expanded services to include Ads & Development." },
    { year: "2026", title: "Growing Strong", desc: "120+ clients ranked, 4.9★ rating, and continuing to scale with AI-powered marketing solutions." },
  ];

  return (
    <>
      <WhatsAppButton />
      <Navbar />

      <style>{`
        @keyframes glow-pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInSection { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .premium-page { background: #ffffff; color: #0f172a; font-family: 'Inter', sans-serif; }
        .premium-page section { animation: fadeInSection 0.8s ease-out both; }

        /* ── HERO — Dark Blue ── */
        .hero-about {
          position: relative;
          padding: 8rem 2rem 5rem;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #3730a3 70%, #1e1b4b 100%);
          overflow: hidden;
        }
        .hero-orb-1 {
          position: absolute; top: 10%; right: 10%; width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(147,197,253,0.2) 0%, transparent 70%);
          border-radius: 50%; filter: blur(60px);
          animation: glow-pulse 4s ease-in-out infinite;
        }
        .hero-orb-2 {
          position: absolute; bottom: 10%; left: 5%; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(55,48,163,0.25) 0%, transparent 70%);
          border-radius: 50%; filter: blur(80px);
          animation: glow-pulse 6s ease-in-out infinite;
        }
        .hero-content {
          position: relative; z-index: 2; max-width: 1000px; margin: 0 auto; text-align: center;
          animation: fadeInUp 0.8s ease-out;
        }
        .hero-badge-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 8px 18px; border-radius: 999px;
          margin-bottom: 2rem; backdrop-filter: blur(10px);
        }
        .hero-badge-dot {
          width: 8px; height: 8px; background: #93c5fd;
          border-radius: 50%; box-shadow: 0 0 12px #93c5fd;
        }
        .hero-badge-text {
          font-size: 12px; font-weight: 600; color: #bfdbfe;
          letter-spacing: 1.5px; text-transform: uppercase;
        }
        .hero-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2.5rem, 5vw, 3.75rem);
          font-weight: 800; color: #fff; line-height: 1.1;
          letter-spacing: -0.03em; margin: 0 0 1.5rem;
        }
        .hero-gradient-text {
          background: linear-gradient(135deg, #93c5fd 0%, #bfdbfe 50%, #e0f2fe 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .hero-desc {
          font-size: 1.2rem; color: rgba(255,255,255,0.8);
          max-width: 750px; margin: 0 auto 3rem; line-height: 1.7;
        }
        .hero-stats {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
          max-width: 600px; margin: 0 auto;
          padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.15);
        }
        .stat-value {
          font-size: 2.5rem; font-weight: 800;
          font-family: 'Plus Jakarta Sans', sans-serif;
          margin-bottom: 4px; letter-spacing: -0.02em;
          display: inline-block; color: #fff;
        }
        .stat-label {
          font-size: 11px; color: rgba(255,255,255,0.6);
          letter-spacing: 1px; text-transform: uppercase; font-weight: 500;
        }

        /* ── LIGHT SECTIONS ── */
        .section-premium { position: relative; padding: 6rem 2rem; background: #ffffff; }
        .section-premium-alt { background: linear-gradient(180deg, #f8fafc 0%, #eff6ff 50%, #f8fafc 100%); }
        .section-container { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }
        .section-header { text-align: center; margin-bottom: 3rem; }
        .section-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #eff6ff; border: 1px solid #bfdbfe;
          padding: 6px 14px; border-radius: 999px;
          font-size: 11px; font-weight: 600; color: #1e3a8a;
          letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 1rem;
        }
        .section-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 800; color: #0f172a; line-height: 1.1;
          letter-spacing: -0.02em; margin: 0 0 1rem;
        }
        .section-subtitle {
          font-size: 1.1rem; color: #64748b;
          max-width: 600px; margin: 0 auto; line-height: 1.6;
        }

        /* STORY */
        .story-wrapper { max-width: 800px; margin: 0 auto; }
        .story-paragraph {
          font-size: 1.1rem; color: #475569;
          line-height: 1.85; margin-bottom: 1.5rem;
        }

        /* MISSION/VISION */
        .mv-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
        .mv-card {
          background: #fff; border: 1px solid #e2e8f0;
          border-radius: 24px; padding: 2.5rem;
          position: relative; overflow: hidden;
          transition: all 0.4s ease;
          box-shadow: 0 2px 12px rgba(30,58,138,0.06);
        }
        .mv-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #1e3a8a, #3730a3);
        }
        .mv-card:hover {
          transform: translateY(-8px); border-color: #93c5fd;
          box-shadow: 0 25px 70px rgba(30,58,138,0.12);
        }
        .mv-icon {
          width: 64px; height: 64px;
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 30px rgba(30,58,138,0.3);
        }
        .mv-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.5rem; font-weight: 800; color: #0f172a;
          margin-bottom: 1rem; letter-spacing: -0.01em;
        }
        .mv-desc { font-size: 15px; color: #64748b; line-height: 1.7; }

        /* VALUES */
        .values-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; }
        .value-card {
          background: #fff; border: 1px solid #e2e8f0;
          border-radius: 16px; padding: 1.75rem; text-align: center;
          transition: all 0.4s ease;
          box-shadow: 0 2px 8px rgba(30,58,138,0.04);
        }
        .value-card:hover {
          background: #eff6ff; border-color: #93c5fd;
          transform: translateY(-4px);
        }
        .value-icon {
          width: 52px; height: 52px;
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.25rem;
          box-shadow: 0 8px 24px rgba(30,58,138,0.3);
        }
        .value-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.1rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem;
        }
        .value-desc { font-size: 13px; color: #64748b; line-height: 1.6; }

        /* FOUNDER */
        .founder-section {
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #1e1b4b 100%);
          padding: 6rem 2rem; position: relative; overflow: hidden;
        }
        .founder-section::before {
          content: ''; position: absolute;
          top: 50%; right: -200px; width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
          border-radius: 50%; filter: blur(80px); pointer-events: none;
        }
        .founder-wrapper {
          max-width: 1000px; margin: 0 auto;
          display: grid; grid-template-columns: 300px 1fr;
          gap: 3rem; align-items: center; position: relative; z-index: 2;
        }
        .founder-image-wrapper { position: relative; width: 300px; height: 300px; }
        .founder-image-glow {
          position: absolute; inset: -10px;
          background: linear-gradient(135deg, rgba(255,255,255,0.3), rgba(147,197,253,0.3));
          border-radius: 50%; filter: blur(30px); opacity: 0.4;
          animation: glow-pulse 3s ease-in-out infinite;
        }
        .founder-image {
          position: relative; width: 300px; height: 300px; border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          border: 3px solid rgba(255,255,255,0.3);
          box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden;
        }
        .founder-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25);
          padding: 6px 14px; border-radius: 999px;
          font-size: 11px; font-weight: 600; color: #bfdbfe;
          letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 1rem;
        }
        .founder-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 2.5rem; font-weight: 800; color: #fff;
          margin-bottom: 0.5rem; letter-spacing: -0.02em;
        }
        .founder-role {
          font-size: 1.1rem; font-weight: 600; color: #93c5fd; margin-bottom: 1.25rem;
        }
        .founder-bio {
          font-size: 15px; color: rgba(255,255,255,0.8); line-height: 1.8; margin-bottom: 1.5rem;
        }
        .founder-social { display: flex; gap: 12px; }
        .founder-social-icon {
          width: 42px; height: 42px;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.8); text-decoration: none; transition: all 0.3s ease;
        }
        .founder-social-icon:hover {
          background: rgba(255,255,255,0.2); color: #fff;
          transform: translateY(-3px);
        }

        /* TIMELINE */
        .timeline-wrapper { max-width: 900px; margin: 0 auto; position: relative; }
        .timeline-wrapper::before {
          content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(180deg, transparent, #bfdbfe, #bfdbfe, transparent);
          transform: translateX(-50%);
        }
        .timeline-item {
          display: grid; grid-template-columns: 1fr auto 1fr;
          gap: 2rem; align-items: center; margin-bottom: 3rem; position: relative;
        }
        .timeline-item:last-child { margin-bottom: 0; }
        .timeline-year-dot {
          width: 60px; height: 60px;
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 800; color: #fff;
          border: 3px solid #fff;
          box-shadow: 0 0 0 2px #bfdbfe, 0 8px 24px rgba(30,58,138,0.3);
          position: relative; z-index: 2; flex-shrink: 0;
        }
        .timeline-card {
          background: #fff; border: 1px solid #e2e8f0;
          border-radius: 16px; padding: 1.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(30,58,138,0.06);
        }
        .timeline-card:hover { background: #eff6ff; border-color: #93c5fd; }
        .timeline-item:nth-child(odd) .timeline-card-left { grid-column: 1; text-align: right; }
        .timeline-item:nth-child(odd) .timeline-card-right { display: none; }
        .timeline-item:nth-child(even) .timeline-card-left { display: none; }
        .timeline-item:nth-child(even) .timeline-card-right { grid-column: 3; }
        .timeline-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem;
        }
        .timeline-desc { font-size: 14px; color: #64748b; line-height: 1.6; }

        /* WHY US */
        .why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .why-card {
          background: #fff; border: 1px solid #e2e8f0;
          border-radius: 20px; padding: 2rem;
          position: relative; overflow: hidden;
          transition: all 0.4s ease;
          box-shadow: 0 2px 12px rgba(30,58,138,0.06);
        }
        .why-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #1e3a8a, #3730a3);
        }
        .why-card:hover {
          transform: translateY(-5px); border-color: #93c5fd;
          box-shadow: 0 20px 60px rgba(30,58,138,0.12);
        }
        .why-icon {
          width: 48px; height: 48px;
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.25rem; box-shadow: 0 8px 25px rgba(30,58,138,0.3);
        }
        .why-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.25rem; font-weight: 700; color: #0f172a;
          margin-bottom: 0.75rem; letter-spacing: -0.01em;
        }
        .why-desc { font-size: 14px; color: #64748b; line-height: 1.7; }

        /* CTA */
        .cta-section {
          position: relative; padding: 6rem 2rem;
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #1e1b4b 100%);
          overflow: hidden;
        }
        .cta-orb {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
          border-radius: 50%; filter: blur(80px);
        }
        .cta-content { position: relative; z-index: 2; max-width: 700px; margin: 0 auto; text-align: center; }
        .cta-section .section-title { color: #fff; }
        .cta-section .section-badge {
          background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: #bfdbfe;
        }
        .cta-btn {
          background: #fff; color: #1e3a8a;
          padding: 16px 32px; border-radius: 12px;
          font-weight: 700; font-size: 15px;
          display: inline-flex; align-items: center; gap: 10px; text-decoration: none;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2); transition: all 0.3s ease;
        }
        .cta-btn:hover { transform: translateY(-2px); background: #eff6ff; box-shadow: 0 15px 50px rgba(0,0,0,0.3); }

        /* CMS */
        .cms-section { padding: 6rem 2rem; background: #f8fafc; position: relative; overflow: hidden; }
        .cms-section::before {
          content: ''; position: absolute; top: 0; left: 50%;
          transform: translateX(-50%); width: 300px; height: 2px;
          background: linear-gradient(90deg, transparent, #1e3a8a, transparent);
        }
        .cms-wrapper { max-width: 900px; margin: 0 auto; position: relative; z-index: 2; }
        .cms-content { font-family: Inter, sans-serif; color: #475569; font-size: 16px; line-height: 1.8; }
        .cms-content h1, .cms-content h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800; color: #0f172a; line-height: 1.2;
          margin: 3.5rem 0 1.5rem; position: relative; padding-left: 1.5rem;
          font-size: clamp(1.7rem, 3vw, 2.2rem); letter-spacing: -0.02em;
        }
        .cms-content h1::before, .cms-content h2::before {
          content: ''; position: absolute; left: 0; top: 0.3em; bottom: 0.3em;
          width: 4px; background: linear-gradient(180deg, #1e3a8a, #3730a3); border-radius: 4px;
        }
        .cms-content h1:first-child, .cms-content h2:first-child { margin-top: 0; }
        .cms-content h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.35rem; font-weight: 700; color: #1e3a8a; margin: 2.5rem 0 1rem;
        }
        .cms-content h4 { font-size: 1.15rem; font-weight: 700; color: #3730a3; margin: 2rem 0 0.75rem; }
        .cms-content p { margin-bottom: 1.25rem; color: #475569; }
        .cms-content strong { color: #0f172a; font-weight: 700; }
        .cms-content ul { list-style: none; padding: 0; }
        .cms-content ul li {
          position: relative; padding: 14px 20px 14px 52px; margin-bottom: 10px;
          background: #fff; border: 1px solid #e2e8f0;
          border-radius: 12px; color: #334155;
        }
        .cms-content ul li::before {
          content: ''; position: absolute; left: 16px; top: 50%;
          transform: translateY(-50%); width: 22px; height: 22px;
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          border-radius: 50%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: center; background-size: 11px;
        }
        .cms-content a { color: #1e3a8a; text-decoration: none; font-weight: 600; }

        @media (max-width: 768px) {
          .hero-about { padding: 5rem 1.25rem 3rem; }
          .section-premium, .founder-section, .cms-section, .cta-section { padding: 4rem 1.25rem; }
          .founder-wrapper { grid-template-columns: 1fr; text-align: center; }
          .founder-image-wrapper, .founder-image { width: 220px; height: 220px; margin: 0 auto; }
          .founder-social { justify-content: center; }
          .founder-name { font-size: 2rem; }
          .timeline-wrapper::before { left: 30px; }
          .timeline-item { grid-template-columns: 60px 1fr; gap: 1rem; margin-bottom: 2rem; }
          .timeline-item .timeline-card-left { display: none; }
          .timeline-item .timeline-card-right { display: block !important; grid-column: 2; text-align: left !important; }
          .timeline-item:nth-child(odd) .timeline-card-left { display: none; }
          .timeline-item:nth-child(odd) .timeline-card-right { display: block !important; grid-column: 2; text-align: left; }
          .timeline-year-dot { width: 50px; height: 50px; font-size: 12px; }
          .hero-stats { grid-template-columns: repeat(3, 1fr); gap: 12px; }
          .stat-value { font-size: 1.75rem; }
        }
      `}</style>

      <div className="premium-page">
        <main>

          {/* HERO — Dark Blue */}
          <section className="hero-about">
            <div className="hero-orb-1"></div>
            <div className="hero-orb-2"></div>
            <div className="hero-content">
              <div className="hero-badge-pill">
                <span className="hero-badge-dot"></span>
                <span className="hero-badge-text">{heroBadge}</span>
              </div>
              <h1 className="hero-title">
                {heroHeading.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="hero-gradient-text">
                  {heroHeading.split(' ').slice(-2).join(' ')}
                </span>
              </h1>
              <p className="hero-desc">{heroSubheading}</p>
              <div className="hero-stats">
                <div>
                  <div className="stat-value">120+</div>
                  <div className="stat-label">Happy Clients</div>
                </div>
                <div>
                  <div className="stat-value">4.9★</div>
                  <div className="stat-label">Google Rating</div>
                </div>
                <div>
                  <div className="stat-value">6yrs</div>
                  <div className="stat-label">Experience</div>
                </div>
              </div>
            </div>
          </section>

          {/* STORY */}
          <section className="section-premium section-premium-alt">
            <div className="section-container">
              <div className="section-header">
                <span className="section-badge"><Sparkles size={12} /> Our Journey</span>
                <h2 className="section-title">{storyHeading}</h2>
              </div>
              <div className="story-wrapper">
                {storyParagraphs.length > 0 ? (
                  storyParagraphs.map((p, i) => (
                    <p key={i} className="story-paragraph">{p}</p>
                  ))
                ) : (
                  <>
                    <p className="story-paragraph">
                      Clickbriz Digital was born out of a simple belief: small and medium businesses in India deserve honest, results-driven digital marketing — not flashy promises that never deliver.
                    </p>
                    <p className="story-paragraph">
                      Founded in 2020 in Faridabad by <strong style={{ color: '#1e3a8a' }}>Lalit Sen</strong>, we started as a one-man SEO shop and grew into a full-service digital marketing agency. Today, we've helped 120+ businesses rank higher on Google, generate more leads, and scale their revenue.
                    </p>
                    <p className="story-paragraph">
                      What sets us apart? We don't believe in shortcuts. Every strategy we implement is white-hat, every report is transparent, and every client relationship is built on trust. Your growth is our success metric.
                    </p>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* MISSION & VISION */}
          <section className="section-premium">
            <div className="section-container">
              <div className="section-header">
                <span className="section-badge"><Target size={12} /> Purpose</span>
                <h2 className="section-title">Mission & Vision</h2>
              </div>
              <div className="mv-grid">
                <div className="mv-card">
                  <div className="mv-icon"><Rocket size={28} color="#fff" /></div>
                  <h3 className="mv-title">Our Mission</h3>
                  <p className="mv-desc">
                    To empower Indian businesses with affordable, transparent, and results-driven digital marketing services that deliver measurable ROI — not empty promises.
                  </p>
                </div>
                <div className="mv-card">
                  <div className="mv-icon"><Eye size={28} color="#fff" /></div>
                  <h3 className="mv-title">Our Vision</h3>
                  <p className="mv-desc">
                    To become India's most trusted digital marketing partner for small and medium businesses — known for honesty, expertise, and long-term client relationships.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* VALUES */}
          <section className="section-premium section-premium-alt">
            <div className="section-container">
              <div className="section-header">
                <span className="section-badge"><Heart size={12} /> What We Stand For</span>
                <h2 className="section-title">Our Core Values</h2>
                <p className="section-subtitle">The principles that guide every decision we make</p>
              </div>
              <div className="values-grid">
                {values.map((v, i) => {
                  const Icon = v.icon;
                  return (
                    <div key={i} className="value-card">
                      <div className="value-icon"><Icon size={22} color="#fff" /></div>
                      <h3 className="value-title">{v.title}</h3>
                      <p className="value-desc">{v.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* FOUNDER — Dark Blue */}
          <section className="founder-section">
            <div className="founder-wrapper">
              <div className="founder-image-wrapper">
                <div className="founder-image-glow"></div>
                <div className="founder-image">
                  <img
                    src="/founder.png"
                    alt="Lalit Sen - Founder & CEO"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 10%", borderRadius: "50%" }}
                  />
                </div>
              </div>
              <div>
                <span className="founder-badge"><Star size={12} /> Meet The Founder</span>
                <h2 className="founder-name">Lalit Sen</h2>
                <p className="founder-role">Founder & CEO, Clickbriz Digital</p>
                <p className="founder-bio">
                  With <strong style={{ color: '#fff' }}>6+ years</strong> of hands-on experience in SEO, Google Ads, and digital marketing, Lalit founded Clickbriz Digital with a mission to deliver honest, results-driven marketing services to Indian businesses. He has personally worked on 120+ client projects, helping businesses rank on Google and scale their online presence. His approach is simple: <em style={{ color: '#93c5fd' }}>"Do the work that actually moves the needle — no shortcuts, no fluff."</em>
                </p>
                <div className="founder-social">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="founder-social-icon" aria-label="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="founder-social-icon" aria-label="Twitter">
                    <Twitter size={18} />
                  </a>
                  <a href="mailto:clickbriz@gmail.com" className="founder-social-icon" aria-label="Email">
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* TIMELINE */}
          <section className="section-premium section-premium-alt">
            <div className="section-container">
              <div className="section-header">
                <span className="section-badge"><TrendingUp size={12} /> Our Growth</span>
                <h2 className="section-title">The Journey So Far</h2>
                <p className="section-subtitle">From a one-person startup to a trusted agency</p>
              </div>
              <div className="timeline-wrapper">
                {milestones.map((m, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-card timeline-card-left">
                      <h3 className="timeline-title">{m.title}</h3>
                      <p className="timeline-desc">{m.desc}</p>
                    </div>
                    <div className="timeline-year-dot">{m.year}</div>
                    <div className="timeline-card timeline-card-right">
                      <h3 className="timeline-title">{m.title}</h3>
                      <p className="timeline-desc">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHY US */}
          {whyUsCards.length > 0 && (
            <section className="section-premium">
              <div className="section-container">
                <div className="section-header">
                  <span className="section-badge"><Award size={12} /> Why Us</span>
                  <h2 className="section-title">{whyUsHeading}</h2>
                </div>
                <div className="why-grid">
                  {whyUsCards.map((item, i) => (
                    <div key={i} className="why-card">
                      <div className="why-icon"><CheckCircle size={24} color="#fff" /></div>
                      <h3 className="why-title">{item.title}</h3>
                      <p className="why-desc">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CMS */}
          {hasCmsContent && (
            <section className="cms-section">
              <div className="cms-wrapper">
                <div className="section-header">
                  <span className="section-badge"><Sparkles size={12} /> Deep Dive</span>
                  <h2 className="section-title">More About Us</h2>
                </div>
                <div className="cms-content" dangerouslySetInnerHTML={{ __html: cmsContent! }} />
              </div>
            </section>
          )}

          {/* CTA — Dark Blue */}
          <section className="cta-section">
            <div className="cta-orb"></div>
            <div className="cta-content">
              <span className="section-badge">Let's Talk</span>
              <h2 className="section-title" style={{ marginBottom: '1rem' }}>{ctaHeading}</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>{ctaSubheading}</p>
              <a href={ctaButtonLink} className="cta-btn">
                {ctaButtonText} →
              </a>
            </div>
          </section>

        </main>
      </div>
      <Footer />
    </>
  );
}