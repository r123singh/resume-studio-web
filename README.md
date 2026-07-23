# Resume Studio (website)

Marketing site for **Resume Studio** — free Windows AI resume editor (bring your own API key).

## Pages

- `/` — landing
- `/download.html` — Windows download
- `/docs.html` — quickstart
- `/pricing.html` — Free + Pro coming soon
- `/privacy.html` — privacy

## Local

Open `index.html` or:

```powershell
cd D:\MyProjects\resume-studio-web
npx --yes serve .
```

## Deploy

```powershell
cd D:\MyProjects\resume-studio-web
vercel --prod
```

Update `public/download-meta.json` when you publish a new GitHub Release.
