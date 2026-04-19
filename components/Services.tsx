import { Search, TrendingUp, Share2, Globe, Cpu, Code2, ArrowRight, Sparkles } from "lucide-react";
import { getSection } from "@/lib/get-section";

const iconMap: Record<string, any> = {
  Search, TrendingUp, Share2, Globe, Cpu, Code2,
};

export default async function Services() {
  const d = await getSection("home-services");

  const label = d?.label || "Our Services";
  const heading = d?.heading || "Everything You Need to Grow Online";
  const subheading = d?.subheading || "From getting found on Google to converting visitors into customers — we handle it all.";
  const services: { icon: string; title: string; desc: string; href: string; color: string }[] = d?.services || [];

  return (
    <>
      <style>{`
        @keyframes fadeInService { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .services-section {
          position: relative;
          padding: 6rem 2rem;
          background: linear-gradient(180deg, #000000 0%, #0A0A0A 50%, #0A0A0A 100%);
          overflow: hidden;
        }
        .services-section::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 2px;
          background: linear-gradient(90deg, transparent, #F97316, transparent);
        }
        .services-orb {
          position: absolute;
          top: 30%; right: -5%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%);
          border-radius: 50%; filter: blur(80px);
          pointer-events: none;
        }

        .services-container {
          max-width: 1200px; margin: 0 auto;
          position: relative; z-index: 2;
        }

        .services-header {
          text-align: center; margin-bottom: 4rem;
        }
        .services-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(249, 115, 22, 0.1);
          border: 1px solid rgba(249, 115, 22, 0.25);
          padding: 6px 14px; border-radius: 999px;
          font-size: 11px; font-weight: 600; color: #FB923C;
          letter-spacing: 1.5px; text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .services-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800; color: #fff;
          line-height: 1.1; letter-spacing: -0.03em;
          margin: 0 0 1rem;
        }
        .services-heading-gradient {
          background: linear-gradient(135deg, #F97316 0%, #FB923C 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .services-subheading {
          font-size: 1.1rem; color: #A3A3A3;
          max-width: 600px; margin: 0 auto;
          line-height: 1.6;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .service-card {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.06) 0%, rgba(234, 88, 12, 0.03) 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 2rem;
          text-decoration: none;
          display: block;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
          animation: fadeInService 0.6s ease-out both;
        }
        .service-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.6), transparent);
          opacity: 0.5;
          transition: opacity 0.4s ease;
        }
        .service-card::after {
          content: '';
          position: absolute;
          top: -50%; right: -50%;
          width: 200%; height: 200%;
          background: radial-gradient(circle at center, rgba(249, 115, 22, 0.1) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .service-card:hover {
          transform: translateY(-6px);
          border-color: rgba(249, 115, 22, 0.4);
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(234, 88, 12, 0.06) 100%);
          box-shadow: 0 20px 60px rgba(249, 115, 22, 0.25);
        }
        .service-card:hover::before { opacity: 1; }
        .service-card:hover::after { opacity: 1; }

        .service-icon-wrap {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 30px rgba(249, 115, 22, 0.4);
          position: relative;
          z-index: 2;
          transition: transform 0.4s ease;
        }
        .service-card:hover .service-icon-wrap {
          transform: scale(1.1) rotate(-5deg);
        }

        .service-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.25rem; font-weight: 700;
          color: #fff; margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
          position: relative; z-index: 2;
        }
        .service-desc {
          font-size: 14px; color: #A3A3A3;
          line-height: 1.7; margin-bottom: 1.5rem;
          position: relative; z-index: 2;
        }

        .service-link {
          display: inline-flex; align-items: center; gap: 6px;
          color: #FB923C;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.3px;
          position: relative; z-index: 2;
          transition: gap 0.3s ease;
        }
        .service-card:hover .service-link { gap: 10px; }

        .services-grid > a:nth-child(1) { animation-delay: 0s; }
        .services-grid > a:nth-child(2) { animation-delay: 0.1s; }
        .services-grid > a:nth-child(3) { animation-delay: 0.2s; }
        .services-grid > a:nth-child(4) { animation-delay: 0.3s; }
        .services-grid > a:nth-child(5) { animation-delay: 0.4s; }
        .services-grid > a:nth-child(6) { animation-delay: 0.5s; }

        @media (max-width: 640px) {
          .services-section { padding: 4rem 1.25rem; }
          .service-card { padding: 1.75rem; }
        }
      `}</style>

      <section id="services" className="services-section">
        <div className="services-orb"></div>

        <div className="services-container">
          <div className="services-header">
            <span className="services-badge">
              <Sparkles size={12} /> {label}
            </span>
            <h2 className="services-heading">
              {heading.split(' ').slice(0, -2).join(' ')}{' '}
              <span className="services-heading-gradient">
                {heading.split(' ').slice(-2).join(' ')}
              </span>
            </h2>
            <p className="services-subheading">{subheading}</p>
          </div>

          <div className="services-grid">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon] || Search;
              return (
                <a key={i} href={s.href} className="service-card">
                  <div className="service-icon-wrap">
                    <Icon size={26} color="#fff" strokeWidth={2} />
                  </div>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-desc">{s.desc}</p>
                  <div className="service-link">
                    Learn More <ArrowRight size={14} />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}