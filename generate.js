const fs = require('fs');
const path = require('path');
const satori = require('satori').default;
const { Resvg } = require('@resvg/resvg-js');

const TODAY = '2026-11-02';
const OUT_DIR = path.join(__dirname, `output/carousel_${TODAY}/slides`);
fs.mkdirSync(OUT_DIR, { recursive: true });

const fontDir = path.join(__dirname, 'node_modules/@fontsource/outfit/files');
const fonts = [400, 500, 600, 700, 800].flatMap(w => [
  { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(`${fontDir}/outfit-latin-${w}-normal.woff`) },
  { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(`${fontDir}/outfit-latin-ext-${w}-normal.woff`) },
]);

const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
  path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')
).toString('base64');

const C = {
  bg: '#001f60',
  text: '#FFFFFF',
  cardBg: 'rgba(255,255,255,0.10)',
  cardBgStrong: 'rgba(255,255,255,0.15)',
  green: '#10B981',
  red: '#EF4444',
  yellow: '#F59E0B',
  dim: 'rgba(255,255,255,0.55)',
  border: 'rgba(255,255,255,0.18)',
};

const W = 1080;
const H = 1350;

function logo(size = 80) {
  return {
    type: 'img',
    props: {
      src: logoB64,
      width: size,
      height: size,
      style: { borderRadius: 12, flexShrink: 0 },
    },
  };
}

function badge(text, color = C.green) {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        background: color,
        borderRadius: 20,
        padding: '6px 18px',
        alignSelf: 'flex-start',
      },
      children: [{
        type: 'span',
        props: {
          style: { fontFamily: 'Outfit', fontWeight: 700, fontSize: 20, color: '#fff', letterSpacing: 2 },
          children: text,
        },
      }],
    },
  };
}

function keyLearning(text, accentColor = C.green) {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 14,
        background: C.cardBg,
        borderRadius: 14,
        padding: '18px 22px',
        marginTop: 8,
      },
      children: [
        {
          type: 'div',
          props: {
            style: { width: 4, minHeight: 40, background: accentColor, borderRadius: 4, flexShrink: 0, marginTop: 2 },
          },
        },
        {
          type: 'span',
          props: {
            style: { fontFamily: 'Outfit', fontWeight: 500, fontSize: 22, color: C.text, lineHeight: 1.45 },
            children: text,
          },
        },
      ],
    },
  };
}

function footer() {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
      },
      children: [
        {
          type: 'span',
          props: {
            style: { fontFamily: 'Outfit', fontWeight: 500, fontSize: 20, color: C.dim },
            children: '@benarofinanzen',
          },
        },
        logo(64),
      ],
    },
  };
}

function slide(children) {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: W,
        height: H,
        background: C.bg,
        padding: '52px 56px 44px',
        fontFamily: 'Outfit',
        boxSizing: 'border-box',
      },
      children,
    },
  };
}

function card(content, style = {}) {
  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        background: C.cardBg,
        borderRadius: 18,
        padding: '28px 28px',
        ...style,
      },
      children: Array.isArray(content) ? content : [content],
    },
  };
}

async function renderSlide(jsx, filename) {
  const svg = await satori(jsx, { width: W, height: H, fonts });
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
  const png = resvg.render().asPng();
  const outPath = path.join(OUT_DIR, filename);
  fs.writeFileSync(outPath, png);
  console.log(`✓ ${filename}`);
}

