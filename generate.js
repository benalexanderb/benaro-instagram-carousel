// generate.js — Carousel: Jahresend-Finanzcheck 2026
// Thema: Diese 5 Aktionen verfallen am 31. Dezember
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

  const outputDir = path.join(__dirname, 'output/carousel_2026-10-23/slides');

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
    const bg = color === 'green' ? C.green : color === 'red' ? C.red : color === 'orange' ? '#F59E0B' : C.cardBg;
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
    badge('DRINGEND', 'red'),
    headline('In 69 Tagen ist es', 72),
    headline('zu spät', 72),
    subline('5 Finanzaktionen, die am 31. Dezember verfallen'),
    visualBlock([
      (() => {
        // SVG: Countdown-Kalender mit Tagen
        const svg = `<svg width="860" height="380" viewBox="0 0 860 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EF4444" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#EF4444" stop-opacity="0.08"/>
    </linearGradient>
    <linearGradient id="gGreen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10B981" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#10B981" stop-opacity="0.08"/>
    </linearGradient>
  </defs>
  <!-- Kalender-Hintergrund links (Oktober) -->
  <rect x="20" y="20" width="380" height="340" rx="24" fill="url(#gRed)" stroke="rgba(239,68,68,0.4)" stroke-width="2"/>
  <!-- Kalender Kopf Oktober -->
  <rect x="20" y="20" width="380" height="70" rx="24" fill="rgba(239,68,68,0.35)"/>
  <!-- Kalender-Zeilen Oktober -->
  <rect x="45" y="118" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="103" y="118" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="161" y="118" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="219" y="118" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="277" y="118" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="335" y="118" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="45" y="178" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="103" y="178" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="161" y="178" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="219" y="178" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="277" y="178" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="335" y="178" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="45" y="238" width="48" height="48" rx="10" fill="rgba(255,255,255,0.12)"/>
  <rect x="103" y="238" width="48" height="48" rx="10" fill="rgba(239,68,68,0.35)" stroke="rgba(239,68,68,0.6)" stroke-width="2"/>
  <rect x="45" y="298" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="103" y="298" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="161" y="298" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="219" y="298" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="277" y="298" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="335" y="298" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <!-- Pfeil zwischen Kalaendern -->
  <line x1="430" y1="190" x2="468" y2="190" stroke="rgba(255,255,255,0.5)" stroke-width="4" stroke-dasharray="10,6"/>
  <polygon points="468,180 488,190 468,200" fill="rgba(255,255,255,0.5)"/>
  <!-- Kalender-Hintergrund rechts (Dezember) -->
  <rect x="460" y="20" width="380" height="340" rx="24" fill="url(#gGreen)" stroke="rgba(16,185,129,0.4)" stroke-width="2"/>
  <!-- Kalender Kopf Dezember -->
  <rect x="460" y="20" width="380" height="70" rx="24" fill="rgba(16,185,129,0.3)"/>
  <!-- Kalender Zeilen Dezember -->
  <rect x="485" y="118" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="543" y="118" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="601" y="118" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="659" y="118" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="717" y="118" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="775" y="118" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="485" y="178" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="543" y="178" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="601" y="178" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="659" y="178" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="717" y="178" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="775" y="178" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="485" y="238" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="543" y="238" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="601" y="238" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="659" y="238" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="717" y="238" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="775" y="238" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="485" y="298" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="543" y="298" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="601" y="298" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="659" y="298" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <rect x="717" y="298" width="48" height="48" rx="10" fill="rgba(255,255,255,0.08)"/>
  <!-- 31. rot markiert -->
  <rect x="775" y="298" width="48" height="48" rx="10" fill="rgba(239,68,68,0.5)" stroke="rgba(239,68,68,0.9)" stroke-width="2.5"/>
  <!-- X auf dem 31 -->
  <line x1="786" y1="309" x2="812" y2="335" stroke="rgba(255,255,255,0.9)" stroke-width="3" stroke-linecap="round"/>
  <line x1="812" y1="309" x2="786" y2="335" stroke="rgba(255,255,255,0.9)" stroke-width="3" stroke-linecap="round"/>
</svg>`;
        const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
        return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
          h('img', { src, width: 860, height: 380, style: { objectFit: 'contain' } }),
          h('div', { style: { display: 'flex', justifyContent: 'space-around', paddingLeft: '40px', paddingRight: '40px' } },
            h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.red, textAlign: 'center' } }, 'Oktober 2026'),
            h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.green, textAlign: 'center' } }, 'Deadline: 31. Dez.')
          )
        );
      })()
    ]),
    keyLearning('Wer jetzt handelt, sichert sich bis zu 500 € mehr im Jahr.'),
    igFooter(),
  ]);

  // ========== SLIDE 2 — STAT HERO ==========
  const slide2 = slideRoot([
    logoCorner(),
    badge('DIE ZAHLEN'),
    headline('So viel Geld liegt brach'),
    subline('Weil Jahresendfristen ignoriert werden'),
    visualBlock([
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: '14px', flex: '1'
        }
      },
        h('span', {
          style: {
            fontSize: '148px', fontWeight: 800, color: C.green,
            letterSpacing: '-6px', lineHeight: '1'
          }
        }, '1.000 €'),
        h('span', {
          style: {
            fontSize: '30px', fontWeight: 600, color: C.textSoft,
            textAlign: 'center', lineHeight: '1.4', maxWidth: '760px'
          }
        }, 'Sparerpauschbetrag pro Jahr — steuerfrei für Kapitalerträge'),
        h('div', {
          style: { display: 'flex', marginTop: '16px', gap: '24px' }
        },
          h('div', {
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              backgroundColor: C.cardBg, borderRadius: '16px',
              padding: '22px 32px', gap: '6px'
            }
          },
            h('span', { style: { fontSize: '38px', fontWeight: 800, color: C.text } }, '263 €'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, textAlign: 'center' } }, 'Steuer gespart\nbei 1.000 € Erträgen')
          ),
          h('div', {
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              backgroundColor: C.cardBg, borderRadius: '16px',
              padding: '22px 32px', gap: '6px'
            }
          },
            h('span', { style: { fontSize: '38px', fontWeight: 800, color: C.red } }, '40 %'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, textAlign: 'center' } }, 'nutzen ihn\nnicht vollständig')
          ),
          h('div', {
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              backgroundColor: C.cardBg, borderRadius: '16px',
              padding: '22px 32px', gap: '6px'
            }
          },
            h('span', { style: { fontSize: '38px', fontWeight: 800, color: C.text } }, '31.12.'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, textAlign: 'center' } }, 'Frist —\nkein Aufschub')
          )
        )
      )
    ]),
    keyLearning('2.000 € für Ehepaare — wer jetzt nichts tut, verschenkt echtes Geld.'),
    igFooter(),
  ]);

  // ========== SLIDE 3 — ERWARTUNG VS. REALITÄT ==========
  const slide3 = slideRoot([
    logoCorner(),
    badge('DER IRRTUM'),
    headline('Was die meisten denken — und was wirklich gilt', 52),
    visualBlock([
      h('div', { style: { display: 'flex', gap: '16px', flex: '1' } },
        // Links: Erwartung
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '20px',
            padding: '30px', gap: '16px',
            border: '1px solid rgba(239,68,68,0.3)'
          }
        },
          h('span', { style: { fontSize: '21px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'WAS VIELE DENKEN'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(239,68,68,0.4)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '29px', fontWeight: 600, color: C.textSoft, lineHeight: '1.45' } },
            '"Kümmere ich mich Anfang Januar"'),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, lineHeight: '1.45', marginTop: '8px' } },
            '"Das Finanzamt erinnert mich schon"'),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, lineHeight: '1.45' } },
            '"Der Steuervorteil läuft nicht weg"'),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, lineHeight: '1.45' } },
            '"Das ist zu kompliziert für mich"'),
        ),
        // Rechts: Realität
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '20px',
            padding: '30px', gap: '16px',
            border: '1px solid rgba(16,185,129,0.3)'
          }
        },
          h('span', { style: { fontSize: '21px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'DIE REALITÄT'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(16,185,129,0.4)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '29px', fontWeight: 600, color: C.textSoft, lineHeight: '1.45' } },
            'Fristen laufen am 31.12. ab — ohne Ausnahme'),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, lineHeight: '1.45', marginTop: '8px' } },
            'Niemand informiert dich'),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, lineHeight: '1.45' } },
            'Jahresverluste verfallen, Freibeträge auch'),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, lineHeight: '1.45' } },
            'Jede Aktion dauert unter 15 Minuten'),
        )
      )
    ]),
    keyLearning('5 einfache Schritte — jetzt erklären wir dir alle im Detail.', C.green),
    igFooter(),
  ]);

  // ========== SLIDE 4 — AKTIONEN 1 & 2 ==========
  const slide4 = slideRoot([
    logoCorner(),
    badge('SCHRITT 1 & 2'),
    headline('Steuervorteile sichern — heute noch', 56),
    subline('Dauer je Schritt: ca. 5 Minuten'),
    visualBlock([
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px', flex: '1', justifyContent: 'center' } },
        // Aktion 1
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px', gap: '10px',
            border: '1px solid rgba(255,255,255,0.15)'
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
            h('div', {
              style: {
                display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
                backgroundColor: C.green, alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }
            },
              h('span', { style: { fontSize: '28px', fontWeight: 800, color: '#FFFFFF' } }, '01')
            ),
            h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.text } }, 'Freistellungsauftrag prüfen'),
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, lineHeight: '1.45', paddingLeft: '68px' } },
            'Stelle sicher, dass du bei deiner Bank einen Freistellungsauftrag über 1.000 € gestellt hast. Sonst zahlt die Bank automatisch 26,375 % Steuern auf deine Erträge.'),
          h('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '68px', marginTop: '4px',
              backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '12px', padding: '10px 16px'
            }
          },
            h('div', { style: { width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.green, flexShrink: 0 } }),
            h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.green } }, 'Spart bis zu 263 € pro 1.000 € Erträge')
          )
        ),
        // Aktion 2
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px', gap: '10px',
            border: '1px solid rgba(255,255,255,0.15)'
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
            h('div', {
              style: {
                display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
                backgroundColor: C.green, alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }
            },
              h('span', { style: { fontSize: '28px', fontWeight: 800, color: '#FFFFFF' } }, '02')
            ),
            h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.text } }, 'Verluste gezielt verrechnen'),
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, lineHeight: '1.45', paddingLeft: '68px' } },
            'Wenn du Positionen mit Buchverlusten im Depot hast: Verkaufe und kaufe sie sofort zurück. So realisierst du steuerlich verwertbare Verluste.'),
          h('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '68px', marginTop: '4px',
              backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '12px', padding: '10px 16px'
            }
          },
            h('div', { style: { width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.green, flexShrink: 0 } }),
            h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.green } }, 'Reduziert deine Steuerlast auf Gewinne')
          )
        )
      )
    ]),
    keyLearning('Beide Maßnahmen sind kostenlos und dauern insgesamt unter 15 Minuten.'),
    igFooter(),
  ]);

  // ========== SLIDE 5 — AKTIONEN 3 & 4 ==========
  const slide5 = slideRoot([
    logoCorner(),
    badge('SCHRITT 3 & 4'),
    headline('Mehr aus deinem Geld holen', 58),
    subline('Zwei Maßnahmen, die langfristig wirken'),
    visualBlock([
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px', flex: '1', justifyContent: 'center' } },
        // Aktion 3
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px', gap: '10px',
            border: '1px solid rgba(255,255,255,0.15)'
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
            h('div', {
              style: {
                display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
                backgroundColor: '#F59E0B', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }
            },
              h('span', { style: { fontSize: '28px', fontWeight: 800, color: '#FFFFFF' } }, '03')
            ),
            h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.text } }, 'bAV-Beitrag für 2026 erhöhen'),
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, lineHeight: '1.45', paddingLeft: '68px' } },
            'Der Jahreswechsel ist der ideale Moment, um deine betriebliche Altersvorsorge anzupassen. Beiträge bis 7.728 € jährlich sind steuer- und sozialabgabenfrei.'),
          h('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px',
              backgroundColor: 'rgba(245,158,11,0.12)', borderRadius: '12px', padding: '10px 16px'
            }
          },
            h('div', { style: { width: '10px', height: '10px', borderRadius: '5px', backgroundColor: '#F59E0B', flexShrink: 0 } }),
            h('span', { style: { fontSize: '24px', fontWeight: 600, color: '#F59E0B' } }, 'Plus 15 % Pflicht-Zuschuss vom Arbeitgeber')
          )
        ),
        // Aktion 4
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px', gap: '10px',
            border: '1px solid rgba(255,255,255,0.15)'
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
            h('div', {
              style: {
                display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
                backgroundColor: '#F59E0B', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }
            },
              h('span', { style: { fontSize: '28px', fontWeight: 800, color: '#FFFFFF' } }, '04')
            ),
            h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.text } }, 'Depot-Rebalancing durchführen'),
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, lineHeight: '1.45', paddingLeft: '68px' } },
            'Prüfe, ob deine Portfoliogewichtung noch deiner Strategie entspricht. Nach einem starken Börsenjahr driftet ein 70/30-Depot oft auf 85/15.'),
          h('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px',
              backgroundColor: 'rgba(245,158,11,0.12)', borderRadius: '12px', padding: '10px 16px'
            }
          },
            h('div', { style: { width: '10px', height: '10px', borderRadius: '5px', backgroundColor: '#F59E0B', flexShrink: 0 } }),
            h('span', { style: { fontSize: '24px', fontWeight: 600, color: '#F59E0B' } }, 'Nachkaufen statt Umschichten — kein Steuerereignis')
          )
        )
      )
    ]),
    keyLearning('Nachkaufen anstatt Umschichten spart Abgeltungssteuer beim Rebalancing.'),
    igFooter(),
  ]);

  // ========== SLIDE 6 — AKTION 5 ==========
  const slide6 = slideRoot([
    logoCorner(),
    badge('SCHRITT 5'),
    headline('Die versteckte Steuer im Januar', 58),
    subline('Was ETF-Anleger jetzt vorbereiten müssen'),
    visualBlock([
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', gap: '20px',
          flex: '1', justifyContent: 'center'
        }
      },
        // Grafik: Ablauf Vorabpauschale
        (() => {
          const svg = `<svg width="860" height="200" viewBox="0 0 860 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Schritt 1: Depot hat thesaurierenden ETF -->
  <rect x="20" y="50" width="200" height="100" rx="16" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  <rect x="40" y="75" width="160" height="10" rx="5" fill="rgba(255,255,255,0.35)"/>
  <rect x="40" y="95" width="130" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
  <rect x="40" y="113" width="145" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
  <!-- Pfeil 1 -->
  <line x1="240" y1="100" x2="284" y2="100" stroke="rgba(255,255,255,0.4)" stroke-width="3" stroke-dasharray="8,5"/>
  <polygon points="284,92 300,100 284,108" fill="rgba(255,255,255,0.4)"/>
  <!-- Schritt 2: Kein Ausschüttung = Vorabpauschale -->
  <rect x="310" y="50" width="230" height="100" rx="16" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.4)" stroke-width="1.5"/>
  <rect x="330" y="75" width="190" height="10" rx="5" fill="rgba(239,68,68,0.4)"/>
  <rect x="330" y="95" width="155" height="8" rx="4" fill="rgba(239,68,68,0.2)"/>
  <rect x="330" y="113" width="170" height="8" rx="4" fill="rgba(239,68,68,0.2)"/>
  <!-- Pfeil 2 -->
  <line x1="560" y1="100" x2="604" y2="100" stroke="rgba(255,255,255,0.4)" stroke-width="3" stroke-dasharray="8,5"/>
  <polygon points="604,92 620,100 604,108" fill="rgba(255,255,255,0.4)"/>
  <!-- Schritt 3: Januar-Abzug -->
  <rect x="630" y="50" width="210" height="100" rx="16" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" stroke-width="1.5"/>
  <rect x="650" y="75" width="170" height="10" rx="5" fill="rgba(16,185,129,0.4)"/>
  <rect x="650" y="95" width="140" height="8" rx="4" fill="rgba(16,185,129,0.2)"/>
  <rect x="650" y="113" width="155" height="8" rx="4" fill="rgba(16,185,129,0.2)"/>
</svg>`;
          const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
          return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
            h('img', { src, width: 860, height: 200, style: { objectFit: 'contain' } }),
            h('div', { style: { display: 'flex', gap: '20px', justifyContent: 'space-between' } },
              h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted, textAlign: 'center', flex: '1' } }, 'Thesaurierender ETF'),
              h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.red, textAlign: 'center', flex: '1' } }, 'Vorabpauschale 2026'),
              h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.green, textAlign: 'center', flex: '1' } }, 'Januar-Abzug vermeiden')
            )
          );
        })(),
        // Erklärungsbox
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px', gap: '14px',
            border: '1px solid rgba(255,255,255,0.15)'
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
            h('div', {
              style: {
                display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
                backgroundColor: C.red, alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }
            },
              h('span', { style: { fontSize: '28px', fontWeight: 800, color: '#FFFFFF' } }, '05')
            ),
            h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.text } }, 'Vorabpauschale vorbereiten'),
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, lineHeight: '1.45', paddingLeft: '68px' } },
            'Bei thesaurierenden ETFs bucht das Finanzamt im Januar eine fiktive Mindestrendite ab (Basiszins 2026: 3,20 %). Stelle sicher, dass dein Freistellungsauftrag ausreicht und du genug Liquidität im Depot hast.'),
          h('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: '10px',
              backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '12px', padding: '10px 16px'
            }
          },
            h('div', { style: { width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.red, flexShrink: 0 } }),
            h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.red } }, 'Bei 10.000 € Depot: ca. 59 € Abzug im Januar 2027')
          )
        )
      )
    ]),
    keyLearning('Jetzt handeln — der Abzug kommt automatisch im Januar ohne Vorwarnung.', C.red),
    igFooter(),
  ]);

  // ========== SLIDE 7 — CHECKLISTE ==========
  const slide7 = slideRoot([
    logoCorner(),
    badge('DEINE CHECKLISTE', 'green'),
    headline('5 Schritte vor dem 31. Dezember', 58),
    subline('Gesamtzeit: unter 1 Stunde'),
    visualBlock([
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px', flex: '1', justifyContent: 'center' } },
        ...[
          { num: '01', text: 'Freistellungsauftrag auf 1.000 € prüfen und stellen', pct: 20 },
          { num: '02', text: 'Buchverluste realisieren und sofort zurückkaufen', pct: 40 },
          { num: '03', text: 'bAV-Beitrag zum Jahresende optimieren', pct: 60 },
          { num: '04', text: 'Portfolio auf Zielgewichtung prüfen und rebalancieren', pct: 80 },
          { num: '05', text: 'Liquidität für Vorabpauschalen-Abzug bereitstellen', pct: 100 },
        ].map(l =>
          h('div', {
            style: {
              display: 'flex', flexDirection: 'column', gap: '8px',
              padding: '18px 24px',
              backgroundColor: C.cardBg, borderRadius: '16px'
            }
          },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
              h('span', {
                style: {
                  fontSize: '36px', fontWeight: 800,
                  color: l.pct === 100 ? C.green : C.text, minWidth: '56px'
                }
              }, l.num),
              h('span', {
                style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3' }
              }, l.text)
            ),
            h('div', { style: { display: 'flex', height: '5px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
              h('div', {
                style: {
                  display: 'flex', width: `${l.pct}%`, height: '5px',
                  backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px'
                }
              })
            )
          )
        )
      )
    ]),
    keyLearning('Alle 5 Schritte sind kostenlos. Alles, was du brauchst: 1 Stunde Zeit.', C.green),
    igFooter(),
  ]);

  // ========== SLIDE 8 — CTA ==========
  const slide8 = slideRoot([
    logoCorner(),
    badge('SPEICHERN'),
    headline('Dein Geld. Dein Vorteil.', 64),
    subline('Teile das mit jemandem, dem sein Geld wichtig ist'),
    visualBlock([
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', flex: '1', gap: '28px'
        }
      },
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            backgroundColor: C.cardBg, borderRadius: '24px', padding: '40px',
            gap: '16px', border: '1px solid rgba(255,255,255,0.15)'
          }
        },
          h('span', {
            style: {
              fontSize: '36px', fontWeight: 700, color: C.text,
              textAlign: 'center', lineHeight: '1.4'
            }
          }, 'Welchen Schritt hast du in\ndiesem Jahr noch nicht erledigt?'),
          h('span', {
            style: {
              fontSize: '28px', fontWeight: 500, color: C.textMuted,
              textAlign: 'center', lineHeight: '1.5'
            }
          }, 'Schreib es in die Kommentare — wir helfen dir dabei.'),
        ),
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '16px',
            alignItems: 'center', width: '100%'
          }
        },
          h('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: '12px',
              backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '16px',
              padding: '18px 32px', border: '1px solid rgba(16,185,129,0.3)'
            }
          },
            h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.green } }, 'Speichern nicht vergessen'),
          ),
          h('span', {
            style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, textAlign: 'center' }
          }, 'Folge @benarofinanzen für wöchentliche Finanztipps'),
        )
      )
    ]),
    h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' } },
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, '@benarofinanzen'),
      h('div', {
        style: {
          display: 'flex', backgroundColor: C.green, borderRadius: '12px',
          padding: '10px 22px'
        }
      },
        h('span', { style: { fontSize: '22px', fontWeight: 700, color: '#FFFFFF' } }, 'Benaro Finanzen')
      )
    ),
  ]);

  // ========== GENERIEREN ==========
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outputDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} generiert: ${path.basename(pngPath)}`);
  }
  console.log('Alle Slides erfolgreich erstellt!');
}

main().catch(e => { console.error(e); process.exit(1); });
