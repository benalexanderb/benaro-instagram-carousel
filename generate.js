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

  // BENARO FINANZEN Brand Colors
  const C = {
    bg:          '#1B2D87',
    bgDark:      '#12207A',
    bgDeep:      '#0D1A60',
    text:        '#FFFFFF',
    textSoft:    'rgba(255,255,255,0.80)',
    textMuted:   'rgba(255,255,255,0.50)',
    cardBg:      'rgba(255,255,255,0.10)',
    cardBgLight: 'rgba(255,255,255,0.18)',
    border:      'rgba(255,255,255,0.15)',
    accent:      '#5BC8F5',
    red:         '#E63030',
    white:       '#FFFFFF',
  };

  const W = 1080, H = 1350;

  const h = (type, props, ...ch) => ({
    type, props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function badge(text) {
    return h('div', { style: { display:'flex', marginBottom:'16px' } },
      h('span', { style: {
        display:'flex', fontSize:'22px', fontWeight:700, letterSpacing:'3px',
        color: C.accent,
        backgroundColor: 'rgba(91,200,245,0.15)',
        padding:'10px 22px', borderRadius:'12px', textTransform:'uppercase'
      } }, text),
    );
  }

  function headline(text, size=62) {
    return h('span', { style: {
      fontSize:`${size}px`, fontWeight:800,
      color: C.text,
      lineHeight:'1.05', letterSpacing:'-0.5px', marginBottom:'6px',
      textTransform:'uppercase'
    } }, text);
  }

  function subline(text) {
    return h('span', { style: {
      fontSize:'28px', fontWeight:500,
      color: C.textSoft,
      lineHeight:'1.5', marginTop:'8px'
    } }, text);
  }

  function keyLearning(text) {
    return h('div', { style: {
      display:'flex', alignItems:'center', gap:'14px',
      backgroundColor: 'rgba(255,255,255,0.08)',
      borderRadius:'16px', padding:'22px 28px', marginTop:'auto'
    } },
      h('div', { style: {
        display:'flex', width:'6px', minHeight:'40px',
        backgroundColor: C.red, borderRadius:'3px'
      } }),
      h('span', { style: {
        fontSize:'27px', fontWeight:600,
        color: C.text, lineHeight:'1.4'
      } }, text),
    );
  }

  function bfLogo() {
    return h('div', { style: {
      display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', marginTop:'20px'
    } },
      h('div', { style: {
        display:'flex', alignItems:'center', justifyContent:'center',
        width:'72px', height:'56px',
        border:'3px solid rgba(255,255,255,0.9)', borderRadius:'10px'
      } },
        h('span', { style: { fontSize:'28px', fontWeight:800, color:'#FFFFFF', letterSpacing:'2px' } }, 'BF'),
      ),
      h('span', { style: {
        fontSize:'14px', fontWeight:600, color:'rgba(255,255,255,0.7)',
        letterSpacing:'3px', textTransform:'uppercase'
      } }, 'BENARO FINANZEN'),
    );
  }

  function slide(children) {
    return h('div', { style: {
      display:'flex', flexDirection:'column',
      width:W, height:H, padding:'70px',
      backgroundColor: C.bg,
      fontFamily:'Outfit'
    } }, ...children);
  }

  // ===================== SLIDE 1 — HOOK =====================
  // SVG: Auto-Silhouette + "700 €" in rotem Kreis
  const carSvg = `<svg width="880" height="340" viewBox="0 0 880 340" xmlns="http://www.w3.org/2000/svg">
    <!-- Auto-Silhouette (vereinfacht) -->
    <rect x="80" y="180" width="720" height="100" rx="20" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
    <!-- Dach -->
    <path d="M200 180 Q240 100 320 80 L560 80 Q640 80 680 180 Z" fill="rgba(91,200,245,0.15)" stroke="rgba(91,200,245,0.4)" stroke-width="2"/>
    <!-- Windschutzscheibe -->
    <path d="M250 180 Q280 110 330 95 L520 95 Q570 110 630 180 Z" fill="rgba(91,200,245,0.08)" stroke="rgba(91,200,245,0.2)" stroke-width="1"/>
    <!-- Rad links -->
    <circle cx="230" cy="280" r="55" fill="rgba(18,32,122,1)" stroke="rgba(255,255,255,0.4)" stroke-width="3"/>
    <circle cx="230" cy="280" r="30" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    <!-- Rad rechts -->
    <circle cx="650" cy="280" r="55" fill="rgba(18,32,122,1)" stroke="rgba(255,255,255,0.4)" stroke-width="3"/>
    <circle cx="650" cy="280" r="30" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    <!-- Stoßstange vorne -->
    <rect x="80" y="260" width="60" height="20" rx="10" fill="rgba(255,255,255,0.15)"/>
    <!-- Stoßstange hinten -->
    <rect x="740" y="260" width="60" height="20" rx="10" fill="rgba(255,255,255,0.15)"/>
    <!-- Scheinwerfer -->
    <ellipse cx="115" cy="225" rx="18" ry="10" fill="rgba(255,220,80,0.7)"/>
    <ellipse cx="765" cy="225" rx="18" ry="10" fill="rgba(230,48,48,0.7)"/>
    <!-- Roter Kreis mit Pfeil oben rechts -->
    <circle cx="760" cy="100" r="75" fill="rgba(230,48,48,0.15)" stroke="#E63030" stroke-width="4"/>
    <!-- Pfeil nach oben (Preis steigt) -->
    <line x1="760" y1="145" x2="760" y2="65" stroke="#E63030" stroke-width="5" stroke-linecap="round"/>
    <line x1="760" y1="65" x2="740" y2="90" stroke="#E63030" stroke-width="5" stroke-linecap="round"/>
    <line x1="760" y1="65" x2="780" y2="90" stroke="#E63030" stroke-width="5" stroke-linecap="round"/>
  </svg>`;
  const carSrc = `data:image/svg+xml;base64,${Buffer.from(carSvg).toString('base64')}`;

  const slide1 = slide([
    badge('WECHSELSAISON 2026'),
    headline('BIS ZU 700 € ZU VIEL FÜR DEINE KFZ-VERSICHERUNG?', 58),
    subline('Die meisten Deutschen zahlen mehr als nötig — ohne es zu wissen.'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'16px' } },
      h('img', { src: carSrc, width:880, height:340, style:{ objectFit:'contain' } }),
      h('div', { style: { display:'flex', alignItems:'center', gap:'32px', marginTop:'8px' } },
        h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'4px' } },
          h('span', { style: { fontSize:'80px', fontWeight:800, color: C.red, lineHeight:'1' } }, '700 €'),
          h('div', { style: { display:'flex', width:'140px', height:'4px', backgroundColor: C.red, borderRadius:'2px' } }),
          h('span', { style: { fontSize:'22px', fontWeight:600, color: C.textMuted, textTransform:'uppercase', letterSpacing:'2px' } }, 'MÖGLICHE ERSPARNIS'),
        ),
        h('div', { style: { display:'flex', width:'2px', height:'80px', backgroundColor: C.border } }),
        h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'4px' } },
          h('span', { style: { fontSize:'80px', fontWeight:800, color: C.accent, lineHeight:'1' } }, '30.'),
          h('div', { style: { display:'flex', width:'120px', height:'4px', backgroundColor: C.accent, borderRadius:'2px' } }),
          h('span', { style: { fontSize:'22px', fontWeight:600, color: C.textMuted, textTransform:'uppercase', letterSpacing:'2px' } }, 'NOV. DEADLINE'),
        ),
      ),
    ),
    keyLearning('Kündigungsfrist endet am 30. November 2026 — jetzt vergleichen und wechseln'),
    bfLogo(),
  ]);

  // ===================== SLIDE 2 — STAT HERO =====================
  // StatHero: 18 Millionen zahlen zu viel
  const slide2 = slide([
    badge('DAS KOSTET DICH'),
    headline('GLEICHES AUTO — DOPPELTER PREIS', 60),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'20px' } },
      h('div', { style: { display:'flex', gap:'8px', marginBottom:'8px' } },
        ...[0,1,2].map(() =>
          h('div', { style: {
            display:'flex', width:'0', height:'0',
            borderLeft:'14px solid transparent', borderRight:'14px solid transparent',
            borderTop:`20px solid ${C.red}`
          } })
        ),
      ),
      h('span', { style: { fontSize:'130px', fontWeight:800, color: C.accent, lineHeight:'1' } }, '700 €'),
      h('div', { style: { display:'flex', width:'200px', height:'5px', backgroundColor: C.red, borderRadius:'3px', marginTop:'-8px' } }),
      h('span', { style: { fontSize:'30px', fontWeight:500, color: C.text, lineHeight:'1.5', textAlign:'center', maxWidth:'800px' } },
        'Preisunterschied für identisch abgesicherte KFZ-Tarife — selbes Auto, selbe Leistung'
      ),
      h('div', { style: { display:'flex', gap:'20px', marginTop:'20px' } },
        h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', padding:'24px 40px', backgroundColor: C.bgDark, borderRadius:'18px', border:`1px solid ${C.border}` } },
          h('span', { style: { fontSize:'22px', fontWeight:700, color: C.textMuted, textTransform:'uppercase', letterSpacing:'2px' } }, 'ANBIETER A'),
          h('span', { style: { fontSize:'52px', fontWeight:800, color: C.red } }, '1.100 €'),
          h('span', { style: { fontSize:'20px', color: C.textMuted } }, 'pro Jahr'),
        ),
        h('div', { style: { display:'flex', alignItems:'center', justifyContent:'center', padding:'0 16px' } },
          h('span', { style: { fontSize:'36px', fontWeight:800, color: C.textMuted } }, 'VS.'),
        ),
        h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', padding:'24px 40px', backgroundColor:'rgba(91,200,245,0.12)', borderRadius:'18px', border:`2px solid ${C.accent}` } },
          h('span', { style: { fontSize:'22px', fontWeight:700, color: C.accent, textTransform:'uppercase', letterSpacing:'2px' } }, 'ANBIETER B'),
          h('span', { style: { fontSize:'52px', fontWeight:800, color: C.accent } }, '400 €'),
          h('span', { style: { fontSize:'20px', color: C.textMuted } }, 'pro Jahr'),
        ),
      ),
    ),
    keyLearning('Versicherer kalkulieren sehr individuell — Vergleichen lohnt sich immer'),
    bfLogo(),
  ]);

  // ===================== SLIDE 3 — BESTANDSKUNDENFALLE =====================
  const trapSteps = [
    { label:'NEUKUNDENRABATT', sub:'Günstiger Einstiegspreis lockt', color: C.accent, pct:'90%' },
    { label:'STILLE ERHÖHUNG', sub:'Preis steigt nach 1-2 Jahren', color:'#F59E0B', pct:'65%' },
    { label:'BESTANDSKUNDENFALLE', sub:'Du bleibst — und zahlst mehr', color: C.red, pct:'35%' },
  ];

  const slide3 = slide([
    badge('DIE FALLE'),
    headline('TREUE WIRD NICHT BELOHNT', 64),
    subline('So geraten Millionen in die Bestandskundenfalle'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'12px' } },
      ...trapSteps.map((s, i) =>
        h('div', { style: {
          display:'flex', flexDirection:'column', gap:'8px',
          padding:'24px 28px',
          backgroundColor: C.bgDark,
          borderRadius:'18px',
          border:`1px solid ${C.border}`
        } },
          h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center' } },
            h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' } },
              h('span', { style: { fontSize:'24px', fontWeight:700, color: s.color, textTransform:'uppercase', letterSpacing:'1px' } }, `${i+1}. ${s.label}`),
              h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textSoft } }, s.sub),
            ),
          ),
          h('div', { style: { display:'flex', height:'8px', backgroundColor:'rgba(255,255,255,0.1)', borderRadius:'4px', overflow:'hidden' } },
            h('div', { style: { display:'flex', width:s.pct, height:'8px', backgroundColor: s.color, borderRadius:'4px' } }),
          ),
        )
      ),
      h('div', { style: { display:'flex', alignItems:'center', gap:'16px', padding:'20px 28px', backgroundColor:'rgba(230,48,48,0.12)', borderRadius:'14px', border:`1px solid ${C.red}`, marginTop:'8px' } },
        h('div', { style: { display:'flex', width:'12px', height:'12px', borderRadius:'6px', backgroundColor: C.red } }),
        h('span', { style: { fontSize:'26px', fontWeight:700, color: C.red } }, 'BESTANDSKUNDEN ZAHLEN DURCHSCHNITTLICH 18% MEHR ALS NEUKUNDEN'),
      ),
    ),
    keyLearning('Dein Versicherer rechnet damit, dass du nicht wechselst — enttäusche ihn'),
    bfLogo(),
  ]);

  // ===================== SLIDE 4 — ERWARTUNG VS. REALITÄT =====================
  const slide4 = slide([
    badge('DIE WAHRHEIT'),
    headline('WECHSELN IST EINFACHER ALS DU DENKST', 54),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' } },
      h('div', { style: { display:'flex', gap:'14px' } },
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column',
          backgroundColor: C.bgDark, borderRadius:'20px', padding:'28px', gap:'16px',
          border:`1px solid ${C.border}`
        } },
          h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color: C.textMuted, textTransform:'uppercase' } }, 'WAS VIELE DENKEN'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor: C.border, borderRadius:'2px' } }),
          ...[
            'Wechseln dauert Stunden',
            'Ich verliere meinen Schutz',
            'Das lohnt sich nicht für mich',
            'Mein Schadenfreiheitsrabatt geht verloren',
          ].map(t =>
            h('div', { style: { display:'flex', alignItems:'center', gap:'12px' } },
              h('div', { style: { display:'flex', width:'10px', height:'10px', borderRadius:'5px', backgroundColor: C.red, flexShrink:'0' } }),
              h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textSoft, lineHeight:'1.3', textDecoration:'line-through' } }, t),
            )
          ),
        ),
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column',
          backgroundColor:'rgba(91,200,245,0.10)', borderRadius:'20px', padding:'28px', gap:'16px',
          border:`2px solid ${C.accent}`
        } },
          h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color: C.accent, textTransform:'uppercase' } }, 'DIE REALITÄT'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor: C.accent, borderRadius:'2px' } }),
          ...[
            '5 Minuten Vergleich online',
            'Kündigung beim alten Anbieter läuft automatisch',
            'Bis 700 € Ersparnis pro Jahr',
            'SFR wird 1:1 übertragen',
          ].map(t =>
            h('div', { style: { display:'flex', alignItems:'center', gap:'12px' } },
              h('div', { style: { display:'flex', width:'10px', height:'10px', borderRadius:'5px', backgroundColor: C.accent, flexShrink:'0' } }),
              h('span', { style: { fontSize:'24px', fontWeight:500, color: C.text, lineHeight:'1.3' } }, t),
            )
          ),
        ),
      ),
      h('div', { style: { display:'flex', alignItems:'center', gap:'14px', padding:'18px 24px', backgroundColor:'rgba(91,200,245,0.10)', borderRadius:'14px', border:`1px solid ${C.accent}` } },
        h('span', { style: { fontSize:'36px' } }, 'i'),
        h('span', { style: { fontSize:'24px', fontWeight:600, color: C.accent, lineHeight:'1.4' } },
          'Dein Schadenfreiheitsrabatt (SFR) wird beim Wechsel vollständig übertragen — du verlierst nichts.'
        ),
      ),
    ),
    keyLearning('Online-Kündigung in 2 Minuten erledigt — Vergleich dauert noch weniger'),
    bfLogo(),
  ]);

  // ===================== SLIDE 5 — 4 FAKTOREN =====================
  const faktoren = [
    { num:'01', icon:'km', title:'KILOMETERLEISTUNG', desc:'Weniger km = deutlich günstigerer Beitrag' },
    { num:'02', icon:'SF', title:'SCHADENFREIHEITSKLASSE', desc:'SF 25+ spart über 60% gegenüber SF 0' },
    { num:'03', icon:'HP', title:'STELLPLATZ', desc:'Garage statt Straße: bis 15% günstiger' },
    { num:'04', icon:'SB', title:'SELBSTBETEILIGUNG', desc:'300 / 500 € SB senkt den Beitrag stark' },
  ];

  const slide5 = slide([
    badge('DEIN BEITRAG'),
    headline('DIESE 4 FAKTOREN ENTSCHEIDEN', 62),
    subline('Wer die Stellschrauben kennt, zahlt deutlich weniger'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'12px' } },
      h('div', { style: { display:'flex', gap:'14px' } },
        ...faktoren.slice(0,2).map(f =>
          h('div', { style: {
            display:'flex', flex:'1', flexDirection:'column',
            backgroundColor: C.bgDark, borderRadius:'20px', padding:'28px', gap:'12px',
            border:`1px solid ${C.border}`
          } },
            h('div', { style: {
              display:'flex', width:'56px', height:'56px', borderRadius:'14px',
              backgroundColor:'rgba(91,200,245,0.18)', alignItems:'center', justifyContent:'center'
            } },
              h('span', { style: { fontSize:'22px', fontWeight:800, color: C.accent } }, f.icon),
            ),
            h('span', { style: { fontSize:'13px', fontWeight:700, color: C.accent, textTransform:'uppercase', letterSpacing:'2px' } }, f.num),
            h('span', { style: { fontSize:'24px', fontWeight:800, color: C.white, textTransform:'uppercase' } }, f.title),
            h('span', { style: { fontSize:'20px', fontWeight:500, color: C.textMuted, lineHeight:'1.4' } }, f.desc),
          )
        ),
      ),
      h('div', { style: { display:'flex', gap:'14px' } },
        ...faktoren.slice(2,4).map(f =>
          h('div', { style: {
            display:'flex', flex:'1', flexDirection:'column',
            backgroundColor: C.bgDark, borderRadius:'20px', padding:'28px', gap:'12px',
            border:`1px solid ${C.border}`
          } },
            h('div', { style: {
              display:'flex', width:'56px', height:'56px', borderRadius:'14px',
              backgroundColor:'rgba(91,200,245,0.18)', alignItems:'center', justifyContent:'center'
            } },
              h('span', { style: { fontSize:'22px', fontWeight:800, color: C.accent } }, f.icon),
            ),
            h('span', { style: { fontSize:'13px', fontWeight:700, color: C.accent, textTransform:'uppercase', letterSpacing:'2px' } }, f.num),
            h('span', { style: { fontSize:'24px', fontWeight:800, color: C.white, textTransform:'uppercase' } }, f.title),
            h('span', { style: { fontSize:'20px', fontWeight:500, color: C.textMuted, lineHeight:'1.4' } }, f.desc),
          )
        ),
      ),
    ),
    keyLearning('Wer die Stellschrauben kennt, zahlt bis zu 30 % weniger'),
    bfLogo(),
  ]);

  // ===================== SLIDE 6 — 3-SCHRITTE-WECHSELPLAN =====================
  const steps = [
    { num:'1', title:'JETZT VERGLEICHEN', desc:'Check24, Verivox oder Tarifcheck nutzen — kostenlos und unverbindlich' },
    { num:'2', title:'KÜNDIGUNG EINREICHEN', desc:'Kündigung beim alten Anbieter bis 30. November 2026 per E-Mail oder Online-Formular' },
    { num:'3', title:'NEUEN VERTRAG ABSCHLIESSEN', desc:'Nahtloser Übergang zum 1. Januar 2027 — SFR wird automatisch übertragen' },
  ];

  const slide6 = slide([
    badge('DER WECHSELPLAN'),
    headline('IN 3 SCHRITTEN ZUM GÜNSTIGSTEN TARIF', 52),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      ...steps.map(s =>
        h('div', { style: { display:'flex', alignItems:'center', gap:'20px', position:'relative' } },
          h('span', { style: { fontSize:'52px', fontWeight:800, color: C.white, minWidth:'60px', lineHeight:'1' } }, `${s.num}.`),
          h('div', { style: {
            display:'flex', flex:'1', flexDirection:'column',
            backgroundColor: C.white,
            borderRadius:'4px',
            padding:'16px 24px',
          } },
            h('span', { style: { fontSize:'24px', fontWeight:800, color: C.bg, textTransform:'uppercase', letterSpacing:'1px' } }, s.title),
            h('span', { style: { fontSize:'20px', fontWeight:600, color:'rgba(27,45,135,0.7)', lineHeight:'1.4', marginTop:'4px' } }, s.desc),
          ),
        )
      ),
      h('div', { style: { display:'flex', alignItems:'center', gap:'14px', padding:'18px 24px', backgroundColor:'rgba(230,48,48,0.12)', borderRadius:'14px', border:`1px solid ${C.red}`, marginTop:'8px' } },
        h('div', { style: { display:'flex', width:'12px', height:'12px', borderRadius:'6px', backgroundColor: C.red } }),
        h('span', { style: { fontSize:'25px', fontWeight:700, color: C.red } }, 'DEADLINE: 30. NOVEMBER 2026 — danach ein Jahr warten!'),
      ),
    ),
    keyLearning('Vergleich kostet nichts — Nicht-Wechseln kostet bis zu 700 € pro Jahr'),
    bfLogo(),
  ]);

  // ===================== SLIDE 7 — LEARNINGS / CHECKLISTE =====================
  const learnings = [
    { num:'01', text:'Jetzt Tarife vergleichen (5 Min. online)', pct:25 },
    { num:'02', text:'Kündigung bis 30. November einreichen', pct:50 },
    { num:'03', text:'Selbstbeteiligung & Kilometerleistung prüfen', pct:75 },
    { num:'04', text:'SFR-Nachweis bereithalten beim Wechsel', pct:100 },
  ];

  const slide7 = slide([
    badge('DEINE CHECKLISTE'),
    headline('4 DINGE DIE DU JETZT TUN SOLLTEST', 56),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'14px' } },
      ...learnings.map(l =>
        h('div', { style: {
          display:'flex', flexDirection:'column', gap:'10px', padding:'24px 28px',
          backgroundColor: C.bgDark, borderRadius:'18px',
          border: l.pct === 100 ? `2px solid ${C.accent}` : `1px solid ${C.border}`
        } },
          h('div', { style: { display:'flex', alignItems:'center', gap:'18px' } },
            h('span', { style: { fontSize:'40px', fontWeight:800, color: l.pct === 100 ? C.accent : C.white, minWidth:'60px' } }, l.num),
            h('span', { style: { fontSize:'26px', fontWeight:600, color: C.text, lineHeight:'1.3' } }, l.text),
          ),
          h('div', { style: { display:'flex', height:'6px', backgroundColor: C.border, borderRadius:'3px', overflow:'hidden' } },
            h('div', { style: { display:'flex', width:`${l.pct}%`, height:'6px', backgroundColor: l.pct === 100 ? C.accent : C.red, borderRadius:'3px' } }),
          ),
        )
      ),
    ),
    keyLearning('Wer heute handelt, spart ab Januar 2027 sofort Geld'),
    bfLogo(),
  ]);

  // ===================== SLIDE 8 — CTA =====================
  const slide8 = slide([
    badge('WARTE NICHT LÄNGER'),
    headline('FOLGE FÜR MEHR TIPPS ZUR RICHTIGEN ABSICHERUNG', 50),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'24px' } },
      h('div', { style: { display:'flex', width:'80px', height:'5px', backgroundColor: C.red, borderRadius:'3px' } }),
      h('span', { style: { fontSize:'34px', fontWeight:700, color: C.textSoft, lineHeight:'1.5', textAlign:'center', maxWidth:'860px' } },
        'Weißt du was du aktuell für deine KFZ-Versicherung zahlst? Schreib es in die Kommentare!'
      ),
      h('div', { style: { display:'flex', width:'80px', height:'5px', backgroundColor: C.accent, borderRadius:'3px' } }),
      h('div', { style: {
        display:'flex', flexDirection:'column', alignItems:'center', gap:'14px', marginTop:'16px',
        padding:'40px 60px', backgroundColor: C.bgDark, borderRadius:'24px', border:`1px solid ${C.border}`
      } },
        h('span', { style: { fontSize:'26px', fontWeight:600, color: C.textMuted, textAlign:'center', lineHeight:'1.5' } },
          'Kostenlose Erstberatung zu Versicherungen & Absicherung'
        ),
        h('span', { style: { fontSize:'28px', fontWeight:800, color: C.accent, textAlign:'center', letterSpacing:'1px' } }, '@benarofinanzen'),
      ),
    ),
    keyLearning('Speichern nicht vergessen — diese Checkliste brauchst du bis November!'),
    bfLogo(),
  ]);

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  const outDir = path.join(__dirname, 'output', 'carousel_2026-08-30', 'slides');

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width:W, height:H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i+1).padStart(2,'0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`✓ Slide ${i+1}/${slides.length} — ${path.basename(pngPath)}`);
  }
  console.log('\nAlle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