// ─────────────────────────────────────────────
// SLIDE 1 — HOOK
// ─────────────────────────────────────────────
async function slide01() {
  const jsx = slide([
    // Header row
    {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36 },
        children: [
          badge('JETZT ENTSCHEIDEN'),
          logo(80),
        ],
      },
    },
    // Headline — big hook
    {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 28 },
        children: [
          {
            type: 'span',
            props: {
              style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 68, color: C.text, lineHeight: 1.1 },
              children: 'Dein Weihnachts-geld schläft —',
            },
          },
          {
            type: 'span',
            props: {
              style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 68, color: C.green, lineHeight: 1.1 },
              children: 'oder arbeitet.',
            },
          },
        ],
      },
    },
    // Subline
    {
      type: 'span',
      props: {
        style: { fontFamily: 'Outfit', fontWeight: 400, fontSize: 26, color: C.dim, lineHeight: 1.45, marginBottom: 28 },
        children: 'Was du in den nächsten Wochen entscheidest, entscheidet über dein Vermögen in 20 Jahren.',
      },
    },
    // Visual: Two contrast cards
    {
      type: 'div',
      props: {
        style: { display: 'flex', flex: 1, flexDirection: 'row', gap: 20, alignItems: 'stretch' },
        children: [
          // Sleeping card
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                background: 'rgba(239,68,68,0.18)',
                border: `2px solid ${C.red}`,
                borderRadius: 20,
                padding: '28px 24px',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      width: 72,
                      height: 72,
                      background: C.red,
                      borderRadius: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    children: [{
                      type: 'span',
                      props: { style: { fontSize: 36 }, children: '😴' },
                    }],
                  },
                },
                { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 700, fontSize: 26, color: C.red, textAlign: 'center' }, children: 'Ausgegeben' } },
                { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 400, fontSize: 20, color: C.dim, textAlign: 'center', lineHeight: 1.4 }, children: 'Shopping, Urlaub, Konsum — weg.' } },
                { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 30, color: C.red }, children: '= 0 € Gewinn' } },
              ],
            },
          },
          // Working card
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                background: 'rgba(16,185,129,0.18)',
                border: `2px solid ${C.green}`,
                borderRadius: 20,
                padding: '28px 24px',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      width: 72,
                      height: 72,
                      background: C.green,
                      borderRadius: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    children: [{
                      type: 'span',
                      props: { style: { fontSize: 36 }, children: '📈' },
                    }],
                  },
                },
                { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 700, fontSize: 26, color: C.green, textAlign: 'center' }, children: 'Investiert' } },
                { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 400, fontSize: 20, color: C.dim, textAlign: 'center', lineHeight: 1.4 }, children: 'ETF, Altersvorsorge, Sicherheit.' } },
                { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 30, color: C.green }, children: '= Vermögen' } },
              ],
            },
          },
        ],
      },
    },
    { type: 'div', props: { style: { height: 20 } } },
    footer(),
  ]);
  await renderSlide(jsx, 'slide-01.png');
}

// ─────────────────────────────────────────────
// SLIDE 2 — AKT 1: Die Realität (Bar Chart)
// ─────────────────────────────────────────────
async function slide02() {
  const bars = [
    { label: 'Shopping & Konsum', pct: 38, color: C.red },
    { label: 'Urlaub & Reisen', pct: 19, color: C.yellow },
    { label: 'Ausgehen & Essen', pct: 16, color: C.yellow },
    { label: 'Investieren & Sparen', pct: 27, color: C.green },
  ];

  const jsx = slide([
    {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
        children: [badge('DIE REALITÄT'), logo(72)],
      },
    },
    {
      type: 'span',
      props: {
        style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 48, color: C.text, lineHeight: 1.15, marginBottom: 8 },
        children: '73 % geben ihr Weihnachts-geld sofort aus',
      },
    },
    {
      type: 'span',
      props: {
        style: { fontFamily: 'Outfit', fontWeight: 400, fontSize: 22, color: C.dim, marginBottom: 32 },
        children: 'So verwenden Deutsche ihr Weihnachtsgeld:',
      },
    },
    // Bar chart
    {
      type: 'div',
      props: {
        style: { display: 'flex', flex: 1, flexDirection: 'column', gap: 22, justifyContent: 'center' },
        children: bars.map(b => ({
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: 8 },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
                  children: [
                    { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 600, fontSize: 22, color: C.text }, children: b.label } },
                    { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 700, fontSize: 22, color: b.color }, children: `${b.pct} %` } },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', width: '100%', height: 18, background: 'rgba(255,255,255,0.10)', borderRadius: 9 },
                  children: [{
                    type: 'div',
                    props: {
                      style: { display: 'flex', width: `${b.pct}%`, height: 18, background: b.color, borderRadius: 9 },
                    },
                  }],
                },
              },
            ],
          },
        })),
      },
    },
    { type: 'div', props: { style: { height: 16 } } },
    keyLearning('Nur 27 % investieren ihr Weihnachtsgeld — obwohl es das einfachste Investment des Jahres ist.', C.green),
    { type: 'div', props: { style: { height: 12 } } },
    footer(),
  ]);
  await renderSlide(jsx, 'slide-02.png');
}

