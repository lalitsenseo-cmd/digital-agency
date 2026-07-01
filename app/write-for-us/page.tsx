import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WhatsAppButton } from "@/components/PremiumFeatures";
import { JsonLd, webPageNode, breadcrumbNode } from "@/lib/schema";
import type { Metadata } from "next";
import { Users, Link2, BadgeCheck, Mail, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Write for Us — Digital Marketing & SEO Guest Post | Clickbriz Digital",
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

// Guest-post search footprints — har niche + har common pattern
const footprints = [
  "Digital Marketing “Write for Us”", "Digital Marketing Guest Post",
  "SEO “Write for Us”", "SEO Guest Post", "Local SEO Write for Us",
  "PPC “Write for Us”", "PPC Guest Post", "Google Ads Write for Us",
  "Social Media Marketing “Write for Us”", "Social Media Guest Post",
  "Content Marketing “Write for Us”", "Content Marketing Guest Post",
  "Web Development “Write for Us”", "Marketing “Write for Us”",
  "Submit a Guest Post", "Submit an Article", "Suggest a Post",
  "Become a Contributor", "Guest Author Wanted", "Contributing Writer",
  "Accepting Guest Posts", "Guest Posts Wanted", "Guest Bloggers Wanted",
  "Looking for Guest Bloggers", "Contribute to Our Blog", "Write for Us",
  "Guest Post Guidelines", "Contributor Guidelines", "inurl:write-for-us",
  "intitle:“write for us”", "Send a Guest Article",
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
        .wfu-foot { display:flex; flex-wrap:wrap; gap:8px; max-width:820px; }
        .wfu-fp { display:inline-flex; align-items:center; gap:7px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:7px 13px; font-size:13px; color:#1e3a8a; font-weight:600; }
        .wfu-fp::before { content:""; width:6px; height:6px; border-radius:50%; background:#e0521f; flex-shrink:0; }
        .wfu-foot-note { font-size:14px; color:#64748b; margin-bottom:1.1rem; max-width:760px; line-height:1.7; }
        .wfu-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:12px; max-width:760px; }
        .wfu-list li { display:flex; gap:12px; align-items:flex-start; font-size:15px; color:#475569; line-height:1.6; }
        .wfu-list svg { flex-shrink:0; margin-top:2px; color:#16a34a; }
        .wfu-cta { margin-top:3rem; background:linear-gradient(135deg,#1e3a8a,#3730a3); border-radius:18px; padding:2.5rem 2rem; text-align:center; color:#fff; }
        .wfu-cta h2 { font-family:'Plus Jakarta Sans',sans-serif; font-size:1.6rem; font-weight:800; margin-bottom:0.6rem; color:#fff; }
        .wfu-cta p { color:#c7d2fe; font-size:15px; margin-bottom:1.5rem; max-width:620px; margin-left:auto; margin-right:auto; }
        .wfu-mail { display:inline-flex; align-items:center; gap:10px; flex-wrap:wrap; justify-content:center; background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.25); border-radius:12px; padding:14px 22px; font-size:15px; color:#e0e7ff; }
        .wfu-mail strong { color:#fff; font-size:17px; font-weight:800; letter-spacing:0.3px; }
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
          Looking for a digital marketing <strong>&ldquo;write for us&rdquo;</strong> page or an
          SEO guest post opportunity? You&rsquo;re in the right place. Clickbriz Digital accepts
          original, insight-packed guest posts from real practitioners in SEO, PPC, social media,
          and web development. Share what actually works, reach a growing audience, and earn a
          credited author bio with a do-follow link back.
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

        <h2 className="wfu-h2">Searches that lead here</h2>
        <p className="wfu-foot-note">
          Found us while searching for guest post opportunities? These are the kinds of queries
          across digital marketing, SEO, PPC, and social media that bring writers to this page:
        </p>
        <div className="wfu-foot">
          {footprints.map((f) => (
            <span key={f} className="wfu-fp">{f}</span>
          ))}
        </div>

        <div className="wfu-cta">
          <h2>Ready to pitch your idea?</h2>
          <p>Whether you want to submit a guest post, become a contributor, or pitch a fresh topic idea — we&rsquo;d love to hear from you. We reply to accepted pitches within 3&ndash;5 days.</p>
          <div className="wfu-mail">
            <Mail size={18} /> Email your pitch to <strong>{EMAIL}</strong>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
