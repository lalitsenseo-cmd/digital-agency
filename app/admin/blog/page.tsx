"use client";
import { useState, useEffect } from "react";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  content: string;
  cover_image: string | null;
  author: string;
  published: boolean;
  published_at: string;
};

const categories = ["SEO", "Google Ads", "Social Media", "Web Development", "Python"];

export default function BlogManagerPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);

  const empty: BlogPost = {
    id: "",
    title: "",
    slug: "",
    category: "SEO",
    description: "",
    content: "",
    cover_image: "",
    author: "Lalit Sen",
    published: true,
    published_at: new Date().toISOString(),
  };

  const [form, setForm] = useState<BlogPost>(empty);

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        setForm(prev => ({ ...prev, cover_image: json.url }));
      } else {
        alert("Upload failed: " + json.error);
      }
    } catch (err) {
      alert("Upload error");
    }
    setUploading(false);
    e.target.value = ""; // Reset input
  };

  const handleImageRemove = async () => {
    if (!form.cover_image) return;
    if (!confirm("Image delete karna chahte ho?")) return;

    // Only delete from storage if it's a Supabase URL
    if (form.cover_image.includes("/blog-images/")) {
      try {
        await fetch("/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: form.cover_image }),
        });
      } catch {
        // Silent fail - image already cleared from form
      }
    }
    setForm({ ...form, cover_image: "" });
  };

  const loadPosts = async () => {
    setLoading(true);
    const res = await fetch("/api/blog");
    const json = await res.json();
    if (json.success) setPosts(json.data);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      alert("Title aur slug required hain");
      return;
    }

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: editing ? "UPDATE" : "CREATE",
        payload: form,
      }),
    });
    const json = await res.json();

    if (json.success) {
      alert(editing ? "✅ Updated!" : "✅ Created!");
      setShowForm(false);
      setEditing(null);
      setForm(empty);
      loadPosts();
    } else {
      alert("❌ Error: " + json.error);
    }
  };

    const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;

    // Find post to get image URL
    const post = posts.find(p => p.id === id);

    // Delete post from database
    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "DELETE", payload: { id } }),
    });
    const json = await res.json();
    
    if (json.success) {
      // Also delete image from storage if exists
      if (post?.cover_image && post.cover_image.includes("/blog-images/")) {
        try {
          await fetch("/api/upload", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: post.cover_image }),
          });
        } catch {
          // Silent fail
        }
      }
      alert("✅ Deleted!");
      loadPosts();
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditing(post);
    setForm(post);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditing(null);
    setForm({ ...empty, id: `post-${Date.now()}` });
    setShowForm(true);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Inter, sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f1117" }}>Blog Manager</h1>
        <button
          onClick={handleNew}
          style={{ background: "#2563eb", color: "#fff", padding: "0.7rem 1.5rem", borderRadius: "8px", border: "none", fontWeight: 600, cursor: "pointer" }}
        >
          + New Post
        </button>
      </div>

      {showForm && (
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>{editing ? "Edit Post" : "New Post"}</h2>

          <div style={{ display: "grid", gap: "1rem" }}>
            <div>
              <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "0.3rem", display: "block" }}>Title</label>
              <input
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm({ ...form, title, slug: editing ? form.slug : generateSlug(title) });
                }}
                style={{ width: "100%", padding: "0.7rem", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "0.3rem", display: "block" }}>Slug (URL)</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "0.3rem", display: "block" }}>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px" }}
                >
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "0.3rem", display: "block" }}>Description (short)</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                style={{ width: "100%", padding: "0.7rem", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", resize: "vertical" }}
              />
            </div>

            <div>
              <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "0.3rem", display: "block" }}>Content (HTML allowed)</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={12}
                style={{ width: "100%", padding: "0.7rem", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", fontFamily: "monospace", resize: "vertical" }}
                placeholder="<p>Your full blog content here...</p><h2>Section</h2><p>More content...</p>"
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
              <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "0.3rem", display: "block" }}>Cover Image</label>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <input
                    value={form.cover_image || ""}
                    onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                    placeholder="URL ya upload karo"
                    style={{ flex: 1, padding: "0.7rem", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px" }}
                  />
                  <label style={{ background: uploading ? "#9ca3af" : "#16a34a", color: "#fff", padding: "0.7rem 1rem", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: uploading ? "not-allowed" : "pointer", whiteSpace: "nowrap" }}>
                    {uploading ? "Uploading..." : "📁 Upload"}
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
                {form.cover_image && (
                  <div style={{ marginTop: "8px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <img src={form.cover_image} alt="Preview" style={{ maxWidth: "200px", maxHeight: "120px", borderRadius: "6px", border: "1px solid #e5e7eb", objectFit: "cover" }} />
                    <button
                      type="button"
                      onClick={handleImageRemove}
                      style={{ background: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                    >
                      ❌ Remove
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "0.3rem", display: "block" }}>Author</label>
                <input
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  style={{ width: "100%", padding: "0.7rem", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px" }}
                />
              </div>
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "14px" }}>
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              Published (visible on website)
            </label>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={handleSave}
                style={{ background: "#2563eb", color: "#fff", padding: "0.7rem 1.5rem", borderRadius: "8px", border: "none", fontWeight: 600, cursor: "pointer" }}
              >
                {editing ? "Update Post" : "Create Post"}
              </button>
              <button
                onClick={() => { setShowForm(false); setEditing(null); }}
                style={{ background: "#fff", color: "#374151", padding: "0.7rem 1.5rem", borderRadius: "8px", border: "1px solid #d1d5db", fontWeight: 600, cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#9ca3af" }}>Loading...</div>
        ) : posts.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#9ca3af" }}>
            No posts yet. Click "+ New Post" to create one.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f9fafb" }}>
              <tr>
                <th style={{ padding: "1rem", textAlign: "left", fontSize: "13px", color: "#6b7280" }}>Title</th>
                <th style={{ padding: "1rem", textAlign: "left", fontSize: "13px", color: "#6b7280" }}>Category</th>
                <th style={{ padding: "1rem", textAlign: "left", fontSize: "13px", color: "#6b7280" }}>Status</th>
                <th style={{ padding: "1rem", textAlign: "right", fontSize: "13px", color: "#6b7280" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} style={{ borderTop: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "1rem", fontSize: "14px", fontWeight: 600, color: "#0f1117" }}>
                    {post.title}
                    <div style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 400, marginTop: "2px" }}>/{post.slug}</div>
                  </td>
                  <td style={{ padding: "1rem", fontSize: "13px", color: "#6b7280" }}>{post.category}</td>
                  <td style={{ padding: "1rem" }}>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "999px",
                      background: post.published ? "#d1fae5" : "#fee2e2",
                      color: post.published ? "#065f46" : "#991b1b",
                    }}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td style={{ padding: "1rem", textAlign: "right" }}>
                    <button
                      onClick={() => handleEdit(post)}
                      style={{ background: "transparent", color: "#2563eb", border: "none", marginRight: "0.5rem", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      style={{ background: "transparent", color: "#dc2626", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}