// ─────────────────────────────────────────────
// SLIDE 3 — AKT 1: Der echte Preis (Vergleich)
// ─────────────────────────────────────────────
async function slide03() {
  const jsx = slide([
    {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
        children: [badge('DER ECHTE PREIS', C.red), logo(72)],
      },
    },
    {
      type: 'span',
      props: {
        style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 46, color: C.text, lineHeight: 1.2, marginBottom: 6 },
        children: '2.500 € ausgegeben =',
      },
    },
    {
      type: 'span',
      props: {
        style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 46, color: C.red, lineHeight: 1.2, marginBottom: 28 },
        children: '9.676 € verloren',
      },
    },
    // Two comparison cards
    {
      type: 'div',
      props: {
        style: { display: 'flex', flex: 1, flexDirection: 'row', gap: 24, alignItems: 'stretch' },
        children: [
          // Left: Ausgegeben
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                background: 'rgba(239,68,68,0.15)',
                border: `2px solid ${C.red}`,
                borderRadius: 20,
                padding: '28px 24px',
                gap: 16,
              },
              children: [
                { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 700, fontSize: 20, color: C.red, letterSpacing: 1 }, children: 'AUSGEGEBEN' } },
                { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 52, color: C.red }, children: '2.500 €' } },
                { type: 'div', props: { style: { display: 'flex', height: 2, background: C.red, borderRadius: 2, opacity: 0.4 } } },
                { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 600, fontSize: 20, color: C.dim, lineHeight: 1.45 }, children: 'Shopping, Urlaub, Konsum' } },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', marginTop: 'auto', background: 'rgba(239,68,68,0.25)', borderRadius: 12, padding: '12px 16px' },
                    children: [
                      { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 700, fontSize: 22, color: C.text }, children: 'nach 20 Jahren:' } },
                    ],
                  },
                },
                { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 40, color: C.red }, children: '2.500 €' } },
                { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 500, fontSize: 19, color: C.dim }, children: '(Kaufkraft gesunken!)' } },
              ],
            },
          },
          // Right: Investiert
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                background: 'rgba(16,185,129,0.15)',
                border: `2px solid ${C.green}`,
                borderRadius: 20,
                padding: '28px 24px',
                gap: 16,
              },
              children: [
                { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 700, fontSize: 20, color: C.green, letterSpacing: 1 }, children: 'INVESTIERT IN ETF' } },
                { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 52, color: C.green }, children: '2.500 €' } },
                { type: 'div', props: { style: { display: 'flex', height: 2, background: C.green, borderRadius: 2, opacity: 0.4 } } },
                { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 600, fontSize: 20, color: C.dim, lineHeight: 1.45 }, children: '7 % p.a. Zinseszins' } },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', marginTop: 'auto', background: 'rgba(16,185,129,0.25)', borderRadius: 12, padding: '12px 16px' },
                    children: [
                      { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 700, fontSize: 22, color: C.text }, children: 'nach 20 Jahren:' } },
                    ],
                  },
                },
                { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 40, color: C.green }, children: '9.676 €' } },
                { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 500, fontSize: 19, color: C.dim }, children: '+7.176 € ohne Mehrarbeit' } },
              ],
            },
          },
        ],
      },
    },
    { type: 'div', props: { style: { height: 16 } } },
    keyLearning('Nicht investieren kostet dich 7.176 € — ohne dass du auch nur einen Tag mehr arbeitest.', C.red),
    { type: 'div', props: { style: { height: 12 } } },
    footer(),
  ]);
  await renderSlide(jsx, 'slide-03.png');
}

