'use strict';
const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default;
  const { Resvg } = require('@resvg/resvg-js');

  const W = 1080, H = 1350;
  const TODAY = '2026-11-28';
  const OUTPUT_DIR = path.join(__dirname, 'output', `carousel_${TODAY}`, 'slides');
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

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
    cardBg: 'rgba(255,255,255,0.1)',
    border: 'rgba(255,255,255,0.2)',
    green: '#10B981',
    red: '#EF4444',
  };

  const h = (type, props, ...ch) => ({
    type,
    props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function logo() {
    return h('img', {
      src: logoB64,
      width: 110,
      height: 110,
      style: { borderRadius: '12px', objectFit: 'cover' }
    });
  }

  function topBar(badgeText) {
    return h('div', { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      h('div', { style: { display: 'flex', alignItems: 'center' } },
        h('span', { style: { fontSize: '22px', fontWeight: 700, letterSpacing: '3px', color: C.text, backgroundColor: C.cardBg, padding: '10px 22px', borderRadius: '12px' } }, badgeText),
      ),
      logo(),
    );
  }

  function headline(text, size) {
    const sz = size || 64;
    return h('span', { style: { fontSize: `${sz}px`, fontWeight: 800, color: C.text, lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '6px' } }, text);
  }

  function subline(text) {
    return h('span', { style: { fontSize: '30px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4', marginTop: '6px', marginBottom: '4px' } }, text);
  }

  function keyLearning(text, accent) {
    const ac = accent || C.text;
    return h('div', { style: { display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px', marginTop: '20px' } },
      h('div', { style: { display: 'flex', width: '6px', minHeight: '40px', backgroundColor: ac, borderRadius: '3px' } }),
      h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, text),
    );
  }

  function igHandle() {
    return h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, marginTop: '10px' } }, '@benarofinanzen');
  }

  function slide(children) {
    return h('div', { style: { display: 'flex', flexDirection: 'column', width: W, height: H, padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit' } },
      ...children
    );
  }

  // =========================================================
  // SLIDE 1 — HOOK: Big Stat
  // =========================================================
  const slide1 = slide([
    topBar('DAS MUSST DU WISSEN'),
    headline('73 % der ETF-Anleger wählen den falschen Typ', 58),
    subline('Thesaurierend oder ausschüttend?'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: C.cardBg, borderRadius: '24px', padding: '36px 40px', gap: '6px' } },
        h('span', { style: { fontSize: '128px', fontWeight: 800, color: C.green, lineHeight: '1.0', letterSpacing: '-4px' } }, '73 %'),
        h('span', { style: { fontSize: '30px', fontWeight: 600, color: C.textSoft, textAlign: 'center' } }, 'wählen den falschen ETF-Typ'),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, textAlign: 'center', marginTop: '4px' } }, 'und verlieren damit tausende Euro an Rendite'),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '20px', padding: '24px 16px', gap: '8px', border: '2px solid rgba(16,185,129,0.4)' } },
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.green, textAlign: 'center' } }, 'THESAURIEREND'),
          h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted, textAlign: 'center' } }, 'Erträge bleiben im Depot'),
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', backgroundColor: C.cardBg, borderRadius: '20px', padding: '24px 16px', gap: '8px', border: `2px solid ${C.border}` } },
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.text, textAlign: 'center' } }, 'AUSSCHÜTTEND'),
          h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted, textAlign: 'center' } }, 'Erträge aufs Konto'),
        ),
      ),
    ),
    keyLearning('Die falsche Wahl kostet dich bis zu 4.500 EUR in 20 Jahren'),
    igHandle(),
  ]);

  // =========================================================
  // SLIDE 2 — WAS IST DER UNTERSCHIED? (Contrast Cards)
  // =========================================================
  const slide2 = slide([
    topBar('DER UNTERSCHIED'),
    headline('Was passiert mit deinen Erträgen?', 60),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px', flex: '1' } },
        // Thesaurierend card
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '22px', padding: '28px 24px', gap: '14px', border: '2px solid rgba(16,185,129,0.35)' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'THESAURIEREND'),
          h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: 'rgba(16,185,129,0.4)' } }),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
            h('div', { style: { display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' } },
              h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.green, marginTop: '8px' } }),
              h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, 'Dividenden und Zinsen werden automatisch reinvestiert'),
            ),
            h('div', { style: { display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' } },
              h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.green, marginTop: '8px' } }),
              h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, 'Steuer wird erst beim Verkauf fällig'),
            ),
            h('div', { style: { display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' } },
              h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.green, marginTop: '8px' } }),
              h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, 'Volles Kapital für den Zinseszins'),
            ),
          ),
        ),
        // Ausschüttend card
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg, borderRadius: '22px', padding: '28px 24px', gap: '14px', border: `2px solid ${C.border}` } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textSoft } }, 'AUSSCHÜTTEND'),
          h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: C.border } }),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
            h('div', { style: { display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' } },
              h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.textMuted, marginTop: '8px' } }),
              h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, 'Erträge werden aufs Konto ausgezahlt'),
            ),
            h('div', { style: { display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' } },
              h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.red, marginTop: '8px' } }),
              h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, '26,375 % Abgeltungsteuer sofort fällig'),
            ),
            h('div', { style: { display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' } },
              h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.red, marginTop: '8px' } }),
              h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, 'Weniger Kapital für den Zinseszins'),
            ),
          ),
        ),
      ),
    ),
    keyLearning('Thesaurierend lässt den Zinseszins ungebremst arbeiten'),
    igHandle(),
  ]);

  // =========================================================
  // SLIDE 3 — DIE STEUERFALLE (Flow diagram)
  // =========================================================
  const slide3 = slide([
    topBar('DIE STEUERFALLE'),
    headline('So viel Rendite verlierst du jedes Jahr', 60),
    subline('Beispiel: 1.000 EUR Dividendenausschüttung'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      // Ausschüttend flow
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
        h('div', { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: C.cardBg, borderRadius: '16px', padding: '20px 28px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft } }, 'Ausschüttung (brutto)'),
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.text } }, '1.000 EUR'),
        ),
        h('div', { style: { display: 'flex', justifyContent: 'center', padding: '4px 0' } },
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' } },
            h('div', { style: { display: 'flex', width: '3px', height: '20px', backgroundColor: C.border } }),
            h('div', { style: { display: 'flex', width: '0', height: '0', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: `10px solid ${C.border}` } }),
          ),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '16px', padding: '20px 28px', border: '2px solid rgba(239,68,68,0.3)' } },
          h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.red } }, 'Abgeltungsteuer (26,375 %)'),
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.red } }, '- 263,75 EUR'),
        ),
        h('div', { style: { display: 'flex', justifyContent: 'center', padding: '4px 0' } },
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' } },
            h('div', { style: { display: 'flex', width: '3px', height: '20px', backgroundColor: C.border } }),
            h('div', { style: { display: 'flex', width: '0', height: '0', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: `10px solid ${C.border}` } }),
          ),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px 28px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textMuted } }, 'Nettobetrag reinvestiert'),
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.textSoft } }, '736,25 EUR'),
        ),
      ),
      // Thesaurierend comparison
      h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '16px', padding: '20px 28px', border: '2px solid rgba(16,185,129,0.25)' } },
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textMuted } }, 'Thesaurierend: Steuer erst beim Verkauf'),
        h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.green } }, '1.000 EUR'),
      ),
    ),
    keyLearning('263 EUR pro 1.000 EUR gehen jährlich ans Finanzamt', C.red),
    igHandle(),
  ]);

  // =========================================================
  // SLIDE 4 — ERWARTUNG vs. REALITÄT
  // =========================================================
  const slide4 = slide([
    topBar('IRRTUM AUFGEDECKT'),
    headline('Was Anfänger denken — und was stimmt', 56),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px' } },
        // Erwartung
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg, borderRadius: '22px', padding: '28px 24px', gap: '12px' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'ERWARTUNG'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.5' } }, '"Ausschüttend ist besser — ich sehe mein Geld"'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4', marginTop: '8px' } }, 'Regelmäßige Auszahlungen fühlen sich nach Erfolg an'),
        ),
        // Realität
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '22px', padding: '28px 24px', gap: '12px', border: '2px solid rgba(16,185,129,0.4)' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'REALITÄT'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.green, opacity: '0.5' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.5' } }, '"Thesaurierend schlägt ausschüttend langfristig fast immer"'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4', marginTop: '8px' } }, 'Der Steuerstundungseffekt macht den Unterschied'),
        ),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px', gap: '6px' } },
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, 'Ausschüttend lohnt sich wenn du laufendes Einkommen brauchst — z.B. im Ruhestand'),
      ),
    ),
    keyLearning('Im Vermögensaufbau: Thesaurierend ist fast immer überlegen'),
    igHandle(),
  ]);

  // =========================================================
  // SLIDE 5 — ENTSCHEIDUNGSBAUM
  // =========================================================
  const slide5 = slide([
    topBar('DEINE ENTSCHEIDUNG'),
    headline('Welcher ETF-Typ passt zu dir?', 62),
    subline('3 Fragen — deine Antwort'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      // Question 1
      h('div', { style: { display: 'flex', flexDirection: 'column', backgroundColor: C.cardBg, borderRadius: '18px', padding: '20px 24px', gap: '10px' } },
        h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px' } },
          h('div', { style: { display: 'flex', width: '42px', height: '42px', borderRadius: '21px', backgroundColor: C.cardBg, alignItems: 'center', justifyContent: 'center', border: `2px solid ${C.border}` } },
            h('span', { style: { fontSize: '22px', fontWeight: 800, color: C.text } }, '1'),
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, 'Brauchst du jetzt regelmäßige Auszahlungen?'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'row', gap: '12px', marginLeft: '56px' } },
          h('div', { style: { display: 'flex', backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '10px', padding: '8px 16px' } },
            h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.green } }, 'Ja: Ausschüttend'),
          ),
          h('div', { style: { display: 'flex', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '8px 16px' } },
            h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted } }, 'Nein: weiter lesen'),
          ),
        ),
      ),
      // Question 2
      h('div', { style: { display: 'flex', flexDirection: 'column', backgroundColor: C.cardBg, borderRadius: '18px', padding: '20px 24px', gap: '10px' } },
        h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px' } },
          h('div', { style: { display: 'flex', width: '42px', height: '42px', borderRadius: '21px', backgroundColor: C.cardBg, alignItems: 'center', justifyContent: 'center', border: `2px solid ${C.border}` } },
            h('span', { style: { fontSize: '22px', fontWeight: 800, color: C.text } }, '2'),
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, 'Bist du bereits im Ruhestand?'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'row', gap: '12px', marginLeft: '56px' } },
          h('div', { style: { display: 'flex', backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '10px', padding: '8px 16px' } },
            h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.green } }, 'Ja: Ausschüttend'),
          ),
          h('div', { style: { display: 'flex', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '8px 16px' } },
            h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted } }, 'Nein: weiter lesen'),
          ),
        ),
      ),
      // Question 3 (highlighted)
      h('div', { style: { display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '18px', padding: '20px 24px', gap: '10px', border: '2px solid rgba(16,185,129,0.35)' } },
        h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px' } },
          h('div', { style: { display: 'flex', width: '42px', height: '42px', borderRadius: '21px', backgroundColor: 'rgba(16,185,129,0.25)', alignItems: 'center', justifyContent: 'center' } },
            h('span', { style: { fontSize: '22px', fontWeight: 800, color: C.green } }, '3'),
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, 'Willst du maximale Rendite langfristig aufbauen?'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'row', gap: '12px', marginLeft: '56px' } },
          h('div', { style: { display: 'flex', backgroundColor: 'rgba(16,185,129,0.25)', borderRadius: '10px', padding: '8px 16px' } },
            h('span', { style: { fontSize: '22px', fontWeight: 800, color: C.green } }, 'Ja: Thesaurierend'),
          ),
        ),
      ),
    ),
    keyLearning('Im Vermögensaufbau lautet die Antwort fast immer: Thesaurierend'),
    igHandle(),
  ]);

  // =========================================================
  // SLIDE 6 — 20-JAHRES-VERGLEICH (SVG Line Chart)
  // =========================================================
  const thesauriendPts = [
    [0, 300], [76, 286], [152, 271], [228, 253], [304, 232],
    [380, 209], [456, 182], [532, 151], [608, 116], [684, 75], [760, 31]
  ];
  const ausschuettendPts = [
    [0, 300], [76, 287], [152, 273], [228, 257], [304, 239],
    [380, 218], [456, 195], [532, 168], [608, 138], [684, 104], [760, 66]
  ];

  function ptsToPath(pts) {
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]},${p[1]}`).join(' ');
  }

  const chartSvg = `<svg width="940" height="310" viewBox="0 0 940 310" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gThes" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#10B981" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#10B981" stop-opacity="0.0"/>
    </linearGradient>
  </defs>
  <line x1="0" y1="300" x2="760" y2="300" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <line x1="0" y1="225" x2="760" y2="225" stroke="rgba(255,255,255,0.07)" stroke-width="1" stroke-dasharray="6,4"/>
  <line x1="0" y1="150" x2="760" y2="150" stroke="rgba(255,255,255,0.07)" stroke-width="1" stroke-dasharray="6,4"/>
  <line x1="0" y1="75" x2="760" y2="75" stroke="rgba(255,255,255,0.07)" stroke-width="1" stroke-dasharray="6,4"/>
  <path d="${ptsToPath(thesauriendPts)} L 760,300 L 0,300 Z" fill="url(#gThes)"/>
  <path d="${ptsToPath(ausschuettendPts)}" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="3" stroke-dasharray="8,4"/>
  <path d="${ptsToPath(thesauriendPts)}" fill="none" stroke="#10B981" stroke-width="4"/>
  <circle cx="760" cy="31" r="8" fill="#10B981"/>
  <circle cx="760" cy="66" r="6" fill="rgba(255,255,255,0.5)"/>
