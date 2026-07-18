// Carousel: Finanz-Fahrplan 2026 — 5 Schritte zur finanziellen Freiheit
// Inspiration: @richlife.original — "The Rich Life Roadmap for 2026 (Step-by-Step)" DXM6jaUDIll
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

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')
  ).toString('base64');

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
    type,
    props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '16px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: C.cardBg,
          padding: '10px 22px', borderRadius: '12px'
        }
      }, text)
    );
  }

  function headline(text, size) {
    return h('span', {
      style: {
        fontSize: (size || 64) + 'px', fontWeight: 800, color: C.text,
        lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '6px'
      }
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: { fontSize: '28px', fontWeight: 500, color: C.textMuted, lineHeight: '1.5', marginTop: '8px' }
    }, text);
  }

  function keyLearning(text, accentColor) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px', marginTop: 'auto'
      }
    },
      h('div', { style: { display: 'flex', width: '6px', minHeight: '40px', backgroundColor: accentColor || C.text, borderRadius: '3px' } }),
      h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, text)
    );
  }

  function footer() {
    return h('div', { style: { display: 'flex', alignItems: 'center', marginTop: '14px' } },
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, '@benarofinanzen')
    );
  }

  function logoImg(size) {
    size = size || 120;
    return h('img', { src: logoB64, width: size, height: size, style: { borderRadius: '12px', objectFit: 'cover' } });
  }

  function headerRow(badgeText) {
    return h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' } },
      badge(badgeText),
      logoImg(120)
    );
  }

  function slideWrap(children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column', width: W, height: H,
        padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
      }
    }, ...children);
  }

  // =========================================================
  // SLIDE 1 — HOOK: Die meisten ueberspringen Schritt 3
  // =========================================================
  const slide1 = slideWrap([
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      badge('ACHTUNG'),
      logoImg(120)
    ),
    headline('Die meisten\nDeutschen\nueberspringen\nSchritt 3.', 58),
    subline('Dein Finanz-Fahrplan 2026 — 5 Schritte zur finanziellen Freiheit'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '12px' } },
      ...([
        { num: '01', label: 'Notgroschen aufbauen', ok: true, skip: false },
        { num: '02', label: 'Schulden tilgen', ok: true, skip: false },
        { num: '03', label: 'Absicherung', ok: false, skip: true },
        { num: '04', label: 'ETF-Sparplan starten', ok: true, skip: false },
        { num: '05', label: 'Optimieren', ok: true, skip: false },
      ].map(({ num, label, skip }) =>
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: '16px',
            backgroundColor: skip ? 'rgba(239,68,68,0.12)' : C.cardBg,
            borderRadius: '14px', padding: '14px 22px',
            border: skip ? '1px solid rgba(239,68,68,0.40)' : 'none',
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '44px', height: '44px', borderRadius: '10px',
              backgroundColor: skip ? C.red : 'rgba(16,185,129,0.20)',
              alignItems: 'center', justifyContent: 'center', flexShrink: '0',
            }
          },
            h('span', { style: { fontSize: '20px', fontWeight: 800, color: '#FFFFFF' } }, num)
          ),
          h('span', { style: { fontSize: '27px', fontWeight: 700, color: skip ? C.red : C.text } }, label),
          skip ? h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.red, marginLeft: 'auto' } }, 'Wird uebersprungen!') : h('span', {})
        )
      ))
    ),
    keyLearning('Warum Schritt 3 entscheidend ist — und was passiert wenn du ihn auslasst.', C.red),
    footer()
  ]);

  // =========================================================
  // SLIDE 2 — STAT HERO: Das Risiko ohne Absicherung
  // =========================================================
  const riskSvg = `<svg width="860" height="240" viewBox="0 0 860 240" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="200" x2="860" y2="200" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <rect x="30" y="80" width="160" height="120" rx="8" fill="rgba(239,68,68,0.50)"/>
    <rect x="230" y="50" width="160" height="150" rx="8" fill="rgba(239,68,68,0.65)"/>
    <rect x="430" y="30" width="160" height="170" rx="8" fill="rgba(239,68,68,0.80)"/>
    <rect x="630" y="10" width="160" height="190" rx="8" fill="rgba(239,68,68,0.95)"/>
  </svg>`;
  const riskSrc = 'data:image/svg+xml;base64,' + Buffer.from(riskSvg).toString('base64');

  const slide2 = slideWrap([
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      badge('DAS RISIKO'),
      logoImg(120)
    ),
    headline('1 von 4 Arbeitnehmern wird berufsunfaehig.', 56),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px',
          backgroundColor: 'rgba(239,68,68,0.10)', borderRadius: '20px', padding: '28px 34px',
          border: '2px solid rgba(239,68,68,0.30)'
        }
      },
        h('span', { style: { fontSize: '110px', fontWeight: 800, color: C.red, lineHeight: '1', letterSpacing: '-4px' } }, '1/4'),
        h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } },
          'scheidet vor dem 65. Lebensjahr krankheitsbedingt aus dem Beruf aus'
        )
      ),
      h('img', { src: riskSrc, width: 860, height: 240, style: { objectFit: 'contain', width: '100%' } }),
      h('div', { style: { display: 'flex', justifyContent: 'space-around' } },
        ...(['25 J.', '35 J.', '45 J.', '55 J.'].map(age =>
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, age)
        ))
      ),
      h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, textAlign: 'center' } }, 'Kumulatives BU-Risiko je Altersgruppe — steigt mit jedem Jahrzehnt')
    ),
    keyLearning('ETF-Depot allein genuegt nicht — ohne BU-Schutz ist alles auf Sand gebaut.', C.red),
    footer()
  ]);

  // =========================================================
  // SLIDE 3 — PROBLEM FLOW: Der Dominoeffekt
  // =========================================================
  const slide3 = slideWrap([
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      badge('DER DOMINOEFFEKT'),
      logoImg(120)
    ),
    headline('So verliert man\nalles — auch mit\nETF-Depot.', 58),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '10px' } },
      ...([
        { num: '01', title: 'Unfall oder schwere Krankheit', detail: 'Trifft jeden — unabhaengig von Alter oder Fitness', bg: C.cardBg, tc: C.text },
        { num: '02', title: 'Einkommen faellt weg', detail: 'Staatliche Erwerbsminderungsrente: ca. 900 EUR/Monat', bg: 'rgba(239,68,68,0.08)', tc: C.red },
        { num: '03', title: 'Sparplan muss pausieren', detail: 'Zinseszins bricht ab — jahrelanger Aufbau unterbrochen', bg: 'rgba(239,68,68,0.12)', tc: C.red },
        { num: '04', title: 'Ersparnisse aufbrauchen', detail: 'Das muehsam aufgebaute Depot wird aufgeloest', bg: 'rgba(239,68,68,0.18)', tc: C.red },
        { num: '05', title: 'Altersarmut trotz Disziplin', detail: 'Jahrzehnte sparen — durch ein Ereignis zunichte', bg: 'rgba(239,68,68,0.24)', tc: C.red },
      ].map(({ num, title, detail, bg, tc }) =>
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: bg, borderRadius: '12px', padding: '14px 20px' } },
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: tc, minWidth: '44px' } }, num),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '2px' } },
            h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, title),
            h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, detail)
          )
        )
      ))
    ),
    keyLearning('Erst absichern — dann investieren. Diese Reihenfolge ist nicht verhandelbar.', C.red),
    footer()
  ]);

  // =========================================================
  // SLIDE 4 — ERWARTUNG vs. REALITAET
  // =========================================================
  const slide4 = slideWrap([
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      badge('MYTHOS ENTLARVT'),
      logoImg(120)
    ),
    headline('Was die meisten\ndenken vs. was\nwirklich stimmt.', 56),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      h('div', { style: { display: 'flex', gap: '14px', flex: '1', maxHeight: '480px' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg, borderRadius: '20px', padding: '26px', gap: '12px' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'ERWARTUNG'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.45' } },
            '"Ich bin jung und gesund — Versicherungen kommen spaeter."'
          ),
          h('div', { style: { display: 'flex', height: '1px', backgroundColor: C.border } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.45' } },
            '"Erst Geld sparen, dann absichern."'
          ),
          h('div', { style: { display: 'flex', height: '1px', backgroundColor: C.border } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.45' } },
            '"BU-Versicherung ist teuer und unnoetig."'
          )
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '26px', gap: '12px' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: 'rgba(0,31,97,0.5)' } }, 'REALITAET'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(0,31,97,0.12)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: '#001F61', lineHeight: '1.45' } },
            'BU-Faelle treffen am haeufigsten 30- bis 45-Jaehrige.'
          ),
          h('div', { style: { display: 'flex', height: '1px', backgroundColor: 'rgba(0,31,97,0.1)' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: '#001F61', lineHeight: '1.45' } },
            'Ohne BU loest du das Depot auf — bevor Zinseszins wirkt.'
          ),
          h('div', { style: { display: 'flex', height: '1px', backgroundColor: 'rgba(0,31,97,0.1)' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: '#001F61', lineHeight: '1.45' } },
            'BU mit 25 kostet ca. 40 EUR/Monat — spaeter das Dreifache.'
          )
        )
      ),
      h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(16,185,129,0.08)', borderRadius: '12px', padding: '16px 22px', border: '1px solid rgba(16,185,129,0.25)' } },
        h('div', { style: { display: 'flex', width: '6px', minHeight: '32px', backgroundColor: C.green, borderRadius: '3px' } }),
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } },
          'Je frueher du abschliessest, desto guenstiger bleibt die BU-Praemie.'
        )
      )
    ),
    footer()
  ]);

  // =========================================================
  // SLIDE 5 — DER 5-SCHRITTE-FAHRPLAN
  // =========================================================
  const slide5 = slideWrap([
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      badge('DEIN FAHRPLAN'),
      logoImg(120)
    ),
    headline('5 Schritte zur\nfinanziellen\nFreiheit.', 64),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '12px' } },
      ...([
        { num: '01', title: 'Notgroschen', detail: '3 Monatsgehaelter auf Tagesgeld', green: false },
        { num: '02', title: 'Schulden tilgen', detail: 'Zinsen ueber 5%? Zuerst zurueckzahlen', green: false },
        { num: '03', title: 'Absicherung', detail: 'BU + Risikoleben + Haftpflicht', green: true },
        { num: '04', title: 'ETF-Sparplan', detail: 'Ab 50 EUR/Monat — MSCI World oder FTSE All-World', green: false },
        { num: '05', title: 'Optimieren', detail: 'bAV, VL, Steuern — jeden Hebel nutzen', green: false },
      ].map(({ num, title, detail, green: isGreen }) =>
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: '16px',
            backgroundColor: isGreen ? 'rgba(16,185,129,0.12)' : C.cardBg,
            borderRadius: '14px', padding: '16px 22px',
            border: isGreen ? '1px solid rgba(16,185,129,0.35)' : 'none',
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '48px', height: '48px', borderRadius: '12px',
              backgroundColor: isGreen ? C.green : 'rgba(255,255,255,0.15)',
              alignItems: 'center', justifyContent: 'center', flexShrink: '0',
            }
          },
            h('span', { style: { fontSize: '22px', fontWeight: 800, color: '#FFFFFF' } }, num)
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '2px' } },
            h('span', { style: { fontSize: '27px', fontWeight: 700, color: isGreen ? C.green : C.text } }, title),
            h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, detail)
          ),
          isGreen ? h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.green, marginLeft: 'auto' } }, 'PFLICHT') : h('span', {})
        )
      ))
    ),
    keyLearning('Schritt 1-3 zuerst — ohne Fundament ist jede Investition ein Risiko.'),
    footer()
  ]);

  // =========================================================
  // SLIDE 6 — RECHENBEISPIEL: Fruhstart vs. Spaetstart
  // =========================================================
  const slide6 = slideWrap([
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      badge('DER ZINSESZINS'),
      logoImg(120)
    ),
    headline('Was 10 Jahre\nFruehstart wirklich\nbedeutet.', 60),
    subline('150 EUR/Monat ETF-Sparplan bei 7% p.a.'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      h('div', { style: { display: 'flex', gap: '14px' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(16,185,129,0.10)', borderRadius: '20px', padding: '24px', gap: '8px', border: '1px solid rgba(16,185,129,0.30)' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'START MIT 25'),
          h('div', { style: { display: 'flex', height: '2px', backgroundColor: C.green, borderRadius: '1px', opacity: '0.4' } }),
          h('span', { style: { fontSize: '44px', fontWeight: 800, color: C.green, lineHeight: '1.1' } }, '395.000 EUR'),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, 'mit 65 Jahren'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textSoft } }, '40 Jahre | Eingezahlt: 72.000 EUR')
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg, borderRadius: '20px', padding: '24px', gap: '8px' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'START MIT 35'),
          h('div', { style: { display: 'flex', height: '2px', backgroundColor: C.border, borderRadius: '1px' } }),
          h('span', { style: { fontSize: '44px', fontWeight: 800, color: C.textSoft, lineHeight: '1.1' } }, '184.000 EUR'),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, 'mit 65 Jahren'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textSoft } }, '30 Jahre | Eingezahlt: 54.000 EUR')
        )
      ),
      // Visual bar comparison
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
        h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.textMuted, letterSpacing: '2px' } }, 'ENDVERMOEGEN IM VERGLEICH'),
        h('div', { style: { display: 'flex', gap: '12px', alignItems: 'flex-end', height: '80px' } },
          h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', gap: '6px' } },
            h('div', { style: { display: 'flex', width: '100%', height: '70px', backgroundColor: C.green, borderRadius: '8px 8px 0 0' } }),
            h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.green } }, 'Fruehstart')
          ),
          h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', gap: '6px' } },
            h('div', { style: { display: 'flex', width: '100%', height: '33px', backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: '8px 8px 0 0' } }),
            h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted } }, 'Spaetstart')
          )
        )
      ),
      h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(16,185,129,0.08)', borderRadius: '12px', padding: '16px 22px', border: '1px solid rgba(16,185,129,0.20)' } },
        h('div', { style: { display: 'flex', width: '6px', minHeight: '32px', backgroundColor: C.green, borderRadius: '3px' } }),
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } },
          '10 Jahre frueher starten = 211.000 EUR mehr Vermoegen bei gleicher Sparrate.'
        )
      )
    ),
    footer()
  ]);

  // =========================================================
  // SLIDE 7 — 4 TAKEAWAYS
  // =========================================================
  const learnings = [
    { num: '01', text: 'Notgroschen zuerst — 3 Monatsgehaelter auf Tagesgeld parken', pct: 25 },
    { num: '02', text: 'Schulden tilgen wenn Zinssatz ueber 5% — vor dem Investieren', pct: 50 },
    { num: '03', text: 'BU + RLV + PHV sind Pflicht — kein ETF ohne Absicherung', pct: 75 },
    { num: '04', text: 'Sofort anfangen — Zeit ist dein wertvollster Vermoegenswert', pct: 100 },
  ];

  const slide7 = slideWrap([
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      badge('DEINE LEARNINGS'),
      logoImg(120)
    ),
    headline('Das nimmst du\njetzt mit.', 64),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px',
            padding: '18px 22px', backgroundColor: C.cardBg, borderRadius: '16px'
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
            h('span', { style: { fontSize: '34px', fontWeight: 800, color: l.pct === 100 ? C.green : C.text, minWidth: '52px' } }, l.num),
            h('span', { style: { fontSize: '25px', fontWeight: 600, color: C.text, lineHeight: '1.3' } }, l.text)
          ),
          h('div', { style: { display: 'flex', height: '6px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: l.pct + '%', height: '6px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px' } })
          )
        )
      )
    ),
    keyLearning('Die Reihenfolge ist entscheidend — nicht die Hoehe des Betrags.', C.green),
    footer()
  ]);

  // =========================================================
  // SLIDE 8 — CTA
  // =========================================================
  const slide8 = slideWrap([
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      badge('JETZT STARTEN'),
      logoImg(120)
    ),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '28px' } },
      logoImg(140),
      h('span', { style: { fontSize: '50px', fontWeight: 800, color: C.text, textAlign: 'center', lineHeight: '1.1', letterSpacing: '-1px' } },
        'Wo stehst du in\ndeinem Finanz-\nFahrplan?'
      ),
      h('span', { style: { fontSize: '28px', fontWeight: 500, color: C.textMuted, textAlign: 'center', lineHeight: '1.5' } },
        'Schreib uns in die Kommentare.\nWir helfen dir beim naechsten Schritt.'
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' } },
        h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.green } }, 'Speichern nicht vergessen'),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, 'damit du den Fahrplan immer griffbereit hast')
      )
    ),
    footer()
  ]);

  // =========================================================
  // GENERATE ALL SLIDES
  // =========================================================
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  const outDir = path.join(__dirname, 'output', 'carousel_2026-07-18', 'slides');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} done -> ${pngPath}`);
  }
  console.log('All slides generated!');
}

main().catch(e => { console.error(e); process.exit(1); });
