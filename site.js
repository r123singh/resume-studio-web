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
}

wireDownload()
