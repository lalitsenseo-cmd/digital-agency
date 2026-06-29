import { Phone, Mail, MapPin, ArrowRight, Clock, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    { 
      name: "Facebook", 
      icon: Facebook, 
      href: "https://www.facebook.com/profile.php?id=61562934023885",
      color: "#1877F2",
      shadowColor: "rgba(24, 119, 242, 0.5)"
    },
    { 
      name: "Instagram", 
      icon: Instagram, 
      href: "https://www.instagram.com/clickbrizagency/",
      color: "#E4405F",
      shadowColor: "rgba(228, 64, 95, 0.5)"
    },
    { 
      name: "LinkedIn", 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/clickbriz/", 
      color: "#0A66C2",
      shadowColor: "rgba(10, 102, 194, 0.5)"
    },
    { 
      name: "Twitter/X", 
      icon: Twitter, 
      href: "https://x.com/ClickBriz", 
      color: "#FFFFFF",
      shadowColor: "rgba(255, 255, 255, 0.3)"
    },
    { 
      name: "YouTube", 
      icon: Youtube, 
      href: "https://www.youtube.com/@clickbriz", 
      color: "#FF0000",
      shadowColor: "rgba(255, 0, 0, 0.5)"
    },
  ];

  return (
    <>
      <style suppressHydrationWarning>{`
        .premium-footer {
          background: linear-gradient(180deg, #0f172a 0%, #1e3a8a 100%) !important;
          color: #E5E5E5;
          font-family: Inter, sans-serif;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(30, 58, 138, 0.15);
        }
        .premium-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 400px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #1e3a8a, transparent);
        }
        .premium-footer::after {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(30, 58, 138, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 2rem 2rem;
          position: relative;
          z-index: 2;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-brand-logo {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(30, 58, 138, 0.5);
        }

        .footer-brand-text {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 22px;
          color: #fff;
        }
        .footer-brand-dot {
          background: linear-gradient(135deg, #1e3a8a, #93c5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: #fff;
          margin-bottom: 1.5rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          position: relative;
          padding-bottom: 10px;
        }
        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background: linear-gradient(90deg, #1e3a8a, #3730a3);
          border-radius: 2px;
        }

        .footer-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #A3A3A3;
          margin-bottom: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .footer-link::before {
          content: '→';
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.3s ease;
          color: #1e3a8a;
          font-weight: 700;
        }
        .footer-link:hover {
          color: #93c5fd;
          transform: translateX(4px);
        }
        .footer-link:hover::before {
          opacity: 1;
          transform: translateX(0);
        }

        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
          font-size: 14px;
          color: #C4C4C4;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer-contact-item:hover {
          color: #93c5fd;
        }
        .footer-contact-icon {
          width: 36px;
          height: 36px;
          background: rgba(30, 58, 138, 0.1);
          border: 1px solid rgba(30, 58, 138, 0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .footer-contact-item:hover .footer-contact-icon {
          background: rgba(30, 58, 138, 0.2);
          border-color: rgba(30, 58, 138, 0.4);
          transform: scale(1.05);
        }

        .footer-cta-btn {
          background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%);
          color: #fff;
          padding: 12px 22px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 20px rgba(30, 58, 138, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset;
          transition: all 0.3s ease;
          margin-top: 8px;
        }
        .footer-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(30, 58, 138, 0.6), 0 0 0 1px rgba(255,255,255,0.2) inset;
        }

        .social-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 1.5rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          margin: 2rem 0;
        }
        .social-label {
          font-size: 12px;
          color: #A3A3A3;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .social-icons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .social-icon-link {
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(30, 58, 138, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C4C4C4;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .social-icon-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--social-color), var(--social-color));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        .social-icon-link svg {
          position: relative;
          z-index: 1;
          transition: all 0.3s ease;
        }
        .social-icon-link:hover {
          border-color: var(--social-color);
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 8px 20px var(--social-shadow);
        }
        .social-icon-link:hover::before {
          opacity: 0.15;
        }
        .social-icon-link:hover svg {
          color: var(--social-color) !important;
        }

        .footer-hours {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: rgba(30, 58, 138, 0.06);
          border: 1px solid rgba(30, 58, 138, 0.15);
          border-radius: 10px;
          margin-bottom: 14px;
          font-size: 13px;
          color: #C4C4C4;
        }
        .footer-hours-icon {
          width: 18px;
          height: 18px;
          color: #93c5fd;
          flex-shrink: 0;
        }

        .footer-bottom {
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .footer-copyright {
          font-size: 13px;
          color: #A3A3A3;
        }
        .footer-copyright-highlight {
          color: #93c5fd;
          font-weight: 600;
        }
        .footer-made {
          font-size: 13px;
          color: #A3A3A3;
        }
        .footer-made-heart {
          background: linear-gradient(135deg, #1e3a8a, #EC4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }

        .footer-description {
          font-size: 14px;
          line-height: 1.7;
          color: #A3A3A3;
          margin-bottom: 1rem;
        }
        .footer-founder {
          font-size: 13px;
          color: #A3A3A3;
        }
        .footer-founder-name {
          color: #93c5fd;
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .footer-container { padding: 3rem 1.25rem 1.5rem; }
          .footer-grid { gap: 2rem; }
          .footer-bottom { flex-direction: column; text-align: center; gap: 0.75rem; }
          .social-icon-link { width: 40px; height: 40px; }
        }
      `}</style>

      <footer className="premium-footer">
        <div className="footer-container">
          <div className="footer-grid">
            
              <div>
              <div style={{ marginBottom: "1.25rem" }}>
                <img 
                  src="/logo.png"
                  alt="Clickbriz" 
                  style={{ height: "60px", width: "auto" }} 
                />
              </div>
              <p className="footer-description">
                Clickbriz is a results-driven digital marketing agency helping businesses grow online through SEO, paid advertising and automation.
              </p>
              <p className="footer-founder">
                Founded by <span className="footer-founder-name">Lalit Sen</span>
              </p>
            </div>

            <div>
              <h4 className="footer-heading">Services</h4>
              {[
                { l: "SEO Services", h: "/seo-services" },
                { l: "Google Ads", h: "/google-ads" },
                { l: "Social Media Marketing", h: "/social-media-marketing" },
                { l: "Website Development", h: "/website-development" },
                { l: "Python Development", h: "/python-development" },
              ].map(s => (
                <a key={s.h} href={s.h} className="footer-link">
                  {s.l}
                </a>
              ))}
            </div>

            <div>
              <h4 className="footer-heading">Company</h4>
              {[
                { l: "About Us", h: "/about" },
                { l: "Blog", h: "/blog" },
                { l: "Contact", h: "/contact" },
                { l: "Sitemap", h: "/sitemap" },
                { l: "Privacy Policy", h: "#" },
                { l: "Terms of Service", h: "#" },
              ].map(s => (
                <a key={s.l} href={s.h} className="footer-link">
                  {s.l}
                </a>
              ))}
            </div>

            <div>
              <h4 className="footer-heading">Contact Us</h4>

              <a href="tel:+918527004901" className="footer-contact-item">
                <div className="footer-contact-icon">
                  <Phone size={15} color="#93c5fd" />
                </div>
                +91 85270 04901
              </a>

              <a href="clickbriz@gmail.com" className="footer-contact-item">
                <div className="footer-contact-icon">
                  <Mail size={15} color="#93c5fd" />
                </div>
                clickbriz@gmail.com
              </a>

              <div className="footer-contact-item" style={{ cursor: "default" }}>
                <div className="footer-contact-icon">
                  <MapPin size={15} color="#93c5fd" />
                </div>
                Faridabad, Haryana, India
              </div>

              <div className="footer-hours">
                <Clock className="footer-hours-icon" size={14} />
                <span>Mon-Sat: 10:00 AM - 7:00 PM</span>
              </div>

              <a href="/contact" className="footer-cta-btn">
                Free Consultation <ArrowRight size={15} />
              </a>
            </div>
          </div>

          <div className="social-section">
            <span className="social-label">Follow Us On Social Media</span>
            <div className="social-icons">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="social-icon-link"
                    style={{ 
                      ["--social-color" as string]: social.color,
                      ["--social-shadow" as string]: social.shadowColor 
                    }}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              © {year} Clickbriz Digital by <span className="footer-copyright-highlight">Lalit Sen</span>. All rights reserved.
            </p>
            <p className="footer-made">
              Made with <span className="footer-made-heart">♥</span> in Faridabad, Haryana 🇮🇳
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}