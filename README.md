# Brief — marketing site

The one-page marketing site for **Brief**, the Chrome extension that turns a
30-second voice note, screenshot, or scribble into a clean tracker ticket —
filed by your own coding agent.

→ Extension repo: https://github.com/razi2001/brief

## What's here

A single, self-contained static page. No build step, no dependencies, no
framework — just `index.html` with inline CSS/JS. The only external request is
to Google Fonts (Instrument Serif + JetBrains Mono).

```
.
├── index.html      ← landing page
├── pricing.html    ← Self-hosted (free) and Cloud (coming soon)
├── privacy.html    ← Privacy Policy (required by the Chrome Web Store)
├── terms.html      ← Terms of Service
├── 404.html        ← fallback page
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

## Before you launch — one thing to fill in

Near the bottom of `index.html` in the `<script>` block:

- **`VIDEO`** — your demo embed (YouTube or Loom). Until set, the video tile
  shows "Demo video coming soon".

The **Cloud waitlist** on `pricing.html` posts to Formspree form `mqeoqvey`
(`https://formspree.io/f/mqeoqvey`) — submissions land in the Formspree
dashboard. To send the list elsewhere, change the `<form action>` on the Cloud
card; the inline submit handler in the page's `<script>` block reads that same
URL, so no other edit is needed.

The Chrome Web Store URL is hard-coded across all "Add to Chrome" buttons
(home, pricing, nav, final CTA) and points at the live listing:
`https://chromewebstore.google.com/detail/brief/dbceddgckljkggbghaddpclblfbkmfig`.

You may also want to swap the GitHub links if your extension repo URL changes.

Once deployed, your Privacy Policy lives at `https://<your-domain>/privacy.html` — that's
the URL the Chrome Web Store asks for when you submit the extension. Terms are at
`/terms.html`. Both have a couple of placeholders to fill before publishing (a contact
email, and the governing-law jurisdiction in Terms §8).

Once deployed, your Privacy Policy will live at `https://<your-domain>/privacy.html` —
that's the URL the Chrome Web Store asks for when you submit the extension. The Terms
page is at `/terms.html`. Both have a couple of placeholders to fill before publishing
(a contact email, and the governing-law jurisdiction in Terms §8).

## License

MIT — see [LICENSE](LICENSE).
