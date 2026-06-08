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
    bgDark: '#001542',
  };

  const W = 1080, H = 1350;

  const logoB64 = 'data:image/jpeg;base64,' +
    fs.readFileSync(path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')).toString('base64');

  const outDir = path.join(__dirname, 'output/carousel_2026-06-08/slides');
  fs.mkdirSync(outDir, { recursive: true });

  const h = (type, props, ...ch) => ({
    type,
    props: {
      ...props,
      children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch,
    },
  });

  // ── REUSABLE COMPONENTS ─────────────────────────────────────────────────────

  function slideRoot(bgColor, ...children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column',
        width: W, height: H, padding: '70px',
        backgroundColor: bgColor, fontFamily: 'Outfit',
      },
    }, ...children);
  }

  function topRow(badgeText, accentBg) {
    return h('div', {
      style: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '20px',
      },
    },
      h('span', {
        style: {
          fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: accentBg || C.cardBg,
          padding: '10px 22px', borderRadius: '12px',
        },
      }, badgeText),
      h('img', {
        src: logoB64,
        width: 100, height: 100,
        style: { borderRadius: '12px', objectFit: 'cover' },
      })
    );
  }

  function topRowNoLogo(badgeText, accentBg) {
    return h('div', {
      style: { display: 'flex', marginBottom: '20px' },
    },
      h('span', {
        style: {
          fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: accentBg || C.cardBg,
          padding: '10px 22px', borderRadius: '12px',
        },
      }, badgeText)
    );
  }

  function headline(text, size) {
    return h('span', {
      style: {
        fontSize: `${size || 64}px`, fontWeight: 800,
        color: C.text, lineHeight: '1.08',
        letterSpacing: '-1.5px', marginBottom: '6px',
      },
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500,
        color: C.textMuted, lineHeight: '1.5', marginTop: '8px',
      },
    }, text);
  }

  function keyLearning(text, accentColor) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px',
        padding: '22px 28px', marginTop: 'auto',
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
          fontSize: '26px', fontWeight: 600,
          color: C.text, lineHeight: '1.4',
        },
      }, text)
    );
  }

  function igHandle() {
    return h('div', { style: { display: 'flex', alignItems: 'center', marginTop: '12px' } },
      h('span', {
        style: { fontSize: '22px', fontWeight: 500, color: C.textMuted },
      }, '@benarofinanzen')
    );
  }

  function visualBlock(...children) {
    return h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '14px',
      },
    }, ...children);
  }

  // ── SLIDE 1: HOOK — Stat Hero 67% ───────────────────────────────────────────
  const slide1 = slideRoot(C.bg,
    topRow('SCHOCKIERENDES ERGEBNIS'),
    h('span', {
      style: {
        fontSize: '148px', fontWeight: 800, color: C.red,
        lineHeight: '1.0', letterSpacing: '-4px',
      },
    }, '67%'),
    h('span', {
      style: {
        fontSize: '36px', fontWeight: 700, color: C.textSoft,
        lineHeight: '1.25', marginBottom: '4px',
      },
    }, 'der Deutschen können eine unerwartete Rechnung von 1.000 € nicht bezahlen.'),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
        // Bar: nicht vorbereitet
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textMuted } }, 'Nicht finanziell abgesichert'),
            h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.red } }, '67%')
          ),
          h('div', { style: { display: 'flex', height: '18px', backgroundColor: C.border, borderRadius: '9px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: '67%', height: '18px', backgroundColor: C.red, borderRadius: '9px' } })
          )
        ),
        // Bar: abgesichert
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textMuted } }, 'Mit Notgroschen abgesichert'),
            h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.green } }, '33%')
          ),
          h('div', { style: { display: 'flex', height: '18px', backgroundColor: C.border, borderRadius: '9px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: '33%', height: '18px', backgroundColor: C.green, borderRadius: '9px' } })
          )
        ),
        // Warning-Tag
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '18px 24px',
            backgroundColor: 'rgba(239,68,68,0.12)',
            borderRadius: '14px',
            border: '1px solid rgba(239,68,68,0.25)',
          },
        },
          h('div', { style: { display: 'flex', width: '12px', height: '12px', minWidth: '12px', borderRadius: '6px', backgroundColor: C.red } }),
          h('span', { style: { fontSize: '25px', fontWeight: 600, color: C.red, lineHeight: '1.4' } },
            'Kein Notgroschen = 1 Notfall kann alles zerstören')
        )
      )
    ),
    keyLearning('Der Notgroschen ist das Fundament jeder finanziellen Sicherheit.'),
    igHandle()
  );

  // ── SLIDE 2: Wofür brauchst du ihn? (2×2 Icon Grid) ────────────────────────
  const slide2 = slideRoot(C.bgDark,
    topRow('DER NOTGROSCHEN'),
    headline('Wann brauchst\ndu ihn?', 58),
    subline('4 Situationen, für die niemand plant'),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px' } },
        h('div', { style: { display: 'flex', gap: '14px' } },
          ...[
            { icon: 'JOB', label: 'Jobverlust', desc: 'Bis zu 6 Monate ohne volles Einkommen' },
            { icon: 'ARZ', label: 'Gesundheit', desc: 'Zahnarzt, Zuzahlungen, krankheitsbedingter Ausfall' },
          ].map(card =>
            h('div', {
              style: {
                display: 'flex', flex: '1', flexDirection: 'column',
                backgroundColor: C.cardBg, borderRadius: '20px',
                padding: '28px', gap: '12px',
              },
            },
              h('div', {
                style: {
                  display: 'flex', width: '52px', height: '52px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(239,68,68,0.18)',
                  alignItems: 'center', justifyContent: 'center',
                },
              },
                h('span', { style: { fontSize: '20px', fontWeight: 800, color: C.red } }, card.icon)
              ),
              h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, card.label),
              h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, card.desc)
            )
          )
        ),
        h('div', { style: { display: 'flex', gap: '14px' } },
          ...[
            { icon: 'REP', label: 'Reparaturen', desc: 'Auto, Wohnung, defekte Haushaltsgeräte' },
            { icon: 'MIE', label: 'Wohnkosten', desc: 'Mieterhöhung, Kaution, unerwarteter Umzug' },
          ].map(card =>
            h('div', {
              style: {
                display: 'flex', flex: '1', flexDirection: 'column',
                backgroundColor: C.cardBg, borderRadius: '20px',
                padding: '28px', gap: '12px',
              },
            },
              h('div', {
                style: {
                  display: 'flex', width: '52px', height: '52px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(239,68,68,0.18)',
                  alignItems: 'center', justifyContent: 'center',
                },
              },
                h('span', { style: { fontSize: '20px', fontWeight: 800, color: C.red } }, card.icon)
              ),
              h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, card.label),
              h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, card.desc)
            )
          )
        )
      )
    ),
    keyLearning('Jeder braucht einen Puffer — nicht nur in Krisenzeiten.'),
    igHandle()
  );

  // ── SLIDE 3: Der Teufelskreis (Flow Diagram) ─────────────────────────────────
  const slide3 = slideRoot(C.bg,
    topRow('DAS PROBLEM'),
    headline('Der Teufelskreis', 62),
    subline('Was ohne Notgroschen passiert'),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'stretch' } },
        ...[
          { num: '1', label: 'Notfall tritt ein', sub: 'Auto kaputt, Zahnarzt, Jobverlust', isRed: true },
          { num: '2', label: 'Kreditkarte oder Dispo', sub: '15–20 % Zinsen beginnen sofort zu laufen', isRed: false },
          { num: '3', label: 'Geld fehlt jeden Monat', sub: 'Ratenzahlungen erhöhen den finanziellen Druck', isRed: false },
          { num: '4', label: 'Nächster Notfall kommt...', sub: 'Und der Kreislauf beginnt von vorn', isRed: true },
        ].map((step, i, arr) =>
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '0px' } },
            h('div', {
              style: {
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '20px 24px',
                backgroundColor: step.isRed ? 'rgba(239,68,68,0.12)' : C.cardBg,
                borderRadius: '16px',
                border: step.isRed ? '1px solid rgba(239,68,68,0.3)' : '1px solid transparent',
              },
            },
              h('span', {
                style: {
                  fontSize: '34px', fontWeight: 800,
                  color: step.isRed ? C.red : C.textMuted,
                  minWidth: '40px',
                },
              }, step.num),
              h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
                h('span', {
                  style: { fontSize: '27px', fontWeight: 700, color: step.isRed ? C.red : C.text },
                }, step.label),
                h('span', {
                  style: { fontSize: '21px', fontWeight: 500, color: C.textMuted },
                }, step.sub)
              )
            ),
            i < arr.length - 1
              ? h('div', { style: { display: 'flex', justifyContent: 'flex-start', paddingLeft: '36px', paddingTop: '4px', paddingBottom: '4px' } },
                  h('div', { style: { display: 'flex', width: '3px', height: '22px', backgroundColor: C.border, borderRadius: '2px' } })
                )
              : undefined
          )
        )
      )
    ),
    keyLearning('Schulden durch Notfälle sind vollständig vermeidbar.', C.red),
    igHandle()
  );

  // ── SLIDE 4: Erwartung vs. Realität (Wendepunkt) ─────────────────────────────
  const slide4 = slideRoot(C.bgDark,
    topRow('DER WENDEPUNKT'),
    headline('Was die meisten\nfalsch machen', 54),
    subline('Erwartung vs. Realität'),
    visualBlock(
      h('div', { style: { display: 'flex', gap: '14px', alignItems: 'stretch' } },
        // Erwartung
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '20px',
            padding: '28px', gap: '14px',
          },
        },
          h('span', {
            style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2.5px', color: C.textMuted },
          }, 'ERWARTUNG'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', {
            style: { fontSize: '27px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' },
          }, '"Ich spare, wenn am Monatsende noch etwas übrig ist."'),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' } },
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Ausgaben zuerst'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Sparen = Restbetrag'),
            h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.red, lineHeight: '1.4' } }, 'Ergebnis: meist 0 €')
          )
        ),
        // Realität
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '20px',
            padding: '28px', gap: '14px',
            border: '2px solid rgba(16,185,129,0.35)',
          },
        },
          h('span', {
            style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2.5px', color: C.green },
          }, 'REALITÄT'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(16,185,129,0.35)', borderRadius: '2px' } }),
          h('span', {
            style: { fontSize: '27px', fontWeight: 600, color: C.text, lineHeight: '1.4' },
          }, '"Pay yourself first: Sparen am 1. des Monats, bevor andere Ausgaben kommen."'),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' } },
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Dauerauftrag am Monatsanfang'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Dann Ausgaben planen'),
            h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.green, lineHeight: '1.4' } }, 'Ergebnis: Wachstum')
          )
        )
      )
    ),
    keyLearning('Automatisiere den Sparvorgang — mach es dir unmöglich, ihn zu vergessen.'),
    igHandle()
  );

  // ── SLIDE 5: Die 3-6 Monatsregel (konkrete Zahlen) ───────────────────────────
  const slide5 = slideRoot(C.bg,
    topRow('DIE FAUSTREGEL'),
    headline('So viel solltest\ndu sparen', 58),
    subline('Die 3–6 Monatsgehalt-Regel'),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
        h('div', { style: { display: 'flex', gap: '14px' } },
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column',
              backgroundColor: C.cardBg, borderRadius: '18px',
              padding: '24px', gap: '10px',
            },
          },
            h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'MINIMUM'),
            h('span', { style: { fontSize: '50px', fontWeight: 800, color: C.text, lineHeight: '1.0' } }, '3 Mo.'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Absolutes Minimum')
          ),
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column',
              backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '18px',
              padding: '24px', gap: '10px',
              border: '2px solid rgba(16,185,129,0.35)',
            },
          },
            h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'IDEAL'),
            h('span', { style: { fontSize: '50px', fontWeight: 800, color: C.green, lineHeight: '1.0' } }, '6 Mo.'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Empfehlung')
          )
        ),
        // Beispieltabelle
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', paddingLeft: '8px', paddingRight: '8px' } },
            h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'NETTOEINKOMMEN'),
            h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, '3 MO.'),
            h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, '6 MO.')
          ),
          ...[
            { netto: '1.500 € / Mo.', min: '4.500 €', ideal: '9.000 €' },
            { netto: '2.000 € / Mo.', min: '6.000 €', ideal: '12.000 €' },
            { netto: '2.500 € / Mo.', min: '7.500 €', ideal: '15.000 €' },
          ].map(ex =>
            h('div', {
              style: {
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '16px 22px', backgroundColor: C.cardBg,
                borderRadius: '14px',
              },
            },
              h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, flex: '1' } }, ex.netto),
              h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, minWidth: '90px', textAlign: 'right' } }, ex.min),
              h('span', { style: { fontSize: '23px', fontWeight: 700, color: C.green, minWidth: '100px', textAlign: 'right' } }, ex.ideal)
            )
          )
        )
      )
    ),
    keyLearning('Kenne dein Ziel: mindestens 3× dein Nettoeinkommen als Startpunkt.'),
    igHandle()
  );

  // ── SLIDE 6: Der 12-Monats-Aufbauplan (Timeline + Progress) ─────────────────
  const slide6 = slideRoot(C.bgDark,
    topRow('DER AUFBAUPLAN'),
    headline('In 12 Monaten\nzum Notgroschen', 54),
    subline('Beispiel: 150 € / Monat beiseitelegen'),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px' } },
        ...[
          { quarter: 'Monat 1–3', amount: '450 €', pct: 25, note: 'Erste 450 Euro gespart', done: false },
          { quarter: 'Monat 4–6', amount: '900 €', pct: 50, note: 'Halbes Ziel erreicht', done: false },
          { quarter: 'Monat 7–9', amount: '1.350 €', pct: 75, note: 'Auf der Zielgeraden', done: false },
          { quarter: 'Monat 10–12', amount: '1.800 €', pct: 100, note: 'Notgroschen vollständig aufgebaut', done: true },
        ].map(step =>
          h('div', {
            style: {
              display: 'flex', flexDirection: 'column', gap: '10px',
              padding: '20px 24px', backgroundColor: C.cardBg, borderRadius: '16px',
            },
          },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.textSoft } }, step.quarter),
              h('span', {
                style: {
                  fontSize: '26px', fontWeight: 800,
                  color: step.done ? C.green : C.text,
                },
              }, step.amount)
            ),
            h('div', {
              style: {
                display: 'flex', height: '8px', backgroundColor: C.border,
                borderRadius: '4px', overflow: 'hidden',
              },
            },
              h('div', {
                style: {
                  display: 'flex', width: `${step.pct}%`, height: '8px',
                  backgroundColor: step.done ? C.green : C.text,
                  borderRadius: '4px',
                },
              })
            ),
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, step.note)
          )
        )
      )
    ),
    keyLearning('Auch 50 € / Monat reichen — starte jetzt, nicht später.'),
    igHandle()
  );

  // ── SLIDE 7: Die 4 Regeln (Numbered Cards + Progress Bars) ──────────────────
  const slide7 = slideRoot(C.bg,
    topRow('DEINE 4 REGELN'),
    headline('So baust du\nihn richtig auf', 56),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px' } },
        ...[
          { num: '01', text: 'Eigenes Konto nur für den Notgroschen anlegen', pct: 25, color: C.text },
          { num: '02', text: 'Dauerauftrag am 1. des Monats einrichten', pct: 50, color: C.text },
          { num: '03', text: 'Tagesgeld reicht — kein Investitionsrisiko eingehen', pct: 75, color: C.text },
          { num: '04', text: 'Nur für echte Notfälle anfassen', pct: 100, color: C.green },
        ].map(rule =>
          h('div', {
            style: {
              display: 'flex', flexDirection: 'column', gap: '10px',
              padding: '20px 24px', backgroundColor: C.cardBg, borderRadius: '18px',
            },
          },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
              h('span', {
                style: { fontSize: '38px', fontWeight: 800, color: rule.color, minWidth: '56px' },
              }, rule.num),
              h('span', {
                style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3' },
              }, rule.text)
            ),
            h('div', {
              style: {
                display: 'flex', height: '6px', backgroundColor: C.border,
                borderRadius: '3px', overflow: 'hidden',
              },
            },
              h('div', {
                style: {
                  display: 'flex', width: `${rule.pct}%`, height: '6px',
                  backgroundColor: rule.color, borderRadius: '3px',
                },
              })
            )
          )
        )
      )
    ),
    keyLearning('Automatisierung ist der Schlüssel — Pay yourself first.'),
    igHandle()
  );

  // ── SLIDE 8: CTA ─────────────────────────────────────────────────────────────
  const slide8 = slideRoot(C.bgDark,
    topRowNoLogo('JETZT BIST DU DRAN'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '28px',
      },
    },
      h('img', {
        src: logoB64,
        width: 130, height: 130,
        style: { borderRadius: '18px', objectFit: 'cover' },
      }),
      h('span', {
        style: {
          fontSize: '50px', fontWeight: 800, color: C.text,
          lineHeight: '1.1', textAlign: 'center', letterSpacing: '-1px',
        },
      }, 'Wie groß ist dein Notgroschen gerade?'),
      h('span', {
        style: {
          fontSize: '28px', fontWeight: 500, color: C.textMuted,
          textAlign: 'center', lineHeight: '1.5',
        },
      }, 'Schreib dein Ziel in die Kommentare — wir helfen dir dabei, es zu erreichen.'),
      h('span', {
        style: {
          fontSize: '28px', fontWeight: 600, color: C.textSoft,
          textAlign: 'center', lineHeight: '1.5',
        },
      }, 'Speichere diesen Post und fange heute an.')
    ),
    igHandle()
  );

  // ── RENDER ALL SLIDES ─────────────────────────────────────────────────────────
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} gespeichert`);
  }
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
