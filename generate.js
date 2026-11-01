'use strict';
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
    cardBg: 'rgba(255,255,255,0.10)',
    cardBgMed: 'rgba(255,255,255,0.15)',
    border: 'rgba(255,255,255,0.20)',
    green: '#10B981',
    red: '#EF4444',
    yellow: '#F59E0B',
  };

  const W = 1080, H = 1350;

  const h = (type, props, ...ch) => ({
    type,
    props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch },
  });

  const logoB64 = 'data:image/jpeg;base64,' +
    fs.readFileSync(path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')).toString('base64');

  function logo() {
    return h('img', {
      src: logoB64,
      width: 110,
      height: 110,
      style: { borderRadius: '12px', objectFit: 'cover' },
    });
  }

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '18px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: C.cardBg, padding: '10px 22px', borderRadius: '12px',
          fontFamily: 'Outfit',
        },
      }, text),
    );
  }

  function headline(text, size = 64) {
    return h('span', {
      style: {
        fontSize: `${size}px`, fontWeight: 800, color: C.text,
        lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '6px', fontFamily: 'Outfit',
      },
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500, color: C.textMuted,
        lineHeight: '1.45', marginTop: '8px', fontFamily: 'Outfit',
      },
    }, text);
  }

  function keyLearning(text, accentColor) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px', marginTop: 'auto',
      },
    },
      h('div', {
        style: {
          display: 'flex', width: '6px', minHeight: '40px',
          backgroundColor: accentColor || C.text, borderRadius: '3px',
        },
      }),
      h('span', {
        style: {
          fontSize: '28px', fontWeight: 600, color: C.text, lineHeight: '1.4', fontFamily: 'Outfit',
        },
      }, text),
    );
  }

  function igHandle() {
    return h('div', { style: { display: 'flex', alignItems: 'center', marginTop: '12px' } },
      h('span', {
        style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' },
      }, '@benarofinanzen'),
    );
  }

  function slideRoot(children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column',
        width: W, height: H,
        padding: '70px',
        backgroundColor: C.bg,
        fontFamily: 'Outfit',
        position: 'relative',
      },
    },
      h('div', {
        style: {
          display: 'flex', position: 'absolute',
          top: '48px', right: '60px',
        },
      }, logo()),
      ...children,
    );
  }

  // ───────────────────────────────────────────
  // SLIDE 1 — Hook
  // ───────────────────────────────────────────
  const slide1 = slideRoot([
    badge('NOVEMBER SPEZIAL'),
    headline('Dein Weihnachtsgeld:\nAusgeben oder\nverdoppeln?', 66),
    subline('Die meisten geben es in 3 Wochen aus.'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '20px', marginTop: '24px',
      },
    },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backgroundColor: C.cardBg, borderRadius: '24px', padding: '40px 32px', gap: '8px',
        },
      },
        h('span', {
          style: { fontSize: '120px', fontWeight: 800, color: C.green, letterSpacing: '-4px', fontFamily: 'Outfit', lineHeight: '1' },
        }, '2.800'),
        h('span', {
          style: { fontSize: '32px', fontWeight: 600, color: C.textSoft, fontFamily: 'Outfit' },
        }, 'Euro durchschnittliches Weihnachtsgeld'),
      ),
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center',
            backgroundColor: 'rgba(239,68,68,0.15)', borderRadius: '18px', padding: '24px 16px', gap: '8px',
            border: '1px solid rgba(239,68,68,0.3)',
          },
        },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.red, fontFamily: 'Outfit' } }, 'Ausgeben'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit', textAlign: 'center' } }, 'weg in 3 Wochen'),
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center',
            backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '18px', padding: '24px 16px', gap: '8px',
            border: '1px solid rgba(16,185,129,0.3)',
          },
        },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.green, fontFamily: 'Outfit' } }, 'Investieren'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit', textAlign: 'center' } }, 'arbeitet für dich'),
        ),
      ),
    ),
    keyLearning('Jetzt ist der beste Moment — lies alle Slides, bevor du entscheidest'),
    igHandle(),
  ]);

  // ───────────────────────────────────────────
  // SLIDE 2 — Wie Deutschland Weihnachtsgeld ausgibt
  // ───────────────────────────────────────────
  const barData = [
    { label: 'Reisen & Urlaub', pct: 38, color: C.textMuted },
    { label: 'Konsum & Shopping', pct: 22, color: C.textMuted },
    { label: 'Schuldenabbau', pct: 19, color: C.yellow },
    { label: 'Sparen (Tagesgeld)', pct: 14, color: C.textSoft },
    { label: 'Investieren (ETF)', pct: 7, color: C.green },
  ];

  const slide2 = slideRoot([
    badge('DIE REALITÄT'),
    headline('So gibt Deutschland\nsein Weihnachtsgeld aus', 58),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '18px', marginTop: '20px',
      },
    },
      ...barData.map(d =>
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, fontFamily: 'Outfit' } }, d.label),
            h('span', { style: { fontSize: '28px', fontWeight: 800, color: d.color, fontFamily: 'Outfit' } }, `${d.pct} %`),
          ),
          h('div', { style: { display: 'flex', height: '10px', backgroundColor: C.border, borderRadius: '5px', overflow: 'hidden' } },
            h('div', {
              style: {
                display: 'flex', width: `${d.pct}%`, height: '10px',
                backgroundColor: d.color, borderRadius: '5px',
              },
            }),
          ),
        ),
      ),
    ),
    keyLearning('Nur 7 % investieren ihr Weihnachtsgeld — die meisten verschenken echte Rendite', C.red),
    igHandle(),
  ]);

  // ───────────────────────────────────────────
  // SLIDE 3 — Konto vs. ETF nach 20 Jahren
  // ───────────────────────────────────────────
  const slide3 = slideRoot([
    badge('DER UNTERSCHIED'),
    headline('€ 2.800 auf dem Konto\nvs. im ETF — nach 20 Jahren', 54),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '20px', marginTop: '16px',
      },
    },
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '20px', padding: '28px', gap: '12px',
            border: `1px solid rgba(239,68,68,0.25)`,
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.red, fontFamily: 'Outfit' } }, 'SPARBUCH'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(239,68,68,0.3)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, 'Zins: 0,5 % p.a.'),
          h('span', { style: { fontSize: '48px', fontWeight: 800, color: C.red, letterSpacing: '-1px', fontFamily: 'Outfit' } }, '3.092 €'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, '+292 € in 20 Jahren'),
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '20px', padding: '28px', gap: '12px',
            border: `1px solid rgba(16,185,129,0.35)`,
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green, fontFamily: 'Outfit' } }, 'WELT-ETF'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(16,185,129,0.35)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, 'Rendite: 7 % p.a.'),
          h('span', { style: { fontSize: '48px', fontWeight: 800, color: C.green, letterSpacing: '-1px', fontFamily: 'Outfit' } }, '10.817 €'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, '+8.017 € in 20 Jahren'),
        ),
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          backgroundColor: C.cardBg, borderRadius: '18px', padding: '24px', gap: '4px',
        },
      },
        h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, 'Unterschied nach 20 Jahren'),
        h('span', { style: { fontSize: '64px', fontWeight: 800, color: C.green, letterSpacing: '-2px', fontFamily: 'Outfit' } }, '+7.725 €'),
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, 'durch eine einzige Entscheidung'),
      ),
    ),
    keyLearning('Der Zinseszins-Effekt macht den Unterschied — je früher, desto mehr'),
    igHandle(),
  ]);

  // ───────────────────────────────────────────
  // SLIDE 4 — Schritt 1: Notgroschen prüfen
  // ───────────────────────────────────────────
  const notgroschenStufen = [
    { label: 'Weniger als 1 Monatsgehalt', status: 'KRITISCH', color: C.red, pct: 20 },
    { label: '1 bis 2 Monatsgehälter', status: 'AUSREICHEND', color: C.yellow, pct: 55 },
    { label: '3 und mehr Monatsgehälter', status: 'OPTIMAL', color: C.green, pct: 100 },
  ];

  const slide4 = slideRoot([
    badge('SCHRITT 1 VON 3'),
    headline('Erst den Notgroschen\nauf 3 Monatsgehälter\nauffüllen', 54),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '20px', marginTop: '16px',
      },
    },
      ...notgroschenStufen.map(s =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '18px', padding: '24px 28px', gap: '12px',
          },
        },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, fontFamily: 'Outfit' } }, s.label),
            h('span', {
              style: {
                fontSize: '18px', fontWeight: 700, letterSpacing: '2px', color: s.color,
                backgroundColor: `${s.color}22`, padding: '6px 14px', borderRadius: '8px', fontFamily: 'Outfit',
              },
            }, s.status),
          ),
          h('div', { style: { display: 'flex', height: '8px', backgroundColor: C.border, borderRadius: '4px', overflow: 'hidden' } },
            h('div', {
              style: {
                display: 'flex', width: `${s.pct}%`, height: '8px',
                backgroundColor: s.color, borderRadius: '4px',
              },
            }),
          ),
        ),
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '12px',
          backgroundColor: 'rgba(16,185,129,0.08)', borderRadius: '14px', padding: '18px 24px',
          border: '1px solid rgba(16,185,129,0.2)',
        },
      },
        h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.green } }),
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.green, fontFamily: 'Outfit' } },
          'Erst Notgroschen sichern — dann investieren'),
      ),
    ),
    keyLearning('Ohne Notgroschen wird jede Einmalanlage zum Risiko'),
    igHandle(),
  ]);

  // ───────────────────────────────────────────
  // SLIDE 5 — Schritt 2: Schulden oder ETF?
  // ───────────────────────────────────────────
  const slide5 = slideRoot([
    badge('SCHRITT 2 VON 3'),
    headline('Schulden tilgen\noder in ETF investieren?', 58),
    subline('Die mathematisch richtige Entscheidung'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '20px', marginTop: '16px',
      },
    },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column',
          backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '20px', padding: '28px', gap: '12px',
          border: '1px solid rgba(239,68,68,0.25)',
        },
      },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
          h('div', {
            style: {
              display: 'flex', width: '48px', height: '48px', borderRadius: '12px',
              backgroundColor: C.red, alignItems: 'center', justifyContent: 'center',
            },
          },
            h('span', { style: { fontSize: '24px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'Outfit' } }, 'X'),
          ),
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.red, fontFamily: 'Outfit' } }, 'Zinssatz uber 5 %'),
        ),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4', fontFamily: 'Outfit' } },
          'Zuerst Schulden tilgen — diese Zinsen fressen deine ETF-Rendite auf'),
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column',
          backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '20px', padding: '28px', gap: '12px',
          border: '1px solid rgba(16,185,129,0.3)',
        },
      },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
          h('div', {
            style: {
              display: 'flex', width: '48px', height: '48px', borderRadius: '12px',
              backgroundColor: C.green, alignItems: 'center', justifyContent: 'center',
            },
          },
            h('span', { style: { fontSize: '24px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'Outfit' } }, 'OK'),
          ),
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.green, fontFamily: 'Outfit' } }, 'Zinssatz unter 5 %'),
        ),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4', fontFamily: 'Outfit' } },
          'Parallel investieren — der ETF-Sparplan erzielt langfristig mehr als du tilgst'),
      ),
    ),
    keyLearning('Die Regel: Zinsen uber 5 % tilgen, darunter parallel in ETF investieren', C.green),
    igHandle(),
  ]);

  // ───────────────────────────────────────────
  // SLIDE 6 — Schritt 3: Einmalanlage vs. Sparrate
  // ───────────────────────────────────────────
  const slide6 = slideRoot([
    badge('SCHRITT 3 VON 3'),
    headline('Einmalanlage oder\nSparrate erhöhen?', 60),
    subline('Beide Strategien funktionieren — die Mischung gewinnt'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '16px', marginTop: '12px',
      },
    },
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px', gap: '14px',
          },
        },
          h('span', {
            style: {
              display: 'flex', fontSize: '20px', fontWeight: 700, letterSpacing: '2px',
              color: C.green, backgroundColor: 'rgba(16,185,129,0.12)',
              padding: '8px 16px', borderRadius: '8px', fontFamily: 'Outfit',
            },
          }, 'EINMALANLAGE'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4', fontFamily: 'Outfit' } },
            'Sofort voll investiert'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4', fontFamily: 'Outfit' } },
            'Maximale Rendite ab Tag 1. Ideal wenn Notgroschen steht.'),
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px', gap: '14px',
          },
        },
          h('span', {
            style: {
              display: 'flex', fontSize: '20px', fontWeight: 700, letterSpacing: '2px',
              color: C.textSoft, backgroundColor: 'rgba(255,255,255,0.08)',
              padding: '8px 16px', borderRadius: '8px', fontFamily: 'Outfit',
            },
          }, 'SPARRATE ERHOHEN'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4', fontFamily: 'Outfit' } },
            'Automatisch investieren'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4', fontFamily: 'Outfit' } },
            'Disziplin ohne Aufwand. Cost Averaging nutzen.'),
        ),
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '12px',
          backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '16px', padding: '20px 24px',
          border: '1px solid rgba(16,185,129,0.2)',
        },
      },
        h('span', {
          style: {
            display: 'flex', fontSize: '20px', fontWeight: 700, color: C.green,
            backgroundColor: 'rgba(16,185,129,0.15)', padding: '6px 14px', borderRadius: '8px',
            fontFamily: 'Outfit', letterSpacing: '1px',
          },
        }, 'EMPFEHLUNG'),
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, fontFamily: 'Outfit' } },
          '50 % Einmalanlage + 50 % Sparrate erhöhen'),
      ),
    ),
    keyLearning('Der Weihnachtsbonus macht deinen Sparplan dauerhaft stärker'),
    igHandle(),
  ]);

  // ───────────────────────────────────────────
  // SLIDE 7 — 3-Schritte-Plan (Learnings)
  // ───────────────────────────────────────────
  const learnings = [
    { num: '01', text: 'Notgroschen auf 3 Monatsgehälter auffüllen', pct: 33 },
    { num: '02', text: 'Hochverzinste Schulden (uber 5 %) zuerst tilgen', pct: 66 },
    { num: '03', text: 'Rest sofort in Welt-ETF investieren', pct: 100 },
  ];

  const slide7 = slideRoot([
    badge('DEIN WEIHNACHTSGELD-PLAN'),
    headline('In 3 Schritten zum\nklügsten Investment\ndes Jahres', 54),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '20px', marginTop: '16px',
      },
    },
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '12px',
            padding: '24px 28px', backgroundColor: C.cardBg, borderRadius: '18px',
          },
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', {
              style: {
                fontSize: '40px', fontWeight: 800,
                color: l.pct === 100 ? C.green : C.text,
                minWidth: '60px', fontFamily: 'Outfit',
              },
            }, l.num),
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3', fontFamily: 'Outfit' } }, l.text),
          ),
          h('div', { style: { display: 'flex', height: '6px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', {
              style: {
                display: 'flex', width: `${l.pct}%`, height: '6px',
                backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px',
              },
            }),
          ),
        ),
      ),
    ),
    keyLearning('Wer heute handelt, macht aus 2.800 € uber 10.000 € in 20 Jahren', C.green),
    igHandle(),
  ]);

  // ───────────────────────────────────────────
  // SLIDE 8 — CTA
  // ───────────────────────────────────────────
  const slide8 = slideRoot([
    badge('TAEGLICH KLUEGER WERDEN'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '28px',
      },
    },
      h('div', {
        style: {
          display: 'flex', width: '140px', height: '140px',
          borderRadius: '24px', overflow: 'hidden',
        },
      },
        h('img', { src: logoB64, width: 140, height: 140, style: { objectFit: 'cover' } }),
      ),
      h('span', {
        style: {
          fontSize: '44px', fontWeight: 800, color: C.text,
          textAlign: 'center', lineHeight: '1.2', letterSpacing: '-1px', fontFamily: 'Outfit',
        },
      }, 'Was machst du mit\ndeinem Weihnachtsgeld?'),
      h('span', {
        style: {
          fontSize: '26px', fontWeight: 500, color: C.textMuted,
          textAlign: 'center', lineHeight: '1.5', fontFamily: 'Outfit',
        },
      }, 'Schreib es in die Kommentare — und folge\n@benarofinanzen fur mehr Finanztipps.'),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
          backgroundColor: C.cardBg, borderRadius: '16px', padding: '20px 32px',
        },
      },
        h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted, fontFamily: 'Outfit', letterSpacing: '1px' } },
          'GRATIS ERSTBERATUNG'),
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.green, fontFamily: 'Outfit' } },
          'benaro.de/erstberatung'),
      ),
    ),
    h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '16px' } },
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, '@benarofinanzen'),
    ),
  ]);

  // ───────────────────────────────────────────
  // RENDER ALL SLIDES
  // ───────────────────────────────────────────
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  const outDir = path.join(__dirname, 'output', `carousel_${new Date().toISOString().slice(0, 10)}`, 'slides');
  fs.mkdirSync(outDir, { recursive: true });

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
