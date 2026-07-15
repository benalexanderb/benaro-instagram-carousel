// Carousel: Vorabpauschale 2026 — Die stille ETF-Steuer die alle trifft
// Inspiration: @finanzcopilot — Basiszins 3.20% 2026, hochaktuell fuer alle thesaurierenden ETF-Anleger
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

  // ======================================================================
  // VORABPAUSCHALE 2026 — Die stille ETF-Steuer die alle trifft
  // ======================================================================

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
  // Hook: shocking reveal — eine Steuer die automatisch abgebucht wird, ohne dass man etwas tut
  const slide1 = h('div', { style: {
    display:'flex', flexDirection:'column', width:W, height:H,
    padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit'
  }},
    h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'24px' }},
      badge('ACHTUNG ETF-ANLEGER'),
      logo()
    ),
    headline('Diese Steuer wird dir im Januar einfach abgebucht', 58),
    subline('Und 90% der ETF-Anleger wissen es nicht'),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' }},
      // Two contrast cards: Mythos vs. Fakt
      h('div', { style: { display:'flex', gap:'16px' }},
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column',
          backgroundColor:'rgba(239,68,68,0.10)', borderRadius:'20px', padding:'30px', gap:'12px',
          border:`2px solid rgba(239,68,68,0.4)`
        }},
          h('span', { style: { fontSize:'32px', fontWeight:800, color: C.red, lineHeight:'1' }}, 'MYTHOS'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(239,68,68,0.3)', borderRadius:'2px' }}),
          h('span', { style: { fontSize:'26px', fontWeight:600, color: C.textSoft, lineHeight:'1.4' }},
            'Thesaurierend bedeutet keine Steuer bis zum Verkauf'
          )
        ),
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column',
          backgroundColor:'rgba(16,185,129,0.10)', borderRadius:'20px', padding:'30px', gap:'12px',
          border:`2px solid rgba(16,185,129,0.4)`
        }},
          h('span', { style: { fontSize:'32px', fontWeight:800, color: C.green, lineHeight:'1' }}, 'FAKT'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(16,185,129,0.3)', borderRadius:'2px' }}),
          h('span', { style: { fontSize:'26px', fontWeight:600, color: C.textSoft, lineHeight:'1.4' }},
            'Vorabpauschale wird JEDES JAHR automatisch besteuert'
          )
        )
      ),
      // Basiszins stat
      h('div', { style: {
        display:'flex', alignItems:'center', gap:'24px',
        backgroundColor: C.cardBg, borderRadius:'18px', padding:'28px 32px'
      }},
        h('div', { style: { display:'flex', flexDirection:'column', gap:'6px' }},
          h('span', { style: { fontSize:'22px', fontWeight:600, color: C.textMuted, letterSpacing:'2px' }},
            'BASISZINS 2026'
          ),
          h('span', { style: { fontSize:'76px', fontWeight:800, color: C.text, lineHeight:'1', letterSpacing:'-2px' }},
            '3,20%'
          ),
          h('span', { style: { fontSize:'25px', fontWeight:500, color: C.textMuted }},
            'Hoechster Wert seit 15 Jahren'
          )
        )
      )
    ),

    keyLearning('Was die Vorabpauschale ist und wie du dich vorbereitest', C.green),
    footer()
  );

  // === SLIDE 2: WIE FUNKTIONIERT DIE VORABPAUSCHALE ===
  const slide2 = h('div', { style: {
    display:'flex', flexDirection:'column', width:W, height:H,
    padding:'70px', backgroundColor: C.bgDark, fontFamily:'Outfit'
  }},
    h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'18px' }},
      badge('DIE ERKLAERUNG'),
      logoSmall()
    ),
    headline('So funktioniert die Vorabpauschale', 58),
    subline('Jährliche Mindestbesteuerung fuer thesaurierende ETFs'),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' }},
      ...[
        { num:'01', title:'Thesaurierender ETF reinvestiert', desc:'Kein Geld kommt auf dein Konto — ETF reinvestiert Dividenden automatisch', color:'rgba(255,255,255,0.12)' },
        { num:'02', title:'Finanzamt besteuert trotzdem', desc:'Auf Basis des Basiszinses wird eine fiktive Mindestrendite angesetzt', color:'rgba(245,158,11,0.12)' },
        { num:'03', title:'Abbuchung im Januar', desc:'Die Steuer wird automatisch Anfang Januar vom Verrechnungskonto abgezogen', color:'rgba(239,68,68,0.12)' },
      ].map(item =>
        h('div', { style: {
          display:'flex', alignItems:'flex-start', gap:'20px',
          backgroundColor: item.color, borderRadius:'18px', padding:'22px 28px'
        }},
          h('div', { style: {
            display:'flex', width:'50px', height:'50px', borderRadius:'13px',
            backgroundColor:'rgba(255,255,255,0.12)', alignItems:'center', justifyContent:'center', flexShrink:'0'
          }},
            h('span', { style: { fontSize:'22px', fontWeight:800, color: C.text }}, item.num)
          ),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'5px' }},
            h('span', { style: { fontSize:'28px', fontWeight:700, color: C.text, lineHeight:'1.2' }}, item.title),
            h('span', { style: { fontSize:'23px', fontWeight:500, color: C.textMuted, lineHeight:'1.4' }}, item.desc)
          )
        )
      )
    ),

    keyLearning('Gilt nur fuer THESAURIERENDE ETFs — ausschuettende zahlen sofort Steuer', C.text),
    footer()
  );

  // === SLIDE 3: KONKRETE BERECHNUNG ===
  const slide3 = h('div', { style: {
    display:'flex', flexDirection:'column', width:W, height:H,
    padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit'
  }},
    h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'18px' }},
      badge('DIE FORMEL'),
      logoSmall()
    ),
    headline('Was du konkret zahlen wirst', 60),
    subline('Basiszins 2026: 3,20% — Formel: Depotwert x 3,20% x 0,70'),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'18px' }},
      // Formula highlight
      h('div', { style: {
        display:'flex', flexDirection:'column', backgroundColor:'rgba(255,255,255,0.07)', borderRadius:'20px',
        padding:'26px 32px', gap:'12px', border:'1px solid rgba(255,255,255,0.15)'
      }},
        h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color: C.textMuted }}, 'FORMEL 2026'),
        h('div', { style: { display:'flex', width:'100%', height:'2px', backgroundColor: C.border, borderRadius:'1px' }}),
        h('span', { style: { fontSize:'30px', fontWeight:700, color: C.green, lineHeight:'1.5' }},
          'Depotwert x 3,20% x 0,70 = Vorabpauschale'
        ),
        h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted }},
          'davon 26,375% Abgeltungssteuer = Steuerbetrag'
        )
      ),
      // Depot size examples
      ...[
        { depot: '10.000 EUR', vp: '224 EUR', steuer: '59 EUR', fill: 20 },
        { depot: '25.000 EUR', vp: '560 EUR', steuer: '148 EUR', fill: 50 },
        { depot: '50.000 EUR', vp: '1.120 EUR', steuer: '295 EUR', fill: 100 },
      ].map(item =>
        h('div', { style: {
          display:'flex', alignItems:'center', gap:'16px',
          backgroundColor: C.cardBg, borderRadius:'14px', padding:'18px 24px'
        }},
          h('span', { style: { fontSize:'26px', fontWeight:700, color: C.text, minWidth:'170px' }}, item.depot),
          h('div', { style: { display:'flex', flex:'1', height:'10px', backgroundColor:'rgba(255,255,255,0.1)', borderRadius:'5px', overflow:'hidden' }},
            h('div', { style: { display:'flex', width:`${item.fill}%`, height:'10px', backgroundColor: C.green, borderRadius:'5px' }})
          ),
          h('span', { style: { fontSize:'26px', fontWeight:700, color: C.red, minWidth:'85px', textAlign:'right' }}, item.steuer)
        )
      ),
      h('div', { style: { display:'flex', justifyContent:'space-between', padding:'0 24px' }},
        h('span', { style: { fontSize:'20px', fontWeight:500, color: C.textMuted }}, 'Depotwert'),
        h('span', { style: { fontSize:'20px', fontWeight:500, color: C.red }}, 'Steuer* (abzugl. Freibetrag)')
      )
    ),

    keyLearning('50.000 EUR Depot = 295 EUR automatisch abgebucht im Januar 2027', C.red),
    footer()
  );

  // === SLIDE 4: 3 IRRTUEMER ===
  const slide4 = h('div', { style: {
    display:'flex', flexDirection:'column', width:W, height:H,
    padding:'70px', backgroundColor: C.bgDark, fontFamily:'Outfit'
  }},
    h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'18px' }},
      badge('3 IRRTUEMER'),
      logoSmall()
    ),
    headline('Was ETF-Anleger falsch glauben', 60),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' }},
      ...[
        { wrong:'Thesaurierend = steuerfrei bis zum Verkauf', right:'Vorabpauschale faellt jedes Jahr an' },
        { wrong:'Steuer muss ich aktiv ueberweisen', right:'Wird automatisch vom Verrechnungskonto abgezogen' },
        { wrong:'Freistellungsauftrag gilt nur fuer Dividenden', right:'Freistellungsauftrag deckt auch die Vorabpauschale ab' },
      ].map(item =>
        h('div', { style: {
          display:'flex', flexDirection:'column', gap:'10px',
          backgroundColor: C.cardBg, borderRadius:'18px', padding:'22px 28px'
        }},
          h('div', { style: { display:'flex', alignItems:'flex-start', gap:'14px' }},
            h('div', { style: {
              display:'flex', width:'30px', height:'30px', borderRadius:'8px',
              backgroundColor:'rgba(239,68,68,0.2)', alignItems:'center', justifyContent:'center', flexShrink:'0', marginTop:'2px'
            }},
              h('span', { style: { fontSize:'18px', fontWeight:800, color: C.red }}, 'X')
            ),
            h('span', { style: { fontSize:'25px', fontWeight:500, color:'rgba(255,255,255,0.4)', lineHeight:'1.4', textDecoration:'line-through' }},
              item.wrong
            )
          ),
          h('div', { style: { display:'flex', alignItems:'flex-start', gap:'14px' }},
            h('div', { style: {
              display:'flex', width:'30px', height:'30px', borderRadius:'8px',
              backgroundColor:'rgba(16,185,129,0.2)', alignItems:'center', justifyContent:'center', flexShrink:'0', marginTop:'2px'
            }},
              h('span', { style: { fontSize:'16px', fontWeight:800, color: C.green }}, 'OK')
            ),
            h('span', { style: { fontSize:'25px', fontWeight:700, color: C.text, lineHeight:'1.4' }},
              item.right
            )
          )
        )
      )
    ),

    keyLearning('Ohne Freistellungsauftrag zahlt die Bank automatisch volle Steuer', C.red),
    footer()
  );

  // === SLIDE 5: FREISTELLUNGSAUFTRAG ===
  const slide5 = h('div', { style: {
    display:'flex', flexDirection:'column', width:W, height:H,
    padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit'
  }},
    h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'18px' }},
      badge('DEIN SCHUTZSCHILD'),
      logoSmall()
    ),
    headline('Freistellungsauftrag richtig nutzen', 58),
    subline('1.000 EUR Sparerpauschbetrag pro Person — steuerfrei'),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'18px' }},
      // Single / Paar
      h('div', { style: { display:'flex', gap:'16px' }},
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', alignItems:'center',
          backgroundColor:'rgba(16,185,129,0.10)', borderRadius:'20px', padding:'28px', gap:'10px',
          border:'2px solid rgba(16,185,129,0.35)'
        }},
          h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color: C.green }}, 'SINGLE'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(16,185,129,0.3)', borderRadius:'2px' }}),
          h('span', { style: { fontSize:'58px', fontWeight:800, color: C.text, lineHeight:'1' }}, '1.000'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted }}, 'EUR/Jahr steuerfrei')
        ),
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', alignItems:'center',
          backgroundColor:'rgba(16,185,129,0.10)', borderRadius:'20px', padding:'28px', gap:'10px',
          border:'2px solid rgba(16,185,129,0.35)'
        }},
          h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color: C.green }}, 'EHEPAAR'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(16,185,129,0.3)', borderRadius:'2px' }}),
          h('span', { style: { fontSize:'58px', fontWeight:800, color: C.text, lineHeight:'1' }}, '2.000'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted }}, 'EUR/Jahr steuerfrei')
        )
      ),
      // 3 Action Steps
      ...[
        { n:'1', step:'Freistellungsauftrag stellen', info:'Direkt bei deinem Broker oder deiner Bank beantragen' },
        { n:'2', step:'Bei mehreren Depots aufteilen', info:'Gesamtfreibetrag anteilig auf alle Broker verteilen' },
        { n:'3', step:'Verrechnungskonto fuellen', info:'Vor Januar genug Guthaben sichern — sonst ETF-Verkauf!' },
      ].map(item =>
        h('div', { style: {
          display:'flex', alignItems:'flex-start', gap:'16px',
          backgroundColor: C.cardBg, borderRadius:'16px', padding:'18px 22px'
        }},
          h('div', { style: {
            display:'flex', width:'38px', height:'38px', borderRadius:'10px',
            backgroundColor: C.green, alignItems:'center', justifyContent:'center', flexShrink:'0'
          }},
            h('span', { style: { fontSize:'20px', fontWeight:800, color:'#001f60' }}, item.n)
          ),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' }},
            h('span', { style: { fontSize:'26px', fontWeight:700, color: C.text }}, item.step),
            h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted, lineHeight:'1.4' }}, item.info)
          )
        )
      )
    ),

    keyLearning('Freistellungsauftrag = erste Pflicht bei jedem neuen ETF-Depot', C.green),
    footer()
  );

  // === SLIDE 6: WANN KEINE VORABPAUSCHALE ===
  const slide6 = h('div', { style: {
    display:'flex', flexDirection:'column', width:W, height:H,
    padding:'70px', backgroundColor: C.bgDark, fontFamily:'Outfit'
  }},
    h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'18px' }},
      badge('SONDERFAELLE'),
      logoSmall()
    ),
    headline('Wann faellt KEINE Vorabpauschale an?', 54),
    subline('4 Situationen die du kennen solltest'),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'15px' }},
      ...[
        { label:'ETF hat Kursverlust gemacht', desc:'Kurs zum Jahresende tiefer als Jahresanfang — Vorabpauschale = 0 EUR', highlight: true },
        { label:'Freistellungsauftrag deckt alles ab', desc:'Dein Freibetrag (1.000 EUR) ist groesser als die Vorabpauschale', highlight: true },
        { label:'Ausschuettender ETF', desc:'Dividenden werden direkt besteuert — keine zusaetzliche Vorabpauschale', highlight: false },
        { label:'Basiszins war negativ', desc:'War in 2021/22 der Fall — seitdem ist er stark gestiegen', highlight: false },
      ].map(item =>
        h('div', { style: {
          display:'flex', alignItems:'flex-start', gap:'16px',
          backgroundColor: item.highlight ? 'rgba(16,185,129,0.10)' : C.cardBg,
          borderRadius:'16px', padding:'20px 24px',
          border: item.highlight ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(255,255,255,0.06)'
        }},
          h('div', { style: {
            display:'flex', width:'40px', height:'40px', borderRadius:'10px',
            backgroundColor: item.highlight ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.08)',
            alignItems:'center', justifyContent:'center', flexShrink:'0'
          }},
            h('span', { style: { fontSize:'20px', fontWeight:800, color: item.highlight ? C.green : C.textMuted }},
              item.highlight ? 'OK' : '~'
            )
          ),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' }},
            h('span', { style: { fontSize:'26px', fontWeight:700, color: C.text } }, item.label),
            h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted, lineHeight:'1.4' }}, item.desc)
          )
        )
      )
    ),

    keyLearning('Verlustjahr = 0 EUR Vorabpauschale — gut zu wissen fuer die Steuerplanung', C.green),
    footer()
  );

  // === SLIDE 7: 4 TAKEAWAYS ===
  const learnings = [
    { num:'01', text:'Freistellungsauftrag bei deinem Broker pruefen und stellen', pct:25 },
    { num:'02', text:'Verrechnungskonto vor Januar 2027 mit ausreichend Guthaben fuellen', pct:50 },
    { num:'03', text:'Depot-Groesse pruefen: Ueberschreitet es 44.000 EUR? Dann Freibetrag aufbrauchen', pct:75 },
    { num:'04', text:'Vorabpauschale wird spaeter auf Abgeltungssteuer beim Verkauf angerechnet — kein Doppelte Besteuerung', pct:100 },
  ];

  const slide7 = h('div', { style: {
    display:'flex', flexDirection:'column', width:W, height:H,
    padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit'
  }},
    h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'18px' }},
      badge('DEINE 4 TAKEAWAYS'),
      logoSmall()
    ),
    headline('Was du jetzt sofort tun solltest', 58),
    subline('Vorbereitung fuer Januar 2027'),

    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'14px' }},
      ...learnings.map(l =>
        h('div', { style: {
          display:'flex', flexDirection:'column', gap:'10px',
          padding:'20px 26px', backgroundColor: C.cardBg, borderRadius:'18px'
        }},
          h('div', { style: { display:'flex', alignItems:'center', gap:'16px' }},
            h('span', { style: {
              fontSize:'36px', fontWeight:800,
              color: l.pct === 100 ? C.green : C.text,
              minWidth:'54px'
            }}, l.num),
            h('span', { style: { fontSize:'24px', fontWeight:600, color: C.text, lineHeight:'1.3' }}, l.text)
          ),
          h('div', { style: { display:'flex', height:'6px', backgroundColor: C.border, borderRadius:'3px', overflow:'hidden' }},
            h('div', { style: {
              display:'flex', width:`${l.pct}%`, height:'6px',
              backgroundColor: l.pct === 100 ? C.green : C.text,
              borderRadius:'3px'
            }})
          )
        )
      )
    ),

    keyLearning('Wer vorbereitet ist zahlt nie mehr als noetig', C.green),
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
      badge('JETZT HANDELN'),
      h('span', { style: {
        fontSize:'58px', fontWeight:800, color: C.text,
        textAlign:'center', lineHeight:'1.1', letterSpacing:'-1.5px'
      }}, 'Hast du deinen Freistellungsauftrag schon gestellt?'),
      h('span', { style: {
        fontSize:'28px', fontWeight:500, color: C.textMuted,
        textAlign:'center', lineHeight:'1.5'
      }}, 'Schreib JA oder NEIN in die Kommentare'),
      h('div', { style: { display:'flex', flexDirection:'column', gap:'14px', width:'100%' }},
        h('div', { style: {
          display:'flex', alignItems:'center', gap:'16px',
          backgroundColor: C.cardBg, borderRadius:'16px', padding:'18px 26px'
        }},
          h('div', { style: { display:'flex', width:'10px', height:'10px', borderRadius:'5px', backgroundColor: C.green }}),
          h('span', { style: { fontSize:'25px', fontWeight:600, color: C.textSoft }},
            'Diesen Post speichern — vor Januar lesen'
          )
        ),
        h('div', { style: {
          display:'flex', alignItems:'center', gap:'16px',
          backgroundColor: C.cardBg, borderRadius:'16px', padding:'18px 26px'
        }},
          h('div', { style: { display:'flex', width:'10px', height:'10px', borderRadius:'5px', backgroundColor: C.green }}),
          h('span', { style: { fontSize:'25px', fontWeight:600, color: C.textSoft }},
            'Mit deinem ETF-Sparplan-Freund teilen'
          )
        )
      )
    ),

    h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', width:'100%' }},
      h('img', { src: logoB64, width:110, height:110, style: { borderRadius:'16px', objectFit:'cover' }}),
      h('span', { style: { fontSize:'26px', fontWeight:700, color: C.text }}, 'Benaro Finanzen'),
      h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted }}, '@benarofinanzen')
    )
  );

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  const outDir = path.join(__dirname, 'output', 'carousel_2026-07-15', 'slides');
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
