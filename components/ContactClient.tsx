"use client";
import { Send, MessageCircle, Mail, Phone, Sparkles, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function ContactClient({
  label, heading, subheading, whatsapp, email, phone, formHeading, successMessage, services,
}: {
  label: string;
  heading: string;
  subheading: string;
  whatsapp: string;
  email: string;
  phone: string;
  formHeading: string;
  successMessage: string;
  services: string[];
}) {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.success) {
        setSent(true);
      } else {
        alert('Error: ' + json.error);
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes contactFadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

        .contact-section {
          position: relative;
          padding: 6rem 2rem;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);
          overflow: hidden;
        }
        .contact-section::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 2px;
          background: linear-gradient(90deg, transparent, #1e3a8a, transparent);
        }
        .contact-orb-1 {
          position: absolute; top: 10%; right: -5%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(30,58,138,0.06) 0%, transparent 70%);
          border-radius: 50%; filter: blur(80px); pointer-events: none;
        }
        .contact-orb-2 {
          position: absolute; bottom: 10%; left: -5%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(55,48,163,0.06) 0%, transparent 70%);
          border-radius: 50%; filter: blur(80px); pointer-events: none;
        }

        .contact-container {
          max-width: 1100px; margin: 0 auto;
          position: relative; z-index: 2;
        }

        .contact-header { text-align: center; margin-bottom: 3rem; }

        /* FIX 1: Badge color on white bg */
        .contact-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #eff6ff; border: 1px solid #bfdbfe;
          padding: 6px 14px; border-radius: 999px;
          font-size: 11px; font-weight: 600; color: #1e3a8a;
          letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 1rem;
        }
        .contact-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800; color: #0f172a;
          line-height: 1.1; letter-spacing: -0.03em; margin: 0 0 1rem;
        }
        .contact-heading-gradient {
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .contact-subheading {
          font-size: 1.1rem; color: #64748b;
          max-width: 600px; margin: 0 auto; line-height: 1.6;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem; align-items: flex-start;
        }

        .contact-info-cards {
          display: flex; flex-direction: column; gap: 14px;
          animation: contactFadeIn 0.6s ease-out;
        }

        .contact-info-card {
          display: flex; align-items: center; gap: 16px;
          padding: 1.25rem 1.5rem;
          background: #fff; border: 1px solid #e2e8f0;
          border-radius: 16px; text-decoration: none;
          transition: all 0.3s ease;
          position: relative; overflow: hidden;
          box-shadow: 0 2px 8px rgba(30,58,138,0.04);
        }
        .contact-info-card::before {
          content: '';
          position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          background: linear-gradient(180deg, #1e3a8a 0%, #3730a3 100%);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .contact-info-card:hover {
          border-color: #93c5fd; background: #eff6ff; transform: translateX(4px);
        }
        .contact-info-card:hover::before { opacity: 1; }

        .contact-info-icon-wrap {
          width: 48px; height: 48px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.3s ease;
        }
        .contact-info-icon-whatsapp {
          background: rgba(37,211,102,0.15);
          border: 1px solid rgba(37,211,102,0.3);
          color: #25D366;
        }
        /* FIX 2: Icon color visible on white */
        .contact-info-icon-email {
          background: rgba(30,58,138,0.12);
          border: 1px solid rgba(30,58,138,0.25);
          color: #1e3a8a;
        }
        .contact-info-icon-phone {
          background: rgba(30,58,138,0.12);
          border: 1px solid rgba(30,58,138,0.25);
          color: #1e3a8a;
        }
        .contact-info-card:hover .contact-info-icon-wrap { transform: scale(1.05); }

        .contact-info-label {
          font-size: 11px; color: #94a3b8; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 4px;
        }
        /* FIX 3: Value text dark on white bg */
        .contact-info-value {
          font-size: 15px; color: #0f172a; font-weight: 600;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .contact-form-wrap {
          background: #fff; border: 1px solid #e2e8f0;
          border-radius: 24px; padding: 2.5rem;
          position: relative; overflow: hidden;
          box-shadow: 0 4px 20px rgba(30,58,138,0.08);
          animation: contactFadeIn 0.6s ease-out 0.15s both;
        }
        .contact-form-wrap::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #1e3a8a, #3730a3);
        }

        .contact-form { display: flex; flex-direction: column; gap: 14px; }

        /* FIX 4: Form heading dark on white */
        .contact-form-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.35rem; font-weight: 800;
          color: #0f172a; margin-bottom: 8px; letter-spacing: -0.01em;
        }

        .contact-input, .contact-select, .contact-textarea {
          background: #f8fafc; border: 1px solid #e2e8f0;
          border-radius: 10px; padding: 13px 16px;
          font-size: 14px; font-family: Inter, sans-serif;
          color: #0f172a; outline: none;
          transition: all 0.3s ease; width: 100%; box-sizing: border-box;
        }
        .contact-input::placeholder, .contact-textarea::placeholder { color: #94a3b8; }
        .contact-input:focus, .contact-select:focus, .contact-textarea:focus {
          border-color: #1e3a8a; background: #eff6ff;
          box-shadow: 0 0 0 3px rgba(30,58,138,0.1);
        }
        .contact-select {
          cursor: pointer; appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%231e3a8a' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center;
          padding-right: 40px;
        }
        /* FIX 5: Select option light bg */
        .contact-select option { background: #fff; color: #0f172a; }
        .contact-textarea { resize: vertical; min-height: 100px; font-family: Inter, sans-serif; }

        .contact-submit {
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
          border: none; border-radius: 12px; padding: 15px;
          color: #fff; font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          box-shadow: 0 10px 30px rgba(30,58,138,0.3);
          transition: all 0.3s ease; margin-top: 4px; letter-spacing: 0.3px;
        }
        .contact-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(30,58,138,0.5);
        }
        .contact-submit:disabled {
          background: #e2e8f0; color: #94a3b8; cursor: not-allowed; box-shadow: none;
        }

        .contact-success { text-align: center; padding: 2rem 1rem; }
        .contact-success-icon {
          width: 72px; height: 72px;
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.5rem;
          box-shadow: 0 10px 30px rgba(30,58,138,0.3);
        }
        .contact-success-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.5rem; font-weight: 800;
          background: linear-gradient(135deg, #1e3a8a, #3730a3);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; margin-bottom: 0.5rem;
        }
        /* FIX 6: Success msg dark on white */
        .contact-success-msg { color: #64748b; font-size: 14px; line-height: 1.6; }

        @media (max-width: 640px) {
          .contact-section { padding: 4rem 1.25rem; }
          .contact-form-wrap { padding: 1.75rem; }
          .contact-grid { gap: 2rem; }
        }
      `}</style>

      <section id="contact" className="contact-section">
        <div className="contact-orb-1"></div>
        <div className="contact-orb-2"></div>

        <div className="contact-container">
          <div className="contact-header">
            <span className="contact-badge">
              <Sparkles size={12} /> {label}
            </span>
            <h2 className="contact-heading">
              {heading.split(' ').slice(0, -2).join(' ')}{' '}
              <span className="contact-heading-gradient">
                {heading.split(' ').slice(-2).join(' ')}
              </span>
            </h2>
            <p className="contact-subheading">{subheading}</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info-cards">
              <a
                href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                target="_blank" rel="noopener noreferrer"
                className="contact-info-card"
              >
                <div className="contact-info-icon-wrap contact-info-icon-whatsapp">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div className="contact-info-label">WhatsApp</div>
                  <div className="contact-info-value">{whatsapp}</div>
                </div>
              </a>

              <a href={`mailto:${email}`} className="contact-info-card">
                <div className="contact-info-icon-wrap contact-info-icon-email">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value">{email}</div>
                </div>
              </a>

              <a href={`tel:${phone.replace(/\D/g, "")}`} className="contact-info-card">
                <div className="contact-info-icon-wrap contact-info-icon-phone">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="contact-info-label">Phone</div>
                  <div className="contact-info-value">{phone}</div>
                </div>
              </a>
            </div>

            <div className="contact-form-wrap">
              {sent ? (
                <div className="contact-success">
                  <div className="contact-success-icon">
                    <CheckCircle size={32} color="#fff" strokeWidth={3} />
                  </div>
                  <h3 className="contact-success-title">Message Sent!</h3>
                  <p className="contact-success-msg">{successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <h3 className="contact-form-heading">{formHeading}</h3>

                  <input
                    type="text" placeholder="Your Name" required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="contact-input"
                  />

                  <input
                    type="email" placeholder="Email Address" required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="contact-input"
                  />

                  <select
                    required value={form.service}
                    onChange={e => setForm({ ...form, service: e.target.value })}
                    className="contact-select"
                    style={{ color: form.service ? "#0f172a" : "#94a3b8" }}
                  >
                    <option value="" disabled>Select a Service</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>

                  <textarea
                    placeholder="Tell us about your project..." required rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="contact-textarea"
                  />

                  <button type="submit" disabled={submitting} className="contact-submit">
                    <Send size={16} /> {submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}