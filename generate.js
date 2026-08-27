const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default;
  const { Resvg } = require('@resvg/resvg-js');

  const fontDir = path.join('/tmp/workspace/node_modules/@fontsource/outfit/files');
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

  const W = 1080;
  const H = 1350;
  const PAD = 70;

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync('/tmp/workspace/skills/instagram-carousel-skill/templates/benaro-logo.jpg').toString('base64');

  const TODAY = '2026-08-27';
  const outDir = `/tmp/workspace/output/carousel_${TODAY}/slides`;

  const h = (type, props, ...ch) => ({
    type,
    props: {
      ...props,
      children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch,
    },
  });

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
        alignSelf: 'flex-start',
      },
    }, text);
  }

  function headline(text, size) {
    size = size || 64;
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
        lineHeight: '1.5',
        marginTop: '8px',
      },
    }, text);
  }

  function keyLearning(text, accent) {
    accent = accent || C.text;
    return h('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        backgroundColor: C.cardBg,
        borderRadius: '16px',
        padding: '22px 28px',
        marginTop: '24px',
      },
    },
      h('div', {
        style: {
          display: 'flex',
          width: '6px',
          minHeight: '40px',
          backgroundColor: accent,
          borderRadius: '3px',
          flexShrink: '0',
        },
      }),
      h('span', {
        style: {
          fontSize: '28px',
          fontWeight: 600,
          color: C.text,
          lineHeight: '1.4',
        },
      }, text)
    );
  }

  function igHandle() {
    return h('span', {
      style: {
        fontSize: '24px',
        fontWeight: 500,
        color: C.textMuted,
        marginTop: '14px',
      },
    }, '@benarofinanzen');
  }

  function topBar(badgeText) {
    return h('div', {
      style: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px',
      },
    },
      badge(badgeText),
      logo()
    );
  }

  function slideRoot(children) {
    return h('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: W,
        height: H,
        padding: `${PAD}px`,
        backgroundColor: C.bg,
        fontFamily: 'Outfit',
      },
    }, ...children);
  }

  function arrowDown() {
    return h('div', {
      style: { display: 'flex', justifyContent: 'center', padding: '4px 0' },
    },
      h('div', {
        style: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
      },
        h('div', {
          style: { display: 'flex', width: '3px', height: '24px', backgroundColor: C.border },
        }),
        h('div', {
          style: {
            display: 'flex',
            width: '0px',
            height: '0px',
            borderLeft: '9px solid transparent',
            borderRight: '9px solid transparent',
            borderTop: `10px solid ${C.border}`,
          },
        })
      )
    );
  }

  // SLIDE 1 — HOOK: Mythos ETF-Sparplan steuerlich absetzbar
  const slide1 = slideRoot([
    topBar('MYTHOS ENTLARVT'),
    headline('Dein ETF-Sparplan spart keine Steuern', 64),
    subline('Der Irrtum, der fast jeden Anleger Geld kostet.'),
    h('div', {
      style: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '20px',
      },
    },
      h('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '22px',
          backgroundColor: 'rgba(239,68,68,0.12)',
          borderRadius: '20px',
          padding: '32px 36px',
          border: '2px solid rgba(239,68,68,0.35)',
        },
      },
        h('div', {
          style: {
            display: 'flex',
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: C.red,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: '0',
          },
        },
          h('span', { style: { fontSize: '26px', fontWeight: 900, color: '#FFFFFF' } }, 'X')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
          h('span', {
            style: {
              fontSize: '32px', fontWeight: 800, color: C.red,
              textDecoration: 'line-through',
            },
          }, 'ETF-Einzahlungen absetzbar'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } },
            'wie Riester oder bAV — das stimmt nicht')
        )
      ),
      h('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '22px',
          backgroundColor: 'rgba(16,185,129,0.12)',
          borderRadius: '20px',
          padding: '32px 36px',
          border: '2px solid rgba(16,185,129,0.35)',
        },
      },
        h('div', {
          style: {
            display: 'flex',
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: C.green,
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: '0',
          },
        },
          h('span', { style: { fontSize: '22px', fontWeight: 900, color: '#FFFFFF' } }, 'OK')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
          h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.green } },
            'Gewinne legal optimieren'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } },
            'mit den richtigen Strategien geht das')
        )
      ),
      h('div', {
        style: { display: 'flex', justifyContent: 'center', paddingTop: '8px' },
      },
        h('span', {
          style: { fontSize: '26px', fontWeight: 600, color: C.textMuted, letterSpacing: '1px' },
        }, 'Wische weiter und lern den Unterschied')
      )
    ),
    keyLearning('Nur wer den Unterschied kennt, zahlt legal weniger.', C.green),
    igHandle(),
  ]);

  // SLIDE 2 — DER IRRGLAUBE
  const slide2 = slideRoot([
    topBar('DER IRRGLAUBE'),
    headline('Was viele ETF-Anleger glauben', 60),
    subline('Und warum es sie Geld kostet.'),
    h('div', {
      style: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '20px',
      },
    },
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            backgroundColor: 'rgba(239,68,68,0.1)',
            borderRadius: '20px',
            padding: '28px',
            gap: '14px',
            border: '1px solid rgba(239,68,68,0.25)',
          },
        },
          h('span', {
            style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.red },
          }, 'IRRGLAUBE'),
          h('div', {
            style: {
              display: 'flex', width: '100%', height: '3px',
              backgroundColor: 'rgba(239,68,68,0.3)', borderRadius: '2px',
            },
          }),
          h('span', {
            style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' },
          }, '"Ich zahle 200 EUR in den ETF — die kann ich von der Steuer absetzen."'),
          h('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px',
              backgroundColor: 'rgba(239,68,68,0.15)', borderRadius: '10px', padding: '10px 16px',
            },
          },
            h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.red } }, 'X Falsch')
          )
        ),
        h('div', {
          style: {
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            backgroundColor: 'rgba(16,185,129,0.1)',
            borderRadius: '20px',
            padding: '28px',
            gap: '14px',
            border: '1px solid rgba(16,185,129,0.25)',
          },
        },
          h('span', {
            style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green },
          }, 'REALITÄT'),
          h('div', {
            style: {
              display: 'flex', width: '100%', height: '3px',
              backgroundColor: 'rgba(16,185,129,0.3)', borderRadius: '2px',
            },
          }),
          h('span', {
            style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' },
          }, 'ETF-Beiträge werden aus versteuertem Gehalt gezahlt — kein Abzug möglich.'),
          h('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px',
              backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '10px', padding: '10px 16px',
            },
          },
            h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.green } }, 'Richtig')
          )
        )
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '16px',
          backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px',
        },
      },
        h('div', {
          style: {
            display: 'flex', width: '8px', height: '8px', borderRadius: '50%',
            backgroundColor: C.textMuted, flexShrink: '0',
          },
        }),
        h('span', {
          style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' },
        }, 'ETF ist keine geförderte Altersvorsorge — anders als Riester oder bAV.')
      )
    ),
    keyLearning('Kein Steuerabzug für Einzahlungen — aber das ist nicht das Ende der Geschichte.', C.red),
    igHandle(),
  ]);

  // SLIDE 3 — WIE ES WIRKLICH FUNKTIONIERT
  const slide3 = slideRoot([
    topBar('SO FUNKTIONIERT ES'),
    headline('Was wirklich besteuert wird', 60),
    subline('Nicht die Einzahlung — sondern der Gewinn.'),
    h('div', {
      style: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '0px',
      },
    },
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '20px',
          backgroundColor: C.cardBg, borderRadius: '18px', padding: '24px 30px',
          border: '1px solid rgba(255,255,255,0.12)',
        },
      },
        h('div', {
          style: {
            display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
            backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center',
            justifyContent: 'center', flexShrink: '0',
          },
        },
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.text } }, '1')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.text } }, 'Netto-Gehalt'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } },
            'bereits versteuert — Lohnsteuer bereits bezahlt')
        )
      ),
      arrowDown(),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '20px',
          backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '18px', padding: '24px 30px',
          border: '1px solid rgba(239,68,68,0.2)',
        },
      },
        h('div', {
          style: {
            display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
            backgroundColor: 'rgba(239,68,68,0.2)', alignItems: 'center',
            justifyContent: 'center', flexShrink: '0',
          },
        },
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.red } }, '2')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', flex: '1' } },
          h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.textSoft } }, 'ETF-Sparrate'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } },
            'kein Steuerabzug für die Einzahlung')
        ),
        h('div', {
          style: {
            display: 'flex', backgroundColor: 'rgba(239,68,68,0.15)', borderRadius: '10px',
            padding: '8px 16px',
          },
        },
          h('span', { style: { fontSize: '19px', fontWeight: 700, color: C.red } }, 'KEIN ABZUG')
        )
      ),
      arrowDown(),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '20px',
          backgroundColor: C.cardBg, borderRadius: '18px', padding: '24px 30px',
          border: '1px solid rgba(255,255,255,0.12)',
        },
      },
        h('div', {
          style: {
            display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
            backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center',
            justifyContent: 'center', flexShrink: '0',
          },
        },
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.text } }, '3')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.text } }, 'Kursgewinne entstehen'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } },
            'Depot steigt im Wert — hier entsteht die Steuer')
        )
      ),
      arrowDown(),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '20px',
          backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '18px', padding: '24px 30px',
          border: '1px solid rgba(239,68,68,0.25)',
        },
      },
        h('div', {
          style: {
            display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
            backgroundColor: 'rgba(239,68,68,0.2)', alignItems: 'center',
            justifyContent: 'center', flexShrink: '0',
          },
        },
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.red } }, '4')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', flex: '1' } },
          h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.textSoft } }, '25% Abgeltungssteuer'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } },
            'plus Solidaritätszuschlag beim Verkauf')
        ),
        h('div', {
          style: {
            display: 'flex', backgroundColor: 'rgba(239,68,68,0.15)', borderRadius: '10px',
            padding: '8px 16px',
          },
        },
          h('span', { style: { fontSize: '19px', fontWeight: 700, color: C.red } }, '26,375%')
        )
      )
    ),
    keyLearning('Nur realisierte Gewinne werden besteuert — nicht die Sparrate.'),
    igHandle(),
  ]);

  // SLIDE 4 — VERGLEICH: Was ist absetzbar?
  const slide4 = slideRoot([
    topBar('DER VERGLEICH'),
    headline('Was du wirklich absetzen kannst', 60),
    subline('ETF-Sparplan vs. geförderte Altersvorsorge'),
    h('div', {
      style: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '14px',
      },
    },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          paddingBottom: '8px', gap: '14px',
        },
      },
        h('span', {
          style: {
            flex: '1', fontSize: '21px', fontWeight: 700,
            letterSpacing: '2px', color: C.textMuted,
          },
        }, 'PRODUKT'),
        h('span', {
          style: { fontSize: '21px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted, width: '120px', textAlign: 'center' },
        }, 'ABSETZBAR')
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '16px',
          backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '16px', padding: '20px 24px',
          border: '1px solid rgba(16,185,129,0.25)',
        },
      },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Riester-Rente'),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, 'bis 2.100 EUR/Jahr Sonderausgaben')
        ),
        h('div', {
          style: {
            display: 'flex', backgroundColor: C.green, borderRadius: '10px',
            padding: '8px 18px', alignItems: 'center', width: '80px', justifyContent: 'center',
          },
        },
          h('span', { style: { fontSize: '22px', fontWeight: 700, color: '#FFFFFF' } }, 'Ja')
        )
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '16px',
          backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '16px', padding: '20px 24px',
          border: '1px solid rgba(16,185,129,0.25)',
        },
      },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Betriebliche Altersvorsorge'),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, 'bis 7.728 EUR/Jahr steuerfrei (2026)')
        ),
        h('div', {
          style: {
            display: 'flex', backgroundColor: C.green, borderRadius: '10px',
            padding: '8px 18px', alignItems: 'center', width: '80px', justifyContent: 'center',
          },
        },
          h('span', { style: { fontSize: '22px', fontWeight: 700, color: '#FFFFFF' } }, 'Ja')
        )
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '16px',
          backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '16px', padding: '20px 24px',
          border: '1px solid rgba(16,185,129,0.25)',
        },
      },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Rürup-Rente'),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, 'bis 29.344 EUR/Jahr absetzbar (2026)')
        ),
        h('div', {
          style: {
            display: 'flex', backgroundColor: C.green, borderRadius: '10px',
            padding: '8px 18px', alignItems: 'center', width: '80px', justifyContent: 'center',
          },
        },
          h('span', { style: { fontSize: '22px', fontWeight: 700, color: '#FFFFFF' } }, 'Ja')
        )
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '16px',
          backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '16px', padding: '20px 24px',
          border: '2px solid rgba(239,68,68,0.35)',
        },
      },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.textSoft } }, 'ETF-Sparplan'),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, 'Einzahlung aus versteuertem Gehalt')
        ),
        h('div', {
          style: {
            display: 'flex', backgroundColor: 'rgba(239,68,68,0.2)', borderRadius: '10px',
            padding: '8px 18px', alignItems: 'center', width: '80px', justifyContent: 'center',
            border: '1px solid rgba(239,68,68,0.4)',
          },
        },
          h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.red } }, 'Nein')
        )
      )
    ),
    keyLearning('ETF-Sparplan spart keine Lohnsteuer — aber Kapitalertragsteuer optimieren geht.', C.red),
    igHandle(),
  ]);

  // SLIDE 5 — 3 LEGALE STEUER-STRATEGIEN
  const slide5 = slideRoot([
    topBar('DEINE STRATEGIEN'),
    headline('3 legale Wege zu weniger ETF-Steuer', 56),
    subline('Diese Hebel kennen die meisten nicht.'),
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
          display: 'flex', flexDirection: 'column', gap: '10px',
          backgroundColor: C.cardBg, borderRadius: '18px', padding: '26px 30px',
        },
      },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
          h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.green, minWidth: '60px' } }, '01'),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '3px' } },
            h('span', { style: { fontSize: '29px', fontWeight: 700, color: C.text } }, 'Freistellungsauftrag nutzen'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } },
              '1.000 EUR/Jahr steuerfrei — als Paar sogar 2.000 EUR')
          )
        ),
        h('div', { style: { display: 'flex', height: '5px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
          h('div', { style: { display: 'flex', width: '33%', height: '5px', backgroundColor: C.green, borderRadius: '3px' } })
        )
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', gap: '10px',
          backgroundColor: C.cardBg, borderRadius: '18px', padding: '26px 30px',
        },
      },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
          h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.text, minWidth: '60px' } }, '02'),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '3px' } },
            h('span', { style: { fontSize: '29px', fontWeight: 700, color: C.text } }, 'Günstigerprüfung beantragen'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } },
              'Grenzsteuersatz unter 25%? Finanzamt erstattet die Differenz')
          )
        ),
        h('div', { style: { display: 'flex', height: '5px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
          h('div', { style: { display: 'flex', width: '66%', height: '5px', backgroundColor: C.text, borderRadius: '3px' } })
        )
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', gap: '10px',
          backgroundColor: C.cardBg, borderRadius: '18px', padding: '26px 30px',
        },
      },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
          h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.green, minWidth: '60px' } }, '03'),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '3px' } },
            h('span', { style: { fontSize: '29px', fontWeight: 700, color: C.text } }, 'Verlustverrechnung einsetzen'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } },
              'ETF-Verluste mindern deine steuerpflichtigen Gewinne')
          )
        ),
        h('div', { style: { display: 'flex', height: '5px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
          h('div', { style: { display: 'flex', width: '100%', height: '5px', backgroundColor: C.green, borderRadius: '3px' } })
        )
      )
    ),
    keyLearning('Mit diesen 3 Hebeln zahlst du legal weniger — ohne mehr Risiko zu nehmen.', C.green),
    igHandle(),
  ]);

  // SLIDE 6 — RECHENBEISPIEL: Was der Freibetrag bringt
  const slide6 = slideRoot([
    topBar('RECHENBEISPIEL'),
    headline('Was der Freibetrag wirklich bringt', 58),
    subline('Konkretes Beispiel — rechne es für dich nach.'),
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
        style: { display: 'flex', backgroundColor: C.cardBg, borderRadius: '14px', padding: '18px 24px' },
      },
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft } },
          'Depot: 50.000 EUR  |  Rendite: 6%  |  Gewinn: 3.000 EUR/Jahr')
      ),
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '20px', padding: '28px', gap: '12px',
            border: '1px solid rgba(239,68,68,0.2)',
          },
        },
          h('span', { style: { fontSize: '19px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'OHNE FREIBETRAG'),
          h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: 'rgba(239,68,68,0.25)' } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.5' } },
            'Steuer auf 3.000 EUR'),
          h('span', { style: { fontSize: '50px', fontWeight: 800, color: C.red } }, '791 EUR'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'fällig beim Verkauf')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '20px', padding: '28px', gap: '12px',
            border: '1px solid rgba(16,185,129,0.25)',
          },
        },
          h('span', { style: { fontSize: '19px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'MIT FREIBETRAG'),
          h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: 'rgba(16,185,129,0.3)' } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.5' } },
            'Steuer auf 2.000 EUR'),
          h('span', { style: { fontSize: '50px', fontWeight: 800, color: C.green } }, '527 EUR'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, '264 EUR gespart pro Jahr')
        )
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
          backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '14px', padding: '20px 28px',
          border: '1px solid rgba(16,185,129,0.25)',
        },
      },
        h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.green } }, 'Ersparnis:'),
        h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.green } }, '264 EUR/Jahr'),
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft } }, 'durch den Freibetrag')
      )
    ),
    keyLearning('Freistellungsauftrag stellen — kostet 5 Minuten und spart Hunderte Euro.', C.green),
    igHandle(),
  ]);

  // SLIDE 7 — TAKEAWAYS
  const slide7 = slideRoot([
    topBar('DEIN FAZIT'),
    headline('3 Dinge, die du jetzt weißt', 60),
    subline('Speicher diese Slide — du wirst sie brauchen.'),
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
          display: 'flex', flexDirection: 'column', gap: '10px',
          backgroundColor: C.cardBg, borderRadius: '18px', padding: '26px 30px',
        },
      },
        h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '18px' } },
          h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.text, minWidth: '60px' } }, '01'),
          h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.text, lineHeight: '1.35' } },
            'ETF-Einzahlungen sind NICHT steuerlich absetzbar — anders als Riester oder bAV.')
        ),
        h('div', { style: { display: 'flex', height: '5px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
          h('div', { style: { display: 'flex', width: '33%', height: '5px', backgroundColor: C.text, borderRadius: '3px' } })
        )
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', gap: '10px',
          backgroundColor: C.cardBg, borderRadius: '18px', padding: '26px 30px',
        },
      },
        h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '18px' } },
          h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.text, minWidth: '60px' } }, '02'),
          h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.text, lineHeight: '1.35' } },
            'Besteuert wird der Gewinn beim Verkauf — 25% Abgeltungssteuer plus Solidaritätszuschlag.')
        ),
        h('div', { style: { display: 'flex', height: '5px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
          h('div', { style: { display: 'flex', width: '66%', height: '5px', backgroundColor: C.text, borderRadius: '3px' } })
        )
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', gap: '10px',
          backgroundColor: C.cardBg, borderRadius: '18px', padding: '26px 30px',
        },
      },
        h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '18px' } },
          h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.green, minWidth: '60px' } }, '03'),
          h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.text, lineHeight: '1.35' } },
            'Freistellungsauftrag, Günstigerprüfung und Verlustverrechnung senken deine Steuerlast legal.')
        ),
        h('div', { style: { display: 'flex', height: '5px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
          h('div', { style: { display: 'flex', width: '100%', height: '5px', backgroundColor: C.green, borderRadius: '3px' } })
        )
      )
    ),
    keyLearning('Wer die Regeln kennt, zahlt weniger. Wer sie ignoriert, schenkt dem Staat Geld.', C.green),
    igHandle(),
  ]);

  // SLIDE 8 — CTA
  const slide8 = slideRoot([
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
          fontSize: '52px', fontWeight: 800, color: C.text,
          lineHeight: '1.1', letterSpacing: '-1.5px', textAlign: 'center',
        },
      }, 'Wie viel Steuer zahlst du wirklich auf dein Depot?'),
      h('span', {
        style: {
          fontSize: '28px', fontWeight: 500, color: C.textMuted,
          lineHeight: '1.5', textAlign: 'center',
        },
      }, 'Wir analysieren dein Depot kostenlos und zeigen dir, wo du legal sparen kannst.'),
      h('div', {
        style: {
          display: 'flex', width: '80px', height: '4px',
          backgroundColor: C.green, borderRadius: '2px',
        },
      }),
      h('span', {
        style: {
          fontSize: '32px', fontWeight: 700, color: C.green, textAlign: 'center',
        },
      }, 'Schreib uns — kostenloses Erstgesprach'),
      h('img', {
        src: logoB64, width: 140, height: 140,
        style: { borderRadius: '16px', objectFit: 'cover', marginTop: '12px' },
      }),
      h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft } }, 'Benaro Finanzen')
    ),
    h('div', { style: { display: 'flex', justifyContent: 'center' } },
      igHandle()
    ),
  ]);

  // GENERATE ALL SLIDES
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} gespeichert: ${pngPath}`);
  }
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => {
  console.error('Fehler:', e);
  process.exit(1);
});
