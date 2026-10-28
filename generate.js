// generate.js — Carousel: Gold vs. Bitcoin 2026
// Thema: Welcher Inflationsschutz lohnt sich wirklich?
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
    bg: '#001F60',
    text: '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted: '#9CA3AF',
    cardBg: 'rgba(255,255,255,0.10)',
    border: 'rgba(255,255,255,0.18)',
    green: '#10B981',
    red: '#EF4444',
    gold: '#F59E0B',
    orange: '#F97316',
  };

  const W = 1080, H = 1350;

  const logoPath = path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg');
  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(logoPath).toString('base64');

  const TODAY = '2026-10-28';
  const outputDir = path.join(__dirname, `output/carousel_${TODAY}/slides`);
  fs.mkdirSync(outputDir, { recursive: true });

  const h = (type, props, ...ch) => ({
    type, props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  // ========== REUSABLE COMPONENTS ==========

  function slideRoot(...children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column',
        width: W, height: H, padding: '70px',
        backgroundColor: C.bg, fontFamily: 'Outfit',
      }
    }, ...children);
  }

  function logo() {
    return h('div', {
      style: { display: 'flex', position: 'absolute', top: '50px', right: '50px' }
    },
      h('img', {
        src: logoB64,
        width: 110, height: 110,
        style: { borderRadius: '14px', objectFit: 'cover' }
      })
    );
  }

  function badge(text, color) {
    let bg;
    if (color === 'green') bg = C.green;
    else if (color === 'red') bg = C.red;
    else if (color === 'gold') bg = C.gold;
    else if (color === 'orange') bg = C.orange;
    else bg = 'rgba(255,255,255,0.15)';
    return h('div', { style: { display: 'flex', marginBottom: '20px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '20px', fontWeight: 700, letterSpacing: '3px',
          color: '#000000', backgroundColor: bg,
          padding: '10px 22px', borderRadius: '12px'
        }
      }, text)
    );
  }

  function headline(text, size) {
    return h('span', {
      style: {
        fontSize: `${size || 66}px`, fontWeight: 800,
        color: C.text, lineHeight: '1.07',
        letterSpacing: '-1.5px', marginBottom: '8px'
      }
    }, text);
  }

  function subline(text, size) {
    return h('span', {
      style: {
        fontSize: `${size || 30}px`, fontWeight: 500,
        color: C.textMuted, lineHeight: '1.45', marginTop: '10px'
      }
    }, text);
  }

  function keyLearning(text, accentColor) {
    const accent = accentColor || C.green;
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '16px',
        backgroundColor: C.cardBg, borderRadius: '16px',
        padding: '22px 28px', marginTop: '20px',
        border: `1px solid ${C.border}`
      }
    },
      h('div', {
        style: {
          display: 'flex', width: '6px', minHeight: '44px',
          backgroundColor: accent, borderRadius: '3px', flexShrink: 0
        }
      }),
      h('span', {
        style: {
          fontSize: '26px', fontWeight: 600,
          color: C.textSoft, lineHeight: '1.4'
        }
      }, text)
    );
  }

  function igHandle() {
    return h('div', { style: { display: 'flex', marginTop: 'auto', paddingTop: '16px' } },
      h('span', {
        style: {
          fontSize: '24px', fontWeight: 600,
          color: 'rgba(255,255,255,0.45)', letterSpacing: '0.5px'
        }
      }, '@benarofinanzen')
    );
  }

  // ========== SLIDE 1: HOOK ==========

  const slide1 = slideRoot(
    logo(),
    badge('DAS SOLLTEST DU WISSEN', 'gold'),
    h('div', { style: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' } },
      h('span', {
        style: {
          fontSize: '110px', fontWeight: 800,
          color: C.gold, lineHeight: '1.0',
          letterSpacing: '-3px'
        }
      }, '20 %'),
      h('span', {
        style: {
          fontSize: '64px', fontWeight: 800,
          color: C.text, lineHeight: '1.08',
          letterSpacing: '-1.5px', marginTop: '10px'
        }
      }, 'deines Geldes sind weg.'),
      h('span', {
        style: {
          fontSize: '30px', fontWeight: 500,
          color: C.textMuted, lineHeight: '1.5', marginTop: '24px'
        }
      }, 'Seit 2020 hat die Inflation über 20 % Kaufkraft vernichtet — auf jedem Sparbuch.'),
      h('div', {
        style: {
          display: 'flex', gap: '20px', marginTop: '40px'
        }
      },
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            backgroundColor: C.cardBg, borderRadius: '16px',
            padding: '24px 36px', border: `1px solid ${C.border}`, flex: 1
          }
        },
          h('span', { style: { fontSize: '42px', fontWeight: 800, color: C.text } }, '100 €'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, marginTop: '6px' } }, 'Wert 2020')
        ),
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '36px', fontWeight: 700, color: C.textMuted
          }
        }, '='),
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            backgroundColor: `rgba(239,68,68,0.15)`, borderRadius: '16px',
            padding: '24px 36px', border: `1px solid rgba(239,68,68,0.3)`, flex: 1
          }
        },
          h('span', { style: { fontSize: '42px', fontWeight: 800, color: C.red } }, '80 €'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, marginTop: '6px' } }, 'Wert 2026')
        )
      )
    ),
    igHandle()
  );

  // ========== SLIDE 2: DAS PROBLEM ==========

  const inflationSvg = `<svg width="880" height="280" viewBox="0 0 880 280" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#F59E0B"/>
        <stop offset="100%" stop-color="#EF4444"/>
      </linearGradient>
    </defs>
    <rect x="0" y="50" width="120" height="38" rx="8" fill="url(#barGrad)" opacity="0.7"/>
    <rect x="0" y="114" width="190" height="38" rx="8" fill="url(#barGrad)" opacity="0.8"/>
    <rect x="0" y="178" width="340" height="38" rx="8" fill="url(#barGrad)" opacity="0.9"/>
    <rect x="0" y="242" width="580" height="38" rx="8" fill="url(#barGrad)"/>
  </svg>`;
  const inflationSrc = `data:image/svg+xml;base64,${Buffer.from(inflationSvg).toString('base64')}`;

  const slide2 = slideRoot(
    logo(),
    badge('DAS PROBLEM'),
    h('div', { style: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' } },
      headline('Inflation frisst dein Geld — jedes Jahr.', 56),
      subline('Kumulierte Geldentwertung seit 2020:'),
      h('div', { style: { display: 'flex', marginTop: '30px', gap: '0px' } },
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', width: '180px', paddingTop: '57px' } },
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted, height: '38px', display: 'flex', alignItems: 'center' } }, '2022'),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted, height: '38px', display: 'flex', alignItems: 'center', marginTop: '12px' } }, '2023'),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted, height: '38px', display: 'flex', alignItems: 'center', marginTop: '12px' } }, '2024'),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.text, height: '38px', display: 'flex', alignItems: 'center', marginTop: '12px' } }, '2026')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', flex: 1 } },
          h('img', { src: inflationSrc, width: 880, height: 280, style: { objectFit: 'contain' } })
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', width: '120px', paddingTop: '57px' } },
          h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.gold, height: '38px', display: 'flex', alignItems: 'center' } }, '+ 7 %'),
          h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.gold, height: '38px', display: 'flex', alignItems: 'center', marginTop: '12px' } }, '+ 10 %'),
          h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.gold, height: '38px', display: 'flex', alignItems: 'center', marginTop: '12px' } }, '+ 16 %'),
          h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.red, height: '38px', display: 'flex', alignItems: 'center', marginTop: '12px' } }, '+ 21 %')
        )
      )
    ),
    keyLearning('100 € auf dem Sparbuch sind 2026 effektiv nur noch ~79 € wert.', C.red),
    igHandle()
  );

  // ========== SLIDE 3: GOLD ==========

  const slide3 = slideRoot(
    logo(),
    badge('ANLAGEKLASSE 1', 'gold'),
    h('div', { style: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' } },
      headline('Gold — der klassische Inflationsschutz', 56),
      subline('Performance 2021–2026: +38 %'),
      h('div', { style: { display: 'flex', gap: '24px', marginTop: '32px' } },
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', flex: 1,
            backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '16px',
            padding: '28px', border: '1px solid rgba(16,185,129,0.3)'
          }
        },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.green, marginBottom: '16px', letterSpacing: '1px' } }, 'VORTEILE'),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft } }, '+ Inflationsschutz seit Jahrtausenden'),
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft } }, '+ Krisenfest (Krieg, Rezession)'),
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft } }, '+ Physisch besitzbar (Münzen, Barren)'),
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft } }, '+ Geringe Volatilität')
          )
        ),
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', flex: 1,
            backgroundColor: 'rgba(239,68,68,0.10)', borderRadius: '16px',
            padding: '28px', border: '1px solid rgba(239,68,68,0.25)'
          }
        },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.red, marginBottom: '16px', letterSpacing: '1px' } }, 'NACHTEILE'),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft } }, '- Keine Dividenden/Zinsen'),
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft } }, '- Lagerkosten (physisch)'),
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft } }, '- Langsames Wachstum'),
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft } }, '- Kein Cashflow')
          )
        )
      )
    ),
    keyLearning('Gold ist kein Renditetreiber — es ist eine Versicherung gegen Chaos.', C.gold),
    igHandle()
  );

  // ========== SLIDE 4: BITCOIN ==========

  const slide4 = slideRoot(
    logo(),
    badge('ANLAGEKLASSE 2', 'orange'),
    h('div', { style: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' } },
      headline('Bitcoin — das digitale Gold?', 58),
      subline('Performance 2021–2026: +145 % (mit hoher Volatilität)'),
      h('div', { style: { display: 'flex', gap: '24px', marginTop: '32px' } },
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', flex: 1,
            backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '16px',
            padding: '28px', border: '1px solid rgba(16,185,129,0.3)'
          }
        },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.green, marginBottom: '16px', letterSpacing: '1px' } }, 'VORTEILE'),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft } }, '+ Begrenztes Angebot (21 Mio. BTC)'),
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft } }, '+ Global, dezentral, zensurresistent'),
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft } }, '+ Hohes Renditepotenzial'),
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft } }, '+ Bitcoin-ETF seit 2024 möglich')
          )
        ),
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', flex: 1,
            backgroundColor: 'rgba(239,68,68,0.10)', borderRadius: '16px',
            padding: '28px', border: '1px solid rgba(239,68,68,0.25)'
          }
        },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.red, marginBottom: '16px', letterSpacing: '1px' } }, 'NACHTEILE'),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft } }, '- Extreme Volatilität (-70 % möglich)'),
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft } }, '- Regulierungsrisiko weltweit'),
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft } }, '- Kein innerer Wert / Substanz'),
            h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft } }, '- Hohe psychologische Belastung')
          )
        )
      )
    ),
    keyLearning('Bitcoin kann 3x steigen — aber auch 70 % fallen. Nur für starke Nerven.', C.orange),
    igHandle()
  );

  // ========== SLIDE 5: VERGLEICH ==========

  const barSvg = `<svg width="860" height="320" viewBox="0 0 860 320" xmlns="http://www.w3.org/2000/svg">
    <rect x="60" y="${320 - 38*4 - 30}" width="240" height="${38*4}" rx="8" fill="#F59E0B" opacity="0.85"/>
    <rect x="340" y="${320 - 38*6 - 30}" width="240" height="${38*6}" rx="8" fill="#F97316" opacity="0.85"/>
    <rect x="620" y="${320 - 38*5 - 30}" width="240" height="${38*5}" rx="8" fill="#10B981" opacity="0.85"/>
    <line x1="0" y1="${320 - 30}" x2="860" y2="${320 - 30}" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  </svg>`;
  const barSrc = `data:image/svg+xml;base64,${Buffer.from(barSvg).toString('base64')}`;

  const slide5 = slideRoot(
    logo(),
    badge('DER VERGLEICH'),
    h('div', { style: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' } },
      headline('5-Jahres-Rendite im Vergleich', 58),
      subline('2021 – 2026 (kumuliert, vor Steuern):'),
      h('div', { style: { display: 'flex', flexDirection: 'column', marginTop: '20px' } },
        h('img', { src: barSrc, width: 860, height: 320, style: { objectFit: 'contain' } }),
        h('div', { style: { display: 'flex', gap: '0px', marginTop: '8px' } },
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 } },
            h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.gold } }, '+38 %'),
            h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted } }, 'Gold')
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 } },
            h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.orange } }, '+145 %'),
            h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted } }, 'Bitcoin')
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 } },
            h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.green } }, '+72 %'),
            h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted } }, 'ETF World')
          )
        )
      )
    ),
    keyLearning('Bitcoin gewinnt auf dem Papier — aber kaum jemand hält durch den -70 %-Crash.', C.gold),
    igHandle()
  );

  // ========== SLIDE 6: STRATEGIE ==========

  const slide6 = slideRoot(
    logo(),
    badge('DIE LÖSUNG', 'green'),
    h('div', { style: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' } },
      headline('Die kluge Depotbeimischung 2026', 56),
      subline('Empfohlene Verteilung für langfristigen Vermögensaufbau:'),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '30px' } },
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: '20px',
            backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '14px',
            padding: '22px 28px', border: '1px solid rgba(16,185,129,0.25)'
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '90px', height: '56px', borderRadius: '10px',
              backgroundColor: C.green, alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }
          },
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: '#000' } }, '85 %')
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column' } },
            h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, 'ETF World (MSCI World / ACWI)'),
            h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, 'Basis-Rendite, global diversifiziert')
          )
        ),
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: '20px',
            backgroundColor: 'rgba(245,158,11,0.12)', borderRadius: '14px',
            padding: '22px 28px', border: '1px solid rgba(245,158,11,0.25)'
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '90px', height: '56px', borderRadius: '10px',
              backgroundColor: C.gold, alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }
          },
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: '#000' } }, '10 %')
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column' } },
            h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, 'Gold (Xetra-Gold / ETC)'),
            h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, 'Absicherung gegen Krisen & Inflation')
          )
        ),
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: '20px',
            backgroundColor: 'rgba(249,115,22,0.12)', borderRadius: '14px',
            padding: '22px 28px', border: '1px solid rgba(249,115,22,0.25)'
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '90px', height: '56px', borderRadius: '10px',
              backgroundColor: C.orange, alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }
          },
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: '#000' } }, '5 %')
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column' } },
            h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, 'Bitcoin (Bitcoin-ETF)'),
            h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, 'Wachstumschance, kleiner Anteil')
          )
        )
      )
    ),
    keyLearning('Mehr als 5–10 % Krypto erhöht das Risiko unverhältnismäßig — Beimischung genügt.', C.green),
    igHandle()
  );

  // ========== SLIDE 7: CTA ==========

  const slide7 = slideRoot(
    logo(),
    badge('DEINE MEINUNG'),
    h('div', { style: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' } },
      h('span', {
        style: {
          fontSize: '64px', fontWeight: 800,
          color: C.text, lineHeight: '1.08',
          letterSpacing: '-1.5px', textAlign: 'center', marginBottom: '12px'
        }
      }, 'Was nutzt du als\nInflationsschutz?'),
      h('div', { style: { display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap', justifyContent: 'center' } },
        h('div', {
          style: {
            display: 'flex', backgroundColor: 'rgba(245,158,11,0.18)', borderRadius: '16px',
            padding: '22px 36px', border: '1px solid rgba(245,158,11,0.4)'
          }
        },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.gold } }, 'A) Gold')
        ),
        h('div', {
          style: {
            display: 'flex', backgroundColor: 'rgba(249,115,22,0.18)', borderRadius: '16px',
            padding: '22px 36px', border: '1px solid rgba(249,115,22,0.4)'
          }
        },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.orange } }, 'B) Bitcoin')
        ),
        h('div', {
          style: {
            display: 'flex', backgroundColor: 'rgba(16,185,129,0.18)', borderRadius: '16px',
            padding: '22px 36px', border: '1px solid rgba(16,185,129,0.3)'
          }
        },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.green } }, 'C) Beides')
        ),
        h('div', {
          style: {
            display: 'flex', backgroundColor: C.cardBg, borderRadius: '16px',
            padding: '22px 36px', border: `1px solid ${C.border}`
          }
        },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.textSoft } }, 'D) Keins')
        )
      ),
      h('span', {
        style: {
          fontSize: '28px', fontWeight: 600,
          color: C.textMuted, marginTop: '36px', textAlign: 'center', lineHeight: '1.5'
        }
      }, 'Schreib deine Antwort in die Kommentare!\nFolge @benarofinanzen für mehr Finanzwissen.')
    ),
    h('div', { style: { display: 'flex', marginTop: 'auto', paddingTop: '16px', justifyContent: 'space-between', alignItems: 'center' } },
      h('span', {
        style: {
          fontSize: '24px', fontWeight: 600,
          color: 'rgba(255,255,255,0.45)', letterSpacing: '0.5px'
        }
      }, '@benarofinanzen'),
      h('div', {
        style: {
          display: 'flex', backgroundColor: C.green, borderRadius: '10px',
          padding: '10px 20px'
        }
      },
        h('span', { style: { fontSize: '20px', fontWeight: 700, color: '#000' } }, 'Speichern nicht vergessen!')
      )
    )
  );

  // ========== GENERATE ALL SLIDES ==========

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];
  const labels = ['Hook', 'Problem', 'Gold', 'Bitcoin', 'Vergleich', 'Strategie', 'CTA'];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outputDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} (${labels[i]}) — gespeichert: ${pngPath}`);
  }
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
