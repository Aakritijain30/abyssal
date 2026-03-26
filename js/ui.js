/* ─── SCROLL REVEAL ────────────────────────── */
export function initScrollReveal() {
  const items = document.querySelectorAll('.rx, .rx-l, .rx-r');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('vis');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  items.forEach(el => observer.observe(el));
}

/* ─── DEPTH HUD ────────────────────────────── */
export function initDepthHUD() {
  const progBar  = document.getElementById('dhud-prog');
  const numEl    = document.getElementById('dhud-num');
  const dots     = document.querySelectorAll('.dhud-dot');
  const sectionIds = ['s1', 's2', 's3', 's4', 's5'];

  /* scroll handler */
  window.addEventListener('scroll', () => {
    const docH  = document.body.scrollHeight - window.innerHeight;
    const pct   = window.scrollY / docH;
    const depth = Math.round(pct * 11000);

    progBar.style.height = (pct * 100) + '%';
    numEl.textContent    = depth >= 1000
      ? (depth / 1000).toFixed(1) + 'km'
      : depth + 'm';

    /* active dot */
    let activeIdx = 0;
    sectionIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (window.scrollY >= el.offsetTop - window.innerHeight * 0.5) activeIdx = i;
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === activeIdx));

    /* hero parallax */
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.style.transform = `translateY(${window.scrollY * 0.28}px)`;
  }, { passive: true });

  /* dot click nav */
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      document.getElementById(dot.dataset.sec)?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ─── DEPTH EXPLORER SLIDER ────────────────── */
export function initDepthSlider() {
  const slider  = document.getElementById('de-slider');
  const valEl   = document.getElementById('de-val');
  const zoneEl  = document.getElementById('de-zone');
  const subEl   = document.getElementById('de-sub');

  if (!slider) return;

  const zones = [
    { max: 200,   name: 'Epipelagic Zone',    sub: 'Sunlight Zone · 0–200m',     color: '#00b4d8' },
    { max: 1000,  name: 'Mesopelagic Zone',   sub: 'Twilight Zone · 200–1,000m', color: '#c77dff' },
    { max: 4000,  name: 'Bathypelagic Zone',  sub: 'Midnight Zone · 1–4km',      color: '#ff006e' },
    { max: 6000,  name: 'Abyssopelagic Zone', sub: 'Abyssal Zone · 4–6km',       color: '#e63946' },
    { max: 11001, name: 'Hadal Zone',         sub: 'Trenches · 6–11km',          color: '#00f5d4' },
  ];

  function update() {
    const d    = parseInt(slider.value);
    const zone = zones.find(z => d <= z.max);

    valEl.textContent  = d >= 1000 ? (d / 1000).toFixed(1) + ' km' : d + ' m';

    if (zone) {
      zoneEl.textContent  = zone.name;
      zoneEl.style.color  = zone.color;
      subEl.textContent   = zone.sub;

      const pct = (d / 11000) * 100;
      slider.style.background =
        `linear-gradient(to right, ${zone.color} ${pct}%, rgba(255,255,255,.1) ${pct}%)`;
    }
  }

  slider.addEventListener('input', update);
  update(); // set initial state
}

/* ─── ANIMATED COUNTERS ────────────────────── */
export function initCounters() {
  function animateCount(el) {
    const target = parseInt(el.dataset.target);
    const dur    = 2200;
    const start  = performance.now();

    (function step(now) {
      const p    = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * ease).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    })(start);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.7 });

  document.querySelectorAll('[data-target]').forEach(el => observer.observe(el));
}

/* ─── BCARD MOUSE-TRACKING GLOW ────────────── */
export function initBcardGlow() {
  document.querySelectorAll('.bcard').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x    = ((e.clientX - rect.left)  / rect.width  * 100).toFixed(1);
      const y    = ((e.clientY - rect.top)   / rect.height * 100).toFixed(1);

      card.querySelector('.bcard-glow').style.background =
        `radial-gradient(circle at ${x}% ${y}%, rgba(255,0,110,.22), transparent 65%)`;
    });
  });
}
