const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default || require('satori');
  const { Resvg } = require('@resvg/resvg-js');

  const fontDir = path.join(__dirname, 'node_modules/@fontsource/outfit/files');
  const fonts = [400, 500, 600, 700, 800].flatMap(w => [
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-${w}-normal.woff`)) },
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-ext-${w}-normal.woff`)) },
  ]);

  const C = {
    bg: '#001F61',
    text: '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted: '#9CA3AF',
    cardBg: 'rgba(255,255,255,0.1)',
    border: 'rgba(255,255,255,0.2)',
    green: '#10B981',
    red: '#EF4444',
    bgDark: '#001542',
    gold: '#F59E0B',
  };

  const W = 1080, H = 1350;

  const logoB64 = 'data:image/jpeg;base64,' +
    fs.readFileSync(path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')).toString('base64');

  const outDir = path.join(__dirname, 'output/carousel_2026-06-09/slides');
  fs.mkdirSync(outDir, { recursive: true });

  const h = (type, props, ...ch) => ({
    type,
    props: {
      ...props,
      children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch,
    },
  });

  // ── REUSABLE COMPONENTS ─────────────────────────────────────────────────────

  function slideRoot(bgColor, ...children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column',
        width: W, height: H, padding: '70px',
        backgroundColor: bgColor, fontFamily: 'Outfit',
      },
    }, ...children);
  }

  function topRow(badgeText, accentBg) {
    return h('div', {
      style: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '20px',
      },
    },
      h('span', {
        style: {
          fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: accentBg || C.cardBg,
          padding: '10px 22px', borderRadius: '12px',
        },
      }, badgeText),
      h('img', {
        src: logoB64,
        width: 100, height: 100,
        style: { borderRadius: '12px', objectFit: 'cover' },
      })
    );
  }

  function headline(text, size) {
    return h('span', {
      style: {
        fontSize: `${size || 64}px`, fontWeight: 800,
        color: C.text, lineHeight: '1.08',
        letterSpacing: '-1.5px', marginBottom: '6px',
      },
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500,
        color: C.textMuted, lineHeight: '1.5', marginTop: '8px',
      },
    }, text);
  }

  function keyLearning(text, accentColor) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px',
        padding: '22px 28px', marginTop: 'auto',
      },
    },
      h('div', {
        style: {
          display: 'flex', width: '6px', minHeight: '40px',
          backgroundColor: accentColor || C.green, borderRadius: '3px',
        },
      }),
      h('span', {
        style: {
          fontSize: '26px', fontWeight: 600,
          color: C.text, lineHeight: '1.4',
        },
      }, text)
    );
  }

  function igHandle() {
    return h('div', { style: { display: 'flex', alignItems: 'center', marginTop: '12px' } },
      h('span', {
        style: { fontSize: '22px', fontWeight: 500, color: C.textMuted },
      }, '@benarofinanzen')
    );
  }

  function visualBlock(...children) {
    return h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '14px',
      },
    }, ...children);
  }

  // ── SLIDE 1: HOOK — Das 8. Weltwunder ───────────────────────────────────────

  // SVG: Exponentialkurve Teaser (kein <text>)
  const hookCurveSvg = `<svg width="940" height="280" viewBox="0 0 940 280" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#10B981" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#10B981" stop-opacity="1"/>
      </linearGradient>
    </defs>
    <path d="M30,250 C150,245 300,230 450,200 C600,165 720,120 910,30" stroke="url(#g1)" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M30,250 C150,245 300,230 450,200 C600,165 720,120 910,30 L910,280 L30,280 Z" fill="#10B981" fill-opacity="0.08"/>
    <circle cx="910" cy="30" r="10" fill="#10B981"/>
    <circle cx="30" cy="250" r="7" fill="rgba(255,255,255,0.5)"/>
  </svg>`;
  const hookCurveSrc = `data:image/svg+xml;base64,${Buffer.from(hookCurveSvg).toString('base64')}`;

  const slide1 = slideRoot(C.bgDark,
    topRow('8. WELTWUNDER', 'rgba(16,185,129,0.25)'),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
        headline('Das Geheimnis,', 66),
        headline('das Banken nicht', 66),
        headline('wollen, dass du', 66),
        headline('es kennst.', 66),
      ),
      h('span', {
        style: {
          fontSize: '30px', fontWeight: 500,
          color: C.textMuted, lineHeight: '1.5', marginTop: '8px',
        },
      }, 'Wie 100 EUR im Monat zu 121.997 EUR werden'),
      h('img', {
        src: hookCurveSrc,
        width: 940, height: 280,
        style: { marginTop: '10px', objectFit: 'contain' },
      }),
      h('div', { style: { display: 'flex', alignItems: 'baseline', gap: '16px', marginTop: '8px' } },
        h('span', { style: { fontSize: '28px', fontWeight: 500, color: C.textMuted } }, 'Eingezahlt:'),
        h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.text } }, '36.000 EUR'),
        h('span', { style: { fontSize: '28px', fontWeight: 500, color: C.textMuted } }, 'Ergebnis:'),
        h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.green } }, '121.997 EUR'),
      ),
    ),
    keyLearning('Zinseszins – Albert Einstein nannte ihn das 8. Weltwunder', C.green),
    igHandle(),
  );

  // ── SLIDE 2: PROBLEM — Deutschland schläft ──────────────────────────────────

  const slide2 = slideRoot(C.bg,
    topRow('SO LÄUFT ES GERADE', C.cardBg),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' } },
        headline('Deutschland schläft', 58),
        headline('auf seinem Geld.', 58),
      ),
      h('div', { style: { display: 'flex', gap: '20px' } },
        // Card links: Girokonto
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', flex: '1',
            backgroundColor: 'rgba(239,68,68,0.15)', borderRadius: '20px',
            padding: '36px 28px', gap: '12px',
            border: '2px solid rgba(239,68,68,0.4)',
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.red, letterSpacing: '2px' } }, 'GIROKONTO'),
          h('span', { style: { fontSize: '60px', fontWeight: 800, color: C.text, lineHeight: '1' } }, '0,1%'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Zinsen pro Jahr'),
          h('div', { style: { display: 'flex', height: '2px', backgroundColor: 'rgba(239,68,68,0.4)', borderRadius: '1px' } }),
          h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textSoft } }, 'nach 30 Jahren:'),
          h('span', { style: { fontSize: '38px', fontWeight: 800, color: C.red } }, '38.110 EUR'),
          h('span', { style: { fontSize: '18px', fontWeight: 500, color: C.textMuted } }, 'bei 100 EUR/Monat'),
        ),
        // Card rechts: ETF
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', flex: '1',
            backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '20px',
            padding: '36px 28px', gap: '12px',
            border: '2px solid rgba(16,185,129,0.4)',
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.green, letterSpacing: '2px' } }, 'WORLD-ETF'),
          h('span', { style: { fontSize: '60px', fontWeight: 800, color: C.text, lineHeight: '1' } }, '7%'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Rendite pro Jahr (hist.)'),
          h('div', { style: { display: 'flex', height: '2px', backgroundColor: 'rgba(16,185,129,0.4)', borderRadius: '1px' } }),
          h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textSoft } }, 'nach 30 Jahren:'),
          h('span', { style: { fontSize: '38px', fontWeight: 800, color: C.green } }, '121.997 EUR'),
          h('span', { style: { fontSize: '18px', fontWeight: 500, color: C.textMuted } }, 'bei 100 EUR/Monat'),
        ),
      ),
    ),
    keyLearning('Ø-Deutscher lässt 83.887 EUR Rendite auf dem Tisch liegen', C.red),
    igHandle(),
  );

  // ── SLIDE 3: ESKALATION — Balkendiagramm ────────────────────────────────────

  // SVG Balkendiagramm (kein <text>)
  const barSvg = `<svg width="860" height="320" viewBox="0 0 860 320" xmlns="http://www.w3.org/2000/svg">
    <rect x="60" y="200" width="220" height="100" rx="10" fill="rgba(239,68,68,0.7)"/>
    <rect x="580" y="50" width="220" height="250" rx="10" fill="rgba(16,185,129,0.85)"/>
    <line x1="30" y1="310" x2="830" y2="310" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  </svg>`;
  const barSrc = `data:image/svg+xml;base64,${Buffer.from(barSvg).toString('base64')}`;

  const slide3 = slideRoot(C.bg,
    topRow('HARTE ZAHLEN', C.cardBg),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px' } },
        headline('100 EUR/Monat,', 60),
        headline('30 Jahre lang.', 60),
        subline('Was unterscheidet Sparbuch von ETF?'),
      ),
      h('div', { style: { display: 'flex', position: 'relative' } },
        h('img', { src: barSrc, width: 860, height: 320, style: { objectFit: 'contain' } }),
      ),
      h('div', { style: { display: 'flex', gap: '40px', justifyContent: 'space-around', marginTop: '-10px' } },
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' } },
          h('span', { style: { fontSize: '18px', fontWeight: 600, color: C.textMuted, letterSpacing: '2px' } }, 'SPARBUCH (1%)'),
          h('span', { style: { fontSize: '46px', fontWeight: 800, color: C.red } }, '38.110 EUR'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' } },
          h('span', { style: { fontSize: '18px', fontWeight: 600, color: C.textMuted, letterSpacing: '2px' } }, 'WORLD-ETF (7%)'),
          h('span', { style: { fontSize: '46px', fontWeight: 800, color: C.green } }, '121.997 EUR'),
        ),
      ),
      h('div', {
        style: {
          display: 'flex', justifyContent: 'center', marginTop: '12px',
          backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '14px', padding: '18px 28px',
        },
      },
        h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.text } }, 'Eingezahlt: nur 36.000 EUR'),
      ),
    ),
    keyLearning('83.887 EUR Unterschied – allein durch Zinseszins', C.green),
    igHandle(),
  );

  // ── SLIDE 4: ERKLÄRUNG — Der Schneeball-Effekt ──────────────────────────────

  // Exponentialkurve mit Jahresmarkierungen
  const growthSvg = `<svg width="880" height="360" viewBox="0 0 880 360" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gLine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#10B981" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#10B981" stop-opacity="1"/>
      </linearGradient>
      <linearGradient id="gFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#10B981" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#10B981" stop-opacity="0.02"/>
      </linearGradient>
    </defs>
    <path d="M40,340 L200,330 L360,310 L520,270 L680,200 L840,50" stroke="url(#gLine)" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M40,340 L200,330 L360,310 L520,270 L680,200 L840,50 L840,350 L40,350 Z" fill="url(#gFill)"/>
    <line x1="40" y1="350" x2="40" y2="340" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    <line x1="200" y1="350" x2="200" y2="330" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    <line x1="360" y1="350" x2="360" y2="310" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    <line x1="520" y1="350" x2="520" y2="270" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    <line x1="680" y1="350" x2="680" y2="200" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    <line x1="840" y1="350" x2="840" y2="50" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    <circle cx="840" cy="50" r="10" fill="#10B981"/>
    <circle cx="680" cy="200" r="7" fill="rgba(16,185,129,0.7)"/>
    <circle cx="520" cy="270" r="6" fill="rgba(16,185,129,0.5)"/>
    <line x1="40" y1="350" x2="840" y2="350" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
  </svg>`;
  const growthSrc = `data:image/svg+xml;base64,${Buffer.from(growthSvg).toString('base64')}`;

  const slide4 = slideRoot(C.bg,
    topRow('SO FUNKTIONIERT ES', C.cardBg),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' } },
        headline('Der Schneeball', 60),
        headline('rollt bergab.', 60),
      ),
      h('img', { src: growthSrc, width: 880, height: 360, style: { objectFit: 'contain' } }),
      h('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: '-8px', paddingLeft: '20px', paddingRight: '20px' } },
        h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted } }, 'Jahr 0'),
        h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted } }, 'Jahr 6'),
        h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted } }, 'Jahr 12'),
        h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted } }, 'Jahr 18'),
        h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted } }, 'Jahr 24'),
        h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.green } }, 'Jahr 30'),
      ),
      h('div', {
        style: {
          display: 'flex', gap: '14px', marginTop: '20px',
          backgroundColor: C.cardBg, borderRadius: '16px', padding: '24px 28px',
        },
      },
        h('div', { style: { display: 'flex', width: '6px', backgroundColor: C.green, borderRadius: '3px', minHeight: '60px' } }),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
          h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.text } }, 'Wie der Schneeball entsteht:'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.5' } }, 'Zinsen werden reinvestiert und selbst verzinst. Im letzten Jahr wachsen die Zinsen schneller als in den ersten 10 Jahren zusammen.'),
        ),
      ),
    ),
    keyLearning('Im 30. Jahr erwirtschaftet der ETF allein 7.700 EUR Zinsen', C.green),
    igHandle(),
  );

  // ── SLIDE 5: HEBEL — 4 Faktoren entscheiden alles ───────────────────────────

  function hebelCard(label, value, desc, color) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column', flex: '1',
        backgroundColor: C.cardBg, borderRadius: '18px',
        padding: '28px 22px', gap: '10px',
        border: `2px solid ${color}30`,
      },
    },
      h('div', { style: { display: 'flex', width: '40px', height: '40px', borderRadius: '10px', backgroundColor: `${color}25`, alignItems: 'center', justifyContent: 'center' } },
        h('div', { style: { display: 'flex', width: '20px', height: '20px', borderRadius: '4px', backgroundColor: color } }),
      ),
      h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.text } }, value),
      h('span', { style: { fontSize: '18px', fontWeight: 700, color, letterSpacing: '1.5px' } }, label),
      h('span', { style: { fontSize: '18px', fontWeight: 400, color: C.textMuted, lineHeight: '1.4' } }, desc),
    );
  }

  const slide5 = slideRoot(C.bg,
    topRow('DEINE STELLSCHRAUBEN', C.cardBg),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' } },
        headline('4 Faktoren', 62),
        headline('entscheiden alles.', 62),
      ),
      h('div', { style: { display: 'flex', gap: '20px', marginBottom: '16px' } },
        hebelCard('ZEIT', '30 Jahre', '10 Jahre frueher starten = fast doppelter Betrag', C.gold),
        hebelCard('BETRAG', '100+ EUR', 'Mehr einzahlen = direkter Schub vom ersten Tag', C.green),
      ),
      h('div', { style: { display: 'flex', gap: '20px' } },
        hebelCard('RENDITE', '7% p.a.', 'Breit diversifizierter ETF schlaegt Sparbuch um Faktor 3', C.text),
        hebelCard('FREQUENZ', 'Monatlich', 'Regelmaessig einzahlen nutzt den Cost-Average-Effekt', '#9CA3AF'),
      ),
    ),
    keyLearning('Zeit ist der einzige Faktor den du nicht kaufen kannst', C.gold),
    igHandle(),
  );

  // ── SLIDE 6: ZEITVORTEIL — 10 Jahre früher = 140.000 EUR mehr ───────────────

  const slide6 = slideRoot(C.bg,
    topRow('KRASSE REALITÄT', 'rgba(239,68,68,0.2)'),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '28px' } },
        headline('10 Jahre frueher', 58),
        headline('= 140.000 EUR mehr.', 58),
      ),
      h('div', { style: { display: 'flex', gap: '24px' } },
        // Start mit 25
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', flex: '1',
            backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '20px',
            padding: '32px 24px', gap: '10px',
            border: '2px solid rgba(16,185,129,0.4)',
          },
        },
          h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.green, letterSpacing: '2px' } }, 'START MIT 25'),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, '40 Jahre x 100 EUR'),
          ),
          h('span', { style: { fontSize: '56px', fontWeight: 800, color: C.green, lineHeight: '1' } }, '261.781'),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, 'EUR'),
          h('div', { style: { display: 'flex', height: '2px', backgroundColor: 'rgba(16,185,129,0.4)', borderRadius: '1px', marginTop: '8px' } }),
          h('span', { style: { fontSize: '18px', fontWeight: 500, color: C.textMuted } }, 'Eingezahlt: 48.000 EUR'),
          h('span', { style: { fontSize: '18px', fontWeight: 700, color: C.green } }, 'Zinsen: 213.781 EUR'),
        ),
        // Start mit 35
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', flex: '1',
            backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '20px',
            padding: '32px 24px', gap: '10px',
            border: '2px solid rgba(239,68,68,0.25)',
          },
        },
          h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.red, letterSpacing: '2px' } }, 'START MIT 35'),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, '30 Jahre x 100 EUR'),
          ),
          h('span', { style: { fontSize: '56px', fontWeight: 800, color: C.red, lineHeight: '1' } }, '121.997'),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, 'EUR'),
          h('div', { style: { display: 'flex', height: '2px', backgroundColor: 'rgba(239,68,68,0.3)', borderRadius: '1px', marginTop: '8px' } }),
          h('span', { style: { fontSize: '18px', fontWeight: 500, color: C.textMuted } }, 'Eingezahlt: 36.000 EUR'),
          h('span', { style: { fontSize: '18px', fontWeight: 700, color: C.red } }, 'Zinsen: 85.997 EUR'),
        ),
      ),
      h('div', {
        style: {
          display: 'flex', justifyContent: 'center', marginTop: '20px',
          backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '14px', padding: '18px 28px',
        },
      },
        h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, '10 Jahre Differenz = 139.784 EUR Unterschied'),
      ),
    ),
    keyLearning('Jedes Jahr Warten kostet dich im Schnitt 13.978 EUR', C.red),
    igHandle(),
  );

  // ── SLIDE 7: LÖSUNG — Dein 3-Schritt-Startplan ──────────────────────────────

  function stepCard(num, title, desc, color) {
    return h('div', {
      style: {
        display: 'flex', gap: '20px', alignItems: 'flex-start',
        backgroundColor: C.cardBg, borderRadius: '18px',
        padding: '28px 28px', border: `1px solid ${color}40`,
      },
    },
      h('div', {
        style: {
          display: 'flex', minWidth: '54px', height: '54px',
          borderRadius: '14px', backgroundColor: `${color}20`,
          border: `2px solid ${color}`,
          alignItems: 'center', justifyContent: 'center',
        },
      },
        h('span', { style: { fontSize: '28px', fontWeight: 800, color } }, num),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, title),
        h('span', { style: { fontSize: '21px', fontWeight: 400, color: C.textMuted, lineHeight: '1.4' } }, desc),
      ),
    );
  }

  const slide7 = slideRoot(C.bg,
    topRow('DEIN 3-SCHRITT-PLAN', 'rgba(16,185,129,0.2)'),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '28px' } },
        headline('So startest du', 62),
        headline('noch diese Woche.', 62),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
        stepCard('1', 'Depot eroeffnen', 'Kostenfreies Depot bei einem ETF-Broker: Neobroker (Trade Republic, Scalable) oder Direktbank (ING, DKB)', C.green),
        stepCard('2', 'Sparplan einrichten', 'MSCI World oder FTSE All-World ETF als monatlichen Sparplan ab 25-100 EUR einrichten', C.gold),
        stepCard('3', 'Automatisieren & vergessen', 'Lastschrift einrichten, Freistellungsauftrag stellen – dann den Zinseszins fuer sich arbeiten lassen', C.text),
      ),
    ),
    keyLearning('Benaro Finanzen hilft dir den richtigen Einstieg zu finden', C.green),
    igHandle(),
  );

  // ── SLIDE 8: CTA ─────────────────────────────────────────────────────────────

  // Circular progress / big logo slide
  const ctaSvg = `<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
    <circle cx="150" cy="150" r="130" stroke="rgba(255,255,255,0.08)" stroke-width="20" fill="none"/>
    <path d="M150,20 A130,130 0 1,1 149.99,20" stroke="#10B981" stroke-width="20" fill="none" stroke-linecap="round" stroke-dasharray="800" stroke-dashoffset="50"/>
    <circle cx="150" cy="150" r="100" fill="rgba(16,185,129,0.08)"/>
  </svg>`;
  const ctaSrc = `data:image/svg+xml;base64,${Buffer.from(ctaSvg).toString('base64')}`;

  const slide8 = slideRoot(C.bgDark,
    topRow('KOSTENLOSES ERSTGESPRÄCH', 'rgba(16,185,129,0.25)'),
    visualBlock(
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0px',
        },
      },
        h('div', { style: { display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center', width: '300px', height: '300px' } },
          h('img', { src: ctaSrc, width: 300, height: 300, style: { position: 'absolute', top: '0', left: '0' } }),
          h('img', {
            src: logoB64,
            width: 160, height: 160,
            style: { borderRadius: '24px', objectFit: 'cover', position: 'absolute' },
          }),
        ),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginTop: '20px' } },
        headline('Bereit fuer', 56),
        headline('deinen Zinseszins?', 56),
        h('span', {
          style: {
            fontSize: '28px', fontWeight: 500,
            color: C.textMuted, lineHeight: '1.5', textAlign: 'center',
          },
        }, 'Folge @benarofinanzen fuer taegliche Finanztipps – kostenlos und ohne Jargon'),
      ),
      h('div', { style: { display: 'flex', gap: '16px', marginTop: '16px', justifyContent: 'center' } },
        h('div', {
          style: {
            display: 'flex', backgroundColor: C.green,
            borderRadius: '14px', padding: '18px 32px',
          },
        },
          h('span', { style: { fontSize: '24px', fontWeight: 700, color: '#001F61' } }, 'Link in Bio – Erstgespraech'),
        ),
      ),
    ),
    h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px' } },
      h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.green } }, '@benarofinanzen'),
    ),
  );

  // ── RENDER ALL SLIDES ────────────────────────────────────────────────────────

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} gespeichert: ${pngPath}`);
  }

  console.log('\nAlle 8 Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
