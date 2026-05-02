'use client'

// app/admin/seo/page.tsx — Supabase version (data server pe save hoga)

import { useState, useEffect, useRef } from 'react'
import { defaultPages, defaultSettings, calcSEOScore, generateSitemap, PageSEO, SiteSettings } from '@/lib/seo-data'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''

type Section = 'dashboard' | 'content' | 'pages' | 'sitemap' | 'robots' | 'schema' | 'settings'
type SchemaTab = 'og' | 'jsonld' | 'twitter'

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

function ScoreBadge({ score }: { score: number }) {
  const cls = score >= 80 ? '#3b6d11' : score >= 50 ? '#854f0b' : '#a32d2d'
  const bg = score >= 80 ? '#eaf3de' : score >= 50 ? '#faeeda' : '#fcebeb'
  return <span style={{ background: bg, color: cls, padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 500 }}>{score}</span>
}

const SCHEMAS: Record<string, string> = {
  Organization: `{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "name": "Clickbriz Digital",\n  "url": "https://clickbriz.com",\n  "founder": "Lalit Sen",\n  "telephone": "+91-85270-04901"\n}`,
  LocalBusiness: `{\n  "@context": "https://schema.org",\n  "@type": "LocalBusiness",\n  "name": "Clickbriz Digital",\n  "address": {\n    "@type": "PostalAddress",\n    "addressLocality": "Faridabad",\n    "addressRegion": "Haryana",\n    "addressCountry": "IN"\n  },\n  "telephone": "+91-85270-04901"\n}`,
  Service: `{\n  "@context": "https://schema.org",\n  "@type": "Service",\n  "name": "Digital Marketing Services",\n  "provider": { "@type": "Organization", "name": "Clickbriz Digital" }\n}`,
}

