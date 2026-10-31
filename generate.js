'use strict';
const fs = require('fs');
const path = require('path');

async function main() {
  const satoriModule = await import('satori');
  const satori = satoriModule.default || satoriModule;
  const { Resvg } = require('@resvg/resvg-js');

  const fontDir = '/tmp/workspace/node_modules/@fontsource/outfit/files';
  const fonts = [400, 500, 600, 700, 800].flatMap(w => [
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(`${fontDir}/outfit-latin-${w}-normal.woff`) },
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(`${fontDir}/outfit-latin-ext-${w}-normal.woff`) },
  ]);

  const logoB64 = 'data:image/jpeg;base64,' +
    fs.readFileSync('/tmp/workspace/skills/instagram-carousel-skill/templates/benaro-logo.jpg').toString('base64');

  const TODAY = '2026-10-31';
  const outDir = `/tmp/workspace/output/carousel_${TODAY}/slides`;

  const C = {
    bg:       '#001f60',
    text:     '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted:'#9CA3AF',
    cardBg:   'rgba(255,255,255,0.10)',
    border:   'rgba(255,255,255,0.18)',
    green:    '#10B981',
    greenBg:  'rgba(16,185,129,0.15)',
    red:      '#EF4444',
    redBg:    'rgba(239,68,68,0.14)',
    yellow:   '#F59E0B',
    yellowBg: 'rgba(245,158,11,0.12)',
  };

  const W = 1080, H = 1350;

  const h = (type, props, ...ch) => ({
    type,
    props: {
      ...props,
      children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch,
    },
  });

  // ── Reusable components ─────────────────────────────────────────────────────

  const topRow = (badgeText) =>
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' } },
      h('div', { style: { display: 'flex' } },
        h('span', {
          style: {
            display: 'flex', fontSize: '22px', fontWeight: 700, letterSpacing: '3px',
            color: C.text, backgroundColor: C.cardBg, padding: '10px 22px', borderRadius: '12px',
          },
        }, badgeText),
      ),
      h('img', { src: logoB64, width: 120, height: 120, style: { borderRadius: '12px' } }),
    );

  const headline = (text, size) =>
    h('span', {
      style: {
        fontSize: `${size || 64}px`, fontWeight: 800, color: C.text,
        lineHeight: '1.08', letterSpacing: '-1.5px', marginBottom: '6px',
      },
    }, text);

  const subline = (text) =>
    h('span', {
      style: { fontSize: '28px', fontWeight: 500, color: C.textMuted, lineHeight: '1.5', marginTop: '8px' },
    }, text);

  const keyLearning = (text, accent) =>
    h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 28px', marginTop: 'auto',
      },
    },
      h('div', { style: { display: 'flex', width: '6px', minHeight: '40px', backgroundColor: accent || C.text, borderRadius: '3px' } }),
      h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, text),
    );

  const footer = () =>
    h('div', { style: { display: 'flex', alignItems: 'center', marginTop: '12px' } },
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted } }, '@benarofinanzen'),
    );

  // ── SLIDE 1: HOOK ──────────────────────────────────────────────────────────
  const slide1 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    topRow('BREAKING NEWS'),
    headline('Deine Riester-Rente wird 2027 überflüssig', 60),
    subline('Das neue Altersvorsorge-Depot verändert alles'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '24px' } },
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: C.cardBg, borderRadius: '24px', padding: '44px 60px', gap: '10px' } },
        h('span', { style: { fontSize: '120px', fontWeight: 800, color: C.text, lineHeight: '1', letterSpacing: '-4px' } }, '16 Mio.'),
        h('span', { style: { fontSize: '28px', fontWeight: 600, color: C.textMuted, textAlign: 'center' } }, 'Riester-Verträge in Deutschland'),
      ),
      h('div', { style: { display: 'flex', gap: '14px', width: '100%' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 14px', alignItems: 'center', gap: '8px' } },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.red } }, '< 1 %'),
          h('span', { style: { fontSize: '19px', fontWeight: 500, color: C.textMuted, textAlign: 'center', lineHeight: '1.3' } }, 'Durchschnittliche Rendite p.a.'),
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 14px', alignItems: 'center', gap: '8px' } },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.yellow } }, '70 %'),
          h('span', { style: { fontSize: '19px', fontWeight: 500, color: C.textMuted, textAlign: 'center', lineHeight: '1.3' } }, 'Prüfen ihren Vertrag nicht'),
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 14px', alignItems: 'center', gap: '8px' } },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: C.green } }, '540 €'),
          h('span', { style: { fontSize: '19px', fontWeight: 500, color: C.textMuted, textAlign: 'center', lineHeight: '1.3' } }, 'Neue Förderung ab 2027'),
        ),
      ),
    ),
    keyLearning('Ab 1. Januar 2027 startet das Altersvorsorge-Depot'),
    footer(),
  );

  // ── SLIDE 2: KOSTENVERGLEICH ──────────────────────────────────────────────
  const slide2 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    topRow('DIE WAHRHEIT'),
    headline('Was dein Riester wirklich frisst', 62),
    subline('Kostenvergleich bei 10.000 EUR Depotstand pro Jahr'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '28px' } },
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, 'Riester-Rente'),
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.red } }, '1,8 % Kosten p.a.'),
        ),
        h('div', { style: { display: 'flex', height: '28px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' } },
          h('div', { style: { display: 'flex', width: '90%', height: '28px', backgroundColor: C.red, borderRadius: '6px' } }),
        ),
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, '= 180 EUR Kosten im Jahr'),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, 'ETF-Sparplan'),
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.green } }, '0,15 % Kosten p.a.'),
        ),
        h('div', { style: { display: 'flex', height: '28px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' } },
          h('div', { style: { display: 'flex', width: '7%', height: '28px', backgroundColor: C.green, borderRadius: '6px' } }),
        ),
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, '= 15 EUR Kosten im Jahr'),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px' } },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, 'Altersvorsorge-Depot'),
          h('span', { style: { fontSize: '30px', fontWeight: 800, color: C.green } }, '0,10 % Kosten p.a.'),
        ),
        h('div', { style: { display: 'flex', height: '28px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' } },
          h('div', { style: { display: 'flex', width: '5%', height: '28px', backgroundColor: C.green, borderRadius: '6px' } }),
        ),
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, '= 10 EUR Kosten im Jahr'),
      ),
      h('div', { style: { display: 'flex', height: '2px', backgroundColor: C.border, borderRadius: '1px' } }),
      h('div', { style: { display: 'flex', backgroundColor: C.redBg, borderRadius: '14px', padding: '18px 24px', alignItems: 'center', gap: '14px' } },
        h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '6px', backgroundColor: C.red } }),
        h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.red } }, 'Kostenunterschied: 170 EUR pro Jahr'),
      ),
    ),
    keyLearning('Über 30 Jahre vernichten Riester-Kosten bis zu 50.000 EUR Rendite', C.red),
    footer(),
  );

  // ── SLIDE 3: KONSTRUKTIONSFEHLER ──────────────────────────────────────────
  const slide3 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    topRow('DAS DILEMMA'),
    headline('3 Gründe, warum Riester scheitert', 60),
    subline('Die Konstruktionsfehler des Systems'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: C.redBg, borderRadius: '18px', padding: '22px 24px', borderLeft: '5px solid ' + C.red } },
        h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'FEHLER 1'),
        h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Kündigung = Förderung zurückzahlen'),
        h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Alle staatlichen Zulagen und Steuervorteile müssen bei Kündigung vollständig zurückgezahlt werden.'),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: C.redBg, borderRadius: '18px', padding: '22px 24px', borderLeft: '5px solid ' + C.red } },
        h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'FEHLER 2'),
        h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Beitragsgarantie erzwingt niedrige Rendite'),
        h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Wegen der Garantiepflicht investieren Anbieter kaum in Aktien — Ergebnis: unter 1 % Rendite p.a.'),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: C.redBg, borderRadius: '18px', padding: '22px 24px', borderLeft: '5px solid ' + C.red } },
        h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'FEHLER 3'),
        h('span', { style: { fontSize: '28px', fontWeight: 700, color: C.text } }, 'Nachgelagerte Besteuerung im Alter'),
        h('span', { style: { fontSize: '23px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Was heute steuerfrei eingezahlt wird, versteuert du im Rentenalter — oft mit überraschend hohem Steuersatz.'),
      ),
    ),
    keyLearning('Kündigen kostet einmalig — Weitermachen kostet jeden Monat', C.red),
    footer(),
  );

  // ── SLIDE 4: WENDEPUNKT — DAS NEUE ALTERSVORSORGE-DEPOT ──────────────────
  const slide4 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    topRow('DIE WENDE'),
    headline('Das neue Altersvorsorge-Depot ab 2027', 57),
    subline('Beschlossen im März 2026 von CDU/CSU und SPD'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '20px' } },
      h('div', { style: { display: 'flex', gap: '14px' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.redBg, borderRadius: '20px', padding: '22px 20px', gap: '12px' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'RIESTER ALT'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(239,68,68,0.3)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft, lineHeight: '1.35' } }, 'Gebunden an Versicherungsprodukte'),
          h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft, lineHeight: '1.35' } }, 'Kosten: 1–2 % p.a.'),
          h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft, lineHeight: '1.35' } }, 'Garantiepflicht'),
          h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft, lineHeight: '1.35' } }, 'Nur als Rente auszahlbar'),
          h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft, lineHeight: '1.35' } }, 'Förderung bis 175 EUR/Jahr'),
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: C.greenBg, borderRadius: '20px', padding: '22px 20px', gap: '12px' } },
          h('span', { style: { fontSize: '20px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'NEU: AV-DEPOT'),
          h('div', { style: { display: 'flex', width: '100%', height: '3px', backgroundColor: 'rgba(16,185,129,0.3)', borderRadius: '2px' } }),
          h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.text, lineHeight: '1.35' } }, 'Freies ETF-Depot bei jeder Bank'),
          h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.text, lineHeight: '1.35' } }, 'Kosten: 0,1 % p.a.'),
          h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.text, lineHeight: '1.35' } }, 'Keine Garantiepflicht'),
          h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.text, lineHeight: '1.35' } }, 'Flexibel entnehmbar'),
          h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.text, lineHeight: '1.35' } }, 'Förderung bis 540 EUR/Jahr'),
        ),
      ),
      h('div', { style: { display: 'flex', backgroundColor: C.greenBg, borderRadius: '16px', padding: '20px 28px', alignItems: 'center', gap: '20px' } },
        h('span', { style: { fontSize: '52px', fontWeight: 800, color: C.green } }, '540 €'),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', { style: { fontSize: '26px', fontWeight: 700, color: C.text } }, 'Staatliche Förderung pro Jahr'),
          h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } }, '50 % auf 360 EUR + 25 % auf 1.440 EUR Einzahlung'),
        ),
      ),
    ),
    keyLearning('Ab Januar 2027 kannst du das neue Depot bei deiner Bank eröffnen', C.green),
    footer(),
  );

  // ── SLIDE 5: DIREKTVERGLEICH ───────────────────────────────────────────────
  const rows = [
    ['Jährliche Kosten',   '1,5–2,0 %',    '0,1–0,2 %'],
    ['Staatl. Förderung',  'bis 175 EUR',  'bis 540 EUR'],
    ['Anlagefreiheit',     'Begrenzt',     'Volle Freiheit'],
    ['Auszahlung',         'Nur als Rente','Flexibel'],
    ['Produktbindung',     'Ja, fest',     'Nein'],
    ['Renditepotenzial',   'Unter 1 %',    'Bis 7 % p.a.'],
  ];

  const slide5 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    topRow('DIREKTVERGLEICH'),
    headline('Riester vs. Altersvorsorge-Depot', 57),
    subline('Was wirklich zählt für deine Altersvorsorge'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '8px' } },
      h('div', { style: { display: 'flex', alignItems: 'center', padding: '8px 20px 14px' } },
        h('div', { style: { display: 'flex', flex: '2' } }),
        h('div', { style: { display: 'flex', flex: '1', justifyContent: 'center' } },
          h('span', { style: { fontSize: '22px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'RIESTER'),
        ),
        h('div', { style: { display: 'flex', flex: '1', justifyContent: 'center' } },
          h('span', { style: { fontSize: '22px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'AV-DEPOT'),
        ),
      ),
      ...rows.map(([label, r, av], i) =>
        h('div', { style: { display: 'flex', alignItems: 'center', backgroundColor: i % 2 === 0 ? C.cardBg : 'transparent', borderRadius: '12px', padding: '16px 20px' } },
          h('div', { style: { display: 'flex', flex: '2' } },
            h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } }, label),
          ),
          h('div', { style: { display: 'flex', flex: '1', justifyContent: 'center' } },
            h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.red, textAlign: 'center' } }, r),
          ),
          h('div', { style: { display: 'flex', flex: '1', justifyContent: 'center' } },
            h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.green, textAlign: 'center' } }, av),
          ),
        ),
      ),
    ),
    keyLearning('Das Altersvorsorge-Depot überzeugt in fast jeder Kategorie', C.green),
    footer(),
  );

  // ── SLIDE 6: DREI OPTIONEN ────────────────────────────────────────────────
  const slide6 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    topRow('DEINE 3 OPTIONEN'),
    headline('Was tust du mit deinem Riester?', 62),
    subline('Jede Option hat den richtigen Zeitpunkt'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: C.redBg, borderRadius: '18px', padding: '20px 24px', borderLeft: '5px solid ' + C.red } },
        h('span', { style: { fontSize: '20px', fontWeight: 800, letterSpacing: '2px', color: C.red } }, 'OPTION A: KÜNDIGEN'),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, 'Wenn: Gesamte Förderung unter 500 EUR, hohe Kosten, junger Vertrag'),
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Achtung: Alle Zulagen werden vom Finanzamt zurückgefordert'),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: C.yellowBg, borderRadius: '18px', padding: '20px 24px', borderLeft: '5px solid ' + C.yellow } },
        h('span', { style: { fontSize: '20px', fontWeight: 800, letterSpacing: '2px', color: C.yellow } }, 'OPTION B: BEITRAGSFREI STELLEN'),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, 'Wenn: Hohe angesammelte Förderung, kurze Restlaufzeit, Vertrag gut gelaufen'),
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Vertrag bleibt aktiv, aber keine neuen Beiträge mehr einzahlen'),
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: C.greenBg, borderRadius: '18px', padding: '20px 24px', borderLeft: '5px solid ' + C.green } },
        h('span', { style: { fontSize: '20px', fontWeight: 800, letterSpacing: '2px', color: C.green } }, 'OPTION C: WEITERMACHEN'),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.4' } }, 'Wenn: Hohe Kinderzulagen, Beamter oder Vertrag bereits über 15 Jahre'),
        h('span', { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted, lineHeight: '1.4' } }, 'Parallel ab 2027 zusätzlich Altersvorsorge-Depot eröffnen'),
      ),
    ),
    keyLearning('Die richtige Entscheidung hängt von deiner persönlichen Situation ab'),
    footer(),
  );

  // ── SLIDE 7: AKTIONSSCHRITTE ──────────────────────────────────────────────
  const stepCard = (num, text, pct) =>
    h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px 24px', backgroundColor: C.cardBg, borderRadius: '16px' } },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: '18px' } },
        h('span', { style: { fontSize: '38px', fontWeight: 800, color: pct === 100 ? C.green : C.text, minWidth: '56px' } }, num),
        h('span', { style: { fontSize: '26px', fontWeight: 600, color: C.text, lineHeight: '1.3' } }, text),
      ),
      h('div', { style: { display: 'flex', height: '6px', backgroundColor: C.border, borderRadius: '3px', overflow: 'hidden' } },
        h('div', { style: { display: 'flex', width: `${pct}%`, height: '6px', backgroundColor: pct === 100 ? C.green : C.text, borderRadius: '3px' } }),
      ),
    );

  const slide7 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    topRow('JETZT HANDELN'),
    headline('Deine Schritte bis 31. Dezember', 62),
    subline('4 Aktionen, die jetzt wirklich wichtig sind'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      stepCard('01', 'Riester-Vertrag prüfen: Kosten, Förderung und Laufzeit', 25),
      stepCard('02', 'Beraten lassen: Finanzberater oder Verbraucherzentrale', 50),
      stepCard('03', 'Entscheidung treffen: kündigen, beitragsfrei oder weiter', 75),
      stepCard('04', 'Altersvorsorge-Depot für Januar 2027 vorbereiten', 100),
    ),
    keyLearning('Wer jetzt handelt, profitiert ab Januar 2027 von Anfang an', C.green),
    footer(),
  );

  // ── SLIDE 8: CTA ──────────────────────────────────────────────────────────
  const slide8 = h('div', {
    style: {
      display: 'flex', flexDirection: 'column', width: W, height: H,
      padding: '70px', backgroundColor: C.bg, fontFamily: 'Outfit',
    },
  },
    topRow('SPEICHERN'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '32px' } },
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' } },
        h('span', { style: { fontSize: '52px', fontWeight: 800, color: C.text, lineHeight: '1.1', letterSpacing: '-1px', textAlign: 'center' } },
          'Hast du deinen Riester schon überprüft?',
        ),
        h('span', { style: { fontSize: '28px', fontWeight: 500, color: C.textMuted, textAlign: 'center', lineHeight: '1.5' } },
          'Speichere diesen Post und geh heute noch die 4 Schritte durch.',
        ),
      ),
      h('img', { src: logoB64, width: 150, height: 150, style: { borderRadius: '18px' } }),
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' } },
        h('span', { style: { fontSize: '30px', fontWeight: 700, color: C.text, textAlign: 'center' } },
          'Folge @benarofinanzen für mehr Finanzwissen',
        ),
        h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, textAlign: 'center' } },
          'Täglich neue Tipps zu Vermögensaufbau und Absicherung',
        ),
      ),
    ),
    keyLearning('Speichern nicht vergessen! Dieses Wissen gehört in jede Geldbörse'),
    footer(),
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
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
