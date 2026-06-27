"use client";

import { useState, useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Unlink as UnlinkIcon,
  Image as ImageIcon,
  Undo2,
  Redo2,
} from "lucide-react";

import { internalPages, type InternalPage } from "@/lib/internal-pages";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const editor = useEditor({
    // Next.js App Router ke saath hydration mismatch se bachne ke liye
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener", target: "_self" },
      }),
      Image.configure({ HTMLAttributes: { class: "rte-img" } }),
      Placeholder.configure({
        placeholder: "Yahan apna blog content English me likho… (HTML khud ban jaayega)",
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // Khaali editor par <p></p> aata hai — usse blank treat karein
      onChange(html === "<p></p>" ? "" : html);
    },
  });

  // Bahar se value badle (jaise doosra post edit karein) to editor sync karo.
  // setContent ko bina doosre argument ke call karte hain — Tiptap v2 aur v3 dono pe chalta hai.
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const normalizedCurrent = current === "<p></p>" ? "" : current;
    const incoming = value || "";
    if (incoming !== normalizedCurrent) {
      editor.commands.setContent(incoming);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  const openLinkModal = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    setLinkUrl(prev || "");
    setShowLinkModal(true);
  }, [editor]);

  const applyLink = (url: string) => {
    if (!editor) return;
    const href = url.trim();
    if (!href) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }
    setShowLinkModal(false);
    setLinkUrl("");
  };

  const addImage = () => {
    if (!editor) return;
    const url = window.prompt("Image ka URL daalo:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  if (!editor) {
    return (
      <div style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: 16, color: "#9ca3af", fontSize: 14 }}>
        Editor load ho raha hai…
      </div>
    );
  }

  const grouped = internalPages.reduce<Record<string, InternalPage[]>>((acc, p) => {
    (acc[p.group] ||= []).push(p);
    return acc;
  }, {});

  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 8, overflow: "hidden", background: "#fff" }}>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          padding: 8,
          borderBottom: "1px solid #e5e7eb",
          background: "#f9fafb",
        }}
      >
        <Btn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold"><BoldIcon size={16} /></Btn>
        <Btn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic"><ItalicIcon size={16} /></Btn>
        <Sep />
        <Btn active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2"><Heading2 size={16} /></Btn>
        <Btn active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3"><Heading3 size={16} /></Btn>
        <Sep />
        <Btn active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list"><List size={16} /></Btn>
        <Btn active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list"><ListOrdered size={16} /></Btn>
        <Btn active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Quote"><Quote size={16} /></Btn>
        <Sep />
        <Btn active={editor.isActive("link")} onClick={openLinkModal} title="Link (internal ya external)"><LinkIcon size={16} /></Btn>
        <Btn onClick={() => editor.chain().focus().unsetLink().run()} title="Remove link"><UnlinkIcon size={16} /></Btn>
        <Btn onClick={addImage} title="Image (URL se)"><ImageIcon size={16} /></Btn>
        <Sep />
        <Btn onClick={() => editor.chain().focus().undo().run()} title="Undo"><Undo2 size={16} /></Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} title="Redo"><Redo2 size={16} /></Btn>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="rte-content" />

      {/* Link modal */}
      {showLinkModal && (
        <div
          onClick={() => setShowLinkModal(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: 12, padding: 20, width: "100%", maxWidth: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, color: "#0f1117" }}>Link daalo</h3>

            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
              Apni site ka page chuno (internal link)
            </label>
            <select
              onChange={(e) => { if (e.target.value) setLinkUrl(e.target.value); }}
              defaultValue=""
              style={{ width: "100%", padding: "0.6rem", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, marginBottom: 14 }}
            >
              <option value="">— Page select karo —</option>
              {Object.entries(grouped).map(([group, pages]) => (
                <optgroup key={group} label={group}>
                  {pages.map((p) => (
                    <option key={p.path} value={p.path}>{p.label} ({p.path})</option>
                  ))}
                </optgroup>
              ))}
            </select>

            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
              Ya URL type karo (external ke liye)
            </label>
            <input
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com ya /seo-services"
              style={{ width: "100%", padding: "0.6rem", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, marginBottom: 18 }}
              autoFocus
            />

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                onClick={() => { setShowLinkModal(false); setLinkUrl(""); }}
                style={{ background: "#fff", color: "#374151", border: "1px solid #d1d5db", padding: "0.55rem 1.1rem", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 13 }}
              >
                Cancel
              </button>
              <button
                onClick={() => applyLink(linkUrl)}
                style={{ background: "#2563eb", color: "#fff", border: "none", padding: "0.55rem 1.1rem", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 13 }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editor content ki styling */}
      <style jsx global>{`
        .rte-content .ProseMirror {
          min-height: 280px;
          padding: 16px;
          font-size: 15px;
          line-height: 1.7;
          color: #1e293b;
          outline: none;
        }
        .rte-content .ProseMirror:focus { outline: none; }
        .rte-content .ProseMirror p { margin: 0 0 0.9rem; }
        .rte-content .ProseMirror h2 { font-size: 1.5rem; font-weight: 700; margin: 1.4rem 0 0.7rem; color: #1e3a8a; }
        .rte-content .ProseMirror h3 { font-size: 1.2rem; font-weight: 700; margin: 1.1rem 0 0.5rem; color: #3730a3; }
        .rte-content .ProseMirror ul,
        .rte-content .ProseMirror ol { padding-left: 1.4rem; margin: 0 0 1rem; }
        .rte-content .ProseMirror li { margin-bottom: 0.35rem; }
        .rte-content .ProseMirror blockquote {
          border-left: 3px solid #93c5fd; margin: 1rem 0; padding-left: 1rem; color: #475569; font-style: italic;
        }
        .rte-content .ProseMirror a { color: #2563eb; text-decoration: underline; }
        .rte-content .ProseMirror img.rte-img,
        .rte-content .ProseMirror img { max-width: 100%; border-radius: 8px; margin: 0.5rem 0; }
        .rte-content .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left; color: #9ca3af; pointer-events: none; height: 0;
        }
      `}</style>
    </div>
  );
}

function Btn({
  children, onClick, active, title,
}: { children: React.ReactNode; onClick: () => void; active?: boolean; title: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 32, height: 32, borderRadius: 6, cursor: "pointer",
        border: "1px solid " + (active ? "#2563eb" : "#e5e7eb"),
        background: active ? "#2563eb" : "#fff",
        color: active ? "#fff" : "#374151",
      }}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <span style={{ width: 1, alignSelf: "stretch", background: "#e5e7eb", margin: "2px 2px" }} />;
}
