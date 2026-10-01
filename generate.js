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
    green: '#10B981',
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
        }
      }, text)
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
      style: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '6px', marginTop: '20px',
      }
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

  // ─── SLIDE 1: Hook ────────────────────────────────────────────────────────
  const slide1 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    }
  },
    badge('ACHTUNG: STEUERFALLE'),
    headline('DU ZAHLST STEUERN, DIE DU NICHT MÜSSTEST', 62),
    subline('Millionen Deutsche verschenken jedes Jahr Geld ans Finanzamt — völlig unnötig.'),

    // Visual: big stat + warning graphic
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '28px',
      }
    },
      // Red warning circle with amount
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: '4px',
          border: `6px solid ${C.red}`, borderRadius: '50%',
          width: '320px', height: '320px',
        }
      },
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '2px' } }, 'bis zu'),
        h('span', { style: { fontSize: '100px', fontWeight: 800, color: C.red, lineHeight: '1' } }, '263€'),
        h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textSoft, textAlign: 'center', lineHeight: '1.3' } }, 'pro Jahr verschenkt'),
      ),
      // Three downward red arrows
      h('div', { style: { display: 'flex', gap: '16px', marginTop: '8px' } },
        ...[0, 1, 2].map(() =>
          h('div', {
            style: {
              display: 'flex', width: '0', height: '0',
              borderLeft: '16px solid transparent', borderRight: '16px solid transparent',
              borderTop: `22px solid ${C.red}`,
            }
          })
        )
      ),
      h('span', {
        style: {
          fontSize: '30px', fontWeight: 700, color: C.accent,
          textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px',
        }
      }, 'Der Freistellungsauftrag fehlt'),
    ),

    keyLearning('1.000 € Kapitalerträge sind steuerfrei — wenn du den Antrag stellst.'),
    bfLogo(),
  );

  // ─── SLIDE 2: Problem — Was passiert ohne Freistellungsauftrag? ───────────
  const barSvg = `<svg width="880" height="320" viewBox="0 0 880 320" xmlns="http://www.w3.org/2000/svg">
    <rect x="60" y="20" width="300" height="260" fill="#E63030" rx="8"/>
    <rect x="520" y="128" width="300" height="152" fill="#10B981" rx="8"/>
    <line x1="40" y1="280" x2="860" y2="280" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  </svg>`;
  const barSrc = `data:image/svg+xml;base64,${Buffer.from(barSvg).toString('base64')}`;

  const slide2 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    }
  },
    badge('DAS PROBLEM'),
    headline('OHNE ANTRAG: 26,375 % WEG', 60),
    subline('Die Bank zieht automatisch Abgeltungsteuer von jedem Euro Zins und Dividende ab.'),

    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '16px',
      }
    },
      // Bar chart area
      h('div', { style: { display: 'flex', position: 'relative', alignItems: 'flex-end', justifyContent: 'center', gap: '80px', paddingBottom: '16px' } },
        // Left bar: Ohne FSA
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' } },
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' } },
            h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.red } }, '263,75 €'),
            h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted } }, 'verloren'),
          ),
          h('div', { style: { display: 'flex', width: '220px', height: '240px', backgroundColor: C.red, borderRadius: '12px 12px 4px 4px' } }),
          h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.textSoft, textAlign: 'center', marginTop: '8px' } }, 'OHNE\nFreistellungsauftrag'),
        ),
        // Right bar: Mit FSA
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' } },
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' } },
            h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.green } }, '1.000 €'),
            h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.green } }, 'behalten'),
          ),
          h('div', { style: { display: 'flex', width: '220px', height: '140px', backgroundColor: C.green, borderRadius: '12px 12px 4px 4px' } }),
          h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.textSoft, textAlign: 'center', marginTop: '8px' } }, 'MIT\nFreistellungsauftrag'),
        ),
      ),
      // Beispiel Info
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '14px',
          backgroundColor: C.cardBg, borderRadius: '16px', padding: '20px 28px', marginTop: '12px',
          border: `1px solid ${C.border}`,
        }
      },
        h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft } }, 'Beispiel: 1.000 € Kapitalerträge → ohne Antrag bleiben dir nur 736,25 €'),
      ),
    ),

    keyLearning('Ohne Freistellungsauftrag verlierst du 26,375 % an die Bank — jedes Jahr.'),
    bfLogo(),
  );

  // ─── SLIDE 3: Konsequenz — Tagesgeld-Beispiel ─────────────────────────────
  const slide3 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    }
  },
    badge('DEIN VERLUST IN EURO'),
    headline('SO TEUER IST DER FEHLER', 64),
    subline('Tagesgeld bei 4,25 % p.a. — was du verlierst, wenn kein Freistellungsauftrag gestellt ist.'),

    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '20px',
      }
    },
      // Three scenario cards
      ...[
        { amount: '5.000 €', zinsen: '212,50 €', verlust: '56,05 €', label: 'Kleines Tagesgeld' },
        { amount: '10.000 €', zinsen: '425,00 €', verlust: '112,09 €', label: 'Mittleres Tagesgeld', highlight: true },
        { amount: '25.000 €', zinsen: '1.062,50 €', verlust: '263,75 €', label: 'Größeres Tagesgeld' },
      ].map(s =>
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: '20px',
            backgroundColor: s.highlight ? 'rgba(230,48,48,0.15)' : C.bgDark,
            borderRadius: '18px', padding: '24px 28px',
            border: s.highlight ? `2px solid ${C.red}` : `1px solid ${C.border}`,
          }
        },
          h('div', { style: { display: 'flex', flexDirection: 'column', flex: '1', gap: '6px' } },
            h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '2px' } }, s.label),
            h('span', { style: { fontSize: '34px', fontWeight: 800, color: C.text } }, s.amount),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft } }, `Zinsen: ${s.zinsen} p.a.`),
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' } },
            h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted } }, 'Verlust'),
            h('span', { style: { fontSize: '44px', fontWeight: 800, color: C.red } }, s.verlust),
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'pro Jahr'),
          ),
        )
      ),
    ),

    keyLearning('Jedes Jahr ohne Antrag = Geld geschenkt ans Finanzamt — völlig vermeidbar.'),
    bfLogo(),
  );

  // ─── SLIDE 4: Erwartung vs. Realität ─────────────────────────────────────
  const slide4 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    }
  },
    badge('DAS MISSVERSTÄNDNIS'),
    headline('WAS DIE MEISTEN DENKEN', 62),
    subline('Und warum sie damit falsch liegen.'),

    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '20px',
      }
    },
      // Two contrast cards
      h('div', { style: { display: 'flex', gap: '20px' } },
        // Expectation
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.bgDark, borderRadius: '20px',
            padding: '32px 28px', gap: '16px',
            border: `1px solid ${C.border}`,
          }
        },
          h('span', {
            style: {
              fontSize: '20px', fontWeight: 700, letterSpacing: '2px',
              color: C.textMuted, textTransform: 'uppercase',
            }
          }, 'ERWARTUNG'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.5' } },
            '"Das macht die Bank doch automatisch für mich."'),
          h('div', {
            style: {
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginTop: '8px', padding: '12px',
              backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px',
            }
          },
            h('span', { style: { fontSize: '48px' } }, '🤷'),
          ),
        ),
        // Reality
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(91,200,245,0.10)', borderRadius: '20px',
            padding: '32px 28px', gap: '16px',
            border: `2px solid ${C.accent}`,
          }
        },
          h('span', {
            style: {
              fontSize: '20px', fontWeight: 700, letterSpacing: '2px',
              color: C.accent, textTransform: 'uppercase',
            }
          }, 'REALITÄT'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.accent, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: '#FFFFFF', lineHeight: '1.5' } },
            'Die Bank wartet auf DEINEN schriftlichen Antrag. Ohne ihn: Steuerabzug sofort.'),
          h('div', {
            style: {
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginTop: '8px', padding: '12px',
              backgroundColor: 'rgba(230,48,48,0.12)', borderRadius: '12px',
            }
          },
            h('span', { style: { fontSize: '48px' } }, '📋'),
          ),
        ),
      ),
      // Warning tag
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '18px 24px',
          backgroundColor: 'rgba(230,48,48,0.10)', borderRadius: '14px',
          border: `1px solid ${C.red}`,
        }
      },
        h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.red } }),
        h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.red } },
          'Du musst aktiv werden — der Staat hilft dir nicht automatisch.'),
      ),
    ),

    keyLearning('Kein Freistellungsauftrag = kein Steuervorteil. Es ist deine Pflicht, ihn zu stellen.'),
    bfLogo(),
  );

  // ─── SLIDE 5: Lösung — 3 Schritte ────────────────────────────────────────
  const slide5 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    }
  },
    badge('DIE LÖSUNG'),
    headline('IN 3 MINUTEN ERLEDIGT', 66),
    subline('So stellst du deinen Freistellungsauftrag — heute noch.'),

    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '22px',
      }
    },
      // Step cards
      ...[
        {
          num: '01',
          title: 'ONLINE-BANKING ÖFFNEN',
          desc: 'Geh in dein Online-Banking oder die App deiner Bank. Suche nach "Freistellungsauftrag" im Menü.',
          icon: '💻',
        },
        {
          num: '02',
          title: 'BETRAG EINGEBEN',
          desc: 'Trage den gewünschten Betrag ein — maximal 1.000 € als Single, 2.000 € als Ehepaar.',
          icon: '✏️',
        },
        {
          num: '03',
          title: 'ABSENDEN & FERTIG',
          desc: 'Einmalig einrichten, gilt für das gesamte Jahr. Jährlich prüfen und ggf. anpassen.',
          icon: '✅',
        },
      ].map((step, i) =>
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: '24px',
            backgroundColor: C.bgDark, borderRadius: '18px',
            padding: '24px 28px',
            border: `1px solid ${C.border}`,
          }
        },
          // Number circle
          h('div', {
            style: {
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              minWidth: '64px', height: '64px', borderRadius: '50%',
              backgroundColor: 'rgba(91,200,245,0.15)',
              border: `2px solid ${C.accent}`,
            }
          },
            h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.accent } }, step.num),
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', flex: '1', gap: '6px' } },
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.text, textTransform: 'uppercase' } }, step.title),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, step.desc),
          ),
        )
      ),
    ),

    keyLearning('3 Minuten Aufwand — bis zu 263 € gespart. Lohnt sich.'),
    bfLogo(),
  );

  // ─── SLIDE 6: Aufteilung auf mehrere Banken ───────────────────────────────
  const slide6 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    }
  },
    badge('PROFI-TIPP'),
    headline('SO TEILST DU DIE 1.000 € AUF', 58),
    subline('Bei mehreren Banken musst du die Summe aufteilen — die Gesamtsumme darf 1.000 € nicht überschreiten.'),

    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '18px',
      }
    },
      // Bank distribution cards
      ...[
        { bank: 'Tagesgeldkonto', betrag: '500 €', pct: 50, color: C.accent },
        { bank: 'Broker / ETF-Depot', betrag: '400 €', pct: 40, color: C.green },
        { bank: 'Sparkasse / Volksbank', betrag: '100 €', pct: 10, color: 'rgba(255,255,255,0.5)' },
      ].map(b =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px',
            backgroundColor: C.bgDark, borderRadius: '18px', padding: '24px 28px',
            border: `1px solid ${C.border}`,
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
            h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, b.bank),
            h('span', { style: { fontSize: '32px', fontWeight: 800, color: b.color } }, b.betrag),
          ),
          h('div', { style: { display: 'flex', height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${b.pct}%`, height: '8px', backgroundColor: b.color, borderRadius: '4px' } }),
          ),
        )
      ),
      // Ehepaar bonus info
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '16px',
          backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '16px',
          padding: '20px 24px', border: `1px solid ${C.green}`,
          marginTop: '8px',
        }
      },
        h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '6px', backgroundColor: C.green } }),
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.green, lineHeight: '1.4' } },
          'Ehepaare: 2.000 € gesamt — je 1.000 € pro Person auf gemeinsamen Antrag.'),
      ),
    ),

    keyLearning('Gesamtsumme aller Anträge darf 1.000 € nicht überschreiten — sonst droht Nachzahlung.'),
    bfLogo(),
  );

  // ─── SLIDE 7: 4 Takeaways ─────────────────────────────────────────────────
  const slide7 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    }
  },
    badge('DEINE TAKEAWAYS'),
    headline('4 DINGE, DIE DU JETZT TUN MUSST', 54),

    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '18px',
      }
    },
      ...[
        { num: '01', text: 'Freistellungsauftrag bei JEDER Bank prüfen', pct: 25 },
        { num: '02', text: 'Beträge richtig aufteilen — Summe max. 1.000 €', pct: 50 },
        { num: '03', text: 'Ehepaare: gemeinsamen Antrag auf 2.000 € stellen', pct: 75 },
        { num: '04', text: 'Jährlich aktualisieren — besonders nach Depotwechsel', pct: 100 },
      ].map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px',
            padding: '22px 26px',
            backgroundColor: l.pct === 100 ? 'rgba(91,200,245,0.12)' : C.bgDark,
            borderRadius: '18px',
            border: l.pct === 100 ? `2px solid ${C.accent}` : `1px solid ${C.border}`,
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', {
              style: {
                fontSize: '36px', fontWeight: 800,
                color: l.pct === 100 ? C.accent : C.white, minWidth: '56px',
              }
            }, l.num),
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3' } }, l.text),
          ),
          h('div', { style: { display: 'flex', height: '5px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', {
              style: {
                display: 'flex', width: `${l.pct}%`, height: '5px',
                backgroundColor: l.pct === 100 ? C.accent : C.red,
                borderRadius: '3px',
              }
            }),
          ),
        )
      ),
    ),

    keyLearning('1.000 € steuerfrei — jedes Jahr. Es reicht ein Antrag von 3 Minuten.'),
    bfLogo(),
  );

  // ─── SLIDE 8: CTA ─────────────────────────────────────────────────────────
  const slide8 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    }
  },
    badge('BENARO FINANZEN'),

    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '32px',
      }
    },
      // Red divider
      h('div', { style: { display: 'flex', width: '80px', height: '5px', backgroundColor: C.red, borderRadius: '3px' } }),

      // Main CTA text
      h('span', {
        style: {
          fontSize: '54px', fontWeight: 800, color: '#FFFFFF',
          textAlign: 'center', lineHeight: '1.2', textTransform: 'uppercase',
          maxWidth: '860px',
        }
      }, 'HAT DIR DIESES CAROUSEL GESPART?'),

      h('span', {
        style: {
          fontSize: '30px', fontWeight: 500, color: C.textSoft,
          textAlign: 'center', lineHeight: '1.5', maxWidth: '800px',
        }
      }, 'Dann speichere diesen Post, damit du ihn vor dem 31. Dezember nicht vergisst.'),

      // Red divider
      h('div', { style: { display: 'flex', width: '80px', height: '5px', backgroundColor: C.red, borderRadius: '3px' } }),

      // Engagement invitation
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
          backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px 40px',
          border: `1px solid ${C.border}`,
        }
      },
        h('span', {
          style: {
            fontSize: '26px', fontWeight: 600, color: C.accent,
            textAlign: 'center', lineHeight: '1.4',
          }
        }, 'Hast du deinen Freistellungsauftrag schon eingerichtet?'),
        h('span', {
          style: {
            fontSize: '22px', fontWeight: 500, color: C.textMuted,
            textAlign: 'center',
          }
        }, 'Schreib "JA" oder "NEIN" in die Kommentare'),
      ),

      bfLogo(),

      h('span', { style: { fontSize: '24px', fontWeight: 500, color: 'rgba(255,255,255,0.40)' } }, '@benarofinanzen'),
    ),
  );

  // ─── Generate all slides ──────────────────────────────────────────────────
  const TODAY = new Date().toISOString().slice(0, 10);
  const outDir = path.join(__dirname, 'output', `carousel_${TODAY}`, 'slides');

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} fertig: ${path.basename(pngPath)}`);
  }

  console.log('\nAlle Slides erfolgreich generiert!');
}

main().catch(e => {
  console.error('Fehler:', e);
  process.exit(1);
});
