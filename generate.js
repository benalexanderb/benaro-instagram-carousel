const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default;
  const { Resvg } = require('@resvg/resvg-js');

  const fontDir = '/home/user/benaro-instagram-carousel/node_modules/@fontsource/outfit/files';
  const fonts = [400,500,600,700,800].flatMap(w => [
    { name:'Outfit', weight:w, style:'normal', data: fs.readFileSync(`${fontDir}/outfit-latin-${w}-normal.woff`) },
    { name:'Outfit', weight:w, style:'normal', data: fs.readFileSync(`${fontDir}/outfit-latin-ext-${w}-normal.woff`) },
  ]);

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync('/home/user/benaro-instagram-carousel/skills/instagram-carousel-skill/templates/benaro-logo.jpg').toString('base64');

  const C = {
    bg:       '#001F61',
    text:     '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted:'#9CA3AF',
    cardBg:   'rgba(255,255,255,0.10)',
    border:   'rgba(255,255,255,0.20)',
    green:    '#10B981',
    red:      '#EF4444',
    amber:    '#F59E0B',
  };

  const W = 1080, H = 1350;

  const h = (type, props, ...ch) => ({
    type, props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function logoImg() {
    return h('img', { src: logoB64, width: 120, height: 120,
      style: { borderRadius:'12px', objectFit:'cover', flexShrink:'0' } });
  }

  function badgeEl(text) {
    return h('span', { style: { display:'flex', fontSize:'22px', fontWeight:700, letterSpacing:'3px',
      color: C.text, backgroundColor: C.cardBg, padding:'10px 22px', borderRadius:'12px' } }, text);
  }

  function slideHeader(badgeText) {
    return h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'24px' } },
      badgeEl(badgeText),
      logoImg(),
    );
  }

  function headlineEl(text, size) {
    return h('span', { style: { fontSize:`${size || 56}px`, fontWeight:800,
      color: C.text, lineHeight:'1.08', letterSpacing:'-1.5px', marginBottom:'6px' } }, text);
  }

  function sublineEl(text) {
    return h('span', { style: { fontSize:'28px', fontWeight:500,
      color: C.textMuted, lineHeight:'1.4', marginTop:'8px' } }, text);
  }

  function keyLearningEl(text, accentColor) {
    return h('div', { style: { display:'flex', alignItems:'center', gap:'14px',
      backgroundColor: C.cardBg, borderRadius:'16px', padding:'22px 28px', marginTop:'auto' } },
      h('div', { style: { display:'flex', width:'6px', minHeight:'40px',
        backgroundColor: accentColor || C.text, borderRadius:'3px', flexShrink:'0' } }),
      h('span', { style: { fontSize:'27px', fontWeight:600, color: C.text, lineHeight:'1.4' } }, text),
    );
  }

  // ===== SLIDE 1: HOOK =====
  const slide1 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    slideHeader('ACHTUNG KRYPTO-ANLEGER'),
    headlineEl('Deine Krypto-Daten landen jetzt beim Finanzamt', 58),
    sublineEl('Neue Meldepflicht seit 2026 — was das für dich bedeutet'),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'28px' } },
      h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', backgroundColor:'rgba(239,68,68,0.10)', borderRadius:'24px', padding:'40px 24px', border:'2px solid rgba(239,68,68,0.30)' } },
        h('span', { style: { fontSize:'140px', fontWeight:800, color:C.red, lineHeight:'1', letterSpacing:'-4px' } }, '2026'),
        h('span', { style: { fontSize:'30px', fontWeight:700, color:C.textSoft, letterSpacing:'2px', marginTop:'8px' } }, 'NEUE MELDEPFLICHT'),
      ),
      h('div', { style: { display:'flex', gap:'14px', justifyContent:'center' } },
        ...['Trade Republic','Bitpanda','Coinbase','Kraken'].map(name =>
          h('div', { style: { display:'flex', padding:'12px 22px', backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'40px', border:'1px solid rgba(255,255,255,0.15)' } },
            h('span', { style: { fontSize:'24px', fontWeight:600, color:C.text } }, name)
          )
        ),
      ),
    ),

    keyLearningEl('Seit 2026 melden alle deutschen Kryptobörsen deine Transaktionen automatisch an das Finanzamt'),
  );

  // ===== SLIDE 2: DIE NEUE MELDEPFLICHT =====
  const slide2 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    slideHeader('DIE NEUE MELDEPFLICHT'),
    headlineEl('So fließen deine Daten ans Finanzamt', 56),
    sublineEl('Der automatische Datenweg seit 2026'),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'28px' } },
      h('div', { style: { display:'flex', alignItems:'center', gap:'12px' } },
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', backgroundColor:C.cardBg, borderRadius:'20px', padding:'28px 20px', gap:'10px', border:'1px solid rgba(255,255,255,0.15)' } },
          h('span', { style: { fontSize:'50px', fontWeight:800, color:C.green } }, 'BTC'),
          h('span', { style: { fontSize:'26px', fontWeight:700, color:C.text, textAlign:'center' } }, 'Kryptobörse'),
          h('span', { style: { fontSize:'21px', fontWeight:500, color:C.textMuted, textAlign:'center' } }, 'Trade Republic, Bitpanda, Coinbase...'),
        ),
        h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'4px' } },
          h('div', { style: { display:'flex', width:'40px', height:'4px', backgroundColor:'rgba(255,255,255,0.3)', borderRadius:'2px' } }),
          h('div', { style: { display:'flex', width:'0', height:'0', borderTop:'10px solid transparent', borderBottom:'10px solid transparent', borderLeft:'14px solid rgba(255,255,255,0.3)' } }),
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', backgroundColor:C.cardBg, borderRadius:'20px', padding:'28px 20px', gap:'10px', border:'1px solid rgba(255,255,255,0.15)' } },
          h('span', { style: { fontSize:'50px', fontWeight:800, color:C.textMuted } }, 'DE'),
          h('span', { style: { fontSize:'26px', fontWeight:700, color:C.text, textAlign:'center' } }, 'Bundeszentralamt'),
          h('span', { style: { fontSize:'21px', fontWeight:500, color:C.textMuted, textAlign:'center' } }, 'für Steuern'),
        ),
        h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'4px' } },
          h('div', { style: { display:'flex', width:'40px', height:'4px', backgroundColor:'rgba(239,68,68,0.5)', borderRadius:'2px' } }),
          h('div', { style: { display:'flex', width:'0', height:'0', borderTop:'10px solid transparent', borderBottom:'10px solid transparent', borderLeft:'14px solid rgba(239,68,68,0.5)' } }),
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', backgroundColor:'rgba(239,68,68,0.10)', borderRadius:'20px', padding:'28px 20px', gap:'10px', border:'1px solid rgba(239,68,68,0.30)' } },
          h('span', { style: { fontSize:'50px', fontWeight:800, color:C.red } }, '!'),
          h('span', { style: { fontSize:'26px', fontWeight:700, color:C.red, textAlign:'center' } }, 'Dein Finanzamt'),
          h('span', { style: { fontSize:'21px', fontWeight:500, color:'rgba(239,68,68,0.70)', textAlign:'center' } }, 'weiß Bescheid'),
        ),
      ),
      h('div', { style: { display:'flex', padding:'28px 32px', backgroundColor:'rgba(239,68,68,0.08)', borderRadius:'20px', border:'1px solid rgba(239,68,68,0.20)', gap:'16px', alignItems:'center' } },
        h('div', { style: { display:'flex', width:'10px', minHeight:'40px', backgroundColor:C.red, borderRadius:'5px', flexShrink:'0' } }),
        h('span', { style: { fontSize:'27px', fontWeight:600, color:C.textSoft, lineHeight:'1.4' } }, 'Kein anonymes Handeln mehr — alle Transaktionen werden seit 2026 automatisch gemeldet'),
      ),
    ),

    keyLearningEl('Kein manuelles Nachfassen mehr — die Datenweitergabe erfolgt automatisch'),
  );

  // ===== SLIDE 3: DAS RISIKO =====
  const slide3 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    slideHeader('DAS RISIKO'),
    headlineEl('Was passiert, wenn du Gewinne nicht deklarierst?', 50),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'24px' } },
      h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', marginBottom:'8px' } },
        h('span', { style: { fontSize:'160px', fontWeight:800, color:C.red, lineHeight:'1', letterSpacing:'-4px' } }, '10'),
        h('span', { style: { fontSize:'36px', fontWeight:700, color:C.textSoft, letterSpacing:'2px', marginTop:'-8px' } }, 'JAHRE RÜCKWIRKEND'),
        h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textMuted, marginTop:'4px' } }, 'kann das Finanzamt nachfordern'),
      ),
      h('div', { style: { display:'flex', gap:'16px' } },
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:'rgba(239,68,68,0.08)', borderRadius:'20px', padding:'28px 24px', gap:'10px', border:'1px solid rgba(239,68,68,0.20)' } },
          h('span', { style: { fontSize:'40px', fontWeight:800, color:C.red } }, '01'),
          h('span', { style: { fontSize:'26px', fontWeight:700, color:C.text } }, 'Nachzahlung'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textMuted, lineHeight:'1.4' } }, 'Steuern + Zinsen auf alle unversteuerten Gewinne — rückwirkend'),
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:'rgba(239,68,68,0.08)', borderRadius:'20px', padding:'28px 24px', gap:'10px', border:'1px solid rgba(239,68,68,0.20)' } },
          h('span', { style: { fontSize:'40px', fontWeight:800, color:C.red } }, '02'),
          h('span', { style: { fontSize:'26px', fontWeight:700, color:C.text } }, 'Strafverfolgung'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textMuted, lineHeight:'1.4' } }, 'Bei vorsätzlicher Hinterziehung: Geldstrafe oder Freiheitsstrafe'),
        ),
      ),
    ),

    keyLearningEl('Das Finanzamt prüft jetzt automatisch — Unwissenheit schützt nicht vor Strafe', C.red),
  );

  // ===== SLIDE 4: DIE 3 STEUERREGELN =====
  const slide4 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    slideHeader('DIE STEUERREGELN'),
    headlineEl('3 Regeln, die jeder Krypto-Anleger kennen muss', 50),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      h('div', { style: { display:'flex', borderRadius:'20px', overflow:'hidden' } },
        h('div', { style: { display:'flex', width:'8px', backgroundColor:C.green, flexShrink:'0' } }),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:'rgba(16,185,129,0.08)', padding:'24px 28px', gap:'6px' } },
          h('span', { style: { fontSize:'21px', fontWeight:700, letterSpacing:'2px', color:C.green } }, 'REGEL 1 — STEUERFREI'),
          h('span', { style: { fontSize:'30px', fontWeight:800, color:C.text } }, 'Länger als 1 Jahr halten'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textMuted, lineHeight:'1.4' } }, 'Gewinne aus dem Verkauf von Krypto sind nach 12 Monaten Haltedauer komplett steuerfrei'),
        ),
      ),
      h('div', { style: { display:'flex', borderRadius:'20px', overflow:'hidden' } },
        h('div', { style: { display:'flex', width:'8px', backgroundColor:C.amber, flexShrink:'0' } }),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:'rgba(245,158,11,0.08)', padding:'24px 28px', gap:'6px' } },
          h('span', { style: { fontSize:'21px', fontWeight:700, letterSpacing:'2px', color:C.amber } }, 'REGEL 2 — EINKOMMENSTEUER'),
          h('span', { style: { fontSize:'30px', fontWeight:800, color:C.text } }, 'Weniger als 1 Jahr gehalten'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textMuted, lineHeight:'1.4' } }, 'Gewinne über 600 EUR werden mit deinem persönlichen Steuersatz versteuert (bis zu 45 %)'),
        ),
      ),
      h('div', { style: { display:'flex', borderRadius:'20px', overflow:'hidden' } },
        h('div', { style: { display:'flex', width:'8px', backgroundColor:C.red, flexShrink:'0' } }),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:'rgba(239,68,68,0.08)', padding:'24px 28px', gap:'6px' } },
          h('span', { style: { fontSize:'21px', fontWeight:700, letterSpacing:'2px', color:C.red } }, 'REGEL 3 — SOFORT STEUERPFLICHTIG'),
          h('span', { style: { fontSize:'30px', fontWeight:800, color:C.text } }, 'Staking und Mining'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textMuted, lineHeight:'1.4' } }, 'Einnahmen aus Staking und Mining gelten als sonstige Einkünfte — ab dem ersten Euro steuerpflichtig'),
        ),
      ),
    ),

    keyLearningEl('Die 1-Jahres-Haltefrist ist dein wichtigstes Steuerspar-Instrument bei Krypto'),
  );

  // ===== SLIDE 5: DIE METHODE =====
  const slide5 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    slideHeader('SO GEHST DU VOR'),
    headlineEl('In 3 Schritten zur korrekten Krypto-Steuer', 52),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      ...[
        { num:'1', title:'CSV-Export herunterladen', desc:'Transaktionshistorie von jeder Börse exportieren — das geht in jedem Account unter Einstellungen' },
        { num:'2', title:'FIFO-Methode anwenden', desc:'Älteste Käufe = älteste Verkäufe (gesetzliche Pflicht in DE). Tools wie Cointracking oder Blockpit machen das automatisch' },
        { num:'3', title:'Anlage SO ausfüllen', desc:'Gewinne über 600 EUR in die Steuererklärung eintragen — in der Anlage SO für sonstige Einkünfte' },
      ].map(step =>
        h('div', { style: { display:'flex', flexDirection:'column', backgroundColor:C.cardBg, borderRadius:'20px', padding:'28px', gap:'10px' } },
          h('div', { style: { display:'flex', alignItems:'center', gap:'20px' } },
            h('div', { style: { display:'flex', width:'62px', height:'62px', borderRadius:'16px', backgroundColor:C.green, alignItems:'center', justifyContent:'center', flexShrink:'0' } },
              h('span', { style: { fontSize:'34px', fontWeight:800, color:'#FFFFFF' } }, step.num),
            ),
            h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' } },
              h('span', { style: { fontSize:'28px', fontWeight:800, color:C.text } }, step.title),
              h('span', { style: { fontSize:'23px', fontWeight:500, color:C.textMuted, lineHeight:'1.4' } }, step.desc),
            ),
          ),
        )
      ),
    ),

    keyLearningEl('Tools: Cointracking.info, Blockpit oder Accointing berechnen die Steuer automatisch'),
  );

  // ===== SLIDE 6: TAKEAWAYS =====
  const learnings = [
    { num:'01', text:'1 Jahr Haltefrist einhalten — Gewinne werden steuerfrei', pct:25 },
    { num:'02', text:'Unter 600 EUR Jahresgewinn — keine Steuerpflicht', pct:50 },
    { num:'03', text:'Verluste verrechnen — senkt deine Steuerlast erheblich', pct:75 },
    { num:'04', text:'Ab 2026 Meldepflicht — alle deutschen Börsen berichten automatisch', pct:100 },
  ];

  const slide6 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    slideHeader('DEINE 4 TAKEAWAYS'),
    headlineEl('Was du jetzt über Krypto-Steuern wissen musst', 50),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'18px' } },
      ...learnings.map(l =>
        h('div', { style: { display:'flex', flexDirection:'column', gap:'10px', padding:'22px 28px', backgroundColor:C.cardBg, borderRadius:'18px' } },
          h('div', { style: { display:'flex', alignItems:'center', gap:'18px' } },
            h('span', { style: { fontSize:'38px', fontWeight:800, color: l.pct === 100 ? C.green : C.text, minWidth:'56px' } }, l.num),
            h('span', { style: { fontSize:'26px', fontWeight:600, color:C.text, lineHeight:'1.3' } }, l.text),
          ),
          h('div', { style: { display:'flex', height:'6px', backgroundColor:C.border, borderRadius:'3px', overflow:'hidden' } },
            h('div', { style: { display:'flex', width:`${l.pct}%`, height:'6px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius:'3px' } }),
          ),
        )
      ),
    ),

    keyLearningEl('Jetzt handeln: Q4 ist der letzte Moment für Steueroptimierung 2026'),
  );

  // ===== SLIDE 7: CTA =====
  const slide7 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    h('div', { style: { display:'flex', justifyContent:'flex-end', marginBottom:'24px' } },
      logoImg(),
    ),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'28px' } },
      h('span', { style: { fontSize:'24px', fontWeight:700, letterSpacing:'3px', color:C.textMuted } }, 'BENARO FINANZEN'),
      h('span', { style: { fontSize:'60px', fontWeight:800, color:C.text, lineHeight:'1.1', letterSpacing:'-2px', textAlign:'center' } }, 'Hast du deine Krypto-Steuer 2026 im Griff?'),
      h('span', { style: { fontSize:'30px', fontWeight:500, color:C.textMuted, textAlign:'center', lineHeight:'1.5', maxWidth:'880px' } }, 'Speichere diesen Post und teile ihn mit jemandem, der Krypto hält'),
    ),

    h('div', { style: { display:'flex', flexDirection:'column', gap:'16px' } },
      h('div', { style: { display:'flex', height:'2px', backgroundColor:C.border, borderRadius:'1px' } }),
      h('div', { style: { display:'flex', justifyContent:'center' } },
        h('span', { style: { fontSize:'26px', fontWeight:600, color:C.textMuted } }, '@benarofinanzen'),
      ),
    ),
  );

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];
  const outDir = `/home/user/benaro-instagram-carousel/output/carousel_2026-11-12/slides`;

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width:W, height:H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode:'width', value:W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i+1).padStart(2,'0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i+1}/${slides.length} done`);
  }
  console.log('All slides generated!');
}

main().catch(e => { console.error(e); process.exit(1); });
