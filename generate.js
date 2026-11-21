const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default;
  const { Resvg } = require('@resvg/resvg-js');

  const fontDir = path.join('/home/user/benaro-instagram-carousel/node_modules/@fontsource/outfit/files');
  const fonts = [400, 500, 600, 700, 800].flatMap(w => [
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-${w}-normal.woff`)) },
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-ext-${w}-normal.woff`)) },
  ]);

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    '/home/user/benaro-instagram-carousel/skills/instagram-carousel-skill/templates/benaro-logo.jpg'
  ).toString('base64');

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

  const h = (type, props, ...ch) => ({
    type,
    props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch },
  });

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '16px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: C.cardBg, padding: '10px 22px', borderRadius: '12px',
        },
      }, text),
    );
  }

  function headline(text, size = 64) {
    return h('span', {
      style: {
        fontSize: `${size}px`, fontWeight: 800, color: C.text,
        lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '8px',
      },
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500, color: C.textMuted,
        lineHeight: '1.5', marginTop: '8px',
      },
    }, text);
  }

  function keyLearning(text, accent) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px', marginTop: '16px',
      },
    },
      h('div', {
        style: {
          display: 'flex', width: '6px', height: '48px',
          backgroundColor: accent || C.text, borderRadius: '3px', flexShrink: 0,
        },
      }),
      h('span', {
        style: { fontSize: '28px', fontWeight: 600, color: C.text, lineHeight: '1.4' },
      }, text),
    );
  }

  function logoTop() {
    return h('img', {
      src: logoB64,
      width: 120,
      height: 120,
      style: { borderRadius: '12px', objectFit: 'cover', flexShrink: 0 },
    });
  }

  function igHandle() {
    return h('div', { style: { display: 'flex', marginTop: '12px' } },
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, '@benarofinanzen'),
    );
  }

  function headerRow(badgeText) {
    return h('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' },
    },
      badge(badgeText),
      logoTop(),
    );
  }

  // =========================================
  // SLIDE 1 — HOOK
  // =========================================
  const slide1 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    headerRow('JETZT HANDELN'),
    headline('4,25 % Zinsen —\nnur noch kurz\nverfügbar', 66),
    subline('Was Festgeld 2026 wirklich bringt'),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '28px' },
    },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '28px', padding: '40px 60px', gap: '10px',
        },
      },
        h('span', { style: { fontSize: '130px', fontWeight: 800, color: C.green, lineHeight: '1', letterSpacing: '-4px' } }, '4,25%'),
        h('span', { style: { fontSize: '30px', fontWeight: 600, color: C.textSoft } }, 'Festgeld Zinsen p.a.'),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, 'Laufzeit 12 Monate — staatl. gesichert'),
      ),
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '16px', padding: '20px 28px', gap: '6px',
          },
        },
          h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.red } }, '0,5%'),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textSoft } }, 'Sparbuch'),
        ),
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px 28px', gap: '6px',
          },
        },
          h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.textSoft } }, '2,8%'),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted } }, 'Tagesgeld'),
        ),
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '16px', padding: '20px 28px', gap: '6px',
          },
        },
          h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.green } }, '4,25%'),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textSoft } }, 'Festgeld'),
        ),
      ),
    ),
    keyLearning('Festgeld schlägt das Sparbuch um das 8-Fache'),
    igHandle(),
  );

  // =========================================
  // SLIDE 2 — ZINSENTWICKLUNG (Balkendiagramm)
  // =========================================
  function bar(label, pct, valueText, barColor) {
    return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
      h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
        h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.textSoft } }, label),
        h('span', { style: { fontSize: '30px', fontWeight: 800, color: barColor } }, valueText),
      ),
      h('div', {
        style: { display: 'flex', height: '14px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '7px' },
      },
        h('div', {
          style: { display: 'flex', width: `${pct}%`, height: '14px', backgroundColor: barColor, borderRadius: '7px' },
        }),
      ),
    );
  }

  const slide2 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    headerRow('DIE ZAHLEN'),
    headline('So stehen die Zinsen\nin Deutschland 2026', 60),
    subline('Aktueller Vergleich — November 2026'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '28px' } },
      bar('Girokonto', 1, '0,01 %', C.red),
      bar('Sparbuch', 12, '0,5 %', 'rgba(239,68,68,0.6)'),
      bar('Tagesgeld', 66, '2,8 %', 'rgba(255,255,255,0.45)'),
      bar('Festgeld 6 Monate', 82, '3,5 %', C.textSoft),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', gap: '8px',
          backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '14px', padding: '18px 20px',
        },
      },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.green } }, 'Festgeld 12 Monate'),
          h('span', { style: { fontSize: '34px', fontWeight: 800, color: C.green } }, '4,25 %'),
        ),
        h('div', {
          style: { display: 'flex', height: '14px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '7px' },
        },
          h('div', {
            style: { display: 'flex', width: '100%', height: '14px', backgroundColor: C.green, borderRadius: '7px' },
          }),
        ),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: 'rgba(16,185,129,0.8)' } }, 'Bester sicherer Zinssatz 2026'),
      ),
    ),
    keyLearning('Festgeld 12 Monate = höchste sichere Rendite in Deutschland'),
    igHandle(),
  );

  // =========================================
  // SLIDE 3 — PROBLEM: 83 % parken Geld falsch
  // =========================================
  function compareCard(label, rate, euros, isGood) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: isGood ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.08)',
        borderRadius: '18px', padding: '26px 32px',
      },
    },
      h('div', {
        style: { display: 'flex', flexDirection: 'column', gap: '6px' },
      },
        h('span', { style: { fontSize: '30px', fontWeight: 700, color: isGood ? C.green : C.textSoft } }, label),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, '10.000 EUR eingelegt'),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' } },
        h('span', { style: { fontSize: '38px', fontWeight: 800, color: isGood ? C.green : C.red } }, rate),
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: isGood ? C.green : C.textMuted } }, euros),
      ),
    );
  }

  const slide3 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    headerRow('DAS PROBLEM'),
    headline('83 % parken ihr\nGeld falsch', 70),
    subline('Was es dich pro Jahr wirklich kostet'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      compareCard('Girokonto', '0,01 %', '1 EUR / Jahr', false),
      compareCard('Sparbuch', '0,5 %', '50 EUR / Jahr', false),
      compareCard('Festgeld 12M', '4,25 %', '425 EUR / Jahr', true),
    ),
    keyLearning('Unterschied: 1 EUR vs. 425 EUR — bei gleicher Summe', C.green),
    igHandle(),
  );

  // =========================================
  // SLIDE 4 — MYTHOS: Irrtum vs. Wahrheit
  // =========================================
  function mythCard(label, text, isTrue) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'row', gap: '14px',
      },
    },
      h('div', {
        style: {
          display: 'flex', flex: '1', flexDirection: 'column',
          backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '20px', padding: '24px', gap: '10px',
        },
      },
        h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'IRRTUM'),
        h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.red, borderRadius: '2px' } }),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, label),
      ),
      h('div', {
        style: {
          display: 'flex', flex: '1', flexDirection: 'column',
          backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '20px', padding: '24px', gap: '10px',
        },
      },
        h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'WAHRHEIT'),
        h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.green, borderRadius: '2px' } }),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, text),
      ),
    );
  }

  const slide4 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    headerRow('DER MYTHOS'),
    headline('Was viele über\nFestgeld denken', 66),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      mythCard(
        '"Mein Geld ist für ein Jahr gesperrt"',
        'Laufzeiten ab 1 Monat — du wählst selbst',
        true,
      ),
      mythCard(
        '"Festgeld ist unsicher"',
        'Einlagensicherung schützt bis 100.000 EUR pro Bank in der EU',
        true,
      ),
      mythCard(
        '"Das lohnt sich nur für viel Geld"',
        'Mindesteinlage oft nur 500 EUR — manchmal sogar 1 EUR',
        true,
      ),
    ),
    keyLearning('Festgeld ist sicherer und flexibler als fast jeder denkt'),
    igHandle(),
  );

  // =========================================
  // SLIDE 5 — TOP ANBIETER 2026
  // =========================================
  function providerCard(name, rate, laufzeit, mindest, highlighted) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column',
        backgroundColor: highlighted ? 'rgba(16,185,129,0.1)' : C.cardBg,
        borderRadius: '20px', padding: '24px 28px', gap: '12px',
      },
    },
      h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' } },
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: highlighted ? C.green : C.text } }, name),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, laufzeit),
        ),
        h('span', { style: { fontSize: '38px', fontWeight: 800, color: highlighted ? C.green : C.textSoft } }, rate),
      ),
      h('div', { style: { display: 'flex', gap: '10px' } },
        h('span', {
          style: {
            fontSize: '22px', fontWeight: 600, color: C.textMuted,
            backgroundColor: 'rgba(255,255,255,0.06)', padding: '6px 14px', borderRadius: '8px',
          },
        }, mindest),
        h('span', {
          style: {
            fontSize: '22px', fontWeight: 600, color: C.green,
            backgroundColor: 'rgba(16,185,129,0.1)', padding: '6px 14px', borderRadius: '8px',
          },
        }, 'EU-Einlagensicherung'),
      ),
    );
  }

  const slide5 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    headerRow('TOP ANBIETER 2026'),
    headline('Die besten\nFestgeld-Konten\nim Vergleich', 60),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      providerCard('Trade Republic', '4,25 %', 'Laufzeit: 1 Monat – 12 Monate', 'ab 1 EUR', true),
      providerCard('ING / WeltSparen', '4,05 %', 'Laufzeit: 3 Monate – 24 Monate', 'ab 500 EUR', false),
      providerCard('DKB', '3,8 %', 'Laufzeit: 6 Monate – 24 Monate', 'ab 500 EUR', false),
    ),
    keyLearning('Immer Einlagensicherung prüfen — bis 100.000 EUR gesetzlich geschützt'),
    igHandle(),
  );

  // =========================================
  // SLIDE 6 — FESTGELD-LEITER-STRATEGIE
  // =========================================
  function leiterStep(num, title, desc, rate, isGreen) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '20px',
        backgroundColor: isGreen ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.06)',
        borderRadius: '18px', padding: '24px 28px',
      },
    },
      h('div', {
        style: {
          display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
          backgroundColor: isGreen ? 'rgba(16,185,129,0.2)' : C.cardBg,
          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        },
      },
        h('span', { style: { fontSize: '26px', fontWeight: 800, color: isGreen ? C.green : C.text } }, num),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', flex: '1' } },
        h('span', { style: { fontSize: '28px', fontWeight: 700, color: isGreen ? C.green : C.text } }, title),
        h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, desc),
      ),
      h('span', { style: { fontSize: '30px', fontWeight: 800, color: isGreen ? C.green : C.textSoft, flexShrink: 0 } }, rate),
    );
  }

  const slide6 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    headerRow('PROFI-STRATEGIE'),
    headline('Die Festgeld-Leiter:\nMaximale Zinsen\nund Flexibilität', 60),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      leiterStep('1', '1/3 auf 3 Monate Festgeld', 'Kurzfristig verfügbar — für Notfälle', '3,2 %', false),
      h('div', { style: { display: 'flex', justifyContent: 'center', padding: '4px 0' } },
        h('div', {
          style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' },
        },
          h('div', { style: { display: 'flex', width: '3px', height: '20px', backgroundColor: C.border } }),
          h('div', {
            style: {
              display: 'flex', width: '0', height: '0',
              borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
              borderTop: `10px solid ${C.border}`,
            },
          }),
        ),
      ),
      leiterStep('2', '1/3 auf 6 Monate Festgeld', 'Mittelfristige Reserve mit höherem Zins', '3,5 %', false),
      h('div', { style: { display: 'flex', justifyContent: 'center', padding: '4px 0' } },
        h('div', {
          style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' },
        },
          h('div', { style: { display: 'flex', width: '3px', height: '20px', backgroundColor: C.border } }),
          h('div', {
            style: {
              display: 'flex', width: '0', height: '0',
              borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
              borderTop: `10px solid ${C.border}`,
            },
          }),
        ),
      ),
      leiterStep('3', '1/3 auf 12 Monate Festgeld', 'Maximaler Zinssatz — sicher eingeplant', '4,25 %', true),
    ),
    keyLearning('Jedes Quartal wird ein Drittel frei — und neu angelegt'),
    igHandle(),
  );

  // =========================================
  // SLIDE 7 — TAKEAWAYS: 4 Schritte
  // =========================================
  const learnings = [
    { num: '01', text: 'Betrag bestimmen: Notgroschen abziehen, Rest anlegen', pct: 25 },
    { num: '02', text: 'Laufzeit wählen: 3M, 6M oder 12M je nach Plan', pct: 50 },
    { num: '03', text: 'Anbieter vergleichen und bestes Angebot sichern', pct: 75 },
    { num: '04', text: 'Konto eröffnen — online in unter 10 Minuten', pct: 100 },
  ];

  const slide7 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    headerRow('DEINE 4 SCHRITTE'),
    headline('So startest du\nheute noch', 70),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px',
            padding: '24px 28px', backgroundColor: C.cardBg, borderRadius: '18px',
          },
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', { style: { fontSize: '38px', fontWeight: 800, color: l.pct === 100 ? C.green : C.text, width: '56px' } }, l.num),
            h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.text, lineHeight: '1.3', flex: '1' } }, l.text),
          ),
          h('div', {
            style: { display: 'flex', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px' },
          },
            h('div', {
              style: {
                display: 'flex', width: `${l.pct}%`, height: '6px',
                backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px',
              },
            }),
          ),
        )
      ),
    ),
    keyLearning('Jede Woche warten kostet Zinsen — starte jetzt', C.green),
    igHandle(),
  );

  // =========================================
  // SLIDE 8 — CTA
  // =========================================
  const slide8 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    headerRow('BENARO FINANZEN'),
    h('span', {
      style: { fontSize: '52px', fontWeight: 800, color: C.text, lineHeight: '1.12', letterSpacing: '-1px', marginBottom: '8px' },
    }, 'Hast du schon\nein Festgeld-Konto?'),
    h('span', {
      style: { fontSize: '28px', fontWeight: 500, color: C.textMuted, lineHeight: '1.5' },
    }, 'Schreib uns in die Kommentare —\nwir helfen dir beim ersten Schritt'),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '32px' },
    },
      h('img', { src: logoB64, width: 160, height: 160, style: { borderRadius: '20px', objectFit: 'cover' } }),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
          backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px 40px',
        },
      },
        h('span', {
          style: { fontSize: '30px', fontWeight: 700, color: C.text, textAlign: 'center', lineHeight: '1.4' },
        }, 'Folge @benarofinanzen für mehr\nTipps rund ums Geld'),
        h('span', {
          style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, textAlign: 'center' },
        }, 'Speichern nicht vergessen'),
      ),
    ),
    keyLearning('Benaro Finanzen — Dein Partner für smarte Geldanlage', C.green),
    igHandle(),
  );

  // =========================================
  // RENDER ALL SLIDES
  // =========================================
  const outputDir = '/home/user/benaro-instagram-carousel/output/carousel_2026-11-21/slides';
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = `${outputDir}/slide-${String(i + 1).padStart(2, '0')}.png`;
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} done: ${pngPath}`);
  }
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
