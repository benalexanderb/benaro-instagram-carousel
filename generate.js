'use strict';
const fs   = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default;
  const { Resvg } = require('@resvg/resvg-js');

  // ── FONTS: latin + latin-ext für Umlaute ─────────────────────────────────
  const fontDir = '/tmp/workspace/node_modules/@fontsource/outfit/files';
  const fonts = [400,500,600,700,800].flatMap(w => [
    { name:'Outfit', weight:w, style:'normal',
      data: fs.readFileSync(`${fontDir}/outfit-latin-${w}-normal.woff`) },
    { name:'Outfit', weight:w, style:'normal',
      data: fs.readFileSync(`${fontDir}/outfit-latin-ext-${w}-normal.woff`) },
  ]);

  // ── LOGO ─────────────────────────────────────────────────────────────────
  const logoB64 = 'data:image/jpeg;base64,' +
    fs.readFileSync('/tmp/workspace/skills/instagram-carousel-skill/templates/benaro-logo.jpg')
      .toString('base64');

  // ── FARBEN (Benaro Finanzen Branding) ────────────────────────────────────
  const C = {
    bg:       '#001f60',
    text:     '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted:'#9CA3AF',
    cardBg:   'rgba(255,255,255,0.1)',
    border:   'rgba(255,255,255,0.2)',
    green:    '#10B981',
    red:      '#EF4444',
  };

  const W = 1080, H = 1350;

  // ── h()-HELPER ───────────────────────────────────────────────────────────
  const h = (type, props, ...ch) => ({
    type,
    props: {
      ...props,
      children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch,
    },
  });

  const outDir = '/tmp/workspace/output/carousel_2026-08-01/slides';
  fs.mkdirSync(outDir, { recursive: true });

  // ── KOMPONENTEN ──────────────────────────────────────────────────────────

  // Header-Zeile: Badge links, Logo rechts
  function mkHeader(badgeText) {
    return h('div', {
      style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px' },
    },
      h('span', {
        style: { display:'flex', fontSize:'21px', fontWeight:700, letterSpacing:'3px',
          color: C.text, backgroundColor: C.cardBg, padding:'10px 22px', borderRadius:'12px' },
      }, badgeText),
      h('img', { src: logoB64, width:110, height:110, style: { objectFit:'cover', borderRadius:'12px' } })
    );
  }

  function mkHeadline(text, size) {
    return h('span', {
      style: { display:'flex', fontSize:`${size || 64}px`, fontWeight:800, color: C.text,
        lineHeight:'1.08', letterSpacing:'-1.5px', marginBottom:'4px', marginTop:'16px' },
    }, text);
  }

  function mkSubline(text) {
    return h('span', {
      style: { display:'flex', fontSize:'27px', fontWeight:500, color: C.textMuted,
        lineHeight:'1.5', marginTop:'8px' },
    }, text);
  }

  function mkKeyLearning(text, accent) {
    return h('div', {
      style: { display:'flex', alignItems:'center', gap:'14px', backgroundColor: C.cardBg,
        borderRadius:'16px', padding:'20px 28px', marginTop:'10px' },
    },
      h('div', { style: { display:'flex', width:'6px', minHeight:'38px',
        backgroundColor: accent || C.text, borderRadius:'3px' } }),
      h('span', { style: { display:'flex', fontSize:'25px', fontWeight:600, color: C.text, lineHeight:'1.4' } }, text)
    );
  }

  function mkHandle() {
    return h('div', { style: { display:'flex', alignItems:'center', marginTop:'8px' } },
      h('span', { style: { display:'flex', fontSize:'23px', fontWeight:500, color: C.textMuted } }, '@benarofinanzen')
    );
  }

  // ── SLIDE 1: HOOK ────────────────────────────────────────────────────────
  // Thema: KI-ETFs 2026 — +47% oder Blase?
  const slide1 = h('div', {
    style: { display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit' },
  },
    mkHeader('HEUTIGES LEARNING'),
    mkHeadline('KI-ETFs 2026:', 68),
    mkHeadline('+47% oder Blase?', 68),
    mkSubline('Was du jetzt als Anleger wissen musst'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'22px' } },
      h('div', { style: { display:'flex', gap:'18px' } },
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center',
          justifyContent:'center', backgroundColor: C.cardBg, borderRadius:'22px', padding:'32px 18px',
          gap:'14px', border:'1px solid rgba(255,255,255,0.15)' } },
          h('span', { style: { display:'flex', fontSize:'56px', fontWeight:800, color: C.green } }, '+47%'),
          h('div', { style: { display:'flex', width:'40px', height:'4px', backgroundColor: C.green, borderRadius:'2px' } }),
          h('span', { style: { display:'flex', fontSize:'22px', fontWeight:600, color: C.textSoft, textAlign:'center' } }, 'KI-ETF Rendite\n12 Monate')
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center',
          justifyContent:'center', backgroundColor: C.cardBg, borderRadius:'22px', padding:'32px 18px',
          gap:'14px', border:'1px solid rgba(255,255,255,0.15)' } },
          h('span', { style: { display:'flex', fontSize:'56px', fontWeight:800, color: C.textSoft } }, '+14%'),
          h('div', { style: { display:'flex', width:'40px', height:'4px', backgroundColor: C.textSoft, borderRadius:'2px' } }),
          h('span', { style: { display:'flex', fontSize:'22px', fontWeight:600, color: C.textSoft, textAlign:'center' } }, 'MSCI World\n12 Monate')
        )
      ),
      h('div', { style: { display:'flex', alignItems:'center', justifyContent:'center', gap:'14px',
        backgroundColor:'rgba(239,68,68,0.1)', borderRadius:'16px', padding:'20px 26px',
        border:'1px solid rgba(239,68,68,0.2)' } },
        h('div', { style: { display:'flex', width:'12px', height:'12px', borderRadius:'6px', backgroundColor: C.red } }),
        h('span', { style: { display:'flex', fontSize:'25px', fontWeight:600, color: C.textSoft } },
          '38 Mrd. EUR frisch in KI-ETFs investiert')
      )
    ),
    mkKeyLearning('Swipen: Die ehrliche Analyse hinter den Zahlen'),
    mkHandle()
  );

  // ── SLIDE 2: KONTEXT — PERFORMANCE-BALKEN ────────────────────────────────
  const bars = [
    { label:'Global AI ETF (IQQQ)',   val:'+47%', pct:85, color: C.green },
    { label:'Nasdaq 100 ETF (EQQQ)',  val:'+28%', pct:55, color: C.textSoft },
    { label:'MSCI World (IWDA)',      val:'+14%', pct:28, color: C.textSoft },
    { label:'MSCI EM IMI (EIMI)',     val:'+9%',  pct:18, color: C.textSoft },
  ];

  const slide2 = h('div', {
    style: { display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit' },
  },
    mkHeader('DIE ZAHLEN'),
    mkHeadline('Was steckt hinter\ndem Hype?', 58),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'18px' } },
      h('div', { style: { display:'flex', justifyContent:'space-between', marginBottom:'6px' } },
        h('span', { style: { display:'flex', fontSize:'21px', fontWeight:600, color: C.textMuted } }, 'ETF / Vergleichsindex'),
        h('span', { style: { display:'flex', fontSize:'21px', fontWeight:600, color: C.textMuted } }, '12-Monats-Rendite 2026')
      ),
      ...bars.map(r =>
        h('div', { style: { display:'flex', flexDirection:'column', gap:'10px' } },
          h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center' } },
            h('span', { style: { display:'flex', fontSize:'26px', fontWeight:600, color: C.text } }, r.label),
            h('span', { style: { display:'flex', fontSize:'30px', fontWeight:800, color: r.color } }, r.val)
          ),
          h('div', { style: { display:'flex', height:'20px', backgroundColor:'rgba(255,255,255,0.1)',
            borderRadius:'8px', overflow:'hidden' } },
            h('div', { style: { display:'flex', width:`${r.pct}%`, height:'20px',
              backgroundColor: r.color, borderRadius:'8px' } })
          )
        )
      )
    ),
    mkKeyLearning('KI-ETFs schlagen den MSCI World um 33 Prozentpunkte — in nur 12 Monaten.'),
    mkHandle()
  );

  // ── SLIDE 3: PROBLEM — 3 FALLEN ──────────────────────────────────────────
  const fallen = [
    { num:'01', title:'Klumpenrisiko',     desc:'Oft 5-10 Aktien = 60% des gesamten ETFs' },
    { num:'02', title:'Hohe Kosten (TER)', desc:'Bis 0,65% p.a. — 3x mehr als beim MSCI World' },
    { num:'03', title:'Rückschlagrisiko',  desc:'Tech-Blase 2000: -82% Verlust in 30 Monaten' },
  ];

  const slide3 = h('div', {
    style: { display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit' },
  },
    mkHeader('ACHTUNG: RISIKEN'),
    mkHeadline('3 Fallen des\nKI-Hypes', 64),
    mkSubline('Was kaum jemand dir erzählt'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'22px' } },
      ...fallen.map(f =>
        h('div', { style: { display:'flex', alignItems:'center', gap:'22px',
          backgroundColor:'rgba(239,68,68,0.1)', borderRadius:'18px', padding:'26px 28px',
          border:'1px solid rgba(239,68,68,0.25)' } },
          h('span', { style: { display:'flex', fontSize:'36px', fontWeight:800, color: C.red, minWidth:'55px' } }, f.num),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'6px' } },
            h('span', { style: { display:'flex', fontSize:'28px', fontWeight:700, color: C.text } }, f.title),
            h('span', { style: { display:'flex', fontSize:'23px', fontWeight:500, color: C.textSoft } }, f.desc)
          )
        )
      )
    ),
    mkKeyLearning('Hohe Rendite kommt immer mit hohem Risiko. Immer.', C.red),
    mkHandle()
  );

  // ── SLIDE 4: ERWARTUNG vs. REALITÄT ──────────────────────────────────────
  const slide4 = h('div', {
    style: { display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit' },
  },
    mkHeader('WENDEPUNKT'),
    mkHeadline('Was du denkst —\nvs. was stimmt', 56),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      h('div', { style: { display:'flex', gap:'14px' } },
        // Links: Erwartung
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column',
          backgroundColor: C.cardBg, borderRadius:'20px', padding:'26px', gap:'14px',
          border:'1px solid rgba(255,255,255,0.15)' } },
          h('span', { style: { display:'flex', fontSize:'20px', fontWeight:700, letterSpacing:'3px', color: C.textMuted } }, 'ERWARTUNG'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor: C.border, borderRadius:'2px' } }),
          h('span', { style: { display:'flex', fontSize:'25px', fontWeight:600, color: C.textSoft, lineHeight:'1.5' } },
            '"KI ist die Zukunft — ich investiere alles dort"'),
          h('span', { style: { display:'flex', fontSize:'21px', fontWeight:500, color:'rgba(255,255,255,0.35)', lineHeight:'1.3' } },
            'Trend-Investing ohne Strategie')
        ),
        // Rechts: Realität (weiße Karte)
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column',
          backgroundColor:'rgba(255,255,255,0.95)', borderRadius:'20px', padding:'26px', gap:'14px' } },
          h('span', { style: { display:'flex', fontSize:'20px', fontWeight:700, letterSpacing:'3px', color:'rgba(0,31,97,0.55)' } }, 'REALITÄT'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(0,31,96,0.15)', borderRadius:'2px' } }),
          h('span', { style: { display:'flex', fontSize:'25px', fontWeight:600, color:'#001f60', lineHeight:'1.5' } },
            '"KI-ETF als Ergänzung — nicht als Ersatz für Core-Depot"'),
          h('span', { style: { display:'flex', fontSize:'21px', fontWeight:500, color:'rgba(0,31,96,0.5)', lineHeight:'1.3' } },
            'Strategie mit klarer Aufteilung')
        )
      ),
      h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'10px',
        backgroundColor:'rgba(16,185,129,0.1)', borderRadius:'16px', padding:'22px 28px',
        border:'1px solid rgba(16,185,129,0.25)' } },
        h('span', { style: { display:'flex', fontSize:'26px', fontWeight:700, color: C.green } }, 'Die Faustregel der Profis'),
        h('span', { style: { display:'flex', fontSize:'23px', fontWeight:500, color: C.textSoft, textAlign:'center', lineHeight:'1.4' } },
          'Max. 10-15% des Depots in Sektor-ETFs investieren')
      )
    ),
    mkKeyLearning('Wer alles auf KI setzt, riskiert alles auf eine einzige Karte.'),
    mkHandle()
  );

  // ── SLIDE 5: LÖSUNG — CORE & SATELLITE ───────────────────────────────────
  const slide5 = h('div', {
    style: { display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit' },
  },
    mkHeader('DIE LÖSUNG'),
    mkHeadline('Das KI-Depot\nder Profis', 62),
    mkSubline('Core & Satellite — die bewährte Methode'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      // CORE (85%)
      h('div', { style: { display:'flex', alignItems:'center', gap:'22px',
        backgroundColor: C.cardBg, borderRadius:'18px', padding:'26px 28px',
        border:'2px solid rgba(16,185,129,0.45)' } },
        h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          backgroundColor: C.green, borderRadius:'14px', width:'78px', height:'78px', minWidth:'78px' } },
          h('span', { style: { display:'flex', fontSize:'28px', fontWeight:800, color:'#FFFFFF' } }, '85%')
        ),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'6px' } },
          h('span', { style: { display:'flex', fontSize:'27px', fontWeight:700, color: C.text } }, 'CORE: MSCI World / 3-ETF-Depot'),
          h('span', { style: { display:'flex', fontSize:'22px', fontWeight:500, color: C.textSoft } }, 'Breite Diversifikation, 0,20% TER, langfristig stabil')
        )
      ),
      h('div', { style: { display:'flex', justifyContent:'center', paddingTop:'4px', paddingBottom:'4px' } },
        h('span', { style: { display:'flex', fontSize:'36px', fontWeight:700, color:'rgba(255,255,255,0.22)' } }, '+')
      ),
      // SATELLITE (15%)
      h('div', { style: { display:'flex', alignItems:'center', gap:'22px',
        backgroundColor: C.cardBg, borderRadius:'18px', padding:'26px 28px',
        border:'1px solid rgba(255,255,255,0.15)' } },
        h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          backgroundColor:'rgba(255,255,255,0.2)', borderRadius:'14px', width:'78px', height:'78px', minWidth:'78px' } },
          h('span', { style: { display:'flex', fontSize:'28px', fontWeight:800, color:'#FFFFFF' } }, '15%')
        ),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'6px' } },
          h('span', { style: { display:'flex', fontSize:'27px', fontWeight:700, color: C.text } }, 'SATELLITE: KI- / Tech-ETF'),
          h('span', { style: { display:'flex', fontSize:'22px', fontWeight:500, color: C.textSoft } }, 'Renditechance, höhere Kosten, aktiv beobachten')
        )
      ),
      h('div', { style: { display:'flex', alignItems:'center', justifyContent:'center', gap:'12px',
        backgroundColor:'rgba(255,255,255,0.05)', borderRadius:'14px', padding:'18px 24px' } },
        h('span', { style: { display:'flex', fontSize:'24px', fontWeight:700, color: C.textSoft, textAlign:'center' } },
          'Ergebnis: Renditechance + stabiler Sicherheitsanker')
      )
    ),
    mkKeyLearning('85% Core + 15% Satellite = smarte KI-Strategie ohne Klumpenrisiko'),
    mkHandle()
  );

  // ── SLIDE 6: RECHENBEISPIEL ───────────────────────────────────────────────
  const slide6 = h('div', {
    style: { display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit' },
  },
    mkHeader('RECHENBEISPIEL'),
    mkHeadline('100 EUR/Monat\nüber 20 Jahre', 58),
    mkSubline('Was der Unterschied wirklich kostet'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      h('div', { style: { display:'flex', gap:'14px' } },
        // NUR KI-ETF
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center',
          backgroundColor:'rgba(239,68,68,0.08)', borderRadius:'20px', padding:'28px 16px', gap:'14px',
          border:'1px solid rgba(239,68,68,0.2)' } },
          h('span', { style: { display:'flex', fontSize:'18px', fontWeight:700, letterSpacing:'2px', color: C.red } }, 'NUR KI-ETF'),
          h('span', { style: { display:'flex', fontSize:'52px', fontWeight:800, color: C.text, lineHeight:'1.0' } }, '62.000'),
          h('span', { style: { display:'flex', fontSize:'21px', fontWeight:500, color: C.textSoft } }, 'EUR (Ø 10% p.a.)'),
          h('div', { style: { display:'flex', width:'75%', height:'3px', backgroundColor:'rgba(239,68,68,0.3)', borderRadius:'2px' } }),
          h('span', { style: { display:'flex', fontSize:'21px', fontWeight:500, color: C.red, textAlign:'center', lineHeight:'1.4' } },
            'Risiko: -65%\nmöglich bei Crash')
        ),
        // 85/15 METHODE
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center',
          backgroundColor:'rgba(16,185,129,0.08)', borderRadius:'20px', padding:'28px 16px', gap:'14px',
          border:'2px solid rgba(16,185,129,0.3)' } },
          h('span', { style: { display:'flex', fontSize:'18px', fontWeight:700, letterSpacing:'2px', color: C.green } }, '85/15 METHODE'),
          h('span', { style: { display:'flex', fontSize:'52px', fontWeight:800, color: C.text, lineHeight:'1.0' } }, '55.000'),
          h('span', { style: { display:'flex', fontSize:'21px', fontWeight:500, color: C.textSoft } }, 'EUR (Ø 8,5% p.a.)'),
          h('div', { style: { display:'flex', width:'75%', height:'3px', backgroundColor:'rgba(16,185,129,0.3)', borderRadius:'2px' } }),
          h('span', { style: { display:'flex', fontSize:'21px', fontWeight:500, color: C.green, textAlign:'center', lineHeight:'1.4' } },
            'Crash-Schutz:\nmax. -30% Verlust')
        )
      ),
      h('div', { style: { display:'flex', alignItems:'center', justifyContent:'center',
        backgroundColor: C.cardBg, borderRadius:'14px', padding:'18px 22px' } },
        h('span', { style: { display:'flex', fontSize:'23px', fontWeight:600, color: C.textSoft, textAlign:'center', lineHeight:'1.5' } },
          '7.000 EUR mehr oder deutlich weniger Risiko — beides ist eine Entscheidung.')
      )
    ),
    mkKeyLearning('Rendite und Risiko gemeinsam optimieren — nie nur die Rendite maximieren.'),
    mkHandle()
  );

  // ── SLIDE 7: TAKEAWAYS ───────────────────────────────────────────────────
  const learnings = [
    { num:'01', text:'KI-ETFs bieten Renditechance — kein Ersatz für das breite Core-Depot', pct:25 },
    { num:'02', text:'Max. 10-15% in Sektor-ETFs — der Rest gehört in den MSCI World', pct:50 },
    { num:'03', text:'TER vergleichen: KI-ETF bis 0,65% vs. 0,20% beim MSCI World', pct:75 },
    { num:'04', text:'Core & Satellite: Stabilität + Rendite-Turbo als smarte Mischung', pct:100 },
  ];

  const slide7 = h('div', {
    style: { display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit' },
  },
    mkHeader('DEINE 4 LEARNINGS'),
    mkHeadline('Was du jetzt\nmitnimmst', 60),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'14px' } },
      ...learnings.map(l =>
        h('div', { style: { display:'flex', flexDirection:'column', gap:'10px',
          padding:'18px 24px', backgroundColor: C.cardBg, borderRadius:'18px' } },
          h('div', { style: { display:'flex', alignItems:'center', gap:'16px' } },
            h('span', { style: { display:'flex', fontSize:'36px', fontWeight:800,
              color: l.pct === 100 ? C.green : C.text, minWidth:'55px' } }, l.num),
            h('span', { style: { display:'flex', fontSize:'23px', fontWeight:600, color: C.text, lineHeight:'1.3' } }, l.text)
          ),
          h('div', { style: { display:'flex', height:'6px', backgroundColor:'rgba(255,255,255,0.12)', borderRadius:'3px', overflow:'hidden' } },
            h('div', { style: { display:'flex', width:`${l.pct}%`, height:'6px',
              backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius:'3px' } })
          )
        )
      )
    ),
    mkHandle()
  );

  // ── SLIDE 8: CTA ─────────────────────────────────────────────────────────
  const slide8 = h('div', {
    style: { display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit' },
  },
    mkHeader('UND JETZT DU'),
    mkHeadline('Nutzt du schon\nKI-ETFs?', 62),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'28px' } },
      h('div', { style: { display:'flex', gap:'14px', width:'100%' } },
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center',
          justifyContent:'center', backgroundColor: C.cardBg, borderRadius:'18px', padding:'30px', gap:'12px' } },
          h('span', { style: { display:'flex', fontSize:'46px', fontWeight:800, color: C.green } }, 'JA'),
          h('span', { style: { display:'flex', fontSize:'22px', fontWeight:600, color: C.textSoft, textAlign:'center' } },
            'Schreib "KI" in\ndie Kommentare')
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center',
          justifyContent:'center', backgroundColor: C.cardBg, borderRadius:'18px', padding:'30px', gap:'12px' } },
          h('span', { style: { display:'flex', fontSize:'46px', fontWeight:800, color: C.textSoft } }, 'NEIN'),
          h('span', { style: { display:'flex', fontSize:'22px', fontWeight:600, color: C.textSoft, textAlign:'center' } },
            'Schreib "MSCI" in\ndie Kommentare')
        )
      ),
      h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'14px', width:'100%' } },
        h('span', { style: { display:'flex', fontSize:'29px', fontWeight:700, color: C.text, textAlign:'center', lineHeight:'1.45' } },
          'Folge @benarofinanzen für\nmehr Wissen rund um ETFs & Finanzen'),
        h('span', { style: { display:'flex', fontSize:'25px', fontWeight:500, color:'rgba(255,255,255,0.45)', textAlign:'center' } },
          'Speichern nicht vergessen')
      ),
      h('img', { src: logoB64, width:120, height:120, style: { objectFit:'cover', borderRadius:'14px' } })
    ),
    mkHandle()
  );

  // ── GENERIEREN ───────────────────────────────────────────────────────────
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode:'width', value: W } });
    const pngData = resvg.render();
    const pngPath = `${outDir}/slide-${String(i + 1).padStart(2, '0')}.png`;
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} fertig: ${pngPath}`);
  }
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
