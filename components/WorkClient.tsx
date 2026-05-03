"use client";
import { ExternalLink, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";

type Project = {
  id: string;
  title: string;
  category: string;
  result: string;
  desc: string;
  color: string;
};

export default function WorkClient({
  label, heading, subheading, projects,
}: {
  label: string;
  heading: string;
  subheading: string;
  projects: Project[];
}) {
  const [active, setActive] = useState("All");
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  const filtered = active === "All" ? projects : projects.filter(p => p.category === active);

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes workFadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

        .work-section {
          position: relative;
          padding: 6rem 2rem;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);
          overflow: hidden;
        }
        .work-section::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 2px;
          background: linear-gradient(90deg, transparent, #1e3a8a, transparent);
        }
        .work-orb {
          position: absolute;
          bottom: 10%; left: -10%;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(30, 58, 138, 0.06) 0%, transparent 70%);
          border-radius: 50%; filter: blur(80px);
          pointer-events: none;
        }

        .work-container {
          max-width: 1200px; margin: 0 auto;
          position: relative; z-index: 2;
        }

        .work-header {
          text-align: center; margin-bottom: 3rem;
        }
        .work-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          padding: 6px 14px; border-radius: 999px;
          font-size: 11px; font-weight: 600; color: #1e3a8a;
          letter-spacing: 1.5px; text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .work-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800; color: #0f172a;
          line-height: 1.1; letter-spacing: -0.03em;
          margin: 0 0 1rem;
        }
        .work-heading-gradient {
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .work-subheading {
          font-size: 1.1rem; color: #64748b;
          max-width: 600px; margin: 0 auto;
          line-height: 1.6;
        }

        .filter-row {
          display: flex; flex-wrap: wrap; gap: 10px;
          justify-content: center; margin-bottom: 3rem;
        }
        .filter-pill {
          background: #fff;
          border: 1px solid #e2e8f0;
          color: #64748b;
          padding: 9px 20px;
          border-radius: 999px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: all 0.3s ease;
        }
        .filter-pill:hover {
          background: #eff6ff;
          border-color: #93c5fd;
          color: #1e3a8a;
        }
        .filter-pill.active {
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 8px 24px rgba(30, 58, 138, 0.3);
        }

        .work-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .project-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s ease;
          animation: workFadeIn 0.5s ease-out both;
          position: relative;
          box-shadow: 0 2px 12px rgba(30, 58, 138, 0.06);
        }
        .project-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #1e3a8a 0%, #3730a3 100%);
        }
        .project-card:hover {
          transform: translateY(-6px);
          border-color: #93c5fd;
          background: #eff6ff;
          box-shadow: 0 20px 60px rgba(30, 58, 138, 0.12);
        }

        .project-content {
          padding: 1.75rem;
        }
        .project-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }
        .project-category {
          font-size: 10px;
          font-weight: 800;
          padding: 5px 12px;
          border-radius: 999px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          color: #1e3a8a;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }
        .project-external {
          color: #94a3b8;
          transition: color 0.3s ease;
        }
        .project-card:hover .project-external {
          color: #1e3a8a;
        }

        .project-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.125rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.75rem;
          line-height: 1.35;
          letter-spacing: -0.01em;
        }
        .project-desc {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 1.25rem;
          line-height: 1.6;
        }
        .project-result {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          color: #1e3a8a;
          letter-spacing: 0.3px;
        }
        .project-result-icon {
          color: #1e3a8a;
        }

        .work-grid > div:nth-child(1) { animation-delay: 0s; }
        .work-grid > div:nth-child(2) { animation-delay: 0.08s; }
        .work-grid > div:nth-child(3) { animation-delay: 0.16s; }
        .work-grid > div:nth-child(4) { animation-delay: 0.24s; }
        .work-grid > div:nth-child(5) { animation-delay: 0.32s; }
        .work-grid > div:nth-child(6) { animation-delay: 0.4s; }
        .work-grid > div:nth-child(7) { animation-delay: 0.48s; }
        .work-grid > div:nth-child(8) { animation-delay: 0.56s; }

        .work-empty {
          text-align: center;
          padding: 4rem 2rem;
          color: #94a3b8;
          font-size: 15px;
        }

        @media (max-width: 640px) {
          .work-section { padding: 4rem 1.25rem; }
          .project-content { padding: 1.5rem; }
        }
      `}</style>

      <section id="work" className="work-section">
        <div className="work-orb"></div>

        <div className="work-container">
          <div className="work-header">
            <span className="work-badge">
              <Sparkles size={12} /> {label}
            </span>
            <h2 className="work-heading">
              {heading.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="work-heading-gradient">
                {heading.split(' ').slice(-1).join(' ')}
              </span>
            </h2>
            <p className="work-subheading">{subheading}</p>
          </div>

          {categories.length > 1 && (
            <div className="filter-row">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`filter-pill ${active === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="work-grid">
              {filtered.map((p) => (
                <div key={p.id} className="project-card">
                  <div className="project-content">
                    <div className="project-top">
                      <span className="project-category">{p.category}</span>
                      <ExternalLink size={16} className="project-external" />
                    </div>
                    <h3 className="project-title">{p.title}</h3>
                    <p className="project-desc">{p.desc}</p>
                    <div className="project-result">
                      <TrendingUp size={14} className="project-result-icon" />
                      {p.result}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="work-empty">No projects to show in this category.</div>
          )}
        </div>
      </section>
    </>
  );
}