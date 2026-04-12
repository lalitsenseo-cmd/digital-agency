"use client";
import { useAdmin } from "@/context/AdminContext";
import { LayoutDashboard, LogOut, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminBar() {
  const { isAdmin, logout } = useAdmin();
  const router = useRouter();
  if (!isAdmin) return null;
  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999, display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
      <div style={{ background: "#dbeafe", border: "1px solid #93c5fd", borderRadius: "999px", padding: "5px 14px", fontSize: "11px", color: "#1d4ed8", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700 }}>● ADMIN MODE</div>
      <div style={{ display: "flex", gap: "8px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "10px 14px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
        <button onClick={() => router.push("/admin/dashboard")} style={{ background: "#2563eb", border: "none", borderRadius: "8px", padding: "8px 16px", color: "#fff", fontWeight: 700, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
          <LayoutDashboard size={14} /> Dashboard
        </button>
        <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 14px", color: "#6b7280", fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
          <Eye size={14} /> Preview
        </button>
        <button onClick={logout} style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "8px 14px", color: "#dc2626", fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
          <LogOut size={14} /> Logout
        </button>
      </div>
    </div>
  );
}