export default function SEODashboard() {
  const [authed, setAuthed] = useState(false)
  const [pwInput, setPwInput] = useState('')
  const [pwError, setPwError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [section, setSection] = useState<Section>('dashboard')
  const [pages, setPages] = useState<PageSEO[]>(defaultPages)
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [robotsTxt, setRobotsTxt] = useState(`User-agent: *\nAllow: /\n\nDisallow: /admin/\nDisallow: /api/\nDisallow: /_next/\n\nSitemap: https://clickbriz.com/sitemap.xml`)
  const [editingPage, setEditingPage] = useState<PageSEO | null>(null)
  const [pageFilter, setPageFilter] = useState('')
  const [scoreFilter, setScoreFilter] = useState('all')
  const [contentPageId, setContentPageId] = useState('')
  const [previewOn, setPreviewOn] = useState(false)
  const [schemaTab, setSchemaTab] = useState<SchemaTab>('og')
  const [schemaType, setSchemaType] = useState('Organization')
  const [toastMsg, setToastMsg] = useState('')
  const editorRef = useRef<HTMLDivElement>(null)

  const toast = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 2500) }

  // ── Server se data load karo ──
  const loadData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/seo')
      const json = await res.json()
      if (json.success && json.data.pages?.length > 0) {
        const mapped = json.data.pages.map((p: any) => ({
          id: p.id,
          url: p.url,
          title: p.title || '',
          description: p.description || '',
          keyword: p.keyword || '',
          canonical: p.canonical || '',
          robots: p.robots || 'index,follow',
          ogTitle: p.og_title || '',
          ogDescription: p.og_description || '',
          ogImage: p.og_image || '',
          schema: p.schema || '',
          content: p.content || '',
          status: p.status || 'published',
          lastModified: p.last_modified || new Date().toISOString(),
        }))
        setPages(mapped)
        if (json.data.settings) {
          const s = json.data.settings
          setSettings({
            siteName: s.site_name || defaultSettings.siteName,
            tagline: s.tagline || defaultSettings.tagline,
            siteUrl: s.site_url || defaultSettings.siteUrl,
            separator: s.separator || '—',
            indexSite: true,
            followLinks: true,
            gscVerification: s.gsc_verification || '',
            analyticsId: s.analytics_id || '',
          })
          if (s.robots_txt) setRobotsTxt(s.robots_txt)
        }
      }
    } catch (e) {
      console.error('Load error:', e)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (authed) loadData()
  }, [authed])

  // ── Save page SEO ──
  const savePage = async (page: PageSEO) => {
    setSaving(true)
    try {
      const res = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'UPDATE_PAGE', payload: page }),
      })
      const json = await res.json()
      if (json.success) {
        setPages(prev => prev.map(p => p.id === page.id ? { ...page, lastModified: new Date().toISOString() } : p))
        setEditingPage(null)
        toast('SEO saved to server! ✓')
      } else {
        toast('Save failed — check Supabase keys')
      }
    } catch (e) {
      toast('Network error!')
    }
    setSaving(false)
  }

  // ── Save content ──
  const saveContent = async () => {
    if (!contentPageId) { toast('Pehle page select karein!'); return }
    const html = editorRef.current?.innerHTML || ''
    setSaving(true)
    try {
      const res = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'UPDATE_CONTENT', payload: { id: contentPageId, content: html } }),
      })
      const json = await res.json()
      if (json.success) {
        setPages(prev => prev.map(p => p.id === contentPageId ? { ...p, content: html } : p))
        toast('Content saved to server! ✓')
      } else {
        toast('Save failed!')
      }
    } catch (e) {
      toast('Network error!')
    }
    setSaving(false)
  }

  // ── Save settings ──
  const saveSettings = async () => {
    setSaving(true)
    try {
      await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'UPDATE_SETTINGS', payload: settings }),
      })
      toast('Settings saved! ✓')
    } catch (e) { toast('Error!') }
    setSaving(false)
  }

  // ── Save robots ──
  const saveRobots = async () => {
    setSaving(true)
    try {
      await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'UPDATE_ROBOTS', payload: { robotsTxt } }),
      })
      toast('robots.txt saved! ✓')
    } catch (e) { toast('Error!') }
    setSaving(false)
  }

  const exec = (cmd: string, value?: string) => { document.execCommand(cmd, false, value); editorRef.current?.focus() }
  const applyBlock = (tag: string) => { if (!tag) return; document.execCommand('formatBlock', false, tag); editorRef.current?.focus() }
  const insertImg = () => { const url = prompt('Image URL:'); if (url) exec('insertHTML', `<img src="${url}" alt="image" style="max-width:100%;border-radius:8px;margin:6px 0">`) }
  const insertLink = () => { const url = prompt('Link URL:', 'https://'); if (url) exec('createLink', url) }
  const insertTable = () => { exec('insertHTML', `<table style="border-collapse:collapse;width:100%;margin:10px 0"><tr><th style="border:1px solid #ddd;padding:8px;background:#f5f5f5">Column 1</th><th style="border:1px solid #ddd;padding:8px;background:#f5f5f5">Column 2</th></tr><tr><td style="border:1px solid #ddd;padding:8px">Cell 1</td><td style="border:1px solid #ddd;padding:8px">Cell 2</td></tr></table><p></p>`) }
  const loadContent = (id: string) => { setContentPageId(id); const p = pages.find(x => x.id === id); if (editorRef.current) editorRef.current.innerHTML = p?.content || '' }

  // ── Login screen ──
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f5f7' }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: '40px 36px', width: 360 }}>
          <div style={{ fontSize: 22, fontWeight: 600, color: '#0d1f33', marginBottom: 4 }}>Nex<span style={{ color: '#5ba3e8' }}>Gen</span>. SEO</div>
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 28 }}>Admin Dashboard — Login</div>
          <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 6 }}>Password</label>
          <input type="password" value={pwInput} onChange={e => setPwInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (pwInput === ADMIN_PASSWORD ? (setAuthed(true), setPwError(false)) : setPwError(true))}
            placeholder="Admin password" autoFocus
            style={{ width: '100%', padding: '9px 12px', border: `1px solid ${pwError ? '#e24b4a' : '#e5e7eb'}`, borderRadius: 8, fontSize: 14, marginBottom: 8, outline: 'none', boxSizing: 'border-box' }} />
          {pwError && <div style={{ fontSize: 12, color: '#e24b4a', marginBottom: 8 }}>Incorrect password</div>}
          <button onClick={() => pwInput === ADMIN_PASSWORD ? (setAuthed(true), setPwError(false)) : setPwError(true)}
            style={{ width: '100%', padding: 10, background: '#0d1f33', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, cursor: 'pointer', fontWeight: 500 }}>
            Login →
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f5f7' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 16, color: '#0d1f33', fontWeight: 500 }}>Loading data from server...</div>
          <div style={{ fontSize: 13, color: '#6b7280', marginTop: 6 }}>Supabase se connect ho raha hai</div>
        </div>
      </div>
    )
  }

  const filteredPages = pages.filter(p => {
    const matchText = p.url.includes(pageFilter) || p.title.toLowerCase().includes(pageFilter.toLowerCase())
    const s = calcSEOScore(p)
    const matchScore = scoreFilter === 'all' ? true : scoreFilter === 'good' ? s >= 80 : scoreFilter === 'ok' ? s >= 50 && s < 80 : s < 50
    return matchText && matchScore
  })

  const scores = pages.map(calcSEOScore)
  const goodCount = scores.filter(s => s >= 80).length
  const okCount = scores.filter(s => s >= 50 && s < 80).length
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  const sitemapXml = generateSitemap(pages, settings.siteUrl)

  const navItems: { id: Section; label: string; group: string; external?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', group: 'Overview' },
    { id: 'content', label: 'Content Editor', group: 'Overview' },
    { id: 'blog' as Section, label: 'Blog Manager', group: 'Overview', external: '/admin/blog' },
    { id: 'sections' as Section, label: 'Pages Content', group: 'Overview', external: '/admin/sections' },
    { id: 'pages', label: 'Pages SEO', group: 'Overview' },
    { id: 'sitemap', label: 'Sitemap', group: 'Tools' },
    { id: 'robots', label: 'Robots.txt', group: 'Tools' },
    { id: 'schema', label: 'Schema / OG', group: 'Tools' },
    { id: 'settings', label: 'Settings', group: 'Config' },
  ]

  const S = {
    wrap: { display: 'flex', height: 'calc(100vh - 130px)', marginTop: '130px', fontFamily: 'system-ui,-apple-system,sans-serif', background: '#f4f5f7' } as React.CSSProperties,
    sb: { width: 200, background: '#0d1f33', display: 'flex', flexDirection: 'column' as const, flexShrink: 0 },
    main: { flex: 1, display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' },
    body: { flex: 1, overflowY: 'auto' as const, padding: 24 },
    hdr: { background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    inp: { width: '100%', padding: '7px 10px', border: '1px solid #e5e7eb', borderRadius: 7, fontSize: 13, outline: 'none', boxSizing: 'border-box' as const, background: '#fff' },
    btn: { padding: '6px 14px', border: '1px solid #e5e7eb', borderRadius: 7, fontSize: 12, cursor: 'pointer', background: '#fff', color: '#374151' },
    btnP: { padding: '7px 16px', background: saving ? '#6b7280' : '#0d1f33', color: '#fff', border: 'none', borderRadius: 7, fontSize: 13, cursor: 'pointer', fontWeight: 500 },
    lbl: { fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 },
    card: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 16 },
  }

  return (
    <div style={S.wrap}>
      {toastMsg && <div style={{ position: 'fixed', top: 16, right: 16, background: '#0d1f33', color: '#fff', padding: '8px 16px', borderRadius: 8, fontSize: 13, zIndex: 9999 }}>{toastMsg}</div>}

      {/* SIDEBAR */}
      <aside style={S.sb}>
        <div style={{ padding: '18px 14px 12px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>Nex<span style={{ color: '#5ba3e8' }}>Gen</span>.</div>
          <div style={{ color: '#3a5a78', fontSize: 10, marginTop: 2, letterSpacing: '0.05em', textTransform: 'uppercase' }}>CMS + SEO</div>
          <div style={{ color: '#3a5a78', fontSize: 10, marginTop: 4 }}>● Supabase connected</div>
        </div>
        <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
          {['Overview', 'Tools', 'Config'].map(group => (
            <div key={group}>
              <div style={{ padding: '10px 14px 3px', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#3a5a78', fontWeight: 500 }}>{group}</div>
              {navItems.filter(n => n.group === group).map(item => (
                <div key={item.id} onClick={() => { if (item.external) { window.location.href = item.external; return; } setSection(item.id); setEditingPage(null) }}
                  style={{ padding: '8px 14px', fontSize: 12.5, cursor: 'pointer', color: section === item.id ? '#fff' : '#8aabcb', background: section === item.id ? 'rgba(91,163,232,0.12)' : 'transparent', borderLeft: `2px solid ${section === item.id ? '#5ba3e8' : 'transparent'}` }}>
                  {item.label}
                </div>
              ))}
            </div>
          ))}
        </nav>
        <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 10, color: '#3a5a78', wordBreak: 'break-all' }}>clickbriz.com</div>
          <div onClick={() => setAuthed(false)} style={{ fontSize: 10, color: '#5ba3e8', cursor: 'pointer', marginTop: 4 }}>Logout</div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={S.main}>

        {/* DASHBOARD */}
        {section === 'dashboard' && (
          <>
            <div style={S.hdr}>
              <div><div style={{ fontSize: 15, fontWeight: 600, color: '#0d1f33' }}>SEO Dashboard</div><div style={{ fontSize: 12, color: '#6b7280' }}>Data Supabase server pe save ho raha hai ✓</div></div>
              <button style={S.btnP} onClick={loadData}>Refresh</button>
            </div>
            <div style={S.body}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
                {[{ v: pages.length, l: 'Total Pages' }, { v: goodCount, l: 'Good SEO (80+)', c: '#3b6d11' }, { v: okCount, l: 'Needs Work', c: '#854f0b' }, { v: avgScore, l: 'Avg Score' }].map((s, i) => (
                  <div key={i} style={{ ...S.card, textAlign: 'center' }}><div style={{ fontSize: 24, fontWeight: 600, color: s.c || '#0d1f33' }}>{s.v}</div><div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{s.l}</div></div>
                ))}
              </div>
              <div style={S.card}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead><tr style={{ background: '#f9fafb' }}>{['URL', 'Title', 'Score', 'Issues', 'Action'].map(h => <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 11, color: '#6b7280', fontWeight: 500, borderBottom: '1px solid #f0f0f0' }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {pages.map(p => {
                      const s = calcSEOScore(p); const iss = getIssues(p)
                      return <tr key={p.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                        <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: 12, color: '#6b7280' }}>{p.url}</td>
                        <td style={{ padding: '9px 12px', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>{p.title}</td>
                        <td style={{ padding: '9px 12px' }}><ScoreBadge score={s} /></td>
                        <td style={{ padding: '9px 12px', fontSize: 11, color: '#6b7280' }}>{iss.length ? iss.slice(0, 2).join(', ') : <span style={{ color: '#3b6d11' }}>All good ✓</span>}</td>
                        <td style={{ padding: '9px 12px' }}><button style={S.btn} onClick={() => { setSection('pages'); setEditingPage(p) }}>Edit</button></td>
                      </tr>
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
            <div style={S.hdr}>
              <div><div style={{ fontSize: 15, fontWeight: 600, color: '#0d1f33' }}>Content Editor</div><div style={{ fontSize: 12, color: '#6b7280' }}>H1–H4, Bold, Images, Lists — server pe save hoga</div></div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={S.btn} onClick={() => setPreviewOn(!previewOn)}>{previewOn ? 'Edit Mode' : 'Preview'}</button>
                <button style={S.btnP} disabled={saving} onClick={saveContent}>{saving ? 'Saving...' : 'Save & Publish'}</button>
              </div>
            </div>
            <div style={{ ...S.body, display: 'grid', gridTemplateColumns: '1fr 240px', gap: 16, alignItems: 'start' }}>
              <div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                  <select style={{ ...S.inp, width: 200, height: 36 }} onChange={e => loadContent(e.target.value)}>
                    <option value="">— Select Page —</option>
                    {pages.map(p => <option key={p.id} value={p.id}>{p.url}</option>)}
                  </select>
                </div>
                {!previewOn && (
                  <>
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
                      {[['<b>B</b>', 'bold'], ['<i>I</i>', 'italic'], ['<u>U</u>', 'underline'], ['<s>S</s>', 'strikeThrough']].map(([html, cmd]) => (
                        <button key={cmd} onClick={() => exec(cmd)} dangerouslySetInnerHTML={{ __html: html }} style={{ width: 28, height: 28, border: '1px solid transparent', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 13 }} />
                      ))}
                      <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 3px' }} />
                      <button onClick={() => exec('insertUnorderedList')} style={{ width: 28, height: 28, border: 'none', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 14 }}>•</button>
                      <button onClick={() => exec('insertOrderedList')} style={{ width: 28, height: 28, border: 'none', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 12 }}>1.</button>
                      <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 3px' }} />
                      <button onClick={insertLink} style={{ width: 28, height: 28, border: 'none', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 13 }}>🔗</button>
                      <button onClick={insertImg} style={{ width: 28, height: 28, border: 'none', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 13 }}>🖼</button>
                      <button onClick={insertTable} style={{ width: 28, height: 28, border: 'none', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 13 }}>⊞</button>
                      <button onClick={() => exec('undo')} style={{ width: 28, height: 28, border: 'none', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 13 }}>↩</button>
                      <button onClick={() => exec('redo')} style={{ width: 28, height: 28, border: 'none', borderRadius: 5, cursor: 'pointer', background: 'transparent', fontSize: 13 }}>↪</button>
                    </div>
                    <div ref={editorRef} contentEditable suppressContentEditableWarning
                      style={{ minHeight: 400, padding: '16px 18px', border: '1px solid #e5e7eb', borderRadius: '0 0 8px 8px', background: '#fff', fontSize: 15, lineHeight: 1.75, outline: 'none', color: '#1f2937' }} />
                  </>
                )}
                {previewOn && (
                  <div style={{ ...S.card, minHeight: 400 }}>
                    <div dangerouslySetInnerHTML={{ __html: editorRef.current?.innerHTML || '<p style="color:#9ca3af">No content yet...</p>' }} />
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={S.card}>
                  <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 10, color: '#0d1f33' }}>Quick Insert</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    {[['H1', 'h1'], ['H2', 'h2'], ['H3', 'h3'], ['H4', 'h4']].map(([l, t]) => (
                      <button key={t} style={S.btn} onClick={() => exec('insertHTML', `<${t}>${l} Heading</${t}><p></p>`)}>{l}</button>
                    ))}
                    <button style={{ ...S.btn, gridColumn: 'span 2' }} onClick={() => exec('insertHTML', '<ul><li>Item 1</li><li>Item 2</li></ul><p></p>')}>Bullet List</button>
                    <button style={{ ...S.btn, gridColumn: 'span 2' }} onClick={() => exec('insertHTML', '<blockquote style="border-left:3px solid #5ba3e8;padding:8px 14px;background:#f0f7ff;margin:10px 0">Quote here...</blockquote><p></p>')}>Blockquote</button>
                    <button style={{ ...S.btn, gridColumn: 'span 2' }} onClick={insertImg}>Insert Image</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* PAGES SEO LIST */}
        {section === 'pages' && !editingPage && (
          <>
            <div style={S.hdr}><div><div style={{ fontSize: 15, fontWeight: 600, color: '#0d1f33' }}>Pages SEO</div><div style={{ fontSize: 12, color: '#6b7280' }}>Changes server pe save honge</div></div></div>
            <div style={S.body}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                <input placeholder="Search..." style={{ ...S.inp, width: 180, height: 34 }} value={pageFilter} onChange={e => setPageFilter(e.target.value)} />
                <select style={{ ...S.inp, width: 160, height: 34 }} value={scoreFilter} onChange={e => setScoreFilter(e.target.value)}>
                  <option value="all">All Pages</option><option value="good">Good (80+)</option><option value="ok">Needs Work</option><option value="bad">Poor</option>
                </select>
              </div>
              <div style={S.card}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead><tr style={{ background: '#f9fafb' }}>{['URL', 'Title', 'Score', 'Index', 'Action'].map(h => <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 11, color: '#6b7280', fontWeight: 500, borderBottom: '1px solid #f0f0f0' }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {filteredPages.map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                        <td style={{ padding: '9px 12px', fontFamily: 'monospace', fontSize: 12, color: '#6b7280' }}>{p.url}</td>
                        <td style={{ padding: '9px 12px', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>{p.title}</td>
                        <td style={{ padding: '9px 12px' }}><ScoreBadge score={calcSEOScore(p)} /></td>
                        <td style={{ padding: '9px 12px', fontSize: 12 }}><span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: p.robots.includes('index') ? '#63991a' : '#e24b4a', marginRight: 5 }} />{p.robots.includes('index') ? 'Index' : 'Noindex'}</td>
                        <td style={{ padding: '9px 12px' }}><button style={S.btn} onClick={() => setEditingPage({ ...p })}>Edit SEO</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ============================================
            PAGE SEO EDITOR — SAVE BUTTON STICKY FIX
        ============================================ */}
        {section === 'pages' && editingPage && (
          <>
            {/* HEADER — sirf back button aur info, save button nahi */}
            <div style={S.hdr}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button style={S.btn} onClick={() => setEditingPage(null)}>← Back</button>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#0d1f33' }}>
                    Edit: <code style={{ fontSize: 13 }}>{editingPage.url}</code>
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>
                    Score: <strong style={{ color: calcSEOScore(editingPage) >= 80 ? '#3b6d11' : '#854f0b' }}>
                      {calcSEOScore(editingPage)}/100
                    </strong>
                  </div>
                </div>
              </div>
              {/* ✅ Save button HEADER se HATAYA — ab sticky bar mein hai */}
            </div>

            {/* FORM BODY */}
            <div style={{ ...S.body, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16 }}>
              <div>
                <div style={{ ...S.card, marginBottom: 16, background: '#f9fafb' }}>
                  <div style={{ fontSize: 11, color: '#5ba3e8', marginBottom: 3 }}>{settings.siteUrl}{editingPage.url}</div>
                  <div style={{ fontSize: 16, color: '#1a0dab', marginBottom: 4 }}>{editingPage.title || 'Add title...'}</div>
                  <div style={{ fontSize: 13, color: '#4d5156', lineHeight: 1.5 }}>{editingPage.description || 'Add description...'}</div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={S.lbl}>Meta Title <span style={{ float: 'right', color: editingPage.title.length > 65 ? '#e24b4a' : '#9ca3af' }}>{editingPage.title.length}/65</span></label>
                  <input style={S.inp} value={editingPage.title} onChange={e => setEditingPage({ ...editingPage, title: e.target.value })} />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={S.lbl}>Meta Description <span style={{ float: 'right', color: editingPage.description.length > 160 ? '#e24b4a' : '#9ca3af' }}>{editingPage.description.length}/160</span></label>
                  <textarea style={{ ...S.inp, minHeight: 72, resize: 'vertical' }} value={editingPage.description} onChange={e => setEditingPage({ ...editingPage, description: e.target.value })} />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={S.lbl}>Focus Keyword</label>
                  <input style={S.inp} value={editingPage.keyword} onChange={e => setEditingPage({ ...editingPage, keyword: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div><label style={S.lbl}>Canonical URL</label><input style={S.inp} value={editingPage.canonical} onChange={e => setEditingPage({ ...editingPage, canonical: e.target.value })} /></div>
                  <div><label style={S.lbl}>Robots</label>
                    <select style={{ ...S.inp, height: 36 }} value={editingPage.robots} onChange={e => setEditingPage({ ...editingPage, robots: e.target.value })}>
                      <option>index,follow</option><option>noindex,follow</option><option>index,nofollow</option><option>noindex,nofollow</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div><label style={S.lbl}>OG Title</label><input style={S.inp} value={editingPage.ogTitle} onChange={e => setEditingPage({ ...editingPage, ogTitle: e.target.value })} /></div>
                  <div><label style={S.lbl}>OG Image</label><input style={S.inp} value={editingPage.ogImage} onChange={e => setEditingPage({ ...editingPage, ogImage: e.target.value })} /></div>
                </div>
              </div>

              {/* RIGHT SIDEBAR — Checklist & Score */}
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
                    <div style={{ width: `${calcSEOScore(editingPage)}%`, height: '100%', background: calcSEOScore(editingPage) >= 80 ? '#63991a' : '#ef9f27', borderRadius: 3 }} />
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ STICKY SAVE BAR — Header ke peeche kabhi nahi chupega */}
            <div style={{
              position: 'sticky',
              bottom: 0,
              background: '#fff',
              borderTop: '2px solid #e5e7eb',
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 50,
              boxShadow: '0 -4px 12px rgba(0,0,0,0.08)',
            }}>
              <div style={{ fontSize: 13, color: '#6b7280' }}>
                Editing: <code style={{ fontSize: 12, color: '#0d1f33', background: '#f4f5f7', padding: '2px 6px', borderRadius: 4 }}>{editingPage.url}</code>
                &nbsp;|&nbsp;
                Score: <strong style={{ color: calcSEOScore(editingPage) >= 80 ? '#3b6d11' : '#854f0b' }}>
                  {calcSEOScore(editingPage)}/100
                </strong>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={S.btn} onClick={() => setEditingPage(null)}>
                  ← Back
                </button>
                <button
                  style={{
                    ...S.btnP,
                    padding: '9px 28px',
                    fontSize: 14,
                    opacity: saving ? 0.7 : 1,
                    background: saving ? '#6b7280' : '#0d1f33',
                  }}
                  disabled={saving}
                  onClick={() => savePage(editingPage)}
                >
                  {saving ? '⏳ Saving...' : '💾 Save to Server'}
                </button>
              </div>
            </div>
            {/* STICKY BAR END */}

          </>
        )}

        {/* SITEMAP */}
        {section === 'sitemap' && (
          <>
            <div style={S.hdr}><div><div style={{ fontSize: 15, fontWeight: 600, color: '#0d1f33' }}>XML Sitemap</div></div><div style={{ display: 'flex', gap: 8 }}><button style={S.btn} onClick={() => navigator.clipboard?.writeText(sitemapXml).then(() => toast('Copied!'))}>Copy</button><button style={S.btnP} onClick={() => toast('Regenerated!')}>Regenerate</button></div></div>
            <div style={S.body}>
              <div style={S.card}><pre style={{ fontFamily: 'monospace', fontSize: 11, background: '#f9fafb', padding: 12, borderRadius: 8, overflow: 'auto', maxHeight: 400, color: '#6b7280', lineHeight: 1.6 }}>{sitemapXml}</pre></div>
            </div>
          </>
        )}

        {/* ROBOTS */}
        {section === 'robots' && (
          <>
            <div style={S.hdr}><div><div style={{ fontSize: 15, fontWeight: 600, color: '#0d1f33' }}>Robots.txt</div></div><button style={S.btnP} disabled={saving} onClick={saveRobots}>{saving ? 'Saving...' : 'Save to Server'}</button></div>
            <div style={S.body}>
              <div style={S.card}>
                <textarea value={robotsTxt} onChange={e => setRobotsTxt(e.target.value)} style={{ width: '100%', minHeight: 220, fontFamily: 'monospace', fontSize: 13, padding: 12, border: '1px solid #e5e7eb', borderRadius: 8, background: '#f9fafb', color: '#1f2937', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                  <button style={S.btn} onClick={() => setRobotsTxt(t => t + '\nDisallow: /admin/')}>+ /admin</button>
                  <button style={S.btn} onClick={() => setRobotsTxt(t => t + '\nDisallow: /api/')}>+ /api</button>
                  <button style={S.btn} onClick={() => setRobotsTxt(t => t + '\n\nUser-agent: GPTBot\nDisallow: /')}>Block GPTBot</button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SCHEMA */}
        {section === 'schema' && (
          <>
            <div style={S.hdr}><div><div style={{ fontSize: 15, fontWeight: 600, color: '#0d1f33' }}>Schema & Open Graph</div></div></div>
            <div style={S.body}>
              <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #e5e7eb', marginBottom: 16 }}>
                {[['og', 'Open Graph'], ['jsonld', 'JSON-LD Schema'], ['twitter', 'Twitter Cards']].map(([id, label]) => (
                  <div key={id} onClick={() => setSchemaTab(id as SchemaTab)} style={{ padding: '8px 14px', fontSize: 13, cursor: 'pointer', borderBottom: `2px solid ${schemaTab === id ? '#5ba3e8' : 'transparent'}`, color: schemaTab === id ? '#0d1f33' : '#6b7280' }}>{label}</div>
                ))}
              </div>
              {schemaTab === 'jsonld' && (
                <div>
                  <div style={{ marginBottom: 12 }}><label style={S.lbl}>Schema Type</label><select style={{ ...S.inp, width: 220, height: 36 }} value={schemaType} onChange={e => setSchemaType(e.target.value)}>{Object.keys(SCHEMAS).map(k => <option key={k}>{k}</option>)}</select></div>
                  <pre style={{ fontFamily: 'monospace', fontSize: 12, background: '#f9fafb', padding: 14, borderRadius: 8, overflow: 'auto', maxHeight: 280, color: '#374151', border: '1px solid #e5e7eb' }}>{SCHEMAS[schemaType]}</pre>
                  <button style={{ ...S.btnP, marginTop: 10 }} onClick={() => navigator.clipboard?.writeText(SCHEMAS[schemaType]).then(() => toast('Copied!'))}>Copy Schema</button>
                </div>
              )}
              {schemaTab === 'og' && (
                <div style={{ maxWidth: 500 }}>
                  {[['OG Title', 'Clickbriz Digital...'], ['OG Description', 'SEO, Google Ads...'], ['OG Image URL', 'https://.../og.jpg']].map(([label, ph]) => (
                    <div key={label} style={{ marginBottom: 12 }}><label style={S.lbl}>{label}</label><input style={S.inp} placeholder={ph} /></div>
                  ))}
                  <button style={S.btnP} onClick={() => toast('OG tags saved!')}>Save OG Tags</button>
                </div>
              )}
              {schemaTab === 'twitter' && (
                <div style={{ maxWidth: 440 }}>
                  {[['Handle', '@Clickbrizdigital'], ['Title', 'Clickbriz Digital...'], ['Description', 'ROI-driven marketing...']].map(([label, ph]) => (
                    <div key={label} style={{ marginBottom: 12 }}><label style={S.lbl}>{label}</label><input style={S.inp} placeholder={ph} /></div>
                  ))}
                  <button style={S.btnP} onClick={() => toast('Twitter tags saved!')}>Save</button>
                </div>
              )}
            </div>
          </>
        )}

        {/* SETTINGS */}
        {section === 'settings' && (
          <>
            <div style={S.hdr}><div><div style={{ fontSize: 15, fontWeight: 600, color: '#0d1f33' }}>SEO Settings</div></div><button style={S.btnP} disabled={saving} onClick={saveSettings}>{saving ? 'Saving...' : 'Save to Server'}</button></div>
            <div style={S.body}><div style={{ maxWidth: 500 }}>
              <div style={S.card}>
                {[['Site Name', 'siteName'], ['Tagline', 'tagline'], ['Site URL', 'siteUrl']].map(([label, key]) => (
                  <div key={key} style={{ marginBottom: 12 }}><label style={S.lbl}>{label}</label><input style={S.inp} value={settings[key as keyof SiteSettings] as string} onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))} /></div>
                ))}
                <div style={{ marginBottom: 12 }}><label style={S.lbl}>GSC Verification</label><input style={S.inp} placeholder="google-site-verification=..." value={settings.gscVerification} onChange={e => setSettings(s => ({ ...s, gscVerification: e.target.value }))} /></div>
                <div><label style={S.lbl}>Analytics ID</label><input style={S.inp} placeholder="G-XXXXXXXXXX" value={settings.analyticsId} onChange={e => setSettings(s => ({ ...s, analyticsId: e.target.value }))} /></div>
              </div>
            </div></div>
          </>
        )}

      </main>
    </div>
  )
}