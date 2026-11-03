(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  $$('.yr').forEach((el) => { el.textContent = new Date().getFullYear(); });
  const RU = (root.lang || '').startsWith('ru');
  const T = RU ? {
    path: 'Обычный путь дела', pathAria: 'Обычный путь: ', then: ', затем ',
    sending: 'Отправка...', thanks: (n) => `Спасибо, ${n}.`,
    received: 'Заявка получена', receivedBody: 'Мы перезвоним в течение одного рабочего дня. Если вопрос срочный, позвоните в офис.',
    preview: 'Предпросмотр', previewBody: 'Эта версия сайта пока не отправляет сообщения. Позвоните в офис по номеру (609) 608-8808 или напишите на office@nurtayevlaw.com.',
    showing: (n, t) => n === t ? `Все ${t} услуг` : `Найдено: ${n} из ${t}`, more: (n) => `Показать все ${n}`, less: 'Свернуть',
    toDark: 'Включить тёмную тему', toLight: 'Включить светлую тему'
  } : {
    path: 'Typical path', pathAria: 'Typical path: ', then: ', then ',
    sending: 'Sending...', thanks: (n) => `Thank you, ${n}.`,
    received: 'Request received', receivedBody: 'We will call you back within one business day. If your matter is urgent, please call the office.',
    preview: 'Preview', previewBody: 'This preview of the site cannot send messages yet. Please call the office at (609) 608-8808 or email office@nurtayevlaw.com.',
    showing: (n, t) => n === t ? `All ${t} services` : `Showing ${n} of ${t} services`, more: (n) => `Show all ${n}`, less: 'Show less',
    toDark: 'Switch to dark mode', toLight: 'Switch to light mode'
  };

  /* Light / dark mode */
  const isDark = () => root.dataset.theme === 'dark';
  const labelTheme = () => $$('.theme-btn').forEach((b) => { b.setAttribute('aria-label', isDark() ? T.toLight : T.toDark); b.setAttribute('aria-pressed', isDark()); });
  labelTheme();
  $$('.theme-btn').forEach((b) => b.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    if (!reduce) { root.classList.add('theme-anim'); setTimeout(() => root.classList.remove('theme-anim'), 480); }
    root.dataset.theme = next;
    try { localStorage.setItem('nl-theme', next); } catch (e) {}
    labelTheme();
    dispatchEvent(new Event('themechange'));
  }));

  /* Bottom sheet menu (phones) */
  const sheet = $('#sheet'), menuTab = $('.tab-menu');
  const openSheet = () => { sheet.hidden = false; sheet.classList.remove('closing'); menuTab?.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; sheet.querySelector('.sheet-links a')?.focus({ preventScroll: true }); };
  const closeSheet = () => {
    if (sheet.hidden) return;
    menuTab?.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
    if (reduce) { sheet.hidden = true; return; }
    sheet.classList.add('closing'); setTimeout(() => { sheet.hidden = true; sheet.classList.remove('closing'); }, 250);
  };
  if (sheet) {
    menuTab?.addEventListener('click', openSheet);
    sheet.addEventListener('click', (e) => { if (e.target.closest('[data-close]') || e.target.closest('.sheet-links a, .sheet-cta')) closeSheet(); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheet(); });
  }

  /* Photos: keep the designed fallback until a real file loads */
  $$('img[data-photo]').forEach((img) => {
    const ok = () => img.closest('.photo')?.classList.add('has-img');
    const bad = () => { img.style.display = 'none'; };
    if (img.complete) { img.naturalWidth ? ok() : bad(); }
    img.addEventListener('load', ok); img.addEventListener('error', bad);
  });

  /* Headline word stagger */
  const h1 = $('[data-split]');
  if (h1 && !reduce) {
    let i = 0;
    const walk = (node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const s = document.createElement('span');
          s.className = 'word'; s.textContent = part; s.style.animationDelay = (180 + i++ * 60) + 'ms';
          frag.appendChild(s);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
    walk(h1);
  }
  if (!reduce) root.classList.add('anim', 'motion');

  /* Mobile menu */
  const menuBtn = $('.menu-btn');
  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuBtn?.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  $$('.mobile-menu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  /* Scroll reveals with a safety net */
  const rv = $$('.rv');
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    rv.forEach((el) => io.observe(el));
    setTimeout(() => rv.forEach((el) => el.classList.add('in')), 4500);
  } else rv.forEach((el) => el.classList.add('in'));

  /* Statement words */
  const st = $('#statement');
  let words = [];
  if (st) {
    const accent = new Set(RU ? ['людях.', 'семью,', 'карьеру', 'домом.'] : ['people.', 'family', 'career,', 'home.']);
    st.innerHTML = st.textContent.trim().split(/\s+/).map((w) => `<span class="w${accent.has(w) ? ' accent' : ''}">${w}</span>`).join(' ');
    words = st.querySelectorAll('.w');
  }

  /* Process rail */
  const rail = $('#rail');
  if (rail) rail.insertAdjacentHTML('afterbegin', '<span class="rail-fill" id="rail-fill" aria-hidden="true"></span><span class="rail-dot" id="rail-dot" aria-hidden="true"></span>');

  /* Scroll-linked scenes (each only when present on the page) */
  const header = $('.site-header'), bar = $('#actionbar'), contact = $('#contact');
  const heroImg = $('#hero-photo img');
  const city = $('#city'), cityImg = $('#city-frame img');
  const cta = $('#cta-card'), ctaImg = $('#cta-card img');
  const track = $('#proc-track');
  const railItems = rail ? [...rail.querySelectorAll('li')] : [];
  const cards = $$('#proc-cards .proc-card');
  const railFill = $('#rail-fill'), railDot = $('#rail-dot');
  const pinned = () => matchMedia('(min-width: 881px)').matches && !reduce;
  let step = -1;

  const frame = () => {
    const y = scrollY, vh = innerHeight;
    header.classList.toggle('scrolled', y > 8);
    if (bar) {
      const cr = contact?.getBoundingClientRect();
      bar.classList.toggle('show', y > 420 && !(cr && cr.top < vh && cr.bottom > 0));
    }
    if (st) {
      if (reduce) words.forEach((w) => w.classList.add('lit'));
      else {
        const r = st.getBoundingClientRect();
        const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35));
        const n = Math.round(p * words.length);
        words.forEach((w, i) => w.classList.toggle('lit', i < n));
      }
    }
    if (reduce) return;

    if (heroImg && y < vh * 1.3) heroImg.style.transform = `translateY(${(y * 0.08).toFixed(1)}px) scale(1.06)`;

    if (city) {
      const c = city.getBoundingClientRect();
      if (c.bottom > 0 && c.top < vh) {
        const p = clamp((vh - c.top) / (vh + c.height));
        cityImg.style.transform = `translateY(${((p - 0.5) * -8).toFixed(2)}%) scale(${(1.16 - p * 0.12).toFixed(4)})`;
      }
    }

    if (cta) {
      const k = cta.getBoundingClientRect();
      if (k.bottom > 0 && k.top < vh) ctaImg.style.setProperty('--py', ((k.top + k.height / 2 - vh / 2) * -0.08).toFixed(1) + 'px');
    }

    if (track) {
      if (pinned()) {
        const r = track.getBoundingClientRect();
        const p = clamp(-r.top / (r.height - vh));
        railFill.style.transform = `scaleY(${p.toFixed(4)})`;
        railDot.style.transform = `translateY(${(p * railFill.offsetHeight).toFixed(1)}px)`;
        const s = Math.min(cards.length - 1, Math.floor(p * cards.length * 0.999));
        if (s !== step) {
          step = s;
          cards.forEach((el, i) => el.classList.toggle('on', i === s));
          railItems.forEach((el, i) => el.classList.toggle('on', i <= s));
        }
      } else if (step !== 'flat') { cards.forEach((el) => el.classList.add('on')); step = 'flat'; }
    }
  };
  let ticking = false;
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { frame(); ticking = false; }); } }, { passive: true });
  addEventListener('resize', () => { step = -1; frame(); });
  frame();

  /* Case paths */
  const NS = 'http://www.w3.org/2000/svg';
  const buildPath = (el) => {
    const steps = el.dataset.steps.split(';').map((s) => s.split('|'));
    const vertical = el.clientWidth < 460;
    const last = steps.length - 1;
    let W, H, xs, ys, d;
    if (vertical) {
      W = 300; H = 64 * last + 36;
      xs = steps.map((_, i) => 16 + (i % 2 ? 10 : 0));
      ys = steps.map((_, i) => 18 + i * 64);
      d = `M ${xs[0]} ${ys[0]}`;
      for (let i = 1; i < xs.length; i++) { const my = (ys[i - 1] + ys[i]) / 2; d += ` C ${xs[i - 1]} ${my}, ${xs[i]} ${my}, ${xs[i]} ${ys[i]}`; }
    } else {
      W = 600; H = 92;
      xs = steps.map((_, i) => 30 + (W - 60) * (i / last));
      ys = steps.map((_, i) => 22 + (i % 2 ? 8 : -4));
      d = `M ${xs[0]} ${ys[0]}`;
      for (let i = 1; i < xs.length; i++) { const mx = (xs[i - 1] + xs[i]) / 2; d += ` C ${mx} ${ys[i - 1]}, ${mx} ${ys[i]}, ${xs[i]} ${ys[i]}`; }
    }
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    if (vertical) svg.style.maxWidth = '300px';
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', T.pathAria + steps.map((s) => s[0]).join(T.then));
    const mk = (tag, attrs) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); svg.appendChild(n); return n; };
    mk('path', { d, class: 'track' });
    const run = mk('path', { d, class: 'run' });
    steps.forEach(([label, sub], i) => {
      const node = mk('circle', { cx: xs[i], cy: ys[i], r: i === last ? 7 : 6, class: 'node' + (i === last ? ' end' : '') });
      node.style.animationDelay = (200 + i * 380) + 'ms';
      if (vertical) {
        mk('text', { x: 52, y: ys[i] - 1, class: 'lbl', 'font-size': 15 }).textContent = label;
        mk('text', { x: 52, y: ys[i] + 17, class: 'sub', 'font-size': 12 }).textContent = sub;
      } else {
        const anchor = i === 0 ? 'start' : i === last ? 'end' : 'middle';
        const tx = i === 0 ? xs[i] - 8 : i === last ? xs[i] + 8 : xs[i];
        mk('text', { x: tx, y: 62, 'text-anchor': anchor, class: 'lbl', 'font-size': 13 }).textContent = label;
        mk('text', { x: tx, y: 80, 'text-anchor': anchor, class: 'sub', 'font-size': 11 }).textContent = sub;
      }
    });
    const runner = mk('circle', { r: 4.5, class: 'runner', cx: xs[0], cy: ys[0] });
    el.innerHTML = `<p class="path-title">${T.path}</p>`;
    el.appendChild(svg);
    const len = run.getTotalLength();
    run.style.setProperty('--len', len);
    run.style.strokeDasharray = len;
    run.style.strokeDashoffset = 0;
    return { el, run, runner, len };
  };
  const animatePath = (panel) => {
    const el = panel.querySelector('.path'); if (!el) return;
    const p = buildPath(el);
    if (reduce) { p.runner.remove(); return; }
    p.run.style.strokeDashoffset = '';
    el.classList.remove('go'); void el.offsetWidth; el.classList.add('go');
    const t0 = performance.now(), dur = 1600;
    const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      const pt = p.run.getPointAtLength(ease(k) * p.len);
      p.runner.setAttribute('cx', pt.x); p.runner.setAttribute('cy', pt.y);
      if (k < 1) requestAnimationFrame(tick); else p.runner.remove();
    };
    requestAnimationFrame(tick);
  };

  /* Practice tabs (Practice Areas page) */
  const tabs = $$('.pa-tab');
  if (tabs.length) {
    $$('.path').forEach((el) => buildPath(el).runner.remove());
    const select = (tab, focus, scroll = true) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        panel.hidden = !on;
        if (on) { panel.classList.remove('entering'); void panel.offsetWidth; panel.classList.add('entering'); animatePath(panel); }
      });
      if (focus) tab.focus();
      if (scroll && matchMedia('(max-width: 880px)').matches) tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        let j = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') j = (i + 1) % tabs.length;
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') j = 0; if (e.key === 'End') j = tabs.length - 1;
        if (j !== null) { e.preventDefault(); select(tabs[j], true); }
      });
    });
    // Open the topic named in the link (practice.html#asylum, for example)
    const openFromHash = () => {
      const h = location.hash.slice(1);
      const tab = h && document.getElementById('t-' + h);
      if (tab) {
        select(tab, false, false);
        const ul = tab.closest('.pa-list'); if (ul) ul.scrollLeft = tab.parentElement.offsetLeft - 16;
        document.getElementById('practice')?.scrollIntoView({ behavior: 'auto' });
        return true;
      }
      return false;
    };
    if (!openFromHash()) {
      const first = document.querySelector('.pa-panel:not([hidden])');
      if (first && !reduce && 'IntersectionObserver' in window) {
        const pio = new IntersectionObserver(([e]) => { if (e.isIntersecting) { animatePath(first); pio.disconnect(); } }, { threshold: 0.4 });
        pio.observe(first);
      }
    }
    addEventListener('hashchange', openFromHash);
    let rzp; addEventListener('resize', () => { clearTimeout(rzp); rzp = setTimeout(() => $$('.path').forEach((el) => buildPath(el).runner.remove()), 200); });
  }

  /* Consultation form */
  const form = $('#consult');
  if (form) {
    const check = (input) => {
      const f = input.closest('.field');
      const bad = input.required && !input.value.trim();
      f.classList.toggle('invalid', bad);
      const err = f.querySelector('.err'); if (err) err.hidden = !bad;
      if (bad) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
      return !bad;
    };
    form.querySelectorAll('[required]').forEach((i) => i.addEventListener('blur', () => check(i)));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const req = [...form.querySelectorAll('[required]')];
      if (!req.map(check).every(Boolean)) { req.find((i) => i.getAttribute('aria-invalid'))?.focus(); return; }
      const name = form.querySelector('#f-name').value.trim().split(' ')[0].replace(/[<>&"]/g, '');
      const btn = form.querySelector('button[type=submit]');
      const done = (title, body, kicker) => { form.innerHTML = `<div class="sent" role="status"><p class="kicker">${kicker}</p><h3>${title}</h3><p>${body}</p></div>`; };
      const offline = () => done(T.thanks(name), T.previewBody, T.preview);
      btn.disabled = true; btn.textContent = T.sending;
      fetch(form.getAttribute('action') || location.pathname, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)).toString() })
        .then((r) => { if (!r.ok) throw new Error(r.status); done(T.thanks(name), T.receivedBody, T.received); })
        .catch(offline);
    });
  }

  /* Services directory: search + category chips */
  const grid = $('.svc-grid');
  if (grid) {
    const q = $('#svc-q'), chips = $$('.chip'), cats = $$('.svc-cat'), count = $('.svc-count'), empty = $('.svc-empty');
    const total = $$('.svc-cat li').length;
    let cat = 'all';
    cats.forEach((c) => {
      const n = c.querySelectorAll('li').length;
      if (n > 3) {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'svc-more';
        b.innerHTML = `<span class="lbl-more">${T.more(n)}</span><span class="lbl-less">${T.less}</span>`;
        b.addEventListener('click', () => c.classList.toggle('open'));
        c.appendChild(b);
      }
      c.querySelectorAll('.svc-name').forEach((s) => { s.dataset.t = s.textContent; });
    });
    const norm = (s) => s.toLowerCase().replace(/[\s\-]+/g, ' ').trim();
    const apply = () => {
      const term = norm(q.value || '');
      let shown = 0;
      cats.forEach((c) => {
        const inCat = cat === 'all' || c.dataset.cat === cat;
        let any = 0;
        c.querySelectorAll('li').forEach((li) => {
          const hit = inCat && (!term || norm(li.dataset.q).includes(term));
          li.classList.toggle('hide', !hit);
          const nm = li.querySelector('.svc-name');
          if (hit && term) {
            const t = nm.dataset.t, i = norm(t).indexOf(term);
            nm.innerHTML = i > -1 ? t.slice(0, i).replace(/</g, '&lt;') + '<mark>' + t.slice(i, i + term.length).replace(/</g, '&lt;') + '</mark>' + t.slice(i + term.length).replace(/</g, '&lt;') : t.replace(/</g, '&lt;');
          } else nm.textContent = nm.dataset.t;
          if (hit) any++;
        });
        const was = !c.classList.contains('hide');
        c.classList.toggle('hide', !any);
        if (any && !was && !reduce) { c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }
        shown += any;
      });
      grid.classList.toggle('filtered', !!term || cat !== 'all');
      count.textContent = T.showing(shown, total);
      empty.hidden = shown > 0;
    };
    chips.forEach((ch) => ch.addEventListener('click', () => {
      cat = ch.dataset.cat;
      chips.forEach((c) => { const on = c === ch; c.classList.toggle('on', on); c.setAttribute('aria-pressed', on); });
      if (matchMedia('(max-width: 760px)').matches) ch.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
      apply();
      const tools = $('.svc-tools');
      const top = grid.getBoundingClientRect().top + scrollY - tools.offsetHeight - (parseFloat(getComputedStyle(root).getPropertyValue('--hdr')) || 68) - 16;
      if (scrollY > top) scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
    }));
    q.addEventListener('input', apply);
    apply();
    const tools = $('.svc-tools');
    const sentinel = document.createElement('div'); tools.before(sentinel);
    if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => tools.classList.toggle('stuck', !e.isIntersecting && e.boundingClientRect.top < 0), { rootMargin: `-${(parseFloat(getComputedStyle(root).getPropertyValue('--hdr')) || 68) + 1}px 0px 0px 0px` }).observe(sentinel);
  }

  /* Contact: office photo settles in when it scrolls into view */
  const op = $('#office-photo');
  if (op && !reduce && 'IntersectionObserver' in window) {
    const oio = new IntersectionObserver(([e]) => { if (e.isIntersecting) { op.classList.add('in'); oio.disconnect(); } }, { threshold: 0.3 });
    oio.observe(op);
  } else op?.classList.add('in');

  /* Services page: highlight the category in view */
  const spy = $$('.sv-index a');
  if (spy.length && 'IntersectionObserver' in window) {
    const setOn = (id) => spy.forEach((a) => {
      const on = a.dataset.spy === id; a.classList.toggle('on', on);
      if (on && matchMedia('(max-width: 860px)').matches) { const ul = a.closest('ul'); ul.scrollTo({ left: a.offsetLeft - 16, behavior: reduce ? 'auto' : 'smooth' }); }
    });
    const io2 = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setOn(e.target.id); }), { rootMargin: '-35% 0px -60% 0px' });
    $$('.sv-group').forEach((g) => io2.observe(g));
    setOn(spy[0].dataset.spy);
  }

  /* Route-map engine shared by the world map and the borough map */
  const routeMap = (canvas, opts) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, view, arcs = [], visible = true;
    const t0 = performance.now();
    const proj = ([lon, lat]) => [(lon - view.lon0) / (view.lon1 - view.lon0) * W, (view.lat1 - lat) / (view.lat1 - view.lat0) * H];
    const size = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(2, devicePixelRatio || 1);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      view = opts.view(W, H);
      const end = proj(opts.target);
      arcs = opts.sources.map((src, i) => {
        const s = proj(src.c || src);
        if (s[0] < -20 || s[0] > W + 20 || s[1] < -20 || s[1] > H + 20) return null;
        const d = Math.hypot(end[0] - s[0], end[1] - s[1]);
        return { s, e: end, c: [(s[0] + end[0]) / 2, (s[1] + end[1]) / 2 - d * opts.bend], delay: (i * opts.stagger) % opts.cycle, period: opts.cycle + (i % 4) * 0.5, name: src.n };
      }).filter(Boolean);
    };
    const qp = (a, t) => { const u = 1 - t; return [u*u*a.s[0] + 2*u*t*a.c[0] + t*t*a.e[0], u*u*a.s[1] + 2*u*t*a.c[1] + t*t*a.e[1]]; };
    const ease = (x) => 1 - Math.pow(1 - x, 3);
    let G, N;
    const readPal = () => { const cs = getComputedStyle(root); G = cs.getPropertyValue('--map-accent').trim() || '23,104,74'; N = cs.getPropertyValue('--map-ink').trim() || '13,29,54'; };
    readPal();
    addEventListener('themechange', () => { readPal(); if (reduce || !visible) draw(performance.now()); });
    const draw = (now) => {
      const time = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = `rgba(${N},0.09)`;
      const g = W < 640 ? 14 : 18;
      for (let x = g / 2; x < W; x += g) for (let y = g / 2; y < H; y += g) ctx.fillRect(x, y, 1.2, 1.2);
      opts.under?.(ctx, proj, W, H);
      arcs.forEach((a) => {
        ctx.fillStyle = `rgba(${N},0.5)`;
        ctx.beginPath(); ctx.arc(a.s[0], a.s[1], 2.2, 0, Math.PI * 2); ctx.fill();
        if (a.name) {
          ctx.font = '500 11px "Geist Mono", ui-monospace, monospace';
          ctx.fillStyle = `rgba(${N},0.75)`;
          const right = a.s[0] >= a.e[0];
          ctx.textAlign = right ? 'left' : 'right';
          ctx.fillText(a.name, a.s[0] + (right ? 7 : -7), a.s[1] + 4);
        }
        const p = reduce ? 1 : ((time - a.delay) % a.period) / 2.6;
        if (!reduce && (time < a.delay || p > 1.9)) return;
        const head = ease(Math.min(1, p));
        const tail = reduce ? 0 : ease(Math.min(1, Math.max(0, p - 0.55) / 1.1));
        if (head - tail < 0.01) return;
        ctx.beginPath();
        for (let k = 0; k <= 40; k++) { const [x, y] = qp(a, tail + (head - tail) * (k / 40)); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
        const [hx, hy] = qp(a, head), [tx, ty] = qp(a, tail);
        const grad = ctx.createLinearGradient(tx, ty, hx, hy);
        grad.addColorStop(0, `rgba(${G},0)`); grad.addColorStop(1, `rgba(${G},${reduce ? 0.45 : 0.9})`);
        ctx.strokeStyle = grad; ctx.lineWidth = 1.5; ctx.stroke();
        if (!reduce && p < 1) { ctx.fillStyle = `rgb(${G})`; ctx.beginPath(); ctx.arc(hx, hy, 2.6, 0, Math.PI * 2); ctx.fill(); }
      });
      const [nx, ny] = proj(opts.target);
      const pulse = reduce ? 0.5 : (time % 2.4) / 2.4;
      ctx.strokeStyle = `rgba(${G},${(0.7 * (1 - pulse)).toFixed(3)})`; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(nx, ny, 6 + pulse * 22, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = `rgb(${G})`; ctx.beginPath(); ctx.arc(nx, ny, 5.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = getComputedStyle(root).getPropertyValue('--map-bg').trim() || '#fbfcfb'; ctx.beginPath(); ctx.arc(nx, ny, 2, 0, Math.PI * 2); ctx.fill();
      ctx.font = '600 12px "Geist Mono", ui-monospace, monospace'; ctx.textAlign = 'left';
      ctx.fillStyle = `rgb(${N})`; ctx.fillText(opts.label, nx + 12, ny - 10);
      if (visible && !reduce) requestAnimationFrame(draw);
    };
    size();
    if (!reduce && 'IntersectionObserver' in window) new IntersectionObserver(([e]) => { const was = visible; visible = e.isIntersecting; if (visible && !was) requestAnimationFrame(draw); }).observe(canvas);
    requestAnimationFrame(draw);
    let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { size(); if (reduce) draw(performance.now()); }, 120); });
    document.fonts?.ready.then(() => { if (reduce) draw(performance.now()); });
  };

  routeMap($('#map'), {
    target: [-74.0, 40.7], label: 'New York', bend: 0.32, stagger: 0.37, cycle: 7,
    view: (W) => W < 640 ? { lon0: -112, lon1: 50, lat0: -38, lat1: 64 } : { lon0: -128, lon1: 140, lat0: -40, lat1: 66 },
    sources: [[-99.1,19.4],[-74.1,4.7],[-69.9,18.5],[-72.3,18.5],[-76.8,18.0],[-77.0,-12.0],[-66.9,10.5],[-78.5,-0.2],[-89.2,13.7],[-90.5,14.6],[-87.2,14.1],[-82.4,23.1],[-46.6,-23.5],[-58.4,-34.6],[-70.6,-33.4],[3.4,6.5],[-0.2,5.6],[-17.4,14.7],[31.2,30.0],[38.7,9.0],[36.8,-1.3],[-7.6,33.6],[-0.1,51.5],[21.0,52.2],[30.5,50.4],[29.0,41.0],[12.5,41.9],[-3.7,40.4],[44.8,41.7],[69.2,41.3],[76.9,43.2],[71.4,51.2],[51.4,35.7],[67.0,24.9],[77.2,28.6],[90.4,23.8],[85.3,27.7],[121.0,14.6],[116.4,39.9],[127.0,37.5],[106.8,-6.2],[105.8,21.0],[37.6,55.8],[74.6,42.9]]
  });

  const manhattan = [[-74.018,40.700],[-74.012,40.712],[-74.010,40.735],[-74.003,40.758],[-73.990,40.775],[-73.972,40.800],[-73.958,40.820],[-73.945,40.835],[-73.930,40.855],[-73.910,40.873],[-73.928,40.877],[-73.934,40.862],[-73.946,40.840],[-73.932,40.804],[-73.943,40.778],[-73.958,40.758],[-73.970,40.742],[-73.973,40.726],[-73.977,40.710],[-73.998,40.708],[-74.018,40.700]];
  routeMap($('#boroughs'), {
    target: [-73.9839, 40.7457], label: RU ? '136 Мэдисон-авеню' : '136 Madison Ave', bend: 0.22, stagger: 0.9, cycle: 6,
    view: (W, H) => {
      const cx = -73.985, cy = 40.74, latSpan = 0.40, lonSpan = latSpan * (W / H) * 1.32;
      return { lon0: cx - lonSpan / 2, lon1: cx + lonSpan / 2, lat0: cy - latSpan / 2, lat1: cy + latSpan / 2 };
    },
    sources: (RU ? ['Бронкс', 'Куинс', 'Бруклин', 'Статен-Айленд', 'Джерси-Сити', 'Ньюарк', 'Йонкерс', 'Лонг-Айленд'] : ['Bronx', 'Queens', 'Brooklyn', 'Staten Island', 'Jersey City', 'Newark', 'Yonkers', 'Long Island']).map((n, i) => ({ n, c: [[-73.865, 40.845], [-73.80, 40.725], [-73.950, 40.650], [-74.130, 40.585], [-74.077, 40.718], [-74.172, 40.735], [-73.899, 40.912], [-73.735, 40.770]][i] })),
    under: (ctx, proj) => {
      ctx.beginPath();
      manhattan.forEach((pt, i) => { const [x, y] = proj(pt); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
      ctx.closePath();
      const cs = getComputedStyle(root), A = cs.getPropertyValue('--map-accent').trim(), I = cs.getPropertyValue('--map-ink').trim();
      ctx.fillStyle = `rgba(${A},0.14)`; ctx.fill();
      ctx.strokeStyle = `rgba(${A},0.45)`; ctx.lineWidth = 1; ctx.stroke();
      const [lx, ly] = proj([-74.0445, 40.6892]);
      ctx.fillStyle = `rgba(${I},0.6)`; ctx.beginPath(); ctx.arc(lx, ly, 2.6, 0, Math.PI * 2); ctx.fill();
      ctx.font = '400 10px "Geist Mono", ui-monospace, monospace'; ctx.textAlign = 'right';
      ctx.fillText(RU ? 'Статуя Свободы' : 'Statue of Liberty', lx - 6, ly + 13);
    }
  });
})();
