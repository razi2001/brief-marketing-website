# Brief marketing site — redesign

## Goal

Replace the current AI-templated marketing site with something quieter, more characterful, and unmistakably hand-made. Same palette (cream + orange), same fonts (Instrument Serif + JetBrains Mono). Personality is what changes: lowercase headlines with a wobbly underline, drifting clouds backdrop, a tilted sticky note, a hand-drawn "it's free" arrow, a marquee strip, and a quiet end-of-page CTA in place of the dark final card.

Reference inspirations: upstream.do and passmark.com / passmarl.dev (calm, ample whitespace, light editorial illustration).

## Scope

Four static pages, no build step, inline CSS/JS (matches current setup):

- `index.html` — full redesign
- `pricing.html` — new page (Free / open source + Cloud coming soon)
- `privacy.html` — reskin (same copy, new chrome)
- `terms.html` — reskin (same copy, new chrome)
- `404.html` — reskin

Plus:

- Inline SVG favicon wired up on every page (currently only on 404)
- `<title>` shortened to `Brief` everywhere
- `<meta name="description">` shortened to a 2–3 word line (e.g. `Voice your bug.`)
- Robots.txt unchanged

Out of scope:

- README updates (will note Cloud Web Store URL change for completeness)
- Any JS framework or build tooling
- Dark mode

## Visual direction (locked from mockup v5)

Calm-with-sparks. Same palette, same fonts. The motion budget is small but deliberate: clouds drift, the device floats, the headline underline draws itself, the marquee scrolls, the install arrow draws itself.

### Palette (unchanged from current)

```
--cream:    #f5f1e8
--cream-2:  #ece6d6
--cream-3:  #e4ddca
--ink:      #1a1612
--ink-2:    #3a3530
--muted:    #8a8378
--acc:      #dd6936  (Brief orange)
--acc-2:    #c95c2c
--acc-soft: rgba(221,105,54,.10)
--success:  #168a5c
--hair:     rgba(26,22,18,.10)
--hair-2:   rgba(26,22,18,.07)
```

### Typography (unchanged from current)

- Display: `'Instrument Serif', Georgia, serif` (400, italic available)
- Mono: `'JetBrains Mono', ui-monospace, monospace` (400, 500)
- Body 14–15px; headlines `clamp(48px,6.8vw,80px)` set lowercase
- Brand orange `em` only used for emphasis; never set entire paragraphs in italic

### Signature elements (recur across all pages)

1. **Wobbly underline doodle** — a hand-drawn SVG underline that draws itself once per page load under the italicised orange word in the headline.
2. **Hand-drawn "it's free" arrow** — sits beneath the primary `Add to Chrome` button, pointing up at it. Draws itself in.
3. **Sticky note** — pale-yellow rotated note stuck on the device mockup.
4. **Marquee strip** — full-width serif text band that slow-scrolls phrases like `voice → ticket ✦ screenshot → ticket ✦ 22 seconds, not 5 minutes ✦ your agent, your repo ✦ open source ✦`. Placed once on the homepage between the hero and the next section.
5. **Drifting clouds backdrop** — six SVG clouds in `#fffdf6`, fixed/absolute behind the hero area, drifting laterally on long loops. No sun, no hills, no trees, no birds, no mascot.
6. **Sparkle motif (`✦`)** — the asterisk shape from the logo, used as separator in the marquee, on the sticky note, and as a footer decoration.

### Voice & copy rules

- **No em-dashes (`—`).** Replace with commas, periods, or rephrase.
- **No compound hyphens** in marketing copy. "local-first" → "local first". "dark-mode" → "dark mode". (Code identifiers and URLs are exempt.)
- Lowercase headlines. Sentence-case section titles.
- Drop AI-cadence padding. Eyebrow + h1 + lede + CTAs only in the hero; resist the eyebrow → h2 → subtitle → 3-card pattern in every section.
- No "we" marketing voice. Stay in second person.

## Page: `index.html`

Sections in order, top to bottom:

### 1. Nav (sticky, transparent over clouds)

- Left: 30px logo tile + `Brief` wordmark in Instrument Serif
- Right (in order): `How it works` · `Why Brief` · `Pricing` · `FAQ` · `GitHub` · `Add to Chrome` (ink-filled pill button)
- On viewport <620px, only the brand and `Add to Chrome` remain

### 2. Hero (matches mockup v5)

