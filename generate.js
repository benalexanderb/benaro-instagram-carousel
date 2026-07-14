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

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')
  ).toString('base64');

  const C = {
    bg: '#001f60',
    bgDark: '#001542',
    text: '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted: '#9CA3AF',
    cardBg: 'rgba(255,255,255,0.10)',
    border: 'rgba(255,255,255,0.20)',
    green: '#10B981',
    red: '#EF4444',
    gold: '#F59E0B',
  };

  const W = 1080, H = 1350;

  const h = (type, props, ...ch) => ({
    type,
    props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function badge(text) {
    return h('div', { style: { display:'flex', marginBottom:'18px' } },
      h('span', { style: {
        display:'flex', fontSize:'22px', fontWeight:700, letterSpacing:'3px',
        color: C.text, backgroundColor: C.cardBg,
        padding:'10px 22px', borderRadius:'12px'
      }}, text)
    );
  }

  function headline(text, size) {
    const sz = size || 64;
    return h('span', { style: {
      fontSize:`${sz}px`, fontWeight:800,
      color: C.text,
      lineHeight:'1.08', letterSpacing:'-1.5px', marginBottom:'6px'
    }}, text);
  }

  function subline(text) {
    return h('span', { style: {
      fontSize:'28px', fontWeight:500,
      color: C.textMuted,
      lineHeight:'1.5', marginTop:'8px'
    }}, text);
  }

  function keyLearning(text, accentColor) {
    const accent = accentColor || C.text;
    return h('div', { style: {
      display:'flex', alignItems:'center', gap:'14px',
      backgroundColor: C.cardBg,
      borderRadius:'16px', padding:'22px 28px', marginTop:'auto'
    }},
      h('div', { style: { display:'flex', width:'6px', minHeight:'40px', backgroundColor: accent, borderRadius:'3px' }}),
      h('span', { style: { fontSize:'28px', fontWeight:600, color: C.text, lineHeight:'1.4' }}, text)
    );
  }

  function footer() {
    return h('div', { style: { display:'flex', alignItems:'center', marginTop:'14px' }},
      h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted }}, '@benarofinanzen')
    );
  }

  function logo() {
    return h('img', { src: logoB64, width:100, height:100, style: { borderRadius:'12px', objectFit:'cover' }});
  }

  function logoSmall() {
    return h('img', { src: logoB64, width:80, height:80, style: { borderRadius:'10px', objectFit:'cover' }});
  }

  function arrow() {
    return h('div', { style: { display:'flex', justifyContent:'center', padding:'4px 0' }},
      h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center' }},
        h('div', { style: { display:'flex', width:'4px', height:'24px', backgroundColor: C.border }}),
        h('div', { style: { display:'flex', width:'0px', height:'0px', borderLeft:'10px solid transparent', borderRight:'10px solid transparent', borderTop:`12px solid ${C.border}` }})
      )
    );
  }

  // === SLIDE 1: HOOK ===
  const slide1 = h('div', { style: {
    display:'flex', flexDirection:'column', width:W, height:H,
    padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit'
  }},
    h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'24px' }},
      badge('RENTENFALLE'),
      logo()
    ),
    headline('5,8 Mio. Selbst-staendige sehen das nicht kommen', 58),
    subline('Das kostet sie den Ruhestand'),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' }},
      h('div', { style: {
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        backgroundColor: C.cardBg, borderRadius:'24px', padding:'50px 40px', gap:'12px',
        border:`2px solid ${C.border}`
      }},
        h('span', { style: { fontSize:'120px', fontWeight:800, color: C.red, lineHeight:'1', letterSpacing:'-4px' }}, '80%'),
        h('span', { style: { fontSize:'30px', fontWeight:600, color: C.textSoft, textAlign:'center', lineHeight:'1.4' }},
          'der Selbststaendigen in Deutschland haben KEINE ausreichende Altersvorsorge'
        )
      ),
      h('div', { style: { display:'flex', gap:'14px' }},
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', backgroundColor: C.cardBg, borderRadius:'16px', padding:'18px 12px', gap:'8px' }},
          h('span', { style: { fontSize:'32px', fontWeight:800, color: C.gold }}, '5,8 Mio.'),
          h('span', { style: { fontSize:'20px', fontWeight:500, color: C.textMuted, textAlign:'center' }}, 'ohne Pflicht-rentenversicherung')
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', backgroundColor: C.cardBg, borderRadius:'16px', padding:'18px 12px', gap:'8px' }},
          h('span', { style: { fontSize:'32px', fontWeight:800, color: C.red }}, '800 EUR'),
          h('span', { style: { fontSize:'20px', fontWeight:500, color: C.textMuted, textAlign:'center' }}, 'max. gesetzl. Rente freiwillig')
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', backgroundColor: C.cardBg, borderRadius:'16px', padding:'18px 12px', gap:'8px' }},
          h('span', { style: { fontSize:'32px', fontWeight:800, color: C.green }}, '2027'),
          h('span', { style: { fontSize:'20px', fontWeight:500, color: C.textMuted, textAlign:'center' }}, 'neues Altersvorsorge-depot kommt')
        )
      )
    ),

    keyLearning('Bist du selbststaendig? Dann geht es um DEINE Rente.', C.red),
    footer()
  );

  // === SLIDE 2: STAT HERO - Rentenluecke ===
  const barChartSvg = `<svg width="880" height="300" viewBox="0 0 880 300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.4"/>
      </linearGradient>
      <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#EF4444"/>
        <stop offset="100%" stop-color="#EF4444" stop-opacity="0.5"/>
      </linearGradient>
      <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#10B981"/>
        <stop offset="100%" stop-color="#10B981" stop-opacity="0.5"/>
      </linearGradient>
    </defs>
    <rect x="60" y="40" width="180" height="220" rx="12" fill="url(#g1)"/>
    <rect x="350" y="195" width="180" height="65" rx="12" fill="url(#g2)"/>
    <rect x="640" y="115" width="180" height="145" rx="12" fill="url(#g3)"/>
    <line x1="440" y1="195" x2="720" y2="115" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-dasharray="8,5"/>
    <circle cx="440" cy="195" r="6" fill="#EF4444"/>
    <circle cx="720" cy="115" r="6" fill="#10B981"/>
  </svg>`;
  const barChartSrc = 'data:image/svg+xml;base64,' + Buffer.from(barChartSvg).toString('base64');

  const slide2 = h('div', { style: {
    display:'flex', flexDirection:'column', width:W, height:H,
    padding:'70px', backgroundColor: C.bgDark, fontFamily:'Outfit'
  }},
    h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'18px' }},
      badge('DIE RENTENLUECKE'),
      logoSmall()
    ),
    headline('3.200 EUR Luecke pro Monat', 62),
    subline('Das ist die Realitaet fuer Selbststaendige'),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' }},
      h('img', { src: barChartSrc, width:880, height:300, style: { objectFit:'contain' }}),
      h('div', { style: { display:'flex', gap:'14px' }},
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', gap:'6px' }},
          h('span', { style: { fontSize:'40px', fontWeight:800, color: C.text }}, '4.000'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted }}, 'Nettoeinkommen'),
          h('span', { style: { fontSize:'20px', fontWeight:400, color: C.textMuted }}, '(heute)')
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', gap:'6px' }},
          h('span', { style: { fontSize:'40px', fontWeight:800, color: C.red }}, '800'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted }}, 'gesetzl. Rente'),
          h('span', { style: { fontSize:'20px', fontWeight:400, color: C.textMuted }}, '(maximum)')
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', gap:'6px' }},
          h('span', { style: { fontSize:'40px', fontWeight:800, color: C.green }}, '2.200'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted }}, 'realer Bedarf'),
          h('span', { style: { fontSize:'20px', fontWeight:400, color: C.textMuted }}, '(Zielgroesse)')
        )
      ),
      h('div', { style: {
        display:'flex', alignItems:'center', gap:'14px',
        backgroundColor:'rgba(239,68,68,0.12)', borderRadius:'16px', padding:'20px 28px',
        border:'1px solid rgba(239,68,68,0.3)'
      }},
        h('div', { style: { display:'flex', width:'12px', height:'12px', borderRadius:'6px', backgroundColor: C.red, flexShrink:'0' }}),
        h('span', { style: { fontSize:'28px', fontWeight:600, color: C.red, lineHeight:'1.4' }},
          'Rentenluecke: 1.400 EUR/Monat = 16.800 EUR im Jahr'
        )
      )
    ),

    keyLearning('Ohne aktive Vorsorge wird der Ruhestand zur Armutsfalle.', C.red),
    footer()
  );

  // === SLIDE 3: PROBLEM FLOW ===
  const slide3 = h('div', { style: {
    display:'flex', flexDirection:'column', width:W, height:H,
    padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit'
  }},
    h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'18px' }},
      badge('WAS OHNE PLAN PASSIERT'),
      logoSmall()
    ),
    headline('Der Weg in die Altersarmut', 60),
    subline('So laeuft es ab wenn man nichts tut'),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'0px' }},
      h('div', { style: {
        display:'flex', flexDirection:'column', gap:'8px',
        backgroundColor: C.cardBg, borderRadius:'20px', padding:'28px 32px',
        border:'1px solid rgba(255,255,255,0.10)'
      }},
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px' }},
          h('div', { style: {
            display:'flex', width:'48px', height:'48px', borderRadius:'14px',
            backgroundColor:'rgba(255,255,255,0.15)', alignItems:'center', justifyContent:'center', flexShrink:'0'
          }},
            h('span', { style: { fontSize:'26px', fontWeight:800, color: C.text }}, '01')
          ),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' }},
            h('span', { style: { fontSize:'30px', fontWeight:700, color: C.text }}, 'Heute: Einkommen gut, kein Plan'),
            h('span', { style: { fontSize:'24px', fontWeight:400, color: C.textMuted, lineHeight:'1.4' }},
              'Selbststaendige zahlen keine gesetzliche Rentenversicherung. Jahrelang laeuft es gut.'
            )
          )
        )
      ),
      arrow(),
      h('div', { style: {
        display:'flex', flexDirection:'column', gap:'8px',
        backgroundColor:'rgba(245,158,11,0.10)', borderRadius:'20px', padding:'28px 32px',
        border:'1px solid rgba(245,158,11,0.25)'
      }},
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px' }},
          h('div', { style: {
            display:'flex', width:'48px', height:'48px', borderRadius:'14px',
            backgroundColor:'rgba(245,158,11,0.20)', alignItems:'center', justifyContent:'center', flexShrink:'0'
          }},
            h('span', { style: { fontSize:'26px', fontWeight:800, color: C.gold }}, '02')
          ),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' }},
            h('span', { style: { fontSize:'30px', fontWeight:700, color: C.gold }}, 'Renteneintritt: Schock'),
            h('span', { style: { fontSize:'24px', fontWeight:400, color: C.textMuted, lineHeight:'1.4' }},
              'Privates Erspartes aufgebraucht oder reicht nur wenige Jahre. Kein laufender Puffer.'
            )
          )
        )
      ),
      arrow(),
      h('div', { style: {
        display:'flex', flexDirection:'column', gap:'8px',
        backgroundColor:'rgba(239,68,68,0.10)', borderRadius:'20px', padding:'28px 32px',
        border:'1px solid rgba(239,68,68,0.25)'
      }},
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px' }},
          h('div', { style: {
            display:'flex', width:'48px', height:'48px', borderRadius:'14px',
            backgroundColor:'rgba(239,68,68,0.20)', alignItems:'center', justifyContent:'center', flexShrink:'0'
          }},
            h('span', { style: { fontSize:'26px', fontWeight:800, color: C.red }}, '03')
          ),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' }},
            h('span', { style: { fontSize:'30px', fontWeight:700, color: C.red }}, 'Konsequenz: Altersarmut'),
            h('span', { style: { fontSize:'24px', fontWeight:400, color: C.textMuted, lineHeight:'1.4' }},
              'Abhaengig von Grundsicherung: 563 EUR/Monat. Ein Leben lang gearbeitet und am Ende nichts.'
            )
          )
        )
      )
    ),

    keyLearning('Selbststaendige muessen selbst vorsorgen. Der Staat springt nicht ein.', C.red),
    footer()
  );

  // === SLIDE 4: ERWARTUNG vs. REALITAET ===
  const slide4 = h('div', { style: {
    display:'flex', flexDirection:'column', width:W, height:H,
    padding:'70px', backgroundColor: C.bgDark, fontFamily:'Outfit'
  }},
    h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'18px' }},
      badge('DER GROSSE IRRTUM'),
      logoSmall()
    ),
    headline('Was die meisten denken', 62),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' }},
      h('div', { style: { display:'flex', gap:'16px', flex:'1' }},
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column',
          backgroundColor: C.cardBg, borderRadius:'22px', padding:'32px', gap:'14px'
        }},
          h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color: C.textMuted }}, 'ERWARTUNG'),
          h('div', { style: { display:'flex', width:'100%', height:'4px', backgroundColor: C.border, borderRadius:'2px' }}),
          h('span', { style: { fontSize:'42px', fontWeight:800, color: C.textSoft, textAlign:'center', lineHeight:'1.1', marginTop:'8px' }},
            'ETF-Depot reicht aus'
          ),
          h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted, lineHeight:'1.5', marginTop:'8px' }},
            '"Ich spare in ETFs, das reicht als Altersvorsorge."'
          ),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'10px', marginTop:'16px' }},
            h('div', { style: { display:'flex', alignItems:'center', gap:'10px' }},
              h('div', { style: { display:'flex', width:'8px', height:'8px', borderRadius:'4px', backgroundColor: C.red, flexShrink:'0' }}),
              h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted }}, 'Kein staatlicher Bonus')
            ),
            h('div', { style: { display:'flex', alignItems:'center', gap:'10px' }},
              h('div', { style: { display:'flex', width:'8px', height:'8px', borderRadius:'4px', backgroundColor: C.red, flexShrink:'0' }}),
              h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted }}, 'Steuervorteil nicht genutzt')
            ),
            h('div', { style: { display:'flex', alignItems:'center', gap:'10px' }},
              h('div', { style: { display:'flex', width:'8px', height:'8px', borderRadius:'4px', backgroundColor: C.red, flexShrink:'0' }}),
              h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted }}, 'Keine Diversifikation')
            )
          )
        ),
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column',
          backgroundColor: '#FFFFFF', borderRadius:'22px', padding:'32px', gap:'14px'
        }},
          h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color:'rgba(0,31,96,0.5)' }}, 'REALITAET'),
          h('div', { style: { display:'flex', width:'100%', height:'4px', backgroundColor:'rgba(0,31,96,0.15)', borderRadius:'2px' }}),
          h('span', { style: { fontSize:'42px', fontWeight:800, color:'#001f60', textAlign:'center', lineHeight:'1.1', marginTop:'8px' }},
            '3 Saeulen noetig'
          ),
          h('span', { style: { fontSize:'24px', fontWeight:500, color:'rgba(0,31,96,0.65)', lineHeight:'1.5', marginTop:'8px' }},
            'ETF allein = tausende EUR Steuervorteile und Staatsbonus verschenkt.'
          ),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'10px', marginTop:'16px' }},
            h('div', { style: { display:'flex', alignItems:'center', gap:'10px' }},
              h('div', { style: { display:'flex', width:'8px', height:'8px', borderRadius:'4px', backgroundColor:'#10B981', flexShrink:'0' }}),
              h('span', { style: { fontSize:'22px', fontWeight:600, color:'#001f60' }}, 'Ruerup spart Steuern')
            ),
            h('div', { style: { display:'flex', alignItems:'center', gap:'10px' }},
              h('div', { style: { display:'flex', width:'8px', height:'8px', borderRadius:'4px', backgroundColor:'#10B981', flexShrink:'0' }}),
              h('span', { style: { fontSize:'22px', fontWeight:600, color:'#001f60' }}, '600 EUR Bonus ab 2027')
            ),
            h('div', { style: { display:'flex', alignItems:'center', gap:'10px' }},
              h('div', { style: { display:'flex', width:'8px', height:'8px', borderRadius:'4px', backgroundColor:'#10B981', flexShrink:'0' }}),
              h('span', { style: { fontSize:'22px', fontWeight:600, color:'#001f60' }}, 'ETF bleibt flexibel')
            )
          )
        )
      )
    ),

    keyLearning('Nur ETF-Sparen kostet dich bis zu 15.000 EUR in Steuervorteilen.'),
    footer()
  );

  // === SLIDE 5: 3 SAEULEN ===
  const slide5 = h('div', { style: {
    display:'flex', flexDirection:'column', width:W, height:H,
    padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit'
  }},
    h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'18px' }},
      badge('DIE LOESUNG'),
      logoSmall()
    ),
    headline('3 Saeulen fuer Selbststaendige', 60),
    subline('Kombiniere alle 3 fuer optimale Absicherung'),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' }},
      h('div', { style: {
        display:'flex', alignItems:'center', gap:'20px',
        backgroundColor: C.cardBg, borderRadius:'20px', padding:'26px 32px',
        border:'1px solid rgba(16,185,129,0.25)'
      }},
        h('div', { style: {
          display:'flex', width:'68px', height:'68px', borderRadius:'18px',
          backgroundColor:'rgba(16,185,129,0.15)', alignItems:'center', justifyContent:'center', flexShrink:'0'
        }},
          h('span', { style: { fontSize:'30px', fontWeight:800, color: C.green }}, '01')
        ),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' }},
          h('span', { style: { fontSize:'30px', fontWeight:700, color: C.text }}, 'Ruerup-Rente'),
          h('span', { style: { fontSize:'23px', fontWeight:400, color: C.textMuted, lineHeight:'1.4' }},
            'Bis 29.344 EUR/Jahr steuerlich absetzbar. Steuervorteil bis 42% fuer Gutverdiener.'
          ),
          h('div', { style: { display:'flex', alignSelf:'flex-start', backgroundColor:'rgba(16,185,129,0.12)', borderRadius:'8px', padding:'5px 12px' }},
            h('span', { style: { fontSize:'19px', fontWeight:700, color: C.green }}, 'STEUERVORTEIL BIS 12.324 EUR/JAHR')
          )
        )
      ),

      h('div', { style: {
        display:'flex', alignItems:'center', gap:'20px',
        backgroundColor: C.cardBg, borderRadius:'20px', padding:'26px 32px',
        border:'1px solid rgba(245,158,11,0.25)'
      }},
        h('div', { style: {
          display:'flex', width:'68px', height:'68px', borderRadius:'18px',
          backgroundColor:'rgba(245,158,11,0.15)', alignItems:'center', justifyContent:'center', flexShrink:'0'
        }},
          h('span', { style: { fontSize:'30px', fontWeight:800, color: C.gold }}, '02')
        ),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' }},
          h('span', { style: { fontSize:'30px', fontWeight:700, color: C.text }}, 'Altersvorsorgedepot 2027'),
          h('span', { style: { fontSize:'23px', fontWeight:400, color: C.textMuted, lineHeight:'1.4' }},
            'NEU: 20% staatl. Bonus auf max. 3.000 EUR/Jahr = 600 EUR Gratisgeld. Auch fuer Selbststaendige!'
          ),
          h('div', { style: { display:'flex', alignSelf:'flex-start', backgroundColor:'rgba(245,158,11,0.12)', borderRadius:'8px', padding:'5px 12px' }},
            h('span', { style: { fontSize:'19px', fontWeight:700, color: C.gold }}, 'AB JANUAR 2027 VERFUEGBAR')
          )
        )
      ),

      h('div', { style: {
        display:'flex', alignItems:'center', gap:'20px',
        backgroundColor: C.cardBg, borderRadius:'20px', padding:'26px 32px',
        border:'1px solid rgba(255,255,255,0.12)'
      }},
        h('div', { style: {
          display:'flex', width:'68px', height:'68px', borderRadius:'18px',
          backgroundColor:'rgba(255,255,255,0.08)', alignItems:'center', justifyContent:'center', flexShrink:'0'
        }},
          h('span', { style: { fontSize:'30px', fontWeight:800, color: C.text }}, '03')
        ),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' }},
          h('span', { style: { fontSize:'30px', fontWeight:700, color: C.text }}, 'ETF-Depot (flexibel)'),
          h('span', { style: { fontSize:'23px', fontWeight:400, color: C.textMuted, lineHeight:'1.4' }},
            'Jederzeit verfuegbar, kein Foerderrahmen. Sparerpauschbetrag 1.000 EUR/Jahr nutzbar.'
          ),
          h('div', { style: { display:'flex', alignSelf:'flex-start', backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'8px', padding:'5px 12px' }},
            h('span', { style: { fontSize:'19px', fontWeight:700, color: C.textSoft }}, 'JEDERZEIT KUENDBAR')
          )
        )
      )
    ),

    keyLearning('Alle 3 Saeulen kombiniert: maximaler Schutz und maximale Rendite.', C.green),
    footer()
  );

  // === SLIDE 6: RECHENBEISPIEL ===
  const barSvg2 = `<svg width="860" height="260" viewBox="0 0 860 260" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#10B981"/>
        <stop offset="100%" stop-color="#10B981" stop-opacity="0.5"/>
      </linearGradient>
      <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F59E0B"/>
        <stop offset="100%" stop-color="#F59E0B" stop-opacity="0.5"/>
      </linearGradient>
      <linearGradient id="gC" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.35"/>
      </linearGradient>
    </defs>
    <rect x="60" y="30" width="200" height="200" rx="12" fill="url(#gA)"/>
    <rect x="330" y="79" width="200" height="151" rx="12" fill="url(#gB)"/>
    <rect x="600" y="55" width="200" height="175" rx="12" fill="url(#gC)"/>
  </svg>`;
  const barSrc2 = 'data:image/svg+xml;base64,' + Buffer.from(barSvg2).toString('base64');

  const slide6 = h('div', { style: {
    display:'flex', flexDirection:'column', width:W, height:H,
    padding:'70px', backgroundColor: C.bgDark, fontFamily:'Outfit'
  }},
    h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'18px' }},
      badge('DAS RECHNET SICH'),
      logoSmall()
    ),
    headline('300 EUR/Monat in 3 Wege', 62),
    subline('Ergebnis nach 25 Jahren bei 7% p.a.'),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' }},
      h('img', { src: barSrc2, width:860, height:260, style: { objectFit:'contain' }}),
      h('div', { style: { display:'flex', gap:'14px' }},
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', gap:'6px' }},
          h('span', { style: { fontSize:'44px', fontWeight:800, color: C.green }}, '129k'),
          h('span', { style: { fontSize:'22px', fontWeight:600, color: C.textSoft }}, 'Ruerup'),
          h('span', { style: { fontSize:'20px', fontWeight:400, color: C.textMuted }}, '120 EUR/Mon.'),
          h('div', { style: { display:'flex', backgroundColor:'rgba(16,185,129,0.15)', borderRadius:'8px', padding:'4px 12px', marginTop:'4px' }},
            h('span', { style: { fontSize:'18px', fontWeight:700, color: C.green }}, 'Steuervorteil')
          )
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', gap:'6px' }},
          h('span', { style: { fontSize:'44px', fontWeight:800, color: C.gold }}, '85k'),
          h('span', { style: { fontSize:'22px', fontWeight:600, color: C.textSoft }}, 'AVD 2027'),
          h('span', { style: { fontSize:'20px', fontWeight:400, color: C.textMuted }}, '80 EUR/Mon.'),
          h('div', { style: { display:'flex', backgroundColor:'rgba(245,158,11,0.15)', borderRadius:'8px', padding:'4px 12px', marginTop:'4px' }},
            h('span', { style: { fontSize:'18px', fontWeight:700, color: C.gold }}, '600 EUR Bonus')
          )
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', gap:'6px' }},
          h('span', { style: { fontSize:'44px', fontWeight:800, color: C.text }}, '97k'),
          h('span', { style: { fontSize:'22px', fontWeight:600, color: C.textSoft }}, 'ETF-Depot'),
          h('span', { style: { fontSize:'20px', fontWeight:400, color: C.textMuted }}, '100 EUR/Mon.'),
          h('div', { style: { display:'flex', backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'8px', padding:'4px 12px', marginTop:'4px' }},
            h('span', { style: { fontSize:'18px', fontWeight:700, color: C.textSoft }}, 'flexibel')
          )
        )
      ),
      h('div', { style: {
        display:'flex', alignItems:'center', justifyContent:'center', gap:'14px',
        backgroundColor:'rgba(16,185,129,0.10)', borderRadius:'16px', padding:'22px 28px',
        border:'1px solid rgba(16,185,129,0.3)'
      }},
        h('span', { style: { fontSize:'28px', fontWeight:700, color: C.green }}, 'Gesamt: 311.000 EUR aus nur 300 EUR/Monat')
      )
    ),

    keyLearning('300 EUR/Monat klug verteilt = 311.000 EUR Altersvorsorge.', C.green),
    footer()
  );

  // === SLIDE 7: TAKEAWAYS ===
  const learnings = [
    { num:'01', text:'Rentenluecke berechnen: Wie viel fehlt dir monatlich im Alter?', pct:25 },
    { num:'02', text:'Ruerup-Rente 2026 starten und Steuervorteil bis 42% sichern', pct:50 },
    { num:'03', text:'Altersvorsorgedepot ab Januar 2027 planen — 600 EUR Bonus nicht verpassen', pct:75 },
    { num:'04', text:'ETF-Depot parallel fuehren fuer maximale Flexibilitaet im Alter', pct:100 },
  ];

  const slide7 = h('div', { style: {
    display:'flex', flexDirection:'column', width:W, height:H,
    padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit'
  }},
    h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'18px' }},
      badge('DEIN FAHRPLAN'),
      logoSmall()
    ),
    headline('4 Schritte fuer Selbststaendige', 58),
    subline('Sofort umsetzbar'),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'14px' }},
      ...learnings.map(l =>
        h('div', { style: {
          display:'flex', flexDirection:'column', gap:'10px',
          padding:'22px 28px', backgroundColor: C.cardBg, borderRadius:'18px'
        }},
          h('div', { style: { display:'flex', alignItems:'center', gap:'18px' }},
            h('span', { style: {
              fontSize:'36px', fontWeight:800,
              color: l.pct === 100 ? C.green : (l.pct >= 75 ? C.gold : C.text),
              minWidth:'56px'
            }}, l.num),
            h('span', { style: { fontSize:'26px', fontWeight:600, color: C.text, lineHeight:'1.3' }}, l.text)
          ),
          h('div', { style: { display:'flex', height:'6px', backgroundColor: C.border, borderRadius:'3px', overflow:'hidden' }},
            h('div', { style: {
              display:'flex', width:`${l.pct}%`, height:'6px',
              backgroundColor: l.pct === 100 ? C.green : (l.pct >= 75 ? C.gold : C.text),
              borderRadius:'3px'
            }})
          )
        )
      )
    ),

    keyLearning('Wer frueh anfaengt gewinnt. Zeit ist dein groesstes Asset.', C.green),
    footer()
  );

  // === SLIDE 8: CTA ===
  const slide8 = h('div', { style: {
    display:'flex', flexDirection:'column', width:W, height:H,
    padding:'70px', backgroundColor: C.bgDark, fontFamily:'Outfit',
    alignItems:'center'
  }},
    h('div', { style: { display:'flex', justifyContent:'flex-end', width:'100%', marginBottom:'24px' }},
      logoSmall()
    ),

    h('div', { style: {
      display:'flex', flex:'1', flexDirection:'column', alignItems:'center',
      justifyContent:'center', gap:'28px', width:'100%'
    }},
      badge('DEINE MEINUNG ZAEHLT'),
      h('span', { style: {
        fontSize:'58px', fontWeight:800, color: C.text,
        textAlign:'center', lineHeight:'1.1', letterSpacing:'-1.5px'
      }}, 'Bist du selbststaendig und hast bereits vorgesorgt?'),
      h('span', { style: {
        fontSize:'28px', fontWeight:500, color: C.textMuted,
        textAlign:'center', lineHeight:'1.5'
      }}, 'Schreib es uns in die Kommentare und hilf anderen mit deiner Erfahrung.'),
      h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'12px' }},
        h('span', { style: { fontSize:'28px', fontWeight:600, color: C.textSoft, textAlign:'center' }},
          'Speichere diesen Post als Erinnerung'
        ),
        h('div', { style: { width:'80px', height:'2px', backgroundColor: C.border, borderRadius:'1px' }}),
        h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted, textAlign:'center' }},
          'Mehr kostenlose Finanztipps findest du bei @benarofinanzen'
        )
      )
    ),

    h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', width:'100%' }},
      h('img', { src: logoB64, width:120, height:120, style: { borderRadius:'16px', objectFit:'cover' }}),
      h('span', { style: { fontSize:'28px', fontWeight:700, color: C.text }}, 'Benaro Finanzen'),
      h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted }}, '@benarofinanzen')
    )
  );

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  const outDir = path.join(__dirname, 'output', 'carousel_2026-07-14', 'slides');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W }});
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i+1).padStart(2,'0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i+1}/${slides.length} done -> ${pngPath}`);
  }
  console.log('All slides generated!');
}

main().catch(e => { console.error(e); process.exit(1); });
