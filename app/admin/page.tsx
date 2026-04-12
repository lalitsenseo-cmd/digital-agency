"use client";
import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const { login } = useAdmin();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const ok = login(password);
      if (ok) {
        router.push("/admin/dashboard");
      } else {
        setError("Galat password. Dobara try karo.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080808",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "DM Sans, sans-serif",
    }}>
      <div style={{
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "2.5rem",
        width: "100%",
        maxWidth: "380px",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: "52px", height: "52px",
            background: "rgba(0,229,160,0.12)",
            border: "1px solid rgba(0,229,160,0.25)",
            borderRadius: "14px",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1rem",
          }}>
            <Lock size={22} color="#00e5a0" />
          </div>
          <h1 style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "22px", fontWeight: 800,
            color: "#f0f0f0", marginBottom: "6px",
          }}>Admin Login</h1>
          <p style={{ fontSize: "13px", color: "#555" }}>NexGen Digital — Content Manager</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ position: "relative" }}>
            <input
              type={show ? "text" : "password"}
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${error ? "rgba(255,100,100,0.4)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "10px",
                padding: "13px 44px 13px 16px",
                color: "#f0f0f0",
                fontSize: "15px",
                fontFamily: "DM Sans, sans-serif",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              style={{
                position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", color: "#555",
                display: "flex", alignItems: "center",
              }}
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <p style={{ fontSize: "13px", color: "#ff6b6b", margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#00e5a0",
              border: "none",
              borderRadius: "10px",
              padding: "14px",
              color: "#000",
              fontWeight: 700,
              fontFamily: "Syne, sans-serif",
              fontSize: "15px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {loading ? "Verifying..." : "Login →"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "12px", color: "#333" }}>
          Default password: <code style={{ color: "#555" }}>nexgen@admin123</code>
        </p>
      </div>
    </div>
  );
}