</svg>`;

  const chartSrc = `data:image/svg+xml;base64,${Buffer.from(chartSvg).toString('base64')}`;

  const slide6 = slide([
    topBar('DIE ZAHLEN'),
    headline('10.000 EUR über 20 Jahre — der Unterschied', 54),
    subline('7 % p.a. Rendite, Einmalanlage bei Depoteröffnung'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      // Legend
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '24px', marginBottom: '4px' } },
        h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' } },
          h('div', { style: { display: 'flex', width: '28px', height: '4px', backgroundColor: C.green, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft } }, 'Thesaurierend'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' } },
          h('div', { style: { display: 'flex', width: '28px', height: '3px', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textMuted } }, 'Ausschüttend'),
        ),
      ),
      // Y-axis labels + chart container
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'flex-end' } },
        h('div', { style: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '310px', paddingBottom: '10px' } },
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, '40 k'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, '30 k'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, '20 k'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, '10 k'),
        ),
        h('img', { src: chartSrc, width: 940, height: 310, style: { objectFit: 'contain' } }),
      ),
      // X-axis labels
      h('div', { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '50px', paddingRight: '10px', marginTop: '-8px' } },
        h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'Jahr 0'),
        h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'Jahr 5'),
        h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'Jahr 10'),
        h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'Jahr 15'),
        h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'Jahr 20'),
      ),
      // Result cards
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '16px', padding: '18px 22px', gap: '4px', border: '2px solid rgba(16,185,129,0.4)' } },
          h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.green } }, 'THESAURIEREND'),
          h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.green, lineHeight: '1.1' } }, '38.700 EUR'),
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg, borderRadius: '16px', padding: '18px 22px', gap: '4px' } },
          h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted } }, 'AUSSCHÜTTEND'),
          h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.textSoft, lineHeight: '1.1' } }, '34.200 EUR'),
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '16px', padding: '18px 22px', gap: '4px', alignItems: 'center', justifyContent: 'center' } },
          h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.textMuted } }, 'UNTERSCHIED'),
          h('span', { style: { fontSize: '40px', fontWeight: 800, color: C.green, lineHeight: '1.1' } }, '+ 4.500 EUR'),
        ),
      ),
    ),
    igHandle(),
  ]);

  // =========================================================
  // SLIDE 7 — KEY LEARNINGS
  // =========================================================
  const learnings = [
    { num: '01', text: 'Thesaurierend: Steuer erst beim Verkauf — voller Zinseszins', pct: 25 },
    { num: '02', text: 'Ausschüttend: 26,375 % Steuer jährlich auf alle Erträge', pct: 50 },
    { num: '03', text: 'Langfristiger Vermögensaufbau: fast immer thesaurierend wählen', pct: 75 },
    { num: '04', text: 'Ruhestand oder passives Einkommen: ausschüttend ist sinnvoll', pct: 100 },
  ];

  const slide7 = slide([
    topBar('DEINE 4 LEARNINGS'),
    headline('Was du jetzt weißt', 68),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      ...learnings.map(l =>
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px 26px', backgroundColor: C.cardBg, borderRadius: '18px' } },
          h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '18px' } },
            h('span', { style: { fontSize: '36px', fontWeight: 800, color: l.pct === 100 ? C.green : C.text, minWidth: '58px' } }, l.num),
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3' } }, l.text),
          ),
          h('div', { style: { display: 'flex', height: '5px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${l.pct}%`, height: '5px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px' } }),
          ),
        )
      ),
    ),
    keyLearning('Die richtige Wahl hängt von deiner Lebensphase ab'),
    igHandle(),
  ]);

  // =========================================================
  // SLIDE 8 — CTA
  // =========================================================
  const slide8 = slide([
    topBar('FRAGE AN DICH'),
    headline('Welchen ETF-Typ nutzt du?', 68),
    subline('Schreib es in die Kommentare!'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px', alignItems: 'center' } },
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '16px', width: '100%' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '24px', padding: '36px 16px', gap: '10px', border: '3px solid rgba(16,185,129,0.5)' } },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.green, textAlign: 'center' } }, 'THESAURIEREND'),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textMuted, textAlign: 'center', lineHeight: '1.4' } }, 'Ich lasse alles automatisch reinvestieren'),
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: C.cardBg, borderRadius: '24px', padding: '36px 16px', gap: '10px', border: `2px solid ${C.border}` } },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.textSoft, textAlign: 'center' } }, 'AUSSCHÜTTEND'),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textMuted, textAlign: 'center', lineHeight: '1.4' } }, 'Ich mag regelmäßige Auszahlungen'),
        ),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '8px' } },
        h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.textSoft, textAlign: 'center' } }, 'Folge @benarofinanzen für mehr'),
        h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.textSoft, textAlign: 'center' } }, 'Finanzwissen wie dieses'),
      ),
    ),
    keyLearning('Speichere diesen Post — du wirst ihn brauchen'),
    igHandle(),
  ]);

  // =========================================================
  // RENDER ALL SLIDES
  // =========================================================
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(OUTPUT_DIR, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} done: ${pngPath}`);
  }
  console.log('All slides generated!');
}

main().catch(e => { console.error(e); process.exit(1); });
