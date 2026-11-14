'use strict';
const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default || require('satori');
  const { Resvg } = require('@resvg/resvg-js');

  const W = 1080, H = 1350;
  const TODAY = '2026-11-14';
  const OUTPUT_DIR = path.join(__dirname, 'output', `carousel_${TODAY}`, 'slides');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const fontDir = path.join(__dirname, 'node_modules/@fontsource/outfit/files');
  const fonts = [400, 500, 600, 700, 800].flatMap(w => [
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-${w}-normal.woff`)) },
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-ext-${w}-normal.woff`)) },
  ]);

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')
  ).toString('base64');

  const C = {
    bg: '#001F61',
    bgDark: '#001542',
    text: '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted: '#9CA3AF',
    cardBg: 'rgba(255,255,255,0.1)',
    border: 'rgba(255,255,255,0.2)',
    green: '#10B981',
    red: '#EF4444',
    gold: '#F59E0B',
  };

  const h = (type, props, ...ch) => ({
    type,
    props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function logo() {
    return h('img', {
      src: logoB64,
      width: 100,
      height: 100,
      style: { borderRadius: '12px', objectFit: 'cover' }
    });
  }

  function topBar() {
    return h('div', {
      style: { display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: '16px' }
    }, logo());
  }

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '14px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '20px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: C.cardBg, padding: '10px 22px', borderRadius: '12px',
          fontFamily: 'Outfit'
        }
      }, text)
    );
  }

  function headline(text, size = 64) {
    return h('span', {
      style: {
        fontSize: `${size}px`, fontWeight: 800, color: C.text,
        lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '8px',
        fontFamily: 'Outfit'
      }
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500, color: C.textMuted,
        lineHeight: '1.5', marginTop: '8px', fontFamily: 'Outfit'
      }
    }, text);
  }

  function keyLearning(text, accent) {
    const col = accent || C.text;
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px', marginTop: '20px'
      }
    },
      h('div', { style: { display: 'flex', width: '6px', minHeight: '40px', backgroundColor: col, borderRadius: '3px' } }),
      h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.4', fontFamily: 'Outfit' } }, text)
    );
  }

  function igHandle() {
    return h('div', { style: { display: 'flex', marginTop: '12px' } },
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, '@benarofinanzen')
    );
  }

  function slideRoot(bgColor, children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column', width: W, height: H,
        padding: '60px 70px', backgroundColor: bgColor, fontFamily: 'Outfit'
      }
    }, ...children);
  }

  // ─── SLIDE 1: HOOK ───────────────────────────────────────────────────────────
  // Thema: Inflation frisst Kaufkraft — 2,5% vs 0,5% Sparbuch
  const svgHook = `<svg width="860" height="260" viewBox="0 0 860 260" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gRed" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#EF4444" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#EF4444" stop-opacity="0.1"/>
      </linearGradient>
      <linearGradient id="gGreen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#10B981" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#10B981" stop-opacity="0.1"/>
      </linearGradient>
    </defs>
    <!-- Inflation bar (2.5%) filled area -->
    <rect x="80" y="20" width="300" height="220" rx="12" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.3)" stroke-width="2"/>
    <rect x="80" y="96" width="300" height="144" rx="8" fill="url(#gRed)" opacity="0.9"/>
    <!-- Sparbuch bar (0.5%) -->
    <rect x="420" y="20" width="300" height="220" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    <rect x="420" y="191" width="300" height="29" rx="6" fill="rgba(255,255,255,0.3)"/>
    <!-- divider line -->
    <line x1="380" y1="130" x2="410" y2="130" stroke="rgba(255,255,255,0.3)" stroke-width="3"/>
    <!-- tick marks on left bar -->
    <line x1="72" y1="96" x2="88" y2="96" stroke="rgba(239,68,68,0.6)" stroke-width="2"/>
    <line x1="72" y1="130" x2="88" y2="130" stroke="rgba(255,255,255,0.3)" stroke-width="1" stroke-dasharray="4,2"/>
    <line x1="72" y1="220" x2="88" y2="220" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    <!-- right bar tick -->
    <line x1="412" y1="191" x2="428" y2="191" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
  </svg>`;
  const svgHookSrc = `data:image/svg+xml;base64,${Buffer.from(svgHook).toString('base64')}`;

  const slide1 = slideRoot(C.bg, [
    topBar(),
    badge('WARNUNG 2026'),
    headline('Dein Geld verliert Kaufkraft. Jeden Tag.', 60),
    subline('Und das Sparbuch macht es noch schlimmer.'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      h('img', { src: svgHookSrc, width: 860, height: 260, style: { objectFit: 'contain' } }),
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '18px', padding: '20px 16px', border: '1px solid rgba(239,68,68,0.3)', gap: '6px' } },
          h('span', { style: { fontSize: '52px', fontWeight: 800, color: C.red, fontFamily: 'Outfit', lineHeight: '1' } }, '2,5 %'),
          h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted, fontFamily: 'Outfit', textAlign: 'center' } }, 'Inflation 2026')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 12px' } },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.red, fontFamily: 'Outfit' } }, 'vs.')
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', backgroundColor: C.cardBg, borderRadius: '18px', padding: '20px 16px', border: '1px solid rgba(255,255,255,0.15)', gap: '6px' } },
          h('span', { style: { fontSize: '52px', fontWeight: 800, color: C.textSoft, fontFamily: 'Outfit', lineHeight: '1' } }, '0,5 %'),
          h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted, fontFamily: 'Outfit', textAlign: 'center' } }, 'Sparbuch 2026')
        )
      )
    ),
    keyLearning('Jedes Jahr auf dem Sparbuch kostet dich real 2 % Kaufkraft.', C.red),
    igHandle(),
  ]);

  // ─── SLIDE 2: PROBLEM (10.000 EUR Kaufkraftverlust) ───────────────────────────
  const svgKaufkraft = `<svg width="860" height="260" viewBox="0 0 860 260" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gKaufkraft" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#EF4444" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#EF4444" stop-opacity="0.3"/>
      </linearGradient>
      <linearGradient id="gETF" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#10B981" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#10B981" stop-opacity="1"/>
      </linearGradient>
    </defs>
    <!-- Axes -->
    <line x1="60" y1="20" x2="60" y2="230" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    <line x1="60" y1="230" x2="840" y2="230" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    <!-- Grid lines -->
    <line x1="60" y1="80" x2="840" y2="80" stroke="rgba(255,255,255,0.07)" stroke-width="1" stroke-dasharray="6,4"/>
    <line x1="60" y1="130" x2="840" y2="130" stroke="rgba(255,255,255,0.07)" stroke-width="1" stroke-dasharray="6,4"/>
    <line x1="60" y1="180" x2="840" y2="180" stroke="rgba(255,255,255,0.07)" stroke-width="1" stroke-dasharray="6,4"/>
    <!-- Sparbuch Kaufkraft Linie (sinkend) -->
    <path d="M 80 100 C 180 108, 320 130, 460 152 C 580 170, 700 185, 820 202" stroke="url(#gKaufkraft)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="80" cy="100" r="7" fill="#EF4444"/>
    <circle cx="460" cy="152" r="5" fill="#EF4444" opacity="0.7"/>
    <circle cx="820" cy="202" r="7" fill="#EF4444" opacity="0.5"/>
    <!-- ETF Referenzlinie (steigend) -->
    <path d="M 80 200 C 180 185, 320 155, 460 120 C 580 88, 700 58, 820 36" stroke="url(#gETF)" stroke-width="4" fill="none" stroke-linecap="round" stroke-dasharray="12,5"/>
    <circle cx="80" cy="200" r="6" fill="#10B981" opacity="0.6"/>
    <circle cx="820" cy="36" r="8" fill="#10B981"/>
  </svg>`;
  const svgKaufkraftSrc = `data:image/svg+xml;base64,${Buffer.from(svgKaufkraft).toString('base64')}`;

  const slide2 = slideRoot(C.bgDark, [
    topBar(),
    badge('DAS PROBLEM'),
    headline('10.000 EUR Sparbuch: Was bleibt nach 10 Jahren?', 50),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      h('img', { src: svgKaufkraftSrc, width: 860, height: 260, style: { objectFit: 'contain' } }),
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '16px', padding: '20px 24px', border: '1px solid rgba(239,68,68,0.3)', gap: '6px' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.red, letterSpacing: '2px', fontFamily: 'Outfit' } }, 'SPARBUCH'),
          h('span', { style: { fontSize: '38px', fontWeight: 800, color: C.red, fontFamily: 'Outfit', lineHeight: '1.1' } }, '8.187 EUR'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, 'reale Kaufkraft nach 10 J.')
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '16px', padding: '20px 24px', border: '1px solid rgba(16,185,129,0.3)', gap: '6px' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.green, letterSpacing: '2px', fontFamily: 'Outfit' } }, 'ETF-SPARPLAN'),
          h('span', { style: { fontSize: '38px', fontWeight: 800, color: C.green, fontFamily: 'Outfit', lineHeight: '1.1' } }, '19.671 EUR'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, 'nominaler Wert nach 10 J.')
        )
      )
    ),
    keyLearning('Der Unterschied: 11.484 EUR mehr — nur weil einer investiert, der andere nicht.', C.red),
    igHandle(),
  ]);

  // ─── SLIDE 3: GEDACHT VS. REALITÄT ───────────────────────────────────────────
  const slide3 = slideRoot(C.bg, [
    topBar(),
    badge('DER IRRTUM'),
    headline('Was die meisten denken — und was wirklich stimmt', 46),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '20px', padding: '28px', gap: '14px', border: '1px solid rgba(255,255,255,0.1)' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted, fontFamily: 'Outfit' } }, 'GEDACHT'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(239,68,68,0.5)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', lineHeight: '1.4', fontFamily: 'Outfit' } }, '"Sparen ist sicher."'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', lineHeight: '1.4', fontFamily: 'Outfit' } }, '"0,5 % Zinsen sind besser als nichts."'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', lineHeight: '1.4', fontFamily: 'Outfit' } }, '"Investieren ist riskant."')
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '20px', padding: '28px', gap: '14px', border: '1px solid rgba(16,185,129,0.3)' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green, fontFamily: 'Outfit' } }, 'REALITÄT'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.green, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.text, lineHeight: '1.4', fontFamily: 'Outfit' } }, 'Sparen = garantierter Kaufkraftverlust.'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4', fontFamily: 'Outfit' } }, 'Inflation (2,5 %) frisst dein Erspartes.'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4', fontFamily: 'Outfit' } }, 'Nicht investieren ist das echte Risiko.')
        )
      ),
      h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '14px', padding: '16px 24px', border: '1px solid rgba(239,68,68,0.2)' } },
        h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.red, flexShrink: '0' } }),
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.3', fontFamily: 'Outfit' } }, '62 % der Deutschen halten ihr Geld auf dem Spar- oder Girokonto.')
      )
    ),
    keyLearning('Wer nichts tut, verliert. Es gibt keine risikolose Option mehr.', C.red),
    igHandle(),
  ]);

  // ─── SLIDE 4: DIE 4 INFLATIONSSCHUTZ-ASSETS ──────────────────────────────────
  const assets = [
    { name: 'ETF-Sparplan', rendite: '7 % p.a.', schutz: 'Sehr hoch', icon: 'ETF', color: C.green, bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)' },
    { name: 'Tagesgeld', rendite: '4,25 % p.a.', schutz: 'Hoch (kurz)', icon: 'TG', color: C.text, bg: C.cardBg, border: 'rgba(255,255,255,0.15)' },
    { name: 'Gold', rendite: '5-7 % p.a.', schutz: 'Hoch (lang)', icon: 'AU', color: C.gold, bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
    { name: 'Inflationsanleihe', rendite: 'Inflation +', schutz: 'Garantiert', icon: 'BND', color: C.textSoft, bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.1)' },
  ];

  function assetCard(a) {
    return h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: a.bg, borderRadius: '20px', padding: '22px', gap: '10px', border: `1px solid ${a.border}` } },
      h('div', { style: { display: 'flex', width: '52px', height: '52px', borderRadius: '14px', backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' } },
        h('span', { style: { fontSize: '20px', fontWeight: 800, color: a.color, fontFamily: 'Outfit' } }, a.icon)
      ),
      h('span', { style: { fontSize: '26px', fontWeight: 700, color: a.color, fontFamily: 'Outfit', lineHeight: '1.2' } }, a.name),
      h('div', { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '4px' } },
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '2px' } },
          h('span', { style: { fontSize: '17px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, 'Rendite'),
          h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.text, fontFamily: 'Outfit' } }, a.rendite)
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end' } },
          h('span', { style: { fontSize: '17px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, 'Schutz'),
          h('span', { style: { fontSize: '20px', fontWeight: 700, color: a.color, fontFamily: 'Outfit' } }, a.schutz)
        )
      )
    );
  }

  const slide4 = slideRoot(C.bgDark, [
    topBar(),
    badge('DIE LÖSUNG'),
    headline('Diese 4 Assets schützen dich vor Inflation', 52),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px' } },
        assetCard(assets[0]),
        assetCard(assets[1])
      ),
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px' } },
        assetCard(assets[2]),
        assetCard(assets[3])
      )
    ),
    keyLearning('Der ETF-Sparplan schlägt die Inflation langfristig am stärksten.', C.green),
    igHandle(),
  ]);

  // ─── SLIDE 5: DETAILVERGLEICH MIT BALKEN ─────────────────────────────────────
  const comparisons = [
    { label: 'ETF-Sparplan (MSCI World)', wert: '7 % p.a.', pct: 95, color: C.green, bgC: 'rgba(16,185,129,0.12)', borderC: 'rgba(16,185,129,0.3)' },
    { label: 'Gold (historisch)', wert: '~6 % p.a.', pct: 68, color: C.gold, bgC: 'rgba(245,158,11,0.08)', borderC: 'rgba(245,158,11,0.3)' },
    { label: 'Tagesgeld (aktuell)', wert: '4,25 % p.a.', pct: 55, color: C.textSoft, bgC: C.cardBg, borderC: 'rgba(255,255,255,0.15)' },
    { label: 'Inflationsanleihe', wert: 'Inflation +0,2 %', pct: 28, color: 'rgba(255,255,255,0.5)', bgC: 'rgba(255,255,255,0.05)', borderC: 'rgba(255,255,255,0.1)' },
    { label: 'Sparbuch', wert: '0,5 % p.a.', pct: 5, color: C.red, bgC: 'rgba(239,68,68,0.08)', borderC: 'rgba(239,68,68,0.2)' },
  ];

  const slide5 = slideRoot(C.bg, [
    topBar(),
    badge('DER VERGLEICH'),
    headline('Inflationsschutz-Kraft im Vergleich', 54),
    subline('Langfristige Rendite — wer schlägt 2,5 % Inflation?'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '10px' } },
      ...comparisons.map(item =>
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', padding: '12px 20px', backgroundColor: item.bgC, borderRadius: '14px', border: `1px solid ${item.borderC}` } },
          h('div', { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } },
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: item.color, fontFamily: 'Outfit' } }, item.label),
            h('span', { style: { fontSize: '22px', fontWeight: 700, color: item.color, fontFamily: 'Outfit' } }, item.wert)
          ),
          h('div', { style: { display: 'flex', height: '7px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${item.pct}%`, height: '7px', backgroundColor: item.color, borderRadius: '4px' } })
          )
        )
      )
    ),
    keyLearning('Tagesgeld: ideal für den Notgroschen. ETF: ideal für Vermögensaufbau.'),
    igHandle(),
  ]);

  // ─── SLIDE 6: TAKEAWAYS ───────────────────────────────────────────────────────
  const learnings = [
    { num: '01', text: 'Notgroschen (3 Monatsgehälter) ins Tagesgeld — 4,25 % sichern die Reserve', pct: 33 },
    { num: '02', text: 'ETF-Sparplan ab 25 EUR/Monat starten — langfristig schlägt er jede Inflation', pct: 66 },
    { num: '03', text: '5-10 % des Portfolios in Gold als Absicherung — z.B. via XETRA-GOLD ETF', pct: 100 },
  ];

  const slide6 = slideRoot(C.bgDark, [
    topBar(),
    badge('DEINE TAKEAWAYS'),
    headline('So schützt du 10.000 EUR wirklich', 56),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px',
            padding: '24px 28px', backgroundColor: C.cardBg, borderRadius: '18px'
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', { style: { fontSize: '40px', fontWeight: 800, color: l.pct === 100 ? C.green : C.text, minWidth: '60px', fontFamily: 'Outfit' } }, l.num),
            h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.text, lineHeight: '1.3', fontFamily: 'Outfit' } }, l.text)
          ),
          h('div', { style: { display: 'flex', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${l.pct}%`, height: '6px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px' } })
          )
        )
      ),
      h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '14px', padding: '18px 24px', border: '1px solid rgba(16,185,129,0.25)' } },
        h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.green, flexShrink: '0' } }),
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.3', fontFamily: 'Outfit' } }, 'Das Ziel: Inflation dauerhaft schlagen — mit einem Mix aus allen drei.')
      )
    ),
    igHandle(),
  ]);

  // ─── SLIDE 7: CTA ─────────────────────────────────────────────────────────────
  const slide7 = slideRoot(C.bg, [
    h('div', { style: { display: 'flex', flexDirection: 'column', flex: '1', alignItems: 'center', justifyContent: 'center', gap: '28px' } },
      h('img', { src: logoB64, width: 130, height: 130, style: { borderRadius: '24px', objectFit: 'cover' } }),
      badge('JETZT HANDELN'),
      h('span', {
        style: {
          fontSize: '48px', fontWeight: 800, color: C.text,
          lineHeight: '1.15', letterSpacing: '-1.5px', textAlign: 'center',
          maxWidth: '860px', fontFamily: 'Outfit'
        }
      }, 'Wie schützt du gerade dein Geld vor Inflation?'),
      h('span', {
        style: { fontSize: '28px', fontWeight: 500, color: C.textMuted, textAlign: 'center', fontFamily: 'Outfit' }
      }, 'Schreib es in die Kommentare'),
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '12px', marginTop: '8px' } },
        h('div', { style: { display: 'flex', backgroundColor: C.cardBg, borderRadius: '50px', padding: '12px 24px', border: '1px solid rgba(255,255,255,0.15)' } },
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.text, fontFamily: 'Outfit' } }, 'ETF-Sparplan')
        ),
        h('div', { style: { display: 'flex', backgroundColor: C.cardBg, borderRadius: '50px', padding: '12px 24px', border: '1px solid rgba(255,255,255,0.15)' } },
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.text, fontFamily: 'Outfit' } }, 'Gold')
        ),
        h('div', { style: { display: 'flex', backgroundColor: C.cardBg, borderRadius: '50px', padding: '12px 24px', border: '1px solid rgba(255,255,255,0.15)' } },
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.text, fontFamily: 'Outfit' } }, 'Tagesgeld')
        )
      )
    ),
    h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' } },
      h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textMuted, fontFamily: 'Outfit' } }, 'Folge uns für mehr Finanzwissen:'),
      h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text, fontFamily: 'Outfit' } }, '@benarofinanzen')
    ),
  ]);

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(OUTPUT_DIR, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} generiert: ${pngPath}`);
  }

  console.log('\nAlle Slides erfolgreich generiert!');
  console.log(`Ausgabe: ${OUTPUT_DIR}`);
}

main().catch(e => {
  console.error('Fehler:', e);
  process.exit(1);
});
