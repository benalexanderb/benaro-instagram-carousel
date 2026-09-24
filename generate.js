const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default;
  const { Resvg } = require('@resvg/resvg-js');

  const BASE = __dirname;
  const fontDir = path.join(BASE, 'node_modules/@fontsource/outfit/files');

  const fonts = [400,500,600,700,800].flatMap(w => [
    { name:'Outfit', weight:w, style:'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-${w}-normal.woff`)) },
    { name:'Outfit', weight:w, style:'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-ext-${w}-normal.woff`)) },
  ]);

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    path.join(BASE, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')
  ).toString('base64');

  const TODAY = new Date().toISOString().split('T')[0];
  const outDir = path.join(BASE, `output/carousel_${TODAY}/slides`);
  fs.mkdirSync(outDir, { recursive: true });

  const C = {
    bg:       '#001F60',
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
    type,
    props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  // ===== REUSABLE COMPONENTS =====

  function header(badgeText) {
    return h('div', { style: { display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'20px' } },
      h('span', { style: { display:'flex', fontSize:'22px', fontWeight:700, letterSpacing:'3px', color:C.text, backgroundColor:C.cardBg, padding:'10px 22px', borderRadius:'12px' } }, badgeText),
      h('img', { src: logoB64, width:110, height:110, style:{ borderRadius:'12px', objectFit:'cover' } }),
    );
  }

  function headerNoLogo(badgeText) {
    return h('div', { style: { display:'flex', flexDirection:'row', marginBottom:'20px' } },
      h('span', { style: { display:'flex', fontSize:'22px', fontWeight:700, letterSpacing:'3px', color:C.text, backgroundColor:C.cardBg, padding:'10px 22px', borderRadius:'12px' } }, badgeText),
    );
  }

  function headline(text, size) {
    const sz = size || 64;
    return h('span', { style: { fontSize:`${sz}px`, fontWeight:800, color:C.text, lineHeight:'1.08', letterSpacing:'-1.5px', marginBottom:'6px' } }, text);
  }

  function subline(text) {
    return h('span', { style: { fontSize:'28px', fontWeight:500, color:C.textMuted, lineHeight:'1.5', marginTop:'8px' } }, text);
  }

  function keyLearning(text, accentColor) {
    const accent = accentColor || C.text;
    return h('div', { style: { display:'flex', alignItems:'center', gap:'14px', backgroundColor:C.cardBg, borderRadius:'16px', padding:'22px 28px', marginTop:'auto' } },
      h('div', { style: { display:'flex', width:'6px', minHeight:'40px', backgroundColor:accent, borderRadius:'3px' } }),
      h('span', { style: { fontSize:'28px', fontWeight:600, color:C.text, lineHeight:'1.4' } }, text),
    );
  }

  function igHandle() {
    return h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textMuted, marginTop:'12px' } }, '@benarofinanzen');
  }

  function slideRoot(...children) {
    return h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H, padding:'70px', backgroundColor:C.bg, fontFamily:'Outfit' } }, ...children);
  }

  // ===== SVG HELPERS (no <text> elements!) =====

  const arrowDownSvg = `<svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="0" x2="20" y2="34" stroke="rgba(255,255,255,0.3)" stroke-width="3"/>
    <polygon points="8,30 20,48 32,30" fill="rgba(255,255,255,0.3)"/>
  </svg>`;
  const arrowDownSrc = `data:image/svg+xml;base64,${Buffer.from(arrowDownSvg).toString('base64')}`;

  const arrowDownRedSvg = `<svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="0" x2="20" y2="34" stroke="rgba(239,68,68,0.55)" stroke-width="3"/>
    <polygon points="8,30 20,48 32,30" fill="rgba(239,68,68,0.55)"/>
  </svg>`;
  const arrowDownRedSrc = `data:image/svg+xml;base64,${Buffer.from(arrowDownRedSvg).toString('base64')}`;

  // ===== SLIDE 1: HOOK — Stat Hero =====
  const slide1 = slideRoot(
    header('DAS MUSST DU WISSEN'),
    headline('95 % haben ihr Geld falsch aufgestellt', 54),
    subline('Und verlieren damit echtes Geld — jedes Jahr'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'24px' } },
      h('div', { style: { display:'flex', flexDirection:'row', gap:'20px' } },
        // 95% Karte (rot)
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(239,68,68,0.12)', borderRadius:'24px', padding:'36px 24px', gap:'10px' } },
          h('span', { style: { fontSize:'96px', fontWeight:800, color:C.red, lineHeight:'1' } }, '95 %'),
          h('span', { style: { fontSize:'24px', fontWeight:600, color:'rgba(255,255,255,0.65)', textAlign:'center', lineHeight:'1.4' } }, 'ohne klares Geld-System'),
        ),
        // 5% Karte (grün)
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(16,185,129,0.12)', borderRadius:'24px', padding:'36px 24px', gap:'10px' } },
          h('span', { style: { fontSize:'96px', fontWeight:800, color:C.green, lineHeight:'1' } }, '5 %'),
          h('span', { style: { fontSize:'24px', fontWeight:600, color:'rgba(255,255,255,0.65)', textAlign:'center', lineHeight:'1.4' } }, 'mit klarer Strategie'),
        ),
      ),
      h('div', { style: { display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:C.cardBg, borderRadius:'16px', padding:'22px 28px' } },
        h('span', { style: { fontSize:'28px', fontWeight:700, color:C.text, textAlign:'center' } }, 'Das Geheimnis der 5 %: Das 3-Konto-Modell'),
      ),
    ),
    keyLearning('Nur 3 Konten trennen dich von echter finanzieller Kontrolle'),
    igHandle(),
  );

  // ===== SLIDE 2: DAS PROBLEM — Flow-Diagramm =====
  const slide2 = slideRoot(
    header('DAS PROBLEM'),
    headline('Alles auf einem Konto — das kostet dich bares Geld', 50),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'0px' } },
      // Box 1: Gehalt
      h('div', { style: { display:'flex', alignItems:'center', gap:'20px', backgroundColor:C.cardBg, borderRadius:'18px', padding:'24px 32px', width:'860px' } },
        h('div', { style: { display:'flex', width:'56px', height:'56px', borderRadius:'14px', backgroundColor:'rgba(255,255,255,0.15)', alignItems:'center', justifyContent:'center', flexShrink:0 } },
          h('span', { style: { fontSize:'20px', fontWeight:800, color:C.text } }, 'EUR'),
        ),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' } },
          h('span', { style: { fontSize:'30px', fontWeight:700, color:C.text } }, 'Gehalt kommt an'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textMuted } }, 'Kein Plan — alles landet auf einem Konto'),
        ),
      ),
      h('div', { style: { display:'flex', justifyContent:'center', padding:'2px 0' } },
        h('img', { src: arrowDownSrc, width:40, height:50, style:{ objectFit:'contain' } }),
      ),
      // Box 2: Girokonto
      h('div', { style: { display:'flex', alignItems:'center', gap:'20px', backgroundColor:C.cardBg, borderRadius:'18px', padding:'24px 32px', width:'860px' } },
        h('div', { style: { display:'flex', width:'56px', height:'56px', borderRadius:'14px', backgroundColor:'rgba(255,255,255,0.15)', alignItems:'center', justifyContent:'center', flexShrink:0 } },
          h('span', { style: { fontSize:'20px', fontWeight:800, color:C.text } }, 'GK'),
        ),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' } },
          h('span', { style: { fontSize:'30px', fontWeight:700, color:C.text } }, 'Alles auf dem Girokonto'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textMuted } }, '0 % Zinsen — 0 % Strategie'),
        ),
      ),
      h('div', { style: { display:'flex', justifyContent:'center', padding:'2px 0' } },
        h('img', { src: arrowDownRedSrc, width:40, height:50, style:{ objectFit:'contain' } }),
      ),
      // Box 3: Inflation (rot hervorgehoben)
      h('div', { style: { display:'flex', alignItems:'center', gap:'20px', backgroundColor:'rgba(239,68,68,0.12)', borderRadius:'18px', padding:'24px 32px', width:'860px' } },
        h('div', { style: { display:'flex', width:'56px', height:'56px', borderRadius:'14px', backgroundColor:'rgba(239,68,68,0.2)', alignItems:'center', justifyContent:'center', flexShrink:0 } },
          h('span', { style: { fontSize:'20px', fontWeight:800, color:C.red } }, '-2,5'),
        ),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' } },
          h('span', { style: { fontSize:'30px', fontWeight:700, color:C.red } }, 'Inflation frisst 2,5 % pro Jahr'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color:'rgba(239,68,68,0.7)' } }, 'Dein Geld verliert real an Wert'),
        ),
      ),
    ),
    keyLearning('In 10 Jahren verlierst du so bis zu 22 % deiner Kaufkraft', C.red),
    igHandle(),
  );

  // ===== SLIDE 3: DIE LÖSUNG — 3-Konto-Modell =====
  const slide3 = slideRoot(
    header('DIE LÖSUNG'),
    headline('Das 3-Konto-Modell', 72),
    subline('So nutzen es die 5 % — und so kannst du es auch'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'4px' } },
      // Konto 1
      h('div', { style: { display:'flex', flexDirection:'row', gap:'20px', alignItems:'center' } },
        h('div', { style: { display:'flex', width:'60px', height:'60px', borderRadius:'30px', backgroundColor:C.cardBg, alignItems:'center', justifyContent:'center', flexShrink:0 } },
          h('span', { style: { fontSize:'26px', fontWeight:800, color:C.text } }, '1'),
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:C.cardBg, borderRadius:'18px', padding:'22px 28px', gap:'6px' } },
          h('span', { style: { fontSize:'30px', fontWeight:800, color:C.text } }, 'Girokonto — Alltag'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textMuted } }, 'Miete, Lebensmittel, laufende Ausgaben'),
        ),
      ),
      // Verbinder
      h('div', { style: { display:'flex', flexDirection:'row', gap:'20px', alignItems:'center', paddingLeft:'28px' } },
        h('div', { style: { display:'flex', width:'4px', height:'36px', backgroundColor:C.border, borderRadius:'2px', marginLeft:'6px' } }),
      ),
      // Konto 2
      h('div', { style: { display:'flex', flexDirection:'row', gap:'20px', alignItems:'center' } },
        h('div', { style: { display:'flex', width:'60px', height:'60px', borderRadius:'30px', backgroundColor:C.cardBg, alignItems:'center', justifyContent:'center', flexShrink:0 } },
          h('span', { style: { fontSize:'26px', fontWeight:800, color:C.text } }, '2'),
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:C.cardBg, borderRadius:'18px', padding:'22px 28px', gap:'6px' } },
          h('span', { style: { fontSize:'30px', fontWeight:800, color:C.text } }, 'Tagesgeldkonto — Reserve'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color:C.textMuted } }, 'Notgroschen, bis zu 4,25 % Zinsen p.a.'),
        ),
      ),
      // Verbinder
      h('div', { style: { display:'flex', flexDirection:'row', gap:'20px', alignItems:'center', paddingLeft:'28px' } },
        h('div', { style: { display:'flex', width:'4px', height:'36px', backgroundColor:'rgba(16,185,129,0.4)', borderRadius:'2px', marginLeft:'6px' } }),
      ),
      // Konto 3 (grün hervorgehoben)
      h('div', { style: { display:'flex', flexDirection:'row', gap:'20px', alignItems:'center' } },
        h('div', { style: { display:'flex', width:'60px', height:'60px', borderRadius:'30px', backgroundColor:'rgba(16,185,129,0.2)', alignItems:'center', justifyContent:'center', flexShrink:0 } },
          h('span', { style: { fontSize:'26px', fontWeight:800, color:C.green } }, '3'),
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:'rgba(16,185,129,0.1)', borderRadius:'18px', padding:'22px 28px', gap:'6px' } },
          h('span', { style: { fontSize:'30px', fontWeight:800, color:C.green } }, 'ETF-Depot — Vermögensaufbau'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color:'rgba(16,185,129,0.7)' } }, 'Langfristig ca. 7 % p.a., ab 50 EUR/Monat'),
        ),
      ),
    ),
    keyLearning('Jedes Konto hat genau eine Aufgabe — kein Geld liegt ungenutzt'),
    igHandle(),
  );

  // ===== SLIDE 4: KONTO 1 — Girokonto (Grid Cards) =====
  const slide4 = slideRoot(
    header('KONTO 1 VON 3'),
    headline('Das Girokonto — nur für laufende Ausgaben', 52),
    subline('Hier fließt dein Geld durch — bleibt aber nicht stehen'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' } },
      h('div', { style: { display:'flex', flexDirection:'row', gap:'16px' } },
        // Miete
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:C.cardBg, borderRadius:'20px', padding:'28px', gap:'12px' } },
          h('div', { style: { display:'flex', width:'52px', height:'52px', borderRadius:'14px', backgroundColor:'rgba(255,255,255,0.15)', alignItems:'center', justifyContent:'center' } },
            h('span', { style: { fontSize:'22px', fontWeight:800, color:C.text } }, 'MI'),
          ),
          h('span', { style: { fontSize:'28px', fontWeight:700, color:C.text } }, 'Miete'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textMuted, lineHeight:'1.4' } }, 'Feste Kosten, monatlich'),
        ),
        // Lebensmittel
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:C.cardBg, borderRadius:'20px', padding:'28px', gap:'12px' } },
          h('div', { style: { display:'flex', width:'52px', height:'52px', borderRadius:'14px', backgroundColor:'rgba(255,255,255,0.15)', alignItems:'center', justifyContent:'center' } },
            h('span', { style: { fontSize:'22px', fontWeight:800, color:C.text } }, 'LM'),
          ),
          h('span', { style: { fontSize:'28px', fontWeight:700, color:C.text } }, 'Lebensmittel'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textMuted, lineHeight:'1.4' } }, 'Alltag, Supermarkt'),
        ),
      ),
      h('div', { style: { display:'flex', flexDirection:'row', gap:'16px' } },
        // Freizeit
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:C.cardBg, borderRadius:'20px', padding:'28px', gap:'12px' } },
          h('div', { style: { display:'flex', width:'52px', height:'52px', borderRadius:'14px', backgroundColor:'rgba(255,255,255,0.15)', alignItems:'center', justifyContent:'center' } },
            h('span', { style: { fontSize:'22px', fontWeight:800, color:C.text } }, 'FZ'),
          ),
          h('span', { style: { fontSize:'28px', fontWeight:700, color:C.text } }, 'Freizeit'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textMuted, lineHeight:'1.4' } }, 'Restaurant, Hobby, Sonstiges'),
        ),
        // Vorsorge (grün hervorgehoben)
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:'rgba(16,185,129,0.1)', borderRadius:'20px', padding:'28px', gap:'12px' } },
          h('div', { style: { display:'flex', width:'52px', height:'52px', borderRadius:'14px', backgroundColor:'rgba(16,185,129,0.2)', alignItems:'center', justifyContent:'center' } },
            h('span', { style: { fontSize:'22px', fontWeight:800, color:C.green } }, 'SP'),
          ),
          h('span', { style: { fontSize:'28px', fontWeight:700, color:C.green } }, 'Sparen'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color:'rgba(16,185,129,0.7)', lineHeight:'1.4' } }, 'Auto-Überweisung ans Depot'),
        ),
      ),
    ),
    keyLearning('Goldene Regel: Max. 1-2 Monatsgehälter auf dem Girokonto'),
    igHandle(),
  );

  // ===== SLIDE 5: KONTO 2 UND 3 — Contrast Cards =====
  const slide5 = slideRoot(
    header('KONTO 2 UND 3'),
    headline('Tagesgeld und ETF-Depot', 62),
    subline('Das Duo für Sicherheit und Wachstum'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'row', gap:'20px', alignItems:'stretch' } },
      // Tagesgeld (links)
      h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:C.cardBg, borderRadius:'24px', padding:'36px', gap:'18px' } },
        h('span', { style: { fontSize:'20px', fontWeight:700, letterSpacing:'2px', color:C.textMuted } }, 'TAGESGELD'),
        h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:C.border, borderRadius:'2px' } }),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'14px', flex:'1' } },
          h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' } },
            h('span', { style: { fontSize:'44px', fontWeight:800, color:C.text, lineHeight:'1' } }, '4,25 %'),
            h('span', { style: { fontSize:'22px', fontWeight:500, color:C.textMuted } }, 'Zinsen pro Jahr'),
          ),
          h('span', { style: { fontSize:'24px', fontWeight:600, color:C.textSoft, lineHeight:'1.4' } }, 'Notgroschen: 3x Fixkosten'),
          h('span', { style: { fontSize:'24px', fontWeight:600, color:C.textSoft, lineHeight:'1.4' } }, 'Täglich verfügbar'),
          h('span', { style: { fontSize:'24px', fontWeight:600, color:C.textSoft, lineHeight:'1.4' } }, 'Kein Verlustrisiko'),
        ),
        h('div', { style: { display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'12px', padding:'14px' } },
          h('span', { style: { fontSize:'22px', fontWeight:700, color:C.text } }, 'Sicherheitsnetz'),
        ),
      ),
      // ETF-Depot (rechts)
      h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:'rgba(16,185,129,0.12)', borderRadius:'24px', padding:'36px', gap:'18px' } },
        h('span', { style: { fontSize:'20px', fontWeight:700, letterSpacing:'2px', color:C.green } }, 'ETF-DEPOT'),
        h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(16,185,129,0.35)', borderRadius:'2px' } }),
        h('div', { style: { display:'flex', flexDirection:'column', gap:'14px', flex:'1' } },
          h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' } },
            h('span', { style: { fontSize:'44px', fontWeight:800, color:C.green, lineHeight:'1' } }, 'ca. 7 %'),
            h('span', { style: { fontSize:'22px', fontWeight:500, color:'rgba(16,185,129,0.7)' } }, 'Rendite pro Jahr'),
          ),
          h('span', { style: { fontSize:'24px', fontWeight:600, color:C.textSoft, lineHeight:'1.4' } }, 'Ab 50 EUR/Monat starten'),
          h('span', { style: { fontSize:'24px', fontWeight:600, color:C.textSoft, lineHeight:'1.4' } }, 'Langfristig 10-30 Jahre'),
          h('span', { style: { fontSize:'24px', fontWeight:600, color:C.textSoft, lineHeight:'1.4' } }, 'Vollautomatisch sparplan'),
        ),
        h('div', { style: { display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(16,185,129,0.15)', borderRadius:'12px', padding:'14px' } },
          h('span', { style: { fontSize:'22px', fontWeight:700, color:C.green } }, 'Vermögensaufbau'),
        ),
      ),
    ),
    keyLearning('Tagesgeld = Sicherheit, ETF-Depot = Wachstum — beides brauchst du'),
    igHandle(),
  );

  // ===== SLIDE 6: DEIN PLAN — 3 Schritte (Learning Cards) =====
  const learnings = [
    { num:'01', text:'Girokonto prüfen — Max. 2 Monatsgehälter drauf, Rest weg', pct:33 },
    { num:'02', text:'Tagesgeldkonto eröffnen — Notgroschen von 3x Fixkosten aufbauen', pct:66 },
    { num:'03', text:'ETF-Sparplan einrichten — Ab 50 EUR monatlich automatisch investieren', pct:100 },
  ];

  const slide6 = slideRoot(
    header('DEIN PLAN'),
    headline('So startest du noch diese Woche', 58),
    subline('3 Schritte — 30 Minuten — echte Wirkung'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      ...learnings.map(l =>
        h('div', { style: { display:'flex', flexDirection:'column', gap:'12px', padding:'24px 28px', backgroundColor:C.cardBg, borderRadius:'18px' } },
          h('div', { style: { display:'flex', alignItems:'center', gap:'18px' } },
            h('span', { style: { fontSize:'36px', fontWeight:800, color: l.pct === 100 ? C.green : C.text, minWidth:'56px' } }, l.num),
            h('span', { style: { fontSize:'25px', fontWeight:600, color:C.text, lineHeight:'1.3', flex:'1' } }, l.text),
          ),
          h('div', { style: { display:'flex', height:'6px', backgroundColor:C.border, borderRadius:'3px' } },
            h('div', { style: { display:'flex', width:`${l.pct}%`, height:'6px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius:'3px' } }),
          ),
        )
      ),
    ),
    keyLearning('In 3 Schritten zum vollständigen Geld-System'),
    igHandle(),
  );

  // ===== SLIDE 7: CTA =====
  const slide7 = slideRoot(
    headerNoLogo('DEINE FRAGE'),
    headline('Nutzt du schon das 3-Konto-Modell?', 56),
    subline('Schreib es uns in die Kommentare'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'32px' } },
      h('img', { src: logoB64, width:160, height:160, style:{ borderRadius:'24px', objectFit:'cover' } }),
      h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' } },
        h('span', { style: { fontSize:'32px', fontWeight:700, color:C.text, textAlign:'center', lineHeight:'1.4' } }, 'Folge @benarofinanzen'),
        h('span', { style: { fontSize:'26px', fontWeight:500, color:C.textMuted, textAlign:'center' } }, 'für dein tägliches Finanz-Update'),
      ),
      h('div', { style: { display:'flex', flexDirection:'column', gap:'12px', width:'800px' } },
        h('div', { style: { display:'flex', alignItems:'center', gap:'14px', backgroundColor:C.cardBg, borderRadius:'14px', padding:'18px 24px' } },
          h('div', { style: { display:'flex', width:'10px', height:'10px', borderRadius:'5px', backgroundColor:C.green } }),
          h('span', { style: { fontSize:'26px', fontWeight:600, color:C.text } }, 'Speichern nicht vergessen'),
        ),
        h('div', { style: { display:'flex', alignItems:'center', gap:'14px', backgroundColor:C.cardBg, borderRadius:'14px', padding:'18px 24px' } },
          h('div', { style: { display:'flex', width:'10px', height:'10px', borderRadius:'5px', backgroundColor:C.green } }),
          h('span', { style: { fontSize:'26px', fontWeight:600, color:C.text } }, 'Teilen mit jemandem der das wissen sollte'),
        ),
      ),
    ),
    keyLearning('Kostenlose Erstberatung: Link in der Bio'),
    igHandle(),
  );

  // ===== RENDER ALL SLIDES =====
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i+1).padStart(2,'0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i+1}/${slides.length} generiert`);
  }

  console.log(`\nAlle ${slides.length} Slides erfolgreich generiert!`);
  console.log(`Ausgabeverzeichnis: ${outDir}`);
}

main().catch(e => { console.error(e); process.exit(1); });
