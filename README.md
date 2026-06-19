# Brief — marketing site

The one-page marketing site for **Brief**, the Chrome extension that turns a
30-second voice note, screenshot, or scribble into a clean tracker ticket.
The site presents both solutions, each its own Chrome extension:

- **Brief Local** — free, open source; your own coding agent files the ticket,
  100% on your machine.
- **Brief Cloud** — its own Web Store listing; install it, connect Linear (Jira
  next), pair, and a hosted agent writes and files the ticket. Web app for sign-in
  and tracker setup at https://cloud.get-brief.app. Early access, free while we polish.

→ Brief Local repo: https://github.com/razi2001/brief

## What's here

A single, self-contained static page. No build step, no dependencies, no
framework — just `index.html` with inline CSS/JS. The only external request is
to Google Fonts (Instrument Serif + JetBrains Mono).

```
.
├── index.html         ← landing page (pain → how it works → Local vs Cloud → ticket comparison → demo)
├── pricing.html       ← Brief Local (free forever) and Brief Cloud (early access)
├── demo-sandbox.html  ← deliberately buggy demo page for trying Brief (served at /demo-sandbox)
├── privacy.html       ← Privacy Policy (required by the Chrome Web Store)
├── terms.html         ← Terms of Service
├── 404.html           ← fallback page
├── og.png             ← 1200×630 social share card (Open Graph / Twitter)
├── robots.txt
├── LICENSE
└── README.md
```

## Run it locally

It's static, so anything that serves a folder works:

```bash
# Python
python3 -m http.server 8000
# then open http://localhost:8000

# or just open the file directly
open index.html
```

## Deploy

### GitHub Pages
1. Push this folder to a repo.
2. Settings → Pages → Source: **Deploy from a branch** → `main` / root.
3. (Optional) add a custom domain: drop a `CNAME` file containing your domain
   (e.g. `brief.sh`) in the root, and point your DNS at GitHub Pages.

### Netlify / Vercel / Cloudflare Pages
No build command. Output/publish directory: the repo root. Drag-and-drop the
folder or connect the repo — it just serves `index.html`.

## Before you launch

- **Demo video** — `index.html`'s `<script>` sets `VIDEO` to the YouTube embed
  (`tl35INNubcI`). Swap it for your own embed (YouTube or Loom); clear it and the
  video tile falls back to "Demo video coming soon".

### Links baked into the pages

Two Chrome Web Store listings are hard-coded across both pages:

- **Brief Local** — `https://chromewebstore.google.com/detail/brief/dbceddgckljkggbghaddpclblfbkmfig`
  (hero, `#solutions` card, nav, final CTA, pricing card).
- **Brief Cloud** — `https://chromewebstore.google.com/detail/brief-cloud/heekinkibhgbilagcdnmcjajijaalpcc`
  (hero, `#solutions` card, quiet CTA, footers, pricing card).

Each Brief Cloud card pairs its **Add to Chrome** button with an **Open web app**
button pointing at `https://cloud.get-brief.app` — where you sign in and connect a
tracker. Swap the GitHub links if the repo URL changes.

Once deployed, your Privacy Policy lives at `https://<your-domain>/privacy.html` — that's
the URL the Chrome Web Store asks for when you submit an extension. Terms are at
`/terms.html`. Both have a couple of placeholders to fill before publishing (a contact
email, and the governing-law jurisdiction in Terms §8).

## License

MIT — see [LICENSE](LICENSE).
