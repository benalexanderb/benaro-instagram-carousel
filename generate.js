const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default;
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
  };

  const W = 1080;
  const H = 1350;
  const PAD = 70;

  const logoPath = path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg');
  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(logoPath).toString('base64');

  const TODAY = '2026-09-06';
  const outDir = path.join(__dirname, `output/carousel_${TODAY}/slides`);
  fs.mkdirSync(outDir, { recursive: true });

  const h = (type, props, ...ch) => ({
    type,
    props: {
      ...props,
      children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch,
    },
  });

  function logo() {
    return h('img', {
      src: logoB64,
      width: 120,
      height: 120,
      style: { borderRadius: '12px', objectFit: 'cover' },
    });
  }

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '16px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: C.cardBg,
          padding: '10px 22px', borderRadius: '12px',
        },
      }, text),
    );
  }

  function headline(text, size = 64) {
    return h('span', {
      style: {
        fontSize: `${size}px`, fontWeight: 800,
        color: C.text, lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '6px',
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

  function keyLearning(text, accent) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px', marginTop: 'auto',
      },
    },
      h('div', {
        style: {
          display: 'flex', width: '6px', minHeight: '40px',
          backgroundColor: accent || C.text, borderRadius: '3px',
        },
      }),
      h('span', {
        style: { fontSize: '28px', fontWeight: 600, color: C.text, lineHeight: '1.4' },
      }, text),
    );
  }

  function igHandle() {
    return h('div', { style: { display: 'flex', alignItems: 'center', marginTop: '16px' } },
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, '@benarofinanzen'),
    );
  }

  function slideRoot(children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column',
        width: W, height: H, padding: `${PAD}px`,
        backgroundColor: C.bg, fontFamily: 'Outfit',
      },
    }, ...children);
  }

  // ==============================================================
  // SLIDE 1 — Hook: "Deine Rente wird nicht reichen"
  // ==============================================================
  const slide1 = slideRoot([
    // Header row: badge + logo
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      badge('ACHTUNG RENTNER'),
      logo(),
    ),
    headline('Deine Rente wird nicht reichen.', 68),
    subline('Das sagen dir weder Staat noch Bank.'),
    // Visual: big warning graphic with percentage
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '24px' } },
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' } },
        h('div', { style: { display: 'flex', alignItems: 'baseline', gap: '8px' } },
          h('span', { style: { fontSize: '140px', fontWeight: 800, color: C.red, lineHeight: '1' } }, '48'),
          h('span', { style: { fontSize: '64px', fontWeight: 700, color: C.red, lineHeight: '1' } }, '%'),
        ),
        h('span', { style: { fontSize: '30px', fontWeight: 600, color: C.textSoft, textAlign: 'center', lineHeight: '1.4' } }, 'des letzten Gehalts zahlt dir\ndie gesetzliche Rente'),
        // Danger bar
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 24px', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '14px', marginTop: '12px' } },
          h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '6px', backgroundColor: C.red } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.red } }, 'Tendenz weiter sinkend'),
        ),
      ),
    ),
    keyLearning('Wer nichts tut, verliert. Swipe um zu verstehen warum.'),
    igHandle(),
  ]);

  // ==============================================================
  // SLIDE 2 — Spannung: Rentenniveau sinkt (Line Chart)
  // ==============================================================
  const chartSvg2 = `<svg width="940" height="360" viewBox="0 0 940 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="60%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#EF4444"/>
    </linearGradient>
    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#EF4444" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#EF4444" stop-opacity="0.02"/>
    </linearGradient>
  </defs>
  <!-- Horizontal grid lines -->
  <line x1="60" y1="60" x2="900" y2="60" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <line x1="60" y1="120" x2="900" y2="120" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <line x1="60" y1="180" x2="900" y2="180" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <line x1="60" y1="240" x2="900" y2="240" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <line x1="60" y1="300" x2="900" y2="300" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <!-- Area under line -->
  <path d="M 60 100 C 200 108, 340 120, 480 148 C 620 176, 760 210, 900 248 L 900 340 L 60 340 Z" fill="url(#areaGrad)"/>
  <!-- Main trend line -->
  <path d="M 60 100 C 200 108, 340 120, 480 148 C 620 176, 760 210, 900 248" fill="none" stroke="url(#lineGrad)" stroke-width="5" stroke-linecap="round"/>
  <!-- Data points -->
  <circle cx="60" cy="100" r="8" fill="#10B981" stroke="#001F61" stroke-width="3"/>
  <circle cx="230" cy="112" r="8" fill="#10B981" stroke="#001F61" stroke-width="3"/>
  <circle cx="400" cy="132" r="8" fill="#F59E0B" stroke="#001F61" stroke-width="3"/>
  <circle cx="570" cy="162" r="8" fill="#F59E0B" stroke="#001F61" stroke-width="3"/>
  <circle cx="730" cy="198" r="8" fill="#EF4444" stroke="#001F61" stroke-width="3"/>
  <circle cx="900" cy="248" r="10" fill="#EF4444" stroke="#001F61" stroke-width="3"/>
  <!-- Danger threshold line -->
  <line x1="60" y1="220" x2="900" y2="220" stroke="rgba(239,68,68,0.5)" stroke-width="2" stroke-dasharray="12,8"/>
  <!-- Baseline -->
  <line x1="60" y1="340" x2="900" y2="340" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
  <!-- Year tick marks -->
  <line x1="60" y1="340" x2="60" y2="350" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  <line x1="230" y1="340" x2="230" y2="350" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  <line x1="400" y1="340" x2="400" y2="350" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  <line x1="570" y1="340" x2="570" y2="350" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  <line x1="730" y1="340" x2="730" y2="350" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  <line x1="900" y1="340" x2="900" y2="350" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
</svg>`;
  const chartSrc2 = `data:image/svg+xml;base64,${Buffer.from(chartSvg2).toString('base64')}`;

  const slide2 = slideRoot([
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      badge('DAS RENTENNIVEAU'),
      logo(),
    ),
    headline('Weniger Rente — jedes Jahrzehnt', 58),
    subline('Das Rentenniveau sinkt seit den 1990er Jahren'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      // Chart
      h('img', { src: chartSrc2, width: 940, height: 360, style: { objectFit: 'contain' } }),
      // Year labels below chart
      h('div', { style: { display: 'flex', justifyContent: 'space-between', paddingLeft: '0px', paddingRight: '0px' } },
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, '2000'),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, '2005'),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, '2010'),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, '2015'),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, '2020'),
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.red } }, '2040?'),
      ),
      // Values row
      h('div', { style: { display: 'flex', justifyContent: 'space-between' } },
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: '#10B981' } }, '53%'),
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: '#10B981' } }, '52%'),
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: '#F59E0B' } }, '51%'),
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: '#F59E0B' } }, '50%'),
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.red } }, '48%'),
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.red } }, '<43%'),
      ),
      // Danger label
      h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '12px' } },
        h('div', { style: { display: 'flex', width: '30px', height: '3px', backgroundColor: C.red, borderRadius: '2px' } }),
        h('div', { style: { display: 'flex', width: '8px', height: '3px', backgroundColor: 'transparent' } }),
        h('div', { style: { display: 'flex', width: '30px', height: '3px', backgroundColor: C.red, borderRadius: '2px' } }),
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.red, marginLeft: '8px' } }, 'Kritische Grenze (Prognose)'),
      ),
    ),
    keyLearning('Und deshalb: Du wirst die Lücke selbst schließen müssen.', C.red),
    igHandle(),
  ]);

  // ==============================================================
  // SLIDE 3 — Spannung: Die Rentenlücke (Kontrast-Karten)
  // ==============================================================
  const slide3 = slideRoot([
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      badge('DIE RENTENLÜCKE'),
      logo(),
    ),
    headline('Was du brauchst vs. was du bekommst', 56),
    subline('Bei einem Netto-Gehalt von 3.000€ / Monat'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      // Two contrast cards
      h('div', { style: { display: 'flex', gap: '16px' } },
        // Left: what you need
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '20px',
            padding: '32px', gap: '12px', border: '2px solid rgba(16,185,129,0.3)',
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: '#10B981' } }, 'DU BRAUCHST'),
          h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: 'rgba(16,185,129,0.3)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '52px', fontWeight: 800, color: '#10B981', lineHeight: '1' } }, '2.400€'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, '80% des letzten Netto-Gehalts für einen komfortablen Ruhestand'),
        ),
        // Right: what you get
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '20px',
            padding: '32px', gap: '12px', border: '2px solid rgba(239,68,68,0.3)',
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'DU BEKOMMST'),
          h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: 'rgba(239,68,68,0.3)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '52px', fontWeight: 800, color: C.red, lineHeight: '1' } }, '1.440€'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, '48% vom Brutto — noch weniger nach Steuern & Krankenversicherung'),
        ),
      ),
      // Gap card
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px 32px', gap: '8px',
        },
      },
        h('span', { style: { fontSize: '22px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'MONATLICHE LÜCKE'),
        h('div', { style: { display: 'flex', alignItems: 'baseline', gap: '6px' } },
          h('span', { style: { fontSize: '72px', fontWeight: 800, color: C.red, lineHeight: '1' } }, '-960€'),
        ),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, 'jeden Monat, für den Rest deines Lebens'),
      ),
    ),
    keyLearning('Aber: Wer früh privat vorsorgt, schließt diese Lücke vollständig.'),
    igHandle(),
  ]);

  // ==============================================================
  // SLIDE 4 — Wendepunkt: Zinseszins-Effekt (Erwartung vs. Realität)
  // ==============================================================
  const slide4 = slideRoot([
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      badge('DER WENDEPUNKT'),
      logo(),
    ),
    headline('Deine stärkste Waffe: der Zinseszins', 54),
    subline('Was die meisten denken vs. was wirklich passiert'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      // Erwartung vs. Realität
      h('div', { style: { display: 'flex', gap: '14px' } },
        // Erwartung
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px', gap: '12px',
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'DENKWEISE'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.textSoft, lineHeight: '1.4' } }, '"Ich spare 200€ x 30 Jahre = 72.000€"'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4', marginTop: '4px' } }, 'Lineare Rechnung ohne Rendite'),
        ),
        // Realität
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '28px', gap: '12px',
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: 'rgba(0,31,97,0.5)' } }, 'REALITÄT'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(0,31,97,0.15)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: '#001F61', lineHeight: '1.4' } }, '200€ mit 7% Rendite = über 227.000€'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: 'rgba(0,31,97,0.6)', lineHeight: '1.4', marginTop: '4px' } }, 'Zinseszins verdreifacht dein Geld'),
        ),
      ),
      // Arrow + impact
      h('div', { style: { display: 'flex', justifyContent: 'center' } },
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' } },
          h('div', { style: { display: 'flex', width: '4px', height: '24px', backgroundColor: C.border } }),
          h('div', { style: { display: 'flex', width: '0', height: '0', borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: `12px solid ${C.border}` } }),
        ),
      ),
      // Impact card
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '18px',
          padding: '24px', gap: '16px', border: '2px solid rgba(16,185,129,0.3)',
        },
      },
        h('span', { style: { fontSize: '48px', fontWeight: 800, color: '#10B981' } }, '+155.000€'),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, 'allein durch Zinseszins-Effekt'),
      ),
    ),
    keyLearning('Und zwar weil: Rendite auf Rendite erzeugt exponentielles Wachstum.'),
    igHandle(),
  ]);

  // ==============================================================
  // SLIDE 5 — Auflösung: Zinseszins Wachstumskurve (SVG Chart)
  // ==============================================================
  const chartSvg5 = `<svg width="940" height="380" viewBox="0 0 940 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#10B981" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#10B981" stop-opacity="0.03"/>
    </linearGradient>
    <linearGradient id="flatGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0.15)" stop-opacity="1"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.03)" stop-opacity="1"/>
    </linearGradient>
  </defs>
  <!-- Grid lines -->
  <line x1="80" y1="40" x2="920" y2="40" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <line x1="80" y1="100" x2="920" y2="100" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <line x1="80" y1="160" x2="920" y2="160" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <line x1="80" y1="220" x2="920" y2="220" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <line x1="80" y1="280" x2="920" y2="280" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <line x1="80" y1="340" x2="920" y2="340" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <!-- Spareinlagen (flat, linear) area -->
  <path d="M 80 340 L 920 260 L 920 340 Z" fill="url(#flatGrad)"/>
  <line x1="80" y1="340" x2="920" y2="260" stroke="rgba(255,255,255,0.3)" stroke-width="3" stroke-dasharray="14,8"/>
  <!-- ETF Growth curve area -->
  <path d="M 80 340 C 240 338, 400 330, 560 305 C 700 282, 800 220, 920 60 L 920 340 Z" fill="url(#growthGrad)"/>
  <!-- ETF Growth curve line -->
  <path d="M 80 340 C 240 338, 400 330, 560 305 C 700 282, 800 220, 920 60" fill="none" stroke="#10B981" stroke-width="5" stroke-linecap="round"/>
  <!-- Key data points on growth curve -->
  <circle cx="80" cy="340" r="7" fill="#10B981" stroke="#001F61" stroke-width="3"/>
  <circle cx="360" cy="328" r="7" fill="#10B981" stroke="#001F61" stroke-width="3"/>
  <circle cx="640" cy="288" r="7" fill="#10B981" stroke="#001F61" stroke-width="3"/>
  <circle cx="920" cy="60" r="10" fill="#10B981" stroke="#001F61" stroke-width="3"/>
  <!-- Data points on flat line -->
  <circle cx="360" cy="316" r="5" fill="rgba(255,255,255,0.4)" stroke="#001F61" stroke-width="2"/>
  <circle cx="640" cy="295" r="5" fill="rgba(255,255,255,0.4)" stroke="#001F61" stroke-width="2"/>
  <circle cx="920" cy="260" r="7" fill="rgba(255,255,255,0.5)" stroke="#001F61" stroke-width="2"/>
  <!-- Vertical reference lines -->
  <line x1="360" y1="316" x2="360" y2="340" stroke="rgba(255,255,255,0.15)" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="640" y1="288" x2="640" y2="340" stroke="rgba(255,255,255,0.15)" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="920" y1="60" x2="920" y2="340" stroke="rgba(16,185,129,0.25)" stroke-width="1" stroke-dasharray="4,4"/>
</svg>`;
  const chartSrc5 = `data:image/svg+xml;base64,${Buffer.from(chartSvg5).toString('base64')}`;

  const slide5 = slideRoot([
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      badge('ZINSESZINS IN ZAHLEN'),
      logo(),
    ),
    headline('200€ / Monat. 30 Jahre. 7% Rendite.', 52),
    subline('ETF-Sparplan vs. Sparkonto — der Unterschied ist drastisch'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '12px' } },
      h('img', { src: chartSrc5, width: 940, height: 380, style: { objectFit: 'contain' } }),
      // Labels below chart
      h('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: '8px' } },
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Start'),
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Jahr 10'),
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Jahr 20'),
        h('span', { style: { fontSize: '22px', fontWeight: 700, color: '#10B981' } }, 'Jahr 30'),
      ),
      // Result comparison
      h('div', { style: { display: 'flex', gap: '14px', marginTop: '8px' } },
        h('div', { style: { display: 'flex', flex: '1', alignItems: 'center', gap: '12px', backgroundColor: C.cardBg, borderRadius: '14px', padding: '16px 20px' } },
          h('div', { style: { display: 'flex', width: '16px', height: '4px', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Sparkonto: ~72.000€'),
        ),
        h('div', { style: { display: 'flex', flex: '1', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '14px', padding: '16px 20px', border: '1px solid rgba(16,185,129,0.3)' } },
          h('div', { style: { display: 'flex', width: '16px', height: '4px', backgroundColor: '#10B981', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '22px', fontWeight: 700, color: '#10B981' } }, 'ETF-Sparplan: ~227.000€'),
        ),
      ),
    ),
    keyLearning('Das funktioniert weil Zinseszins exponentiell, nicht linear wächst.'),
    igHandle(),
  ]);

  // ==============================================================
  // SLIDE 6 — Auflösung: 3 ETF-Strategien (Grid Cards)
  // ==============================================================
  const slide6 = slideRoot([
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      badge('DEINE ETF-STRATEGIE'),
      logo(),
    ),
    headline('3 Strategien für die Altersvorsorge', 54),
    subline('Je nach Alter und Risikoprofil'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      // Card 1: MSCI World
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column',
          backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px 32px', gap: '10px',
        },
      },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
          h('div', {
            style: {
              display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
              backgroundColor: '#10B981', alignItems: 'center', justifyContent: 'center',
            },
          },
            h('span', { style: { fontSize: '28px', fontWeight: 800, color: '#FFFFFF' } }, '01'),
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '2px' } },
            h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'MSCI World ETF'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Einfach & diversifiziert'),
          ),
        ),
        h('div', { style: { display: 'flex', height: '4px', backgroundColor: C.border, borderRadius: '2px', overflow: 'hidden' } },
          h('div', { style: { display: 'flex', width: '85%', height: '4px', backgroundColor: '#10B981', borderRadius: '2px' } }),
        ),
      ),
      // Card 2: 70/30
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column',
          backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px 32px', gap: '10px',
        },
      },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
          h('div', {
            style: {
              display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
              backgroundColor: '#3B82F6', alignItems: 'center', justifyContent: 'center',
            },
          },
            h('span', { style: { fontSize: '28px', fontWeight: 800, color: '#FFFFFF' } }, '02'),
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '2px' } },
            h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, '70/30-Strategie'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, '70% MSCI World + 30% Emerging Markets'),
          ),
        ),
        h('div', { style: { display: 'flex', height: '4px', backgroundColor: C.border, borderRadius: '2px', overflow: 'hidden' } },
          h('div', { style: { display: 'flex', width: '70%', height: '4px', backgroundColor: '#3B82F6', borderRadius: '2px' } }),
        ),
      ),
      // Card 3: Dividenden
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column',
          backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px 32px', gap: '10px',
        },
      },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
          h('div', {
            style: {
              display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
              backgroundColor: '#F59E0B', alignItems: 'center', justifyContent: 'center',
            },
          },
            h('span', { style: { fontSize: '28px', fontWeight: 800, color: '#FFFFFF' } }, '03'),
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '2px' } },
            h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Dividenden-ETF'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Passive Einnahmen ab Tag 1'),
          ),
        ),
        h('div', { style: { display: 'flex', height: '4px', backgroundColor: C.border, borderRadius: '2px', overflow: 'hidden' } },
          h('div', { style: { display: 'flex', width: '55%', height: '4px', backgroundColor: '#F59E0B', borderRadius: '2px' } }),
        ),
      ),
    ),
    keyLearning('Konkret: Beginne mit dem MSCI World — er deckt 1.600 Unternehmen ab.'),
    igHandle(),
  ]);

  // ==============================================================
  // SLIDE 7 — Abschluss: 4 Learnings (Numbered Cards + Progress Bars)
  // ==============================================================
  const learnings = [
    { num: '01', text: 'Die staatliche Rente reicht nicht — Rentenlücke frühzeitig erkennen', pct: 25 },
    { num: '02', text: 'Je früher du startest, desto stärker wirkt der Zinseszins', pct: 50 },
    { num: '03', text: '200€/Monat in einem ETF-Sparplan ergeben nach 30 Jahren über 227.000€', pct: 75 },
    { num: '04', text: 'MSCI World ETF ist der einfachste Einstieg für jeden Anleger', pct: 100 },
  ];

  const slide7 = slideRoot([
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      badge('DEINE 4 TAKEAWAYS'),
      logo(),
    ),
    headline('Was du mitnehmen solltest', 56),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px',
            padding: '22px 28px', backgroundColor: C.cardBg, borderRadius: '18px',
          },
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', { style: { fontSize: '36px', fontWeight: 800, color: l.pct === 100 ? '#10B981' : C.text, minWidth: '56px' } }, l.num),
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3' } }, l.text),
          ),
          h('div', { style: { display: 'flex', height: '5px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${l.pct}%`, height: '5px', backgroundColor: l.pct === 100 ? '#10B981' : C.text, borderRadius: '3px' } }),
          ),
        )
      ),
    ),
    keyLearning('Jeder Monat den du wartest kostet dich Tausende Euro Zinseszins.', C.red),
    igHandle(),
  ]);

  // ==============================================================
  // SLIDE 8 — CTA
  // ==============================================================
  const slide8 = slideRoot([
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      badge('JETZT HANDELN'),
      logo(),
    ),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '32px' } },
      // Main question
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' } },
        h('span', { style: { fontSize: '66px', fontWeight: 800, color: C.text, textAlign: 'center', lineHeight: '1.1' } }, 'Wann startest du mit der Altersvorsorge?'),
        h('span', { style: { fontSize: '30px', fontWeight: 500, color: C.textMuted, textAlign: 'center', lineHeight: '1.5' } }, 'Schreib es uns in die Kommentare.'),
      ),
      // CTA box
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
          backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '20px',
          padding: '32px 40px', border: '2px solid rgba(16,185,129,0.3)',
          width: '100%',
        },
      },
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: '#10B981', textAlign: 'center', lineHeight: '1.4' } }, 'Speichern nicht vergessen!'),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, textAlign: 'center', lineHeight: '1.4' } }, 'Dieses Carousel ist dein Merkzettel für die Altersvorsorge'),
      ),
      // Follow text
      h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, textAlign: 'center', lineHeight: '1.5' } }, 'Folge @benarofinanzen für mehr\nWissen rund um deine Finanzen'),
    ),
    igHandle(),
  ]);

  // ==============================================================
  // GENERATE ALL SLIDES
  // ==============================================================
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} gespeichert: ${pngPath}`);
  }

  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
