"use client";
import { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Globe, Briefcase, Star, DollarSign,
  Phone, LogOut, Plus, Trash2, Save, Eye, FileText,
  Settings, ChevronDown, ChevronUp, PenSquare
} from "lucide-react";
import { Service, Project, Testimonial, PricingPlan, BlogPost, ServicePageContent } from "@/lib/content";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "hero", label: "Hero Section", icon: Globe },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "projects", label: "Portfolio", icon: Globe },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "blog", label: "Blog Posts", icon: FileText },
  { id: "servicepages", label: "Service Pages", icon: Settings },
  { id: "contact", label: "Contact Info", icon: Phone },
];

const inp: React.CSSProperties = {
  background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px",
  padding: "10px 14px", color: "#0f1117", fontSize: "14px",
  fontFamily: "Inter, sans-serif", outline: "none", width: "100%", boxSizing: "border-box",
};

const lbl: React.CSSProperties = {
  fontSize: "12px", color: "#6b7280", marginBottom: "4px", display: "block", fontWeight: 600,
};

function Field({ label, value, onChange, multiline = false, rows = 3 }: { label: string; value: string | number; onChange: (v: string) => void; multiline?: boolean; rows?: number }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <label style={lbl}>{label}</label>
      {multiline
        ? <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} style={{ ...inp, resize: "vertical" }} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} style={inp} />}
    </div>
  );
}

function Card({ children, title, onDelete, collapsible = false, badge }: { children: React.ReactNode; title: string; onDelete?: () => void; collapsible?: boolean; badge?: string; }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "12px", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: open ? "1px solid #f3f4f6" : "none", cursor: collapsible ? "pointer" : "default", background: "#f9fafb" }}
        onClick={() => collapsible && setOpen(!open)}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: "14px", color: "#0f1117" }}>{title}</span>
          {badge && <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "999px", background: badge === "Published" ? "#dcfce7" : "#fef9c3", color: badge === "Published" ? "#16a34a" : "#ca8a04", fontWeight: 700 }}>{badge}</span>}
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {onDelete && <button onClick={e => { e.stopPropagation(); onDelete(); }} style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "6px", padding: "4px 8px", cursor: "pointer", color: "#dc2626", fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}><Trash2 size={12} /> Delete</button>}
          {collapsible && (open ? <ChevronUp size={16} color="#9ca3af" /> : <ChevronDown size={16} color="#9ca3af" />)}
        </div>
      </div>
      {open && <div style={{ padding: "16px" }}>{children}</div>}
    </div>
  );
}

function SaveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ background: "#2563eb", border: "none", borderRadius: "10px", padding: "11px 24px", color: "#fff", fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
      <Save size={15} /> Save Changes
    </button>
  );
}

function AddBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} style={{ background: "#f0f9ff", border: "1px dashed #93c5fd", borderRadius: "10px", padding: "11px 20px", color: "#2563eb", fontFamily: "Inter, sans-serif", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", width: "100%", justifyContent: "center", fontWeight: 600 }}>
      <Plus size={15} /> {label}
    </button>
  );
}

