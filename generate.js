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
  };

  const W = 1080, H = 1350;

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')
  ).toString('base64');

  const h = (type, props, ...ch) => ({
    type,
    props: {
      ...props,
      children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch
    }
  });

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '16px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: C.cardBg, padding: '10px 22px', borderRadius: '12px'
        }
      }, text)
    );
  }

  function headline(text, size) {
    return h('span', {
      style: {
        fontSize: `${size || 64}px`, fontWeight: 800, color: C.text,
        lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '6px'
      }
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500, color: C.textMuted,
        lineHeight: '1.5', marginTop: '8px'
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
        style: { fontSize: '28px', fontWeight: 600, color: C.text, lineHeight: '1.4' }
      }, text)
    );
  }

  function header() {
    return h('div', {
      style: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '32px'
      }
    },
      h('div', { style: { display: 'flex' } }),
      h('img', {
        src: logoB64,
        width: 120,
        height: 120,
        style: { borderRadius: '12px', objectFit: 'cover' }
      })
    );
  }

  function footer() {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'flex-end', marginTop: '14px'
      }
    },
      h('span', {
        style: { fontSize: '24px', fontWeight: 500, color: C.textMuted }
      }, '@benarofinanzen')
    );
  }

  function slideWrap(...children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column',
        width: W, height: H, padding: '70px',
        backgroundColor: C.bg, fontFamily: 'Outfit'
      }
    }, ...children);
  }

  // ============================================================
  // SLIDE 1 — Hook
  // ============================================================
  const slide1 = slideWrap(
    header(),
    badge('JETZT AUFPASSEN'),
    headline('Dein Weihnachtsgeld: weg in 3 Monaten?', 56),
    subline('68 % der Deutschen haben es bis März ausgegeben'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '24px'
      }
    },
      h('div', {
        style: {
          display: 'flex', gap: '24px', alignItems: 'flex-end',
          justifyContent: 'center'
        }
      },
        h('div', {
          style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }
        },
          h('div', {
            style: {
              display: 'flex', width: '200px', height: '220px',
              backgroundColor: C.green, borderRadius: '16px',
              alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: '8px'
            }
          },
            h('span', { style: { fontSize: '52px', fontWeight: 800, color: '#FFFFFF' } }, '1.200'),
            h('span', { style: { fontSize: '28px', fontWeight: 600, color: 'rgba(255,255,255,0.8)' } }, 'EUR')
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.textSoft } }, 'November')
        ),
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            paddingBottom: '60px', gap: '4px'
          }
        },
          h('div', { style: { display: 'flex', width: '4px', height: '60px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('div', {
            style: {
              display: 'flex', width: '0px', height: '0px',
              borderLeft: '10px solid transparent', borderRight: '10px solid transparent',
              borderTop: `12px solid ${C.border}`
            }
          })
        ),
        h('div', {
          style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }
        },
          h('div', {
            style: {
              display: 'flex', width: '200px', height: '150px',
              backgroundColor: 'rgba(239,68,68,0.25)', borderRadius: '16px',
              alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: '8px',
              border: `2px solid ${C.red}`
            }
          },
            h('span', { style: { fontSize: '52px', fontWeight: 800, color: C.red } }, '0'),
            h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.red } }, 'EUR')
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.textMuted } }, 'Februar')
        )
      ),
      h('span', {
        style: {
          fontSize: '26px', fontWeight: 500, color: C.textMuted,
          textAlign: 'center', lineHeight: '1.4'
        }
      }, 'Kluge Anleger machen das anders.')
    ),
    keyLearning('Lies diese 8 Slides — bevor du deinen Bonus ausgibst.'),
    footer()
  );

  // ============================================================
  // SLIDE 2 — Statistik / Kontext
  // ============================================================
  const slide2 = slideWrap(
    header(),
    badge('DIE REALITÄT'),
    headline('Was Deutschland mit 1.200 EUR macht', 54),
    subline('Das größte Finanzversagen des Jahres'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '16px'
      }
    },
      ...[
        { label: 'Konsum und Geschenke', pct: 54, color: C.red },
        { label: 'Urlaub und Reisen', pct: 23, color: 'rgba(239,68,68,0.6)' },
        { label: 'Tagesgeld / Sparen', pct: 14, color: C.textMuted },
        { label: 'ETF / Aktien investieren', pct: 9, color: C.green },
      ].map(item =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '8px',
            backgroundColor: C.cardBg, borderRadius: '16px', padding: '20px 24px'
          }
        },
          h('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
          },
            h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft } }, item.label),
            h('span', { style: { fontSize: '28px', fontWeight: 800, color: item.color } }, `${item.pct} %`)
          ),
          h('div', {
            style: {
              display: 'flex', height: '8px', backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '4px', overflow: 'hidden'
            }
          },
            h('div', {
              style: {
                display: 'flex', width: `${item.pct}%`, height: '8px',
                backgroundColor: item.color, borderRadius: '4px'
              }
            })
          )
        )
      )
    ),
    keyLearning('Nur 9 % investieren — der Rest verliert Kaufkraft durch Inflation.'),
    footer()
  );

  // ============================================================
  // SLIDE 3 — Die 3 Fehler
  // ============================================================
  const slide3 = slideWrap(
    header(),
    badge('DIE 3 FEHLER'),
    headline('So vernichtest du Kapital — jedes Jahr', 52),
    subline('Diese Muster sehen wir immer wieder'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '18px'
      }
    },
      ...[
        { num: '01', title: 'Alles sofort ausgeben', desc: 'Weihnachtsgeschenke, Urlaub, neue Technik — weg ist weg' },
        { num: '02', title: 'Aufs Girokonto parken', desc: '0 % Zinsen, Inflation frisst den Wert auf — stille Vernichtung' },
        { num: '03', title: 'Warten auf den richtigen Moment', desc: 'Den gibt es nicht — jeder Monat ohne Investment kostet Rendite' },
      ].map(item =>
        h('div', {
          style: {
            display: 'flex', alignItems: 'flex-start', gap: '20px',
            backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '18px',
            padding: '24px 28px', border: '1px solid rgba(239,68,68,0.2)'
          }
        },
          h('span', {
            style: { fontSize: '40px', fontWeight: 800, color: C.red, minWidth: '60px', lineHeight: '1' }
          }, item.num),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
            h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, item.title),
            h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, item.desc)
          )
        )
      )
    ),
    keyLearning('Erkennst du dich? Dann lies weiter — es gibt einen besseren Weg.', C.red),
    footer()
  );

  // ============================================================
  // SLIDE 4 — Erwartung vs. Realität
  // ============================================================
  const slide4 = slideWrap(
    header(),
    badge('DER WENDEPUNKT'),
    headline('Was kluge Anleger anders machen', 56),
    subline('Erwartung vs. Realität beim Weihnachtsgeld'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '18px'
      }
    },
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '20px',
            padding: '28px', gap: '14px', border: `1px solid ${C.red}`
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'DIE MEISTEN'),
          h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: 'rgba(239,68,68,0.3)', borderRadius: '1px' } }),
          ...[
            'Ausgeben und geniessen',
            'Auf Girokonto lassen',
            'Nachstes Jahr anfangen',
          ].map(t =>
            h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
              h('div', {
                style: { display: 'flex', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: C.red, flexShrink: 0 }
              }),
              h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, lineHeight: '1.3' } }, t)
            )
          )
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '20px',
            padding: '28px', gap: '14px', border: `1px solid ${C.green}`
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'KLUGE ANLEGER'),
          h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: 'rgba(16,185,129,0.3)', borderRadius: '1px' } }),
          ...[
            'Notgroschen aufstocken',
            'Schulden tilgen',
            'Rest in ETF investieren',
          ].map(t =>
            h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
              h('div', {
                style: { display: 'flex', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: C.green, flexShrink: 0 }
              }),
              h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, lineHeight: '1.3' } }, t)
            )
          )
        )
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '12px',
          backgroundColor: 'rgba(16,185,129,0.08)', borderRadius: '14px', padding: '18px 24px'
        }
      },
        h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: C.green } }),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, 'Die Reihenfolge entscheidet über Vermögen oder Konsum.')
      )
    ),
    keyLearning('Notgroschen, Schulden, Investment — immer in dieser Reihenfolge.'),
    footer()
  );

  // ============================================================
  // SLIDE 5 — Die 3 Schritte konkret
  // ============================================================
  const slide5 = slideWrap(
    header(),
    badge('DER PLAN'),
    headline('Dein Weihnachtsgeld in 3 Schritten', 54),
    subline('Konkrete Aufteilung für 1.200 EUR Bonus'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '16px'
      }
    },
      ...[
        {
          step: '1', title: 'Notgroschen: 300 EUR',
          desc: 'Falls deine Reserve unter 3 Monatsgehälter liegt — zuerst auffüllen.',
          color: C.textMuted, pct: 25
        },
        {
          step: '2', title: 'Schulden tilgen: 500 EUR',
          desc: 'Dispozinsen ca. 13 %, Ratenkredite ca. 6 % — Schuldenfreiheit schlägt alles.',
          color: C.green, pct: 42
        },
        {
          step: '3', title: 'ETF-Einmalanlage: 400 EUR',
          desc: 'MSCI World oder FTSE All-World — sofort kaufen, nicht auf den richtigen Moment warten.',
          color: C.green, pct: 33
        },
      ].map(item =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px',
            backgroundColor: C.cardBg, borderRadius: '18px', padding: '22px 28px'
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
            h('span', {
              style: { fontSize: '40px', fontWeight: 800, color: item.color, minWidth: '50px' }
            }, `0${item.step}`),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', flex: '1' } },
              h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, item.title),
              h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted, lineHeight: '1.3' } }, item.desc)
            )
          ),
          h('div', {
            style: {
              display: 'flex', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '3px', overflow: 'hidden'
            }
          },
            h('div', {
              style: {
                display: 'flex', width: `${item.pct}%`, height: '6px',
                backgroundColor: item.color, borderRadius: '3px'
              }
            })
          )
        )
      )
    ),
    keyLearning('Schritt 1 vor Schritt 2 — immer. Schulden abbauen ist risikofreie Rendite.'),
    footer()
  );

  // ============================================================
  // SLIDE 6 — Zinseszins
  // ============================================================
  const slide6 = slideWrap(
    header(),
    badge('DER ZINSESZINS'),
    headline('400 EUR heute — was wäre es in 10 Jahren?', 50),
    subline('Bei 7 % durchschnittlicher ETF-Rendite pro Jahr'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '20px'
      }
    },
      (() => {
        const pts = [428, 458, 490, 524, 561, 600, 642, 687, 735, 787];
        const chartW = 880, chartH = 260;
        const minV = 380, maxV = 820;
        const toX = (i) => 30 + (i / (pts.length - 1)) * (chartW - 60);
        const toY = (v) => chartH - 10 - ((v - minV) / (maxV - minV)) * (chartH - 30);
        const pathD = pts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ');
        const fillD = `${pathD} L ${toX(pts.length - 1)} ${chartH} L ${toX(0)} ${chartH} Z`;
        const svg = `<svg width="${chartW}" height="${chartH}" viewBox="0 0 ${chartW} ${chartH}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#10B981" stop-opacity="0.4"/>
              <stop offset="100%" stop-color="#10B981" stop-opacity="0.02"/>
            </linearGradient>
          </defs>
          <path d="${fillD}" fill="url(#g1)"/>
          <path d="${pathD}" stroke="#10B981" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
          <circle cx="${toX(0)}" cy="${toY(pts[0])}" r="6" fill="#10B981"/>
          <circle cx="${toX(pts.length-1)}" cy="${toY(pts[pts.length-1])}" r="8" fill="#10B981"/>
        </svg>`;
        const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
        return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
          h('img', { src, width: chartW, height: chartH, style: { objectFit: 'contain' } }),
          h('div', {
            style: { display: 'flex', justifyContent: 'space-between', paddingLeft: '30px', paddingRight: '30px' }
          },
            h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textMuted } }, 'Heute: 400 EUR'),
            h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.green } }, 'In 10 Jahren: 787 EUR')
          )
        );
      })(),
      h('div', {
        style: {
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: '20px', backgroundColor: 'rgba(16,185,129,0.1)',
          borderRadius: '18px', padding: '24px 32px'
        }
      },
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
          h('span', { style: { fontSize: '68px', fontWeight: 800, color: C.green } }, '+97 %'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, 'Rendite nach 10 Jahren')
        ),
        h('div', { style: { display: 'flex', width: '2px', height: '80px', backgroundColor: C.border } }),
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
          h('span', { style: { fontSize: '68px', fontWeight: 800, color: C.textMuted } }, '0 %'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, 'auf dem Girokonto')
        )
      )
    ),
    keyLearning('Wer 400 EUR investiert, hat in 10 Jahren fast 800 EUR — ohne weiteres Zutun.'),
    footer()
  );

  // ============================================================
  // SLIDE 7 — Takeaways
  // ============================================================
  const slide7 = slideWrap(
    header(),
    badge('DEINE TAKEAWAYS'),
    headline('3 Regeln für dein Weihnachtsgeld', 56),
    subline('Merk dir diese Reihenfolge — sie funktioniert immer'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '18px'
      }
    },
      ...[
        { num: '01', text: 'Notgroschen zuerst — 3 Monatsgehälter auf dem Tagesgeldkonto', pct: 33 },
        { num: '02', text: 'Hochzinsschulden tilgen — jeder getilgte Kredit ist risikofreie Rendite', pct: 66 },
        { num: '03', text: 'Rest sofort investieren — ETF-Einmalanlage, heute, nicht morgen', pct: 100 },
      ].map(item =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '12px',
            backgroundColor: C.cardBg, borderRadius: '18px', padding: '24px 28px'
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', {
              style: {
                fontSize: '40px', fontWeight: 800,
                color: item.pct === 100 ? C.green : C.text, minWidth: '60px'
              }
            }, item.num),
            h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.text, lineHeight: '1.3' } }, item.text)
          ),
          h('div', {
            style: {
              display: 'flex', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '3px', overflow: 'hidden'
            }
          },
            h('div', {
              style: {
                display: 'flex', width: `${item.pct}%`, height: '6px',
                backgroundColor: item.pct === 100 ? C.green : C.text, borderRadius: '3px'
              }
            })
          )
        )
      )
    ),
    keyLearning('Wer diese Reihenfolge einhält, baut jedes Jahr mehr Vermögen auf.', C.green),
    footer()
  );

  // ============================================================
  // SLIDE 8 — CTA
  // ============================================================
  const slide8 = slideWrap(
    header(),
    badge('JETZT HANDELN'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '32px'
      }
    },
      h('span', {
        style: {
          fontSize: '56px', fontWeight: 800, color: C.text,
          textAlign: 'center', lineHeight: '1.15', letterSpacing: '-1px'
        }
      }, 'Wie planst du dein Weihnachtsgeld 2026?'),
      h('span', {
        style: {
          fontSize: '30px', fontWeight: 500, color: C.textMuted,
          textAlign: 'center', lineHeight: '1.5'
        }
      }, 'Schreib es in die Kommentare — wir helfen dir bei der Umsetzung.'),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
          backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px 48px'
        }
      },
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, 'Speichern nicht vergessen'),
        h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted } }, 'Diesen Post brauchst du im November')
      )
    ),
    keyLearning('Folge @benarofinanzen für tägliche Finanztipps.', C.green),
    footer()
  );

  // ============================================================
  // RENDER ALL SLIDES
  // ============================================================
  const todayStr = require('child_process').execSync('date +%Y-%m-%d').toString().trim();
  const outDir = path.join(__dirname, 'output', `carousel_${todayStr}`, 'slides');
  fs.mkdirSync(outDir, { recursive: true });

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} fertig: ${pngPath}`);
  }
  console.log('Alle Slides generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