// ─────────────────────────────────────────────
// SLIDE 4 — AKT 2: Option 1 — ETF-Einmalanlage
// ─────────────────────────────────────────────
async function slide04() {
  const steps = [
    { label: 'Broker auswählen', detail: 'Consorsbank, Trade Republic, Scalable' },
    { label: 'MSCI World ETF wählen', detail: 'z. B. iShares Core MSCI World' },
    { label: 'Einmalanlagene tätigen', detail: 'Auf Sparplan oder direkt kaufen' },
    { label: 'Liegen lassen', detail: 'Nicht täglich schauen — Zeit arbeitet für dich' },
  ];

  const jsx = slide([
    {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
        children: [badge('OPTION 1 VON 3'), logo(72)],
      },
    },
    {
      type: 'span',
      props: {
        style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 50, color: C.text, lineHeight: 1.2, marginBottom: 4 },
        children: 'ETF-Einmalanlage',
      },
    },
    {
      type: 'span',
      props: {
        style: { fontFamily: 'Outfit', fontWeight: 700, fontSize: 32, color: C.green, lineHeight: 1.2, marginBottom: 24 },
        children: 'Der einfachste Weg',
      },
    },
    {
      type: 'div',
      props: {
        style: { display: 'flex', flex: 1, flexDirection: 'column', gap: 18, justifyContent: 'center' },
        children: steps.map((s, i) => ({
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
              background: C.cardBg,
              borderRadius: 16,
              padding: '20px 24px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    width: 44,
                    height: 44,
                    background: C.green,
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  },
                  children: [{
                    type: 'span',
                    props: { style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 22, color: '#fff' }, children: String(i + 1) },
                  }],
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column', gap: 2 },
                  children: [
                    { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 700, fontSize: 24, color: C.text }, children: s.label } },
                    { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 400, fontSize: 20, color: C.dim }, children: s.detail } },
                  ],
                },
              },
            ],
          },
        })),
      },
    },
    { type: 'div', props: { style: { height: 16 } } },
    keyLearning('Einmal anlegen, 20 Jahre liegen lassen — der Zinseszinseffekt übernimmt den Rest.', C.green),
    { type: 'div', props: { style: { height: 12 } } },
    footer(),
  ]);
  await renderSlide(jsx, 'slide-04.png');
}

// ─────────────────────────────────────────────
// SLIDE 5 — AKT 2: Option 2 — Altersvorsorge-Depot
// ─────────────────────────────────────────────
async function slide05() {
  const items = [
    { icon: '🏛️', label: 'Staatliche Förderung', value: 'bis zu 540 €/Jahr' },
    { icon: '📅', label: 'Start', value: '01. Januar 2027' },
    { icon: '💶', label: 'Kosten', value: 'nur ~0,1 % p.a. (ETF)' },
    { icon: '👨‍👩‍👧', label: 'Eltern extra', value: '+300 €/Jahr je Kind' },
  ];

  const jsx = slide([
    {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
        children: [badge('OPTION 2 VON 3'), logo(72)],
      },
    },
    {
      type: 'span',
      props: {
        style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 50, color: C.text, lineHeight: 1.2, marginBottom: 4 },
        children: 'Altersvorsorge-Depot',
      },
    },
    {
      type: 'span',
      props: {
        style: { fontFamily: 'Outfit', fontWeight: 700, fontSize: 32, color: C.green, lineHeight: 1.2, marginBottom: 24 },
        children: '+540 € vom Staat geschenkt',
      },
    },
    {
      type: 'div',
      props: {
        style: { display: 'flex', flex: 1, flexDirection: 'column', gap: 16, justifyContent: 'center' },
        children: items.map(item => ({
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
              background: C.cardBg,
              borderRadius: 16,
              padding: '20px 24px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    width: 52,
                    height: 52,
                    background: 'rgba(16,185,129,0.2)',
                    borderRadius: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: 28,
                  },
                  children: [{ type: 'span', props: { children: item.icon } }],
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column', gap: 2 },
                  children: [
                    { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 500, fontSize: 20, color: C.dim }, children: item.label } },
                    { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 700, fontSize: 26, color: C.text }, children: item.value } },
                  ],
                },
              },
            ],
          },
        })),
      },
    },
    { type: 'div', props: { style: { height: 16 } } },
    keyLearning('Ab Januar 2027 fördert der Staat deinen ETF-Sparplan mit bis zu 540 € im Jahr — jetzt schon einzahlen!', C.green),
    { type: 'div', props: { style: { height: 12 } } },
    footer(),
  ]);
  await renderSlide(jsx, 'slide-05.png');
}

