'use strict';
const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default || require('satori');
  const { Resvg } = require('@resvg/resvg-js');

  const W = 1080, H = 1350;
  const TODAY = '2026-11-09';
  const OUTPUT_DIR = path.join(__dirname, 'output', `carousel_${TODAY}`, 'slides');

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
    bgDark: '#001542',
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
      width: 100,
      height: 100,
      style: { borderRadius: '12px', objectFit: 'cover' }
    });
  }

  function topBar(dark = false) {
    return h('div', {
      style: { display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: '16px' }
    }, logo());
  }

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '14px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '20px', fontWeight: 700, letterSpacing: '3px',
          color: C.text, backgroundColor: C.cardBg, padding: '10px 22px', borderRadius: '12px',
          fontFamily: 'Outfit'
        }
      }, text)
    );
  }

  function headline(text, size = 64) {
    return h('span', {
      style: {
        fontSize: `${size}px`, fontWeight: 800, color: C.text,
        lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '8px',
        fontFamily: 'Outfit'
      }
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500, color: C.textMuted,
        lineHeight: '1.5', marginTop: '8px', fontFamily: 'Outfit'
      }
    }, text);
  }

  function keyLearning(text, accent = C.text) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px', marginTop: '20px'
      }
    },
      h('div', { style: { display: 'flex', width: '6px', minHeight: '40px', backgroundColor: accent, borderRadius: '3px' } }),
      h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.4', fontFamily: 'Outfit' } }, text)
    );
  }

  function igHandle() {
    return h('div', { style: { display: 'flex', marginTop: '12px' } },
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, '@benarofinanzen')
    );
  }

  function slideRoot(bgColor, children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column', width: W, height: H,
        padding: '60px 70px', backgroundColor: bgColor, fontFamily: 'Outfit'
      }
    }, ...children);
  }

  // ─── SLIDE 1: HOOK ───────────────────────────────────────────────────────────
  const svgCountdown = `<svg width="860" height="300" viewBox="0 0 860 300" xmlns="http://www.w3.org/2000/svg">
    <circle cx="130" cy="150" r="110" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" stroke-width="4"/>
    <circle cx="130" cy="150" r="110" fill="none" stroke="#10B981" stroke-width="8" stroke-dasharray="440 692" stroke-linecap="round" transform="rotate(-90 130 150)"/>
    <circle cx="310" cy="150" r="80" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="3"/>
    <circle cx="490" cy="150" r="80" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="3"/>
    <circle cx="670" cy="150" r="80" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" stroke-width="3"/>
  </svg>`;
  const svgCountdownSrc = `data:image/svg+xml;base64,${Buffer.from(svgCountdown).toString('base64')}`;

  const slide1 = slideRoot(C.bg, [
    topBar(),
    badge('BREAKING: 01.01.2027'),
    headline('7 Wochen. Dann startet das neue Altersvorsorge-Depot.', 56),
    subline('Der größte Rentensystem-Wandel seit 25 Jahren.'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '16px' } },
      h('img', { src: svgCountdownSrc, width: 860, height: 300, style: { objectFit: 'contain' } }),
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '24px', justifyContent: 'center' } },
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' } },
          h('span', { style: { fontSize: '96px', fontWeight: 800, color: C.green, lineHeight: '1', fontFamily: 'Outfit' } }, '7'),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textMuted, letterSpacing: '2px', fontFamily: 'Outfit' } }, 'WOCHEN')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginLeft: '60px' } },
          h('span', { style: { fontSize: '64px', fontWeight: 800, color: C.textSoft, lineHeight: '1', fontFamily: 'Outfit' } }, '49'),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted, letterSpacing: '2px', fontFamily: 'Outfit' } }, 'TAGE')
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginLeft: '40px' } },
          h('span', { style: { fontSize: '64px', fontWeight: 800, color: C.textSoft, lineHeight: '1', fontFamily: 'Outfit' } }, '1.176'),
          h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted, letterSpacing: '2px', fontFamily: 'Outfit' } }, 'STUNDEN')
        )
      )
    ),
    keyLearning('Wer jetzt handelt, profitiert ab dem ersten Tag.', C.green),
    igHandle(),
  ]);

  // ─── SLIDE 2: PROBLEM (STAT HERO) ────────────────────────────────────────────
  const svgRentenniveau = `<svg width="860" height="260" viewBox="0 0 860 260" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="20" width="140" height="220" rx="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    <rect x="40" y="130" width="140" height="110" rx="6" fill="rgba(239,68,68,0.3)"/>
    <rect x="40" y="20" width="140" height="110" rx="6" fill="rgba(239,68,68,0.6)"/>
    <rect x="220" y="20" width="140" height="220" rx="10" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
    <rect x="220" y="98" width="140" height="142" rx="6" fill="rgba(239,68,68,0.15)"/>
    <rect x="220" y="20" width="140" height="78" rx="6" fill="rgba(239,68,68,0.5)"/>
    <rect x="400" y="20" width="140" height="220" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
    <rect x="400" y="80" width="140" height="160" rx="6" fill="rgba(255,255,255,0.03)"/>
    <rect x="400" y="20" width="140" height="60" rx="6" fill="rgba(239,68,68,0.3)"/>
    <rect x="580" y="20" width="240" height="220" rx="10" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.3)" stroke-width="2"/>
    <rect x="600" y="40" width="200" height="180" rx="8" fill="rgba(16,185,129,0.15)"/>
  </svg>`;
  const svgRentenniveauSrc = `data:image/svg+xml;base64,${Buffer.from(svgRentenniveau).toString('base64')}`;

  const slide2 = slideRoot(C.bgDark, [
    topBar(),
    badge('DAS PROBLEM'),
    headline('Das Rentenniveau sinkt auf 43 %', 54),
    subline('Was bleibt dir im Alter wirklich?'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      h('img', { src: svgRentenniveauSrc, width: 860, height: 260, style: { objectFit: 'contain' } }),
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '16px', padding: '20px 24px', gap: '6px', border: '1px solid rgba(239,68,68,0.3)' } },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.red, fontFamily: 'Outfit' } }, '43 %'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, lineHeight: '1.3', fontFamily: 'Outfit' } }, 'Rentenniveau bis 2040')
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: '16px', padding: '20px 24px', gap: '6px', border: '1px solid rgba(239,68,68,0.3)' } },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.red, fontFamily: 'Outfit' } }, '1.200 EUR'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, lineHeight: '1.3', fontFamily: 'Outfit' } }, 'monatliche Rentenlücke')
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '16px', padding: '20px 24px', gap: '6px', border: '1px solid rgba(16,185,129,0.3)' } },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.green, fontFamily: 'Outfit' } }, '540 EUR'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textSoft, lineHeight: '1.3', fontFamily: 'Outfit' } }, 'staatliche Förderung p.a.')
        )
      )
    ),
    keyLearning('78 % der Deutschen unterschätzen, wie viel ihnen im Alter fehlt.', C.red),
    igHandle(),
  ]);

  // ─── SLIDE 3: DIE LÖSUNG (Kontrast: Riester vs. AV-Depot) ───────────────────
  const slide3 = slideRoot(C.bg, [
    topBar(),
    badge('DIE LÖSUNG'),
    headline('Das Altersvorsorge-Depot schlägt Riester in allen Punkten', 48),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '20px', padding: '28px', gap: '14px', border: '1px solid rgba(255,255,255,0.1)' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted, fontFamily: 'Outfit' } }, 'RIESTER-RENTE'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(239,68,68,0.5)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4', fontFamily: 'Outfit', textDecoration: 'line-through', opacity: '0.6' } }, '1,8 % Kosten p.a.'),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4', fontFamily: 'Outfit', textDecoration: 'line-through', opacity: '0.6' } }, 'Komplizierte Regeln'),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4', fontFamily: 'Outfit', textDecoration: 'line-through', opacity: '0.6' } }, 'Eingeschränkte ETFs')
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '20px', padding: '28px', gap: '14px', border: '1px solid rgba(16,185,129,0.3)' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green, fontFamily: 'Outfit' } }, 'AV-DEPOT 2027'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: C.green, borderRadius: '2px' } }),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.4', fontFamily: 'Outfit' } }, 'ab 0,1 % Kosten p.a.'),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.4', fontFamily: 'Outfit' } }, 'Einfache Einrichtung'),
          h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.4', fontFamily: 'Outfit' } }, 'Alle ETFs wählbar')
        )
      ),
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'row', alignItems: 'center', gap: '14px', backgroundColor: C.cardBg, borderRadius: '16px', padding: '20px 24px' } },
          h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '6px', backgroundColor: C.green } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.text, lineHeight: '1.3', fontFamily: 'Outfit' } }, 'Bis zu 1.800 EUR staatliche Förderung pro Jahr')
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'row', alignItems: 'center', gap: '14px', backgroundColor: C.cardBg, borderRadius: '16px', padding: '20px 24px' } },
          h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '6px', backgroundColor: C.green } }),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.text, lineHeight: '1.3', fontFamily: 'Outfit' } }, 'Staatlich zertifiziert und reguliert')
        )
      )
    ),
    keyLearning('16 Millionen Riester-Sparer stehen jetzt vor einer wichtigen Entscheidung.'),
    igHandle(),
  ]);

  // ─── SLIDE 4: CHECKLISTE (5 Schritte) ───────────────────────────────────────
  const steps = [
    { num: '01', text: 'Anbieter vergleichen (Trade Republic, Scalable, ING)', pct: 20 },
    { num: '02', text: 'Für Warteliste deines Wunsch-Anbieters anmelden', pct: 40 },
    { num: '03', text: 'Monatlichen Betrag festlegen (empfohlen: mind. 50 EUR)', pct: 60 },
    { num: '04', text: 'Steueridentifikationsnummer bereithalten', pct: 80 },
    { num: '05', text: 'Am 01.01.2027 sofort Depot eröffnen und Dauerauftrag einrichten', pct: 100 },
  ];

  const slide4 = slideRoot(C.bgDark, [
    topBar(),
    badge('DEINE CHECKLISTE'),
    headline('5 Schritte vor dem 01.01.2027', 58),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '12px' } },
      ...steps.map(s =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '8px',
            padding: '18px 24px', backgroundColor: C.cardBg, borderRadius: '16px'
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
            h('span', { style: { fontSize: '32px', fontWeight: 800, color: s.pct === 100 ? C.green : 'rgba(255,255,255,0.4)', minWidth: '52px', fontFamily: 'Outfit' } }, s.num),
            h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.text, lineHeight: '1.3', fontFamily: 'Outfit' } }, s.text)
          ),
          h('div', { style: { display: 'flex', height: '5px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${s.pct}%`, height: '5px', backgroundColor: s.pct === 100 ? C.green : 'rgba(255,255,255,0.4)', borderRadius: '3px' } })
          )
        )
      )
    ),
    keyLearning('Schritt 1 dauert 10 Minuten. Die anderen noch weniger.', C.green),
    igHandle(),
  ]);

  // ─── SLIDE 5: ANBIETER VERGLEICH ─────────────────────────────────────────────
  const providers = [
    { name: 'Trade Republic', zins: '3,0 %', sparplan: 'ab 1 EUR', extra: 'Größte Nutzerbasis', color: 'rgba(255,255,255,0.08)', accent: C.text },
    { name: 'Scalable Capital', zins: '4,0 %', sparplan: 'ab 1 EUR', extra: '8.000+ ETFs', color: 'rgba(255,255,255,0.08)', accent: C.textSoft },
    { name: 'ING', zins: '3,25 %', sparplan: 'ab 1 EUR', extra: 'Vollbank + Depot', color: 'rgba(255,255,255,0.08)', accent: C.textSoft },
  ];

  const slide5 = slideRoot(C.bg, [
    topBar(),
    badge('ANBIETER IM VERGLEICH'),
    headline('Diese 3 starten am 01.01.2027', 58),
    subline('Alle kostenlos. Alle vorbereitet.'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      ...providers.map((p, i) =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            backgroundColor: i === 0 ? 'rgba(16,185,129,0.1)' : C.cardBg,
            border: i === 0 ? '2px solid rgba(16,185,129,0.4)' : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '18px', padding: '22px 28px', gap: '20px'
          }
        },
          h('div', {
            style: {
              display: 'flex', width: '52px', height: '52px', borderRadius: '12px',
              backgroundColor: i === 0 ? C.green : 'rgba(255,255,255,0.1)',
              alignItems: 'center', justifyContent: 'center', flexShrink: '0'
            }
          },
            h('span', { style: { fontSize: '20px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'Outfit' } }, `${i + 1}`)
          ),
          h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', gap: '4px' } },
            h('span', { style: { fontSize: '28px', fontWeight: 700, color: i === 0 ? C.green : C.text, fontFamily: 'Outfit' } }, p.name),
            h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, p.extra)
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' } },
            h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text, fontFamily: 'Outfit' } }, p.zins),
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, 'Tagesgeld p.a.')
          )
        )
      ),
      h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(16,185,129,0.08)', borderRadius: '14px', padding: '16px 24px' } },
        h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.green } }),
        h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textSoft, fontFamily: 'Outfit' } }, 'Wartelisten bei allen drei Anbietern bereits offen')
      )
    ),
    keyLearning('Tipp: Melde dich bei allen drei an. Eröffnen kannst du erst ab 01.01.2027.'),
    igHandle(),
  ]);

  // ─── SLIDE 6: FÖRDERUNG DETAILS ───────────────────────────────────────────────
  const foerderungen = [
    { title: 'Grundförderung', betrag: '300 EUR/Jahr', detail: '50 % auf erste 600 EUR Einzahlung' },
    { title: 'Höchstförderung', betrag: '1.800 EUR/Jahr', detail: 'mit Kinderzulage (3+ Kinder)' },
    { title: 'Kinderbonus', betrag: '300 EUR/Kind', detail: 'Zusätzlich pro Kind unter 18' },
  ];

  const slide6 = slideRoot(C.bgDark, [
    topBar(),
    badge('SO VIEL BEKOMMST DU'),
    headline('Die staatliche Förderung im Detail', 52),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px' } },
        ...foerderungen.map((f, i) =>
          h('div', {
            style: {
              display: 'flex', flex: '1', flexDirection: 'column', gap: '10px',
              backgroundColor: i === 0 ? 'rgba(16,185,129,0.12)' : C.cardBg,
              borderRadius: '20px', padding: '24px',
              border: i === 0 ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.1)'
            }
          },
            h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '1px', color: i === 0 ? C.green : C.textMuted, fontFamily: 'Outfit' } }, f.title.toUpperCase()),
            h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.text, lineHeight: '1.1', fontFamily: 'Outfit' } }, f.betrag),
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4', fontFamily: 'Outfit' } }, f.detail)
          )
        )
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: C.cardBg, borderRadius: '18px', padding: '24px 28px' } },
        h('span', { style: { fontSize: '22px', fontWeight: 700, color: C.textMuted, letterSpacing: '2px', fontFamily: 'Outfit' } }, 'RECHENBEISPIEL'),
        h('div', { style: { display: 'flex', height: '3px', backgroundColor: C.border, borderRadius: '2px' } }),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.5', fontFamily: 'Outfit' } },
          'Familie mit 2 Kindern: 100 EUR/Monat einzahlen'),
        h('div', { style: { display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' } },
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft, fontFamily: 'Outfit' } }, 'Eigenleistung: 1.200 EUR/Jahr'),
          h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, fontFamily: 'Outfit' } }, '+'),
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.green, fontFamily: 'Outfit' } }, 'Foerderung: 900 EUR/Jahr')
        )
      )
    ),
    keyLearning('75 % Förderquote bei Familien mit 2 Kindern — das schlägt jede Riester-Police.', C.green),
    igHandle(),
  ]);

  // ─── SLIDE 7: LEARNINGS + TAKEAWAYS ──────────────────────────────────────────
  const learnings = [
    { num: '01', text: 'Jetzt Anbieter vergleichen und für Warteliste anmelden', pct: 33 },
    { num: '02', text: 'Monatlichen Sparbetrag festlegen — schon ab 1 EUR/Monat möglich', pct: 66 },
    { num: '03', text: 'Am 01.01.2027 sofort starten — Förderung gilt rückwirkend für 2027', pct: 100 },
  ];

  const slide7 = slideRoot(C.bg, [
    topBar(),
    badge('DEINE 3 TAKEAWAYS'),
    headline('Das nimmst du mit', 58),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px',
            padding: '24px 28px', backgroundColor: C.cardBg, borderRadius: '18px'
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
            h('span', { style: { fontSize: '40px', fontWeight: 800, color: l.pct === 100 ? C.green : C.text, minWidth: '60px', fontFamily: 'Outfit' } }, l.num),
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3', fontFamily: 'Outfit' } }, l.text)
          ),
          h('div', { style: { display: 'flex', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${l.pct}%`, height: '6px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px' } })
          )
        )
      ),
      h('div', { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '16px', padding: '22px 28px', border: '1px solid rgba(16,185,129,0.3)' } },
        h('div', { style: { display: 'flex', width: '6px', minHeight: '40px', backgroundColor: C.green, borderRadius: '3px' } }),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.4', fontFamily: 'Outfit' } }, 'In 7 Wochen ist der Startschuss. Fang jetzt mit der Vorbereitung an.')
      )
    ),
    igHandle(),
  ]);

  // ─── SLIDE 8: CTA ─────────────────────────────────────────────────────────────
  const slide8 = slideRoot(C.bgDark, [
    h('div', { style: { display: 'flex', flexDirection: 'column', flex: '1', alignItems: 'center', justifyContent: 'center', gap: '32px' } },
      h('img', { src: logoB64, width: 140, height: 140, style: { borderRadius: '24px', objectFit: 'cover' } }),
      badge('JETZT HANDELN'),
      h('span', {
        style: {
          fontSize: '52px', fontWeight: 800, color: C.text,
          lineHeight: '1.15', letterSpacing: '-1.5px', textAlign: 'center',
          maxWidth: '860px', fontFamily: 'Outfit'
        }
      }, 'Bei welchem Anbieter öffnest du dein Altersvorsorge-Depot?'),
      h('span', {
        style: { fontSize: '28px', fontWeight: 500, color: C.textMuted, textAlign: 'center', fontFamily: 'Outfit' }
      }, 'Schreib es in die Kommentare 👇'),
      h('div', { style: { display: 'flex', flexDirection: 'row', gap: '14px', marginTop: '8px' } },
        h('div', { style: { display: 'flex', backgroundColor: C.cardBg, borderRadius: '50px', padding: '14px 28px' } },
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.text, fontFamily: 'Outfit' } }, 'Trade Republic')
        ),
        h('div', { style: { display: 'flex', backgroundColor: C.cardBg, borderRadius: '50px', padding: '14px 28px' } },
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.text, fontFamily: 'Outfit' } }, 'Scalable')
        ),
        h('div', { style: { display: 'flex', backgroundColor: C.cardBg, borderRadius: '50px', padding: '14px 28px' } },
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.text, fontFamily: 'Outfit' } }, 'ING')
        )
      )
    ),
    h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', paddingBottom: '0px' } },
      h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textMuted, fontFamily: 'Outfit' } }, 'Folge uns für mehr Finanzwissen:'),
      h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text, fontFamily: 'Outfit' } }, '@benarofinanzen')
    ),
  ]);

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(OUTPUT_DIR, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} generiert: ${pngPath}`);
  }

  console.log('\nAlle Slides erfolgreich generiert!');
  console.log(`Ausgabe: ${OUTPUT_DIR}`);
}

main().catch(e => {
  console.error('Fehler:', e);
  process.exit(1);
});
