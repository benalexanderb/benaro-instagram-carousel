// Carousel: Die 4%-Regel — Wie du deinen ETF-Sparplan im Ruhestand sicher entsparst
// Inspiration: @finanzcopilot — Entsparphase & Ruhestandsplanung, hochaktuelles Thema Juli 2026
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

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')
  ).toString('base64');

  const C = {
    bg: '#001f60',
    text: '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted: '#9CA3AF',
    cardBg: 'rgba(255,255,255,0.10)',
    border: 'rgba(255,255,255,0.20)',
    green: '#10B981',
    red: '#EF4444',
  };

  const W = 1080, H = 1350;

  const h = (type, props, ...ch) => ({
    type,
    props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '16px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: C.cardBg,
          padding: '10px 22px', borderRadius: '12px'
        }
      }, text)
    );
  }

  function headline(text, size) {
    return h('span', {
      style: {
        fontSize: (size || 64) + 'px', fontWeight: 800, color: C.text,
        lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '6px'
      }
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: { fontSize: '28px', fontWeight: 500, color: C.textMuted, lineHeight: '1.5', marginTop: '8px' }
    }, text);
  }

  function keyLearning(text, accentColor) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px', marginTop: 'auto'
      }
    },
      h('div', { style: { display: 'flex', width: '6px', minHeight: '40px', backgroundColor: accentColor || C.text, borderRadius: '3px' } }),
      h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, text)
    );
  }

  function footer() {
    return h('div', { style: { display: 'flex', alignItems: 'center', marginTop: '14px' } },
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, '@benarofinanzen')
    );
  }

  function logoImg(size) {
    size = size || 100;
    return h('img', { src: logoB64, width: size, height: size, style: { borderRadius: '12px', objectFit: 'cover' } });
  }

  function slideWrap(children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column', width: W, height: H,
        padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
      }
    },
      h('div', { style: { display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' } },
        logoImg(96)
      ),
      ...children
    );
  }

  // =========================================================
  // SLIDE 1 — HOOK
  // =========================================================
  const slide1 = slideWrap([
    badge('ACHTUNG'),
    headline('Du sparst fleissig ETFs an.', 66),
    headline('Aber weisst du wie du das Geld sicher zurueckholst?', 50),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      h('div', { style: { display: 'flex', gap: '18px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', gap: '14px',
            backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '20px', padding: '30px 20px',
            border: '2px solid rgba(16,185,129,0.35)'
          }
        },
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' } },
            h('div', { style: { display: 'flex', width: '0', height: '0', borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderBottom: '36px solid #10B981' } }),
            h('div', { style: { display: 'flex', width: '14px', height: '50px', backgroundColor: '#10B981', borderRadius: '0 0 4px 4px' } })
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: '#10B981', textAlign: 'center' } }, 'ANSPARPHASE'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, textAlign: 'center', lineHeight: '1.4' } }, '20-40 Jahre sparst du fleissig')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', gap: '14px',
            backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '20px', padding: '30px 20px',
            border: '2px solid rgba(239,68,68,0.35)'
          }
        },
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' } },
            h('div', { style: { display: 'flex', width: '14px', height: '50px', backgroundColor: '#EF4444', borderRadius: '4px 4px 0 0' } }),
            h('div', { style: { display: 'flex', width: '0', height: '0', borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: '36px solid #EF4444' } })
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: '#EF4444', textAlign: 'center' } }, 'ENTSPARPHASE'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, textAlign: 'center', lineHeight: '1.4' } }, 'Ohne Plan = groesstes Risiko')
        )
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px'
        }
      },
        h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.text, textAlign: 'center', lineHeight: '1.35' } },
          'Die meisten planen die Ansparphase perfekt — und ignorieren die Entsparphase komplett'
        )
      )
    ),
    keyLearning('Wer keinen Entnahmeplan hat, riskiert sein Depot in 10-15 Jahren aufzubrauchen'),
    footer()
  ]);

  // =========================================================
  // SLIDE 2 — STAT HERO: 73% haben keinen Entsparplan
  // =========================================================
  const slide2 = slideWrap([
    badge('DAS PROBLEM'),
    headline('Kaum ein ETF-Anleger plant die Entsparphase', 52),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '22px' } },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '24px', padding: '40px 50px', gap: '12px',
          border: '2px solid rgba(239,68,68,0.3)', width: '100%'
        }
      },
        h('span', { style: { fontSize: '136px', fontWeight: 800, color: '#EF4444', lineHeight: '1', letterSpacing: '-4px' } }, '73%'),
        h('span', { style: { fontSize: '30px', fontWeight: 600, color: C.textSoft, textAlign: 'center', lineHeight: '1.4' } },
          'der ETF-Anleger haben KEINEN konkreten Plan, wie sie ihr Depot im Ruhestand entsparen'
        )
      ),
      h('div', { style: { display: 'flex', gap: '16px', width: '100%' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg,
            borderRadius: '18px', padding: '22px', gap: '8px', alignItems: 'center'
          }
        },
          h('span', { style: { fontSize: '44px', fontWeight: 800, color: C.green } }, '27%'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, textAlign: 'center', lineHeight: '1.3' } }, 'haben einen Entnahmeplan')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg,
            borderRadius: '18px', padding: '22px', gap: '8px', alignItems: 'center'
          }
        },
          h('span', { style: { fontSize: '44px', fontWeight: 800, color: '#EF4444' } }, '73%'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, textAlign: 'center', lineHeight: '1.3' } }, 'improvisieren oder kein Plan')
        )
      )
    ),
    keyLearning('Fleissiges Ansparen allein reicht nicht — der Entnahmeplan entscheidet alles'),
    footer()
  ]);

  // =========================================================
  // SLIDE 3 — SEQUENZRISIKO mit SVG Chart
  // =========================================================
  const chartSvg = `<svg width="900" height="310" viewBox="0 0 900 310" xmlns="http://www.w3.org/2000/svg">
  <line x1="60" y1="15" x2="60" y2="280" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
  <line x1="60" y1="280" x2="880" y2="280" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
  <line x1="60" y1="90" x2="880" y2="90" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="8,6"/>
  <line x1="60" y1="185" x2="880" y2="185" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="8,6"/>
  <path d="M 60 230 C 120 215 170 225 250 205 C 310 190 340 200 390 180 C 410 150 430 135 470 125 C 550 105 630 90 720 75 C 790 62 850 58 880 52" fill="none" stroke="#10B981" stroke-width="3.5"/>
  <path d="M 60 230 C 120 215 170 225 250 205 C 310 190 340 200 390 180 C 400 220 410 258 440 268 C 500 278 590 279 700 280 C 780 280 840 280 880 280" fill="none" stroke="#EF4444" stroke-width="3.5"/>
  <circle cx="390" cy="180" r="7" fill="rgba(255,255,255,0.9)"/>
  <line x1="390" y1="25" x2="390" y2="280" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" stroke-dasharray="6,4"/>
  <path d="M 60 230 C 120 215 170 225 250 205 C 310 190 340 200 390 180 C 410 125 470 125 470 125" fill="rgba(16,185,129,0.08)" stroke="none"/>
  </svg>`;

  const chartSrc = 'data:image/svg+xml;base64,' + Buffer.from(chartSvg).toString('base64');

  const slide3 = slideWrap([
    badge('VERSTECKTES RISIKO'),
    headline('1 Crash im Jahr 1 der Rente kann das Depot ruinieren', 50),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      h('img', { src: chartSrc, width: 900, height: 310, style: { objectFit: 'contain', width: '100%' } }),
      h('div', { style: { display: 'flex', gap: '50px', justifyContent: 'center' } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          h('div', { style: { display: 'flex', width: '32px', height: '4px', backgroundColor: '#10B981', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: '#10B981' } }, 'Guter Rentenstart')
        ),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          h('div', { style: { display: 'flex', width: '32px', height: '4px', backgroundColor: '#EF4444', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: '#EF4444' } }, 'Crash im 1. Rentenjahr')
        )
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'flex-start', gap: '12px',
          backgroundColor: 'rgba(239,68,68,0.10)', borderRadius: '14px', padding: '20px 24px',
          border: '1px solid rgba(239,68,68,0.25)'
        }
      },
        h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '6px', backgroundColor: '#EF4444', marginTop: '8px', flexShrink: '0' } }),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: '#EF4444', lineHeight: '1.4' } },
          'Sequenzrisiko: Bei fruehen Entnahmen + Crash erholt sich das Depot nie wieder vollstaendig'
        )
      )
    ),
    keyLearning('Der Zeitpunkt der ersten Entnahme ist genauso wichtig wie die Langzeit-Rendite'),
    footer()
  ]);

  // =========================================================
  // SLIDE 4 — ERWARTUNG vs REALITAET
  // =========================================================
  const slide4 = slideWrap([
    badge('DER IRRTUM'),
    headline('Was die meisten denken vs. was wirklich passiert', 50),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg,
            borderRadius: '20px', padding: '28px', gap: '14px'
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'ERWARTUNG'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.textSoft, lineHeight: '1.45' } },
            '"Ich entnehme einfach monatlich was ich brauche. Das Depot reicht schon irgendwie."'
          )
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: '#FFFFFF',
            borderRadius: '20px', padding: '28px', gap: '14px'
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: 'rgba(0,31,96,0.5)' } }, 'REALITAET'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(0,31,96,0.15)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '27px', fontWeight: 600, color: '#001f60', lineHeight: '1.45' } },
            'Ohne Strategie kann ein schlechtes Boersenjahr das Depot in 10-12 Jahren komplett aufzehren.'
          )
        )
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: C.cardBg,
          borderRadius: '18px', padding: '22px 26px'
        }
      },
        h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.textMuted, letterSpacing: '2px' } }, 'DAS ECHTE PROBLEM'),
        h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.text, lineHeight: '1.4' } },
          'Zu hohe Entnahmen + schlechte Marktphase = Depot leer bevor das Leben endet'
        )
      )
    ),
    keyLearning('Eine Entnahme-Strategie ist genauso wichtig wie ein Anspar-Plan'),
    footer()
  ]);

  // =========================================================
  // SLIDE 5 — DIE 4%-REGEL erklaert
  // =========================================================
  const slide5 = slideWrap([
    badge('DIE LOESUNG'),
    headline('Die 4%-Regel: Dein sicherer Entnahmeplan', 54),
    subline('Entwickelt aus 50+ Jahren Boersen-Daten'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', gap: '10px',
          backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '20px', padding: '26px 30px',
          border: '2px solid rgba(16,185,129,0.35)'
        }
      },
        h('span', { style: { fontSize: '22px', fontWeight: 700, color: '#10B981', letterSpacing: '2px' } }, 'DIE FORMEL'),
        h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.text, lineHeight: '1.2' } },
          'Depotwert x 4% / 12 = Sichere Monatsentnahme'
        )
      ),
      h('div', { style: { display: 'flex', gap: '14px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg,
            borderRadius: '18px', padding: '22px', gap: '8px', alignItems: 'center'
          }
        },
          h('span', { style: { fontSize: '35px', fontWeight: 800, color: '#10B981' } }, '100 T'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, textAlign: 'center' } }, 'EUR Depot'),
          h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: C.border } }),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, '333 EUR/Mon')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg,
            borderRadius: '18px', padding: '22px', gap: '8px', alignItems: 'center'
          }
        },
          h('span', { style: { fontSize: '35px', fontWeight: 800, color: '#10B981' } }, '250 T'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, textAlign: 'center' } }, 'EUR Depot'),
          h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: C.border } }),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, '833 EUR/Mon')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg,
            borderRadius: '18px', padding: '22px', gap: '8px', alignItems: 'center'
          }
        },
          h('span', { style: { fontSize: '35px', fontWeight: 800, color: '#10B981' } }, '500 T'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, textAlign: 'center' } }, 'EUR Depot'),
          h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: C.border } }),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, '1.666 EUR/Mon')
        )
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'flex-start', gap: '12px', backgroundColor: C.cardBg,
          borderRadius: '14px', padding: '18px 22px'
        }
      },
        h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: '#10B981', marginTop: '10px', flexShrink: '0' } }),
        h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } },
          'Das Depot bleibt dabei nominell erhalten oder waechst sogar weiter'
        )
      )
    ),
    keyLearning('4% pro Jahr ist die Grenze bei der dein Depot statistisch 30+ Jahre haelt', C.green),
    footer()
  ]);

  // =========================================================
  // SLIDE 6 — BEWEIS: Trinity Study
  // =========================================================
  const bars = [
    { rate: '3%', pct: 100, label: '100% aller Szenarien erfolgreich', color: '#10B981' },
    { rate: '4%', pct: 95, label: '95% — optimaler Mittelweg', color: '#10B981' },
    { rate: '5%', pct: 82, label: '82% — schon riskant', color: '#F59E0B' },
    { rate: '6%', pct: 68, label: '68% — hohes Depot-Pleite-Risiko', color: '#EF4444' },
  ];

  const slide6 = slideWrap([
    badge('DER BEWEIS'),
    headline('Trinity Study: 30 Jahre Marktdaten', 56),
    subline('Depot-Ueberlebensrate je nach jaehrlicher Entnahme-Rate'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px' } },
        ...bars.map(b =>
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
                h('div', {
                  style: {
                    display: 'flex', width: '68px', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '8px 12px'
                  }
                },
                  h('span', { style: { fontSize: '27px', fontWeight: 800, color: b.color } }, b.rate)
                ),
                h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft } }, b.label)
              ),
              h('span', { style: { fontSize: '30px', fontWeight: 800, color: b.color } }, b.pct + '%')
            ),
            h('div', { style: { display: 'flex', height: '12px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' } },
              h('div', { style: { display: 'flex', width: b.pct + '%', height: '12px', backgroundColor: b.color, borderRadius: '6px' } })
            )
          )
        )
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'flex-start', gap: '12px',
          backgroundColor: 'rgba(16,185,129,0.10)', borderRadius: '14px', padding: '18px 22px',
          border: '1px solid rgba(16,185,129,0.25)'
        }
      },
        h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '6px', backgroundColor: '#10B981', marginTop: '8px', flexShrink: '0' } }),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } },
          '4% ist der goldene Mittelweg: Hohe Sicherheit UND noch genug Lebensqualitaet im Alter'
        )
      )
    ),
    keyLearning('Ab 5% Entnahme steigt das Depot-Pleite-Risiko auf 18% — die 4%-Regel ist kein Zufall', C.green),
    footer()
  ]);

  // =========================================================
  // SLIDE 7 — 4-SCHRITT FAHRPLAN
  // =========================================================
  const learnings = [
    { num: '01', text: 'Zieldepot berechnen: Jaehrl. Bedarf x 25 = noetiges Depot', pct: 25 },
    { num: '02', text: 'Liquiditaetspuffer anlegen: 2 Jahrsentnahmen als Tagesgeld', pct: 50 },
    { num: '03', text: '4%-Regel als Basis nutzen und jaehrlich neu berechnen', pct: 75 },
    { num: '04', text: 'Jaehrliches Rebalancing beibehalten — nie auslassen', pct: 100 },
  ];

  const slide7 = slideWrap([
    badge('DEIN FAHRPLAN'),
    headline('4 Schritte zur sicheren Entsparphase', 55),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px',
            padding: '20px 24px', backgroundColor: C.cardBg, borderRadius: '18px'
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', { style: { fontSize: '36px', fontWeight: 800, color: l.pct === 100 ? '#10B981' : C.text, minWidth: '56px' } }, l.num),
            h('span', { style: { fontSize: '25px', fontWeight: 600, color: C.text, lineHeight: '1.3' } }, l.text)
          ),
          h('div', { style: { display: 'flex', height: '6px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: l.pct + '%', height: '6px', backgroundColor: l.pct === 100 ? '#10B981' : C.text, borderRadius: '3px' } })
          )
        )
      )
    ),
    keyLearning('Mit diesen 4 Schritten sorgst du dafuer dass dein Depot laenger haelt als du lebst', C.green),
    footer()
  ]);

  // =========================================================
  // SLIDE 8 — CTA
  // =========================================================
  const slide8 = slideWrap([
    badge('JETZT DU'),
    headline('Wie gross muss dein persoenliches Zieldepot sein?', 52),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '22px', alignItems: 'center' } },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(16,185,129,0.12)',
          borderRadius: '24px', padding: '32px 40px', gap: '16px', width: '100%',
          border: '2px solid rgba(16,185,129,0.35)', alignItems: 'center'
        }
      },
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textMuted, letterSpacing: '2px' } }, 'DEINE FORMEL'),
        h('span', { style: { fontSize: '44px', fontWeight: 800, color: C.text, textAlign: 'center', lineHeight: '1.15' } },
          'Jaehrl. Bedarf x 25 = Zieldepot'
        ),
        h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: 'rgba(16,185,129,0.3)' } }),
        h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft, textAlign: 'center', lineHeight: '1.35' } },
          '24.000 EUR Jahresbedarf x 25 = 600.000 EUR Zieldepot'
        )
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' } },
        h('span', { style: { fontSize: '34px', fontWeight: 700, color: C.text, textAlign: 'center', lineHeight: '1.3' } },
          'Speichern nicht vergessen! Rechne jetzt deinen Zielwert.'
        ),
        h('span', { style: { fontSize: '27px', fontWeight: 500, color: C.textMuted, textAlign: 'center', lineHeight: '1.4' } },
          'Schreib uns in die Kommentare: Wie weit bist du auf dem Weg zu deinem Zieldepot?'
        )
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          backgroundColor: C.cardBg, borderRadius: '16px', padding: '18px 36px', width: '100%'
        }
      },
        h('span', { style: { fontSize: '25px', fontWeight: 600, color: C.textSoft, textAlign: 'center' } }, 'Folge uns fuer mehr Finanzwissen'),
        h('span', { style: { fontSize: '28px', fontWeight: 700, color: '#10B981' } }, '@benarofinanzen')
      )
    ),
    footer()
  ]);

  // =========================================================
  // GENERATE ALL SLIDES
  // =========================================================
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  const outDir = path.join(__dirname, 'output', 'carousel_2026-07-16', 'slides');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

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
