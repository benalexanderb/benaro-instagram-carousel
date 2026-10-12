const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default;
  const { Resvg } = require('@resvg/resvg-js');

  const W = 1080, H = 1350;
  const TODAY = process.env.TODAY || new Date().toISOString().split('T')[0];
  const outputDir = path.join(__dirname, 'output', `carousel_${TODAY}`, 'slides');
  fs.mkdirSync(outputDir, { recursive: true });

  // Fonts — latin + latin-ext für Umlaut-Rendering
  const fontDir = path.join(__dirname, 'node_modules/@fontsource/outfit/files');
  const fonts = [400, 500, 600, 700, 800].flatMap(w => [
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-${w}-normal.woff`)) },
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-ext-${w}-normal.woff`)) },
  ]);

  // Benaro Logo
  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')
  ).toString('base64');

  // Farben — einheitlich auf ALLEN Slides
  const C = {
    bg: '#001F60',
    text: '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted: '#9CA3AF',
    cardBg: 'rgba(255,255,255,0.10)',
    border: 'rgba(255,255,255,0.20)',
    green: '#10B981',
    red: '#EF4444',
  };

  // h() Helper für Satori
  const h = (type, props, ...ch) => ({
    type,
    props: {
      ...props,
      children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch,
    },
  });

  // ── Komponenten ──────────────────────────────────────────────

  function logo() {
    return h('img', {
      src: logoB64,
      width: 120,
      height: 120,
      style: { borderRadius: '12px', objectFit: 'cover' },
    });
  }

  function badge(text) {
    return h('span', {
      style: {
        display: 'flex',
        fontSize: '22px',
        fontWeight: 700,
        letterSpacing: '3px',
        color: C.text,
        backgroundColor: C.cardBg,
        padding: '10px 22px',
        borderRadius: '12px',
      },
    }, text);
  }

  function topBar(badgeText) {
    return h('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px',
      },
    }, badge(badgeText), logo());
  }

  function headline(text, size = 64) {
    return h('span', {
      style: {
        fontSize: `${size}px`,
        fontWeight: 800,
        color: C.text,
        lineHeight: '1.08',
        letterSpacing: '-1.5px',
        marginBottom: '6px',
      },
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px',
        fontWeight: 500,
        color: C.textMuted,
        lineHeight: '1.45',
        marginTop: '8px',
        marginBottom: '4px',
      },
    }, text);
  }

  function keyLearning(text, accent = C.text) {
    return h('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        backgroundColor: C.cardBg,
        borderRadius: '16px',
        padding: '22px 28px',
        marginTop: '20px',
      },
    },
      h('div', {
        style: {
          display: 'flex',
          width: '6px',
          minHeight: '40px',
          backgroundColor: accent,
          borderRadius: '3px',
        },
      }),
      h('span', {
        style: {
          fontSize: '26px',
          fontWeight: 600,
          color: C.text,
          lineHeight: '1.4',
        },
      }, text)
    );
  }

  function footer() {
    return h('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '14px',
      },
    },
      h('span', {
        style: {
          fontSize: '24px',
          fontWeight: 500,
          color: C.textMuted,
        },
      }, '@benarofinanzen')
    );
  }

  function slideRoot(...children) {
    return h('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: W,
        height: H,
        padding: '70px',
        backgroundColor: C.bg,
        fontFamily: 'Outfit',
      },
    }, ...children);
  }

  // ── Slide 1 — Hook ────────────────────────────────────────────
  const slide1 = slideRoot(
    topBar('WEIHNACHTSGELD 2026'),
    headline('Bekommst du bald Weihnachtsgeld?', 66),
    subline('Die meisten verbrennen es — du machst es besser'),
    h('div', {
      style: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '20px',
      },
    },
      // Stat Hero
      h('div', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: C.cardBg,
          borderRadius: '24px',
          padding: '44px',
          gap: '8px',
        },
      },
        h('span', {
          style: {
            fontSize: '96px',
            fontWeight: 800,
            color: C.green,
            letterSpacing: '-3px',
            lineHeight: '1',
          },
        }, 'Ø 2.700 €'),
        h('span', {
          style: {
            fontSize: '28px',
            fontWeight: 500,
            color: C.textMuted,
          },
        }, 'durchschnittliches Weihnachtsgeld'),
        h('span', {
          style: {
            fontSize: '24px',
            fontWeight: 400,
            color: C.textMuted,
          },
        }, 'für Angestellte in Deutschland')
      ),
      // Warnung
      h('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 28px',
          backgroundColor: 'rgba(239,68,68,0.10)',
          borderRadius: '14px',
        },
      },
        h('div', {
          style: {
            display: 'flex',
            width: '12px',
            height: '12px',
            borderRadius: '6px',
            backgroundColor: C.red,
          },
        }),
        h('span', {
          style: {
            fontSize: '28px',
            fontWeight: 600,
            color: C.red,
          },
        }, '77% nutzen es nicht optimal')
      )
    ),
    keyLearning('Wer jetzt plant, kann sein Jahr finanziell stark beenden.'),
    footer()
  );

  // ── Slide 2 — Das Problem ─────────────────────────────────────
  const slide2 = slideRoot(
    topBar('DAS PROBLEM'),
    headline('So geben 77% ihr Weihnachtsgeld aus', 58),
    subline('Und verlieren dabei echtes Vermögen'),
    h('div', {
      style: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '14px',
      },
    },
      ...[
        { label: 'Konsum und Geschenke', pct: 48, color: C.red },
        { label: 'Girokonto stehen lassen', pct: 19, color: 'rgba(239,68,68,0.65)' },
        { label: 'Urlaub buchen', pct: 10, color: 'rgba(239,68,68,0.40)' },
      ].map(item =>
        h('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '24px 28px',
            backgroundColor: C.cardBg,
            borderRadius: '18px',
          },
        },
          h('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
          },
            h('span', {
              style: { fontSize: '28px', fontWeight: 600, color: C.text },
            }, item.label),
            h('span', {
              style: { fontSize: '34px', fontWeight: 800, color: item.color },
            }, `${item.pct}%`)
          ),
          h('div', {
            style: {
              display: 'flex',
              height: '8px',
              backgroundColor: 'rgba(255,255,255,0.10)',
              borderRadius: '4px',
              overflow: 'hidden',
            },
          },
            h('div', {
              style: {
                display: 'flex',
                width: `${item.pct}%`,
                height: '8px',
                backgroundColor: item.color,
                borderRadius: '4px',
              },
            })
          )
        )
      )
    ),
    keyLearning('Geld auf dem Girokonto verliert real 2,3% pro Jahr durch Inflation.', C.red),
    footer()
  );

  // ── Slide 3 — Kaufkraftverlust ────────────────────────────────
  const slide3 = slideRoot(
    topBar('DER KAUFKRAFTVERLUST'),
    headline('2.700 € heute — was bleibt in 5 Jahren?', 56),
    subline('Bei 2,3% Inflation pro Jahr'),
    h('div', {
      style: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '18px',
      },
    },
      // Kontrast-Karten
      h('div', {
        style: { display: 'flex', gap: '14px' },
      },
        h('div', {
          style: {
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            backgroundColor: C.cardBg,
            borderRadius: '20px',
            padding: '32px',
            gap: '10px',
          },
        },
          h('span', {
            style: { fontSize: '22px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted },
          }, 'HEUTE'),
          h('div', {
            style: { display: 'flex', width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '2px' },
          }),
          h('span', {
            style: { fontSize: '52px', fontWeight: 800, color: C.text, letterSpacing: '-2px' },
          }, '2.700 €'),
          h('span', {
            style: { fontSize: '24px', fontWeight: 500, color: C.textMuted },
          }, 'volle Kaufkraft')
        ),
        h('div', {
          style: {
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            backgroundColor: 'rgba(239,68,68,0.10)',
            borderRadius: '20px',
            padding: '32px',
            gap: '10px',
            border: '2px solid rgba(239,68,68,0.30)',
          },
        },
          h('span', {
            style: { fontSize: '22px', fontWeight: 700, letterSpacing: '2px', color: C.red },
          }, 'IN 5 JAHREN'),
          h('div', {
            style: { display: 'flex', width: '100%', height: '4px', backgroundColor: 'rgba(239,68,68,0.30)', borderRadius: '2px' },
          }),
          h('span', {
            style: { fontSize: '52px', fontWeight: 800, color: C.red, letterSpacing: '-2px' },
          }, '2.404 €'),
          h('span', {
            style: { fontSize: '24px', fontWeight: 500, color: C.red },
          }, '= 296 € realer Verlust')
        )
      ),
      // Fazit
      h('div', {
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          padding: '18px 28px',
          backgroundColor: 'rgba(239,68,68,0.08)',
          borderRadius: '14px',
        },
      },
        h('span', {
          style: { fontSize: '26px', fontWeight: 600, color: C.textSoft },
        }, 'Girokonto stehen lassen ='),
        h('span', {
          style: { fontSize: '28px', fontWeight: 800, color: C.red },
        }, '- 296 € in 5 Jahren')
      )
    ),
    keyLearning('ETF-Rendite von 7% p.a. schlägt Inflation locker — aber nur wer investiert, profitiert.'),
    footer()
  );

  // ── Slide 4 — Die 3-Töpfe-Strategie ──────────────────────────
  const slide4 = slideRoot(
    topBar('DIE STRATEGIE'),
    headline('Die 3-Töpfe-Formel', 72),
    subline('So teilen finanziell kluge Menschen ihr Weihnachtsgeld auf'),
    h('div', {
      style: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '16px',
      },
    },
      ...[
        { num: '01', label: 'Notgroschen auffüllen', pct: '30 %', amount: '810 €', color: C.text },
        { num: '02', label: 'ETF-Depot einzahlen', pct: '50 %', amount: '1.350 €', color: C.green },
        { num: '03', label: 'Schulden tilgen / Genuss', pct: '20 %', amount: '540 €', color: C.textSoft },
      ].map(item =>
        h('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '26px 28px',
            backgroundColor: C.cardBg,
            borderRadius: '18px',
          },
        },
          h('span', {
            style: { fontSize: '42px', fontWeight: 800, color: item.color, minWidth: '64px' },
          }, item.num),
          h('div', {
            style: {
              display: 'flex',
              flexDirection: 'column',
              flex: '1',
              gap: '4px',
            },
          },
            h('span', {
              style: { fontSize: '30px', fontWeight: 700, color: C.text },
            }, item.label),
            h('span', {
              style: { fontSize: '24px', fontWeight: 500, color: C.textMuted },
            }, `bei Ø 2.700 € = ${item.amount}`)
          ),
          h('span', {
            style: { fontSize: '34px', fontWeight: 800, color: item.color },
          }, item.pct)
        )
      )
    ),
    keyLearning('50% sofort investieren — der Rest folgt klaren Prioritäten, nicht dem Zufall.', C.green),
    footer()
  );

  // ── Slide 5 — Topf 1: Notgroschen ────────────────────────────
  const slide5 = slideRoot(
    topBar('TOPF 1 — NOTGROSCHEN'),
    headline('Dein finanzielles Sicherheitsnetz', 60),
    subline('Ziel: 3x deine monatlichen Fixkosten auf Tagesgeld'),
    h('div', {
      style: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '18px',
      },
    },
      h('div', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: C.cardBg,
          borderRadius: '24px',
          padding: '38px',
          gap: '18px',
        },
      },
        h('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        },
          h('span', { style: { fontSize: '34px', fontWeight: 700, color: C.text } }, 'Dein Ziel'),
          h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.green } }, '3 Monate')
        ),
        h('div', { style: { display: 'flex', height: '4px', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '2px' } }),
        ...[
          { label: 'Monatliche Fixkosten (Beispiel)', value: '1.800 €' },
          { label: 'Notgroschen-Ziel', value: '5.400 €' },
          { label: 'Tagesgeld-Zinsen (4,25% p.a.)', value: '+ 229 € / Jahr' },
        ].map(row =>
          h('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
          },
            h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted } }, row.label),
            h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, row.value)
          )
        )
      ),
      h('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '16px 24px',
          backgroundColor: 'rgba(16,185,129,0.10)',
          borderRadius: '14px',
        },
      },
        h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '6px', backgroundColor: C.green } }),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.green } }, 'Tagesgeld: 4,25% p.a. — kein Risiko, jederzeit verfügbar')
      )
    ),
    keyLearning('Ohne Notgroschen wirst du gezwungen, Investitionen in der Krise aufzulösen.', C.red),
    footer()
  );

  // ── Slide 6 — Topf 2: ETF-Einzahlung ────────────────────────
  const slide6 = slideRoot(
    topBar('TOPF 2 — ETF-EINZAHLUNG'),
    headline('1.350 € heute = 2.656 € in 10 Jahren', 56),
    subline('Einmalinvestition bei 7% Rendite p.a. — kein weiterer Aufwand'),
    h('div', {
      style: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '12px',
      },
    },
      ...[
        { year: 'Jahr 1', value: '1.445 €', pct: 20 },
        { year: 'Jahr 3', value: '1.653 €', pct: 40 },
        { year: 'Jahr 5', value: '1.891 €', pct: 58 },
        { year: 'Jahr 7', value: '2.163 €', pct: 75 },
        { year: 'Jahr 10', value: '2.656 €', pct: 100, highlight: true },
      ].map(row =>
        h('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '16px 22px',
            backgroundColor: row.highlight ? 'rgba(16,185,129,0.12)' : C.cardBg,
            borderRadius: '14px',
            border: row.highlight ? '1px solid rgba(16,185,129,0.30)' : 'none',
          },
        },
          h('span', {
            style: { fontSize: '24px', fontWeight: 600, color: C.textMuted, minWidth: '80px' },
          }, row.year),
          h('div', {
            style: {
              display: 'flex',
              flex: '1',
              height: '8px',
              backgroundColor: 'rgba(255,255,255,0.10)',
              borderRadius: '4px',
              overflow: 'hidden',
            },
          },
            h('div', {
              style: {
                display: 'flex',
                width: `${row.pct}%`,
                height: '8px',
                backgroundColor: row.highlight ? C.green : 'rgba(255,255,255,0.45)',
                borderRadius: '4px',
              },
            })
          ),
          h('span', {
            style: {
              fontSize: '28px',
              fontWeight: 800,
              color: row.highlight ? C.green : C.text,
              minWidth: '96px',
              textAlign: 'right',
            },
          }, row.value)
        )
      )
    ),
    keyLearning('Der Zinseszins verdoppelt dein Geld alle 10 Jahre — je früher du startest, desto mehr profitierst du.', C.green),
    footer()
  );

  // ── Slide 7 — Der 4-Schritte-Plan ────────────────────────────
  const slide7 = slideRoot(
    topBar('DEIN WEIHNACHTSGELD-PLAN'),
    headline('4 Schritte — jetzt umsetzbar', 62),
    h('div', {
      style: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '14px',
      },
    },
      ...[
        { num: '01', text: 'Notgroschen prüfen — Ziel: 3x Monatskosten auf Tagesgeld', pct: 25 },
        { num: '02', text: 'Hochzinsschulden tilgen — Dispo und Ratenkredite zuerst', pct: 50 },
        { num: '03', text: 'ETF-Einmalbetrag ausführen — Welt-ETF oder Sparplan aufstocken', pct: 75 },
        { num: '04', text: 'Rest bewusst genießen — du hast es dir verdient', pct: 100 },
      ].map(l =>
        h('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '20px 24px',
            backgroundColor: C.cardBg,
            borderRadius: '18px',
          },
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', {
              style: {
                fontSize: '38px',
                fontWeight: 800,
                color: l.pct === 100 ? C.green : C.text,
                minWidth: '56px',
              },
            }, l.num),
            h('span', {
              style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3' },
            }, l.text)
          ),
          h('div', {
            style: {
              display: 'flex',
              height: '6px',
              backgroundColor: 'rgba(255,255,255,0.10)',
              borderRadius: '3px',
              overflow: 'hidden',
            },
          },
            h('div', {
              style: {
                display: 'flex',
                width: `${l.pct}%`,
                height: '6px',
                backgroundColor: l.pct === 100 ? C.green : C.text,
                borderRadius: '3px',
              },
            })
          )
        )
      )
    ),
    keyLearning('Wer plant, genießt sein Weihnachtsgeld doppelt — heute und in der Zukunft.', C.green),
    footer()
  );

  // ── Slide 8 — CTA ─────────────────────────────────────────────
  const slide8 = slideRoot(
    topBar('DEIN NÄCHSTER SCHRITT'),
    h('div', {
      style: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '28px',
      },
    },
      h('span', {
        style: {
          fontSize: '52px',
          fontWeight: 800,
          color: C.text,
          textAlign: 'center',
          lineHeight: '1.1',
          letterSpacing: '-1.5px',
        },
      }, 'Wie viel Weihnachtsgeld bekommst du dieses Jahr?'),
      h('span', {
        style: {
          fontSize: '30px',
          fontWeight: 500,
          color: C.textMuted,
          textAlign: 'center',
          lineHeight: '1.5',
        },
      }, 'Schreib es in die Kommentare — wir zeigen dir, wie du es optimal aufteilst.'),
      h('div', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          padding: '32px 48px',
          backgroundColor: C.cardBg,
          borderRadius: '24px',
        },
      },
        h('span', {
          style: { fontSize: '30px', fontWeight: 700, color: C.text, textAlign: 'center' },
        }, 'Speichere diesen Post'),
        h('span', {
          style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, textAlign: 'center' },
        }, 'damit du im November darauf zurückgreifen kannst')
      ),
      h('span', {
        style: { fontSize: '28px', fontWeight: 600, color: C.textSoft, textAlign: 'center' },
      }, 'Folge @benarofinanzen für mehr Finanztipps')
    ),
    h('div', {
      style: { display: 'flex', justifyContent: 'center', marginTop: '16px' },
    },
      h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted } }, '@benarofinanzen')
    )
  );

  // ── Slides rendern ────────────────────────────────────────────
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outputDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} gespeichert: ${pngPath}`);
  }
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
