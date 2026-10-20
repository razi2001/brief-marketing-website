/* Cookieless counts for get-brief.app: page views, the main buttons, and how
   far visitors get in the live demo. They go to Brief's own server
   (cloud.get-brief.app/api/t). Nothing is stored in the browser: `pv` lives in
   memory for one page load, so one visit's demo steps group together. */
(function () {
  var END = /^(localhost|127\.0\.0\.1)$/.test(location.hostname)
    ? 'http://localhost:3000/api/t'
    : 'https://cloud.get-brief.app/api/t';
  var UTM = ['utm_source', 'utm_medium', 'utm_campaign'];
  var pv = Math.random().toString(36).slice(2, 10);
  var q = new URLSearchParams(location.search);
  var ref = '';
  try { ref = document.referrer ? new URL(document.referrer).hostname : ''; } catch (e) {}
  if (ref === location.hostname) ref = '';

  function send(name, props) {
    props.pv = pv;
    var body = JSON.stringify({ name: name, props: props });
    try { if (navigator.sendBeacon && navigator.sendBeacon(END, body)) return; } catch (e) {}
    try { fetch(END, { method: 'POST', body: body, keepalive: true, mode: 'no-cors' }); } catch (e) {}
  }

  /* Which part of the page a button sits in: its section's id or class. */
  function where(el) {
    var s = el.closest('[id], nav, header, section, footer');
    return !s ? 'page' : s.id || s.classList[0] || s.tagName.toLowerCase();
  }

  var view = { path: location.pathname, ref: ref };
  UTM.forEach(function (k) { if (q.get(k)) view[k] = q.get(k); });
  send('site.view', view);

  /* Sign-up links say which button was clicked and where the visitor came
     from, so the new account's timeline starts there. */
  function tagSignups() {
    document.querySelectorAll('a[href^="https://cloud.get-brief.app/sign-up"]').forEach(function (a) {
      var u = new URL(a.href);
      u.searchParams.set('src', where(a));
      UTM.forEach(function (k) { if (q.get(k)) u.searchParams.set(k, q.get(k)); });
      if (ref) u.searchParams.set('ref', ref);
      a.href = u.toString();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tagSignups);
  else tagSignups();

  var demoSeen = {};
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target : null;
    if (!t) return;
    /* the live demo: each button once per page load */
    var act = t.closest('#try [data-act]');
    if (act) {
      var name = act.getAttribute('data-act');
      if (!demoSeen[name]) { demoSeen[name] = 1; send('site.demo', { act: name }); }
      if (!act.matches('a')) return;
    }
    var a = t.closest('a, button[data-video]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var target =
      /cloud\.get-brief\.app\/sign-up/.test(href) ? 'signup' :
      /chromewebstore\.google\.com/.test(href) ? 'chrome' :
      a.hasAttribute('data-video') ? 'video' :
      a.hasAttribute('data-try') ? 'demo' :
      /demo-sandbox/.test(href) ? 'sandbox' : '';
    if (target) send('site.click', { target: target, where: where(a) });
  }, true);
})();
