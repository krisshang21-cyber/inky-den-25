/* ============================================================
   Inky the cat + die-cut stickers (all inline SVG, no assets)
   ============================================================ */
const Cat = (() => {
  const FUR = '#0B0A22';
  const RIM = '#34308F';
  const EYE = '#F8B93C';

  const body = () => `
    <g class="tail"><path d="M156 196 C 208 200, 220 146, 192 122 C 181 113, 168 126, 181 138 C 194 152, 188 176, 150 178 Z" fill="${FUR}" stroke="${RIM}" stroke-width="2.5" stroke-linejoin="round"/></g>
    <ellipse cx="110" cy="182" rx="57" ry="45" fill="${FUR}" stroke="${RIM}" stroke-width="2.5"/>
    <ellipse cx="84" cy="219" rx="19" ry="10" fill="${FUR}" stroke="${RIM}" stroke-width="2.5"/>
    <ellipse cx="136" cy="219" rx="19" ry="10" fill="${FUR}" stroke="${RIM}" stroke-width="2.5"/>
    <path d="M76 221 v-5 M84 222 v-6 M92 221 v-5 M128 221 v-5 M136 222 v-6 M144 221 v-5" stroke="${RIM}" stroke-width="2" stroke-linecap="round"/>
    <g class="ears">
      <path d="M56 78 L50 20 L99 53 Z" fill="${FUR}" stroke="${RIM}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M164 78 L170 20 L121 53 Z" fill="${FUR}" stroke="${RIM}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M62 66 L58 36 L85 55 Z" fill="#7C5CE0" opacity=".9"/>
      <path d="M158 66 L162 36 L135 55 Z" fill="#7C5CE0" opacity=".9"/>
    </g>
    <ellipse cx="110" cy="97" rx="60" ry="51" fill="${FUR}" stroke="${RIM}" stroke-width="2.5"/>
    <path class="scarf" d="M60 136 Q110 164 160 136 L164 153 Q110 182 56 153 Z" fill="#F28A2B" stroke="#C9650B" stroke-width="1.5"/>
    <path d="M72 144 l4 18 M92 152 l3 18 M114 155 l1 18 M136 152 l-2 18 M154 144 l-4 17" stroke="#F8D27A" stroke-width="3" stroke-linecap="round" opacity=".85"/>
    <path d="M138 156 L156 202 L136 200 L127 163 Z" fill="#F28A2B" stroke="#C9650B" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M131 176 l15 2 M134 187 l15 2" stroke="#F8D27A" stroke-width="3" stroke-linecap="round"/>
    <g class="eyes">
      <g class="eye"><ellipse cx="86" cy="97" rx="13" ry="15" fill="${EYE}"/><g class="pupil"><ellipse cx="86" cy="98" rx="5.5" ry="11" fill="${FUR}"/><circle cx="90" cy="92" r="3.4" fill="#fff"/><circle cx="83" cy="104" r="1.6" fill="#fff" opacity=".8"/></g></g>
      <g class="eye"><ellipse cx="134" cy="97" rx="13" ry="15" fill="${EYE}"/><g class="pupil"><ellipse cx="134" cy="98" rx="5.5" ry="11" fill="${FUR}"/><circle cx="138" cy="92" r="3.4" fill="#fff"/><circle cx="131" cy="104" r="1.6" fill="#fff" opacity=".8"/></g></g>
    </g>
    <g class="lids"><path d="M72 99 Q86 111 100 99" stroke="${EYE}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M120 99 Q134 111 148 99" stroke="${EYE}" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>
    <g class="happy"><path d="M72 103 Q86 88 100 103" stroke="${EYE}" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M120 103 Q134 88 148 103" stroke="${EYE}" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>
    <path d="M104 114 h12 l-6 7 z" fill="#F28A2B" stroke="#F28A2B" stroke-width="1.5" stroke-linejoin="round"/>
    <path class="mouth" d="M110 121 v4 M110 125 q-7 7 -14 2 M110 125 q7 7 14 2" stroke="${EYE}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="70" cy="117" rx="8" ry="5.5" fill="#B79CFF" opacity=".32"/>
    <ellipse cx="150" cy="117" rx="8" ry="5.5" fill="#B79CFF" opacity=".32"/>
    <path d="M62 112 l-26 -6 M62 119 l-27 2 M64 125 l-23 10 M158 112 l26 -6 M158 119 l27 2 M156 125 l23 10" stroke="#CDBDF8" stroke-width="1.8" stroke-linecap="round" opacity=".85"/>
  `;

  const VIEW = { full: '0 0 225 232', head: '30 12 160 160', peek: '20 14 180 160' };

  const svg = (crop = 'full', label = 'Inky the black cat') =>
    `<svg class="cat" viewBox="${VIEW[crop] || VIEW.full}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${body()}</svg>`;

  /* Hero scene: cat sitting on a stack of books with a mug */
  const heroScene = () => `
    <svg class="scene-svg" viewBox="0 0 380 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Inky sitting on a stack of books">
      <ellipse cx="190" cy="366" rx="150" ry="9" fill="#0B0A22" opacity=".18"/>
      <g class="bk bk1"><rect x="26" y="326" width="328" height="36" rx="10" fill="#3B37A0" stroke="#0B0A22" stroke-width="2.5"/><rect x="40" y="326" width="14" height="36" fill="#F8D27A"/><rect x="318" y="326" width="10" height="36" fill="#F28A2B"/><path d="M72 344 h200" stroke="#CDBDF8" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 10"/></g>
      <g class="bk bk2"><rect x="52" y="292" width="276" height="36" rx="10" fill="#F28A2B" stroke="#0B0A22" stroke-width="2.5"/><rect x="66" y="292" width="12" height="36" fill="#1F1B63"/><rect x="290" y="292" width="14" height="36" fill="#F8D27A"/><path d="M96 310 h170" stroke="#FFF4DE" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 10"/></g>
      <g class="bk bk3"><rect x="78" y="260" width="224" height="34" rx="10" fill="#7C5CE0" stroke="#0B0A22" stroke-width="2.5"/><rect x="92" y="260" width="12" height="34" fill="#F8D27A"/><path d="M122 277 h150" stroke="#FFF4DE" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 10"/></g>
      <svg class="cat hero-cat-svg" x="80" y="34" width="225" height="232" viewBox="0 0 225 232">${body()}</svg>
      <g class="cup">
        <path d="M100 232 q-3 -10 2 -16 M110 232 q-3 -10 2 -16" stroke="#CDBDF8" stroke-width="2.5" fill="none" stroke-linecap="round" class="steam"/>
        <rect x="92" y="234" width="28" height="26" rx="7" fill="#E8AB2E" stroke="#0B0A22" stroke-width="2.5"/>
        <path d="M120 240 q10 0 10 8 q0 8 -10 8" fill="none" stroke="#0B0A22" stroke-width="2.5"/>
        <rect x="95" y="237" width="22" height="5" rx="2.5" fill="#6b3d12" opacity=".75"/>
      </g>
    </svg>`;

  /* Die-cut stickers */
  const STICKERS = {
    star:  `<path d="M32 4 C34 22 42 30 60 32 C42 34 34 42 32 60 C30 42 22 34 4 32 C22 30 30 22 32 4Z" fill="#E8AB2E" stroke="#B87A0C" stroke-width="2" stroke-linejoin="round"/>`,
    moon:  `<path d="M40 5 A27 27 0 1 0 59 41 A21 21 0 1 1 40 5Z" fill="#E8AB2E" stroke="#B87A0C" stroke-width="2.5" stroke-linejoin="round"/><circle cx="24" cy="38" r="2.4" fill="#B87A0C"/><circle cx="30" cy="48" r="1.8" fill="#B87A0C"/>`,
    fish:  `<path d="M8 32 C 20 14, 38 14, 48 32 C 38 50, 20 50, 8 32Z" fill="#F28A2B" stroke="#C9650B" stroke-width="2.5"/><path d="M46 32 L60 18 L58 32 L60 46Z" fill="#F28A2B" stroke="#C9650B" stroke-width="2.5" stroke-linejoin="round"/><circle cx="19" cy="29" r="3" fill="#0B0A22"/><path d="M30 20 q4 12 0 24" stroke="#F8D27A" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    yarn:  `<circle cx="30" cy="32" r="22" fill="#7C5CE0" stroke="#3B37A0" stroke-width="2.5"/><path d="M12 26 q18 10 36 -4 M10 36 q20 12 40 -4 M16 48 q16 -6 30 -22 M22 14 q12 14 8 36" stroke="#CDBDF8" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M46 50 q10 8 14 -2" stroke="#7C5CE0" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    paw:   `<ellipse cx="32" cy="42" rx="14" ry="11.5" fill="#1F1B63"/><ellipse cx="14" cy="28" rx="6" ry="8" fill="#1F1B63"/><ellipse cx="25" cy="15" rx="6" ry="8" fill="#1F1B63"/><ellipse cx="39" cy="15" rx="6" ry="8" fill="#1F1B63"/><ellipse cx="50" cy="28" rx="6" ry="8" fill="#1F1B63"/>`,
    butterfly: `<path d="M32 30 C 22 8, 4 8, 5 24 C 6 36, 20 40, 32 34Z" fill="#F28A2B" stroke="#1F1B63" stroke-width="2.2"/><path d="M32 30 C 42 8, 60 8, 59 24 C 58 36, 44 40, 32 34Z" fill="#F28A2B" stroke="#1F1B63" stroke-width="2.2"/><path d="M32 34 C 22 40, 12 46, 18 54 C 24 58, 30 48, 32 40Z" fill="#3B37A0" stroke="#1F1B63" stroke-width="2.2"/><path d="M32 34 C 42 40, 52 46, 46 54 C 40 58, 34 48, 32 40Z" fill="#3B37A0" stroke="#1F1B63" stroke-width="2.2"/><circle cx="16" cy="20" r="4" fill="#CDBDF8"/><circle cx="48" cy="20" r="4" fill="#CDBDF8"/><path d="M32 22 v24" stroke="#1F1B63" stroke-width="3" stroke-linecap="round"/>`,
    heart: `<path d="M32 56 C 6 38, 6 14, 22 12 C 28 11, 31 15, 32 18 C 33 15, 36 11, 42 12 C 58 14, 58 38, 32 56Z" fill="#7C5CE0" stroke="#3B37A0" stroke-width="2.5" stroke-linejoin="round"/><path d="M18 22 q4 -6 9 -3" stroke="#CDBDF8" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    mouse: `<ellipse cx="28" cy="38" rx="20" ry="14" fill="#CDBDF8" stroke="#3B37A0" stroke-width="2.5"/><circle cx="14" cy="22" r="9" fill="#CDBDF8" stroke="#3B37A0" stroke-width="2.5"/><circle cx="14" cy="22" r="4" fill="#F28A2B"/><circle cx="46" cy="26" r="8" fill="#CDBDF8" stroke="#3B37A0" stroke-width="2.5"/><circle cx="46" cy="26" r="3.4" fill="#F28A2B"/><circle cx="12" cy="40" r="2" fill="#1F1B63"/><path d="M47 40 q12 6 12 18" stroke="#3B37A0" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
  };

  const sticker = (name, cls = '') =>
    `<svg class="sticker-svg ${cls}" viewBox="0 0 64 64" aria-hidden="true">${STICKERS[name] || ''}</svg>`;

  const paw = (cls = '') =>
    `<svg class="paw-ico ${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><ellipse cx="12" cy="16.5" rx="5.6" ry="4.6"/><ellipse cx="4.8" cy="11.5" rx="2.2" ry="3"/><ellipse cx="9.4" cy="6.4" rx="2.2" ry="3"/><ellipse cx="14.6" cy="6.4" rx="2.2" ry="3"/><ellipse cx="19.2" cy="11.5" rx="2.2" ry="3"/></svg>`;

  /* Mount every [data-cat] placeholder */
  const mount = (root = document) => {
    root.querySelectorAll('[data-cat]').forEach((el) => {
      if (el.dataset.mounted) return;
      el.dataset.mounted = '1';
      const kind = el.dataset.cat;
      el.innerHTML = kind === 'scene' ? heroScene() : svg(kind);
    });
    root.querySelectorAll('[data-sticker]').forEach((el) => {
      if (el.dataset.mounted) return;
      el.dataset.mounted = '1';
      el.innerHTML = sticker(el.dataset.sticker);
    });
    root.querySelectorAll('[data-paw]').forEach((el) => {
      if (el.dataset.mounted) return;
      el.dataset.mounted = '1';
      el.innerHTML = paw();
    });
  };

  return { svg, sticker, paw, mount, STICKERS };
})();
