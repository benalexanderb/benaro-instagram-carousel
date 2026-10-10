// generate.js — Carousel: Verlustverrechnung 2026
// Thema: Der Steuertrick den 70 % der ETF-Anleger nicht nutzen
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

  const outputDir = path.join(__dirname, 'output/carousel_2026-10-10/slides');

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
      style: {
        display: 'flex', alignItems: 'center', marginTop: '12px'
      }
    },
      h('span', {
        style: {
          fontSize: '24px', fontWeight: 500, color: C.textMuted
        }
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
    badge('STEUERTIPP 2026', 'green'),
    headline('Du verlierst jedes Jahr Steuergeld —', 62),
    headline('weil du diesen Trick nicht kennst', 62),
    subline('Was clevere ETF-Anleger vor dem 31. Dezember tun'),
    visualBlock([
      (() => {
        // SVG: Two piles of coins with an arrow connecting them
        const svg = `<svg width="860" height="380" viewBox="0 0 860 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gr1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EF4444" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#EF4444" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="gr2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10B981" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#10B981" stop-opacity="0.4"/>
    </linearGradient>
  </defs>
  <!-- Left: Tax burden (red) -->
  <rect x="60" y="80" width="280" height="220" rx="20" fill="url(#gr1)" stroke="rgba(239,68,68,0.6)" stroke-width="2"/>
  <rect x="90" y="160" width="220" height="8" rx="4" fill="rgba(255,255,255,0.3)"/>
  <rect x="90" y="185" width="180" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
  <rect x="90" y="210" width="200" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
  <circle cx="200" cy="125" r="30" fill="rgba(239,68,68,0.4)" stroke="rgba(239,68,68,0.6)" stroke-width="2"/>
  <line x1="186" y1="125" x2="214" y2="125" stroke="white" stroke-width="4" stroke-linecap="round"/>
  <!-- Arrow in center -->
  <line x1="380" y1="190" x2="490" y2="190" stroke="rgba(255,255,255,0.6)" stroke-width="4" stroke-dasharray="12,8"/>
  <polygon points="490,180 510,190 490,200" fill="rgba(255,255,255,0.6)"/>
  <!-- Right: Savings (green) -->
  <rect x="520" y="80" width="280" height="220" rx="20" fill="url(#gr2)" stroke="rgba(16,185,129,0.6)" stroke-width="2"/>
  <rect x="550" y="160" width="220" height="8" rx="4" fill="rgba(255,255,255,0.3)"/>
  <rect x="550" y="185" width="180" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
  <rect x="550" y="210" width="200" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
  <circle cx="660" cy="125" r="30" fill="rgba(16,185,129,0.4)" stroke="rgba(16,185,129,0.6)" stroke-width="2"/>
  <line x1="646" y1="125" x2="674" y2="125" stroke="white" stroke-width="4" stroke-linecap="round"/>
  <line x1="660" y1="111" x2="660" y2="139" stroke="white" stroke-width="4" stroke-linecap="round"/>
</svg>`;
        const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
        return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
          h('img', { src, width: 860, height: 380, style: { objectFit: 'contain' } }),
          h('div', { style: { display: 'flex', justifyContent: 'space-around', paddingLeft: '60px', paddingRight: '60px' } },
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.red, textAlign: 'center' } }, 'Ohne Trick'),
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.green, textAlign: 'center' } }, 'Mit Trick')
          )
        );
      })()
    ]),
    keyLearning('Verlustverrechnung ist legal, einfach — und kaum jemand nutzt sie.'),
    igFooter(),
  ]);

  // ========== SLIDE 2 — STAT HERO ==========
  const slide2 = slideRoot([
    logoCorner(),
    badge('ÜBERRASCHENDE ZAHL'),
    headline('Kaum ein Anleger nutzt diesen Vorteil'),
    subline('Obwohl er bei jeder deutschen Direktbank kostenlos verfügbar ist'),
    visualBlock([
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', flex: '1' } },
        h('span', { style: { fontSize: '160px', fontWeight: 800, color: C.green, letterSpacing: '-6px', lineHeight: '1' } }, '70 %'),
        h('span', { style: { fontSize: '30px', fontWeight: 600, color: C.textSoft, textAlign: 'center', lineHeight: '1.4', maxWidth: '720px' } },
          'der deutschen ETF-Anleger nutzen ihren Verlustverrechnungstopf nicht aktiv vor Jahresende'),
        h('div', { style: { display: 'flex', marginTop: '20px', gap: '40px' } },
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 36px', gap: '6px' } },
            h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.text } }, '263 €'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, textAlign: 'center' } }, 'Steuerersparnis pro 1.000 €')
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 36px', gap: '6px' } },
            h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.text } }, 'Okt.'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, textAlign: 'center' } }, 'Bester Monat dafür')
          )
        )
      )
    ]),
    keyLearning('26,375 % Abgeltungsteuer sparen — durch Verlustverrechnung vor dem 31.12.'),
    igFooter(),
  ]);

  // ========== SLIDE 3 — ERWARTUNG VS. REALITÄT ==========
  const slide3 = slideRoot([
    logoCorner(),
    badge('DAS PROBLEM'),
    headline('Was die meisten tun — und was möglich wäre', 54),
    visualBlock([
      h('div', { style: { display: 'flex', gap: '14px', flex: '1' } },
        // Left: Was die meisten tun
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '20px',
            padding: '28px', gap: '14px',
            border: '1px solid rgba(239,68,68,0.3)'
          }
        },
          h('span', { style: { fontSize: '21px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'WAS 70 % TUN'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(239,68,68,0.4)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft, lineHeight: '1.45' } },
            'Depot laufen lassen'),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, lineHeight: '1.45' } },
            'Verluste im Depot ignorieren'),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, lineHeight: '1.45' } },
            'Auf Gewinne volle Steuer zahlen'),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, lineHeight: '1.45' } },
            'Verlusttopf verfällt ungenutzt')
        ),
        // Right: Was möglich wäre
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '20px',
            padding: '28px', gap: '14px',
            border: '1px solid rgba(16,185,129,0.3)'
          }
        },
          h('span', { style: { fontSize: '21px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'WAS MÖGLICH WÄRE'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(16,185,129,0.4)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft, lineHeight: '1.45' } },
            'Verlusttopf aktiv prüfen'),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, lineHeight: '1.45' } },
            'Verluste strategisch realisieren'),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, lineHeight: '1.45' } },
            'Steuerlast deutlich senken'),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, lineHeight: '1.45' } },
            'Bis zu 263 € pro 1.000 € sparen')
        )
      )
    ]),
    keyLearning('Der Verlustverrechnungstopf läuft automatisch — aber du musst aktiv handeln.'),
    igFooter(),
  ]);

  // ========== SLIDE 4 — DIE METHODE ==========
  const slide4 = slideRoot([
    logoCorner(),
    badge('DIE METHODE'),
    headline('Verlustverrechnung in 4 Schritten', 58),
    subline('So funktioniert es bei jeder deutschen Direktbank'),
    visualBlock([
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px' } },
        ...[
          { num: '01', title: 'Verlusttopf prüfen', desc: 'Online-Banking öffnen, Depot-Steuerübersicht aufrufen' },
          { num: '02', title: 'Verlustpositionen finden', desc: 'Welche ETF oder Aktien haben aktuell Buchverluste?' },
          { num: '03', title: 'Verluste realisieren', desc: 'Position mit Buchverlust vor dem 31. Dezember verkaufen' },
          { num: '04', title: 'Bank verrechnet automatisch', desc: 'Gewinnsteuern werden sofort mit deinen Verlusten saldiert' },
        ].map((step, i) =>
          h('div', {
            style: {
              display: 'flex', flexDirection: 'row', alignItems: 'center',
              backgroundColor: C.cardBg, borderRadius: '16px',
              padding: '20px 24px', gap: '20px'
            }
          },
            h('span', {
              style: {
                fontSize: '38px', fontWeight: 800,
                color: i === 3 ? C.green : C.text,
                minWidth: '58px'
              }
            }, step.num),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
              h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, step.title),
              h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, lineHeight: '1.3' } }, step.desc)
            )
          )
        )
      )
    ]),
    keyLearning('Die Bank führt deinen Verlustverrechnungstopf automatisch — du musst nur schauen.'),
    igFooter(),
  ]);

  // ========== SLIDE 5 — RECHENBEISPIEL ==========
  const slide5 = slideRoot([
    logoCorner(),
    badge('RECHENBEISPIEL'),
    headline('So sieht es konkret aus', 60),
    subline('Ein ETF-Anleger mit gemischtem Depot im Oktober 2026'),
    visualBlock([
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
        // ETF Positions
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
          h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '14px', padding: '18px 24px', border: '1px solid rgba(16,185,129,0.3)' } },
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, 'MSCI World ETF — Gewinn'),
            h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.green } }, '+1.200 €')
          ),
          h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '14px', padding: '18px 24px', border: '1px solid rgba(239,68,68,0.3)' } },
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, 'Tech-ETF — Buchverlust'),
            h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.red } }, '-800 €')
          ),
        ),
        // Arrow
        h('div', { style: { display: 'flex', justifyContent: 'center' } },
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
            h('div', { style: { display: 'flex', width: '4px', height: '24px', backgroundColor: C.border } }),
            h('div', { style: { display: 'flex', width: '0px', height: '0px', borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: `12px solid ${C.border}` } })
          )
        ),
        // Result comparison
        h('div', { style: { display: 'flex', gap: '12px' } },
          h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', backgroundColor: C.cardBg, borderRadius: '14px', padding: '20px', gap: '8px' } },
            h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted, letterSpacing: '1px' } }, 'OHNE TRICK'),
            h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.red } }, '316 €'),
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'Steuern auf 1.200 €')
          ),
          h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '14px', padding: '20px', gap: '8px', border: '2px solid rgba(16,185,129,0.4)' } },
            h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.green, letterSpacing: '1px' } }, 'MIT TRICK'),
            h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.green } }, '105 €'),
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'Steuern nur auf 400 €')
          )
        ),
        h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '12px', padding: '14px 24px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.green } }, 'Ersparnis: 211 € — in 30 Minuten')
        )
      )
    ]),
    keyLearning('Reale Zahlen, vereinfacht dargestellt. Steuerberechnung ca. 26,375 % Abgeltungsteuer.'),
    igFooter(),
  ]);

  // ========== SLIDE 6 — WICHTIGE REGELN ==========
  const slide6 = slideRoot([
    logoCorner(),
    badge('WICHTIG ZU WISSEN'),
    headline('Diese Regeln musst du kennen', 60),
    subline('Verlustverrechnung hat klare gesetzliche Grenzen'),
    visualBlock([
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
        ...[
          {
            icon: '§',
            title: 'Aktien-Verluste gelten nur für Aktien-Gewinne',
            desc: 'Verluste aus Aktienverkäufen dürfen nur mit Aktiengewinnen verrechnet werden, nicht mit ETF-Gewinnen.',
            color: C.red,
          },
          {
            icon: '31',
            title: 'Frist: 31. Dezember 2026',
            desc: 'Verluste müssen im selben Steuerjahr realisiert werden. Nicht genutzte Verluste werden ins nächste Jahr übertragen.',
            color: '#F59E0B',
          },
          {
            icon: '?',
            title: 'Kauf und Verkauf clever kombinieren',
            desc: 'Du kannst die verkaufte Position sofort wieder kaufen — wenn du das Wertpapier weiter halten willst.',
            color: C.green,
          },
          {
            icon: 'i',
            title: 'Keine Steuerberatung',
            desc: 'Bei größeren Depots: Sprich mit einem Steuerberater oder Finanzberater.',
            color: C.textMuted,
          },
        ].map(rule =>
          h('div', {
            style: {
              display: 'flex', flexDirection: 'row', alignItems: 'flex-start',
              backgroundColor: C.cardBg, borderRadius: '14px',
              padding: '18px 22px', gap: '16px'
            }
          },
            h('div', {
              style: {
                display: 'flex', width: '44px', height: '44px', borderRadius: '10px',
                backgroundColor: `${rule.color}20`,
                border: `1px solid ${rule.color}60`,
                alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }
            },
              h('span', { style: { fontSize: '22px', fontWeight: 800, color: rule.color } }, rule.icon)
            ),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
              h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text, lineHeight: '1.3' } }, rule.title),
              h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, rule.desc)
            )
          )
        )
      )
    ]),
    keyLearning('ETF-Verluste aus thesaurierenden ETFs können gegen alle Kapitalerträge verrechnet werden.', C.red),
    igFooter(),
  ]);

  // ========== SLIDE 7 — KEY TAKEAWAYS ==========
  const slide7 = slideRoot([
    logoCorner(),
    badge('DEINE CHECKLISTE'),
    headline('4 Schritte bis zum 31. Dezember', 60),
    visualBlock([
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
        ...[
          { num: '01', text: 'Depot-Steuerübersicht bei deiner Bank öffnen', pct: 25 },
          { num: '02', text: 'Positionen mit Buchverlust identifizieren', pct: 50 },
          { num: '03', text: 'Verluste vor dem 31.12. realisieren (verkaufen)', pct: 75 },
          { num: '04', text: 'Steuervorteil gesichert — Bank verrechnet automatisch', pct: 100 },
        ].map(l =>
          h('div', {
            style: {
              display: 'flex', flexDirection: 'column', gap: '10px',
              padding: '22px 26px', backgroundColor: C.cardBg, borderRadius: '18px'
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
              h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.text, lineHeight: '1.3' } }, l.text)
            ),
            h('div', { style: { display: 'flex', height: '6px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
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
    keyLearning('30 Minuten Aufwand, einmal im Jahr — mit echtem Geld-zurück-Effekt.', C.green),
    igFooter(),
  ]);

  // ========== SLIDE 8 — CTA ==========
  const slide8 = slideRoot([
    logoCorner(),
    badge('JETZT HANDELN'),
    headline('Hast du deinen Verlusttopf schon geprüft?', 56),
    visualBlock([
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '28px', flex: '1' } },
        // Big logo centered
        h('img', {
          src: logoB64,
          width: 160, height: 160,
          style: { borderRadius: '24px', objectFit: 'cover' }
        }),
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', maxWidth: '860px' } },
          h('span', { style: { fontSize: '32px', fontWeight: 600, color: C.textSoft, textAlign: 'center', lineHeight: '1.45' } },
            'Schreib in die Kommentare, welche Depot-Summe bei dir möglicherweise steuerlich optimierbar wäre.'),
          h('div', { style: { display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' } },
            h('div', { style: { display: 'flex', backgroundColor: C.cardBg, borderRadius: '12px', padding: '14px 22px' } },
              h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.green } }, 'Speichern nicht vergessen')
            ),
            h('div', { style: { display: 'flex', backgroundColor: C.cardBg, borderRadius: '12px', padding: '14px 22px' } },
              h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text } }, 'Teile es mit Freunden')
            )
          )
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' } },
          h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.text } }, '@benarofinanzen'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, 'Finanzen einfach erklärt')
        )
      )
    ]),
    keyLearning('Frist läuft ab: 31. Dezember 2026. Jetzt ist der richtige Zeitpunkt.', C.green),
    igFooter(),
  ]);

  // ========== GENERATE ALL SLIDES ==========
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
