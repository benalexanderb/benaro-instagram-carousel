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
    bg:'#1B2D87', bgDark:'#12207A', bgDeep:'#0D1A60',
    text:'#FFFFFF', textSoft:'rgba(255,255,255,0.80)', textMuted:'rgba(255,255,255,0.50)',
    cardBg:'rgba(255,255,255,0.10)', border:'rgba(255,255,255,0.15)',
    accent:'#5BC8F5', red:'#E63030', white:'#FFFFFF',
  };

  const W = 1080, H = 1350, PAD = 70;

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')
  ).toString('base64');

  const h = (type, props, ...ch) => ({
    type, props: { ...props, children: ch.length===1 ? ch[0] : ch.length===0 ? undefined : ch }
  });

  const toB64Svg = (s) => `data:image/svg+xml;base64,${Buffer.from(s).toString('base64')}`;

  function headerRow(badgeText) {
    return h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' } },
      h('span', { style:{ display:'flex', fontSize:'20px', fontWeight:700, letterSpacing:'3px', color:C.accent,
        backgroundColor:'rgba(91,200,245,0.15)', padding:'8px 18px', borderRadius:'12px', textTransform:'uppercase' } }, badgeText),
      h('img', { src:logoB64, width:78, height:78, style:{ borderRadius:'12px', objectFit:'cover' } }),
    );
  }

  function hl(text, size=64) {
    return h('span', { style:{ fontSize:`${size}px`, fontWeight:800, color:C.text,
      lineHeight:'1.08', letterSpacing:'-0.5px', textTransform:'uppercase' } }, text);
  }

  function hl2(l1, l2, size=58) {
    return h('div', { style:{ display:'flex', flexDirection:'column' } }, hl(l1,size), hl(l2,size));
  }

  function sl(text) {
    return h('span', { style:{ fontSize:'26px', fontWeight:500, color:C.textSoft,
      lineHeight:'1.5', marginTop:'6px', marginBottom:'4px' } }, text);
  }

  function kl(text) {
    return h('div', { style:{ display:'flex', alignItems:'center', gap:'14px',
      backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'16px', padding:'18px 24px', marginTop:'12px' } },
      h('div', { style:{ display:'flex', width:'6px', minHeight:'36px', backgroundColor:C.red, borderRadius:'3px', flexShrink:'0' } }),
      h('span', { style:{ fontSize:'26px', fontWeight:600, color:C.text, lineHeight:'1.4' } }, text),
    );
  }

  function bfLogo() {
    return h('div', { style:{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', marginTop:'12px' } },
      h('div', { style:{ display:'flex', alignItems:'center', justifyContent:'center',
        width:'68px', height:'52px', border:'3px solid rgba(255,255,255,0.9)', borderRadius:'10px' } },
        h('span', { style:{ fontSize:'26px', fontWeight:800, color:'#FFFFFF', letterSpacing:'2px' } }, 'BF'),
      ),
      h('span', { style:{ fontSize:'12px', fontWeight:600, color:'rgba(255,255,255,0.7)',
        letterSpacing:'3px', textTransform:'uppercase' } }, 'BENARO FINANZEN'),
    );
  }

  function root(children) {
    return h('div', { style:{ display:'flex', flexDirection:'column', width:W, height:H,
      padding:`${PAD}px`, backgroundColor:C.bg, fontFamily:'Outfit' } }, ...children);
  }

  // ── SLIDE 1: HOOK ──────────────────────────────────────────────────────────
  const houseSvg = toB64Svg(`<svg width="140" height="140" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
    <polygon points="70,12 132,64 8,64" fill="none" stroke="#5BC8F5" stroke-width="4" stroke-linejoin="round"/>
    <rect x="20" y="64" width="100" height="68" fill="none" stroke="#5BC8F5" stroke-width="4"/>
    <rect x="50" y="88" width="40" height="44" fill="none" stroke="#5BC8F5" stroke-width="3"/>
    <rect x="28" y="74" width="26" height="20" fill="none" stroke="#5BC8F5" stroke-width="2.5"/>
    <rect x="86" y="74" width="26" height="20" fill="none" stroke="#5BC8F5" stroke-width="2.5"/>
  </svg>`);

  const chartIconSvg = toB64Svg(`<svg width="140" height="140" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="126" width="124" height="3" fill="#5BC8F5" opacity="0.5"/>
    <rect x="8" y="10" width="3" height="116" fill="#5BC8F5" opacity="0.5"/>
    <path d="M 14 116 C 36 98, 56 84, 70 58 C 84 32, 104 20, 130 10" fill="none" stroke="#5BC8F5" stroke-width="4" stroke-linecap="round"/>
    <circle cx="14" cy="116" r="5" fill="#5BC8F5"/>
    <circle cx="70" cy="58" r="5" fill="#5BC8F5"/>
    <circle cx="130" cy="10" r="7" fill="#5BC8F5"/>
  </svg>`);

  const slide1 = root([
    headerRow('WARUM DAS WICHTIG IST'),
    hl('IMMOBILIEN ODER ETF?', 72),
    sl('Eine Entscheidung, die deine Altersvorsorge für immer prägt.'),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'row', gap:'18px', marginTop:'18px', alignItems:'center' } },
      h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', alignItems:'center', justifyContent:'center',
        backgroundColor:C.bgDark, borderRadius:'22px', padding:'30px', gap:'14px', border:`2px solid ${C.border}` } },
        h('img', { src:houseSvg, width:120, height:120, style:{ objectFit:'contain' } }),
        h('span', { style:{ fontSize:'28px', fontWeight:800, color:C.text, textTransform:'uppercase', textAlign:'center' } }, 'IMMOBILIEN'),
        h('span', { style:{ fontSize:'22px', fontWeight:500, color:C.textMuted, textAlign:'center' } }, 'Kaufen und vermieten'),
      ),
      h('div', { style:{ display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', flexShrink:'0' } },
        h('div', { style:{ display:'flex', width:'3px', height:'44px', backgroundColor:C.border } }),
        h('span', { style:{ fontSize:'22px', fontWeight:800, color:C.textMuted } }, 'VS'),
        h('div', { style:{ display:'flex', width:'3px', height:'44px', backgroundColor:C.border } }),
      ),
      h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', alignItems:'center', justifyContent:'center',
        backgroundColor:'rgba(91,200,245,0.12)', borderRadius:'22px', padding:'30px', gap:'14px', border:`2px solid ${C.accent}` } },
        h('img', { src:chartIconSvg, width:120, height:120, style:{ objectFit:'contain' } }),
        h('span', { style:{ fontSize:'28px', fontWeight:800, color:C.accent, textTransform:'uppercase', textAlign:'center' } }, 'ETF-DEPOT'),
        h('span', { style:{ fontSize:'22px', fontWeight:500, color:C.textMuted, textAlign:'center' } }, 'Sparplan und Zinsen'),
      ),
    ),
    kl('Welche Entscheidung macht dich wirklich wohlhabend?'),
    bfLogo(),
  ]);

  // ── SLIDE 2: STAT HERO ────────────────────────────────────────────────────
  const slide2 = root([
    headerRow('DAS MUSST DU WISSEN'),
    hl2('WO STECKT DAS GELD', 'DER DEUTSCHEN?', 54),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'16px' } },
      h('div', { style:{ display:'flex', gap:'12px', marginBottom:'2px' } },
        ...[0,1,2].map(() => h('div', { style:{ display:'flex', width:'0', height:'0',
          borderLeft:'15px solid transparent', borderRight:'15px solid transparent',
          borderTop:`20px solid ${C.red}` } }))
      ),
      h('span', { style:{ fontSize:'144px', fontWeight:800, color:C.accent, lineHeight:'1' } }, '60 %'),
      h('div', { style:{ display:'flex', width:'185px', height:'5px', backgroundColor:C.red, borderRadius:'3px', marginTop:'-6px' } }),
      h('span', { style:{ fontSize:'28px', fontWeight:600, color:C.text, lineHeight:'1.5', textAlign:'center', maxWidth:'820px' } },
        'des privaten Vermögens in Deutschland steckt in Immobilien'),
      h('div', { style:{ display:'flex', padding:'10px 20px', backgroundColor:'rgba(230,48,48,0.12)',
        borderRadius:'12px', border:`1px solid ${C.red}`, marginTop:'4px' } },
        h('span', { style:{ fontSize:'20px', fontWeight:600, color:C.red } }, 'Quelle: Deutsche Bundesbank 2025'),
      ),
    ),
    kl('Immobilien dominieren das Denken — aber ist das auch klug?'),
    bfLogo(),
  ]);

  // ── SLIDE 3: KOSTEN-FUNNEL ────────────────────────────────────────────────
  const costRows = [
    { label:'Brutto-Mietrendite', val:'5,0 %', color:C.accent, w:'100%', bg:'rgba(91,200,245,0.18)', bord:`1px solid ${C.accent}` },
    { label:'minus Kaufnebenkosten (10-15 %, auf 20 Jahre verteilt)', val:'- 0,7 %', color:C.textSoft, w:'84%', bg:C.cardBg, bord:`1px solid ${C.border}` },
    { label:'minus Instandhaltung und Reparaturen (ca. 1-2 % p.a.)', val:'- 1,5 %', color:C.textSoft, w:'66%', bg:C.cardBg, bord:`1px solid ${C.border}` },
    { label:'minus Verwaltung, Steuern und Leerstand', val:'- 0,8 %', color:C.textSoft, w:'50%', bg:C.cardBg, bord:`1px solid ${C.border}` },
    { label:'Tatsächliche Netto-Rendite', val:'ca. 2 %', color:C.red, w:'36%', bg:'rgba(230,48,48,0.18)', bord:`2px solid ${C.red}` },
  ];

  const slide3 = root([
    headerRow('DIE RECHNUNG'),
    hl2('KOSTEN FRESSEN', 'DEINE RENDITE', 54),
    sl('Was von 5 % Brutto-Mietrendite wirklich übrig bleibt:'),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'12px' } },
      ...costRows.map(row =>
        h('div', { style:{ display:'flex', width:row.w, backgroundColor:row.bg,
          borderRadius:'12px', padding:'13px 20px', border:row.bord,
          justifyContent:'space-between', alignItems:'center' } },
          h('span', { style:{ fontSize:'22px', fontWeight:600, color:C.text, lineHeight:'1.3', flex:'1' } }, row.label),
          h('span', { style:{ fontSize:'24px', fontWeight:800, color:row.color, minWidth:'76px', textAlign:'right' } }, row.val),
        )
      ),
    ),
    kl('Bis zu 15 % Kaufnebenkosten drücken die Rendite auf Jahre ins Minus.'),
    bfLogo(),
  ]);

  // ── SLIDE 4: ERWARTUNG VS REALITÄT ────────────────────────────────────────
  const erwItems = [
    'Immobilien sind sicher und wertbeständig',
    'Mieter finanzieren meinen Kredit',
    'Ich sehe, was ich kaufe',
    'ETF ist reine Spekulation',
  ];
  const realItems = [
    'Netto-Rendite oft unter 3 % p.a.',
    'Miete deckt selten Kredit plus Kosten',
    'Klumpenrisiko in einer Assetklasse',
    'MSCI World: historisch plus 7 % p.a.',
  ];

  const slide4 = root([
    headerRow('DER IRRTUM'),
    h('div', { style:{ display:'flex', flexDirection:'column', marginBottom:'2px' } },
      hl('WAS DIE MEISTEN DENKEN -', 52),
      h('span', { style:{ fontSize:'52px', fontWeight:800, color:C.accent, lineHeight:'1.08', textTransform:'uppercase' } }, 'UND WAS STIMMT'),
    ),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'row', gap:'14px', alignItems:'stretch', marginTop:'16px' } },
      h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', backgroundColor:C.bgDark,
        borderRadius:'20px', padding:'24px', gap:'12px', border:`1px solid ${C.border}` } },
        h('span', { style:{ fontSize:'18px', fontWeight:700, letterSpacing:'2px', color:C.textMuted, textTransform:'uppercase' } }, 'ERWARTUNG'),
        h('div', { style:{ display:'flex', width:'100%', height:'3px', backgroundColor:C.border, borderRadius:'2px' } }),
        ...erwItems.map(t =>
          h('div', { style:{ display:'flex', alignItems:'flex-start', gap:'10px' } },
            h('div', { style:{ display:'flex', width:'7px', height:'7px', backgroundColor:C.border, borderRadius:'4px', marginTop:'9px', flexShrink:'0' } }),
            h('span', { style:{ fontSize:'23px', fontWeight:500, color:C.textSoft, lineHeight:'1.4' } }, t),
          )
        ),
      ),
      h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', backgroundColor:'rgba(91,200,245,0.10)',
        borderRadius:'20px', padding:'24px', gap:'12px', border:`2px solid ${C.accent}` } },
        h('span', { style:{ fontSize:'18px', fontWeight:700, letterSpacing:'2px', color:C.accent, textTransform:'uppercase' } }, 'REALITÄT'),
        h('div', { style:{ display:'flex', width:'100%', height:'3px', backgroundColor:C.accent, borderRadius:'2px' } }),
        ...realItems.map(t =>
          h('div', { style:{ display:'flex', alignItems:'flex-start', gap:'10px' } },
            h('div', { style:{ display:'flex', width:'7px', height:'7px', backgroundColor:C.accent, borderRadius:'4px', marginTop:'9px', flexShrink:'0' } }),
            h('span', { style:{ fontSize:'23px', fontWeight:600, color:C.text, lineHeight:'1.4' } }, t),
          )
        ),
      ),
    ),
    kl('Immobilien fühlen sich sicher an — die Zahlen zeigen ein anderes Bild.'),
    bfLogo(),
  ]);

  // ── SLIDE 5: LINE CHART ───────────────────────────────────────────────────
  const cW = 940, cH = 330;
  const maxV = 1085000;
  const toY = (v) => cH - 22 - ((v / maxV) * (cH - 46));
  const toX = (yr) => 26 + (yr / 25) * (cW - 36);

  let etfPts = [], immoPts = [];
  for (let y = 0; y <= 25; y++) {
    etfPts.push(`${y===0?'M':'L'} ${toX(y).toFixed(1)} ${toY(200000*Math.pow(1.07,y)).toFixed(1)}`);
    immoPts.push(`${y===0?'M':'L'} ${toX(y).toFixed(1)} ${toY(200000*Math.pow(1.03,y)).toFixed(1)}`);
  }
  const etfArea = [...etfPts, `L ${toX(25).toFixed(1)} ${(cH-22).toFixed(1)}`, `L ${toX(0).toFixed(1)} ${(cH-22).toFixed(1)}`, 'Z'].join(' ');

  const lineSvg = toB64Svg(`<svg width="${cW}" height="${cH}" viewBox="0 0 ${cW} ${cH}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#5BC8F5" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#5BC8F5" stop-opacity="0.02"/>
    </linearGradient></defs>
    <line x1="${toX(0).toFixed(1)}" y1="${toY(500000).toFixed(1)}" x2="${toX(25).toFixed(1)}" y2="${toY(500000).toFixed(1)}" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="5,4"/>
    <line x1="${toX(0).toFixed(1)}" y1="${toY(1000000).toFixed(1)}" x2="${toX(25).toFixed(1)}" y2="${toY(1000000).toFixed(1)}" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="5,4"/>
    <line x1="${toX(0).toFixed(1)}" y1="${(cH-22).toFixed(1)}" x2="${toX(25).toFixed(1)}" y2="${(cH-22).toFixed(1)}" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>
    <path d="${etfArea}" fill="url(#g1)"/>
    <path d="${immoPts.join(' ')}" fill="none" stroke="#E63030" stroke-width="3.5" stroke-dasharray="8,5" stroke-linecap="round"/>
    <path d="${etfPts.join(' ')}" fill="none" stroke="#5BC8F5" stroke-width="4" stroke-linecap="round"/>
    <circle cx="${toX(25).toFixed(1)}" cy="${toY(1085000).toFixed(1)}" r="8" fill="#5BC8F5"/>
    <circle cx="${toX(25).toFixed(1)}" cy="${toY(418740).toFixed(1)}" r="8" fill="#E63030"/>
    <circle cx="${toX(0).toFixed(1)}" cy="${toY(200000).toFixed(1)}" r="5" fill="rgba(255,255,255,0.5)"/>
    <line x1="${toX(10).toFixed(1)}" y1="${(cH-13).toFixed(1)}" x2="${toX(10).toFixed(1)}" y2="${(cH-21).toFixed(1)}" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    <line x1="${toX(20).toFixed(1)}" y1="${(cH-13).toFixed(1)}" x2="${toX(20).toFixed(1)}" y2="${(cH-21).toFixed(1)}" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    <line x1="${toX(25).toFixed(1)}" y1="${(cH-13).toFixed(1)}" x2="${toX(25).toFixed(1)}" y2="${(cH-21).toFixed(1)}" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  </svg>`);

  const slide5 = root([
    headerRow('DER VERGLEICH'),
    hl('200.000 EURO - 25 JAHRE', 58),
    sl('ETF (7 % p.a.) vs. Immobilien (3 % p.a. netto):'),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'8px' } },
      h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'4px' } },
        h('div', { style:{ display:'flex', alignItems:'center', gap:'10px' } },
          h('div', { style:{ display:'flex', width:'26px', height:'4px', backgroundColor:C.accent, borderRadius:'2px' } }),
          h('span', { style:{ fontSize:'22px', fontWeight:700, color:C.accent } }, 'ETF-Depot'),
        ),
        h('span', { style:{ fontSize:'26px', fontWeight:800, color:C.accent } }, 'ca. 1.085.000 EUR'),
      ),
      h('img', { src:lineSvg, width:cW, height:cH, style:{ objectFit:'contain' } }),
      h('div', { style:{ display:'flex', justifyContent:'space-between', paddingLeft:'16px', paddingRight:'4px', marginTop:'-2px' } },
        h('span', { style:{ fontSize:'18px', fontWeight:500, color:C.textMuted } }, 'Jahr 0'),
        h('span', { style:{ fontSize:'18px', fontWeight:500, color:C.textMuted } }, 'Jahr 10'),
        h('span', { style:{ fontSize:'18px', fontWeight:500, color:C.textMuted } }, 'Jahr 20'),
        h('span', { style:{ fontSize:'18px', fontWeight:500, color:C.textMuted } }, 'Jahr 25'),
      ),
      h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'4px' } },
        h('div', { style:{ display:'flex', alignItems:'center', gap:'10px' } },
          h('div', { style:{ display:'flex', width:'26px', height:'3px', backgroundColor:C.red, borderRadius:'2px' } }),
          h('span', { style:{ fontSize:'22px', fontWeight:700, color:C.red } }, 'Immobilien'),
        ),
        h('span', { style:{ fontSize:'26px', fontWeight:800, color:C.red } }, 'ca. 419.000 EUR'),
      ),
    ),
    kl('Der Unterschied nach 25 Jahren: über 660.000 Euro.'),
    bfLogo(),
  ]);

  // ── SLIDE 6: WANN IMMOBILIEN SINNVOLL ────────────────────────────────────
  const conditions = [
    { num:'01', title:'EIGENNUTZUNG STATT MIETE', text:'Wer selbst einzieht, zahlt keine Miete mehr. Bei langer Haltedauer ab 15 Jahren kann Kaufen günstiger sein als dauerhaftes Mieten.' },
    { num:'02', title:'PROFESSIONELLES PORTFOLIO', text:'Ab mehreren Einheiten entsteht Skaleneffekt. Profis nutzen Fremdkapitalhebel gezielt — nicht als Einzelanlage.' },
    { num:'03', title:'STRATEGISCHE BEIMISCHUNG', text:'Als Ergänzung von max. 20-30 % zum ETF-Depot sinnvoll — niemals als alleinige Geldanlage.' },
  ];

  const slide6 = root([
    headerRow('DIE AUSNAHMEN'),
    h('div', { style:{ display:'flex', flexDirection:'column', marginBottom:'2px' } },
      hl('WANN IMMOBILIEN', 52),
      h('span', { style:{ fontSize:'52px', fontWeight:800, color:C.accent, lineHeight:'1.08', textTransform:'uppercase' } }, 'TROTZDEM SINNVOLL SIND'),
    ),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px', marginTop:'12px' } },
      ...conditions.map(c =>
        h('div', { style:{ display:'flex', flexDirection:'row', gap:'18px', backgroundColor:C.bgDark,
          borderRadius:'18px', padding:'20px 24px', border:`1px solid ${C.border}`, alignItems:'flex-start' } },
          h('span', { style:{ fontSize:'38px', fontWeight:800, color:C.accent, minWidth:'54px', lineHeight:'1' } }, c.num),
          h('div', { style:{ display:'flex', flexDirection:'column', gap:'4px' } },
            h('span', { style:{ fontSize:'23px', fontWeight:800, color:C.white, textTransform:'uppercase', letterSpacing:'0.5px' } }, c.title),
            h('span', { style:{ fontSize:'22px', fontWeight:500, color:C.textSoft, lineHeight:'1.4' } }, c.text),
          ),
        )
      ),
    ),
    kl('Immobilien können sinnvoll sein — aber nur unter diesen Bedingungen.'),
    bfLogo(),
  ]);

  // ── SLIDE 7: LEARNINGS ───────────────────────────────────────────────────
  const learnings = [
    { num:'01', text:'Kaufnebenkosten von bis zu 15 % fressen Jahre deiner Rendite.', pct:25 },
    { num:'02', text:'ETFs liefern historisch ca. 7 % p.a. — bei voller Liquidität.', pct:50 },
    { num:'03', text:'Immobilien als Eigenheim: ja. Als einzige Geldanlage: nein.', pct:75 },
    { num:'04', text:'Früh diversifiziert investieren schlägt den Immobilienmythos.', pct:100 },
  ];

  const slide7 = root([
    headerRow('DEIN FAZIT'),
    hl('4 ERKENNTNISSE', 64),
    sl('Was du jetzt mitnehmen solltest:'),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'12px', marginTop:'10px' } },
      ...learnings.map(l =>
        h('div', { style:{ display:'flex', flexDirection:'column', gap:'8px', padding:'18px 22px',
          backgroundColor:C.bgDark, borderRadius:'18px',
          border: l.pct===100 ? `2px solid ${C.accent}` : `1px solid ${C.border}` } },
          h('div', { style:{ display:'flex', alignItems:'center', gap:'14px' } },
            h('span', { style:{ fontSize:'32px', fontWeight:800, color: l.pct===100 ? C.accent : C.white, minWidth:'48px' } }, l.num),
            h('span', { style:{ fontSize:'24px', fontWeight:600, color:C.text, lineHeight:'1.3' } }, l.text),
          ),
          h('div', { style:{ display:'flex', height:'5px', backgroundColor:C.border, borderRadius:'3px', overflow:'hidden' } },
            h('div', { style:{ display:'flex', width:`${l.pct}%`, height:'5px',
              backgroundColor: l.pct===100 ? C.accent : C.red, borderRadius:'3px' } }),
          ),
        )
      ),
    ),
    kl('Wer früh investiert und diversifiziert, baut nachhaltigen Wohlstand auf.'),
    bfLogo(),
  ]);

  // ── SLIDE 8: CTA ──────────────────────────────────────────────────────────
  const slide8 = root([
    headerRow('JETZT DU'),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'22px' } },
      h('div', { style:{ display:'flex', flexDirection:'column', alignItems:'center' } },
        h('span', { style:{ fontSize:'54px', fontWeight:800, color:C.text, textAlign:'center', lineHeight:'1.12', textTransform:'uppercase' } }, 'IN WELCHE'),
        h('span', { style:{ fontSize:'54px', fontWeight:800, color:C.text, textAlign:'center', lineHeight:'1.12', textTransform:'uppercase' } }, 'RICHTUNG'),
        h('span', { style:{ fontSize:'54px', fontWeight:800, color:C.accent, textAlign:'center', lineHeight:'1.12', textTransform:'uppercase' } }, 'GEHST DU?'),
      ),
      h('div', { style:{ display:'flex', width:'80px', height:'5px', backgroundColor:C.red, borderRadius:'3px' } }),
      h('span', { style:{ fontSize:'28px', fontWeight:500, color:C.textSoft, textAlign:'center', lineHeight:'1.5', maxWidth:'840px' } },
        'Immobilien oder ETF — beide Wege können funktionieren. Wichtig ist, dass du überhaup anfängst und früh handelst.'),
      h('div', { style:{ display:'flex', padding:'18px 30px', backgroundColor:'rgba(91,200,245,0.15)',
        borderRadius:'18px', border:`2px solid ${C.accent}` } },
        h('span', { style:{ fontSize:'28px', fontWeight:700, color:C.accent, textAlign:'center', lineHeight:'1.5' } },
          'Speichere diesen Post und starte noch heute deinen persönlichen Finanzplan.'),
      ),
    ),
    h('div', { style:{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', marginTop:'16px' } },
      bfLogo(),
      h('span', { style:{ fontSize:'20px', fontWeight:500, color:'rgba(255,255,255,0.38)', marginTop:'4px' } }, '@benarofinanzen'),
    ),
  ]);

  // ── GENERATE ─────────────────────────────────────────────────────────────
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  const TODAY = new Date().toISOString().slice(0,10);
  const outDir = path.join(__dirname, 'output', `carousel_${TODAY}`, 'slides');

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width:W, height:H, fonts });
    const resvg = new Resvg(svg, { fitTo:{ mode:'width', value:W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i+1).padStart(2,'0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i+1}/${slides.length} fertig`);
  }
  console.log('Alle Slides generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
