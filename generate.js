'use strict';
const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default || require('satori');
  const { Resvg } = require('@resvg/resvg-js');

  const W = 1080, H = 1350;
  const TODAY = '2026-11-27';
  const OUTPUT_DIR = path.join(__dirname, 'output', `carousel_${TODAY}`, 'slides');
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

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

  function logo() {
    return h('img', {
      src: logoB64,
      width: 100,
      height: 100,
      style: { borderRadius: '12px', objectFit: 'cover' }
    });
  }

  function topBar() {
    return h('div', {
      style: { display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: '16px' }
    }, logo());
  }

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '14px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '20px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: C.cardBg, padding: '10px 22px', borderRadius: '12px',
          fontFamily: 'Outfit'
        }
      }, text)
    );
  }

  function headline(text, size = 64) {
    return h('span', {
      style: {
        fontSize: `${size}px`, fontWeight: 800, color: C.text,
        lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '8px',
        fontFamily: 'Outfit'
      }
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500, color: C.textMuted,
        lineHeight: '1.5', marginTop: '8px', fontFamily: 'Outfit'
      }
    }, text);
  }

  function keyLearning(text, accent = C.text) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px', marginTop: '20px'
      }
    },
      h('div', { style: { display: 'flex', width: '6px', minHeight: '40px', backgroundColor: accent, borderRadius: '3px' } }),
      h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.4', fontFamily: 'Outfit' } }, text)
    );
  }

  function igHandle() {
    return h('div', { style: { display: 'flex', marginTop: '12px' } },
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, '@benarofinanzen')
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

  // ─── SLIDE 1: HOOK ───────────────────────────────────────────────────────────
  const slide1 = slideRoot([
    topBar(),
    badge('HÄUFIGSTER FEHLER'),
    headline('Thesaurierend oder ausschüttend — welchen ETF wählst du?', 54),
    subline('Die Entscheidung mit den größten Steuerfolgen'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '24px' } },
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'stretch' } },
        // Thesaurierend card
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(255,255,255,0.08)',
            borderRadius: '24px', padding: '32px', gap: '16px',
            border: '2px solid rgba(255,255,255,0.2)'
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '64px', height: '64px', borderRadius: '16px',
              backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center'
            }
          },
            h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.text, fontFamily: 'Outfit' } }, 'T')
          ),
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.text, fontFamily: 'Outfit', lineHeight: '1.2' } }, 'Thesaurierend'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit', lineHeight: '1.5' } }, 'Gewinne bleiben im Fonds und werden reinvestiert'),
          h('div', {
            style: {
              display: 'flex', backgroundColor: 'rgba(255,255,255,0.08)',
              borderRadius: '12px', padding: '12px 18px'
            }
          },
            h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textSoft, fontFamily: 'Outfit' } }, 'z.B. MSCI World Acc.')
          )
        ),
        // VS divider
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 8px'
          }
        },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.textMuted, fontFamily: 'Outfit' } }, 'VS')
        ),
        // Ausschüttend card
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(16,185,129,0.1)',
            borderRadius: '24px', padding: '32px', gap: '16px',
            border: '2px solid rgba(16,185,129,0.3)'
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '64px', height: '64px', borderRadius: '16px',
              backgroundColor: 'rgba(16,185,129,0.2)', alignItems: 'center', justifyContent: 'center'
            }
          },
            h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.green, fontFamily: 'Outfit' } }, 'A')
          ),
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.text, fontFamily: 'Outfit', lineHeight: '1.2' } }, 'Ausschüttend'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit', lineHeight: '1.5' } }, 'Dividenden werden regelmäßig ausgezahlt'),
          h('div', {
            style: {
              display: 'flex', backgroundColor: 'rgba(16,185,129,0.1)',
              borderRadius: '12px', padding: '12px 18px'
            }
          },
            h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.green, fontFamily: 'Outfit' } }, 'z.B. MSCI World Dis.')
          )
        )
      ),
      // Question bar
      h('div', {
        style: {
          display: 'flex', backgroundColor: 'rgba(255,255,255,0.06)',
          borderRadius: '16px', padding: '20px 28px', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.1)'
        }
      },
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, fontFamily: 'Outfit', textAlign: 'center' } },
          'Welcher Typ passt zu dir — und warum zahlt einer mehr Steuern?')
      )
    ),
    keyLearning('Lies weiter — die Antwort überrascht viele ETF-Einsteiger.', C.green),
    igHandle(),
  ]);

  // ─── SLIDE 2: MYTHOS (AKT 1) ──────────────────────────────────────────────────
  const slide2 = slideRoot([
    topBar(),
    badge('DER MYTHOS'),
    headline('Thesaurierend = keine Steuern?', 60),
    subline('Dieser Irrtum kostet viele Anleger bares Geld'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      // Myth 1
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '18px',
          backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '16px', padding: '22px 24px',
          border: '1px solid rgba(239,68,68,0.2)'
        }
      },
        h('div', { style: { display: 'flex', width: '14px', height: '14px', borderRadius: '7px', backgroundColor: C.red } }),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', flex: '1' } },
          h('span', {
            style: {
              fontSize: '26px', fontWeight: 600, color: 'rgba(255,255,255,0.4)',
              textDecoration: 'line-through', fontFamily: 'Outfit'
            }
          }, '"Thesaurierend zahlt gar keine Steuern"'),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, fontFamily: 'Outfit' } },
            'Falsch — die Vorabpauschale greift jedes Jahr im Januar')
        )
      ),
      // Myth 2
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '18px',
          backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '16px', padding: '22px 24px',
          border: '1px solid rgba(239,68,68,0.2)'
        }
      },
        h('div', { style: { display: 'flex', width: '14px', height: '14px', borderRadius: '7px', backgroundColor: C.red } }),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', flex: '1' } },
          h('span', {
            style: {
              fontSize: '26px', fontWeight: 600, color: 'rgba(255,255,255,0.4)',
              textDecoration: 'line-through', fontFamily: 'Outfit'
            }
          }, '"Ausschüttend ist immer teurer"'),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, fontFamily: 'Outfit' } },
            'Falsch — beide Typen nutzen denselben Sparerpauschbetrag')
        )
      ),
      // Myth 3
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '18px',
          backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '16px', padding: '22px 24px',
          border: '1px solid rgba(239,68,68,0.2)'
        }
      },
        h('div', { style: { display: 'flex', width: '14px', height: '14px', borderRadius: '7px', backgroundColor: C.red } }),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', flex: '1' } },
          h('span', {
            style: {
              fontSize: '26px', fontWeight: 600, color: 'rgba(255,255,255,0.4)',
              textDecoration: 'line-through', fontFamily: 'Outfit'
            }
          }, '"Die Wahl des ETF-Typs ist egal"'),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, fontFamily: 'Outfit' } },
            'Falsch — für Anfänger macht sie einen echten Unterschied')
        )
      )
    ),
    keyLearning('3 Irrtümer — 1 Wahrheit: Steuerfreiheit gibt es nur mit Freistellungsauftrag.', C.red),
    igHandle(),
  ]);

  // ─── SLIDE 3: SO FUNKTIONIERT ES WIRKLICH (AKT 1→2) ─────────────────────────
  const svgFlow = `<svg width="860" height="120" viewBox="0 0 860 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="80" cy="60" r="50" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" stroke-width="3"/>
    <line x1="135" y1="60" x2="230" y2="60" stroke="rgba(255,255,255,0.3)" stroke-width="3" stroke-dasharray="8,6"/>
    <polygon points="225,52 240,60 225,68" fill="rgba(255,255,255,0.3)"/>
    <rect x="250" y="20" width="140" height="80" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    <line x1="395" y1="60" x2="490" y2="60" stroke="rgba(255,255,255,0.3)" stroke-width="3" stroke-dasharray="8,6"/>
    <polygon points="485,52 500,60 485,68" fill="rgba(255,255,255,0.3)"/>
    <rect x="510" y="20" width="140" height="80" rx="12" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" stroke-width="2"/>
    <line x1="655" y1="60" x2="750" y2="60" stroke="rgba(255,255,255,0.3)" stroke-width="3" stroke-dasharray="8,6"/>
    <polygon points="745,52 760,60 745,68" fill="rgba(255,255,255,0.3)"/>
    <circle cx="790" cy="60" r="50" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.4)" stroke-width="3"/>
  </svg>`;
  const svgFlowSrc = `data:image/svg+xml;base64,${Buffer.from(svgFlow).toString('base64')}`;

  const slide3 = slideRoot([
    topBar(),
    badge('SO FUNKTIONIERT ES'),
    headline('Der echte Unterschied der beiden ETF-Typen', 50),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      // Thesaurierend row
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(255,255,255,0.08)',
          borderRadius: '20px', padding: '28px', gap: '14px',
          border: '1px solid rgba(255,255,255,0.15)'
        }
      },
        h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' } },
          h('div', {
            style: {
              display: 'flex', width: '48px', height: '48px', borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center'
            }
          },
            h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.text, fontFamily: 'Outfit' } }, 'T')
          ),
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.text, fontFamily: 'Outfit' } }, 'Thesaurierend')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'row', gap: '12px', flexWrap: 'wrap' } },
          h('div', { style: { display: 'flex', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 16px' } },
            h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textSoft, fontFamily: 'Outfit' } }, 'Dividenden bleiben im Fonds')
          ),
          h('div', { style: { display: 'flex', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 16px' } },
            h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textSoft, fontFamily: 'Outfit' } }, 'automatisch reinvestiert')
          ),
          h('div', { style: { display: 'flex', backgroundColor: 'rgba(239,68,68,0.15)', borderRadius: '10px', padding: '10px 16px', border: '1px solid rgba(239,68,68,0.3)' } },
            h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.red, fontFamily: 'Outfit' } }, 'Vorabpauschale Jan.')
          )
        )
      ),
      // Ausschüttend row
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(16,185,129,0.08)',
          borderRadius: '20px', padding: '28px', gap: '14px',
          border: '1px solid rgba(16,185,129,0.25)'
        }
      },
        h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' } },
          h('div', {
            style: {
              display: 'flex', width: '48px', height: '48px', borderRadius: '12px',
              backgroundColor: 'rgba(16,185,129,0.25)', alignItems: 'center', justifyContent: 'center'
            }
          },
            h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.green, fontFamily: 'Outfit' } }, 'A')
          ),
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.text, fontFamily: 'Outfit' } }, 'Ausschüttend')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'row', gap: '12px', flexWrap: 'wrap' } },
          h('div', { style: { display: 'flex', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '10px', padding: '10px 16px' } },
            h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.green, fontFamily: 'Outfit' } }, 'Dividenden ausgezahlt')
          ),
          h('div', { style: { display: 'flex', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '10px', padding: '10px 16px' } },
            h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.green, fontFamily: 'Outfit' } }, 'transparent sichtbar')
          ),
          h('div', { style: { display: 'flex', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 16px' } },
            h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textSoft, fontFamily: 'Outfit' } }, 'Steuer sofort faellig')
          )
        )
      )
    ),
    keyLearning('Beide zahlen Steuern — der Unterschied liegt nur im Zeitpunkt.'),
    igHandle(),
  ]);

  // ─── SLIDE 4: VORABPAUSCHALE ERKLÄRT (AKT 2) ─────────────────────────────────
  const svgBar = `<svg width="860" height="200" viewBox="0 0 860 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="20" width="760" height="40" rx="10" fill="rgba(255,255,255,0.06)"/>
    <rect x="40" y="20" width="760" height="40" rx="10" fill="rgba(255,255,255,0.06)"/>
    <rect x="40" y="20" width="456" height="40" rx="10" fill="rgba(239,68,68,0.3)"/>
    <rect x="40" y="80" width="760" height="40" rx="10" fill="rgba(255,255,255,0.06)"/>
    <rect x="40" y="80" width="285" height="40" rx="10" fill="rgba(16,185,129,0.4)"/>
    <rect x="40" y="140" width="760" height="40" rx="10" fill="rgba(255,255,255,0.06)"/>
    <rect x="40" y="140" width="380" height="40" rx="10" fill="rgba(255,255,255,0.15)"/>
  </svg>`;
  const svgBarSrc = `data:image/svg+xml;base64,${Buffer.from(svgBar).toString('base64')}`;

  const slide4 = slideRoot([
    topBar(),
    badge('DIE VORABPAUSCHALE'),
    headline('Was kostet dich der thesaurierende ETF wirklich?', 48),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      // Info box
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(255,255,255,0.06)',
          borderRadius: '20px', padding: '28px', gap: '16px',
          border: '1px solid rgba(255,255,255,0.12)'
        }
      },
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.textMuted, letterSpacing: '2px', fontFamily: 'Outfit' } }, 'BEISPIEL: 10.000 EUR DEPOTWERT'),
        h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: C.border, borderRadius: '1px' } }),
        h('div', { style: { display: 'flex', flexDirection: 'row', gap: '12px' } },
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column', gap: '6px',
              backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '14px', padding: '20px 20px',
              border: '1px solid rgba(239,68,68,0.2)'
            }
          },
            h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.red, fontFamily: 'Outfit' } }, '224 EUR'),
            h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted, fontFamily: 'Outfit', lineHeight: '1.4' } }, 'Basisbetrag bei 3,20 % Basiszins 2026'),
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', fontFamily: 'Outfit' } }, '10.000 x 3,20 % x 70 %')
          ),
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column', gap: '6px',
              backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '14px', padding: '20px 20px',
              border: '1px solid rgba(239,68,68,0.2)'
            }
          },
            h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.red, fontFamily: 'Outfit' } }, 'ca. 41 EUR'),
            h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted, fontFamily: 'Outfit', lineHeight: '1.4' } }, 'Steuer im Januar 2027'),
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', fontFamily: 'Outfit' } }, '156,80 x 26,375 % Abgeltungsteuer')
          ),
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column', gap: '6px',
              backgroundColor: 'rgba(16,185,129,0.08)', borderRadius: '14px', padding: '20px 20px',
              border: '1px solid rgba(16,185,129,0.2)'
            }
          },
            h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.green, fontFamily: 'Outfit' } }, '0 EUR'),
            h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted, fontFamily: 'Outfit', lineHeight: '1.4' } }, 'mit Freistellungsauftrag'),
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', fontFamily: 'Outfit' } }, '1.000 EUR Sparerpauschbetrag')
          )
        )
      ),
      h('img', { src: svgBarSrc, width: 860, height: 200, style: { objectFit: 'contain' } }),
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '12px' } },
        h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' } },
          h('div', { style: { display: 'flex', width: '16px', height: '16px', borderRadius: '4px', backgroundColor: 'rgba(239,68,68,0.5)' } }),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, 'ohne Freistellung')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' } },
          h('div', { style: { display: 'flex', width: '16px', height: '16px', borderRadius: '4px', backgroundColor: 'rgba(16,185,129,0.6)' } }),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, 'mit Freistellungsauftrag')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' } },
          h('div', { style: { display: 'flex', width: '16px', height: '16px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.3)' } }),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, 'ausschüttend')
        )
      )
    ),
    keyLearning('Freistellungsauftrag gestellt? Dann zahlt du bei beiden Typen erst mal 0 EUR.', C.green),
    igHandle(),
  ]);

  // ─── SLIDE 5: FÜR WEN WELCHER TYP? (AKT 2) ───────────────────────────────────
  const slide5 = slideRoot([
    topBar(),
    badge('WANN WELCHER TYP?'),
    headline('3 Fragen — und du weißt welcher ETF passt', 50),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      // Question 1
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.08)',
          borderRadius: '18px', padding: '22px 24px', gap: '18px', alignItems: 'center',
          border: '1px solid rgba(255,255,255,0.12)'
        }
      },
        h('div', {
          style: {
            display: 'flex', width: '52px', height: '52px', borderRadius: '14px', minWidth: '52px',
            backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center'
          }
        },
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.text, fontFamily: 'Outfit' } }, '1')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', flex: '1' } },
          h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.text, fontFamily: 'Outfit' } }, 'Willst du regelmäßig Geld ausgezahlt bekommen?'),
          h('div', { style: { display: 'flex', flexDirection: 'row', gap: '10px' } },
            h('div', { style: { display: 'flex', backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '8px', padding: '6px 14px' } },
              h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.green, fontFamily: 'Outfit' } }, 'Ja - Ausschüttend')
            ),
            h('div', { style: { display: 'flex', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '8px', padding: '6px 14px' } },
              h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted, fontFamily: 'Outfit' } }, 'Nein - beide möglich')
            )
          )
        )
      ),
      // Question 2
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.08)',
          borderRadius: '18px', padding: '22px 24px', gap: '18px', alignItems: 'center',
          border: '1px solid rgba(255,255,255,0.12)'
        }
      },
        h('div', {
          style: {
            display: 'flex', width: '52px', height: '52px', borderRadius: '14px', minWidth: '52px',
            backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center'
          }
        },
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.text, fontFamily: 'Outfit' } }, '2')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', flex: '1' } },
          h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.text, fontFamily: 'Outfit' } }, 'Hast du deinen Freistellungsauftrag gestellt?'),
          h('div', { style: { display: 'flex', flexDirection: 'row', gap: '10px' } },
            h('div', { style: { display: 'flex', backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '8px', padding: '6px 14px' } },
              h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.green, fontFamily: 'Outfit' } }, 'Ja - jetzt Thesaurierend prüfen')
            ),
            h('div', { style: { display: 'flex', backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '8px', padding: '6px 14px', border: '1px solid rgba(239,68,68,0.3)' } },
              h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.red, fontFamily: 'Outfit' } }, 'Nein - zuerst nachholen!')
            )
          )
        )
      ),
      // Question 3
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.08)',
          borderRadius: '18px', padding: '22px 24px', gap: '18px', alignItems: 'center',
          border: '1px solid rgba(255,255,255,0.12)'
        }
      },
        h('div', {
          style: {
            display: 'flex', width: '52px', height: '52px', borderRadius: '14px', minWidth: '52px',
            backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center'
          }
        },
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.text, fontFamily: 'Outfit' } }, '3')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', flex: '1' } },
          h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.text, fontFamily: 'Outfit' } }, 'Bist du ETF-Anfänger und magst Übersicht?'),
          h('div', { style: { display: 'flex', flexDirection: 'row', gap: '10px' } },
            h('div', { style: { display: 'flex', backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '8px', padding: '6px 14px' } },
              h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.green, fontFamily: 'Outfit' } }, 'Ja - Ausschüttend ist einfacher')
            ),
            h('div', { style: { display: 'flex', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '8px', padding: '6px 14px' } },
              h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted, fontFamily: 'Outfit' } }, 'Nein - Thesaurierend optimal')
            )
          )
        )
      )
    ),
    keyLearning('Für Anfänger: Ausschüttend — transparenter und leichter zu verstehen.'),
    igHandle(),
  ]);

  // ─── SLIDE 6: LEARNINGS (AKT 3) ───────────────────────────────────────────────
  const learnings = [
    { num: '01', text: 'Thesaurierend ist NICHT steuerfrei — Vorabpauschale greift jedes Jahr im Januar', pct: 33 },
    { num: '02', text: 'Freistellungsauftrag zuerst — 1.000 EUR Sparerpauschbetrag für jeden nutzen', pct: 66 },
    { num: '03', text: 'Anfänger wählen ausschüttend — transparenter, keine Januarüberraschung', pct: 100 },
  ];

  const slide6 = slideRoot([
    topBar(),
    badge('DEINE TAKEAWAYS'),
    headline('3 Dinge die du jetzt wissen musst', 56),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px',
            padding: '24px 28px', backgroundColor: C.cardBg, borderRadius: '18px'
          }
        },
          h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '18px' } },
            h('span', {
              style: {
                fontSize: '44px', fontWeight: 800, minWidth: '64px',
                color: l.pct === 100 ? C.green : C.text, fontFamily: 'Outfit'
              }
            }, l.num),
            h('span', {
              style: {
                fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3', fontFamily: 'Outfit'
              }
            }, l.text)
          ),
          h('div', { style: { display: 'flex', height: '6px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', {
              style: {
                display: 'flex', width: `${l.pct}%`, height: '6px',
                backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px'
              }
            })
          )
        )
      )
    ),
    keyLearning('Der Sparplan zählt mehr als der ETF-Typ — fang einfach an.', C.green),
    igHandle(),
  ]);

  // ─── SLIDE 7: CTA (AKT 3) ─────────────────────────────────────────────────────
  const slide7 = slideRoot([
    topBar(),
    badge('DEIN NÄCHSTER SCHRITT'),
    headline('Welchen ETF-Typ nutzt du?', 60),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '28px' } },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px',
          backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '28px', padding: '48px 40px',
          border: '1px solid rgba(255,255,255,0.12)', width: '100%'
        }
      },
        h('span', {
          style: {
            fontSize: '32px', fontWeight: 700, color: C.textSoft, fontFamily: 'Outfit',
            lineHeight: '1.5', textAlign: 'center'
          }
        }, 'Schreib uns in die Kommentare:'),
        h('span', {
          style: {
            fontSize: '36px', fontWeight: 800, color: C.text, fontFamily: 'Outfit',
            lineHeight: '1.4', textAlign: 'center'
          }
        }, '"Thesaurierend", "Ausschüttend" oder "noch keinen ETF"'),
        h('div', { style: { display: 'flex', width: '80px', height: '4px', backgroundColor: C.green, borderRadius: '2px' } }),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' } },
          h('div', {
            style: {
              display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px',
              backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '14px', padding: '16px 20px'
            }
          },
            h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.green } }),
            h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, fontFamily: 'Outfit' } },
              'Folge @benarofinanzen für mehr Finanzwissen')
          ),
          h('div', {
            style: {
              display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px',
              backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '16px 20px'
            }
          },
            h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.textMuted } }),
            h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, fontFamily: 'Outfit' } },
              'Speichern nicht vergessen — du wirst es brauchen')
          )
        )
      )
    ),
    keyLearning('Benaro Finanzen — Dein Partner für smarte Finanzentscheidungen.', C.green),
    igHandle(),
  ]);

  // ─── GENERATE ALL SLIDES ─────────────────────────────────────────────────────
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(OUTPUT_DIR, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} generiert: ${pngPath}`);
  }
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
