const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default || require('satori');
  const { Resvg } = require('@resvg/resvg-js');

  const fontDir = path.join('/tmp/workspace', 'node_modules/@fontsource/outfit/files');
  const fonts = [400,500,600,700,800].flatMap(w => [
    { name:'Outfit', weight:w, style:'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-${w}-normal.woff`)) },
    { name:'Outfit', weight:w, style:'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-ext-${w}-normal.woff`)) },
  ]);

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync('/tmp/workspace/skills/instagram-carousel-skill/templates/benaro-logo.jpg').toString('base64');

  const C = {
    bg: '#001f60',
    text: '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted: '#9CA3AF',
    cardBg: 'rgba(255,255,255,0.10)',
    border: 'rgba(255,255,255,0.20)',
    green: '#10B981',
    red: '#EF4444',
  };

  const W = 1080, H = 1350;

  const h = (type, props, ...ch) => ({
    type,
    props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  function logo() {
    return h('img', { src: logoB64, width: 120, height: 120,
      style: { borderRadius: '12px', objectFit: 'cover', flexShrink: 0 } });
  }

  function badge(text) {
    return h('div', { style: { display:'flex' } },
      h('span', { style: { display:'flex', fontSize:'22px', fontWeight:700, letterSpacing:'3px',
        color: C.text, backgroundColor: C.cardBg, padding:'10px 22px', borderRadius:'12px' } }, text)
    );
  }

  function topRow(badgeText) {
    return h('div', {
      style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'24px' }
    }, badge(badgeText), logo());
  }

  function hl(text, size) {
    return h('span', {
      style: { fontSize:`${size || 62}px`, fontWeight:800, color: C.text,
        lineHeight:'1.08', letterSpacing:'-1.5px', marginBottom:'6px' }
    }, text);
  }

  function sub(text) {
    return h('span', {
      style: { fontSize:'28px', fontWeight:500, color: C.textMuted, lineHeight:'1.45', marginTop:'10px' }
    }, text);
  }

  function kl(text, red) {
    return h('div', {
      style: { display:'flex', alignItems:'center', gap:'14px',
        backgroundColor: C.cardBg, borderRadius:'16px', padding:'22px 28px', marginTop:'16px' }
    },
      h('div', { style: { display:'flex', width:'6px', minHeight:'40px',
        backgroundColor: red ? C.red : C.text, borderRadius:'3px', flexShrink: 0 } }),
      h('span', { style: { fontSize:'27px', fontWeight:600, color: C.text, lineHeight:'1.4' } }, text)
    );
  }

  function hdl() {
    return h('span', {
      style: { fontSize:'24px', fontWeight:500, color: C.textMuted, marginTop:'10px' }
    }, '@benarofinanzen');
  }

  function root(children) {
    return h('div', {
      style: { display:'flex', flexDirection:'column', width:W, height:H,
        padding:'68px', backgroundColor: C.bg, fontFamily:'Outfit' }
    }, ...children);
  }

  function svgSrc(s) {
    return `data:image/svg+xml;base64,${Buffer.from(s).toString('base64')}`;
  }

  // ---- SLIDE 1: HOOK ----
  const s1 = root([
    topRow('SCHOCKIERENDE ZAHL'),
    hl('87 % aller Aktien-Picker verlieren gegen den Index', 54),
    sub('Und die meisten merken es erst nach Jahren.'),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'16px' } },
      h('div', { style:{ display:'flex', alignItems:'baseline', gap:'6px' } },
        h('span', { style:{ fontSize:'160px', fontWeight:800, color:C.red, lineHeight:'1', letterSpacing:'-4px' } }, '87'),
        h('span', { style:{ fontSize:'84px', fontWeight:800, color:C.red, lineHeight:'1' } }, '%')
      ),
      h('div', { style:{ display:'flex', flexDirection:'column', alignItems:'center', gap:'8px' } },
        h('span', { style:{ fontSize:'30px', fontWeight:600, color:C.textSoft, textAlign:'center' } }, 'aller aktiv verwalteten Fonds'),
        h('span', { style:{ fontSize:'30px', fontWeight:600, color:C.textSoft, textAlign:'center' } }, 'schlagen den MSCI World NICHT'),
        h('span', { style:{ fontSize:'24px', fontWeight:400, color:C.textMuted, textAlign:'center', marginTop:'8px' } }, 'Zeitraum: 15 Jahre | Quelle: SPIVA Europe')
      )
    ),
    kl('Was das fuer dein Depot bedeutet, erfaehrst du jetzt.'),
    hdl(),
  ]);

  // ---- SLIDE 2: BALKENDIAGRAMM ----
  const d2 = [
    { period:'1 Jahr',   pct:72 },
    { period:'5 Jahre',  pct:78 },
    { period:'10 Jahre', pct:85 },
    { period:'15 Jahre', pct:87 },
  ];
  const bMaxH = 220, bW2 = 140, bGap = 210, bStartX = 60;
  const ch2 = 300;
  const barsSvg = `<svg width="880" height="${ch2}" viewBox="0 0 880 ${ch2}" xmlns="http://www.w3.org/2000/svg">
    ${d2.map((d,i) => {
      const x = bStartX + i * bGap;
      const bh = Math.round((d.pct / 100) * bMaxH);
      const y = ch2 - 40 - bh;
      const alpha = (0.60 + i * 0.10).toFixed(2);
      return `<rect x="${x}" y="${y}" width="${bW2}" height="${bh}" rx="10" fill="#EF4444" opacity="${alpha}"/>
