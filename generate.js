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
    bg: '#1B2D87',
    bgDark: '#12207A',
    bgDeep: '#0D1A60',
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
    type,
    props: {
      ...props,
      children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch,
    },
  });

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '16px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.accent, backgroundColor: 'rgba(91,200,245,0.15)',
          padding: '10px 22px', borderRadius: '12px', textTransform: 'uppercase',
        },
      }, text),
    );
  }

  function headline(text, size = 64) {
    return h('span', {
      style: {
        fontSize: `${size}px`, fontWeight: 800, color: C.text,
        lineHeight: '1.05', letterSpacing: '-0.5px', marginBottom: '6px',
        textTransform: 'uppercase',
      },
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500, color: C.textSoft,
        lineHeight: '1.5', marginTop: '8px',
      },
    }, text);
  }

  function keyLearning(text) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: '16px', padding: '22px 28px', marginTop: 'auto',
      },
    },
      h('div', { style: { display: 'flex', width: '6px', minHeight: '40px', backgroundColor: C.red, borderRadius: '3px' } }),
      h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, text),
    );
  }

  function bfLogo() {
    return h('div', {
      style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginTop: '16px' },
    },
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '72px', height: '56px',
          border: '3px solid rgba(255,255,255,0.9)', borderRadius: '10px',
        },
      },
        h('span', { style: { fontSize: '28px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '2px' } }, 'BF'),
      ),
      h('span', {
        style: {
          fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.7)',
          letterSpacing: '3px', textTransform: 'uppercase',
        },
      }, 'BENARO FINANZEN'),
    );
  }

  // === SLIDE 1: HOOK ===
  // Badge: "DAS GROSSE MISSVERSTÄNDNIS"
  // Headline: "75 % DER ETF-ANLEGER TREFFEN DIESE WAHL FALSCH"
  // Visual: Zwei riesige Felder — Ausschüttend vs. Thesaurierend mit dramatischem Kontrast
  const slide1 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    badge('DAS GROSSE MISSVERSTÄNDNIS'),
    headline('75 % DER ETF-ANLEGER TREFFEN DIESE WAHL FALSCH', 62),
    subline('Ausschüttend oder thesaurierend — klingt simpel, kostet aber Tausende'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px', marginTop: '24px',
      },
    },
      // Zwei große Kontrast-Blöcke
      h('div', { style: { display: 'flex', gap: '16px', flex: '1' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            backgroundColor: C.bgDark, borderRadius: '24px', padding: '32px',
            border: `2px solid ${C.border}`, gap: '16px',
          },
        },
          h('div', {
            style: {
              display: 'flex', width: '80px', height: '80px', borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center',
              border: `3px solid ${C.border}`,
            },
          },
            h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.textMuted } }, '€'),
          ),
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.textSoft, textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center' } }, 'AUSSCHÜTTEND'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, textAlign: 'center', lineHeight: '1.4' } }, 'Dividende fließt aufs Konto'),
        ),
        // VS divider
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '8px', minWidth: '60px',
          },
        },
          h('div', { style: { display: 'flex', width: '2px', flex: '1', backgroundColor: C.border } }),
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.accent, letterSpacing: '2px' } }, 'VS'),
          h('div', { style: { display: 'flex', width: '2px', flex: '1', backgroundColor: C.border } }),
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(91,200,245,0.12)', borderRadius: '24px', padding: '32px',
            border: `2px solid ${C.accent}`, gap: '16px',
          },
        },
          h('div', {
            style: {
              display: 'flex', width: '80px', height: '80px', borderRadius: '50%',
              backgroundColor: 'rgba(91,200,245,0.2)', alignItems: 'center', justifyContent: 'center',
              border: `3px solid ${C.accent}`,
            },
          },
            h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.accent } }, '+'),
          ),
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.accent, textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center' } }, 'THESAURIEREND'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, textAlign: 'center', lineHeight: '1.4' } }, 'Dividende wird reinvestiert'),
        ),
      ),
      // Frage darunter
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(230,48,48,0.1)', borderRadius: '16px', padding: '20px 32px',
          border: `1px solid ${C.red}`,
        },
      },
        h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.red, textTransform: 'uppercase', letterSpacing: '1px' } }, 'WEISST DU DEN UNTERSCHIED WIRKLICH?'),
      ),
    ),
    keyLearning('Beide ETF-Typen kaufen dieselben Aktien — aber behandeln die Dividende völlig anders'),
    bfLogo(),
  );

  // === SLIDE 2: STAT HERO — STEUERFALLE ===
  const slide2 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    badge('DIE STEUER-FALLE'),
    headline('JEDER DRITTE ANLEGER ZAHLT MEHR STEUERN ALS NÖTIG', 58),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center',
        alignItems: 'center', gap: '20px',
      },
    },
      // Red downward arrows
      h('div', { style: { display: 'flex', gap: '10px', marginBottom: '8px' } },
        h('div', { style: { display: 'flex', width: 0, height: 0, borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderTop: `22px solid ${C.red}` } }),
        h('div', { style: { display: 'flex', width: 0, height: 0, borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderTop: `22px solid ${C.red}` } }),
        h('div', { style: { display: 'flex', width: 0, height: 0, borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderTop: `22px solid ${C.red}` } }),
      ),
      h('span', { style: { fontSize: '150px', fontWeight: 800, color: C.accent, lineHeight: '1' } }, '33 %'),
      h('div', { style: { display: 'flex', width: '200px', height: '5px', backgroundColor: C.red, borderRadius: '3px' } }),
      h('span', {
        style: {
          fontSize: '30px', fontWeight: 600, color: C.text, lineHeight: '1.5',
          textAlign: 'center', maxWidth: '860px',
        },
      }, 'der ETF-Sparer nutzen den falschen Typ für ihre Situation und verschenken Steuerpotenzial'),
      // Konkrete Zahl
      h('div', {
        style: {
          display: 'flex', backgroundColor: C.bgDark, borderRadius: '20px',
          padding: '28px 36px', border: `1px solid ${C.border}`, gap: '20px',
          alignItems: 'center', marginTop: '8px',
        },
      },
        h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: C.red, minWidth: '12px' } }),
        h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } },
          'Bei 50.000 € Depotwert: bis zu 263 € vermeidbare Steuer pro Jahr'),
      ),
    ),
    keyLearning('Der falsche ETF-Typ kostet dich Jahr für Jahr echtes Geld — heute lösen wir das'),
    bfLogo(),
  );

  // === SLIDE 3: ERKLÄRUNG — WAS IST WAS ===
  const slide3 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    badge('DIE ERKLÄRUNG'),
    headline('SO FUNKTIONIERT JEDER TYP', 68),
    subline('Einmal verstehen — für immer die richtige Wahl treffen'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px',
      },
    },
      // Ausschüttend
      h('div', {
        style: {
          display: 'flex', backgroundColor: C.bgDark, borderRadius: '22px',
          padding: '28px 32px', border: `1px solid ${C.border}`, gap: '20px', flexDirection: 'column',
        },
      },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
          h('div', {
            style: {
              display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
              backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${C.border}`,
            },
          },
            h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.textMuted } }, '€'),
          ),
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.text, textTransform: 'uppercase', letterSpacing: '1px' } }, 'AUSSCHÜTTEND'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
            h('div', { style: { display: 'flex', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: C.border, minWidth: '8px' } }),
            h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Dividenden werden automatisch ans Konto ausgezahlt'),
          ),
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
            h('div', { style: { display: 'flex', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: C.red, minWidth: '8px' } }),
            h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Steuer fällt sofort bei Ausschüttung an (26,375 %)'),
          ),
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
            h('div', { style: { display: 'flex', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: C.border, minWidth: '8px' } }),
            h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Gut für: Passives Einkommen und Rentenphase'),
          ),
        ),
      ),
      // Thesaurierend
      h('div', {
        style: {
          display: 'flex', backgroundColor: 'rgba(91,200,245,0.10)', borderRadius: '22px',
          padding: '28px 32px', border: `2px solid ${C.accent}`, gap: '20px', flexDirection: 'column',
        },
      },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
          h('div', {
            style: {
              display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
              backgroundColor: 'rgba(91,200,245,0.2)', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${C.accent}`,
            },
          },
            h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.accent } }, '+%'),
          ),
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.accent, textTransform: 'uppercase', letterSpacing: '1px' } }, 'THESAURIEREND'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
            h('div', { style: { display: 'flex', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: C.accent, minWidth: '8px' } }),
            h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Dividenden werden automatisch reinvestiert'),
          ),
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
            h('div', { style: { display: 'flex', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: C.accent, minWidth: '8px' } }),
            h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Steuer wird erst bei Verkauf fällig (Steuerstundung)'),
          ),
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
            h('div', { style: { display: 'flex', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: C.accent, minWidth: '8px' } }),
            h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Gut für: Langfristiger Vermögensaufbau'),
          ),
        ),
      ),
    ),
    keyLearning('Ausschüttend = Dividende direkt aufs Konto. Thesaurierend = Dividende arbeitet weiter'),
    bfLogo(),
  );

  // === SLIDE 4: STEUERVERGLEICH — DER UNTERSCHIED ÜBER 20 JAHRE ===
  // SVG: Zwei Balken nebeneinander — Depotwert nach 20 Jahren
  const svg4 = `<svg width="940" height="320" viewBox="0 0 940 320" xmlns="http://www.w3.org/2000/svg">
    <!-- Hintergrundgitter -->
    <line x1="80" y1="20" x2="80" y2="280" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
    <line x1="80" y1="280" x2="860" y2="280" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
    <line x1="80" y1="210" x2="860" y2="210" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="6,4"/>
    <line x1="80" y1="140" x2="860" y2="140" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="6,4"/>
    <line x1="80" y1="70" x2="860" y2="70" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="6,4"/>
    <!-- Balken Ausschüttend -->
    <rect x="150" y="92" width="200" height="188" rx="10" fill="rgba(255,255,255,0.15)"/>
    <!-- Balken Thesaurierend (höher) -->
    <rect x="530" y="30" width="200" height="250" rx="10" fill="rgba(91,200,245,0.6)"/>
    <!-- Differenz-Linie -->
    <line x1="350" y1="92" x2="530" y2="30" stroke="rgba(230,48,48,0.8)" stroke-width="2" stroke-dasharray="8,4"/>
    <!-- Differenz-Pfeil -->
    <polygon points="530,30 510,24 520,44" fill="#E63030" opacity="0.9"/>
  </svg>`;
  const imgSrc4 = `data:image/svg+xml;base64,${Buffer.from(svg4).toString('base64')}`;

  const slide4 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    badge('DER UNTERSCHIED ÜBER 20 JAHRE'),
    headline('THESAURIEREND BRINGT DIR BIS ZU 8.400 € MEHR', 56),
    subline('Bei 200 €/Monat Sparplan, 7 % Rendite p.a., Steuersatz 26,375 %'),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' },
    },
      h('img', { src: imgSrc4, width: 940, height: 320, style: { objectFit: 'contain' } }),
      h('div', { style: { display: 'flex', gap: '24px', justifyContent: 'center' } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          h('div', { style: { display: 'flex', width: '28px', height: '16px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.3)' } }),
          h('div', { style: { display: 'flex', flexDirection: 'column' } },
            h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.text } }, 'AUSSCHÜTTEND'),
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.textSoft } }, '96.800 €'),
          ),
        ),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          h('div', { style: { display: 'flex', width: '28px', height: '16px', borderRadius: '4px', backgroundColor: C.accent } }),
          h('div', { style: { display: 'flex', flexDirection: 'column' } },
            h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.accent } }, 'THESAURIEREND'),
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.accent } }, '105.200 €'),
          ),
        ),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          h('div', { style: { display: 'flex', width: '28px', height: '16px', borderRadius: '4px', backgroundColor: C.red } }),
          h('div', { style: { display: 'flex', flexDirection: 'column' } },
            h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.red } }, 'DIFFERENZ'),
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.red } }, '+8.400 €'),
          ),
        ),
      ),
    ),
    keyLearning('Thesaurierend nutzt den Zinseszins voll — Steuern fallen erst beim Verkauf an'),
    bfLogo(),
  );

  // === SLIDE 5: WELCHER TYP BIST DU? — 2x2 GRID ===
  const slide5 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    badge('DEIN PROFIL'),
    headline('FÜR WEN IST WELCHER TYP RICHTIG?', 60),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px', marginTop: '20px' },
    },
      // Zeile 1: Thesaurierend
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(91,200,245,0.10)', borderRadius: '20px',
            padding: '24px 28px', border: `2px solid ${C.accent}`, gap: '10px',
          },
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
            h('div', { style: { display: 'flex', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: C.accent } }),
            h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.accent, textTransform: 'uppercase' } }, 'THESAURIEREND'),
          ),
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.text, lineHeight: '1.2', textTransform: 'uppercase' } }, 'UNTER 50 JAHRE'),
          h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Noch im Vermögensaufbau — maximaler Zinseszins'),
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(91,200,245,0.10)', borderRadius: '20px',
            padding: '24px 28px', border: `2px solid ${C.accent}`, gap: '10px',
          },
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
            h('div', { style: { display: 'flex', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: C.accent } }),
            h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.accent, textTransform: 'uppercase' } }, 'THESAURIEREND'),
          ),
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.text, lineHeight: '1.2', textTransform: 'uppercase' } }, 'HOHE STEUERLAST'),
          h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Steuerstundung als Strategie — zahle später weniger'),
        ),
      ),
      // Zeile 2: Ausschüttend
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.bgDark, borderRadius: '20px',
            padding: '24px 28px', border: `1px solid ${C.border}`, gap: '10px',
          },
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
            h('div', { style: { display: 'flex', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: C.textMuted } }),
            h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted, textTransform: 'uppercase' } }, 'AUSSCHÜTTEND'),
          ),
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.text, lineHeight: '1.2', textTransform: 'uppercase' } }, 'IM RUHESTAND'),
          h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Regelmäßige Dividenden als Einkommensquelle'),
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.bgDark, borderRadius: '20px',
            padding: '24px 28px', border: `1px solid ${C.border}`, gap: '10px',
          },
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
            h('div', { style: { display: 'flex', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: C.textMuted } }),
            h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted, textTransform: 'uppercase' } }, 'AUSSCHÜTTEND'),
          ),
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.text, lineHeight: '1.2', textTransform: 'uppercase' } }, 'PASSIVES EINKOMMEN'),
          h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Wer jetzt Cash-flow aus dem Depot braucht'),
        ),
      ),
      // Hinweis
      h('div', {
        style: {
          display: 'flex', backgroundColor: 'rgba(91,200,245,0.08)', borderRadius: '14px',
          padding: '18px 24px', border: `1px solid rgba(91,200,245,0.3)`,
        },
      },
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.accent, lineHeight: '1.4' } },
          'Kombination möglich: 80 % thesaurierend + 20 % ausschüttend'),
      ),
    ),
    keyLearning('Es gibt keine universell richtige Antwort — nur die Wahl die zu deiner Lebenssituation passt'),
    bfLogo(),
  );

  // === SLIDE 6: DEINE 4 ENTSCHEIDUNGSREGELN ===
  const learnings = [
    { num: '01', text: 'UNTER 50? THESAURIEREND WÄHLEN', pct: 25 },
    { num: '02', text: 'FREISTELLUNGSAUFTRAG IMMER NUTZEN', pct: 50 },
    { num: '03', text: 'VORABPAUSCHALE IM JANUAR EINPLANEN', pct: 75 },
    { num: '04', text: 'IM RUHESTAND: AUF AUSSCHÜTTEND WECHSELN', pct: 100 },
  ];

  const slide6 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    badge('JETZT ENTSCHEIDEN'),
    headline('DEINE 4 ENTSCHEIDUNGSREGELN', 60),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' },
    },
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px', padding: '22px 26px',
            backgroundColor: C.bgDark, borderRadius: '18px',
            border: l.pct === 100 ? `2px solid ${C.accent}` : `1px solid ${C.border}`,
          },
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', {
              style: {
                fontSize: '36px', fontWeight: 800,
                color: l.pct === 100 ? C.accent : C.white, minWidth: '56px',
              },
            }, l.num),
            h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text, lineHeight: '1.3' } }, l.text),
          ),
          h('div', { style: { display: 'flex', height: '6px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', {
              style: {
                display: 'flex', width: `${l.pct}%`, height: '6px',
                backgroundColor: l.pct === 100 ? C.accent : C.red, borderRadius: '3px',
              },
            }),
          ),
        ),
      ),
    ),
    keyLearning('Wer diese 4 Regeln kennt, trifft die richtige ETF-Wahl für seine Situation'),
    bfLogo(),
  );

  // === SLIDE 7: CTA ===
  const slide7 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
      alignItems: 'center',
    },
  },
    badge('DEINE MEINUNG'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: '32px',
      },
    },
      h('span', {
        style: {
          fontSize: '68px', fontWeight: 800, color: C.text, textAlign: 'center',
          lineHeight: '1.1', textTransform: 'uppercase', letterSpacing: '-0.5px',
        },
      }, 'WELCHEN ETF NUTZT DU?'),
      h('div', { style: { display: 'flex', width: '80px', height: '5px', backgroundColor: C.red, borderRadius: '3px' } }),
      h('span', {
        style: {
          fontSize: '30px', fontWeight: 500, color: C.textSoft, textAlign: 'center',
          lineHeight: '1.5', maxWidth: '820px',
        },
      }, 'Schreib in die Kommentare: Ausschüttend oder Thesaurierend — und warum'),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
          backgroundColor: C.bgDark, borderRadius: '20px', padding: '28px 48px',
          border: `1px solid ${C.border}`, marginTop: '8px',
        },
      },
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.accent, letterSpacing: '2px', textTransform: 'uppercase' } }, 'SPEICHERN NICHT VERGESSEN'),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, 'Damit du es jederzeit nachschlagen kannst'),
      ),
      h('span', {
        style: { fontSize: '26px', fontWeight: 600, color: C.textMuted, textAlign: 'center', lineHeight: '1.5' },
      }, 'Folge @benarofinanzen für mehr Finanzwissen'),
    ),
    bfLogo(),
  );

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];
  const outDir = path.join(__dirname, 'output', `carousel_${new Date().toISOString().slice(0, 10)}`, 'slides');

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} done: ${pngPath}`);
  }
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
