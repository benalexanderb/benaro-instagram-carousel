const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default;
  const { Resvg } = require('@resvg/resvg-js');

  const fontDir = path.join(__dirname, 'node_modules/@fontsource/outfit/files');
  const fonts = [400,500,600,700,800].flatMap(w => [
    { name:'Outfit', weight:w, style:'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-${w}-normal.woff`)) },
    { name:'Outfit', weight:w, style:'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-ext-${w}-normal.woff`)) },
  ]);

  const C = {
    bg:'#1B2D87',
    bgDark:'#12207A',
    bgDeep:'#0D1A60',
    text:'#FFFFFF',
    textSoft:'rgba(255,255,255,0.80)',
    textMuted:'rgba(255,255,255,0.50)',
    cardBg:'rgba(255,255,255,0.10)',
    cardBgLight:'rgba(255,255,255,0.18)',
    border:'rgba(255,255,255,0.15)',
    accent:'#5BC8F5',
    red:'#E63030',
    white:'#FFFFFF',
  };

  const W = 1080, H = 1350;

  const h = (type, props, ...ch) => ({
    type, props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function badge(text) {
    return h('div', { style: { display:'flex', marginBottom:'16px' } },
      h('span', { style: { display:'flex', fontSize:'22px', fontWeight:700, letterSpacing:'3px',
        color:C.accent, backgroundColor:'rgba(91,200,245,0.15)',
        padding:'10px 22px', borderRadius:'12px', textTransform:'uppercase' } }, text),
    );
  }

  function headline(text, size) {
    const sz = size || 64;
    return h('span', { style: { fontSize:`${sz}px`, fontWeight:800, color:C.text,
      lineHeight:'1.05', letterSpacing:'-0.5px', marginBottom:'6px',
      textTransform:'uppercase' } }, text);
  }

  function subline(text) {
    return h('span', { style: { fontSize:'28px', fontWeight:500, color:C.textSoft,
      lineHeight:'1.5', marginTop:'8px' } }, text);
  }

  function keyLearning(text) {
    return h('div', { style: { display:'flex', alignItems:'center', gap:'14px',
      backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'16px', padding:'22px 28px', marginTop:'auto' } },
      h('div', { style: { display:'flex', width:'6px', minHeight:'40px',
        backgroundColor:C.red, borderRadius:'3px' } }),
      h('span', { style: { fontSize:'27px', fontWeight:600, color:C.text, lineHeight:'1.4' } }, text),
    );
  }

  function bfLogo() {
    return h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', marginTop:'20px' } },
      h('div', { style: { display:'flex', alignItems:'center', justifyContent:'center',
        width:'72px', height:'56px',
        border:'3px solid rgba(255,255,255,0.9)', borderRadius:'10px' } },
        h('span', { style: { fontSize:'28px', fontWeight:800, color:'#FFFFFF', letterSpacing:'2px' } }, 'BF'),
      ),
      h('span', { style: { fontSize:'14px', fontWeight:600, color:'rgba(255,255,255,0.7)',
        letterSpacing:'3px', textTransform:'uppercase' } }, 'BENARO FINANZEN'),
    );
  }

  // ==================== SLIDE 1: HOOK ====================
  const slide1 = h('div', {
    style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' }
  },
    badge('ACHTUNG KREDITKILLER'),
    headline('DIESER FEHLER KOSTET DICH BIS ZU 70.000 €', 55),
    subline('SCHUFA-Score — Was du nicht weißt, schadet dir täglich'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'28px' } },
      h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'18px' } },
        h('div', { style: { display:'flex', alignItems:'center', justifyContent:'center',
          width:'200px', height:'200px', borderRadius:'100px',
          border:`8px solid ${C.red}`, backgroundColor:'rgba(230,48,48,0.12)' } },
          h('span', { style: { fontSize:'80px', fontWeight:800, color:C.red } }, '!'),
        ),
        h('span', { style: { fontSize:'40px', fontWeight:800, color:C.white,
          letterSpacing:'4px', textTransform:'uppercase' } }, 'SCHUFA-SCORE'),
        h('span', { style: { fontSize:'26px', fontWeight:500, color:C.textSoft,
          textAlign:'center', maxWidth:'700px', lineHeight:'1.5' } },
          '78 % der Deutschen kennen ihren SCHUFA-Score nicht — und zahlen dafür drauf.'),
      ),
      h('div', { style: { display:'flex', gap:'14px', width:'100%' } },
        h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center',
          backgroundColor:C.bgDark, borderRadius:'18px', padding:'20px 24px', flex:'1',
          border:`1px solid ${C.border}` } },
          h('span', { style: { fontSize:'40px', fontWeight:800, color:C.red } }, '20 %'),
          h('span', { style: { fontSize:'19px', fontWeight:500, color:C.textMuted, textAlign:'center', lineHeight:'1.3' } }, 'fehlerhafter Einträge'),
        ),
        h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center',
          backgroundColor:C.bgDark, borderRadius:'18px', padding:'20px 24px', flex:'1',
          border:`1px solid ${C.border}` } },
          h('span', { style: { fontSize:'40px', fontWeight:800, color:C.accent } }, '2,6 %'),
          h('span', { style: { fontSize:'19px', fontWeight:500, color:C.textMuted, textAlign:'center', lineHeight:'1.3' } }, 'mehr Zinsen möglich'),
        ),
        h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center',
          backgroundColor:C.bgDark, borderRadius:'18px', padding:'20px 24px', flex:'1',
          border:`1px solid ${C.border}` } },
          h('span', { style: { fontSize:'40px', fontWeight:800, color:C.accent } }, '90 T.'),
          h('span', { style: { fontSize:'19px', fontWeight:500, color:C.textMuted, textAlign:'center', lineHeight:'1.3' } }, 'zur Verbesserung'),
        ),
      ),
    ),
    keyLearning('Swipe, um deinen Score zu retten — konkret und kostenlos.'),
    bfLogo(),
  );

  // ==================== SLIDE 2: SCORE-SKALA ====================
  const scoreData = [
    { label:'97 – 100', desc:'Sehr gut', color:'#10B981', pct:100 },
    { label:'90 – 96',  desc:'Gut',       color:'#34D399', pct:80  },
    { label:'80 – 89',  desc:'Befriedigend', color:'#F59E0B', pct:60 },
    { label:'67 – 79',  desc:'Ausreichend',  color:'#F97316', pct:40 },
    { label:'unter 67', desc:'Problematisch',color:C.red,    pct:20 },
  ];
  const slide2 = h('div', {
    style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' }
  },
    badge('SO FUNKTIONIERT\'S'),
    headline('WAS DEIN SCORE WIRKLICH BEDEUTET', 60),
    subline('Skala 0 – 100: Je höher, desto besser'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'18px' } },
      ...scoreData.map(s =>
        h('div', { style: { display:'flex', alignItems:'center', gap:'18px' } },
          h('span', { style: { fontSize:'24px', fontWeight:700, color:C.text, minWidth:'130px' } }, s.label),
          h('div', { style: { display:'flex', flex:'1', height:'46px', backgroundColor:C.bgDark, borderRadius:'10px', overflow:'hidden' } },
            h('div', { style: { display:'flex', width:`${s.pct}%`, height:'46px', backgroundColor:s.color,
              borderRadius:'10px', alignItems:'center', paddingLeft:'18px' } },
              h('span', { style: { fontSize:'23px', fontWeight:700, color:'#FFFFFF' } }, s.desc),
            ),
          ),
        )
      ),
      h('div', { style: { display:'flex', marginTop:'16px', backgroundColor:'rgba(91,200,245,0.10)',
        borderRadius:'16px', padding:'20px 24px', border:`1px solid ${C.accent}` } },
        h('span', { style: { fontSize:'24px', fontWeight:600, color:C.accent, lineHeight:'1.5' } },
          'Dein Score wird täglich neu berechnet — jede Verbesserung zählt sofort.'),
      ),
    ),
    keyLearning('78 % der Deutschen haben ihren Score noch nie gecheckt.'),
    bfLogo(),
  );

  // ==================== SLIDE 3: WAS EIN SCHLECHTER SCORE KOSTET ====================
  const slide3 = h('div', {
    style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' }
  },
    badge('DAS KOSTET DICH WIRKLICH'),
    headline('1 SCHLECHTER SCORE = BIS ZU 70.000 € MEHR', 56),
    subline('Kredit 200.000 €, Laufzeit 20 Jahre'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'18px' } },
      h('div', { style: { display:'flex', alignItems:'center', gap:'18px',
        backgroundColor:'rgba(16,185,129,0.12)', borderRadius:'18px', padding:'24px 28px',
        border:'2px solid #10B981' } },
        h('div', { style: { display:'flex', flexDirection:'column', flex:'1', gap:'4px' } },
          h('span', { style: { fontSize:'21px', fontWeight:700, letterSpacing:'2px',
            color:'#10B981', textTransform:'uppercase' } }, 'Score 97+ — Sehr gut'),
          h('span', { style: { fontSize:'30px', fontWeight:800, color:C.text } }, '3,2 % Zinsen p.a.'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textMuted } }, 'Gesamtkosten: ca. 270.000 €'),
        ),
        h('span', { style: { fontSize:'34px', fontWeight:800, color:'#10B981' } }, 'TOP'),
      ),
      h('div', { style: { display:'flex', alignItems:'center', gap:'18px',
        backgroundColor:C.bgDark, borderRadius:'18px', padding:'24px 28px',
        border:`1px solid ${C.border}` } },
        h('div', { style: { display:'flex', flexDirection:'column', flex:'1', gap:'4px' } },
          h('span', { style: { fontSize:'21px', fontWeight:700, letterSpacing:'2px',
            color:'#F59E0B', textTransform:'uppercase' } }, 'Score 80 – 89 — Befriedigend'),
          h('span', { style: { fontSize:'30px', fontWeight:800, color:C.text } }, '4,5 % Zinsen p.a.'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textMuted } }, 'Gesamtkosten: ca. 300.000 €'),
        ),
        h('span', { style: { fontSize:'24px', fontWeight:700, color:'#F59E0B' } }, '+30.000 €'),
      ),
      h('div', { style: { display:'flex', alignItems:'center', gap:'18px',
        backgroundColor:'rgba(230,48,48,0.10)', borderRadius:'18px', padding:'24px 28px',
        border:`2px solid ${C.red}` } },
        h('div', { style: { display:'flex', flexDirection:'column', flex:'1', gap:'4px' } },
          h('span', { style: { fontSize:'21px', fontWeight:700, letterSpacing:'2px',
            color:C.red, textTransform:'uppercase' } }, 'Score unter 67 — Schlecht'),
          h('span', { style: { fontSize:'30px', fontWeight:800, color:C.text } }, '5,8 % Zinsen p.a.'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textMuted } }, 'Gesamtkosten: ca. 340.000 €'),
        ),
        h('span', { style: { fontSize:'24px', fontWeight:700, color:C.red } }, '+70.000 €'),
      ),
      h('div', { style: { display:'flex', alignItems:'center', gap:'14px',
        backgroundColor:'rgba(230,48,48,0.12)', borderRadius:'14px', padding:'18px 24px',
        border:`1px solid ${C.red}` } },
        h('div', { style: { display:'flex', width:'10px', minHeight:'36px',
          backgroundColor:C.red, borderRadius:'3px' } }),
        h('span', { style: { fontSize:'24px', fontWeight:700, color:C.text, lineHeight:'1.4' } },
          'Differenz zwischen bestem und schlechtestem Score: 70.000 €'),
      ),
    ),
    keyLearning('Dein SCHUFA-Score entscheidet über Zehntausende — lautlos.'),
    bfLogo(),
  );

  // ==================== SLIDE 4: DIE GUTE NACHRICHT ====================
  const timelineSteps = [
    { step:'JETZT',       action:'Score gratis checken + Fehler finden',      color:C.accent,  num:'1' },
    { step:'IN 30 TAGEN', action:'Fehler reklamieren + Anfragen reduzieren',   color:'#F59E0B', num:'2' },
    { step:'IN 90 TAGEN', action:'Score verbessert — Kredit neu verhandeln',   color:'#10B981', num:'3' },
  ];
  const slide4 = h('div', {
    style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' }
  },
    badge('GUTE NACHRICHT'),
    headline('DU KANNST DEINEN SCORE AKTIV VERBESSERN', 54),
    subline('In 90 Tagen messbare Verbesserung möglich'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      ...timelineSteps.map(item =>
        h('div', { style: { display:'flex', alignItems:'center', gap:'20px',
          backgroundColor:C.bgDark, borderRadius:'18px', padding:'24px 28px',
          border:`1px solid ${C.border}` } },
          h('div', { style: { display:'flex', width:'64px', height:'64px', borderRadius:'32px',
            backgroundColor:item.color, alignItems:'center', justifyContent:'center', flexShrink:'0' } },
            h('span', { style: { fontSize:'28px', fontWeight:800, color:'#FFFFFF' } }, item.num),
          ),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'4px', flex:'1' } },
            h('span', { style: { fontSize:'21px', fontWeight:700, color:item.color,
              letterSpacing:'2px', textTransform:'uppercase' } }, item.step),
            h('span', { style: { fontSize:'28px', fontWeight:600, color:C.text, lineHeight:'1.3' } }, item.action),
          ),
        )
      ),
      h('div', { style: { display:'flex', marginTop:'8px', backgroundColor:'rgba(91,200,245,0.10)',
        borderRadius:'16px', padding:'20px 24px', border:`1px solid ${C.accent}`, gap:'14px' } },
        h('div', { style: { display:'flex', width:'6px', minHeight:'36px',
          backgroundColor:C.accent, borderRadius:'3px' } }),
        h('span', { style: { fontSize:'25px', fontWeight:600, color:C.accent, lineHeight:'1.5' } },
          '20 % aller SCHUFA-Einträge sind fehlerhaft — Reklamation ist kostenlos und wirkt sofort.'),
      ),
    ),
    keyLearning('Fehlerhafte Einträge löschen = schnellste SCHUFA-Verbesserung.'),
    bfLogo(),
  );

  // ==================== SLIDE 5: DIE 5 HÄUFIGSTEN FEHLER ====================
  const fehler = [
    { num:'01', titel:'Zu viele Kreditanfragen',       detail:'Jede Anfrage senkt deinen Score — immer Konditionsanfrage wählen!' },
    { num:'02', titel:'Alte Konten nicht kündigen',    detail:'Ungenutzte Konten sind unnötige SCHUFA-Einträge' },
    { num:'03', titel:'Rechnungen zu spät zahlen',     detail:'60 Tage Verzug landet in der SCHUFA — Lastschrift nutzen' },
    { num:'04', titel:'Score nie gecheckt',            detail:'Fehler bleiben jahrelang unentdeckt — 20 % sind falsch!' },
    { num:'05', titel:'Zu viele Kreditkarten',         detail:'Jede aktive Karte senkt den Score — auf 1–2 reduzieren' },
  ];
  const slide5 = h('div', {
    style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' }
  },
    badge('DIE 5 HÄUFIGSTEN FEHLER'),
    headline('DIESE GEWOHNHEITEN RUINIEREN DEINEN SCORE', 50),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'14px' } },
      ...fehler.map(f =>
        h('div', { style: { display:'flex', alignItems:'center', gap:'18px',
          backgroundColor:C.bgDark, borderRadius:'16px', padding:'18px 24px',
          border:`1px solid ${C.border}` } },
          h('div', { style: { display:'flex', width:'52px', height:'52px', borderRadius:'12px',
            backgroundColor:'rgba(230,48,48,0.15)', alignItems:'center', justifyContent:'center',
            flexShrink:'0' } },
            h('span', { style: { fontSize:'21px', fontWeight:800, color:C.red } }, f.num),
          ),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'2px', flex:'1' } },
            h('span', { style: { fontSize:'24px', fontWeight:700, color:C.text,
              textTransform:'uppercase', letterSpacing:'0.5px' } }, f.titel),
            h('span', { style: { fontSize:'21px', fontWeight:500, color:C.textMuted, lineHeight:'1.3' } }, f.detail),
          ),
        )
      ),
    ),
    keyLearning('Fehler 01 und 04 sind am häufigsten — und am schnellsten zu lösen.'),
    bfLogo(),
  );

  // ==================== SLIDE 6: GRATIS SELBST-CHECK ====================
  const checkSchritte = [
    {
      num:'01',
      name:'meineSCHUFA.de',
      desc:'Offizielle Daten-Kopie nach §34 BDSG — 1x pro Jahr kostenlos. Vollständiger Einblick in alle Einträge.',
      farbe:C.accent,
    },
    {
      num:'02',
      name:'Bonify App',
      desc:'Kostenlose App für iOS und Android. SCHUFA-Score täglich aktuell, plus Tipps zur Verbesserung.',
      farbe:'#10B981',
    },
    {
      num:'03',
      name:'Falschen Eintrag reklamieren',
      desc:'Falschen Eintrag entdeckt? Direkt per E-Mail an SCHUFA — kostenlos, Reaktion in 4 Wochen.',
      farbe:'#F59E0B',
    },
  ];
  const slide6 = h('div', {
    style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' }
  },
    badge('GRATIS SELBST-CHECK'),
    headline('SO CHECKST DU DEINEN SCORE KOSTENLOS', 54),
    subline('3 Wege — kein Vertrag, keine Kosten'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'22px' } },
      ...checkSchritte.map(step =>
        h('div', { style: { display:'flex', alignItems:'flex-start', gap:'18px',
          backgroundColor:C.bgDark, borderRadius:'18px', padding:'26px 28px',
          border:`1px solid ${C.border}` } },
          h('div', { style: { display:'flex', width:'52px', height:'52px', borderRadius:'14px',
            backgroundColor:`rgba(0,0,0,0.2)`, alignItems:'center', justifyContent:'center',
            flexShrink:'0', border:`2px solid ${step.farbe}` } },
            h('span', { style: { fontSize:'22px', fontWeight:800, color:step.farbe } }, step.num),
          ),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'4px', flex:'1' } },
            h('span', { style: { fontSize:'28px', fontWeight:700, color:C.text } }, step.name),
            h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textMuted, lineHeight:'1.4' } }, step.desc),
          ),
        )
      ),
    ),
    keyLearning('Start mit Bonify: in 2 Minuten hast du deinen Score auf dem Handy.'),
    bfLogo(),
  );

  // ==================== SLIDE 7: AKTIONSPLAN ====================
  const learnings = [
    { num:'01', text:'Score sofort kostenlos checken (Bonify App)',         pct:25  },
    { num:'02', text:'Alle Fehler reklamieren — 20 % sind falsch!',          pct:50  },
    { num:'03', text:'Nur Konditionsanfragen stellen — nie Kreditanfragen',  pct:75  },
    { num:'04', text:'Alten Konten kündigen, Lastschriften einrichten',      pct:100 },
  ];
  const slide7 = h('div', {
    style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' }
  },
    badge('DEIN AKTIONSPLAN'),
    headline('4 SCHRITTE ZUM BESSEREN SCORE', 60),
    subline('Starte heute — es kostet dich 15 Minuten'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' } },
      ...learnings.map(l =>
        h('div', { style: { display:'flex', flexDirection:'column', gap:'10px', padding:'22px 26px',
          backgroundColor:C.bgDark, borderRadius:'18px',
          border: l.pct === 100 ? `2px solid ${C.accent}` : `1px solid ${C.border}` } },
          h('div', { style: { display:'flex', alignItems:'center', gap:'18px' } },
            h('span', { style: { fontSize:'38px', fontWeight:800,
              color: l.pct === 100 ? C.accent : C.white, minWidth:'60px' } }, l.num),
            h('span', { style: { fontSize:'26px', fontWeight:600, color:C.text, lineHeight:'1.3', flex:'1' } }, l.text),
          ),
          h('div', { style: { display:'flex', height:'6px', backgroundColor:C.border,
            borderRadius:'3px', overflow:'hidden' } },
            h('div', { style: { display:'flex', width:`${l.pct}%`, height:'6px',
              backgroundColor: l.pct === 100 ? C.accent : C.red, borderRadius:'3px' } }),
          ),
        )
      ),
    ),
    keyLearning('Die meisten brauchen 90 Tage — fang heute an, spare tausende Euro.'),
    bfLogo(),
  );

  // ==================== SLIDE 8: CTA ====================
  const slide8 = h('div', {
    style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' }
  },
    badge('JETZT DU'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'32px' } },
      h('div', { style: { display:'flex', width:'80px', height:'5px', backgroundColor:C.red, borderRadius:'3px' } }),
      h('span', { style: { fontSize:'50px', fontWeight:800, color:'#FFFFFF', textAlign:'center',
        lineHeight:'1.2', textTransform:'uppercase', maxWidth:'880px' } },
        'HAST DU SCHON MAL DEINEN SCHUFA-SCORE GECHECKT?'),
      h('span', { style: { fontSize:'29px', fontWeight:500, color:C.textSoft, textAlign:'center',
        lineHeight:'1.5', maxWidth:'800px' } },
        'Schreib in die Kommentare: JA oder NEIN — und speicher diese Slides, damit du die 4 Schritte nicht vergisst.'),
      h('div', { style: { display:'flex', width:'80px', height:'5px', backgroundColor:C.accent, borderRadius:'3px' } }),
      h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'10px',
        backgroundColor:C.bgDark, borderRadius:'20px', padding:'28px 48px',
        border:`1px solid ${C.border}` } },
        h('span', { style: { fontSize:'22px', fontWeight:600, color:C.textMuted,
          letterSpacing:'2px', textTransform:'uppercase' } }, 'Folge uns für mehr'),
        h('span', { style: { fontSize:'34px', fontWeight:800, color:C.accent } }, '@benarofinanzen'),
        h('span', { style: { fontSize:'21px', fontWeight:500, color:C.textMuted,
          letterSpacing:'2px', textTransform:'uppercase' } }, 'Dein Finanzbegleiter'),
      ),
    ),
    bfLogo(),
  );

  // ==================== GENERATE ALL SLIDES ====================
  const today = new Date().toISOString().split('T')[0];
  const outputDir = path.join(__dirname, 'output', `carousel_${today}`, 'slides');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width:W, height:H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode:'width', value:W } });
    const pngData = resvg.render();
    const pngPath = path.join(outputDir, `slide-${String(i+1).padStart(2,'0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i+1}/${slides.length} done — ${pngPath}`);
  }

  console.log('All slides generated!');
}

main().catch(e => { console.error(e); process.exit(1); });
