const STATS_NS = 'r123singh-resume-studio'
const GH_RELEASES = 'https://api.github.com/repos/r123singh/resume-studio/releases?per_page=20'

async function loadDownloadMeta() {
  try {
    const res = await fetch('download-meta.json', { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

function formatBytes(n) {
  if (!n) return ''
  const mb = n / (1024 * 1024)
  return `${mb.toFixed(1)} MB`
}

function formatCount(n) {
  return Number(n).toLocaleString('en-US')
}

function parseCount(data) {
  const n = Number(data?.count ?? data?.value)
  return Number.isFinite(n) ? n : null
}

async function counter(key, increment) {
  const url = increment
    ? `https://abacus.jasoncameron.dev/hit/${STATS_NS}/${key}`
    : `https://abacus.jasoncameron.dev/get/${STATS_NS}/${key}`
  try {
    const res = await fetch(url)
    if (res.status === 404 && !increment) return 0
    if (!res.ok) return null
    return parseCount(await res.json())
  } catch {
    return null
  }
}

async function githubDownloads() {
  try {
    const res = await fetch(GH_RELEASES)
    if (!res.ok) return null
    const releases = await res.json()
    if (!Array.isArray(releases)) return null
    let total = 0
    let found = false
    for (const rel of releases) {
      for (const asset of rel.assets || []) {
        if (!/\.(rsz|zip|exe)$/i.test(asset.name || '')) continue
        found = true
        total += Number(asset.download_count) || 0
      }
    }
    return found ? total : null
  } catch {
    return null
  }
}

function setStat(id, value) {
  const el = document.getElementById(id)
  if (!el || value === null) return
  el.textContent = formatCount(value)
}

function isReleaseDownload(href) {
  return typeof href === 'string' && /github\.com\/.+\/releases\/download\//.test(href)
}

function shownCount(id) {
  const n = Number(String(document.getElementById(id)?.textContent || '').replace(/,/g, ''))
  return Number.isFinite(n) ? n : null
}

function trackDownloadClicks(el) {
  if (!el) return
  el.addEventListener('click', async () => {
    if (!isReleaseDownload(el.getAttribute('href') || el.href)) return
    const current = shownCount('stat-downloads')
    if (current !== null) setStat('stat-downloads', current + 1)
    const n = await counter('downloads', true)
    if (n === null) return
    setStat('stat-downloads', Math.max(n, shownCount('stat-downloads') ?? n))
  })
}

function visitFlag() {
  try {
    return sessionStorage.getItem('rs-visit')
  } catch {
    return '1'
  }
}

function markVisit() {
  try {
    sessionStorage.setItem('rs-visit', '1')
  } catch {
    /* private mode */
  }
}

async function wireStats() {
  const seen = visitFlag()
  const visits = await counter('visits', !seen)
  if (!seen) markVisit()
  setStat('stat-visitors', visits)

  const gh = await githubDownloads()
  const clicks = await counter('downloads', false)
  if (gh === null && clicks === null) return
  setStat('stat-downloads', Math.max(gh ?? 0, clicks ?? 0))
}

async function wireDownload() {
  const meta = await loadDownloadMeta()
  if (!meta) return

  const href = meta.downloadUrl
  const label = `Download v${meta.version}`

  const hero = document.getElementById('hero-download')
  if (hero) {
    hero.href = href
    hero.textContent = 'Download for Windows'
  }

  const btn = document.getElementById('dl-button')
  const metaEl = document.getElementById('dl-meta')
  const shaEl = document.getElementById('dl-sha')
  if (btn) {
    btn.href = href
    btn.textContent = label
  }
  if (metaEl) {
    metaEl.textContent = `v${meta.version} · ${formatBytes(meta.sizeBytes)} · ${meta.offer}`
  }
  if (shaEl && meta.sha256) {
    shaEl.textContent = `SHA256 ${meta.sha256}`
  }

  trackDownloadClicks(hero)
  trackDownloadClicks(btn)
}

wireDownload()
wireStats()
