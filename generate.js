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
    bg:'#001f60',
    bgDark:'#001542',
    text:'#FFFFFF',
    textSoft:'#E5E7EB',
    textMuted:'#9CA3AF',
    cardBg:'rgba(255,255,255,0.1)',
    border:'rgba(255,255,255,0.2)',
    green:'#10B981',
    red:'#EF4444',
  };

  const W = 1080, H = 1350;

  const h = (type, props, ...ch) => ({
    type, props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')).toString('base64');

  function badge(text) {
    return h('div', { style: { display:'flex', marginBottom:'16px' } },
      h('span', { style: { display:'flex', fontSize:'22px', fontWeight:700, letterSpacing:'3px',
        color: C.text, backgroundColor: C.cardBg, padding:'10px 22px', borderRadius:'12px' } }, text)
    );
  }

  function headline(text, size=64) {
    return h('span', { style: { fontSize:`${size}px`, fontWeight:800,
      color: C.text, lineHeight:'1.08', letterSpacing:'-1.5px', marginBottom:'6px' } }, text);
  }

  function subline(text) {
    return h('span', { style: { fontSize:'28px', fontWeight:500,
      color: C.textMuted, lineHeight:'1.5', marginTop:'8px' } }, text);
  }

  function keyLearning(text, accent) {
    return h('div', { style: { display:'flex', alignItems:'center', gap:'14px',
      backgroundColor: C.cardBg, borderRadius:'16px', padding:'22px 28px', marginTop:'16px' } },
      h('div', { style: { display:'flex', width:'6px', minHeight:'40px',
        backgroundColor: accent || C.text, borderRadius:'3px' } }),
      h('span', { style: { fontSize:'28px', fontWeight:600, color: C.text, lineHeight:'1.4' } }, text)
    );
  }

  function logo() {
    return h('img', { src: logoB64, width:100, height:100,
      style: { borderRadius:'12px', objectFit:'cover', position:'absolute', top:'60px', right:'60px' } });
  }

  function igHandle() {
    return h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted, marginTop:'10px' } }, '@benarofinanzen');
  }

  function slideWrapper(bg, children) {
    return h('div', { style: { display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor: bg || C.bg, fontFamily:'Outfit', position:'relative' } },
      logo(),
      ...children
    );
  }

  // ===== SLIDE 1: HOOK =====
  const slide1 = slideWrapper(C.bg, [
    badge('DAS MUSST DU WISSEN'),
    headline('90 % budgetieren falsch—\ndieser Fehler kostet dich\nTausende', 58),
    subline('Das einfachste Haushaltsbuch der Welt'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      // Visual: 3 simple budget blocks
      h('div', { style: { display:'flex', flexDirection:'column', gap:'16px', marginTop:'16px' } },
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px' } },
          h('div', { style: { display:'flex', width:'220px', height:'56px', backgroundColor:'rgba(255,255,255,0.15)', borderRadius:'12px', alignItems:'center', justifyContent:'center' } },
            h('span', { style: { fontSize:'28px', fontWeight:800, color: C.text } }, '50 %')
          ),
          h('span', { style: { fontSize:'28px', fontWeight:600, color: C.textSoft } }, 'Notwendiges')
        ),
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px' } },
          h('div', { style: { display:'flex', width:'140px', height:'56px', backgroundColor:'rgba(255,255,255,0.15)', borderRadius:'12px', alignItems:'center', justifyContent:'center' } },
            h('span', { style: { fontSize:'28px', fontWeight:800, color: C.text } }, '30 %')
          ),
          h('span', { style: { fontSize:'28px', fontWeight:600, color: C.textSoft } }, 'Wünsche')
        ),
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px' } },
          h('div', { style: { display:'flex', width:'90px', height:'56px', backgroundColor: C.green, borderRadius:'12px', alignItems:'center', justifyContent:'center' } },
            h('span', { style: { fontSize:'28px', fontWeight:800, color: '#FFFFFF' } }, '20 %')
          ),
          h('span', { style: { fontSize:'28px', fontWeight:600, color: C.green } }, 'Sparen & Investieren')
        ),
        h('div', { style: { display:'flex', marginTop:'8px' } },
          h('span', { style: { fontSize:'26px', fontWeight:500, color:'rgba(255,255,255,0.4)', letterSpacing:'1px' } }, 'DIE 50/30/20-REGEL')
        )
      )
    ),
    keyLearning('Wer diese Formel kennt, braucht kein kompliziertes Haushaltsbuch mehr.')
  ]);

  // ===== SLIDE 2: PROBLEM =====
  const slide2 = slideWrapper(C.bgDark, [
    badge('DAS PROBLEM'),
    headline('Millionen Deutsche\nwissen nicht, wohin\nihr Geld fließt', 62),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'24px' } },
      // Stat Hero
      h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'12px',
        backgroundColor: C.cardBg, borderRadius:'24px', padding:'40px 32px' } },
        h('span', { style: { fontSize:'120px', fontWeight:800, color: C.red, lineHeight:'1', letterSpacing:'-4px' } }, '68 %'),
        h('span', { style: { fontSize:'30px', fontWeight:600, color: C.textSoft, textAlign:'center', lineHeight:'1.4' } }, 'der Deutschen haben\nkein monatliches Budget')
      ),
      h('div', { style: { display:'flex', gap:'14px' } },
        h('div', { style: { display:'flex', flex:'1', backgroundColor:'rgba(239,68,68,0.1)', borderRadius:'16px', padding:'20px', alignItems:'center', gap:'12px' } },
          h('div', { style: { display:'flex', width:'12px', height:'12px', borderRadius:'6px', backgroundColor: C.red } }),
          h('span', { style: { fontSize:'24px', fontWeight:600, color: C.textSoft, lineHeight:'1.35' } }, 'Kein Überblick über Ausgaben')
        ),
        h('div', { style: { display:'flex', flex:'1', backgroundColor:'rgba(239,68,68,0.1)', borderRadius:'16px', padding:'20px', alignItems:'center', gap:'12px' } },
          h('div', { style: { display:'flex', width:'12px', height:'12px', borderRadius:'6px', backgroundColor: C.red } }),
          h('span', { style: { fontSize:'24px', fontWeight:600, color: C.textSoft, lineHeight:'1.35' } }, 'Geld wird immer knapp')
        )
      )
    ),
    keyLearning('Ohne Struktur läuft das Geld einfach durch die Finger.', C.red),
    igHandle()
  ]);

  // ===== SLIDE 3: DIE METHODE =====
  const slide3 = slideWrapper(C.bg, [
    badge('DIE LÖSUNG'),
    headline('Die 50/30/20-Regel\nin 10 Sekunden', 66),
    subline('Ein Einkommen — drei klare Töpfe'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' } },
      // Horizontal bar chart
      h('div', { style: { display:'flex', flexDirection:'column', gap:'18px' } },
        // 50% bar
        h('div', { style: { display:'flex', flexDirection:'column', gap:'8px' } },
          h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center' } },
            h('span', { style: { fontSize:'28px', fontWeight:700, color: C.text } }, 'NOTWENDIGES'),
            h('span', { style: { fontSize:'36px', fontWeight:800, color: C.text } }, '50 %')
          ),
          h('div', { style: { display:'flex', height:'28px', backgroundColor:'rgba(255,255,255,0.1)', borderRadius:'8px', overflow:'hidden' } },
            h('div', { style: { display:'flex', width:'50%', height:'28px', backgroundColor:'rgba(255,255,255,0.7)', borderRadius:'8px' } })
          ),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted } }, 'Miete, Lebensmittel, Versicherungen, Transport')
        ),
        // 30% bar
        h('div', { style: { display:'flex', flexDirection:'column', gap:'8px' } },
          h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center' } },
            h('span', { style: { fontSize:'28px', fontWeight:700, color: C.text } }, 'WÜNSCHE'),
            h('span', { style: { fontSize:'36px', fontWeight:800, color: C.text } }, '30 %')
          ),
          h('div', { style: { display:'flex', height:'28px', backgroundColor:'rgba(255,255,255,0.1)', borderRadius:'8px', overflow:'hidden' } },
            h('div', { style: { display:'flex', width:'30%', height:'28px', backgroundColor:'rgba(255,255,255,0.5)', borderRadius:'8px' } })
          ),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted } }, 'Freizeit, Urlaub, Restaurants, Shopping')
        ),
        // 20% bar
        h('div', { style: { display:'flex', flexDirection:'column', gap:'8px' } },
          h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center' } },
            h('span', { style: { fontSize:'28px', fontWeight:700, color: C.green } }, 'SPAREN & INVESTIEREN'),
            h('span', { style: { fontSize:'36px', fontWeight:800, color: C.green } }, '20 %')
          ),
          h('div', { style: { display:'flex', height:'28px', backgroundColor:'rgba(16,185,129,0.2)', borderRadius:'8px', overflow:'hidden' } },
            h('div', { style: { display:'flex', width:'20%', height:'28px', backgroundColor: C.green, borderRadius:'8px' } })
          ),
          h('span', { style: { fontSize:'22px', fontWeight:500, color:'rgba(16,185,129,0.7)' } }, 'ETF-Sparplan, Notgroschen, Rücklage')
        )
      )
    ),
    keyLearning('Drei Kategorien reichen — mehr braucht kein Mensch.')
  ]);

  // ===== SLIDE 4: 50% ERKLÄRT =====
  const slide4 = slideWrapper(C.bgDark, [
    badge('SCHRITT 1 — 50 %'),
    headline('Notwendiges:\nWas du wirklich\nBRAUCHST', 64),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'14px' } },
      h('div', { style: { display:'flex', gap:'14px' } },
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor: C.cardBg, borderRadius:'20px', padding:'28px', gap:'10px' } },
          h('span', { style: { fontSize:'40px', fontWeight:800, color: C.text } }, '🏠'),
          h('span', { style: { fontSize:'26px', fontWeight:700, color: C.text } }, 'Miete & Nebenkosten'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted } }, 'Grösster Fixkosten-Posten')
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor: C.cardBg, borderRadius:'20px', padding:'28px', gap:'10px' } },
          h('span', { style: { fontSize:'40px', fontWeight:800, color: C.text } }, '🛒'),
          h('span', { style: { fontSize:'26px', fontWeight:700, color: C.text } }, 'Lebensmittel'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted } }, 'Grundbedarf täglich')
        )
      ),
      h('div', { style: { display:'flex', gap:'14px' } },
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor: C.cardBg, borderRadius:'20px', padding:'28px', gap:'10px' } },
          h('span', { style: { fontSize:'40px', fontWeight:800, color: C.text } }, '🚗'),
          h('span', { style: { fontSize:'26px', fontWeight:700, color: C.text } }, 'Transport'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted } }, 'Auto, ÖPNV, Benzin')
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor: C.cardBg, borderRadius:'20px', padding:'28px', gap:'10px' } },
          h('span', { style: { fontSize:'40px', fontWeight:800, color: C.text } }, '🛡'),
          h('span', { style: { fontSize:'26px', fontWeight:700, color: C.text } }, 'Versicherungen'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted } }, 'KFZ, Haftpflicht, BU')
        )
      ),
      h('div', { style: { display:'flex', alignItems:'center', gap:'12px', backgroundColor:'rgba(239,68,68,0.08)', borderRadius:'14px', padding:'16px 22px' } },
        h('div', { style: { display:'flex', width:'10px', height:'10px', borderRadius:'5px', backgroundColor: C.red } }),
        h('span', { style: { fontSize:'24px', fontWeight:600, color: C.red } }, 'Fixkosten über 50 %? Dann ist deine Miete zu hoch oder du hast Schulden.')
      )
    ),
    keyLearning('50 % ist die Obergrenze — wer darunter bleibt, hat mehr Spielraum.'),
    igHandle()
  ]);

  // ===== SLIDE 5: 30% + 20% ERKLÄRT =====
  const slide5 = slideWrapper(C.bg, [
    badge('SCHRITT 2 & 3'),
    headline('Wünsche + Sparen:\nDas lebst du\nbewusst', 62),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' } },
      h('div', { style: { display:'flex', gap:'14px' } },
        // 30%: Wünsche
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor: C.cardBg, borderRadius:'20px', padding:'28px', gap:'12px' } },
          h('div', { style: { display:'flex', alignItems:'center', gap:'10px', marginBottom:'4px' } },
            h('span', { style: { fontSize:'44px', fontWeight:800, color: C.text, lineHeight:'1' } }, '30 %'),
          ),
          h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color: C.textMuted } }, 'WÜNSCHE'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor: C.border, borderRadius:'2px' } }),
          h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textSoft, lineHeight:'1.5' } }, 'Restaurants, Kino, Urlaub, Mode, Abos'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted, lineHeight:'1.4' } }, 'Alles was das Leben\nschöner macht — aber kein Muss')
        ),
        // 20%: Sparen
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', backgroundColor:'rgba(16,185,129,0.12)', borderRadius:'20px', padding:'28px', gap:'12px', border:'2px solid rgba(16,185,129,0.3)' } },
          h('div', { style: { display:'flex', alignItems:'center', gap:'10px', marginBottom:'4px' } },
            h('span', { style: { fontSize:'44px', fontWeight:800, color: C.green, lineHeight:'1' } }, '20 %'),
          ),
          h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color:'rgba(16,185,129,0.7)' } }, 'SPAREN'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(16,185,129,0.3)', borderRadius:'2px' } }),
          h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textSoft, lineHeight:'1.5' } }, 'ETF-Sparplan, Notgroschen, Tilgung'),
          h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted, lineHeight:'1.4' } }, 'Dein zukünftiges Ich\ndankt es dir')
        )
      ),
      h('div', { style: { display:'flex', backgroundColor: C.cardBg, borderRadius:'16px', padding:'22px 28px', gap:'16px', alignItems:'center' } },
        h('span', { style: { fontSize:'26px', fontWeight:600, color: C.text, lineHeight:'1.4' } }, 'Tipp: Den 20-%-Betrag per Dauerauftrag am 1. des Monats automatisch abbuchen lassen.')
      )
    ),
    keyLearning('Erst sparen, dann ausgeben — nicht andersrum.')
  ]);

  // ===== SLIDE 6: BEISPIELRECHNUNG =====
  const slide6 = slideWrapper(C.bgDark, [
    badge('BEISPIELRECHNUNG'),
    headline('Was 3.000 € Netto\nin der Praxis\nbedeutet', 62),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'14px' } },
      h('div', { style: { display:'flex', flexDirection:'column', gap:'12px' } },
        // 50%
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px', backgroundColor: C.cardBg, borderRadius:'16px', padding:'20px 28px' } },
          h('div', { style: { display:'flex', width:'80px', alignItems:'center', justifyContent:'center' } },
            h('span', { style: { fontSize:'32px', fontWeight:800, color: C.text } }, '50 %')
          ),
          h('div', { style: { display:'flex', flex:'1', flexDirection:'column', gap:'4px' } },
            h('span', { style: { fontSize:'26px', fontWeight:700, color: C.text } }, 'Notwendiges'),
            h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted } }, 'Miete, Essen, Versicherungen, Transport')
          ),
          h('span', { style: { fontSize:'36px', fontWeight:800, color: C.text } }, '1.500 €')
        ),
        // 30%
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px', backgroundColor: C.cardBg, borderRadius:'16px', padding:'20px 28px' } },
          h('div', { style: { display:'flex', width:'80px', alignItems:'center', justifyContent:'center' } },
            h('span', { style: { fontSize:'32px', fontWeight:800, color: C.text } }, '30 %')
          ),
          h('div', { style: { display:'flex', flex:'1', flexDirection:'column', gap:'4px' } },
            h('span', { style: { fontSize:'26px', fontWeight:700, color: C.text } }, 'Wünsche'),
            h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted } }, 'Freizeit, Urlaub, Restaurants, Mode')
          ),
          h('span', { style: { fontSize:'36px', fontWeight:800, color: C.text } }, '900 €')
        ),
        // 20% green
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px', backgroundColor:'rgba(16,185,129,0.12)', borderRadius:'16px', padding:'20px 28px', border:'1px solid rgba(16,185,129,0.3)' } },
          h('div', { style: { display:'flex', width:'80px', alignItems:'center', justifyContent:'center' } },
            h('span', { style: { fontSize:'32px', fontWeight:800, color: C.green } }, '20 %')
          ),
          h('div', { style: { display:'flex', flex:'1', flexDirection:'column', gap:'4px' } },
            h('span', { style: { fontSize:'26px', fontWeight:700, color: C.green } }, 'Sparen & Investieren'),
            h('span', { style: { fontSize:'22px', fontWeight:500, color:'rgba(16,185,129,0.7)' } }, 'ETF-Sparplan, Notgroschen, Rücklage')
          ),
          h('span', { style: { fontSize:'36px', fontWeight:800, color: C.green } }, '600 €')
        ),
        // Total
        h('div', { style: { display:'flex', justifyContent:'flex-end', alignItems:'center', gap:'16px', paddingRight:'4px' } },
          h('div', { style: { display:'flex', height:'2px', flex:'1', backgroundColor: C.border, borderRadius:'1px' } }),
          h('span', { style: { fontSize:'26px', fontWeight:700, color: C.textMuted } }, 'Gesamt:'),
          h('span', { style: { fontSize:'36px', fontWeight:800, color: C.text } }, '3.000 €')
        )
      )
    ),
    keyLearning('600 € pro Monat angelegt = über 100.000 € in 10 Jahren bei 7 % p.a.'),
    igHandle()
  ]);

  // ===== SLIDE 7: LEARNINGS =====
  const learnings = [
    { num:'01', text:'Kein Haushaltsbuch nötig — nur 3 Töpfe', pct:25 },
    { num:'02', text:'Fixkosten über 50 % = erstes Warnsignal', pct:50 },
    { num:'03', text:'20 % Sparen per Dauerauftrag automatisieren', pct:75 },
    { num:'04', text:'Weniger über Geld nachdenken, mehr aufbauen', pct:100 },
  ];

  const slide7 = slideWrapper(C.bg, [
    badge('DEINE 4 LEARNINGS'),
    headline('Was du jetzt\nweißt — und wie du\nstartest', 60),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'12px' } },
      ...learnings.map(l =>
        h('div', { style: { display:'flex', flexDirection:'column', gap:'10px', padding:'20px 24px', backgroundColor: C.cardBg, borderRadius:'18px' } },
          h('div', { style: { display:'flex', alignItems:'center', gap:'18px' } },
            h('span', { style: { fontSize:'36px', fontWeight:800, color: l.pct === 100 ? C.green : C.text, minWidth:'56px' } }, l.num),
            h('span', { style: { fontSize:'26px', fontWeight:600, color: C.text, lineHeight:'1.3', flex:'1' } }, l.text)
          ),
          h('div', { style: { display:'flex', height:'5px', backgroundColor: C.border, borderRadius:'3px', overflow:'hidden' } },
            h('div', { style: { display:'flex', width:`${l.pct}%`, height:'5px', backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius:'3px' } })
          )
        )
      )
    ),
    keyLearning('Fang heute an — wer wartet, verliert jeden Monat bares Geld.')
  ]);

  // ===== SLIDE 8: CTA =====
  const slide8 = slideWrapper(C.bgDark, [
    badge('JETZT DU'),
    headline('Welche Kategorie\nsprengt bei dir\nden Rahmen?', 64),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'24px' } },
      h('div', { style: { display:'flex', flexDirection:'column', gap:'14px' } },
        h('div', { style: { display:'flex', alignItems:'center', gap:'14px', backgroundColor: C.cardBg, borderRadius:'16px', padding:'22px 28px' } },
          h('span', { style: { fontSize:'32px', fontWeight:800, color: C.text, minWidth:'48px' } }, 'A'),
          h('span', { style: { fontSize:'26px', fontWeight:600, color: C.textSoft } }, 'Notwendiges (Miete zu hoch?)')
        ),
        h('div', { style: { display:'flex', alignItems:'center', gap:'14px', backgroundColor: C.cardBg, borderRadius:'16px', padding:'22px 28px' } },
          h('span', { style: { fontSize:'32px', fontWeight:800, color: C.text, minWidth:'48px' } }, 'B'),
          h('span', { style: { fontSize:'26px', fontWeight:600, color: C.textSoft } }, 'Wünsche (zu viel Freizeit?)')
        ),
        h('div', { style: { display:'flex', alignItems:'center', gap:'14px', backgroundColor: C.cardBg, borderRadius:'16px', padding:'22px 28px' } },
          h('span', { style: { fontSize:'32px', fontWeight:800, color: C.text, minWidth:'48px' } }, 'C'),
          h('span', { style: { fontSize:'26px', fontWeight:600, color: C.textSoft } }, 'Ich spare gar nichts')
        )
      ),
      h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', padding:'24px', backgroundColor:'rgba(16,185,129,0.1)', borderRadius:'20px', border:'1px solid rgba(16,185,129,0.25)' } },
        h('span', { style: { fontSize:'28px', fontWeight:700, color: C.text, textAlign:'center', lineHeight:'1.4' } }, 'Folge @benarofinanzen für mehr Finanztipps'),
        h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted, textAlign:'center' } }, 'Täglich klüger mit deinem Geld')
      )
    ),
    keyLearning('Speichern nicht vergessen — du wirst diesen Post nochmal brauchen.'),
    igHandle()
  ]);

  // ===== GENERATE ALL SLIDES =====
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  const outDir = path.join(__dirname, 'output', 'carousel_2026-10-09', 'slides');

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width:W, height:H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode:'width', value:W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i+1).padStart(2,'0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i+1}/${slides.length} gespeichert: ${pngPath}`);
  }
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