- Two-column grid (0.85fr / 1.15fr), device on left, copy on right
- Device on left = a tilted (-1.4°) recreation of the real extension popup: header with logo + `What's the brief?` + gear, `Name it…` input + `+` button, `BRIEFS` label, two queued briefs (one with green status dot and check-cap, one dim with camera-cap), `↓ Export 1` orange button
  - **Sticky note** (`3 in your folder ✦`) rotated +8°, pinned to top-right corner of device
  - **Listening pill** (small black rounded pill, orange record dot with pulsing white square, italic "listening") floats bottom-left of the device with a slow vertical bob
  - The device itself has a slow rotate-locked vertical floaty animation (7s loop)
- Copy column:
  - Eyebrow: `open source. local first. bring your own agent.`
  - Headline split across two lines: `what's the` / `*brief*?` — orange italic on `brief` with the wobbly underline drawing itself in
  - Lede: `Spot a bug. Hit the toolbar. Talk through it, snap it, or scribble. **Your own coding agent** reads the brief and files a real ticket, with your code as context.`
  - CTA row:
    - **Primary**: `Add to Chrome` — black ink-filled pill with a 3px orange offset shadow, lifts up on hover. Links to `https://chromewebstore.google.com/detail/brief/dbceddgckljkggbghaddpclblfbkmfig`. Below: hand-drawn arrow that draws itself in, with handwritten `it's free` label.
    - **Secondary**: `Star on GitHub` (ghost outline). Links to `https://github.com/razi2001/brief`. No star count.
  - Below the CTAs: small muted line `audio and screen stay on your machine`
  - **No "Works in Chrome, Edge, Brave & Arc" pill** (dropped per feedback)
- On <880px the grid collapses to one column, copy first, device second

### 3. Marquee strip

Full-width band immediately after the hero, with hairline borders top and bottom and a horizontal fade mask. Slow horizontal scroll (32s loop) of Instrument Serif phrases separated by orange `✦` sparkles. Content duplicates inside the track for seamless looping. Phrase list:

- `*voice* → ticket`
- `*screenshot* → ticket`
- `*scribble* → ticket`
- `22 seconds, not 5 minutes`
- `your agent, your repo`
- `no accounts`
- `open source`

### 4. How it works (3 steps) — `id="how"`

Same idea as current, tighter copy. Three cards in a `repeat(3,1fr)` grid, but each card is slightly tilted at a different angle (-1°, +1°, -0.5°). On hover the card straightens (transform rotate to 0°) and lifts 4px. On `prefers-reduced-motion: reduce` the cards render at 0° permanently and don't lift.

Cards:

1. **Capture it** — `Hit the toolbar. Talk through the bug while it's on screen, snap and annotate, or just type a line. Whatever's fastest.`
2. **It queues locally** — `Each brief saves to a folder on your machine. Stack a few through the day. No accounts. No upload.`
3. **Your agent files it** — `Hit Export. Paste the prompt into your coding agent. It reads each brief, files a clean ticket in your tracker, and cleans up after itself.`

Icons stay minimal stroke SVGs (mic, queue, check). Card number stays as oversized italic numeral in orange.

### 5. The ticket (merged before/after) — `id="why"` (preserves nav anchor)

Replaces the current side-by-side `Without Brief` / `With Brief` block. One single "good" ticket card centred at ~720px max-width, with an inset thumbnail showing the bad one to the right (smaller, dimmed, rotated ~3°, with a hand-drawn arrow pointing at it labelled `chatbot wrote this`). The good ticket has a hand-drawn arrow on its other side labelled `your agent`.

Single-line caption underneath: `Same bug. One was pasted from a chatbot. The other came from your agent, with your code as context.`

This replaces the entire BEFORE/AFTER section with one moment.

**Responsive behavior:** below 820px the bad-ticket inset moves below the good one (stacked), still rotated and dimmed, with the arrow doodles repositioned vertically.

### 6. Watch (demo video)

Keep, but lighter:

- 16:9 video shell with rounded corners
- Placeholder: orange circular play button, caption `Watch the demo`, subcaption `60 seconds. No sound needed.`
- Click swaps in iframe (same lazy-load logic as today, `VIDEO` constant at the bottom)

### 7. FAQ — `id="faq"`

Same accordion, but redesigned chrome:

- Hairline dividers only (no boxes)
- Questions in Instrument Serif 17px
- The `+` toggle stays orange, rotates 45° when open
- Trim from 7 to 5 questions (drop 2 of the most redundant ones; keep: what do I need, does it upload anywhere, why is the ticket better, how much does it cost, what about a cloud version)
- The "cloud version" answer now links to `/pricing.html`

