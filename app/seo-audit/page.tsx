"use client";
import { useState } from "react";

type Metric = { score: number; status: string; detail: string };
type AuditResult = {
  overall_score: number;
  grade: string;
  summary: string;
  metrics: Record<string, Metric>;
  top_issues: string[];
  quick_wins: string[];
  cta: string;
};

const METRIC_LABELS: Record<string, string> = {
  on_page_seo:     "On-Page SEO",
  page_speed:      "Page Speed",
  mobile_friendly: "Mobile Friendly",
  backlinks:       "Backlinks",
  content_quality: "Content Quality",
  technical_seo:   "Technical SEO",
};

const METRIC_ICONS: Record<string, string> = {
  on_page_seo:     "🔍",
  page_speed:      "⚡",
  mobile_friendly: "📱",
  backlinks:       "🔗",
  content_quality: "📝",
  technical_seo:   "⚙️",
};

const STEPS = [
  { icon: "🔍", label: "Scanning your URL..." },
  { icon: "⚡", label: "Checking page speed..." },
  { icon: "📱", label: "Testing mobile friendliness..." },
  { icon: "🔗", label: "Analyzing backlinks..." },
  { icon: "📝", label: "Reviewing content quality..." },
  { icon: "📊", label: "Generating your report..." },
];

const STATS = [
  { value: "500+", label: "Websites Audited" },
  { value: "312%", label: "Avg Traffic Growth" },
  { value: "4.9★", label: "Client Rating" },
  { value: "FREE", label: "No Cost Ever" },
];

function statusColor(status: string) {
  if (status === "Good")    return { bg: "#f0fdf4", border: "#86efac", text: "#15803d", bar: "#22c55e" };
  if (status === "Average") return { bg: "#fefce8", border: "#fde047", text: "#a16207", bar: "#eab308" };
  return                           { bg: "#fff1f2", border: "#fca5a5", text: "#dc2626", bar: "#ef4444" };
}

function gradeColor(grade: string) {
  if (grade === "A") return "#15803d";
  if (grade === "B") return "#1e3a8a";
  if (grade === "C") return "#a16207";
  if (grade === "D") return "#ea580c";
  return "#dc2626";
}

function ScoreRing({ score, grade }: { score: number; grade: string }) {
  const r    = 70;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      <circle cx="90" cy="90" r={r} fill="none" stroke="#f1f5f9" strokeWidth="14" />
      <circle
        cx="90" cy="90" r={r} fill="none"
        stroke={gradeColor(grade)} strokeWidth="14"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 90 90)"
        style={{ transition: "stroke-dasharray 1.4s cubic-bezier(.16,1,.3,1)" }}
      />
      <text x="90" y="78"  textAnchor="middle" fontSize="36" fontWeight="800" fill={gradeColor(grade)}>{score}</text>
      <text x="90" y="100" textAnchor="middle" fontSize="14"  fill="#94a3b8">/100</text>
      <text x="90" y="124" textAnchor="middle" fontSize="20"  fontWeight="700" fill={gradeColor(grade)}>Grade {grade}</text>
    </svg>
  );
}

