const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default || require('satori');
  const { Resvg } = require('@resvg/resvg-js');

  const fontDir = path.join(__dirname, 'node_modules/@fontsource/outfit/files');
  const fonts = [400,500,600,700,800].flatMap(w => [
    { name:'Outfit', weight:w, style:'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-${w}-normal.woff`)) },
    { name:'Outfit', weight:w, style:'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-ext-${w}-normal.woff`)) },
  ]);

  const C = {
    bg: '#001f60',
    text: '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted: '#9CA3AF',
    cardBg: 'rgba(255,255,255,0.1)',
    border: 'rgba(255,255,255,0.2)',
    green: '#10B981',
    red: '#EF4444',
  };

  const W = 1080, H = 1350;

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')
  ).toString('base64');

  const h = (type, props, ...ch) => ({
    type, props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function badge(text) {
    return h('div', { style: { display:'flex', marginBottom:'16px' } },
      h('span', { style: {
        display:'flex', fontSize:'22px', fontWeight:700, letterSpacing:'3px',
        color: C.text, backgroundColor: C.cardBg,
        padding:'10px 22px', borderRadius:'12px'
      } }, text)
    );
  }

  function headline(text, size=64) {
    return h('span', { style: {
      fontSize:`${size}px`, fontWeight:800,
      color: C.text,
      lineHeight:'1.08', letterSpacing:'-1.5px', marginBottom:'6px'
    } }, text);
  }

  function subline(text) {
    return h('span', { style: {
      fontSize:'28px', fontWeight:500,
      color: C.textMuted,
      lineHeight:'1.5', marginTop:'8px'
    } }, text);
  }

  function keyLearning(text, accent) {
    return h('div', { style: {
      display:'flex', alignItems:'center', gap:'14px',
      backgroundColor: C.cardBg,
      borderRadius:'16px', padding:'22px 28px', marginTop:'auto'
    } },
      h('div', { style: {
        display:'flex', width:'6px', minHeight:'40px',
        backgroundColor: accent || C.text, borderRadius:'3px'
      } }),
      h('span', { style: {
        fontSize:'28px', fontWeight:600,
        color: C.text, lineHeight:'1.4'
      } }, text)
    );
  }

  function footer(handle) {
    return h('div', { style: { display:'flex', alignItems:'center', marginTop:'16px' } },
      h('span', { style: {
        fontSize:'24px', fontWeight:500,
        color: C.textMuted
      } }, handle || '@benarofinanzen')
    );
  }

  function logoImg() {
    return h('img', { src: logoB64, width:120, height:120, style: {
      borderRadius:'12px', objectFit:'cover'
    } });
  }

  function topBar(badgeText) {
    return h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0px' } },
      badge(badgeText),
      logoImg()
    );
  }

  // ─────────────────────────────────────────────────
  // SLIDE 1 — Hook: Timing-Problem
  // ─────────────────────────────────────────────────
  const slide1 = h('div', { style: {
    display:'flex', flexDirection:'column',
    width:W, height:H, padding:'70px',
    backgroundColor: C.bg, fontFamily:'Outfit'
  } },
    topBar('DAS TIMING-PROBLEM'),

    h('span', { style: {
      fontSize:'68px', fontWeight:800,
      color: C.text,
      lineHeight:'1.05', letterSpacing:'-2px', marginBottom:'10px', marginTop:'24px'
    } }, 'Den perfekten Zeitpunkt abzuwarten kostet dich 42.000 €'),

    h('div', { style: {
      display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'24px'
    } },
      h('div', { style: {
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        backgroundColor: C.cardBg, borderRadius:'24px', padding:'48px 40px', gap:'12px'
      } },
        h('span', { style: {
          fontSize:'140px', fontWeight:800,
          color: C.red,
          lineHeight:'1', letterSpacing:'-4px'
        } }, '42.000 €'),
        h('span', { style: {
          fontSize:'30px', fontWeight:600,
          color: C.textSoft,
          lineHeight:'1.4', textAlign:'center'
        } }, 'verschenkter Gewinn durch Warten auf den richtigen Moment')
      ),
      h('div', { style: {
        display:'flex', gap:'16px'
      } },
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', alignItems:'center', gap:'8px',
          backgroundColor: 'rgba(239,68,68,0.12)', borderRadius:'16px', padding:'24px'
        } },
          h('span', { style: { fontSize:'40px', fontWeight:800, color: C.red } }, '75 %'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted, textAlign:'center' } }, 'warten auf Einbruch')
        ),
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', alignItems:'center', gap:'8px',
          backgroundColor: 'rgba(16,185,129,0.12)', borderRadius:'16px', padding:'24px'
        } },
          h('span', { style: { fontSize:'40px', fontWeight:800, color: C.green } }, '7 % p.a.'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted, textAlign:'center' } }, 'Rendite entgeht dir')
        )
      )
    ),

    keyLearning('Es gibt eine Strategie, die das Timing-Problem komplett löst.'),
    footer()
  );

  // ─────────────────────────────────────────────────
  // SLIDE 2 — Problem: Warten vs. Investieren (Chart)
  // ─────────────────────────────────────────────────
  const chartSvg2 = `<svg width="940" height="260" viewBox="0 0 940 260" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#10B981" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#10B981" stop-opacity="0.0"/>
      </linearGradient>
      <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#EF4444" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#EF4444" stop-opacity="0.0"/>
      </linearGradient>
    </defs>
    <path d="M60,230 C120,220 160,200 200,170 C250,135 300,105 350,78 C400,52 450,32 500,20 C550,10 600,8 650,12 C700,16 750,22 800,28 C850,34 890,38 920,40" fill="none" stroke="#10B981" stroke-width="4"/>
    <path d="M60,230 C120,220 160,200 200,170 C250,135 300,105 350,78 C400,52 450,32 500,20 C550,10 600,8 650,12 C700,16 750,22 800,28 C850,34 890,38 920,40 L920,260 L60,260 Z" fill="url(#g1)"/>
    <path d="M60,230 C120,228 200,226 300,225 C400,224 500,224 600,225 C700,226 800,228 920,230" fill="none" stroke="#EF4444" stroke-width="4" stroke-dasharray="10,6"/>
    <path d="M60,230 C120,228 200,226 300,225 C400,224 500,224 600,225 C700,226 800,228 920,230 L920,260 L60,260 Z" fill="url(#g2)"/>
    <circle cx="920" cy="40" r="8" fill="#10B981"/>
    <circle cx="920" cy="230" r="8" fill="#EF4444"/>
    <line x1="60" y1="10" x2="60" y2="250" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
    <line x1="60" y1="250" x2="940" y2="250" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
  </svg>`;
  const chartSrc2 = `data:image/svg+xml;base64,${Buffer.from(chartSvg2).toString('base64')}`;

  const slide2 = h('div', { style: {
    display:'flex', flexDirection:'column',
    width:W, height:H, padding:'70px',
    backgroundColor: C.bg, fontFamily:'Outfit'
  } },
    topBar('DIE REALITÄT'),

    headline('Wer wartet, verliert — egal wann der Markt steht', 56),
    subline('Vergleich: Monatlich investieren vs. auf den richtigen Zeitpunkt warten'),

    h('div', { style: {
      display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px'
    } },
      h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'4px' } },
        h('span', { style: { fontSize:'24px', fontWeight:700, color: C.green, letterSpacing:'2px' } }, 'MONATLICHER SPARPLAN'),
        h('span', { style: { fontSize:'24px', fontWeight:700, color: C.red, letterSpacing:'2px' } }, 'AUF TIMING WARTEN')
      ),
      h('img', { src: chartSrc2, width:940, height:260, style:{ objectFit:'contain' } }),
      h('div', { style: { display:'flex', justifyContent:'space-between', marginTop:'4px' } },
        h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted } }, 'Heute'),
        h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted } }, '10 Jahre')
      ),
      h('div', { style: {
        display:'flex', gap:'16px', marginTop:'8px'
      } },
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'6px',
          backgroundColor: 'rgba(16,185,129,0.1)', borderRadius:'16px', padding:'24px'
        } },
          h('span', { style: { fontSize:'38px', fontWeight:800, color: C.green } }, '+93.000 €'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted } }, '200 €/Monat, 10 Jahre')
        ),
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'6px',
          backgroundColor: 'rgba(239,68,68,0.1)', borderRadius:'16px', padding:'24px'
        } },
          h('span', { style: { fontSize:'38px', fontWeight:800, color: C.red } }, '+51.000 €'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted } }, 'Einmalanlage, perfektes Timing')
        )
      )
    ),

    keyLearning('Kein Mensch kennt den perfekten Einstiegszeitpunkt — nicht mal Profis.'),
    footer()
  );

  // ─────────────────────────────────────────────────
  // SLIDE 3 — Konsequenz: Was Warten wirklich kostet
  // ─────────────────────────────────────────────────
  const years = [
    { label:'1 Jahr', loss:'4.200 €', pct:10 },
    { label:'3 Jahre', loss:'13.600 €', pct:32 },
    { label:'5 Jahre', loss:'24.500 €', pct:58 },
    { label:'10 Jahre', loss:'42.000 €', pct:100 },
  ];

  const slide3 = h('div', { style: {
    display:'flex', flexDirection:'column',
    width:W, height:H, padding:'70px',
    backgroundColor: C.bg, fontFamily:'Outfit'
  } },
    topBar('DER ZINSESZINS-VERLUST'),

    headline('Jedes Jahr Warten kostet dich mehr', 60),
    subline('Entgangener Gewinn bei 200 €/Monat und 7 % p.a. Rendite'),

    h('div', { style: {
      display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'18px'
    } },
      ...years.map(y =>
        h('div', { style: {
          display:'flex', flexDirection:'column', gap:'10px',
          backgroundColor: C.cardBg, borderRadius:'18px', padding:'24px 28px'
        } },
          h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center' } },
            h('span', { style: { fontSize:'30px', fontWeight:700, color: C.textSoft } }, y.label),
            h('span', { style: { fontSize:'30px', fontWeight:800, color: C.red } }, `- ${y.loss}`)
          ),
          h('div', { style: { display:'flex', height:'8px', backgroundColor:'rgba(255,255,255,0.1)', borderRadius:'4px', overflow:'hidden' } },
            h('div', { style: { display:'flex', width:`${y.pct}%`, height:'8px', backgroundColor: C.red, borderRadius:'4px' } })
          )
        )
      )
    ),

    keyLearning('Wer 10 Jahre zu spät startet, verliert 42.000 € — kein Einbruch holt das auf.', C.red),
    footer()
  );

  // ─────────────────────────────────────────────────
  // SLIDE 4 — Wendepunkt: Was ist DCA?
  // ─────────────────────────────────────────────────
  const slide4 = h('div', { style: {
    display:'flex', flexDirection:'column',
    width:W, height:H, padding:'70px',
    backgroundColor: C.bg, fontFamily:'Outfit'
  } },
    topBar('DIE LÖSUNG'),

    headline('Dollar-Cost-Averaging: Jeden Monat — egal wie der Markt steht', 54),

    h('div', { style: {
      display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px'
    } },
      h('div', { style: { display:'flex', gap:'16px' } },
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'12px',
          backgroundColor: 'rgba(239,68,68,0.08)', borderRadius:'20px', padding:'30px',
          borderWidth:'1px', borderStyle:'solid', borderColor:'rgba(239,68,68,0.2)'
        } },
          h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color: C.red } }, 'TIMING-STRATEGIE'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(239,68,68,0.2)', borderRadius:'2px' } }),
          h('span', { style: { fontSize:'26px', fontWeight:600, color: C.textSoft, lineHeight:'1.4' } }, 'Warten auf den richtigen Einbruch'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted, lineHeight:'1.4' } }, 'Ergebnis: Paralysiert, kein Invest'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted, lineHeight:'1.4' } }, 'Stress durch Marktbeobachtung'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted, lineHeight:'1.4' } }, 'Meist schlechter als DCA')
        ),
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'12px',
          backgroundColor: 'rgba(16,185,129,0.08)', borderRadius:'20px', padding:'30px',
          borderWidth:'1px', borderStyle:'solid', borderColor:'rgba(16,185,129,0.2)'
        } },
          h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color: C.green } }, 'DCA-STRATEGIE'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(16,185,129,0.2)', borderRadius:'2px' } }),
          h('span', { style: { fontSize:'26px', fontWeight:600, color: C.text, lineHeight:'1.4' } }, 'Jeden Monat fester Betrag'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textSoft, lineHeight:'1.4' } }, 'Automatisch — kein Stress'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textSoft, lineHeight:'1.4' } }, 'Schlägt Timing in 80 % der Fälle')
        )
      ),

      h('div', { style: {
        display:'flex', alignItems:'center', gap:'16px',
        backgroundColor: C.cardBg, borderRadius:'16px', padding:'24px 28px'
      } },
        h('div', { style: {
          display:'flex', width:'52px', height:'52px', borderRadius:'50%',
          backgroundColor: 'rgba(16,185,129,0.15)', alignItems:'center', justifyContent:'center',
          flexShrink:'0'
        } },
          h('div', { style: { width:'24px', height:'24px', borderRadius:'50%', backgroundColor: C.green } })
        ),
        h('span', { style: { fontSize:'28px', fontWeight:600, color: C.textSoft, lineHeight:'1.4' } },
          'Statt dem perfekten Zeitpunkt brauchst du nur einen automatischen Dauerauftrag.')
      )
    ),

    keyLearning('DCA eliminiert das Timing-Problem vollständig — durch Disziplin statt Glück.'),
    footer()
  );

  // ─────────────────────────────────────────────────
  // SLIDE 5 — Beweis: So funktioniert DCA in der Praxis
  // ─────────────────────────────────────────────────
  const months = [
    { monat:'Jan', preis:100, anteile:2.0 },
    { monat:'Feb', preis:80, anteile:2.5 },
    { monat:'Mär', preis:120, anteile:1.67 },
    { monat:'Apr', preis:60, anteile:3.33 },
    { monat:'Mai', preis:90, anteile:2.22 },
    { monat:'Jun', preis:110, anteile:1.82 },
  ];

  const slide5 = h('div', { style: {
    display:'flex', flexDirection:'column',
    width:W, height:H, padding:'70px',
    backgroundColor: C.bg, fontFamily:'Outfit'
  } },
    topBar('DCA IN DER PRAXIS'),

    headline('Günstig kaufst du mehr Anteile, teuer weniger', 56),
    subline('200 € monatlich — der Markt entscheidet, wie viele Anteile du bekommst'),

    h('div', { style: {
      display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'14px'
    } },
      h('div', { style: { display:'flex', gap:'8px', marginBottom:'4px' } },
        h('span', { style: { flex:'1', fontSize:'22px', fontWeight:700, color: C.textMuted, letterSpacing:'1px' } }, 'MONAT'),
        h('span', { style: { width:'140px', fontSize:'22px', fontWeight:700, color: C.textMuted, letterSpacing:'1px', textAlign:'right' } }, 'KURS'),
        h('span', { style: { width:'160px', fontSize:'22px', fontWeight:700, color: C.textMuted, letterSpacing:'1px', textAlign:'right' } }, 'ANTEILE')
      ),
      ...months.map((m, i) => {
        const isCheap = m.preis <= 80;
        const isExp = m.preis >= 110;
        return h('div', { style: {
          display:'flex', alignItems:'center', gap:'8px',
          backgroundColor: isCheap ? 'rgba(16,185,129,0.1)' : isExp ? 'rgba(239,68,68,0.06)' : C.cardBg,
          borderRadius:'14px', padding:'18px 24px'
        } },
          h('span', { style: { flex:'1', fontSize:'28px', fontWeight:700, color: C.textSoft } }, m.monat),
          h('span', { style: { width:'140px', fontSize:'28px', fontWeight:600, color: isExp ? C.red : isCheap ? C.green : C.textSoft, textAlign:'right' } }, `${m.preis} €`),
          h('span', { style: { width:'160px', fontSize:'28px', fontWeight:800, color: isCheap ? C.green : C.textSoft, textAlign:'right' } }, `${m.anteile.toFixed(2)}`)
        );
      }),
      h('div', { style: {
        display:'flex', justifyContent:'space-between', alignItems:'center',
        backgroundColor: 'rgba(16,185,129,0.12)', borderRadius:'14px', padding:'18px 24px', marginTop:'8px'
      } },
        h('span', { style: { fontSize:'28px', fontWeight:700, color: C.green } }, 'Durchschnittspreis'),
        h('span', { style: { fontSize:'30px', fontWeight:800, color: C.green } }, '93,33 € statt 110 €')
      )
    ),

    keyLearning('Der tiefe Einbruch im April war kein Risiko — er war ein Geschenk.'),
    footer()
  );

  // ─────────────────────────────────────────────────
  // SLIDE 6 — Prinzip: Langfristiger Wachstumsbeweis
  // ─────────────────────────────────────────────────
  const growthSvg = `<svg width="940" height="280" viewBox="0 0 940 280" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gGreen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#10B981" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#10B981" stop-opacity="0.0"/>
      </linearGradient>
    </defs>
    <path d="M60,260 C100,255 140,248 200,235 C280,215 340,195 400,170 C460,145 510,118 560,88 C610,60 660,38 720,25 C780,14 850,10 920,10" fill="none" stroke="#10B981" stroke-width="5"/>
    <path d="M60,260 C100,255 140,248 200,235 C280,215 340,195 400,170 C460,145 510,118 560,88 C610,60 660,38 720,25 C780,14 850,10 920,10 L920,280 L60,280 Z" fill="url(#gGreen)"/>
    <circle cx="200" cy="235" r="7" fill="#10B981"/>
    <circle cx="400" cy="170" r="7" fill="#10B981"/>
    <circle cx="600" cy="75" r="7" fill="#10B981"/>
    <circle cx="920" cy="10" r="10" fill="#10B981"/>
    <line x1="60" y1="20" x2="60" y2="270" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <line x1="60" y1="270" x2="940" y2="270" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  </svg>`;
  const growthSrc = `data:image/svg+xml;base64,${Buffer.from(growthSvg).toString('base64')}`;

  const slide6 = h('div', { style: {
    display:'flex', flexDirection:'column',
    width:W, height:H, padding:'70px',
    backgroundColor: C.bg, fontFamily:'Outfit'
  } },
    topBar('DER ZINSESZINS-EFFEKT'),

    headline('200 € monatlich: Was aus 24.000 € Einzahlung wird', 56),

    h('div', { style: {
      display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px'
    } },
      h('div', { style: {
        display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'4px'
      } },
        h('div', { style: { display:'flex', flexDirection:'column' } },
          h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted } }, 'Heute'),
          h('span', { style: { fontSize:'30px', fontWeight:700, color: C.textSoft } }, '0 €')
        ),
        h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center' } },
          h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted } }, '5 Jahre'),
          h('span', { style: { fontSize:'30px', fontWeight:700, color: C.textSoft } }, '14.400 €')
        ),
        h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center' } },
          h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted } }, '10 Jahre'),
          h('span', { style: { fontSize:'30px', fontWeight:700, color: C.green } }, '34.600 €')
        ),
        h('div', { style: { display:'flex', flexDirection:'column', alignItems:'flex-end' } },
          h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted } }, '20 Jahre'),
          h('span', { style: { fontSize:'34px', fontWeight:800, color: C.green } }, '104.000 €')
        )
      ),
      h('img', { src: growthSrc, width:940, height:280, style:{ objectFit:'contain' } }),

      h('div', { style: { display:'flex', gap:'16px', marginTop:'4px' } },
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', alignItems:'center', gap:'6px',
          backgroundColor: C.cardBg, borderRadius:'16px', padding:'22px'
        } },
          h('span', { style: { fontSize:'36px', fontWeight:800, color: C.text } }, '48.000 €'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted } }, 'eingezahlt (20 J.)')
        ),
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', alignItems:'center', gap:'6px',
          backgroundColor: 'rgba(16,185,129,0.12)', borderRadius:'16px', padding:'22px'
        } },
          h('span', { style: { fontSize:'36px', fontWeight:800, color: C.green } }, '+56.000 €'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted } }, 'Zinseszins-Gewinn')
        )
      )
    ),

    keyLearning('Die Einzahlung macht 46 % aus — der Zinseszins die anderen 54 %.'),
    footer()
  );

  // ─────────────────────────────────────────────────
  // SLIDE 7 — Learnings: 4 DCA-Regeln
  // ─────────────────────────────────────────────────
  const learnings = [
    { num:'01', text:'Fixen Betrag wählen, den du jeden Monat problemlos entbehren kannst', pct:25 },
    { num:'02', text:'Dauerauftrag einrichten — vollautomatisch, kein manuelles Handeln', pct:50 },
    { num:'03', text:'Einbrüche aussitzen, nie in Panik verkaufen — Zeit ist dein Vorteil', pct:75 },
    { num:'04', text:'Betrag jährlich erhöhen, wenn Gehalt steigt — der Zinseszins dankt es dir', pct:100 },
  ];

  const slide7 = h('div', { style: {
    display:'flex', flexDirection:'column',
    width:W, height:H, padding:'70px',
    backgroundColor: C.bg, fontFamily:'Outfit'
  } },
    topBar('DEINE TAKEAWAYS'),

    headline('4 Regeln für deinen DCA-Sparplan', 60),

    h('div', { style: {
      display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px'
    } },
      ...learnings.map(l =>
        h('div', { style: {
          display:'flex', flexDirection:'column', gap:'10px',
          padding:'22px 26px',
          backgroundColor: C.cardBg, borderRadius:'18px'
        } },
          h('div', { style: { display:'flex', alignItems:'center', gap:'18px' } },
            h('span', { style: {
              fontSize:'38px', fontWeight:800,
              color: l.pct === 100 ? C.green : C.text,
              minWidth:'56px'
            } }, l.num),
            h('span', { style: {
              fontSize:'26px', fontWeight:600,
              color: C.text, lineHeight:'1.3'
            } }, l.text)
          ),
          h('div', { style: { display:'flex', height:'6px', backgroundColor:'rgba(255,255,255,0.1)', borderRadius:'3px', overflow:'hidden' } },
            h('div', { style: { display:'flex', width:`${l.pct}%`, height:'6px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius:'3px' } })
          )
        )
      )
    ),

    keyLearning('Wer diese 4 Regeln befolgt, schlägt 90 % aller aktiven Anleger.'),
    footer()
  );

  // ─────────────────────────────────────────────────
  // SLIDE 8 — CTA
  // ─────────────────────────────────────────────────
  const slide8 = h('div', { style: {
    display:'flex', flexDirection:'column',
    width:W, height:H, padding:'70px',
    backgroundColor: C.bg, fontFamily:'Outfit'
  } },
    h('div', { style: { display:'flex', justifyContent:'flex-end' } },
      logoImg()
    ),

    h('div', { style: {
      display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'32px'
    } },
      h('div', { style: {
        display:'flex', alignItems:'center', gap:'16px',
        backgroundColor: C.cardBg, borderRadius:'16px', padding:'18px 28px'
      } },
        h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'3px', color: C.textMuted } }, 'JETZT STARTEN')
      ),

      h('span', { style: {
        fontSize:'62px', fontWeight:800,
        color: C.text,
        lineHeight:'1.1', letterSpacing:'-2px', textAlign:'center'
      } }, 'Hast du bereits einen Sparplan?'),

      h('span', { style: {
        fontSize:'30px', fontWeight:500,
        color: C.textMuted,
        lineHeight:'1.5', textAlign:'center', maxWidth:'800px'
      } }, 'Schreib \"SPARPLAN\" in die Kommentare — wir helfen dir beim richtigen Setup.'),

      h('div', { style: {
        display:'flex', flexDirection:'column', alignItems:'center', gap:'16px',
        backgroundColor: 'rgba(16,185,129,0.1)', borderRadius:'20px', padding:'32px 40px',
        borderWidth:'1px', borderStyle:'solid', borderColor:'rgba(16,185,129,0.2)'
      } },
        h('span', { style: { fontSize:'28px', fontWeight:600, color: C.green, lineHeight:'1.5', textAlign:'center' } },
          'Speichere diese Slides — damit du sie jederzeit\nwieder abrufen kannst.'),
      )
    ),

    h('div', { style: { display:'flex', justifyContent:'center', marginBottom:'8px' } },
      h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted } }, '@benarofinanzen')
    )
  );

  // ─────────────────────────────────────────────────
  // RENDER ALL SLIDES
  // ─────────────────────────────────────────────────
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  const outputDir = path.join(__dirname, 'output/carousel_2026-11-17/slides');

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outputDir, `slide-${String(i+1).padStart(2,'0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i+1}/${slides.length} generiert: ${pngPath}`);
  }
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