### 8. Quiet final CTA (replaces dark card)

A single, calm line ~120px tall. No big block, no gradient, no dark background. Centered:

```
ready?
Add to Chrome →
```

`ready?` in Instrument Serif italic, muted. `Add to Chrome →` as the inline link with the wobbly underline doodle under it (re-using the same SVG underline). Hand-drawn arrow not required here; the underline does the job.

### 9. Footer

Same content as today: brandmark, link row (`How it works · Pricing · FAQ · Privacy · Terms · GitHub`), `Local-first. Open source. Built for people who'd rather talk than type. © {year} Brief`. Add a tiny `✦` between brandmark and tagline.

## Page: `pricing.html` (new)

Same nav, same clouds backdrop, same footer.

### Header

- Eyebrow: `pricing`
- Headline: `simple, *honest* pricing.` (orange italic on `honest`, same wobbly underline)
- Lede: `Bring your own agent and it's free forever. Want it managed for your team? A hosted version is on the way.`

### Two cards side-by-side

`grid-template-columns: 1fr 1fr; gap:22px`. Collapses to one column under 780px.

**Card 1 — Free (now)**

- Top-left: small orange tile icon (a download/cloud-down outline) in `--acc-soft`
- Top-right: orange `AVAILABLE NOW` pill
- Heading: `Self-hosted` (Instrument Serif 28px)
- Tagline: `Free and open source. Your agent, your machine, your code.`
- Price: `$0` (Instrument Serif 48px) followed by mono caption `forever`
- Bullet list (each with orange tick):
  - Fully local. Audio and screen never leave your machine.
  - Works with Claude Code, Cursor, Codex, Continue, or any agent with file + tracker access.
  - Files tickets in Linear, Jira, GitHub Issues, Notion, or any tracker your agent can reach.
  - Unlimited captures. Unlimited briefs.
  - MIT licensed. Fork it, audit it, run it.
- Primary CTA: `Add to Chrome` (same ink button + orange shadow) → Chrome Web Store URL
- Sub-CTA: `Star on GitHub` (ghost) → repo
- Footer note (small, muted): `You bring your own coding agent. There's no per-ticket cost from us.`

**Card 2 — Cloud (coming soon)**

- Visually quieter: dashed border on the cream-2 background, `cream-2` fill instead of card lift
- Top-left: small muted tile icon (a cloud outline)
- Top-right: muted `COMING SOON` pill (no orange)
- Heading: `Cloud` (Instrument Serif 28px, ink-2)
- Tagline: `For small, fast teams who want it managed. No local agent, no setup.`
- Price: italic serif placeholder `tbd` (with a tiny `we'll keep it fair` line)
- Bullet list (muted, with muted ticks):
  - No local AI required. We file the tickets for you.
  - Built for small agile teams. Shared inbox of briefs across the squad.
  - Same trackers (Linear, Jira, GitHub Issues, Notion).
  - SAML SSO, audit log, team-level templates.
  - Hosted in EU and US. Briefs encrypted at rest.
- Primary CTA: `Join the waitlist` (outline-only ink button, no orange shadow)
- Footer note: `Ship-when-it's-good. No firm date yet.`

### Below the cards

A short FAQ-style band of 3 questions specific to pricing:

- `Why is the self-hosted version free?` — `Because you bring the agent. We don't pay for inference, you don't pay us.`
- `How is Cloud different?` — `Same captures, but a hosted backend files the tickets so you don't need to wire up your own agent. Good if you'd rather not run one.`
- `Will Cloud replace the open-source version?` — `No. Self-hosted stays free and on GitHub forever.`

## Pages: `privacy.html`, `terms.html`

Same body copy as today. Reskin only:

- New nav, new footer, new favicon, new title (`Brief — Privacy` / `Brief — Terms`)
- Body in a max-width 720px reader column, Instrument Serif h1, JetBrains Mono body
- Cream background, no clouds (these are reading pages, not marketing)
- Section headings get a small orange `✦` after the number
- Existing placeholders (contact email, governing-law jurisdiction) stay as-is

## Page: `404.html`

Slightly more personality, same minimal footprint:

- Centered logo tile
- Headline: `nothing here.` (lowercase, Instrument Serif, with the wobbly underline under `here`)
- Sub: `This page doesn't exist. But your next ticket could.`
- Single ink button `← Back home` → `/`
- Single cloud drifts across the background (re-use cloud SVG)

