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
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);
          overflow: hidden;
        }
        .services-section::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 2px;
          background: linear-gradient(90deg, transparent, #1e3a8a, transparent);
        }
        .services-orb {
          position: absolute;
          top: 30%; right: -5%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(30, 58, 138, 0.06) 0%, transparent 70%);
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
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          padding: 6px 14px; border-radius: 999px;
          font-size: 11px; font-weight: 600; color: #1e3a8a;
          letter-spacing: 1.5px; text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .services-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800; color: #0f172a;
          line-height: 1.1; letter-spacing: -0.03em;
          margin: 0 0 1rem;
        }
        .services-heading-gradient {
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .services-subheading {
          font-size: 1.1rem; color: #64748b;
          max-width: 600px; margin: 0 auto;
          line-height: 1.6;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .service-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 2rem;
          text-decoration: none;
          display: block;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          animation: fadeInService 0.6s ease-out both;
          box-shadow: 0 2px 12px rgba(30, 58, 138, 0.06);
        }
        .service-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #1e3a8a, #3730a3);
        }
        .service-card:hover {
          transform: translateY(-6px);
          border-color: #93c5fd;
          box-shadow: 0 20px 60px rgba(30, 58, 138, 0.15);
          background: #eff6ff;
        }

        .service-icon-wrap {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 30px rgba(30, 58, 138, 0.3);
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
          color: #0f172a; margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
          position: relative; z-index: 2;
        }
        .service-desc {
          font-size: 14px; color: #64748b;
          line-height: 1.7; margin-bottom: 1.5rem;
          position: relative; z-index: 2;
        }

        .service-link {
          display: inline-flex; align-items: center; gap: 6px;
          color: #1e3a8a;
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