<rect x="${x}" y="${ch2-40}" width="${bW2}" height="4" rx="2" fill="rgba(255,255,255,0.12)"/>`;
    }).join('\n')}
  </svg>`;

  const s2 = root([
    topRow('DIE DATEN'),
    hl('Je laenger — desto schlechter', 62),
    sub('Anteil aktiver Fonds, die den MSCI World NICHT schlagen'),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'10px' } },
      h('img', { src: svgSrc(barsSvg), width:880, height:ch2, style:{ objectFit:'contain', alignSelf:'center' } }),
      h('div', { style:{ display:'flex', justifyContent:'space-around', marginTop:'6px' } },
        ...d2.map(d =>
          h('div', { style:{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', width:'140px' } },
            h('span', { style:{ fontSize:'26px', fontWeight:800, color:C.red } }, `${d.pct} %`),
            h('span', { style:{ fontSize:'20px', fontWeight:500, color:C.textMuted } }, d.period)
          )
        )
      )
    ),
    kl('Kein Zufall: Die Underperformance nimmt mit der Zeit zu, nicht ab.'),
    hdl(),
  ]);

  // ---- SLIDE 3: 3 FALLEN ----
  const fallen = [
    { n:'1', title:'Klumpenrisiko', desc:'Wenige Aktien — ein Skandal loescht 30 % deines Depots aus' },
    { n:'2', title:'Timing-Falle', desc:'Du kaufst zu teuer und verkaufst in Panik — du verlierst doppelt' },
    { n:'3', title:'Steuernachteil', desc:'Haeufiges Handeln kostet Abgeltungssteuer — ETFs stunden sie automatisch' },
  ];

  const s3 = root([
    topRow('DAS PROBLEM'),
    hl('3 Fallen beim Stock-Picking', 62),
    sub('Warum selbst gute Ideen oft scheitern'),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'18px' } },
      ...fallen.map(f =>
        h('div', { style:{ display:'flex', gap:'18px', alignItems:'center',
          backgroundColor:C.cardBg, borderRadius:'18px', padding:'26px 28px' } },
          h('div', { style:{ display:'flex', width:'52px', height:'52px', borderRadius:'14px',
            backgroundColor:C.red, alignItems:'center', justifyContent:'center', flexShrink:0 } },
            h('span', { style:{ fontSize:'26px', fontWeight:800, color:'#FFFFFF' } }, f.n)
          ),
          h('div', { style:{ display:'flex', flexDirection:'column', gap:'6px' } },
            h('span', { style:{ fontSize:'28px', fontWeight:700, color:C.text } }, f.title),
            h('span', { style:{ fontSize:'23px', fontWeight:400, color:C.textSoft, lineHeight:'1.4' } }, f.desc)
          )
        )
      )
    ),
    kl('Alle 3 Fallen lassen sich mit einem einzigen Schritt umgehen.', true),
    hdl(),
  ]);

  // ---- SLIDE 4: ERWARTUNG vs. REALITAET ----
  const s4 = root([
    topRow('ERWARTUNG VS. REALITAET'),
    hl('Was du denkst vs. was die Daten zeigen', 50),
    h('div', { style:{ display:'flex', flex:'1', gap:'16px', marginTop:'20px' } },
      h('div', { style:{ display:'flex', flex:'1', flexDirection:'column',
        backgroundColor:C.cardBg, borderRadius:'20px', padding:'28px', gap:'14px' } },
        h('span', { style:{ fontSize:'20px', fontWeight:700, letterSpacing:'2px', color:C.textMuted } }, 'ERWARTUNG'),
        h('div', { style:{ display:'flex', width:'100%', height:'3px', backgroundColor:C.border, borderRadius:'2px' } }),
        h('span', { style:{ fontSize:'26px', fontWeight:600, color:C.textSoft, lineHeight:'1.4' } },
          '"Ich bin schlau genug, die richtigen Aktien zu finden."'),
        h('span', { style:{ fontSize:'22px', fontWeight:400, color:C.textMuted, lineHeight:'1.4' } },
          'Die meisten glauben, sie gehoeren zu den 13 %, die den Markt schlagen')
      ),
      h('div', { style:{ display:'flex', flex:'1', flexDirection:'column',
        backgroundColor:'rgba(16,185,129,0.12)', borderRadius:'20px', padding:'28px', gap:'14px',
        border:'2px solid rgba(16,185,129,0.35)' } },
        h('span', { style:{ fontSize:'20px', fontWeight:700, letterSpacing:'2px', color:C.green } }, 'REALITAET'),
        h('div', { style:{ display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(16,185,129,0.3)', borderRadius:'2px' } }),
        h('span', { style:{ fontSize:'26px', fontWeight:600, color:C.text, lineHeight:'1.4' } },
          '"87 % verlieren. Die 13 % haben meist einfach Glueck gehabt."'),
        h('span', { style:{ fontSize:'22px', fontWeight:400, color:C.textSoft, lineHeight:'1.4' } },
          'Selbst Profi-Fondsmanager mit Milliarden-Budget scheitern am Markt')
      )
    ),
    kl('Koennen oder Zufall? Das laesst sich erst nach 20 Jahren beurteilen.'),
    hdl(),
  ]);

  // ---- SLIDE 5: WANN AKTIEN SINN MACHEN ----
  const regeln = [
    { ok:true,  lbl:'OK: 10-20 %',    desc:'als Beimischung — nie als Basis deines Depots' },
    { ok:true,  lbl:'OK: Lerneffekt', desc:'Unternehmen analysieren — wertvolles Wissen aufbauen' },
    { ok:true,  lbl:'OK: Dividenden', desc:'Einzeltitel mit stabilen Ausschuettungen fuer passives Einkommen' },
    { ok:false, lbl:'NIEMALS: 50 %+', desc:'mehr als die Haelfte in Einzelaktien — das ist Spekulation' },
  ];

  const s5 = root([
    topRow('DIE AUSNAHME'),
    hl('Wann Einzelaktien Sinn machen', 58),
    sub('Es gibt gute Gruende — aber mit klaren Regeln'),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' } },
      ...regeln.map(r =>
        h('div', { style:{ display:'flex', gap:'16px', alignItems:'center',
          backgroundColor:C.cardBg, borderRadius:'16px', padding:'20px 24px' } },
          h('div', { style:{ display:'flex', width:'8px', minHeight:'44px',
            backgroundColor: r.ok ? C.green : C.red, borderRadius:'4px', flexShrink:0 } }),
          h('div', { style:{ display:'flex', flexDirection:'column', gap:'4px' } },
            h('span', { style:{ fontSize:'24px', fontWeight:700, color: r.ok ? C.green : C.red } }, r.lbl),
            h('span', { style:{ fontSize:'23px', fontWeight:400, color:C.textSoft, lineHeight:'1.35' } }, r.desc)
          )
        )
      )
    ),
    kl('Aktien als Beimischung: ja. Als alleinige Strategie: riskant.'),
    hdl(),
  ]);

  // ---- SLIDE 6: ETF-PRINZIP (4 Schritte) ----
  const steps = [
    { n:'01', title:'Du investierst', desc:'z.B. 150 EUR / Monat in einen ETF-Sparplan', hi:false },
    { n:'02', title:'ETF kauft fuer dich', desc:'automatisch 1.500+ Unternehmen weltweit', hi:false },
    { n:'03', title:'Marktrendite', desc:'7-9 % p.a. historisch — ohne Auswahlstress', hi:false },
    { n:'04', title:'Vermoegen waechst', desc:'Zinseszins arbeitet — du musst nichts tun', hi:true },
  ];

  const s6 = root([
    topRow('DAS PRINZIP'),
    hl('Warum ETFs fast immer gewinnen', 58),
    sub('Einfachheit schlaegt Komplexitaet — seit Jahrzehnten'),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'20px' } },
      ...steps.map(s =>
        h('div', { style:{ display:'flex', gap:'18px', alignItems:'center' } },
          h('div', { style:{ display:'flex', width:'56px', height:'56px', borderRadius:'14px', flexShrink:0,
            backgroundColor: s.hi ? C.green : C.cardBg,
            alignItems:'center', justifyContent:'center' } },
            h('span', { style:{ fontSize:'22px', fontWeight:800, color:C.text } }, s.n)
          ),
          h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', gap:'2px' } },
            h('span', { style:{ fontSize:'27px', fontWeight:700, color:C.text } }, s.title),
            h('span', { style:{ fontSize:'23px', fontWeight:400, color:C.textMuted, lineHeight:'1.35' } }, s.desc)
          )
        )
      )
    ),
    kl('Diversifikation + Automatisierung = die maechtigste Kombination beim Investieren.'),
    hdl(),
  ]);

  // ---- SLIDE 7: LEARNINGS ----
  const lrns = [
    { num:'01', text:'87 % aktiver Fonds schlagen den Markt NICHT ueber 15 Jahre', pct:25 },
    { num:'02', text:'Stock-Picking riskiert Klumpenrisiko, Timing-Fehler und Steuernachteile', pct:50 },
    { num:'03', text:'Einzelaktien als Beimischung okay — maximal 10-20 % des Depots', pct:75 },
    { num:'04', text:'ETF-Sparplan: einfach, guenstig und nachweislich erfolgreicher', pct:100 },
  ];

  const s7 = root([
    topRow('DEINE TAKEAWAYS'),
    hl('4 Erkenntnisse fuer dein Depot', 58),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' } },
      ...lrns.map(l =>
        h('div', { style:{ display:'flex', flexDirection:'column', gap:'10px',
          padding:'20px 24px', backgroundColor:C.cardBg, borderRadius:'18px' } },
          h('div', { style:{ display:'flex', alignItems:'center', gap:'16px' } },
            h('span', { style:{ fontSize:'36px', fontWeight:800,
              color: l.pct === 100 ? C.green : C.text, minWidth:'56px' } }, l.num),
            h('span', { style:{ fontSize:'24px', fontWeight:600, color:C.text, lineHeight:'1.3' } }, l.text)
          ),
          h('div', { style:{ display:'flex', height:'6px', backgroundColor:C.border, borderRadius:'3px', overflow:'hidden' } },
            h('div', { style:{ display:'flex', width:`${l.pct}%`, height:'6px',
              backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius:'3px' } })
          )
        )
      )
    ),
    hdl(),
  ]);

  // ---- SLIDE 8: CTA ----
  const s8 = root([
    topRow('UND DU?'),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'28px' } },
      h('span', { style:{ fontSize:'50px', fontWeight:800, color:C.text,
        textAlign:'center', lineHeight:'1.15', letterSpacing:'-1px' } },
        'Hast du Einzelaktien im Depot oder setzt du voll auf ETFs?'),
      h('div', { style:{ display:'flex', backgroundColor:C.cardBg, borderRadius:'18px', padding:'26px 32px' } },
        h('span', { style:{ fontSize:'26px', fontWeight:500, color:C.textSoft,
          textAlign:'center', lineHeight:'1.5' } },
          'Schreib es in die Kommentare! Wir sind gespannt auf deine Strategie.')
      ),
      h('span', { style:{ fontSize:'27px', fontWeight:700, color:C.green, textAlign:'center' } },
        'Folge @benarofinanzen fuer mehr Finanzwissen')
    ),
    h('div', { style:{ display:'flex', flexDirection:'column', gap:'6px' } },
      h('span', { style:{ fontSize:'24px', fontWeight:500, color:C.textMuted } }, 'Speichern nicht vergessen'),
      hdl()
    ),
  ]);

  // ---- RENDER ----
  const slides = [s1, s2, s3, s4, s5, s6, s7, s8];
  const outDir = '/tmp/workspace/output/carousel_2026-08-16/slides';
  fs.mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width:W, height:H, fonts });
    const resvg = new Resvg(svg, { fitTo:{ mode:'width', value:W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i+1).padStart(2,'0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i+1}/${slides.length} fertig`);
  }
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
