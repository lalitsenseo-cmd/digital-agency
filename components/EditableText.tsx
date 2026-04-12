"use client";
import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

type Props = {
  value: string;
  onSave: (val: string) => void;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  style?: React.CSSProperties;
  multiline?: boolean;
};

export default function EditableText({ value, onSave, as = "span", style, multiline = false }: Props) {
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const Tag = as;

  if (!isAdmin) {
    return <Tag style={style}>{value}</Tag>;
  }

  if (editing) {
    return (
      <span style={{ display: "inline-flex", flexDirection: "column", gap: "6px", width: "100%" }}>
        {multiline ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
            rows={3}
            style={{
              background: "rgba(0,229,160,0.06)",
              border: "1.5px solid rgba(0,229,160,0.5)",
              borderRadius: "8px",
              color: "#f0f0f0",
              padding: "8px 12px",
              fontSize: "inherit",
              fontFamily: "inherit",
              fontWeight: "inherit",
              lineHeight: "inherit",
              resize: "vertical",
              outline: "none",
              width: "100%",
            }}
          />
        ) : (
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
            style={{
              background: "rgba(0,229,160,0.06)",
              border: "1.5px solid rgba(0,229,160,0.5)",
              borderRadius: "8px",
              color: "#f0f0f0",
              padding: "6px 12px",
              fontSize: "inherit",
              fontFamily: "inherit",
              fontWeight: "inherit",
              outline: "none",
              width: "100%",
            }}
          />
        )}
        <span style={{ display: "flex", gap: "6px" }}>
          <button onClick={() => { onSave(draft); setEditing(false); }} style={{
            background: "#00e5a0", border: "none", borderRadius: "6px",
            color: "#000", padding: "4px 10px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 700,
          }}>
            <Check size={12} /> Save
          </button>
          <button onClick={() => { setDraft(value); setEditing(false); }} style={{
            background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "6px",
            color: "#888", padding: "4px 10px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "4px", fontSize: "12px",
          }}>
            <X size={12} /> Cancel
          </button>
        </span>
      </span>
    );
  }

  return (
    <Tag style={{ ...style, position: "relative", display: "inline-flex", alignItems: "flex-start", gap: "8px" }}>
      <span>{value}</span>
      <button
        onClick={() => setEditing(true)}
        title="Edit"
        style={{
          background: "rgba(0,229,160,0.15)",
          border: "1px solid rgba(0,229,160,0.3)",
          borderRadius: "6px",
          padding: "3px 6px",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          flexShrink: 0,
          marginTop: "2px",
          opacity: 0.7,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
      >
        <Pencil size={11} color="#00e5a0" />
      </button>
    </Tag>
  );
}
