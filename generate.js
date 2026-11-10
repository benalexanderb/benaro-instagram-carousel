const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default || require('satori');
  const { Resvg } = require('@resvg/resvg-js');

  const W = 1080, H = 1350;
  const TODAY = process.env.TODAY || '2026-11-10';
  const BASE = '/home/user/benaro-instagram-carousel';

  const fontDir = path.join(BASE, 'node_modules/@fontsource/outfit/files');
  const fonts = [400,500,600,700,800].flatMap(w => [
    { name:'Outfit', weight:w, style:'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-${w}-normal.woff`)) },
    { name:'Outfit', weight:w, style:'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-ext-${w}-normal.woff`)) },
  ]);

  const C = {
    bg:'#1B2D87',
    bgDark:'#12207A',
    bgDeep:'#0D1A60',
    text:'#FFFFFF',
    textSoft:'rgba(255,255,255,0.80)',
    textMuted:'rgba(255,255,255,0.50)',
    cardBg:'rgba(255,255,255,0.10)',
    cardBgLight:'rgba(255,255,255,0.18)',
    border:'rgba(255,255,255,0.15)',
    accent:'#5BC8F5',
    red:'#E63030',
    white:'#FFFFFF',
  };

  const h = (type, props, ...ch) => ({
    type, props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function badge(text) {
    return h('div', { style: { display:'flex', marginBottom:'16px' } },
      h('span', { style: { display:'flex', fontSize:'22px', fontWeight:700, letterSpacing:'3px',
        color: C.accent, backgroundColor: 'rgba(91,200,245,0.15)',
        padding:'10px 22px', borderRadius:'12px', textTransform:'uppercase' } }, text),
    );
  }

  function headline(text, size) {
    size = size || 64;
    return h('span', { style: { fontSize:`${size}px`, fontWeight:800,
      color: C.text, lineHeight:'1.05', letterSpacing:'-0.5px', marginBottom:'6px',
      textTransform:'uppercase' } }, text);
  }

  function subline(text) {
    return h('span', { style: { fontSize:'28px', fontWeight:500,
      color: C.textSoft, lineHeight:'1.5', marginTop:'8px' } }, text);
  }

  function keyLearning(text) {
    return h('div', { style: { display:'flex', alignItems:'center', gap:'14px',
      backgroundColor: 'rgba(255,255,255,0.08)',
      borderRadius:'16px', padding:'22px 28px', marginTop:'20px' } },
      h('div', { style: { display:'flex', width:'6px', minHeight:'40px',
        backgroundColor: C.red, borderRadius:'3px' } }),
      h('span', { style: { fontSize:'28px', fontWeight:600,
        color: C.text, lineHeight:'1.4' } }, text),
    );
  }

  function bfLogo() {
    return h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', marginTop:'20px' } },
      h('div', { style: { display:'flex', alignItems:'center', justifyContent:'center',
        width:'72px', height:'56px',
        border:'3px solid rgba(255,255,255,0.9)', borderRadius:'10px' } },
        h('span', { style: { fontSize:'28px', fontWeight:800, color:'#FFFFFF', letterSpacing:'2px' } }, 'BF'),
      ),
      h('span', { style: { fontSize:'14px', fontWeight:600, color:'rgba(255,255,255,0.7)',
        letterSpacing:'3px', textTransform:'uppercase' } }, 'BENARO FINANZEN'),
    );
  }

  // ─────────────────────────────────────────────────────────────
  // SLIDE 1 — Hook: Schockierende Stat über Kaufkraftverlust
  // ─────────────────────────────────────────────────────────────
  const slide1 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    badge('JETZT HANDELN'),
    headline('DEIN GEHALT REICHT NICHT MEHR', 62),
    subline('71 % der Deutschen können sich weniger leisten als 2023'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'18px' } },
      h('div', { style: { display:'flex', gap:'10px', marginBottom:'4px' } },
        h('div', { style: { display:'flex', width:'0', height:'0', borderLeft:'14px solid transparent', borderRight:'14px solid transparent', borderTop:`20px solid ${C.red}` } }),
        h('div', { style: { display:'flex', width:'0', height:'0', borderLeft:'14px solid transparent', borderRight:'14px solid transparent', borderTop:`20px solid ${C.red}` } }),
        h('div', { style: { display:'flex', width:'0', height:'0', borderLeft:'14px solid transparent', borderRight:'14px solid transparent', borderTop:`20px solid ${C.red}` } }),
      ),
      h('span', { style: { fontSize:'140px', fontWeight:800, color:C.accent, lineHeight:'1' } }, '71 %'),
      h('div', { style: { display:'flex', width:'180px', height:'5px', backgroundColor:C.red, borderRadius:'3px' } }),
      h('span', { style: { fontSize:'30px', fontWeight:600, color:C.text, lineHeight:'1.5', textAlign:'center', maxWidth:'820px', marginTop:'8px' } }, 'Kaufkraftverlust — das Gehalt bleibt gleich, die Kosten explodieren'),
      h('div', { style: { display:'flex', flexDirection:'column', gap:'12px', marginTop:'16px', width:'100%' } },
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px', backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'12px', padding:'14px 20px' } },
          h('div', { style: { display:'flex', width:'10px', height:'10px', borderRadius:'5px', backgroundColor:C.red } }),
          h('span', { style: { fontSize:'26px', fontWeight:500, color:C.textSoft } }, 'Miete: +18 % in 3 Jahren'),
        ),
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px', backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'12px', padding:'14px 20px' } },
          h('div', { style: { display:'flex', width:'10px', height:'10px', borderRadius:'5px', backgroundColor:C.red } }),
          h('span', { style: { fontSize:'26px', fontWeight:500, color:C.textSoft } }, 'Lebensmittel: +22 % seit 2023'),
        ),
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px', backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'12px', padding:'14px 20px' } },
          h('div', { style: { display:'flex', width:'10px', height:'10px', borderRadius:'5px', backgroundColor:C.red } }),
          h('span', { style: { fontSize:'26px', fontWeight:500, color:C.textSoft } }, 'Versicherungen: jährlich +6–12 %'),
        ),
      ),
    ),
    keyLearning('Doch die Lösung ist einfacher als du denkst'),
    bfLogo(),
  );

  // ─────────────────────────────────────────────────────────────
  // SLIDE 2 — Problem: Warum die meisten scheitern (Funnel)
  // ─────────────────────────────────────────────────────────────
  const funnelData = [
    { label:'Wollen ein Nebeneinkommen aufbauen', pct:100, val:'100 %', color:C.accent },
    { label:'Fangen tatsächlich an', pct:27, val:'27 %', color:'rgba(91,200,245,0.75)' },
    { label:'Bleiben länger als 3 Monate dabei', pct:12, val:'12 %', color:'rgba(91,200,245,0.45)' },
    { label:'Erreichen 500 € Nebeneinkommen/Monat', pct:4, val:'4 %', color:C.red },
  ];

  const slide2 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    badge('DIE REALITÄT'),
    headline('WARUM DIE MEISTEN SCHEITERN', 56),
    subline('Das Nebeneinkommen-Problem in Deutschland'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'24px' } },
      funnelData.map(item =>
        h('div', { style: { display:'flex', flexDirection:'column', gap:'10px' } },
          h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center' } },
            h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textSoft, maxWidth:'700px', lineHeight:'1.3' } }, item.label),
            h('span', { style: { fontSize:'32px', fontWeight:800, color:item.color } }, item.val),
          ),
          h('div', { style: { display:'flex', height:'18px', backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'9px', overflow:'hidden' } },
            h('div', { style: { display:'flex', width:`${item.pct}%`, height:'18px', backgroundColor:item.color, borderRadius:'9px' } }),
          ),
        )
      ),
    ),
    keyLearning('Das Problem ist nicht Talent — es ist die falsche Strategie'),
    bfLogo(),
  );

  // ─────────────────────────────────────────────────────────────
  // SLIDE 3 — Turning Point: 3 Typen von Nebeneinkommen
  // ─────────────────────────────────────────────────────────────
  const typData = [
    { num:'01', title:'ZEIT-BASIERT', desc:'Du tauschst Zeit gegen Geld. Einfachster Einstieg, aber nicht skalierbar.', example:'Freelancing, Nebenjob, Plattform-Jobs', color:'rgba(91,200,245,0.12)', border:C.accent },
    { num:'02', title:'FÄHIGKEITS-BASIERT', desc:'Du verkaufst dein Wissen einmal — und verdienst immer wieder daran.', example:'Digitale Produkte, Online-Kurse, Coaching', color:'rgba(230,48,48,0.12)', border:C.red },
    { num:'03', title:'KAPITAL-BASIERT', desc:'Dein Geld arbeitet für dich, auch während du schläfst.', example:'Dividenden, ETF-Erträge, Zinsen', color:'rgba(255,255,255,0.08)', border:'rgba(255,255,255,0.3)' },
  ];

  const slide3 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    badge('DIE LÖSUNG'),
    headline('3 TYPEN VON NEBENEINKOMMEN', 54),
    subline('Wähle den Typ, der zu deiner Situation passt'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      typData.map(item =>
        h('div', { style: { display:'flex', flexDirection:'column', gap:'10px', padding:'24px 28px',
          backgroundColor:item.color, borderRadius:'18px', border:`2px solid ${item.border}` } },
          h('div', { style: { display:'flex', alignItems:'center', gap:'16px' } },
            h('span', { style: { fontSize:'40px', fontWeight:800, color:C.accent, minWidth:'60px' } }, item.num),
            h('span', { style: { fontSize:'30px', fontWeight:800, color:C.text, textTransform:'uppercase' } }, item.title),
          ),
          h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textSoft, lineHeight:'1.4', marginLeft:'76px' } }, item.desc),
          h('span', { style: { fontSize:'22px', fontWeight:700, color:C.accent, marginLeft:'76px' } }, item.example),
        )
      ),
    ),
    keyLearning('Fang mit einem an — nicht mit allen drei gleichzeitig'),
    bfLogo(),
  );

  // ─────────────────────────────────────────────────────────────
  // SLIDE 4 — Methoden 1 & 2: Zeit-basiert (zwei Karten)
  // ─────────────────────────────────────────────────────────────
  const slide4 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    badge('TYP 1 — ZEIT-BASIERT'),
    headline('VERKAUFE DEINE ZEIT', 68),
    subline('Der schnellste Weg zum ersten Nebeneinkommen'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      h('div', { style: { display:'flex', gap:'20px' } },
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:C.bgDark, borderRadius:'20px', padding:'28px', gap:'14px', border:`1px solid ${C.border}` } },
          h('div', { style: { display:'flex', width:'52px', height:'52px', borderRadius:'14px', backgroundColor:'rgba(91,200,245,0.2)', alignItems:'center', justifyContent:'center' } },
            h('span', { style: { fontSize:'26px', fontWeight:800, color:C.accent } }, '01'),
          ),
          h('span', { style: { fontSize:'28px', fontWeight:800, color:C.white, textTransform:'uppercase' } }, 'FREELANCING'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textMuted, lineHeight:'1.4' } }, 'Schreiben, Grafik, Programmierung, Buchhaltung — auf Fiverr oder Upwork'),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'8px', marginTop:'8px' } },
            h('div', { style: { display:'flex', justifyContent:'space-between' } },
              h('span', { style: { fontSize:'21px', color:C.textMuted } }, 'Startzeit:'),
              h('span', { style: { fontSize:'21px', fontWeight:700, color:C.accent } }, '1–2 Wochen'),
            ),
            h('div', { style: { display:'flex', justifyContent:'space-between' } },
              h('span', { style: { fontSize:'21px', color:C.textMuted } }, 'Potenzial:'),
              h('span', { style: { fontSize:'21px', fontWeight:700, color:C.accent } }, '500–2.000 €/Monat'),
            ),
          ),
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:C.bgDark, borderRadius:'20px', padding:'28px', gap:'14px', border:`1px solid ${C.border}` } },
          h('div', { style: { display:'flex', width:'52px', height:'52px', borderRadius:'14px', backgroundColor:'rgba(91,200,245,0.2)', alignItems:'center', justifyContent:'center' } },
            h('span', { style: { fontSize:'26px', fontWeight:800, color:C.accent } }, '02'),
          ),
          h('span', { style: { fontSize:'28px', fontWeight:800, color:C.white, textTransform:'uppercase' } }, 'PLATTFORM-JOBS'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textMuted, lineHeight:'1.4' } }, 'Lieferdienste, Fahrdienste, Haushaltshilfe — sofort startklar, keine Vorkenntnisse'),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'8px', marginTop:'8px' } },
            h('div', { style: { display:'flex', justifyContent:'space-between' } },
              h('span', { style: { fontSize:'21px', color:C.textMuted } }, 'Startzeit:'),
              h('span', { style: { fontSize:'21px', fontWeight:700, color:C.accent } }, '1–3 Tage'),
            ),
            h('div', { style: { display:'flex', justifyContent:'space-between' } },
              h('span', { style: { fontSize:'21px', color:C.textMuted } }, 'Potenzial:'),
              h('span', { style: { fontSize:'21px', fontWeight:700, color:C.accent } }, '200–600 €/Monat'),
            ),
          ),
        ),
      ),
      h('div', { style: { display:'flex', alignItems:'center', gap:'10px', padding:'16px 24px', backgroundColor:'rgba(230,48,48,0.12)', borderRadius:'14px', border:`1px solid ${C.red}` } },
        h('div', { style: { display:'flex', width:'12px', height:'12px', borderRadius:'6px', backgroundColor:C.red } }),
        h('span', { style: { fontSize:'24px', fontWeight:600, color:C.red } }, 'Einschränkung: Zeit ist endlich — diese Methode skaliert nicht'),
      ),
    ),
    keyLearning('Gut für den Einstieg — aber kein langfristiger Plan'),
    bfLogo(),
  );

  // ─────────────────────────────────────────────────────────────
  // SLIDE 5 — Methoden 3 & 4: Fähigkeits-basiert
  // ─────────────────────────────────────────────────────────────
  const slide5 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    badge('TYP 2 — FÄHIGKEITS-BASIERT'),
    headline('VERKAUFE DEIN WISSEN', 64),
    subline('Einmal erstellt — immer wieder verdient'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      h('div', { style: { display:'flex', gap:'20px' } },
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:'rgba(91,200,245,0.10)', borderRadius:'20px', padding:'28px', gap:'14px', border:`2px solid ${C.accent}` } },
          h('div', { style: { display:'flex', width:'52px', height:'52px', borderRadius:'14px', backgroundColor:'rgba(91,200,245,0.2)', alignItems:'center', justifyContent:'center' } },
            h('span', { style: { fontSize:'26px', fontWeight:800, color:C.accent } }, '03'),
          ),
          h('span', { style: { fontSize:'28px', fontWeight:800, color:C.white, textTransform:'uppercase' } }, 'DIGITALE PRODUKTE'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textSoft, lineHeight:'1.4' } }, 'E-Books, Templates, Checklisten — auf Etsy, Gumroad oder eigener Website'),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'8px', marginTop:'8px' } },
            h('div', { style: { display:'flex', justifyContent:'space-between' } },
              h('span', { style: { fontSize:'21px', color:C.textMuted } }, 'Startzeit:'),
              h('span', { style: { fontSize:'21px', fontWeight:700, color:C.accent } }, '1–4 Wochen'),
            ),
            h('div', { style: { display:'flex', justifyContent:'space-between' } },
              h('span', { style: { fontSize:'21px', color:C.textMuted } }, 'Potenzial:'),
              h('span', { style: { fontSize:'21px', fontWeight:700, color:C.accent } }, '100–5.000 €/Monat'),
            ),
          ),
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:'rgba(91,200,245,0.10)', borderRadius:'20px', padding:'28px', gap:'14px', border:`2px solid ${C.accent}` } },
          h('div', { style: { display:'flex', width:'52px', height:'52px', borderRadius:'14px', backgroundColor:'rgba(91,200,245,0.2)', alignItems:'center', justifyContent:'center' } },
            h('span', { style: { fontSize:'26px', fontWeight:800, color:C.accent } }, '04'),
          ),
          h('span', { style: { fontSize:'28px', fontWeight:800, color:C.white, textTransform:'uppercase' } }, 'ONLINE-COACHING'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textSoft, lineHeight:'1.4' } }, 'Teile dein Fachwissen in 1-zu-1-Sessions oder Gruppen-Coachings'),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'8px', marginTop:'8px' } },
            h('div', { style: { display:'flex', justifyContent:'space-between' } },
              h('span', { style: { fontSize:'21px', color:C.textMuted } }, 'Startzeit:'),
              h('span', { style: { fontSize:'21px', fontWeight:700, color:C.accent } }, '2–6 Wochen'),
            ),
            h('div', { style: { display:'flex', justifyContent:'space-between' } },
              h('span', { style: { fontSize:'21px', color:C.textMuted } }, 'Potenzial:'),
              h('span', { style: { fontSize:'21px', fontWeight:700, color:C.accent } }, '500–8.000 €/Monat'),
            ),
          ),
        ),
      ),
      h('div', { style: { display:'flex', alignItems:'center', gap:'16px', padding:'20px 28px', backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'14px' } },
        h('span', { style: { fontSize:'40px', fontWeight:800, color:C.accent } }, '1x'),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' } },
          h('span', { style: { fontSize:'24px', fontWeight:700, color:C.text } }, 'Einmal erstellen — immer wieder verkaufen'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textSoft } }, 'Dein Hebeleffekt beginnt hier — und wächst im Schlaf'),
        ),
      ),
    ),
    keyLearning('Der beste Kompromiss aus Zeit und Skalierung'),
    bfLogo(),
  );

  // ─────────────────────────────────────────────────────────────
  // SLIDE 6 — Methode 5: Kapital-basiert (Dividenden-Wachstum)
  // ─────────────────────────────────────────────────────────────
  const depotData = [
    { depot:'5.000 € Depot', monat:'10–15 €/Monat', pct:15 },
    { depot:'10.000 € Depot', monat:'20–35 €/Monat', pct:30 },
    { depot:'25.000 € Depot', monat:'50–85 €/Monat', pct:55 },
    { depot:'50.000 € Depot', monat:'100–170 €/Monat', pct:75 },
    { depot:'100.000 € Depot', monat:'200–340 €/Monat', pct:100 },
  ];

  const slide6 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    badge('TYP 3 — KAPITAL-BASIERT'),
    headline('LASS DEIN GELD ARBEITEN', 60),
    subline('Das einzige Nebeneinkommen, das wirklich passiv ist'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' } },
      depotData.map(item =>
        h('div', { style: { display:'flex', flexDirection:'column', gap:'6px' } },
          h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center' } },
            h('span', { style: { fontSize:'22px', fontWeight:600, color:C.textSoft, minWidth:'200px' } }, item.depot),
            h('div', { style: { display:'flex', flex:'1', height:'10px', backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'5px', overflow:'hidden', margin:'0 16px' } },
              h('div', { style: { display:'flex', width:`${item.pct}%`, height:'10px', backgroundColor: item.pct === 100 ? C.accent : 'rgba(91,200,245,0.6)', borderRadius:'5px' } }),
            ),
            h('span', { style: { fontSize:'24px', fontWeight:800, color: item.pct === 100 ? C.accent : C.text, minWidth:'200px', textAlign:'right' } }, item.monat),
          ),
        )
      ),
      h('div', { style: { display:'flex', alignItems:'center', gap:'16px', padding:'20px 28px', backgroundColor:'rgba(91,200,245,0.10)', borderRadius:'14px', border:`1px solid ${C.accent}`, marginTop:'10px' } },
        h('div', { style: { display:'flex', flexDirection:'column', gap:'6px' } },
          h('span', { style: { fontSize:'24px', fontWeight:700, color:C.accent } }, 'Reinvestierung ist der Schlüssel'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textSoft, lineHeight:'1.4' } }, 'Wer Dividenden automatisch reinvestiert, profitiert vom Zinseszins — Verdopplung des Depots alle ~10 Jahre'),
        ),
      ),
    ),
    keyLearning('Ab 10.000 € Depot fließen monatlich 20–35 € ohne Aufwand'),
    bfLogo(),
  );

  // ─────────────────────────────────────────────────────────────
  // SLIDE 7 — Fahrplan: So startest du heute (3 Schritte)
  // ─────────────────────────────────────────────────────────────
  const schrittData = [
    { num:'01', text:'ENTSCHEIDE DICH FÜR EINEN TYP', desc:'Zeit-, Fähigkeits- oder Kapital-basiert — wähle einen, nicht alle drei gleichzeitig', pct:33 },
    { num:'02', text:'FANG HEUTE NOCH AN', desc:'Leg ein Profil an, schreib das erste E-Book, öffne ein Depot — Perfektion ist der Feind des Starts', pct:66 },
    { num:'03', text:'BLEIB 90 TAGE DABEI', desc:'Die meisten geben nach 3 Wochen auf — wer 90 Tage durchhält, baut ein echtes System auf', pct:100 },
  ];

  const slide7 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } },
    badge('DEIN FAHRPLAN'),
    headline('SO STARTEST DU HEUTE', 68),
    subline('3 Schritte für dein erstes Nebeneinkommen in 90 Tagen'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      schrittData.map(item =>
        h('div', { style: { display:'flex', flexDirection:'column', gap:'10px', padding:'24px 28px',
          backgroundColor: C.bgDark, borderRadius:'18px',
          border: item.pct === 100 ? `2px solid ${C.accent}` : `1px solid ${C.border}` } },
          h('div', { style: { display:'flex', alignItems:'center', gap:'18px' } },
            h('span', { style: { fontSize:'40px', fontWeight:800, color: item.pct === 100 ? C.accent : C.white, minWidth:'60px' } }, item.num),
            h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' } },
              h('span', { style: { fontSize:'26px', fontWeight:800, color:C.text, textTransform:'uppercase' } }, item.text),
              h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textSoft, lineHeight:'1.3' } }, item.desc),
            ),
          ),
          h('div', { style: { display:'flex', height:'6px', backgroundColor:C.border, borderRadius:'3px', overflow:'hidden' } },
            h('div', { style: { display:'flex', width:`${item.pct}%`, height:'6px',
              backgroundColor: item.pct === 100 ? C.accent : C.red, borderRadius:'3px' } }),
          ),
        )
      ),
    ),
    keyLearning('Wer heute startet, hat in 12 Monaten ein Nebeneinkommen'),
    bfLogo(),
  );

  // ─────────────────────────────────────────────────────────────
  // SLIDE 8 — CTA
  // ─────────────────────────────────────────────────────────────
  const slide8 = h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit', alignItems:'center' } },
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'28px' } },
      h('div', { style: { display:'flex', width:'80px', height:'5px', backgroundColor:C.red, borderRadius:'3px' } }),
      h('span', { style: { fontSize:'52px', fontWeight:800, color:C.white, textAlign:'center',
        lineHeight:'1.2', textTransform:'uppercase' } }, 'WELCHEN TYP STARTEST DU ZUERST?'),
      h('span', { style: { fontSize:'30px', fontWeight:500, color:C.textSoft, textAlign:'center', lineHeight:'1.5', maxWidth:'800px' } },
        'Schreib es in die Kommentare — wir helfen dir beim ersten Schritt'),
      h('div', { style: { display:'flex', width:'80px', height:'5px', backgroundColor:C.accent, borderRadius:'3px' } }),
      h('span', { style: { fontSize:'30px', fontWeight:600, color:C.text, textAlign:'center', lineHeight:'1.5' } },
        'Speichern nicht vergessen — du wirst diesen Post noch brauchen'),
      bfLogo(),
      h('span', { style: { fontSize:'24px', fontWeight:500, color:'rgba(255,255,255,0.40)' } }, '@benarofinanzen'),
    ),
  );

  // ─────────────────────────────────────────────────────────────
  // RENDER ALL SLIDES
  // ─────────────────────────────────────────────────────────────
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  const outDir = path.join(BASE, `output/carousel_${TODAY}/slides`);

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width:W, height:H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode:'width', value:W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i+1).padStart(2,'0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i+1}/${slides.length} done: ${pngPath}`);
  }
  console.log('All slides generated!');
}

main().catch(e => { console.error(e); process.exit(1); });
