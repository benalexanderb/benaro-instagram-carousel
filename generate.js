const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default;
  const { Resvg } = require('@resvg/resvg-js');

  const BASE = __dirname;
  const fontDir = path.join(BASE, 'node_modules/@fontsource/outfit/files');

  const fonts = [400,500,600,700,800].flatMap(w => [
    { name:'Outfit', weight:w, style:'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-${w}-normal.woff`)) },
    { name:'Outfit', weight:w, style:'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-ext-${w}-normal.woff`)) },
  ]);

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    path.join(BASE, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')
  ).toString('base64');

  const C = {
    bg:      '#001F61',
    text:    '#FFFFFF',
    textSoft:'#E5E7EB',
    textMuted:'#9CA3AF',
    cardBg:  'rgba(255,255,255,0.1)',
    border:  'rgba(255,255,255,0.2)',
    green:   '#10B981',
    red:     '#EF4444',
  };

  const W = 1080, H = 1350;

  const h = (type, props, ...ch) => ({
    type, props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function topRow(badgeText) {
    return h('div', { style: { display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'18px' } },
      h('div', { style: { display:'flex' } },
        h('span', { style: {
          display:'flex', fontSize:'21px', fontWeight:700, letterSpacing:'3px',
          color:C.text, backgroundColor:C.cardBg, padding:'10px 22px', borderRadius:'12px'
        }}, badgeText)
      ),
      h('img', { src: logoB64, width: 100, height: 100, style: { borderRadius:'12px' } }),
    );
  }

  function hl(text, size) {
    return h('span', { style: {
      fontSize:`${size || 60}px`, fontWeight:800, color:C.text,
      lineHeight:'1.08', letterSpacing:'-1.5px', marginBottom:'6px'
    }}, text);
  }

  function sl(text) {
    return h('span', { style: {
      fontSize:'28px', fontWeight:500, color:C.textMuted,
      lineHeight:'1.5', marginBottom:'8px'
    }}, text);
  }

  function kl(text, accent) {
    return h('div', { style: {
      display:'flex', alignItems:'center', gap:'14px',
      backgroundColor:C.cardBg, borderRadius:'16px', padding:'20px 28px', marginTop:'8px'
    }},
      h('div', { style: { display:'flex', width:'6px', minHeight:'38px', backgroundColor: accent || C.text, borderRadius:'3px' } }),
      h('span', { style: { fontSize:'26px', fontWeight:600, color:C.text, lineHeight:'1.4' } }, text),
    );
  }

  function handle() {
    return h('div', { style: { display:'flex', marginTop:'10px' } },
      h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textMuted } }, '@benarofinanzen'),
    );
  }

  function wrap(...children) {
    return h('div', { style: {
      display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit'
    }}, ...children);
  }

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 1 — HOOK: "Nach 6 Wochen zahlt dein Chef nichts mehr."
  // ─────────────────────────────────────────────────────────────────
  const slide1 = wrap(
    topRow('KENNST DU DAS?'),
    hl('Nach 6 Wochen zahlt dein Chef nichts mehr.', 58),
    sl('Was passiert dann mit deinem Gehalt?'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      h('div', { style: { display:'flex', flexDirection:'row', gap:'20px', width:'100%' } },
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'14px',
          backgroundColor:'rgba(16,185,129,0.15)', borderRadius:'20px', padding:'30px',
          border:'2px solid rgba(16,185,129,0.4)'
        }},
          h('span', { style: { fontSize:'19px', fontWeight:700, letterSpacing:'2px', color:C.green } }, 'BIS WOCHE 6'),
          h('span', { style: { fontSize:'64px', fontWeight:800, color:C.text, lineHeight:'1' } }, '100 %'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textSoft, lineHeight:'1.4' } },
            'Volle Lohnfortzahlung durch den Arbeitgeber'),
        ),
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'14px',
          backgroundColor:'rgba(239,68,68,0.12)', borderRadius:'20px', padding:'30px',
          border:'2px solid rgba(239,68,68,0.4)'
        }},
          h('span', { style: { fontSize:'19px', fontWeight:700, letterSpacing:'2px', color:C.red } }, 'AB WOCHE 7'),
          h('span', { style: { fontSize:'64px', fontWeight:800, color:C.red, lineHeight:'1' } }, '~70 %'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textSoft, lineHeight:'1.4' } },
            'Nur noch Krankengeld von der Krankenkasse'),
        ),
      ),
      h('div', { style: {
        display:'flex', flexDirection:'row', alignItems:'center', gap:'12px',
        padding:'16px 24px', backgroundColor:C.cardBg, borderRadius:'14px'
      }},
        h('div', { style: { display:'flex', width:'10px', height:'10px', borderRadius:'5px', backgroundColor:C.red } }),
        h('span', { style: { fontSize:'26px', fontWeight:600, color:C.textSoft, lineHeight:'1.4' } },
          'Die Lücke beginnt — und die meisten wissen es nicht.'),
      ),
    ),
    kl('Gilt für alle gesetzlich Versicherten. Angestellt oder nicht.'),
    handle(),
  );

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 2 — DATEN: Die monatliche Einkommenslücke
  // ─────────────────────────────────────────────────────────────────
  const slide2 = wrap(
    topRow('DIE ZAHLEN'),
    hl('Was bleibt von 3.500 € Brutto?', 60),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'18px' } },
      // Balken: Nettolohn
      h('div', { style: { display:'flex', flexDirection:'column', gap:'8px' } },
        h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center' } },
          h('span', { style: { fontSize:'24px', fontWeight:600, color:C.textMuted } }, 'Nettolohn (gewohnt)'),
          h('span', { style: { fontSize:'30px', fontWeight:800, color:C.text } }, '2.200 €'),
        ),
        h('div', { style: { display:'flex', width:'100%', height:'28px', backgroundColor:C.cardBg, borderRadius:'8px', overflow:'hidden' } },
          h('div', { style: { display:'flex', width:'100%', height:'28px', backgroundColor:C.green, borderRadius:'8px' } }),
        ),
      ),
      // Balken: Krankengeld
      h('div', { style: { display:'flex', flexDirection:'column', gap:'8px' } },
        h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center' } },
          h('span', { style: { fontSize:'24px', fontWeight:600, color:C.textMuted } }, 'Krankengeld (ab Woche 7)'),
          h('span', { style: { fontSize:'30px', fontWeight:800, color:C.red } }, '~ 1.820 €'),
        ),
        h('div', { style: { display:'flex', width:'100%', height:'28px', backgroundColor:C.cardBg, borderRadius:'8px', overflow:'hidden' } },
          h('div', { style: { display:'flex', width:'83%', height:'28px', backgroundColor:'rgba(239,68,68,0.7)', borderRadius:'8px' } }),
        ),
      ),
      // Gap-Marker
      h('div', { style: { display:'flex', flexDirection:'row', gap:'16px', alignItems:'center', padding:'22px 26px', backgroundColor:'rgba(239,68,68,0.1)', borderRadius:'16px', border:'1px solid rgba(239,68,68,0.3)' } },
        h('div', { style: { display:'flex', width:'12px', height:'12px', borderRadius:'6px', backgroundColor:C.red } }),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' } },
          h('span', { style: { fontSize:'28px', fontWeight:800, color:C.red } }, 'Monatliche Lücke: ca. 380 €'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textMuted } }, 'Für bis zu 78 Wochen. Das sind über 6.800 € Verlust.'),
        ),
      ),
      // Note about tax
      h('div', { style: { display:'flex', padding:'16px 24px', backgroundColor:C.cardBg, borderRadius:'14px' } },
        h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textMuted, lineHeight:'1.5' } },
          'Krankengeld = ~70 % vom Bruttolohn. Wer mehr verdient, verliert mehr.'),
      ),
    ),
    kl('Bei 6.000 € Brutto kann die monatliche Lücke 600 € und mehr betragen.', C.red),
    handle(),
  );

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 3 — PROBLEM: Deine Kosten warten nicht
  // ─────────────────────────────────────────────────────────────────
  const slide3 = wrap(
    topRow('DAS PROBLEM'),
    hl('Deine Kosten warten nicht.', 62),
    sl('Krankheit ändert nichts an deinen Verpflichtungen.'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'14px' } },
      ...[
        { label:'Miete / Kredit', amount:'950 €', icon:'01' },
        { label:'Nebenkosten & Strom', amount:'230 €', icon:'02' },
        { label:'Versicherungen', amount:'280 €', icon:'03' },
        { label:'Lebensmittel & Alltag', amount:'600 €', icon:'04' },
        { label:'Auto / Transport', amount:'320 €', icon:'05' },
      ].map(row =>
        h('div', { style: {
          display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between',
          padding:'20px 26px', backgroundColor:C.cardBg, borderRadius:'16px'
        }},
          h('div', { style: { display:'flex', alignItems:'center', gap:'18px' } },
            h('div', { style: { display:'flex', width:'42px', height:'42px', borderRadius:'12px', backgroundColor:'rgba(255,255,255,0.08)', alignItems:'center', justifyContent:'center' } },
              h('span', { style: { fontSize:'18px', fontWeight:700, color:C.textMuted } }, row.icon),
            ),
            h('span', { style: { fontSize:'27px', fontWeight:600, color:C.textSoft } }, row.label),
          ),
          h('span', { style: { fontSize:'27px', fontWeight:800, color:C.text } }, row.amount),
        )
      ),
      h('div', { style: {
        display:'flex', justifyContent:'space-between', alignItems:'center',
        padding:'20px 26px', backgroundColor:'rgba(239,68,68,0.12)', borderRadius:'16px',
        border:'2px solid rgba(239,68,68,0.35)'
      }},
        h('span', { style: { fontSize:'28px', fontWeight:700, color:C.red } }, 'Gesamt pro Monat'),
        h('span', { style: { fontSize:'34px', fontWeight:800, color:C.red } }, '2.380 €'),
      ),
    ),
    kl('Diese Kosten laufen weiter — egal ob du krank bist oder nicht.', C.red),
    handle(),
  );

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 4 — WENDEPUNKT: Erwartung vs. Realität (ohne / mit KTV)
  // ─────────────────────────────────────────────────────────────────
  const slide4 = wrap(
    topRow('OHNE VS. MIT KTV'),
    hl('Zwei Szenarien. Ein Unterschied.', 60),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      h('div', { style: { display:'flex', flexDirection:'row', gap:'18px', width:'100%' } },
        // Left: Ohne KTV
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'16px',
          backgroundColor:'rgba(239,68,68,0.08)', borderRadius:'20px', padding:'28px',
          border:'1px solid rgba(239,68,68,0.2)'
        }},
          h('span', { style: { fontSize:'19px', fontWeight:700, letterSpacing:'2px', color:C.red } }, 'OHNE ABSICHERUNG'),
          h('div', { style: { display:'flex', width:'100%', height:'2px', backgroundColor:'rgba(239,68,68,0.2)' } }),
          ...[
            'Einkommen sinkt auf ~70 %',
            'Monatliche Lücke 380 €+',
            'Rücklagen werden aufgebraucht',
            'Kredit oder Miete in Gefahr',
          ].map(t =>
            h('div', { style: { display:'flex', alignItems:'flex-start', gap:'12px' } },
              h('div', { style: { display:'flex', width:'8px', height:'8px', borderRadius:'4px', backgroundColor:C.red, marginTop:'8px' } }),
              h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textSoft, lineHeight:'1.4' } }, t),
            )
          ),
        ),
        // Right: Mit KTV
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'16px',
          backgroundColor:'rgba(16,185,129,0.1)', borderRadius:'20px', padding:'28px',
          border:'1px solid rgba(16,185,129,0.25)'
        }},
          h('span', { style: { fontSize:'19px', fontWeight:700, letterSpacing:'2px', color:C.green } }, 'MIT ABSICHERUNG'),
          h('div', { style: { display:'flex', width:'100%', height:'2px', backgroundColor:'rgba(16,185,129,0.2)' } }),
          ...[
            'Einkommen bleibt stabil',
            'Lücke wird geschlossen',
            'Rücklagen bleiben unangetastet',
            'Volle finanzielle Sicherheit',
          ].map(t =>
            h('div', { style: { display:'flex', alignItems:'flex-start', gap:'12px' } },
              h('div', { style: { display:'flex', width:'8px', height:'8px', borderRadius:'4px', backgroundColor:C.green, marginTop:'8px' } }),
              h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textSoft, lineHeight:'1.4' } }, t),
            )
          ),
        ),
      ),
      h('div', { style: { display:'flex', padding:'18px 24px', backgroundColor:C.cardBg, borderRadius:'14px' } },
        h('span', { style: { fontSize:'26px', fontWeight:600, color:C.textSoft, lineHeight:'1.4' } },
          'Das Krankentagegeld greift ab dem 43. Krankheitstag — genau dann, wenn dein Chef aufhört zu zahlen.'),
      ),
    ),
    kl('Krankentagegeld ist die Brücke zwischen Krankheit und Erholung.'),
    handle(),
  );

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 5 — DETAILS: 3 Fakten zur KTV
  // ─────────────────────────────────────────────────────────────────
  const slide5 = wrap(
    topRow('DIE FAKTEN'),
    hl('Was du zur KTV wissen musst.', 62),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      ...[
        {
          num:'01',
          title:'Ab ~15 € im Monat',
          desc:'Für Angestellte ist Krankentagegeld bereits ab ~15 € monatlich versicherbar — günstiger als viele Streaming-Abos.',
          color:C.green,
        },
        {
          num:'02',
          title:'Bis zu 78 Wochen Schutz',
          desc:'Die Krankenkasse zahlt max. 78 Wochen Krankengeld. Danach übernimmt nur die private KTV.',
          color:C.text,
        },
        {
          num:'03',
          title:'Je früher, desto besser',
          desc:'Wer jung und gesund abschließt, zahlt weniger. Vorerkrankungen können zum Ausschluss führen.',
          color:'#60A5FA',
        },
      ].map(f =>
        h('div', { style: {
          display:'flex', flexDirection:'row', alignItems:'flex-start', gap:'20px',
          padding:'24px 28px', backgroundColor:C.cardBg, borderRadius:'18px'
        }},
          h('span', { style: { fontSize:'38px', fontWeight:800, color:f.color, minWidth:'60px', lineHeight:'1' } }, f.num),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'6px' } },
            h('span', { style: { fontSize:'28px', fontWeight:700, color:C.text, lineHeight:'1.2' } }, f.title),
            h('span', { style: { fontSize:'23px', fontWeight:500, color:C.textMuted, lineHeight:'1.5' } }, f.desc),
          ),
        )
      ),
    ),
    kl('Frühzeitig absichern spart Geld und schützt dich besser.', C.green),
    handle(),
  );

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 6 — SCHRITTE: In 3 Schritten absichern
  // ─────────────────────────────────────────────────────────────────
  function arrowDown() {
    return h('div', { style: { display:'flex', justifyContent:'center', padding:'4px 0' } },
      h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'0px' } },
        h('div', { style: { display:'flex', width:'4px', height:'24px', backgroundColor:C.border, borderRadius:'2px' } }),
      ),
    );
  }

  const slide6 = wrap(
    topRow('SO GEHT\'S'),
    hl('In 3 Schritten zur Absicherung.', 60),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'0px' } },
      ...[
        { num:'1', title:'Lücke berechnen', desc:'Prüfe: Was verdienst du netto? Was bekommst du als Krankengeld? Die Differenz ist deine persönliche Lücke.', color:C.green },
        { num:'2', title:'Angebote vergleichen', desc:'Lass dich beraten — Selbstbehaltzeiten, Wartezeiten und Höchstgrenzen unterscheiden sich je nach Anbieter.', color:'#60A5FA' },
        { num:'3', title:'Schutz aktivieren', desc:'Abschluss ist unkompliziert. Wer gesund ist und früh handelt, zahlt dauerhaft weniger Beitrag.', color:C.text },
      ].map((step, i, arr) => [
        h('div', { style: {
          display:'flex', flexDirection:'row', alignItems:'flex-start', gap:'20px',
          padding:'22px 26px', backgroundColor:C.cardBg, borderRadius:'18px'
        }},
          h('div', { style: {
            display:'flex', width:'52px', height:'52px', borderRadius:'16px',
            backgroundColor:`rgba(255,255,255,0.08)`, alignItems:'center', justifyContent:'center'
          }},
            h('span', { style: { fontSize:'26px', fontWeight:800, color:step.color } }, step.num),
          ),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'6px' } },
            h('span', { style: { fontSize:'28px', fontWeight:700, color:C.text } }, step.title),
            h('span', { style: { fontSize:'23px', fontWeight:500, color:C.textMuted, lineHeight:'1.5' } }, step.desc),
          ),
        ),
        ...(i < arr.length - 1 ? [arrowDown()] : []),
      ]).flat(),
    ),
    kl('Starte heute — dein jüngeres Ich wird es dir danken.'),
    handle(),
  );

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 7 — LEARNINGS: 4 Key Takeaways
  // ─────────────────────────────────────────────────────────────────
  const learnings = [
    { num:'01', text:'Nach 6 Wochen Krankheit zahlt dein Arbeitgeber kein Gehalt mehr.', pct:25 },
    { num:'02', text:'Krankengeld beträgt nur ~70 % deines Bruttogehalts — die Lücke ist real.', pct:50 },
    { num:'03', text:'Deine Fixkosten warten nicht — Miete, Kredit und Co. laufen weiter.', pct:75 },
    { num:'04', text:'Krankentagegeld ab ~15 €/Monat schließt die Lücke vollständig.', pct:100 },
  ];

  const slide7 = wrap(
    topRow('DEINE TAKEAWAYS'),
    hl('Das nimmst du mit:', 64),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'14px' } },
      ...learnings.map(l =>
        h('div', { style: { display:'flex', flexDirection:'column', gap:'10px', padding:'20px 26px', backgroundColor:C.cardBg, borderRadius:'18px' } },
          h('div', { style: { display:'flex', alignItems:'center', gap:'18px' } },
            h('span', { style: { fontSize:'36px', fontWeight:800, color: l.pct === 100 ? C.green : C.text, minWidth:'56px' } }, l.num),
            h('span', { style: { fontSize:'25px', fontWeight:600, color:C.text, lineHeight:'1.3' } }, l.text),
          ),
          h('div', { style: { display:'flex', height:'5px', backgroundColor:C.border, borderRadius:'3px', overflow:'hidden' } },
            h('div', { style: { display:'flex', width:`${l.pct}%`, height:'5px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius:'3px' } }),
          ),
        )
      ),
    ),
    kl('Wissen ist gut — handeln ist besser. Prüfe deine Lücke heute.'),
    handle(),
  );

  // ─────────────────────────────────────────────────────────────────
  // SLIDE 8 — CTA
  // ─────────────────────────────────────────────────────────────────
  const slide8 = wrap(
    topRow('BENARO FINANZEN'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'32px' } },
      h('span', { style: { fontSize:'28px', fontWeight:600, color:C.textMuted, letterSpacing:'2px', textAlign:'center' } },
        'DEINE FRAGE:'),
      h('span', { style: {
        fontSize:'64px', fontWeight:800, color:C.text,
        lineHeight:'1.1', letterSpacing:'-1.5px', textAlign:'center'
      }}, 'Wie groß ist deine Einkommenslücke?'),
      h('span', { style: {
        fontSize:'27px', fontWeight:500, color:C.textSoft,
        textAlign:'center', lineHeight:'1.6', maxWidth:'800px'
      }}, 'Schreib uns "LÜCKE" in die DM — wir berechnen kostenlos, wie viel Schutz du brauchst.'),
      h('div', { style: { display:'flex', flexDirection:'column', gap:'14px', alignItems:'center' } },
        h('span', { style: { fontSize:'28px', fontWeight:700, color:C.green, textAlign:'center' } },
          'Speichern nicht vergessen'),
        h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textMuted, textAlign:'center' } },
          'Du wirst diesen Post brauchen.'),
      ),
    ),
    h('div', { style: { display:'flex', alignItems:'center', gap:'16px', marginTop:'10px' } },
      h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textMuted } }, '@benarofinanzen'),
    ),
  );

  // ─────────────────────────────────────────────────────────────────
  // RENDER ALLE SLIDES
  // ─────────────────────────────────────────────────────────────────
  const TODAY = '2026-10-07';
  const outDir = path.join(BASE, `output/carousel_${TODAY}/slides`);

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode:'width', value:W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i+1).padStart(2,'0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i+1}/${slides.length} gespeichert: ${pngPath}`);
  }

  console.log('\nAlle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
