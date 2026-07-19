// Carousel: Factor-ETFs 2026 — Small Cap Value schlaegt Growth um 9 Punkte
// Inspiration: @finanzcopilot — Factor-Investing / Small Cap Value Outperformance 2026
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
    bgDark: '#001542',
    text: '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted: '#9CA3AF',
    cardBg: 'rgba(255,255,255,0.10)',
    border: 'rgba(255,255,255,0.18)',
    green: '#10B981',
    red: '#EF4444',
    yellow: '#F59E0B',
  };

  const W = 1080, H = 1350;
  const PAD = 70;

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync('/tmp/workspace/skills/instagram-carousel-skill/templates/benaro-logo.jpg').toString('base64');

  const h = (type, props, ...ch) => ({
    type,
    props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function logo() {
    return h('img', { src: logoB64, width: 90, height: 90, style: { borderRadius: '12px', objectFit: 'cover' } });
  }

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '14px' } },
      h('span', { style: { display: 'flex', fontSize: '20px', fontWeight: 700, letterSpacing: '3px', color: C.text, backgroundColor: C.cardBg, padding: '10px 22px', borderRadius: '12px' } }, text)
    );
  }

  function headline(text, size) {
    return h('span', { style: { fontSize: `${size || 64}px`, fontWeight: 800, color: C.text, lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '8px' } }, text);
  }

  function subline(text) {
    return h('span', { style: { fontSize: '28px', fontWeight: 500, color: C.textMuted, lineHeight: '1.5', marginTop: '8px' } }, text);
  }

  function keyLearning(text, accent) {
    return h('div', { style: { display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px', marginTop: '16px' } },
      h('div', { style: { display: 'flex', width: '6px', minHeight: '44px', backgroundColor: accent || C.green, borderRadius: '3px', flexShrink: '0' } }),
      h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, text)
    );
  }

  function igHandle() {
    return h('div', { style: { display: 'flex', alignItems: 'center', marginTop: '12px' } },
      h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted } }, '@benarofinanzen')
    );
  }

  function headerRow(badgeText) {
    return h('div', { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' } },
      badge(badgeText),
      logo()
    );
  }

  function slideRoot(bg, children) {
    return h('div', { style: { display: 'flex', flexDirection: 'column', width: W, height: H, padding: `${PAD}px`, backgroundColor: bg, fontFamily: 'Outfit' } },
      ...children
    );
  }

  // =====================
  // SLIDE 1 — HOOK
  // =====================
  const slide1 = slideRoot(C.bg, [
    headerRow('BREAKING 2026'),
    headline('Small Cap\nValue schlaegt\nGrowth um\n9 Punkte', 72),
    subline('Was ETF-Anleger 2026 dringend wissen muessen'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '22px' } },
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            h('span', { style: { fontSize: '27px', fontWeight: 700, color: C.green } }, 'Small Cap Value'),
            h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.green } }, '+9 Punkte Vorsprung')
          ),
          h('div', { style: { display: 'flex', height: '26px', backgroundColor: C.cardBg, borderRadius: '13px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: '90%', height: '26px', backgroundColor: C.green, borderRadius: '13px' } })
          )
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            h('span', { style: { fontSize: '27px', fontWeight: 700, color: 'rgba(255,255,255,0.5)' } }, 'MSCI World'),
            h('span', { style: { fontSize: '32px', fontWeight: 800, color: 'rgba(255,255,255,0.5)' } }, 'Mitte')
          ),
          h('div', { style: { display: 'flex', height: '26px', backgroundColor: C.cardBg, borderRadius: '13px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: '68%', height: '26px', backgroundColor: 'rgba(255,255,255,0.35)', borderRadius: '13px' } })
          )
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            h('span', { style: { fontSize: '27px', fontWeight: 700, color: C.textMuted } }, 'Large Growth ETF'),
            h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.textMuted } }, 'Benchmark')
          ),
          h('div', { style: { display: 'flex', height: '26px', backgroundColor: C.cardBg, borderRadius: '13px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: '50%', height: '26px', backgroundColor: C.textMuted, borderRadius: '13px' } })
          )
        )
      ),
      h('div', { style: { display: 'flex', backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '14px', padding: '14px 22px' } },
        h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.green } }, 'Quelle: 24/7 Wall Street, Juni 2026 — YTD-Performance 2026')
      )
    ),
    keyLearning('Factor-Investing ist das ETF-Upgrade das 90% der Anleger verpassen.', C.green),
    igHandle()
  ]);

  // =====================
  // SLIDE 2 — WAS SIND FACTOR-ETFs?
  // =====================
  const slide2 = slideRoot(C.bgDark, [
    headerRow('FACTOR-INVESTING'),
    headline('Was sind\nFactor-ETFs?', 68),
    subline('Das Upgrade zum Standard-ETF'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
        h('div', { style: { display: 'flex', backgroundColor: C.cardBg, borderRadius: '20px', padding: '26px 30px', gap: '22px', alignItems: 'center' } },
          h('div', { style: { display: 'flex', width: '52px', height: '52px', borderRadius: '14px', backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', flexShrink: '0' } },
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.text } }, '1')
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
            h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Standard-ETF (MSCI World)'),
            h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted } }, 'Kauft den gesamten Markt — erzielt Marktrendite.')
          )
        ),
        h('div', { style: { display: 'flex', backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '20px', padding: '26px 30px', gap: '22px', alignItems: 'center', border: '1px solid rgba(16,185,129,0.35)' } },
          h('div', { style: { display: 'flex', width: '52px', height: '52px', borderRadius: '14px', backgroundColor: C.green, alignItems: 'center', justifyContent: 'center', flexShrink: '0' } },
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: '#FFFFFF' } }, '2')
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
            h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.green } }, 'Factor-ETF (z.B. AVUV, ISCF)'),
            h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textSoft } }, 'Kauft gezielt Aktien mit bewiesenen Rendite-Praemien.')
          )
        ),
        h('div', { style: { display: 'flex', backgroundColor: C.cardBg, borderRadius: '20px', padding: '26px 30px', gap: '22px', alignItems: 'center' } },
          h('div', { style: { display: 'flex', width: '52px', height: '52px', borderRadius: '14px', backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', flexShrink: '0' } },
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.text } }, '3')
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
            h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Grundlage: Fama-French Forschung'),
            h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted } }, 'Nobelpreis 2013. Factor-Praemien seit 100 Jahren belegt.')
          )
        )
      )
    ),
    keyLearning('Factor-ETFs sind kein Trend — sie basieren auf 100 Jahren Marktdaten.', C.text),
    igHandle()
  ]);

  // =====================
  // SLIDE 3 — PROBLEM
  // =====================
  const slide3 = slideRoot(C.bg, [
    headerRow('DAS PROBLEM'),
    headline('95% kennen\nnur einen\nETF-Typ', 70),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px' } },
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' } },
            h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, 'MSCI World / S&P 500'),
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.text } }, '95%')
          ),
          h('div', { style: { display: 'flex', height: '20px', backgroundColor: C.cardBg, borderRadius: '10px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: '95%', height: '20px', backgroundColor: C.text, borderRadius: '10px' } })
          )
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' } },
            h('span', { style: { fontSize: '26px', fontWeight: 700, color: 'rgba(255,255,255,0.55)' } }, 'Dividenden-ETF'),
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: 'rgba(255,255,255,0.55)' } }, '38%')
          ),
          h('div', { style: { display: 'flex', height: '20px', backgroundColor: C.cardBg, borderRadius: '10px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: '38%', height: '20px', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: '10px' } })
          )
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' } },
            h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.green } }, 'Factor-ETF (Value, Size, Momentum)'),
            h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.green } }, '5%')
          ),
          h('div', { style: { display: 'flex', height: '20px', backgroundColor: C.cardBg, borderRadius: '10px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: '5%', height: '20px', backgroundColor: C.green, borderRadius: '10px' } })
          )
        ),
        h('div', { style: { display: 'flex', backgroundColor: 'rgba(239,68,68,0.10)', borderRadius: '16px', padding: '18px 24px', marginTop: '10px' } },
          h('span', { style: { fontSize: '25px', fontWeight: 600, color: C.red, lineHeight: '1.4' } },
            'Factor-ETFs haben keine grosse Marketing-Kampagne. Deshalb fehlen sie in fast jedem Depot.')
        )
      )
    ),
    keyLearning('Was die breite Masse nicht kennt, kann nicht fuer das Depot genutzt werden.', C.red),
    igHandle()
  ]);

  // =====================
  // SLIDE 4 — ERWARTUNG VS. REALITAET
  // =====================
  const slide4 = slideRoot(C.bgDark, [
    headerRow('DER IRRTUM'),
    headline('Alle ETFs\nsind doch gleich\n— oder?', 66),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px', gap: '14px' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'ERWARTUNG'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.45' } }, 'MSCI World kaufen und fertig. Alle ETFs sind dasselbe — Markt ist Markt.'),
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' } },
            h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.red } }),
            h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.red } }, 'IRRTUM')
          )
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '28px', gap: '14px' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: 'rgba(0,31,97,0.45)' } }, 'REALITAET'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(0,31,97,0.12)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: '#001F61', lineHeight: '1.45' } }, 'Innerhalb von ETFs gibt es bewiesene Rendite-Unterschiede. Die Wissenschaft nennt sie Faktoren.'),
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' } },
            h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.green } }),
            h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.green } }, 'RICHTIG')
          )
        )
      ),
      h('div', { style: { display: 'flex', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '14px', padding: '18px 24px', marginTop: '6px' } },
        h('span', { style: { fontSize: '25px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } },
          'Marktrendite ist das Minimum — Factor-Praemien sind das Upgrade.')
      )
    ),
    keyLearning('Nicht jeder ETF ist gleich. Factor-ETFs nutzen bewiesene Rendite-Muster.', C.text),
    igHandle()
  ]);

  // =====================
  // SLIDE 5 — DIE 4 FAKTOREN
  // =====================
  const slide5 = slideRoot(C.bg, [
    headerRow('DIE FAKTOREN'),
    headline('4 Factor-Praemien\nmit 100 Jahren\nDaten', 62),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg, borderRadius: '20px', padding: '26px', gap: '12px' } },
          h('div', { style: { display: 'flex', width: '52px', height: '52px', borderRadius: '14px', backgroundColor: 'rgba(16,185,129,0.20)', alignItems: 'center', justifyContent: 'center' } },
            h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.green } }, 'V')
          ),
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Value'),
          h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Guenstige Aktien schlagen teure langfristig')
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '20px', padding: '26px', gap: '12px', border: '1px solid rgba(16,185,129,0.30)' } },
          h('div', { style: { display: 'flex', width: '52px', height: '52px', borderRadius: '14px', backgroundColor: C.green, alignItems: 'center', justifyContent: 'center' } },
            h('span', { style: { fontSize: '28px', fontWeight: 800, color: '#FFFFFF' } }, 'S')
          ),
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.green } }, 'Small Cap'),
          h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textSoft, lineHeight: '1.4' } }, 'Kleine Unternehmen schlagen Grosse')
        )
      ),
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg, borderRadius: '20px', padding: '26px', gap: '12px' } },
          h('div', { style: { display: 'flex', width: '52px', height: '52px', borderRadius: '14px', backgroundColor: 'rgba(245,158,11,0.22)', alignItems: 'center', justifyContent: 'center' } },
            h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.yellow } }, 'Q')
          ),
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Quality'),
          h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Starke Bilanzen schlagen schwache')
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg, borderRadius: '20px', padding: '26px', gap: '12px' } },
          h('div', { style: { display: 'flex', width: '52px', height: '52px', borderRadius: '14px', backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' } },
            h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.text } }, 'M')
          ),
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Momentum'),
          h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Gewinner-Aktien bleiben haeufiger Gewinner')
        )
      )
    ),
    keyLearning('Fama-French Forschung: Belegt seit 1993, Datenbasis seit 1926. Nobelpreis 2013.', C.green),
    igHandle()
  ]);

  // =====================
  // SLIDE 6 — VERGLEICH (WIE ES FUNKTIONIERT)
  // =====================
  const slide6 = slideRoot(C.bgDark, [
    headerRow('DAS PRINZIP'),
    headline('Factor-ETF:\nGleicher Preis,\nmehr Rendite-\nPotenzial', 62),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
        h('div', { style: { display: 'flex', gap: '10px' } },
          h('div', { style: { display: 'flex', flex: '3' } }),
          h('div', { style: { display: 'flex', flex: '2', justifyContent: 'center' } },
            h('span', { style: { fontSize: '21px', fontWeight: 700, color: C.textMuted, letterSpacing: '1px' } }, 'MSCI WORLD')
          ),
          h('div', { style: { display: 'flex', flex: '2', justifyContent: 'center' } },
            h('span', { style: { fontSize: '21px', fontWeight: 700, color: C.green, letterSpacing: '1px' } }, 'SCV FACTOR')
          )
        ),
        h('div', { style: { display: 'flex', gap: '10px', backgroundColor: C.cardBg, borderRadius: '14px', padding: '16px 18px', alignItems: 'center' } },
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, flex: '3' } }, 'Kosten (TER/Jahr)'),
          h('div', { style: { display: 'flex', flex: '2', justifyContent: 'center' } },
            h('span', { style: { fontSize: '25px', fontWeight: 700, color: C.text } }, '~0,12%')
          ),
          h('div', { style: { display: 'flex', flex: '2', justifyContent: 'center' } },
            h('span', { style: { fontSize: '25px', fontWeight: 700, color: C.text } }, '~0,25%')
          )
        ),
        h('div', { style: { display: 'flex', gap: '10px', backgroundColor: C.cardBg, borderRadius: '14px', padding: '16px 18px', alignItems: 'center' } },
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, flex: '3' } }, 'Diversifikation'),
          h('div', { style: { display: 'flex', flex: '2', justifyContent: 'center' } },
            h('span', { style: { fontSize: '25px', fontWeight: 700, color: C.text } }, 'Hoch')
          ),
          h('div', { style: { display: 'flex', flex: '2', justifyContent: 'center' } },
            h('span', { style: { fontSize: '25px', fontWeight: 700, color: C.text } }, 'Hoch')
          )
        ),
        h('div', { style: { display: 'flex', gap: '10px', backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '14px', padding: '16px 18px', alignItems: 'center', border: '1px solid rgba(16,185,129,0.25)' } },
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, flex: '3' } }, 'Rendite-Praemie'),
          h('div', { style: { display: 'flex', flex: '2', justifyContent: 'center' } },
            h('span', { style: { fontSize: '25px', fontWeight: 700, color: C.textMuted } }, 'Markt')
          ),
          h('div', { style: { display: 'flex', flex: '2', justifyContent: 'center' } },
            h('span', { style: { fontSize: '25px', fontWeight: 700, color: C.green } }, 'Markt + X')
          )
        ),
        h('div', { style: { display: 'flex', gap: '10px', backgroundColor: C.cardBg, borderRadius: '14px', padding: '16px 18px', alignItems: 'center' } },
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, flex: '3' } }, 'Volatilitaet'),
          h('div', { style: { display: 'flex', flex: '2', justifyContent: 'center' } },
            h('span', { style: { fontSize: '25px', fontWeight: 700, color: C.text } }, 'Mittel')
          ),
          h('div', { style: { display: 'flex', flex: '2', justifyContent: 'center' } },
            h('span', { style: { fontSize: '25px', fontWeight: 700, color: C.yellow } }, 'Hoeher')
          )
        ),
        h('div', { style: { display: 'flex', gap: '10px', backgroundColor: C.cardBg, borderRadius: '14px', padding: '16px 18px', alignItems: 'center' } },
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, flex: '3' } }, 'Zeithorizont'),
          h('div', { style: { display: 'flex', flex: '2', justifyContent: 'center' } },
            h('span', { style: { fontSize: '25px', fontWeight: 700, color: C.text } }, '5+ Jahre')
          ),
          h('div', { style: { display: 'flex', flex: '2', justifyContent: 'center' } },
            h('span', { style: { fontSize: '25px', fontWeight: 700, color: C.yellow } }, '10+ Jahre')
          )
        )
      ),
      h('div', { style: { display: 'flex', backgroundColor: 'rgba(245,158,11,0.10)', borderRadius: '12px', padding: '14px 20px' } },
        h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.yellow } }, 'Mehr Potenzial = mehr Schwankungen. Nur fuer langfristige Anleger geeignet.')
      )
    ),
    keyLearning('Factor-ETFs sind kein Freifahrtschein — aber historisch den Geduldigeren ueberlegen.', C.yellow),
    igHandle()
  ]);

  // =====================
  // SLIDE 7 — 4 LEARNINGS
  // =====================
  const learnings = [
    { num: '01', text: 'Factor-ETFs nutzen bewiesene Rendite-Praemien mit 100 Jahren Datenbasis.', pct: 25 },
    { num: '02', text: '2026: Small Cap Value schlug Large Growth um 9 Prozentpunkte YTD.', pct: 50 },
    { num: '03', text: 'Etwas hoehere Kosten (0,25% TER) — dafuer hoehere Rendite-Chance.', pct: 75 },
    { num: '04', text: 'Strategie: Erst MSCI World sichern, dann Faktoren als Ergaenzung beimischen.', pct: 100 },
  ];

  const slide7 = slideRoot(C.bg, [
    headerRow('DEINE LEARNINGS'),
    headline('Was du jetzt\nweisst', 68),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      ...learnings.map(l =>
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px 24px', backgroundColor: C.cardBg, borderRadius: '18px' } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', { style: { fontSize: '38px', fontWeight: 800, color: l.pct === 100 ? C.green : C.text, minWidth: '58px', flexShrink: '0' } }, l.num),
            h('span', { style: { fontSize: '25px', fontWeight: 600, color: C.text, lineHeight: '1.35' } }, l.text)
          ),
          h('div', { style: { display: 'flex', height: '5px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${l.pct}%`, height: '5px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px' } })
          )
        )
      )
    ),
    keyLearning('Factor-Investing lohnt sich nur mit langem Zeithorizont — mindestens 10 Jahre.', C.green),
    igHandle()
  ]);

  // =====================
  // SLIDE 8 — CTA
  // =====================
  const slide8 = slideRoot(C.bgDark, [
    headerRow('DEIN NAECHSTER SCHRITT'),
    headline('Nutzt du schon\nFactor-ETFs in\ndeinem Depot?', 64),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px', alignItems: 'center' } },
      h('span', { style: { fontSize: '27px', fontWeight: 500, color: C.textMuted, textAlign: 'center' } }, 'Schreib es in die Kommentare:'),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' } },
        h('div', { style: { display: 'flex', backgroundColor: C.cardBg, borderRadius: '16px', padding: '20px 28px', justifyContent: 'center' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Noch kein Factor-ETF')
        ),
        h('div', { style: { display: 'flex', backgroundColor: C.cardBg, borderRadius: '16px', padding: '20px 28px', justifyContent: 'center' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Value ETF im Depot')
        ),
        h('div', { style: { display: 'flex', backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '16px', padding: '20px 28px', justifyContent: 'center', border: '1px solid rgba(16,185,129,0.35)' } },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.green } }, 'Small Cap Value Investor')
        )
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', marginTop: '10px' } },
        h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.textSoft, textAlign: 'center', lineHeight: '1.4' } },
          'Speichern nicht vergessen — du wirst diesen Post nochmal brauchen.'),
        h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.textSoft, textAlign: 'center' } },
          'Folge @benarofinanzen fuer mehr Finanzwissen.')
      )
    ),
    h('div', { style: { display: 'flex', justifyContent: 'center', marginBottom: '10px' } },
      h('img', { src: logoB64, width: 110, height: 110, style: { borderRadius: '16px', objectFit: 'cover' } })
    ),
    igHandle()
  ]);

  // =====================
  // GENERATE ALL SLIDES
  // =====================
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  const outDir = path.join(__dirname, 'output', 'carousel_2026-07-19', 'slides');

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