// ─────────────────────────────────────────────
// SLIDE 6 — AKT 2: Option 3 — Notgroschen + ETF
// ─────────────────────────────────────────────
async function slide06() {
  const jsx = slide([
    {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
        children: [badge('OPTION 3 VON 3'), logo(72)],
      },
    },
    {
      type: 'span',
      props: {
        style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 50, color: C.text, lineHeight: 1.2, marginBottom: 4 },
        children: 'Erst absichern,',
      },
    },
    {
      type: 'span',
      props: {
        style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 50, color: C.green, lineHeight: 1.2, marginBottom: 24 },
        children: 'dann investieren',
      },
    },
    // Flow diagram
    {
      type: 'div',
      props: {
        style: { display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', gap: 20 },
        children: [
          // Step 1: Check Notgroschen
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                background: 'rgba(245,158,11,0.15)',
                border: `2px solid ${C.yellow}`,
                borderRadius: 18,
                padding: '24px 28px',
              },
              children: [
                { type: 'span', props: { style: { fontSize: 40 }, children: '🔍' } },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flexDirection: 'column', gap: 4 },
                    children: [
                      { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 700, fontSize: 22, color: C.yellow }, children: 'SCHRITT 1: Notgroschen prüfen' } },
                      { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 500, fontSize: 19, color: C.dim }, children: 'Ziel: 3 × monatliche Fixkosten auf Tagesgeld' } },
                    ],
                  },
                },
              ],
            },
          },
          // Arrow
          {
            type: 'div',
            props: {
              style: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
              children: [{ type: 'span', props: { style: { fontSize: 32, color: C.dim }, children: '↓' } }],
            },
          },
          // Step 2: Rest in ETF
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                background: 'rgba(16,185,129,0.15)',
                border: `2px solid ${C.green}`,
                borderRadius: 18,
                padding: '24px 28px',
              },
              children: [
                { type: 'span', props: { style: { fontSize: 40 }, children: '📈' } },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flexDirection: 'column', gap: 4 },
                    children: [
                      { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 700, fontSize: 22, color: C.green }, children: 'SCHRITT 2: Rest in ETF investieren' } },
                      { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 500, fontSize: 19, color: C.dim }, children: 'Alles, was über dem Notgroschen liegt' } },
                    ],
                  },
                },
              ],
            },
          },
          // Info box
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16,
                background: C.cardBg,
                borderRadius: 16,
                padding: '20px 24px',
              },
              children: [
                { type: 'span', props: { style: { fontSize: 32 }, children: '💡' } },
                { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 500, fontSize: 20, color: C.dim, lineHeight: 1.45 }, children: 'Tagesgeldkonto: bis zu 4,25 % p.a. — perfekt für den Notgroschen' } },
              ],
            },
          },
        ],
      },
    },
    { type: 'div', props: { style: { height: 16 } } },
    keyLearning('Ohne Notgroschen bist du gezwungen, schlecht zum falschen Zeitpunkt zu verkaufen — baue ihn zuerst auf.', C.yellow),
    { type: 'div', props: { style: { height: 12 } } },
    footer(),
  ]);
  await renderSlide(jsx, 'slide-06.png');
}

