const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default;
  const { Resvg } = require('@resvg/resvg-js');

  const fontDir = '/tmp/workspace/node_modules/@fontsource/outfit/files';
  const fonts = [400, 500, 600, 700, 800].flatMap(w => [
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-${w}-normal.woff`)) },
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-ext-${w}-normal.woff`)) },
  ]);

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync('/tmp/workspace/skills/instagram-carousel-skill/templates/benaro-logo.jpg').toString('base64');

  const C = {
    bg: '#001F60',
    text: '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted: '#9CA3AF',
    cardBg: 'rgba(255,255,255,0.10)',
    border: 'rgba(255,255,255,0.20)',
    green: '#10B981',
    red: '#EF4444',
  };

  const W = 1080, H = 1350;
  const outputDir = '/tmp/workspace/output/carousel_2026-08-24/slides';

  const h = (type, props, ...ch) => ({
    type, props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function logo() {
    return h('img', { src: logoB64, width: 120, height: 120, style: { borderRadius: '12px', objectFit: 'cover' } });
  }

  function badgeEl(text) {
    return h('span', {
      style: {
        display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
        color: C.text, backgroundColor: C.cardBg, padding: '10px 22px', borderRadius: '12px'
      }
    }, text);
  }

  function topRow(badgeText) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '24px'
      }
    },
      badgeEl(badgeText),
      logo()
    );
  }

  function hl(text, size) {
    return h('span', {
      style: {
        fontSize: `${size || 64}px`, fontWeight: 800, color: C.text,
        lineHeight: '1.08', letterSpacing: '-1.5px'
      }
    }, text);
  }

  function sl(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500, color: C.textMuted,
        lineHeight: '1.5', marginTop: '10px'
      }
    }, text);
  }

  function kl(text, accent) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px', marginTop: '20px'
      }
    },
      h('div', {
        style: {
          display: 'flex', width: '6px', minHeight: '40px',
          backgroundColor: accent || C.green, borderRadius: '3px'
        }
      }),
      h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, text)
    );
  }

  function footer() {
    return h('div', { style: { display: 'flex', marginTop: '16px' } },
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, '@benarofinanzen')
    );
  }

  function arrowDown() {
    return h('div', { style: { display: 'flex', justifyContent: 'center', padding: '2px 0' } },
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
        h('div', { style: { display: 'flex', width: '3px', height: '16px', backgroundColor: C.border } }),
        h('div', { style: { display: 'flex', width: '0px', height: '0px', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid rgba(255,255,255,0.20)' } })
      )
    );
  }

  function wrap(children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column', width: W, height: H,
        padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit'
      }
    }, ...children);
  }

  // SLIDE 1 — HOOK
  const slide1 = wrap([
    topRow('ACHTUNG'),
    hl('Dein ETF-Depot', 68),
    hl('frisst sich', 68),
    hl('selbst auf.', 68),
    sl('Was beim Entsparen wirklich passiert'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          backgroundColor: 'rgba(239,68,68,0.15)', borderRadius: '24px', padding: '44px 60px',
          borderWidth: '2px', borderStyle: 'solid', borderColor: 'rgba(239,68,68,0.4)'
        }
      },
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.red, letterSpacing: '3px', marginBottom: '8px' } }, 'STEUERVERLUST OHNE PLAN'),
        h('span', { style: { fontSize: '118px', fontWeight: 800, color: C.red, lineHeight: '1.0', letterSpacing: '-4px' } }, '300.000'),
        h('span', { style: { fontSize: '50px', fontWeight: 700, color: C.red, marginTop: '4px' } }, 'EUR'),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: 'rgba(239,68,68,0.75)', marginTop: '8px' } }, 'ohne Strategie über 30 Jahre Entnahme')
      )
    ),
    kl('Die meisten ETF-Anleger zahlen im Ruhestand viel zu viel Steuern', C.red),
    footer()
  ]);

  // SLIDE 2 — PROBLEM
  const slide2 = wrap([
    topRow('DAS PROBLEM'),
    hl('26,38 % auf', 64),
    hl('jede Entnahme', 64),
    sl('Kapitalertragsteuer trifft jeden Entsparer'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      h('div', { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: C.cardBg, borderRadius: '16px', padding: '20px 28px' } },
        h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.textSoft } }, 'ETF-Depot (Beispiel)'),
        h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.text } }, '500.000 EUR')
      ),
      h('div', { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: C.cardBg, borderRadius: '16px', padding: '20px 28px' } },
        h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.textSoft } }, 'Entnahme pro Jahr (4 %)'),
        h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.text } }, '20.000 EUR')
      ),
      h('div', { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '16px', padding: '20px 28px', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(239,68,68,0.35)' } },
        h('span', { style: { fontSize: '27px', fontWeight: 600, color: C.red } }, 'Steuer (26,38 %)'),
        h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.red } }, '5.276 EUR/Jahr')
      ),
      h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: C.border, borderRadius: '1px' } }),
      h('div', { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(239,68,68,0.20)', borderRadius: '16px', padding: '24px 28px', borderWidth: '2px', borderStyle: 'solid', borderColor: 'rgba(239,68,68,0.55)' } },
        h('span', { style: { fontSize: '27px', fontWeight: 700, color: C.red } }, 'Steuerverlust über 30 Jahre'),
        h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.red } }, '158.280 EUR')
      )
    ),
    kl('Ohne Strategie verschwinden über 150.000 EUR ans Finanzamt', C.red),
    footer()
  ]);

  // SLIDE 3 — FALLE
  const slide3 = wrap([
    topRow('DIE FALLE'),
    hl('Die falsche', 62),
    hl('Reihenfolge kostet', 62),
    hl('ein Vermögen', 62),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '18px' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(239,68,68,0.10)', borderRadius: '20px', padding: '28px', gap: '14px', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(239,68,68,0.30)' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'OHNE PLAN'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(239,68,68,0.4)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.5' } }, 'Ungeplant ETFs verkaufen'),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.5' } }, 'Freibeträge nicht genutzt'),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.5' } }, 'Maximale Steuerlast'),
          h('div', { style: { display: 'flex', flexDirection: 'column', marginTop: '8px' } },
            h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.red } }, '+ 158.280 EUR'),
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: 'rgba(239,68,68,0.75)' } }, 'extra Steuern')
          )
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(16,185,129,0.10)', borderRadius: '20px', padding: '28px', gap: '14px', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(16,185,129,0.30)' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'MIT PLAN'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(16,185,129,0.4)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.5' } }, 'Reihenfolge optimieren'),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.5' } }, 'Freibeträge ausschöpfen'),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, lineHeight: '1.5' } }, 'Steuerlast stark senken'),
          h('div', { style: { display: 'flex', flexDirection: 'column', marginTop: '8px' } },
            h('span', { style: { fontSize: '32px', fontWeight: 800, color: C.green } }, '- 80.000 EUR'),
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: 'rgba(16,185,129,0.75)' } }, 'gespart')
          )
        )
      )
    ),
    kl('Die Reihenfolge beim Entsparen ist genauso wichtig wie das Investieren'),
    footer()
  ]);

  // SLIDE 4 — WENDEPUNKT
  const slide4 = wrap([
    topRow('DER WENDEPUNKT'),
    hl('Günstigerprüfung:', 58),
    hl('0 % Steuer möglich', 58),
    sl('Was die meisten ETF-Anleger nicht wissen'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '18px' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px', gap: '12px' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'ERWARTUNG'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.5' } }, 'Ich zahle immer 26,38 % Steuern auf meine Kapitalerträge.')
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.text, borderRadius: '20px', padding: '28px', gap: '12px' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: 'rgba(0,31,96,0.5)' } }, 'REALITÄT'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(0,31,96,0.15)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: '#001F60', lineHeight: '1.5' } }, 'Unter dem Grundfreibetrag zahle ich 0 % — das Finanzamt erstattet.')
        )
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: 'rgba(16,185,129,0.10)', borderRadius: '16px', padding: '28px', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(16,185,129,0.30)' } },
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.green } }, 'Grundfreibetrag 2026: 11.784 EUR/Jahr'),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, lineHeight: '1.5' } }, 'Wer im Ruhestand darunter liegt, bekommt die Abgeltungssteuer per Steuererklärung zurück.')
      )
    ),
    kl('Im Ruhestand mit niedrigem Einkommen: Abgeltungssteuer zurückfordern'),
    footer()
  ]);

  // SLIDE 5 — STRATEGIE
  const slide5 = wrap([
    topRow('DIE STRATEGIE'),
    hl('3 Hebel gegen', 62),
    hl('die Steuer', 62),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '20px', backgroundColor: C.cardBg, borderRadius: '20px', padding: '26px' } },
        h('div', { style: { display: 'flex', width: '60px', minWidth: '60px', height: '60px', borderRadius: '14px', backgroundColor: C.green, alignItems: 'center', justifyContent: 'center' } },
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: '#FFFFFF' } }, '1')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
          h('span', { style: { fontSize: '27px', fontWeight: 700, color: C.text } }, 'Günstigerprüfung'),
          h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Bei Einkommen unter 11.784 EUR/Jahr: 0 % auf alle Kapitalerträge')
        )
      ),
      h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '20px', backgroundColor: C.cardBg, borderRadius: '20px', padding: '26px' } },
        h('div', { style: { display: 'flex', width: '60px', minWidth: '60px', height: '60px', borderRadius: '14px', backgroundColor: C.green, alignItems: 'center', justifyContent: 'center' } },
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: '#FFFFFF' } }, '2')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
          h('span', { style: { fontSize: '27px', fontWeight: 700, color: C.text } }, 'Freistellungsauftrag'),
          h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, '1.000 EUR/Jahr steuerfrei — für Paare sogar 2.000 EUR')
        )
      ),
      h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '20px', backgroundColor: C.cardBg, borderRadius: '20px', padding: '26px' } },
        h('div', { style: { display: 'flex', width: '60px', minWidth: '60px', height: '60px', borderRadius: '14px', backgroundColor: C.green, alignItems: 'center', justifyContent: 'center' } },
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: '#FFFFFF' } }, '3')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } },
          h('span', { style: { fontSize: '27px', fontWeight: 700, color: C.text } }, 'Verlustverrechnungstopf'),
          h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Realisierte Verluste gegen Gewinne aufrechnen — spart bares Geld')
        )
      )
    ),
    kl('Mit diesen 3 Hebeln lässt sich die Steuerlast im Alter erheblich senken'),
    footer()
  ]);

  // SLIDE 6 — REIHENFOLGE
  const slide6 = wrap([
    topRow('DIE REIHENFOLGE'),
    hl('Optimale Entnahme', 56),
    hl('im Ruhestand', 56),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '10px' } },
      h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', backgroundColor: C.cardBg, borderRadius: '16px', padding: '20px 24px' } },
        h('div', { style: { display: 'flex', width: '46px', minWidth: '46px', height: '46px', borderRadius: '23px', backgroundColor: C.green, alignItems: 'center', justifyContent: 'center' } },
          h('span', { style: { fontSize: '22px', fontWeight: 800, color: '#FFFFFF' } }, '1')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '25px', fontWeight: 700, color: C.text } }, 'Freistellungsauftrag ausschöpfen'),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, '1.000 EUR steuerfrei — für Paare 2.000 EUR')
        )
      ),
      arrowDown(),
      h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', backgroundColor: C.cardBg, borderRadius: '16px', padding: '20px 24px' } },
        h('div', { style: { display: 'flex', width: '46px', minWidth: '46px', height: '46px', borderRadius: '23px', backgroundColor: C.green, alignItems: 'center', justifyContent: 'center' } },
          h('span', { style: { fontSize: '22px', fontWeight: 800, color: '#FFFFFF' } }, '2')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '25px', fontWeight: 700, color: C.text } }, 'Günstigerprüfung prüfen'),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, 'Gesamteinkommen unter 11.784 EUR? Steuern zurückholen')
        )
      ),
      arrowDown(),
      h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', backgroundColor: C.cardBg, borderRadius: '16px', padding: '20px 24px' } },
        h('div', { style: { display: 'flex', width: '46px', minWidth: '46px', height: '46px', borderRadius: '23px', backgroundColor: C.green, alignItems: 'center', justifyContent: 'center' } },
          h('span', { style: { fontSize: '22px', fontWeight: 800, color: '#FFFFFF' } }, '3')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '25px', fontWeight: 700, color: C.text } }, 'Verlustverrechnungstopf nutzen'),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, 'Altlasten gegen Gewinne verrechnen — mindert die Steuerlast')
        )
      ),
      arrowDown(),
      h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', backgroundColor: 'rgba(239,68,68,0.10)', borderRadius: '16px', padding: '20px 24px', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(239,68,68,0.28)' } },
        h('div', { style: { display: 'flex', width: '46px', minWidth: '46px', height: '46px', borderRadius: '23px', backgroundColor: C.red, alignItems: 'center', justifyContent: 'center' } },
          h('span', { style: { fontSize: '22px', fontWeight: 800, color: '#FFFFFF' } }, '4')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '25px', fontWeight: 700, color: C.text } }, 'Restbetrag mit 26,38 % versteuern'),
          h('span', { style: { fontSize: '21px', fontWeight: 500, color: C.textMuted } }, 'Nur was nach allen Freibeträgen übrig bleibt')
        )
      )
    ),
    kl('Erst die Freibeträge ausschöpfen — dann erst den Rest versteuern'),
    footer()
  ]);

  // SLIDE 7 — LEARNINGS
  const learnings = [
    { num: '01', text: 'Entnahmeplan vor dem Ruhestand erstellen', pct: 25 },
    { num: '02', text: 'Freistellungsauftrag jedes Jahr voll nutzen', pct: 50 },
    { num: '03', text: 'Günstigerprüfung jährlich in der Steuererklärung beantragen', pct: 75 },
    { num: '04', text: 'Verlustverrechnungstopf aktiv und gezielt einsetzen', pct: 100 },
  ];

  const slide7 = wrap([
    topRow('DEINE REGELN'),
    hl('4 Regeln fürs', 62),
    hl('Entsparen', 62),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      ...learnings.map(l =>
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px 26px', backgroundColor: C.cardBg, borderRadius: '18px' } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
            h('span', { style: { fontSize: '36px', fontWeight: 800, color: l.pct === 100 ? C.green : C.text, minWidth: '60px' } }, l.num),
            h('span', { style: { fontSize: '25px', fontWeight: 600, color: C.text, lineHeight: '1.3' } }, l.text)
          ),
          h('div', { style: { display: 'flex', height: '6px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${l.pct}%`, height: '6px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px' } })
          )
        )
      )
    ),
    kl('Wer früh plant, behält im Alter deutlich mehr von seinem Depot'),
    footer()
  ]);

  // SLIDE 8 — CTA
  const slide8 = wrap([
    topRow('JETZT DU'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '28px' } },
      h('span', { style: { fontSize: '50px', fontWeight: 800, color: C.text, textAlign: 'center', lineHeight: '1.2', letterSpacing: '-1px' } }, 'Hast du schon einen Entnahmeplan für dein Depot?'),
      h('div', { style: { display: 'flex', width: '90px', height: '5px', backgroundColor: C.green, borderRadius: '3px' } }),
      h('span', { style: { fontSize: '30px', fontWeight: 500, color: C.textMuted, textAlign: 'center', lineHeight: '1.55' } }, 'Speichern nicht vergessen — du wirst diesen Plan brauchen.'),
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginTop: '20px', backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px 48px' } },
        h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.text } }, 'Benaro Finanzen'),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, 'Dein unabhängiger Finanzberater')
      )
    ),
    footer()
  ]);

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outputDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} done`);
  }
  console.log('All slides generated!');
}

main().catch(e => { console.error(e); process.exit(1); });
