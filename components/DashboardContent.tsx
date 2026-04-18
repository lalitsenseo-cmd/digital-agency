'use client'

export default function DashboardContent({ content }: { content?: string | null }) {
  if (!content || content.trim() === '' || content === '<br>') return null
  return (
    <section style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px' }}>
      <div
        className="dashboard-content"
        dangerouslySetInnerHTML={{ __html: content }}
        style={{ fontSize: 16, lineHeight: 1.8, color: '#1f2937' }}
      />
    </section>
  )
}