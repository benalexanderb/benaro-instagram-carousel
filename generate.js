'use strict';
const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default || require('satori');
  const { Resvg } = require('@resvg/resvg-js');

  const W = 1080, H = 1350;
  const TODAY = '2026-11-16';
  const OUTPUT_DIR = path.join(__dirname, 'output', `carousel_${TODAY}`, 'slides');

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

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
    text: '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted: '#9CA3AF',
    cardBg: 'rgba(255,255,255,0.1)',
    border: 'rgba(255,255,255,0.2)',
    green: '#10B981',
    red: '#EF4444',
  };

  const h = (type, props, ...ch) => ({
    type,
    props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function topBar() {
    return h('div', {
      style: { display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: '16px' }
    }, h('img', {
      src: logoB64,
      width: 100,
      height: 100,
      style: { borderRadius: '12px', objectFit: 'cover' }
    }));
  }

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '14px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '20px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: C.cardBg, padding: '10px 22px', borderRadius: '12px'
        }
      }, text)
    );
  }

  function headline(text, size = 64) {
    return h('span', {
      style: {
        fontSize: `${size}px`, fontWeight: 800, color: C.text,
        lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '8px'
      }
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500, color: C.textMuted,
        lineHeight: '1.5', marginTop: '8px'
      }
    }, text);
  }

  function keyLearning(text, accent) {
    const accentColor = accent || C.text;
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px', marginTop: '20px'
      }
    },
      h('div', { style: { display: 'flex', width: '6px', minHeight: '40px', backgroundColor: accentColor, borderRadius: '3px' } }),
      h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, text)
    );
  }

  function igHandle() {
    return h('div', { style: { display: 'flex', marginTop: '12px' } },
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, '@benarofinanzen')
    );
  }

  function slideRoot(children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column', width: W, height: H,
        padding: '60px 70px', backgroundColor: C.bg, fontFamily: 'Outfit'
      }
    }, ...children);
  }

  // ─── SLIDE 1: HOOK ─────────────────────────────────────────────────────────────
  // Thema: Kaufkraftverlust — dramatischer Einstieg mit Stat-Hero

  const svgHook = `<svg width="860" height="240" viewBox="0 0 860 240" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(16,185,129,0.6)"/>
        <stop offset="100%" stop-color="rgba(16,185,129,0.1)"/>
      </linearGradient>
      <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(239,68,68,0.6)"/>
        <stop offset="100%" stop-color="rgba(239,68,68,0.1)"/>
      </linearGradient>
    </defs>
    <rect x="60" y="40" width="100" height="180" rx="8" fill="url(#barGrad1)"/>
    <rect x="200" y="80" width="100" height="140" rx="8" fill="rgba(255,255,255,0.1)"/>
    <rect x="340" y="110" width="100" height="110" rx="8" fill="rgba(255,255,255,0.08)"/>
    <rect x="480" y="140" width="100" height="80" rx="8" fill="rgba(239,68,68,0.3)"/>
    <rect x="620" y="165" width="100" height="55" rx="8" fill="url(#barGrad2)"/>
    <line x1="60" y1="230" x2="760" y2="230" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    <line x1="160" y1="40" x2="720" y2="165" stroke="rgba(239,68,68,0.5)" stroke-width="2" stroke-dasharray="8 5"/>
  </svg>`;
  const svgHookSrc = `data:image/svg+xml;base64,${Buffer.from(svgHook).toString('base64')}`;

  const slide1 = slideRoot([
    topBar(),
    badge('WARNUNG: KAUFKRAFTVERLUST'),
    headline('Dein Geld verliert jedes Jahr an Wert.', 62),
    subline('Die meisten merken es erst, wenn es zu spät ist.'),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px', alignItems: 'center' }
    },
      h('img', { src: svgHookSrc, width: 860, height: 240, style: { objectFit: 'contain' } }),
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' } },
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
            backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '20px', padding: '20px 32px',
            border: '1px solid rgba(239,68,68,0.35)'
          }
        },
          h('span', { style: { fontSize: '76px', fontWeight: 800, color: C.red, lineHeight: '1' } }, '2,8 %'),
          h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.textMuted, letterSpacing: '2px' } }, 'INFLATION 2026')
        ),
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
            backgroundColor: C.cardBg, borderRadius: '20px', padding: '20px 32px'
          }
        },
          h('span', { style: { fontSize: '76px', fontWeight: 800, color: C.textSoft, lineHeight: '1' } }, '-24 %'),
          h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.textMuted, letterSpacing: '2px' } }, 'KAUFKRAFT IN 10J')
        )
      )
    ),
    keyLearning('10.000 EUR heute kaufen in 10 Jahren nur noch ca. 7.600 EUR ein.', C.red),
    igHandle(),
  ]);

  // ─── SLIDE 2: KAUFKRAFTVERLUST — LINIENCHART ──────────────────────────────────

  const svgLineChart = `<svg width="860" height="290" viewBox="0 0 860 290" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(239,68,68,0.35)"/>
        <stop offset="100%" stop-color="rgba(239,68,68,0.02)"/>
      </linearGradient>
    </defs>
    <line x1="60" y1="40" x2="840" y2="40" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
    <line x1="60" y1="110" x2="840" y2="110" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
    <line x1="60" y1="180" x2="840" y2="180" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
    <line x1="60" y1="250" x2="840" y2="250" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <path d="M 60,40 C 210,42 650,230 840,262 L 840,250 L 60,250 Z" fill="url(#areaGrad)"/>
    <path d="M 60,40 C 210,42 650,230 840,262" fill="none" stroke="#EF4444" stroke-width="4" stroke-linecap="round"/>
    <circle cx="60" cy="40" r="6" fill="#EF4444"/>
    <circle cx="255" cy="98" r="5" fill="#EF4444" fill-opacity="0.8"/>
    <circle cx="450" cy="162" r="5" fill="#EF4444" fill-opacity="0.8"/>
    <circle cx="645" cy="218" r="5" fill="#EF4444" fill-opacity="0.8"/>
    <circle cx="840" cy="262" r="6" fill="#EF4444"/>
    <line x1="255" y1="98" x2="255" y2="250" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="4 4"/>
    <line x1="450" y1="162" x2="450" y2="250" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="4 4"/>
    <line x1="645" y1="218" x2="645" y2="250" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="4 4"/>
  </svg>`;
  const svgLineChartSrc = `data:image/svg+xml;base64,${Buffer.from(svgLineChart).toString('base64')}`;

  const slide2 = slideRoot([
    topBar(),
    badge('DAS PROBLEM'),
    headline('So schrumpft dein Geld in 20 Jahren', 54),
    subline('Kaufkraft von 10.000 EUR bei 2,5 % Inflation p.a.'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '12px' } },
      h('div', {
        style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingLeft: '0px', paddingRight: '0px' }
      },
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '2px' } },
          h('span', { style: { fontSize: '34px', fontWeight: 800, color: C.text } }, '10.000 EUR'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'Heute')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' } },
          h('span', { style: { fontSize: '34px', fontWeight: 800, color: C.red } }, '6.095 EUR'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'In 20 Jahren')
        )
      ),
      h('img', { src: svgLineChartSrc, width: 860, height: 290, style: { objectFit: 'contain' } }),
      h('div', {
        style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '0px', paddingRight: '0px' }
      },
        h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted } }, 'Jahr 0'),
        h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted } }, 'Jahr 5'),
        h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted } }, 'Jahr 10'),
        h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted } }, 'Jahr 15'),
        h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted } }, 'Jahr 20')
      )
    ),
    keyLearning('Ohne Gegenmaßnahmen verlierst du garantiert Kaufkraft.', C.red),
    igHandle(),
  ]);

  // ─── SLIDE 3: DIE FALLE — SPARBUCH VS. INFLATION ─────────────────────────────

  const slide3 = slideRoot([
    topBar(),
    badge('DIE FALLE'),
    headline('Das Sparbuch löst das Problem nicht', 56),
    subline('Im Gegenteil — es macht es noch schlimmer.'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '12px',
            backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '20px', padding: '28px',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'SPARBUCH'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '48px', fontWeight: 800, color: C.textSoft, lineHeight: '1.1' } }, '0,5 %'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, lineHeight: '1.3' } }, 'Zinsen p.a.'),
          h('span', { style: { fontSize: '23px', fontWeight: 600, color: 'rgba(255,255,255,0.35)', lineHeight: '1.4', marginTop: '8px', textDecoration: 'line-through' } }, 'Scheinbar sicher')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '12px',
            backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '20px', padding: '28px',
            border: '1px solid rgba(239,68,68,0.3)'
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'INFLATION'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.red, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '48px', fontWeight: 800, color: C.red, lineHeight: '1.1' } }, '2,8 %'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, lineHeight: '1.3' } }, 'p.a. 2026'),
          h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.red, lineHeight: '1.4', marginTop: '8px' } }, 'Frisst dein Geld auf')
        )
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '16px',
          backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '20px', padding: '24px 32px',
          border: '1px solid rgba(239,68,68,0.2)'
        }
      },
        h('div', { style: { display: 'flex', width: '14px', height: '14px', borderRadius: '7px', backgroundColor: C.red } }),
        h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.red, lineHeight: '1.2' } }, 'Reale Rendite: -2,3 % pro Jahr')
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px',
          backgroundColor: C.cardBg, borderRadius: '16px', padding: '18px 24px'
        }
      },
        h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.textMuted } }),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft } }, '10.000 EUR auf dem Sparbuch = 7.800 EUR Kaufkraft nach 10 Jahren')
      )
    ),
    keyLearning('Reale Rendite muss die Inflation schlagen — sonst verlierst du garantiert.', C.red),
    igHandle(),
  ]);

  // ─── SLIDE 4: 4 ASSETS SCHÜTZEN VOR INFLATION (2x2 Grid) ─────────────────────

  const slide4 = slideRoot([
    topBar(),
    badge('DIE LÖSUNG'),
    headline('4 Assets schützen wirklich vor Inflation', 54),
    subline('Nicht alle gleich gut — das ist der Unterschied.'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '10px',
            backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '20px', padding: '24px',
            border: '1px solid rgba(16,185,129,0.3)'
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
              backgroundColor: 'rgba(16,185,129,0.25)', alignItems: 'center', justifyContent: 'center'
            }
          },
            h('span', { style: { fontSize: '20px', fontWeight: 800, color: C.green } }, 'ETF')
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.green } }, 'Aktien-ETF'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Reale Rendite ~4–5 % p.a.')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '10px',
            backgroundColor: C.cardBg, borderRadius: '20px', padding: '24px',
            border: '1px solid rgba(255,255,255,0.12)'
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
              backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center'
            }
          },
            h('span', { style: { fontSize: '20px', fontWeight: 800, color: C.textSoft } }, 'IMM')
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.textSoft } }, 'Immobilien'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Reale Rendite ~2–3 % p.a.')
        )
      ),
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '10px',
            backgroundColor: C.cardBg, borderRadius: '20px', padding: '24px',
            border: '1px solid rgba(255,255,255,0.12)'
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
              backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center'
            }
          },
            h('span', { style: { fontSize: '20px', fontWeight: 800, color: C.textSoft } }, 'GLD')
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.textSoft } }, 'Gold'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Reale Rendite ~1 % p.a.')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '10px',
            backgroundColor: C.cardBg, borderRadius: '20px', padding: '24px',
            border: '1px solid rgba(255,255,255,0.12)'
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
              backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center'
            }
          },
            h('span', { style: { fontSize: '20px', fontWeight: 800, color: C.textSoft } }, 'ANL')
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.textSoft } }, 'Inflationsanleihen'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Reale Rendite ~0–1 % p.a.')
        )
      )
    ),
    keyLearning('Aktien-ETFs haben Inflation in 90 % aller Dekaden geschlagen.'),
    igHandle(),
  ]);

  // ─── SLIDE 5: REALE RENDITEN IM VERGLEICH ─────────────────────────────────────

  const renditen = [
    { label: 'Aktien-ETF (MSCI World)', wert: '+4,5 %', pct: 100, barColor: C.green },
    { label: 'Immobilien', wert: '+2,5 %', pct: 56, barColor: C.textSoft },
    { label: 'Gold', wert: '+1,0 %', pct: 22, barColor: 'rgba(255,255,255,0.45)' },
    { label: 'Bundesanleihen', wert: '+0,3 %', pct: 7, barColor: 'rgba(255,255,255,0.3)' },
    { label: 'Sparbuch', wert: '-2,3 %', pct: 51, barColor: C.red, negativ: true },
  ];

  const slide5 = slideRoot([
    topBar(),
    badge('DIE ZAHLEN'),
    headline('Reale Rendite nach Inflation — 20 Jahre', 50),
    subline('Durchschnitt p.a. (nominal minus Inflation)'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      ...renditen.map(r =>
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
          h('div', { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } },
            h('span', { style: { fontSize: '24px', fontWeight: 600, color: r.negativ ? C.red : C.text } }, r.label),
            h('span', { style: { fontSize: '24px', fontWeight: 800, color: r.pct === 100 ? C.green : (r.negativ ? C.red : C.text) } }, r.wert)
          ),
          h('div', { style: { display: 'flex', height: '12px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${r.pct}%`, height: '12px', backgroundColor: r.barColor, borderRadius: '6px' } })
          )
        )
      )
    ),
    keyLearning('Aktien-ETF ist die einzige Klasse mit zuverlässig positiver realer Rendite.', C.green),
    igHandle(),
  ]);

  // ─── SLIDE 6: DAS INFLATIONSSCHUTZ-PORTFOLIO ──────────────────────────────────

  const allokation = [
    { label: 'Welt-ETF', pct: 70, wert: '70 %', barColor: C.green },
    { label: 'Immobilien-ETF', pct: 15, wert: '15 %', barColor: 'rgba(255,255,255,0.6)' },
    { label: 'Gold-ETC', pct: 10, wert: '10 %', barColor: 'rgba(255,210,0,0.75)' },
    { label: 'Inflationsanleihen', pct: 5, wert: '5 %', barColor: 'rgba(255,255,255,0.3)' },
  ];

  const slide6 = slideRoot([
    topBar(),
    badge('DEINE STRATEGIE'),
    headline('Das Inflationsschutz-Portfolio', 58),
    subline('Eine mögliche Aufteilung für langfristigen Schutz'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      h('div', { style: { display: 'flex', flexDirection: 'row', height: '28px', borderRadius: '14px', overflow: 'hidden' } },
        h('div', { style: { display: 'flex', flexGrow: '70', height: '28px', backgroundColor: C.green } }),
        h('div', { style: { display: 'flex', flexGrow: '15', height: '28px', backgroundColor: 'rgba(255,255,255,0.6)' } }),
        h('div', { style: { display: 'flex', flexGrow: '10', height: '28px', backgroundColor: 'rgba(255,210,0,0.75)' } }),
        h('div', { style: { display: 'flex', flexGrow: '5', height: '28px', backgroundColor: 'rgba(255,255,255,0.3)' } })
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
        ...allokation.map(a =>
          h('div', {
            style: {
              display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
              backgroundColor: C.cardBg, borderRadius: '14px', padding: '16px 24px'
            }
          },
            h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px' } },
              h('div', { style: { display: 'flex', width: '16px', height: '16px', borderRadius: '4px', backgroundColor: a.barColor } }),
              h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text } }, a.label)
            ),
            h('span', { style: { fontSize: '28px', fontWeight: 800, color: a.pct === 70 ? C.green : C.textSoft } }, a.wert)
          )
        )
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px',
          backgroundColor: 'rgba(16,185,129,0.08)', borderRadius: '14px', padding: '14px 22px',
          border: '1px solid rgba(16,185,129,0.2)'
        }
      },
        h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.green } }),
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft } }, 'Kein Finanzberatungsersatz — angepasst auf deine Situation prüfen.')
      )
    ),
    keyLearning('70 % Aktien-ETF ist das Fundament jedes Inflationsschutz-Portfolios.', C.green),
    igHandle(),
  ]);

  // ─── SLIDE 7: TAKEAWAYS ───────────────────────────────────────────────────────

  const learnings = [
    { num: '01', text: 'Prüfe jetzt: Wie viel deines Geldes liegt noch auf dem Sparbuch?', pct: 33 },
    { num: '02', text: 'Starte einen ETF-Sparplan — ab 25 EUR/Monat reicht es schon aus', pct: 66 },
    { num: '03', text: 'Kombiniere ETF + Immobilien-ETF + etwas Gold für echten Schutz', pct: 100 },
  ];

  const slide7 = slideRoot([
    topBar(),
    badge('DEINE 3 TAKEAWAYS'),
    headline('Das nimmst du mit', 62),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px',
            padding: '24px 28px', backgroundColor: C.cardBg, borderRadius: '18px'
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', { style: { fontSize: '40px', fontWeight: 800, color: l.pct === 100 ? C.green : C.text, minWidth: '60px' } }, l.num),
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3' } }, l.text)
          ),
          h('div', { style: { display: 'flex', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${l.pct}%`, height: '6px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px' } })
          )
        )
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px',
          backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '16px', padding: '20px 28px',
          border: '1px solid rgba(16,185,129,0.3)'
        }
      },
        h('div', { style: { display: 'flex', width: '6px', minHeight: '36px', backgroundColor: C.green, borderRadius: '3px' } }),
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, 'Schon 25 EUR pro Monat im ETF-Sparplan schützen langfristig vor Inflation.')
      )
    ),
    igHandle(),
  ]);

  // ─── SLIDE 8: CTA ─────────────────────────────────────────────────────────────

  const slide8 = slideRoot([
    h('div', {
      style: { display: 'flex', flexDirection: 'column', flex: '1', alignItems: 'center', justifyContent: 'center', gap: '28px' }
    },
      h('img', { src: logoB64, width: 130, height: 130, style: { borderRadius: '22px', objectFit: 'cover' } }),
      badge('JETZT HANDELN'),
      h('span', {
        style: {
          fontSize: '50px', fontWeight: 800, color: C.text,
          lineHeight: '1.15', letterSpacing: '-1.5px', textAlign: 'center'
        }
      }, 'Wie schützt du dein Geld vor Inflation?'),
      h('span', {
        style: { fontSize: '28px', fontWeight: 500, color: C.textMuted, textAlign: 'center' }
      }, 'Schreib es in die Kommentare!'),
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px', marginTop: '8px' } },
        h('div', { style: { display: 'flex', backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '50px', padding: '14px 28px', border: '1px solid rgba(16,185,129,0.3)' } },
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.green } }, 'ETF-Sparplan')
        ),
        h('div', { style: { display: 'flex', backgroundColor: C.cardBg, borderRadius: '50px', padding: '14px 28px' } },
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.text } }, 'Immobilien')
        ),
        h('div', { style: { display: 'flex', backgroundColor: C.cardBg, borderRadius: '50px', padding: '14px 28px' } },
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.text } }, 'Gold')
        )
      )
    ),
    h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' } },
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, 'Folge uns für mehr Finanzwissen:'),
      h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, '@benarofinanzen')
    ),
  ]);

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

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
