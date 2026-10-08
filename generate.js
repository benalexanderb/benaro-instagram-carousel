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
    bg: '#001f60',
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

  const logoPath = path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg');
  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(logoPath).toString('base64');

  // ============ REUSABLE COMPONENTS ============

  function badgePill(text) {
    return h('span', {
      style: {
        display: 'flex',
        fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
        color: C.text, backgroundColor: C.cardBg,
        padding: '10px 22px', borderRadius: '12px',
      }
    }, text);
  }

  function slideHeader(badgeText) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: '20px',
      }
    },
      badgePill(badgeText),
      h('img', { src: logoB64, width: 120, height: 120, style: { borderRadius: '12px', objectFit: 'cover' } })
    );
  }

  function headline(text, size) {
    size = size || 64;
    return h('span', {
      style: {
        fontSize: `${size}px`, fontWeight: 800,
        color: C.text, lineHeight: '1.08',
        letterSpacing: '-1.5px', marginBottom: '6px',
      }
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500,
        color: C.textMuted, lineHeight: '1.5',
        marginTop: '4px', marginBottom: '8px',
      }
    }, text);
  }

  function keyLearning(text, accentColor) {
    var accent = accentColor || C.text;
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px',
        padding: '22px 28px', marginTop: 'auto',
      }
    },
      h('div', {
        style: {
          display: 'flex', width: '6px', minHeight: '40px',
          backgroundColor: accent, borderRadius: '3px', flexShrink: 0,
        }
      }),
      h('span', {
        style: {
          fontSize: '26px', fontWeight: 600,
          color: C.text, lineHeight: '1.4', flex: '1',
        }
      }, text)
    );
  }

  function igHandle() {
    return h('div', { style: { display: 'flex', marginTop: '16px' } },
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, '@benarofinanzen')
    );
  }

  function slideRoot() {
    var children = Array.prototype.slice.call(arguments);
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column',
        width: W, height: H, padding: '70px',
        backgroundColor: C.bg, fontFamily: 'Outfit',
      }
    }, ...children);
  }

  // ============ SLIDE 1: Hook ============
  var slide1 = slideRoot(
    slideHeader('GROSSER IRRTUM'),
    headline('Dein Gehalt macht dich nicht reich', 66),
    subline('Das glauben noch 73 % der Deutschen'),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }
    },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
          backgroundColor: C.cardBg, borderRadius: '28px', padding: '44px 60px', width: '100%',
        }
      },
        h('span', {
          style: { fontSize: '148px', fontWeight: 800, color: C.green, lineHeight: '1.0', letterSpacing: '-4px' }
        }, '73%'),
        h('span', {
          style: { fontSize: '28px', fontWeight: 600, color: C.textSoft, textAlign: 'center', lineHeight: '1.5' }
        }, 'der Deutschen glauben: mehr Gehalt löst ihre Geldprobleme')
      ),
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '16px', width: '100%' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', gap: '10px',
            backgroundColor: C.cardBg, borderRadius: '18px', padding: '22px 20px',
          }
        },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.red } }, 'X'),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textSoft, textAlign: 'center' } }, 'Hohe Ausgaben')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', gap: '10px',
            backgroundColor: C.cardBg, borderRadius: '18px', padding: '22px 20px',
          }
        },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.red } }, 'X'),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textSoft, textAlign: 'center' } }, 'Kein Plan')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', gap: '10px',
            backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '18px', padding: '22px 20px',
            border: '1px solid rgba(16,185,129,0.30)',
          }
        },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.green } }, 'OK'),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.green, textAlign: 'center' } }, 'Investieren')
        )
      )
    ),
    keyLearning('Vermögen entsteht nicht durch verdienen — sondern durch investieren.'),
    igHandle()
  );

  // ============ SLIDE 2: Wo bleibt dein Gehalt ============
  var slide2 = slideRoot(
    slideHeader('DIE ZAHLEN'),
    headline('Wo dein Gehalt wirklich bleibt', 58),
    subline('Von 100 EUR Bruttolohn — was bleibt dir?'),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' }
    },
      // Row 1: Bruttolohn
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.textSoft } }, 'Bruttolohn'),
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.text } }, '100 %')
        ),
        h('div', { style: { display: 'flex', height: '22px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' } },
          h('div', { style: { display: 'flex', width: '100%', height: '22px', backgroundColor: 'rgba(255,255,255,0.40)', borderRadius: '6px' } })
        )
      ),
      // Row 2: Steuern -40%
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.textMuted } }, 'Steuern + Sozialabgaben'),
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.red } }, '- 40 %')
        ),
        h('div', { style: { display: 'flex', height: '22px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '6px', overflow: 'hidden' } },
          h('div', { style: { display: 'flex', width: '40%', height: '22px', backgroundColor: 'rgba(239,68,68,0.65)', borderRadius: '6px' } })
        )
      ),
      // Row 3: Fixkosten -35%
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.textMuted } }, 'Fixkosten (Miete, Auto...)'),
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.red } }, '- 35 %')
        ),
        h('div', { style: { display: 'flex', height: '22px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '6px', overflow: 'hidden' } },
          h('div', { style: { display: 'flex', width: '35%', height: '22px', backgroundColor: 'rgba(239,68,68,0.45)', borderRadius: '6px' } })
        )
      ),
      // Row 4: Konsum -12%
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.textMuted } }, 'Alltag + Konsum'),
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.red } }, '- 12 %')
        ),
        h('div', { style: { display: 'flex', height: '22px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '6px', overflow: 'hidden' } },
          h('div', { style: { display: 'flex', width: '12%', height: '22px', backgroundColor: 'rgba(239,68,68,0.30)', borderRadius: '6px' } })
        )
      ),
      // Result
      h('div', {
        style: {
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '16px',
          padding: '20px 28px', border: '1px solid rgba(16,185,129,0.35)',
        }
      },
        h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.textSoft } }, 'Frei verfügbar'),
        h('span', { style: { fontSize: '52px', fontWeight: 800, color: C.green } }, '13 %')
      )
    ),
    keyLearning('Nur 13 % des Bruttolohns können die meisten Deutschen wirklich anlegen.'),
    igHandle()
  );

  // ============ SLIDE 3: Sparen allein reicht nicht ============
  var slide3 = slideRoot(
    slideHeader('DAS PROBLEM'),
    headline('Sparen allein reicht nicht aus', 60),
    subline('Was aus 100 EUR wird — je nach Entscheidung'),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' }
    },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          backgroundColor: 'rgba(239,68,68,0.10)', borderRadius: '18px', padding: '24px 28px',
          gap: '20px', border: '1px solid rgba(239,68,68,0.25)',
        }
      },
        h('div', {
          style: {
            display: 'flex', width: '60px', height: '60px', borderRadius: '14px',
            backgroundColor: 'rgba(239,68,68,0.20)', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }
        },
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.red } }, '1')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', flex: '1', gap: '4px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Sparbuch / Girokonto'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, '0,1 % Zinsen | Inflation: 2,8 %')
        ),
        h('span', { style: { fontSize: '34px', fontWeight: 800, color: C.red, flexShrink: 0 } }, '-2,7 %')
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          backgroundColor: C.cardBg, borderRadius: '18px', padding: '24px 28px', gap: '20px',
        }
      },
        h('div', {
          style: {
            display: 'flex', width: '60px', height: '60px', borderRadius: '14px',
            backgroundColor: C.cardBg, alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }
        },
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.textSoft } }, '2')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', flex: '1', gap: '4px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Tagesgeldkonto'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, '4,25 % Zinsen | Inflation: 2,8 %')
        ),
        h('span', { style: { fontSize: '34px', fontWeight: 800, color: C.textSoft, flexShrink: 0 } }, '+1,5 %')
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '18px', padding: '24px 28px',
          gap: '20px', border: '1px solid rgba(16,185,129,0.30)',
        }
      },
        h('div', {
          style: {
            display: 'flex', width: '60px', height: '60px', borderRadius: '14px',
            backgroundColor: 'rgba(16,185,129,0.20)', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }
        },
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.green } }, '3')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', flex: '1', gap: '4px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Welt-ETF Sparplan'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'ca. 7 % p.a. historisch')
        ),
        h('span', { style: { fontSize: '34px', fontWeight: 800, color: C.green, flexShrink: 0 } }, '+5,2 %')
      )
    ),
    keyLearning('Wer spart, aber nicht investiert, verliert durch Inflation real an Kaufkraft.'),
    igHandle()
  );

  // ============ SLIDE 4: Erwartung vs. Realität ============
  var slide4 = slideRoot(
    slideHeader('DER VERGLEICH'),
    headline('Gleicher Betrag — riesiger Unterschied', 54),
    subline('100 EUR pro Monat über 30 Jahre'),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'row', gap: '16px', alignItems: 'stretch' }
    },
      h('div', {
        style: {
          display: 'flex', flex: '1', flexDirection: 'column',
          backgroundColor: C.cardBg, borderRadius: '22px', padding: '30px 24px', gap: '14px',
        }
      },
        h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'SPARBUCH'),
        h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, lineHeight: '1.5' } },
          '100 EUR/Monat auf das Konto legen und warten'),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' } },
          h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted } }, 'Nach 30 Jahren:'),
          h('span', { style: { fontSize: '50px', fontWeight: 800, color: C.red, letterSpacing: '-1px' } }, '36.500'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'EUR (nur Einzahlungen)'),
          h('div', {
            style: {
              display: 'flex', backgroundColor: 'rgba(239,68,68,0.12)',
              borderRadius: '10px', padding: '10px 14px', marginTop: '8px',
            }
          },
            h('span', { style: { fontSize: '18px', fontWeight: 600, color: 'rgba(239,68,68,0.85)' } },
              'Real nach Inflation: ca. 26.000 EUR')
          )
        )
      ),
      h('div', {
        style: {
          display: 'flex', flex: '1', flexDirection: 'column',
          backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '22px',
          padding: '30px 24px', gap: '14px', border: '1px solid rgba(16,185,129,0.35)',
        }
      },
        h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'ETF-SPARPLAN'),
        h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(16,185,129,0.4)', borderRadius: '2px' } }),
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, lineHeight: '1.5' } },
          '100 EUR/Monat automatisch in Welt-ETF investieren'),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' } },
          h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textSoft } }, 'Nach 30 Jahren:'),
          h('span', { style: { fontSize: '50px', fontWeight: 800, color: C.green, letterSpacing: '-1px' } }, '113.000'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'EUR (bei 7 % p.a.)'),
          h('div', {
            style: {
              display: 'flex', backgroundColor: 'rgba(16,185,129,0.15)',
              borderRadius: '10px', padding: '10px 14px', marginTop: '8px',
            }
          },
            h('span', { style: { fontSize: '18px', fontWeight: 600, color: C.green } },
              'Real nach Inflation: ca. 82.000 EUR')
          )
        )
      )
    ),
    keyLearning('Investieren schlägt Sparen — auch bei gleichem monatlichen Betrag.'),
    igHandle()
  );

  // ============ SLIDE 5: 3-Stufen-Plan ============
  var slide5 = slideRoot(
    slideHeader('DER PLAN'),
    headline('3 Schritte zum ersten Vermögen', 58),
    subline('Diese Reihenfolge ist entscheidend — kein Schritt überspringen'),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' }
    },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', alignItems: 'flex-start',
          gap: '20px', backgroundColor: C.cardBg, borderRadius: '18px', padding: '26px 28px',
        }
      },
        h('div', {
          style: {
            display: 'flex', width: '56px', height: '56px', borderRadius: '14px',
            backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }
        },
          h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.text } }, '01')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Ausgaben analysieren'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } },
            'Finde 10–15 % deiner Fixkosten, die du streichen kannst')
        )
      ),
      h('div', { style: { display: 'flex', paddingLeft: '42px' } },
        h('div', { style: { display: 'flex', width: '4px', height: '22px', backgroundColor: C.border, borderRadius: '2px' } })
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', alignItems: 'flex-start',
          gap: '20px', backgroundColor: C.cardBg, borderRadius: '18px', padding: '26px 28px',
        }
      },
        h('div', {
          style: {
            display: 'flex', width: '56px', height: '56px', borderRadius: '14px',
            backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }
        },
          h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.text } }, '02')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Notgroschen aufbauen'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } },
            'Ziel: 3 Monatsausgaben auf einem Tagesgeldkonto')
        )
      ),
      h('div', { style: { display: 'flex', paddingLeft: '42px' } },
        h('div', { style: { display: 'flex', width: '4px', height: '22px', backgroundColor: C.border, borderRadius: '2px' } })
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', alignItems: 'flex-start',
          gap: '20px', backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '18px',
          padding: '26px 28px', border: '1px solid rgba(16,185,129,0.30)',
        }
      },
        h('div', {
          style: {
            display: 'flex', width: '56px', height: '56px', borderRadius: '14px',
            backgroundColor: 'rgba(16,185,129,0.20)', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }
        },
          h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.green } }, '03')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'ETF-Sparplan starten'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } },
            'Ab 25 EUR/Monat — automatisch, dauerhaft, steuergünstig')
        )
      )
    ),
    keyLearning('Sicherheit zuerst, Investition danach — in dieser Reihenfolge.'),
    igHandle()
  );

  // ============ SLIDE 6: Das Prinzip ============
  var slide6 = slideRoot(
    slideHeader('DAS PRINZIP'),
    headline('Dein Geld muss für dich arbeiten', 58),
    subline('So teilst du dein Gehalt klug auf'),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' }
    },
      h('div', { style: { display: 'flex', justifyContent: 'center' } },
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            backgroundColor: C.cardBg, borderRadius: '18px', padding: '20px 48px',
            border: '2px solid rgba(255,255,255,0.25)',
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'DEIN GEHALT'),
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.text } }, '3.500 EUR netto')
        )
      ),
      h('div', { style: { display: 'flex', justifyContent: 'center' } },
        h('div', { style: { display: 'flex', width: '4px', height: '28px', backgroundColor: C.border, borderRadius: '2px' } })
      ),
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', gap: '8px',
            backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 14px',
          }
        },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.textSoft } }, '60 %'),
          h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.textSoft, textAlign: 'center' } }, 'Fixkosten'),
          h('span', { style: { fontSize: '17px', fontWeight: 500, color: C.textMuted, textAlign: 'center', lineHeight: '1.4' } },
            'Miete, Versicherungen, Lebensmittel')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', gap: '8px',
            backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '16px', padding: '22px 14px',
            border: '1px solid rgba(16,185,129,0.30)',
          }
        },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.green } }, '25 %'),
          h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.green, textAlign: 'center' } }, 'Investitionen'),
          h('span', { style: { fontSize: '17px', fontWeight: 500, color: C.textMuted, textAlign: 'center', lineHeight: '1.4' } },
            'ETF, Altersvorsorge, Sparpläne')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', gap: '8px',
            backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 14px',
          }
        },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.textSoft } }, '15 %'),
          h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.textSoft, textAlign: 'center' } }, 'Freiheit'),
          h('span', { style: { fontSize: '17px', fontWeight: 500, color: C.textMuted, textAlign: 'center', lineHeight: '1.4' } },
            'Urlaub, Hobbys, Genuss')
        )
      ),
      h('div', {
        style: { display: 'flex', backgroundColor: C.cardBg, borderRadius: '14px', padding: '18px 24px' }
      },
        h('span', {
          style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4', textAlign: 'center', flex: '1' }
        }, 'Pay yourself first — investiere bevor du ausgibst')
      )
    ),
    keyLearning('Wer zuerst investiert und vom Rest lebt, baut systematisch Vermögen auf.'),
    igHandle()
  );

  // ============ SLIDE 7: Takeaways ============
  var learnings = [
    { num: '01', text: 'Mehr Gehalt allein schafft kein Vermögen — Investieren schon', pct: 25 },
    { num: '02', text: 'Inflation frisst dein Erspartes auf dem Sparbuch auf', pct: 50 },
    { num: '03', text: 'Erst Notgroschen (3 Monate), dann ETF-Sparplan starten', pct: 75 },
    { num: '04', text: 'Schon 25 EUR im Monat reichen, um Vermögen aufzubauen', pct: 100 },
  ];

  var slide7 = slideRoot(
    slideHeader('DEINE TAKEAWAYS'),
    headline('Was du heute mitnimmst', 58),
    subline('4 Erkenntnisse für deinen Vermögensaufbau'),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' }
    },
      ...learnings.map(function(l) {
        return h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px',
            padding: '20px 24px', backgroundColor: C.cardBg, borderRadius: '16px',
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
            h('span', {
              style: { fontSize: '36px', fontWeight: 800, color: l.pct === 100 ? C.green : C.text, minWidth: '56px' }
            }, l.num),
            h('span', {
              style: { fontSize: '24px', fontWeight: 600, color: C.text, lineHeight: '1.3', flex: '1' }
            }, l.text)
          ),
          h('div', {
            style: { display: 'flex', height: '5px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' }
          },
            h('div', {
              style: {
                display: 'flex', width: `${l.pct}%`, height: '5px',
                backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px',
              }
            })
          )
        );
      })
    ),
    igHandle()
  );

  // ============ SLIDE 8: CTA ============
  var slide8 = slideRoot(
    slideHeader('DEIN NÄCHSTER SCHRITT'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '28px',
      }
    },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px',
          backgroundColor: C.cardBg, borderRadius: '28px', padding: '48px 40px', width: '100%',
        }
      },
        h('span', {
          style: {
            fontSize: '56px', fontWeight: 800, color: C.green,
            letterSpacing: '-2px', textAlign: 'center', lineHeight: '1.1',
          }
        }, 'Wie viel deines Gehalts investierst du gerade?'),
        h('div', {
          style: { display: 'flex', width: '80px', height: '4px', backgroundColor: C.green, borderRadius: '2px' }
        }),
        h('span', {
          style: { fontSize: '28px', fontWeight: 500, color: C.textSoft, textAlign: 'center', lineHeight: '1.5' }
        }, 'Schreib es in die Kommentare. Wir helfen dir zu optimieren.')
      ),
      h('span', {
        style: { fontSize: '30px', fontWeight: 600, color: C.text, textAlign: 'center', lineHeight: '1.5' }
      }, 'Folge @benarofinanzen für wöchentliche Finanztipps')
    ),
    igHandle()
  );

  // ============ GENERATE ALL SLIDES ============
  var slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  var TODAY = '2026-10-08';
  var outDir = path.join(__dirname, 'output', 'carousel_' + TODAY, 'slides');

  for (var i = 0; i < slides.length; i++) {
    var svg = await satori(slides[i], { width: W, height: H, fonts });
    var resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    var pngData = resvg.render();
    var pngPath = path.join(outDir, 'slide-' + String(i + 1).padStart(2, '0') + '.png');
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log('Slide ' + (i + 1) + '/' + slides.length + ' done');
  }
  console.log('All slides generated!');
}

main().catch(function(e) { console.error(e); process.exit(1); });
