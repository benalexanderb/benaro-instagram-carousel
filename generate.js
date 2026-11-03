const fs = require('fs');
const path = require('path');

async function main() {
  const satoriModule = await import('satori');
  const satori = satoriModule.default || satoriModule;
  const { Resvg } = require('@resvg/resvg-js');

  const W = 1080, H = 1350;
  const TODAY = '2026-11-03';
  const OUTPUT_DIR = path.join(__dirname, 'output', `carousel_${TODAY}`, 'slides');
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

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
    cardBg: 'rgba(255,255,255,0.10)',
    border: 'rgba(255,255,255,0.20)',
    green: '#10B981',
    red: '#EF4444',
  };

  const logoPath = path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg');
  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(logoPath).toString('base64');

  const h = (type, props, ...ch) => ({
    type,
    props: {
      ...props,
      children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch,
    },
  });

  // ─── Reusable components ───────────────────────────────────────────────────

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '16px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: C.cardBg, padding: '10px 22px', borderRadius: '12px',
        },
      }, text)
    );
  }

  function headline(line1, line2, size) {
    const sz = size || 64;
    const baseStyle = {
      fontSize: `${sz}px`, fontWeight: 800, color: C.text,
      lineHeight: '1.1', letterSpacing: '-1.5px',
    };
    if (line2) {
      return h('div', { style: { display: 'flex', flexDirection: 'column', marginBottom: '6px' } },
        h('span', { style: baseStyle }, line1),
        h('span', { style: baseStyle }, line2)
      );
    }
    return h('span', { style: { ...baseStyle, marginBottom: '6px' } }, line1);
  }

  function subline(text) {
    return h('span', {
      style: { fontSize: '28px', fontWeight: 500, color: C.textMuted, lineHeight: '1.5', marginTop: '8px' },
    }, text);
  }

  function keyLearning(text, accent) {
    const ac = accent || C.text;
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px',
      },
    },
      h('div', { style: { display: 'flex', width: '6px', minHeight: '40px', backgroundColor: ac, borderRadius: '3px' } }),
      h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, text)
    );
  }

  function logo() {
    return h('img', {
      src: logoB64, width: 110, height: 110,
      style: { borderRadius: '12px', objectFit: 'cover' },
    });
  }

  function igHandle() {
    return h('span', {
      style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, marginTop: '10px' },
    }, '@benarofinanzen');
  }

  function slideRoot(children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column',
        width: W, height: H, padding: '70px',
        backgroundColor: C.bg, fontFamily: 'Outfit',
      },
    }, ...children);
  }

  function topRow(badgeEl) {
    return h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' } },
      badgeEl,
      logo()
    );
  }

  // ─── Slide 1: Hook ─────────────────────────────────────────────────────────
  // Stat hero + context chips

  const slide1 = slideRoot([
    topRow(badge('ACHTUNG')),
    headline('Black Friday:', 'Die teuerste Falle des Jahres', 62),
    subline('Noch 24 Tage bis Black Friday 2026'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '24px',
      },
    },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          backgroundColor: 'rgba(239,68,68,0.15)', borderRadius: '28px',
          padding: '44px 70px', border: '2px solid rgba(239,68,68,0.35)',
        },
      },
        h('span', {
          style: {
            fontSize: '136px', fontWeight: 800, color: C.red,
            lineHeight: '1.0', letterSpacing: '-4px',
          },
        }, '72 %'),
        h('span', {
          style: {
            fontSize: '28px', fontWeight: 600, color: C.textSoft,
            textAlign: 'center', lineHeight: '1.45',
          },
        }, 'der Käufer bereuen ihren Black-Friday-Einkauf')
      ),
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', padding: '14px 26px',
            backgroundColor: C.cardBg, borderRadius: '14px',
          },
        },
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft } }, '5,3 Mrd. EUR Umsatz 2025')
        ),
        h('div', {
          style: {
            display: 'flex', padding: '14px 26px',
            backgroundColor: C.cardBg, borderRadius: '14px',
          },
        },
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft } }, '+18 % vs. Vorjahr')
        )
      )
    ),
    keyLearning('Black Friday ist kein Schnäppchen — er ist ein Marketinginstrument'),
    igHandle(),
  ]);

  // ─── Slide 2: Preistrick Bar-Chart ─────────────────────────────────────────
  // Preis wird 6 Wochen vorher erhoeht, dann "rabattiert"

  const barSvg = `<svg width="840" height="280" viewBox="0 0 840 280" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#EF4444" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#EF4444" stop-opacity="0.4"/>
      </linearGradient>
      <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#10B981" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#10B981" stop-opacity="0.5"/>
      </linearGradient>
    </defs>
    <line x1="0" y1="240" x2="840" y2="240" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
    <line x1="0" y1="170" x2="840" y2="170" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <line x1="0" y1="100" x2="840" y2="100" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    <rect x="30" y="130" width="130" height="110" rx="10" fill="rgba(255,255,255,0.25)"/>
    <rect x="200" y="60" width="130" height="180" rx="10" fill="url(#g1)"/>
    <rect x="370" y="60" width="130" height="180" rx="10" fill="url(#g1)"/>
    <rect x="540" y="100" width="130" height="140" rx="10" fill="url(#g2)"/>
    <line x1="10" y1="130" x2="830" y2="130" stroke="rgba(255,255,255,0.55)" stroke-width="2" stroke-dasharray="12,7"/>
    <line x1="605" y1="25" x2="605" y2="90" stroke="#10B981" stroke-width="3"/>
    <polygon points="593,88 605,108 617,88" fill="#10B981"/>
  </svg>`;
  const barSrc = `data:image/svg+xml;base64,${Buffer.from(barSvg).toString('base64')}`;

  const slide2 = slideRoot([
    topRow(badge('DIE WAHRHEIT')),
    headline('Wie Händler die Preise', 'wirklich setzen', 60),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '16px',
      },
    },
      h('img', { src: barSrc, width: 840, height: 280, style: { objectFit: 'contain' } }),
      h('div', { style: { display: 'flex', justifyContent: 'space-around', marginTop: '8px' } },
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' } },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.textSoft } }, '100 EUR'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'September')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' } },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.red } }, '135 EUR'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'Oktober')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' } },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.red } }, '135 EUR'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'Nov. 1-26')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' } },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.green } }, '"110 EUR"'),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, 'Black Friday')
        )
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '14px',
          padding: '16px 22px', backgroundColor: 'rgba(239,68,68,0.12)',
          borderRadius: '14px', border: '1px solid rgba(239,68,68,0.25)',
        },
      },
        h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '6px', backgroundColor: C.red } }),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, '67 % der Angebote waren 8 Wochen vorher günstiger')
      )
    ),
    keyLearning('Der gestrichelte Strich zeigt den echten Normalpreis — daran orientiere dich', C.red),
    igHandle(),
  ]);

  // ─── Slide 3: Impulskauf-Funnel ────────────────────────────────────────────

  const funnelSvg = `<svg width="700" height="300" viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rf1" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#EF4444" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="#EF4444" stop-opacity="0.5"/>
      </linearGradient>
      <linearGradient id="rf2" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#EF4444" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#EF4444" stop-opacity="0.3"/>
      </linearGradient>
      <linearGradient id="rf3" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#EF4444" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#EF4444" stop-opacity="0.15"/>
      </linearGradient>
    </defs>
    <rect x="50" y="10" width="600" height="72" rx="10" fill="url(#rf1)"/>
    <polygon points="50,82 650,82 590,114 110,114" fill="rgba(239,68,68,0.15)"/>
    <rect x="110" y="114" width="480" height="72" rx="10" fill="url(#rf2)"/>
    <polygon points="110,186 590,186 540,218 160,218" fill="rgba(239,68,68,0.1)"/>
    <rect x="160" y="218" width="380" height="72" rx="10" fill="url(#rf3)"/>
  </svg>`;
  const funnelSrc = `data:image/svg+xml;base64,${Buffer.from(funnelSvg).toString('base64')}`;

  const slide3 = slideRoot([
    topRow(badge('DAS PROBLEM')),
    headline('500 EUR ausgegeben —', '3 Verluste auf einmal', 62),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '14px',
      },
    },
      h('div', { style: { display: 'flex', position: 'relative', width: '700px', height: '300px' } },
        h('img', { src: funnelSrc, width: 700, height: 300, style: { objectFit: 'contain' } })
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 22px', backgroundColor: 'rgba(239,68,68,0.15)', borderRadius: '12px' } },
          h('div', { style: { display: 'flex', width: '16px', height: '16px', borderRadius: '4px', backgroundColor: 'rgba(239,68,68,0.8)' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, '500 EUR Impulskauf — Geld weg')
        ),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 22px', backgroundColor: 'rgba(239,68,68,0.10)', borderRadius: '12px' } },
          h('div', { style: { display: 'flex', width: '16px', height: '16px', borderRadius: '4px', backgroundColor: 'rgba(239,68,68,0.55)' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, 'Kaufkraftverlust durch Inflation')
        ),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 22px', backgroundColor: 'rgba(239,68,68,0.07)', borderRadius: '12px' } },
          h('div', { style: { display: 'flex', width: '16px', height: '16px', borderRadius: '4px', backgroundColor: 'rgba(239,68,68,0.3)' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, 'Entgangene Rendite (Opportunitätskosten)')
        )
      )
    ),
    keyLearning('500 EUR heute ausgegeben = 1.935 EUR in 20 Jahren verloren', C.red),
    igHandle(),
  ]);

  // ─── Slide 4: Erwartung vs. Realität ──────────────────────────────────────

  const slide4 = slideRoot([
    topRow(badge('ERWARTUNG VS. REALITÄT')),
    headline('Was du denkst vs.', 'was wirklich passiert', 58),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '18px',
      },
    },
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '20px',
            padding: '28px', gap: '14px',
          },
        },
          h('span', { style: { fontSize: '22px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'ERWARTUNG'),
          h('div', { style: { display: 'flex', width: '100%', height: '4px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, '"Ich spare 30 % — das ist clever"'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, 'Geplantes Budget: 200 EUR')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '20px',
            padding: '28px', gap: '14px', border: '1px solid rgba(239,68,68,0.3)',
          },
        },
          h('span', { style: { fontSize: '22px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'REALITÄT'),
          h('div', { style: { display: 'flex', width: '100%', height: '4px', backgroundColor: 'rgba(239,68,68,0.3)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, '"Ich hab am Ende 480 EUR ausgegeben..."'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.red } }, 'Tatsächlich: 480 EUR')
        )
      ),
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '20px',
            padding: '28px', gap: '14px',
          },
        },
          h('span', { style: { fontSize: '22px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'ERWARTUNG'),
          h('div', { style: { display: 'flex', width: '100%', height: '4px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, '"Der Rabatt ist echt — ich habe ihn geprüft"')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '20px',
            padding: '28px', gap: '14px', border: '1px solid rgba(239,68,68,0.3)',
          },
        },
          h('span', { style: { fontSize: '22px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'REALITÄT'),
          h('div', { style: { display: 'flex', width: '100%', height: '4px', backgroundColor: 'rgba(239,68,68,0.3)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, '67 % der Angebote waren 8 Wochen vorher günstiger')
        )
      )
    ),
    keyLearning('Black Friday erhöht deine Ausgaben — nicht deine Ersparnisse', C.red),
    igHandle(),
  ]);

  // ─── Slide 5: Die 3-Fragen-Regel ───────────────────────────────────────────

  const questions = [
    { num: '01', q: 'Hätte ich es auch ohne Rabatt gekauft?', pct: 33 },
    { num: '02', q: 'Ist es seit mind. 30 Tagen auf meiner Wunschliste?', pct: 66 },
    { num: '03', q: 'Habe ich diesen Kauf im Budget eingeplant?', pct: 100 },
  ];

  const slide5 = slideRoot([
    topRow(badge('DIE METHODE')),
    headline('Die 3-Fragen-Regel', 'vor jedem Kauf', 62),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '20px',
      },
    },
      ...questions.map(q =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '12px',
            padding: '24px 28px', backgroundColor: C.cardBg, borderRadius: '18px',
          },
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '20px' } },
            h('span', {
              style: {
                fontSize: '40px', fontWeight: 800,
                color: q.pct === 100 ? C.green : C.text, minWidth: '58px',
              },
            }, q.num),
            h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.text, lineHeight: '1.3' } }, q.q)
          ),
          h('div', { style: { display: 'flex', height: '6px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${q.pct}%`, height: '6px', backgroundColor: q.pct === 100 ? C.green : C.text, borderRadius: '3px' } })
          )
        )
      )
    ),
    keyLearning('Alle 3 Fragen mit JA? Dann kauf. Sonst: erst recht nicht.'),
    igHandle(),
  ]);

  // ─── Slide 6: Investieren vs. Ausgeben Line-Chart ─────────────────────────
  // 500 EUR bei 7 % p.a. ueber 20 Jahre = 1.935 EUR

  const lineSvg = `<svg width="840" height="300" viewBox="0 0 840 300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#10B981" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#10B981" stop-opacity="0.0"/>
      </linearGradient>
    </defs>
    <line x1="60" y1="260" x2="820" y2="260" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    <line x1="60" y1="195" x2="820" y2="195" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <line x1="60" y1="130" x2="820" y2="130" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <line x1="60" y1="65" x2="820" y2="65" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <line x1="60" y1="260" x2="820" y2="260" stroke="#EF4444" stroke-width="3" stroke-dasharray="12,6"/>
    <path d="M 60 210 C 200 205 380 175 820 65" stroke="#10B981" stroke-width="4" fill="none"/>
    <path d="M 60 210 C 200 205 380 175 820 65 L 820 260 L 60 260 Z" fill="url(#lg1)"/>
    <circle cx="60" cy="210" r="8" fill="#10B981" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    <circle cx="820" cy="65" r="8" fill="#10B981" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    <circle cx="60" cy="260" r="8" fill="#EF4444" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    <circle cx="820" cy="260" r="8" fill="#EF4444" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  </svg>`;
  const lineSrc = `data:image/svg+xml;base64,${Buffer.from(lineSvg).toString('base64')}`;

  const slide6 = slideRoot([
    topRow(badge('DER VERGLEICH')),
    headline('Was aus 500 EUR in', '20 Jahren wird', 64),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '14px',
      },
    },
      h('div', { style: { display: 'flex', gap: '24px', marginBottom: '6px' } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          h('div', { style: { display: 'flex', width: '32px', height: '4px', backgroundColor: C.green } }),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textSoft } }, 'ETF-Sparplan (7 % p.a.)')
        ),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          h('div', { style: { display: 'flex', width: '32px', height: '4px', backgroundColor: C.red } }),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textSoft } }, 'Ausgegeben')
        )
      ),
      h('img', { src: lineSrc, width: 840, height: 300, style: { objectFit: 'contain' } }),
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center',
            backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '16px',
            padding: '20px 16px', border: '1px solid rgba(16,185,129,0.3)',
          },
        },
          h('span', { style: { fontSize: '42px', fontWeight: 800, color: C.green, letterSpacing: '-1px' } }, '1.935 EUR'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, marginTop: '4px' } }, 'investiert nach 20 J.')
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center',
            backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '16px',
            padding: '20px 16px', border: '1px solid rgba(239,68,68,0.3)',
          },
        },
          h('span', { style: { fontSize: '42px', fontWeight: 800, color: C.red, letterSpacing: '-1px' } }, '0 EUR'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, marginTop: '4px' } }, 'ausgegeben nach 20 J.')
        )
      )
    ),
    keyLearning('Zinseszins-Effekt: 500 EUR x 7 % x 20 Jahre = 1.935 EUR'),
    igHandle(),
  ]);

  // ─── Slide 7: Takeaways ─────────────────────────────────────────────────────

  const learnings = [
    { num: '01', text: 'Wunschliste 30+ Tage vor Black Friday anlegen', pct: 25 },
    { num: '02', text: 'Preisalarm setzen (idealo, camelcamelcamel)', pct: 50 },
    { num: '03', text: 'Budget: max. 20 % eines Monatseinkommens', pct: 75 },
    { num: '04', text: 'Erspartes sofort in den ETF-Sparplan umleiten', pct: 100 },
  ];

  const slide7 = slideRoot([
    topRow(badge('DEINE TAKEAWAYS')),
    headline('4 Regeln für', 'den Black Friday', 64),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '18px',
      },
    },
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px',
            padding: '20px 24px', backgroundColor: C.cardBg, borderRadius: '18px',
          },
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', {
              style: {
                fontSize: '38px', fontWeight: 800,
                color: l.pct === 100 ? C.green : C.text, minWidth: '56px',
              },
            }, l.num),
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3' } }, l.text)
          ),
          h('div', { style: { display: 'flex', height: '6px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${l.pct}%`, height: '6px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px' } })
          )
        )
      )
    ),
    keyLearning('Wer diese Regeln befolgt, spart im Schnitt über 300 EUR am Black Friday'),
    igHandle(),
  ]);

  // ─── Slide 8: CTA ──────────────────────────────────────────────────────────

  const slide8 = slideRoot([
    topRow(badge('DEINE FRAGE')),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '28px',
      },
    },
      headline('Wirst du dieses Jahr', 'Black Friday überspringen?', 56),
      h('span', {
        style: {
          fontSize: '28px', fontWeight: 500, color: C.textSoft,
          textAlign: 'center', lineHeight: '1.55',
        },
      }, 'Schreib "JA" oder "NEIN" in die Kommentare — wir sind gespannt!'),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', maxWidth: '720px' } },
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: '16px',
            padding: '20px 28px', backgroundColor: C.cardBg, borderRadius: '16px',
          },
        },
          h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.green } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, 'Speichern nicht vergessen')
        ),
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: '16px',
            padding: '20px 28px', backgroundColor: C.cardBg, borderRadius: '16px',
          },
        },
          h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.green } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, 'Folge @benarofinanzen für mehr Finanztipps')
        )
      )
    ),
    igHandle(),
  ]);

  // ─── Generate all slides ────────────────────────────────────────────────────

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(OUTPUT_DIR, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} done: ${path.basename(pngPath)}`);
  }

  console.log('All slides generated!');
}

main().catch(e => {
  console.error('Generation failed:', e.message);
  console.error(e.stack);
  process.exit(1);
});
