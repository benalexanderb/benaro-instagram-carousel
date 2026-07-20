// Carousel: 3-ETF-Weltportfolio 2026 — Dein einfaches Starter-Depot
// Inspiration: @finanzcopilot — ETF-Grundlagen, Portfolio-Aufbau
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
    bg: '#001F60',
    text: '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted: '#9CA3AF',
    cardBg: 'rgba(255,255,255,0.10)',
    border: 'rgba(255,255,255,0.18)',
    green: '#10B981',
    red: '#EF4444',
    blue: '#3B82F6',
  };

  const W = 1080, H = 1350;
  const PAD = 70;

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    '/tmp/workspace/skills/instagram-carousel-skill/templates/benaro-logo.jpg'
  ).toString('base64');

  const h = (type, props, ...ch) => ({
    type,
    props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function logo() {
    return h('img', { src: logoB64, width: 120, height: 120, style: { borderRadius: '12px', objectFit: 'cover', flexShrink: '0' } });
  }

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '14px' } },
      h('span', { style: { display: 'flex', fontSize: '20px', fontWeight: 700, letterSpacing: '3px', color: C.text, backgroundColor: C.cardBg, padding: '10px 22px', borderRadius: '12px' } }, text)
    );
  }

  function headline(text, size) {
    return h('span', { style: { fontSize: `${size || 64}px`, fontWeight: 800, color: C.text, lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '8px' } }, text);
  }

  function subline(text) {
    return h('span', { style: { fontSize: '28px', fontWeight: 500, color: C.textMuted, lineHeight: '1.5', marginTop: '8px' } }, text);
  }

  function keyLearning(text, accent) {
    return h('div', { style: { display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px', marginTop: '16px' } },
      h('div', { style: { display: 'flex', width: '6px', minHeight: '44px', backgroundColor: accent || C.green, borderRadius: '3px', flexShrink: '0' } }),
      h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, text)
    );
  }

  function igHandle() {
    return h('div', { style: { display: 'flex', alignItems: 'center', marginTop: '12px' } },
      h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted } }, '@benarofinanzen')
    );
  }

  function headerRow(badgeText) {
    return h('div', { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' } },
      badge(badgeText),
      logo()
    );
  }

  function slideRoot(children) {
    return h('div', { style: { display: 'flex', flexDirection: 'column', width: W, height: H, padding: `${PAD}px`, backgroundColor: C.bg, fontFamily: 'Outfit' } },
      ...children
    );
  }

  // =====================================================================
  // SLIDE 1 — HOOK: "Du brauchst maximal 3 ETFs."
  // =====================================================================
  const slide1 = slideRoot([
    headerRow('DAS MUSST DU WISSEN'),
    headline('Du brauchst\nmaximal 3 ETFs.', 72),
    subline('Das 3-ETF-Weltportfolio 2026'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      h('div', { style: { display: 'flex', gap: '14px' } },
        ...[
          { pct: '70%', label: 'MSCI World', sub: 'Industrielaender', color: C.green, borderColor: C.green },
          { pct: '20%', label: 'MSCI EM IMI', sub: 'Schwellenlaender', color: C.blue, borderColor: C.blue },
          { pct: '10%', label: 'Tagesgeld', sub: 'Stabilitaet', color: C.textMuted, borderColor: C.border },
        ].map(e => h('div', { style: {
          display: 'flex', flex: '1', flexDirection: 'column',
          backgroundColor: C.cardBg, borderRadius: '20px', padding: '26px 22px', gap: '10px',
          border: `2px solid ${e.borderColor}`
        } },
          h('span', { style: { fontSize: '44px', fontWeight: 800, color: e.color, lineHeight: '1' } }, e.pct),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text, lineHeight: '1.2' } }, e.label),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, e.sub)
        ))
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 26px' } },
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.5' } },
          'Drei ETFs genuegen um den gesamten Weltmarkt abzudecken — einfach, guenstig und global.'
        )
      )
    ),
    keyLearning('Abdeckung: ueber 2.600 Unternehmen in mehr als 23 Laendern weltweit', C.green),
    igHandle(),
  ]);

  // =====================================================================
  // SLIDE 2 — STAT: Wie viele ETFs haben deutsche Anleger?
  // =====================================================================
  const barData2 = [
    { label: 'Nur 1 ETF im Depot', pct: 34, color: C.red },
    { label: '2-5 ETFs (optimal)', pct: 21, color: C.green },
    { label: '6-9 ETFs', pct: 18, color: C.textMuted },
    { label: '10+ ETFs', pct: 27, color: C.red },
  ];

  const slide2 = slideRoot([
    headerRow('DIE ZAHLEN'),
    headline('Wie viele ETFs\nhaben deutsche\nAnleger?', 66),
    subline('Nur 21% sind wirklich gut aufgestellt'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '22px' } },
      ...barData2.map(b => h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.text } }, b.label),
          h('span', { style: { fontSize: '32px', fontWeight: 800, color: b.color } }, `${b.pct}%`)
        ),
        h('div', { style: { display: 'flex', height: '18px', backgroundColor: C.border, borderRadius: '9px', overflow: 'hidden' } },
          h('div', { style: { display: 'flex', width: `${b.pct}%`, height: '18px', backgroundColor: b.color, borderRadius: '9px' } })
        )
      ))
    ),
    keyLearning('79% der Anleger sind nicht optimal aufgestellt — zu wenig oder zu viele ETFs', C.red),
    igHandle(),
  ]);

  // =====================================================================
  // SLIDE 3 — PROBLEM: "4 Fehler die dein Depot bremsen"
  // =====================================================================
  const problems = [
    { n: '01', title: 'Zu hohe Kosten', desc: 'Viele ETFs = mehrfache TER-Gebuhren statt konzentrierter Streuung' },
    { n: '02', title: 'Ueberschneidungen', desc: 'Apple & Microsoft stecken in fast allen ETFs — du kaufst sie mehrfach' },
    { n: '03', title: 'Rebalancing-Chaos', desc: '10 Positionen neu gewichten ist aufwendig und fehleranfaellig' },
    { n: '04', title: 'Mehr Entscheidungen', desc: 'Mehr ETFs bedeutet mehr emotionale Fehlentscheidungen' },
  ];

  const slide3 = slideRoot([
    headerRow('DAS PROBLEM'),
    headline('4 Fehler die\ndein Depot bremsen', 64),
    subline('Mehr ETFs bedeuten nicht mehr Rendite'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      h('div', { style: { display: 'flex', gap: '14px' } },
        ...problems.slice(0, 2).map(p => h('div', { style: {
          display: 'flex', flex: '1', flexDirection: 'column',
          backgroundColor: C.cardBg, borderRadius: '20px', padding: '26px', gap: '10px',
          border: '1px solid rgba(239,68,68,0.3)'
        } },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.red } }, p.n),
          h('span', { style: { fontSize: '25px', fontWeight: 700, color: C.text, lineHeight: '1.2' } }, p.title),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, p.desc)
        ))
      ),
      h('div', { style: { display: 'flex', gap: '14px' } },
        ...problems.slice(2, 4).map(p => h('div', { style: {
          display: 'flex', flex: '1', flexDirection: 'column',
          backgroundColor: C.cardBg, borderRadius: '20px', padding: '26px', gap: '10px',
          border: '1px solid rgba(239,68,68,0.3)'
        } },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.red } }, p.n),
          h('span', { style: { fontSize: '25px', fontWeight: 700, color: C.text, lineHeight: '1.2' } }, p.title),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, p.desc)
        ))
      )
    ),
    keyLearning('Kompliziert ist kein Zeichen von Qualitaet — Einfachheit schlaegt Komplexitaet', C.red),
    igHandle(),
  ]);

  // =====================================================================
  // SLIDE 4 — ERWARTUNG VS. REALITAET
  // =====================================================================
  const slide4 = slideRoot([
    headerRow('DER WENDEPUNKT'),
    headline('Was wirklich\nfunktioniert', 68),
    subline('Erwartung trifft auf Realitaet'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      h('div', { style: { display: 'flex', gap: '14px' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px', gap: '14px' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'ERWARTUNG'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.red, lineHeight: '1.15' } }, '10+ ETFs'),
          h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Mehr Positionen = besser gestreut = mehr Rendite'),
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' } },
            h('div', { style: { width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.red } }),
            h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.red } }, 'IRRTUM')
          )
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.text, borderRadius: '20px', padding: '28px', gap: '14px' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: 'rgba(0,31,96,0.5)' } }, 'REALITAET'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(0,31,96,0.12)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.green, lineHeight: '1.15' } }, '3 ETFs'),
          h('span', { style: { fontSize: '23px', fontWeight: 500, color: '#001F60', lineHeight: '1.4' } }, 'Decken 99% der Weltmaerkte ab — mehr bringt kaum Mehrwert'),
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' } },
            h('div', { style: { width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.green } }),
            h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.green } }, 'RICHTIG')
          )
        )
      ),
      h('div', { style: { display: 'flex', backgroundColor: C.cardBg, borderRadius: '14px', padding: '18px 24px' } },
        h('span', { style: { fontSize: '25px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } },
          'Breite Streuung ist entscheidend — nicht die Anzahl der ETFs.')
      )
    ),
    keyLearning('Einfache Portfolios schlagen langfristig komplizierte Depots — weniger Fehler, mehr Rendite', C.text),
    igHandle(),
  ]);

  // =====================================================================
  // SLIDE 5 — DAS 3-ETF-PORTFOLIO (Pie Chart + ETF-Liste)
  // =====================================================================
  // Pie-Chart SVG — keine <text> Elemente
  // MSCI World: 70% = 252 Grad, von 270 Grad (oben) im Uhrzeigersinn bis 522 = 162 Grad
  // EM IMI: 20% = 72 Grad, von 162 bis 234 Grad
  // Tagesgeld: 10% = 36 Grad, von 234 bis 270 Grad
  const cx = 200, cy = 200, r = 160;
  const toXY = (deg) => [
    cx + r * Math.cos(deg * Math.PI / 180),
    cy + r * Math.sin(deg * Math.PI / 180)
  ];
  const [sx1, sy1] = toXY(270); // = [200, 40] — Startpunkt oben
  const [ex1, ey1] = toXY(162); // = [47.8, 249.5]
  const [ex2, ey2] = toXY(234); // = [106.0, 70.6]
  const [sx4, sy4] = toXY(270); // = [200, 40] wieder zuruck

  const pieSvg = `<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <path d="M ${cx} ${cy} L ${sx1.toFixed(1)} ${sy1.toFixed(1)} A ${r} ${r} 0 1 1 ${ex1.toFixed(1)} ${ey1.toFixed(1)} Z" fill="#10B981"/>
    <path d="M ${cx} ${cy} L ${ex1.toFixed(1)} ${ey1.toFixed(1)} A ${r} ${r} 0 0 1 ${ex2.toFixed(1)} ${ey2.toFixed(1)} Z" fill="#3B82F6"/>
    <path d="M ${cx} ${cy} L ${ex2.toFixed(1)} ${ey2.toFixed(1)} A ${r} ${r} 0 0 1 ${sx4.toFixed(1)} ${sy4.toFixed(1)} Z" fill="rgba(156,163,175,0.7)"/>
    <circle cx="${cx}" cy="${cy}" r="52" fill="#001F60"/>
    <circle cx="${cx}" cy="${cy}" r="48" fill="rgba(255,255,255,0.06)"/>
  </svg>`;
  const pieSrc = `data:image/svg+xml;base64,${Buffer.from(pieSvg).toString('base64')}`;

  const etfList = [
    { color: C.green, pct: '70%', name: 'MSCI World', detail: 'iShares Core MSCI World · TER 0,20%' },
    { color: C.blue, pct: '20%', name: 'MSCI EM IMI', detail: 'iShares MSCI EM IMI · TER 0,18%' },
    { color: C.textMuted, pct: '10%', name: 'Tagesgeld / Geldmarkt-ETF', detail: 'z.B. XEON · TER 0,07%' },
  ];

  const slide5 = slideRoot([
    headerRow('DEIN PORTFOLIO'),
    headline('Das 3-ETF-\nWeltportfolio', 66),
    subline('Einfach, guenstig und global diversifiziert'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'row', alignItems: 'center', gap: '28px', marginTop: '16px' } },
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', flexShrink: '0' } },
        h('img', { src: pieSrc, width: 280, height: 280, style: { objectFit: 'contain' } }),
        // Legende
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
          ...[
            { color: C.green, label: '70% World' },
            { color: C.blue, label: '20% EM IMI' },
            { color: C.textMuted, label: '10% Tagesgeld' },
          ].map(l => h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
            h('div', { style: { width: '16px', height: '16px', borderRadius: '4px', backgroundColor: l.color, flexShrink: '0' } }),
            h('span', { style: { fontSize: '21px', fontWeight: 600, color: C.textSoft } }, l.label)
          ))
        )
      ),
      h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', gap: '14px' } },
        ...etfList.map(e => h('div', { style: {
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px',
          backgroundColor: C.cardBg, borderRadius: '16px', padding: '18px 20px'
        } },
          h('div', { style: { width: '8px', height: '72px', flexShrink: '0', backgroundColor: e.color, borderRadius: '4px' } }),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '5px' } },
            h('div', { style: { display: 'flex', alignItems: 'baseline', gap: '10px' } },
              h('span', { style: { fontSize: '32px', fontWeight: 800, color: e.color } }, e.pct),
              h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.text } }, e.name)
            ),
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, e.detail)
          )
        ))
      )
    ),
    keyLearning('Gesamtkosten: ca. 0,19% TER pro Jahr — guenstiger geht bei dieser Streuung kaum', C.green),
    igHandle(),
  ]);

  // =====================================================================
  // SLIDE 6 — BEWEIS: Rechenbeispiel 100 EUR / 20 Jahre
  // =====================================================================
  // Wachstum bei 7% p.a. (monatlich): 52.093 EUR
  // Wachstum bei 1,5% p.a. (Sparbuch): 27.980 EUR
  // SVG Linien-Chart — keine <text> Elemente

  const chartW = 860, chartH = 340;
  const maxEUR = 56000;
  const sX = (m) => (m / 240) * chartW;
  const sY = (v) => chartH - (v / maxEUR) * chartH;

  // Datenpunkte: [Monat, EUR]
  const portPts = [[0,0],[60,7158],[120,17308],[180,31694],[240,52093]];
  const sparPts = [[0,0],[60,6224],[120,12928],[180,20184],[240,27980]];

  const pathStr = (pts) => {
    const [f, ...rest] = pts;
    let d = `M ${sX(f[0]).toFixed(1)} ${sY(f[1]).toFixed(1)}`;
    rest.forEach(([m, v]) => { d += ` L ${sX(m).toFixed(1)} ${sY(v).toFixed(1)}`; });
    return d;
  };

  const chartSvg = `<svg width="${chartW}" height="${chartH}" viewBox="0 0 ${chartW} ${chartH}" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="${chartH}" x2="${chartW}" y2="${chartH}" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <line x1="0" y1="${sY(20000).toFixed(1)}" x2="${chartW}" y2="${sY(20000).toFixed(1)}" stroke="rgba(255,255,255,0.06)" stroke-width="1" stroke-dasharray="6,6"/>
    <line x1="0" y1="${sY(40000).toFixed(1)}" x2="${chartW}" y2="${sY(40000).toFixed(1)}" stroke="rgba(255,255,255,0.06)" stroke-width="1" stroke-dasharray="6,6"/>
    <line x1="${sX(60).toFixed(1)}" y1="0" x2="${sX(60).toFixed(1)}" y2="${chartH}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    <line x1="${sX(120).toFixed(1)}" y1="0" x2="${sX(120).toFixed(1)}" y2="${chartH}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    <line x1="${sX(180).toFixed(1)}" y1="0" x2="${sX(180).toFixed(1)}" y2="${chartH}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    <path d="${pathStr(sparPts)}" fill="none" stroke="rgba(156,163,175,0.55)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${pathStr(portPts)}" fill="none" stroke="#10B981" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${sX(240).toFixed(1)}" cy="${sY(52093).toFixed(1)}" r="9" fill="#10B981"/>
    <circle cx="${sX(240).toFixed(1)}" cy="${sY(27980).toFixed(1)}" r="7" fill="rgba(156,163,175,0.7)"/>
  </svg>`;
  const chartSrc = `data:image/svg+xml;base64,${Buffer.from(chartSvg).toString('base64')}`;

  const slide6 = slideRoot([
    headerRow('DER BEWEIS'),
    headline('100 EUR/Monat\nueber 20 Jahre', 64),
    subline('3-ETF-Portfolio (7% p.a.) vs. Sparbuch (1,5% p.a.)'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      h('img', { src: chartSrc, width: chartW, height: chartH, style: { objectFit: 'contain' } }),
      h('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: '4px' } },
        h('span', { style: { fontSize: '20px', color: C.textMuted } }, 'Jahr 5'),
        h('span', { style: { fontSize: '20px', color: C.textMuted } }, 'Jahr 10'),
        h('span', { style: { fontSize: '20px', color: C.textMuted } }, 'Jahr 15'),
        h('span', { style: { fontSize: '20px', color: C.textMuted } }, 'Jahr 20')
      ),
      h('div', { style: { display: 'flex', gap: '12px' } },
        h('div', { style: {
          display: 'flex', flex: '1', flexDirection: 'column', gap: '6px',
          backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '16px', padding: '18px 22px',
          border: '1px solid rgba(16,185,129,0.35)'
        } },
          h('span', { style: { fontSize: '38px', fontWeight: 800, color: C.green } }, '52.093 EUR'),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, '3-ETF-Portfolio bei 7%')
        ),
        h('div', { style: {
          display: 'flex', flex: '1', flexDirection: 'column', gap: '6px',
          backgroundColor: C.cardBg, borderRadius: '16px', padding: '18px 22px'
        } },
          h('span', { style: { fontSize: '38px', fontWeight: 800, color: C.textSoft } }, '27.980 EUR'),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, 'Sparbuch bei 1,5%')
        ),
        h('div', { style: {
          display: 'flex', flex: '1', flexDirection: 'column', gap: '6px',
          backgroundColor: 'rgba(16,185,129,0.08)', borderRadius: '16px', padding: '18px 22px',
          border: '1px solid rgba(16,185,129,0.25)'
        } },
          h('span', { style: { fontSize: '38px', fontWeight: 800, color: C.green } }, '+24.113'),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, 'Vorteil ETF-Portfolio')
        )
      )
    ),
    keyLearning('Du zahlst 24.000 EUR ein und holst 52.093 EUR raus — der Markt arbeitet fuer dich', C.green),
    igHandle(),
  ]);

  // =====================================================================
  // SLIDE 7 — 4 LEARNINGS MIT PROGRESS BARS
  // =====================================================================
  const learnings = [
    { num: '01', text: '3 ETFs reichen fuer vollstaendige globale Diversifikation aus', pct: 25 },
    { num: '02', text: 'MSCI World 70% + EM IMI 20% + Tagesgeld 10% — einfach und guenstig', pct: 50 },
    { num: '03', text: 'TER unter 0,20% pro Jahr — Kosten auf absolutem Minimum halten', pct: 75 },
    { num: '04', text: 'ETF-Sparplan ab 25 EUR/Monat starten — kein grosses Kapital noetig', pct: 100 },
  ];

  const slide7 = slideRoot([
    headerRow('DEINE LEARNINGS'),
    headline('4 Dinge die\ndu jetzt weisst', 66),
    subline('Dein 3-ETF-Startplan'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      ...learnings.map(l =>
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px 24px', backgroundColor: C.cardBg, borderRadius: '18px' } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', { style: { fontSize: '38px', fontWeight: 800, color: l.pct === 100 ? C.green : C.text, minWidth: '58px', flexShrink: '0' } }, l.num),
            h('span', { style: { fontSize: '25px', fontWeight: 600, color: C.text, lineHeight: '1.35' } }, l.text)
          ),
          h('div', { style: { display: 'flex', height: '6px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${l.pct}%`, height: '6px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px' } })
          )
        )
      )
    ),
    keyLearning('Starten ist wichtiger als perfektionieren — heute ist besser als morgen', C.green),
    igHandle(),
  ]);

  // =====================================================================
  // SLIDE 8 — CTA
  // =====================================================================
  const slide8 = slideRoot([
    headerRow('JETZT DU'),
    headline('Nutzt du schon\nein Weltportfolio?', 66),
    subline('Schreib A (ja) oder B (nein) in die Kommentare'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'row', alignItems: 'center', gap: '18px', marginTop: '20px' } },
      h('div', { style: {
        display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        backgroundColor: C.text, borderRadius: '28px', padding: '48px 20px', gap: '12px'
      } },
        h('span', { style: { fontSize: '110px', fontWeight: 800, color: C.green, lineHeight: '1' } }, 'A'),
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: '#001F60' } }, 'Ja, habe ich!')
      ),
      h('div', { style: {
        display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        backgroundColor: C.cardBg, borderRadius: '28px', padding: '48px 20px', gap: '12px',
        border: `2px solid ${C.border}`
      } },
        h('span', { style: { fontSize: '110px', fontWeight: 800, color: C.textMuted, lineHeight: '1' } }, 'B'),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, 'Noch nicht')
      )
    ),
    h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '18px' } },
      h('span', { style: { fontSize: '27px', fontWeight: 700, color: C.text, textAlign: 'center', lineHeight: '1.4' } },
        'Folge @benarofinanzen fuer mehr Finanzwissen'),
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, textAlign: 'center' } },
        'Speichern nicht vergessen')
    ),
    igHandle(),
  ]);

  // =====================================================================
  // ALLE SLIDES GENERIEREN
  // =====================================================================
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  const outDir = path.join(__dirname, 'output', 'carousel_2026-07-20', 'slides');

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} done -> ${pngPath}`);
  }
  console.log('All slides generated!');
}

main().catch(e => { console.error(e); process.exit(1); });
