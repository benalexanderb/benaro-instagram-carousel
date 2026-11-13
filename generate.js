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
    return h('div', { style: { display: 'flex', marginBottom: '14px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.accent, backgroundColor: 'rgba(91,200,245,0.15)',
          padding: '10px 22px', borderRadius: '12px', textTransform: 'uppercase'
        }
      }, text)
    );
  }

  function headline(text, size = 64) {
    return h('span', {
      style: {
        fontSize: `${size}px`, fontWeight: 800, color: C.text,
        lineHeight: '1.05', letterSpacing: '-0.5px', marginBottom: '6px',
        textTransform: 'uppercase'
      }
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500, color: C.textSoft,
        lineHeight: '1.5', marginTop: '8px'
      }
    }, text);
  }

  function keyLearning(text) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: '16px', padding: '22px 28px', marginTop: 'auto'
      }
    },
      h('div', { style: { display: 'flex', width: '6px', minHeight: '40px', backgroundColor: C.red, borderRadius: '3px' } }),
      h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, text)
    );
  }

  function bfLogo() {
    return h('div', {
      style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginTop: '18px' }
    },
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '72px', height: '56px',
          border: '3px solid rgba(255,255,255,0.9)', borderRadius: '10px'
        }
      },
        h('span', { style: { fontSize: '28px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '2px' } }, 'BF')
      ),
      h('span', {
        style: { fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '3px', textTransform: 'uppercase' }
      }, 'BENARO FINANZEN')
    );
  }

  function slide(children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column',
        width: W, height: H, padding: '70px',
        backgroundColor: C.bg, fontFamily: 'Outfit'
      }
    }, ...children);
  }

  // ─── SLIDE 1: HOOK ─────────────────────────────────────────────────────────
  const slide1 = slide([
    badge('WECKRUF'),
    headline('DEIN GELD SCHLÄFT — DU NICHT', 62),
    subline('Die meisten arbeiten 40 Stunden pro Woche. Ihr Geld: 0.'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px', marginTop: '24px' } },
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center',
            backgroundColor: C.bgDark, borderRadius: '20px', padding: '32px 24px', gap: '14px',
            border: `1px solid ${C.border}`
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '60px', height: '60px', borderRadius: '30px',
              backgroundColor: 'rgba(230,48,48,0.2)', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${C.red}`
            }
          },
            h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.red } }, '8h')
          ),
          h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.text, textTransform: 'uppercase', textAlign: 'center' } }, 'AKTIVES EINKOMMEN'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, textAlign: 'center', lineHeight: '1.4' } }, 'Du tauschst Zeit gegen Geld. Endet, wenn du aufhörst.'),
          h('div', { style: { display: 'flex', width: '100%', height: '4px', backgroundColor: C.red, borderRadius: '2px' } })
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center',
            backgroundColor: 'rgba(91,200,245,0.10)', borderRadius: '20px', padding: '32px 24px', gap: '14px',
            border: `2px solid ${C.accent}`
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '60px', height: '60px', borderRadius: '30px',
              backgroundColor: 'rgba(91,200,245,0.2)', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${C.accent}`
            }
          },
            h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.accent } }, '24h')
          ),
          h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.text, textTransform: 'uppercase', textAlign: 'center' } }, 'PASSIVES EINKOMMEN'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, textAlign: 'center', lineHeight: '1.4' } }, 'Geld arbeitet für dich — auch wenn du schläfst.'),
          h('div', { style: { display: 'flex', width: '100%', height: '4px', backgroundColor: C.accent, borderRadius: '2px' } })
        )
      ),
      h('div', {
        style: {
          display: 'flex', backgroundColor: 'rgba(91,200,245,0.08)', borderRadius: '16px',
          padding: '20px 28px', border: `1px solid rgba(91,200,245,0.25)`
        }
      },
        h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.accent, lineHeight: '1.4' } },
          'Wer nur aktiv verdient, kann nie wirklich frei sein.')
      )
    ),
    keyLearning('Passives Einkommen: Geld verdienen ohne deine Zeit zu verkaufen.'),
    bfLogo(),
  ]);

  // ─── SLIDE 2: STATISTIK ────────────────────────────────────────────────────
  const slide2 = slide([
    badge('DIE REALITÄT'),
    headline('NUR 15 % DER DEUTSCHEN HABEN PASSIVES EINKOMMEN', 54),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '24px' } },
      h('div', { style: { display: 'flex', gap: '10px', marginBottom: '8px' } },
        [0, 1, 2].map(() =>
          h('div', { style: { display: 'flex', width: '0', height: '0', borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderTop: `20px solid ${C.red}` } })
        )
      ),
      h('span', { style: { fontSize: '150px', fontWeight: 800, color: C.accent, lineHeight: '1' } }, '85%'),
      h('div', { style: { display: 'flex', width: '200px', height: '5px', backgroundColor: C.red, borderRadius: '3px', marginTop: '-10px' } }),
      h('span', {
        style: { fontSize: '30px', fontWeight: 600, color: C.text, lineHeight: '1.5', textAlign: 'center', maxWidth: '860px' }
      }, 'der Deutschen haben kein passives Einkommen — und sind damit komplett vom Jobgehalt abhängig.'),
      h('div', {
        style: {
          display: 'flex', backgroundColor: 'rgba(230,48,48,0.10)', borderRadius: '14px',
          padding: '18px 28px', border: `1px solid ${C.red}`, alignItems: 'center', gap: '12px'
        }
      },
        h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '6px', backgroundColor: C.red } }),
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.red } }, 'Rentenniveau bis 2040: nur 43 % des Nettolohns')
      )
    ),
    keyLearning('Wer nur auf das Gehalt baut, baut auf ein einziges, brüchiges Fundament.'),
    bfLogo(),
  ]);

  // ─── SLIDE 3: PROBLEM ──────────────────────────────────────────────────────
  const slide3 = slide([
    badge('DAS PROBLEM'),
    headline('ZEIT IST DEIN GRÖSSTER ENGPASS', 62),
    subline('Du kannst mehr Geld verdienen — aber nie mehr Zeit kaufen.'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px', marginTop: '20px' } },
      ...[
        { label: '24 Stunden pro Tag', pct: 100, color: C.border, desc: 'Deine gesamte tägliche Zeit' },
        { label: '8h Schlaf', pct: 33, color: 'rgba(91,200,245,0.4)', desc: 'Nicht verhandelbar' },
        { label: '8h Arbeit (Aktiveinkommen)', pct: 33, color: C.red, desc: 'Zeit gegen Geld' },
        { label: '8h Familie, Alltag, Erholung', pct: 33, color: 'rgba(255,255,255,0.3)', desc: 'Deine Lebenszeit' },
        { label: '0h passives Einkommen', pct: 0, color: C.accent, desc: 'Ohne Plan bleibt es bei 0' },
      ].map(item =>
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            h('span', { style: { fontSize: '26px', fontWeight: 700, color: item.pct === 0 ? C.accent : C.text } }, item.label),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, item.desc)
          ),
          h('div', { style: { display: 'flex', height: '10px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '5px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${item.pct}%`, height: '10px', backgroundColor: item.color, borderRadius: '5px' } })
          )
        )
      )
    ),
    keyLearning('Aktives Einkommen hat eine harte Grenze: 24 Stunden pro Tag.'),
    bfLogo(),
  ]);

  // ─── SLIDE 4: WENDEPUNKT ────────────────────────────────────────────────────
  const slide4 = slide([
    badge('DER WENDEPUNKT'),
    headline('PASSIVES EINKOMMEN BRICHT DIESE GRENZE', 56),
    subline('Einmal aufgebaut — läuft es, auch wenn du schläfst.'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px', marginTop: '20px' } },
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.bgDark,
            borderRadius: '20px', padding: '28px', gap: '12px', border: `1px solid ${C.border}`
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted, textTransform: 'uppercase' } }, 'AKTIVES EINKOMMEN'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.red } }),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text, lineHeight: '1.4' } }, 'Gehalt'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Ohne Arbeit = kein Geld. Urlaub, Krankheit, Rente: Einnahmen stoppen sofort.'),
          h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.red, marginTop: '8px' } }, 'ABHÄNGIG VON DEINER ZEIT')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(91,200,245,0.10)', borderRadius: '20px', padding: '28px', gap: '12px',
            border: `2px solid ${C.accent}`
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.accent, textTransform: 'uppercase' } }, 'PASSIVES EINKOMMEN'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.accent } }),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text, lineHeight: '1.4' } }, 'ETF-Dividenden, Zinsen, Miete'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Geld wächst auch nachts. Einmal aufgebaut, kein Zeiteinsatz nötig.'),
          h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.accent, marginTop: '8px' } }, 'UNABHÄNGIG VON DEINER ZEIT')
        )
      ),
      h('div', {
        style: {
          display: 'flex', backgroundColor: 'rgba(91,200,245,0.08)', borderRadius: '16px',
          padding: '22px 28px', alignItems: 'center', gap: '16px'
        }
      },
        h('div', { style: { display: 'flex', width: '8px', minHeight: '48px', backgroundColor: C.accent, borderRadius: '4px' } }),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } },
          'Der Unterschied: Du bist nicht mehr der Engpass. Dein Kapital arbeitet, während du schläfst.')
      )
    ),
    keyLearning('Passives Einkommen macht deine Zeit wieder dir gehörig.'),
    bfLogo(),
  ]);

  // ─── SLIDE 5: 5 STRATEGIEN ──────────────────────────────────────────────────
  const strategies = [
    { num: '01', title: 'ETF-DIVIDENDEN', detail: 'Ab 25 €/Monat im Sparplan', color: C.accent },
    { num: '02', title: 'TAGESGELD', detail: 'Bis zu 4,25 % p.a. — sofort verfügbar', color: C.accent },
    { num: '03', title: 'MIETIMMOBILIEN', detail: 'Miete als monatliche Einnahme', color: C.accent },
    { num: '04', title: 'DIGITALE PRODUKTE', detail: 'E-Books, Kurse, Vorlagen', color: C.accent },
    { num: '05', title: 'STAATSANLEIHEN', detail: 'Zinsen vom Staat — sicher & planbar', color: C.accent },
  ];

  const slide5 = slide([
    badge('DIE 5 STRATEGIEN'),
    headline('5 WEGE ZU PASSIVEM EINKOMMEN', 62),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px', marginTop: '16px' } },
      ...strategies.map((s, i) =>
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: '20px',
            backgroundColor: i === 0 ? 'rgba(91,200,245,0.12)' : C.bgDark,
            borderRadius: '16px', padding: '20px 24px',
            border: i === 0 ? `2px solid ${C.accent}` : `1px solid ${C.border}`
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '52px', height: '52px', borderRadius: '12px',
              backgroundColor: 'rgba(91,200,245,0.15)', alignItems: 'center', justifyContent: 'center',
              border: `1px solid rgba(91,200,245,0.3)`
            }
          },
            h('span', { style: { fontSize: '20px', fontWeight: 800, color: C.accent } }, s.num)
          ),
          h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', gap: '4px' } },
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.text, textTransform: 'uppercase', letterSpacing: '1px' } }, s.title),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, s.detail)
          ),
          h('div', { style: { display: 'flex', width: '8px', height: '8px', borderRadius: '4px', backgroundColor: C.accent } })
        )
      )
    ),
    keyLearning('Jede Strategie hat ihren Platz — kombiniere mindestens zwei.'),
    bfLogo(),
  ]);

  // ─── SLIDE 6: FAHRPLAN ─────────────────────────────────────────────────────
  const steps = [
    { num: 1, text: 'NOTGROSCHEN: 3 Monate Fixkosten auf Tagesgeld', sub: 'Sicherheitsnetz zuerst — sonst musst du ETF-Anteile verkaufen' },
    { num: 2, text: 'ERSTEN SPARPLAN: Ab 25 € / Monat in ETF', sub: 'Automatisch, monatlich — Zinseszins beginnt sofort zu wirken' },
    { num: 3, text: 'REINVESTIEREN: Dividenden & Zinsen nie ausgeben', sub: 'Reinvestiert verdoppelung du dein passives Einkommen alle 10 Jahre' },
  ];

  const slide6 = slide([
    badge('DEIN FAHRPLAN'),
    headline('SO STARTEST DU IN 3 SCHRITTEN', 62),
    subline('Reihenfolge entscheidet — nicht die Höhe der Einzahlung.'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px', marginTop: '20px' } },
      ...steps.map((step, i) =>
        h('div', { style: { display: 'flex', gap: '20px', alignItems: 'flex-start' } },
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px' } },
            h('div', {
              style: {
                display: 'flex', width: '52px', height: '52px', borderRadius: '26px',
                backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center'
              }
            },
              h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.bg } }, `${step.num}`)
            ),
            i < steps.length - 1
              ? h('div', { style: { display: 'flex', width: '3px', height: '40px', backgroundColor: 'rgba(91,200,245,0.3)', marginTop: '4px' } })
              : undefined
          ),
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column', gap: '6px',
              backgroundColor: C.bgDark, borderRadius: '16px', padding: '20px 24px',
              border: `1px solid ${C.border}`
            }
          },
            h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.text, textTransform: 'uppercase', lineHeight: '1.3' } }, step.text),
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, step.sub)
          )
        )
      )
    ),
    keyLearning('Anfangen schlägt Perfektionismus — jeden Monat, auch mit kleinem Betrag.'),
    bfLogo(),
  ]);

  // ─── SLIDE 7: KEY LEARNINGS ─────────────────────────────────────────────────
  const learnings = [
    { num: '01', text: 'Zeit ist endlich — Geld kann unbegrenzt für dich wachsen', pct: 33 },
    { num: '02', text: 'Passives Einkommen braucht aktiven Aufbau — aber nur einmal', pct: 66 },
    { num: '03', text: 'Wer früh startet, gewinnt den Zinseszins-Vorteil', pct: 100 },
  ];

  const slide7 = slide([
    badge('DEIN LERNMOMENT'),
    headline('3 DINGE DIE DU MITGENOMMEN HAST', 58),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px', marginTop: '20px' } },
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px 28px',
            backgroundColor: C.bgDark, borderRadius: '18px',
            border: l.pct === 100 ? `2px solid ${C.accent}` : `1px solid ${C.border}`
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', { style: { fontSize: '38px', fontWeight: 800, color: l.pct === 100 ? C.accent : C.white, minWidth: '60px' } }, l.num),
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3' } }, l.text)
          ),
          h('div', { style: { display: 'flex', height: '6px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${l.pct}%`, height: '6px', backgroundColor: l.pct === 100 ? C.accent : C.red, borderRadius: '3px' } })
          )
        )
      )
    ),
    keyLearning('Passives Einkommen ist kein Glück — es ist ein Plan, den du jetzt umsetzt.'),
    bfLogo(),
  ]);

  // ─── SLIDE 8: CTA ───────────────────────────────────────────────────────────
  const slide8 = slide([
    badge('JETZT DU'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '28px'
      }
    },
      h('div', { style: { display: 'flex', width: '80px', height: '5px', backgroundColor: C.red, borderRadius: '3px' } }),
      h('span', {
        style: {
          fontSize: '50px', fontWeight: 800, color: C.text, textAlign: 'center',
          lineHeight: '1.2', textTransform: 'uppercase', maxWidth: '880px'
        }
      }, 'WAS WÄRE DEIN ERSTER SCHRITT ZU PASSIVEM EINKOMMEN?'),
      h('div', { style: { display: 'flex', width: '80px', height: '5px', backgroundColor: C.red, borderRadius: '3px' } }),
      h('span', {
        style: { fontSize: '28px', fontWeight: 500, color: C.textSoft, textAlign: 'center', lineHeight: '1.5', maxWidth: '780px' }
      }, 'Schreib uns in die Kommentare — wir helfen dir dabei, den richtigen Weg zu finden.'),
      h('div', {
        style: {
          display: 'flex', backgroundColor: 'rgba(91,200,245,0.10)', borderRadius: '16px',
          padding: '18px 32px', border: `1px solid rgba(91,200,245,0.3)`
        }
      },
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.accent } }, '@benarofinanzen')
      ),
      bfLogo(),
    ),
    h('span', { style: { fontSize: '18px', fontWeight: 500, color: C.textMuted, textAlign: 'center', marginTop: '8px' } }, 'Speichern nicht vergessen 📌')
  ]);

  // ─── GENERATE ALL SLIDES ────────────────────────────────────────────────────
  const TODAY = new Date().toISOString().slice(0, 10);
  const outDir = path.join(__dirname, 'output', `carousel_${TODAY}`, 'slides');

  const allSlides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < allSlides.length; i++) {
    const svg = await satori(allSlides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${allSlides.length} generiert: ${pngPath}`);
  }

  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
