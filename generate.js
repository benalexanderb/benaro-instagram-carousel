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

  // Benaro Finanzen Brand Colors
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
    green: '#10B981',
  };

  const W = 1080, H = 1350;
  const TODAY = new Date().toISOString().split('T')[0];
  const outDir = path.join(__dirname, 'output', `carousel_${TODAY}`, 'slides');

  const h = (type, props, ...ch) => ({
    type,
    props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  // === REUSABLE COMPONENTS ===

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '16px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.accent, backgroundColor: 'rgba(91,200,245,0.15)',
          padding: '10px 22px', borderRadius: '12px', textTransform: 'uppercase',
          fontFamily: 'Outfit'
        }
      }, text)
    );
  }

  function headline(text, size = 64) {
    return h('span', {
      style: {
        fontSize: `${size}px`, fontWeight: 800, color: C.text,
        lineHeight: '1.05', letterSpacing: '-0.5px', marginBottom: '6px',
        textTransform: 'uppercase', fontFamily: 'Outfit'
      }
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500, color: C.textSoft,
        lineHeight: '1.5', marginTop: '8px', fontFamily: 'Outfit'
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
      h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.text, lineHeight: '1.4', fontFamily: 'Outfit' } }, text)
    );
  }

  function bfLogo() {
    return h('div', {
      style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginTop: '20px' }
    },
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '72px', height: '56px',
          border: '3px solid rgba(255,255,255,0.9)', borderRadius: '10px'
        }
      },
        h('span', { style: { fontSize: '28px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '2px', fontFamily: 'Outfit' } }, 'BF')
      ),
      h('span', {
        style: {
          fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.7)',
          letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'Outfit'
        }
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

  // === SLIDE 1: HOOK ===
  // Akt 1 — Spannung: Schockierender Hook über Black Friday Konsum

  const euroIconSvg = `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(230,48,48,0.6)" stroke-width="8"/>
    <circle cx="100" cy="100" r="70" fill="rgba(91,200,245,0.15)" stroke="rgba(91,200,245,0.4)" stroke-width="4"/>
    <line x1="100" y1="40" x2="100" y2="160" stroke="#5BC8F5" stroke-width="12" stroke-linecap="round"/>
    <line x1="60" y1="80" x2="140" y2="80" stroke="#5BC8F5" stroke-width="8" stroke-linecap="round"/>
    <line x1="60" y1="120" x2="140" y2="120" stroke="#5BC8F5" stroke-width="8" stroke-linecap="round"/>
  </svg>`;

  // Drei große Einkaufstaschen-Symbole als SVG
  const shoppingSvg = `<svg width="860" height="400" viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg">
    <!-- Einkaufstasche 1 -->
    <rect x="80" y="140" width="180" height="220" rx="20" fill="rgba(230,48,48,0.25)" stroke="${C.red}" stroke-width="4"/>
    <path d="M 110 140 Q 110 90 170 90 Q 230 90 230 140" fill="none" stroke="${C.red}" stroke-width="6" stroke-linecap="round"/>
    <line x1="110" y1="200" x2="230" y2="200" stroke="${C.red}" stroke-width="3" stroke-dasharray="8,4"/>

    <!-- Einkaufstasche 2 (Mitte, größer) -->
    <rect x="330" y="100" width="200" height="260" rx="22" fill="rgba(230,48,48,0.35)" stroke="${C.red}" stroke-width="5"/>
    <path d="M 365 100 Q 365 42 430 42 Q 495 42 495 100" fill="none" stroke="${C.red}" stroke-width="7" stroke-linecap="round"/>
    <line x1="365" y1="168" x2="495" y2="168" stroke="${C.red}" stroke-width="3" stroke-dasharray="8,4"/>

    <!-- Einkaufstasche 3 -->
    <rect x="600" y="140" width="180" height="220" rx="20" fill="rgba(230,48,48,0.25)" stroke="${C.red}" stroke-width="4"/>
    <path d="M 630 140 Q 630 90 690 90 Q 750 90 750 140" fill="none" stroke="${C.red}" stroke-width="6" stroke-linecap="round"/>
    <line x1="630" y1="200" x2="750" y2="200" stroke="${C.red}" stroke-width="3" stroke-dasharray="8,4"/>

    <!-- Rotes X über allen Taschen -->
    <line x1="60" y1="60" x2="800" y2="380" stroke="rgba(230,48,48,0.4)" stroke-width="6" stroke-linecap="round"/>
    <line x1="800" y1="60" x2="60" y2="380" stroke="rgba(230,48,48,0.4)" stroke-width="6" stroke-linecap="round"/>
  </svg>`;

  const slide1 = slide([
    badge('ACHTUNG — BLACK FRIDAY'),
    headline('500 EUR IN DEINEN HÄNDEN.', 68),
    headline('WAS MACHST DU DAMIT?', 68),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' } },
      h('img', {
        src: `data:image/svg+xml;base64,${Buffer.from(shoppingSvg).toString('base64')}`,
        width: 860, height: 400, style: { objectFit: 'contain' }
      }),
      h('div', { style: { display: 'flex', gap: '20px', marginTop: '10px' } },
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(230,48,48,0.2)', border: `2px solid ${C.red}`,
            borderRadius: '14px', padding: '14px 28px'
          }
        },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.red, fontFamily: 'Outfit' } }, 'AUSGEBEN?')
        ),
        h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.textMuted, alignSelf: 'center', fontFamily: 'Outfit' } }, 'ODER'),
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(91,200,245,0.2)', border: `2px solid ${C.accent}`,
            borderRadius: '14px', padding: '14px 28px'
          }
        },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.accent, fontFamily: 'Outfit' } }, 'INVESTIEREN?')
        ),
      )
    ),
    keyLearning('Jedes Jahr dasselbe: Black Friday verführt zur Spontanausgabe.'),
    bfLogo(),
  ]);

  // === SLIDE 2: DATEN — Wie viel Deutsche wirklich ausgeben ===
  // Akt 1 — Spannung: Shocking data

  const spendingBarSvg = `<svg width="860" height="360" viewBox="0 0 860 360" xmlns="http://www.w3.org/2000/svg">
    <!-- Hintergrund-Gitter -->
    <line x1="80" y1="40" x2="80" y2="300" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <line x1="80" y1="300" x2="800" y2="300" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>

    <!-- Balken: Lebensmittel -->
    <rect x="120" y="220" width="100" height="80" rx="8" fill="rgba(255,255,255,0.2)"/>
    <!-- Balken: Elektronik -->
    <rect x="280" y="160" width="100" height="140" rx="8" fill="rgba(255,255,255,0.3)"/>
    <!-- Balken: Mode (höchster) -->
    <rect x="440" y="80" width="100" height="220" rx="8" fill="${C.red}"/>
    <!-- Balken: Haushalt -->
    <rect x="600" y="190" width="100" height="110" rx="8" fill="rgba(255,255,255,0.2)"/>

    <!-- Rot blinkende Markierung bei Mode-Balken -->
    <rect x="435" y="75" width="110" height="230" rx="10" fill="none" stroke="${C.red}" stroke-width="4" stroke-dasharray="10,4"/>

    <!-- Pfeil nach oben bei Mode -->
    <line x1="490" y1="40" x2="490" y2="75" stroke="${C.red}" stroke-width="4" stroke-linecap="round"/>
    <line x1="470" y1="58" x2="490" y2="40" stroke="${C.red}" stroke-width="4" stroke-linecap="round"/>
    <line x1="510" y1="58" x2="490" y2="40" stroke="${C.red}" stroke-width="4" stroke-linecap="round"/>

    <!-- Trennlinie bei 487 EUR -->
    <line x1="80" y1="130" x2="800" y2="130" stroke="rgba(91,200,245,0.4)" stroke-width="2" stroke-dasharray="12,6"/>
  </svg>`;

  const slide2 = slide([
    badge('DIE ERSCHRECKENDE ZAHL'),
    headline('WAS DEUTSCHE AN BLACK FRIDAY AUSGEBEN', 56),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '24px' } },
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' } },
        h('span', { style: { fontSize: '130px', fontWeight: 800, color: C.accent, lineHeight: '1', fontFamily: 'Outfit' } }, '487 €'),
        h('div', { style: { display: 'flex', width: '200px', height: '5px', backgroundColor: C.red, borderRadius: '3px' } }),
        h('span', { style: { fontSize: '28px', fontWeight: 500, color: C.textSoft, textAlign: 'center', fontFamily: 'Outfit' } }, 'Durchschnittliche Ausgaben pro Person'),
      ),
      h('img', {
        src: `data:image/svg+xml;base64,${Buffer.from(spendingBarSvg).toString('base64')}`,
        width: 860, height: 360, style: { objectFit: 'contain' }
      }),
      h('div', { style: { display: 'flex', gap: '24px', justifyContent: 'center' } },
        ...[
          { label: 'Lebensmittel', pct: '8%' },
          { label: 'Elektronik', pct: '24%' },
          { label: 'Mode', pct: '41%', highlight: true },
          { label: 'Haushalt', pct: '19%' },
        ].map(item =>
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' } },
            h('span', {
              style: {
                fontSize: '22px', fontWeight: 700,
                color: item.highlight ? C.red : C.textMuted,
                fontFamily: 'Outfit'
              }
            }, item.pct),
            h('span', {
              style: {
                fontSize: '20px', fontWeight: 500,
                color: item.highlight ? C.text : C.textMuted,
                fontFamily: 'Outfit'
              }
            }, item.label),
          )
        )
      ),
    ),
    keyLearning('Das Geld ist weg — und das Produkt verliert sofort an Wert.'),
    bfLogo(),
  ]);

  // === SLIDE 3: DIE FALLE — Konsum vs. Invest Kontrast ===
  // Akt 1 — Spannung: Was passiert mit 487 EUR?

  const slide3 = slide([
    badge('DIE GELDFALLE'),
    headline('ZWEI WEGE FÜR 500 EUR', 60),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '24px' } },
      h('div', { style: { display: 'flex', gap: '20px' } },
        // Links: Ausgeben
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '16px',
            backgroundColor: C.bgDark, borderRadius: '20px', padding: '28px',
            border: `2px solid ${C.red}`
          }
        },
          h('span', { style: { fontSize: '22px', fontWeight: 700, letterSpacing: '2px', color: C.red, textTransform: 'uppercase', fontFamily: 'Outfit' } }, 'WEG A: AUSGEBEN'),
          h('div', { style: { display: 'flex', width: '100%', height: '4px', backgroundColor: C.red, borderRadius: '2px' } }),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
            ...[
              'Neues Smartphone gekauft',
              'Wert sofort -20 %',
              'In 2 Jahren veraltet',
              'Geld: komplett weg',
            ].map((text, i) =>
              h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
                h('div', { style: { display: 'flex', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(230,48,48,0.2)', border: `2px solid ${C.red}`, alignItems: 'center', justifyContent: 'center', flexShrink: '0' } },
                  h('span', { style: { fontSize: '16px', fontWeight: 800, color: C.red, fontFamily: 'Outfit' } }, `${i + 1}`)
                ),
                h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, lineHeight: '1.3', fontFamily: 'Outfit' } }, text),
              )
            )
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '8px', gap: '4px' } },
            h('span', { style: { fontSize: '48px', fontWeight: 800, color: C.red, fontFamily: 'Outfit' } }, '0 €'),
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, 'nach 2 Jahren'),
          ),
        ),
        // Rechts: Investieren
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', gap: '16px',
            backgroundColor: 'rgba(91,200,245,0.08)', borderRadius: '20px', padding: '28px',
            border: `2px solid ${C.accent}`
          }
        },
          h('span', { style: { fontSize: '22px', fontWeight: 700, letterSpacing: '2px', color: C.accent, textTransform: 'uppercase', fontFamily: 'Outfit' } }, 'WEG B: INVESTIEREN'),
          h('div', { style: { display: 'flex', width: '100%', height: '4px', backgroundColor: C.accent, borderRadius: '2px' } }),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
            ...[
              'ETF-Einmalanlage getätigt',
              'Wert steigt langfristig',
              'Zinseszins wirkt täglich',
              'Geld: arbeitet für dich',
            ].map((text, i) =>
              h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
                h('div', { style: { display: 'flex', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(91,200,245,0.2)', border: `2px solid ${C.accent}`, alignItems: 'center', justifyContent: 'center', flexShrink: '0' } },
                  h('span', { style: { fontSize: '16px', fontWeight: 800, color: C.accent, fontFamily: 'Outfit' } }, `${i + 1}`)
                ),
                h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, lineHeight: '1.3', fontFamily: 'Outfit' } }, text),
              )
            )
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '8px', gap: '4px' } },
            h('span', { style: { fontSize: '48px', fontWeight: 800, color: C.accent, fontFamily: 'Outfit' } }, '+'),
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, 'wächst weiter'),
          ),
        ),
      ),
    ),
    keyLearning('Konsum vernichtet Kapital. Investitionen vermehren es.'),
    bfLogo(),
  ]);

  // === SLIDE 4: DER WENDEPUNKT — Konkrete Zahlen ===
  // Akt 2 — Auflösung: Was 500 EUR wirklich wert sind

  const growthSvg = `<svg width="860" height="360" viewBox="0 0 860 360" xmlns="http://www.w3.org/2000/svg">
    <!-- Hintergrund-Gitter -->
    <line x1="80" y1="30" x2="80" y2="300" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <line x1="80" y1="300" x2="800" y2="300" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    <line x1="80" y1="200" x2="800" y2="200" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    <line x1="80" y1="100" x2="800" y2="100" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>

    <!-- Rote Linie: Konsum (sofort auf 0) -->
    <path d="M 80 300 L 160 300 L 200 350" fill="none" stroke="${C.red}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="160" cy="300" r="8" fill="${C.red}"/>

    <!-- Blaue Kurve: ETF-Wachstum (7% p.a.) -->
    <!-- Datenpunkte: Jahr 0=300, Jahr5=270, Jahr10=240, Jahr15=170, Jahr20=60 (invertiert, 0 ist unten) -->
    <path d="M 80 300 C 150 295, 250 280, 350 258 C 450 236, 580 180, 720 80"
          fill="none" stroke="${C.accent}" stroke-width="6" stroke-linecap="round"/>
    <!-- Füllung unter der Kurve -->
    <path d="M 80 300 C 150 295, 250 280, 350 258 C 450 236, 580 180, 720 80 L 720 300 Z"
          fill="rgba(91,200,245,0.12)"/>

    <!-- Datenpunkte -->
    <circle cx="80" cy="300" r="8" fill="${C.accent}"/>
    <circle cx="260" cy="280" r="8" fill="${C.accent}"/>
    <circle cx="440" cy="250" r="8" fill="${C.accent}"/>
    <circle cx="620" cy="175" r="8" fill="${C.accent}"/>
    <circle cx="720" cy="80" r="10" fill="${C.accent}" stroke="white" stroke-width="3"/>

    <!-- Vertikale Linie zum Endpunkt -->
    <line x1="720" y1="80" x2="720" y2="300" stroke="rgba(91,200,245,0.3)" stroke-width="2" stroke-dasharray="6,4"/>
  </svg>`;

  const slide4 = slide([
    badge('DIE MATH DAHINTER'),
    headline('500 € × 20 JAHRE × 7 % P.A.', 56),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      // Ergebnis-Highlight
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '10px' } },
        h('div', { style: { display: 'flex', gap: '8px' } },
          ...[0, 1, 2].map(() =>
            h('div', {
              style: {
                display: 'flex', width: '0', height: '0',
                borderLeft: '14px solid transparent', borderRight: '14px solid transparent',
                borderBottom: `20px solid ${C.accent}`
              }
            })
          )
        ),
        h('span', { style: { fontSize: '120px', fontWeight: 800, color: C.accent, lineHeight: '1', fontFamily: 'Outfit' } }, '1.934 €'),
        h('div', { style: { display: 'flex', width: '200px', height: '5px', backgroundColor: C.accent, borderRadius: '3px' } }),
        h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, textAlign: 'center', fontFamily: 'Outfit' } }, 'aus 500 € Einmalinvestition nach 20 Jahren'),
      ),
      h('img', {
        src: `data:image/svg+xml;base64,${Buffer.from(growthSvg).toString('base64')}`,
        width: 860, height: 360, style: { objectFit: 'contain' }
      }),
      // Legende
      h('div', { style: { display: 'flex', gap: '32px', justifyContent: 'center' } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          h('div', { style: { display: 'flex', width: '32px', height: '5px', backgroundColor: C.accent, borderRadius: '3px' } }),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, fontFamily: 'Outfit' } }, 'ETF-Einlage'),
        ),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          h('div', { style: { display: 'flex', width: '32px', height: '5px', backgroundColor: C.red, borderRadius: '3px' } }),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, fontFamily: 'Outfit' } }, 'Konsum'),
        ),
      ),
    ),
    keyLearning('Einmal investiert: Das Geld wächst ohne weiteres Zutun.'),
    bfLogo(),
  ]);

  // === SLIDE 5: SKALIERUNG — Was wenn alle Black Fridays investiert werden ===
  // Akt 2 — Auflösung: Kontinuierliches Investieren

  const compoundSvg = `<svg width="860" height="300" viewBox="0 0 860 300" xmlns="http://www.w3.org/2000/svg">
    <!-- Zeitstrahl -->
    <line x1="80" y1="250" x2="800" y2="250" stroke="rgba(255,255,255,0.2)" stroke-width="3" stroke-linecap="round"/>

    <!-- Jahres-Markierungen -->
    <line x1="80" y1="240" x2="80" y2="260" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    <line x1="225" y1="240" x2="225" y2="260" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    <line x1="370" y1="240" x2="370" y2="260" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    <line x1="515" y1="240" x2="515" y2="260" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    <line x1="660" y1="240" x2="660" y2="260" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    <line x1="800" y1="240" x2="800" y2="260" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>

    <!-- Wachsende Balken (1 Einzahlung/Jahr je 500 EUR) -->
    <rect x="55" y="230" width="50" height="20" rx="4" fill="${C.accent}" opacity="0.5"/>
    <rect x="200" y="200" width="50" height="50" rx="4" fill="${C.accent}" opacity="0.6"/>
    <rect x="345" y="155" width="50" height="95" rx="4" fill="${C.accent}" opacity="0.7"/>
    <rect x="490" y="100" width="50" height="150" rx="4" fill="${C.accent}" opacity="0.85"/>
    <rect x="635" y="40" width="50" height="210" rx="4" fill="${C.accent}"/>
    <rect x="775" y="10" width="50" height="240" rx="4" fill="${C.accent}" stroke="white" stroke-width="2"/>

    <!-- Pfeil-Trend -->
    <path d="M 80 230 C 225 220, 370 165, 515 110 C 580 90, 650 55, 800 20"
          fill="none" stroke="white" stroke-width="3" stroke-dasharray="8,4" stroke-linecap="round"/>
  </svg>`;

  const slide5 = slide([
    badge('DER SCHNEEBALL-EFFEKT'),
    headline('500 € PRO JAHR — JEDES BLACK FRIDAY', 56),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      h('div', { style: { display: 'flex', gap: '20px', justifyContent: 'center' } },
        ...[
          { year: 'Jahr 1', value: '535 €', note: '+7 %' },
          { year: 'Jahr 5', value: '2.950 €', note: 'Zins auf Zins' },
          { year: 'Jahr 10', value: '6.904 €', note: 'Verdopplung' },
          { year: 'Jahr 20', value: '20.491 €', note: '41x Einzahlung' },
        ].map(item =>
          h('div', {
            style: {
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
              backgroundColor: C.bgDark, borderRadius: '16px', padding: '20px 16px',
              border: `1px solid ${C.border}`, flex: '1'
            }
          },
            h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted, fontFamily: 'Outfit' } }, item.year),
            h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.accent, lineHeight: '1.2', fontFamily: 'Outfit' } }, item.value),
            h('span', { style: { fontSize: '18px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, item.note),
          )
        )
      ),
      h('img', {
        src: `data:image/svg+xml;base64,${Buffer.from(compoundSvg).toString('base64')}`,
        width: 860, height: 300, style: { objectFit: 'contain' }
      }),
      h('div', { style: { display: 'flex', gap: '10px', justifyContent: 'center' } },
        ...[0, 1, 2, 3, 4].map(() =>
          h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.accent } })
        ),
        h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted, marginLeft: '6px', fontFamily: 'Outfit' } }, 'je 500 € / Jahr investiert')
      ),
    ),
    keyLearning('20 Jahre × 500 € = 10.000 € Einzahlung — aber 20.491 € Ergebnis.'),
    bfLogo(),
  ]);

  // === SLIDE 6: DAS PRINZIP — Drei Anlageklassen für die 500 EUR ===
  // Akt 2 — Auflösung: Wie genau investieren?

  const slide6 = slide([
    badge('SO GEHT ES KONKRET'),
    headline('3 WEGE FÜR DEINE 500 EUR', 60),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      ...[
        {
          num: '01',
          title: 'ETF-EINMALANLAGE',
          desc: 'MSCI World oder S&P 500 — einmal kaufen, langfristig halten. Rendite ~7 % p.a.',
          tag: 'Empfohlen',
          color: C.accent,
        },
        {
          num: '02',
          title: 'ALTERSVORSORGE-DEPOT',
          desc: 'Ab Januar 2027: 500 € einlegen + bis zu 540 € Förderung vom Staat ernten.',
          tag: 'Höchste Förderung',
          color: C.green,
        },
        {
          num: '03',
          title: 'NOTGROSCHEN AUFSTOCKEN',
          desc: 'Weniger als 3 Monatsausgaben als Reserve? Dann erst hier auffüllen — Tagesgeld 4,2 %.',
          tag: 'Sicherheit zuerst',
          color: 'rgba(255,255,255,0.6)',
        },
      ].map(item =>
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: '20px',
            backgroundColor: C.bgDark, borderRadius: '18px', padding: '22px 24px',
            border: `1px solid ${C.border}`
          }
        },
          h('span', { style: { fontSize: '44px', fontWeight: 800, color: item.color, minWidth: '64px', fontFamily: 'Outfit' } }, item.num),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', flex: '1' } },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
              h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.text, textTransform: 'uppercase', fontFamily: 'Outfit' } }, item.title),
              h('div', {
                style: {
                  display: 'flex', backgroundColor: `${item.color}25`,
                  border: `1px solid ${item.color}`, borderRadius: '8px', padding: '4px 12px'
                }
              },
                h('span', { style: { fontSize: '18px', fontWeight: 700, color: item.color, fontFamily: 'Outfit' } }, item.tag)
              ),
            ),
            h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4', fontFamily: 'Outfit' } }, item.desc),
          ),
        )
      ),
    ),
    keyLearning('Erst investieren, dann den Rest ausgeben — nicht umgekehrt.'),
    bfLogo(),
  ]);

  // === SLIDE 7: TAKEAWAYS — Die 3 Regeln ===
  // Akt 3 — Abschluss: Konkrete Handlungsanweisungen

  const learnings = [
    { num: '01', text: 'Setze dir VOR Black Friday ein klares Invest-Budget', pct: 33 },
    { num: '02', text: 'Kaufe als erstes deinen ETF — dann erst shoppen', pct: 66 },
    { num: '03', text: 'Automatisiere: Dauerauftrag auf Depot statt Konsum', pct: 100 },
  ];

  const slide7 = slide([
    badge('DEINE 3 REGELN'),
    headline('SO NUTZT DU BLACK FRIDAY RICHTIG', 54),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px', padding: '24px 28px',
            backgroundColor: C.bgDark, borderRadius: '18px',
            border: l.pct === 100 ? `2px solid ${C.accent}` : `1px solid ${C.border}`
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', {
              style: {
                fontSize: '44px', fontWeight: 800,
                color: l.pct === 100 ? C.accent : C.white, minWidth: '64px', fontFamily: 'Outfit'
              }
            }, l.num),
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3', fontFamily: 'Outfit' } }, l.text),
          ),
          h('div', { style: { display: 'flex', height: '6px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', {
              style: {
                display: 'flex', width: `${l.pct}%`, height: '6px',
                backgroundColor: l.pct === 100 ? C.accent : C.red, borderRadius: '3px'
              }
            })
          ),
        )
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '14px', marginTop: '8px',
          backgroundColor: 'rgba(91,200,245,0.1)', borderRadius: '14px', padding: '18px 24px',
          border: `1px solid rgba(91,200,245,0.3)`
        }
      },
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.accent, lineHeight: '1.4', fontFamily: 'Outfit' } },
          'Merke: Black Friday ist kein Tag zum Sparen — sondern zum Investieren.'
        ),
      ),
    ),
    keyLearning('Wer die Regeln kennt, gewinnt — der Rest gibt nur aus.'),
    bfLogo(),
  ]);

  // === SLIDE 8: CTA ===
  // Akt 3 — Abschluss: Call to Action

  const slide8 = slide([
    badge('JETZT DU'),
    headline('WIE VIEL GIBST DU DIESES JAHR AN BLACK FRIDAY AUS?', 52),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '32px' } },
      // Frage-Element
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
          backgroundColor: C.bgDark, borderRadius: '24px', padding: '40px',
          border: `2px solid ${C.accent}`, maxWidth: '880px', width: '100%'
        }
      },
        h('div', { style: { display: 'flex', width: '80px', height: '5px', backgroundColor: C.red, borderRadius: '3px' } }),
        h('span', {
          style: {
            fontSize: '32px', fontWeight: 600, color: C.text, textAlign: 'center',
            lineHeight: '1.4', fontFamily: 'Outfit'
          }
        }, 'Schreib uns in die Kommentare:'),
        h('span', {
          style: {
            fontSize: '28px', fontWeight: 500, color: C.textSoft, textAlign: 'center',
            lineHeight: '1.4', fontFamily: 'Outfit'
          }
        }, '"Ich investiere dieses Jahr ___ € statt sie auszugeben."'),
        h('div', { style: { display: 'flex', width: '80px', height: '5px', backgroundColor: C.red, borderRadius: '3px' } }),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' } },
        h('span', {
          style: {
            fontSize: '28px', fontWeight: 700, color: C.text, textAlign: 'center',
            textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'Outfit'
          }
        }, 'Folge uns für mehr Finanzwissen'),
        h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.accent, fontFamily: 'Outfit' } }, '@benarofinanzen'),
      ),
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 20px'
          }
        },
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted, fontFamily: 'Outfit' } }, 'Speichern nicht vergessen')
        ),
      ),
    ),
    bfLogo(),
  ]);

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} generiert`);
  }
  console.log('Alle Slides erfolgreich erstellt!');
}

main().catch(e => { console.error(e); process.exit(1); });
