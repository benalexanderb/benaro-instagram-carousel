const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default || require('satori');
  const { Resvg } = require('@resvg/resvg-js');

  const fontDir = '/tmp/workspace/node_modules/@fontsource/outfit/files';
  const fonts = [400, 500, 600, 700, 800].flatMap(w => [
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(`${fontDir}/outfit-latin-${w}-normal.woff`) },
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(`${fontDir}/outfit-latin-ext-${w}-normal.woff`) },
  ]);

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync('/tmp/workspace/skills/instagram-carousel-skill/templates/benaro-logo.jpg').toString('base64');

  const C = {
    bg: '#001f60',
    text: '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted: '#9CA3AF',
    cardBg: 'rgba(255,255,255,0.10)',
    border: 'rgba(255,255,255,0.18)',
    green: '#10B981',
    red: '#EF4444',
  };

  const W = 1080, H = 1350;
  const PAD = 70;
  const OUTDIR = '/tmp/workspace/output/carousel_2026-07-26/slides';

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
      width: 100,
      height: 100,
      style: { borderRadius: '12px', objectFit: 'cover' },
    });
  }

  function badgeEl(text) {
    return h('div', { style: { display: 'flex', marginBottom: '14px' } },
      h('span', {
        style: {
          display: 'flex',
          fontSize: '21px',
          fontWeight: 700,
          letterSpacing: '3px',
          color: C.text,
          backgroundColor: C.cardBg,
          padding: '10px 22px',
          borderRadius: '12px',
        },
      }, text),
    );
  }

  function headlineEl(text, size) {
    const sz = size || 64;
    return h('span', {
      style: {
        fontSize: sz + 'px',
        fontWeight: 800,
        color: C.text,
        lineHeight: '1.08',
        letterSpacing: '-1.5px',
        marginBottom: '6px',
      },
    }, text);
  }

  function sublineEl(text) {
    return h('span', {
      style: {
        fontSize: '28px',
        fontWeight: 500,
        color: C.textMuted,
        lineHeight: '1.4',
        marginTop: '8px',
        marginBottom: '4px',
      },
    }, text);
  }

  function keyLearningEl(text, accentColor) {
    return h('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        backgroundColor: C.cardBg,
        borderRadius: '16px',
        padding: '22px 28px',
        marginTop: '16px',
      },
    },
      h('div', {
        style: {
          display: 'flex',
          width: '6px',
          minHeight: '40px',
          backgroundColor: accentColor || C.text,
          borderRadius: '3px',
          flexShrink: 0,
        },
      }),
      h('span', {
        style: {
          fontSize: '27px',
          fontWeight: 600,
          color: C.text,
          lineHeight: '1.4',
        },
      }, text),
    );
  }

  function igHandleEl() {
    return h('div', { style: { display: 'flex', alignItems: 'center', marginTop: '14px' } },
      h('span', {
        style: { fontSize: '23px', fontWeight: 500, color: C.textMuted },
      }, '@benarofinanzen'),
    );
  }

  function topRowEl(badgeText) {
    return h('div', {
      style: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '4px',
        width: '100%',
      },
    },
      badgeEl(badgeText),
      logo(),
    );
  }

  function slideRoot(children) {
    return h('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: W,
        height: H,
        padding: PAD + 'px',
        backgroundColor: C.bg,
        fontFamily: 'Outfit',
      },
    }, ...children);
  }

  function connectorEl() {
    return h('div', { style: { display: 'flex', justifyContent: 'center', padding: '6px 0' } },
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
        h('div', { style: { display: 'flex', width: '3px', height: '24px', backgroundColor: C.border } }),
        h('div', { style: { display: 'flex', width: '0px', height: '0px', borderLeft: '9px solid transparent', borderRight: '9px solid transparent', borderTop: '11px solid ' + C.border } }),
      ),
    );
  }

  // ============================================================
  // SLIDE 1 — HOOK
  // ============================================================
  const slide1 = slideRoot([
    topRowEl('STILLE CHANCE'),
    headlineEl('73% der ETF-Anleger lassen 4% Rendite liegen', 58),
    sublineEl('Der blinde Fleck in fast jedem deutschen Depot'),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' },
    },
      h('div', { style: { display: 'flex', gap: '14px' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '20px', padding: '30px', gap: '12px',
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'TYPISCHES DEPOT'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '52px', fontWeight: 800, color: C.text } }, '7%'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, lineHeight: '1.3' } }, 'Nur Aktien-ETF'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'MSCI World oder S&P 500'),
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(16,185,129,0.15)',
            border: '2px solid rgba(16,185,129,0.5)',
            borderRadius: '20px', padding: '30px', gap: '12px',
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'OPTIMIERTES DEPOT'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(16,185,129,0.4)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '52px', fontWeight: 800, color: C.green } }, '7%+4%'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, lineHeight: '1.3' } }, 'Aktien + Anleihen-ETF'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, 'Stabile Zinsrendite extra'),
        ),
      ),
      h('div', {
        style: {
          display: 'flex',
          backgroundColor: 'rgba(239,68,68,0.10)',
          border: '1px solid rgba(239,68,68,0.35)',
          borderRadius: '14px',
          padding: '18px 24px',
          alignItems: 'center',
          gap: '14px',
        },
      },
        h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '6px', backgroundColor: C.red, flexShrink: 0 } }),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, 'Die meisten ignorieren Anleihen-ETFs vollständig — und verlieren jährlich tausende Euro'),
      ),
    ),
    keyLearningEl('Anleihen-ETFs zahlen dir heute 3-5% Zinsen pro Jahr — automatisch.'),
    igHandleEl(),
  ]);

  // ============================================================
  // SLIDE 2 — STAT HERO
  // ============================================================
  const slide2 = slideRoot([
    topRowEl('DAS PROBLEM'),
    headlineEl('Der blinde Fleck im deutschen Depot', 58),
    sublineEl('Was Statistiken über ETF-Anleger zeigen'),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '24px' },
    },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          backgroundColor: C.cardBg, borderRadius: '24px', padding: '40px 60px', gap: '10px', width: '100%',
        },
      },
        h('span', { style: { fontSize: '130px', fontWeight: 800, color: C.text, lineHeight: '1.0' } }, '73%'),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textMuted, textAlign: 'center', lineHeight: '1.4' } }, 'der deutschen ETF-Anleger halten keine einzige Anleihe in ihrem Depot'),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px', width: '100%' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '18px', padding: '24px', alignItems: 'center', gap: '8px',
          },
        },
          h('span', { style: { fontSize: '44px', fontWeight: 800, color: C.red } }, '0%'),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted, textAlign: 'center', lineHeight: '1.3' } }, 'Zins-Einkommen ohne Anleihen-ETF'),
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(16,185,129,0.12)',
            border: '1px solid rgba(16,185,129,0.4)',
            borderRadius: '18px', padding: '24px', alignItems: 'center', gap: '8px',
          },
        },
          h('span', { style: { fontSize: '44px', fontWeight: 800, color: C.green } }, '3-5%'),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textSoft, textAlign: 'center', lineHeight: '1.3' } }, 'Zinsen p.a. mit Anleihen-ETF'),
        ),
      ),
    ),
    keyLearningEl('73% der Anleger verzichten freiwillig auf bis zu 5% Rendite pro Jahr.'),
    igHandleEl(),
  ]);

  // ============================================================
  // SLIDE 3 — FLOW-DIAGRAMM
  // ============================================================
  function flowStepEl(num, title, detail, accent) {
    const bg = accent ? 'rgba(16,185,129,0.12)' : C.cardBg;
    const border = accent ? '1px solid rgba(16,185,129,0.35)' : 'none';
    const numColor = accent ? C.green : C.text;
    const numBg = accent ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.15)';
    const titleColor = accent ? C.green : C.text;
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '18px',
        backgroundColor: bg, border: border, borderRadius: '18px', padding: '26px 30px',
      },
    },
      h('div', {
        style: {
          display: 'flex', width: '56px', height: '56px', borderRadius: '16px',
          backgroundColor: numBg, alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        },
      },
        h('span', { style: { fontSize: '28px', fontWeight: 800, color: numColor } }, num),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: titleColor } }, title),
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.3' } }, detail),
      ),
    );
  }

  const slide3 = slideRoot([
    topRowEl('WIE ES FUNKTIONIERT'),
    headlineEl('Anleihen-ETF in 60 Sekunden erklaert', 56),
    sublineEl('So fliesst dein Geld — und so kommt es zurueck'),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '0px' },
    },
      flowStepEl('1', 'Du kaufst einen Anleihen-ETF', 'Schon ab 1 EUR/Monat im Sparplan', false),
      connectorEl(),
      flowStepEl('2', 'Der ETF leiht Geld an 1.000+ Schuldner', 'Staaten und Unternehmen weltweit', false),
      connectorEl(),
      flowStepEl('3', 'Du erhältst automatisch Zinsen', 'Quartalsmässig oder monatlich — ohne Aufwand', true),
      connectorEl(),
      flowStepEl('4', 'Jederzeit verkaufbar wie ein Aktien-ETF', 'Keine Mindestlaufzeit, täglich handelbar', false),
    ),
    keyLearningEl('Du leihst Geld — 1.000+ Schuldner zahlen dir Zinsen. Der ETF macht alles automatisch.'),
    igHandleEl(),
  ]);

  // ============================================================
  // SLIDE 4 — ERWARTUNG vs. REALITÄT (3 Mythen)
  // ============================================================
  function mythRowEl(mythos, realitaet) {
    return h('div', { style: { display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'stretch' } },
      h('div', {
        style: {
          display: 'flex', flex: '1', flexDirection: 'column',
          backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 24px', gap: '6px',
        },
      },
        h('span', { style: { fontSize: '19px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'MYTHOS'),
        h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', lineHeight: '1.4', textDecoration: 'line-through' } }, mythos),
      ),
      h('div', {
        style: {
          display: 'flex', flex: '1', flexDirection: 'column',
          backgroundColor: 'rgba(255,255,255,0.92)', borderRadius: '16px', padding: '22px 24px', gap: '6px',
        },
      },
        h('span', { style: { fontSize: '19px', fontWeight: 700, letterSpacing: '2px', color: '#001f60' } }, 'REALITÄT'),
        h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(0,31,96,0.2)', borderRadius: '2px' } }),
        h('span', { style: { fontSize: '24px', fontWeight: 700, color: '#001f60', lineHeight: '1.4' } }, realitaet),
      ),
    );
  }

  const slide4 = slideRoot([
    topRowEl('MYTHOS ENTLARVT'),
    headlineEl('Was du denkst — was wirklich stimmt', 58),
    sublineEl('3 Irrtümer über Anleihen-ETFs'),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' },
    },
      mythRowEl('Nur für Rentner und Konservative', 'Pflichtbestandteil in JEDEM reifen Portfolio'),
      mythRowEl('Anleihen bringen kaum Rendite', 'Aktuell 3-5% p.a. — mehr als Tagesgeld!'),
      mythRowEl('Festgeld ist mindestens genauso gut', 'Anleihen-ETF ist täglich kündbar — Festgeld nicht'),
    ),
    keyLearningEl('Anleihen-ETFs sind so flüssig wie Aktien-ETFs — aber mit festen Zinszahlungen.'),
    igHandleEl(),
  ]);

  // ============================================================
  // SLIDE 5 — TOP 3 ETF Vergleich
  // ============================================================
  function etfRowEl(label, name, ter, rendite, highlighted) {
    const bg = highlighted ? 'rgba(16,185,129,0.12)' : C.cardBg;
    const border = highlighted ? '1px solid rgba(16,185,129,0.35)' : 'none';
    const labelColor = highlighted ? C.green : C.textMuted;
    const renditeColor = highlighted ? C.green : C.text;
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        backgroundColor: bg, border: border, borderRadius: '18px', padding: '24px 28px', gap: '18px',
      },
    },
      h('div', { style: { display: 'flex', flexDirection: 'column', flex: '1', gap: '5px' } },
        h('span', { style: { fontSize: '14px', fontWeight: 700, letterSpacing: '2px', color: labelColor } }, label),
        h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.text, lineHeight: '1.3' } }, name),
        h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, ter),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' } },
        h('span', { style: { fontSize: '36px', fontWeight: 800, color: renditeColor } }, rendite),
        h('span', { style: { fontSize: '19px', fontWeight: 500, color: C.textMuted } }, 'Rendite p.a.'),
      ),
    );
  }

  const slide5 = slideRoot([
    topRowEl('TOP 3 ANLEIHEN-ETFs'),
    headlineEl('Die besten Anleihen-ETFs 2026', 60),
    sublineEl('Rendite, Kosten und Einsatzgebiet im Überblick'),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' },
    },
      etfRowEl('STAATSANLEIHEN EUROPA', 'iShares Core EUR Govt Bond', 'TER 0,07% — sehr günstig', '3,8%', false),
      etfRowEl('US-STAATSANLEIHEN HEDGED', 'Xtrackers USD Treasury Bond', 'TER 0,15% — EUR-gesichert', '4,5%', true),
      etfRowEl('UNTERNEHMENSANLEIHEN GLOBAL', 'iShares Global Corp Bond', 'TER 0,20% — mehr Rendite', '4,2%', false),
    ),
    keyLearningEl('Die Rendite kommt aus Zinsen, nicht aus Kursschwankungen — planbarer und stabiler.'),
    igHandleEl(),
  ]);

  // ============================================================
  // SLIDE 6 — 70/30-STRATEGIE (Pie-Chart)
  // ============================================================
  const pW = 300, pH = 300, r = 130, cx2 = 150, cy2 = 150;
  const midAngle = -Math.PI / 2 + 2 * Math.PI * 0.70;

  function polar(angle) {
    return { x: cx2 + r * Math.cos(angle), y: cy2 + r * Math.sin(angle) };
  }

  const p1 = polar(-Math.PI / 2);
  const p2 = polar(midAngle);

  const pieSvg = `<svg width="${pW}" height="${pH}" viewBox="0 0 ${pW} ${pH}" xmlns="http://www.w3.org/2000/svg">
  <path d="M ${cx2} ${cy2} L ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 1 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} Z" fill="rgba(255,255,255,0.22)"/>
  <path d="M ${cx2} ${cy2} L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} A ${r} ${r} 0 0 1 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} Z" fill="#10B981"/>
  <circle cx="${cx2}" cy="${cy2}" r="55" fill="#001f60"/>
</svg>`;
  const pieSrc = 'data:image/svg+xml;base64,' + Buffer.from(pieSvg).toString('base64');

  const slide6 = slideRoot([
    topRowEl('DIE STRATEGIE'),
    headlineEl('Das 70/30-Portfolio: Wachstum + Stabilität', 52),
    sublineEl('Die Standardformel für langfristigen Vermögensaufbau'),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '22px' },
    },
      h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '28px' } },
        h('img', { src: pieSrc, width: pW, height: pH, style: { objectFit: 'contain', flexShrink: 0 } }),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '22px', flex: '1' } },
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
            h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' } },
              h('div', { style: { display: 'flex', width: '18px', height: '18px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.4)', flexShrink: 0 } }),
              h('span', { style: { fontSize: '44px', fontWeight: 800, color: C.text } }, '70%'),
            ),
            h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.text } }, 'Aktien-ETF'),
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, lineHeight: '1.3' } }, 'MSCI World oder S&P 500 — für Wachstum'),
          ),
          h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: C.border, borderRadius: '1px' } }),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
            h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' } },
              h('div', { style: { display: 'flex', width: '18px', height: '18px', borderRadius: '4px', backgroundColor: C.green, flexShrink: 0 } }),
              h('span', { style: { fontSize: '44px', fontWeight: 800, color: C.green } }, '30%'),
            ),
            h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.green } }, 'Anleihen-ETF'),
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, lineHeight: '1.3' } }, '3-5% Zinsen p.a. — für Stabilität'),
          ),
        ),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '12px', width: '100%' } },
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: C.cardBg, borderRadius: '14px', padding: '18px 20px', gap: '4px', alignItems: 'center',
          },
        },
          h('span', { style: { fontSize: '19px', fontWeight: 600, color: C.textMuted } }, '100 EUR/Monat Sparplan'),
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.text } }, '70 EUR'),
          h('span', { style: { fontSize: '18px', fontWeight: 500, color: C.textMuted } }, 'in MSCI World ETF'),
        ),
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(16,185,129,0.12)',
            border: '1px solid rgba(16,185,129,0.35)',
            borderRadius: '14px', padding: '18px 20px', gap: '4px', alignItems: 'center',
          },
        },
          h('span', { style: { fontSize: '19px', fontWeight: 600, color: C.green } }, '+3-5% Zinsen p.a.'),
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.green } }, '30 EUR'),
          h('span', { style: { fontSize: '18px', fontWeight: 500, color: C.textMuted } }, 'in Anleihen-ETF'),
        ),
      ),
    ),
    keyLearningEl('70/30 ist die Standardformel: Wachstum durch Aktien, Stabilität durch Anleihen.'),
    igHandleEl(),
  ]);

  // ============================================================
  // SLIDE 7 — TAKEAWAYS
  // ============================================================
  const learnings = [
    { num: '01', text: 'Anleihen-ETFs zahlen dir heute 3-5% Zinsen pro Jahr', pct: 25 },
    { num: '02', text: '70/30-Formel: Aktien-ETF für Wachstum, Anleihen-ETF für Stabilität', pct: 50 },
    { num: '03', text: 'Kosten unter 0,20% TER — effizienter als Festgeld', pct: 75 },
    { num: '04', text: 'Bei EZB-Zinssenkungen steigen Anleihen-ETFs im Wert', pct: 100 },
  ];

  const slide7 = slideRoot([
    topRowEl('DEINE 4 TAKEAWAYS'),
    headlineEl('Was du heute mitnimmst', 62),
    h('div', {
      style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' },
    },
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px',
            padding: '22px 26px', backgroundColor: C.cardBg, borderRadius: '18px',
          },
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
            h('span', { style: { fontSize: '36px', fontWeight: 800, color: l.pct === 100 ? C.green : C.text, minWidth: '54px' } }, l.num),
            h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.text, lineHeight: '1.3', flex: '1' } }, l.text),
          ),
          h('div', { style: { display: 'flex', height: '5px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: l.pct + '%', height: '5px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px' } }),
          ),
        )
      ),
    ),
    keyLearningEl('Start jetzt: 1 Anleihen-ETF reicht als erster Schritt zur Depot-Optimierung.'),
    igHandleEl(),
  ]);

  // ============================================================
  // SLIDE 8 — CTA
  // ============================================================
  const slide8 = slideRoot([
    topRowEl('JETZT HANDELN'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '32px',
      },
    },
      h('div', {
        style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' },
      },
        h('span', {
          style: {
            fontSize: '50px', fontWeight: 800, color: C.text,
            textAlign: 'center', lineHeight: '1.15', letterSpacing: '-1px',
          },
        }, 'Hast du bereits Anleihen in deinem Depot?'),
        h('div', { style: { display: 'flex', width: '80px', height: '4px', backgroundColor: C.green, borderRadius: '2px' } }),
        h('span', {
          style: {
            fontSize: '28px', fontWeight: 500, color: C.textMuted,
            textAlign: 'center', lineHeight: '1.5',
          },
        }, 'Schreib JA oder NEIN in die Kommentare!'),
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
          backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px 40px', width: '100%',
        },
      },
        h('img', { src: logoB64, width: 90, height: 90, style: { borderRadius: '12px', objectFit: 'cover' } }),
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, '@benarofinanzen'),
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, textAlign: 'center', lineHeight: '1.4' } }, 'Folge für tägliches Finanzwissen'),
      ),
    ),
    keyLearningEl('Speichern nicht vergessen — diesen Post brauchst du beim nächsten Depot-Check.', C.green),
  ]);

  // ============================================================
  // RENDER
  // ============================================================
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = `${OUTDIR}/slide-${String(i + 1).padStart(2, '0')}.png`;
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log('Slide ' + (i + 1) + '/' + slides.length + ' fertig: ' + pngPath);
  }

  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => {
  console.error('Fehler:', e.message || e);
  process.exit(1);
});
