// app/admin/layout.tsx
// ─────────────────────────────────────────
// Simple admin layout — password protection
// ─────────────────────────────────────────

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ minHeight: '100vh', background: '#f4f5f7' }}>
      {children}
    </div>
  )
}
