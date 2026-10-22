// generate.js — Carousel: MSCI World vs. FTSE All-World 2026
// Thema: Welcher ETF gehört wirklich ins Depot?
const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default;
  const { Resvg } = require('@resvg/resvg-js');

  const fontDir = path.join(__dirname, 'node_modules/@fontsource/outfit/files');
  const fonts = [400,500,600,700,800].flatMap(w => [
    { name:'Outfit', weight:w, style:'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-${w}-normal.woff`)) },
    { name:'Outfit', weight:w, style:'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-ext-${w}-normal.woff`)) },
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

  const W = 1080, H = 1350;

  const logoPath = path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg');
  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(logoPath).toString('base64');

  const outputDir = path.join(__dirname, 'output/carousel_2026-10-22/slides');

  const h = (type, props, ...ch) => ({
    type, props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  // ========== REUSABLE COMPONENTS ==========

  function slideRoot(children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column',
        width: W, height: H, padding: '70px',
        backgroundColor: C.bg, fontFamily: 'Outfit',
        position: 'relative',
      }
    }, ...children);
  }

  function badge(text, color) {
    const bg = color === 'green' ? C.green : color === 'red' ? C.red : C.cardBg;
    return h('div', { style: { display: 'flex', marginBottom: '18px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: bg,
          padding: '10px 22px', borderRadius: '12px'
        }
      }, text)
    );
  }

  function headline(text, size) {
    const sz = size || 64;
    return h('span', {
      style: {
        fontSize: `${sz}px`, fontWeight: 800,
        color: C.text, lineHeight: '1.08',
        letterSpacing: '-1.5px', marginBottom: '6px'
      }
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500,
        color: C.textMuted, lineHeight: '1.5', marginTop: '8px'
      }
    }, text);
  }

  function keyLearning(text, accentColor) {
    const accent = accentColor || C.text;
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px',
        padding: '22px 28px', marginTop: '16px'
      }
    },
      h('div', {
        style: {
          display: 'flex', width: '6px', minHeight: '40px',
          backgroundColor: accent, borderRadius: '3px', flexShrink: 0
        }
      }),
      h('span', {
        style: {
          fontSize: '27px', fontWeight: 600,
          color: C.text, lineHeight: '1.4'
        }
      }, text)
    );
  }

  function logoCorner() {
    return h('div', {
      style: {
        display: 'flex', position: 'absolute',
        top: '70px', right: '70px'
      }
    },
      h('img', {
        src: logoB64,
        width: 120, height: 120,
        style: { borderRadius: '12px', objectFit: 'cover' }
      })
    );
  }

  function igFooter() {
    return h('div', {
      style: { display: 'flex', alignItems: 'center', marginTop: '12px' }
    },
      h('span', {
        style: { fontSize: '24px', fontWeight: 500, color: C.textMuted }
      }, '@benarofinanzen')
    );
  }

  function visualBlock(children) {
    return h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '14px'
      }
    }, ...children);
  }

  // ========== SLIDE 1 — HOOK ==========
  const slide1 = slideRoot([
    logoCorner(),
    badge('WICHTIGE FRAGE'),
    headline('MSCI World oder FTSE All-World?', 62),
    subline('Fast niemand kennt den echten Unterschied — dabei ist er für dein Depot entscheidend.'),
    visualBlock([
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '20px',
            padding: '28px', gap: '14px',
            border: '2px solid rgba(255,255,255,0.2)'
          }
        },
          h('span', { style: { fontSize: '22px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'MSCI WORLD'),
          h('div', { style: { display: 'flex', height: '2px', backgroundColor: C.border, borderRadius: '1px' } }),
          h('span', { style: { fontSize: '52px', fontWeight: 800, color: C.text, lineHeight: '1' } }, '23'),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, 'Industrieländer'),
          h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.text } }, '~1.500'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, 'Aktien im ETF'),
          h('div', {
            style: {
              display: 'flex', padding: '10px 16px',
              backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '10px'
            }
          },
            h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.red } }, 'Keine Schwellenländer')
          )
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '20px',
            padding: '28px', gap: '14px',
            border: '2px solid rgba(16,185,129,0.5)'
          }
        },
          h('span', { style: { fontSize: '22px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'FTSE ALL-WORLD'),
          h('div', { style: { display: 'flex', height: '2px', backgroundColor: 'rgba(16,185,129,0.4)', borderRadius: '1px' } }),
          h('span', { style: { fontSize: '52px', fontWeight: 800, color: C.text, lineHeight: '1' } }, '49'),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, 'Länder weltweit'),
          h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.text } }, '~3.700'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, 'Aktien im ETF'),
          h('div', {
            style: {
              display: 'flex', padding: '10px 16px',
              backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '10px'
            }
          },
            h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.green } }, 'Inkl. Schwellenländer')
          )
        )
      )
    ]),
    keyLearning('Welcher ETF passt wirklich zu dir? Die Antwort überrascht viele.'),
    igFooter(),
  ]);

  // ========== SLIDE 2 — DIE 3 KERNUNTERSCHIEDE ==========
  const differences = [
    { label: 'Abgedeckte Länder', msci: '23', ftse: '49', unit: 'Industrieländer vs. global' },
    { label: 'Aktien im Fonds', msci: '~1.500', ftse: '~3.700', unit: 'Positionen im Portfolio' },
    { label: 'Schwellenländer-Anteil', msci: '0 %', ftse: '~10 %', unit: 'Anteil am Fondsvermögen' },
  ];

  const slide2 = slideRoot([
    logoCorner(),
    badge('DIE FAKTEN'),
    headline('3 Unterschiede die wirklich zählen', 58),
    visualBlock([
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '18px' } },
        ...differences.map(d =>
          h('div', {
            style: {
              display: 'flex', flexDirection: 'column',
              backgroundColor: C.cardBg, borderRadius: '18px',
              padding: '24px 28px', gap: '12px'
            }
          },
            h('span', {
              style: { fontSize: '21px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted }
            }, d.label.toUpperCase()),
            h('div', { style: { display: 'flex', gap: '16px', alignItems: 'center' } },
              h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', gap: '4px' } },
                h('span', { style: { fontSize: '19px', fontWeight: 600, color: C.textMuted } }, 'MSCI WORLD'),
                h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.text } }, d.msci)
              ),
              h('div', { style: { display: 'flex', width: '2px', height: '50px', backgroundColor: C.border } }),
              h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', gap: '4px' } },
                h('span', { style: { fontSize: '19px', fontWeight: 600, color: C.green } }, 'FTSE ALL-WORLD'),
                h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.text } }, d.ftse)
              )
            ),
            h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, d.unit)
          )
        )
      )
    ]),
    keyLearning('Der FTSE All-World ist breiter diversifiziert — bei nahezu gleicher Performance.'),
    igFooter(),
  ]);

  // ========== SLIDE 3 — FONDSGRÖSSE (Beliebt ≠ Besser) ==========
  const funds = [
    { name: 'iShares Core MSCI World', size: 60, pct: 100 },
    { name: 'Vanguard FTSE All-World', size: 22, pct: 37 },
    { name: 'Xtrackers MSCI World', size: 12, pct: 20 },
  ];

  const slide3 = slideRoot([
    logoCorner(),
    badge('BELIEBT ≠ BESSER'),
    headline('Warum der MSCI World so dominant ist', 54),
    subline('Fondsgröße der beliebtesten ETFs in Mrd. EUR (2026)'),
    visualBlock([
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '22px' } },
        ...funds.map((f, i) =>
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, f.name),
              h('span', { style: { fontSize: '30px', fontWeight: 800, color: i === 1 ? C.green : C.text } }, `${f.size} Mrd.`)
            ),
            h('div', {
              style: {
                display: 'flex', height: '22px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: '11px', overflow: 'hidden'
              }
            },
              h('div', {
                style: {
                  display: 'flex', width: `${f.pct}%`, height: '22px',
                  backgroundColor: i === 1 ? C.green : C.text,
                  borderRadius: '11px'
                }
              })
            )
          )
        ),
        h('div', {
          style: {
            display: 'flex', marginTop: '10px', padding: '22px 26px',
            backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '14px',
            gap: '14px', alignItems: 'flex-start'
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '12px', height: '12px',
              borderRadius: '6px', backgroundColor: C.red,
              flexShrink: 0, marginTop: '6px'
            }
          }),
          h('span', {
            style: { fontSize: '25px', fontWeight: 600, color: C.textSoft, lineHeight: '1.45' }
          }, 'Mehr Fondsvermögen bedeutet mehr Anlegervertrauen — aber keine höhere Rendite')
        )
      )
    ]),
    keyLearning('Fondsgröße ist Vertrauen — aber kein Qualitätsmerkmal für zukünftige Renditen.', C.red),
    igFooter(),
  ]);

  // ========== SLIDE 4 — REALITÄTSCHECK ==========
  const slide4 = slideRoot([
    logoCorner(),
    badge('REALITÄTSCHECK'),
    headline('Was du denkst — und was stimmt', 58),
    visualBlock([
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
        h('div', { style: { display: 'flex', gap: '14px' } },
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column',
              backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '20px',
              padding: '28px', gap: '14px',
              border: '1px solid rgba(239,68,68,0.3)'
            }
          },
            h('span', { style: { fontSize: '21px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'DEIN GEDANKE'),
            h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(239,68,68,0.35)', borderRadius: '2px' } }),
            h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.textSoft, lineHeight: '1.45' } },
              '"FTSE All-World ist deutlich riskanter wegen der Schwellenländer"')
          ),
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column',
              backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '20px',
              padding: '28px', gap: '14px',
              border: '1px solid rgba(16,185,129,0.35)'
            }
          },
            h('span', { style: { fontSize: '21px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'DIE WAHRHEIT'),
            h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(16,185,129,0.4)', borderRadius: '2px' } }),
            h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.text, lineHeight: '1.45' } },
              'Schwellenländer = nur ~10 % des FTSE All-World. Der Unterschied ist minimal.')
          )
        ),
        h('div', { style: { display: 'flex', gap: '14px' } },
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column',
              backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '20px',
              padding: '26px 28px', gap: '12px',
              border: '1px solid rgba(239,68,68,0.3)'
            }
          },
            h('span', { style: { fontSize: '21px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'NOCH EIN MYTHOS'),
            h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(239,68,68,0.35)', borderRadius: '2px' } }),
            h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4', textDecoration: 'line-through' } },
              '"MSCI World ist sicherer"')
          ),
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column',
              backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '20px',
              padding: '26px 28px', gap: '12px',
              border: '1px solid rgba(16,185,129,0.35)'
            }
          },
            h('span', { style: { fontSize: '21px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'BEIDES IST GUT'),
            h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(16,185,129,0.4)', borderRadius: '2px' } }),
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.4' } },
              'Beide ETFs gelten als erstklassige Kern-ETFs')
          )
        )
      )
    ]),
    keyLearning('10 % Schwellenländer ändern das Risikoprofil kaum — erhöhen aber die Diversifikation.'),
    igFooter(),
  ]);

  // ========== SLIDE 5 — PERFORMANCE-VERGLEICH (Line Chart) ==========
  // SVG Line Chart: 2010–2026, beide Linien nahezu identisch (~+290%)
  const msciPts = [
    [0,271],[54,273],[108,256],[161,231],[215,219],
    [269,207],[323,197],[376,166],[430,181],[484,134],
    [538,129],[591,73],[645,114],[699,83],[753,46],[806,22],[860,9]
  ];
  const ftsePts = [
    [0,273],[54,275],[108,259],[161,234],[215,222],
    [269,210],[323,200],[376,169],[430,184],[484,137],
    [538,132],[591,76],[645,117],[699,86],[753,49],[806,25],[860,4]
  ];
  const msciPath = 'M ' + msciPts.map(p => p.join(',')).join(' L ');
  const ftsePath = 'M ' + ftsePts.map(p => p.join(',')).join(' L ');

  const chartSvg = `<svg width="860" height="290" viewBox="0 0 860 290" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.03"/>
    </linearGradient>
    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#10B981" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#10B981" stop-opacity="0.03"/>
    </linearGradient>
  </defs>
  <line x1="0" y1="265" x2="860" y2="265" stroke="rgba(255,255,255,0.12)" stroke-width="1" stroke-dasharray="8,6"/>
  <line x1="0" y1="185" x2="860" y2="185" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="8,6"/>
  <line x1="0" y1="105" x2="860" y2="105" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="8,6"/>
  <path d="${msciPath} L 860,290 L 0,290 Z" fill="url(#g1)"/>
  <path d="${ftsePath} L 860,290 L 0,290 Z" fill="url(#g2)"/>
  <path d="${msciPath}" stroke="#FFFFFF" stroke-width="3.5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="${ftsePath}" stroke="#10B981" stroke-width="3.5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
  <circle cx="860" cy="9" r="7" fill="#FFFFFF"/>
  <circle cx="860" cy="4" r="7" fill="#10B981"/>
</svg>`;
  const chartSrc = `data:image/svg+xml;base64,${Buffer.from(chartSvg).toString('base64')}`;

  const slide5 = slideRoot([
    logoCorner(),
    badge('PERFORMANCE 2010–2026'),
    headline('16 Jahre im Vergleich', 62),
    subline('1.000 EUR angelegt — wer wäre reicher geworden?'),
    visualBlock([
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
        h('div', { style: { display: 'flex', gap: '28px', marginBottom: '4px' } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
            h('div', { style: { display: 'flex', width: '28px', height: '4px', backgroundColor: C.text, borderRadius: '2px' } }),
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft } }, 'MSCI World')
          ),
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
            h('div', { style: { display: 'flex', width: '28px', height: '4px', backgroundColor: C.green, borderRadius: '2px' } }),
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft } }, 'FTSE All-World')
          )
        ),
        h('img', { src: chartSrc, width: 860, height: 290, style: { objectFit: 'contain' } }),
        h('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: '4px' } },
          h('span', { style: { fontSize: '21px', fontWeight: 600, color: C.textMuted } }, '2010'),
          h('span', { style: { fontSize: '21px', fontWeight: 600, color: C.textMuted } }, '2015'),
          h('span', { style: { fontSize: '21px', fontWeight: 600, color: C.textMuted } }, '2020'),
          h('span', { style: { fontSize: '21px', fontWeight: 600, color: C.textMuted } }, '2026')
        ),
        h('div', { style: { display: 'flex', gap: '14px', marginTop: '8px' } },
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column',
              backgroundColor: C.cardBg, borderRadius: '16px',
              padding: '20px 22px', gap: '4px'
            }
          },
            h('span', { style: { fontSize: '21px', fontWeight: 600, color: C.textMuted } }, 'MSCI World'),
            h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.text } }, '+290 %'),
            h('span', { style: { fontSize: '19px', fontWeight: 500, color: C.textMuted } }, '~7,1 % p.a.')
          ),
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column',
              backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '16px',
              padding: '20px 22px', gap: '4px',
              border: '1px solid rgba(16,185,129,0.3)'
            }
          },
            h('span', { style: { fontSize: '21px', fontWeight: 600, color: C.green } }, 'FTSE All-World'),
            h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.text } }, '+295 %'),
            h('span', { style: { fontSize: '19px', fontWeight: 500, color: C.textMuted } }, '~7,2 % p.a.')
          )
        )
      )
    ]),
    keyLearning('Beide ETFs liefern langfristig ~7 % p.a. — der Performance-Unterschied ist vernachlässigbar.'),
    igFooter(),
  ]);

  // ========== SLIDE 6 — SO ENTSCHEIDEST DU ==========
  const criteria = [
    {
      num: '01',
      title: 'Gesamtkostenquote (TER)',
      msci: '0,20 % p.a.',
      ftse: '0,22 % p.a.',
      winner: 'msci',
      note: 'iShares Core MSCI World minimal günstiger'
    },
    {
      num: '02',
      title: 'Tracking-Differenz',
      msci: '~0,10 %',
      ftse: '~0,08 %',
      winner: 'ftse',
      note: 'FTSE All-World bildet seinen Index geringfügig präziser ab'
    },
    {
      num: '03',
      title: 'Fondsgröße (Liquidität)',
      msci: '60+ Mrd.',
      ftse: '22 Mrd.',
      winner: 'msci',
      note: 'Mehr Kapital bedeutet niedrigere Spreads beim Handeln'
    },
  ];

  const slide6 = slideRoot([
    logoCorner(),
    badge('SO ENTSCHEIDEST DU'),
    headline('3 Kriterien für deine Wahl', 60),
    visualBlock([
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
        ...criteria.map(c =>
          h('div', {
            style: {
              display: 'flex', flexDirection: 'column',
              backgroundColor: C.cardBg, borderRadius: '18px',
              padding: '22px 26px', gap: '12px'
            }
          },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.textSoft } }, `${c.num}. ${c.title}`),
              h('span', {
                style: {
                  fontSize: '20px', fontWeight: 700,
                  color: c.winner === 'msci' ? C.text : C.green,
                  backgroundColor: c.winner === 'msci' ? 'rgba(255,255,255,0.12)' : 'rgba(16,185,129,0.15)',
                  padding: '5px 14px', borderRadius: '8px'
                }
              }, c.winner === 'msci' ? 'MSCI besser' : 'FTSE besser')
            ),
            h('div', { style: { display: 'flex', gap: '12px' } },
              h('div', {
                style: {
                  display: 'flex', flex: '1', flexDirection: 'row',
                  justifyContent: 'space-between', alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px',
                  padding: '10px 16px'
                }
              },
                h('span', { style: { fontSize: '19px', fontWeight: 600, color: C.textMuted } }, 'MSCI World'),
                h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.text } }, c.msci)
              ),
              h('div', {
                style: {
                  display: 'flex', flex: '1', flexDirection: 'row',
                  justifyContent: 'space-between', alignItems: 'center',
                  backgroundColor: 'rgba(16,185,129,0.08)', borderRadius: '10px',
                  padding: '10px 16px'
                }
              },
                h('span', { style: { fontSize: '19px', fontWeight: 600, color: C.green } }, 'FTSE All-World'),
                h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.text } }, c.ftse)
              )
            ),
            h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, c.note)
          )
        ),
        h('div', {
          style: {
            display: 'flex', padding: '20px 24px',
            backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '14px',
            gap: '12px', alignItems: 'flex-start',
            border: '1px solid rgba(16,185,129,0.3)'
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '12px', height: '12px',
              borderRadius: '6px', backgroundColor: C.green,
              flexShrink: 0, marginTop: '6px'
            }
          }),
          h('span', {
            style: { fontSize: '25px', fontWeight: 600, color: C.text, lineHeight: '1.4' }
          }, 'Fazit: Wähle den ETF mit dem besseren Angebot bei deinem Broker — beide sind exzellent')
        )
      )
    ]),
    keyLearning('Den einen richtigen ETF gibt es nicht — beide sind solide Kerninvestments.'),
    igFooter(),
  ]);

  // ========== SLIDE 7 — KEY LEARNINGS ==========
  const learnings = [
    { num: '01', text: 'MSCI World: 23 Industrieländer, ~1.500 Aktien — ohne Schwellenländer', pct: 25 },
    { num: '02', text: 'FTSE All-World: 49 Länder, ~3.700 Aktien — inkl. ~10 % Schwellenländer', pct: 50 },
    { num: '03', text: 'Performance nahezu identisch: beide ~7 % p.a. über 16 Jahre (2010–2026)', pct: 75 },
    { num: '04', text: 'Entscheide nach TER + Broker-Angebot — nicht nach Beliebtheit oder Name', pct: 100 },
  ];

  const slide7 = slideRoot([
    logoCorner(),
    badge('DEIN TAKEAWAY'),
    headline('Das Wichtigste auf einen Blick', 58),
    visualBlock([
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px' } },
        ...learnings.map(l =>
          h('div', {
            style: {
              display: 'flex', flexDirection: 'column', gap: '10px',
              padding: '22px 26px', backgroundColor: C.cardBg,
              borderRadius: '18px'
            }
          },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
              h('span', {
                style: {
                  fontSize: '38px', fontWeight: 800,
                  color: l.pct === 100 ? C.green : C.text,
                  minWidth: '58px'
                }
              }, l.num),
              h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.35' } }, l.text)
            ),
            h('div', {
              style: {
                display: 'flex', height: '6px',
                backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden'
              }
            },
              h('div', {
                style: {
                  display: 'flex', width: `${l.pct}%`, height: '6px',
                  backgroundColor: l.pct === 100 ? C.green : C.text,
                  borderRadius: '3px'
                }
              })
            )
          )
        )
      )
    ]),
    keyLearning('Beide ETFs sind hervorragende Kern-ETFs für jedes langfristige Depot.', C.green),
    igFooter(),
  ]);

  // ========== SLIDE 8 — CTA ==========
  const slide8 = slideRoot([
    logoCorner(),
    badge('DEINE MEINUNG'),
    visualBlock([
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '26px', flex: '1'
        }
      },
        h('span', {
          style: {
            fontSize: '64px', fontWeight: 800, color: C.text,
            lineHeight: '1.1', textAlign: 'center', letterSpacing: '-1.5px'
          }
        }, 'Welchen ETF sparst du gerade?'),
        h('span', {
          style: {
            fontSize: '30px', fontWeight: 500, color: C.textMuted,
            textAlign: 'center', lineHeight: '1.5'
          }
        }, 'Schreib es in die Kommentare — wir sind gespannt!'),
        h('div', { style: { display: 'flex', gap: '14px', marginTop: '8px' } },
          h('div', {
            style: {
              display: 'flex', padding: '18px 28px',
              backgroundColor: C.cardBg, borderRadius: '16px'
            }
          },
            h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'MSCI World')
          ),
          h('div', {
            style: {
              display: 'flex', padding: '18px 28px',
              backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '16px',
              border: '1px solid rgba(16,185,129,0.4)'
            }
          },
            h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.green } }, 'FTSE All-World')
          ),
          h('div', {
            style: {
              display: 'flex', padding: '18px 28px',
              backgroundColor: C.cardBg, borderRadius: '16px'
            }
          },
            h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.textMuted } }, 'Noch keinen')
          )
        ),
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '10px', marginTop: '10px'
          }
        },
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, textAlign: 'center' } },
            'Mehr Wissen rund um ETFs und Finanzen:'),
          h('span', { style: { fontSize: '34px', fontWeight: 800, color: C.text } }, '@benarofinanzen'),
          h('div', {
            style: {
              display: 'flex', padding: '12px 24px',
              backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '12px',
              border: '1px solid rgba(16,185,129,0.3)'
            }
          },
            h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.green } }, 'Speichern nicht vergessen')
          )
        )
      )
    ]),
    keyLearning('Folge @benarofinanzen für wöchentliche Finanzinhalte ohne Fachjargon.', C.green),
    igFooter(),
  ]);

  // ========== ALLE SLIDES GENERIEREN ==========
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outputDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} generiert: ${pngPath}`);
  }
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
