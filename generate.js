const fs = require('fs');
const path = require('path');

const TODAY = process.env.TODAY || new Date().toISOString().split('T')[0];
const OUT_DIR = path.join(__dirname, 'output', `carousel_${TODAY}`, 'slides');

async function main() {
  const satori = (await import('satori')).default || require('satori');
  const { Resvg } = require('@resvg/resvg-js');

  const fontDir = path.join(__dirname, 'node_modules/@fontsource/outfit/files');
  const fonts = [400, 500, 600, 700, 800].flatMap(w => [
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-${w}-normal.woff`)) },
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-ext-${w}-normal.woff`)) },
  ]);

  const logoPath = path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg');
  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(logoPath).toString('base64');

  const C = {
    bg: '#001f60',
    bgDark: '#001550',
    bgDeep: '#000e3a',
    text: '#FFFFFF',
    textSoft: 'rgba(255,255,255,0.80)',
    textMuted: 'rgba(255,255,255,0.50)',
    cardBg: 'rgba(255,255,255,0.10)',
    cardBgLight: 'rgba(255,255,255,0.18)',
    border: 'rgba(255,255,255,0.15)',
    accent: '#5BC8F5',
    red: '#E63030',
    white: '#FFFFFF',
  };

  const W = 1080, H = 1350;

  const h = (type, props, ...ch) => ({
    type, props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '16px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.accent, backgroundColor: 'rgba(91,200,245,0.15)',
          padding: '10px 22px', borderRadius: '12px', textTransform: 'uppercase'
        }
      }, text)
    );
  }

  function headline(text, size = 64) {
    return h('span', {
      style: {
        fontSize: `${size}px`, fontWeight: 800, color: C.text,
        lineHeight: '1.05', letterSpacing: '-0.5px', marginBottom: '6px',
        textTransform: 'uppercase'
      }
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500, color: C.textSoft,
        lineHeight: '1.5', marginTop: '8px'
      }
    }, text);
  }

  function keyLearning(text) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: '16px', padding: '22px 28px', marginTop: 'auto'
      }
    },
      h('div', { style: { display: 'flex', width: '6px', minHeight: '40px', backgroundColor: C.red, borderRadius: '3px' } }),
      h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, text)
    );
  }

  function bfLogo() {
    return h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginTop: '20px' } },
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '72px', height: '56px',
          border: '3px solid rgba(255,255,255,0.9)', borderRadius: '10px'
        }
      },
        h('span', { style: { fontSize: '28px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '2px' } }, 'BF')
      ),
      h('span', { style: { fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '3px', textTransform: 'uppercase' } }, 'BENARO FINANZEN')
    );
  }

  // ===================== SLIDE 1: HOOK =====================
  // "Dein Depot läuft schief — und du weißt es nicht"
  // Visual: Waage mit Aktien vs Anleihen — schief
  const slide1 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
    }
  },
    badge('ACHTUNG ANLEGER'),
    headline('DEIN DEPOT LÄUFT SCHIEF —', 62),
    headline('UND DU WEISST ES NICHT', 62),
    subline('Jedes ETF-Depot verschiebt sich mit der Zeit. Das kostet dich mehr als du denkst.'),
    // Visual: Scale/balance SVG
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' } },
      // Scale illustration
      (() => {
        const svg = `<svg width="880" height="420" viewBox="0 0 880 420" xmlns="http://www.w3.org/2000/svg">
          <!-- Center pole -->
          <rect x="435" y="80" width="10" height="250" fill="rgba(255,255,255,0.4)" rx="5"/>
          <!-- Pivot point -->
          <circle cx="440" cy="80" r="14" fill="#5BC8F5"/>
          <!-- Base -->
          <rect x="360" y="330" width="160" height="14" fill="rgba(255,255,255,0.3)" rx="7"/>
          <rect x="415" y="310" width="50" height="22" fill="rgba(255,255,255,0.2)" rx="5"/>
          <!-- Left arm (heavy/drooping) -->
          <line x1="440" y1="80" x2="140" y2="140" stroke="rgba(255,255,255,0.6)" stroke-width="6" stroke-linecap="round"/>
          <!-- Right arm (light/raised) -->
          <line x1="440" y1="80" x2="740" y2="30" stroke="rgba(255,255,255,0.6)" stroke-width="6" stroke-linecap="round"/>
          <!-- Left pan (heavy - Aktien) -->
          <line x1="140" y1="140" x2="140" y2="190" stroke="rgba(255,255,255,0.5)" stroke-width="3"/>
          <rect x="70" y="190" width="140" height="90" fill="#E63030" rx="14" opacity="0.9"/>
          <!-- Right pan (light - Anleihen) -->
          <line x1="740" y1="30" x2="740" y2="80" stroke="rgba(255,255,255,0.5)" stroke-width="3"/>
          <rect x="670" y="80" width="140" height="66" fill="rgba(91,200,245,0.4)" rx="14" stroke="#5BC8F5" stroke-width="2"/>
          <!-- Arrow showing imbalance -->
          <path d="M440 340 L440 290 L420 310 M440 290 L460 310" stroke="#E63030" stroke-width="4" fill="none" stroke-linecap="round"/>
        </svg>`;
        const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
        return h('img', { src, width: 880, height: 420, style: { objectFit: 'contain' } });
      })(),
      h('div', { style: { display: 'flex', gap: '40px', alignItems: 'center' } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          h('div', { style: { display: 'flex', width: '20px', height: '20px', backgroundColor: C.red, borderRadius: '4px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, 'Aktien-Anteil (zu groß)')
        ),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          h('div', { style: { display: 'flex', width: '20px', height: '20px', backgroundColor: C.accent, borderRadius: '4px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, 'Anleihen (zu klein)')
        )
      )
    ),
    keyLearning('Ein ungepflegtes Depot trägt mehr Risiko als du möchtest — oft unbemerkt.'),
    bfLogo()
  );

  // ===================== SLIDE 2: DAS PROBLEM =====================
  // Wie die Gewichtung driftet — Pie charts
  const slide2 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
    }
  },
    badge('DAS PROBLEM'),
    headline('SO DRIFTET DEINE GEWICHTUNG', 56),
    subline('Startest du mit 70 % Aktien / 30 % Anleihen, sieht es nach 5 Jahren so aus:'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '24px' } },
      // Before/After comparison
      h('div', { style: { display: 'flex', gap: '20px' } },
        // Before card
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '16px',
            backgroundColor: C.bgDark, borderRadius: '20px', padding: '32px',
            border: `1px solid ${C.border}`
          }
        },
          h('span', { style: { fontSize: '22px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted, textTransform: 'uppercase' } }, 'START — Jahr 0'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border } }),
          // Bar chart for 70/30
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
              h('div', { style: { display: 'flex', justifyContent: 'space-between' } },
                h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft } }, 'Aktien'),
                h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.accent } }, '70 %')
              ),
              h('div', { style: { display: 'flex', height: '20px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' } },
                h('div', { style: { display: 'flex', width: '70%', height: '20px', backgroundColor: C.accent, borderRadius: '10px' } })
              )
            ),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
              h('div', { style: { display: 'flex', justifyContent: 'space-between' } },
                h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft } }, 'Anleihen'),
                h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.textSoft } }, '30 %')
              ),
              h('div', { style: { display: 'flex', height: '20px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' } },
                h('div', { style: { display: 'flex', width: '30%', height: '20px', backgroundColor: 'rgba(255,255,255,0.35)', borderRadius: '10px' } })
              )
            )
          ),
          h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 20px', backgroundColor: 'rgba(91,200,245,0.15)', borderRadius: '10px' } },
            h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.accent } }, 'Ziel-Allokation')
          )
        ),
        // After card
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '16px',
            backgroundColor: C.bgDark, borderRadius: '20px', padding: '32px',
            border: `2px solid ${C.red}`
          }
        },
          h('span', { style: { fontSize: '22px', fontWeight: 700, letterSpacing: '2px', color: C.red, textTransform: 'uppercase' } }, 'NACH 5 JAHREN'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.red } }),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
              h('div', { style: { display: 'flex', justifyContent: 'space-between' } },
                h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft } }, 'Aktien'),
                h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.red } }, '87 %')
              ),
              h('div', { style: { display: 'flex', height: '20px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' } },
                h('div', { style: { display: 'flex', width: '87%', height: '20px', backgroundColor: C.red, borderRadius: '10px' } })
              )
            ),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
              h('div', { style: { display: 'flex', justifyContent: 'space-between' } },
                h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft } }, 'Anleihen'),
                h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.textSoft } }, '13 %')
              ),
              h('div', { style: { display: 'flex', height: '20px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' } },
                h('div', { style: { display: 'flex', width: '13%', height: '20px', backgroundColor: 'rgba(255,255,255,0.35)', borderRadius: '10px' } })
              )
            )
          ),
          h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 20px', backgroundColor: 'rgba(230,48,48,0.15)', borderRadius: '10px' } },
            h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.red } }, 'Zu viel Risiko!')
          )
        )
      ),
      h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 24px', backgroundColor: 'rgba(230,48,48,0.10)', borderRadius: '14px', border: `1px solid rgba(230,48,48,0.3)` } },
        h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '6px', backgroundColor: C.red } }),
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.red } }, 'Aktien wachsen schneller — und übernehmen dein Depot.')
      )
    ),
    keyLearning('Ohne Rebalancing übernehmen Aktien die Kontrolle über dein Depot.'),
    bfLogo()
  );

  // ===================== SLIDE 3: DIE KONSEQUENZ =====================
  // Was passiert ohne Rebalancing im Crash?
  const slide3 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
    }
  },
    badge('DIE GEFAHR'),
    headline('IM CRASH TRIFFT ES DICH', 58),
    headline('DOPPELT SO HART', 58),
    subline('Ein 30 %-Crash bei 87 % Aktienanteil ist viel schmerzhafter als bei 70 %.'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '22px' } },
      // Two scenario cards
      h('div', { style: { display: 'flex', gap: '20px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '14px',
            backgroundColor: 'rgba(91,200,245,0.08)', borderRadius: '20px', padding: '28px',
            border: `2px solid ${C.accent}`
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.accent, letterSpacing: '2px', textTransform: 'uppercase' } }, 'MIT REBALANCING'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.accent } }),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft } }, 'Portfolio: 10.000 €'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft } }, 'Aktienanteil: 70 %'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft } }, 'Crash: -30 % auf Aktien'),
          h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: C.border } }),
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, 'Verlust:'),
            h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.accent } }, '- 2.100 €')
          )
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '14px',
            backgroundColor: 'rgba(230,48,48,0.10)', borderRadius: '20px', padding: '28px',
            border: `2px solid ${C.red}`
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.red, letterSpacing: '2px', textTransform: 'uppercase' } }, 'OHNE REBALANCING'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.red } }),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft } }, 'Portfolio: 10.000 €'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft } }, 'Aktienanteil: 87 %'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft } }, 'Crash: -30 % auf Aktien'),
          h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: C.border } }),
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, 'Verlust:'),
            h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.red } }, '- 2.610 €')
          )
        )
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', gap: '8px', padding: '24px 28px',
          backgroundColor: C.bgDark, borderRadius: '16px', border: `1px solid ${C.border}`
        }
      },
        h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft } }, 'Differenz des Verlustes:'),
        h('span', { style: { fontSize: '42px', fontWeight: 800, color: C.red } }, '+ 510 € mehr Verlust'),
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Nur weil du nicht rebalanciert hast.')
      )
    ),
    keyLearning('Fehlende Kontrolle über die Gewichtung kostet dich echtes Geld im Abschwung.'),
    bfLogo()
  );

  // ===================== SLIDE 4: WAS IST REBALANCING? =====================
  const slide4 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
    }
  },
    badge('REBALANCING ERKLÄRT'),
    headline('WAS BEDEUTET', 62),
    headline('REBALANCING?', 62),
    subline('Erwartung vs. Realität — was die meisten glauben vs. was es wirklich ist:'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      h('div', { style: { display: 'flex', gap: '16px' } },
        // Erwartung
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '14px',
            backgroundColor: C.bgDark, borderRadius: '20px', padding: '28px',
            border: `1px solid ${C.border}`
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted, textTransform: 'uppercase' } }, 'ERWARTUNG'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border } }),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
            h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '10px' } },
              h('span', { style: { fontSize: '24px', color: C.red, fontWeight: 800, minWidth: '24px' } }, 'x'),
              h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Ich muss alles verkaufen und neu kaufen')
            ),
            h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '10px' } },
              h('span', { style: { fontSize: '24px', color: C.red, fontWeight: 800, minWidth: '24px' } }, 'x'),
              h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Das ist kompliziert und teuer')
            ),
            h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '10px' } },
              h('span', { style: { fontSize: '24px', color: C.red, fontWeight: 800, minWidth: '24px' } }, 'x'),
              h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Nur für Profis mit viel Zeit')
            )
          )
        ),
        // Realität
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '14px',
            backgroundColor: 'rgba(91,200,245,0.08)', borderRadius: '20px', padding: '28px',
            border: `2px solid ${C.accent}`
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.accent, textTransform: 'uppercase' } }, 'REALITÄT'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.accent } }),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
            h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '10px' } },
              h('span', { style: { fontSize: '24px', color: C.accent, fontWeight: 800, minWidth: '24px' } }, 'v'),
              h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.text, lineHeight: '1.4' } }, 'Nur die überschrittene Position anpassen')
            ),
            h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '10px' } },
              h('span', { style: { fontSize: '24px', color: C.accent, fontWeight: 800, minWidth: '24px' } }, 'v'),
              h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.text, lineHeight: '1.4' } }, 'Einmal pro Jahr — unter 10 Minuten')
            ),
            h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '10px' } },
              h('span', { style: { fontSize: '24px', color: C.accent, fontWeight: 800, minWidth: '24px' } }, 'v'),
              h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.text, lineHeight: '1.4' } }, 'Jeder Anleger kann das selbst')
            )
          )
        )
      ),
      h('div', {
        style: {
          display: 'flex', padding: '20px 28px', backgroundColor: 'rgba(91,200,245,0.08)',
          borderRadius: '14px', border: `1px solid rgba(91,200,245,0.25)`
        }
      },
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.accent, lineHeight: '1.5' } }, 'Rebalancing = Depot zurück auf deine Ziel-Gewichtung bringen.')
      )
    ),
    keyLearning('Rebalancing ist einfacher als du denkst — und entscheidend für dein Risiko.'),
    bfLogo()
  );

  // ===================== SLIDE 5: DIE ZWEI METHODEN =====================
  const slide5 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
    }
  },
    badge('DIE METHODEN'),
    headline('ZWEI WEGE ZUM', 60),
    headline('AUSGEGLICHENEN DEPOT', 60),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '22px' } },
      // Methode 1: Kalender
      h('div', {
        style: {
          display: 'flex', gap: '20px', alignItems: 'flex-start',
          backgroundColor: C.bgDark, borderRadius: '20px', padding: '28px',
          border: `1px solid ${C.border}`
        }
      },
        h('div', {
          style: {
            display: 'flex', width: '64px', height: '64px', borderRadius: '16px',
            backgroundColor: 'rgba(91,200,245,0.20)', alignItems: 'center', justifyContent: 'center',
            minWidth: '64px'
          }
        },
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.accent } }, '01')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.text, textTransform: 'uppercase' } }, 'Kalender-Methode'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Einmal pro Jahr — z.B. jeden Januar — schaust du ins Depot und bringst es auf deine Zielgewichtung zurück.'),
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
            h('div', { style: { display: 'flex', padding: '6px 16px', backgroundColor: 'rgba(91,200,245,0.15)', borderRadius: '8px' } },
              h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.accent } }, 'Einfach')
            ),
            h('div', { style: { display: 'flex', padding: '6px 16px', backgroundColor: 'rgba(91,200,245,0.15)', borderRadius: '8px' } },
              h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.accent } }, '10 Min / Jahr')
            )
          )
        )
      ),
      // Methode 2: Schwellenwert
      h('div', {
        style: {
          display: 'flex', gap: '20px', alignItems: 'flex-start',
          backgroundColor: C.bgDark, borderRadius: '20px', padding: '28px',
          border: `1px solid ${C.border}`
        }
      },
        h('div', {
          style: {
            display: 'flex', width: '64px', height: '64px', borderRadius: '16px',
            backgroundColor: 'rgba(230,48,48,0.15)', alignItems: 'center', justifyContent: 'center',
            minWidth: '64px'
          }
        },
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.red } }, '02')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.text, textTransform: 'uppercase' } }, 'Schwellenwert-Methode'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Sobald eine Position um mehr als z.B. 5 % von der Zielgewichtung abweicht, greifst du ein — egal wann im Jahr.'),
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
            h('div', { style: { display: 'flex', padding: '6px 16px', backgroundColor: 'rgba(230,48,48,0.12)', borderRadius: '8px' } },
              h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.red } }, 'Präziser')
            ),
            h('div', { style: { display: 'flex', padding: '6px 16px', backgroundColor: 'rgba(230,48,48,0.12)', borderRadius: '8px' } },
              h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.red } }, 'Öfter aktiv')
            )
          )
        )
      ),
      h('div', { style: { display: 'flex', padding: '18px 24px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '14px' } },
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.5' } }, 'Tipp für Einsteiger: Start mit der Kalender-Methode — einfach und effektiv.')
      )
    ),
    keyLearning('Wähle die Methode, die du wirklich durchhältst — Kontinuität schlägt Perfektion.'),
    bfLogo()
  );

  // ===================== SLIDE 6: SO FUNKTIONIERT ES — 3 SCHRITTE =====================
  const slide6 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
    }
  },
    badge('IN 3 SCHRITTEN'),
    headline('SO REBALANCIERST DU', 58),
    headline('DEIN DEPOT RICHTIG', 58),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      // Step 1
      h('div', {
        style: {
          display: 'flex', gap: '20px', alignItems: 'center',
          backgroundColor: C.bgDark, borderRadius: '18px', padding: '24px 28px',
          border: `1px solid ${C.border}`
        }
      },
        h('span', { style: { fontSize: '52px', fontWeight: 800, color: C.white, minWidth: '60px', lineHeight: '1' } }, '1.'),
        h('div', { style: { display: 'flex', flex: '1', alignItems: 'center', backgroundColor: C.white, borderRadius: '4px', padding: '12px 22px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: '#001f60', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.1' } }, 'AKTUELLE GEWICHTUNG PRÜFEN')
        )
      ),
      // Arrow connector
      h('div', { style: { display: 'flex', justifyContent: 'center' } },
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px' } },
          h('div', { style: { display: 'flex', width: '4px', height: '20px', backgroundColor: C.border } }),
          h('div', { style: { display: 'flex', width: '0px', height: '0px', borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: `12px solid ${C.border}` } })
        )
      ),
      // Step 2
      h('div', {
        style: {
          display: 'flex', gap: '20px', alignItems: 'center',
          backgroundColor: C.bgDark, borderRadius: '18px', padding: '24px 28px',
          border: `1px solid ${C.border}`
        }
      },
        h('span', { style: { fontSize: '52px', fontWeight: 800, color: C.white, minWidth: '60px', lineHeight: '1' } }, '2.'),
        h('div', { style: { display: 'flex', flex: '1', alignItems: 'center', backgroundColor: C.white, borderRadius: '4px', padding: '12px 22px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: '#001f60', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.1' } }, 'ABWEICHUNG BERECHNEN')
        )
      ),
      // Arrow connector
      h('div', { style: { display: 'flex', justifyContent: 'center' } },
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px' } },
          h('div', { style: { display: 'flex', width: '4px', height: '20px', backgroundColor: C.border } }),
          h('div', { style: { display: 'flex', width: '0px', height: '0px', borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: `12px solid ${C.border}` } })
        )
      ),
      // Step 3
      h('div', {
        style: {
          display: 'flex', gap: '20px', alignItems: 'center',
          backgroundColor: 'rgba(91,200,245,0.10)', borderRadius: '18px', padding: '24px 28px',
          border: `2px solid ${C.accent}`
        }
      },
        h('span', { style: { fontSize: '52px', fontWeight: 800, color: C.accent, minWidth: '60px', lineHeight: '1' } }, '3.'),
        h('div', { style: { display: 'flex', flex: '1', alignItems: 'center', backgroundColor: C.accent, borderRadius: '4px', padding: '12px 22px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: '#001f60', textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.1' } }, 'VERKAUFEN ODER NACHKAUFEN')
        )
      ),
      h('div', {
        style: {
          display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '18px 22px',
          backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '12px'
        }
      },
        h('div', { style: { display: 'flex', width: '8px', minHeight: '40px', backgroundColor: C.accent, borderRadius: '4px', marginTop: '4px' } }),
        h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textSoft, lineHeight: '1.5' } }, 'Profi-Tipp: Nutze neue Einzahlungen zuerst, um die untergewichtete Position aufzustocken — spart Transaktionskosten!')
      )
    ),
    keyLearning('Neue Einzahlungen zuerst nutzen — Transaktionskosten sparen, Balance wiederherstellen.'),
    bfLogo()
  );

  // ===================== SLIDE 7: LEARNINGS =====================
  const slide7 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
    }
  },
    badge('DEINE TAKEAWAYS'),
    headline('REBALANCING IN KÜRZE', 58),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      ...[
        { num: '01', text: 'Dein Depot driftet ohne Kontrolle — prüfe es mindestens einmal jährlich', pct: 25 },
        { num: '02', text: 'Fehlende Gewichtung erhöht dein Verlustrisiko im Crash deutlich', pct: 50 },
        { num: '03', text: 'Kalender- oder Schwellenwert-Methode — wähle was du durchhältst', pct: 75 },
        { num: '04', text: 'Neue Sparraten zuerst einsetzen — schont die Transaktionskosten', pct: 100 },
      ].map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px', padding: '22px 26px',
            backgroundColor: C.bgDark, borderRadius: '18px',
            border: l.pct === 100 ? `2px solid ${C.accent}` : `1px solid ${C.border}`
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
            h('span', { style: { fontSize: '38px', fontWeight: 800, color: l.pct === 100 ? C.accent : C.white, minWidth: '56px' } }, l.num),
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3' } }, l.text)
          ),
          h('div', { style: { display: 'flex', height: '6px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${l.pct}%`, height: '6px', backgroundColor: l.pct === 100 ? C.accent : C.red, borderRadius: '3px' } })
          )
        )
      )
    ),
    keyLearning('Rebalancing schützt dein Depot — und dauert nur wenige Minuten im Jahr.'),
    bfLogo()
  );

  // ===================== SLIDE 8: CTA =====================
  const slide8 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
      alignItems: 'center', justifyContent: 'space-between'
    }
  },
    badge('JETZT DEIN DEPOT PRÜFEN'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '28px' } },
      h('span', {
        style: {
          fontSize: '60px', fontWeight: 800, color: C.text, textAlign: 'center',
          lineHeight: '1.1', textTransform: 'uppercase'
        }
      }, 'WANN HAST DU DEIN DEPOT ZULETZT GEPRÜFT?'),
      h('div', { style: { display: 'flex', width: '80px', height: '5px', backgroundColor: C.red, borderRadius: '3px' } }),
      h('span', { style: { fontSize: '30px', fontWeight: 500, color: C.textSoft, textAlign: 'center', lineHeight: '1.5' } }, 'Schreib uns in die Kommentare — wir helfen dir beim ersten Rebalancing!'),
      h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.accent, textAlign: 'center', lineHeight: '1.5' } }, 'Speichern nicht vergessen — du brauchst diese Anleitung!'),
    ),
    h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' } },
      bfLogo(),
      h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, '@benarofinanzen')
    )
  );

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(OUT_DIR, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} fertig: ${pngPath}`);
  }
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
