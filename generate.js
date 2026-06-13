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

  const C = {
    bg: '#001F61',
    text: '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted: '#9CA3AF',
    cardBg: 'rgba(255,255,255,0.1)',
    border: 'rgba(255,255,255,0.2)',
    green: '#10B981',
    red: '#EF4444',
    bgDark: '#001542',
    gold: '#F59E0B',
  };

  const W = 1080, H = 1350;

  const logoB64 = 'data:image/jpeg;base64,' +
    fs.readFileSync(path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')).toString('base64');

  const outDir = path.join(__dirname, 'output/carousel_2026-06-13/slides');
  fs.mkdirSync(outDir, { recursive: true });

  const h = (type, props, ...ch) => ({
    type,
    props: {
      ...props,
      children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch,
    },
  });

  // ── REUSABLE COMPONENTS ──────────────────────────────────────────────────────

  function slideRoot(bgColor, ...children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column',
        width: W, height: H, padding: '70px',
        backgroundColor: bgColor, fontFamily: 'Outfit',
      },
    }, ...children);
  }

  function topRow(badgeText, accentBg) {
    return h('div', {
      style: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '20px',
      },
    },
      h('span', {
        style: {
          fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: accentBg || C.cardBg,
          padding: '10px 22px', borderRadius: '12px',
        },
      }, badgeText),
      h('img', {
        src: logoB64,
        width: 100, height: 100,
        style: { borderRadius: '12px', objectFit: 'cover' },
      })
    );
  }

  function headline(text, size) {
    return h('span', {
      style: {
        fontSize: `${size || 64}px`, fontWeight: 800,
        color: C.text, lineHeight: '1.08',
        letterSpacing: '-1.5px', marginBottom: '6px',
      },
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500,
        color: C.textMuted, lineHeight: '1.5', marginTop: '8px',
      },
    }, text);
  }

  function keyLearning(text, accentColor) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px',
        padding: '22px 28px', marginTop: 'auto',
      },
    },
      h('div', {
        style: {
          display: 'flex', width: '6px', minHeight: '40px',
          backgroundColor: accentColor || C.green, borderRadius: '3px',
        },
      }),
      h('span', {
        style: {
          fontSize: '26px', fontWeight: 600,
          color: C.text, lineHeight: '1.4',
        },
      }, text)
    );
  }

  function igHandle() {
    return h('div', { style: { display: 'flex', alignItems: 'center', marginTop: '12px' } },
      h('span', {
        style: { fontSize: '22px', fontWeight: 500, color: C.textMuted },
      }, '@benarofinanzen')
    );
  }

  function visualBlock(...children) {
    return h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '14px',
      },
    }, ...children);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 1 — HOOK: "Was passiert mit deiner Familie wenn du stirbst?"
  // Akt 1 | Spannung | Neugier + Schock
  // ═══════════════════════════════════════════════════════════════════════════

  // SVG: Schild-Symbol (Shield icon)
  const shieldSvg = `<svg width="220" height="260" viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg">
    <path d="M110,10 L200,45 L200,130 C200,185 155,230 110,250 C65,230 20,185 20,130 L20,45 Z"
      stroke="rgba(239,68,68,0.8)" stroke-width="6" fill="rgba(239,68,68,0.12)" stroke-linejoin="round"/>
    <line x1="110" y1="80" x2="110" y2="155" stroke="rgba(239,68,68,0.9)" stroke-width="10" stroke-linecap="round"/>
    <circle cx="110" cy="178" r="8" fill="rgba(239,68,68,0.9)"/>
  </svg>`;
  const shieldSrc = `data:image/svg+xml;base64,${Buffer.from(shieldSvg).toString('base64')}`;

  // SVG: Family silhouette (simple)
  const familySvg = `<svg width="520" height="180" viewBox="0 0 520 180" xmlns="http://www.w3.org/2000/svg">
    <circle cx="120" cy="48" r="32" stroke="rgba(255,255,255,0.6)" stroke-width="4" fill="none"/>
    <path d="M65,180 Q80,120 120,110 Q160,120 175,180" stroke="rgba(255,255,255,0.6)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="260" cy="44" r="36" stroke="rgba(255,255,255,0.8)" stroke-width="5" fill="none"/>
    <path d="M200,180 Q220,115 260,104 Q300,115 320,180" stroke="rgba(255,255,255,0.8)" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="400" cy="52" r="28" stroke="rgba(255,255,255,0.5)" stroke-width="3" fill="none"/>
    <path d="M358,180 Q370,125 400,116 Q430,125 442,180" stroke="rgba(255,255,255,0.5)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <line x1="40" y1="180" x2="480" y2="180" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  </svg>`;
  const familySrc = `data:image/svg+xml;base64,${Buffer.from(familySvg).toString('base64')}`;

  const slide1 = slideRoot(C.bgDark,
    topRow('ACHTUNG', 'rgba(239,68,68,0.3)'),
    visualBlock(
      h('div', { style: { display: 'flex', gap: '28px', alignItems: 'flex-start', marginBottom: '10px' } },
        h('img', { src: shieldSrc, width: 110, height: 130, style: { objectFit: 'contain', marginTop: '8px' } }),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', flex: '1' } },
          headline('Was passiert', 62),
          headline('mit deiner', 62),
          headline('Familie, wenn', 62),
          headline('du stirbst?', 62),
        ),
      ),
      h('img', { src: familySrc, width: 940, height: 150, style: { objectFit: 'contain', marginTop: '10px' } }),
      h('div', {
        style: {
          display: 'flex', marginTop: '24px', padding: '22px 32px',
          backgroundColor: 'rgba(239,68,68,0.15)',
          borderRadius: '16px',
          border: '2px solid rgba(239,68,68,0.4)',
        },
      },
        h('span', {
          style: { fontSize: '28px', fontWeight: 600, color: C.textSoft, lineHeight: '1.5' },
        }, '25% aller Deutschen haben KEINE Risikolebensversicherung — obwohl sie eine Familie haben.'),
      ),
    ),
    keyLearning('Im Ernstfall entscheidet deine Absicherung ueber alles', C.red),
    igHandle(),
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 2 — DATEN: Witwenrente Versorgungsluecke
  // Akt 1 | Spannung | Kontext mit Zahlen
  // ═══════════════════════════════════════════════════════════════════════════

  const slide2 = slideRoot(C.bg,
    topRow('RISIKOLEBENSVERSICHERUNG', C.cardBg),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' } },
        headline('Was der Staat', 58),
        headline('zahlt — und', 58),
        headline('was fehlt.', 58),
      ),
      // Bar-Diagramm: Einkommen vs. Witwenrente vs. Luecke
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '20px' } },
        // Row 1: Bruttoeinkommen
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.text } }, 'Bruttoeinkommen Familie'),
            h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.text } }, '3.500 EUR'),
          ),
          h('div', { style: { display: 'flex', height: '32px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: '100%', height: '32px', backgroundColor: 'rgba(255,255,255,0.35)', borderRadius: '8px' } }),
          ),
        ),
        // Row 2: Kleine Witwenrente
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.textSoft } }, 'Kleine Witwenrente (Staat)'),
            h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.gold } }, '700 EUR'),
          ),
          h('div', { style: { display: 'flex', height: '32px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: '20%', height: '32px', backgroundColor: C.gold, borderRadius: '8px' } }),
          ),
        ),
        // Row 3: Luecke
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.red } }, 'Monatliche Versorgungsluecke'),
            h('span', { style: { fontSize: '24px', fontWeight: 800, color: C.red } }, '-2.800 EUR'),
          ),
          h('div', { style: { display: 'flex', height: '32px', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '8px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: '80%', height: '32px', backgroundColor: 'rgba(239,68,68,0.7)', borderRadius: '8px' } }),
          ),
        ),
      ),
    ),
    keyLearning('Die kleine Witwenrente deckt nur 20% des Familieneinkommens', C.red),
    igHandle(),
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 3 — PROBLEM: Was Menschen glauben vs. was wirklich passiert
  // Akt 1 | Spannung | Die Konsequenz
  // ═══════════════════════════════════════════════════════════════════════════

  // SVG: Funnel (Dreistufig)
  const funnelSvg = `<svg width="880" height="280" viewBox="0 0 880 280" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="0" width="800" height="72" rx="10" fill="rgba(255,255,255,0.18)"/>
    <line x1="40" y1="72" x2="160" y2="144" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    <line x1="840" y1="72" x2="720" y2="144" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    <rect x="160" y="86" width="560" height="72" rx="10" fill="rgba(245,158,11,0.3)"/>
    <line x1="160" y1="158" x2="280" y2="210" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    <line x1="720" y1="158" x2="600" y2="210" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    <rect x="280" y="202" width="320" height="72" rx="10" fill="rgba(239,68,68,0.5)"/>
  </svg>`;
  const funnelSrc = `data:image/svg+xml;base64,${Buffer.from(funnelSvg).toString('base64')}`;

  const slide3 = slideRoot(C.bgDark,
    topRow('RISIKOLEBENSVERSICHERUNG', C.cardBg),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' } },
        headline('So schrumpft', 60),
        headline('die Absicherung', 60),
        headline('im Todesfall.', 60),
      ),
      h('img', { src: funnelSrc, width: 880, height: 280, style: { objectFit: 'contain' } }),
      // Labels neben dem Funnel
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' } },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' } },
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textSoft } }, 'Letztes Nettogehalt'),
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.text } }, '3.500 EUR/Monat'),
        ),
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' } },
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.gold } }, 'Staatliche Witwenrente'),
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.gold } }, '700 EUR/Monat'),
        ),
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '10px' } },
          h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.red } }, 'Was wirklich bleibt'),
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.red } }, 'Nichts sicher'),
        ),
      ),
    ),
    keyLearning('Kinder, Miete, Kredite — alles muss alleine gestemmt werden', C.red),
    igHandle(),
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 4 — WENDEPUNKT: Erwartung vs. Realitat
  // Akt 2 | Aufloesung | Der Irrtum wird aufgedeckt
  // ═══════════════════════════════════════════════════════════════════════════

  const slide4 = slideRoot(C.bg,
    topRow('DAS IST DER IRRTUM', 'rgba(245,158,11,0.25)'),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' } },
        headline('Was du glaubst', 58),
        headline('— und was stimmt.', 58),
      ),
      h('div', { style: { display: 'flex', gap: '18px' } },
        // Erwartung (links)
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', flex: '1',
            backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '20px',
            padding: '32px 28px', gap: '16px',
            border: '2px solid rgba(255,255,255,0.15)',
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.textMuted, letterSpacing: '2.5px' } }, 'ERWARTUNG'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.55' } }, '"Mein Arbeitgeber sichert mich ab."'),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.55', marginTop: '10px' } }, '"Der Staat zahlt genug."'),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.55', marginTop: '10px' } }, '"Das passiert mir nicht."'),
        ),
        // Realitaet (rechts)
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', flex: '1',
            backgroundColor: '#FFFFFF', borderRadius: '20px',
            padding: '32px 28px', gap: '16px',
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, color: 'rgba(0,31,97,0.5)', letterSpacing: '2.5px' } }, 'REALITAET'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(0,31,97,0.15)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: '#001F61', lineHeight: '1.55' } }, 'Nur in Ausnahmefaellen — nicht standardmaessig.'),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: '#001F61', lineHeight: '1.55', marginTop: '10px' } }, 'Nur 20% des Einkommens — Luecke riesig.'),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.red, lineHeight: '1.55', marginTop: '10px' } }, 'Jeder 4. erlebt einen Ernstfall vor der Rente.'),
        ),
      ),
    ),
    keyLearning('Du bist selbst verantwortlich fuer die Absicherung deiner Familie', C.gold),
    igHandle(),
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 5 — LOESUNG: RLV Kosten vs. Leistung
  // Akt 2 | Aufloesung | Die gute Nachricht
  // ═══════════════════════════════════════════════════════════════════════════

  const slide5 = slideRoot(C.bgDark,
    topRow('SO FUNKTIONIERT ES', 'rgba(16,185,129,0.25)'),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' } },
        headline('Fuer 30 EUR/Monat:', 58),
        headline('500.000 EUR', 58),
        headline('Schutz fuer', 58),
        headline('deine Familie.', 58),
      ),
      h('div', { style: { display: 'flex', gap: '20px' } },
        // Links: Monatsbeitrag
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', flex: '1',
            backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '20px',
            padding: '36px 28px', gap: '14px',
            border: '2px solid rgba(255,255,255,0.15)',
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.textMuted, letterSpacing: '2px' } }, 'MONATSBEITRAG'),
          h('span', { style: { fontSize: '76px', fontWeight: 800, color: C.text, lineHeight: '1' } }, '30'),
          h('span', { style: { fontSize: '30px', fontWeight: 600, color: C.textSoft } }, 'EUR / Monat'),
          h('div', { style: { display: 'flex', height: '2px', backgroundColor: C.border, borderRadius: '1px', marginTop: '8px' } }),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Mann, 30 Jahre, Nichtraucher, gesund — 20 Jahre Laufzeit'),
        ),
        // Rechts: Versicherungssumme
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', flex: '1',
            backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '20px',
            padding: '36px 28px', gap: '14px',
            border: '2px solid rgba(16,185,129,0.5)',
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.green, letterSpacing: '2px' } }, 'VERSICHERUNGSSUMME'),
          h('span', { style: { fontSize: '44px', fontWeight: 800, color: C.text, lineHeight: '1.1' } }, '500.000'),
          h('span', { style: { fontSize: '30px', fontWeight: 600, color: C.green } }, 'EUR im Todesfall'),
          h('div', { style: { display: 'flex', height: '2px', backgroundColor: 'rgba(16,185,129,0.4)', borderRadius: '1px', marginTop: '8px' } }),
          h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Sofortige Einmalzahlung an deine Familie — steuerfrei'),
        ),
      ),
    ),
    keyLearning('RLV ist die guenstigste Absicherung, die es gibt', C.green),
    igHandle(),
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 6 — METHODE: 3 Faktoren fuer die richtige Versicherungssumme
  // Akt 2 | Aufloesung | Konkrete Anleitung
  // ═══════════════════════════════════════════════════════════════════════════

  function faktorCard(num, title, desc, color, pct) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column', gap: '10px',
        backgroundColor: C.cardBg, borderRadius: '18px',
        padding: '24px 28px',
        border: `1px solid ${color}40`,
      },
    },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
        h('span', { style: { fontSize: '38px', fontWeight: 800, color, minWidth: '54px' } }, num),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', flex: '1' } },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text, lineHeight: '1.2' } }, title),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, desc),
        ),
      ),
      h('div', { style: { display: 'flex', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' } },
        h('div', { style: { display: 'flex', width: `${pct}%`, height: '6px', backgroundColor: color, borderRadius: '3px' } }),
      ),
    );
  }

  const slide6 = slideRoot(C.bg,
    topRow('DIE RICHTIGE SUMME', C.cardBg),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' } },
        headline('3 Faktoren fuer', 60),
        headline('deine optimale', 60),
        headline('Summe.', 60),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
        faktorCard('01', 'Jahreseinkommen x 3-5', 'Basis: Bruttojahreseinkommen multipliziert mit Faktor 3 bis 5 — je nach Familiengroesse', C.green, 33),
        faktorCard('02', 'Offene Kredite addieren', 'Hypothek, Autokredite, Konsumschulden — alles muss abgesichert werden', C.gold, 66),
        faktorCard('03', 'Kindererziehungskosten', 'Pro Kind ca. 200.000 EUR bis zum 18. Lebensjahr einplanen', C.text, 100),
      ),
    ),
    keyLearning('Faustregel: Mind. 500.000 EUR bei Familie mit Kindern und Immobilie', C.green),
    igHandle(),
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 7 — TAKEAWAYS: 4 Learnings mit Progressbalken
  // Akt 3 | Abschluss | Zusammenfassung
  // ═══════════════════════════════════════════════════════════════════════════

  const learnings = [
    { num: '01', text: 'Kleine Witwenrente deckt nur 20% des Einkommens — Luecke ist riesig', pct: 25, color: C.red },
    { num: '02', text: 'RLV Beitraege beginnen ab 15-30 EUR/Monat — guenstigste Absicherung', pct: 50, color: C.gold },
    { num: '03', text: 'Versicherungssumme = 3-5x Jahreseinkommen + Schulden + Kinder', pct: 75, color: C.text },
    { num: '04', text: 'Je juenger + gesunder du bist, desto guenstiger wird die Praemie', pct: 100, color: C.green },
  ];

  const slide7 = slideRoot(C.bgDark,
    topRow('DEINE TAKEAWAYS', 'rgba(16,185,129,0.2)'),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' } },
        headline('Was du jetzt', 60),
        headline('wissen musst.', 60),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px' } },
        ...learnings.map(l =>
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '22px 26px', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '18px' } },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
              h('span', { style: { fontSize: '36px', fontWeight: 800, color: l.color, minWidth: '52px' } }, l.num),
              h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.text, lineHeight: '1.3', flex: '1' } }, l.text),
            ),
            h('div', { style: { display: 'flex', height: '5px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' } },
              h('div', { style: { display: 'flex', width: `${l.pct}%`, height: '5px', backgroundColor: l.color, borderRadius: '3px' } }),
            ),
          )
        ),
      ),
    ),
    keyLearning('Fruehzeitig abschliessen = guenstigste Praemie + maximaler Schutz', C.green),
    igHandle(),
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // SLIDE 8 — CTA
  // Akt 3 | Abschluss | Handlungsaufruf
  // ═══════════════════════════════════════════════════════════════════════════

  // SVG: Ring mit Checkmark
  const ctaRingSvg = `<svg width="260" height="260" viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">
    <circle cx="130" cy="130" r="110" stroke="rgba(255,255,255,0.08)" stroke-width="18" fill="none"/>
    <path d="M130,20 A110,110 0 1,1 129.99,20"
      stroke="#10B981" stroke-width="18" fill="none"
      stroke-linecap="round" stroke-dasharray="691" stroke-dashoffset="60"/>
    <circle cx="130" cy="130" r="82" fill="rgba(16,185,129,0.08)"/>
  </svg>`;
  const ctaRingSrc = `data:image/svg+xml;base64,${Buffer.from(ctaRingSvg).toString('base64')}`;

  const slide8 = slideRoot(C.bg,
    topRow('JETZT HANDELN', 'rgba(16,185,129,0.25)'),
    visualBlock(
      h('div', {
        style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
      },
        h('div', { style: { display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center', width: '260px', height: '260px' } },
          h('img', { src: ctaRingSrc, width: 260, height: 260, style: { position: 'absolute', top: '0', left: '0' } }),
          h('img', {
            src: logoB64,
            width: 140, height: 140,
            style: { borderRadius: '20px', objectFit: 'cover', position: 'absolute' },
          }),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '20px' } },
          headline('Ist deine Familie', 56),
          headline('abgesichert?', 56),
        ),
        h('span', {
          style: {
            fontSize: '28px', fontWeight: 500, color: C.textMuted,
            lineHeight: '1.5', textAlign: 'center', marginTop: '10px',
          },
        }, 'Schreib mir — ich pruefe deine Versorgungsluecke kostenlos und zeige dir den besten Schutz.'),
        h('div', {
          style: {
            display: 'flex', marginTop: '20px', padding: '18px 40px',
            backgroundColor: 'rgba(16,185,129,0.15)',
            borderRadius: '16px', border: '2px solid rgba(16,185,129,0.4)',
          },
        },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.green } }, 'Link in Bio — Kostenloses Erstgespraech'),
        ),
        h('span', {
          style: { fontSize: '28px', fontWeight: 700, color: C.textMuted, marginTop: '16px' },
        }, 'Folge @benarofinanzen fuer mehr Finanztipps'),
      ),
    ),
    h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '12px' } },
      h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.green } }, '@benarofinanzen'),
    ),
  );

  // ── RENDER ALL SLIDES ────────────────────────────────────────────────────────

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} gespeichert: ${pngPath}`);
  }

  console.log('\nAlle 8 Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
