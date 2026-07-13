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
    bgDark: '#001542',
    text: '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted: '#9CA3AF',
    cardBg: 'rgba(255,255,255,0.1)',
    border: 'rgba(255,255,255,0.2)',
    green: '#10B981',
    red: '#EF4444',
  };

  const W = 1080, H = 1350;

  const h = (type, props, ...ch) => ({
    type,
    props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')).toString('base64');

  const outDir = path.join(__dirname, 'output/carousel_2026-07-13/slides');

  function badge(text) {
    return h('div', { style: { display:'flex', marginBottom:'16px' } },
      h('span', { style: {
        display:'flex', fontSize:'22px', fontWeight:700, letterSpacing:'3px',
        color: C.text, backgroundColor: C.cardBg,
        padding:'10px 22px', borderRadius:'12px', fontFamily:'Outfit'
      }}, text)
    );
  }

  function headline(text, size) {
    const sz = size || 64;
    return h('span', { style: {
      fontSize: sz + 'px', fontWeight:800, color: C.text,
      lineHeight:'1.08', letterSpacing:'-1.5px', marginBottom:'6px', fontFamily:'Outfit'
    }}, text);
  }

  function subline(text) {
    return h('span', { style: {
      fontSize:'28px', fontWeight:500, color: C.textMuted,
      lineHeight:'1.5', marginTop:'8px', fontFamily:'Outfit'
    }}, text);
  }

  function keyLearning(text, accentColor) {
    return h('div', { style: {
      display:'flex', alignItems:'center', gap:'14px',
      backgroundColor: C.cardBg, borderRadius:'16px', padding:'22px 28px', marginTop:'16px'
    }},
      h('div', { style: {
        display:'flex', width:'6px', minHeight:'40px',
        backgroundColor: accentColor || C.text, borderRadius:'3px', flexShrink:'0'
      }}),
      h('span', { style: {
        fontSize:'27px', fontWeight:600, color: C.text, lineHeight:'1.4', fontFamily:'Outfit'
      }}, text)
    );
  }

  function igHandle() {
    return h('div', { style: { display:'flex', alignItems:'center', marginTop:'12px' }},
      h('span', { style: {
        fontSize:'24px', fontWeight:500, color: C.textMuted, fontFamily:'Outfit'
      }}, '@benarofinanzen')
    );
  }

  function logoTopRight() {
    return h('div', { style: {
      display:'flex', position:'absolute', top:'50px', right:'50px'
    }},
      h('img', { src: logoB64, width:100, height:100, style: { borderRadius:'12px', objectFit:'cover' }})
    );
  }

  function slideRoot(bgColor, children) {
    return h('div', { style: {
      display:'flex', flexDirection:'column',
      width: W, height: H,
      padding:'70px',
      backgroundColor: bgColor || C.bg,
      fontFamily:'Outfit',
      position:'relative',
    }}, ...children);
  }

  function flowArrow() {
    return h('div', { style: { display:'flex', justifyContent:'center', padding:'2px 0' }},
      h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center' }},
        h('div', { style: { display:'flex', width:'4px', height:'22px', backgroundColor: C.border }}),
        h('div', { style: {
          display:'flex', width:'0px', height:'0px',
          borderLeft:'10px solid transparent', borderRight:'10px solid transparent',
          borderTop: '12px solid rgba(255,255,255,0.2)'
        }})
      )
    );
  }

  // ====================================================================
  // SLIDE 1 — HOOK
  // ====================================================================
  const slide1 = slideRoot(C.bg, [
    logoTopRight(),
    badge('DAS MUSST DU WISSEN'),
    h('span', { style: {
      fontSize:'72px', fontWeight:800, color: C.text,
      lineHeight:'1.05', letterSpacing:'-2px', marginBottom:'8px', fontFamily:'Outfit'
    }}, 'Ab Woche 7 hast du ein Problem'),
    subline('Was die GKV wirklich zahlt wenn du laenger krank bist'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' }},
      h('div', { style: { display:'flex', gap:'16px' }},
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'12px',
          backgroundColor: C.cardBg, borderRadius:'24px', padding:'32px',
          border:'2px solid rgba(16,185,129,0.4)'
        }},
          h('span', { style: { fontSize:'20px', fontWeight:700, letterSpacing:'2px', color: C.green, fontFamily:'Outfit' }}, 'WOCHE 1 - 6'),
          h('div', { style: { display:'flex', width:'100%', height:'4px', backgroundColor:'rgba(16,185,129,0.3)', borderRadius:'2px' }}),
          h('span', { style: { fontSize:'64px', fontWeight:800, color: C.green, lineHeight:'1', fontFamily:'Outfit' }}, '100%'),
          h('span', { style: { fontSize:'26px', fontWeight:600, color: C.textSoft, lineHeight:'1.4', fontFamily:'Outfit' }}, 'Lohnfortzahlung vom Arbeitgeber'),
        ),
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'12px',
          backgroundColor: 'rgba(239,68,68,0.12)', borderRadius:'24px', padding:'32px',
          border:'2px solid rgba(239,68,68,0.4)'
        }},
          h('span', { style: { fontSize:'20px', fontWeight:700, letterSpacing:'2px', color: C.red, fontFamily:'Outfit' }}, 'WOCHE 7+'),
          h('div', { style: { display:'flex', width:'100%', height:'4px', backgroundColor:'rgba(239,68,68,0.3)', borderRadius:'2px' }}),
          h('span', { style: { fontSize:'64px', fontWeight:800, color: C.red, lineHeight:'1', fontFamily:'Outfit' }}, '70%'),
          h('span', { style: { fontSize:'26px', fontWeight:600, color: C.textSoft, lineHeight:'1.4', fontFamily:'Outfit' }}, 'Krankengeld der GKV — gekuerzt'),
        ),
      ),
      h('div', { style: {
        display:'flex', alignItems:'center', gap:'14px',
        backgroundColor:'rgba(239,68,68,0.1)', borderRadius:'16px', padding:'20px 28px',
        border:'1px solid rgba(239,68,68,0.25)'
      }},
        h('div', { style: { display:'flex', width:'14px', height:'14px', borderRadius:'7px', backgroundColor: C.red, flexShrink:'0' }}),
        h('span', { style: { fontSize:'26px', fontWeight:600, color: C.textSoft, lineHeight:'1.4', fontFamily:'Outfit' }},
          '54% der Deutschen kennen diese Versorgungsluecke nicht'),
      ),
    ),
    keyLearning('Wische weiter — wir zeigen dir was das konkret fuer dein Gehalt bedeutet', C.red),
    igHandle(),
  ]);

  // ====================================================================
  // SLIDE 2 — BALKEN CHART: Netto vs. Krankengeld
  // ====================================================================
  const slide2 = slideRoot(C.bgDark, [
    logoTopRight(),
    badge('DIE ZAHLEN'),
    headline('Was die GKV wirklich ueberweist', 56),
    subline('Beispiel: 3.500 EUR Netto-Gehalt pro Monat'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'22px' }},
      h('div', { style: { display:'flex', flexDirection:'column', gap:'8px' }},
        h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center' }},
          h('span', { style: { fontSize:'26px', fontWeight:600, color: C.textSoft, fontFamily:'Outfit' }}, 'Netto-Gehalt (Woche 1-6)'),
          h('span', { style: { fontSize:'30px', fontWeight:800, color: C.text, fontFamily:'Outfit' }}, '3.500 EUR'),
        ),
        h('div', { style: { display:'flex', height:'22px', backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'11px', overflow:'hidden' }},
          h('div', { style: { display:'flex', width:'100%', height:'22px', backgroundColor: C.green, borderRadius:'11px' }})
        ),
      ),
      h('div', { style: { display:'flex', flexDirection:'column', gap:'8px' }},
        h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center' }},
          h('span', { style: { fontSize:'26px', fontWeight:600, color: C.textSoft, fontFamily:'Outfit' }}, 'Krankengeld GKV (Woche 7+)'),
          h('span', { style: { fontSize:'30px', fontWeight:800, color: C.red, fontFamily:'Outfit' }}, 'ca. 2.320 EUR'),
        ),
        h('div', { style: { display:'flex', height:'22px', backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'11px', overflow:'hidden' }},
          h('div', { style: { display:'flex', width:'66%', height:'22px', backgroundColor: C.red, borderRadius:'11px' }})
        ),
      ),
      h('div', { style: { display:'flex', flexDirection:'column', gap:'8px' }},
        h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center' }},
          h('span', { style: { fontSize:'26px', fontWeight:600, color: C.textSoft, fontFamily:'Outfit' }}, 'Monatliche Versorgungsluecke'),
          h('span', { style: { fontSize:'30px', fontWeight:800, color: C.red, fontFamily:'Outfit' }}, '- 1.180 EUR'),
        ),
        h('div', { style: { display:'flex', height:'22px', backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'11px', overflow:'hidden' }},
          h('div', { style: { display:'flex', width:'34%', height:'22px', backgroundColor:'rgba(239,68,68,0.6)', borderRadius:'11px' }})
        ),
      ),
      h('div', { style: {
        display:'flex', flexDirection:'column', alignItems:'center', gap:'6px',
        backgroundColor: 'rgba(239,68,68,0.12)', borderRadius:'20px', padding:'24px',
        border:'2px solid rgba(239,68,68,0.3)', marginTop:'8px'
      }},
        h('span', { style: { fontSize:'86px', fontWeight:800, color: C.red, lineHeight:'1', fontFamily:'Outfit' }}, '14.160 EUR'),
        h('span', { style: { fontSize:'25px', fontWeight:600, color: C.textSoft, textAlign:'center', fontFamily:'Outfit' }}, 'Verlust pro Jahr Langzeiterkrankung bei 3.500 EUR Netto'),
      ),
    ),
    keyLearning('Das GKV-Krankengeld ist auf 133 EUR/Tag gedeckelt — egal wie hoch dein Gehalt ist', C.red),
    igHandle(),
  ]);

  // ====================================================================
  // SLIDE 3 — FLOW: Der Weg in die finanzielle Luecke
  // ====================================================================
  const slide3 = slideRoot(C.bg, [
    logoTopRight(),
    badge('ACHTUNG'),
    headline('Der Weg in die finanzielle Luecke', 52),
    subline('Was passiert je laenger du krank bist'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'10px' }},
      h('div', { style: {
        display:'flex', alignItems:'center', gap:'20px',
        backgroundColor: C.cardBg, borderRadius:'18px', padding:'20px 24px',
        border:'2px solid rgba(16,185,129,0.3)'
      }},
        h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', minWidth:'80px' }},
          h('span', { style: { fontSize:'18px', fontWeight:700, color: C.green, letterSpacing:'1px', fontFamily:'Outfit' }}, 'PHASE 1'),
          h('span', { style: { fontSize:'28px', fontWeight:800, color: C.green, fontFamily:'Outfit' }}, '100%'),
        ),
        h('div', { style: { display:'flex', width:'2px', height:'60px', backgroundColor: C.border }}),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'4px', flex:'1' }},
          h('span', { style: { fontSize:'27px', fontWeight:700, color: C.text, fontFamily:'Outfit' }}, 'Woche 1 - 6'),
          h('span', { style: { fontSize:'23px', fontWeight:500, color: C.textSoft, lineHeight:'1.35', fontFamily:'Outfit' }}, 'Lohnfortzahlung: volles Gehalt vom Arbeitgeber'),
        ),
      ),
      flowArrow(),
      h('div', { style: {
        display:'flex', alignItems:'center', gap:'20px',
        backgroundColor: C.cardBg, borderRadius:'18px', padding:'20px 24px',
        border:'2px solid rgba(245,158,11,0.3)'
      }},
        h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', minWidth:'80px' }},
          h('span', { style: { fontSize:'18px', fontWeight:700, color:'#F59E0B', letterSpacing:'1px', fontFamily:'Outfit' }}, 'PHASE 2'),
          h('span', { style: { fontSize:'28px', fontWeight:800, color:'#F59E0B', fontFamily:'Outfit' }}, '70%'),
        ),
        h('div', { style: { display:'flex', width:'2px', height:'60px', backgroundColor: C.border }}),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'4px', flex:'1' }},
          h('span', { style: { fontSize:'27px', fontWeight:700, color: C.text, fontFamily:'Outfit' }}, 'Woche 7 - 78'),
          h('span', { style: { fontSize:'23px', fontWeight:500, color: C.textSoft, lineHeight:'1.35', fontFamily:'Outfit' }}, 'Krankengeld der GKV: ca. 70% des Brutto — gedeckelt bei 133 EUR/Tag'),
        ),
      ),
      flowArrow(),
      h('div', { style: {
        display:'flex', alignItems:'center', gap:'20px',
        backgroundColor: 'rgba(239,68,68,0.12)', borderRadius:'18px', padding:'20px 24px',
        border:'2px solid rgba(239,68,68,0.4)'
      }},
        h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', minWidth:'80px' }},
          h('span', { style: { fontSize:'18px', fontWeight:700, color: C.red, letterSpacing:'1px', fontFamily:'Outfit' }}, 'PHASE 3'),
          h('span', { style: { fontSize:'28px', fontWeight:800, color: C.red, fontFamily:'Outfit' }}, '~25%'),
        ),
        h('div', { style: { display:'flex', width:'2px', height:'60px', backgroundColor: C.border }}),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'4px', flex:'1' }},
          h('span', { style: { fontSize:'27px', fontWeight:700, color: C.text, fontFamily:'Outfit' }}, 'Ab Woche 79'),
          h('span', { style: { fontSize:'23px', fontWeight:500, color: C.textSoft, lineHeight:'1.35', fontFamily:'Outfit' }}, 'Erwerbsminderungsrente oder Buergergeld — weit unter deinem Lebensstandard'),
        ),
      ),
    ),
    keyLearning('Nach 78 Wochen endet das Krankengeld vollstaendig — die meisten wissen das nicht', C.red),
    igHandle(),
  ]);

  // ====================================================================
  // SLIDE 4 — ERWARTUNG vs. REALITAET
  // ====================================================================
  const slide4 = slideRoot(C.bgDark, [
    logoTopRight(),
    badge('MYTHOS VS. WAHRHEIT'),
    headline('Was die meisten denken', 58),
    subline('Und was wirklich stimmt'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'18px' }},
      h('div', { style: { display:'flex', gap:'14px' }},
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'10px',
          backgroundColor: 'rgba(255,255,255,0.08)', borderRadius:'20px', padding:'24px',
        }},
          h('span', { style: { fontSize:'19px', fontWeight:700, letterSpacing:'2px', color: C.textMuted, fontFamily:'Outfit' }}, 'MYTHOS'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor: C.border, borderRadius:'2px' }}),
          h('span', { style: { fontSize:'24px', fontWeight:600, color: C.textSoft, lineHeight:'1.4', fontFamily:'Outfit' }},
            '"Die GKV zahlt mir mein volles Gehalt weiter"'),
        ),
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'10px',
          backgroundColor: 'rgba(16,185,129,0.15)', borderRadius:'20px', padding:'24px',
          border:'2px solid rgba(16,185,129,0.35)'
        }},
          h('span', { style: { fontSize:'19px', fontWeight:700, letterSpacing:'2px', color: C.green, fontFamily:'Outfit' }}, 'REALITAET'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(16,185,129,0.3)', borderRadius:'2px' }}),
          h('span', { style: { fontSize:'24px', fontWeight:600, color: C.text, lineHeight:'1.4', fontFamily:'Outfit' }},
            'Nur in Woche 1-6. Ab Woche 7 nur 70% — und gedeckelt bei 133 EUR/Tag'),
        ),
      ),
      h('div', { style: { display:'flex', gap:'14px' }},
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'10px',
          backgroundColor: 'rgba(255,255,255,0.08)', borderRadius:'20px', padding:'24px',
        }},
          h('span', { style: { fontSize:'19px', fontWeight:700, letterSpacing:'2px', color: C.textMuted, fontFamily:'Outfit' }}, 'MYTHOS'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor: C.border, borderRadius:'2px' }}),
          h('span', { style: { fontSize:'24px', fontWeight:600, color: C.textSoft, lineHeight:'1.4', fontFamily:'Outfit' }},
            '"Ich bin selten krank, das passiert mir nicht"'),
        ),
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'10px',
          backgroundColor: 'rgba(16,185,129,0.15)', borderRadius:'20px', padding:'24px',
          border:'2px solid rgba(16,185,129,0.35)'
        }},
          h('span', { style: { fontSize:'19px', fontWeight:700, letterSpacing:'2px', color: C.green, fontFamily:'Outfit' }}, 'REALITAET'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(16,185,129,0.3)', borderRadius:'2px' }}),
          h('span', { style: { fontSize:'24px', fontWeight:600, color: C.text, lineHeight:'1.4', fontFamily:'Outfit' }},
            'Burnout, Ruecken, Unfall: 1 von 4 faellt laenger als 6 Wochen aus'),
        ),
      ),
      h('div', { style: { display:'flex', gap:'14px' }},
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'10px',
          backgroundColor: 'rgba(255,255,255,0.08)', borderRadius:'20px', padding:'24px',
        }},
          h('span', { style: { fontSize:'19px', fontWeight:700, letterSpacing:'2px', color: C.textMuted, fontFamily:'Outfit' }}, 'MYTHOS'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor: C.border, borderRadius:'2px' }}),
          h('span', { style: { fontSize:'24px', fontWeight:600, color: C.textSoft, lineHeight:'1.4', fontFamily:'Outfit' }},
            '"Der Staat springt ein wenn es wirklich schlimm wird"'),
        ),
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'10px',
          backgroundColor: 'rgba(16,185,129,0.15)', borderRadius:'20px', padding:'24px',
          border:'2px solid rgba(16,185,129,0.35)'
        }},
          h('span', { style: { fontSize:'19px', fontWeight:700, letterSpacing:'2px', color: C.green, fontFamily:'Outfit' }}, 'REALITAET'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(16,185,129,0.3)', borderRadius:'2px' }}),
          h('span', { style: { fontSize:'24px', fontWeight:600, color: C.text, lineHeight:'1.4', fontFamily:'Outfit' }},
            'Erwerbsminderungsrente liegt oft unter 1.000 EUR — Existenzminimum'),
        ),
      ),
    ),
    keyLearning('Die GKV sichert das Ueberleben — nicht deinen Lebensstandard', C.red),
    igHandle(),
  ]);

  // ====================================================================
  // SLIDE 5 — LOESUNG: Wer braucht Krankentagegeld?
  // ====================================================================
  const slide5 = slideRoot(C.bg, [
    logoTopRight(),
    badge('DIE LOESUNG'),
    headline('Wer braucht Krankentagegeld?', 56),
    subline('Und warum gerade du davon betroffen sein koenntest'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'18px' }},
      h('div', { style: {
        display:'flex', alignItems:'center', gap:'22px',
        backgroundColor: 'rgba(16,185,129,0.15)', borderRadius:'20px', padding:'26px 28px',
        border:'2px solid rgba(16,185,129,0.4)'
      }},
        h('div', { style: {
          display:'flex', width:'64px', height:'64px', borderRadius:'16px',
          backgroundColor: C.green,
          alignItems:'center', justifyContent:'center', flexShrink:'0'
        }},
          h('span', { style: { fontSize:'24px', fontWeight:800, color:'#FFFFFF', fontFamily:'Outfit' }}, 'SE')
        ),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'5px', flex:'1' }},
          h('span', { style: { fontSize:'30px', fontWeight:700, color: C.green, fontFamily:'Outfit' }}, 'Selbststaendige'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textSoft, lineHeight:'1.4', fontFamily:'Outfit' }},
            'Kein Arbeitgeber, keine Lohnfortzahlung — ab Tag 1 kein Einkommen'),
        ),
        h('div', { style: {
          display:'flex', padding:'8px 16px', backgroundColor:'rgba(16,185,129,0.2)',
          borderRadius:'10px'
        }},
          h('span', { style: { fontSize:'20px', fontWeight:700, color: C.green, fontFamily:'Outfit' }}, 'KRITISCH')
        ),
      ),
      h('div', { style: {
        display:'flex', alignItems:'center', gap:'22px',
        backgroundColor: C.cardBg, borderRadius:'20px', padding:'26px 28px',
      }},
        h('div', { style: {
          display:'flex', width:'64px', height:'64px', borderRadius:'16px',
          backgroundColor:'rgba(255,255,255,0.15)',
          alignItems:'center', justifyContent:'center', flexShrink:'0'
        }},
          h('span', { style: { fontSize:'24px', fontWeight:800, color:'#FFFFFF', fontFamily:'Outfit' }}, 'AN')
        ),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'5px', flex:'1' }},
          h('span', { style: { fontSize:'30px', fontWeight:700, color: C.text, fontFamily:'Outfit' }}, 'Gutverdiener'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textSoft, lineHeight:'1.4', fontFamily:'Outfit' }},
            'Gehalt ueber 5.512 EUR/Monat — GKV-Deckelung trifft sie besonders hart'),
        ),
      ),
      h('div', { style: {
        display:'flex', alignItems:'center', gap:'22px',
        backgroundColor: C.cardBg, borderRadius:'20px', padding:'26px 28px',
      }},
        h('div', { style: {
          display:'flex', width:'64px', height:'64px', borderRadius:'16px',
          backgroundColor:'rgba(255,255,255,0.15)',
          alignItems:'center', justifyContent:'center', flexShrink:'0'
        }},
          h('span', { style: { fontSize:'24px', fontWeight:800, color:'#FFFFFF', fontFamily:'Outfit' }}, 'FR')
        ),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'5px', flex:'1' }},
          h('span', { style: { fontSize:'30px', fontWeight:700, color: C.text, fontFamily:'Outfit' }}, 'Freelancer'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textSoft, lineHeight:'1.4', fontFamily:'Outfit' }},
            'Freiwillig GKV — Krankengeld oft nicht automatisch eingeschlossen'),
        ),
      ),
      h('div', { style: { display:'flex', gap:'14px', marginTop:'8px' }},
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'6px',
          backgroundColor: C.cardBg, borderRadius:'18px', padding:'20px 24px', alignItems:'center'
        }},
          h('span', { style: { fontSize:'44px', fontWeight:800, color: C.green, fontFamily:'Outfit' }}, '100%'),
          h('span', { style: { fontSize:'21px', fontWeight:500, color: C.textSoft, textAlign:'center', fontFamily:'Outfit' }}, 'Nettoeinkommen absicherbar'),
        ),
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'6px',
          backgroundColor: C.cardBg, borderRadius:'18px', padding:'20px 24px', alignItems:'center'
        }},
          h('span', { style: { fontSize:'44px', fontWeight:800, color: C.text, fontFamily:'Outfit' }}, 'ab Tag 1'),
          h('span', { style: { fontSize:'21px', fontWeight:500, color: C.textSoft, textAlign:'center', fontFamily:'Outfit' }}, 'optional — auch fuer Selbststaendige'),
        ),
      ),
    ),
    keyLearning('Private Krankentagegeld schliesst exakt die Luecke die die GKV laesst', C.green),
    igHandle(),
  ]);

  // ====================================================================
  // SLIDE 6 — KOSTEN vs. SCHUTZ
  // ====================================================================
  const slide6 = slideRoot(C.bgDark, [
    logoTopRight(),
    badge('DER PREIS'),
    headline('Was es kostet und was es bringt', 54),
    subline('Beispielwerte fuer gesunde Angestellte ohne Vorerkrankungen'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' }},
      h('div', { style: {
        display:'flex', alignItems:'center', gap:'0px',
        backgroundColor: C.cardBg, borderRadius:'20px', overflow:'hidden'
      }},
        h('div', { style: {
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          backgroundColor:'rgba(255,255,255,0.06)', padding:'24px 20px', minWidth:'140px', gap:'4px'
        }},
          h('span', { style: { fontSize:'19px', fontWeight:700, color: C.green, letterSpacing:'1px', fontFamily:'Outfit' }}, 'ALTER'),
          h('span', { style: { fontSize:'32px', fontWeight:800, color: C.green, fontFamily:'Outfit' }}, '25 J.'),
        ),
        h('div', { style: { display:'flex', width:'2px', height:'90px', backgroundColor: C.border }}),
        h('div', { style: {
          display:'flex', flexDirection:'column', justifyContent:'center', flex:'1', padding:'20px 22px', gap:'4px'
        }},
          h('span', { style: { fontSize:'21px', fontWeight:600, color: C.textMuted, fontFamily:'Outfit' }}, 'Monatliche Praemie'),
          h('span', { style: { fontSize:'30px', fontWeight:800, color: C.red, fontFamily:'Outfit' }}, 'ab 18 EUR/Monat'),
        ),
        h('div', { style: {
          display:'flex', flexDirection:'column', justifyContent:'center', flex:'1', padding:'20px 22px', gap:'4px',
          backgroundColor:'rgba(255,255,255,0.04)'
        }},
          h('span', { style: { fontSize:'21px', fontWeight:600, color: C.textMuted, fontFamily:'Outfit' }}, 'Tagegeld bis zu'),
          h('span', { style: { fontSize:'30px', fontWeight:800, color: C.green, fontFamily:'Outfit' }}, '3.000 EUR/Monat'),
        ),
      ),
      h('div', { style: {
        display:'flex', alignItems:'center', gap:'0px',
        backgroundColor: C.cardBg, borderRadius:'20px', overflow:'hidden'
      }},
        h('div', { style: {
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          backgroundColor:'rgba(255,255,255,0.06)', padding:'24px 20px', minWidth:'140px', gap:'4px'
        }},
          h('span', { style: { fontSize:'19px', fontWeight:700, color:'#60A5FA', letterSpacing:'1px', fontFamily:'Outfit' }}, 'ALTER'),
          h('span', { style: { fontSize:'32px', fontWeight:800, color:'#60A5FA', fontFamily:'Outfit' }}, '35 J.'),
        ),
        h('div', { style: { display:'flex', width:'2px', height:'90px', backgroundColor: C.border }}),
        h('div', { style: {
          display:'flex', flexDirection:'column', justifyContent:'center', flex:'1', padding:'20px 22px', gap:'4px'
        }},
          h('span', { style: { fontSize:'21px', fontWeight:600, color: C.textMuted, fontFamily:'Outfit' }}, 'Monatliche Praemie'),
          h('span', { style: { fontSize:'30px', fontWeight:800, color: C.red, fontFamily:'Outfit' }}, 'ab 32 EUR/Monat'),
        ),
        h('div', { style: {
          display:'flex', flexDirection:'column', justifyContent:'center', flex:'1', padding:'20px 22px', gap:'4px',
          backgroundColor:'rgba(255,255,255,0.04)'
        }},
          h('span', { style: { fontSize:'21px', fontWeight:600, color: C.textMuted, fontFamily:'Outfit' }}, 'Tagegeld bis zu'),
          h('span', { style: { fontSize:'30px', fontWeight:800, color: C.green, fontFamily:'Outfit' }}, '3.500 EUR/Monat'),
        ),
      ),
      h('div', { style: {
        display:'flex', alignItems:'center', gap:'0px',
        backgroundColor: C.cardBg, borderRadius:'20px', overflow:'hidden'
      }},
        h('div', { style: {
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          backgroundColor:'rgba(255,255,255,0.06)', padding:'24px 20px', minWidth:'140px', gap:'4px'
        }},
          h('span', { style: { fontSize:'19px', fontWeight:700, color:'#F59E0B', letterSpacing:'1px', fontFamily:'Outfit' }}, 'ALTER'),
          h('span', { style: { fontSize:'32px', fontWeight:800, color:'#F59E0B', fontFamily:'Outfit' }}, '45 J.'),
        ),
        h('div', { style: { display:'flex', width:'2px', height:'90px', backgroundColor: C.border }}),
        h('div', { style: {
          display:'flex', flexDirection:'column', justifyContent:'center', flex:'1', padding:'20px 22px', gap:'4px'
        }},
          h('span', { style: { fontSize:'21px', fontWeight:600, color: C.textMuted, fontFamily:'Outfit' }}, 'Monatliche Praemie'),
          h('span', { style: { fontSize:'30px', fontWeight:800, color: C.red, fontFamily:'Outfit' }}, 'ab 56 EUR/Monat'),
        ),
        h('div', { style: {
          display:'flex', flexDirection:'column', justifyContent:'center', flex:'1', padding:'20px 22px', gap:'4px',
          backgroundColor:'rgba(255,255,255,0.04)'
        }},
          h('span', { style: { fontSize:'21px', fontWeight:600, color: C.textMuted, fontFamily:'Outfit' }}, 'Tagegeld bis zu'),
          h('span', { style: { fontSize:'30px', fontWeight:800, color: C.green, fontFamily:'Outfit' }}, '4.000 EUR/Monat'),
        ),
      ),
      h('div', { style: {
        display:'flex', alignItems:'center', gap:'14px',
        backgroundColor:'rgba(16,185,129,0.1)', borderRadius:'16px', padding:'20px 24px',
        border:'1px solid rgba(16,185,129,0.25)', marginTop:'8px'
      }},
        h('div', { style: { display:'flex', width:'12px', height:'12px', borderRadius:'6px', backgroundColor: C.green, flexShrink:'0' }}),
        h('span', { style: { fontSize:'25px', fontWeight:600, color: C.textSoft, lineHeight:'1.4', fontFamily:'Outfit' }},
          'Je juenger und gesuender du bist desto guenstiger ist der Einstieg')
      ),
    ),
    keyLearning('Frueher abschliessen = dauerhaft guenstiger Beitrag ohne Risiko durch Vorerkrankungen', C.green),
    igHandle(),
  ]);

  // ====================================================================
  // SLIDE 7 — 4 TAKEAWAYS
  // ====================================================================
  const slide7 = slideRoot(C.bg, [
    logoTopRight(),
    badge('DEIN PLAN'),
    headline('4 Dinge die du jetzt weisst', 58),
    subline('Und ein Schritt der alles veraendert'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'14px' }},
      h('div', { style: {
        display:'flex', flexDirection:'column', gap:'8px',
        padding:'20px 24px', backgroundColor: C.cardBg, borderRadius:'18px'
      }},
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px' }},
          h('span', { style: { fontSize:'36px', fontWeight:800, color: C.text, minWidth:'52px', fontFamily:'Outfit' }}, '01'),
          h('span', { style: { fontSize:'25px', fontWeight:600, color: C.text, lineHeight:'1.3', fontFamily:'Outfit' }},
            'Ab Woche 7 zahlt die GKV nur 70% des Bruttogehalts — gedeckelt bei 133 EUR/Tag'),
        ),
        h('div', { style: { display:'flex', height:'5px', backgroundColor: C.border, borderRadius:'3px', overflow:'hidden' }},
          h('div', { style: { display:'flex', width:'25%', height:'5px', backgroundColor: C.text, borderRadius:'3px' }})
        ),
      ),
      h('div', { style: {
        display:'flex', flexDirection:'column', gap:'8px',
        padding:'20px 24px', backgroundColor: C.cardBg, borderRadius:'18px'
      }},
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px' }},
          h('span', { style: { fontSize:'36px', fontWeight:800, color: C.text, minWidth:'52px', fontFamily:'Outfit' }}, '02'),
          h('span', { style: { fontSize:'25px', fontWeight:600, color: C.text, lineHeight:'1.3', fontFamily:'Outfit' }},
            'Selbststaendige und Gutverdiener trifft die Luecke am haertesten'),
        ),
        h('div', { style: { display:'flex', height:'5px', backgroundColor: C.border, borderRadius:'3px', overflow:'hidden' }},
          h('div', { style: { display:'flex', width:'50%', height:'5px', backgroundColor: C.text, borderRadius:'3px' }})
        ),
      ),
      h('div', { style: {
        display:'flex', flexDirection:'column', gap:'8px',
        padding:'20px 24px', backgroundColor: C.cardBg, borderRadius:'18px'
      }},
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px' }},
          h('span', { style: { fontSize:'36px', fontWeight:800, color: C.text, minWidth:'52px', fontFamily:'Outfit' }}, '03'),
          h('span', { style: { fontSize:'25px', fontWeight:600, color: C.text, lineHeight:'1.3', fontFamily:'Outfit' }},
            'Private Krankentagegeld schliesst die Luecke ab Tag 1 oder ab Woche 7'),
        ),
        h('div', { style: { display:'flex', height:'5px', backgroundColor: C.border, borderRadius:'3px', overflow:'hidden' }},
          h('div', { style: { display:'flex', width:'75%', height:'5px', backgroundColor: C.text, borderRadius:'3px' }})
        ),
      ),
      h('div', { style: {
        display:'flex', flexDirection:'column', gap:'8px',
        padding:'20px 24px', backgroundColor: C.cardBg, borderRadius:'18px'
      }},
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px' }},
          h('span', { style: { fontSize:'36px', fontWeight:800, color: C.green, minWidth:'52px', fontFamily:'Outfit' }}, '04'),
          h('span', { style: { fontSize:'25px', fontWeight:600, color: C.text, lineHeight:'1.3', fontFamily:'Outfit' }},
            'Jetzt abschliessen — je gesuender du bist desto guenstiger der Beitrag'),
        ),
        h('div', { style: { display:'flex', height:'5px', backgroundColor: C.border, borderRadius:'3px', overflow:'hidden' }},
          h('div', { style: { display:'flex', width:'100%', height:'5px', backgroundColor: C.green, borderRadius:'3px' }})
        ),
      ),
    ),
    keyLearning('Wisse was du nicht weisst — lass deine Versorgungsluecke kostenlos pruefen', C.green),
    igHandle(),
  ]);

  // ====================================================================
  // SLIDE 8 — CTA
  // ====================================================================
  const slide8 = slideRoot(C.bgDark, [
    h('div', { style: {
      display:'flex', flexDirection:'column', flex:'1', alignItems:'center', justifyContent:'center', gap:'28px'
    }},
      h('img', { src: logoB64, width:140, height:140, style: { borderRadius:'20px', objectFit:'cover' }}),
      h('span', { style: {
        fontSize:'52px', fontWeight:800, color: C.text,
        textAlign:'center', lineHeight:'1.1', letterSpacing:'-1.5px', fontFamily:'Outfit'
      }}, 'Wie lange koennte deine Familie von deinen Ersparnissen leben?'),
      h('span', { style: {
        fontSize:'28px', fontWeight:500, color: C.textMuted,
        textAlign:'center', lineHeight:'1.5', fontFamily:'Outfit'
      }}, 'Schreib uns in die DM — wir pruefen deine Krankentagegeld-Luecke kostenlos und unverbindlich.'),
      h('div', { style: {
        display:'flex', backgroundColor:'rgba(16,185,129,0.15)', borderRadius:'16px', padding:'20px 28px',
        border:'2px solid rgba(16,185,129,0.35)'
      }},
        h('span', { style: { fontSize:'28px', fontWeight:700, color: C.green, fontFamily:'Outfit' }},
          'Speichern nicht vergessen — du brauchst diese Infos noch')
      ),
    ),
    h('div', { style: { display:'flex', justifyContent:'center' }},
      igHandle()
    ),
  ]);

  // ====================================================================
  // RENDER ALL SLIDES
  // ====================================================================
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} done -> ${pngPath}`);
  }
  console.log('All slides generated!');
}

main().catch(e => { console.error(e); process.exit(1); });
