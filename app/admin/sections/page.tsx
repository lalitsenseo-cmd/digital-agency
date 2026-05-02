"use client";
import { useState, useEffect } from "react";

type Section = {
  id: string;
  page_slug: string;
  section_name: string;
  data: any;
  updated_at: string;
};

export default function SectionsManager() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Section | null>(null);
  const [editedData, setEditedData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const loadSections = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sections");
      const json = await res.json();
      if (json.success) setSections(json.data);
    } catch {
      showToast("Failed to load");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSections();
  }, []);

  const handleSelect = (sec: Section) => {
    setSelected(sec);
    setEditedData(JSON.parse(JSON.stringify(sec.data)));
  };

  const updateField = (path: string[], value: any) => {
    setEditedData((prev: any) => {
      const copy = JSON.parse(JSON.stringify(prev));
      let target = copy;
      for (let i = 0; i < path.length - 1; i++) {
        target = target[path[i]];
      }
      target[path[path.length - 1]] = value;
      return copy;
    });
  };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch("/api/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selected.id,
          data: editedData,
          page_slug: selected.page_slug,
        }),
      });
      const json = await res.json();
      if (json.success) {
        showToast("✅ Saved! Website pe live ho gaya.");
        loadSections();
        setSelected({ ...selected, data: editedData });
      } else {
        showToast("❌ Error: " + json.error);
      }
    } catch {
      showToast("Network error");
    }
    setSaving(false);
  };

  // Recursive field renderer
  const renderField = (value: any, path: string[], label: string): any => {
    if (typeof value === "string") {
      const isLong = value.length > 80 || value.includes("\n");
      return (
        <div key={path.join(".")} style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>{label}</label>
          {isLong ? (
            <textarea
              value={value}
              onChange={e => updateField(path, e.target.value)}
              rows={Math.min(Math.ceil(value.length / 80) + 1, 6)}
              style={{ width: "100%", padding: "8px 10px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 13, fontFamily: "Inter, sans-serif", outline: "none", resize: "vertical" }}
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={e => updateField(path, e.target.value)}
              style={{ width: "100%", padding: "8px 10px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 13, outline: "none" }}
            />
          )}
        </div>
      );
    }
    if (typeof value === "number") {
      return (
        <div key={path.join(".")} style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>{label}</label>
          <input
            type="number"
            value={value}
            onChange={e => updateField(path, parseFloat(e.target.value) || 0)}
            style={{ width: "100%", padding: "8px 10px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 13, outline: "none" }}
          />
        </div>
      );
    }
    if (typeof value === "boolean") {
      return (
        <div key={path.join(".")} style={{ marginBottom: 12 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#374151" }}>
            <input type="checkbox" checked={value} onChange={e => updateField(path, e.target.checked)} />
            {label}
          </label>
        </div>
      );
    }
    if (Array.isArray(value)) {
      const addItem = () => {
        const newItem = value.length > 0 && typeof value[0] === "object" && value[0] !== null
          ? Object.fromEntries(Object.keys(value[0]).map(k => [k, typeof value[0][k] === "number" ? 0 : typeof value[0][k] === "boolean" ? false : Array.isArray(value[0][k]) ? [] : ""]))
          : "";
        updateField(path, [...value, newItem]);
      };

      const removeItem = (idx: number) => {
        if (!confirm("Delete this item?")) return;
        updateField(path, value.filter((_, i) => i !== idx));
      };

      const moveItem = (idx: number, dir: -1 | 1) => {
        const newIdx = idx + dir;
        if (newIdx < 0 || newIdx >= value.length) return;
        const copy = [...value];
        [copy[idx], copy[newIdx]] = [copy[newIdx], copy[idx]];
        updateField(path, copy);
      };

      return (
        <div key={path.join(".")} style={{ marginBottom: 16, padding: 12, background: "#f9fafb", borderRadius: 8, border: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#0d1f33", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label} ({value.length})</div>
            <button type="button" onClick={addItem} style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Add New</button>
          </div>
          {value.map((item: any, i: number) => (
            <div key={i} style={{ padding: 10, background: "#fff", borderRadius: 6, border: "1px solid #e5e7eb", marginBottom: 8, position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>Item {i + 1}</div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button type="button" onClick={() => moveItem(i, -1)} disabled={i === 0} style={{ background: "transparent", border: "1px solid #e5e7eb", borderRadius: 4, padding: "2px 8px", fontSize: 11, cursor: i === 0 ? "not-allowed" : "pointer", opacity: i === 0 ? 0.4 : 1 }}>↑</button>
                  <button type="button" onClick={() => moveItem(i, 1)} disabled={i === value.length - 1} style={{ background: "transparent", border: "1px solid #e5e7eb", borderRadius: 4, padding: "2px 8px", fontSize: 11, cursor: i === value.length - 1 ? "not-allowed" : "pointer", opacity: i === value.length - 1 ? 0.4 : 1 }}>↓</button>
                  <button type="button" onClick={() => removeItem(i)} style={{ background: "#fee2e2", border: "1px solid #fecaca", color: "#dc2626", borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Delete</button>
                </div>
              </div>
              {typeof item === "object" && item !== null ? (
                Object.entries(item).map(([k, v]) => renderField(v, [...path, String(i), k], k))
              ) : (
                renderField(item, [...path, String(i)], `${label} ${i + 1}`)
              )}
            </div>
          ))}
        </div>
      );
    }
    if (typeof value === "object" && value !== null) {
      return (
        <div key={path.join(".")} style={{ marginBottom: 16, padding: 12, background: "#f9fafb", borderRadius: 8, border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0d1f33", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
          {Object.entries(value).map(([k, v]) => renderField(v, [...path, k], k))}
        </div>
      );
    }
    return null;
  };

  // Group sections by page
  const grouped = sections.reduce((acc: Record<string, Section[]>, sec) => {
    if (!acc[sec.page_slug]) acc[sec.page_slug] = [];
    acc[sec.page_slug].push(sec);
    return acc;
  }, {});

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter, sans-serif", background: "#f4f5f7" }}>
      {toast && (
        <div style={{ position: "fixed", top: 16, right: 16, background: "#0d1f33", color: "#fff", padding: "10px 18px", borderRadius: 8, fontSize: 13, zIndex: 9999 }}>
          {toast}
        </div>
      )}

      {/* Left sidebar - section list */}
      <aside style={{ width: 280, background: "#fff", borderRight: "1px solid #e5e7eb", overflowY: "auto" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #e5e7eb" }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0d1f33", marginBottom: 4 }}>Content Sections</h2>
          <p style={{ fontSize: 12, color: "#6b7280" }}>Edit har page ka content</p>
        </div>
        {loading ? (
          <div style={{ padding: 20, color: "#9ca3af", fontSize: 13 }}>Loading...</div>
        ) : (
          Object.entries(grouped).map(([page, secs]) => (
            <div key={page}>
              <div style={{ padding: "10px 20px", fontSize: 11, textTransform: "uppercase", color: "#9ca3af", fontWeight: 600, background: "#f9fafb", letterSpacing: "0.05em" }}>
                {page === "home" ? "🏠 Home" : `📄 ${page}`}
              </div>
              {secs.map(sec => (
                <div
                  key={sec.id}
                  onClick={() => handleSelect(sec)}
                  style={{
                    padding: "10px 20px",
                    fontSize: 13,
                    cursor: "pointer",
                    background: selected?.id === sec.id ? "#eff6ff" : "transparent",
                    borderLeft: `3px solid ${selected?.id === sec.id ? "#2563eb" : "transparent"}`,
                    color: selected?.id === sec.id ? "#2563eb" : "#374151",
                    fontWeight: selected?.id === sec.id ? 600 : 400,
                    textTransform: "capitalize",
                  }}
                >
                  {sec.section_name.replace(/_/g, " ")}
                </div>
              ))}
            </div>
          ))
        )}
      </aside>

      {/* Main editor */}
      <main style={{ flex: 1, overflowY: "auto" }}>
        {selected ? (
          <>
<div style={{ padding: "20px 24px" }}>
              {editedData && Object.entries(editedData).map(([k, v]) => renderField(v, [k], k))}
            </div>

            <div style={{
              position: "sticky",
              bottom: 0,
              background: "#fff",
              borderTop: "2px solid #e5e7eb",
              padding: "12px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              zIndex: 50,
              boxShadow: "0 -4px 12px rgba(0,0,0,0.08)",
            }}>
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  background: saving ? "#9ca3af" : "#2563eb",
                  color: "#fff",
                  padding: "9px 28px",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: saving ? "not-allowed" : "pointer",
                }}
              >
                {saving ? "⏳ Saving..." : "💾 Save & Publish"}
              </button>
            </div>
          </>
        ) : (
          <div style={{ padding: 60, textAlign: "center", color: "#9ca3af" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>👈</div>
            <p>Left sidebar se koi section select karo</p>
          </div>
        )}
      </main>
    </div>
  );
}