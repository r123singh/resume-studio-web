# Resume Studio (website)

Marketing site for **Resume Studio** — free Windows desktop app for tailoring resumes, apply kits, job hunt, recruiter mail, and WhatsApp. NVIDIA NIM is included.

## Pages

- `/` — landing
- `/download.html` — Windows download (URL comes from `download-meta.json`)
- `/docs.html` — quickstart
- `/pricing.html` — Free now, Pro later
- `/privacy.html` — privacy

## Local

Open `index.html` or:

```powershell
cd D:\MyProjects\resume-studio-web
npx --yes serve .
```

Live site: https://r123singh.github.io/resume-studio-web/

## Deploy

```powershell
cd D:\MyProjects\resume-studio-web
vercel --prod
```

Update `download-meta.json` and `public/download-meta.json` when you publish a new GitHub Release. Keep both copies identical. The download page reads `/download-meta.json`.
