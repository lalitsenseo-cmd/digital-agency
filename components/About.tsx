import { Star, Quote } from "lucide-react";
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
      <style suppressHydrationWarning>{`
        @keyframes testFadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

        .testimonials-section {
          position: relative;
          padding: 6rem 2rem;
          background: linear-gradient(180deg, #f8fafc 0%, #eff6ff 50%, #f8fafc 100%);
          overflow: hidden;
        }
        .testimonials-section::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 2px;
          background: linear-gradient(90deg, transparent, #1e3a8a, transparent);
        }
        .testimonials-orb {
          position: absolute;
          top: 20%; right: -10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(30, 58, 138, 0.08) 0%, transparent 70%);
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
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          padding: 6px 14px; border-radius: 999px;
          font-size: 11px; font-weight: 600; color: #1e3a8a;
          letter-spacing: 1.5px; text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .test-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800; color: #0f172a;
          line-height: 1.1; letter-spacing: -0.03em;
          margin: 0;
        }
        .test-heading-gradient {
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .testimonial-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          animation: testFadeIn 0.5s ease-out both;
          box-shadow: 0 2px 12px rgba(30, 58, 138, 0.06);
        }
        .testimonial-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #1e3a8a, #3730a3);
        }
        .testimonial-card::after {
          content: '"';
          position: absolute;
          top: -10px; right: 20px;
          font-family: Georgia, serif;
          font-size: 8rem; line-height: 1;
          color: rgba(30, 58, 138, 0.08);
          pointer-events: none; font-weight: 900;
        }
        .testimonial-card:hover {
          transform: translateY(-5px);
          border-color: #93c5fd;
          box-shadow: 0 20px 60px rgba(30, 58, 138, 0.12);
        }
        .test-stars {
          display: flex; gap: 3px;
          margin-bottom: 1.25rem;
          position: relative; z-index: 2;
        }
        .test-text {
          font-size: 14px; color: #475569;
          line-height: 1.75; margin-bottom: 1.5rem;
          font-style: italic; position: relative; z-index: 2;
        }
        .test-author {
          display: flex; align-items: center; gap: 12px;
          padding-top: 1.25rem;
          border-top: 1px solid #e2e8f0;
          position: relative; z-index: 2;
        }
        .test-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 6px 18px rgba(30, 58, 138, 0.3);
        }
        .test-avatar-text {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800; font-size: 16px; color: #fff;
        }
        .test-author-info { flex: 1; min-width: 0; }
        .test-author-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700; font-size: 14px;
          color: #0f172a; margin-bottom: 2px;
        }
        .test-author-role { font-size: 12px; color: #64748b; }
        .testimonials-grid > div:nth-child(1) { animation-delay: 0s; }
        .testimonials-grid > div:nth-child(2) { animation-delay: 0.1s; }
        .testimonials-grid > div:nth-child(3) { animation-delay: 0.2s; }
        .testimonials-grid > div:nth-child(4) { animation-delay: 0.3s; }
        .testimonials-grid > div:nth-child(5) { animation-delay: 0.4s; }
        .testimonials-grid > div:nth-child(6) { animation-delay: 0.5s; }
        .testimonials-empty {
          text-align: center; padding: 3rem 2rem;
          color: #94a3b8; font-size: 15px;
          background: #f8fafc;
          border: 1px dashed #bfdbfe; border-radius: 16px;
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
                      <Star key={j} size={14} fill="#1e3a8a" color="#1e3a8a" />
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