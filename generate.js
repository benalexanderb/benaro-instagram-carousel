'use strict';
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
    type, props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '16px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.accent, backgroundColor: 'rgba(91,200,245,0.15)',
          padding: '10px 22px', borderRadius: '12px', textTransform: 'uppercase',
        }
      }, text),
    );
  }

  function headline(text, size = 64) {
    return h('span', {
      style: {
        fontSize: `${size}px`, fontWeight: 800, color: C.text,
        lineHeight: '1.05', letterSpacing: '-0.5px', marginBottom: '6px',
        textTransform: 'uppercase',
      }
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500, color: C.textSoft,
        lineHeight: '1.5', marginTop: '8px',
      }
    }, text);
  }

  function keyLearning(text) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: '16px', padding: '22px 28px', marginTop: 'auto',
      }
    },
      h('div', { style: { display: 'flex', width: '6px', minHeight: '40px', backgroundColor: C.red, borderRadius: '3px' } }),
      h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, text),
    );
  }

  function bfLogo() {
    return h('div', {
      style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginTop: '20px' }
    },
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '72px', height: '56px',
          border: '3px solid rgba(255,255,255,0.9)', borderRadius: '10px',
        }
      },
        h('span', { style: { fontSize: '28px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '2px' } }, 'BF'),
      ),
      h('span', {
        style: {
          fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.7)',
          letterSpacing: '3px', textTransform: 'uppercase',
        }
      }, 'BENARO FINANZEN'),
    );
  }

  // ─── SLIDE 1 — HOOK ───────────────────────────────────────────────────────
  // Akt 1: Spannung — schockierende Statistik als Hook
  const slide1 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    }
  },
    badge('ACHTUNG'),
    headline('PKV WIRD 13 % TEURER — BIST DU BEREIT?', 62),
    subline('Was du 2026 über deine Krankenversicherung wissen musst'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '24px',
      }
    },
      // Red arrows above big number
      h('div', { style: { display: 'flex', gap: '10px', marginBottom: '8px' } },
        ...[0, 1, 2].map(() =>
          h('div', {
            style: {
              display: 'flex', width: '0', height: '0',
              borderLeft: '16px solid transparent', borderRight: '16px solid transparent',
              borderTop: `22px solid ${C.red}`,
            }
          })
        ),
      ),
      h('span', { style: { fontSize: '160px', fontWeight: 800, color: C.accent, lineHeight: '1' } }, '+13%'),
      h('div', { style: { display: 'flex', width: '200px', height: '5px', backgroundColor: C.red, borderRadius: '3px', marginTop: '-8px' } }),
      h('span', {
        style: {
          fontSize: '30px', fontWeight: 500, color: C.text,
          lineHeight: '1.5', textAlign: 'center', maxWidth: '800px',
        }
      }, '60 % aller PKV-Versicherten zahlen 2026 mehr'),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '14px 28px', backgroundColor: 'rgba(230,48,48,0.15)',
          borderRadius: '14px', border: `1px solid ${C.red}`, marginTop: '16px',
        }
      },
        h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '6px', backgroundColor: C.red } }),
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.red, textTransform: 'uppercase' } }, 'Beiträge steigen schneller als die Inflation'),
      ),
    ),
    keyLearning('Die PKV-Krise 2026 trifft Millionen Versicherte — hier ist, was du tun kannst'),
    bfLogo(),
  );

  // ─── SLIDE 2 — KONTEXT: Beitragsentwicklung ────────────────────────────────
  // Akt 1: Spannung — Daten belegen das Problem
  const chartSvg2 = `<svg width="940" height="340" viewBox="0 0 940 340" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E63030" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#E63030" stop-opacity="0.0"/>
    </linearGradient>
    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#5BC8F5" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#5BC8F5" stop-opacity="0.0"/>
    </linearGradient>
  </defs>
  <!-- grid lines -->
  <line x1="60" y1="40" x2="900" y2="40" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <line x1="60" y1="100" x2="900" y2="100" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <line x1="60" y1="160" x2="900" y2="160" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <line x1="60" y1="220" x2="900" y2="220" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <line x1="60" y1="280" x2="900" y2="280" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <!-- PKV line (red rising): 2022=160, 2023=185, 2024=210, 2025=245, 2026=290 -->
  <!-- mapped: y = 300 - (value-100)*280/200 -->
  <!-- 160→ y=216, 185→ y=181, 210→ y=146, 245→ y=97, 290→ y=34 -->
  <path d="M120,216 C195,216 195,181 270,181 C345,181 345,146 420,146 C495,146 495,97 600,97 C705,97 705,34 780,34" stroke="#E63030" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M120,216 C195,216 195,181 270,181 C345,181 345,146 420,146 C495,146 495,97 600,97 C705,97 705,34 780,34 L780,300 L120,300 Z" fill="url(#g1)"/>
  <!-- GKV line (blue stable): 2022=158, 2023=165, 2024=170, 2025=175, 2026=178 -->
  <!-- 158→ y=219, 165→ y=209, 170→ y=202, 175→ y=195, 178→ y=191 -->
  <path d="M120,219 C195,219 195,209 270,209 C345,209 345,202 420,202 C495,202 495,195 600,195 C705,195 705,191 780,191" stroke="#5BC8F5" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M120,219 C195,219 195,209 270,209 C345,209 345,202 420,202 C495,202 495,195 600,195 C705,195 705,191 780,191 L780,300 L120,300 Z" fill="url(#g2)"/>
  <!-- dots PKV -->
  <circle cx="120" cy="216" r="6" fill="#E63030"/>
  <circle cx="270" cy="181" r="6" fill="#E63030"/>
  <circle cx="420" cy="146" r="6" fill="#E63030"/>
  <circle cx="600" cy="97" r="6" fill="#E63030"/>
  <circle cx="780" cy="34" r="8" fill="#E63030"/>
  <!-- dots GKV -->
  <circle cx="120" cy="219" r="6" fill="#5BC8F5"/>
  <circle cx="270" cy="209" r="6" fill="#5BC8F5"/>
  <circle cx="420" cy="202" r="6" fill="#5BC8F5"/>
  <circle cx="600" cy="195" r="6" fill="#5BC8F5"/>
  <circle cx="780" cy="191" r="8" fill="#5BC8F5"/>
  <!-- baseline -->
  <line x1="60" y1="300" x2="900" y2="300" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
</svg>`;

  const chartSrc2 = `data:image/svg+xml;base64,${Buffer.from(chartSvg2).toString('base64')}`;

  const slide2 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    }
  },
    badge('BEITRAGSENTWICKLUNG'),
    headline('SO STIEGEN DIE BEITRÄGE SEIT 2022', 58),
    subline('PKV vs. GKV im direkten Vergleich (indexiert)'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      h('img', { src: chartSrc2, width: 940, height: 340, style: { objectFit: 'contain' } }),
      // Year labels
      h('div', { style: { display: 'flex', justifyContent: 'space-between', paddingLeft: '60px', paddingRight: '60px' } },
        ...[' 2022', '2023', '2024', '2025', '2026'].map(y =>
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textMuted } }, y)
        ),
      ),
      // Legend
      h('div', { style: { display: 'flex', gap: '40px', justifyContent: 'center', marginTop: '16px' } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          h('div', { style: { display: 'flex', width: '32px', height: '5px', backgroundColor: C.red, borderRadius: '3px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, 'PKV-Beitrag'),
        ),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          h('div', { style: { display: 'flex', width: '32px', height: '5px', backgroundColor: C.accent, borderRadius: '3px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, 'GKV-Beitrag'),
        ),
      ),
      // Value highlight
      h('div', {
        style: {
          display: 'flex', justifyContent: 'center', gap: '20px',
          marginTop: '12px',
        }
      },
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            backgroundColor: 'rgba(230,48,48,0.12)', borderRadius: '16px',
            padding: '18px 28px', border: `1px solid ${C.red}`,
          }
        },
          h('span', { style: { fontSize: '44px', fontWeight: 800, color: C.red } }, '+13%'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft } }, 'PKV 2026'),
        ),
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            backgroundColor: 'rgba(91,200,245,0.10)', borderRadius: '16px',
            padding: '18px 28px', border: `1px solid ${C.accent}`,
          }
        },
          h('span', { style: { fontSize: '44px', fontWeight: 800, color: C.accent } }, '+2%'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft } }, 'GKV 2026'),
        ),
      ),
    ),
    keyLearning('PKV-Beiträge wachsen 6x schneller als GKV — wer ist betroffen?'),
    bfLogo(),
  );

  // ─── SLIDE 3 — PROBLEM: Wer darf wechseln? ────────────────────────────────
  // Akt 1: Spannung — Eintrittsbarriere PKV visualisiert
  const slide3 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    }
  },
    badge('DAS PROBLEM'),
    headline('NUR WENIGE DÜRFEN ÜBERHAUPT WECHSELN', 54),
    subline('Die Einkommenshürde zur PKV — so hoch wie nie'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      // Funnel layers
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: C.cardBgLight, borderRadius: '18px',
          padding: '24px 36px', border: `1px solid ${C.border}`,
        }
      },
        h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Alle Arbeitnehmer in Deutschland'),
        h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.accent } }, '~45 Mio.'),
      ),
      // Arrow
      h('div', { style: { display: 'flex', justifyContent: 'center' } },
        h('div', {
          style: {
            display: 'flex', width: '0', height: '0',
            borderLeft: '18px solid transparent', borderRight: '18px solid transparent',
            borderTop: `22px solid ${C.border}`,
          }
        }),
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: 'rgba(91,200,245,0.10)', borderRadius: '18px',
          padding: '24px 36px', border: `1px solid rgba(91,200,245,0.30)`,
          marginLeft: '40px', marginRight: '40px',
        }
      },
        h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Über Einkommensgrenze 77.400 €/Jahr'),
        h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.accent } }, '~9 Mio.'),
      ),
      // Arrow
      h('div', { style: { display: 'flex', justifyContent: 'center' } },
        h('div', {
          style: {
            display: 'flex', width: '0', height: '0',
            borderLeft: '18px solid transparent', borderRight: '18px solid transparent',
            borderTop: `22px solid ${C.border}`,
          }
        }),
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: 'rgba(230,48,48,0.10)', borderRadius: '18px',
          padding: '24px 36px', border: `2px solid ${C.red}`,
          marginLeft: '80px', marginRight: '80px',
        }
      },
        h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Können PKV wählen'),
        h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.red } }, '~5 Mio.'),
      ),
      // Info card
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '16px',
          backgroundColor: 'rgba(91,200,245,0.08)', borderRadius: '14px',
          padding: '18px 24px', border: `1px solid rgba(91,200,245,0.20)`, marginTop: '12px',
        }
      },
        h('div', { style: { display: 'flex', width: '10px', minHeight: '40px', backgroundColor: C.accent, borderRadius: '5px' } }),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, 'Ausnahme: Selbständige, Freiberufler und Beamte können PKV unabhängig vom Einkommen wählen'),
      ),
    ),
    keyLearning('Einkommensgrenze 2026: 77.400 € im Jahr — 6.450 € im Monat brutto'),
    bfLogo(),
  );

  // ─── SLIDE 4 — WENDEPUNKT: GKV vs. PKV Vergleich ──────────────────────────
  // Akt 2: Auflösung — Was stimmt wirklich?
  const slide4 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    }
  },
    badge('ERWARTUNG VS. REALITÄT'),
    headline('GKV ODER PKV — WAS STIMMT WIRKLICH?', 55),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      // Contrast cards row
      h('div', { style: { display: 'flex', gap: '16px' } },
        // GKV
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '14px',
            backgroundColor: C.bgDark, borderRadius: '20px', padding: '28px',
            border: `1px solid ${C.border}`,
          }
        },
          h('span', {
            style: {
              fontSize: '22px', fontWeight: 700, letterSpacing: '2px',
              color: C.textMuted, textTransform: 'uppercase',
            }
          }, 'GKV'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.accent, borderRadius: '2px' } }),
          ...[
            ['Solidargemeinschaft', C.textSoft],
            ['Familie mitversichert (kostenlos)', C.accent],
            ['Beitrag: ~14,6 % + Zusatz', C.textSoft],
            ['Kein Gesundheitscheck', C.accent],
            ['Gleiche Leistung für alle', C.textSoft],
          ].map(([text, color]) =>
            h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '10px' } },
              h('div', { style: { display: 'flex', width: '8px', height: '8px', borderRadius: '4px', backgroundColor: color, marginTop: '9px', flexShrink: '0' } }),
              h('span', { style: { fontSize: '24px', fontWeight: 500, color: color, lineHeight: '1.4' } }, text),
            )
          ),
        ),
        // PKV
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '14px',
            backgroundColor: 'rgba(91,200,245,0.08)', borderRadius: '20px', padding: '28px',
            border: `2px solid ${C.accent}`,
          }
        },
          h('span', {
            style: {
              fontSize: '22px', fontWeight: 700, letterSpacing: '2px',
              color: C.accent, textTransform: 'uppercase',
            }
          }, 'PKV'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.accent, borderRadius: '2px' } }),
          ...[
            ['Individuelle Tarife', C.accent],
            ['Familie kostet extra', C.red],
            ['Gesundheitscheck nötig', C.red],
            ['Mehr Leistung möglich', C.accent],
            ['Beiträge steigen im Alter', C.red],
          ].map(([text, color]) =>
            h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '10px' } },
              h('div', { style: { display: 'flex', width: '8px', height: '8px', borderRadius: '4px', backgroundColor: color, marginTop: '9px', flexShrink: '0' } }),
              h('span', { style: { fontSize: '24px', fontWeight: 500, color: color, lineHeight: '1.4' } }, text),
            )
          ),
        ),
      ),
      // The myth debunked
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '14px',
          backgroundColor: 'rgba(230,48,48,0.08)', borderRadius: '14px',
          padding: '20px 24px', border: `1px solid rgba(230,48,48,0.25)`,
        }
      },
        h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.red } }, '!'),
        h('span', {
          style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' }
        }, 'PKV ist NICHT automatisch besser — es kommt auf deinen Lebensstil an'),
      ),
    ),
    keyLearning('Für Familien und Menschen mit Vorerkrankungen ist die GKV oft die klügere Wahl'),
    bfLogo(),
  );

  // ─── SLIDE 5 — BEWEIS: Für wen lohnt sich PKV? ────────────────────────────
  // Akt 2: Auflösung — konkrete Zielgruppen
  const slide5 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    }
  },
    badge('DIE FAKTEN'),
    headline('FÜR WEN LOHNT SICH DIE PKV?', 62),
    subline('Diese 4 Profile profitieren am meisten'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      // 2x2 grid
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.bgDark, borderRadius: '20px', padding: '24px', gap: '10px',
            border: `1px solid ${C.border}`,
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
              backgroundColor: 'rgba(91,200,245,0.2)', alignItems: 'center', justifyContent: 'center',
            }
          },
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.accent } }, '01'),
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.text, textTransform: 'uppercase' } }, 'Gut verdienende Singles'),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Keine Familie, hohes Einkommen — GKV-Beitrag wäre unverhältnismäßig hoch'),
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.bgDark, borderRadius: '20px', padding: '24px', gap: '10px',
            border: `1px solid ${C.border}`,
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
              backgroundColor: 'rgba(91,200,245,0.2)', alignItems: 'center', justifyContent: 'center',
            }
          },
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.accent } }, '02'),
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.text, textTransform: 'uppercase' } }, 'Beamte'),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Staat übernimmt 50-80 % — PKV fast immer günstiger als GKV'),
        ),
      ),
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.bgDark, borderRadius: '20px', padding: '24px', gap: '10px',
            border: `1px solid ${C.border}`,
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
              backgroundColor: 'rgba(91,200,245,0.2)', alignItems: 'center', justifyContent: 'center',
            }
          },
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.accent } }, '03'),
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.text, textTransform: 'uppercase' } }, 'Selbständige'),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Kein Arbeitgeberzuschuss in GKV — PKV-Tarife oft flexibler'),
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(91,200,245,0.10)', borderRadius: '20px', padding: '24px', gap: '10px',
            border: `2px solid ${C.accent}`,
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
              backgroundColor: 'rgba(91,200,245,0.2)', alignItems: 'center', justifyContent: 'center',
            }
          },
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.accent } }, '04'),
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.text, textTransform: 'uppercase' } }, 'Gesunde Junge unter 35'),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.accent, lineHeight: '1.4' } }, 'Günstige Einstiegsbeiträge, wenn jung und gesund versichert'),
        ),
      ),
    ),
    keyLearning('Familien, ältere Arbeitnehmer und Vorerkrankte sind in der GKV oft besser aufgehoben'),
    bfLogo(),
  );

  // ─── SLIDE 6 — PRINZIP: So vergleichst du richtig ─────────────────────────
  // Akt 2: Auflösung — der Rechenweg
  const slide6 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    }
  },
    badge('DER RECHENWEG'),
    headline('SO VERGLEICHST DU GKV UND PKV RICHTIG', 53),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      // Step 1
      h('div', { style: { display: 'flex', alignItems: 'center', gap: '20px' } },
        h('span', { style: { fontSize: '52px', fontWeight: 800, color: C.white, minWidth: '60px', lineHeight: '1' } }, '1.'),
        h('div', {
          style: {
            display: 'flex', flex: '1', alignItems: 'center',
            backgroundColor: C.white, borderRadius: '4px', padding: '14px 24px',
          }
        },
          h('span', {
            style: {
              fontSize: '28px', fontWeight: 800, color: '#1B2D87',
              textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.1',
            }
          }, 'GKV-Beitrag berechnen: Brutto x 14,6 % / 2'),
        ),
      ),
      // Step 2
      h('div', { style: { display: 'flex', alignItems: 'center', gap: '20px' } },
        h('span', { style: { fontSize: '52px', fontWeight: 800, color: C.white, minWidth: '60px', lineHeight: '1' } }, '2.'),
        h('div', {
          style: {
            display: 'flex', flex: '1', alignItems: 'center',
            backgroundColor: C.white, borderRadius: '4px', padding: '14px 24px',
          }
        },
          h('span', {
            style: {
              fontSize: '28px', fontWeight: 800, color: '#1B2D87',
              textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.1',
            }
          }, 'PKV-Angebot einholen: Vergleich min. 3 Tarife'),
        ),
      ),
      // Step 3
      h('div', { style: { display: 'flex', alignItems: 'center', gap: '20px' } },
        h('span', { style: { fontSize: '52px', fontWeight: 800, color: C.white, minWidth: '60px', lineHeight: '1' } }, '3.'),
        h('div', {
          style: {
            display: 'flex', flex: '1', alignItems: 'center',
            backgroundColor: C.white, borderRadius: '4px', padding: '14px 24px',
          }
        },
          h('span', {
            style: {
              fontSize: '28px', fontWeight: 800, color: '#1B2D87',
              textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.1',
            }
          }, 'Familiensituation + Altersvorsorge einkalkulieren'),
        ),
      ),
      // Step 4
      h('div', { style: { display: 'flex', alignItems: 'center', gap: '20px' } },
        h('span', { style: { fontSize: '52px', fontWeight: 800, color: C.white, minWidth: '60px', lineHeight: '1' } }, '4.'),
        h('div', {
          style: {
            display: 'flex', flex: '1', alignItems: 'center',
            backgroundColor: C.accent, borderRadius: '4px', padding: '14px 24px',
          }
        },
          h('span', {
            style: {
              fontSize: '28px', fontWeight: 800, color: '#1B2D87',
              textTransform: 'uppercase', letterSpacing: '1px', lineHeight: '1.1',
            }
          }, 'Unabhängige Beratung — kein Vertreter, kein Vergleichsportal'),
        ),
      ),
      // Highlight box
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '16px',
          backgroundColor: 'rgba(91,200,245,0.10)', borderRadius: '14px',
          padding: '18px 24px', border: `1px solid rgba(91,200,245,0.25)`, marginTop: '12px',
        }
      },
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, 'Faustregel: Erst ab 45+ wird die PKV für die meisten teurer als die GKV'),
      ),
    ),
    keyLearning('Wer jung und gesund wechselt, zahlt deutlich weniger — aber planen ist Pflicht'),
    bfLogo(),
  );

  // ─── SLIDE 7 — LEARNINGS ──────────────────────────────────────────────────
  // Akt 3: Abschluss — Takeaways mit Fortschrittsbalken
  const learnings = [
    { num: '01', text: 'PKV-Beiträge steigen 2026 um 13 % — jetzt Optionen prüfen', pct: 25 },
    { num: '02', text: 'Einkommensgrenze PKV: 77.400 € brutto im Jahr', pct: 50 },
    { num: '03', text: 'Für Familien meist GKV, für Singles/Beamte PKV erwägen', pct: 75 },
    { num: '04', text: 'Immer unabhängige Beratung — die Wahl ist langfristig', pct: 100 },
  ];

  const slide7 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    }
  },
    badge('DEINE TAKEAWAYS'),
    headline('DAS NIMMST DU MIT', 66),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px', padding: '24px 28px',
            backgroundColor: C.bgDark, borderRadius: '18px',
            border: l.pct === 100 ? `2px solid ${C.accent}` : `1px solid ${C.border}`,
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', {
              style: {
                fontSize: '38px', fontWeight: 800,
                color: l.pct === 100 ? C.accent : C.white, minWidth: '56px',
              }
            }, l.num),
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3' } }, l.text),
          ),
          h('div', {
            style: {
              display: 'flex', height: '6px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden',
            }
          },
            h('div', {
              style: {
                display: 'flex', width: `${l.pct}%`, height: '6px',
                backgroundColor: l.pct === 100 ? C.accent : C.red, borderRadius: '3px',
              }
            }),
          ),
        )
      ),
    ),
    keyLearning('Benaro Finanzen hilft dir, die richtige Versicherungsentscheidung zu treffen'),
    bfLogo(),
  );

  // ─── SLIDE 8 — CTA ────────────────────────────────────────────────────────
  // Akt 3: Abschluss — Call to Action
  const slide8 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    }
  },
    badge('BENARO FINANZEN'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '32px' } },
      h('span', {
        style: {
          fontSize: '64px', fontWeight: 800, color: C.text, textAlign: 'center',
          lineHeight: '1.1', textTransform: 'uppercase', maxWidth: '880px',
        }
      }, 'PKV ODER GKV — WAS PASST ZU DIR?'),
      h('div', { style: { display: 'flex', width: '80px', height: '5px', backgroundColor: C.red, borderRadius: '3px' } }),
      h('span', {
        style: {
          fontSize: '30px', fontWeight: 500, color: C.textSoft, textAlign: 'center',
          lineHeight: '1.6', maxWidth: '820px',
        }
      }, 'Wir beraten dich kostenlos und unabhängig — damit du die Wahl triffst, die wirklich zu deinem Leben passt.'),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
          backgroundColor: 'rgba(91,200,245,0.10)', borderRadius: '20px',
          padding: '28px 48px', border: `1px solid rgba(91,200,245,0.25)`,
        }
      },
        h('span', {
          style: {
            fontSize: '32px', fontWeight: 700, color: C.accent, textAlign: 'center', lineHeight: '1.5',
          }
        }, 'Folge uns für mehr Finanzwissen und speichere diesen Post'),
        h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted } }, '@benarofinanzen'),
      ),
    ),
    bfLogo(),
  );

  // ─── RENDER ALL SLIDES ────────────────────────────────────────────────────
  const today = new Date().toISOString().slice(0, 10);
  const outDir = `${__dirname}/output/carousel_${today}/slides`;

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = `${outDir}/slide-${String(i + 1).padStart(2, '0')}.png`;
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} done: ${pngPath}`);
  }
  console.log('Alle Slides generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