export default function SEOAuditPage() {
  const [url, setUrl]         = useState("");
  const [loading, setLoading] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [result, setResult]   = useState<AuditResult | null>(null);
  const [error, setError]     = useState("");

  const runAudit = async () => {
    if (!url.trim()) return;
    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith("http")) cleanUrl = "https://" + cleanUrl;

    setLoading(true);
    setError("");
    setResult(null);
    setStepIdx(0);

    const stepInterval = setInterval(() => {
      setStepIdx((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 1800);

    try {
      const res  = await fetch("/api/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cleanUrl }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else            setResult(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fade-up {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes bar-grow { from { width:0; } }
        @keyframes pulse-glow {
          0%,100% { box-shadow:0 0 0 0 rgba(30,58,138,0.4); }
          50%      { box-shadow:0 0 0 16px rgba(30,58,138,0); }
        }
        * { box-sizing:border-box; }
        .audit-page { min-height:100vh; background:#f8fafc; font-family:'Inter',-apple-system,sans-serif; }
        .audit-hero { background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 50%,#3730a3 100%); padding:80px 24px 100px; text-align:center; position:relative; overflow:hidden; }
        .audit-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 30% 50%,rgba(99,102,241,0.15) 0%,transparent 60%),radial-gradient(circle at 70% 50%,rgba(30,58,138,0.2) 0%,transparent 60%); }
        .audit-hero-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:rgba(255,255,255,0.9); padding:6px 16px; border-radius:999px; font-size:13px; font-weight:600; margin-bottom:20px; position:relative; z-index:1; animation:fade-up 0.5s ease forwards; }
        .audit-hero h1 { color:#fff; font-size:clamp(32px,5vw,52px); font-weight:800; margin:0 0 14px; line-height:1.15; position:relative; z-index:1; animation:fade-up 0.5s 0.1s ease both; }
        .audit-hero h1 span { color:#93c5fd; }
        .audit-hero p { color:rgba(255,255,255,0.75); font-size:clamp(15px,2vw,18px); max-width:560px; margin:0 auto 36px; line-height:1.6; position:relative; z-index:1; animation:fade-up 0.5s 0.2s ease both; }
        .audit-stats { display:flex; justify-content:center; gap:32px; flex-wrap:wrap; position:relative; z-index:1; margin-bottom:44px; animation:fade-up 0.5s 0.3s ease both; }
        .audit-stat { text-align:center; }
        .audit-stat-val { color:#fff; font-size:24px; font-weight:800; line-height:1; }
        .audit-stat-lbl { color:rgba(255,255,255,0.6); font-size:12px; margin-top:3px; }
        .audit-input-card { background:#fff; border-radius:20px; max-width:680px; margin:0 auto; padding:28px; box-shadow:0 32px 80px rgba(0,0,0,0.25); position:relative; z-index:1; animation:fade-up 0.5s 0.35s ease both; }
        .audit-input-label { font-size:13px; font-weight:600; color:#64748b; margin:0 0 10px; display:block; }
        .audit-input-row { display:flex; gap:10px; }
        .audit-input { flex:1; padding:14px 18px; border-radius:14px; border:2px solid #e2e8f0; font-size:15px; color:#1e293b; outline:none; transition:border-color 0.2s,box-shadow 0.2s; font-family:inherit; }
        .audit-input:focus { border-color:#1e3a8a; box-shadow:0 0 0 4px rgba(30,58,138,0.08); }
        .audit-input::placeholder { color:#94a3b8; }
        .audit-btn { background:linear-gradient(135deg,#1e3a8a,#3730a3); color:#fff; border:none; cursor:pointer; padding:14px 28px; border-radius:14px; font-size:15px; font-weight:700; transition:all 0.25s; white-space:nowrap; font-family:inherit; display:flex; align-items:center; gap:8px; animation:pulse-glow 2.5s infinite; }
        .audit-btn:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(30,58,138,0.5); }
        .audit-btn:disabled { opacity:0.65; cursor:not-allowed; transform:none; animation:none; }
        .audit-spinner { width:18px; height:18px; border-radius:50%; border:2.5px solid rgba(255,255,255,0.3); border-top-color:#fff; animation:spin 0.7s linear infinite; }
        .audit-disclaimer { text-align:center; font-size:12px; color:#94a3b8; margin-top:12px; }
        .audit-content { max-width:900px; margin:0 auto; padding:48px 24px 80px; }
        .audit-loading { background:#fff; border-radius:20px; padding:48px 32px; text-align:center; box-shadow:0 4px 24px rgba(0,0,0,0.07); animation:fade-up 0.4s ease; }
        .audit-loading-spinner { width:72px; height:72px; margin:0 auto 24px; border:5px solid #f1f5f9; border-top-color:#1e3a8a; border-radius:50%; animation:spin 0.9s linear infinite; }
        .audit-loading h3 { font-size:20px; color:#1e293b; margin:0 0 6px; }
        .audit-loading p  { font-size:14px; color:#64748b; margin:0 0 28px; }
        .audit-steps { display:flex; flex-direction:column; gap:10px; max-width:340px; margin:0 auto; }
        .audit-step { display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:10px; font-size:13px; transition:all 0.4s; }
        .audit-step.active  { background:#eff6ff; color:#1e3a8a; font-weight:600; }
        .audit-step.done    { background:#f0fdf4; color:#15803d; }
        .audit-step.pending { color:#94a3b8; }
        .audit-results { animation:fade-up 0.5s ease; }
        .audit-score-card { background:#fff; border-radius:20px; padding:32px; margin-bottom:20px; box-shadow:0 4px 24px rgba(0,0,0,0.07); display:flex; align-items:center; gap:32px; flex-wrap:wrap; }
        .audit-score-right { flex:1; min-width:220px; }
        .audit-score-right h2 { font-size:22px; font-weight:800; color:#1e293b; margin:0 0 10px; }
        .audit-score-right p  { font-size:15px; color:#475569; line-height:1.7; margin:0 0 16px; }
        .audit-grade-badges { display:flex; gap:8px; flex-wrap:wrap; }
        .audit-badge { display:inline-flex; align-items:center; gap:5px; padding:5px 12px; border-radius:999px; font-size:12px; font-weight:700; }
        .audit-metrics-title { font-size:18px; font-weight:800; color:#1e293b; margin:0 0 14px; }
        .audit-metrics-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:12px; margin-bottom:24px; }
        .audit-metric-card { border-radius:14px; padding:16px 18px; border:1.5px solid; }
        .audit-metric-top { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
        .audit-metric-icon  { font-size:18px; }
        .audit-metric-label { font-size:14px; font-weight:700; color:#374151; flex:1; }
        .audit-metric-badge { font-size:11px; font-weight:700; padding:3px 10px; border-radius:999px; }
        .audit-metric-score-row { display:flex; align-items:center; gap:10px; margin-bottom:6px; }
        .audit-metric-score-num { font-size:22px; font-weight:800; width:42px; flex-shrink:0; }
        .audit-bar-bg { flex:1; height:8px; background:#e5e7eb; border-radius:999px; overflow:hidden; }
        .audit-bar-fill { height:100%; border-radius:999px; animation:bar-grow 1.2s cubic-bezier(.16,1,.3,1) forwards; }
        .audit-metric-detail { font-size:12px; color:#6b7280; line-height:1.5; }
        .audit-two-col { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px; }
        .audit-list-card { background:#fff; border-radius:16px; padding:20px 22px; box-shadow:0 4px 24px rgba(0,0,0,0.07); }
        .audit-list-title { font-size:15px; font-weight:800; margin:0 0 12px; display:flex; align-items:center; gap:6px; }
        .audit-list-item { display:flex; align-items:flex-start; gap:8px; padding:9px 12px; border-radius:10px; margin-bottom:7px; font-size:13px; line-height:1.5; }
        .audit-list-item:last-child { margin-bottom:0; }
        .audit-list-item.issue { background:#fff1f2; color:#991b1b; }
        .audit-list-item.win   { background:#f0fdf4; color:#14532d; }
        .audit-cta { background:linear-gradient(135deg,#1e3a8a,#3730a3); border-radius:20px; padding:32px; display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap; }
        .audit-cta-left h3 { color:#fff; font-size:20px; font-weight:800; margin:0 0 6px; }
        .audit-cta-left p  { color:rgba(255,255,255,0.8); font-size:14px; margin:0; }
        .audit-cta-btn { background:#fff; color:#1e3a8a; padding:14px 28px; border-radius:14px; font-size:15px; font-weight:800; text-decoration:none; white-space:nowrap; transition:all 0.2s; flex-shrink:0; display:inline-block; }
        .audit-cta-btn:hover { transform:scale(1.04); box-shadow:0 8px 24px rgba(0,0,0,0.2); }
        .audit-error { background:#fff1f2; border:1.5px solid #fca5a5; color:#dc2626; padding:16px 20px; border-radius:14px; font-size:14px; display:flex; align-items:center; gap:8px; }
        .audit-how { padding:0 0 60px; }
        .audit-how h2 { text-align:center; font-size:28px; font-weight:800; color:#1e293b; margin:0 0 32px; }
        .audit-how-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:16px; }
        .audit-how-card { background:#fff; border-radius:16px; padding:22px 18px; text-align:center; box-shadow:0 4px 24px rgba(0,0,0,0.06); }
        .audit-how-num { width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg,#1e3a8a,#3730a3); color:#fff; font-size:16px; font-weight:800; display:flex; align-items:center; justify-content:center; margin:0 auto 12px; }
        .audit-how-icon  { font-size:28px; margin-bottom:8px; }
        .audit-how-title { font-size:14px; font-weight:700; color:#1e293b; margin:0 0 4px; }
        .audit-how-desc  { font-size:12px; color:#64748b; line-height:1.5; margin:0; }
        @media (max-width:600px) {
          .audit-input-row  { flex-direction:column; }
          .audit-score-card { flex-direction:column; align-items:center; text-align:center; }
          .audit-two-col    { grid-template-columns:1fr; }
          .audit-cta        { text-align:center; justify-content:center; }
          .audit-stats      { gap:20px; }
        }
      `}</style>

      <div className="audit-page">

        {/* HERO */}
        <div className="audit-hero">
          <span className="audit-hero-badge">🔍 100% Free · No Credit Card Required</span>
          <h1>Check Your Website's <span>SEO Score</span></h1>
          <p>AI-powered instant audit — On-Page SEO, Speed, Mobile, Backlinks and more. Get your full report in 30 seconds!</p>

          <div className="audit-stats">
            {STATS.map((s) => (
              <div key={s.label} className="audit-stat">
                <div className="audit-stat-val">{s.value}</div>
                <div className="audit-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="audit-input-card">
            <label className="audit-input-label">Enter your website URL below 👇</label>
            <div className="audit-input-row">
              <input
                className="audit-input"
                placeholder="https://yourwebsite.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !loading && runAudit()}
                disabled={loading}
              />
              <button className="audit-btn" onClick={runAudit} disabled={loading || !url.trim()}>
                {loading
                  ? <><div className="audit-spinner" /> Analyzing...</>
                  : <>Run Audit 🚀</>}
              </button>
            </div>
            <p className="audit-disclaimer">🔒 Your data is safe — we never share it with anyone</p>
          </div>
        </div>

        <div className="audit-content">

          {/* LOADING */}
          {loading && (
            <div className="audit-loading">
              <div className="audit-loading-spinner" />
              <h3>AI is Analyzing Your Website...</h3>
              <p>Running a deep SEO audit — this takes just a few seconds</p>
              <div className="audit-steps">
                {STEPS.map((step, i) => (
                  <div key={i} className={`audit-step ${i < stepIdx ? "done" : i === stepIdx ? "active" : "pending"}`}>
                    <span>{i < stepIdx ? "✅" : step.icon}</span>
                    {step.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ERROR */}
          {error && !loading && (
            <div className="audit-error">❌ {error}</div>
          )}

          {/* RESULTS */}
          {result && !loading && (
            <div className="audit-results">

              <div className="audit-score-card">
                <ScoreRing score={result.overall_score} grade={result.grade} />
                <div className="audit-score-right">
                  <h2>Overall SEO Score</h2>
                  <p>{result.summary}</p>
                  <div className="audit-grade-badges">
                    {result.overall_score >= 80
                      ? <span className="audit-badge" style={{ background:"#f0fdf4", color:"#15803d" }}>✅ Strong SEO</span>
                      : result.overall_score >= 50
                      ? <span className="audit-badge" style={{ background:"#fefce8", color:"#a16207" }}>⚠️ Improvement Needed</span>
                      : <span className="audit-badge" style={{ background:"#fff1f2", color:"#dc2626" }}>🚨 Urgent Fix Needed</span>}
                    <span className="audit-badge" style={{ background:"#eff6ff", color:"#1e3a8a" }}>🤖 AI Powered</span>
                  </div>
                </div>
              </div>

              <p className="audit-metrics-title">📊 Detailed Metrics</p>
              <div className="audit-metrics-grid">
                {Object.entries(result.metrics).map(([key, metric]) => {
                  const c = statusColor(metric.status);
                  return (
                    <div key={key} className="audit-metric-card" style={{ background: c.bg, borderColor: c.border }}>
                      <div className="audit-metric-top">
                        <span className="audit-metric-icon">{METRIC_ICONS[key]}</span>
                        <span className="audit-metric-label">{METRIC_LABELS[key]}</span>
                        <span className="audit-metric-badge" style={{ background: c.border, color: c.text }}>{metric.status}</span>
                      </div>
                      <div className="audit-metric-score-row">
                        <span className="audit-metric-score-num" style={{ color: c.text }}>{metric.score}</span>
                        <div className="audit-bar-bg">
                          <div className="audit-bar-fill" style={{ width: `${metric.score}%`, background: c.bar }} />
                        </div>
                      </div>
                      <div className="audit-metric-detail">{metric.detail}</div>
                    </div>
                  );
                })}
              </div>

              <div className="audit-two-col">
                <div className="audit-list-card">
                  <p className="audit-list-title" style={{ color:"#dc2626" }}>❌ Top Issues</p>
                  {result.top_issues.map((issue, i) => (
                    <div key={i} className="audit-list-item issue"><span>⚠️</span>{issue}</div>
                  ))}
                </div>
                <div className="audit-list-card">
                  <p className="audit-list-title" style={{ color:"#15803d" }}>✅ Quick Wins</p>
                  {result.quick_wins.map((win, i) => (
                    <div key={i} className="audit-list-item win"><span>💡</span>{win}</div>
                  ))}
                </div>
              </div>

              <div className="audit-cta">
                <div className="audit-cta-left">
                  <h3>🚀 Ready to Fix These Issues?</h3>
                  <p>{result.cta}</p>
                </div>
                <a href="/contact" className="audit-cta-btn">Book a Free Consultation →</a>
              </div>
            </div>
          )}

          {/* HOW IT WORKS */}
          {!result && !loading && (
            <div className="audit-how">
              <h2>How Does It Work?</h2>
              <div className="audit-how-grid">
                {[
                  { icon:"🌐", title:"Enter Your URL",  desc:"Paste your website URL into the input field above" },
                  { icon:"🤖", title:"AI Analyzes It",  desc:"Our AI checks 6 key SEO factors across your site" },
                  { icon:"📊", title:"Get Your Score",  desc:"Receive a detailed report with scores for each metric" },
                  { icon:"🚀", title:"Fix & Grow",      desc:"Fix issues yourself or let our experts handle it" },
                ].map((item, i) => (
                  <div key={i} className="audit-how-card">
                    <div className="audit-how-num">{i + 1}</div>
                    <div className="audit-how-icon">{item.icon}</div>
                    <p className="audit-how-title">{item.title}</p>
                    <p className="audit-how-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}