const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default;
  const { Resvg } = require('@resvg/resvg-js');

  const fontDir = '/tmp/workspace/node_modules/@fontsource/outfit/files';
  const fonts = [400,500,600,700,800].flatMap(w => [
    { name:'Outfit', weight:w, style:'normal', data: fs.readFileSync(`${fontDir}/outfit-latin-${w}-normal.woff`) },
    { name:'Outfit', weight:w, style:'normal', data: fs.readFileSync(`${fontDir}/outfit-latin-ext-${w}-normal.woff`) },
  ]);

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync('/tmp/workspace/skills/instagram-carousel-skill/templates/benaro-logo.jpg').toString('base64');

  const C = {
    bg:       '#001f61',
    text:     '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted:'#9CA3AF',
    cardBg:   'rgba(255,255,255,0.10)',
    border:   'rgba(255,255,255,0.20)',
    green:    '#10B981',
    red:      '#EF4444',
  };

  const W = 1080, H = 1350;

  const h = (type, props, ...ch) => ({
    type, props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function logoImg(size) {
    var s = size || 120;
    return h('img', { src: logoB64, width: s, height: s,
      style: { borderRadius:'12px', objectFit:'cover', flexShrink:0 } });
  }

  function topRow(badgeText) {
    return h('div', { style: { display:'flex', flexDirection:'row', alignItems:'flex-start',
        justifyContent:'space-between', marginBottom:'18px' } },
      badge(badgeText),
      logoImg(120)
    );
  }

  function badge(text) {
    return h('div', { style: { display:'flex' } },
      h('span', { style: { display:'flex', fontSize:'22px', fontWeight:700, letterSpacing:'3px',
          color:C.text, backgroundColor:C.cardBg, padding:'10px 22px', borderRadius:'12px' } }, text)
    );
  }

  function headline(text, size) {
    var sz = size || 62;
    return h('span', { style: { fontSize:sz+'px', fontWeight:800, color:C.text,
        lineHeight:'1.08', letterSpacing:'-1.5px', marginBottom:'6px' } }, text);
  }

  function subline(text) {
    return h('span', { style: { fontSize:'28px', fontWeight:500, color:C.textMuted,
        lineHeight:'1.5', marginTop:'6px' } }, text);
  }

  function keyLearning(text, accent) {
    var ac = accent || C.text;
    return h('div', { style: { display:'flex', alignItems:'center', gap:'14px',
        backgroundColor:C.cardBg, borderRadius:'16px', padding:'22px 28px', marginTop:'16px' } },
      h('div', { style: { display:'flex', width:'6px', minHeight:'40px',
          backgroundColor:ac, borderRadius:'3px', flexShrink:0 } }),
      h('span', { style: { fontSize:'28px', fontWeight:600, color:C.text, lineHeight:'1.4' } }, text)
    );
  }

  function igHandle() {
    return h('div', { style: { display:'flex', alignItems:'center', marginTop:'12px' } },
      h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textMuted } }, '@benarofinanzen')
    );
  }

  function slideRoot() {
    var children = Array.prototype.slice.call(arguments);
    return h('div', { style: { display:'flex', flexDirection:'column',
        width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
      children[0], children[1], children[2], children[3], children[4],
      children[5], children[6], children[7], children[8], children[9]
    );
  }

  // SLIDE 1 - Hook
  var slide1 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    topRow('ACHTUNG SPARER'),
    headline('Festgeld-Zinsen fallen — Was wird aus deinem Ersparten?', 54),
    subline('EZB senkt Leitzins auf 2,0 % — und Festgeld folgt nach unten'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'row', alignItems:'center', gap:'18px', marginTop:'28px' } },
      h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:C.cardBg, borderRadius:'20px', padding:'32px 20px', alignItems:'center', gap:'12px', border:'1px solid rgba(255,255,255,0.12)' } },
        h('span', { style: { fontSize:'22px', fontWeight:700, color:C.textMuted, letterSpacing:'2px' } }, '2022'),
        h('span', { style: { fontSize:'62px', fontWeight:800, color:'#EF4444', lineHeight:'1.0', letterSpacing:'-2px' } }, '0,1 %'),
        h('div', { style: { display:'flex', width:'100%', height:'4px', backgroundColor:'#EF4444', borderRadius:'2px' } }),
        h('span', { style: { fontSize:'24px', fontWeight:600, color:C.textSoft, textAlign:'center' } }, 'Tiefstzins')
      ),
      h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:C.cardBg, borderRadius:'20px', padding:'32px 20px', alignItems:'center', gap:'12px', border:'1px solid rgba(255,255,255,0.12)' } },
        h('span', { style: { fontSize:'22px', fontWeight:700, color:C.textMuted, letterSpacing:'2px' } }, '2023'),
        h('span', { style: { fontSize:'62px', fontWeight:800, color:'#10B981', lineHeight:'1.0', letterSpacing:'-2px' } }, '4,2 %'),
        h('div', { style: { display:'flex', width:'100%', height:'4px', backgroundColor:'#10B981', borderRadius:'2px' } }),
        h('span', { style: { fontSize:'24px', fontWeight:600, color:C.textSoft, textAlign:'center' } }, 'Hochpunkt')
      ),
      h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:C.cardBg, borderRadius:'20px', padding:'32px 20px', alignItems:'center', gap:'12px', border:'1px solid rgba(255,255,255,0.12)' } },
        h('span', { style: { fontSize:'22px', fontWeight:700, color:C.textMuted, letterSpacing:'2px' } }, '2026'),
        h('span', { style: { fontSize:'62px', fontWeight:800, color:'#FBBF24', lineHeight:'1.0', letterSpacing:'-2px' } }, '2,8 %'),
        h('div', { style: { display:'flex', width:'100%', height:'4px', backgroundColor:'#FBBF24', borderRadius:'2px' } }),
        h('span', { style: { fontSize:'24px', fontWeight:600, color:C.textSoft, textAlign:'center' } }, 'Heute')
      )
    ),
    keyLearning('Festgeld verlor in 3 Jahren über 1,4 Prozentpunkte Rendite'),
    igHandle()
  );

  // SLIDE 2 - Zinsverlauf Chart
  var cW = 880, cH = 340;
  var padL=30, padR=30, padT=30, padB=10;
  var innerW = cW - padL - padR;
  var innerH = cH - padT - padB;
  var yMin = 0, yMax = 4.8;
  var pts = [
    {xi:0, yi:0.1}, {xi:1, yi:0.15}, {xi:2, yi:0.9},
    {xi:3, yi:4.2}, {xi:4, yi:3.8}, {xi:5, yi:3.2}, {xi:6, yi:2.8}
  ];
  function px(xi) { return padL + (xi/6) * innerW; }
  function py(yi) { return padT + (1 - (yi - yMin)/(yMax - yMin)) * innerH; }
  var polylineStr = pts.map(function(p){ return px(p.xi)+','+py(p.yi); }).join(' ');
  var areaPath = 'M '+px(0)+','+py(0)+' L '+pts.map(function(p){ return px(p.xi)+','+py(p.yi); }).join(' L ')+' L '+px(6)+','+py(0)+' Z';
  var inflY = py(3.2);
  var circles = pts.map(function(p){
    var fill = p.xi===3 ? '#10B981' : (p.xi===6 ? '#FBBF24' : '#FFFFFF');
    return '<circle cx="'+px(p.xi)+'" cy="'+py(p.yi)+'" r="9" fill="'+fill+'" opacity="0.9"/>';
  }).join('\n  ');

  var chartSvg = '<svg width="'+cW+'" height="'+cH+'" viewBox="0 0 '+cW+' '+cH+'" xmlns="http://www.w3.org/2000/svg">\n' +
    '<defs>\n' +
    '<linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.12"/><stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.01"/></linearGradient>\n' +
    '<linearGradient id="lg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#EF4444"/><stop offset="45%" stop-color="#10B981"/><stop offset="75%" stop-color="#FBBF24"/><stop offset="100%" stop-color="#EF4444" stop-opacity="0.7"/></linearGradient>\n' +
    '</defs>\n' +
    '<path d="'+areaPath+'" fill="url(#ag)"/>\n' +
    '<polyline points="'+polylineStr+'" fill="none" stroke="url(#lg)" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>\n' +
    '<line x1="'+padL+'" y1="'+inflY+'" x2="'+(cW-padR)+'" y2="'+inflY+'" stroke="#EF4444" stroke-width="3" stroke-dasharray="14,8" opacity="0.8"/>\n' +
    circles + '\n' +
    '</svg>';
  var chartSrc = 'data:image/svg+xml;base64,' + Buffer.from(chartSvg).toString('base64');

  var slide2 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    topRow('ZINSVERLAUF 2020–2026'),
    headline('Vom Zins-Hoch zur Ernüchterung', 62),
    subline('Beste Festgeld-Zinsen in Deutschland (% p.a.)'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'12px' } },
      h('img', { src:chartSrc, width:cW, height:cH, style:{ objectFit:'contain' } }),
      h('div', { style: { display:'flex', flexDirection:'row', justifyContent:'space-between', paddingLeft:padL+'px', paddingRight:padR+'px' } },
        h('span', { style: { fontSize:'21px', fontWeight:600, color:C.textMuted, textAlign:'center' } }, '2020'),
        h('span', { style: { fontSize:'21px', fontWeight:600, color:C.textMuted, textAlign:'center' } }, '2021'),
        h('span', { style: { fontSize:'21px', fontWeight:600, color:C.textMuted, textAlign:'center' } }, '2022'),
        h('span', { style: { fontSize:'21px', fontWeight:600, color:C.textMuted, textAlign:'center' } }, '2023'),
        h('span', { style: { fontSize:'21px', fontWeight:600, color:C.textMuted, textAlign:'center' } }, '2024'),
        h('span', { style: { fontSize:'21px', fontWeight:600, color:C.textMuted, textAlign:'center' } }, '2025'),
        h('span', { style: { fontSize:'21px', fontWeight:600, color:C.textMuted, textAlign:'center' } }, '2026')
      ),
      h('div', { style: { display:'flex', flexDirection:'row', gap:'28px', marginTop:'10px', alignItems:'center' } },
        h('div', { style: { display:'flex', alignItems:'center', gap:'10px' } },
          h('div', { style: { width:'28px', height:'4px', backgroundColor:'#EF4444', borderRadius:'2px' } }),
          h('span', { style: { fontSize:'22px', color:C.textMuted } }, 'Inflation 3,2 %')
        ),
        h('div', { style: { display:'flex', alignItems:'center', gap:'10px' } },
          h('div', { style: { width:'28px', height:'4px', backgroundColor:'#FBBF24', borderRadius:'2px' } }),
          h('span', { style: { fontSize:'22px', color:C.textMuted } }, 'Festgeld 2026: 2,8 %')
        ),
        h('div', { style: { display:'flex', alignItems:'center', gap:'10px' } },
          h('div', { style: { width:'28px', height:'4px', backgroundColor:'#10B981', borderRadius:'2px' } }),
          h('span', { style: { fontSize:'22px', color:C.textMuted } }, 'Hochpunkt 2023: 4,2 %')
        )
      )
    ),
    keyLearning('EZB-Zinssenkungen treffen Sparer direkt — Festgeld wird schlechter bezahlt'),
    igHandle()
  );

  // SLIDE 3 - Problem: Realrendite
  var slide3 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    topRow('DAS PROBLEM'),
    headline('2,8 % klingt gut. Bis du rechnest.', 60),
    subline('Realrendite = Nominalzins minus Inflation'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' } },
      h('div', { style: { display:'flex', flexDirection:'row', alignItems:'center', gap:'16px', backgroundColor:'rgba(16,185,129,0.12)', borderRadius:'18px', padding:'26px 32px', border:'1px solid rgba(16,185,129,0.3)' } },
        h('span', { style: { fontSize:'44px', fontWeight:800, color:C.green, minWidth:'56px' } }, '+'),
        h('div', { style: { display:'flex', flexDirection:'column' } },
          h('span', { style: { fontSize:'52px', fontWeight:800, color:C.green, lineHeight:'1.0' } }, '2,8 %'),
          h('span', { style: { fontSize:'26px', fontWeight:500, color:C.textMuted, marginTop:'4px' } }, 'Festgeld-Nominalzins (bestes Angebot 2026)')
        )
      ),
      h('div', { style: { display:'flex', flexDirection:'row', alignItems:'center', gap:'16px', backgroundColor:'rgba(239,68,68,0.12)', borderRadius:'18px', padding:'26px 32px', border:'1px solid rgba(239,68,68,0.3)' } },
        h('span', { style: { fontSize:'44px', fontWeight:800, color:C.red, minWidth:'56px' } }, '-'),
        h('div', { style: { display:'flex', flexDirection:'column' } },
          h('span', { style: { fontSize:'52px', fontWeight:800, color:C.red, lineHeight:'1.0' } }, '3,2 %'),
          h('span', { style: { fontSize:'26px', fontWeight:500, color:C.textMuted, marginTop:'4px' } }, 'Inflation Juli 2026')
        )
      ),
      h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:C.border, borderRadius:'2px' } }),
      h('div', { style: { display:'flex', flexDirection:'row', alignItems:'center', gap:'16px', backgroundColor:'rgba(239,68,68,0.22)', borderRadius:'18px', padding:'26px 32px', border:'2px solid rgba(239,68,68,0.5)' } },
        h('span', { style: { fontSize:'44px', fontWeight:800, color:C.red, minWidth:'56px' } }, '='),
        h('div', { style: { display:'flex', flexDirection:'column' } },
          h('span', { style: { fontSize:'60px', fontWeight:800, color:C.red, lineHeight:'1.0' } }, '-0,4 %'),
          h('span', { style: { fontSize:'26px', fontWeight:500, color:C.textMuted, marginTop:'4px' } }, 'Reale Rendite — dein Geld verliert an Wert')
        )
      )
    ),
    keyLearning('Nominaler Gewinn, realer Verlust — das Festgeld-Paradox 2026', C.red),
    igHandle()
  );

  // SLIDE 4 - Erwartung vs Realitaet
  var slide4 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    topRow('DENKFEHLER'),
    headline('Was du glaubst vs. was wirklich passiert', 54),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      h('div', { style: { display:'flex', flexDirection:'row', gap:'16px' } },
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:C.cardBg, borderRadius:'20px', padding:'30px', gap:'14px' } },
          h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color:C.textMuted } }, 'ERWARTUNG'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:C.border, borderRadius:'2px' } }),
          h('span', { style: { fontSize:'36px', fontWeight:800, color:C.green } }, '2,8 %'),
          h('span', { style: { fontSize:'26px', fontWeight:500, color:C.textSoft, lineHeight:'1.4' } }, 'Sicheres Plus — mein Geld wächst garantiert')
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:'rgba(239,68,68,0.12)', borderRadius:'20px', padding:'30px', gap:'14px', border:'2px solid rgba(239,68,68,0.35)' } },
          h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color:C.red } }, 'REALITÄT'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(239,68,68,0.4)', borderRadius:'2px' } }),
          h('span', { style: { fontSize:'36px', fontWeight:800, color:C.red } }, '-0,4 %'),
          h('span', { style: { fontSize:'26px', fontWeight:500, color:C.textSoft, lineHeight:'1.4' } }, 'Kaufkraftverlust — real schrumpft dein Geld')
        )
      ),
      h('div', { style: { display:'flex', flexDirection:'column', backgroundColor:C.cardBg, borderRadius:'18px', padding:'28px', gap:'14px' } },
        h('span', { style: { fontSize:'24px', fontWeight:700, color:C.textMuted, letterSpacing:'1px' } }, 'BEISPIEL: 10.000 EUR auf Festgeld für 1 Jahr'),
        h('div', { style: { display:'flex', flexDirection:'row', gap:'0px', marginTop:'6px' } },
          h('div', { style: { display:'flex', flex:'1', flexDirection:'column', gap:'4px' } },
            h('span', { style: { fontSize:'28px', fontWeight:800, color:C.green } }, '+ 280 EUR'),
            h('span', { style: { fontSize:'22px', color:C.textMuted } }, 'Nominalzinsen')
          ),
          h('div', { style: { display:'flex', flex:'1', flexDirection:'column', gap:'4px', paddingLeft:'20px', borderLeft:'2px solid rgba(255,255,255,0.2)' } },
            h('span', { style: { fontSize:'28px', fontWeight:800, color:C.red } }, '- 320 EUR'),
            h('span', { style: { fontSize:'22px', color:C.textMuted } }, 'Kaufkraftverlust')
          ),
          h('div', { style: { display:'flex', flex:'1', flexDirection:'column', gap:'4px', paddingLeft:'20px', borderLeft:'2px solid rgba(255,255,255,0.2)' } },
            h('span', { style: { fontSize:'28px', fontWeight:800, color:C.red } }, '= - 40 EUR'),
            h('span', { style: { fontSize:'22px', color:C.textMuted } }, 'Realer Verlust')
          )
        )
      )
    ),
    keyLearning('Sicherheit ist gut — aber nicht auf Kosten der Kaufkraft'),
    igHandle()
  );

  // SLIDE 5 - 3 Optionen Vergleich
  var slide5 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    topRow('DEINE OPTIONEN 2026'),
    headline('Wo legt dein Geld am meisten zu?', 58),
    subline('Festgeld, Staatsanleihen und ETF im Vergleich'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'18px' } },
      h('div', { style: { display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:C.cardBg, borderRadius:'18px', padding:'24px 28px', gap:'20px' } },
        h('div', { style: { display:'flex', width:'8px', minHeight:'64px', backgroundColor:'#FBBF24', borderRadius:'4px', flexShrink:0 } }),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', gap:'8px' } },
          h('span', { style: { fontSize:'32px', fontWeight:800, color:C.text } }, 'Festgeld'),
          h('div', { style: { display:'flex', flexDirection:'row', gap:'24px' } },
            h('div', { style: { display:'flex', flexDirection:'column' } },
              h('span', { style: { fontSize:'21px', color:C.textMuted } }, 'Rendite p.a.'),
              h('span', { style: { fontSize:'26px', fontWeight:700, color:'#FBBF24' } }, '2,8 %')
            ),
            h('div', { style: { display:'flex', flexDirection:'column' } },
              h('span', { style: { fontSize:'21px', color:C.textMuted } }, 'Zeithorizont'),
              h('span', { style: { fontSize:'26px', fontWeight:700, color:C.textSoft } }, '1–3 Jahre')
            ),
            h('div', { style: { display:'flex', flexDirection:'column' } },
              h('span', { style: { fontSize:'21px', color:C.textMuted } }, 'Risiko'),
              h('span', { style: { fontSize:'26px', fontWeight:700, color:C.green } }, 'Sehr niedrig')
            )
          )
        )
      ),
      h('div', { style: { display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:C.cardBg, borderRadius:'18px', padding:'24px 28px', gap:'20px' } },
        h('div', { style: { display:'flex', width:'8px', minHeight:'64px', backgroundColor:'rgba(100,180,255,0.9)', borderRadius:'4px', flexShrink:0 } }),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', gap:'8px' } },
          h('span', { style: { fontSize:'32px', fontWeight:800, color:C.text } }, 'Staatsanleihen'),
          h('div', { style: { display:'flex', flexDirection:'row', gap:'24px' } },
            h('div', { style: { display:'flex', flexDirection:'column' } },
              h('span', { style: { fontSize:'21px', color:C.textMuted } }, 'Rendite p.a.'),
              h('span', { style: { fontSize:'26px', fontWeight:700, color:'rgba(100,180,255,0.9)' } }, '2,85 %')
            ),
            h('div', { style: { display:'flex', flexDirection:'column' } },
              h('span', { style: { fontSize:'21px', color:C.textMuted } }, 'Zeithorizont'),
              h('span', { style: { fontSize:'26px', fontWeight:700, color:C.textSoft } }, '1–10 Jahre')
            ),
            h('div', { style: { display:'flex', flexDirection:'column' } },
              h('span', { style: { fontSize:'21px', color:C.textMuted } }, 'Risiko'),
              h('span', { style: { fontSize:'26px', fontWeight:700, color:C.green } }, 'Sehr niedrig')
            )
          )
        )
      ),
      h('div', { style: { display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'rgba(16,185,129,0.1)', borderRadius:'18px', padding:'24px 28px', gap:'20px', border:'1px solid rgba(16,185,129,0.3)' } },
        h('div', { style: { display:'flex', width:'8px', minHeight:'64px', backgroundColor:C.green, borderRadius:'4px', flexShrink:0 } }),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', gap:'8px' } },
          h('span', { style: { fontSize:'32px', fontWeight:800, color:C.text } }, 'ETF-Sparplan'),
          h('div', { style: { display:'flex', flexDirection:'row', gap:'24px' } },
            h('div', { style: { display:'flex', flexDirection:'column' } },
              h('span', { style: { fontSize:'21px', color:C.textMuted } }, 'Rendite p.a.'),
              h('span', { style: { fontSize:'26px', fontWeight:700, color:C.green } }, 'ca. 7 %')
            ),
            h('div', { style: { display:'flex', flexDirection:'column' } },
              h('span', { style: { fontSize:'21px', color:C.textMuted } }, 'Zeithorizont'),
              h('span', { style: { fontSize:'26px', fontWeight:700, color:C.textSoft } }, '10+ Jahre')
            ),
            h('div', { style: { display:'flex', flexDirection:'column' } },
              h('span', { style: { fontSize:'21px', color:C.textMuted } }, 'Risiko'),
              h('span', { style: { fontSize:'26px', fontWeight:700, color:'#FBBF24' } }, 'Mittel')
            )
          )
        )
      )
    ),
    keyLearning('Langfristig gewinnt der ETF. Kurzfristig schützt das Festgeld.'),
    igHandle()
  );

  // SLIDE 6 - Wann Festgeld noch richtig ist
  var slide6 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    topRow('WANN ES SICH LOHNT'),
    headline('3 Fälle, wo Festgeld noch richtig ist', 55),
    subline('Festgeld ist nicht schlecht — nur oft falsch eingesetzt'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      h('div', { style: { display:'flex', flexDirection:'row', gap:'22px', backgroundColor:C.cardBg, borderRadius:'18px', padding:'28px', alignItems:'flex-start' } },
        h('span', { style: { fontSize:'40px', fontWeight:800, color:C.green, minWidth:'54px' } }, '01'),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'6px' } },
          h('span', { style: { fontSize:'30px', fontWeight:700, color:C.text } }, 'Kurzfristige Anschaffung'),
          h('span', { style: { fontSize:'24px', fontWeight:400, color:C.textMuted, lineHeight:'1.5' } }, 'Du planst einen Kauf in 1–3 Jahren — Festgeld sichert die Summe ohne Kursschwankungen.')
        )
      ),
      h('div', { style: { display:'flex', flexDirection:'row', gap:'22px', backgroundColor:C.cardBg, borderRadius:'18px', padding:'28px', alignItems:'flex-start' } },
        h('span', { style: { fontSize:'40px', fontWeight:800, color:C.green, minWidth:'54px' } }, '02'),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'6px' } },
          h('span', { style: { fontSize:'30px', fontWeight:700, color:C.text } }, 'Notgroschen-Überschuss'),
          h('span', { style: { fontSize:'24px', fontWeight:400, color:C.textMuted, lineHeight:'1.5' } }, 'Dein Notgroschen übersteigt 3–6 Monatsgehalt — den Überschuss auf Festgeld parken.')
        )
      ),
      h('div', { style: { display:'flex', flexDirection:'row', gap:'22px', backgroundColor:C.cardBg, borderRadius:'18px', padding:'28px', alignItems:'flex-start' } },
        h('span', { style: { fontSize:'40px', fontWeight:800, color:C.green, minWidth:'54px' } }, '03'),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'6px' } },
          h('span', { style: { fontSize:'30px', fontWeight:700, color:C.text } }, 'Psychologische Sicherheit'),
          h('span', { style: { fontSize:'24px', fontWeight:400, color:C.textMuted, lineHeight:'1.5' } }, 'Kursschwankungen rauben dir den Schlaf — Festgeld verhindert Panikverkauf im nächsten Crash.')
        )
      )
    ),
    keyLearning('Festgeld: richtig für kurzfristige Ziele, falsch für Vermögensaufbau'),
    igHandle()
  );

  // SLIDE 7 - 4 Takeaways
  var slide7 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    topRow('DEIN FAHRPLAN'),
    headline('4 Dinge, die du jetzt tun solltest', 58),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'14px', marginTop:'12px' } },
      h('div', { style: { display:'flex', flexDirection:'column', gap:'10px', padding:'20px 26px', backgroundColor:C.cardBg, borderRadius:'16px' } },
        h('div', { style: { display:'flex', alignItems:'center', gap:'18px' } },
          h('span', { style: { fontSize:'38px', fontWeight:800, color:C.text, minWidth:'54px' } }, '01'),
          h('span', { style: { fontSize:'26px', fontWeight:600, color:C.text, lineHeight:'1.3' } }, 'Realrendite prüfen: Zins minus Inflation zählt — nicht der Nominalzins')
        ),
        h('div', { style: { display:'flex', height:'5px', backgroundColor:C.border, borderRadius:'3px', overflow:'hidden' } },
          h('div', { style: { display:'flex', width:'25%', height:'5px', backgroundColor:C.text, borderRadius:'3px' } })
        )
      ),
      h('div', { style: { display:'flex', flexDirection:'column', gap:'10px', padding:'20px 26px', backgroundColor:C.cardBg, borderRadius:'16px' } },
        h('div', { style: { display:'flex', alignItems:'center', gap:'18px' } },
          h('span', { style: { fontSize:'38px', fontWeight:800, color:C.text, minWidth:'54px' } }, '02'),
          h('span', { style: { fontSize:'26px', fontWeight:600, color:C.text, lineHeight:'1.3' } }, 'Notgroschen (3–6 Monate) auf Tagesgeld — flexibel und täglich verfügbar')
        ),
        h('div', { style: { display:'flex', height:'5px', backgroundColor:C.border, borderRadius:'3px', overflow:'hidden' } },
          h('div', { style: { display:'flex', width:'50%', height:'5px', backgroundColor:C.text, borderRadius:'3px' } })
        )
      ),
      h('div', { style: { display:'flex', flexDirection:'column', gap:'10px', padding:'20px 26px', backgroundColor:C.cardBg, borderRadius:'16px' } },
        h('div', { style: { display:'flex', alignItems:'center', gap:'18px' } },
          h('span', { style: { fontSize:'38px', fontWeight:800, color:C.text, minWidth:'54px' } }, '03'),
          h('span', { style: { fontSize:'26px', fontWeight:600, color:C.text, lineHeight:'1.3' } }, 'Zeithorizont über 5 Jahre? ETF-Sparplan schlägt Festgeld langfristig deutlich')
        ),
        h('div', { style: { display:'flex', height:'5px', backgroundColor:C.border, borderRadius:'3px', overflow:'hidden' } },
          h('div', { style: { display:'flex', width:'75%', height:'5px', backgroundColor:C.text, borderRadius:'3px' } })
        )
      ),
      h('div', { style: { display:'flex', flexDirection:'column', gap:'10px', padding:'20px 26px', backgroundColor:C.cardBg, borderRadius:'16px' } },
        h('div', { style: { display:'flex', alignItems:'center', gap:'18px' } },
          h('span', { style: { fontSize:'38px', fontWeight:800, color:C.green, minWidth:'54px' } }, '04'),
          h('span', { style: { fontSize:'26px', fontWeight:600, color:C.text, lineHeight:'1.3' } }, 'Festgeld nur für konkrete, kurzfristige Ziele in den nächsten 1–3 Jahren')
        ),
        h('div', { style: { display:'flex', height:'5px', backgroundColor:C.border, borderRadius:'3px', overflow:'hidden' } },
          h('div', { style: { display:'flex', width:'100%', height:'5px', backgroundColor:C.green, borderRadius:'3px' } })
        )
      )
    ),
    keyLearning('Dein Geld muss für dich arbeiten — nicht gegen dich'),
    igHandle()
  );

  // SLIDE 8 - CTA
  var slide8 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    topRow('SPEICHERN UND TEILEN'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'28px' } },
      h('img', { src:logoB64, width:160, height:160, style:{ borderRadius:'20px', objectFit:'cover' } }),
      h('span', { style: { fontSize:'50px', fontWeight:800, color:C.text, textAlign:'center', lineHeight:'1.12', letterSpacing:'-1px' } },
        'Hast du schon ein Festgeld? Schreib es in die Kommentare!'),
      h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' } },
        h('span', { style: { fontSize:'30px', fontWeight:600, color:C.textMuted, textAlign:'center' } }, 'Speichern nicht vergessen'),
        h('span', { style: { fontSize:'26px', fontWeight:500, color:C.textMuted, textAlign:'center' } }, 'Folge @benarofinanzen für tägliche Finanztipps')
      )
    ),
    keyLearning('Finanzwissen, das dein Leben verändert — täglich auf @benarofinanzen'),
    igHandle()
  );

  // Generate all slides
  var slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  var outputDir = '/tmp/workspace/output/carousel_2026-07-30/slides';

  for (var i = 0; i < slides.length; i++) {
    var svg = await satori(slides[i], { width:W, height:H, fonts:fonts });
    var resvg = new Resvg(svg, { fitTo:{ mode:'width', value:W } });
    var pngData = resvg.render();
    var pngPath = path.join(outputDir, 'slide-'+String(i+1).padStart(2,'0')+'.png');
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log('Slide '+(i+1)+'/'+slides.length+' done');
  }
  console.log('All slides generated!');
}

main().catch(function(e) { console.error(e); process.exit(1); });
