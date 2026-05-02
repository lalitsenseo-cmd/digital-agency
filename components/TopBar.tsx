"use client";

export default function TopBar(): JSX.Element {
  return (
    <>
      <style>{`
        .topbar-link {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s ease;
          white-space: nowrap;
        }
        .topbar-link:hover { color: #fff; }
        .topbar-link svg { flex-shrink: 0; }
        .topbar-divider {
          width: 1px;
          height: 16px;
          background: rgba(255,255,255,0.25);
          flex-shrink: 0;
        }
        @media (max-width: 640px) {
          .topbar-inner { justify-content: center !important; gap: 16px !important; }
          .topbar-divider { display: none; }
          .topbar-link span { display: none; }
        }
      `}</style>

      <div style={{ height: 48 }} />

      <div style={{
        width: "100%",
        background: "#1e3a8a",
        borderBottom: "none",
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 200,
      }}>
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
        }} />

        <div className="topbar-inner" style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 24px",
          height: 48, display: "flex", alignItems: "center",
          justifyContent: "center", gap: 32,
        }}>

          <a href="tel:+918527004901" className="topbar-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>+91 85270 04901</span>
          </a>

          <div className="topbar-divider" />

          <a href="mailto:clickbriz@gmail.com" className="topbar-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>clickbriz@gmail.com</span>
          </a>

          <div className="topbar-divider" />

          <a href="https://wa.me/918527004901" target="_blank" rel="noopener noreferrer" className="topbar-link">
            <svg width="15" height="15" viewBox="0 0 32 32" fill="#25D366">
              <path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.66 4.76 1.8 6.76L2 30l7.46-1.76A13.9 13.9 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm7.28 19.44c-.3.84-1.76 1.6-2.42 1.68-.62.08-1.4.1-2.26-.14a20.6 20.6 0 0 1-2.04-.76C13.2 21 10.9 18.3 10.72 18.08c-.18-.22-1.48-1.96-1.48-3.74s.94-2.66 1.28-3.02c.3-.34.66-.42.88-.42h.62c.2 0 .48-.08.74.56.28.66.94 2.28 1.02 2.44.08.18.14.38.02.62-.1.22-.16.36-.32.56-.16.18-.34.42-.48.56-.16.16-.34.34-.14.66.2.3.88 1.46 1.9 2.36 1.3 1.16 2.4 1.52 2.74 1.7.32.16.52.14.72-.08.2-.22.86-.98 1.08-1.32.22-.32.44-.26.74-.16.3.1 1.9.9 2.22 1.06.32.16.54.24.62.38.08.12.08.72-.22 1.56z" />
            </svg>
            <span>WhatsApp</span>
          </a>

        </div>
      </div>
    </>
  );
}