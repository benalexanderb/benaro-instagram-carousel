const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default || require('satori');
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
    cardBg: 'rgba(255,255,255,0.10)',
    border: 'rgba(255,255,255,0.20)',
    green: '#10B981',
    red: '#EF4444',
  };

  const W = 1080, H = 1350;

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')
  ).toString('base64');

  const outDir = path.join(__dirname, 'output/carousel_2026-07-24/slides');

  const h = (type, props, ...ch) => ({
    type, props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function slideRoot(children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column',
        width: W, height: H, padding: '70px',
        backgroundColor: C.bg, fontFamily: 'Outfit',
      }
    }, ...children);
  }

  function topRow(badgeText) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '24px',
      }
    },
      h('span', {
        style: {
          display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: C.cardBg, padding: '10px 22px', borderRadius: '12px',
        }
      }, badgeText),
      h('img', { src: logoB64, width: 80, height: 80, style: { borderRadius: '12px', objectFit: 'cover' } })
    );
  }

  function headline(text, size) {
    return h('span', {
      style: {
        fontSize: `${size || 64}px`, fontWeight: 800, color: C.text,
        lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '6px',
      }
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: { fontSize: '28px', fontWeight: 500, color: C.textMuted, lineHeight: '1.5', marginTop: '8px' }
    }, text);
  }

  function keyLearning(text, accent) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: C.cardBg,
        borderRadius: '16px', padding: '22px 28px', marginTop: 'auto',
      }
    },
      h('div', {
        style: {
          display: 'flex', width: '6px', minHeight: '40px',
          backgroundColor: accent || C.text, borderRadius: '3px', flexShrink: 0,
        }
      }),
      h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, text)
    );
  }

  function igHandle() {
    return h('div', { style: { display: 'flex', alignItems: 'center', marginTop: '14px' } },
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, '@benarofinanzen')
    );
  }

  function visual(children) {
    return h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center',
        marginTop: '20px', marginBottom: '20px',
      }
    }, ...children);
  }

  // ─── SLIDE 1: HOOK ───
  const slide1 = slideRoot([
    topRow('DAS UEBERRASCHT DICH'),
    headline('Gruene ETFs: Besser als ihr Ruf?', 62),
    subline('Die Wahrheit ueber nachhaltige Geldanlage 2026'),
    visual([
      h('div', { style: { display: 'flex', gap: '20px', width: '100%' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg,
            borderRadius: '20px', padding: '32px', gap: '16px', alignItems: 'center', justifyContent: 'center',
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '80px', height: '80px', borderRadius: '40px',
              backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center',
            }
          },
            h('div', { style: { display: 'flex', width: '50px', height: '50px', borderRadius: '25px', backgroundColor: 'rgba(255,255,255,0.15)' } })
          ),
          h('span', { style: { fontSize: '32px', fontWeight: 700, color: C.textMuted, textAlign: 'center' } }, 'ESG-ETF'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: 'rgba(255,255,255,0.30)', textAlign: 'center', lineHeight: '1.4' } }, 'Nachhaltig investieren'),
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '20px',
            padding: '32px', gap: '16px', alignItems: 'center', justifyContent: 'center',
            border: '2px solid rgba(16,185,129,0.25)',
          }
        },
          h('div', {
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            }
          },
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
              h('div', { style: { display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'flex-end' } },
                h('div', { style: { display: 'flex', width: '28px', height: '60px', backgroundColor: 'rgba(16,185,129,0.3)', borderRadius: '6px' } }),
                h('div', { style: { display: 'flex', width: '28px', height: '80px', backgroundColor: 'rgba(16,185,129,0.5)', borderRadius: '6px' } }),
                h('div', { style: { display: 'flex', width: '28px', height: '100px', backgroundColor: 'rgba(16,185,129,0.7)', borderRadius: '6px' } }),
                h('div', { style: { display: 'flex', width: '28px', height: '130px', backgroundColor: C.green, borderRadius: '6px' } }),
              )
            )
          ),
          h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.green, textAlign: 'center' } }, 'Rendite'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: 'rgba(16,185,129,0.75)', textAlign: 'center' } }, 'Kein Widerspruch'),
        )
      ),
      h('div', {
        style: {
          display: 'flex', marginTop: '20px', padding: '20px 28px',
          backgroundColor: 'rgba(16,185,129,0.08)', borderRadius: '16px',
          alignItems: 'center', gap: '14px',
          border: '1px solid rgba(16,185,129,0.2)',
        }
      },
        h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.green, flexShrink: 0 } }),
        h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } },
          'Gruen investieren und trotzdem Rendite machen - kein Widerspruch'
        )
      ),
    ]),
    keyLearning('ESG-ETFs wachsen 2026 auf ueber 2 Billionen EUR Volumen in Europa', C.green),
    igHandle(),
  ]);

  // ─── SLIDE 2: STATISTIK ───
  const slide2 = slideRoot([
    topRow('DIE ZAHLEN'),
    headline('46% wollen - nur 14% tun es', 62),
    subline('Deutsche ETF-Anleger und Nachhaltigkeit 2026'),
    visual([
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' } },
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft } }, 'Wollen nachhaltig investieren'),
            h('span', { style: { fontSize: '44px', fontWeight: 800, color: C.text } }, '46%'),
          ),
          h('div', { style: { display: 'flex', height: '56px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '14px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: '46%', height: '56px', backgroundColor: 'rgba(255,255,255,0.28)', borderRadius: '14px' } }),
          ),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.green } }, 'Haben bereits ESG-ETFs'),
            h('span', { style: { fontSize: '44px', fontWeight: 800, color: C.green } }, '14%'),
          ),
          h('div', { style: { display: 'flex', height: '56px', backgroundColor: 'rgba(16,185,129,0.06)', borderRadius: '14px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: '14%', height: '56px', backgroundColor: C.green, borderRadius: '14px' } }),
          ),
        ),
        h('div', {
          style: {
            display: 'flex', padding: '22px 28px',
            backgroundColor: 'rgba(239,68,68,0.06)', borderRadius: '16px',
            alignItems: 'center', gap: '14px', marginTop: '8px',
          }
        },
          h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.red, flexShrink: 0 } }),
          h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } },
            'Hauptgrund: Angst vor schlechterer Rendite - unbegrundet'
          )
        )
      )
    ]),
    keyLearning('32% der Wollenden scheuen die Auswahl - zu viele ESG-Produkte, zu wenig Orientierung'),
    igHandle(),
  ]);

  // ─── SLIDE 3: MYTHEN ───
  const slide3 = slideRoot([
    topRow('DIE MYTHEN'),
    headline('3 Irrtuemer die dich aufhalten', 62),
    subline('Was falsch ist - und was wirklich stimmt'),
    visual([
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '18px', width: '100%' } },
        ...[
          { num: '01', myth: 'ESG-ETFs bringen weniger Rendite' },
          { num: '02', myth: 'Nachhaltige ETFs sind viel teurer' },
          { num: '03', myth: 'Gruen investieren aendert sowieso nichts' },
        ].map(m =>
          h('div', {
            style: {
              display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px',
              backgroundColor: 'rgba(239,68,68,0.06)', borderRadius: '18px',
              padding: '26px 28px', border: '1px solid rgba(239,68,68,0.15)',
            }
          },
            h('span', { style: { fontSize: '36px', fontWeight: 800, color: 'rgba(239,68,68,0.35)', minWidth: '58px' } }, m.num),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
              h('span', {
                style: {
                  fontSize: '28px', fontWeight: 600, color: 'rgba(255,255,255,0.50)',
                  textDecoration: 'line-through', lineHeight: '1.3',
                }
              }, m.myth),
              h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.green } }, 'Widerlegt - naechste Seite'),
            )
          )
        )
      )
    ]),
    keyLearning('Alle 3 Mythen basieren auf veralteten Daten aus der Fruehphase von ESG'),
    igHandle(),
  ]);

  // ─── SLIDE 4: ERWARTUNG VS. REALITAET ───
  const slide4 = slideRoot([
    topRow('ERWARTUNG VS. REALITAET'),
    headline('ESG kostet Rendite?', 66),
    subline('Daten aus 10 Jahren sprechen eine andere Sprache'),
    visual([
      h('div', { style: { display: 'flex', gap: '16px', width: '100%' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px', gap: '14px',
          }
        },
          h('span', { style: { fontSize: '19px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'ERWARTUNG'),
          h('div', { style: { display: 'flex', width: '100%', height: '4px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '54px', fontWeight: 800, color: C.red, lineHeight: '1.1' } }, '-2%'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } },
            'ESG verliert jaehrlich gegenueber Standard-ETFs'
          ),
          h('div', {
            style: {
              display: 'flex', marginTop: '12px', padding: '12px 16px',
              backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '10px',
            }
          },
            h('span', { style: { fontSize: '21px', fontWeight: 600, color: C.red } }, 'Was viele denken')
          )
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '20px',
            padding: '28px', gap: '14px', border: '2px solid rgba(16,185,129,0.3)',
          }
        },
          h('span', { style: { fontSize: '19px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'REALITAET'),
          h('div', { style: { display: 'flex', width: '100%', height: '4px', backgroundColor: 'rgba(16,185,129,0.3)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '54px', fontWeight: 800, color: C.green, lineHeight: '1.1' } }, '~gleich'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } },
            'ESG performt aehnlich bis leicht besser (Morningstar)'
          ),
          h('div', {
            style: {
              display: 'flex', marginTop: '12px', padding: '12px 16px',
              backgroundColor: 'rgba(16,185,129,0.10)', borderRadius: '10px',
            }
          },
            h('span', { style: { fontSize: '21px', fontWeight: 600, color: C.green } }, 'Was die Daten zeigen')
          )
        )
      ),
      h('div', {
        style: {
          display: 'flex', marginTop: '24px', padding: '20px 28px',
          backgroundColor: C.cardBg, borderRadius: '16px', gap: '14px', alignItems: 'center',
        }
      },
        h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.green, flexShrink: 0 } }),
        h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } },
          'Morningstar: ESG-Fonds schnitten in 6 von 10 Jahren nicht schlechter ab'
        )
      )
    ]),
    keyLearning('EU-Taxonomie 2026 sorgt fuer mehr Transparenz - kein Greenwashing mehr', C.green),
    igHandle(),
  ]);

  // ─── SLIDE 5: 3 ESG-STRATEGIEN ───
  const strategies = [
    {
      num: '01', label: 'BEST-IN-CLASS',
      title: 'Beste der Klasse',
      desc: 'Jede Branche bleibt vertreten - nur die nachhaltigsten Unternehmen je Sektor werden aufgenommen.',
      color: C.green,
    },
    {
      num: '02', label: 'AUSSCHLUESSE',
      title: 'Exclusion-Prinzip',
      desc: 'Waffen, Tabak, Kohle und Gluecksspiel werden komplett aus dem Index ausgeschlossen.',
      color: C.text,
    },
    {
      num: '03', label: 'IMPACT',
      title: 'Wirkungsinvestment',
      desc: 'Kapital fliesst gezielt in erneuerbare Energien, Bildung und saubere Wasserversorgung.',
      color: 'rgba(255,200,60,1)',
    },
  ];

  const slide5 = slideRoot([
    topRow('SO FUNKTIONIERT ESG'),
    headline('3 Strategien im Ueberblick', 64),
    subline('Unterschiedliche Ansaetze - eine Richtung'),
    visual([
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '18px', width: '100%' } },
        ...strategies.map(s =>
          h('div', {
            style: {
              display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '20px',
              backgroundColor: C.cardBg, borderRadius: '20px', padding: '24px 28px',
            }
          },
            h('div', {
              style: {
                display: 'flex', minWidth: '52px', height: '52px', borderRadius: '14px',
                backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center',
              }
            },
              h('span', { style: { fontSize: '26px', fontWeight: 800, color: s.color } }, s.num)
            ),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
              h('span', { style: { fontSize: '19px', fontWeight: 700, letterSpacing: '2px', color: s.color } }, s.label),
              h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text, lineHeight: '1.2' } }, s.title),
              h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted, lineHeight: '1.45' } }, s.desc),
            )
          )
        )
      )
    ]),
    keyLearning('Die meisten ESG-ETFs kombinieren mehrere Strategien gleichzeitig'),
    igHandle(),
  ]);

  // ─── SLIDE 6: KONKRETE ETFs ───
  const etfs = [
    {
      name: 'iShares MSCI World ESG Screened',
      focus: 'Klassiker - 1.300 Unternehmen, Ausschluesse',
      ter: '0,20%', sfdr: 'Art. 8', color: C.green,
    },
    {
      name: 'iShares MSCI World SRI',
      focus: 'Strenger - nur Top 25% je Branche aufgenommen',
      ter: '0,20%', sfdr: 'Art. 8', color: C.text,
    },
    {
      name: 'Xtrackers MSCI World ESG Leaders',
      focus: 'Ausgewogen - beste ESG-Wertung je Sektor',
      ter: '0,19%', sfdr: 'Art. 8', color: 'rgba(255,200,60,1)',
    },
  ];

  const slide6 = slideRoot([
    topRow('DEIN EINSTIEG'),
    headline('3 ESG-ETFs fuer dein Depot', 62),
    subline('Alle unter 0,20% TER - so guenstig wie Standard-ETFs'),
    visual([
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '18px', width: '100%' } },
        ...etfs.map(e =>
          h('div', {
            style: {
              display: 'flex', flexDirection: 'column', gap: '10px',
              backgroundColor: C.cardBg, borderRadius: '20px', padding: '24px 28px',
            }
          },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              h('span', { style: { fontSize: '23px', fontWeight: 700, color: e.color, lineHeight: '1.3' } }, e.name),
              h('div', { style: { display: 'flex', gap: '10px', flexShrink: 0 } },
                h('span', {
                  style: {
                    fontSize: '20px', fontWeight: 700, color: C.bg,
                    backgroundColor: C.green, padding: '6px 14px', borderRadius: '8px',
                  }
                }, e.ter),
                h('span', {
                  style: {
                    fontSize: '20px', fontWeight: 700, color: C.textMuted,
                    backgroundColor: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '8px',
                  }
                }, e.sfdr),
              )
            ),
            h('div', { style: { display: 'flex', height: '2px', backgroundColor: C.border, borderRadius: '2px' } }),
            h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, e.focus),
          )
        )
      )
    ]),
    keyLearning('SFDR Art. 8 = hellgruen reguliert. Alle drei sind bei Trade Republic & Scalable besparbar.', C.green),
    igHandle(),
  ]);

  // ─── SLIDE 7: TAKEAWAYS ───
  const learnings = [
    { num: '01', text: 'ESG-ETFs erzielen aehnliche Renditen wie Standard-ETFs - der Renditeverlust-Mythos ist widerlegt', pct: 25 },
    { num: '02', text: 'Die Kosten (TER) sind mit 0,19-0,20% p.a. auf gleichem Niveau wie klassische ETFs', pct: 50 },
    { num: '03', text: 'EU-Taxonomie 2026 macht ESG-Produkte transparenter - Greenwashing wird regulatorisch unterbunden', pct: 75 },
    { num: '04', text: 'Einfacher Einstieg: ESG-ETF als 1:1-Ersatz fuer deinen MSCI World ist moeglich', pct: 100 },
  ];

  const slide7 = slideRoot([
    topRow('DEINE LEARNINGS'),
    headline('Was du jetzt weisst', 66),
    subline('4 Erkenntnisse ueber nachhaltige Geldanlage'),
    visual([
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' } },
        ...learnings.map(l =>
          h('div', {
            style: {
              display: 'flex', flexDirection: 'column', gap: '8px',
              padding: '18px 24px', backgroundColor: C.cardBg, borderRadius: '18px',
            }
          },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
              h('span', { style: { fontSize: '34px', fontWeight: 800, color: l.pct === 100 ? C.green : C.textMuted, minWidth: '54px' } }, l.num),
              h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.text, lineHeight: '1.35' } }, l.text),
            ),
            h('div', { style: { display: 'flex', height: '5px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
              h('div', { style: { display: 'flex', width: `${l.pct}%`, height: '5px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px' } }),
            )
          )
        )
      )
    ]),
    keyLearning('Nachhaltigkeit und Rendite schliessen sich nicht aus - dein Depot kann beides'),
    igHandle(),
  ]);

  // ─── SLIDE 8: CTA ───
  const slide8 = slideRoot([
    topRow('DEINE MEINUNG'),
    headline('Hast du schon einen ESG-ETF im Depot?', 54),
    subline('Schreib es in die Kommentare'),
    visual([
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '32px', flex: '1',
        }
      },
        h('img', { src: logoB64, width: 130, height: 130, style: { borderRadius: '22px', objectFit: 'cover' } }),
        h('div', { style: { display: 'flex', flexDirection: 'row', gap: '16px' } },
          h('div', {
            style: {
              display: 'flex', padding: '18px 28px', backgroundColor: 'rgba(16,185,129,0.15)',
              borderRadius: '16px', border: '2px solid rgba(16,185,129,0.3)',
            }
          },
            h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.green } }, 'Ja')
          ),
          h('div', {
            style: {
              display: 'flex', padding: '18px 28px', backgroundColor: C.cardBg,
              borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)',
            }
          },
            h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.textSoft } }, 'Noch nicht')
          ),
          h('div', {
            style: {
              display: 'flex', padding: '18px 28px', backgroundColor: C.cardBg,
              borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)',
            }
          },
            h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.textSoft } }, 'Nie')
          ),
        ),
        h('span', {
          style: {
            fontSize: '26px', fontWeight: 600, color: C.textMuted,
            textAlign: 'center', lineHeight: '1.5', maxWidth: '680px',
          }
        }, 'Speichern nicht vergessen wenn das Carousel hilfreich war'),
      )
    ]),
    keyLearning('Folge @benarofinanzen fuer taegliches Finanzwissen', C.green),
    igHandle(),
  ]);

  // ─── GENERATE ALL SLIDES ───
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} gespeichert: ${pngPath}`);
  }
  console.log('Alle Slides fertig!');
}

main().catch(e => { console.error(e); process.exit(1); });
