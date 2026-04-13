'use client'

// app/admin/seo/page.tsx
// ─────────────────────────────────────────────────────────────
// NexGen Digital — Full SEO + Content Management Dashboard
// Features:
//   ✅ Dashboard with SEO score overview
//   ✅ Pages SEO editor (title, desc, keyword, canonical, robots)
//   ✅ Content Editor (H1–H4, Bold, Italic, Images, Lists, Tables)
//   ✅ XML Sitemap generator
//   ✅ Robots.txt editor
//   ✅ Schema / Open Graph / Twitter Cards
//   ✅ Site-wide settings
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from 'react'
import { defaultPages, defaultSettings, calcSEOScore, generateSitemap, PageSEO, SiteSettings } from '@/lib/seo-data'

// ─── Password Gate ─────────────────────────────────────────
const ADMIN_PASSWORD = 'nexgen2026' // apna password change kar lo!

// ─── Types ─────────────────────────────────────────────────
type Section = 'dashboard' | 'content' | 'pages' | 'sitemap' | 'robots' | 'schema' | 'settings'
type SchemaTab = 'og' | 'jsonld' | 'twitter'

// ─── SEO Checklist ─────────────────────────────────────────
function getChecks(page: PageSEO) {
  const kw = page.keyword.toLowerCase().split(' ')[0]
  return [
    { label: `Title length: ${page.title.length} chars (50–65 ideal)`, pass: page.title.length >= 50 && page.title.length <= 65 },
    { label: `Description: ${page.description.length} chars (120–160 ideal)`, pass: page.description.length >= 120 && page.description.length <= 160 },
    { label: 'Keyword in title', pass: !!(kw && page.title.toLowerCase().includes(kw)) },
    { label: 'Keyword in description', pass: !!(kw && page.description.toLowerCase().includes(kw)) },
    { label: 'Canonical URL set', pass: !!page.canonical },
    { label: 'Page is indexable', pass: page.robots.includes('index') },
  ]
}

function getIssues(page: PageSEO): string[] {
  const issues: string[] = []
  if (page.title.length < 50) issues.push('Title too short')
  if (page.title.length > 65) issues.push('Title too long')
  if (page.description.length < 120) issues.push('Short description')
  if (!page.keyword) issues.push('No keyword')
  if (!page.canonical) issues.push('No canonical')
  return issues
}

// ─── Score Badge ───────────────────────────────────────────
function ScoreBadge({ score }: { score: number }) {
  const cls = score >= 80 ? '#3b6d11' : score >= 50 ? '#854f0b' : '#a32d2d'
  const bg = score >= 80 ? '#eaf3de' : score >= 50 ? '#faeeda' : '#fcebeb'
  return (
    <span style={{ background: bg, color: cls, padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 500 }}>
      {score}
    </span>
  )
}