export default function Dashboard() {
  const { isAdmin, content, updateContent, logout } = useAdmin();
  const router = useRouter();
  const [tab, setTab] = useState("overview");
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (!isAdmin) router.push("/admin"); }, [isAdmin, router]);
  if (!isAdmin) return null;

  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  // ── BLOG TAB ──
  const BlogTab = () => {
    const [posts, setPosts] = useState<BlogPost[]>(content.blogPosts || []);
    const update = (id: string, key: keyof BlogPost, val: string | boolean) =>
      setPosts(posts.map(p => p.id === id ? { ...p, [key]: val } : p));
    const addNew = () => setPosts([...posts, {
      id: `b${Date.now()}`, title: "New Blog Post", category: "SEO",
      desc: "Short description of your article", content: "Write your full article here...",
      date: new Date().toISOString().split("T")[0], published: false,
      slug: `new-post-${Date.now()}`,
    }]);
    return (
      <div>
        <AddBtn onClick={addNew} label="Add New Blog Post" />
        {posts.map(p => (
          <Card key={p.id} title={p.title} collapsible badge={p.published ? "Published" : "Draft"}
            onDelete={() => setPosts(posts.filter(x => x.id !== p.id))}>
            <Field label="Post Title" value={p.title} onChange={v => update(p.id, "title", v)} />
            <Field label="URL Slug (e.g. seo-tips-2025)" value={p.slug} onChange={v => update(p.id, "slug", v.toLowerCase().replace(/\s+/g, "-"))} />
            <Field label="Category" value={p.category} onChange={v => update(p.id, "category", v)} />
            <Field label="Short Description (shown on blog listing)" value={p.desc} onChange={v => update(p.id, "desc", v)} multiline rows={2} />
            <Field label="Full Article Content" value={p.content} onChange={v => update(p.id, "content", v)} multiline rows={8} />
            <Field label="Date (YYYY-MM-DD)" value={p.date} onChange={v => update(p.id, "date", v)} />
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <input type="checkbox" checked={p.published} onChange={e => update(p.id, "published", e.target.checked)} style={{ width: "16px", height: "16px", accentColor: "#2563eb" }} />
              <label style={{ ...lbl, marginBottom: 0, color: p.published ? "#16a34a" : "#6b7280" }}>
                {p.published ? "✅ Published — visible on website" : "⏳ Draft — not visible on website"}
              </label>
            </div>
          </Card>
        ))}
        <SaveBtn onClick={() => { updateContent({ blogPosts: posts }); showSaved(); }} />
      </div>
    );
  };

  // ── SERVICE PAGES TAB ──
  const ServicePagesTab = () => {
    const [pages, setPages] = useState<ServicePageContent[]>(content.servicePages || []);
    const updatePage = (id: string, key: keyof ServicePageContent, val: any) =>
      setPages(pages.map(p => p.id === id ? { ...p, [key]: val } : p));
    const updateOffer = (pageId: string, i: number, key: "title" | "desc", val: string) =>
      setPages(pages.map(p => p.id === pageId ? { ...p, offers: p.offers.map((o, idx) => idx === i ? { ...o, [key]: val } : o) } : p));
    const updateFaq = (pageId: string, i: number, key: "q" | "a", val: string) =>
      setPages(pages.map(p => p.id === pageId ? { ...p, faqs: p.faqs.map((f, idx) => idx === i ? { ...f, [key]: val } : f) } : p));
    const updateBenefits = (pageId: string, val: string) =>
      setPages(pages.map(p => p.id === pageId ? { ...p, benefits: val.split("\n").filter(Boolean) } : p));

    const serviceNames: Record<string, string> = {
      "seo-services": "SEO Services",
      "google-ads": "Google Ads",
      "social-media-marketing": "Social Media Marketing",
      "website-development": "Website Development",
      "python-development": "Python Development",
    };

    return (
      <div>
        {pages.map(page => (
          <Card key={page.id} title={serviceNames[page.slug] || page.slug} collapsible>
            <Field label="Page Title (H1)" value={page.heroTitle} onChange={v => updatePage(page.id, "heroTitle", v)} />
            <Field label="Hero Description" value={page.heroDesc} onChange={v => updatePage(page.id, "heroDesc", v)} multiline />

            <div style={{ marginBottom: "16px" }}>
              <label style={{ ...lbl, fontSize: "13px", color: "#2563eb" }}>📦 What's Included ({page.offers.length} items)</label>
              {page.offers.map((offer, i) => (
                <div key={i} style={{ background: "#f8f9fb", borderRadius: "8px", padding: "12px", marginBottom: "8px", border: "1px solid #e5e7eb" }}>
                  <input placeholder="Offer title" value={offer.title} onChange={e => updateOffer(page.id, i, "title", e.target.value)} style={{ ...inp, marginBottom: "8px" }} />
                  <textarea placeholder="Offer description" value={offer.desc} onChange={e => updateOffer(page.id, i, "desc", e.target.value)} rows={2} style={{ ...inp, resize: "vertical" }} />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ ...lbl, fontSize: "13px", color: "#16a34a" }}>✅ Benefits (one per line)</label>
              <textarea rows={6} value={page.benefits.join("\n")} onChange={e => updateBenefits(page.id, e.target.value)} style={{ ...inp, resize: "vertical" }} />
            </div>

            <div style={{ marginBottom: "8px" }}>
              <label style={{ ...lbl, fontSize: "13px", color: "#7c3aed" }}>❓ FAQs ({page.faqs.length} questions)</label>
              {page.faqs.map((faq, i) => (
                <div key={i} style={{ background: "#f8f9fb", borderRadius: "8px", padding: "12px", marginBottom: "8px", border: "1px solid #e5e7eb" }}>
                  <input placeholder="Question" value={faq.q} onChange={e => updateFaq(page.id, i, "q", e.target.value)} style={{ ...inp, marginBottom: "8px" }} />
                  <textarea placeholder="Answer" value={faq.a} onChange={e => updateFaq(page.id, i, "a", e.target.value)} rows={3} style={{ ...inp, resize: "vertical" }} />
                </div>
              ))}
            </div>
          </Card>
        ))}
        <SaveBtn onClick={() => { updateContent({ servicePages: pages }); showSaved(); }} />
      </div>
    );
  };

  // ── HERO TAB ──
  const HeroTab = () => {
    const [local, setLocal] = useState(content.hero);
    return (
      <div>
        <Field label="Badge text" value={local.badge} onChange={v => setLocal({ ...local, badge: v })} />
        <Field label="Main headline" value={local.headline} onChange={v => setLocal({ ...local, headline: v })} multiline />
        <Field label="Subheadline" value={local.subheadline} onChange={v => setLocal({ ...local, subheadline: v })} multiline />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {(["1","2","3","4"] as const).map(n => (
            <div key={n} style={{ background: "#f8f9fb", borderRadius: "8px", padding: "12px", border: "1px solid #e5e7eb" }}>
              <Field label={`Stat ${n} number`} value={(local as any)[`stat${n}`]} onChange={v => setLocal({ ...local, [`stat${n}`]: v })} />
              <Field label={`Stat ${n} label`} value={(local as any)[`stat${n}label`]} onChange={v => setLocal({ ...local, [`stat${n}label`]: v })} />
            </div>
          ))}
        </div>
        <SaveBtn onClick={() => { updateContent({ hero: local }); showSaved(); }} />
      </div>
    );
  };

  // ── SERVICES TAB ──
  const ServicesTab = () => {
    const [services, setServices] = useState<Service[]>(content.services);
    const update = (id: string, key: keyof Service, val: string) => setServices(services.map(s => s.id === id ? { ...s, [key]: val } : s));
    const updateTags = (id: string, val: string) => setServices(services.map(s => s.id === id ? { ...s, tags: val.split(",").map(t => t.trim()) } : s));
    return (
      <div>
        {services.map(s => (
          <Card key={s.id} title={s.title} collapsible onDelete={() => setServices(services.filter(x => x.id !== s.id))}>
            <Field label="Title" value={s.title} onChange={v => update(s.id, "title", v)} />
            <Field label="Description" value={s.desc} onChange={v => update(s.id, "desc", v)} multiline />
            <Field label="Tags (comma separated)" value={s.tags.join(", ")} onChange={v => updateTags(s.id, v)} />
            <Field label="Accent color" value={s.color} onChange={v => update(s.id, "color", v)} />
          </Card>
        ))}
        <AddBtn onClick={() => setServices([...services, { id: `s${Date.now()}`, icon: "Search", title: "New Service", desc: "Description", tags: ["Tag"], color: "#2563eb" }])} label="Add Service" />
        <SaveBtn onClick={() => { updateContent({ services }); showSaved(); }} />
      </div>
    );
  };

  // ── PROJECTS TAB ──
  const ProjectsTab = () => {
    const [projects, setProjects] = useState<Project[]>(content.projects);
    const update = (id: string, key: keyof Project, val: string) => setProjects(projects.map(p => p.id === id ? { ...p, [key]: val } : p));
    return (
      <div>
        {projects.map(p => (
          <Card key={p.id} title={p.title} collapsible onDelete={() => setProjects(projects.filter(x => x.id !== p.id))}>
            <Field label="Title" value={p.title} onChange={v => update(p.id, "title", v)} />
            <Field label="Category" value={p.category} onChange={v => update(p.id, "category", v)} />
            <Field label="Result badge" value={p.result} onChange={v => update(p.id, "result", v)} />
            <Field label="Description" value={p.desc} onChange={v => update(p.id, "desc", v)} multiline />
            <Field label="Accent color" value={p.color} onChange={v => update(p.id, "color", v)} />
          </Card>
        ))}
        <AddBtn onClick={() => setProjects([...projects, { id: `p${Date.now()}`, title: "New Project", category: "SEO", result: "Result here", desc: "Description", color: "#2563eb" }])} label="Add Project" />
        <SaveBtn onClick={() => { updateContent({ projects }); showSaved(); }} />
      </div>
    );
  };

  // ── TESTIMONIALS TAB ──
  const TestimonialsTab = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(content.testimonials);
    const update = (id: string, key: keyof Testimonial, val: string | number) => setTestimonials(testimonials.map(t => t.id === id ? { ...t, [key]: val } : t));
    return (
      <div>
        {testimonials.map(t => (
          <Card key={t.id} title={t.name} collapsible onDelete={() => setTestimonials(testimonials.filter(x => x.id !== t.id))}>
            <Field label="Client name" value={t.name} onChange={v => update(t.id, "name", v)} />
            <Field label="Role & Company" value={t.role} onChange={v => update(t.id, "role", v)} />
            <Field label="Testimonial text" value={t.text} onChange={v => update(t.id, "text", v)} multiline />
            <Field label="Rating (1-5)" value={t.rating} onChange={v => update(t.id, "rating", parseInt(v) || 5)} />
          </Card>
        ))}
        <AddBtn onClick={() => setTestimonials([...testimonials, { id: `t${Date.now()}`, name: "Client Name", role: "Role, Company", text: "Testimonial text.", rating: 5 }])} label="Add Testimonial" />
        <SaveBtn onClick={() => { updateContent({ testimonials }); showSaved(); }} />
      </div>
    );
  };

  // ── PRICING TAB ──
  const PricingTab = () => {
    const [plans, setPlans] = useState<PricingPlan[]>(content.pricing);
    const update = (id: string, key: keyof PricingPlan, val: any) => setPlans(plans.map(p => p.id === id ? { ...p, [key]: val } : p));
    return (
      <div>
        {plans.map(p => (
          <Card key={p.id} title={p.name} collapsible>
            <Field label="Plan name" value={p.name} onChange={v => update(p.id, "name", v)} />
            <Field label="Description" value={p.desc} onChange={v => update(p.id, "desc", v)} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <Field label="Monthly price (₹)" value={p.priceMonthly} onChange={v => update(p.id, "priceMonthly", parseInt(v) || 0)} />
              <Field label="Yearly price (₹)" value={p.priceYearly} onChange={v => update(p.id, "priceYearly", parseInt(v) || 0)} />
            </div>
            <div style={{ marginBottom: "14px" }}>
              <label style={lbl}>Features (one per line)</label>
              <textarea rows={6} value={p.features.join("\n")} onChange={e => update(p.id, "features", e.target.value.split("\n").filter(Boolean))} style={{ ...inp, resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <input type="checkbox" checked={p.popular} onChange={e => update(p.id, "popular", e.target.checked)} style={{ width: "16px", height: "16px", accentColor: "#2563eb" }} />
              <label style={{ ...lbl, marginBottom: 0 }}>Mark as "Most Popular"</label>
            </div>
          </Card>
        ))}
        <SaveBtn onClick={() => { updateContent({ pricing: plans }); showSaved(); }} />
      </div>
    );
  };

  // ── CONTACT TAB ──
  const ContactTab = () => {
    const [local, setLocal] = useState(content.contact);
    return (
      <div>
        <Field label="Phone number" value={local.phone} onChange={v => setLocal({ ...local, phone: v })} />
        <Field label="Email address" value={local.email} onChange={v => setLocal({ ...local, email: v })} />
        <Field label="WhatsApp number" value={local.whatsapp} onChange={v => setLocal({ ...local, whatsapp: v })} />
        <SaveBtn onClick={() => { updateContent({ contact: local }); showSaved(); }} />
      </div>
    );
  };

  // ── OVERVIEW ──
  const Overview = () => (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "2rem" }}>
        {[
          { label: "Services", count: content.services.length, color: "#2563eb", bg: "#eff6ff" },
          { label: "Projects", count: content.projects.length, color: "#16a34a", bg: "#f0fdf4" },
          { label: "Testimonials", count: content.testimonials.length, color: "#7c3aed", bg: "#f5f3ff" },
          { label: "Blog Posts", count: (content.blogPosts || []).length, color: "#d97706", bg: "#fffbeb" },
          { label: "Service Pages", count: (content.servicePages || []).length, color: "#dc2626", bg: "#fef2f2" },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.color}20`, borderRadius: "12px", padding: "1.25rem", textAlign: "center" }}>
            <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "2rem", fontWeight: 800, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px", fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "12px", padding: "1.25rem" }}>
        <p style={{ fontSize: "14px", color: "#1e40af", lineHeight: 1.7 }}>
          <strong>💡 Kaise use karein:</strong> Left sidebar se section choose karo. <strong>Blog Posts</strong> mein naye articles likho aur publish karo. <strong>Service Pages</strong> mein har service ka content update karo. Sab changes turant website pe reflect honge!
        </p>
      </div>
    </div>
  );

  const tabContent: Record<string, React.ReactNode> = {
    overview: <Overview />,
    hero: <HeroTab />,
    services: <ServicesTab />,
    projects: <ProjectsTab />,
    testimonials: <TestimonialsTab />,
    pricing: <PricingTab />,
    blog: <BlogTab />,
    servicepages: <ServicePagesTab />,
    contact: <ContactTab />,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fb", display: "flex", fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: "230px", flexShrink: 0, background: "#fff", borderRight: "1px solid #e5e7eb", padding: "1.25rem 0", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ padding: "0 1.25rem 1.25rem", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "28px", height: "28px", background: "#2563eb", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "12px", color: "#fff" }}>N</span>
            </div>
            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: "14px", color: "#0f1117" }}>Clickbriz Admin</span>
          </div>
        </div>
        <nav style={{ flex: 1, padding: "0.75rem", display: "flex", flexDirection: "column", gap: "2px", overflowY: "auto" }}>
          {TABS.map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                background: active ? "#eff6ff" : "transparent",
                border: active ? "1px solid #bfdbfe" : "1px solid transparent",
                borderRadius: "8px", padding: "9px 12px",
                color: active ? "#2563eb" : "#6b7280",
                fontFamily: "Inter, sans-serif", fontSize: "13px",
                cursor: "pointer", textAlign: "left",
                display: "flex", alignItems: "center", gap: "10px",
                fontWeight: active ? 600 : 400, transition: "all 0.15s",
              }}>
                <Icon size={15} /> {t.label}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: "0 0.75rem", display: "flex", flexDirection: "column", gap: "6px" }}>
          <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "9px 12px", color: "#6b7280", fontFamily: "Inter, sans-serif", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
            <Eye size={15} /> View Site
          </button>
          <button onClick={logout} style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "9px 12px", color: "#dc2626", fontFamily: "Inter, sans-serif", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "2rem", overflowY: "auto", maxHeight: "100vh" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "22px", fontWeight: 800, color: "#0f1117" }}>
              {TABS.find(t => t.id === tab)?.label}
            </h1>
            <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "3px" }}>Website content manage karo</p>
          </div>
          {saved && (
            <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "8px", padding: "8px 16px", fontSize: "13px", color: "#16a34a", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
              ✅ Saved successfully!
            </div>
          )}
        </div>
        {tabContent[tab]}
      </div>
    </div>
  );
}
