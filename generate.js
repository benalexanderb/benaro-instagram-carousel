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

  const W = 1080, H = 1350;
  const TODAY = process.env.TODAY || new Date().toISOString().split('T')[0];
  const outDir = path.join(__dirname, 'output', `carousel_${TODAY}`, 'slides');

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

  function headline(text, size=60) {
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
      borderRadius:'16px', padding:'22px 28px', marginTop:'24px' } },
      h('div', { style: { display:'flex', width:'6px', minHeight:'40px',
        backgroundColor: C.red, borderRadius:'3px', flexShrink:0 } }),
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

  function slideRoot(...children) {
    return h('div', { style: {
      display:'flex', flexDirection:'column',
      width:W, height:H, padding:'70px',
      backgroundColor:C.bg, fontFamily:'Outfit'
    } }, ...children);
  }

  // ===== SLIDE 1: HOOK =====
  // Großer auffälliger Hook mit 5 Fehler-Teaser-Karten
  const slide1 = slideRoot(
    badge('ACHTUNG'),
    headline('DIESE 5 FEHLER HALTEN DICH ARM', 66),
    subline('Und 72 % der Deutschen machen mindestens einen davon'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'18px', marginTop:'20px' } },
      ...[
        { n:'01', text:'Kein Notgroschen' },
        { n:'02', text:'Geld schläft auf dem Girokonto' },
        { n:'03', text:'Falsche oder fehlende Versicherungen' },
        { n:'04', text:'Zu spät mit Investieren begonnen' },
        { n:'05', text:'Staatliche Förderungen ignoriert' },
      ].map(item =>
        h('div', { style: { display:'flex', alignItems:'center', gap:'20px',
          backgroundColor: C.bgDark,
          borderRadius:'16px', padding:'22px 28px',
          border:`1px solid ${C.border}` } },
          h('span', { style: { fontSize:'32px', fontWeight:800, color: C.red, minWidth:'50px' } }, item.n),
          h('div', { style: { display:'flex', width:'2px', height:'36px', backgroundColor: C.border, borderRadius:'1px', flexShrink:0 } }),
          h('span', { style: { fontSize:'30px', fontWeight:600, color: C.text } }, item.text),
        )
      ),
    ),
    keyLearning('Erkennst du dich wieder? Slide für Slide aufgedeckt.'),
    bfLogo(),
  );

  // ===== SLIDE 2: STAT HERO — Das Ausmaß des Problems =====
  const slide2 = slideRoot(
    badge('DAS PROBLEM'),
    headline('WAS FINANZIELLE UNWISSENHEIT KOSTET', 52),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'24px' } },
      h('div', { style: { display:'flex', gap:'10px', marginBottom:'8px' } },
        ...[0,1,2].map(() =>
          h('div', { style: { display:'flex', width:'0', height:'0',
            borderLeft:'16px solid transparent', borderRight:'16px solid transparent',
            borderTop:`22px solid ${C.red}` } })
        ),
      ),
      h('span', { style: { fontSize:'150px', fontWeight:800, color: C.accent, lineHeight:'1' } }, '23.000'),
      h('div', { style: { display:'flex', width:'200px', height:'6px', backgroundColor: C.red, borderRadius:'3px', marginTop:'-12px' } }),
      h('span', { style: { fontSize:'30px', fontWeight:600, color: C.text, lineHeight:'1.5', textAlign:'center', maxWidth:'820px' } },
        'Euro verzichten Deutsche im Schnitt über 10 Jahre — durch vermeidbare Finanzfehler'
      ),
      h('div', { style: { display:'flex', flexDirection:'row', gap:'20px', marginTop:'20px' } },
        ...[
          { val:'48 %', label:'Keine Steuererklärung' },
          { val:'63 %', label:'Kein Depot' },
          { val:'71 %', label:'Kein Notgroschen' },
        ].map(s =>
          h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'8px',
            backgroundColor: C.bgDark, borderRadius:'18px', padding:'24px 28px',
            border:`1px solid ${C.border}`, flex:'1' } },
            h('span', { style: { fontSize:'44px', fontWeight:800, color: C.accent } }, s.val),
            h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted, textAlign:'center', lineHeight:'1.3' } }, s.label),
          )
        ),
      ),
    ),
    keyLearning('Jeder dieser Fehler kostet real Geld — Jahr für Jahr.'),
    bfLogo(),
  );

  // ===== SLIDE 3: FEHLER 1 + 2 =====
  const slide3 = slideRoot(
    badge('FEHLER 1 + 2'),
    headline('KEIN NOTGROSCHEN — KEIN PLAN', 58),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'22px' } },
      // Fehler 1
      h('div', { style: { display:'flex', flexDirection:'column', gap:'14px',
        backgroundColor: 'rgba(230,48,48,0.10)', borderRadius:'20px', padding:'32px',
        border:`2px solid ${C.red}` } },
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px' } },
          h('div', { style: { display:'flex', alignItems:'center', justifyContent:'center',
            width:'52px', height:'52px', borderRadius:'14px',
            backgroundColor: C.red, flexShrink:0 } },
            h('span', { style: { fontSize:'28px', fontWeight:800, color:'#fff' } }, '01'),
          ),
          h('span', { style: { fontSize:'32px', fontWeight:800, color: C.text, textTransform:'uppercase' } }, 'Kein Notgroschen'),
        ),
        h('span', { style: { fontSize:'27px', fontWeight:500, color: C.textSoft, lineHeight:'1.5' } },
          'Ohne 3 Nettomonatsgehälter auf dem Tagesgeldkonto bist du im Notfall gezwungen, Schulden zu machen oder Aktien zu Verlustpreisen zu verkaufen.'
        ),
        h('div', { style: { display:'flex', gap:'12px', flexWrap:'wrap' } },
          ...[{ label:'Autoreparatur: 2.000 €', col: C.red }, { label:'Neue Waschmaschine: 900 €', col: C.red }, { label:'Jobverlust: 3-6 Monate', col: C.red }].map(t =>
            h('div', { style: { display:'flex', alignItems:'center', gap:'8px',
              backgroundColor:'rgba(230,48,48,0.15)', padding:'10px 18px', borderRadius:'10px' } },
              h('div', { style: { width:'8px', height:'8px', borderRadius:'4px', backgroundColor: t.col } }),
              h('span', { style: { fontSize:'22px', fontWeight:600, color: C.textSoft } }, t.label),
            )
          ),
        ),
      ),
      // Fehler 2
      h('div', { style: { display:'flex', flexDirection:'column', gap:'12px',
        backgroundColor: 'rgba(230,48,48,0.10)', borderRadius:'20px', padding:'32px',
        border:`2px solid ${C.red}` } },
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px' } },
          h('div', { style: { display:'flex', alignItems:'center', justifyContent:'center',
            width:'52px', height:'52px', borderRadius:'14px',
            backgroundColor: C.red, flexShrink:0 } },
            h('span', { style: { fontSize:'28px', fontWeight:800, color:'#fff' } }, '02'),
          ),
          h('span', { style: { fontSize:'32px', fontWeight:800, color: C.text, textTransform:'uppercase' } }, 'Geld schläft auf Girokonto'),
        ),
        h('div', { style: { display:'flex', gap:'16px', alignItems:'center' } },
          h('div', { style: { display:'flex', flexDirection:'column', flex:'1', alignItems:'center', gap:'6px',
            backgroundColor: C.bgDark, borderRadius:'14px', padding:'20px' } },
            h('span', { style: { fontSize:'42px', fontWeight:800, color: C.red } }, '0,0 %'),
            h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted, textAlign:'center' } }, 'Girokonto Zins'),
          ),
          h('span', { style: { fontSize:'36px', fontWeight:800, color: C.textMuted } }, 'vs'),
          h('div', { style: { display:'flex', flexDirection:'column', flex:'1', alignItems:'center', gap:'6px',
            backgroundColor: 'rgba(91,200,245,0.12)', borderRadius:'14px', padding:'20px',
            border:`1px solid ${C.accent}` } },
            h('span', { style: { fontSize:'42px', fontWeight:800, color: C.accent } }, '4,25 %'),
            h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted, textAlign:'center' } }, 'Tagesgeld p.a.'),
          ),
        ),
      ),
    ),
    keyLearning('Schritt 1: Notgroschen aufbauen. Schritt 2: Tagesgeldkonto eröffnen.'),
    bfLogo(),
  );

  // ===== SLIDE 4: FEHLER 3 + 4 =====
  const slide4 = slideRoot(
    badge('FEHLER 3 + 4'),
    headline('FALSCH VERSICHERT — ZU SPÄT GESTARTET', 52),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'22px' } },
      // Fehler 3
      h('div', { style: { display:'flex', flexDirection:'column', gap:'14px',
        backgroundColor: 'rgba(230,48,48,0.10)', borderRadius:'20px', padding:'30px',
        border:`2px solid ${C.red}` } },
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px' } },
          h('div', { style: { display:'flex', alignItems:'center', justifyContent:'center',
            width:'52px', height:'52px', borderRadius:'14px',
            backgroundColor: C.red, flexShrink:0 } },
            h('span', { style: { fontSize:'28px', fontWeight:800, color:'#fff' } }, '03'),
          ),
          h('span', { style: { fontSize:'30px', fontWeight:800, color: C.text, textTransform:'uppercase' } }, 'Falsche oder fehlende Versicherungen'),
        ),
        h('div', { style: { display:'flex', gap:'14px' } },
          ...[
            { label:'Haftpflicht', status:'Pflicht', ok: true },
            { label:'BU', status:'Oft vergessen', ok: false },
            { label:'Rechtsschutz', status:'Meist zu teuer', ok: false },
          ].map(v =>
            h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'8px',
              backgroundColor: v.ok ? 'rgba(91,200,245,0.12)' : 'rgba(230,48,48,0.12)',
              borderRadius:'14px', padding:'18px 16px', flex:'1',
              border:`1px solid ${v.ok ? C.accent : C.red}` } },
              h('span', { style: { fontSize:'24px', fontWeight:700, color: C.text } }, v.label),
              h('span', { style: { fontSize:'20px', fontWeight:500, color: v.ok ? C.accent : C.red } }, v.status),
            )
          ),
        ),
      ),
      // Fehler 4: Zinseszins-Visualisierung
      h('div', { style: { display:'flex', flexDirection:'column', gap:'14px',
        backgroundColor: 'rgba(230,48,48,0.10)', borderRadius:'20px', padding:'30px',
        border:`2px solid ${C.red}` } },
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px' } },
          h('div', { style: { display:'flex', alignItems:'center', justifyContent:'center',
            width:'52px', height:'52px', borderRadius:'14px',
            backgroundColor: C.red, flexShrink:0 } },
            h('span', { style: { fontSize:'28px', fontWeight:800, color:'#fff' } }, '04'),
          ),
          h('span', { style: { fontSize:'30px', fontWeight:800, color: C.text, textTransform:'uppercase' } }, 'Zu spät mit Investieren begonnen'),
        ),
        h('div', { style: { display:'flex', gap:'16px', alignItems:'flex-end' } },
          ...[
            { age:'Mit 25', val:100, eur:'215.000 €', col: C.accent },
            { age:'Mit 35', val:55, eur:'117.000 €', col: '#F59E0B' },
            { age:'Mit 45', val:25, eur:'52.000 €', col: C.red },
          ].map(b =>
            h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', flex:'1' } },
              h('span', { style: { fontSize:'24px', fontWeight:800, color: b.col } }, b.eur),
              h('div', { style: { display:'flex', width:'100%', height:`${b.val * 1.6}px`, backgroundColor: b.col, borderRadius:'8px 8px 0 0', minHeight:'40px' } }),
              h('span', { style: { fontSize:'22px', fontWeight:600, color: C.textSoft, textAlign:'center' } }, b.age),
            )
          ),
        ),
        h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted, lineHeight:'1.4' } },
          '200 €/Monat in ETF, 7 % p.a., bis 67 — Startzeitpunkt entscheidet alles'
        ),
      ),
    ),
    keyLearning('Berufsunfähigkeitsversicherung + früh starten = größter Hebel.'),
    bfLogo(),
  );

  // ===== SLIDE 5: FEHLER 5 — Staatliche Förderungen =====
  const slide5 = slideRoot(
    badge('FEHLER 5'),
    headline('GRATIS-GELD VOM STAAT — ABGEHOLT?', 56),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      h('span', { style: { fontSize:'28px', fontWeight:500, color: C.textSoft, lineHeight:'1.5', marginBottom:'8px' } },
        'Milliarden Euro staatlicher Förderungen bleiben jährlich ungenutzt — weil niemand darüber spricht:'
      ),
      ...[
        { title:'Altersvorsorge-Depot 2027', val:'+ 540 €/Jahr', desc:'50 % Bonus auf erste 360 € + 25 % auf weitere 1.440 €' },
        { title:'Vermögenswirksame Leistungen', val:'+ 560 €/Jahr', desc:'Bis 40 € vom Arbeitgeber + 20 % Arbeitnehmersparzulage' },
        { title:'Kinderdepot Frühstart-Rente', val:'+ 120 €/Jahr', desc:'10 € Staatszulage pro Monat ab 2026 rückwirkend' },
        { title:'Riester-Zulagen', val:'+ 175 €/Jahr', desc:'Grundzulage + 300 € pro Kind für berechtigte Familien' },
      ].map(item =>
        h('div', { style: { display:'flex', alignItems:'center', gap:'20px',
          backgroundColor: C.bgDark, borderRadius:'16px', padding:'22px 28px',
          border:`1px solid ${C.border}` } },
          h('span', { style: { fontSize:'28px', fontWeight:800, color: C.accent, minWidth:'130px' } }, item.val),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'4px' } },
            h('span', { style: { fontSize:'24px', fontWeight:700, color: C.text } }, item.title),
            h('span', { style: { fontSize:'21px', fontWeight:500, color: C.textMuted, lineHeight:'1.3' } }, item.desc),
          ),
        )
      ),
    ),
    keyLearning('Wer diese Förderungen nicht nutzt, verschenkt echtes Geld an den Staat.'),
    bfLogo(),
  );

  // ===== SLIDE 6: DIE LÖSUNG — 5-SCHRITTE-PLAN =====
  const slide6 = slideRoot(
    badge('DIE LÖSUNG'),
    headline('DEIN 5-SCHRITTE-KORREKTUR-PLAN', 52),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' } },
      ...[
        { num:'1', text:'Notgroschen aufbauen (3 Netto-Monatsgehälter auf Tagesgeldkonto)', pct:20 },
        { num:'2', text:'Tagesgeldkonto eröffnen und Ersparnisse umschichten (4,25 % p.a.)', pct:40 },
        { num:'3', text:'Berufsunfähigkeitsversicherung abschließen — das größte Risiko absichern', pct:60 },
        { num:'4', text:'ETF-Sparplan starten — je früher, desto mehr Zinseszins-Effekt', pct:80 },
        { num:'5', text:'Staatliche Förderungen aktivieren: VL, Altersvorsorge-Depot, Kinderdepot', pct:100 },
      ].map(l =>
        h('div', { style: { display:'flex', flexDirection:'column', gap:'10px', padding:'22px 26px',
          backgroundColor: C.bgDark, borderRadius:'16px',
          border: l.pct === 100 ? `2px solid ${C.accent}` : `1px solid ${C.border}` } },
          h('div', { style: { display:'flex', alignItems:'center', gap:'16px' } },
            h('span', { style: { fontSize:'38px', fontWeight:800,
              color: l.pct === 100 ? C.accent : C.white, minWidth:'48px' } }, `${l.num}.`),
            h('span', { style: { fontSize:'25px', fontWeight:600, color: C.text, lineHeight:'1.3' } }, l.text),
          ),
          h('div', { style: { display:'flex', height:'5px', backgroundColor: C.border, borderRadius:'3px', overflow:'hidden' } },
            h('div', { style: { display:'flex', width:`${l.pct}%`, height:'5px',
              backgroundColor: l.pct === 100 ? C.accent : C.red, borderRadius:'3px' } }),
          ),
        )
      ),
    ),
    keyLearning('Reihenfolge ist entscheidend: Schritt für Schritt, nicht alles auf einmal.'),
    bfLogo(),
  );

  // ===== SLIDE 7: KEY LEARNINGS =====
  const slide7 = slideRoot(
    badge('DEINE TAKEAWAYS'),
    headline('WAS DU JETZT WEISST', 62),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'18px' } },
      ...[
        { num:'01', text:'72 % der Deutschen machen mindestens einen dieser 5 Fehler' },
        { num:'02', text:'Der Notgroschen ist die Basis — ohne ihn ist alles andere unsicher' },
        { num:'03', text:'3 Monate früher anfangen können bis zu 10.000 € Unterschied machen' },
        { num:'04', text:'Staatliche Förderungen sind legales Gratis-Geld — nutze es' },
        { num:'05', text:'Finanzieller Erfolg ist kein Talent — es ist eine Reihenfolge' },
      ].map(l =>
        h('div', { style: { display:'flex', alignItems:'flex-start', gap:'20px',
          backgroundColor: C.bgDark, borderRadius:'16px', padding:'22px 26px',
          border:`1px solid ${C.border}` } },
          h('span', { style: { fontSize:'32px', fontWeight:800, color: C.accent, minWidth:'52px' } }, l.num),
          h('span', { style: { fontSize:'27px', fontWeight:600, color: C.text, lineHeight:'1.35' } }, l.text),
        )
      ),
    ),
    keyLearning('Wissen allein reicht nicht — handeln macht den Unterschied.'),
    bfLogo(),
  );

  // ===== SLIDE 8: CTA =====
  const slide8 = slideRoot(
    badge('JETZT DU'),
    headline('WELCHEN FEHLER ERKENNST DU BEI DIR?', 52),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'28px' } },
      h('div', { style: { display:'flex', width:'80px', height:'6px', backgroundColor: C.red, borderRadius:'3px' } }),
      h('span', { style: { fontSize:'32px', fontWeight:600, color: C.textSoft, textAlign:'center', lineHeight:'1.5', maxWidth:'840px' } },
        'Schreib uns in die Kommentare, welcher Fehler auf dich zutrifft — wir helfen dir, ihn zu korrigieren.'
      ),
      h('div', { style: { display:'flex', flexDirection:'column', gap:'16px', width:'100%', maxWidth:'780px' } },
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px',
          backgroundColor: C.bgDark, borderRadius:'16px', padding:'24px 30px',
          border:`1px solid ${C.border}` } },
          h('span', { style: { fontSize:'36px', fontWeight:800, color: C.accent } }, '01'),
          h('span', { style: { fontSize:'28px', fontWeight:600, color: C.text } }, 'Carousel speichern — zum Nachschlagen'),
        ),
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px',
          backgroundColor: C.bgDark, borderRadius:'16px', padding:'24px 30px',
          border:`1px solid ${C.border}` } },
          h('span', { style: { fontSize:'36px', fontWeight:800, color: C.accent } }, '02'),
          h('span', { style: { fontSize:'28px', fontWeight:600, color: C.text } }, 'Benaro Finanzen folgen für mehr'),
        ),
        h('div', { style: { display:'flex', alignItems:'center', gap:'16px',
          backgroundColor: C.bgDark, borderRadius:'16px', padding:'24px 30px',
          border:`2px solid ${C.accent}` } },
          h('span', { style: { fontSize:'36px', fontWeight:800, color: C.accent } }, '03'),
          h('span', { style: { fontSize:'28px', fontWeight:600, color: C.text } }, 'Kostenloses Erstgespräch buchen'),
        ),
      ),
      h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted } }, '@benarofinanzen'),
    ),
    bfLogo(),
  );

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width:W, height:H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i+1).padStart(2,'0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i+1}/${slides.length} done`);
  }
  console.log('All slides generated!');
}

main().catch(e => { console.error(e); process.exit(1); });
