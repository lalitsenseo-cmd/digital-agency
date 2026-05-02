"use client";

const STATS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    label: "Revenue Growth",
    value: "3X to 6X",
    sub: "Proven results across clients",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
    label: "Improved Leads",
    value: "4X to 8X",
    sub: "High quality lead generation",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
    label: "Social Media Reach",
    value: "5X to 10X",
    sub: "Enhanced audience engagement",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    label: "Brand Exposure",
    value: "100 to 1000%",
    sub: "Massive visibility boost",
  },
];

export default function StatsBar() {
  return (
    <section style={{
      background: "linear-gradient(90deg, #1e3a8a, #3730a3, #1e3a8a)",
      borderTop: "none",
      borderBottom: "none",
      padding: "40px 24px",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 24,
      }}>
        {STATS.map((stat, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            padding: "20px 20px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 16,
            transition: "all 0.3s ease",
            cursor: "default",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.35)";
            (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.15)";
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.15)";
            (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLDivElement).style.transform = "";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "";
          }}
          >
            {/* Icon */}
            <div style={{
              width: 48, height: 48, borderRadius: 12, flexShrink: 0,
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            }}>
              {stat.icon}
            </div>

            {/* Text */}
            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)",
                textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 4,
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: "1.4rem", fontWeight: 900, letterSpacing: "-0.02em",
                color: "#fff",
                marginBottom: 4, lineHeight: 1.1,
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>
                {stat.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}