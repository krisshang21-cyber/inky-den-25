/* ============================================================
   Inky's Study Den — behaviour
   ============================================================ */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rand = (a) => a[Math.floor(Math.random() * a.length)];
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- State ---------- */
  const KEY = 'inky-den-v1';
  const DEFAULTS = () => ({ done: {}, saved: {}, activity: {}, badges: {}, goal: 7, sessions: 0, pets: 0, theme: null, trail: true, pad: '' });
  const loadState = () => {
    try { return Object.assign(DEFAULTS(), JSON.parse(localStorage.getItem(KEY) || '{}')); }
    catch (e) { return DEFAULTS(); }
  };
  let S = loadState();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* private mode */ } };

  /* ---------- Lookups ---------- */
  const CM = {};
  COURSES.forEach((c) => (CM[c.code] = c));
  CM.ALL = { code: 'ALL', name: 'All courses', sem: 0, color: 'purple', dept: 'Everyone' };
  const RES = {};
  RESOURCES.forEach((r) => (RES[r.id] = r));
  const TOTALS = { notes: 0, papers: 0, stash: 0 };
  RESOURCES.forEach((r) => TOTALS[r.type]++);

  const XP = { notes: 10, papers: 20, stash: 8 };
  const LEVELS = [
    { n: 'Kitten', at: 0 }, { n: 'Alley Cat', at: 60 }, { n: 'Tabby Scholar', at: 160 },
    { n: 'Midnight Panther', at: 320 }, { n: 'Purrfessor', at: 560 }, { n: 'Nine-Lives Legend', at: 900 },
  ];
  const KIND = {
    sheet: ['📄', 'Cheat sheet'], video: ['🎬', 'Video playlist'], practice: ['✏️', 'Practice set'], book: ['📚', 'Ebook'],
  };

  /* ---------- Date helpers ---------- */
  const dkey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const daysAgo = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return d; };

  /* ---------- Cat mounting ---------- */
  Cat.mount();

  /* ---------- Toasts, bubbles, confetti ---------- */
  const toasts = $('#toasts');
  function toast(msg, big = false) {
    const el = document.createElement('div');
    el.className = 'toast' + (big ? ' big' : '');
    el.textContent = msg;
    toasts.appendChild(el);
    while (toasts.children.length > 3) toasts.firstChild.remove();
    setTimeout(() => el.remove(), 3700);
  }

  const guideBubble = $('#guideBubble');
  const guideCatEl = $('#guideCat .cat');
  let guideTimer, happyTimer;
  function say(msg, ms = 4800) {
    guideBubble.textContent = msg;
    guideBubble.classList.add('show');
    clearTimeout(guideTimer);
    guideTimer = setTimeout(() => guideBubble.classList.remove('show'), ms);
    guideCatEl.classList.add('is-happy');
    clearTimeout(happyTimer);
    happyTimer = setTimeout(() => guideCatEl.classList.remove('is-happy'), 2200);
  }

  const confettiEl = $('#confetti');
  function burst(x, y, n = 14, big = false) {
    if (REDUCED) return;
    const bits = ['🐾', '🐟', '⭐', '🧶', '💜', '✨', '🧡'];
    for (let i = 0; i < n; i++) {
      const b = document.createElement('span');
      b.className = 'bit';
      b.textContent = rand(bits);
      const a = Math.random() * Math.PI * 2;
      const dist = (big ? 180 : 90) + Math.random() * (big ? 260 : 110);
      b.style.left = x + 'px';
      b.style.top = y + 'px';
      b.style.setProperty('--dx', Math.cos(a) * dist + 'px');
      b.style.setProperty('--dy', Math.sin(a) * dist - 40 + 'px');
      b.style.setProperty('--rot', (Math.random() * 540 - 270) + 'deg');
      b.style.setProperty('--fs', (1 + Math.random() * 0.9) + 'rem');
      b.style.setProperty('--dur', (0.9 + Math.random() * 0.7) + 's');
      confettiEl.appendChild(b);
      setTimeout(() => b.remove(), 1800);
    }
  }
  const burstAt = (el, n, big) => {
    const r = el.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, n, big);
  };

  function fishRain() {
    const bits = ['🐟', '🐠', '🧶', '🐾'];
    for (let i = 0; i < 46; i++) {
      const el = document.createElement('span');
      el.className = 'rain';
      el.textContent = rand(bits);
      el.style.left = Math.random() * 100 + 'vw';
      el.style.setProperty('--dur', 2.4 + Math.random() * 2.6 + 's');
      el.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
      el.style.animationDelay = Math.random() * 1.6 + 's';
      confettiEl.appendChild(el);
      setTimeout(() => el.remove(), 7000);
    }
    toast('🐟 Fish rain! You found the secret. 🐟', true);
    say('Okay, this is the best day of my life.');
  }

  /* ---------- Theme & paw trail ---------- */
  const root = document.documentElement;
  const applyTheme = (t) => { root.dataset.theme = t; };
  applyTheme(S.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'));
  $('#themeBtn').addEventListener('click', () => {
    S.theme = root.dataset.theme === 'night' ? 'day' : 'night';
    applyTheme(S.theme);
    save();
    say(S.theme === 'night' ? 'Lights out. My favourite.' : 'Sunbeam mode. I will nap in it.');
  });

  const trailBtn = $('#trailBtn');
  trailBtn.setAttribute('aria-pressed', String(S.trail));
  trailBtn.addEventListener('click', () => {
    S.trail = !S.trail;
    trailBtn.setAttribute('aria-pressed', String(S.trail));
    save();
    toast(S.trail ? 'Paw trail on 🐾' : 'Paw trail off');
  });

  let lastPaw = { x: 0, y: 0, t: 0, side: 1 };
  document.addEventListener('pointermove', (e) => {
    if (!S.trail || REDUCED || e.pointerType !== 'mouse') return;
    const now = performance.now();
    const dx = e.clientX - lastPaw.x, dy = e.clientY - lastPaw.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 46 || now - lastPaw.t < 80) return;
    const ang = Math.atan2(dy, dx);
    lastPaw.side *= -1;
    const ox = Math.cos(ang + Math.PI / 2) * 8 * lastPaw.side;
    const oy = Math.sin(ang + Math.PI / 2) * 8 * lastPaw.side;
    const p = document.createElement('div');
    p.className = 'pawprint';
    p.innerHTML = Cat.paw();
    p.style.left = e.clientX + ox - 10 + 'px';
    p.style.top = e.clientY + oy - 10 + 'px';
    p.style.setProperty('--rot', (ang * 180) / Math.PI + 90 + 'deg');
    p.style.transform = `rotate(${(ang * 180) / Math.PI + 90}deg)`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1400);
    lastPaw = { x: e.clientX, y: e.clientY, t: now, side: lastPaw.side };
  });

  /* ---------- Eyes follow the pointer ---------- */
  let eyeRaf = 0, eyeEvt = null;
  document.addEventListener('pointermove', (e) => {
    eyeEvt = e;
    if (eyeRaf) return;
    eyeRaf = requestAnimationFrame(() => {
      eyeRaf = 0;
      $$('.cat').forEach((cat) => {
        const r = cat.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight || !r.width) return;
        const cx = r.left + r.width * 0.5, cy = r.top + r.height * 0.42;
        const dx = eyeEvt.clientX - cx, dy = eyeEvt.clientY - cy;
        const k = Math.min(1, Math.hypot(dx, dy) / 260), a = Math.atan2(dy, dx);
        const tx = Math.cos(a) * 4.5 * k, ty = Math.sin(a) * 4 * k;
        cat.querySelectorAll('.pupil').forEach((p) => (p.style.transform = `translate(${tx}px, ${ty}px)`));
      });
    });
  });

  /* ---------- Progress maths ---------- */
  const xpOf = () => {
    let xp = S.sessions * 5;
    for (const id in S.done) if (RES[id]) xp += XP[RES[id].type];
    return xp;
  };
  const levelOf = (xp) => {
    let i = 0;
    LEVELS.forEach((l, k) => { if (xp >= l.at) i = k; });
    const cur = LEVELS[i], next = LEVELS[i + 1];
    return { i, cur, next, pct: next ? ((xp - cur.at) / (next.at - cur.at)) * 100 : 100 };
  };
  const doneCount = (type) => Object.keys(S.done).filter((id) => RES[id] && (!type || RES[id].type === type)).length;
  const bump = (n = 1) => {
    const k = dkey();
    S.activity[k] = Math.max(0, (S.activity[k] || 0) + n);
    const h = new Date().getHours();
    if (n > 0 && (h >= 22 || h < 5) && S.badges.owl !== 1) S.badges.owl = 'pending';
  };
  const streakOf = () => {
    let n = 0, i = S.activity[dkey()] > 0 ? 0 : 1;
    while (S.activity[dkey(daysAgo(i))] > 0) { n++; i++; }
    return n;
  };
  const weekDone = () => { let t = 0; for (let i = 0; i < 7; i++) t += S.activity[dkey(daysAgo(i))] || 0; return t; };

  const BADGES = [
    { id: 'first',   ico: '🐾', n: 'First Paw',        d: 'Finish your first item',        ok: () => doneCount() >= 1 },
    { id: 'notes10', ico: '📓', n: 'Note Ninja',       d: '10 notes finished',             ok: () => doneCount('notes') >= 10 },
    { id: 'papers5', ico: '📜', n: 'Paper Pouncer',    d: '5 past papers finished',        ok: () => doneCount('papers') >= 5 },
    { id: 'stash5',  ico: '🧶', n: 'Yarn Hoarder',     d: '5 stash items finished',        ok: () => doneCount('stash') >= 5 },
    { id: 'streak3', ico: '🔥', n: 'Three-Day Purr',   d: 'A 3-day streak',                ok: () => streakOf() >= 3 },
    { id: 'streak7', ico: '🌙', n: 'Week of Whiskers', d: 'A 7-day streak',                ok: () => streakOf() >= 7 },
    { id: 'owl',     ico: '🦉', n: 'Night Owl',        d: 'Study after 10pm',              ok: () => S.badges.owl === 'pending' || S.badges.owl === 1 },
    { id: 'nap4',    ico: '💤', n: 'Nap Pro',          d: '4 focus sessions done',         ok: () => S.sessions >= 4 },
    { id: 'cuddle',  ico: '💜', n: 'Cuddle Monster',   d: 'Pet Inky 20 times',             ok: () => S.pets >= 20 },
    { id: 'hoard',   ico: '♥',  n: 'Collector',        d: 'Save 8 items',                  ok: () => Object.keys(S.saved).length >= 8 },
    { id: 'course',  ico: '🏆', n: 'Course Conqueror', d: 'Finish every item in a course', ok: () => COURSES.some((c) => { const l = RESOURCES.filter((r) => r.course === c.code); return l.every((r) => S.done[r.id]); }) },
    { id: 'lvl4',    ico: '👑', n: 'Panther Rising',   d: 'Reach Midnight Panther',        ok: () => levelOf(xpOf()).i >= 3 },
  ];
  function checkBadges(silent = false) {
    BADGES.forEach((b) => {
      if (S.badges[b.id] === 1) return;
      if (b.ok()) {
        S.badges[b.id] = 1;
        if (!silent) {
          toast(`${b.ico} New badge: ${b.n}!`, true);
          const g = $('#guideCat'); if (g) burstAt(g, 18, true);
        }
      }
    });
    if (S.badges.owl === 'pending') S.badges.owl = 1;
    save();
  }

  /* ---------- Library ---------- */
  const V = { tab: 'notes', sem: 'all', course: 'all', q: '', sort: 'new', saved: false, hideDone: false, limit: 12 };
  const grid = $('#grid'), empty = $('#empty'), moreBtn = $('#moreBtn'), resultLine = $('#resultLine');
  const qInput = $('#q'), courseSel = $('#courseSel'), sortSel = $('#sortSel');

  const haystack = (r) => {
    const c = CM[r.course];
    return [
      r.title, r.course, c.name, c.dept,
      r.exam, r.year, r.exam && r.year ? `${r.exam} ${r.year}` : '',
      r.unit ? `unit ${r.unit}` : '', r.format, (r.tags || []).join(' '), r.kind ? KIND[r.kind][1] : '', r.meta || '',
      r.hot ? 'exam favourite' : '',
    ].join(' ').toLowerCase();
  };

  function applyFilters(tab) {
    let list = RESOURCES.filter((r) => r.type === tab);
    if (V.sem !== 'all') list = list.filter((r) => CM[r.course].sem === V.sem || CM[r.course].sem === 0);
    if (V.course !== 'all') list = list.filter((r) => r.course === V.course);
    if (V.saved) list = list.filter((r) => S.saved[r.id]);
    if (V.hideDone) list = list.filter((r) => !S.done[r.id]);
    const q = V.q.trim().toLowerCase();
    if (q) {
      const phrase = list.filter((r) => haystack(r).includes(q));
      list = phrase.length ? phrase : list.filter((r) => { const h = haystack(r); return q.split(/\s+/).every((t) => h.includes(t)); });
    }
    return list;
  }
  function sortList(list) {
    const l = [...list];
    if (V.sort === 'az') l.sort((a, b) => a.title.localeCompare(b.title));
    else if (V.sort === 'todo') l.sort((a, b) => (!!S.done[a.id] - !!S.done[b.id]) || a.added - b.added);
    else l.sort((a, b) => a.added - b.added);
    return l;
  }

  function cardHTML(r, i) {
    const c = CM[r.course];
    const done = !!S.done[r.id], saved = !!S.saved[r.id];
    let meta = '', tags = '';
    if (r.type === 'notes') {
      meta = `<span>Unit ${r.unit}</span><span>📄 ${r.pages} pages</span><span>⏱ ${r.minutes} min</span><span>✍️ ${r.format}</span>`;
      tags = (r.hot ? '<span class="tag hot">🔥 exam favourite</span>' : '') + r.tags.map((t) => `<span class="tag">${t}</span>`).join('');
    } else if (r.type === 'papers') {
      meta = `<span>🗓 ${r.year}</span><span>📝 ${r.exam}</span><span>🎯 ${r.marks} marks</span><span>⏳ ${r.duration}</span>`;
      tags = r.solutions ? '<span class="tag good">✓ with solutions</span>' : '<span class="tag">solutions: ask Inky later</span>';
    } else {
      const [ico, label] = KIND[r.kind];
      meta = `<span>${ico} ${label}</span><span>${r.meta}</span>`;
      tags = r.course === 'ALL' ? '<span class="tag good">for everyone</span>' : '';
    }
    return `
    <article class="card${done ? ' is-done' : ''}" data-id="${r.id}" style="--c: var(--c-${c.color}); --i: ${i % 12}">
      <div class="card-top">
        <span class="chip">${c.code === 'ALL' ? 'ALL' : c.code}</span>
        <button class="icon-btn heart${saved ? ' on' : ''}" aria-pressed="${saved}" aria-label="Save ${r.title}">♥</button>
      </div>
      <h3>${r.title}</h3>
      <p class="course-name">${c.name}</p>
      <div class="meta">${meta}</div>
      <div class="tags">${tags}</div>
      <div class="card-actions">
        <button class="peek-btn">Peek inside</button>
        <button class="paw-check${done ? ' on' : ''}" aria-pressed="${done}" aria-label="Mark ${r.title} as done">${Cat.paw()}</button>
      </div>
    </article>`;
  }

  function renderGrid() {
    const list = sortList(applyFilters(V.tab));
    grid.innerHTML = list.slice(0, V.limit).map(cardHTML).join('');
    empty.hidden = list.length > 0;
    moreBtn.hidden = list.length <= V.limit;
    const noun = { notes: 'notes', papers: 'past papers', stash: 'stash goodies' }[V.tab];
    const dn = list.filter((r) => S.done[r.id]).length;
    resultLine.textContent = list.length ? `${list.length} ${noun} found · ${dn} already done 🐾` : '';
    $('#cnt-notes').textContent = TOTALS.notes;
    $('#cnt-papers').textContent = TOTALS.papers;
    $('#cnt-stash').textContent = TOTALS.stash;
  }

  function updateCard(id) {
    const el = grid.querySelector(`[data-id="${id}"]`);
    if (!el) return;
    const done = !!S.done[id], saved = !!S.saved[id];
    el.classList.toggle('is-done', done);
    const pc = $('.paw-check', el); pc.classList.toggle('on', done); pc.setAttribute('aria-pressed', String(done));
    const h = $('.heart', el); h.classList.toggle('on', saved); h.setAttribute('aria-pressed', String(saved));
  }

  function setTab(tab) {
    V.tab = tab; V.limit = 12;
    $$('#tabs button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === tab)));
    renderGrid();
  }

  function buildPills() {
    const wrap = $('#semPills');
    wrap.innerHTML = [`<button data-sem="all" aria-pressed="true">All semesters</button>`]
      .concat(SEMESTERS.map((s) => `<button data-sem="${s}" aria-pressed="false">Sem ${s}</button>`)).join('');
    wrap.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      V.sem = b.dataset.sem === 'all' ? 'all' : +b.dataset.sem;
      $$('button', wrap).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      buildCourseSel();
      V.limit = 12; renderGrid();
    });
  }
  function buildCourseSel() {
    const list = COURSES.filter((c) => V.sem === 'all' || c.sem === V.sem);
    courseSel.innerHTML = `<option value="all">All courses</option>` + list.map((c) => `<option value="${c.code}">${c.code} · ${c.name}</option>`).join('');
    if (V.course !== 'all' && !list.some((c) => c.code === V.course)) V.course = 'all';
    courseSel.value = V.course;
  }

  const SAYS = {
    notes: ['Read this one with a snack nearby.', 'Highlight the scary parts. They always show up in exams.', 'Short sessions beat marathons. Trust the cat.', 'If it makes no sense, read it out loud. Works on me.'],
    papers: ['Time yourself. Pretend it is the real thing.', 'Attempt first, peek at solutions after. Pounce, then check.', 'Examiners repeat themselves. Look for patterns.', 'Do it once cold, then again a day later.'],
    stash: ['A great little treat for the in-between moments.', 'Perfect for a bus ride or a sunbeam.', 'Save it now, thank me at 1 a.m. before the exam.'],
  };
  const reader = $('#reader');
  let readerId = null;
  function openReader(id) {
    const r = RES[id]; if (!r) return;
    readerId = id;
    const c = CM[r.course];
    $('#rCourse').textContent = c.code === 'ALL' ? 'For everyone' : `${c.code} · ${c.dept}`;
    $('#rCourse').style.background = `var(--c-${c.color})`;
    $('#rCourse').style.color = (c.color === 'indigo' || c.color === 'purple') ? '#fff' : 'var(--indigo-d)';
    $('#rTitle').textContent = r.title;
    $('#rSub').textContent = c.name + (c.sem ? ` · Semester ${c.sem}` : '');
    const f = [];
    if (r.type === 'notes') f.push(['Unit', r.unit], ['Pages', r.pages], ['Format', r.format], ['Reading time', `~${r.minutes} min`]);
    else if (r.type === 'papers') f.push(['Year', r.year], ['Exam', r.exam], ['Marks', r.marks], ['Duration', r.duration], ['Solutions', r.solutions ? 'Included' : 'Not yet'], ['Type', 'Past paper']);
    else f.push(['Kind', KIND[r.kind][1]], ['Details', r.meta]);
    $('#rFacts').innerHTML = f.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
    const lines = SAYS[r.type];
    $('#rSays').textContent = lines[(r.id.length + (r.added || 0)) % lines.length];
    $('#rOpen').href = r.url;
    syncReaderButtons();
    if (!reader.open) reader.showModal();
  }
  function syncReaderButtons() {
    if (!readerId) return;
    $('#rDone').textContent = S.done[readerId] ? '✓ Done — undo' : 'Mark as done';
    $('#rSave').textContent = S.saved[readerId] ? '♥ Saved' : '♡ Save';
  }
  $('#rOpen').addEventListener('click', (e) => {
    if (RES[readerId] && RES[readerId].url === '#') {
      e.preventDefault();
      toast('Demo link — set the real file URL in js/data.js 🐾');
    }
  });
  $('#rDone').addEventListener('click', (e) => { toggleDone(readerId, e.currentTarget); syncReaderButtons(); });
  $('#rSave').addEventListener('click', () => { toggleSave(readerId); syncReaderButtons(); });
  reader.addEventListener('click', (e) => { if (e.target === reader) reader.close(); });

  const PRAISE = ['Purr-fect!', 'Nailed it, hooman.', 'One paw closer to graduation.', '*approving tail swish*', 'Tuna-level achievement.', 'Your brain is on fire. I checked.'];
  function toggleDone(id, srcEl) {
    const r = RES[id]; if (!r) return;
    const lvlBefore = levelOf(xpOf()).i;
    if (S.done[id]) {
      delete S.done[id]; bump(-1);
      say(rand(['Un-done. I won’t tell anyone.', 'Back in the pile it goes.']));
    } else {
      S.done[id] = dkey(); bump(1);
      toast(`+${XP[r.type]} XP · ${rand(PRAISE)}`);
      if (srcEl) burstAt(srcEl, 14);
      say(rand(PRAISE));
    }
    save();
    updateCard(id);
    const lv = levelOf(xpOf());
    if (lv.i > lvlBefore) {
      setTimeout(() => {
        toast(`🎉 Level up! You are now a ${lv.cur.n}`, true);
        burst(innerWidth / 2, innerHeight / 2, 40, true);
        say(`${lv.cur.n}! I knew you had it in you.`, 6000);
      }, 450);
    }
    checkBadges();
    renderPaws();
    if (V.hideDone) setTimeout(renderGrid, 650);
    renderResultLineOnly();
  }
  function renderResultLineOnly() {
    const list = applyFilters(V.tab);
    const dn = list.filter((r) => S.done[r.id]).length;
    const noun = { notes: 'notes', papers: 'past papers', stash: 'stash goodies' }[V.tab];
    if (list.length) resultLine.textContent = `${list.length} ${noun} found · ${dn} already done 🐾`;
  }
  function toggleSave(id) {
    if (S.saved[id]) { delete S.saved[id]; }
    else { S.saved[id] = 1; say(rand(['Saved for later. I’ll guard it.', 'Added to your treasure pile.', 'Bookmarked. Very organised of you.'])); }
    save(); updateCard(id); checkBadges(); renderPaws();
  }

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.card'); if (!card) return;
    const id = card.dataset.id;
    if (e.target.closest('.paw-check')) toggleDone(id, e.target.closest('.paw-check'));
    else if (e.target.closest('.heart')) toggleSave(id);
    else if (e.target.closest('.peek-btn')) openReader(id);
  });

  /* Library controls */
  qInput.addEventListener('input', () => { V.q = qInput.value; V.limit = 12; renderGrid(); });
  courseSel.addEventListener('change', () => { V.course = courseSel.value; V.limit = 12; renderGrid(); });
  sortSel.addEventListener('change', () => { V.sort = sortSel.value; renderGrid(); });
  $('#savedOnly').addEventListener('click', (e) => { V.saved = !V.saved; e.currentTarget.setAttribute('aria-pressed', String(V.saved)); V.limit = 12; renderGrid(); });
  $('#hideDone').addEventListener('click', (e) => { V.hideDone = !V.hideDone; e.currentTarget.setAttribute('aria-pressed', String(V.hideDone)); V.limit = 12; renderGrid(); });
  moreBtn.addEventListener('click', () => { V.limit += 12; renderGrid(); });
  $('#clearFilters').addEventListener('click', () => {
    Object.assign(V, { sem: 'all', course: 'all', q: '', saved: false, hideDone: false, limit: 12 });
    qInput.value = ''; $('#heroQ').value = '';
    $('#savedOnly').setAttribute('aria-pressed', 'false'); $('#hideDone').setAttribute('aria-pressed', 'false');
    $$('#semPills button').forEach((b, i) => b.setAttribute('aria-pressed', String(i === 0)));
    buildCourseSel(); renderGrid();
  });
  $$('#tabs button').forEach((b) => b.addEventListener('click', () => setTab(b.dataset.tab)));
  $$('.nav a[data-tab]').forEach((a) => a.addEventListener('click', () => setTab(a.dataset.tab)));

  /* Hero search */
  function runSearch(q) {
    V.q = q; qInput.value = q; $('#heroQ').value = q; V.limit = 12;
    const best = ['notes', 'papers', 'stash'].map((t) => [t, applyFilters(t).length]).sort((a, b) => b[1] - a[1])[0];
    const here = applyFilters(V.tab).length;
    setTab(here === 0 && best[1] > 0 ? best[0] : V.tab);
    $('#library').scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' });
    if (q) say(applyFilters(V.tab).length ? 'Sniffed those out for you.' : 'Hmm. Nothing smells like that.');
  }
  $('#heroSearch').addEventListener('submit', (e) => { e.preventDefault(); runSearch($('#heroQ').value); });
  $$('#quickChips button').forEach((b) => b.addEventListener('click', () => runSearch(b.dataset.q)));
  const phs = ['Data Structures unit 3…', 'Algorithms 2024 end sem…', 'DBMS cheat sheet…', 'Operating Systems notes…', 'Calculus practice set…'];
  let phI = 0;
  setInterval(() => { const h = $('#heroQ'); if (document.activeElement !== h) h.placeholder = 'Search: ' + phs[++phI % phs.length]; }, 3200);

  document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (e.key === '/' && !typing && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      (scrollY < 420 ? $('#heroQ') : qInput).focus();
    }
  });

  /* ---------- Progress panel ---------- */
  function renderPaws() {
    const xp = xpOf(), lv = levelOf(xp);
    $('#lvlName').textContent = lv.cur.n;
    $('#lvlSub').textContent = `${xp} XP · ${doneCount()} items finished`;
    $('#lvlBar').style.width = lv.pct + '%';
    $('#lvlNext').textContent = lv.next ? `${lv.next.at - xp} XP until ${lv.next.n}` : 'Max rank. All hail the Legend.';
    $('#xpRing').style.strokeDashoffset = 339.3 * (1 - lv.pct / 100);

    const st = streakOf();
    $('#streakNum').textContent = st;
    $('#streakSub').textContent = st === 0 ? 'Finish one thing today to light the streak 🔥'
      : S.activity[dkey()] > 0 ? `${st} day${st > 1 ? 's' : ''} in a row. Inky is doing zoomies.` : `${st}-day streak is alive — do something today to keep it.`;
    $('#heat').innerHTML = Array.from({ length: 35 }, (_, k) => {
      const d = daysAgo(34 - k), n = S.activity[dkey(d)] || 0;
      const l = n === 0 ? 0 : n === 1 ? 1 : n < 4 ? 2 : 3;
      return `<div class="${l ? 'l' + l : ''}${k === 34 ? ' today' : ''}" title="${d.toDateString()} · ${n} item${n === 1 ? '' : 's'}">${d.getDate()}</div>`;
    }).join('');
    $$('#heroStats [data-count="streak"]').forEach((el) => (el.textContent = st));

    const wd = weekDone();
    $('#goalDone').textContent = wd; $('#goalTarget').textContent = S.goal;
    $('#goalBar').style.width = Math.min(100, (wd / S.goal) * 100) + '%';
    $('#goalRange').value = S.goal;
    $('#goalSub').textContent = wd >= S.goal ? 'Goal smashed. Inky is unbearably proud. 💜' : `${S.goal - wd} more in the last-7-days window to hit your goal.`;

    $('#courseBars').innerHTML = COURSES.map((c) => {
      const list = RESOURCES.filter((r) => r.course === c.code);
      const d = list.filter((r) => S.done[r.id]).length, p = Math.round((d / list.length) * 100);
      return `<li title="${c.name}"><b>${c.code}</b><div class="bar"><span style="width:${p}%; --cc: var(--c-${c.color})"></span></div><em>${p}%</em></li>`;
    }).join('');

    const got = BADGES.filter((b) => S.badges[b.id] === 1).length;
    $('#badgeCount').textContent = `${got} / ${BADGES.length} collected`;
    $('#badgeGrid').innerHTML = BADGES.map((b) => `<li class="badge${S.badges[b.id] === 1 ? ' got' : ''}"><span class="b-ico">${b.ico}</span><b>${b.n}</b><small>${b.d}</small></li>`).join('');
  }
  $('#goalRange').addEventListener('input', (e) => { S.goal = +e.target.value; save(); renderPaws(); });
  let resetArm = 0;
  $('#resetBtn').addEventListener('click', (e) => {
    const b = e.currentTarget;
    if (!resetArm) {
      b.textContent = 'Really reset? Click again';
      resetArm = setTimeout(() => { b.textContent = 'Reset progress'; resetArm = 0; }, 4000);
      return;
    }
    clearTimeout(resetArm); resetArm = 0; b.textContent = 'Reset progress';
    const keep = { theme: S.theme, trail: S.trail, pad: S.pad, goal: S.goal };
    S = Object.assign(DEFAULTS(), keep); save();
    renderGrid(); renderPaws(); say('A fresh start. Inky believes in you.');
  });

  /* ---------- Nap timer ---------- */
  const T = { f: 25, b: 5, phase: 'focus', total: 25 * 60, left: 25 * 60, running: false, end: 0, iv: null };
  const clock = $('#clock'), startBtn = $('#startBtn'), timerPanel = $('#timerPanel'), timerCat = $('#timerCat .cat');
  const BASE_TITLE = document.title;
  const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  function renderTimer() {
    clock.textContent = mmss(T.left);
    $('#timerBar').style.width = (1 - T.left / T.total) * 100 + '%';
    $('#phase').textContent = T.phase === 'focus' ? (T.running ? 'Deep focus — no zoomies' : 'Ready to focus') : (T.running ? 'Nap time… shhh' : 'Break ready');
    timerPanel.classList.toggle('on-break', T.phase === 'break');
    timerCat.classList.toggle('is-sleepy', T.phase === 'break' && T.running);
    timerCat.classList.toggle('is-focus', T.phase === 'focus' && T.running);
    startBtn.textContent = T.running ? 'Pause' : T.phase === 'focus' ? (T.left < T.total ? 'Resume' : 'Start focus') : 'Start nap';
    $('#sessionLine').textContent = `${S.sessions} focus session${S.sessions === 1 ? '' : 's'} so far`;
    document.title = T.running ? `${mmss(T.left)} · Inky's Den` : BASE_TITLE;
  }
  function setPhase(p) {
    T.phase = p; T.total = (p === 'focus' ? T.f : T.b) * 60; T.left = T.total;
  }
  function stopTimer() { T.running = false; clearInterval(T.iv); }
  function tick() {
    const left = Math.max(0, Math.ceil((T.end - Date.now()) / 1000));
    if (left !== T.left) { T.left = left; renderTimer(); }
    if (left <= 0) completePhase();
  }
  function completePhase() {
    stopTimer();
    if (T.phase === 'focus') {
      S.sessions++; bump(1); save();
      toast('🎉 Focus session done! Nap time.', true);
      burstAt(timerPanel, 22, true);
      say('Good focus! Now we nap. Doctor’s orders.');
      setPhase('break'); startTimer();
      checkBadges(); renderPaws();
    } else {
      toast('Nap over. Stretch, then pounce again 🐾');
      say('Paws up, stretch, and back to it.');
      setPhase('focus'); renderTimer();
    }
  }
  function startTimer() {
    T.end = Date.now() + T.left * 1000; T.running = true;
    clearInterval(T.iv); T.iv = setInterval(tick, 250);
    renderTimer();
  }
  startBtn.addEventListener('click', () => { if (T.running) { stopTimer(); renderTimer(); } else startTimer(); });
  $('#resetTimer').addEventListener('click', () => { stopTimer(); setPhase('focus'); renderTimer(); });
  $$('#modes button').forEach((b) => b.addEventListener('click', () => {
    if (T.running) { toast('Pause the timer first, hooman.'); return; }
    T.f = +b.dataset.f; T.b = +b.dataset.b;
    $$('#modes button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    setPhase('focus'); renderTimer();
  }));

  const padText = $('#padText');
  padText.value = S.pad || '';
  let padT;
  padText.addEventListener('input', () => { clearTimeout(padT); padT = setTimeout(() => { S.pad = padText.value; save(); }, 300); });

  /* ---------- Hero cat: pet, knock, greet ---------- */
  const scene = $('#scene'), heroCat = $('#heroCat'), heroBubble = $('#heroBubble'), hearts = $('#hearts');
  const heroCatSvg = () => $('.hero-cat-svg', heroCat);
  const hr = new Date().getHours();
  const greet = hr < 5 ? 'Night owl detected. Respect. 🌙' : hr < 12 ? 'Good morning, scholar. 🐾' : hr < 17 ? 'Afternoon! Snack first, study second.' : hr < 21 ? 'Cozy evening study session? Yes.' : 'Burning the midnight oil? Same. 🌙';
  heroBubble.textContent = greet;
  let bubbleT;
  const heroSay = (msg, ms = 3200) => {
    heroBubble.textContent = msg; heroBubble.classList.add('show');
    clearTimeout(bubbleT); bubbleT = setTimeout(() => heroBubble.classList.remove('show'), ms);
  };
  bubbleT = setTimeout(() => heroBubble.classList.remove('show'), 4800);
  const PET = ['prrrrr…', 'okay but only 5 more seconds', 'you have good hands.', 'again.', '*slow blink*', 'purrfectly acceptable', 'do not stop. do not.'];
  function pet() {
    S.pets++; save();
    const c = heroCatSvg();
    c.classList.add('is-happy'); heroCat.classList.remove('petted'); void heroCat.offsetWidth; heroCat.classList.add('petted');
    setTimeout(() => c.classList.remove('is-happy'), 1700);
    heroSay(rand(PET));
    const h = document.createElement('span');
    h.className = 'heart-pop'; h.textContent = rand(['💜', '🧡', '💛']);
    h.style.left = 38 + Math.random() * 26 + '%'; h.style.top = 22 + Math.random() * 12 + '%';
    h.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px'); h.style.setProperty('--rot', (Math.random() * 60 - 30) + 'deg');
    hearts.appendChild(h); setTimeout(() => h.remove(), 1500);
    if (S.pets % 10 === 0) { toast(`🐾 ${S.pets} pets. Inky is melting.`); checkBadges(); }
    else if (S.pets === 20) checkBadges();
  }
  heroCat.addEventListener('click', pet);
  heroCat.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pet(); } });
  heroCat.addEventListener('dblclick', () => {
    if (scene.classList.contains('knock')) return;
    scene.classList.add('knock');
    heroSay(rand(['It was in my way.', 'Gravity test. Passed.', 'I regret nothing.']), 3000);
    setTimeout(() => scene.classList.remove('knock'), 1700);
  });

  /* ---------- Guide cat ---------- */
  const TIPS = {
    den: ['Psst… press / to search anything.', 'Mark things done with the paw. I keep count.', 'Try double-clicking my twin up there. Chaos.', 'Past papers first. Notes second. Naps always.'],
    library: ['Tap the paw on a card to mark it done.', 'Heart a card to save it for later.', 'Filter by semester to cut the clutter.', 'Exam favourites are marked with a 🔥.'],
    paws: ['Look at that streak! Keep it going.', 'Badges are collar charms. Collect them all.', 'Tweak your weekly goal with the slider.'],
    nap: ['Focus first, then nap. Deal?', 'The scratch pad saves itself. Magic.', 'Short sessions beat marathons.'],
  };
  const sections = ['den', 'library', 'paws', 'nap'];
  let curSec = 'den', lastTip = 0;
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const id = en.target.id;
      $$('.nav a[data-spy]').forEach((a) => a.classList.toggle('active', a.dataset.spy === id));
      if (id !== curSec) {
        curSec = id;
        if (Date.now() - lastTip > 7000 && performance.now() > 2500) { lastTip = Date.now(); say(rand(TIPS[id])); }
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach((id) => spy.observe($('#' + id)));
  $('#guideCat').addEventListener('click', () => { lastTip = Date.now(); say(rand(TIPS[curSec])); });

  /* ---------- Reveal + counters + loader ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
  $$('.reveal').forEach((el) => io.observe(el));

  const countUp = (el, to, dur = 1000) => {
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* Konami */
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let kpos = 0;
  document.addEventListener('keydown', (e) => {
    kpos = e.key === KONAMI[kpos] ? kpos + 1 : e.key === KONAMI[0] ? 1 : 0;
    if (kpos === KONAMI.length) { kpos = 0; fishRain(); }
  });

  /* ---------- Boot ---------- */
  buildPills(); buildCourseSel(); setTab('notes');
  checkBadges(true); renderPaws(); renderTimer();
  countUp($('[data-count="notes"]'), TOTALS.notes);
  countUp($('[data-count="papers"]'), TOTALS.papers);
  countUp($('[data-count="stash"]'), TOTALS.stash);
})();
