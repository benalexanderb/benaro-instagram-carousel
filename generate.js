// generate.js — Carousel: Schulden tilgen oder investieren?
// Thema: Die mathematisch richtige Entscheidung
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

  const today = new Date().toISOString().split('T')[0];
  const outputDir = path.join(__dirname, `output/carousel_${today}/slides`);

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
        justifyContent: 'center', gap: '16px'
      }
    }, ...children);
  }

  // ========== SLIDE 1 — HOOK ==========
  const slide1 = slideRoot([
    logoCorner(),
    badge('ACHTUNG'),
    headline('Schulden tilgen', 72),
    headline('oder investieren?', 72),
    subline('Die Frage, die 80 % falsch beantworten'),
    visualBlock([
      h('div', { style: { display: 'flex', gap: '20px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(239,68,68,0.15)', borderRadius: '22px',
            padding: '36px 20px', gap: '12px',
            border: '2px solid rgba(239,68,68,0.4)'
          }
        },
          h('span', { style: { fontSize: '56px', fontWeight: 800, color: C.red } }, '3,8%'),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, textAlign: 'center' } }, 'Kreditzinsen'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, textAlign: 'center' } }, 'garantiert')
        ),
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px'
          }
        },
          h('span', { style: { fontSize: '36px', fontWeight: 700, color: C.textMuted } }, 'vs')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '22px',
            padding: '36px 20px', gap: '12px',
            border: '2px solid rgba(16,185,129,0.4)'
          }
        },
          h('span', { style: { fontSize: '56px', fontWeight: 800, color: C.green } }, '~7%'),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, textAlign: 'center' } }, 'ETF-Rendite'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, textAlign: 'center' } }, 'historisch')
        )
      ),
      h('div', {
        style: {
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          padding: '20px', backgroundColor: C.cardBg, borderRadius: '18px'
        }
      },
        h('span', {
          style: { fontSize: '28px', fontWeight: 600, color: C.textSoft, textAlign: 'center' }
        }, 'Swipe durch — die Antwort überrascht')
      )
    ]),
    keyLearning('Die richtige Entscheidung hängt von einer einzigen Zahl ab'),
    igFooter(),
  ]);

  // ========== SLIDE 2 — PROBLEM: Das stille Dilemma ==========
  const slide2 = slideRoot([
    logoCorner(),
    badge('DAS PROBLEM'),
    headline('Dein Kredit kostet dich', 60),
    headline('täglich Geld', 60),
    subline('Aber investieren auch — in entgangene Rendite'),
    visualBlock([
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '22px',
          padding: '36px', gap: '10px',
          border: '1px solid rgba(239,68,68,0.3)'
        }
      },
        h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted, letterSpacing: '2px' } }, 'DEIN KREDIT KOSTET DICH'),
        h('span', { style: { fontSize: '108px', fontWeight: 800, color: C.red, lineHeight: '1' } }, '3,8%'),
        h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft } }, 'pro Jahr — garantiert')
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px'
        }
      },
        h('div', { style: { width: '4px', height: '24px', backgroundColor: C.border, borderRadius: '2px' } }),
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textMuted } }, 'aber'),
        h('div', { style: { width: '4px', height: '24px', backgroundColor: C.border, borderRadius: '2px' } })
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '22px',
          padding: '36px', gap: '10px',
          border: '1px solid rgba(16,185,129,0.3)'
        }
      },
        h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted, letterSpacing: '2px' } }, 'DER WELT-ETF BRINGT DIR'),
        h('span', { style: { fontSize: '108px', fontWeight: 800, color: C.green, lineHeight: '1' } }, '~7%'),
        h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft } }, 'pro Jahr — historisch')
      )
    ]),
    keyLearning('Beide Zahlen gleichzeitig zu verstehen — das ist der Schlüssel'),
    igFooter(),
  ]);

  // ========== SLIDE 3 — SPANNUNG: Was die meisten tun ==========
  const slide3 = slideRoot([
    logoCorner(),
    badge('FEHLER NR. 1'),
    headline('Was die meisten tun', 60),
    subline('Und warum es sie bares Geld kostet'),
    visualBlock([
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '16px',
          padding: '24px 32px'
        }
      },
        h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft } }, 'Alle mit Schulden + Einkommen'),
        h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.text } }, '100%')
      ),
      h('div', { style: { display: 'flex', justifyContent: 'center' } },
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px'
          }
        },
          h('div', { style: { width: '4px', height: '22px', backgroundColor: C.border } }),
          h('div', {
            style: {
              width: '0', height: '0',
              borderLeft: '9px solid transparent',
              borderRight: '9px solid transparent',
              borderTop: '11px solid rgba(255,255,255,0.3)'
            }
          })
        )
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: 'rgba(239,68,68,0.15)', borderRadius: '16px',
          padding: '24px 32px',
          border: '1px solid rgba(239,68,68,0.3)'
        }
      },
        h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft } }, 'Nur tilgen ODER nur investieren'),
        h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.red } }, '70%')
      ),
      h('div', { style: { display: 'flex', justifyContent: 'center' } },
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px'
          }
        },
          h('div', { style: { width: '4px', height: '22px', backgroundColor: C.border } }),
          h('div', {
            style: {
              width: '0', height: '0',
              borderLeft: '9px solid transparent',
              borderRight: '9px solid transparent',
              borderTop: '11px solid rgba(255,255,255,0.3)'
            }
          })
        )
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '16px',
          padding: '24px 32px',
          border: '1px solid rgba(16,185,129,0.3)'
        }
      },
        h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft } }, 'Die smarte Parallelstrategie'),
        h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.green } }, '10%')
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '12px',
          backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '14px',
          padding: '16px 22px'
        }
      },
        h('div', { style: { width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.red, flexShrink: 0 } }),
        h('span', {
          style: { fontSize: '24px', fontWeight: 600, color: C.red }
        }, 'Nur 1 von 10 macht es wirklich richtig')
      )
    ]),
    keyLearning('Du kannst zur smarten Minderheit gehören — nächste Slide zeigt wie'),
    igFooter(),
  ]);

  // ========== SLIDE 4 — AUFLÖSUNG: Der Zinssatz entscheidet ==========
  const slide4 = slideRoot([
    logoCorner(),
    badge('DER SCHLÜSSEL'),
    headline('Der Zinssatz entscheidet', 60),
    headline('über alles', 60),
    subline('Diese eine Regel löst das Dilemma für immer'),
    visualBlock([
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '22px',
            padding: '28px 22px', gap: '14px',
            border: '2px solid rgba(239,68,68,0.35)'
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'TILGE ZUERST'),
          h('div', { style: { width: '100%', height: '3px', backgroundColor: 'rgba(239,68,68,0.4)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '50px', fontWeight: 800, color: C.red, lineHeight: '1' } }, '> 5%'),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, 'Zinssatz'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Kreditkarte, Dispo, Ratenkredit')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '22px',
            padding: '28px 22px', gap: '14px',
            border: '2px solid rgba(16,185,129,0.35)'
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'PARALLEL INVESTIEREN'),
          h('div', { style: { width: '100%', height: '3px', backgroundColor: 'rgba(16,185,129,0.4)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '50px', fontWeight: 800, color: C.green, lineHeight: '1' } }, '< 5%'),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, 'Zinssatz'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Baukredit, Autokredit, Studienkredit')
        )
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          backgroundColor: C.cardBg, borderRadius: '18px', padding: '22px 28px', gap: '8px'
        }
      },
        h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted } }, 'Die Formel'),
        h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.text } }, 'ETF-Rendite (7%) - Kreditkosten = Nettogewinn')
      )
    ]),
    keyLearning('Kreditkosten unter 5%? Investieren ist mathematisch überlegen'),
    igFooter(),
  ]);

  // ========== SLIDE 5 — AUFLÖSUNG: Das Rechenbeispiel ==========
  const chartSvg = `<svg width="860" height="240" viewBox="0 0 860 240" xmlns="http://www.w3.org/2000/svg">
  <line x1="60" y1="220" x2="840" y2="220" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
  <line x1="60" y1="10" x2="60" y2="220" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
  <line x1="60" y1="60" x2="840" y2="60" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <line x1="60" y1="110" x2="840" y2="110" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <line x1="60" y1="160" x2="840" y2="160" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <rect x="100" y="150" width="65" height="70" rx="8" fill="rgba(239,68,68,0.55)"/>
  <rect x="175" y="130" width="65" height="90" rx="8" fill="rgba(16,185,129,0.65)"/>
  <rect x="290" y="125" width="65" height="95" rx="8" fill="rgba(239,68,68,0.55)"/>
  <rect x="365" y="90" width="65" height="130" rx="8" fill="rgba(16,185,129,0.70)"/>
  <rect x="480" y="100" width="65" height="120" rx="8" fill="rgba(239,68,68,0.55)"/>
  <rect x="555" y="50" width="65" height="170" rx="8" fill="rgba(16,185,129,0.75)"/>
  <rect x="670" y="75" width="65" height="145" rx="8" fill="rgba(239,68,68,0.55)"/>
  <rect x="745" y="15" width="65" height="205" rx="8" fill="rgba(16,185,129,0.85)"/>
</svg>`;
  const chartSrc = `data:image/svg+xml;base64,${Buffer.from(chartSvg).toString('base64')}`;

  const slide5 = slideRoot([
    logoCorner(),
    badge('DAS RECHENBEISPIEL'),
    headline('100.000 € Kredit, 10 Jahre', 56),
    subline('500 € Sparrate — zwei Strategien im Vergleich'),
    visualBlock([
      h('div', { style: { display: 'flex', gap: '20px' } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          h('div', { style: { width: '18px', height: '18px', borderRadius: '4px', backgroundColor: C.red } }),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft } }, 'Nur tilgen')
        ),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          h('div', { style: { width: '18px', height: '18px', borderRadius: '4px', backgroundColor: C.green } }),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft } }, 'Parallel investieren')
        )
      ),
      h('img', { src: chartSrc, width: 860, height: 240, style: { objectFit: 'contain' } }),
      h('div', { style: { display: 'flex', justifyContent: 'space-around' } },
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Jahr 3'),
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Jahr 5'),
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Jahr 7'),
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Jahr 10')
      ),
      h('div', { style: { display: 'flex', gap: '14px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center',
            backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '16px', padding: '18px',
            border: '1px solid rgba(239,68,68,0.25)'
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'Nur Tilgen'),
          h('span', { style: { fontSize: '38px', fontWeight: 800, color: C.red } }, '~9.500 EUR'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'Zinsersparnis')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center',
            backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '16px', padding: '18px',
            border: '1px solid rgba(16,185,129,0.25)'
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'Parallel investieren'),
          h('span', { style: { fontSize: '38px', fontWeight: 800, color: C.green } }, '~34.000 EUR'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'Depot nach 10 Jahren')
        )
      )
    ]),
    keyLearning('Die Parallelstrategie erzeugt 3,5x mehr Vermögen als reines Tilgen'),
    igFooter(),
  ]);

  // ========== SLIDE 6 — AUFLÖSUNG: Die Strategie in 4 Schritten ==========
  const slide6 = slideRoot([
    logoCorner(),
    badge('DIE STRATEGIE'),
    headline('So geht die Parallelstrategie', 56),
    subline('Schritt für Schritt umsetzen'),
    visualBlock([
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '16px',
          backgroundColor: C.cardBg, borderRadius: '16px', padding: '20px 24px'
        }
      },
        h('div', {
          style: {
            display: 'flex', width: '48px', height: '48px', borderRadius: '12px',
            backgroundColor: 'rgba(239,68,68,0.25)', alignItems: 'center',
            justifyContent: 'center', minWidth: '48px'
          }
        },
          h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.red } }, '1')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, 'Hochzinsschulden sofort tilgen'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Kreditkarte, Dispo, Ratenkredit mit Zinsen über 5%')
        )
      ),
      h('div', { style: { display: 'flex', justifyContent: 'center' } },
        h('div', { style: { width: '4px', height: '18px', backgroundColor: C.border } })
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '16px',
          backgroundColor: C.cardBg, borderRadius: '16px', padding: '20px 24px'
        }
      },
        h('div', {
          style: {
            display: 'flex', width: '48px', height: '48px', borderRadius: '12px',
            backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center',
            justifyContent: 'center', minWidth: '48px'
          }
        },
          h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.text } }, '2')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, 'Notgroschen sichern'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, '3 Monatsgehälter auf dem Tagesgeldkonto')
        )
      ),
      h('div', { style: { display: 'flex', justifyContent: 'center' } },
        h('div', { style: { width: '4px', height: '18px', backgroundColor: C.border } })
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '16px',
          backgroundColor: C.cardBg, borderRadius: '16px', padding: '20px 24px'
        }
      },
        h('div', {
          style: {
            display: 'flex', width: '48px', height: '48px', borderRadius: '12px',
            backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center',
            justifyContent: 'center', minWidth: '48px'
          }
        },
          h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.text } }, '3')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, 'ETF-Sparplan starten'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Parallel zur laufenden Kreditrate investieren')
        )
      ),
      h('div', { style: { display: 'flex', justifyContent: 'center' } },
        h('div', { style: { width: '4px', height: '18px', backgroundColor: C.border } })
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '16px',
          backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '16px', padding: '20px 24px',
          border: '1px solid rgba(16,185,129,0.3)'
        }
      },
        h('div', {
          style: {
            display: 'flex', width: '48px', height: '48px', borderRadius: '12px',
            backgroundColor: 'rgba(16,185,129,0.3)', alignItems: 'center',
            justifyContent: 'center', minWidth: '48px'
          }
        },
          h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.green } }, '4')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.green } }, 'Sondertilgungen reinvestieren'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Zinsersparnis direkt in den ETF-Sparplan stecken')
        )
      )
    ]),
    keyLearning('Wer beides kombiniert, baut Vermögen deutlich schneller auf'),
    igFooter(),
  ]);

  // ========== SLIDE 7 — ABSCHLUSS: Learnings ==========
  const learnings = [
    { num: '01', text: 'Zinsen über 5%: Schulden haben Vorrang', pct: 25 },
    { num: '02', text: 'Zinsen unter 5%: Parallel in ETF investieren', pct: 50 },
    { num: '03', text: 'Notgroschen immer vor dem Sparplan aufbauen', pct: 75 },
    { num: '04', text: 'Zeit im Markt schlägt perfektes Timing immer', pct: 100 },
  ];

  const slide7 = slideRoot([
    logoCorner(),
    badge('DEINE LEARNINGS'),
    headline('4 Regeln die du brauchst', 58),
    subline('Speichere diese Slide'),
    visualBlock([
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px',
            padding: '20px 24px', backgroundColor: C.cardBg, borderRadius: '18px'
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', {
              style: {
                fontSize: '36px', fontWeight: 800,
                color: l.pct === 100 ? C.green : C.text, minWidth: '52px'
              }
            }, l.num),
            h('span', {
              style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3' }
            }, l.text)
          ),
          h('div', {
            style: {
              display: 'flex', height: '6px',
              backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '3px', overflow: 'hidden'
            }
          },
            h('div', {
              style: {
                display: 'flex', width: `${l.pct}%`, height: '6px',
                backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px'
              }
            })
          )
        )
      )
    ]),
    keyLearning('Wer früh anfängt, gewinnt Jahre an Vermögensaufbau'),
    igFooter(),
  ]);

  // ========== SLIDE 8 — CTA ==========
  const slide8 = slideRoot([
    badge('JETZT DU'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '28px'
      }
    },
      h('img', {
        src: logoB64, width: 160, height: 160,
        style: { objectFit: 'cover', borderRadius: '20px' }
      }),
      h('span', {
        style: {
          fontSize: '46px', fontWeight: 800, color: C.text,
          textAlign: 'center', lineHeight: '1.15', letterSpacing: '-1px'
        }
      }, 'Tilgst du gerade oder investierst du schon?'),
      h('span', {
        style: {
          fontSize: '28px', fontWeight: 500, color: C.textMuted,
          textAlign: 'center', lineHeight: '1.5'
        }
      }, 'Schreib es in die Kommentare — wir helfen dir, die richtige Entscheidung zu treffen'),
      h('div', {
        style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }
      },
        h('div', { style: { width: '60px', height: '4px', backgroundColor: C.green, borderRadius: '2px' } }),
        h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.green } }, 'Folge für mehr Finanzwissen')
      )
    ),
    keyLearning('Jeden Tag ein Schritt näher zur finanziellen Freiheit'),
    igFooter(),
  ]);

  // ========== GENERATE ALL SLIDES ==========
  fs.mkdirSync(outputDir, { recursive: true });

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outputDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} done: ${pngPath}`);
  }
  console.log('All slides generated!');
}

main().catch(e => { console.error(e); process.exit(1); });