// ─── SCHEMAS ──────────────────────────────────────────────
const SCHEMAS: Record<string, string> = {
  Organization: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NexGen Digital",
  "url": "https://nexgen-digital-psi.vercel.app",
  "logo": "https://nexgen-digital-psi.vercel.app/logo.png",
  "founder": "Lalit Sen",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-85270-04901",
    "contactType": "customer service",
    "areaServed": "IN"
  }
}`,
  LocalBusiness: `{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "NexGen Digital",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Faridabad",
    "addressRegion": "Haryana",
    "postalCode": "121001",
    "addressCountry": "IN"
  },
  "telephone": "+91-85270-04901",
  "url": "https://nexgen-digital-psi.vercel.app",
  "openingHours": "Mo-Sa 09:00-18:00"
}`,
  Service: `{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Digital Marketing Services",
  "serviceType": "Digital Marketing",
  "provider": {
    "@type": "Organization",
    "name": "NexGen Digital"
  },
  "areaServed": "India"
}`,
  Blog: `{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "NexGen Digital Blog",
  "url": "https://nexgen-digital-psi.vercel.app/blog",
  "publisher": {
    "@type": "Organization",
    "name": "NexGen Digital"
  }
}`,
}

// ─── MAIN COMPONENT ────────────────────────────────────────
export default function SEODashboard() {
  const [authed, setAuthed] = useState(false)
  const [pwInput, setPwInput] = useState('')
  const [pwError, setPwError] = useState(false)

  const [section, setSection] = useState<Section>('dashboard')
  const [pages, setPages] = useState<PageSEO[]>(defaultPages)
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [robotsTxt, setRobotsTxt] = useState(
    `User-agent: *\nAllow: /\n\nDisallow: /admin/\nDisallow: /api/\nDisallow: /_next/\n\nSitemap: https://nexgen-digital-psi.vercel.app/sitemap.xml`
  )

  // Pages SEO editor
  const [editingPage, setEditingPage] = useState<PageSEO | null>(null)
  const [pageFilter, setPageFilter] = useState('')
  const [scoreFilter, setScoreFilter] = useState('all')

  // Content editor
  const [contentPageId, setContentPageId] = useState('')
  const [previewOn, setPreviewOn] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)

  // Schema tab
  const [schemaTab, setSchemaTab] = useState<SchemaTab>('og')
  const [schemaType, setSchemaType] = useState('Organization')

  // Toast
  const [toastMsg, setToastMsg] = useState('')
  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 2500)
  }

  // Auth
  const handleLogin = () => {
    if (pwInput === ADMIN_PASSWORD) {
      setAuthed(true)
      setPwError(false)
    } else {
      setPwError(true)
    }
  }

  // Update page in state
  const updatePage = (updated: PageSEO) => {
    setPages(prev => prev.map(p => p.id === updated.id ? { ...updated, lastModified: new Date().toISOString() } : p))
  }

  // Content editor commands
  const exec = (cmd: string, value?: string) => {
    document.execCommand(cmd, false, value)
    editorRef.current?.focus()
  }
  const applyBlock = (tag: string) => {
    if (!tag) return
    document.execCommand('formatBlock', false, tag)
    editorRef.current?.focus()
  }
  const insertImg = () => {
    const url = prompt('Image URL daalen:')
    if (url) {
      const alt = prompt('Alt text (optional):') || 'image'
      exec('insertHTML', `<img src="${url}" alt="${alt}" style="max-width:100%;border-radius:8px;margin:6px 0">`)
    }
  }
  const insertLink = () => {
    const url = prompt('Link URL:', 'https://')
    if (url) exec('createLink', url)
  }
  const insertTable = () => {
    exec('insertHTML', `<table style="border-collapse:collapse;width:100%;margin:10px 0"><tr><th style="border:1px solid #ddd;padding:8px;background:#f5f5f5">Column 1</th><th style="border:1px solid #ddd;padding:8px;background:#f5f5f5">Column 2</th></tr><tr><td style="border:1px solid #ddd;padding:8px">Cell 1</td><td style="border:1px solid #ddd;padding:8px">Cell 2</td></tr></table><p></p>`)
  }
  const saveContent = () => {
    if (!contentPageId) { showToast('Pehle page select karein!'); return }
    const html = editorRef.current?.innerHTML || ''
    setPages(prev => prev.map(p => p.id === contentPageId ? { ...p, content: html, lastModified: new Date().toISOString() } : p))
    showToast('Content saved! ✓')
  }
  const loadContent = (id: string) => {
    setContentPageId(id)
    const p = pages.find(x => x.id === id)
    if (editorRef.current) {
      editorRef.current.innerHTML = p?.content || ''
    }
  }

  // ─── Password screen ─────────────────────────────────────
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f5f7' }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '40px 36px', width: 360, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <div style={{ fontSize: 22, fontWeight: 600, color: '#0d1f33', marginBottom: 4 }}>
            Nex<span style={{ color: '#5ba3e8' }}>Gen</span>. SEO
          </div>
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 28 }}>Admin Dashboard — Login</div>
          <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 6 }}>Password</label>
          <input
            type="password"
            value={pwInput}
            onChange={e => setPwInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Admin password"
            style={{ width: '100%', padding: '9px 12px', border: `1px solid ${pwError ? '#e24b4a' : '#e5e7eb'}`, borderRadius: 8, fontSize: 14, marginBottom: 8, outline: 'none', boxSizing: 'border-box' }}
            autoFocus
          />
          {pwError && <div style={{ fontSize: 12, color: '#e24b4a', marginBottom: 8 }}>Incorrect password</div>}
          <button
            onClick={handleLogin}
            style={{ width: '100%', padding: '10px', background: '#0d1f33', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, cursor: 'pointer', fontWeight: 500 }}
          >
            Login →
          </button>
          <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 16, textAlign: 'center' }}>
            Default password: <code>nexgen2026</code> — change it in page.tsx
          </div>
        </div>
      </div>
    )
  }

  // ─── Filtered pages ────────────────────────────────────
  const filteredPages = pages.filter(p => {
    const matchText = p.url.includes(pageFilter) || p.title.toLowerCase().includes(pageFilter.toLowerCase())
    const s = calcSEOScore(p)
    const matchScore = scoreFilter === 'all' ? true : scoreFilter === 'good' ? s >= 80 : scoreFilter === 'ok' ? s >= 50 && s < 80 : s < 50
    return matchText && matchScore
  })

  // ─── Dashboard stats ───────────────────────────────────
  const scores = pages.map(calcSEOScore)
  const goodCount = scores.filter(s => s >= 80).length
  const okCount = scores.filter(s => s >= 50 && s < 80).length
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)

  // ─── Sitemap ────────────────────────────────────────────
  const sitemapXml = generateSitemap(pages, settings.siteUrl)

  // ─── Navbar items ───────────────────────────────────────
  const navItems: { id: Section; label: string; group: string }[] = [
    { id: 'dashboard', label: 'Dashboard', group: 'Overview' },
    { id: 'content', label: 'Content Editor', group: 'Overview' },
    { id: 'pages', label: 'Pages SEO', group: 'Overview' },
    { id: 'sitemap', label: 'Sitemap', group: 'Tools' },
    { id: 'robots', label: 'Robots.txt', group: 'Tools' },
    { id: 'schema', label: 'Schema / OG', group: 'Tools' },
    { id: 'settings', label: 'Settings', group: 'Config' },
  ]

  const S = {
    wrap: { display: 'flex', height: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f4f5f7' } as React.CSSProperties,
    sidebar: { width: 200, background: '#0d1f33', display: 'flex', flexDirection: 'column' as const, flexShrink: 0 },
    main: { flex: 1, display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' },
    content: { flex: 1, overflowY: 'auto' as const, padding: 24 },
    header: { background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    input: { width: '100%', padding: '7px 10px', border: '1px solid #e5e7eb', borderRadius: 7, fontSize: 13, outline: 'none', boxSizing: 'border-box' as const, background: '#fff' },
    btn: { padding: '6px 14px', border: '1px solid #e5e7eb', borderRadius: 7, fontSize: 12, cursor: 'pointer', background: '#fff', color: '#374151' },
    btnPrimary: { padding: '7px 16px', background: '#0d1f33', color: '#fff', border: 'none', borderRadius: 7, fontSize: 13, cursor: 'pointer', fontWeight: 500 },
    label: { fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 },
    card: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 16 },
  }

  return (
    <div style={S.wrap}>
      {/* Toast */}
      {toastMsg && (
        <div style={{ position: 'fixed', top: 16, right: 16, background: '#0d1f33', color: '#fff', padding: '8px 16px', borderRadius: 8, fontSize: 13, zIndex: 9999 }}>
          {toastMsg}
        </div>
      )}

      {/* ── SIDEBAR ── */}
      <aside style={S.sidebar}>
        <div style={{ padding: '18px 14px 12px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>Nex<span style={{ color: '#5ba3e8' }}>Gen</span>.</div>
          <div style={{ color: '#3a5a78', fontSize: 10, marginTop: 2, letterSpacing: '0.05em', textTransform: 'uppercase' }}>CMS + SEO</div>
        </div>
        <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
          {['Overview', 'Tools', 'Config'].map(group => (
            <div key={group}>
              <div style={{ padding: '10px 14px 3px', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#3a5a78', fontWeight: 500 }}>
                {group}
              </div>
              {navItems.filter(n => n.group === group).map(item => (
                <div
                  key={item.id}
                  onClick={() => { setSection(item.id); setEditingPage(null) }}
                  style={{
                    padding: '8px 14px',
                    fontSize: 12.5,
                    cursor: 'pointer',
                    color: section === item.id ? '#fff' : '#8aabcb',
                    background: section === item.id ? 'rgba(91,163,232,0.12)' : 'transparent',
                    borderLeft: `2px solid ${section === item.id ? '#5ba3e8' : 'transparent'}`,
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          ))}
        </nav>
        <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 10, color: '#3a5a78', wordBreak: 'break-all' }}>nexgen-digital-psi.vercel.app</div>
          <div onClick={() => setAuthed(false)} style={{ fontSize: 10, color: '#5ba3e8', cursor: 'pointer', marginTop: 4 }}>Logout</div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={S.main}>

        {/* DASHBOARD */}
        {section === 'dashboard' && (
          <>
            <div style={S.header}>
              <div><div style={{ fontSize: 15, fontWeight: 600, color: '#0d1f33' }}>SEO Dashboard</div><div style={{ fontSize: 12, color: '#6b7280' }}>Site-wide SEO health overview</div></div>
              <button style={S.btnPrimary}>Refresh Audit</button>
            </div>
            <div style={S.content}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
                {[{ v: pages.length, l: 'Total Pages' }, { v: goodCount, l: 'Good SEO (80+)', c: '#3b6d11' }, { v: okCount, l: 'Needs Work', c: '#854f0b' }, { v: avgScore, l: 'Avg Score' }].map((s, i) => (
                  <div key={i} style={{ ...S.card, textAlign: 'center' }}>
                    <div style={{ fontSize: 24, fontWeight: 600, color: s.c || '#0d1f33' }}>{s.v}</div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={S.card}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#f9fafb' }}>
                      {['URL', 'Title', 'Score', 'Issues', 'Action'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 11, color: '#6b7280', fontWeight: 500, borderBottom: '1px solid #f0f0f0' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pages.map(p => {
                      const s = calcSEOScore(p)
                      const iss = getIssues(p)
                      return (
                        <tr key={p.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                          <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: 12, color: '#6b7280' }}>{p.url}</td>
                          <td style={{ padding: '9px 12px', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>{p.title}</td>
                          <td style={{ padding: '9px 12px' }}><ScoreBadge score={s} /></td>
                          <td style={{ padding: '9px 12px', fontSize: 11, color: '#6b7280' }}>{iss.length ? iss.slice(0, 2).join(', ') : <span style={{ color: '#3b6d11' }}>All good ✓</span>}</td>
                          <td style={{ padding: '9px 12px' }}><button style={S.btn} onClick={() => { setSection('pages'); setEditingPage(p) }}>Edit SEO</button></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* CONTENT EDITOR */}
        {section === 'content' && (
          <>
            <div style={S.header}>
              <div><div style={{ fontSize: 15, fontWeight: 600, color: '#0d1f33' }}>Content Editor</div><div style={{ fontSize: 12, color: '#6b7280' }}>H1–H4, Bold, Italic, Images, Lists, Tables — sab kuch</div></div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={S.btn} onClick={() => setPreviewOn(!previewOn)}>{previewOn ? 'Edit Mode' : 'Preview'}</button>
                <button style={S.btnPrimary} onClick={saveContent}>Save & Publish</button>
              </div>
            </div>
            <div style={{ ...S.content, display: 'grid', gridTemplateColumns: '1fr 240px', gap: 16, alignItems: 'start' }}>
              <div>
                {/* Page select + status */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                  <select style={{ ...S.input, width: 200, height: 36 }} onChange={e => loadContent(e.target.value)}>
                    <option value="">— Select Page —</option>
                    {pages.map(p => <option key={p.id} value={p.id}>{p.url}</option>)}
                  </select>
                  <span style={{ padding: '4px 10px', background: '#faeeda', color: '#854f0b', borderRadius: 20, fontSize: 11, fontWeight: 500, alignSelf: 'center' }}>Draft</span>
                </div>

                {!previewOn && (
                  <>
                    {/* Toolbar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '7px 10px', background: '#f9fafb', border: '1px solid #e5e7eb', borderBottom: 'none', borderRadius: '8px 8px 0 0', flexWrap: 'wrap' }}>
                      <select onChange={e => { applyBlock(e.target.value); e.target.value = '' }} style={{ padding: '3px 6px', border: '1px solid #e5e7eb', borderRadius: 5, fontSize: 12, height: 28, background: '#fff' }}>
                        <option value="">Paragraph</option>
                        <option value="h1">H1 — Main Title</option>
                        <option value="h2">H2 — Section</option>
                        <option value="h3">H3 — Sub-section</option>
                        <option value="h4">H4 — Small heading</option>
                        <option value="blockquote">Blockquote</option>
                        <option value="pre">Code Block</option>
                      </select>
                      <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 3px' }} />
                      {[['B', 'bold', '<b>B</b>'], ['I', 'italic', '<i>I</i>'], ['U', 'underline', '<u>U</u>'], ['S', 'strikeThrough', '<s>S</s>']].map(([_, cmd, html]) => (
                        <button key={cmd} title={cmd} onClick={() => exec(cmd)} dangerouslySetInnerHTML={{ __html: html }}
                          style={{ width: 28, height: 28, border: '1px solid transparent', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 13, fontFamily: 'inherit' }} />
                      ))}
                      <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 3px' }} />
                      <button onClick={() => exec('justifyLeft')} style={{ width: 28, height: 28, border: '1px solid transparent', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 12 }}>≡</button>
                      <button onClick={() => exec('justifyCenter')} style={{ width: 28, height: 28, border: '1px solid transparent', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 12 }}>☰</button>
                      <button onClick={() => exec('justifyRight')} style={{ width: 28, height: 28, border: '1px solid transparent', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 12 }}>≡</button>
                      <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 3px' }} />
                      <button onClick={() => exec('insertUnorderedList')} title="Bullet List" style={{ width: 28, height: 28, border: '1px solid transparent', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 13 }}>•</button>
                      <button onClick={() => exec('insertOrderedList')} title="Numbered List" style={{ width: 28, height: 28, border: '1px solid transparent', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 13 }}>1.</button>
                      <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 3px' }} />
                      <button onClick={insertLink} title="Link" style={{ width: 28, height: 28, border: '1px solid transparent', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 12 }}>🔗</button>
                      <button onClick={insertImg} title="Image" style={{ width: 28, height: 28, border: '1px solid transparent', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 12 }}>🖼</button>
                      <button onClick={insertTable} title="Table" style={{ width: 28, height: 28, border: '1px solid transparent', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 12 }}>⊞</button>
                      <button onClick={() => exec('insertHorizontalRule')} title="Divider" style={{ width: 28, height: 28, border: '1px solid transparent', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 12 }}>—</button>
                      <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 3px' }} />
                      <button onClick={() => exec('undo')} title="Undo" style={{ width: 28, height: 28, border: '1px solid transparent', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 12 }}>↩</button>
                      <button onClick={() => exec('redo')} title="Redo" style={{ width: 28, height: 28, border: '1px solid transparent', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 12 }}>↪</button>
                    </div>
                    {/* Editable area */}
                    <div
                      ref={editorRef}
                      contentEditable
                      suppressContentEditableWarning
                      data-placeholder="Yahan apna content likhein... H1 heading se shuru karein"
                      style={{ minHeight: 400, padding: '16px 18px', border: '1px solid #e5e7eb', borderRadius: '0 0 8px 8px', background: '#fff', fontSize: 15, lineHeight: 1.75, outline: 'none', color: '#1f2937' }}
                    />
                  </>
                )}

                {previewOn && (
                  <div style={{ ...S.card, minHeight: 400 }}>
                    <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 12, fontWeight: 500 }}>Preview</div>
                    <div style={{ fontSize: 15, lineHeight: 1.75, color: '#1f2937' }} dangerouslySetInnerHTML={{ __html: editorRef.current?.innerHTML || '<p style="color:#9ca3af">No content yet...</p>' }} />
                  </div>
                )}
              </div>

              {/* Right panel */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={S.card}>
                  <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 10, color: '#0d1f33' }}>Quick Insert</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    {[['H1', 'h1'], ['H2', 'h2'], ['H3', 'h3'], ['H4', 'h4']].map(([l, t]) => (
                      <button key={t} style={S.btn} onClick={() => { exec('insertHTML', `<${t}>${l} Heading</${t}><p></p>`) }}>{l}</button>
                    ))}
                    <button style={{ ...S.btn, gridColumn: 'span 2' }} onClick={() => exec('insertHTML', '<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul><p></p>')}>Bullet List</button>
                    <button style={{ ...S.btn, gridColumn: 'span 2' }} onClick={() => exec('insertHTML', '<blockquote style="border-left:3px solid #5ba3e8;padding:8px 14px;background:#f0f7ff;margin:10px 0">Your quote here...</blockquote><p></p>')}>Blockquote</button>
                    <button style={{ ...S.btn, gridColumn: 'span 2' }} onClick={insertTable}>Insert Table</button>
                    <button style={{ ...S.btn, gridColumn: 'span 2' }} onClick={insertImg}>Insert Image</button>
                  </div>
                </div>
                <div style={S.card}>
                  <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 10, color: '#0d1f33' }}>Publish</div>
                  <label style={S.label}>Status</label>
                  <select style={{ ...S.input, height: 34, marginBottom: 8 }}>
                    <option>Draft</option>
                    <option>Published</option>
                    <option>Under Review</option>
                  </select>
                  <label style={S.label}>Author</label>
                  <input style={{ ...S.input, marginBottom: 8 }} defaultValue="Lalit Sen" />
                  <label style={S.label}>Date</label>
                  <input type="date" style={S.input} defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* PAGES SEO */}
        {section === 'pages' && !editingPage && (
          <>
            <div style={S.header}>
              <div><div style={{ fontSize: 15, fontWeight: 600, color: '#0d1f33' }}>Pages SEO</div><div style={{ fontSize: 12, color: '#6b7280' }}>Har page ka meta, canonical & robots manage karein</div></div>
            </div>
            <div style={S.content}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                <input placeholder="Search pages..." style={{ ...S.input, width: 200, height: 34 }} value={pageFilter} onChange={e => setPageFilter(e.target.value)} />
                <select style={{ ...S.input, width: 160, height: 34 }} value={scoreFilter} onChange={e => setScoreFilter(e.target.value)}>
                  <option value="all">All Pages</option>
                  <option value="good">Good (80+)</option>
                  <option value="ok">Needs Work (50–79)</option>
                  <option value="bad">Poor (&lt;50)</option>
                </select>
              </div>
              <div style={S.card}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#f9fafb' }}>
                      {['URL', 'Meta Title', 'Score', 'Index', 'Action'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 11, color: '#6b7280', fontWeight: 500, borderBottom: '1px solid #f0f0f0' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPages.map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                        <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: 12, color: '#6b7280' }}>{p.url}</td>
                        <td style={{ padding: '9px 12px', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12, color: '#374151' }}>{p.title}</td>
                        <td style={{ padding: '9px 12px' }}><ScoreBadge score={calcSEOScore(p)} /></td>
                        <td style={{ padding: '9px 12px', fontSize: 12 }}>
                          <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: p.robots.includes('index') ? '#63991a' : '#e24b4a', marginRight: 5 }} />
                          {p.robots.includes('index') ? 'Index' : 'Noindex'}
                        </td>
                        <td style={{ padding: '9px 12px' }}><button style={S.btn} onClick={() => setEditingPage({ ...p })}>Edit SEO</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* PAGE SEO EDITOR */}
        {section === 'pages' && editingPage && (
          <>
            <div style={S.header}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button style={{ ...S.btn, fontSize: 12 }} onClick={() => setEditingPage(null)}>← Back</button>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#0d1f33' }}>Edit SEO: <code style={{ fontSize: 13 }}>{editingPage.url}</code></div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>Score: <strong style={{ color: calcSEOScore(editingPage) >= 80 ? '#3b6d11' : '#854f0b' }}>{calcSEOScore(editingPage)}/100</strong></div>
                </div>
              </div>
              <button style={S.btnPrimary} onClick={() => { updatePage(editingPage); setEditingPage(null); showToast('SEO saved! ✓') }}>Save Changes</button>
            </div>
            <div style={{ ...S.content, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16 }}>
              <div>
                {/* SERP Preview */}
                <div style={{ ...S.card, marginBottom: 16, background: '#f9fafb' }}>
                  <div style={{ fontSize: 11, color: '#5ba3e8', marginBottom: 3 }}>{settings.siteUrl}{editingPage.url}</div>
                  <div style={{ fontSize: 16, color: '#1a0dab', marginBottom: 4 }}>{editingPage.title || 'Add a meta title...'}</div>
                  <div style={{ fontSize: 13, color: '#4d5156', lineHeight: 1.5 }}>{editingPage.description || 'Add a meta description...'}</div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={S.label}>Meta Title <span style={{ float: 'right', color: editingPage.title.length > 65 ? '#e24b4a' : '#9ca3af' }}>{editingPage.title.length}/65</span></label>
                  <input style={S.input} value={editingPage.title} onChange={e => setEditingPage({ ...editingPage, title: e.target.value })} />
                  <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 3 }}>Recommended: 50–65 characters</div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={S.label}>Meta Description <span style={{ float: 'right', color: editingPage.description.length > 160 ? '#e24b4a' : '#9ca3af' }}>{editingPage.description.length}/160</span></label>
                  <textarea style={{ ...S.input, minHeight: 72, resize: 'vertical' }} value={editingPage.description} onChange={e => setEditingPage({ ...editingPage, description: e.target.value })} />
                  <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 3 }}>Recommended: 120–160 characters</div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={S.label}>Focus Keyword</label>
                  <input style={S.input} value={editingPage.keyword} onChange={e => setEditingPage({ ...editingPage, keyword: e.target.value })} placeholder="main keyword for this page" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div>
                    <label style={S.label}>Canonical URL</label>
                    <input style={S.input} value={editingPage.canonical} onChange={e => setEditingPage({ ...editingPage, canonical: e.target.value })} />
                  </div>
                  <div>
                    <label style={S.label}>Robots Meta</label>
                    <select style={{ ...S.input, height: 36 }} value={editingPage.robots} onChange={e => setEditingPage({ ...editingPage, robots: e.target.value })}>
                      <option>index,follow</option>
                      <option>noindex,follow</option>
                      <option>index,nofollow</option>
                      <option>noindex,nofollow</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={S.label}>OG Title</label>
                    <input style={S.input} value={editingPage.ogTitle} onChange={e => setEditingPage({ ...editingPage, ogTitle: e.target.value })} placeholder="Same as meta title" />
                  </div>
                  <div>
                    <label style={S.label}>OG Image URL</label>
                    <input style={S.input} value={editingPage.ogImage} onChange={e => setEditingPage({ ...editingPage, ogImage: e.target.value })} placeholder="/og-image.jpg" />
                  </div>
                </div>
              </div>
              {/* Checklist */}
              <div>
                <div style={{ ...S.card, marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 8, color: '#0d1f33' }}>SEO Checklist</div>
                  {getChecks(editingPage).map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: i < 5 ? '1px solid #f0f0f0' : 'none', fontSize: 12, color: '#374151' }}>
                      <span style={{ width: 16, height: 16, borderRadius: '50%', background: c.pass ? '#c0dd97' : '#f7c1c1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, flexShrink: 0, color: c.pass ? '#3b6d11' : '#a32d2d', fontWeight: 600 }}>{c.pass ? '✓' : '✗'}</span>
                      {c.label}
                    </div>
                  ))}
                </div>
                <div style={S.card}>
                  <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 8, color: '#0d1f33' }}>Score: {calcSEOScore(editingPage)}/100</div>
                  <div style={{ height: 6, background: '#f0f0f0', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${calcSEOScore(editingPage)}%`, height: '100%', background: calcSEOScore(editingPage) >= 80 ? '#63991a' : calcSEOScore(editingPage) >= 50 ? '#ef9f27' : '#e24b4a', borderRadius: 3 }} />
                  </div>
                  <div style={{ marginTop: 12, fontFamily: 'monospace', fontSize: 10, color: '#9ca3af', background: '#f9fafb', padding: '8px 10px', borderRadius: 6, lineHeight: 1.8 }}>
                    {`<title>${editingPage.title.substring(0, 40)}...</title>\n<meta name="description" content="${editingPage.description.substring(0, 35)}...">\n<link rel="canonical" href="${editingPage.canonical}">\n<meta name="robots" content="${editingPage.robots}">`}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SITEMAP */}
        {section === 'sitemap' && (
          <>
            <div style={S.header}>
              <div><div style={{ fontSize: 15, fontWeight: 600, color: '#0d1f33' }}>XML Sitemap</div><div style={{ fontSize: 12, color: '#6b7280' }}>Auto-generated sitemap for search engines</div></div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={S.btn} onClick={() => navigator.clipboard?.writeText(sitemapXml).then(() => showToast('Copied!'))}>Copy XML</button>
                <button style={S.btnPrimary} onClick={() => showToast('Sitemap regenerated!')}>Regenerate</button>
              </div>
            </div>
            <div style={S.content}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 16 }}>
                {[{ v: pages.filter(p => p.robots.includes('index')).length, l: 'URLs Indexed' }, { v: new Date().toISOString().split('T')[0], l: 'Last Generated' }, { v: 'Active', l: 'Status', c: '#3b6d11' }].map((s, i) => (
                  <div key={i} style={{ ...S.card, textAlign: 'center' }}>
                    <div style={{ fontSize: 20, fontWeight: 600, color: s.c || '#0d1f33' }}>{s.v}</div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ ...S.card }}>
                <div style={{ fontSize: 12, color: '#5ba3e8', marginBottom: 8 }}>🔗 {settings.siteUrl}/sitemap.xml</div>
                <pre style={{ fontFamily: 'monospace', fontSize: 11, background: '#f9fafb', padding: 12, borderRadius: 8, overflow: 'auto', maxHeight: 320, color: '#6b7280', lineHeight: 1.6 }}>
                  {sitemapXml}
                </pre>
              </div>
            </div>
          </>
        )}

        {/* ROBOTS.TXT */}
        {section === 'robots' && (
          <>
            <div style={S.header}>
              <div><div style={{ fontSize: 15, fontWeight: 600, color: '#0d1f33' }}>Robots.txt</div><div style={{ fontSize: 12, color: '#6b7280' }}>Search crawler access control</div></div>
              <button style={S.btnPrimary} onClick={() => showToast('robots.txt saved! ✓')}>Save Changes</button>
            </div>
            <div style={{ ...S.content, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={S.card}>
                <textarea
                  value={robotsTxt}
                  onChange={e => setRobotsTxt(e.target.value)}
                  style={{ width: '100%', minHeight: 220, fontFamily: 'monospace', fontSize: 13, padding: 12, border: '1px solid #e5e7eb', borderRadius: 8, background: '#f9fafb', color: '#1f2937', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }}
                />
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                  {['Block /admin', 'Block /api', 'Block GPTBot', 'Reset'].map((l, i) => (
                    <button key={l} style={S.btn} onClick={() => {
                      if (i === 0) setRobotsTxt(t => t + '\nDisallow: /admin/')
                      else if (i === 1) setRobotsTxt(t => t + '\nDisallow: /api/')
                      else if (i === 2) setRobotsTxt(t => t + '\n\nUser-agent: GPTBot\nDisallow: /')
                      else setRobotsTxt(`User-agent: *\nAllow: /\n\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: ${settings.siteUrl}/sitemap.xml`)
                    }}>{l}</button>
                  ))}
                </div>
              </div>
              <div style={S.card}>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10, color: '#0d1f33' }}>Quick Reference</div>
                {[['User-agent: *', 'Sab bots ke liye rules'], ['Allow: /path', 'Is path ko allow karo'], ['Disallow: /path', 'Is path ko block karo'], ['Sitemap: URL', 'Sitemap ki location']].map(([code, desc]) => (
                  <div key={code} style={{ marginBottom: 8 }}>
                    <code style={{ display: 'block', padding: '4px 8px', background: '#f0f9ff', borderRadius: 5, fontSize: 12, color: '#185fa5' }}>{code}</code>
                    <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* SCHEMA / OG */}
        {section === 'schema' && (
          <>
            <div style={S.header}>
              <div><div style={{ fontSize: 15, fontWeight: 600, color: '#0d1f33' }}>Schema & Open Graph</div><div style={{ fontSize: 12, color: '#6b7280' }}>Structured data and social sharing tags</div></div>
            </div>
            <div style={S.content}>
              <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #e5e7eb', marginBottom: 16 }}>
                {[['og', 'Open Graph'], ['jsonld', 'JSON-LD Schema'], ['twitter', 'Twitter Cards']].map(([id, label]) => (
                  <div key={id} onClick={() => setSchemaTab(id as SchemaTab)} style={{ padding: '8px 14px', fontSize: 13, cursor: 'pointer', borderBottom: `2px solid ${schemaTab === id ? '#5ba3e8' : 'transparent'}`, color: schemaTab === id ? '#0d1f33' : '#6b7280', fontWeight: schemaTab === id ? 500 : 400 }}>{label}</div>
                ))}
              </div>
              {schemaTab === 'og' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    {[['OG Title', 'ogTitle', 'NexGen Digital — Digital Marketing Faridabad'], ['OG Description', 'ogDesc', 'SEO, Google Ads, Web Dev & Python...'], ['OG Image URL', 'ogImage', 'https://.../og.jpg']].map(([label, key, ph]) => (
                      <div key={key} style={{ marginBottom: 12 }}>
                        <label style={S.label}>{label}</label>
                        <input style={S.input} placeholder={ph} />
                      </div>
                    ))}
                    <div style={{ marginBottom: 12 }}>
                      <label style={S.label}>OG Type</label>
                      <select style={{ ...S.input, height: 36 }}><option>website</option><option>article</option><option>service</option></select>
                    </div>
                    <button style={S.btnPrimary} onClick={() => showToast('OG tags saved! ✓')}>Save OG Tags</button>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 8, color: '#0d1f33' }}>Facebook / LinkedIn Preview</div>
                    <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
                      <div style={{ height: 100, background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#9ca3af' }}>OG Image (1200×630)</div>
                      <div style={{ padding: '10px 12px', background: '#fff' }}>
                        <div style={{ fontSize: 10, color: '#9ca3af', textTransform: 'uppercase' }}>nexgen-digital-psi.vercel.app</div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: '#1f2937', marginTop: 2 }}>NexGen Digital</div>
                        <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>Digital marketing for Indian businesses</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {schemaTab === 'jsonld' && (
                <div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={S.label}>Schema Type</label>
                    <select style={{ ...S.input, width: 240, height: 36 }} value={schemaType} onChange={e => setSchemaType(e.target.value)}>
                      {Object.keys(SCHEMAS).map(k => <option key={k}>{k}</option>)}
                    </select>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 8, color: '#0d1f33' }}>Generated JSON-LD</div>
                  <pre style={{ fontFamily: 'monospace', fontSize: 12, background: '#f9fafb', padding: 14, borderRadius: 8, overflow: 'auto', maxHeight: 280, color: '#374151', border: '1px solid #e5e7eb' }}>
                    {SCHEMAS[schemaType]}
                  </pre>
                  <button style={{ ...S.btnPrimary, marginTop: 10 }} onClick={() => navigator.clipboard?.writeText(SCHEMAS[schemaType]).then(() => showToast('Schema copied!'))}>Copy Schema</button>
                </div>
              )}
              {schemaTab === 'twitter' && (
                <div style={{ maxWidth: 440 }}>
                  {[['Card Type', 'select'], ['Twitter Handle', '@nexgendigital'], ['Title', 'NexGen Digital — SEO & Ads Agency'], ['Description', 'textarea']].map(([label, ph]) => (
                    <div key={label} style={{ marginBottom: 12 }}>
                      <label style={S.label}>{label}</label>
                      {ph === 'select' ? <select style={{ ...S.input, height: 36 }}><option>summary_large_image</option><option>summary</option></select>
                        : ph === 'textarea' ? <textarea style={{ ...S.input, minHeight: 60, resize: 'vertical' }} placeholder="ROI-driven digital marketing..." />
                        : <input style={S.input} placeholder={ph} />}
                    </div>
                  ))}
                  <button style={S.btnPrimary} onClick={() => showToast('Twitter tags saved! ✓')}>Save Twitter Tags</button>
                </div>
              )}
            </div>
          </>
        )}

        {/* SETTINGS */}
        {section === 'settings' && (
          <>
            <div style={S.header}>
              <div><div style={{ fontSize: 15, fontWeight: 600, color: '#0d1f33' }}>SEO Settings</div><div style={{ fontSize: 12, color: '#6b7280' }}>Site-wide SEO configuration</div></div>
              <button style={S.btnPrimary} onClick={() => showToast('Settings saved! ✓')}>Save Settings</button>
            </div>
            <div style={S.content}>
              <div style={{ maxWidth: 500 }}>
                <div style={{ ...S.card, marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12, color: '#0d1f33' }}>Site Identity</div>
                  {[['Site Name', 'siteName', settings.siteName], ['Tagline', 'tagline', settings.tagline], ['Site URL', 'siteUrl', settings.siteUrl]].map(([label, key, val]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <label style={S.label}>{label}</label>
                      <input style={S.input} defaultValue={val} onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))} />
                    </div>
                  ))}
                  <div style={{ marginBottom: 0 }}>
                    <label style={S.label}>Title Separator</label>
                    <select style={{ ...S.input, height: 36 }} value={settings.separator} onChange={e => setSettings(s => ({ ...s, separator: e.target.value }))}>
                      <option>—</option><option>|</option><option>-</option><option>•</option>
                    </select>
                  </div>
                </div>
                <div style={{ ...S.card, marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12, color: '#0d1f33' }}>Indexing</div>
                  {[['Index entire site', 'indexSite'], ['Follow all links', 'followLinks']].map(([label, key]) => (
                    <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginBottom: 8 }}>
                      <input type="checkbox" checked={settings[key as keyof SiteSettings] as boolean} onChange={e => setSettings(s => ({ ...s, [key]: e.target.checked }))} />
                      {label}
                    </label>
                  ))}
                </div>
                <div style={S.card}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12, color: '#0d1f33' }}>Verification & Analytics</div>
                  {[['Google Search Console', 'gscVerification', 'google-site-verification=...'], ['Google Analytics ID', 'analyticsId', 'G-XXXXXXXXXX']].map(([label, key, ph]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <label style={S.label}>{label}</label>
                      <input style={S.input} defaultValue={settings[key as keyof SiteSettings] as string} placeholder={ph} onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

      </main>
    </div>
  )
}
