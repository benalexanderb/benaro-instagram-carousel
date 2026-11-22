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
        lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '6px',
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

  function keyLearning(text, accent) {
    const accentColor = accent === 'red' ? C.red : accent === 'green' ? C.green : C.text;
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px', marginTop: 'auto'
      }
    },
      h('div', { style: { display: 'flex', width: '6px', minHeight: '40px', backgroundColor: accentColor, borderRadius: '3px' } }),
      h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.4', fontFamily: 'Outfit' } }, text)
    );
  }

  function igHandle() {
    return h('div', { style: { display: 'flex', alignItems: 'center', marginTop: '12px' } },
      h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, '@benarofinanzen')
    );
  }

  function topRow(badgeText) {
    return h('div', { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0px' } },
      badge(badgeText),
      logo()
    );
  }

  // ─── SLIDE 1 — HOOK ─────────────────────────────────────────────────────────
  // "5 Kreditkarten-Fallen die dich 500 € im Jahr kosten"
  const slide1 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
    }
  },
    topRow('JETZT AUFPASSEN'),
    headline('5 Kreditkarten-Fallen die dich 500 € im Jahr kosten', 60),
    subline('Und du merkst es meistens nicht'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '32px'
      }
    },
      // Big stat hero
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          backgroundColor: C.cardBg, borderRadius: '24px', padding: '50px 80px', gap: '12px'
        }
      },
        h('span', { style: { fontSize: '130px', fontWeight: 800, color: C.red, letterSpacing: '-4px', fontFamily: 'Outfit', lineHeight: '1' } }, '500 €'),
        h('span', { style: { fontSize: '30px', fontWeight: 600, color: C.textSoft, fontFamily: 'Outfit' } }, 'pro Jahr — unnötig verloren')
      ),
      // 3 kleine Chips
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '12px', padding: '12px 20px'
          }
        },
          h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.red } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.red, fontFamily: 'Outfit' } }, 'Zinsen')
        ),
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '12px', padding: '12px 20px'
          }
        },
          h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.red } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.red, fontFamily: 'Outfit' } }, 'Gebühren')
        ),
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '12px', padding: '12px 20px'
          }
        },
          h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.red } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.red, fontFamily: 'Outfit' } }, 'Versteckte Kosten')
        )
      )
    ),
    keyLearning('Die meisten zahlen, ohne es zu wissen.', 'red'),
    igHandle()
  );

  // ─── SLIDE 2 — STATISTIK ────────────────────────────────────────────────────
  const slide2 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
    }
  },
    topRow('DIE ZAHLEN'),
    headline('Was die meisten über ihre Kreditkarte nicht wissen', 56),
    subline('Deutschland 2026'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '24px'
      }
    },
      // Stat 1
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '24px',
          backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px 36px'
        }
      },
        h('span', { style: { fontSize: '72px', fontWeight: 800, color: C.red, fontFamily: 'Outfit', minWidth: '160px' } }, '54 %'),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text, fontFamily: 'Outfit' } }, 'kennen ihre Kreditkartenkosten nicht'),
          h('span', { style: { fontSize: '22px', fontWeight: 400, color: C.textMuted, fontFamily: 'Outfit' } }, 'Stiftung Warentest 2026')
        )
      ),
      // Stat 2
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '24px',
          backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px 36px'
        }
      },
        h('span', { style: { fontSize: '72px', fontWeight: 800, color: C.red, fontFamily: 'Outfit', minWidth: '160px' } }, '22 %'),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text, fontFamily: 'Outfit' } }, 'Zinsen zahlt du auf Raten-Rückstände'),
          h('span', { style: { fontSize: '22px', fontWeight: 400, color: C.textMuted, fontFamily: 'Outfit' } }, 'Durchschnitt dt. Kreditkarten')
        )
      ),
      // Stat 3
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '24px',
          backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px 36px'
        }
      },
        h('span', { style: { fontSize: '72px', fontWeight: 800, color: C.green, fontFamily: 'Outfit', minWidth: '160px' } }, '0 €'),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text, fontFamily: 'Outfit' } }, 'zahlen Kreditkarten-Profis dank Cashback'),
          h('span', { style: { fontSize: '22px', fontWeight: 400, color: C.textMuted, fontFamily: 'Outfit' } }, 'mit der richtigen Strategie')
        )
      )
    ),
    keyLearning('Unwissenheit bei Kreditkarten kostet echtes Geld.', 'red'),
    igHandle()
  );

  // ─── SLIDE 3 — DIE ZINSFALLE ─────────────────────────────────────────────────
  // Chart: 1.000 € Schulden wachsen auf 1.650 € in 2 Jahren bei 22% Zinsen

  const debtSvg = `<svg width="860" height="360" viewBox="0 0 860 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="debtGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#EF4444" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#EF4444" stop-opacity="0.9"/>
    </linearGradient>
  </defs>
  <!-- Y-Achse -->
  <line x1="80" y1="30" x2="80" y2="300" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  <!-- X-Achse -->
  <line x1="80" y1="300" x2="830" y2="300" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  <!-- Grid lines -->
  <line x1="80" y1="195" x2="830" y2="195" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-dasharray="6,4"/>
  <line x1="80" y1="90" x2="830" y2="90" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-dasharray="6,4"/>
  <!-- Debt curve: starts at 1000 EUR, rises to 1650 EUR -->
  <!-- y: 300 = 0 EUR (bottom), 30 = 2000 EUR (top). Range 1970px. Scale: 1px = 1970/270 = 7.3 EUR/px -->
  <!-- 1000 EUR -> y = 300 - (1000/1970*270) = 300 - 137 = 163 -->
  <!-- 1200 EUR -> y = 300 - (1200/1970*270) = 300 - 164 = 136 -->
  <!-- 1400 EUR -> y = 300 - (1400/1970*270) = 300 - 192 = 108 -->
  <!-- 1650 EUR -> y = 300 - (1650/1970*270) = 300 - 226 = 74 -->
  <path d="M80,163 C200,163 310,153 455,136 C570,122 680,98 830,74"
    stroke="#EF4444" stroke-width="4" fill="none"/>
  <!-- Area under curve -->
  <path d="M80,163 C200,163 310,153 455,136 C570,122 680,98 830,74 L830,300 L80,300 Z"
    fill="url(#debtGrad)"/>
  <!-- Data points -->
  <circle cx="80" cy="163" r="8" fill="#EF4444"/>
  <circle cx="455" cy="136" r="8" fill="#EF4444"/>
  <circle cx="830" cy="74" r="8" fill="#EF4444"/>
</svg>`;

  const debtSrc = `data:image/svg+xml;base64,${Buffer.from(debtSvg).toString('base64')}`;

  const slide3 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
    }
  },
    topRow('FALLE #1'),
    headline('1.000 € Schulden werden in 2 Jahren zu 1.650 €', 54),
    subline('Bei 22 % Zinsen — Mindest-Zahlung ist die teuerste Option'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '16px'
      }
    },
      // Chart
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
        // Y-Achse Labels + Chart
        h('div', { style: { display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-end' } },
          // Y-Labels
          h('div', { style: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '300px', paddingBottom: '0px' } },
            h('span', { style: { fontSize: '20px', color: C.textMuted, fontFamily: 'Outfit', textAlign: 'right' } }, '2.000 €'),
            h('span', { style: { fontSize: '20px', color: C.textMuted, fontFamily: 'Outfit', textAlign: 'right' } }, '1.500 €'),
            h('span', { style: { fontSize: '20px', color: C.textMuted, fontFamily: 'Outfit', textAlign: 'right' } }, '1.000 €')
          ),
          h('img', { src: debtSrc, width: 860, height: 360, style: { objectFit: 'contain' } })
        ),
        // X-Labels
        h('div', { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '70px', paddingRight: '0px' } },
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted, fontFamily: 'Outfit' } }, 'Start'),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted, fontFamily: 'Outfit' } }, '12 Monate'),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.red, fontFamily: 'Outfit' } }, '24 Monate')
        )
      ),
      // Annotation
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px',
          backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '14px', padding: '16px 24px'
        }
      },
        h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '6px', backgroundColor: C.red } }),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.red, fontFamily: 'Outfit' } }, '+650 € Zinsen — nur durch Mindest-Zahlung')
      )
    ),
    keyLearning('Mindest-Zahlung ist die teuerste Entscheidung.', 'red'),
    igHandle()
  );

  // ─── SLIDE 4 — ERWARTUNG vs. REALITÄT ───────────────────────────────────────
  const slide4 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
    }
  },
    topRow('WAS DU DENKST'),
    headline('Kreditkarte: Was du glaubst vs. was stimmt', 56),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '20px'
      }
    },
      // Row 1
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '10px',
            backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px'
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted, fontFamily: 'Outfit' } }, 'ERWARTUNG'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4', fontFamily: 'Outfit' } }, '"Die 30-Tage-Frist ist gratis"')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '10px',
            backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: '20px', padding: '28px',
            border: '2px solid rgba(16,185,129,0.4)'
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green, fontFamily: 'Outfit' } }, 'REALITÄT'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(16,185,129,0.4)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.4', fontFamily: 'Outfit' } }, 'Nur gratis, wenn du vollständig zahlst')
        )
      ),
      // Row 2
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '10px',
            backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px'
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted, fontFamily: 'Outfit' } }, 'ERWARTUNG'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4', fontFamily: 'Outfit' } }, '"Cashback ist immer ein Gewinn"')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '10px',
            backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: '20px', padding: '28px',
            border: '2px solid rgba(16,185,129,0.4)'
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green, fontFamily: 'Outfit' } }, 'REALITÄT'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(16,185,129,0.4)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.4', fontFamily: 'Outfit' } }, 'Nur wenn Jahresgebühr unter Cashback liegt')
        )
      ),
      // Row 3
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '10px',
            backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px'
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted, fontFamily: 'Outfit' } }, 'ERWARTUNG'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4', fontFamily: 'Outfit' } }, '"Revolut & Co. haben keine Fallen"')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '10px',
            backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: '20px', padding: '28px',
            border: '2px solid rgba(16,185,129,0.4)'
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green, fontFamily: 'Outfit' } }, 'REALITÄT'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(16,185,129,0.4)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.4', fontFamily: 'Outfit' } }, 'Auslands- und Bargeldgebühren lauern überall')
        )
      )
    ),
    keyLearning('Kreditkarte ist kein kostenloses Darlehen.', 'red'),
    igHandle()
  );

  // ─── SLIDE 5 — DIE 5 FALLEN ──────────────────────────────────────────────────
  const fallen = [
    { num: '01', title: 'Mindest-Zahlung', desc: 'Nur Minimum zahlen kostet bis zu +65 % Zinsen auf den Rest' },
    { num: '02', title: 'Jahresgebühr-Falle', desc: 'Karte mit 100 € Gebühr lohnt sich nur ab ca. 10.000 € Umsatz' },
    { num: '03', title: 'Auslands-Gebühren', desc: 'Viele Karten berechnen 1,5–3 % bei Zahlung im Ausland' },
    { num: '04', title: 'Ratenzahlung', desc: 'Kreditkarten-Raten kosten dich 15–22 % Zinsen p.a.' },
    { num: '05', title: 'Bargeld-Abhebung', desc: 'Sofortige Zinsen ab Tag 1 — kein zinsfreies Zeitfenster' },
  ];

  const slide5 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
    }
  },
    topRow('SO VERLIERST DU GELD'),
    headline('5 Fallen die du ab heute kennen solltest', 56),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '16px'
      }
    },
      ...fallen.map((f, i) =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '8px',
            padding: '20px 24px',
            backgroundColor: i === 4 ? 'rgba(16,185,129,0.1)' : C.cardBg,
            borderRadius: '16px',
            border: i === 4 ? '2px solid rgba(16,185,129,0.3)' : '2px solid transparent'
          }
        },
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
            h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' } },
              h('span', { style: { fontSize: '36px', fontWeight: 800, color: i === 4 ? C.green : C.red, minWidth: '60px', fontFamily: 'Outfit' } }, f.num),
              h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text, fontFamily: 'Outfit' } }, f.title)
            ),
            h('span', { style: { fontSize: '22px', fontWeight: 400, color: C.textMuted, lineHeight: '1.4', paddingLeft: '76px', fontFamily: 'Outfit' } }, f.desc)
          )
        )
      )
    ),
    keyLearning('Kenne die Regeln bevor du spielst.', 'red'),
    igHandle()
  );

  // ─── SLIDE 6 — DIE LÖSUNG ─────────────────────────────────────────────────────
  const steps = [
    { n: '1', title: 'Immer vollständig zahlen', desc: 'Jedes Monat den vollen Betrag — kein Zinszahler mehr', color: C.green },
    { n: '2', title: 'Karte mit Cashback wählen', desc: 'Jahresgebühr unter 0 halten: 0 € Karte + 1–2 % Cashback', color: C.green },
    { n: '3', title: 'Limit bewusst setzen', desc: 'Maximal das, was du diesen Monat wirklich ausgeben kannst', color: C.green },
  ];

  const slide6 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
    }
  },
    topRow('SO MACHST DU ES RICHTIG'),
    headline('3 Regeln für smarte Kreditkartennutzung', 56),
    subline('Damit die Karte für dich arbeitet — nicht gegen dich'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '24px'
      }
    },
      ...steps.map((s, i) =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '20px',
            backgroundColor: 'rgba(16,185,129,0.08)', borderRadius: '20px', padding: '28px 32px',
            border: '2px solid rgba(16,185,129,0.25)'
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '56px', height: '56px', borderRadius: '28px',
              backgroundColor: C.green, alignItems: 'center', justifyContent: 'center',
              minWidth: '56px'
            }
          },
            h('span', { style: { fontSize: '28px', fontWeight: 800, color: '#001F61', fontFamily: 'Outfit' } }, s.n)
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
            h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.text, fontFamily: 'Outfit' } }, s.title),
            h('span', { style: { fontSize: '24px', fontWeight: 400, color: C.textMuted, lineHeight: '1.4', fontFamily: 'Outfit' } }, s.desc)
          )
        )
      )
    ),
    keyLearning('Kreditkarte als Werkzeug — nicht als Schuld.', 'green'),
    igHandle()
  );

  // ─── SLIDE 7 — TAKEAWAYS ─────────────────────────────────────────────────────
  const learnings = [
    { num: '01', text: 'Vollständige Zahlung jedes Monat — kein Zinszahler', pct: 25 },
    { num: '02', text: 'Cashback-Karte wählen: Jahresgebühr unter 0 halten', pct: 50 },
    { num: '03', text: 'Keine Bargeld-Abhebung — sofortige Zinsen ab Tag 1', pct: 75 },
    { num: '04', text: 'Kreditkarten-Raten vermeiden — 22 % Zinsen p.a.', pct: 100 },
  ];

  const slide7 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
    }
  },
    topRow('DEIN FAHRPLAN'),
    headline('4 Regeln die du ab heute umsetzt', 60),
    subline('Damit deine Kreditkarte für dich arbeitet'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '20px'
      }
    },
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px',
            padding: '24px 28px', backgroundColor: C.cardBg, borderRadius: '18px'
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', { style: { fontSize: '38px', fontWeight: 800, color: l.pct === 100 ? C.green : C.text, minWidth: '60px', fontFamily: 'Outfit' } }, l.num),
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3', fontFamily: 'Outfit' } }, l.text)
          ),
          h('div', { style: { display: 'flex', height: '6px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${l.pct}%`, height: '6px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px' } })
          )
        )
      )
    ),
    keyLearning('Wer die Regeln kennt, gewinnt.', 'green'),
    igHandle()
  );

  // ─── SLIDE 8 — CTA ───────────────────────────────────────────────────────────
  const slide8 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
    }
  },
    h('div', { style: { display: 'flex', justifyContent: 'flex-end' } },
      logo()
    ),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '32px'
      }
    },
      h('span', {
        style: {
          fontSize: '52px', fontWeight: 800, color: C.text,
          textAlign: 'center', lineHeight: '1.15', letterSpacing: '-1px', fontFamily: 'Outfit'
        }
      }, 'Hast du deine Kreditkartenkosten schon mal wirklich berechnet?'),
      h('div', {
        style: {
          display: 'flex', backgroundColor: C.cardBg, borderRadius: '16px',
          padding: '20px 36px'
        }
      },
        h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft, fontFamily: 'Outfit' } }, 'Schreib dein Ergebnis in die Kommentare')
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginTop: '16px'
        }
      },
        h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, 'Folge für täglich kostenloses Finanzwissen'),
        h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.green, fontFamily: 'Outfit' } }, '@benarofinanzen')
      )
    ),
    h('div', {
      style: {
        display: 'flex', backgroundColor: C.cardBg, borderRadius: '16px',
        padding: '22px 28px', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
      }
    },
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, 'Benaro Finanzen'),
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, '@benarofinanzen')
    )
  );

  // ─── GENERATE ALL SLIDES ─────────────────────────────────────────────────────
  const TODAY = process.env.TODAY || new Date().toISOString().slice(0, 10);
  const outDir = path.join(__dirname, `output/carousel_${TODAY}/slides`);

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} generiert: ${path.basename(pngPath)}`);
  }
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
