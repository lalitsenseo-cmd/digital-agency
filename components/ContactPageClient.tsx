"use client";
import { useState } from "react";
import { Send, MessageCircle, Mail, Phone, MapPin } from "lucide-react";

const iconMap: Record<string, any> = { MessageCircle, Mail, Phone, MapPin };

type ContactItem = {
  icon: string;
  label: string;
  value: string;
  href: string;
  color: string;
};

export default function ContactPageClient({
  infoHeading, contactInfo, formHeading, services, budgets, successMessage,
}: {
  infoHeading: string;
  contactInfo: ContactItem[];
  formHeading: string;
  services: string[];
  budgets: string[];
  successMessage: string;
}) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          service: form.service,
          message: `Phone: ${form.phone}\nBudget: ${form.budget}\n\n${form.message}`,
        }),
      });
      const json = await res.json();
      if (json.success) setSent(true);
      else alert('Error: ' + json.error);
    } catch {
      alert('Network error');
    }
    setSubmitting(false);
  };

  return (
    <section style={{ padding: "4rem 2rem", background: "#fff" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem" }}>
        <div>
          <h2 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>{infoHeading}</h2>
          {contactInfo.map(c => {
            const Icon = iconMap[c.icon] || MessageCircle;
            return (
              <a key={c.label} href={c.href} style={{
                display: "flex", alignItems: "center", gap: "14px",
                padding: "14px 16px", background: "#f8f9fb",
                border: "1px solid #e5e7eb", borderRadius: "12px",
                marginBottom: "12px", textDecoration: "none",
                transition: "border-color 0.2s, transform 0.2s",
              }}>
                <div style={{ width: "40px", height: "40px", background: c.color + "15", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={18} color={c.color} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.label}</div>
                  <div style={{ fontSize: "14px", color: "#374151", fontWeight: 600 }}>{c.value}</div>
                </div>
              </a>
            );
          })}
        </div>

        <div style={{ background: "#f8f9fb", border: "1px solid #e5e7eb", borderRadius: "20px", padding: "2rem" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <h3 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "#16a34a", fontSize: "1.5rem", marginBottom: "0.5rem" }}>Message Sent!</h3>
              <p style={{ color: "#6b7280" }}>{successMessage}</p>
              <button onClick={() => setSent(false)} style={{ marginTop: "1.5rem", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 24px", cursor: "pointer", fontWeight: 700 }}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <h3 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "18px", fontWeight: 800, marginBottom: "4px" }}>{formHeading}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <input type="text" placeholder="Your Name" required value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "11px 14px", fontSize: "14px", outline: "none", width: "100%" }} />
                <input type="email" placeholder="Email Address" required value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "11px 14px", fontSize: "14px", outline: "none", width: "100%" }} />
              </div>
              <input type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "11px 14px", fontSize: "14px", outline: "none" }} />
              <select required value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "11px 14px", fontSize: "14px", outline: "none", color: form.service ? "#374151" : "#9ca3af" }}>
                <option value="" disabled>Select Service Needed</option>
                {services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}
                style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "11px 14px", fontSize: "14px", outline: "none", color: form.budget ? "#374151" : "#9ca3af" }}>
                <option value="" disabled>Monthly Budget Range</option>
                {budgets.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <textarea placeholder="Tell us about your business and goals..." rows={4} value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "11px 14px", fontSize: "14px", outline: "none", resize: "vertical" }} />
              <button type="submit" disabled={submitting} style={{
                background: submitting ? "#9ca3af" : "#2563eb", border: "none", borderRadius: "10px", padding: "14px",
                color: "#fff", fontWeight: 700, fontSize: "15px",
                cursor: submitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
              }}>
                <Send size={15} /> {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}