// Carousel: Steuerklassen 2026 — Welche kostet dich am meisten?
// Inspiration: @finanzcopilot — Steuer-Content, hohe Engagement-Rate
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
    bg: '#001F60',
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

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    '/tmp/workspace/skills/instagram-carousel-skill/templates/benaro-logo.jpg'
  ).toString('base64');

  const h = (type, props, ...ch) => ({
    type,
    props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function logo() {
    return h('img', { src: logoB64, width: 120, height: 120, style: { borderRadius: '12px', objectFit: 'cover', flexShrink: '0' } });
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

  function slideRoot(children) {
    return h('div', { style: { display: 'flex', flexDirection: 'column', width: W, height: H, padding: `${PAD}px`, backgroundColor: C.bg, fontFamily: 'Outfit' } },
      ...children
    );
  }

  // =====================================================================
  // SLIDE 1 — HOOK: Steuerklassen-Falle
  // =====================================================================
  const klasseCards = [
    { kl: 'I', label: 'Single', abzug: '42%', color: C.textSoft, isRed: false },
    { kl: 'II', label: 'Alleinerz.', abzug: '35%', color: C.textSoft, isRed: false },
    { kl: 'III', label: 'Hauptverd.', abzug: '22%', color: C.green, isRed: false },
    { kl: 'IV', label: 'Gleichverd.', abzug: '42%', color: C.textSoft, isRed: false },
    { kl: 'V', label: 'Minderverd.', abzug: '68%', color: C.red, isRed: true },
    { kl: 'VI', label: 'Zweitjob', abzug: '85%', color: C.red, isRed: true },
  ];

  const slide1 = slideRoot([
    headerRow('DAS MUSST DU WISSEN'),
    headline('Deine Steuerklasse kostet dich jeden Monat bis zu 500 EUR', 55),
    subline('Millionen Deutsche zahlen mehr als noetig'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      h('div', { style: { display: 'flex', gap: '10px' } },
        ...klasseCards.map(k =>
          h('div', { style: {
            display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', gap: '8px',
            backgroundColor: k.isRed ? 'rgba(239,68,68,0.18)' : C.cardBg,
            border: k.isRed ? '2px solid rgba(239,68,68,0.5)' : `1px solid ${C.border}`,
            borderRadius: '16px', padding: '20px 6px',
          } },
          h('span', { style: { fontSize: '36px', fontWeight: 800, color: k.isRed ? C.red : C.text } }, k.kl),
          h('span', { style: { fontSize: '22px', fontWeight: 700, color: k.color } }, k.abzug),
          h('span', { style: { fontSize: '16px', fontWeight: 600, color: C.textMuted, textAlign: 'center' } }, k.label)
        ))
      ),
      h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '18px', padding: '26px 28px', border: '1px solid rgba(239,68,68,0.28)' } },
        h('div', { style: { display: 'flex', width: '12px', height: '12px', borderRadius: '6px', backgroundColor: C.red, flexShrink: '0' } }),
        h('span', { style: { fontSize: '27px', fontWeight: 700, color: C.textSoft, lineHeight: '1.38' } }, 'Klasse V zieht bis zu 650 EUR/Monat mehr ab als Klasse IV -- unnoetig viel')
      )
    ),
    keyLearning('Die meisten Paare waehlen falsch -- und merken es erst beim Jahresausgleich', C.red),
    igHandle(),
  ]);

  // =====================================================================
  // SLIDE 2 — ABZUG PRO KLASSE (Bar Chart)
  // =====================================================================
  const klasseDaten = [
    { label: 'KL. II  Alleinerziehende', pct: 35, color: C.green },
    { label: 'KL. III Hauptverdiener', pct: 22, color: C.green },
    { label: 'KL. I   Single / Ledig', pct: 42, color: 'rgba(255,255,255,0.45)' },
    { label: 'KL. IV  Gleichverdiener', pct: 42, color: 'rgba(255,255,255,0.45)' },
    { label: 'KL. V   Minderverdiener', pct: 68, color: C.red },
    { label: 'KL. VI  Zweitjob', pct: 85, color: C.red },
  ];

  const slide2 = slideRoot([
    headerRow('STEUERKLASSEN'),
    headline('6 Klassen -- 6 verschiedene Abzuege', 56),
    subline('Steuerabzug relativ zum Bruttolohn'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      ...klasseDaten.map(d =>
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '14px' } },
          h('span', { style: { fontSize: '22px', fontWeight: 700, color: d.pct <= 42 ? C.green : C.red, minWidth: '240px' } }, d.label),
          h('div', { style: { display: 'flex', flex: '1', height: '36px', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '8px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${d.pct}%`, height: '36px', backgroundColor: d.color, borderRadius: '8px' } })
          ),
          h('span', { style: { fontSize: '26px', fontWeight: 800, color: d.color, minWidth: '56px', textAlign: 'right' } }, `${d.pct}%`)
        )
      ),
      h('div', { style: { display: 'flex', gap: '24px', marginTop: '10px' } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
          h('div', { style: { display: 'flex', width: '14px', height: '14px', borderRadius: '3px', backgroundColor: C.green } }),
          h('span', { style: { fontSize: '20px', color: C.textMuted } }, 'niedrig / guenstig')
        ),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
          h('div', { style: { display: 'flex', width: '14px', height: '14px', borderRadius: '3px', backgroundColor: C.red } }),
          h('span', { style: { fontSize: '20px', color: C.textMuted } }, 'hoch / teuer')
        )
      )
    ),
    keyLearning('Klasse VI ist NUR fuer Zweitjobs -- immer pauschal, kein Wahlrecht'),
    igHandle(),
  ]);

  // =====================================================================
  // SLIDE 3 — DAS PROBLEM: III+V Falle
  // =====================================================================
  const slide3 = slideRoot([
    headerRow('DAS PROBLEM'),
    headline('Die III + V Falle kostet Paare bares Geld', 54),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '18px' } },
      h('div', { style: { display: 'flex', gap: '16px' } },
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', gap: '12px', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '20px', padding: '26px', border: '1px solid rgba(16,185,129,0.3)' } },
          h('span', { style: { fontSize: '18px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'PARTNER A - KL. III'),
          h('span', { style: { fontSize: '42px', fontWeight: 800, color: C.green } }, '4.000'),
          h('span', { style: { fontSize: '20px', color: C.textMuted } }, 'EUR Brutto'),
          h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: 'rgba(255,255,255,0.08)' } }),
          h('span', { style: { fontSize: '34px', fontWeight: 700, color: C.green } }, '3.100 EUR'),
          h('span', { style: { fontSize: '20px', color: C.textSoft } }, 'Netto (stark beguenstigt)')
        ),
        h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', gap: '12px', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '20px', padding: '26px', border: '1px solid rgba(239,68,68,0.3)' } },
          h('span', { style: { fontSize: '18px', fontWeight: 700, letterSpacing: '2px', color: C.red } }, 'PARTNER B - KL. V'),
          h('span', { style: { fontSize: '42px', fontWeight: 800, color: C.red } }, '3.000'),
          h('span', { style: { fontSize: '20px', color: C.textMuted } }, 'EUR Brutto'),
          h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: 'rgba(255,255,255,0.08)' } }),
          h('span', { style: { fontSize: '34px', fontWeight: 700, color: C.red } }, '1.950 EUR'),
          h('span', { style: { fontSize: '20px', color: C.textSoft } }, 'Netto (hoher Abzug)')
        )
      ),
      h('div', { style: { display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: C.cardBg, borderRadius: '16px', padding: '22px 26px' } },
        h('div', { style: { display: 'flex', width: '6px', minHeight: '36px', backgroundColor: C.red, borderRadius: '3px', flexShrink: '0' } }),
        h('span', { style: { fontSize: '25px', fontWeight: 600, color: C.textSoft, lineHeight: '1.38' } }, 'Partner B zahlt 650 EUR/Monat zu viel -- das fehlt das gesamte Jahr lang im Budget. Jahresausgleich kommt erst im Fruehling.')
      )
    ),
    keyLearning('III+V lohnt sich NUR wenn ein Partner mehr als 60% des Einkommens verdient', C.red),
    igHandle(),
  ]);

  // =====================================================================
  // SLIDE 4 — MYTHOS vs. FAKT
  // =====================================================================
  const mythen = [
    { mythos: '"Der Jahresausgleich macht alles wieder gut"', fakt: 'Du gibst dem Staat 12 Monate zinslos Kredit -- Liquiditaet fehlt das ganze Jahr' },
    { mythos: '"Steuerklassen sind nur fuer Verheiratete"', fakt: 'Singles (KL. I) und Alleinerziehende (KL. II) zahlen oft deutlich zu viel' },
    { mythos: '"Wechseln ist kompliziert und dauert ewig"', fakt: 'Online ueber ELSTER in 10 Minuten -- wirkt bereits im naechsten Monat' },
  ];

  const slide4 = slideRoot([
    headerRow('MYTHOS vs. FAKT'),
    headline('3 Irrtuemer die dich Geld kosten', 56),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      ...mythen.map(item =>
        h('div', { style: { display: 'flex', gap: '10px' } },
          h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px 20px', gap: '8px', border: '1px solid rgba(255,255,255,0.08)' } },
            h('span', { style: { fontSize: '18px', fontWeight: 700, letterSpacing: '2px', color: C.textMuted } }, 'MYTHOS'),
            h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '1px' } }),
            h('span', { style: { fontSize: '21px', fontWeight: 600, color: 'rgba(255,255,255,0.38)', lineHeight: '1.4', textDecoration: 'line-through' } }, item.mythos)
          ),
          h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '16px', padding: '20px 20px', gap: '8px', border: '1px solid rgba(16,185,129,0.22)' } },
            h('span', { style: { fontSize: '18px', fontWeight: 700, letterSpacing: '2px', color: C.green } }, 'FAKT'),
            h('div', { style: { display: 'flex', width: '100%', height: '2px', backgroundColor: 'rgba(16,185,129,0.18)', borderRadius: '1px' } }),
            h('span', { style: { fontSize: '21px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } }, item.fakt)
          )
        )
      )
    ),
    keyLearning('Ein Wechsel der Steuerklasse kann hunderte Euro mehr Netto pro Monat bedeuten'),
    igHandle(),
  ]);

  // =====================================================================
  // SLIDE 5 — DIE RICHTIGE KOMBI
  // =====================================================================
  const situationen = [
    { tag: 'ALLEINVERDIENEND', kombi: 'III + V', note: 'Sinnvoll wenn 1 Partner 60%+ verdient', good: false },
    { tag: 'GLEICHVERDIENEND', kombi: 'IV + IV', note: 'Faire Aufteilung, monatlich ausgewogen', good: true },
    { tag: 'FAST GLEICH', kombi: 'IV/IV Faktor', note: 'Optimal -- kein Nachzahlen, keine Erstattung', good: true },
    { tag: 'ALLEINERZIEHEND', kombi: 'Klasse II', note: 'Entlastungsbetrag: 4.260 EUR/Jahr', good: true },
    { tag: 'SINGLE / LEDIG', kombi: 'Klasse I', note: 'Standard -- kein Wahlrecht vorhanden', good: false },
    { tag: 'ZWEITJOB', kombi: 'Klasse VI', note: 'Pauschalabzug -- immer Pflicht', good: false },
  ];

  const slide5 = slideRoot([
    headerRow('DIE LOESUNG'),
    headline('Die richtige Steuerklasse fuer jede Situation', 50),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '10px' } },
      ...situationen.map(s =>
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: s.good ? 'rgba(16,185,129,0.1)' : C.cardBg, borderRadius: '14px', padding: '16px 20px', border: s.good ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(255,255,255,0.08)' } },
          h('div', { style: { display: 'flex', flexDirection: 'column', flex: '1', gap: '2px' } },
            h('span', { style: { fontSize: '17px', fontWeight: 700, letterSpacing: '2px', color: s.good ? C.green : C.textMuted } }, s.tag),
            h('span', { style: { fontSize: '19px', fontWeight: 500, color: C.textMuted } }, s.note)
          ),
          h('span', { style: { fontSize: '22px', fontWeight: 800, color: s.kombi.includes('Faktor') ? C.green : s.good ? C.green : C.textSoft, textAlign: 'right', minWidth: '130px' } }, s.kombi)
        )
      )
    ),
    keyLearning('Das Faktor-Verfahren (IV/IV mit Faktor) ist fast immer die beste Wahl fuer Paare', C.green),
    igHandle(),
  ]);

  // =====================================================================
  // SLIDE 6 — DAS FAKTOR-VERFAHREN
  // =====================================================================
  const steps = [
    { num: '01', title: 'Beide Partner waehlen Steuerklasse IV', detail: 'Gleiche Basis -- kein struktureller Nachteil fuer einen der beiden' },
    { num: '02', title: 'Finanzamt berechnet euren individuellen Faktor', detail: 'Abhaengig vom genauen Einkommens-Verhaeltnis' },
    { num: '03', title: 'Lohnsteuer wird monatlich korrekt aufgeteilt', detail: 'Kein Partner zahlt mehr als seinen gerechten Anteil' },
    { num: '04', title: 'Jahresabschluss: kaum Nachzahlung oder Erstattung', detail: 'Monatlicher Nettolohn stimmt bereits mit dem Jahresergebnis ueberein' },
  ];

  const slide6 = slideRoot([
    headerRow('DER GEHEIMTIPP'),
    headline('Das Faktor-Verfahren erklaert', 60),
    subline('IV + IV mit Faktor = monatlich fair und korrekt'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '14px' } },
      ...steps.map((s, i) =>
        h('div', { style: { display: 'flex', alignItems: 'flex-start', gap: '18px' } },
          h('div', { style: { display: 'flex', width: '56px', height: '56px', borderRadius: '14px', backgroundColor: i === 3 ? 'rgba(16,185,129,0.2)' : C.cardBg, alignItems: 'center', justifyContent: 'center', flexShrink: '0' } },
            h('span', { style: { fontSize: '24px', fontWeight: 800, color: i === 3 ? C.green : C.text } }, s.num)
          ),
          h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', gap: '3px', paddingTop: '6px' } },
            h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.text, lineHeight: '1.25' } }, s.title),
            h('span', { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } }, s.detail)
          )
        )
      ),
      h('div', { style: { display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '14px', padding: '18px 22px', border: '1px solid rgba(16,185,129,0.22)', marginTop: '6px' } },
        h('div', { style: { display: 'flex', width: '10px', height: '10px', borderRadius: '5px', backgroundColor: C.green, flexShrink: '0' } }),
        h('span', { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft, lineHeight: '1.35' } }, 'Beantragung: kostenlos online ueber ELSTER -- dauert nur 10 Minuten, gilt ab dem Folgemonat')
      )
    ),
    keyLearning('Das Faktor-Verfahren kann einmal jaehrlich geaendert werden -- ideal bei Gehaltswechseln', C.green),
    igHandle(),
  ]);

  // =====================================================================
  // SLIDE 7 — 4 TAKEAWAYS
  // =====================================================================
  const learnings = [
    { num: '01', text: 'Pruefe JETZT deine Steuerklasse auf der Gehaltsabrechnung', pct: 25 },
    { num: '02', text: 'Beantrage das Faktor-Verfahren via ELSTER in 10 Minuten', pct: 50 },
    { num: '03', text: 'Alleinerziehende: sicherstellen, dass du Klasse II statt I nutzt', pct: 75 },
    { num: '04', text: 'Bei Heirat, Trennung oder Jobwechsel sofort Steuerklasse anpassen', pct: 100 },
  ];

  const slide7 = slideRoot([
    headerRow('DEIN FAHRPLAN'),
    headline('4 Schritte die du heute noch tun kannst', 52),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'center', gap: '16px' } },
      ...learnings.map(l =>
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px 24px', backgroundColor: C.cardBg, borderRadius: '16px' } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
            h('span', { style: { fontSize: '36px', fontWeight: 800, color: l.pct === 100 ? C.green : C.text, minWidth: '56px', flexShrink: '0' } }, l.num),
            h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.text, lineHeight: '1.3' } }, l.text)
          ),
          h('div', { style: { display: 'flex', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', width: `${l.pct}%`, height: '6px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius: '3px' } })
          )
        )
      )
    ),
    keyLearning('Aenderung wirkt ab dem naechsten Monat -- starte heute und hol dir dein Geld zurueck', C.green),
    igHandle(),
  ]);

  // =====================================================================
  // SLIDE 8 — CTA
  // =====================================================================
  const slide8 = slideRoot([
    headerRow('DEIN GELD'),
    headline('In welcher Steuerklasse bist du gerade?', 56),
    subline('Schreib es in die Kommentare -- wir schauen ob du optimieren kannst'),
    h('div', { style: { display: 'flex', flex: '1', flexDirection: 'row', alignItems: 'center', gap: '16px', marginTop: '20px' } },
      ...['I', 'II', 'III', 'IV', 'V', 'VI'].map((kl, i) =>
        h('div', { style: {
          display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backgroundColor: kl === 'IV' ? 'rgba(16,185,129,0.15)' : kl === 'V' ? 'rgba(239,68,68,0.15)' : C.cardBg,
          borderRadius: '20px', padding: '36px 8px', gap: '10px',
          border: kl === 'IV' ? '2px solid rgba(16,185,129,0.4)' : kl === 'V' ? '2px solid rgba(239,68,68,0.4)' : `1px solid ${C.border}`
        } },
          h('span', { style: { fontSize: '52px', fontWeight: 800, color: kl === 'IV' ? C.green : kl === 'V' ? C.red : C.text } }, kl),
          h('span', { style: { fontSize: '18px', fontWeight: 600, color: kl === 'IV' ? C.green : kl === 'V' ? C.red : C.textMuted, textAlign: 'center' } },
            ['Single', 'Alleinerz.', 'Hauptverd.', 'Gleichverd.', 'Minderverd.', 'Zweitjob'][i]
          )
        )
      )
    ),
    h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '22px' } },
      h('span', { style: { fontSize: '27px', fontWeight: 700, color: C.text, textAlign: 'center', lineHeight: '1.4' } },
        'Folge @benarofinanzen fuer mehr Finanztipps'),
      h('span', { style: { fontSize: '24px', fontWeight: 500, color: C.textMuted, textAlign: 'center' } },
        'Speichern nicht vergessen')
    ),
    igHandle(),
  ]);

  // =====================================================================
  // ALLE SLIDES GENERIEREN
  // =====================================================================
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  const outDir = path.join(__dirname, 'output', 'carousel_2026-07-22', 'slides');

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
