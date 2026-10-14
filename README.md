# Brief Cloud: marketing site

The one-page marketing site for **Brief Cloud**, the Chrome extension that turns a
screen recording, a screenshot, or the last minute on a page into a clear ticket,
written and filed for you in Linear, Jira, GitHub, GitLab, Azure DevOps, ClickUp,
Notion, Trello, Asana or Monday.

- Chrome Web Store: https://chromewebstore.google.com/detail/brief-cloud/heekinkibhgbilagcdnmcjajijaalpcc
- Web app (sign in, connect a tracker): https://cloud.get-brief.app
- Privacy policy: https://cloud.get-brief.app/privacy

## What's here

A static site. No build step, no framework. Each page is one HTML file with inline
CSS and JS. The only external requests are Google Fonts (Instrument Serif, Inter,
JetBrains Mono) and, on click, the YouTube player.

```
.
├── index.html         ← the landing page (see below)
├── pricing.html       ← redirects to /#pricing, so old links keep working
├── demo-sandbox.html  ← a page that's broken on purpose, to try Brief Cloud on (/demo-sandbox)
├── 404.html           ← fallback page
├── og.png             ← 1200×630 social share card
├── privacy.html       ← legacy policy for the old local "Brief" extension (not linked)
├── terms.html         ← legacy terms for the old local "Brief" extension (not linked)
├── Caddyfile, Dockerfile, fly.toml  ← hosting (Fly.io, Caddy serving clean URLs)
├── robots.txt
├── LICENSE
└── README.md
```

### The landing page, top to bottom

1. **Hero**: the pitch and Add to Chrome on the left, a **live demo** on the right
   (stacked on smaller screens). It opens on a start screen ("Try it live",
   Start the interactive demo) over a blurred checkout; nothing moves until the
   visitor clicks. The demo is a fake checkout with two planted bugs,
   each with its own card on the left, played in order with a short intro card:
   Bug 1, the CVC field hangs off the card (take a screenshot and circle it), then
   Bug 2, Pay fails with a 500 (click it, then report it with Replay, which already
   kept the last minute). Visitors use the real-looking Brief Cloud popup, and the
   ticket writes itself in Linear, Jira or GitHub, matching the bug they captured.
   Hints point at the next click; each card ticks to "Reported". After Bug 1, the
   bar under the ticket says it's in Linear and moves on to Bug 2 by itself after
   3.5 seconds (Let's go skips the wait). "Create free account" sits in the demo's tab bar and
   leads the bar once both bugs are reported.
2. Tracker logos, Claude vs Brief Cloud (the same bug as two tickets),
   features, the demo video, pricing and setup in one section (free while in early
   access), FAQ, final CTA. Each section has its own warm tint.

The demo is plain JS at the bottom of `index.html` (`initDemo`): one small state
machine, with the ticket copy for each bug in `BUGS`.

## Run it locally

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Fly.io, with Caddy serving the folder (`/privacy.html` → `/privacy`, clean URLs,
custom 404):

```bash
fly deploy
```

## Things to keep in sync

- **The main CTA is account sign-up**: `https://cloud.get-brief.app/sign-up`
  (nav, hero, the demo's tab bar, the bar under a finished ticket, setup step 1,
  final section). New accounts land on the app's onboarding.
- **Store link** (`heekinkibhgbilagcdnmcjajijaalpcc`) is only in setup step 2 and
  the footer.
- **Demo video**: `dmD8thJvMww` in the `#watch` section (`data-video` and `--thumb`).
- **Tracker list** (10 trackers): the logo row (`lg-*` symbols, the same marks the
  web app's `TrackerLogo.tsx` uses) and the setup step "Connect your tracker".
- **Copy rules**: short, plain words, no em or en dashes.

## License

MIT, see [LICENSE](LICENSE).
