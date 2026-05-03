"use client";
import { useState } from "react";
import { Send, MessageCircle, Mail, Phone, MapPin, CheckCircle, Sparkles, User, AtSign, DollarSign } from "lucide-react";

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

  const getIconColor = (originalColor: string) => {
    if (originalColor === "#25D366" || originalColor.toLowerCase().includes("25d366")) {
      return "#25D366";
    }
    return "#93c5fd";
  };

  return (
    <>
      <style>{`
        @keyframes fadeInSection { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .contact-form-section {
          position: relative;
          padding: 5rem 2rem;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);
          overflow: hidden;
        }
        .contact-form-section::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 2px;
          background: linear-gradient(90deg, transparent, #1e3a8a, transparent);
        }
        .cf-orb-1 {
          position: absolute; top: 20%; right: -10%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(30, 58, 138, 0.1) 0%, transparent 70%);
          border-radius: 50%; filter: blur(80px);
          pointer-events: none;
        }
        .cf-orb-2 {
          position: absolute; bottom: 10%; left: -10%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(55, 48, 163, 0.1) 0%, transparent 70%);
          border-radius: 50%; filter: blur(80px);
          pointer-events: none;
        }

        .cf-container {
          max-width: 1200px; margin: 0 auto;
          position: relative; z-index: 2;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 3rem;
          align-items: start;
        }

        .cf-info-column {
          animation: fadeInSection 0.6s ease-out;
        }

        .cf-info-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.75rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }
        .cf-info-subheading {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 1.75rem;
          line-height: 1.6;
        }

        .cf-info-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 1.25rem 1.5rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          margin-bottom: 14px;
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }
        .cf-info-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #1e3a8a 0%, #3730a3 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .cf-info-card:hover {
          border-color: rgba(30, 58, 138, 0.4);
          background: linear-gradient(135deg, rgba(30, 58, 138, 0.08) 0%, rgba(55, 48, 163, 0.03) 100%);
          transform: translateX(4px);
        }
        .cf-info-card:hover::before { opacity: 1; }

        .cf-info-icon-wrap {
          width: 48px; height: 48px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .cf-info-icon-orange {
          background: rgba(30, 58, 138, 0.15);
          border: 1px solid rgba(30, 58, 138, 0.3);
          color: #93c5fd;
        }
        .cf-info-icon-whatsapp {
          background: rgba(37, 211, 102, 0.15);
          border: 1px solid rgba(37, 211, 102, 0.3);
          color: #25D366;
        }
        .cf-info-card:hover .cf-info-icon-wrap {
          transform: scale(1.05);
        }

        .cf-info-text-label {
          font-size: 11px;
          color: #94a3b8;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          margin-bottom: 4px;
        }
        .cf-info-text-value {
          font-size: 15px;
          color: #0f172a;
          font-weight: 600;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .cf-hours-card {
        padding: 1.25rem 1.5rem;
        background: linear-gradient(135deg, rgba(30, 58, 138, 0.08) 0%, rgba(55, 48, 163, 0.03) 100%);
        border: 1px solid rgba(30, 58, 138, 0.2);
          border-radius: 16px;
          margin-top: 20px;
          backdrop-filter: blur(10px);
        }
        .cf-hours-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #93c5fd;
          margin-bottom: 10px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .cf-hours-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .cf-hours-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }
        .cf-hours-day { color: #475569; }
        .cf-hours-time {
          color: #0f172a;
          font-weight: 600;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .cf-hours-closed { color: #94a3b8; }

        .cf-form-wrap {
          background: #fff 0%, rgba(255, 255, 255, 0.01) 100%);
          border: 1px solid rgba(30, 58, 138, 0.25);
          border-radius: 24px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(30,58,138,0.08);
          animation: fadeInSection 0.6s ease-out 0.15s both;
        }
        .cf-form-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #1e3a8a, transparent);
        }

        .cf-form-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.5rem;
        }
        .cf-form-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(30, 58, 138, 0.12);
          border: 1px solid rgba(30, 58, 138, 0.3);
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 700;
          color: #93c5fd;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }
        .cf-form-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.01em;
        }

        .cf-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cf-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 480px) {
          .cf-form-row { grid-template-columns: 1fr; }
        }

        .cf-field {
          position: relative;
        }
        .cf-label {
          display: block;
          font-size: 12px;
          color: #93c5fd;
          font-weight: 600;
          margin-bottom: 6px;
          letter-spacing: 0.3px;
        }

        .cf-input,
        .cf-select,
        .cf-textarea {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 13px 16px;
          font-size: 14px;
          font-family: Inter, sans-serif;
          color: #0f172a;
          outline: none;
          transition: all 0.3s ease;
          width: 100%;
          box-sizing: border-box;
        }
        .cf-input::placeholder,
        .cf-textarea::placeholder {
          color: #94a3b8;
        }
        .cf-input:hover,
        .cf-select:hover,
        .cf-textarea:hover {
          border-color: rgba(30, 58, 138, 0.3);
        }
        .cf-input:focus,
        .cf-select:focus,
        .cf-textarea:focus {
          border-color: rgba(30, 58, 138, 0.6);
          background: rgba(30, 58, 138, 0.04);
          box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
        }

        .cf-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2393c5fd' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 40px;
        }
        .cf-select option {
          background: #ffffff;
          color: #0f172a;
        }
        .cf-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .cf-submit {
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
          border: none;
          border-radius: 12px;
          padding: 16px;
          color: #ffffff;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 10px 30px rgba(30, 58, 138, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset;
          transition: all 0.3s ease;
          margin-top: 8px;
          letter-spacing: 0.3px;
        }
        .cf-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(30, 58, 138, 0.6), 0 0 0 1px rgba(255,255,255,0.2) inset;
        }
        .cf-submit:disabled {
          background: rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
        }

        .cf-privacy-note {
          font-size: 11px;
          color: #94a3b8;
          text-align: center;
          margin-top: 6px;
          line-height: 1.5;
        }

        .cf-success {
          text-align: center;
          padding: 3rem 1rem;
        }
        .cf-success-icon {
          width: 80px; height: 80px;
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          box-shadow: 0 10px 30px rgba(30, 58, 138, 0.5);
          animation: fadeInSection 0.5s ease-out;
        }
        .cf-success-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.75rem;
          font-weight: 800;
          background: linear-gradient(135deg, #1e3a8a, #93c5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }
        .cf-success-msg {
          color: #475569;
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }
        .cf-send-another {
          background: #eff6ff;
          color: #93c5fd;
          border: 1px solid rgba(30, 58, 138, 0.3);
          border-radius: 10px;
          padding: 12px 28px;
          cursor: pointer;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          transition: all 0.3s ease;
          letter-spacing: 0.3px;
        }
        .cf-send-another:hover {
          background: rgba(30, 58, 138, 0.1);
          border-color: rgba(30, 58, 138, 0.5);
          color: #0f172a;
        }

        @media (max-width: 640px) {
          .contact-form-section { padding: 3rem 1.25rem; }
          .cf-form-wrap { padding: 1.75rem; }
          .cf-container { gap: 2rem; }
        }
      `}</style>

      <section className="contact-form-section">
        <div className="cf-orb-1"></div>
        <div className="cf-orb-2"></div>

        <div className="cf-container">

          <div className="cf-info-column">
            <h2 className="cf-info-heading">{infoHeading}</h2>
            <p className="cf-info-subheading">
              Reach out through any channel — we respond within 24 hours.
            </p>

            {contactInfo.map(c => {
              const Icon = iconMap[c.icon] || MessageCircle;
              const isWhatsApp = c.label.toLowerCase().includes("whatsapp") || c.icon === "MessageCircle";
              return (
                <a key={c.label} href={c.href} className="cf-info-card">
                  <div className={`cf-info-icon-wrap ${isWhatsApp ? 'cf-info-icon-whatsapp' : 'cf-info-icon-orange'}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="cf-info-text-label">{c.label}</div>
                    <div className="cf-info-text-value">{c.value}</div>
                  </div>
                </a>
              );
            })}

            <div className="cf-hours-card">
              <div className="cf-hours-title">⏰ Business Hours</div>
              <div className="cf-hours-list">
                <div className="cf-hours-row">
                  <span className="cf-hours-day">Monday - Friday</span>
                  <span className="cf-hours-time">10:00 AM - 7:00 PM</span>
                </div>
                <div className="cf-hours-row">
                  <span className="cf-hours-day">Saturday</span>
                  <span className="cf-hours-time">10:00 AM - 5:00 PM</span>
                </div>
                <div className="cf-hours-row">
                  <span className="cf-hours-day">Sunday</span>
                  <span className="cf-hours-closed">Closed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cf-form-wrap">
            {sent ? (
              <div className="cf-success">
                <div className="cf-success-icon">
                  <CheckCircle size={40} color="#fff" strokeWidth={3} />
                </div>
                <h3 className="cf-success-title">Message Sent Successfully!</h3>
                <p className="cf-success-msg">{successMessage}</p>
                <button onClick={() => {
                  setSent(false);
                  setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
                }} className="cf-send-another">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="cf-form">
                <div className="cf-form-header">
                  <span className="cf-form-badge">
                    <Sparkles size={10} /> Free
                  </span>
                  <h3 className="cf-form-heading">{formHeading}</h3>
                </div>

                <div className="cf-form-row">
                  <div className="cf-field">
                    <label className="cf-label">Your Name *</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      required 
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="cf-input"
                    />
                  </div>
                  <div className="cf-field">
                    <label className="cf-label">Email *</label>
                    <input 
                      type="email" 
                      placeholder="you@company.com" 
                      required 
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="cf-input"
                    />
                  </div>
                </div>

                <div className="cf-field">
                  <label className="cf-label">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    value={form.phone} 
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="cf-input"
                  />
                </div>

                <div className="cf-field">
                  <label className="cf-label">Service Needed *</label>
                  <select 
                    required 
                    value={form.service} 
                    onChange={e => setForm({ ...form, service: e.target.value })}
                    className="cf-select"
                    style={{ color: form.service ? "#fff" : "#71717A" }}
                  >
                    <option value="" disabled>Select a service</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="cf-field">
                  <label className="cf-label">Monthly Budget Range</label>
                  <select 
                    value={form.budget} 
                    onChange={e => setForm({ ...form, budget: e.target.value })}
                    className="cf-select"
                    style={{ color: form.budget ? "#fff" : "#71717A" }}
                  >
                    <option value="" disabled>Select your budget</option>
                    {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div className="cf-field">
                  <label className="cf-label">Your Message *</label>
                  <textarea 
                    placeholder="Tell us about your business, goals, and what you're looking to achieve..." 
                    required
                    rows={4} 
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="cf-textarea"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="cf-submit"
                >
                  <Send size={16} /> {submitting ? "Sending..." : "Send Message"}
                </button>

                <p className="cf-privacy-note">
                  🔒 Your information is 100% secure and never shared with third parties.
                </p>
              </form>
            )}
          </div>

        </div>
      </section>
    </>
  );
}