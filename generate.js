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

  const logoPath = path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg');
  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(logoPath).toString('base64');

  const C = {
    bg:      '#001f60',
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

  // ─── Reusable Components ───────────────────────────────────────────────────

  function topRow(badgeText) {
    return h('div', { style: { display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'28px' } },
      h('span', { style: {
        display:'flex', fontSize:'22px', fontWeight:700, letterSpacing:'3px',
        color: C.text, backgroundColor: C.cardBg,
        padding:'10px 22px', borderRadius:'12px', alignSelf:'flex-start',
      } }, badgeText),
      h('img', { src: logoB64, width: 120, height: 120, style: { borderRadius:'12px', objectFit:'cover', flexShrink:'0' } }),
    );
  }

  function headlineEl(text, size) {
    return h('span', { style: {
      fontSize:`${size || 62}px`, fontWeight:800, color: C.text,
      lineHeight:'1.08', letterSpacing:'-1.5px', marginBottom:'8px',
    } }, text);
  }

  function sublineEl(text) {
    return h('span', { style: {
      fontSize:'26px', fontWeight:500, color: C.textMuted,
      lineHeight:'1.5', marginTop:'4px', marginBottom:'8px',
    } }, text);
  }

  function keyLearningEl(text, accentColor) {
    return h('div', { style: {
      display:'flex', alignItems:'center', gap:'14px',
      backgroundColor: C.cardBg, borderRadius:'16px', padding:'22px 28px', marginTop:'20px',
    } },
      h('div', { style: {
        display:'flex', width:'6px', minHeight:'40px',
        backgroundColor: accentColor || C.text, borderRadius:'3px', flexShrink:'0',
      } }),
      h('span', { style: {
        fontSize:'26px', fontWeight:600, color: C.text, lineHeight:'1.4',
      } }, text),
    );
  }

  function igHandleEl() {
    return h('div', { style: { display:'flex', marginTop:'10px' } },
      h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted } }, '@benarofinanzen'),
    );
  }

  function slideRoot(...children) {
    return h('div', { style: {
      display:'flex', flexDirection:'column',
      width: W, height: H,
      padding:'70px',
      backgroundColor: C.bg,
      fontFamily:'Outfit',
    } }, ...children);
  }

  // ─── SLIDE 1: HOOK ────────────────────────────────────────────────────────
  // "5.000 €: Alles auf einmal oder monatlich investieren?"

  const slide1 = slideRoot(
    topRow('DIE GROSSE ETF-FRAGE'),
    headlineEl('5.000 €: Alles auf einmal — oder jeden Monat investieren?', 56),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'24px' } },

      // Option A: Einmalanlage
      h('div', { style: {
        display:'flex', flexDirection:'row', alignItems:'center', gap:'24px',
        backgroundColor:'rgba(16,185,129,0.1)', borderRadius:'24px', padding:'36px',
        border:'2px solid #10B981',
      } },
        h('div', { style: {
          display:'flex', width:'72px', height:'72px', borderRadius:'18px',
          backgroundColor: C.green, alignItems:'center', justifyContent:'center', flexShrink:'0',
        } },
          h('span', { style: { fontSize:'36px', fontWeight:800, color:'#FFFFFF' } }, 'A'),
        ),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'6px' } },
          h('span', { style: { fontSize:'34px', fontWeight:800, color: C.text } }, 'Einmalanlage'),
          h('span', { style: { fontSize:'26px', fontWeight:400, color: C.textMuted } }, 'Den gesamten Betrag sofort in den ETF'),
        ),
      ),

      // "oder" Divider
      h('div', { style: { display:'flex', flexDirection:'row', alignItems:'center', gap:'20px' } },
        h('div', { style: { display:'flex', flex:'1', height:'2px', backgroundColor: C.border } }),
        h('span', { style: { fontSize:'30px', fontWeight:700, color: C.textMuted } }, 'oder'),
        h('div', { style: { display:'flex', flex:'1', height:'2px', backgroundColor: C.border } }),
      ),

      // Option B: Sparplan
      h('div', { style: {
        display:'flex', flexDirection:'row', alignItems:'center', gap:'24px',
        backgroundColor: C.cardBg, borderRadius:'24px', padding:'36px',
        border:'2px solid rgba(255,255,255,0.2)',
      } },
        h('div', { style: {
          display:'flex', width:'72px', height:'72px', borderRadius:'18px',
          backgroundColor:'rgba(255,255,255,0.15)', alignItems:'center', justifyContent:'center', flexShrink:'0',
        } },
          h('span', { style: { fontSize:'36px', fontWeight:800, color:'#FFFFFF' } }, 'B'),
        ),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'6px' } },
          h('span', { style: { fontSize:'34px', fontWeight:800, color: C.text } }, 'Sparplan'),
          h('span', { style: { fontSize:'26px', fontWeight:400, color: C.textMuted } }, '500 € jeden Monat gleichmäßig investieren'),
        ),
      ),
    ),

    keyLearningEl('Die Antwort überrascht die meisten Anleger — blättere weiter.'),
    igHandleEl(),
  );

  // ─── SLIDE 2: STATISTIK ────────────────────────────────────────────────────
  // Vanguard: 70% der Fälle gewinnt die Einmalanlage

  const circR = 130, circCx = 160, circCy = 160;
  const circumf = 2 * Math.PI * circR;
  const pieDash = Math.round(circumf * 0.70);
  const pieGap  = Math.round(circumf * 0.30);

  const pieSvg = `<svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${circCx}" cy="${circCy}" r="${circR}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="40"/>
    <circle cx="${circCx}" cy="${circCy}" r="${circR}" fill="none" stroke="#10B981" stroke-width="40"
      stroke-dasharray="${pieDash} ${pieGap}"
      transform="rotate(-90 ${circCx} ${circCy})"/>
  </svg>`;
  const pieSrc = `data:image/svg+xml;base64,${Buffer.from(pieSvg).toString('base64')}`;

  const slide2 = slideRoot(
    topRow('DIE STATISTIK'),
    headlineEl('70 % der Fälle: Einmalanlage gewinnt', 60),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'32px' } },

      h('div', { style: { display:'flex', flexDirection:'row', alignItems:'center', gap:'60px' } },
        // Pie chart
        h('img', { src: pieSrc, width: 300, height: 300, style: { objectFit:'contain', flexShrink:'0' } }),
        // Legend
        h('div', { style: { display:'flex', flexDirection:'column', gap:'32px' } },
          h('div', { style: { display:'flex', flexDirection:'column', gap:'8px' } },
            h('div', { style: { display:'flex', alignItems:'center', gap:'12px' } },
              h('div', { style: { display:'flex', width:'18px', height:'18px', borderRadius:'4px', backgroundColor: C.green } }),
              h('span', { style: { fontSize:'22px', fontWeight:700, color: C.textMuted, letterSpacing:'2px' } }, 'EINMALANLAGE'),
            ),
            h('span', { style: { fontSize:'72px', fontWeight:800, color: C.green, lineHeight:'1', letterSpacing:'-2px' } }, '70 %'),
          ),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'8px' } },
            h('div', { style: { display:'flex', alignItems:'center', gap:'12px' } },
              h('div', { style: { display:'flex', width:'18px', height:'18px', borderRadius:'4px', backgroundColor:'rgba(255,255,255,0.3)' } }),
              h('span', { style: { fontSize:'22px', fontWeight:700, color: C.textMuted, letterSpacing:'2px' } }, 'SPARPLAN'),
            ),
            h('span', { style: { fontSize:'72px', fontWeight:800, color: C.textSoft, lineHeight:'1', letterSpacing:'-2px' } }, '30 %'),
          ),
        ),
      ),

      // Source tag
      h('div', { style: {
        display:'flex', backgroundColor:'rgba(16,185,129,0.1)', borderRadius:'12px',
        padding:'10px 20px', border:'1px solid rgba(16,185,129,0.3)',
      } },
        h('span', { style: { fontSize:'22px', fontWeight:600, color: C.green } }, 'Quelle: Vanguard — 90 Jahre globale Marktdaten'),
      ),
    ),

    keyLearningEl('In 7 von 10 Fällen ist das sofortige Investieren profitabler.'),
    igHandleEl(),
  );

  // ─── SLIDE 3: DAS DILEMMA ─────────────────────────────────────────────────
  // Angst (Allzeithoch) vs. Realität

  const slide3 = slideRoot(
    topRow('DAS DILEMMA'),
    headlineEl('Aber der Markt ist auf Allzeithoch...', 58),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },

      // Kontrast-Karten
      h('div', { style: { display:'flex', flexDirection:'row', gap:'16px' } },
        // Angst
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'14px',
          backgroundColor:'rgba(239,68,68,0.1)', borderRadius:'20px', padding:'28px 30px',
          border:'1px solid rgba(239,68,68,0.3)',
        } },
          h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color: C.red } }, 'ANGST'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(239,68,68,0.3)', borderRadius:'2px' } }),
          h('span', { style: { fontSize:'27px', fontWeight:600, color: C.textSoft, lineHeight:'1.4' } },
            'Jetzt kaufen ist zu riskant. Ich warte auf den Abschwung.'),
        ),
        // Realität
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'14px',
          backgroundColor: C.cardBg, borderRadius:'20px', padding:'28px 30px',
          border:'1px solid #10B981',
        } },
          h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color: C.green } }, 'REALITÄT'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(16,185,129,0.4)', borderRadius:'2px' } }),
          h('span', { style: { fontSize:'27px', fontWeight:600, color: C.text, lineHeight:'1.4' } },
            '60 % aller Handelstage des MSCI World sind Allzeithochs.'),
        ),
      ),

      // Stat-Box
      h('div', { style: {
        display:'flex', flexDirection:'column', backgroundColor: C.cardBg,
        borderRadius:'20px', padding:'30px', gap:'10px', alignItems:'center',
      } },
        h('span', { style: { fontSize:'24px', fontWeight:700, color: C.textMuted, letterSpacing:'2px', textAlign:'center' } },
          'WER AUF DEN RÜCKSETZER WARTET'),
        h('span', { style: { fontSize:'56px', fontWeight:800, color: C.red, lineHeight:'1', letterSpacing:'-2px' } },
          'verliert wertvolle Zeit'),
        h('span', { style: { fontSize:'26px', fontWeight:500, color: C.textMuted, textAlign:'center', lineHeight:'1.4' } },
          'Jede Korrektur der letzten 100 Jahre wurde vollständig aufgeholt.'),
      ),
    ),

    keyLearningEl('Auf den "richtigen" Zeitpunkt zu warten kostet mehr als ein Abschwung.', C.red),
    igHandleEl(),
  );

  // ─── SLIDE 4: DER VERGLEICH ───────────────────────────────────────────────
  // Einmalanlage vs. DCA Linienchart + Zahlen

  const years   = [0,1,2,3,4,5,6,7,8,9,10];
  const lsData  = years.map(y => 5000 * Math.pow(1.07, y));
  const dcaData = years.map(y => y === 0 ? 5000 : 5000 * Math.pow(1.07, y - 0.5));

  const cW = 820, cH = 300;
  const cPL = 10, cPR = 10, cPT = 10, cPB = 10;
  const dW = cW - cPL - cPR, dH = cH - cPT - cPB;
  const minV = 4700, maxV = 10200;

  const fy = v => cPT + dH - (v - minV) / (maxV - minV) * dH;
  const fx = y => cPL + (y / 10) * dW;

  const lsPoints  = years.map(y => `${fx(y).toFixed(1)},${fy(lsData[y]).toFixed(1)}`).join(' ');
  const dcaPoints = years.map(y => `${fx(y).toFixed(1)},${fy(dcaData[y]).toFixed(1)}`).join(' ');

  const gridVals  = [5000,6000,7000,8000,9000,10000];
  const gridLines = gridVals.map(v =>
    `<line x1="${cPL}" y1="${fy(v).toFixed(1)}" x2="${cW-cPR}" y2="${fy(v).toFixed(1)}" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>`
  ).join('');

  const lineChartSvg = `<svg width="${cW}" height="${cH}" viewBox="0 0 ${cW} ${cH}" xmlns="http://www.w3.org/2000/svg">
    ${gridLines}
    <polyline points="${dcaPoints}" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="3" stroke-dasharray="8,6"/>
    <polyline points="${lsPoints}"  fill="none" stroke="#10B981" stroke-width="4"/>
    <circle cx="${fx(10).toFixed(1)}" cy="${fy(lsData[10]).toFixed(1)}"  r="8" fill="#10B981"/>
    <circle cx="${fx(10).toFixed(1)}" cy="${fy(dcaData[10]).toFixed(1)}" r="7" fill="rgba(255,255,255,0.5)"/>
  </svg>`;
  const lineChartSrc = `data:image/svg+xml;base64,${Buffer.from(lineChartSvg).toString('base64')}`;

  const slide4 = slideRoot(
    topRow('DER VERGLEICH'),
    headlineEl('5.000 € — Was wirklich passiert', 60),
    sublineEl('7 % durchschnittliche Rendite pro Jahr (MSCI World historisch)'),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' } },

      // Chart
      h('img', { src: lineChartSrc, width: cW, height: cH, style: { objectFit:'contain' } }),

      // X-Achsen-Labels
      h('div', { style: { display:'flex', flexDirection:'row', justifyContent:'space-between', paddingLeft:'10px', paddingRight:'10px', marginTop:'-4px' } },
        ...['Jahr 0','2','4','6','8','10'].map(l =>
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted } }, l)
        ),
      ),

      // Ergebnis-Boxen
      h('div', { style: { display:'flex', flexDirection:'row', gap:'16px', marginTop:'12px' } },
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'8px',
          backgroundColor:'rgba(16,185,129,0.1)', borderRadius:'16px', padding:'24px',
          border:'1px solid #10B981',
        } },
          h('div', { style: { display:'flex', alignItems:'center', gap:'10px' } },
            h('div', { style: { display:'flex', width:'32px', height:'4px', backgroundColor: C.green, borderRadius:'2px' } }),
            h('span', { style: { fontSize:'22px', fontWeight:700, color: C.green, letterSpacing:'1px' } }, 'EINMALANLAGE'),
          ),
          h('span', { style: { fontSize:'48px', fontWeight:800, color: C.green, lineHeight:'1', letterSpacing:'-2px' } }, '9.836 €'),
        ),
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'8px',
          backgroundColor: C.cardBg, borderRadius:'16px', padding:'24px',
        } },
          h('div', { style: { display:'flex', alignItems:'center', gap:'10px' } },
            h('div', { style: { display:'flex', width:'32px', height:'3px', backgroundColor:'rgba(255,255,255,0.4)', borderRadius:'2px', borderStyle:'dashed' } }),
            h('span', { style: { fontSize:'22px', fontWeight:700, color: C.textMuted, letterSpacing:'1px' } }, 'SPARPLAN (10 M.)'),
          ),
          h('span', { style: { fontSize:'48px', fontWeight:800, color: C.textSoft, lineHeight:'1', letterSpacing:'-2px' } }, '9.400 €'),
        ),
      ),
    ),

    keyLearningEl('Differenz: 436 € — bei 50.000 € wären es über 4.000 € Unterschied.'),
    igHandleEl(),
  );

  // ─── SLIDE 5: 3 SZENARIEN ─────────────────────────────────────────────────
  // Wann der Sparplan sinnvoll ist

  const slide5 = slideRoot(
    topRow('3 SZENARIEN'),
    headlineEl('Wann du DOCH den Sparplan wählst', 56),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },

      // Szenario 1
      h('div', { style: {
        display:'flex', flexDirection:'row', alignItems:'center', gap:'22px',
        backgroundColor:'rgba(16,185,129,0.1)', borderRadius:'20px', padding:'28px 32px',
        border:'1px solid rgba(16,185,129,0.3)',
      } },
        h('div', { style: {
          display:'flex', width:'56px', height:'56px', borderRadius:'14px',
          backgroundColor: C.green, alignItems:'center', justifyContent:'center', flexShrink:'0',
        } },
          h('span', { style: { fontSize:'28px', fontWeight:800, color:'#FFFFFF' } }, '1'),
        ),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' } },
          h('span', { style: { fontSize:'30px', fontWeight:700, color: C.text } }, 'Kein Kapital vorhanden'),
          h('span', { style: { fontSize:'24px', fontWeight:400, color: C.textMuted, lineHeight:'1.4' } },
            'Regelmäßig 100–500 € zu investieren ist besser als gar nicht starten.'),
        ),
      ),

      // Szenario 2
      h('div', { style: {
        display:'flex', flexDirection:'row', alignItems:'center', gap:'22px',
        backgroundColor: C.cardBg, borderRadius:'20px', padding:'28px 32px',
      } },
        h('div', { style: {
          display:'flex', width:'56px', height:'56px', borderRadius:'14px',
          backgroundColor:'rgba(255,255,255,0.2)', alignItems:'center', justifyContent:'center', flexShrink:'0',
        } },
          h('span', { style: { fontSize:'28px', fontWeight:800, color:'#FFFFFF' } }, '2'),
        ),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' } },
          h('span', { style: { fontSize:'30px', fontWeight:700, color: C.text } }, 'Liquidität wird noch benötigt'),
          h('span', { style: { fontSize:'24px', fontWeight:400, color: C.textMuted, lineHeight:'1.4' } },
            'Erst Notgroschen aufbauen (3 Monatsgehälter), dann investieren.'),
        ),
      ),

      // Szenario 3
      h('div', { style: {
        display:'flex', flexDirection:'row', alignItems:'center', gap:'22px',
        backgroundColor: C.cardBg, borderRadius:'20px', padding:'28px 32px',
      } },
        h('div', { style: {
          display:'flex', width:'56px', height:'56px', borderRadius:'14px',
          backgroundColor:'rgba(255,255,255,0.2)', alignItems:'center', justifyContent:'center', flexShrink:'0',
        } },
          h('span', { style: { fontSize:'28px', fontWeight:800, color:'#FFFFFF' } }, '3'),
        ),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' } },
          h('span', { style: { fontSize:'30px', fontWeight:700, color: C.text } }, 'Psychologischer Druck'),
          h('span', { style: { fontSize:'24px', fontWeight:400, color: C.textMuted, lineHeight:'1.4' } },
            'Wer nachts schlechter schläft, investiert lieber gestaffelt über mehrere Monate.'),
        ),
      ),
    ),

    keyLearningEl('Mathematisch gewinnt die Einmalanlage. Psychologisch gewinnt der Sparplan.'),
    igHandleEl(),
  );

  // ─── SLIDE 6: FAUSTREGELN / LEARNINGS ────────────────────────────────────

  const learnings = [
    { num:'01', text:'Kapital verfügbar? Sofort den ganzen Betrag investieren.', pct:25 },
    { num:'02', text:'Angst vor Timing? Der Markt schlägt Timing langfristig immer.', pct:50 },
    { num:'03', text:'Kein Kapital? Sparplan starten — egal mit welchem Betrag.', pct:75 },
    { num:'04', text:'Wichtigste Regel: Gar nicht investieren kostet am meisten.', pct:100 },
  ];

  const slide6 = slideRoot(
    topRow('DEINE FAUSTREGELN'),
    headlineEl('So entscheidest du richtig', 60),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'14px' } },
      ...learnings.map(l =>
        h('div', { style: {
          display:'flex', flexDirection:'column', gap:'10px',
          padding:'20px 26px', backgroundColor: C.cardBg, borderRadius:'18px',
        } },
          h('div', { style: { display:'flex', alignItems:'center', gap:'18px' } },
            h('span', { style: { fontSize:'36px', fontWeight:800, color: l.pct === 100 ? C.green : C.text, minWidth:'56px' } }, l.num),
            h('span', { style: { fontSize:'26px', fontWeight:600, color: C.text, lineHeight:'1.3', flex:'1' } }, l.text),
          ),
          h('div', { style: { display:'flex', height:'5px', backgroundColor: C.border, borderRadius:'3px', overflow:'hidden' } },
            h('div', { style: {
              display:'flex', width:`${l.pct}%`, height:'5px',
              backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius:'3px',
            } }),
          ),
        )
      ),
    ),

    keyLearningEl('Zeit im Markt schlägt Timing im Markt — immer.', C.green),
    igHandleEl(),
  );

  // ─── SLIDE 7: CTA ─────────────────────────────────────────────────────────

  const slide7 = slideRoot(
    // Nur Badge oben, kein Logo — Logo erscheint zentriert (Rule 17/21)
    h('div', { style: { display:'flex', marginBottom:'28px' } },
      h('span', { style: {
        display:'flex', fontSize:'22px', fontWeight:700, letterSpacing:'3px',
        color: C.text, backgroundColor: C.cardBg,
        padding:'10px 22px', borderRadius:'12px',
      } }, 'BENARO FINANZEN'),
    ),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'32px' } },
      h('img', { src: logoB64, width: 160, height: 160, style: { borderRadius:'24px', objectFit:'cover' } }),
      h('span', { style: {
        fontSize:'40px', fontWeight:800, color: C.text,
        textAlign:'center', lineHeight:'1.3', letterSpacing:'-1px',
      } }, 'Einmalinvestition oder Sparplan — was nutzt du gerade?'),
      h('span', { style: {
        fontSize:'28px', fontWeight:400, color: C.textMuted,
        textAlign:'center', lineHeight:'1.5',
      } }, 'Schreib es in die Kommentare!'),
    ),

    keyLearningEl('Folge @benarofinanzen für mehr Wissen rund um Vermögensaufbau.', C.green),
    igHandleEl(),
  );

  // ─── GENERATE ALL SLIDES ──────────────────────────────────────────────────

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];

  const TODAY = process.env.TODAY || new Date().toISOString().slice(0, 10);
  const outDir = path.join(__dirname, 'output', `carousel_${TODAY}`, 'slides');
  fs.mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i+1).padStart(2,'0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i+1}/${slides.length} done`);
  }
  console.log('All slides generated!');
}

main().catch(e => { console.error(e); process.exit(1); });
