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
    cardBgLight: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.20)',
    green: '#10B981',
    red: '#EF4444',
    gold: '#F59E0B',
  };

  const W = 1080, H = 1350;

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')
  ).toString('base64');

  const TODAY = new Date().toISOString().slice(0, 10);
  const outDir = path.join(__dirname, 'output', `carousel_${TODAY}`, 'slides');

  const h = (type, props, ...ch) => ({
    type,
    props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function logo() {
    return h('img', {
      src: logoB64,
      width: 120, height: 120,
      style: { borderRadius: '12px', objectFit: 'cover' }
    });
  }

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '14px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '22px', fontWeight: 700,
          letterSpacing: '3px', color: C.text,
          backgroundColor: C.cardBg, padding: '10px 22px', borderRadius: '12px'
        }
      }, text)
    );
  }

  function headline(text, size = 64) {
    return h('span', {
      style: {
        fontSize: `${size}px`, fontWeight: 800, color: C.text,
        lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '6px'
      }
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500, color: C.textMuted,
        lineHeight: '1.5', marginTop: '8px'
      }
    }, text);
  }

  function keyLearning(text, accent = C.text) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px',
        padding: '22px 28px', marginTop: 'auto'
      }
    },
      h('div', {
        style: {
          display: 'flex', width: '6px', minHeight: '40px',
          backgroundColor: accent, borderRadius: '3px'
        }
      }),
      h('span', {
        style: {
          fontSize: '27px', fontWeight: 600, color: C.text, lineHeight: '1.4'
        }
      }, text)
    );
  }

  function igHandle() {
    return h('div', {
      style: { display: 'flex', alignItems: 'center', marginTop: '12px' }
    },
      h('span', {
        style: { fontSize: '24px', fontWeight: 500, color: C.textMuted }
      }, '@benarofinanzen')
    );
  }

  function slideRoot(children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column',
        width: W, height: H, padding: '70px',
        backgroundColor: C.bg, fontFamily: 'Outfit'
      }
    }, ...children);
  }

  function topRow(badgeEl) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: '8px'
      }
    },
      badgeEl,
      logo()
    );
  }

  // ─── SLIDE 1: HOOK ────────────────────────────────────────────────
  // "Du verschenkst jedes Jahr über 1.000 € ans Finanzamt"
  // Visual: large stat hero with money graphic (SVG bars + coins)
  const slide1 = (() => {
    const svgMoney = `<svg width="900" height="280" viewBox="0 0 900 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#EF4444" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#EF4444" stop-opacity="0.2"/>
        </linearGradient>
        <linearGradient id="gGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#10B981" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#10B981" stop-opacity="0.2"/>
        </linearGradient>
      </defs>
      <rect x="60" y="80" width="120" height="180" rx="12" fill="url(#gRed)" opacity="0.7"/>
      <rect x="220" y="50" width="120" height="210" rx="12" fill="url(#gRed)" opacity="0.85"/>
      <rect x="380" y="20" width="120" height="240" rx="12" fill="url(#gRed)" opacity="1"/>
      <rect x="540" y="100" width="120" height="160" rx="12" fill="url(#gGreen)" opacity="0.6"/>
      <rect x="700" y="60" width="120" height="200" rx="12" fill="url(#gGreen)" opacity="0.9"/>
      <line x1="40" y1="265" x2="860" y2="265" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
      <circle cx="440" cy="20" r="8" fill="#EF4444"/>
      <circle cx="440" cy="140" r="5" fill="rgba(255,255,255,0.4)"/>
    </svg>`;
    const svgSrc = `data:image/svg+xml;base64,${Buffer.from(svgMoney).toString('base64')}`;

    return slideRoot([
      topRow(badge('ACHTUNG')),
      headline('Du verschenkst jedes Jahr über', 58),
      h('div', { style: { display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '4px' } },
        h('span', { style: { fontSize: '96px', fontWeight: 800, color: C.red, lineHeight: '1', letterSpacing: '-3px' } }, '1.095 €'),
        h('span', { style: { fontSize: '36px', fontWeight: 700, color: C.textSoft } }, 'ans Finanzamt')
      ),
      h('div', {
        style: {
          display: 'flex', flex: '1', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', gap: '12px'
        }
      },
        h('img', { src: svgSrc, width: 900, height: 280, style: { objectFit: 'contain' } }),
        h('div', { style: { display: 'flex', gap: '32px', marginTop: '8px' } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
            h('div', { style: { display: 'flex', width: '16px', height: '16px', borderRadius: '4px', backgroundColor: C.red } }),
            h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, 'Ohne Steuererklärung')
          ),
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
            h('div', { style: { display: 'flex', width: '16px', height: '16px', borderRadius: '4px', backgroundColor: C.green } }),
            h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, 'Mit Steuererklärung')
          )
        )
      ),
      keyLearning('Ø 1.095 € Steuererstattung — aber nur wer handelt, bekommt sie'),
      igHandle()
    ]);
  })();

  // ─── SLIDE 2: PROBLEM — Statistik ────────────────────────────────
  // "Nur 52 % der Deutschen geben eine Steuererklärung ab"
  const slide2 = (() => {
    const svgFunnel = `<svg width="860" height="340" viewBox="0 0 860 340" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gBar1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.08"/>
        </linearGradient>
        <linearGradient id="gBar2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#10B981" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#10B981" stop-opacity="0.4"/>
        </linearGradient>
        <linearGradient id="gBar3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#EF4444" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#EF4444" stop-opacity="0.4"/>
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="820" height="72" rx="14" fill="url(#gBar1)"/>
      <rect x="20" y="20" width="820" height="72" rx="14" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
      <rect x="20" y="134" width="426" height="72" rx="14" fill="url(#gBar2)"/>
      <rect x="20" y="248" width="394" height="72" rx="14" fill="url(#gBar3)"/>
      <line x1="20" y1="320" x2="840" y2="320" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    </svg>`;
    const svgSrc = `data:image/svg+xml;base64,${Buffer.from(svgFunnel).toString('base64')}`;

    return slideRoot([
      topRow(badge('DAS PROBLEM')),
      headline('Millionen Deutsche', 60),
      h('span', { style: { fontSize: '60px', fontWeight: 800, color: C.red, lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '6px' } }, 'verschenken Geld'),
      h('div', {
        style: {
          display: 'flex', flex: '1', flexDirection: 'column',
          justifyContent: 'center', position: 'relative'
        }
      },
        h('img', { src: svgSrc, width: 860, height: 340, style: { objectFit: 'contain', position: 'absolute', top: '0', left: '0' } }),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '62px', paddingTop: '0px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '72px', padding: '0 24px' } },
            h('span', { style: { fontSize: '27px', fontWeight: 700, color: C.textSoft } }, 'Alle Arbeitnehmer in Deutschland'),
            h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.text } }, '100 %')
          ),
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '72px', padding: '0 24px' } },
            h('span', { style: { fontSize: '27px', fontWeight: 700, color: C.text } }, 'Geben Steuererklärung ab'),
            h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.green } }, '52 %')
          ),
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '72px', padding: '0 24px' } },
            h('span', { style: { fontSize: '27px', fontWeight: 700, color: C.textSoft } }, 'Verschenken ihr Geld'),
            h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.red } }, '48 %')
          )
        )
      ),
      keyLearning('Fast jeder zweite Arbeitnehmer bekommt kein Geld zurück — unnötig', C.red),
      igHandle()
    ]);
  })();

  // ─── SLIDE 3: COUNTDOWN ─────────────────────────────────────────
  // "Nur noch 3 Monate bis 31.12.2026 — das sind deine Optionen"
  const slide3 = (() => {
    const months = [
      { name: 'Okt', active: false, pct: 0 },
      { name: 'Nov', active: false, pct: 0 },
      { name: 'Dez', active: false, pct: 0 },
    ];

    return slideRoot([
      topRow(badge('DER COUNTDOWN')),
      headline('Nur noch 3 Monate', 66),
      h('span', {
        style: {
          fontSize: '34px', fontWeight: 700, color: C.green,
          lineHeight: '1.1', letterSpacing: '-0.5px', marginBottom: '6px'
        }
      }, 'bis 31. Dezember 2026'),
      h('div', {
        style: {
          display: 'flex', flex: '1', flexDirection: 'column',
          justifyContent: 'center', gap: '20px'
        }
      },
        h('div', { style: { display: 'flex', gap: '18px' } },
          ...months.map((m, i) =>
            h('div', {
              style: {
                display: 'flex', flex: '1', flexDirection: 'column',
                alignItems: 'center', gap: '14px',
                backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px 20px',
                border: `2px solid ${i === 2 ? C.red : C.border}`
              }
            },
              h('span', {
                style: {
                  fontSize: '44px', fontWeight: 800,
                  color: i === 2 ? C.red : C.textSoft
                }
              }, m.name),
              h('div', {
                style: {
                  display: 'flex', flexDirection: 'column', gap: '8px',
                  alignItems: 'center', width: '100%'
                }
              },
                h('div', {
                  style: {
                    display: 'flex', width: '100%', height: '8px',
                    backgroundColor: C.border, borderRadius: '4px', overflow: 'hidden'
                  }
                },
                  h('div', {
                    style: {
                      display: 'flex', height: '8px', borderRadius: '4px',
                      backgroundColor: i === 2 ? C.red : C.green,
                      width: i === 0 ? '33%' : i === 1 ? '66%' : '100%'
                    }
                  })
                ),
                h('span', {
                  style: {
                    fontSize: '22px', fontWeight: 600,
                    color: i === 2 ? C.red : C.textMuted
                  }
                }, i === 2 ? 'DEADLINE' : `Monat ${i + 1}`)
              )
            )
          )
        ),
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '12px',
            backgroundColor: 'rgba(239,68,68,0.08)', borderRadius: '18px',
            padding: '22px 28px', border: `1px solid rgba(239,68,68,0.25)`
          }
        },
          h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.red } }, 'Wichtige Fristen 2026'),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, lineHeight: '1.5' } },
            '31. Oktober: Verlustbescheinigung bei der Bank beantragen'
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 500, color: C.textSoft, lineHeight: '1.5' } },
            '31. Dezember: Spenden, Vorsorge & Werbungskosten buchen'
          )
        )
      ),
      keyLearning('Was du jetzt nicht tust, kostet dich bares Geld'),
      igHandle()
    ]);
  })();

  // ─── SLIDE 4: TIPP 1 — WERBUNGSKOSTEN ───────────────────────────
  const slide4 = (() => {
    const items = [
      { icon: '🏠', title: 'Home Office', sub: '6 € pro Tag, max. 1.260 € p.a.' },
      { icon: '🚗', title: 'Fahrten', sub: '0,30 € pro km (Entfernungspauschale)' },
      { icon: '📚', title: 'Fortbildung', sub: 'Kurse, Bücher, Online-Tools' },
      { icon: '💻', title: 'Arbeitsmittel', sub: 'PC, Schreibtisch, Drucker' },
    ];

    return slideRoot([
      topRow(badge('TIPP 1 VON 3')),
      headline('Werbungskosten —', 60),
      headline('oft unterschätzt', 60),
      subline('Diese Kosten kannst du von der Steuer absetzen'),
      h('div', {
        style: {
          display: 'flex', flex: '1', flexDirection: 'column',
          justifyContent: 'center', gap: '14px'
        }
      },
        h('div', { style: { display: 'flex', gap: '14px' } },
          ...items.slice(0, 2).map(item =>
            h('div', {
              style: {
                display: 'flex', flex: '1', flexDirection: 'column',
                backgroundColor: C.cardBg, borderRadius: '20px',
                padding: '28px', gap: '10px'
              }
            },
              h('span', { style: { fontSize: '40px', lineHeight: '1' } }, item.icon),
              h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text, lineHeight: '1.3' } }, item.title),
              h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, item.sub)
            )
          )
        ),
        h('div', { style: { display: 'flex', gap: '14px' } },
          ...items.slice(2).map(item =>
            h('div', {
              style: {
                display: 'flex', flex: '1', flexDirection: 'column',
                backgroundColor: C.cardBg, borderRadius: '20px',
                padding: '28px', gap: '10px'
              }
            },
              h('span', { style: { fontSize: '40px', lineHeight: '1' } }, item.icon),
              h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text, lineHeight: '1.3' } }, item.title),
              h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, item.sub)
            )
          )
        ),
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: '16px',
            backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '14px',
            padding: '16px 24px', border: '1px solid rgba(16,185,129,0.3)'
          }
        },
          h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '6px', backgroundColor: C.green } }),
          h('span', { style: { fontSize: '25px', fontWeight: 600, color: C.green } },
            'Arbeitnehmer-Pauschbetrag: 1.230 € automatisch'
          )
        )
      ),
      keyLearning('Übersteigen deine Werbungskosten 1.230 €, lohnt sich die Angabe definitiv'),
      igHandle()
    ]);
  })();

  // ─── SLIDE 5: TIPP 2 — VORSORGEAUFWENDUNGEN ─────────────────────
  const slide5 = (() => {
    const cards = [
      { label: 'Krankenversicherung', value: 'Bis zu 1.900 € absetzbar', color: C.green },
      { label: 'Altersvorsorge-Depot', value: 'Ab 2027: bis zu 540 € Förderung', color: C.gold },
      { label: 'Spenden', value: 'Bis 20 % des Gesamtbetrags', color: C.text },
      { label: 'Riester-Rente', value: 'Bis zu 2.100 € Sonderausgabe', color: C.green },
    ];

    return slideRoot([
      topRow(badge('TIPP 2 VON 3')),
      headline('Vorsorgeaufwendungen —', 56),
      headline('kaum jemand nutzt sie', 56),
      subline('Diese Beträge reduzieren dein steuerpflichtiges Einkommen'),
      h('div', {
        style: {
          display: 'flex', flex: '1', flexDirection: 'column',
          justifyContent: 'center', gap: '14px'
        }
      },
        ...cards.map(card =>
          h('div', {
            style: {
              display: 'flex', flexDirection: 'row', alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: C.cardBg, borderRadius: '18px',
              padding: '22px 28px',
              borderLeft: `4px solid ${card.color}`
            }
          },
            h('span', { style: { fontSize: '27px', fontWeight: 700, color: C.text } }, card.label),
            h('span', { style: { fontSize: '24px', fontWeight: 600, color: card.color } }, card.value)
          )
        )
      ),
      keyLearning('Vorsorgekosten senken dein zu versteuerndes Einkommen — direkte Steuerersparnis'),
      igHandle()
    ]);
  })();

  // ─── SLIDE 6: TIPP 3 — KAPITALVERLUSTE VERRECHNEN ───────────────
  const slide6 = (() => {
    const svgChart = `<svg width="860" height="280" viewBox="0 0 860 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gChartGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#10B981" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#10B981" stop-opacity="0.0"/>
        </linearGradient>
        <linearGradient id="gChartRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#EF4444" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#EF4444" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      <path d="M 60 220 C 150 180 200 100 300 80 C 380 64 430 160 500 180 C 570 200 620 120 760 40" stroke="#10B981" stroke-width="3" fill="none"/>
      <path d="M 60 220 C 150 180 200 100 300 80 C 380 64 430 160 500 180 C 570 200 620 120 760 40 L 760 280 L 60 280 Z" fill="url(#gChartGreen)"/>
      <line x1="500" y1="40" x2="500" y2="260" stroke="rgba(239,68,68,0.5)" stroke-width="2" stroke-dasharray="8,6"/>
      <path d="M 500 180 C 560 210 620 240 760 240" stroke="#EF4444" stroke-width="3" fill="none" stroke-dasharray="12,6"/>
      <path d="M 500 180 C 560 210 620 240 760 240 L 760 280 L 500 280 Z" fill="url(#gChartRed)"/>
      <circle cx="300" cy="80" r="7" fill="#10B981"/>
      <circle cx="500" cy="180" r="7" fill="#F59E0B"/>
      <circle cx="760" cy="40" r="7" fill="#10B981"/>
      <line x1="40" y1="260" x2="820" y2="260" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    </svg>`;
    const svgSrc = `data:image/svg+xml;base64,${Buffer.from(svgChart).toString('base64')}`;

    return slideRoot([
      topRow(badge('TIPP 3 VON 3')),
      headline('Kapitalverluste', 64),
      headline('jetzt noch verrechnen', 64),
      subline('Verluste aus ETFs oder Aktien senken deine Steuer'),
      h('div', {
        style: {
          display: 'flex', flex: '1', flexDirection: 'column',
          justifyContent: 'center', gap: '16px'
        }
      },
        h('img', { src: svgSrc, width: 860, height: 280, style: { objectFit: 'contain' } }),
        h('div', { style: { display: 'flex', gap: '16px' } },
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column', gap: '8px',
              backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '16px',
              padding: '20px 24px', border: '1px solid rgba(16,185,129,0.3)'
            }
          },
            h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.green } }, 'Gewinne'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft } }, 'Werden besteuert mit 25 % + Soli')
          ),
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column', gap: '8px',
              backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '16px',
              padding: '20px 24px', border: '1px solid rgba(239,68,68,0.3)'
            }
          },
            h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.red } }, 'Verluste'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft } }, 'Verrechnen mit Gewinnen')
          ),
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column', gap: '8px',
              backgroundColor: 'rgba(245,158,11,0.1)', borderRadius: '16px',
              padding: '20px 24px', border: '1px solid rgba(245,158,11,0.3)'
            }
          },
            h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.gold } }, 'Deadline'),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft } }, '31. Oktober: Bescheinigung beantragen')
          )
        )
      ),
      keyLearning('Wer jetzt nicht handelt, kann Verluste von 2026 nicht mehr nutzen', C.red),
      igHandle()
    ]);
  })();

  // ─── SLIDE 7: 4-SCHRITTE-FAHRPLAN ────────────────────────────────
  const slide7 = (() => {
    const steps = [
      { num: '01', text: 'Belege & Werbungskosten sammeln', pct: 25 },
      { num: '02', text: 'Vorsorgeaufwendungen prüfen', pct: 50 },
      { num: '03', text: 'Verlustbescheinigung bis 31. Okt.', pct: 75 },
      { num: '04', text: 'Steuererklärung bis 31. Dez.', pct: 100 },
    ];

    return slideRoot([
      topRow(badge('DEIN FAHRPLAN')),
      headline('4 Schritte bis zum', 60),
      headline('31. Dezember 2026', 60),
      h('div', {
        style: {
          display: 'flex', flex: '1', flexDirection: 'column',
          justifyContent: 'center', gap: '14px'
        }
      },
        ...steps.map(s =>
          h('div', {
            style: {
              display: 'flex', flexDirection: 'column', gap: '10px',
              padding: '22px 28px',
              backgroundColor: C.cardBg, borderRadius: '18px'
            }
          },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
              h('span', {
                style: {
                  fontSize: '38px', fontWeight: 800, minWidth: '56px',
                  color: s.pct === 100 ? C.green : C.text
                }
              }, s.num),
              h('span', {
                style: { fontSize: '27px', fontWeight: 600, color: C.text, lineHeight: '1.3' }
              }, s.text)
            ),
            h('div', {
              style: {
                display: 'flex', height: '6px',
                backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden'
              }
            },
              h('div', {
                style: {
                  display: 'flex', height: '6px', borderRadius: '3px',
                  backgroundColor: s.pct === 100 ? C.green : C.text,
                  width: `${s.pct}%`
                }
              })
            )
          )
        )
      ),
      keyLearning('Wer jetzt startet, bekommt früher Geld zurück'),
      igHandle()
    ]);
  })();

  // ─── SLIDE 8: CTA ─────────────────────────────────────────────────
  const slide8 = (() => {
    return slideRoot([
      topRow(badge('DEIN NÄCHSTER SCHRITT')),
      h('div', {
        style: {
          display: 'flex', flex: '1', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', gap: '32px'
        }
      },
        h('img', { src: logoB64, width: 160, height: 160, style: { borderRadius: '20px', objectFit: 'cover' } }),
        h('span', {
          style: {
            fontSize: '50px', fontWeight: 800, color: C.text,
            textAlign: 'center', lineHeight: '1.15', letterSpacing: '-1px'
          }
        }, 'Hast du dieses Jahr schon Steuern gespart?'),
        h('span', {
          style: {
            fontSize: '30px', fontWeight: 500, color: C.textMuted,
            textAlign: 'center', lineHeight: '1.5'
          }
        }, 'Schreib es uns in die Kommentare! Wir helfen dir gerne weiter.'),
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '14px',
            alignItems: 'center', width: '100%'
          }
        },
          h('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: '12px',
              backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '16px',
              padding: '16px 28px', border: '1px solid rgba(16,185,129,0.3)'
            }
          },
            h('span', { style: { fontSize: '27px', fontWeight: 700, color: C.green } },
              'Speichern nicht vergessen'
            )
          ),
          h('span', {
            style: { fontSize: '26px', fontWeight: 500, color: C.textMuted }
          }, 'Folge @benarofinanzen für mehr Finanztipps')
        )
      ),
      igHandle()
    ]);
  })();

  // ─── GENERATE ALL SLIDES ─────────────────────────────────────────
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

main().catch(e => { console.error(e); process.exit(1); });
