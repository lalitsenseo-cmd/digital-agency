"use client";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";

export default function Work() {
  const { content } = useAdmin();
  const [active, setActive] = useState("All");
  const categories = ["All", ...Array.from(new Set(content.projects.map(p => p.category)))];
  const filtered = active === "All" ? content.projects : content.projects.filter(p => p.category === active);

  return (
    <section id="work" style={{ padding: "5rem 2rem", background: "#f8f9fb", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Our Work</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", marginBottom: "0.75rem" }}>Results That Speak</h2>
          <p style={{ color: "#6b7280" }}>Real projects. Real numbers. No fluff.</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "2.5rem" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              background: active === cat ? "#2563eb" : "#fff",
              border: `1px solid ${active === cat ? "#2563eb" : "#e5e7eb"}`,
              color: active === cat ? "#fff" : "#6b7280",
              padding: "7px 18px", borderRadius: "999px", cursor: "pointer",
              fontSize: "13px", fontWeight: active === cat ? 700 : 400, fontFamily: "Plus Jakarta Sans, sans-serif",
              transition: "all 0.2s",
            }}>{cat}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {filtered.map((p) => (
            <div key={p.id} style={{
              background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px",
              overflow: "hidden", transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ height: "6px", background: p.color }} />
              <div style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", background: p.color + "15", color: p.color }}>{p.category}</span>
                  <ExternalLink size={14} color="#d1d5db" />
                </div>
                <h3 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "16px", fontWeight: 700, color: "#0f1117", marginBottom: "0.6rem", lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "1rem", lineHeight: 1.6 }}>{p.desc}</p>
                <div style={{ display: "inline-block", padding: "6px 14px", background: p.color + "10", border: `1px solid ${p.color}30`, borderRadius: "8px", fontSize: "13px", fontWeight: 700, color: p.color }}>{p.result}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
