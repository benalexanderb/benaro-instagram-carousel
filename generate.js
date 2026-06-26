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

  const TODAY = '2026-06-26';
  const outDir = path.join(__dirname, `output/carousel_${TODAY}/slides`);
  fs.mkdirSync(outDir, { recursive: true });

  const h = (type, props, ...ch) => ({
    type,
    props: {
      ...props,
      children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch,
    },
  });

  // ── REUSABLE COMPONENTS ───────────────────────────────────────────────────

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
        letterSpacing: '-1.5px', marginBottom: '4px',
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
  // STORYLINE: Betriebliche Altersvorsorge (bAV) 2026
  // Template A: Problem -> Loesung
  //
  // S1 HOOK:       "Dein Chef muss dir Geld geben — und 54% wissen es nicht."
  // S2 DATA:       Statistik bAV-Nutzung + was du verlierst
  // S3 PROBLEM:    Flow ohne bAV: Rentenlücke wächst
  // S4 WENDE:      Erwartung vs. Realität (3 Mythen)
  // S5 METHODE:    So funktioniert die bAV (3 Hebel)
  // S6 RECHNUNG:   Rechenbeispiel: 300 EUR Brutto -> 167 EUR netto
  // S7 TAKEAWAYS:  4 Learnings mit Progressbalken
  // S8 CTA:        Frage + @benarofinanzen
  // ═══════════════════════════════════════════════════════════════════════════

  // ── SLIDE 1: HOOK ────────────────────────────────────────────────────────
  // Grafik: Gebäude-Icon + Geldsack + Pfeil (Arbeitgeber zahlt)

  const buildingEuroSvg = `<svg width="880" height="260" viewBox="0 0 880 260" xmlns="http://www.w3.org/2000/svg">
    <!-- Arbeitgeber (Gebäude links) -->
    <rect x="40" y="60" width="220" height="180" rx="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" stroke-width="3"/>
    <rect x="80" y="40" width="140" height="30" rx="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    <rect x="76" y="100" width="38" height="50" rx="4" fill="rgba(255,255,255,0.12)"/>
    <rect x="131" y="100" width="38" height="50" rx="4" fill="rgba(255,255,255,0.12)"/>
    <rect x="186" y="100" width="38" height="50" rx="4" fill="rgba(255,255,255,0.12)"/>
    <rect x="76" y="168" width="38" height="44" rx="4" fill="rgba(255,255,255,0.12)"/>
    <rect x="131" y="168" width="38" height="44" rx="4" fill="rgba(255,255,255,0.12)"/>
    <rect x="186" y="168" width="38" height="44" rx="4" fill="rgba(255,255,255,0.12)"/>
    <!-- Pfeil Mitte -->
    <line x1="290" y1="160" x2="550" y2="160" stroke="#10B981" stroke-width="6" stroke-dasharray="14,7"/>
    <path d="M535,143 L555,160 L535,177" fill="none" stroke="#10B981" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Geldmünzen rechts (Arbeitnehmer) -->
    <circle cx="700" cy="100" r="50" fill="rgba(16,185,129,0.15)" stroke="#10B981" stroke-width="5"/>
    <circle cx="700" cy="100" r="35" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.5)" stroke-width="2"/>
    <rect x="690" y="84" width="20" height="32" rx="3" fill="rgba(16,185,129,0.8)"/>
    <rect x="685" y="80" width="30" height="8" rx="4" fill="#10B981"/>
    <rect x="685" y="108" width="30" height="8" rx="4" fill="#10B981"/>
    <circle cx="790" cy="140" r="36" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.4)" stroke-width="2"/>
    <circle cx="790" cy="140" r="22" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.3)" stroke-width="1"/>
    <circle cx="640" cy="160" r="28" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.3)" stroke-width="2"/>
    <!-- Plus-Zeichen über Münzen -->
    <line x1="700" y1="175" x2="700" y2="215" stroke="rgba(16,185,129,0.4)" stroke-width="3"/>
    <line x1="680" y1="195" x2="720" y2="195" stroke="rgba(16,185,129,0.4)" stroke-width="3"/>
  </svg>`;
  const buildingEuroSrc = `data:image/svg+xml;base64,${Buffer.from(buildingEuroSvg).toString('base64')}`;

  const slide1 = slideRoot(C.bgDark,
    topRow('DAS MUSST DU WISSEN', 'rgba(16,185,129,0.3)'),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '16px' } },
        headline('Dein Chef muss', 62),
        headline('dir Geld geben —', 62),
        headline('und die meisten', 62),
        headline('wissen es nicht.', 62),
      ),
      h('img', { src: buildingEuroSrc, width: 880, height: 260, style: { objectFit: 'contain' } }),
      h('div', {
        style: {
          display: 'flex', marginTop: '18px', padding: '22px 32px',
          backgroundColor: 'rgba(16,185,129,0.12)',
          borderRadius: '16px',
          border: '2px solid rgba(16,185,129,0.4)',
        },
      },
        h('span', {
          style: { fontSize: '28px', fontWeight: 600, color: C.textSoft, lineHeight: '1.5' },
        }, 'Seit 2019 gilt: Arbeitgeber MUSS mind. 15% zu deiner bAV dazulegen — per Gesetz.'),
      ),
    ),
    keyLearning('Betriebliche Altersvorsorge: der Bonus den dein Vertrag garantiert', C.green),
    igHandle(),
  );

  // ── SLIDE 2: STATISTIK ────────────────────────────────────────────────────
  // Big Stat + Balkendiagramm Nutzung

  const slide2 = slideRoot(C.bg,
    topRow('BETRIEBLICHE ALTERSVORSORGE', C.cardBg),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '20px' } },
        headline('Wer nutzt', 58),
        headline('seinen Anspruch?', 58),
      ),
      // Grosszahl
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '24px',
          padding: '28px 36px', marginBottom: '18px',
          border: '2px solid rgba(239,68,68,0.3)',
        },
      },
        h('span', { style: { fontSize: '130px', fontWeight: 800, color: C.red, lineHeight: '1' } }, '54%'),
        h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft, marginTop: '8px', textAlign: 'center' } },
          'der Arbeitnehmer haben gar keine bAV'),
        h('span', { style: { fontSize: '22px', fontWeight: 400, color: C.textMuted, marginTop: '6px' } }, 'Quelle: BMAS Betriebsrentenreport 2025'),
      ),
      // Balken: bAV-Nutzung nach Betriebsgroesse
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px' } },
        h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.textMuted, letterSpacing: '2px', marginBottom: '4px' } }, 'NUTZUNG NACH UNTERNEHMENSGROESSE'),
        ...[
          { label: 'Grossunternehmen (500+)', pct: 78, color: C.green },
          { label: 'Mittelstand (50-499)', pct: 52, color: C.gold },
          { label: 'Kleinbetriebe (1-49)', pct: 29, color: C.red },
        ].map(r =>
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textSoft } }, r.label),
              h('span', { style: { fontSize: '22px', fontWeight: 800, color: r.color } }, `${r.pct}%`),
            ),
            h('div', { style: { display: 'flex', height: '24px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' } },
              h('div', { style: { display: 'flex', width: `${r.pct}%`, height: '24px', backgroundColor: r.color, borderRadius: '6px', opacity: '0.85' } }),
            ),
          )
        ),
      ),
    ),
    keyLearning('Besonders in kleinen Betrieben lässt man bares Geld liegen', C.red),
    igHandle(),
  );

  // ── SLIDE 3: PROBLEM-FLOW ─────────────────────────────────────────────────
  // Flow: Kein bAV -> Rentenlücke wächst

  const slide3 = slideRoot(C.bgDark,
    topRow('BETRIEBLICHE ALTERSVORSORGE', C.cardBg),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '22px' } },
        headline('Was passiert', 60),
        headline('ohne bAV?', 60),
      ),
      // Flow-Diagramm: 4 Stufen
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
        ...[
          { step: '01', title: 'Kein bAV-Vertrag', desc: 'Arbeitgeberzuschuss (15%) verfällt — dieses Geld bekommst du nie zurück', color: C.textSoft, bg: 'rgba(255,255,255,0.07)' },
          { step: '02', title: 'Steuervorteil verspielt', desc: 'Bis 4% der Beitragsb.grenze = 3.624 EUR/Jahr könnten steuerfrei fliessen', color: C.gold, bg: 'rgba(245,158,11,0.1)' },
          { step: '03', title: 'Rentenluecke vergroessert sich', desc: '13,5 Jahre nach Renteneintritt sind die Ersparnisse aufgebraucht — ohne Puffer', color: C.red, bg: 'rgba(239,68,68,0.1)' },
          { step: '04', title: 'Altersarmut droht', desc: 'Gesetzliche Rente deckt im Schnitt 48% des letzten Nettolohns', color: C.red, bg: 'rgba(239,68,68,0.18)' },
        ].map((s, i) =>
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '0px' } },
            h('div', {
              style: {
                display: 'flex', alignItems: 'center', gap: '18px',
                backgroundColor: s.bg, borderRadius: '16px',
                padding: '18px 24px',
                border: `1px solid ${s.color}30`,
              },
            },
              h('span', { style: { fontSize: '32px', fontWeight: 800, color: s.color, minWidth: '44px' } }, s.step),
              h('div', { style: { display: 'flex', flexDirection: 'column', gap: '3px', flex: '1' } },
                h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.text } }, s.title),
                h('span', { style: { fontSize: '20px', fontWeight: 400, color: C.textMuted, lineHeight: '1.4' } }, s.desc),
              ),
            ),
            i < 3 ? h('div', { style: { display: 'flex', justifyContent: 'flex-start', paddingLeft: '36px' } },
              h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
                h('div', { style: { display: 'flex', width: '3px', height: '16px', backgroundColor: 'rgba(255,255,255,0.15)' } }),
                h('div', { style: { display: 'flex', width: '0px', height: '0px', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid rgba(255,255,255,0.15)' } }),
              ),
            ) : undefined,
          )
        ),
      ),
    ),
    keyLearning('Jedes Jahr ohne bAV kostet dich den Arbeitgeberzuschuss für immer', C.red),
    igHandle(),
  );

  // ── SLIDE 4: ERWARTUNG vs. REALITÄT ──────────────────────────────────────

  const slide4 = slideRoot(C.bg,
    topRow('DAS IST DER IRRTUM', 'rgba(245,158,11,0.25)'),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '22px' } },
        headline('Was die meisten', 58),
        headline('denken — und', 58),
        headline('was stimmt.', 58),
      ),
      h('div', { style: { display: 'flex', gap: '16px' } },
        // Erwartung (links)
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', flex: '1',
            backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '20px',
            padding: '28px 24px', gap: '14px',
            border: '2px solid rgba(255,255,255,0.12)',
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, color: C.textMuted, letterSpacing: '2.5px' } }, 'MYTHOS'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px' } },
            ...[
              '"Das lohnt sich nur für Gutverdiener."',
              '"Mein AG zahlt doch gar nichts."',
              '"Ich komme eh nicht an das Geld."',
            ].map(m =>
              h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '10px' } },
                h('div', { style: { display: 'flex', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(239,68,68,0.5)', marginTop: '10px', minWidth: '8px' } }),
                h('span', { style: { fontSize: '22px', fontWeight: 600, color: 'rgba(255,255,255,0.55)', lineHeight: '1.5' } }, m),
              )
            ),
          ),
        ),
        // Realität (rechts)
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', flex: '1',
            backgroundColor: '#FFFFFF', borderRadius: '20px',
            padding: '28px 24px', gap: '14px',
          },
        },
          h('span', { style: { fontSize: '20px', fontWeight: 700, color: 'rgba(0,31,97,0.5)', letterSpacing: '2.5px' } }, 'REALITAET'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(0,31,97,0.15)', borderRadius: '2px' } }),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px' } },
            ...[
              { text: 'Lohnt sich schon ab 1.500 EUR Brutto — AG-Zuschuss gilt fuer alle.', color: '#10B981' },
              { text: 'Pflicht seit 2019: mind. 15% muss dein AG dazulegen — per Gesetz.', color: '#10B981' },
              { text: 'Ab 62 Jahren abrufbar. Flexibler als du denkst.', color: '#10B981' },
            ].map(r =>
              h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '10px' } },
                h('div', { style: { display: 'flex', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', marginTop: '10px', minWidth: '8px' } }),
                h('span', { style: { fontSize: '22px', fontWeight: 600, color: '#001F61', lineHeight: '1.5' } }, r.text),
              )
            ),
          ),
        ),
      ),
    ),
    keyLearning('Der Arbeitgeberzuschuss gilt gesetzlich fuer JEDEN — egal wie viel du verdienst', C.green),
    igHandle(),
  );

  // ── SLIDE 5: METHODE — 3 Hebel der bAV ────────────────────────────────────

  function hebelCard(num, title, desc, value, color, pct) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column', gap: '10px',
        backgroundColor: C.cardBg, borderRadius: '18px',
        padding: '22px 26px',
        border: `1px solid ${color}30`,
      },
    },
      h('div', { style: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' } },
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '3px', flex: '1' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, color, letterSpacing: '1.5px' } }, `HEBEL ${num}`),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text, lineHeight: '1.2' } }, title),
          h('span', { style: { fontSize: '20px', fontWeight: 400, color: C.textMuted, lineHeight: '1.4' } }, desc),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' } },
          h('span', { style: { fontSize: '28px', fontWeight: 800, color, lineHeight: '1' } }, value),
        ),
      ),
      h('div', { style: { display: 'flex', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' } },
        h('div', { style: { display: 'flex', width: `${pct}%`, height: '6px', backgroundColor: color, borderRadius: '3px' } }),
      ),
    );
  }

  const slide5 = slideRoot(C.bgDark,
    topRow('SO FUNKTIONIERT ES', 'rgba(16,185,129,0.25)'),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '22px' } },
        headline('3 Hebel der', 62),
        headline('betrieblichen', 62),
        headline('Altersvorsorge.', 62),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '14px' } },
        hebelCard('01', 'Entgeltumwandlung', 'Du wandelst Bruttolohn direkt um — vor Steuern und Sozialabgaben', 'Brutto = Netto', C.text, 33),
        hebelCard('02', 'AG-Zuschuss (Pflicht)', 'Arbeitgeber legt mind. 15% deines Beitrags obendrauf — per Gesetz seit 2019', '+15% gratis', C.gold, 66),
        hebelCard('03', 'Steuerfreiheit 2026', 'Bis 3.624 EUR/Jahr (4% BBG) komplett steuer- und sozialabgabenfrei einzahlen', '3.624 EUR/J', C.green, 100),
      ),
    ),
    keyLearning('Entgeltumwandlung + AG-Zuschuss + Steuerfreiheit = der mächtigste Spar-Hebel', C.green),
    igHandle(),
  );

  // ── SLIDE 6: RECHENBEISPIEL ────────────────────────────────────────────────
  // 300 EUR Brutto -> was kommt rein, was kostet es dich netto

  const flowArrowSvg = `<svg width="60" height="40" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="20" x2="42" y2="20" stroke="rgba(255,255,255,0.3)" stroke-width="4"/>
    <path d="M38,10 L54,20 L38,30" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  const flowArrowSrc = `data:image/svg+xml;base64,${Buffer.from(flowArrowSvg).toString('base64')}`;

  const slide6 = slideRoot(C.bg,
    topRow('DAS RECHNET SICH SO', 'rgba(16,185,129,0.25)'),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '22px' } },
        headline('300 EUR Brutto', 60),
        headline('in die bAV —', 60),
        headline('nur 167 EUR', 60),
        headline('aus deiner Tasche.', 60),
      ),
      // Flussdiagramm
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
        // Zeile 1: Brutto-Beitrag
        h('div', {
          style: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '16px', padding: '18px 28px',
          },
        },
          h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.text } }, 'Brutto-Beitrag'),
          h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.text } }, '300 EUR'),
        ),
        // Abzüge
        h('div', { style: { display: 'flex', gap: '12px' } },
          h('div', {
            style: {
              display: 'flex', flexDirection: 'column', flex: '1', gap: '6px',
              backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '14px', padding: '16px 22px',
              border: '1px solid rgba(239,68,68,0.25)',
            },
          },
            h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.red } }, 'Steuerersparnis'),
            h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.red } }, '-90 EUR'),
            h('span', { style: { fontSize: '19px', fontWeight: 400, color: C.textMuted } }, '(ca. 30% Grenzsteuersatz)'),
          ),
          h('div', {
            style: {
              display: 'flex', flexDirection: 'column', flex: '1', gap: '6px',
              backgroundColor: 'rgba(245,158,11,0.1)', borderRadius: '14px', padding: '16px 22px',
              border: '1px solid rgba(245,158,11,0.25)',
            },
          },
            h('span', { style: { fontSize: '20px', fontWeight: 600, color: C.gold } }, 'SV-Ersparnis'),
            h('span', { style: { fontSize: '28px', fontWeight: 800, color: C.gold } }, '-43 EUR'),
            h('span', { style: { fontSize: '19px', fontWeight: 400, color: C.textMuted } }, '(ca. 14,5% gesamt)'),
          ),
        ),
        // Ergebnis
        h('div', {
          style: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '16px', padding: '20px 28px',
            border: '2px solid rgba(16,185,129,0.45)',
          },
        },
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '3px' } },
            h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted } }, 'Dein Nettobeitrag'),
            h('span', { style: { fontSize: '20px', fontWeight: 400, color: C.textMuted } }, 'was du wirklich spürst'),
          ),
          h('span', { style: { fontSize: '38px', fontWeight: 800, color: C.green } }, '167 EUR'),
        ),
        // AG-Zuschuss
        h('div', {
          style: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: 'rgba(16,185,129,0.06)', borderRadius: '16px', padding: '16px 28px',
            border: '1px solid rgba(16,185,129,0.2)',
          },
        },
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.green } }, '+ AG-Zuschuss (15%)'),
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: C.green } }, '+45 EUR'),
        ),
        // Total
        h('div', {
          style: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: 'rgba(16,185,129,0.22)', borderRadius: '16px', padding: '18px 28px',
            border: '2px solid #10B981',
          },
        },
          h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.text } }, 'Fliessen in deine Rente'),
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.text } }, '345 EUR'),
        ),
      ),
    ),
    keyLearning('167 EUR aus eigener Tasche -> 345 EUR fuer die Rente: Hebel 2,1x', C.green),
    igHandle(),
  );

  // ── SLIDE 7: TAKEAWAYS ────────────────────────────────────────────────────

  const learnings = [
    { num: '01', text: 'AG-Zuschuss 15% ist Pflicht seit 2019 — frag aktiv deinen Arbeitgeber danach', pct: 25, color: C.red },
    { num: '02', text: 'Steuer- und sozialabgabenfrei bis 3.624 EUR/Jahr — nutze das Limit aus', pct: 50, color: C.gold },
    { num: '03', text: 'Nettobeitrag halbiert sich durch Steuern + SV-Ersparnis — so billig wie selten', pct: 75, color: C.text },
    { num: '04', text: 'Je früher du startest, desto laenger arbeitet der Zinseszins für dich', pct: 100, color: C.green },
  ];

  const slide7 = slideRoot(C.bgDark,
    topRow('DEINE TAKEAWAYS', 'rgba(16,185,129,0.2)'),
    visualBlock(
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '18px' } },
        headline('Was du jetzt', 60),
        headline('wissen musst.', 60),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
        ...learnings.map(l =>
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '9px', padding: '20px 24px', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '18px' } },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
              h('span', { style: { fontSize: '34px', fontWeight: 800, color: l.color, minWidth: '50px' } }, l.num),
              h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.text, lineHeight: '1.35', flex: '1' } }, l.text),
            ),
            h('div', { style: { display: 'flex', height: '5px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' } },
              h('div', { style: { display: 'flex', width: `${l.pct}%`, height: '5px', backgroundColor: l.color, borderRadius: '3px' } }),
            ),
          )
        ),
      ),
    ),
    keyLearning('bAV-Vertrag ist der Spar-Hebel mit dem besten Kosten-Nutzen-Verhaeltnis', C.green),
    igHandle(),
  );

  // ── SLIDE 8: CTA ──────────────────────────────────────────────────────────

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
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '20px' } },
          headline('Nutzt du', 58),
          headline('deinen bAV-Anspruch?', 54),
        ),
        h('span', {
          style: {
            fontSize: '28px', fontWeight: 500, color: C.textMuted,
            lineHeight: '1.5', textAlign: 'center', marginTop: '12px',
          },
        }, 'Schreib mir — ich pruefe deinen bAV-Vertrag kostenlos und zeige dir, wie viel Steuer du sparen kannst.'),
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
        }, 'Folge @benarofinanzen fuer mehr'),
      ),
    ),
    h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '12px' } },
      h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.green } }, '@benarofinanzen'),
    ),
  );

  // ── RENDER ALL SLIDES ─────────────────────────────────────────────────────

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
