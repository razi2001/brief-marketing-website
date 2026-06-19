# Present both extensions — Brief Local + Brief Cloud

**Date:** 2026-06-19
**Status:** approved, implementing

## Why

Brief Cloud is now its own **published Chrome extension**
(`https://chromewebstore.google.com/detail/brief-cloud/heekinkibhgbilagcdnmcjajijaalpcc`),
installable directly from the Web Store. The marketing site still treats Cloud as a
hosted-web-app-only product with a "Try Brief Cloud" link and a Formspree **waitlist**
on the pricing page. That framing is outdated: Cloud is live and installable, exactly
like Brief Local.

This refactor presents **two installable Chrome extensions** side by side, each with its
own install path, and retires the waitlist.

## Decisions (confirmed with user)

- **Cloud CTA pattern:** two equal buttons — `Add to Chrome` (filled, cloud blue → Cloud
  store) + `Open web app` (outline, cloud-tinted → `cloud.get-brief.app`).
- **Pricing waitlist:** removed; replaced by the install button.
- **Cloud framing:** keep "New · early access · free for now" (still free while polishing).

## Canonical URLs

| Purpose | URL |
|---|---|
| Brief Local install | `https://chromewebstore.google.com/detail/brief/dbceddgckljkggbghaddpclblfbkmfig` |
| Brief Cloud install (new) | `https://chromewebstore.google.com/detail/brief-cloud/heekinkibhgbilagcdnmcjajijaalpcc` |
| Cloud web app (connect tracker / sign in) | `https://cloud.get-brief.app` |

The Cloud store URL is stored stripped of the `?hl=fr&utm_source=ext_sidebar` params.

## Changes

### `index.html`
1. Hero eyebrow → "two chrome extensions, one ✦".
2. Hero CTA row → two install buttons: `Add Brief Local` (dark, target icon) +
   `Add Brief Cloud` (blue, cloud icon → Cloud store). Helper line reworded, links to
   `#solutions` and notes Cloud also runs as a web app.
3. `#solutions` Cloud card → replace single "Try Brief Cloud" with the two-button pattern;
   first feature bullet reworded to install → sign in → pair.
4. Quiet-CTA sub-line → "add Brief Cloud" points at the Cloud store.
5. Footer "Brief Cloud" link → Cloud store.
6. CSS: add `.btn-cloud-ghost` outline variant.

### `pricing.html`
1. Cloud card → remove the Formspree `<form class="waitlist">`, honeypot, and
   `.waitlist-msg`; replace with the two-button pattern. Card footer reworded (no email
   capture). First feature bullet reworded like index.
2. Remove the waitlist `<script>` handler (keep the year script).
3. Remove now-dead `.waitlist*` CSS; add `.btn-cloud-ghost`.
4. FAQ "How is Brief Cloud different?" → corrected: Cloud is **its own extension** (the old
   answer said "same extension", which is no longer true).
5. Footer "Brief Cloud" link → Cloud store.

### `README.md`
- Intro + "before you launch" sections updated: Brief Cloud is a separately-listed
  extension; document both store URLs; drop the removed waitlist-form instructions.
- Dedupe the duplicated privacy-policy paragraph (pre-existing).

## Out of scope (left as-is)
`privacy.html` (its Brief Cloud data-flow section is accurate), `terms.html`, `404.html`,
`cards/`, `proto/`. Marketing copy keeps its em-dash style (the no-dash rule applies only
to the Web Store listing copy itself).
