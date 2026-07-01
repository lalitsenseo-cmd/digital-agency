import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WhatsAppButton } from "@/components/PremiumFeatures";
import { JsonLd, webPageNode, breadcrumbNode } from "@/lib/schema";
import type { Metadata } from "next";
import { PenLine, Users, Link2, BadgeCheck, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Write for Us — Digital Marketing & SEO Guest Post | Clickbriz",
  description:
    "Write for us at Clickbriz Digital. We accept high-quality guest posts on SEO, digital marketing, PPC, social media, and web development. Read our guidelines and submit your pitch.",
  alternates: { canonical: "https://www.clickbriz.com/write-for-us" },
  robots: "index,follow",
};

const EMAIL = "clickbriz@gmail.com";

const benefits = [
  { icon: Link2, title: "Author Bio + Backlink", text: "Get a credited author bio with a do-follow link to your site or profile." },
  { icon: Users, title: "Reach a Real Audience", text: "Your article is shared with our readers, clients, and social following." },
  { icon: BadgeCheck, title: "Build Authority", text: "Publishing on an established marketing blog strengthens your E-E-A-T." },
];

const topics = [
  "Search Engine Optimization (SEO)", "Local SEO & Google Business Profile",
  "Google Ads / PPC & paid media", "Social media marketing & content",
  "Web development & Core Web Vitals", "Analytics, tracking & CRO",
  "AI in marketing & automation", "Case studies with real results",
];

const guidelines = [
  "Original, unpublished content only — no AI-spun or plagiarized articles.",
  "800–1,800 words, well-structured with clear headings (H2/H3).",
  "Practical, actionable value — examples, data, or steps, not fluff.",
  "Max 1 relevant do-follow link to your site; no spammy/affiliate links.",
  "Add suggested title, meta description, and a 2–3 line author bio.",
  "Images must be original or royalty-free with source credit.",
];

