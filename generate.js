const fs = require('fs');
const path = require('path');

async function main() {
  const satori = ((await import('satori')).default) || require('satori');
  const { Resvg } = require('@resvg/resvg-js');

  const fontDir = path.join(__dirname, 'node_modules/@fontsource/outfit/files');
  const fonts = [400, 500, 600, 700, 800].flatMap(w => [
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-${w}-normal.woff`)) },
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-ext-${w}-normal.woff`)) },
  ]);

  const logoB64 = 'data:image/jpeg;base64,' +
    fs.readFileSync(path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')).toString('base64');

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
    type,
    props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch },
  });

  // ── Reusable components ──

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '14px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: C.cardBg, padding: '10px 22px', borderRadius: '12px',
        },
      }, text),
    );
  }

  function logo(size = 120) {
    return h('img', {
      src: logoB64, width: size, height: size,
      style: { borderRadius: '12px', objectFit: 'cover' },
    });
  }

  function topRow(badgeText) {
    return h('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' },
    },
      badge(badgeText),
      logo(),
    );
  }

  function headline(text, size = 64) {
    return h('span', {
      style: {
        fontSize: `${size}px`, fontWeight: 800, color: C.text,
        lineHeight: '1.10', letterSpacing: '-1.5px', marginBottom: '6px',
      },
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: { fontSize: '28px', fontWeight: 500, color: C.textMuted, lineHeight: '1.5', marginTop: '6px' },
    }, text);
  }

  function keyLearning(text, accentColor) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px', marginTop: 'auto',
      },
    },
      h('div', { style: { display: 'flex', width: '6px', minHeight: '40px', backgroundColor: accentColor || C.text, borderRadius: '3px' } }),
      h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, text),
    );
  }

  function igHandle() {
    return h('div', { style: { display: 'flex', marginTop: '12px' } },
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, '@benarofinanzen'),
    );
  }

  function slideRoot(...children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column', width: W, height: H,
        padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
      },
    }, ...children);
  }

  // ── SLIDE 1 — Hook ──────────────────────────────────────────────
  const slide1 = slideRoot(
    topRow('ACHTUNG'),
    headline('Diese Steuer frisst deinen ETF-Gewinn', 68),
    subline('Was 90 % der ETF-Sparer nicht wissen'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '28px' } },
      // Big red warning circle
      h('div', {
        style: {
          display: 'flex', width: '200px', height: '200px', borderRadius: '100px',
          backgroundColor: 'rgba(239,68,68,0.15)', border: `4px solid ${C.red}`,
          alignItems: 'center', justifyContent: 'center',
        },
      },
        h('span', { style: { fontSize: '100px', fontWeight: 800, color: C.red } }, '!'),
      ),
      // Info box
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', gap: '12px',
          backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '18px', padding: '28px 32px',
          border: `1px solid rgba(239,68,68,0.25)`,
        },
      },
        h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.text, textAlign: 'center', lineHeight: '1.4' } },
          'Die Vorabpauschale zieht jedes Jahr Geld aus deinem Depot'),
        h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted, textAlign: 'center' } },
          'Automatisch. Ohne dass du es merkst.'),
      ),
    ),
    keyLearning('Swipe, um zu verstehen, wie viel dich das kostet'),
    igHandle(),
  );

  // ── SLIDE 2 — Was ist die Vorabpauschale? ──────────────────────
  const slide2 = slideRoot(
    topRow('DIE WAHRHEIT'),
    headline('Die versteckte ETF-Steuer', 62),
    subline('Die Vorabpauschale: jährlich, automatisch, unvermeidbar'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '0px' } },
      // Step 1
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '20px', padding: '24px 28px',
          backgroundColor: C.cardBg, borderRadius: '18px 18px 0 0',
          border: `1px solid ${C.border}`, borderBottom: 'none',
        },
      },
        h('div', {
          style: {
            display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
            backgroundColor: 'rgba(16,185,129,0.2)', alignItems: 'center', justifyContent: 'center', minWidth: '52px',
          },
        },
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.green } }, '1'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Du kaufst ETF-Anteile'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Dein Portfolio wächst übers Jahr'),
        ),
      ),
      // Connector
      h('div', { style: { display: 'flex', width: '4px', height: '20px', backgroundColor: C.border, marginLeft: '95px' } }),
      // Step 2
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '20px', padding: '24px 28px',
          backgroundColor: C.cardBg, border: `1px solid ${C.border}`, borderTop: 'none', borderBottom: 'none',
        },
      },
        h('div', {
          style: {
            display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
            backgroundColor: 'rgba(239,68,68,0.2)', alignItems: 'center', justifyContent: 'center', minWidth: '52px',
          },
        },
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.red } }, '2'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Finanzamt berechnet Vorabpauschale'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Fondswert x Basiszins x 0,7'),
        ),
      ),
      // Connector
      h('div', { style: { display: 'flex', width: '4px', height: '20px', backgroundColor: C.border, marginLeft: '95px' } }),
      // Step 3
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '20px', padding: '24px 28px',
          backgroundColor: C.cardBg, borderRadius: '0 0 18px 18px',
          border: `1px solid ${C.border}`, borderTop: 'none',
        },
      },
        h('div', {
          style: {
            display: 'flex', width: '52px', height: '52px', borderRadius: '14px',
            backgroundColor: 'rgba(239,68,68,0.3)', alignItems: 'center', justifyContent: 'center', minWidth: '52px',
          },
        },
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.red } }, '3'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Abgeltungssteuer wird abgebucht'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Automatisch im Januar — auch ohne Verkauf'),
        ),
      ),
    ),
    keyLearning('Du zahlst Steuer, BEVOR du einen Cent verkaufst', C.red),
    igHandle(),
  );

  // ── SLIDE 3 — Erwartung vs. Realität ──────────────────────────
  const slide3 = slideRoot(
    topRow('IRRTUM'),
    headline('Was du glaubst vs. Realität', 62),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      // Contrast cards
      h('div', { style: { display: 'flex', gap: '16px' } },
        // Expectation
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '14px',
            backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '20px', padding: '28px',
            border: `1px solid rgba(255,255,255,0.10)`,
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'ERWARTUNG'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.textSoft, lineHeight: '1.4' } },
            '"ETFs sind steuerfrei, solange ich nicht verkaufe"'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4', marginTop: '4px' } },
            'So denken die meisten Anleger'),
        ),
        // Reality
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '14px',
            backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '20px', padding: '28px',
            border: `2px solid ${C.red}`,
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'REALITÄT'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(239,68,68,0.4)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text, lineHeight: '1.4' } },
            'Das Finanzamt kassiert jährlich — ganz automatisch'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4', marginTop: '4px' } },
            'Auch ohne Verkauf, auch bei niedrigen Gewinnen'),
        ),
      ),
      // Info tag
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '14px', padding: '20px 24px',
          backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '14px',
          border: `1px solid rgba(239,68,68,0.20)`,
        },
      },
        h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.red, minWidth: '10px' } }),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } },
          'Gilt für alle thesaurierenden ETFs in Deutschland'),
      ),
    ),
    keyLearning('Jährliche Steuerpflicht — unabhängig vom Verkauf', C.red),
    igHandle(),
  );

  // ── SLIDE 4 — Das Beispiel / Formel ───────────────────────────
  const slide4 = slideRoot(
    topRow('DAS BEISPIEL'),
    headline('So berechnet sich die Steuer', 60),
    subline('Beispielrechnung für ein 10.000-Euro-Depot'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      // Formula box
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', gap: '14px', padding: '28px 32px',
          backgroundColor: C.cardBg, borderRadius: '20px', border: `1px solid ${C.border}`,
        },
      },
        h('span', { style: { fontSize: '22px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'DIE FORMEL'),
        h('div', { style: { display: 'flex', height: '2px', backgroundColor: C.border, borderRadius: '1px' } }),
        h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text, lineHeight: '1.45' } },
          'Fondswert x Basiszins x 0,7 = Vorabpauschale'),
        h('div', { style: { display: 'flex', height: '2px', backgroundColor: C.border, borderRadius: '1px' } }),
        h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft } },
          'Dann: Vorabpauschale x 26,375 % = Steuerlast'),
      ),
      // Result cards
      h('div', { style: { display: 'flex', gap: '14px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '8px', padding: '24px 20px',
            backgroundColor: 'rgba(16,185,129,0.10)', borderRadius: '16px',
            border: `1px solid rgba(16,185,129,0.30)`,
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted } }, 'FONDSWERT'),
          h('span', { style: { fontSize: '42px', fontWeight: 800, color: C.green } }, '10.000 €'),
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '8px', padding: '24px 20px',
            backgroundColor: 'rgba(239,68,68,0.10)', borderRadius: '16px',
            border: `1px solid rgba(239,68,68,0.30)`,
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted } }, 'JÄHRL. STEUERLAST CA.'),
          h('span', { style: { fontSize: '42px', fontWeight: 800, color: C.red } }, '27 – 42 €'),
        ),
      ),
      // Source note
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 20px',
          backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px',
        },
      },
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } },
          'Abhängig vom jährlichen Basiszins der Bundesbank'),
      ),
    ),
    keyLearning('Bisher unbemerkt — ab sofort weisst du, was passiert'),
    igHandle(),
  );

  // ── SLIDE 5 — Die 3 Wege ──────────────────────────────────────
  const slide5 = slideRoot(
    topRow('SO SPARST DU'),
    headline('3 Wege die Steuer zu minimieren', 58),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      // Way 1
      h('div', {
        style: {
          display: 'flex', gap: '18px', alignItems: 'flex-start', padding: '22px 26px',
          backgroundColor: C.cardBg, borderRadius: '16px', border: `1px solid ${C.border}`,
        },
      },
        h('div', {
          style: {
            display: 'flex', width: '48px', height: '48px', borderRadius: '12px',
            backgroundColor: 'rgba(16,185,129,0.20)', alignItems: 'center', justifyContent: 'center', minWidth: '48px',
          },
        },
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.green } }, '1'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Freistellungsauftrag setzen'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } },
            '1.000 € Freibetrag für Singles / 2.000 € für Paare — völlig steuerfrei'),
        ),
      ),
      // Way 2
      h('div', {
        style: {
          display: 'flex', gap: '18px', alignItems: 'flex-start', padding: '22px 26px',
          backgroundColor: C.cardBg, borderRadius: '16px', border: `1px solid ${C.border}`,
        },
      },
        h('div', {
          style: {
            display: 'flex', width: '48px', height: '48px', borderRadius: '12px',
            backgroundColor: 'rgba(16,185,129,0.20)', alignItems: 'center', justifyContent: 'center', minWidth: '48px',
          },
        },
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.green } }, '2'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Verluste gegenrechnen'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } },
            'Realisierte Verluste können die Vorabpauschale und andere Kapitalerträge reduzieren'),
        ),
      ),
      // Way 3
      h('div', {
        style: {
          display: 'flex', gap: '18px', alignItems: 'flex-start', padding: '22px 26px',
          backgroundColor: 'rgba(16,185,129,0.08)', borderRadius: '16px',
          border: `1px solid rgba(16,185,129,0.30)`,
        },
      },
        h('div', {
          style: {
            display: 'flex', width: '48px', height: '48px', borderRadius: '12px',
            backgroundColor: 'rgba(16,185,129,0.30)', alignItems: 'center', justifyContent: 'center', minWidth: '48px',
          },
        },
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.green } }, '3'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'ETF-Typ bewusst wählen'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } },
            'Ausschüttende vs. thesaurierende ETFs — je nach Situation unterschiedlich steuereffizient'),
        ),
      ),
    ),
    keyLearning('Freibetrag nicht gesetzt? Du verschenkst Geld ans Finanzamt'),
    igHandle(),
  );

  // ── SLIDE 6 — Key Takeaways ────────────────────────────────────
  const learnings = [
    { num: '01', text: 'Vorabpauschale fällt jährlich an — auch ohne Verkauf', pct: 25 },
    { num: '02', text: 'Freistellungsauftrag spart dir bares Geld ab sofort', pct: 50 },
    { num: '03', text: 'Formel: Fondswert x Basiszins x 0,7 = Vorabpauschale', pct: 75 },
    { num: '04', text: 'Wer vorbereitet ist, zahlt deutlich weniger Steuer', pct: 100 },
  ];

  const slide6 = slideRoot(
    topRow('DEIN TAKEAWAY'),
    headline('Was du jetzt wissen musst', 60),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '12px' } },
      ...learnings.map(l =>
        h('div', {
          style: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px 24px', backgroundColor: C.cardBg, borderRadius: '16px' },
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
            h('span', { style: { fontSize: '36px', fontWeight: 800, color: l.pct === 100 ? C.green : C.text, minWidth: '52px' } }, l.num),
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3' } }, l.text),
          ),
          h('div', { style: { display: 'flex', height: '5px', backgroundColor: 'rgba(255,255,255,0.10)', borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${l.pct}%`, height: '5px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px' } }),
          ),
        )
      ),
    ),
    keyLearning('Steuerwissen = deine beste Investition', C.green),
    igHandle(),
  );

  // ── SLIDE 7 — CTA ─────────────────────────────────────────────
  const slide7 = slideRoot(
    topRow('DEIN NÄCHSTER SCHRITT'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '28px' } },
      // Big question
      h('span', {
        style: {
          fontSize: '52px', fontWeight: 800, color: C.text, textAlign: 'center',
          lineHeight: '1.15', letterSpacing: '-1px',
        },
      }, 'Hast du deinen Freistellungsauftrag schon gesetzt?'),
      h('div', { style: { display: 'flex', height: '4px', width: '120px', backgroundColor: C.green, borderRadius: '2px' } }),
      h('span', {
        style: { fontSize: '28px', fontWeight: 500, color: C.textSoft, textAlign: 'center', lineHeight: '1.5' },
      }, 'Schreib "JA" oder "NEIN" in die Kommentare — wir zeigen dir, was du als Nächstes tun solltest.'),
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginTop: '8px' } },
        h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.textMuted } }, 'Folge für mehr Finanzwissen'),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, '@benarofinanzen'),
      ),
    ),
    keyLearning('Speichern nicht vergessen — zum späteren Nachlesen'),
    igHandle(),
  );

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];

  const today = new Date().toISOString().slice(0, 10);
  const outDir = path.join(__dirname, `output/carousel_${today}/slides`);
  fs.mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} generiert`);
  }
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
