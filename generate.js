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
    bg:       '#001F61',
    text:     '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted:'#9CA3AF',
    cardBg:   'rgba(255,255,255,0.1)',
    border:   'rgba(255,255,255,0.2)',
    green:    '#10B981',
    red:      '#EF4444',
  };

  const W = 1080, H = 1350;

  const h = (type, props, ...ch) => ({
    type, props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function logo() {
    return h('img', { src: logoB64, width:100, height:100,
      style:{ borderRadius:'12px', objectFit:'cover', flexShrink:0 } });
  }

  function topRow(badgeText) {
    return h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'20px' } },
      h('span', { style:{ display:'flex', fontSize:'22px', fontWeight:700, letterSpacing:'3px',
        color:C.text, backgroundColor:C.cardBg, padding:'10px 22px', borderRadius:'12px' } }, badgeText),
      logo(),
    );
  }

  function headline(text, size=64) {
    return h('span', { style:{ fontSize:`${size}px`, fontWeight:800,
      color:C.text, lineHeight:'1.08', letterSpacing:'-1.5px', marginBottom:'4px' } }, text);
  }

  function subline(text) {
    return h('span', { style:{ fontSize:'28px', fontWeight:500,
      color:C.textMuted, lineHeight:'1.5', marginTop:'6px' } }, text);
  }

  function keyLearning(text, accent) {
    return h('div', { style:{ display:'flex', alignItems:'center', gap:'14px',
      backgroundColor:C.cardBg, borderRadius:'16px', padding:'20px 28px', marginTop:'16px' } },
      h('div', { style:{ display:'flex', width:'6px', minHeight:'40px',
        backgroundColor: accent || C.text, borderRadius:'3px', flexShrink:0 } }),
      h('span', { style:{ fontSize:'26px', fontWeight:600, color:C.text, lineHeight:'1.4' } }, text),
    );
  }

  function slideRoot(...children) {
    return h('div', { style:{ display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } }, ...children);
  }

  // ─── SLIDE 1: Hook ─────────────────────────────────────────────────────────
  const slide1 = slideRoot(
    topRow('WICHTIGE FRAGE'),
    headline('Nachhaltig investieren: gut für die Welt — aber für dein Depot?', 62),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'24px' } },
      h('div', { style:{ display:'flex', gap:'20px' } },
        h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', alignItems:'center', justifyContent:'center',
          backgroundColor:'rgba(16,185,129,0.12)', borderRadius:'24px', padding:'40px 24px', gap:'14px',
          border:'1px solid rgba(16,185,129,0.3)' } },
          h('div', { style:{ display:'flex', width:'72px', height:'72px', borderRadius:'36px',
            backgroundColor:C.green, alignItems:'center', justifyContent:'center' } },
            h('span', { style:{ fontSize:'30px', fontWeight:800, color:'#FFFFFF' } }, 'ESG'),
          ),
          h('span', { style:{ fontSize:'30px', fontWeight:700, color:C.text, textAlign:'center' } }, 'Nachhaltig'),
          h('span', { style:{ fontSize:'22px', fontWeight:400, color:C.textMuted, textAlign:'center', lineHeight:'1.4' } },
            'Klima, Gesellschaft, Governance'),
        ),
        h('div', { style:{ display:'flex', alignItems:'center', justifyContent:'center', width:'40px', flexShrink:0 } },
          h('span', { style:{ fontSize:'30px', fontWeight:800, color:C.textMuted } }, 'vs'),
        ),
        h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', alignItems:'center', justifyContent:'center',
          backgroundColor:C.cardBg, borderRadius:'24px', padding:'40px 24px', gap:'14px',
          border:'1px solid rgba(255,255,255,0.15)' } },
          h('div', { style:{ display:'flex', width:'72px', height:'72px', borderRadius:'36px',
            backgroundColor:'rgba(255,255,255,0.15)', alignItems:'center', justifyContent:'center' } },
            h('span', { style:{ fontSize:'24px', fontWeight:800, color:'#FFFFFF' } }, '+7%'),
          ),
          h('span', { style:{ fontSize:'30px', fontWeight:700, color:C.text, textAlign:'center' } }, 'Rendite'),
          h('span', { style:{ fontSize:'22px', fontWeight:400, color:C.textMuted, textAlign:'center', lineHeight:'1.4' } },
            'Langfristiger Vermögensaufbau'),
        ),
      ),
      h('div', { style:{ display:'flex', justifyContent:'center' } },
        h('span', { style:{ fontSize:'30px', fontWeight:600, color:C.textSoft, textAlign:'center' } },
          'Muss ich wählen — oder geht beides?'),
      ),
    ),
    keyLearning('68 % der ESG-ETFs liefern weniger Rendite als der MSCI World'),
  );

  // ─── SLIDE 2: Stat Hero ─────────────────────────────────────────────────────
  const slide2 = slideRoot(
    topRow('ÜBERRASCHENDE ZAHL'),
    headline('Warum ESG-ETFs oft enttäuschen', 68),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      h('div', { style:{ display:'flex', flexDirection:'column', alignItems:'center',
        backgroundColor:C.cardBg, borderRadius:'24px', padding:'44px 40px', gap:'10px' } },
        h('span', { style:{ fontSize:'148px', fontWeight:800, color:C.red, lineHeight:'1', letterSpacing:'-4px' } }, '68%'),
        h('span', { style:{ fontSize:'30px', fontWeight:600, color:C.textSoft, textAlign:'center', lineHeight:'1.4' } },
          'der ESG-ETFs schlagen den MSCI World nicht'),
      ),
      h('div', { style:{ display:'flex', flexDirection:'column', gap:'12px' } },
        h('div', { style:{ display:'flex', alignItems:'center', gap:'16px',
          backgroundColor:'rgba(239,68,68,0.08)', borderRadius:'14px', padding:'16px 24px' } },
          h('div', { style:{ display:'flex', width:'10px', height:'10px', borderRadius:'5px',
            backgroundColor:C.red, flexShrink:0 } }),
          h('span', { style:{ fontSize:'26px', fontWeight:600, color:C.text } },
            'Höhere Kosten: bis zu 0,25 % mehr TER pro Jahr'),
        ),
        h('div', { style:{ display:'flex', alignItems:'center', gap:'16px',
          backgroundColor:'rgba(239,68,68,0.08)', borderRadius:'14px', padding:'16px 24px' } },
          h('div', { style:{ display:'flex', width:'10px', height:'10px', borderRadius:'5px',
            backgroundColor:C.red, flexShrink:0 } }),
          h('span', { style:{ fontSize:'26px', fontWeight:600, color:C.text } },
            'Weniger Diversifikation: bis zu 900 Aktien weniger'),
        ),
        h('div', { style:{ display:'flex', alignItems:'center', gap:'16px',
          backgroundColor:'rgba(239,68,68,0.08)', borderRadius:'14px', padding:'16px 24px' } },
          h('div', { style:{ display:'flex', width:'10px', height:'10px', borderRadius:'5px',
            backgroundColor:C.red, flexShrink:0 } }),
          h('span', { style:{ fontSize:'26px', fontWeight:600, color:C.text } },
            'Greenwashing: Viele ETFs sind kaum nachhaltiger'),
        ),
      ),
    ),
    keyLearning('Schlechte ESG-Wahl kostet Rendite ohne echten Nutzen', C.red),
  );

  // ─── SLIDE 3: Contrast Cards ─────────────────────────────────────────────────
  const slide3 = slideRoot(
    topRow('DIE WAHRHEIT'),
    headline('Was viele denken vs. was wirklich zählt', 62),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' } },
      h('div', { style:{ display:'flex', gap:'14px' } },
        h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', backgroundColor:C.cardBg,
          borderRadius:'20px', padding:'28px', gap:'12px' } },
          h('span', { style:{ fontSize:'22px', fontWeight:700, letterSpacing:'2px', color:C.textMuted } }, 'ERWARTUNG'),
          h('div', { style:{ display:'flex', width:'100%', height:'4px', backgroundColor:C.border, borderRadius:'2px' } }),
          h('span', { style:{ fontSize:'28px', fontWeight:600, color:C.textSoft, lineHeight:'1.4' } },
            'ESG = Rendite PLUS gutes Gewissen automatisch'),
          h('span', { style:{ fontSize:'22px', fontWeight:400, color:C.textMuted, lineHeight:'1.4', marginTop:'6px' } },
            'Nachhaltige Firmen performen einfach besser'),
        ),
        h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', backgroundColor:'rgba(255,255,255,0.15)',
          borderRadius:'20px', padding:'28px', gap:'12px' } },
          h('span', { style:{ fontSize:'22px', fontWeight:700, letterSpacing:'2px', color:'rgba(255,255,255,0.5)' } }, 'REALITÄT'),
          h('div', { style:{ display:'flex', width:'100%', height:'4px', backgroundColor:'rgba(255,255,255,0.3)', borderRadius:'2px' } }),
          h('span', { style:{ fontSize:'28px', fontWeight:600, color:'#FFFFFF', lineHeight:'1.4' } },
            'ESG = weniger Auswahl, höhere Kosten, oft Greenwashing'),
          h('span', { style:{ fontSize:'22px', fontWeight:400, color:'rgba(255,255,255,0.65)', lineHeight:'1.4', marginTop:'6px' } },
            'Viele Fonds exkludieren profitable Branchen'),
        ),
      ),
      h('div', { style:{ display:'flex', flexDirection:'column', backgroundColor:C.cardBg,
        borderRadius:'20px', padding:'28px', gap:'8px' } },
        h('span', { style:{ fontSize:'28px', fontWeight:700, color:C.text, lineHeight:'1.3' } },
          'Das ESG-Label allein sagt nichts über die Qualität.'),
        h('span', { style:{ fontSize:'24px', fontWeight:400, color:C.textMuted, lineHeight:'1.5' } },
          'Die Wahl des richtigen Index entscheidet alles.'),
      ),
    ),
    keyLearning('Nicht jedes ESG-Label schützt vor schlechter Performance'),
  );

  // ─── SLIDE 4: Turning Point ─────────────────────────────────────────────────
  // SVG comparison chart (no <text> elements)
  const chartSvg = `<svg width="940" height="260" viewBox="0 0 940 260" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#10B981" stop-opacity="0.0"/>
        <stop offset="100%" stop-color="#10B981" stop-opacity="1"/>
      </linearGradient>
    </defs>
    <line x1="0" y1="250" x2="940" y2="250" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <line x1="0" y1="180" x2="940" y2="180" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="6,6"/>
    <line x1="0" y1="110" x2="940" y2="110" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="6,6"/>
    <line x1="0" y1="40" x2="940" y2="40" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="6,6"/>
    <path d="M 0 240 C 150 220, 300 190, 470 150 C 640 110, 780 68, 940 32"
          fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="3"/>
    <path d="M 0 240 C 150 222, 300 196, 470 160 C 640 124, 780 84, 940 46"
          fill="none" stroke="#10B981" stroke-width="4"/>
    <circle cx="940" cy="32" r="7" fill="rgba(255,255,255,0.7)"/>
    <circle cx="940" cy="46" r="7" fill="#10B981"/>
  </svg>`;
  const chartSrc = `data:image/svg+xml;base64,${Buffer.from(chartSvg).toString('base64')}`;

  const slide4 = slideRoot(
    topRow('ABER WARTE'),
    headline('Manche ESG-ETFs schlagen sogar normale ETFs', 58),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' } },
      h('div', { style:{ display:'flex', flexDirection:'column', backgroundColor:C.cardBg, borderRadius:'24px', padding:'28px', gap:'12px' } },
        h('div', { style:{ display:'flex', justifyContent:'space-between' } },
          h('div', { style:{ display:'flex', alignItems:'center', gap:'10px' } },
            h('div', { style:{ display:'flex', width:'20px', height:'4px', backgroundColor:C.green, borderRadius:'2px' } }),
            h('span', { style:{ fontSize:'22px', fontWeight:600, color:C.green } }, 'MSCI World ESG Leaders'),
          ),
          h('div', { style:{ display:'flex', alignItems:'center', gap:'10px' } },
            h('div', { style:{ display:'flex', width:'20px', height:'4px', backgroundColor:'rgba(255,255,255,0.55)', borderRadius:'2px' } }),
            h('span', { style:{ fontSize:'22px', fontWeight:600, color:C.textSoft } }, 'MSCI World'),
          ),
        ),
        h('img', { src:chartSrc, width:940, height:260, style:{ objectFit:'contain' } }),
        h('div', { style:{ display:'flex', justifyContent:'space-between' } },
          h('span', { style:{ fontSize:'22px', fontWeight:500, color:C.textMuted } }, '2016'),
          h('span', { style:{ fontSize:'22px', fontWeight:500, color:C.textMuted } }, '2026'),
        ),
      ),
      h('div', { style:{ display:'flex', gap:'16px' } },
        h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', alignItems:'center',
          backgroundColor:'rgba(16,185,129,0.1)', borderRadius:'16px', padding:'18px', gap:'4px' } },
          h('span', { style:{ fontSize:'36px', fontWeight:800, color:C.green } }, '+187%'),
          h('span', { style:{ fontSize:'20px', fontWeight:500, color:C.textMuted } }, 'ESG Leaders 10J'),
        ),
        h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', alignItems:'center',
          backgroundColor:C.cardBg, borderRadius:'16px', padding:'18px', gap:'4px' } },
          h('span', { style:{ fontSize:'36px', fontWeight:800, color:C.text } }, '+201%'),
          h('span', { style:{ fontSize:'20px', fontWeight:500, color:C.textMuted } }, 'MSCI World 10J'),
        ),
        h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', alignItems:'center',
          backgroundColor:C.cardBg, borderRadius:'16px', padding:'18px', gap:'4px' } },
          h('span', { style:{ fontSize:'36px', fontWeight:800, color:C.text } }, '-0,8%'),
          h('span', { style:{ fontSize:'20px', fontWeight:500, color:C.textMuted } }, 'p.a. Unterschied'),
        ),
      ),
    ),
    keyLearning('Nur ~1 % weniger Rendite pro Jahr für nachhaltigeres Depot'),
  );

  // ─── SLIDE 5: Vergleichsdaten ────────────────────────────────────────────────
  const slide5 = slideRoot(
    topRow('DIE ZAHLEN'),
    headline('MSCI World vs. ESG Leaders', 68),
    subline('10-Jahres-Vergleich 2016-2026'),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' } },
      h('div', { style:{ display:'flex', gap:'16px' } },
        h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', backgroundColor:C.cardBg,
          borderRadius:'20px', padding:'28px', gap:'10px' } },
          h('span', { style:{ fontSize:'20px', fontWeight:700, letterSpacing:'1px', color:C.textMuted } }, 'MSCI WORLD'),
          h('span', { style:{ fontSize:'56px', fontWeight:800, color:C.text, lineHeight:'1' } }, '+201%'),
          h('span', { style:{ fontSize:'22px', fontWeight:500, color:C.textMuted } }, '10 Jahre Rendite'),
          h('div', { style:{ display:'flex', height:'1px', backgroundColor:C.border } }),
          h('span', { style:{ fontSize:'24px', fontWeight:600, color:C.textSoft } }, 'TER: 0,10-0,20 % p.a.'),
          h('span', { style:{ fontSize:'24px', fontWeight:600, color:C.textSoft } }, '1.600+ Aktien'),
        ),
        h('div', { style:{ display:'flex', flex:'1', flexDirection:'column',
          backgroundColor:'rgba(16,185,129,0.1)', borderRadius:'20px', padding:'28px', gap:'10px',
          border:'1px solid rgba(16,185,129,0.3)' } },
          h('span', { style:{ fontSize:'20px', fontWeight:700, letterSpacing:'1px', color:C.green } }, 'ESG LEADERS'),
          h('span', { style:{ fontSize:'56px', fontWeight:800, color:C.text, lineHeight:'1' } }, '+187%'),
          h('span', { style:{ fontSize:'22px', fontWeight:500, color:C.textMuted } }, '10 Jahre Rendite'),
          h('div', { style:{ display:'flex', height:'1px', backgroundColor:'rgba(16,185,129,0.3)' } }),
          h('span', { style:{ fontSize:'24px', fontWeight:600, color:C.textSoft } }, 'TER: 0,18-0,25 % p.a.'),
          h('span', { style:{ fontSize:'24px', fontWeight:600, color:C.textSoft } }, '714 Aktien'),
        ),
      ),
      h('div', { style:{ display:'flex', flexDirection:'column', backgroundColor:C.cardBg,
        borderRadius:'16px', padding:'24px 28px', gap:'6px' } },
        h('span', { style:{ fontSize:'26px', fontWeight:700, color:C.text } },
          'Fazit: Der Kompromiss ist kleiner als gedacht.'),
        h('span', { style:{ fontSize:'24px', fontWeight:400, color:C.textMuted, lineHeight:'1.5' } },
          '14 Prozentpunkte über 10 Jahre — das entspricht ~1,4 % p.a.'),
      ),
    ),
    keyLearning('ESG Leaders = solider Kompromiss zwischen Rendite und Werten'),
  );

  // ─── SLIDE 6: 3 Kriterien ────────────────────────────────────────────────────
  const slide6 = slideRoot(
    topRow('SO GEHT\'S RICHTIG'),
    headline('3 Kriterien für einen guten ESG-ETF', 60),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'14px' } },
      h('div', { style:{ display:'flex', flexDirection:'column', backgroundColor:C.cardBg,
        borderRadius:'20px', padding:'28px 32px', gap:'0px' } },
        h('div', { style:{ display:'flex', alignItems:'flex-start', gap:'20px', padding:'20px 0' } },
          h('span', { style:{ fontSize:'48px', fontWeight:800, color:C.green, minWidth:'60px', lineHeight:'1' } }, '01'),
          h('div', { style:{ display:'flex', flexDirection:'column', gap:'4px' } },
            h('span', { style:{ fontSize:'30px', fontWeight:700, color:C.text } }, 'Breite Diversifikation'),
            h('span', { style:{ fontSize:'24px', fontWeight:500, color:C.textMuted, lineHeight:'1.4' } },
              'Mind. 500 Aktien — ESG Leaders oder SRI+ Indizes wählen'),
          ),
        ),
        h('div', { style:{ display:'flex', height:'1px', backgroundColor:C.border } }),
        h('div', { style:{ display:'flex', alignItems:'flex-start', gap:'20px', padding:'20px 0' } },
          h('span', { style:{ fontSize:'48px', fontWeight:800, color:C.green, minWidth:'60px', lineHeight:'1' } }, '02'),
          h('div', { style:{ display:'flex', flexDirection:'column', gap:'4px' } },
            h('span', { style:{ fontSize:'30px', fontWeight:700, color:C.text } }, 'Günstige Kosten'),
            h('span', { style:{ fontSize:'24px', fontWeight:500, color:C.textMuted, lineHeight:'1.4' } },
              'TER unter 0,25 % p.a. — sonst frisst die Gebühr die Rendite auf'),
          ),
        ),
        h('div', { style:{ display:'flex', height:'1px', backgroundColor:C.border } }),
        h('div', { style:{ display:'flex', alignItems:'flex-start', gap:'20px', padding:'20px 0' } },
          h('span', { style:{ fontSize:'48px', fontWeight:800, color:C.green, minWidth:'60px', lineHeight:'1' } }, '03'),
          h('div', { style:{ display:'flex', flexDirection:'column', gap:'4px' } },
            h('span', { style:{ fontSize:'30px', fontWeight:700, color:C.text } }, 'ESG-Score prüfen'),
            h('span', { style:{ fontSize:'24px', fontWeight:500, color:C.textMuted, lineHeight:'1.4' } },
              'MSCI ESG Rating mind. BBB — auf justETF.com nachschlagen'),
          ),
        ),
      ),
    ),
    keyLearning('Empfehlung: iShares MSCI World ESG Leaders (TER 0,20 %)'),
  );

  // ─── SLIDE 7: Learnings ──────────────────────────────────────────────────────
  const learnings = [
    { num:'01', text:'68 % der ESG-ETFs liefern weniger Rendite als der MSCI World', pct:25 },
    { num:'02', text:'ESG Leaders verliert nur ~1 % p.a. — für deutlich grüneres Depot', pct:50 },
    { num:'03', text:'3 Kriterien: Diversifikation, Kosten unter 0,25 %, ESG-Score prüfen', pct:75 },
    { num:'04', text:'Mit dem richtigen ETF geht Rendite UND Gewissen ohne Kompromiss', pct:100 },
  ];

  const slide7 = slideRoot(
    topRow('DEINE TAKEAWAYS'),
    headline('Was du jetzt weißt', 68),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'12px' } },
      ...learnings.map(l =>
        h('div', { style:{ display:'flex', flexDirection:'column', gap:'8px', padding:'18px 24px',
          backgroundColor:C.cardBg, borderRadius:'18px' } },
          h('div', { style:{ display:'flex', alignItems:'center', gap:'18px' } },
            h('span', { style:{ fontSize:'36px', fontWeight:800, color: l.pct===100 ? C.green : C.text, minWidth:'56px' } }, l.num),
            h('span', { style:{ fontSize:'24px', fontWeight:600, color:C.text, lineHeight:'1.3' } }, l.text),
          ),
          h('div', { style:{ display:'flex', height:'5px', backgroundColor:C.border, borderRadius:'3px', overflow:'hidden' } },
            h('div', { style:{ display:'flex', width:`${l.pct}%`, height:'5px',
              backgroundColor: l.pct===100 ? C.green : C.text, borderRadius:'3px' } }),
          ),
        )
      ),
    ),
    keyLearning('Gut informiert investieren ist immer die beste Strategie'),
  );

  // ─── SLIDE 8: CTA ────────────────────────────────────────────────────────────
  const slide8 = slideRoot(
    topRow('DEINE MEINUNG'),
    headline('Investierst du bereits in ESG-ETFs?', 62),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'28px' } },
      h('div', { style:{ display:'flex', gap:'16px', width:'100%' } },
        h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', alignItems:'center',
          backgroundColor:'rgba(16,185,129,0.12)', borderRadius:'20px', padding:'32px', gap:'10px',
          border:'1px solid rgba(16,185,129,0.3)' } },
          h('span', { style:{ fontSize:'48px', fontWeight:800, color:C.green } }, 'JA'),
          h('span', { style:{ fontSize:'22px', fontWeight:500, color:C.textSoft, textAlign:'center', lineHeight:'1.4' } },
            'Ich nutze schon ESG-ETFs'),
        ),
        h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', alignItems:'center',
          backgroundColor:C.cardBg, borderRadius:'20px', padding:'32px', gap:'10px' } },
          h('span', { style:{ fontSize:'48px', fontWeight:800, color:C.text } }, 'NEIN'),
          h('span', { style:{ fontSize:'22px', fontWeight:500, color:C.textSoft, textAlign:'center', lineHeight:'1.4' } },
            'Normale ETFs reichen mir'),
        ),
      ),
      h('span', { style:{ fontSize:'30px', fontWeight:600, color:C.textSoft, textAlign:'center', lineHeight:'1.5' } },
        'Schreib deine Antwort in die Kommentare'),
      h('div', { style:{ display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' } },
        h('img', { src:logoB64, width:80, height:80, style:{ borderRadius:'12px', objectFit:'cover' } }),
        h('span', { style:{ fontSize:'24px', fontWeight:500, color:C.textMuted } }, '@benarofinanzen'),
        h('span', { style:{ fontSize:'22px', fontWeight:400, color:C.textMuted } },
          'Folge uns für mehr Finanzwissen'),
      ),
    ),
    keyLearning('Speichern nicht vergessen — du brauchst das noch!'),
  );

  // ─── GENERATE ────────────────────────────────────────────────────────────────
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  const TODAY = process.env.TODAY || new Date().toISOString().slice(0, 10);
  const outDir = path.join(__dirname, 'output', `carousel_${TODAY}`, 'slides');
  fs.mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width:W, height:H, fonts });
    const resvg = new Resvg(svg, { fitTo:{ mode:'width', value:W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i+1).padStart(2,'0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i+1}/${slides.length} done: ${pngPath}`);
  }
  console.log('All slides generated!');
}

main().catch(e => { console.error(e); process.exit(1); });