export default function WriteForUsPage() {
  return (
    <>
      <Navbar />
      <JsonLd
        graph={[
          webPageNode({
            name: "Write for Us | Clickbriz Digital",
            url: "https://www.clickbriz.com/write-for-us",
            description:
              "Guest post guidelines and submission details for Clickbriz Digital's marketing blog.",
            hasBreadcrumb: true,
          }),
          breadcrumbNode("https://www.clickbriz.com/write-for-us", [
            { name: "Home", url: "https://www.clickbriz.com" },
            { name: "Write for Us" },
          ]),
        ]}
      />

      <style>{`
        body { background:#fff !important; }
        .wfu-wrap { max-width:1000px; margin:0 auto; padding:7rem 1.5rem 4rem; }
        .wfu-crumb { font-size:13px; color:#94a3b8; margin-bottom:1.25rem; }
        .wfu-crumb a { color:#2563eb; text-decoration:none; }
        .wfu-badge { display:inline-flex; align-items:center; gap:6px; background:#eff6ff; border:1px solid #bfdbfe; padding:6px 14px; border-radius:999px; font-size:11px; font-weight:700; color:#1e3a8a; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:1.25rem; }
        .wfu-h1 { font-family:'Plus Jakarta Sans',sans-serif; font-size:2.6rem; font-weight:800; color:#0f172a; line-height:1.15; margin-bottom:1rem; }
        .wfu-h1 span { color:#e0521f; }
        .wfu-lead { font-size:17px; color:#475569; line-height:1.8; max-width:720px; margin-bottom:3rem; }
        .wfu-h2 { font-family:'Plus Jakarta Sans',sans-serif; font-size:1.5rem; font-weight:800; color:#0f172a; margin:2.5rem 0 1.25rem; }
        .wfu-benefits { display:grid; grid-template-columns:repeat(3,1fr); gap:1.25rem; margin-bottom:1rem; }
        .wfu-card { border:1px solid #e2e8f0; border-radius:14px; padding:1.5rem; background:#fff; box-shadow:0 2px 14px rgba(30,58,138,0.05); }
        .wfu-ic { width:44px; height:44px; border-radius:12px; background:linear-gradient(135deg,#1e3a8a,#3730a3); display:flex; align-items:center; justify-content:center; color:#fff; margin-bottom:1rem; }
        .wfu-card h3 { font-family:'Plus Jakarta Sans',sans-serif; font-size:1.05rem; font-weight:700; color:#0f172a; margin-bottom:0.4rem; }
        .wfu-card p { font-size:14px; color:#64748b; line-height:1.6; }
        .wfu-topics { display:flex; flex-wrap:wrap; gap:10px; }
        .wfu-topic { background:#f8fafc; border:1px solid #e2e8f0; border-radius:999px; padding:8px 16px; font-size:14px; color:#334155; font-weight:500; }
        .wfu-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:12px; max-width:760px; }
        .wfu-list li { display:flex; gap:12px; align-items:flex-start; font-size:15px; color:#475569; line-height:1.6; }
        .wfu-list svg { flex-shrink:0; margin-top:2px; color:#16a34a; }
        .wfu-cta { margin-top:3rem; background:linear-gradient(135deg,#1e3a8a,#3730a3); border-radius:18px; padding:2.5rem 2rem; text-align:center; color:#fff; }
        .wfu-cta h2 { font-family:'Plus Jakarta Sans',sans-serif; font-size:1.6rem; font-weight:800; margin-bottom:0.6rem; color:#fff; }
        .wfu-cta p { color:#c7d2fe; font-size:15px; margin-bottom:1.5rem; }
        .wfu-btn { display:inline-flex; align-items:center; gap:8px; background:#fff; color:#1e3a8a; font-weight:700; padding:14px 26px; border-radius:12px; text-decoration:none; font-size:15px; transition:transform 0.2s; }
        .wfu-btn:hover { transform:translateY(-2px); }
        .wfu-email { display:inline-block; margin-top:1rem; color:#e0e7ff; font-size:14px; }
        .wfu-email a { color:#fff; font-weight:700; }
        @media (max-width:760px) {
          .wfu-wrap { padding:6rem 1.25rem 3rem; }
          .wfu-h1 { font-size:2rem; }
          .wfu-benefits { grid-template-columns:1fr; }
        }
      `}</style>

      <main className="wfu-wrap">
        <div className="wfu-crumb"><a href="/">Home</a> / Write for Us</div>
        <div className="wfu-badge">✍️ Guest Contributions</div>
        <h1 className="wfu-h1">Write for <span>Clickbriz Digital</span></h1>
        <p className="wfu-lead">
          Got real expertise in digital marketing, SEO, or web development? We welcome
          original, insight-packed guest posts from practitioners. Share what actually
          works, reach a growing audience, and earn a credited author bio with a link back.
        </p>

        <h2 className="wfu-h2">Why write for us</h2>
        <div className="wfu-benefits">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="wfu-card">
                <div className="wfu-ic"><Icon size={22} /></div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            );
          })}
        </div>

        <h2 className="wfu-h2">Topics we accept</h2>
        <div className="wfu-topics">
          {topics.map((t) => (
            <span key={t} className="wfu-topic">{t}</span>
          ))}
        </div>

        <h2 className="wfu-h2">Submission guidelines</h2>
        <ul className="wfu-list">
          {guidelines.map((g) => (
            <li key={g}><CheckCircle2 size={18} />{g}</li>
          ))}
        </ul>

        <div className="wfu-cta">
          <h2>Ready to pitch your idea?</h2>
          <p>Send us your topic idea or full draft. We reply to accepted pitches within 3–5 days.</p>
          <a className="wfu-btn" href={`mailto:${EMAIL}?subject=Guest Post Submission — Write for Us`}>
            <Mail size={18} /> Email your pitch <ArrowRight size={16} />
          </a>
          <span className="wfu-email">or write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}