## Animation budget

Keep the total motion small and ambient. The page should look right with `prefers-reduced-motion: reduce` set: all looping animations halt, the underline and arrow doodles render at their end state.

| Element | Animation | Duration |
|---|---|---|
| Clouds (×6) | Horizontal drift, alternating L/R | 60–130s loops |
| Device | Rotate-locked Y bob | 7s loop |
| Listening pill | Y bob | 5s loop |
| Listening rec dot | Opacity beat | 1s loop |
| Headline underline | Stroke draw (once) | 1.2s, .5s delay |
| "It's free" arrow | Stroke draw (once) | 1.2s, .9s delay |
| Marquee | Horizontal scroll | 32s loop |
| How-it-works cards | Lift on hover | 180ms |
| Buttons | Translate + shadow on hover | 150ms |
| FAQ `+` | 45° rotate on open | 200ms |

## Accessibility

- All decorative SVG: `aria-hidden="true"`
- Marquee text duplicated in DOM for the seamless loop, but the entire marquee is `aria-hidden="true"` so screen readers don't get a stream of duplicated phrases
- All looping animations wrapped in `@media (prefers-reduced-motion: no-preference)` blocks
- Cards in How / Pricing are not links themselves; only the CTA buttons inside them are
- Color contrast: copy uses `--ink-2` or `--ink` over cream — checked at WCAG AA; muted captions (`--muted`) stay at small sizes (~12px) where they're decorative, never load-bearing

## Technical notes

- **No build step.** Inline CSS in `<style>`, inline JS in `<script>` at the bottom of each page, identical to today's structure.
- **External resources:** still only Google Fonts (Instrument Serif + JetBrains Mono). No JS libs, no analytics, no fingerprinting.
- **Favicon:** inline SVG data-URI added to every page's `<head>` via `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;utf8,…">`. Same Brief logo as the brandmark.
- **Chrome Web Store URL:** the production URL `https://chromewebstore.google.com/detail/brief/dbceddgckljkggbghaddpclblfbkmfig` is hardcoded as the `href` of every `Add to Chrome` button on every page. The pre-launch `STORE_URL` constant in `<script>` is removed.
- **Demo video URL:** the `VIDEO` constant stays for the user to fill in.
- **Year:** `document.getElementById('yr').textContent = new Date().getFullYear()` stays where used.
- **Fly.io / Caddy / Dockerfile:** untouched. Static file serving doesn't change.

## File-by-file change summary

| File | Change |
|---|---|
| `index.html` | Full redesign per sections 1–9 above |
| `pricing.html` | New file |
| `privacy.html` | Reskin chrome only (nav, footer, favicon, title, fonts) |
| `terms.html` | Reskin chrome only |
| `404.html` | Reskin + drifting cloud + wobbly underline |
| `robots.txt` | Add `Allow: /pricing.html` line if needed (currently it's a small allow-all, likely no change required) |
| `README.md` | Update file-tree to include `pricing.html`; remove the "fill `STORE_URL`" instruction since it's now hard-coded |

## Non-goals (deliberately not doing)

- A blog or changelog
- Dark mode
- Email capture / newsletter
- Social proof / logo wall (none exists yet)
- Customer testimonials
- A "compare us to X" table
- Mobile-specific media (the existing media queries are sufficient)
- Sticky CTA / floating "Add to Chrome" bar
- Cookie banner (no analytics, no need)

## Acceptance criteria

- All four existing pages render with the new chrome (nav, footer, favicon, fonts)
- `pricing.html` exists and renders cleanly at desktop and mobile widths
- The homepage drops from ~609 lines to a similar order of magnitude (no significant bloat) — single inline `<style>` and `<script>`, no external CSS files
- Every `Add to Chrome` link on every page points to the real Chrome Web Store listing
- No em-dashes (`—`) anywhere in user-facing copy
- No "local-first" / "dark-mode" style hyphenated compounds in user-facing copy
- Favicon appears in every page's tab
- The marquee, headline underline, install arrow, and clouds all render and animate on a fresh load
- `prefers-reduced-motion: reduce` disables the cloud drift, device bob, listening pill bob, and marquee scroll; underline and arrow render at their end state instantly
- Page passes manual keyboard-only navigation: all links and the FAQ accordion reachable and operable with Tab/Enter
- Privacy and Terms still satisfy the Chrome Web Store submission requirements (URL paths unchanged, content unchanged)
