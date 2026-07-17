// Carousel: Freistellungsauftrag 2026 — Der 1.000 EUR Steuervorteil den 63% vergessen
// Inspiration: @finanzcopilot — Steuer-Content, hochaktuelles Follow-Up zur Vorabpauschale
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
    bg: '#001f61',
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

  function slideWrap(children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column', width: W, height: H,
        padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
      }
    },
      h('div', { style: { display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' } },
        logoImg(120)
      ),
      ...children
    );
  }

  // =========================================================
  // SLIDE 1 — HOOK
  // =========================================================
  const slide1 = slideWrap([
    badge('ACHTUNG'),
    headline('Dein Broker zieht Steuern ab — obwohl er das nicht muss.', 56),
    subline('1.000 EUR im Jahr sind steuerfrei. Aber nur wenn du aktiv wirst.'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      h('div', { style: { display: 'flex', gap: '18px' } },
        // Card: OHNE Freistellungsauftrag
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', gap: '14px',
            backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '20px', padding: '32px 20px',
            border: '2px solid rgba(239,68,68,0.35)'
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '3px', color: C.red } }, 'OHNE FA'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(239,68,68,0.3)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '62px', fontWeight: 800, color: C.red, lineHeight: '1' } }, '263'),
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.red } }, 'EUR Steuer'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, textAlign: 'center', lineHeight: '1.4' } }, 'auf 1.000 EUR Kapitalertrage/Jahr')
        ),
        // Card: MIT Freistellungsauftrag
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', gap: '14px',
            backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '20px', padding: '32px 20px',
            border: '2px solid rgba(16,185,129,0.35)'
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '3px', color: C.green } }, 'MIT FA'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(16,185,129,0.3)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '62px', fontWeight: 800, color: C.green, lineHeight: '1' } }, '0'),
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.green } }, 'EUR Steuer'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, textAlign: 'center', lineHeight: '1.4' } }, 'auf 1.000 EUR Kapitalertrage/Jahr')
        )
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px'
        }
      },
        h('span', { style: { fontSize: '29px', fontWeight: 700, color: C.text, textAlign: 'center', lineHeight: '1.4' } },
          'Der Freistellungsauftrag ist kostenlos, dauert 2 Minuten — und kaum jemand nutzt ihn.'
        )
      )
    ),
    keyLearning('Lies alle 8 Slides — am Ende weisst du, wie du sofort Steuern sparst.'),
    footer()
  ]);

  // =========================================================
  // SLIDE 2 — STAT HERO: 63% ohne Freistellungsauftrag
  // =========================================================
  const barSvg = `<svg width="900" height="280" viewBox="0 0 900 280" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="240" x2="900" y2="240" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <line x1="0" y1="180" x2="900" y2="180" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <line x1="0" y1="120" x2="900" y2="120" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <line x1="0" y1="60" x2="900" y2="60" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <rect x="40" y="192" width="140" height="48" rx="6" fill="rgba(239,68,68,0.65)"/>
    <rect x="240" y="158" width="140" height="82" rx="6" fill="rgba(239,68,68,0.55)"/>
    <rect x="440" y="130" width="140" height="110" rx="6" fill="rgba(16,185,129,0.55)"/>
    <rect x="640" y="96" width="140" height="144" rx="6" fill="rgba(16,185,129,0.80)"/>
  </svg>`;
  const barSrc = 'data:image/svg+xml;base64,' + Buffer.from(barSvg).toString('base64');

  const slide2 = slideWrap([
    badge('DAS PROBLEM'),
    headline('63% verschenken 1.000 EUR im Jahr.', 56),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '22px' } },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px',
          backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '20px', padding: '28px 34px',
          border: '2px solid rgba(239,68,68,0.3)'
        }
      },
        h('span', { style: { fontSize: '120px', fontWeight: 800, color: C.red, lineHeight: '1', letterSpacing: '-4px' } }, '63%'),
        h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } },
          'haben keinen gultig gestellten Freistellungsauftrag'
        )
      ),
      // Bar chart with age groups
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
        h('img', { src: barSrc, width: 900, height: 280, style: { objectFit: 'contain', width: '100%' } }),
        h('div', { style: { display: 'flex', justifyContent: 'space-around', paddingTop: '4px' } },
          ...[ ['18-30', '20%', C.red], ['31-45', '34%', C.red], ['46-60', '46%', C.green], ['60+', '60%', C.green] ].map(([age, pct, color]) =>
            h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' } },
              h('span', { style: { fontSize: '26px', fontWeight: 800, color: color } }, pct),
              h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, age)
            )
          )
        ),
        h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, textAlign: 'center', marginTop: '4px' } }, 'Anteil MIT gesetztem Freistellungsauftrag — nach Alter')
      )
    ),
    keyLearning('Besonders junge Anleger verlieren Jahr fur Jahr Geld — obwohl es gratis zu verhindern ware.'),
    footer()
  ]);

  // =========================================================
  // SLIDE 3 — PROBLEM: Wie viel verlierst du wirklich?
  // =========================================================
  const slide3 = slideWrap([
    badge('DEINE STEUERLUCKE'),
    headline('So viel zahlst du unnotigerweise ans Finanzamt.', 52),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      ...[
        { depot: '10.000 EUR Depot', zinsen: '250 EUR Ertrage (2,5% p.a.)', tax: '65 EUR/Jahr', pct: 25, isHigh: false },
        { depot: '25.000 EUR Depot', zinsen: '625 EUR Ertrage (2,5% p.a.)', tax: '163 EUR/Jahr', pct: 50, isHigh: false },
        { depot: '50.000 EUR Depot', zinsen: '1.250 EUR Ertrage (2,5% p.a.)', tax: '263 EUR/Jahr', pct: 100, isHigh: true },
      ].map((item) =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px', padding: '22px 26px',
            backgroundColor: C.cardBg, borderRadius: '18px',
            border: item.isHigh ? '2px solid rgba(239,68,68,0.4)' : '2px solid transparent'
          }
        },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: '3px' } },
              h('span', { style: { fontSize: '27px', fontWeight: 700, color: C.text } }, item.depot),
              h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, item.zinsen)
            ),
            h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' } },
              h('span', { style: { fontSize: '30px', fontWeight: 800, color: item.isHigh ? C.red : C.textSoft } }, item.tax),
              h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'verschenkt')
            )
          ),
          h('div', { style: { display: 'flex', height: '8px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: item.pct + '%', height: '8px', backgroundColor: item.isHigh ? C.red : C.textMuted, borderRadius: '4px' } })
          )
        )
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '14px',
          backgroundColor: 'rgba(239,68,68,0.10)', borderRadius: '14px', padding: '18px 22px',
          border: '1px solid rgba(239,68,68,0.25)'
        }
      },
        h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '6px', backgroundColor: C.red, flexShrink: '0', marginTop: '4px' } }),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.red, lineHeight: '1.4' } },
          'Ohne Freistellungsauftrag: Bis 263 EUR Steuern pro Jahr — uber 10 Jahre sind das 2.630 EUR verloren'
        )
      )
    ),
    keyLearning('Mit dem Freistellungsauftrag: 0 EUR — und das Geld bleibt komplett im Depot.', C.red),
    footer()
  ]);

  // =========================================================
  // SLIDE 4 — ERWARTUNG vs REALITAT: 3 Mythen
  // =========================================================
  const slide4 = slideWrap([
    badge('IRRTUM AUFGEDECKT'),
    headline('Was die meisten denken — und was wirklich stimmt.', 52),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      ...[
        {
          mythos: '"Die Bank stellt den Freistellungsauftrag automatisch ein."',
          fakt: 'Nein — du musst ihn aktiv beantragen. Pro Bank einzeln.'
        },
        {
          mythos: '"Einmal ausgefullt gilt er fur immer."',
          fakt: 'Beim Bankwechsel, Kontoschliessung oder Depot-Ubertrag verfällt der FA.'
        },
        {
          mythos: '"Das lohnt sich erst bei grossem Depot."',
          fakt: 'Schon ab 250 EUR Ertragen im Jahr sparst du uber 65 EUR Steuern — kostenlos.'
        }
      ].map(item =>
        h('div', { style: { display: 'flex', gap: '12px' } },
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(239,68,68,0.10)',
              borderRadius: '16px', padding: '20px 22px', gap: '8px',
              border: '1px solid rgba(239,68,68,0.20)'
            }
          },
            h('span', { style: { fontSize: '18px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'MYTHOS'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, item.mythos)
          ),
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(16,185,129,0.10)',
              borderRadius: '16px', padding: '20px 22px', gap: '8px',
              border: '1px solid rgba(16,185,129,0.20)'
            }
          },
            h('span', { style: { fontSize: '18px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'FAKT'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, item.fakt)
          )
        )
      )
    ),
    keyLearning('Aktiv handeln zahlt sich aus — die Bank ubernimmt das NICHT fur dich.'),
    footer()
  ]);

  // =========================================================
  // SLIDE 5 — DIE LOSUNG: 3-Schritt Anleitung
  // =========================================================
  const steps = [
    { num: '01', title: 'Einloggen beim Broker oder deiner Bank', desc: 'App oder Online-Banking offnen. Meist unter "Steuer", "Service" oder "Einstellungen".' },
    { num: '02', title: '"Freistellungsauftrag" suchen und offnen', desc: 'Feld fur den jahrlichen Betrag ausfullen. Maximalbetrag: 1.000 EUR (Single) oder 2.000 EUR (Eheleute).' },
    { num: '03', title: 'Betrag festlegen und bestatigen', desc: 'Sofort wirksam — auch ruckwirkend fur das laufende Kalenderjahr. Fertig.' },
  ];

  const slide5 = slideWrap([
    badge('DIE LOSUNG'),
    headline('In 3 Schritten zum kostenlosen Steuervorteil.', 54),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '0' } },
      ...steps.flatMap((step, i) => [
        h('div', {
          style: {
            display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '24px 28px',
            backgroundColor: C.cardBg, borderRadius: '18px'
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '58px', height: '58px', borderRadius: '14px',
              backgroundColor: i === 2 ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.12)',
              alignItems: 'center', justifyContent: 'center', flexShrink: '0',
              border: i === 2 ? '2px solid rgba(16,185,129,0.6)' : '2px solid transparent'
            }
          },
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: i === 2 ? C.green : C.text } }, step.num)
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
            h('span', { style: { fontSize: '27px', fontWeight: 700, color: C.text, lineHeight: '1.3' } }, step.title),
            h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, step.desc)
          )
        ),
        i < steps.length - 1 ? h('div', { style: { display: 'flex', justifyContent: 'center', padding: '4px 0' } },
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
            h('div', { style: { display: 'flex', width: '4px', height: '22px', backgroundColor: 'rgba(255,255,255,0.20)' } }),
            h('div', { style: { display: 'flex', width: '0', height: '0', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid rgba(255,255,255,0.20)' } })
          )
        ) : h('div', { style: { display: 'flex' } })
      ])
    ),
    keyLearning('Zeitaufwand: 2 Minuten. Steuerersparnis: bis 263 EUR pro Jahr. Immer und immer wieder.', C.green),
    footer()
  ]);

  // =========================================================
  // SLIDE 6 — PROFI-TIPP: Mehrere Banken und Eheleute
  // =========================================================
  const slide6 = slideWrap([
    badge('PROFI-TIPP'),
    headline('Mehrere Banken? So teilst du richtig auf.', 56),
    subline('Den Gesamtbetrag kannst du beliebig auf Konten und Banken aufteilen.'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      h('div', { style: { display: 'flex', gap: '18px' } },
        // Card: Single
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg,
            borderRadius: '20px', padding: '28px', gap: '14px'
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '3px', color: C.textMuted } }, 'SINGLE'),
          h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: C.border } }),
          h('span', { style: { fontSize: '46px', fontWeight: 800, color: C.green, lineHeight: '1' } }, '1.000 EUR'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Jahresbetrag — auf alle Banken zusammen'),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' } },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '10px' } },
              h('span', { style: { fontSize: '22px', color: C.textSoft } }, 'Scalable Capital'),
              h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.text } }, '600 EUR')
            ),
            h('div', { style: { display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '10px' } },
              h('span', { style: { fontSize: '22px', color: C.textSoft } }, 'Tagesgeldkonto'),
              h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.text } }, '400 EUR')
            )
          )
        ),
        // Card: Eheleute
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg,
            borderRadius: '20px', padding: '28px', gap: '14px'
          }
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '3px', color: C.textMuted } }, 'EHELEUTE'),
          h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: C.border } }),
          h('span', { style: { fontSize: '46px', fontWeight: 800, color: C.green, lineHeight: '1' } }, '2.000 EUR'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Gemeinsam oder je 1.000 EUR einzeln'),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' } },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '10px' } },
              h('span', { style: { fontSize: '22px', color: C.textSoft } }, 'Ehepartner 1'),
              h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.text } }, '1.000 EUR')
            ),
            h('div', { style: { display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '10px' } },
              h('span', { style: { fontSize: '22px', color: C.textSoft } }, 'Ehepartner 2'),
              h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.text } }, '1.000 EUR')
            )
          )
        )
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'flex-start', gap: '12px',
          backgroundColor: 'rgba(239,68,68,0.10)', borderRadius: '14px', padding: '18px 22px',
          border: '1px solid rgba(239,68,68,0.25)'
        }
      },
        h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '6px', backgroundColor: C.red, flexShrink: '0', marginTop: '7px' } }),
        h('span', { style: { fontSize: '25px', fontWeight: 600, color: C.red, lineHeight: '1.4' } },
          'Wichtig: Gesamtbetrag uber alle Banken darf 1.000 EUR (Single) nicht uberschreiten — das Finanzamt gleicht ab!'
        )
      )
    ),
    keyLearning('Aufteilen ist erlaubt und sinnvoll — uberschreiten wird automatisch korrigiert.'),
    footer()
  ]);

  // =========================================================
  // SLIDE 7 — LEARNINGS: 4 Takeaways
  // =========================================================
  const learnings = [
    { num: '01', text: 'Freistellungsauftrag stellen — kostenlos, sofort, bei jeder Bank einzeln.', pct: 25 },
    { num: '02', text: '1.000 EUR/Jahr steuerfrei (Single) | 2.000 EUR/Jahr (Eheleute).', pct: 50 },
    { num: '03', text: 'Gilt ab Antragsdatum — auch ruckwirkend im laufenden Kalenderjahr.', pct: 75 },
    { num: '04', text: 'Bankwechsel? Freistellungsauftrag bei neuer Bank immer neu beantragen.', pct: 100 },
  ];

  const slide7 = slideWrap([
    badge('DEINE TAKEAWAYS'),
    headline('4 Dinge, die du jetzt weisst.', 60),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px',
            padding: '20px 24px', backgroundColor: C.cardBg, borderRadius: '18px'
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', { style: { fontSize: '36px', fontWeight: 800, color: l.pct === 100 ? C.green : C.text, minWidth: '56px' } }, l.num),
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3' } }, l.text)
          ),
          h('div', { style: { display: 'flex', height: '6px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: l.pct + '%', height: '6px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px' } })
          )
        )
      )
    ),
    keyLearning('Kostenloser Steuervorteil — jetzt sofort in der Banking-App umsetzen.', C.green),
    footer()
  ]);

  // =========================================================
  // SLIDE 8 — CTA
  // =========================================================
  const slide8 = slideWrap([
    badge('UND JETZT DU'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '28px' } },
      headline('Hast du deinen Freistellungsauftrag bereits gestellt?', 50),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
          backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '20px', padding: '28px 36px',
          border: '2px solid rgba(16,185,129,0.35)', width: '100%'
        }
      },
        h('span', { style: { fontSize: '32px', fontWeight: 700, color: C.text, textAlign: 'center', lineHeight: '1.35' } },
          'Schreib "JA" oder "NEIN" in die Kommentare.'
        ),
        h('span', { style: { fontSize: '27px', fontWeight: 500, color: C.textSoft, textAlign: 'center', lineHeight: '1.4' } },
          'Wir antworten auf jeden Kommentar.'
        )
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center', width: '100%' } },
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: C.cardBg, borderRadius: '16px', padding: '18px 32px', width: '100%'
          }
        },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.green } }, 'Speichern nicht vergessen')
        ),
        h('span', { style: { fontSize: '27px', fontWeight: 500, color: C.textMuted, textAlign: 'center', lineHeight: '1.4' } },
          'Folge @benarofinanzen fur mehr\nkostenlose Steuertipps und Finanzwissen.'
        )
      )
    ),
    footer()
  ]);

  // =========================================================
  // GENERATE ALL SLIDES
  // =========================================================
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  const outDir = path.join(__dirname, 'output', 'carousel_2026-07-17', 'slides');
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
