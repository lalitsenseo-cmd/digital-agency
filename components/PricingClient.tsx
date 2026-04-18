"use client";
import { Check, Zap } from "lucide-react";
import { useState } from "react";

type Plan = {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  desc: string;
  features: string[];
  popular: boolean;
  color: string;
};

export default function PricingClient({
  label, heading, subheading, plans,
}: {
  label: string;
  heading: string;
  subheading: string;
  plans: Plan[];
}) {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" style={{ padding: "5rem 2rem", background: "#f8f9fb", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>{label}</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", marginBottom: "0.75rem" }}>{heading}</h2>
          <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>{subheading}</p>
          <div style={{ display: "inline-flex", background: "#e5e7eb", borderRadius: "999px", padding: "4px" }}>
            {["Monthly", "Yearly"].map(t => (
              <button key={t} onClick={() => setYearly(t === "Yearly")} style={{
                padding: "7px 20px", borderRadius: "999px", border: "none", cursor: "pointer",
                fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "13px", fontWeight: 600,
                background: (t === "Yearly") === yearly ? "#fff" : "transparent",
                color: (t === "Yearly") === yearly ? "#0f1117" : "#6b7280",
                boxShadow: (t === "Yearly") === yearly ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.2s",
              }}>
                {t} {t === "Yearly" && <span style={{ fontSize: "11px", color: "#16a34a", fontWeight: 700 }}>−20%</span>}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", alignItems: "stretch" }}>
          {plans.map(plan => (
            <div key={plan.id} style={{
              background: "#fff",
              border: plan.popular ? "2px solid #2563eb" : "1px solid #e5e7eb",
              borderRadius: "20px", padding: "2rem", position: "relative",
              display: "flex", flexDirection: "column",
              boxShadow: plan.popular ? "0 8px 40px rgba(37,99,235,0.12)" : "none",
            }}>
              {plan.popular && (
                <div style={{
                  position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
                  background: "#2563eb", color: "#fff", padding: "4px 16px", borderRadius: "999px",
                  fontSize: "11px", fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif",
                  display: "flex", alignItems: "center", gap: "5px", whiteSpace: "nowrap",
                }}>
                  <Zap size={11} /> Most Popular
                </div>
              )}
              <h3 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "20px", fontWeight: 800, color: plan.color, marginBottom: "0.5rem" }}>{plan.name}</h3>
              <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "1.25rem", lineHeight: 1.5 }}>{plan.desc}</p>
              <div style={{ marginBottom: "1.75rem" }}>
                <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "#0f1117" }}>
                  ₹{(yearly ? plan.priceYearly : plan.priceMonthly).toLocaleString("en-IN")}
                </span>
                <span style={{ fontSize: "14px", color: "#9ca3af" }}>/mo</span>
              </div>
              <ul style={{ listStyle: "none", marginBottom: "2rem", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.5 }}>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="/contact" style={{
                textDecoration: "none",
                background: plan.popular ? "#2563eb" : "#fff",
                border: plan.popular ? "none" : "1px solid #e5e7eb",
                color: plan.popular ? "#fff" : "#374151",
                padding: "13px", borderRadius: "10px", textAlign: "center",
                fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "14px",
                display: "block", transition: "opacity 0.2s",
                boxShadow: plan.popular ? "0 4px 16px rgba(37,99,235,0.3)" : "none",
              }}>Get Started</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}