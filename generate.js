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

  const h = (type, props, ...ch) => ({
    type, props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')
  ).toString('base64');

  const TODAY = process.env.TODAY || new Date().toISOString().slice(0, 10);
  const outDir = path.join(__dirname, `output/carousel_${TODAY}/slides`);
  fs.mkdirSync(outDir, { recursive: true });

  // === REUSABLE COMPONENTS ===

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '16px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: C.cardBg,
          padding: '10px 22px', borderRadius: '12px',
          fontFamily: 'Outfit'
        }
      }, text)
    );
  }

  function headline(text, size = 64) {
    return h('span', {
      style: {
        fontSize: `${size}px`, fontWeight: 800,
        color: C.text, lineHeight: '1.08', letterSpacing: '-1.5px',
        marginBottom: '6px', fontFamily: 'Outfit'
      }
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500,
        color: C.textMuted, lineHeight: '1.5', marginTop: '8px',
        fontFamily: 'Outfit'
      }
    }, text);
  }

  function keyLearning(text, accent) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px',
        padding: '22px 28px', marginTop: 'auto'
      }
    },
      h('div', {
        style: {
          display: 'flex', width: '6px', minHeight: '40px',
          backgroundColor: accent || C.text, borderRadius: '3px'
        }
      }),
      h('span', {
        style: {
          fontSize: '28px', fontWeight: 600,
          color: C.text, lineHeight: '1.4', fontFamily: 'Outfit'
        }
      }, text)
    );
  }

  function slideRoot(children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column',
        width: W, height: H, padding: '70px',
        backgroundColor: C.bg, fontFamily: 'Outfit',
        position: 'relative'
      }
    }, ...children);
  }

  function logo() {
    return h('img', {
      src: logoB64,
      width: 100, height: 100,
      style: {
        position: 'absolute', top: '70px', right: '70px',
        borderRadius: '12px', objectFit: 'cover'
      }
    });
  }

  function igFooter() {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center',
        marginTop: '16px', paddingTop: '12px'
      }
    },
      h('span', {
        style: {
          fontSize: '24px', fontWeight: 500,
          color: C.textMuted, fontFamily: 'Outfit'
        }
      }, '@benarofinanzen')
    );
  }

  // === SLIDES ===

  // Slide 1 — Hook
  const slide1 = slideRoot([
    logo(),
    badge('WICHTIGE WARNUNG'),
    headline('67 % machen diesen\nVersicherungsfehler —\nkostet dich Tausende', 56),
    subline('Die 2 günstigsten Versicherungen werden am häufigsten unterschätzt.'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '18px'
      }
    },
      // Two big stat cards
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '20px',
            padding: '28px', gap: '10px',
            border: '1px solid rgba(239,68,68,0.3)'
          }
        },
          h('span', {
            style: {
              fontSize: '56px', fontWeight: 800, color: C.red,
              fontFamily: 'Outfit', lineHeight: '1'
            }
          }, '67 %'),
          h('span', {
            style: {
              fontSize: '26px', fontWeight: 600, color: C.textSoft,
              lineHeight: '1.3', fontFamily: 'Outfit'
            }
          }, 'ohne ausreichenden Haftpflicht-Schutz')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '20px',
            padding: '28px', gap: '10px',
            border: '1px solid rgba(239,68,68,0.3)'
          }
        },
          h('span', {
            style: {
              fontSize: '56px', fontWeight: 800, color: C.red,
              fontFamily: 'Outfit', lineHeight: '1'
            }
          }, '42 %'),
          h('span', {
            style: {
              fontSize: '26px', fontWeight: 600, color: C.textSoft,
              lineHeight: '1.3', fontFamily: 'Outfit'
            }
          }, 'haben keine oder zu geringe Hausratversicherung')
        )
      ),
      // Arrow indicator
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '14px',
          backgroundColor: 'rgba(239,68,68,0.08)',
          borderRadius: '14px', padding: '18px 24px'
        }
      },
        h('div', {
          style: {
            display: 'flex', width: '12px', height: '12px',
            borderRadius: '6px', backgroundColor: C.red
          }
        }),
        h('span', {
          style: {
            fontSize: '28px', fontWeight: 600, color: C.red,
            fontFamily: 'Outfit'
          }
        }, 'Wische weiter — du brauchst diese Info')
      )
    ),
    keyLearning('Haftpflicht + Hausrat sind Pflicht — für alle', C.red),
    igFooter()
  ]);

  // Slide 2 — Das Problem visualisiert (Schadensszenarien)
  const slide2 = slideRoot([
    logo(),
    badge('DAS PROBLEM'),
    headline('Ein Missgeschick\nkann dich ruinieren', 60),
    subline('Ohne die richtigen Versicherungen haftest du persönlich — unbegrenzt.'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '14px'
      }
    },
      ...[
        { icon: '!', label: 'Fahrradunfall', desc: 'Du verletzt jemanden — Behandlungskosten, Schmerzensgeld', cost: 'bis 50.000 EUR', color: C.red },
        { icon: '!', label: 'Wohnungsbrand', desc: 'Feuer greift auf Nachbarwohnung über', cost: 'bis 250.000 EUR', color: C.red },
        { icon: '!', label: 'Wasserschaden', desc: 'Waschmaschine läuft über, Etage darunter betroffen', cost: 'bis 30.000 EUR', color: C.red },
        { icon: '!', label: 'Einbruch / Diebstahl', desc: 'Laptop, TV, Schmuck — alles weg', cost: '5.000–20.000 EUR', color: 'rgba(239,68,68,0.7)' },
      ].map(item =>
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: '16px',
            backgroundColor: C.cardBg, borderRadius: '16px',
            padding: '18px 22px'
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '44px', height: '44px',
              borderRadius: '12px', backgroundColor: 'rgba(239,68,68,0.15)',
              alignItems: 'center', justifyContent: 'center', flexShrink: '0'
            }
          },
            h('span', {
              style: {
                fontSize: '22px', fontWeight: 800,
                color: C.red, fontFamily: 'Outfit'
              }
            }, item.icon)
          ),
          h('div', {
            style: { display: 'flex', flexDirection: 'column', flex: '1', gap: '4px' }
          },
            h('span', {
              style: { fontSize: '26px', fontWeight: 700, color: C.text, fontFamily: 'Outfit' }
            }, item.label),
            h('span', {
              style: { fontSize: '22px', fontWeight: 400, color: C.textMuted, fontFamily: 'Outfit' }
            }, item.desc)
          ),
          h('span', {
            style: {
              fontSize: '22px', fontWeight: 700, color: item.color,
              fontFamily: 'Outfit', textAlign: 'right'
            }
          }, item.cost)
        )
      )
    ),
    keyLearning('Jeder dieser Schäden ist real — und ohne Versicherung dein Problem.', C.red),
    igFooter()
  ]);

  // Slide 3 — Erwartung vs. Realität
  const slide3 = slideRoot([
    logo(),
    badge('WEIT VERBREITET'),
    headline('Was die meisten\ndenken — und was\nstimmt', 58),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '14px'
      }
    },
      h('div', { style: { display: 'flex', gap: '14px', flex: '1' } },
        // Left: Erwartung
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '20px',
            padding: '28px', gap: '14px'
          }
        },
          h('span', {
            style: {
              fontSize: '20px', fontWeight: 700, letterSpacing: '2px',
              color: C.textMuted, fontFamily: 'Outfit'
            }
          }, 'MYTHOS'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
          ...[
            '"Ich brauche das nicht"',
            '"Das zahlt die Krankenkasse"',
            '"Passiert mir nicht"',
            '"Zu teuer"',
          ].map(t =>
            h('div', {
              style: {
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px 0'
              }
            },
              h('div', {
                style: {
                  display: 'flex', width: '8px', height: '8px',
                  borderRadius: '4px', backgroundColor: C.red, flexShrink: '0'
                }
              }),
              h('span', {
                style: {
                  fontSize: '24px', fontWeight: 500, color: C.textSoft,
                  lineHeight: '1.3', fontFamily: 'Outfit'
                }
              }, t)
            )
          )
        ),
        // Right: Realität
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.text, borderRadius: '20px',
            padding: '28px', gap: '14px'
          }
        },
          h('span', {
            style: {
              fontSize: '20px', fontWeight: 700, letterSpacing: '2px',
              color: 'rgba(0,31,97,0.5)', fontFamily: 'Outfit'
            }
          }, 'REALITÄT'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(0,31,97,0.15)', borderRadius: '2px' } }),
          ...[
            'Haftpflicht ab 5 EUR/Monat',
            'KV zahlt NICHT bei Dritten',
            'Jeder 3. hat schon Schaden',
            'Günstigste Absicherung die es gibt',
          ].map(t =>
            h('div', {
              style: {
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px 0'
              }
            },
              h('div', {
                style: {
                  display: 'flex', width: '8px', height: '8px',
                  borderRadius: '4px', backgroundColor: C.green, flexShrink: '0'
                }
              }),
              h('span', {
                style: {
                  fontSize: '24px', fontWeight: 600, color: '#001F61',
                  lineHeight: '1.3', fontFamily: 'Outfit'
                }
              }, t)
            )
          )
        )
      )
    ),
    keyLearning('Haftpflicht kostet weniger als ein Kaffee pro Woche.'),
    igFooter()
  ]);

  // Slide 4 — Haftpflichtversicherung erklärt
  const slide4 = slideRoot([
    logo(),
    badge('HAFTPFLICHT'),
    headline('Was sie leistet —\nund was nicht', 62),
    subline('Die Haftpflicht schützt dich, wenn du anderen Schaden zufügst.'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '16px'
      }
    },
      // Green section — what's covered
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column',
          backgroundColor: 'rgba(16,185,129,0.08)',
          borderRadius: '18px', padding: '24px', gap: '10px',
          border: '1px solid rgba(16,185,129,0.25)'
        }
      },
        h('span', {
          style: {
            fontSize: '20px', fontWeight: 700, letterSpacing: '2px',
            color: C.green, fontFamily: 'Outfit'
          }
        }, 'VERSICHERT'),
        ...[
          'Personenschäden (Verletzungen Dritter)',
          'Sachschäden (beschädigte Gegenstände anderer)',
          'Vermögensschäden (Folgekosten)',
          'Mietsachschäden in der eigenen Wohnung',
        ].map(t =>
          h('div', {
            style: { display: 'flex', alignItems: 'center', gap: '12px' }
          },
            h('div', {
              style: {
                display: 'flex', width: '8px', height: '8px',
                borderRadius: '4px', backgroundColor: C.green, flexShrink: '0'
              }
            }),
            h('span', {
              style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, fontFamily: 'Outfit', lineHeight: '1.3' }
            }, t)
          )
        )
      ),
      // Red section — not covered
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column',
          backgroundColor: 'rgba(239,68,68,0.06)',
          borderRadius: '18px', padding: '20px', gap: '10px',
          border: '1px solid rgba(239,68,68,0.2)'
        }
      },
        h('span', {
          style: {
            fontSize: '20px', fontWeight: 700, letterSpacing: '2px',
            color: C.red, fontFamily: 'Outfit'
          }
        }, 'NICHT VERSICHERT'),
        h('div', { style: { display: 'flex', gap: '24px' } },
          ...[
            'Schäden an eigenen Sachen',
            'Vorsätzliche Handlungen',
          ].map(t =>
            h('div', {
              style: { display: 'flex', alignItems: 'center', gap: '10px', flex: '1' }
            },
              h('div', {
                style: {
                  display: 'flex', width: '8px', height: '8px',
                  borderRadius: '4px', backgroundColor: C.red, flexShrink: '0'
                }
              }),
              h('span', {
                style: { fontSize: '24px', fontWeight: 500, color: 'rgba(239,68,68,0.8)', fontFamily: 'Outfit', lineHeight: '1.3' }
              }, t)
            )
          )
        )
      ),
      // Cost indicator
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '20px', backgroundColor: C.cardBg, borderRadius: '16px',
          padding: '18px 28px'
        }
      },
        h('span', {
          style: { fontSize: '40px', fontWeight: 800, color: C.green, fontFamily: 'Outfit' }
        }, 'ab 5 EUR'),
        h('span', {
          style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' }
        }, '/ Monat — für alle Lebenslagen')
      )
    ),
    keyLearning('Unbegrenzte Deckungssumme schützt dein Vermögen lebenslang.'),
    igFooter()
  ]);

  // Slide 5 — Hausratversicherung erklärt
  const slide5 = slideRoot([
    logo(),
    badge('HAUSRAT'),
    headline('Was in deiner\nWohnung passiert,\nzahlt die Hausrat', 56),
    subline('Sie ersetzt deinen Hausstand bei Feuer, Einbruch, Wasserschaden.'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '14px'
      }
    },
      // Coverage grid
      h('div', { style: { display: 'flex', gap: '14px' } },
        ...[
          { icon: 'F', title: 'Feuer & Rauch', desc: 'Brand, Blitzschlag, Explosion' },
          { icon: 'E', title: 'Einbruch', desc: 'Diebstahl, Vandalismus' },
        ].map(item =>
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column',
              backgroundColor: C.cardBg, borderRadius: '18px',
              padding: '24px', gap: '10px'
            }
          },
            h('div', {
              style: {
                display: 'flex', width: '52px', height: '52px',
                borderRadius: '14px', backgroundColor: 'rgba(16,185,129,0.12)',
                alignItems: 'center', justifyContent: 'center'
              }
            },
              h('span', {
                style: { fontSize: '26px', fontWeight: 800, color: C.green, fontFamily: 'Outfit' }
              }, item.icon)
            ),
            h('span', {
              style: { fontSize: '26px', fontWeight: 700, color: C.text, fontFamily: 'Outfit' }
            }, item.title),
            h('span', {
              style: { fontSize: '22px', fontWeight: 400, color: C.textMuted, lineHeight: '1.4', fontFamily: 'Outfit' }
            }, item.desc)
          )
        )
      ),
      h('div', { style: { display: 'flex', gap: '14px' } },
        ...[
          { icon: 'W', title: 'Wasser', desc: 'Rohrbruch, Überschwemmung, Waschmaschine' },
          { icon: 'S', title: 'Sturm & Hagel', desc: 'Schäden ab Windstärke 8' },
        ].map(item =>
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column',
              backgroundColor: C.cardBg, borderRadius: '18px',
              padding: '24px', gap: '10px'
            }
          },
            h('div', {
              style: {
                display: 'flex', width: '52px', height: '52px',
                borderRadius: '14px', backgroundColor: 'rgba(16,185,129,0.12)',
                alignItems: 'center', justifyContent: 'center'
              }
            },
              h('span', {
                style: { fontSize: '26px', fontWeight: 800, color: C.green, fontFamily: 'Outfit' }
              }, item.icon)
            ),
            h('span', {
              style: { fontSize: '26px', fontWeight: 700, color: C.text, fontFamily: 'Outfit' }
            }, item.title),
            h('span', {
              style: { fontSize: '22px', fontWeight: 400, color: C.textMuted, lineHeight: '1.4', fontFamily: 'Outfit' }
            }, item.desc)
          )
        )
      ),
      // Stat
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '20px', backgroundColor: C.cardBg, borderRadius: '16px',
          padding: '18px 28px'
        }
      },
        h('span', {
          style: { fontSize: '38px', fontWeight: 800, color: C.green, fontFamily: 'Outfit' }
        }, 'ab 8 EUR'),
        h('span', {
          style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' }
        }, '/ Monat — für deine gesamte Wohnungseinrichtung')
      )
    ),
    keyLearning('Durchschnittlicher Hausrat-Schaden: 3.200 EUR — die Prämie: 96 EUR/Jahr.'),
    igFooter()
  ]);

  // Slide 6 — Was viele nicht wissen (Extras)
  const slide6 = slideRoot([
    logo(),
    badge('DAS WISSEN NUR WENIGE'),
    headline('5 Extras die\nin guten Verträgen\nstecken', 58),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '12px'
      }
    },
      ...[
        { num: '01', text: 'Schlüsselverlust — Aufsperrdienst + Schlossaustausch versichert', pct: 20 },
        { num: '02', text: 'Gefälligkeit — du hilfst beim Umzug und brichst was: Haftpflicht zahlt', pct: 40 },
        { num: '03', text: 'Fahrraddiebstahl — mit Zusatzbaustein über Hausrat absicherbar', pct: 60 },
        { num: '04', text: 'Glasbruch — Fensterscheiben, Cerankochfeld, Aquarien inklusive', pct: 80 },
        { num: '05', text: 'Elementarschäden — Hochwasser, Erdrutsch als erweiterter Schutz', pct: 100 },
      ].map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '8px',
            padding: '18px 22px', backgroundColor: C.cardBg, borderRadius: '16px'
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
            h('span', {
              style: {
                fontSize: '32px', fontWeight: 800,
                color: l.pct === 100 ? C.green : C.text,
                minWidth: '52px', fontFamily: 'Outfit'
              }
            }, l.num),
            h('span', {
              style: {
                fontSize: '24px', fontWeight: 600, color: C.text,
                lineHeight: '1.3', fontFamily: 'Outfit'
              }
            }, l.text)
          ),
          h('div', {
            style: {
              display: 'flex', height: '5px', backgroundColor: C.border,
              borderRadius: '3px', overflow: 'hidden'
            }
          },
            h('div', {
              style: {
                display: 'flex', width: `${l.pct}%`, height: '5px',
                backgroundColor: l.pct === 100 ? C.green : C.text,
                borderRadius: '3px'
              }
            })
          )
        )
      )
    ),
    keyLearning('Ein guter Vertrag schützt mehr als du denkst — prüf deine Police!'),
    igFooter()
  ]);

  // Slide 7 — Dein 3-Schritte-Plan
  const slide7 = slideRoot([
    logo(),
    badge('DEIN PLAN'),
    headline('So checkst du\ndeine Absicherung\nin 10 Minuten', 56),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '16px'
      }
    },
      ...[
        {
          num: '1',
          title: 'Verträge prüfen',
          desc: 'Hast du Haftpflicht + Hausrat? Falls nein — sofort abschließen. Falls ja — weiter zu Schritt 2.',
          color: C.red
        },
        {
          num: '2',
          title: 'Deckungssummen checken',
          desc: 'Haftpflicht: mindestens 10 Mio. EUR. Hausrat: Wert deiner Einrichtung korrekt angeben.',
          color: C.text
        },
        {
          num: '3',
          title: 'Jährlich vergleichen',
          desc: 'Günstigere Angebote prüfen — gleiche Leistung, 20–40 % weniger Prämie ist realistisch.',
          color: C.green
        },
      ].map(step =>
        h('div', {
          style: {
            display: 'flex', gap: '18px', alignItems: 'flex-start',
            backgroundColor: C.cardBg, borderRadius: '18px', padding: '22px 24px'
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '52px', height: '52px',
              borderRadius: '14px', backgroundColor: 'rgba(255,255,255,0.08)',
              alignItems: 'center', justifyContent: 'center', flexShrink: '0'
            }
          },
            h('span', {
              style: {
                fontSize: '28px', fontWeight: 800,
                color: step.color, fontFamily: 'Outfit'
              }
            }, step.num)
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
            h('span', {
              style: { fontSize: '28px', fontWeight: 700, color: C.text, fontFamily: 'Outfit' }
            }, step.title),
            h('span', {
              style: { fontSize: '22px', fontWeight: 400, color: C.textMuted, lineHeight: '1.4', fontFamily: 'Outfit' }
            }, step.desc)
          )
        )
      )
    ),
    keyLearning('Zusammen kosten Haftpflicht + Hausrat oft weniger als 20 EUR/Monat.', C.green),
    igFooter()
  ]);

  // Slide 8 — CTA
  const slide8 = slideRoot([
    h('div', {
      style: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', flex: '1', gap: '28px', textAlign: 'center'
      }
    },
      // Logo centered
      h('img', {
        src: logoB64, width: 120, height: 120,
        style: { borderRadius: '24px', objectFit: 'cover' }
      }),
      h('span', {
        style: {
          fontSize: '62px', fontWeight: 800, color: C.text,
          lineHeight: '1.1', letterSpacing: '-1.5px', fontFamily: 'Outfit',
          textAlign: 'center'
        }
      }, 'Hast du beide\nVersicherungen\nbereits optimiert?'),
      h('span', {
        style: {
          fontSize: '30px', fontWeight: 500, color: C.textMuted,
          lineHeight: '1.5', fontFamily: 'Outfit', textAlign: 'center'
        }
      }, 'Schreib "JA" oder "NEIN" in die Kommentare — wir helfen dir weiter.'),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'
        }
      },
        h('span', {
          style: { fontSize: '28px', fontWeight: 600, color: C.green, fontFamily: 'Outfit' }
        }, 'Speichern nicht vergessen'),
        h('span', {
          style: {
            fontSize: '24px', fontWeight: 500, color: C.textMuted,
            fontFamily: 'Outfit'
          }
        }, '@benarofinanzen')
      )
    )
  ]);

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} done: ${pngPath}`);
  }
  console.log('All slides generated!');
}

main().catch(e => { console.error(e); process.exit(1); });
