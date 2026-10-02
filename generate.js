'use strict';
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

  const C = {
    bg:      '#001F61',
    bgDark:  '#001542',
    text:    '#FFFFFF',
    textSoft:'#E5E7EB',
    textMuted:'#9CA3AF',
    cardBg:  'rgba(255,255,255,0.1)',
    border:  'rgba(255,255,255,0.2)',
    green:   '#10B981',
    red:     '#EF4444',
    gold:    '#F59E0B',
  };

  const W = 1080, H = 1350;

  const logoB64 = 'data:image/jpeg;base64,' +
    fs.readFileSync(path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')).toString('base64');

  const h = (type, props, ...ch) => ({
    type,
    props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function logo() {
    return h('img', {
      src: logoB64,
      width: 100, height: 100,
      style: { borderRadius: '12px', objectFit: 'cover' }
    });
  }

  function topRow(badgeText) {
    return h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'24px' } },
      h('div', { style: { display:'flex' } },
        h('span', { style: { display:'flex', fontSize:'22px', fontWeight:700, letterSpacing:'3px',
          color: C.text, backgroundColor: C.cardBg, padding:'10px 22px', borderRadius:'12px' } }, badgeText)
      ),
      logo()
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
      backgroundColor: C.cardBg, borderRadius:'16px', padding:'22px 28px', marginTop:'12px' } },
      h('div', { style: { display:'flex', width:'6px', minHeight:'40px',
        backgroundColor: accent || C.text, borderRadius:'3px', flexShrink: '0' } }),
      h('span', { style: { fontSize:'28px', fontWeight:600, color: C.text, lineHeight:'1.4' } }, text),
    );
  }

  function igHandle() {
    return h('div', { style: { display:'flex', alignItems:'center', marginTop:'12px' } },
      h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted } }, '@benarofinanzen')
    );
  }

  function slideRoot(bg, children) {
    return h('div', { style: {
      display:'flex', flexDirection:'column', width:W, height:H,
      padding:'60px 70px', backgroundColor: bg, fontFamily:'Outfit'
    } }, ...children);
  }

  // ── SLIDE 1: HOOK ──────────────────────────────────────────────────────────
  const slide1 = slideRoot(C.bg, [
    topRow('DAS MUSST DU WISSEN'),
    headline('Im Januar 2027\nwird Geld von\ndeinem Depot\nabgebucht', 58),
    subline('Und die meisten ETF-Sparer\nwissen nicht, warum.'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      // Big visual: calendar + warning
      h('div', { style: { display:'flex', gap:'20px', alignItems:'stretch' } },
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', alignItems:'center', justifyContent:'center',
          backgroundColor: 'rgba(239,68,68,0.12)', borderRadius:'24px', border:`2px solid ${C.red}`, padding:'36px 24px', gap:'16px' } },
          h('span', { style: { fontSize:'90px', fontWeight:800, color: C.red, lineHeight:'1' } }, '!'),
          h('span', { style: { fontSize:'30px', fontWeight:700, color: C.text, textAlign:'center', lineHeight:'1.3' } }, 'Vorabpauschale'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted, textAlign:'center', lineHeight:'1.4' } },
            'Steuer auf\nthesaurierende ETFs')
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column', gap:'16px' } },
          h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            backgroundColor: C.cardBg, borderRadius:'20px', padding:'28px 16px', gap:'8px', flex:'1' } },
            h('span', { style: { fontSize:'52px', fontWeight:800, color: C.gold, lineHeight:'1' } }, '3,20'),
            h('span', { style: { fontSize:'22px', fontWeight:600, color: C.textMuted } }, '% Basiszins 2026'),
          ),
          h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            backgroundColor: C.cardBg, borderRadius:'20px', padding:'28px 16px', gap:'8px', flex:'1' } },
            h('span', { style: { fontSize:'38px', fontWeight:800, color: C.text, lineHeight:'1' } }, 'Jan 2027'),
            h('span', { style: { fontSize:'22px', fontWeight:600, color: C.textMuted, textAlign:'center' } }, 'Abzugsdatum'),
          ),
        )
      )
    ),
    keyLearning('Betrifft alle ETF-Sparpläne mit thesaurierenden Fonds', C.red),
    igHandle(),
  ]);

  // ── SLIDE 2: KONTEXT — Was ist die Vorabpauschale? ─────────────────────────
  const slide2 = slideRoot(C.bgDark, [
    topRow('DIE ERKLÄRUNG'),
    headline('Was ist die\nVorabpauschale?', 62),
    subline('Eine Steuer-Vorauszahlung auf\nthesaurierende ETFs'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'18px' } },
      h('div', { style: { display:'flex', flexDirection:'column', gap:'14px' } },
        ['Thesaurierende ETFs schütten keine Dividenden aus.',
         'Das Finanzamt will aber trotzdem jährlich Steuern.',
         'Deshalb gibt es die Vorabpauschale: eine\nfiktive Mindestrendite wird besteuert.'].map((txt, i) =>
          h('div', { style: { display:'flex', alignItems:'flex-start', gap:'18px',
            backgroundColor: C.cardBg, borderRadius:'18px', padding:'24px 28px' } },
            h('span', { style: { fontSize:'32px', fontWeight:800, color: C.green,
              minWidth:'44px', lineHeight:'1' } }, `0${i+1}`),
            h('span', { style: { fontSize:'28px', fontWeight:500, color: C.text, lineHeight:'1.4' } }, txt)
          )
        )
      )
    ),
    keyLearning('Thesaurierend = keine Ausschüttung, aber trotzdem steuerpflichtig'),
    igHandle(),
  ]);

  // ── SLIDE 3: DATEN — Wie wird berechnet? ──────────────────────────────────
  const zinsBars = [
    { year: '2021', zins: 0.0, label: '0,00 %' },
    { year: '2022', zins: 0.0, label: '0,00 %' },
    { year: '2023', zins: 2.55, label: '2,55 %' },
    { year: '2024', zins: 2.29, label: '2,29 %' },
    { year: '2025', zins: 2.53, label: '2,53 %' },
    { year: '2026', zins: 3.20, label: '3,20 %' },
  ];
  const maxZins = 3.20;
  const barMaxH = 180;

  const slide3 = slideRoot(C.bg, [
    topRow('DER BASISZINS'),
    headline('3,20 % —\nso hoch war er\nnoch nie', 62),
    subline('Der Basiszins 2026 ist entscheidend\nfür die Höhe der Steuer'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'flex-end', gap:'0px' } },
      // Bar chart
      h('div', { style: { display:'flex', alignItems:'flex-end', gap:'16px', justifyContent:'center',
        padding:'20px 0' } },
        ...zinsBars.map(b => {
          const barH = b.zins === 0 ? 8 : Math.max(24, (b.zins / maxZins) * barMaxH);
          const isLatest = b.year === '2026';
          return h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' } },
            h('span', { style: { fontSize:'20px', fontWeight:700, color: isLatest ? C.gold : C.textMuted } }, b.label),
            h('div', { style: { display:'flex', width:'100px', height:`${barH}px`,
              backgroundColor: isLatest ? C.gold : C.cardBg,
              borderRadius:'10px 10px 4px 4px',
              border: isLatest ? 'none' : `1px solid ${C.border}` } }),
            h('span', { style: { fontSize:'22px', fontWeight:700, color: isLatest ? C.text : C.textMuted } }, b.year),
          );
        })
      )
    ),
    keyLearning('Je höher der Basiszins, desto mehr Vorabpauschale musst du zahlen', C.gold),
    igHandle(),
  ]);

  // ── SLIDE 4: RECHENBEISPIEL ────────────────────────────────────────────────
  const slide4 = slideRoot(C.bgDark, [
    topRow('RECHENBEISPIEL'),
    headline('So viel kostet\ndie Vorabpauschale\nbei 10.000 €', 56),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'14px' } },
      // Calculation steps
      ...[
        { label: 'Depotwert am 01.01.2026', val: '10.000 €', color: C.textSoft, highlight: false },
        { label: 'mal Basiszins (3,20 %)', val: '320 €', color: C.textSoft, highlight: false },
        { label: 'mal Teilfreistellung (0,7)', val: '224 € = Basisertrag', color: C.gold, highlight: false },
        { label: 'Steuer (26,375 %)', val: 'ca. 59 €', color: C.red, highlight: true },
      ].map(row =>
        h('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center',
          backgroundColor: row.highlight ? 'rgba(239,68,68,0.12)' : C.cardBg,
          border: row.highlight ? `1.5px solid ${C.red}` : 'none',
          borderRadius:'16px', padding:'22px 28px' } },
          h('span', { style: { fontSize:'26px', fontWeight:500, color: C.textMuted, flex:'1', lineHeight:'1.3' } }, row.label),
          h('span', { style: { fontSize:'28px', fontWeight:700, color: row.color } }, row.val),
        )
      )
    ),
    keyLearning('Dein ETF muss mindestens 224 € gewonnen haben — sonst entfällt die Vorabpauschale'),
    igHandle(),
  ]);

  // ── SLIDE 5: ERWARTUNG VS. REALITÄT ───────────────────────────────────────
  const slide5 = slideRoot(C.bg, [
    topRow('MISSVERSTÄNDNIS'),
    headline('Was die meisten\ndenken vs.\ndie Realität', 58),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' } },
      h('div', { style: { display:'flex', gap:'16px', height:'340px' } },
        // Left: Erwartung
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column',
          backgroundColor: C.cardBg, borderRadius:'22px', padding:'28px', gap:'14px' } },
          h('span', { style: { fontSize:'20px', fontWeight:700, letterSpacing:'2px', color: C.textMuted } }, 'ERWARTUNG'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor: C.border, borderRadius:'2px' } }),
          h('span', { style: { fontSize:'27px', fontWeight:600, color: C.textSoft, lineHeight:'1.4' } },
            '"Mein ETF schüttet\nnichts aus, ich muss\nauch nichts\nversteuern."'),
        ),
        // Right: Realität
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column',
          backgroundColor: C.text, borderRadius:'22px', padding:'28px', gap:'14px' } },
          h('span', { style: { fontSize:'20px', fontWeight:700, letterSpacing:'2px', color: 'rgba(0,31,97,0.5)' } }, 'REALITÄT'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor: 'rgba(0,31,97,0.2)', borderRadius:'2px' } }),
          h('span', { style: { fontSize:'27px', fontWeight:600, color: '#001F61', lineHeight:'1.4' } },
            'Das Finanzamt\nbesteuert eine\nfiktive Mindest-\nrendite — immer.'),
        ),
      )
    ),
    keyLearning('Thesaurierend heißt: kein Geld fließt, aber Steuern entstehen trotzdem'),
    igHandle(),
  ]);

  // ── SLIDE 6: LÖSUNG — Freistellungsauftrag ────────────────────────────────
  const slide6 = slideRoot(C.bgDark, [
    topRow('DIE LÖSUNG'),
    headline('So kannst du\ndie Steuer\nreduzieren', 62),
    subline('Freistellungsauftrag richtig\nnutzen'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'14px' } },
      h('div', { style: { display:'flex', gap:'16px' } },
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column',
          backgroundColor: 'rgba(16,185,129,0.12)', border:`1.5px solid ${C.green}`,
          borderRadius:'20px', padding:'28px', gap:'12px', alignItems:'center', justifyContent:'center' } },
          h('span', { style: { fontSize:'52px', fontWeight:800, color: C.green } }, '1.000'),
          h('span', { style: { fontSize:'22px', fontWeight:600, color: C.textSoft, textAlign:'center' } }, '€ Sparerpausch-\nbetrag pro Person'),
        ),
        h('div', { style: { display:'flex', flex:'1', flexDirection:'column',
          backgroundColor: 'rgba(16,185,129,0.12)', border:`1.5px solid ${C.green}`,
          borderRadius:'20px', padding:'28px', gap:'12px', alignItems:'center', justifyContent:'center' } },
          h('span', { style: { fontSize:'52px', fontWeight:800, color: C.green } }, '2.000'),
          h('span', { style: { fontSize:'22px', fontWeight:600, color: C.textSoft, textAlign:'center' } }, '€ für Ehepaare\nzusammen'),
        ),
      ),
      h('div', { style: { display:'flex', flexDirection:'column', gap:'12px', marginTop:'8px' } },
        ...[
          'Freistellungsauftrag bei deiner Bank stellen',
          'Vorabpauschale wird zuerst mit dem Freibetrag verrechnet',
          'Unter 1.000 € Kapitalerträgen pro Jahr: keine Steuer',
        ].map((step, i) =>
          h('div', { style: { display:'flex', alignItems:'center', gap:'16px',
            backgroundColor: C.cardBg, borderRadius:'14px', padding:'18px 24px' } },
            h('span', { style: { fontSize:'28px', fontWeight:800, color: C.green,
              minWidth:'40px' } }, `${i+1}.`),
            h('span', { style: { fontSize:'26px', fontWeight:500, color: C.text, lineHeight:'1.3' } }, step),
          )
        )
      )
    ),
    keyLearning('Freistellungsauftrag jetzt noch vor Jahresende stellen', C.green),
    igHandle(),
  ]);

  // ── SLIDE 7: TAKEAWAYS ────────────────────────────────────────────────────
  const learnings = [
    { num:'01', text:'Vorabpauschale = Steuer auf thesaurierende ETFs ohne Ausschüttung', pct:25 },
    { num:'02', text:'Basiszins 2026 beträgt 3,20 % — so hoch wie noch nie', pct:50 },
    { num:'03', text:'Abzug erfolgt im Januar 2027 direkt vom Verrechnungskonto', pct:75 },
    { num:'04', text:'Freistellungsauftrag spart bis zu 263 € Steuern pro Person', pct:100 },
  ];

  const slide7 = slideRoot(C.bg, [
    topRow('4 TAKEAWAYS'),
    headline('Das nimmst du\nmit', 66),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'14px' } },
      ...learnings.map(l =>
        h('div', { style: { display:'flex', flexDirection:'column', gap:'10px',
          padding:'22px 28px', backgroundColor: C.cardBg, borderRadius:'18px' } },
          h('div', { style: { display:'flex', alignItems:'center', gap:'18px' } },
            h('span', { style: { fontSize:'38px', fontWeight:800,
              color: l.pct === 100 ? C.green : C.text, minWidth:'58px' } }, l.num),
            h('span', { style: { fontSize:'26px', fontWeight:600, color: C.text, lineHeight:'1.3' } }, l.text),
          ),
          h('div', { style: { display:'flex', height:'5px', backgroundColor: C.border, borderRadius:'3px', overflow:'hidden' } },
            h('div', { style: { display:'flex', width:`${l.pct}%`, height:'5px',
              backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius:'3px' } }),
          ),
        )
      )
    ),
    igHandle(),
  ]);

  // ── SLIDE 8: CTA ──────────────────────────────────────────────────────────
  const slide8 = slideRoot(C.bgDark, [
    topRow('JETZT HANDELN'),
    h('div', { style: { display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'28px' } },
      h('img', { src: logoB64, width:140, height:140, style: { borderRadius:'20px', objectFit:'cover' } }),
      h('span', { style: { fontSize:'48px', fontWeight:800, color: C.text,
        textAlign:'center', lineHeight:'1.15', letterSpacing:'-1px' } },
        'Hast du deinen\nFreistellungsauftrag\nschon gestellt?'),
      h('span', { style: { fontSize:'30px', fontWeight:500, color: C.textMuted,
        textAlign:'center', lineHeight:'1.5' } },
        'Noch vor Jahresende möglich.\nSpeichere diesen Post — du wirst\nihn im Januar brauchen.'),
      h('div', { style: { display:'flex', flexDirection:'column', gap:'10px', width:'100%' } },
        h('div', { style: { display:'flex', alignItems:'center', justifyContent:'center',
          backgroundColor: 'rgba(16,185,129,0.15)', borderRadius:'16px', padding:'18px 28px',
          border:`1.5px solid ${C.green}` } },
          h('span', { style: { fontSize:'28px', fontWeight:700, color: C.green } },
            'Folge für mehr Finanz-Wissen')
        )
      )
    ),
    igHandle(),
  ]);

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  const outDir = path.join(__dirname, 'output', 'carousel_2026-10-02', 'slides');

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width:W, height:H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode:'width', value:W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i+1).padStart(2,'0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i+1}/${slides.length} gespeichert: ${pngPath}`);
  }
  console.log('Alle Slides generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
