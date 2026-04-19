import { Star, Sparkles, Quote } from "lucide-react";
import { getSection } from "@/lib/get-section";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
};

export default async function About() {
  const d = await getSection("home-testimonials");

  const label = d?.label || "Testimonials";
  const heading = d?.heading || "What Our Clients Say";
  const testimonials: Testimonial[] = d?.testimonials || [];

  return (
    <>
      <style>{`
        @keyframes testFadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

        .testimonials-section {
          position: relative;
          padding: 6rem 2rem;
          background: linear-gradient(180deg, #0A0A0A 0%, #171717 50%, #0A0A0A 100%);
          overflow: hidden;
        }
        .testimonials-section::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 2px;
          background: linear-gradient(90deg, transparent, #F97316, transparent);
        }
        .testimonials-orb {
          position: absolute;
          top: 20%; right: -10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, transparent 70%);
          border-radius: 50%; filter: blur(80px);
          pointer-events: none;
        }

        .testimonials-container {
          max-width: 1200px; margin: 0 auto;
          position: relative; z-index: 2;
        }

        .testimonials-header {
          text-align: center; margin-bottom: 3.5rem;
        }
        .test-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(249, 115, 22, 0.1);
          border: 1px solid rgba(249, 115, 22, 0.25);
          padding: 6px 14px; border-radius: 999px;
          font-size: 11px; font-weight: 600; color: #FB923C;
          letter-spacing: 1.5px; text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .test-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800; color: #fff;
          line-height: 1.1; letter-spacing: -0.03em;
          margin: 0;
        }
        .test-heading-gradient {
          background: linear-gradient(135deg, #F97316 0%, #FB923C 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .testimonial-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
          animation: testFadeIn 0.5s ease-out both;
        }
        .testimonial-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.6), transparent);
          opacity: 0.5;
          transition: opacity 0.4s ease;
        }
        .testimonial-card::after {
          content: '"';
          position: absolute;
          top: -10px;
          right: 20px;
          font-family: Georgia, serif;
          font-size: 8rem;
          line-height: 1;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(234, 88, 12, 0.05) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          pointer-events: none;
          font-weight: 900;
        }
        .testimonial-card:hover {
          transform: translateY(-5px);
          border-color: rgba(249, 115, 22, 0.4);
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(234, 88, 12, 0.03) 100%);
          box-shadow: 0 20px 60px rgba(249, 115, 22, 0.2);
        }
        .testimonial-card:hover::before { opacity: 1; }

        .test-stars {
          display: flex;
          gap: 3px;
          margin-bottom: 1.25rem;
          position: relative;
          z-index: 2;
        }

        .test-text {
          font-size: 14px;
          color: #E5E5E5;
          line-height: 1.75;
          margin-bottom: 1.5rem;
          font-style: italic;
          position: relative;
          z-index: 2;
        }

        .test-author {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          z-index: 2;
        }
        .test-avatar {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 6px 18px rgba(249, 115, 22, 0.5);
          border: 2px solid rgba(249, 115, 22, 0.3);
        }
        .test-avatar-text {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 16px;
          color: #fff;
        }
        .test-author-info {
          flex: 1;
          min-width: 0;
        }
        .test-author-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: #fff;
          margin-bottom: 2px;
        }
        .test-author-role {
          font-size: 12px;
          color: #A3A3A3;
        }

        .testimonials-grid > div:nth-child(1) { animation-delay: 0s; }
        .testimonials-grid > div:nth-child(2) { animation-delay: 0.1s; }
        .testimonials-grid > div:nth-child(3) { animation-delay: 0.2s; }
        .testimonials-grid > div:nth-child(4) { animation-delay: 0.3s; }
        .testimonials-grid > div:nth-child(5) { animation-delay: 0.4s; }
        .testimonials-grid > div:nth-child(6) { animation-delay: 0.5s; }

        .testimonials-empty {
          text-align: center;
          padding: 3rem 2rem;
          color: #71717A;
          font-size: 15px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed rgba(249, 115, 22, 0.2);
          border-radius: 16px;
        }

        @media (max-width: 640px) {
          .testimonials-section { padding: 4rem 1.25rem; }
          .testimonial-card { padding: 1.75rem; }
        }
      `}</style>

      <section className="testimonials-section">
        <div className="testimonials-orb"></div>

        <div className="testimonials-container">
          <div className="testimonials-header">
            <span className="test-badge">
              <Quote size={12} /> {label}
            </span>
            <h2 className="test-heading">
              {heading.split(' ').slice(0, -2).join(' ')}{' '}
              <span className="test-heading-gradient">
                {heading.split(' ').slice(-2).join(' ')}
              </span>
            </h2>
          </div>

          {testimonials.length > 0 ? (
            <div className="testimonials-grid">
              {testimonials.map(t => (
                <div key={t.id} className="testimonial-card">
                  <div className="test-stars">
                    {Array(Math.min(t.rating, 5)).fill(0).map((_, j) => (
                      <Star key={j} size={14} fill="#F97316" color="#F97316" />
                    ))}
                  </div>
                  <p className="test-text">&ldquo;{t.text}&rdquo;</p>
                  <div className="test-author">
                    <div className="test-avatar">
                      <span className="test-avatar-text">{t.name[0]?.toUpperCase()}</span>
                    </div>
                    <div className="test-author-info">
                      <div className="test-author-name">{t.name}</div>
                      <div className="test-author-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="testimonials-empty">No testimonials to display yet.</div>
          )}
        </div>
      </section>
    </>
  );
}