// ─────────────────────────────────────────────
// SLIDE 7 — AKT 3: Die smarte Aufteilung
// ─────────────────────────────────────────────
async function slide07() {
  const alloc = [
    { pct: 50, euro: '1.250 €', label: 'ETF-Einmalanlage', desc: 'MSCI World, 20 Jahre liegen lassen', color: C.green },
    { pct: 30, euro: '750 €', label: 'Altersvorsorge-Depot', desc: 'Ab Jan 2027: +540 € Förderung p.a.', color: '#3B82F6' },
    { pct: 20, euro: '500 €', label: 'Notgroschen aufstocken', desc: 'Tagesgeld bis 4,25 % p.a.', color: C.yellow },
  ];

  const jsx = slide([
    {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
        children: [badge('DEIN PLAN'), logo(72)],
      },
    },
    {
      type: 'span',
      props: {
        style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 48, color: C.text, lineHeight: 1.2, marginBottom: 6 },
        children: 'So teilst du 2.500 € clever auf',
      },
    },
    {
      type: 'span',
      props: {
        style: { fontFamily: 'Outfit', fontWeight: 400, fontSize: 22, color: C.dim, marginBottom: 28 },
        children: 'Rendite + staatliche Förderung + Sicherheit kombiniert',
      },
    },
    {
      type: 'div',
      props: {
        style: { display: 'flex', flex: 1, flexDirection: 'column', gap: 20, justifyContent: 'center' },
        children: alloc.map(a => ({
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              background: C.cardBg,
              borderRadius: 18,
              padding: '22px 24px',
              gap: 12,
              borderLeft: `5px solid ${a.color}`,
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
                  children: [
                    { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 700, fontSize: 24, color: C.text }, children: a.label } },
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center' },
                        children: [
                          { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 28, color: a.color }, children: `${a.pct} %` } },
                          { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 700, fontSize: 22, color: C.dim }, children: a.euro } },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', width: '100%', height: 10, background: 'rgba(255,255,255,0.10)', borderRadius: 5 },
                  children: [{
                    type: 'div',
                    props: { style: { display: 'flex', width: `${a.pct}%`, height: 10, background: a.color, borderRadius: 5 } },
                  }],
                },
              },
              { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 400, fontSize: 20, color: C.dim }, children: a.desc } },
            ],
          },
        })),
      },
    },
    { type: 'div', props: { style: { height: 16 } } },
    keyLearning('Diese Aufteilung kombiniert maximale Rendite, staatliche Förderung und finanzielle Sicherheit in einem Plan.', C.green),
    { type: 'div', props: { style: { height: 12 } } },
    footer(),
  ]);
  await renderSlide(jsx, 'slide-07.png');
}

// ─────────────────────────────────────────────
// SLIDE 8 — CTA
// ─────────────────────────────────────────────
async function slide08() {
  const jsx = slide([
    {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 },
        children: [badge('DEIN NÄCHSTER SCHRITT'), logo(80)],
      },
    },
    {
      type: 'div',
      props: {
        style: { display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 },
        children: [
          // Big question
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: { fontFamily: 'Outfit', fontWeight: 800, fontSize: 48, color: C.text, textAlign: 'center', lineHeight: 1.2 },
                    children: 'Lass dein Weihnachts-geld für dich arbeiten.',
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: { fontFamily: 'Outfit', fontWeight: 400, fontSize: 24, color: C.dim, textAlign: 'center', lineHeight: 1.5 },
                    children: 'Benaro analysiert deine Situation und erstellt deinen persönlichen Investitionsplan — kostenlos.',
                  },
                },
              ],
            },
          },
          // CTA chips
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', gap: 16, width: '100%' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 16,
                      background: C.green,
                      borderRadius: 18,
                      padding: '20px 28px',
                    },
                    children: [
                      { type: 'span', props: { style: { fontSize: 32 }, children: '📌' } },
                      { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 700, fontSize: 24, color: '#fff' }, children: 'Post speichern — für später' } },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 16,
                      background: C.cardBg,
                      border: `2px solid ${C.border}`,
                      borderRadius: 18,
                      padding: '20px 28px',
                    },
                    children: [
                      { type: 'span', props: { style: { fontSize: 32 }, children: '💬' } },
                      { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 600, fontSize: 22, color: C.text }, children: 'Schreib uns — wir beraten kostenlos!' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    { type: 'div', props: { style: { height: 16 } } },
    {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
        children: [
          { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 500, fontSize: 20, color: C.dim }, children: '@benarofinanzen' } },
          {
            type: 'div',
            props: {
              style: { display: 'flex', background: C.cardBg, borderRadius: 12, padding: '8px 16px' },
              children: [
                { type: 'span', props: { style: { fontFamily: 'Outfit', fontWeight: 600, fontSize: 18, color: C.green }, children: 'benarofinanzen.com' } },
              ],
            },
          },
        ],
      },
    },
  ]);
  await renderSlide(jsx, 'slide-08.png');
}

async function main() {
  console.log('Generating Benaro Instagram Carousel — 2026-11-02');
  console.log('Thema: Weihnachtsgeld 2026 — Statt ausgeben: So lässt du es für dich arbeiten\n');
  await slide01();
  await slide02();
  await slide03();
  await slide04();
  await slide05();
  await slide06();
  await slide07();
  await slide08();
  console.log('\n✅ Alle 8 Slides erfolgreich generiert!');
  console.log(`Output: ${OUT_DIR}`);
}

main().catch(err => { console.error(err); process.exit(1); });
