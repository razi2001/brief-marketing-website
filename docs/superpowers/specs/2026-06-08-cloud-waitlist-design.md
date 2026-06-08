# Cloud waitlist — design

**Date:** 2026-06-08
**Status:** Approved (pending spec review)

## Problem

The Cloud plan on `pricing.html` is marked "Coming soon." Its only call to
action is a `mailto:` link that opens the visitor's email client — nothing is
actually captured, and conversion depends on the visitor composing and sending
an email, then us reading the inbox. We want a real waitlist that captures
email addresses into a system we can export and notify at launch.

## Constraints

- The site is fully static: one self-contained `index.html` / `pricing.html`,
  inline CSS + JS, no build step, no framework, no backend. Served by Caddy on
  Fly.io. The waitlist must not break that — no backend, no dependencies.
- Must match the existing visual language (Instrument Serif + JetBrains Mono,
  the cream/ink/acc token palette, the `.btn` system).

## Decisions

- **Data destination:** native HTML `<form>` POSTing to a third-party form
  service (keeps the site static). Chosen over a backend, newsletter tool, or
  embedded iframe widget.
- **Service:** Formspree. Live endpoint: `https://formspree.io/f/mqeoqvey`.
- **Placement:** only the Cloud card in `pricing.html`. The Cloud product is
  not referenced on `index.html`, so nothing there changes.
- **UX:** always-visible inline email field + submit on the card (no
  click-to-reveal, no modal). Submits via `fetch` (AJAX) so the page never
  leaves; the form swaps to an inline success message on success.
- **Fields:** email only (low friction), plus a hidden `_subject` and a
  honeypot. No name/company.

## Scope

- **In:** Replace the `mailto:` CTA on the Cloud card with the waitlist form;
  add styling for the input and status message; add the AJAX submit handler;
  document the change in the README.
- **Out:** Any change to `index.html`, `index.html`'s clouds (decorative,
  unrelated), automated tests (the site has no test harness), double opt-in /
  confirmation emails (Formspree's notification + dashboard is enough for v1).

## Implementation detail

### Markup (replaces the current `.cta-row` link, pricing.html ~252–256)

```html
<form class="waitlist" action="https://formspree.io/f/mqeoqvey" method="POST">
  <input type="email" name="email" required autocomplete="email"
         placeholder="you@team.com" aria-label="Email address">
  <input type="hidden" name="_subject" value="Brief Cloud waitlist">
  <!-- honeypot: bots fill this, humans never see it -->
  <input type="text" name="_gotcha" tabindex="-1" autocomplete="off"
         aria-hidden="true" class="hp">
  <button type="submit" class="btn btn-primary">Join the waitlist</button>
</form>
<p class="waitlist-msg" role="status" aria-live="polite"></p>
```

The `_gotcha` field is Formspree's built-in honeypot convention. `<form>` keeps
`action`/`method` so it degrades to a normal POST→Formspree redirect if JS is
disabled.

### Styling (reuses existing tokens)

- `.waitlist` — reuses the `.cta-row` flex pattern (`display:flex; gap:10px;
  flex-wrap:wrap`) so input + button sit on one line and wrap on narrow widths.
- Email input — transparent background, `1px solid var(--hair)`,
  `border-radius:11px`, `font-family:var(--mono)`, `font-size:14px`, padding to
  match `.btn`. Relies on the existing global `:focus-visible` rule for the
  accent focus ring. `flex:1` with a sensible `min-width` so it grows but wraps
  gracefully.
- Submit — `.btn .btn-primary` (ink background, cream text, accent drop-shadow).
  This promotes the CTA from the current `.btn-quiet`, since the form is now the
  card's primary action.
- `.hp` honeypot — `position:absolute; left:-9999px` (visually removed, still in
  the tab order escape via `tabindex="-1"`).
- `.waitlist-msg` — small (`font-size:13px`), `margin-top:10px`; success uses
  `var(--ink)`, error uses `var(--acc)`. Empty by default.

### Submit handler (added to the existing bottom `<script>` block)

```js
const wl = document.querySelector('.waitlist');
if (wl) {
  const msg = document.querySelector('.waitlist-msg');
  const btn = wl.querySelector('button');
  wl.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.disabled = true;
    const label = btn.textContent;
    btn.textContent = 'Joining…';
    msg.style.color = '';
    msg.textContent = '';
    try {
      const res = await fetch(wl.action, {
        method: 'POST',
        body: new FormData(wl),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        wl.style.display = 'none';
        msg.textContent = "You're on the list. ✓ We'll email you when Cloud opens.";
      } else {
        throw new Error('bad response');
      }
    } catch {
      btn.disabled = false;
      btn.textContent = label;
      msg.style.color = 'var(--acc)';
      msg.textContent = 'Something went wrong — try again, or email razi.fezzani@get-brief.app.';
    }
  });
}
```

### README

Add one line to the "Before you launch" section noting the Cloud waitlist posts
to Formspree form `mqeoqvey`, and that swapping the waitlist destination means
changing the form `action` in `pricing.html`.

## Error handling

- Invalid/empty email → blocked client-side by `type=email` + `required`
  (native browser validation) before any request.
- Network failure or non-2xx from Formspree → inline error message, button
  re-enabled with original label, email preserved so the visitor can retry. The
  error names our existing contact email as a fallback path.
- JS disabled → native form POST to Formspree, which shows its own thank-you
  page (graceful degradation).

## Testing

Manual, in a browser (no test harness on this static site):

1. Valid email → submit → form hides, success message shows.
2. Invalid email → native validation blocks submit.
3. Forced failure (temporarily point `action` at a bad URL) → error message
   shows, button re-enabled, email retained.
4. Keyboard: tab to input → button, focus ring visible; honeypot is skipped.
5. Confirm the submission lands in the Formspree dashboard.
