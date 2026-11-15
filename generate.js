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
    bg: '#001F61',
    text: '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted: '#9CA3AF',
    cardBg: 'rgba(255,255,255,0.1)',
    border: 'rgba(255,255,255,0.2)',
    green: '#10B981',
    red: '#EF4444',
  };

  const W = 1080, H = 1350;
  const PAD = 70;

  const h = (type, props, ...ch) => ({
    type, props: { ...props, children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch }
  });

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')
  ).toString('base64');

  // === REUSABLE COMPONENTS ===

  function slideRoot(bgColor, children) {
    return h('div', { style: {
      display:'flex', flexDirection:'column',
      width: W, height: H,
      padding: `${PAD}px`,
      backgroundColor: bgColor || C.bg,
      fontFamily: 'Outfit',
      position: 'relative',
    }}, ...children);
  }

  function logo() {
    return h('div', { style: { display:'flex', position:'absolute', top:`${PAD}px`, right:`${PAD}px` } },
      h('img', { src: logoB64, width: 120, height: 120, style: { borderRadius:'12px', objectFit:'cover' } })
    );
  }

  function badge(text) {
    return h('div', { style: { display:'flex', marginBottom:'18px' } },
      h('span', { style: {
        display:'flex', fontSize:'22px', fontWeight:700, letterSpacing:'3px',
        color: C.text, backgroundColor: C.cardBg,
        padding:'10px 22px', borderRadius:'12px',
      }}, text)
    );
  }

  function headline(text, size=64) {
    return h('span', { style: {
      fontSize:`${size}px`, fontWeight:800,
      color: C.text,
      lineHeight:'1.08', letterSpacing:'-1.5px', marginBottom:'6px',
    }}, text);
  }

  function subline(text) {
    return h('span', { style: {
      fontSize:'28px', fontWeight:500,
      color: C.textMuted,
      lineHeight:'1.5', marginTop:'8px',
    }}, text);
  }

  function keyLearning(text, accent) {
    return h('div', { style: {
      display:'flex', alignItems:'center', gap:'14px',
      backgroundColor: C.cardBg,
      borderRadius:'16px', padding:'22px 28px', marginTop:'auto',
    }},
      h('div', { style: {
        display:'flex', width:'6px', minHeight:'40px',
        backgroundColor: accent || C.text, borderRadius:'3px',
      }}),
      h('span', { style: {
        fontSize:'28px', fontWeight:600,
        color: C.text, lineHeight:'1.4',
      }}, text)
    );
  }

  function igHandle() {
    return h('div', { style: { display:'flex', alignItems:'center', marginTop:'12px' } },
      h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted } }, '@benarofinanzen')
    );
  }

  function visualFlex(children) {
    return h('div', { style: {
      display:'flex', flex:'1', flexDirection:'column', justifyContent:'center',
    }}, ...children);
  }

  // === SLIDE 1: HOOK ===
  // Badge: "JETZT WICHTIG" — Hook: Inflation fällt auf 2,1 % — Dein Tagesgeld verliert seinen Vorteil
  const slide1 = slideRoot(C.bg, [
    logo(),
    badge('JETZT WICHTIG'),
    headline('Inflation fällt\nauf 2,1 %', 72),
    subline('Was das jetzt für dein Geld bedeutet'),
    visualFlex([
      // Große zentrale Zahl + visuelle Darstellung
      h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'24px' }},
        // Stat Hero
        h('div', { style: {
          display:'flex', flexDirection:'column', alignItems:'center',
          backgroundColor: C.cardBg, borderRadius:'28px', padding:'40px 60px', gap:'8px',
        }},
          h('span', { style: { fontSize:'140px', fontWeight:800, color: C.green, lineHeight:'1', letterSpacing:'-4px' }}, '2,1 %'),
          h('span', { style: { fontSize:'28px', fontWeight:600, color: C.textSoft }}, 'Inflationsrate November 2026'),
        ),
        // Drei Pfeile abwärts symbolisieren fallende Inflation
        h('div', { style: { display:'flex', flexDirection:'row', gap:'32px', alignItems:'center' }},
          ...[
            { label:'2022', val:'7,9 %', col:'rgba(239,68,68,0.9)' },
            { label:'2024', val:'2,8 %', col:'rgba(251,191,36,0.9)' },
            { label:'2026', val:'2,1 %', col: C.green },
          ].map(item =>
            h('div', { style: {
              display:'flex', flexDirection:'column', alignItems:'center', gap:'8px',
              backgroundColor:'rgba(255,255,255,0.07)', borderRadius:'16px', padding:'18px 24px',
            }},
              h('span', { style: { fontSize:'34px', fontWeight:800, color: item.col }}),
              h('span', { style: { fontSize:'30px', fontWeight:800, color: item.col }}, item.val),
              h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted }}, item.label),
            )
          )
        ),
      ),
    ]),
    keyLearning('Die Inflation sinkt — aber das hat einen Haken für Sparer'),
    igHandle(),
  ]);

  // === SLIDE 2: INFLATIONS-CHART 2022–2026 ===
  // SVG Line Chart: Inflation über die Jahre
  const inflationData = [
    { year:'2022', val:7.9 },
    { year:'2023', val:5.9 },
    { year:'2024', val:2.8 },
    { year:'2025', val:2.2 },
    { year:'2026', val:2.1 },
  ];
  const svgW = 860, svgH = 360;
  const chartPadL = 20, chartPadR = 20, chartPadT = 30, chartPadB = 10;
  const chartW = svgW - chartPadL - chartPadR;
  const chartH = svgH - chartPadT - chartPadB;
  const maxVal = 9.0;
  function xPos(i) { return chartPadL + (i / (inflationData.length - 1)) * chartW; }
  function yPos(val) { return chartPadT + chartH - (val / maxVal) * chartH; }
  const linePoints = inflationData.map((d,i) => `${xPos(i)},${yPos(d.val)}`).join(' ');
  const gradientStops = `
    <defs>
      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#EF4444"/>
        <stop offset="60%" stop-color="#FBBF24"/>
        <stop offset="100%" stop-color="#10B981"/>
      </linearGradient>
      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(16,185,129,0.3)"/>
        <stop offset="100%" stop-color="rgba(16,185,129,0.0)"/>
      </linearGradient>
    </defs>
  `;
  const areaPath = `M ${xPos(0)},${svgH} L ${inflationData.map((d,i) => `${xPos(i)},${yPos(d.val)}`).join(' L ')} L ${xPos(inflationData.length-1)},${svgH} Z`;
  const inflationSvg = `<svg width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg">
    ${gradientStops}
    <path d="${areaPath}" fill="url(#areaGrad)" opacity="0.5"/>
    <polyline points="${linePoints}" fill="none" stroke="url(#lineGrad)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    ${inflationData.map((d,i) => `<circle cx="${xPos(i)}" cy="${yPos(d.val)}" r="10" fill="${i===inflationData.length-1?'#10B981':i===0?'#EF4444':'#FBBF24'}" stroke="#001F61" stroke-width="4"/>`).join('')}
  </svg>`;
  const inflationSrc = `data:image/svg+xml;base64,${Buffer.from(inflationSvg).toString('base64')}`;

  const slide2 = slideRoot(C.bg, [
    logo(),
    badge('DIE ENTWICKLUNG'),
    headline('Inflation auf\nTiefstand', 60),
    visualFlex([
      h('div', { style: { display:'flex', flexDirection:'column', gap:'12px' }},
        // Chart mit Labels
        h('div', { style: { display:'flex', flexDirection:'column', gap:'0px' }},
          h('img', { src: inflationSrc, width: svgW, height: svgH, style:{ objectFit:'contain', maxWidth:'100%' }}),
          // X-Achsen-Labels
          h('div', { style: { display:'flex', flexDirection:'row', justifyContent:'space-between', paddingLeft:'20px', paddingRight:'20px', marginTop:'8px' }},
            ...inflationData.map((d,i) =>
              h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'4px' }},
                h('span', { style: { fontSize:'30px', fontWeight:800, color: i===0?C.red:i===inflationData.length-1?C.green:'#FBBF24' }}, d.val.toFixed(1)+' %'),
                h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted }}, d.year),
              )
            )
          ),
        ),
      ),
    ]),
    keyLearning('In 4 Jahren: Von 7,9 % auf 2,1 % — das klingt gut. Aber es gibt einen Haken.'),
    igHandle(),
  ]);

  // === SLIDE 3: DAS PROBLEM — TAGESGELD FÄLLT AUCH ===
  const slide3 = slideRoot(C.bg, [
    logo(),
    badge('DAS PROBLEM'),
    headline('Tagesgeld-Zinsen\nfolgen der Inflation', 56),
    subline('Was die EZB senkt, senkt auch dein Zins'),
    visualFlex([
      h('div', { style: { display:'flex', flexDirection:'column', gap:'18px' }},
        // Vergleich: Dann vs. Jetzt
        h('div', { style: { display:'flex', flexDirection:'row', gap:'20px' }},
          // Früher
          h('div', { style: {
            display:'flex', flex:'1', flexDirection:'column', gap:'12px',
            backgroundColor:'rgba(239,68,68,0.1)', borderRadius:'20px', padding:'28px',
            border:'2px solid rgba(239,68,68,0.3)',
          }},
            h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color: C.red }}, 'DAMALS 2024'),
            h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(239,68,68,0.3)', borderRadius:'2px' }}),
            h('span', { style: { fontSize:'56px', fontWeight:800, color: C.text, lineHeight:'1' }}, '4,25 %'),
            h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textSoft }}, 'Tagesgeld p.a.'),
            h('span', { style: { fontSize:'22px', fontWeight:400, color: C.textMuted }}, 'EZB-Zins: 4,5 %'),
          ),
          // Pfeil
          h('div', { style: { display:'flex', alignItems:'center', justifyContent:'center', width:'40px' }},
            h('span', { style: { fontSize:'40px', fontWeight:800, color: C.textMuted }}, '>')
          ),
          // Heute
          h('div', { style: {
            display:'flex', flex:'1', flexDirection:'column', gap:'12px',
            backgroundColor: C.cardBg, borderRadius:'20px', padding:'28px',
            border:'2px solid rgba(255,255,255,0.15)',
          }},
            h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color: C.textMuted }}, 'HEUTE 2026'),
            h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor: C.border, borderRadius:'2px' }}),
            h('span', { style: { fontSize:'56px', fontWeight:800, color: C.text, lineHeight:'1' }}, '2,8 %'),
            h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textSoft }}, 'Tagesgeld p.a.'),
            h('span', { style: { fontSize:'22px', fontWeight:400, color: C.textMuted }}, 'EZB-Zins: 2,5 %'),
          ),
        ),
        // Info-Box
        h('div', { style: {
          display:'flex', alignItems:'center', gap:'16px',
          backgroundColor:'rgba(239,68,68,0.08)', borderRadius:'16px', padding:'20px 24px',
        }},
          h('div', { style: { display:'flex', width:'12px', height:'12px', borderRadius:'6px', minWidth:'12px', backgroundColor: C.red }}),
          h('span', { style: { fontSize:'26px', fontWeight:600, color: C.textSoft, lineHeight:'1.4' }}, 'Rückgang um 1,45 % — das sind bei 50.000 EUR: 725 EUR weniger pro Jahr'),
        ),
      ),
    ]),
    keyLearning('Weniger Inflation = weniger EZB-Zins = weniger Tagesgeld-Rendite', C.red),
    igHandle(),
  ]);

  // === SLIDE 4: KONTRAST — TAGESGELD VS. ETF ===
  const slide4 = slideRoot(C.bg, [
    logo(),
    badge('ERWARTUNG VS. REALITÄT'),
    headline('Was viele denken\nvs. was stimmt', 56),
    visualFlex([
      h('div', { style: { display:'flex', gap:'18px' }},
        // Links: Erwartung
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'16px',
          backgroundColor:'rgba(255,255,255,0.07)', borderRadius:'24px', padding:'32px',
        }},
          h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color: C.textMuted }}, 'VIELE DENKEN'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor: C.border, borderRadius:'2px' }}),
          h('span', { style: { fontSize:'28px', fontWeight:600, color: C.textSoft, lineHeight:'1.5' }}, '"Tagesgeld ist sicher und reicht als Investition"'),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'10px', marginTop:'8px' }},
            ...[
              { icon:'x', text:'Zinsen fallen weiter', neg:true },
              { icon:'x', text:'Kaufkraft sinkt trotzdem', neg:true },
              { icon:'x', text:'Kein Vermögensaufbau', neg:true },
            ].map(item => h('div', { style: { display:'flex', alignItems:'center', gap:'12px' }},
              h('div', { style: { display:'flex', width:'28px', height:'28px', borderRadius:'8px', backgroundColor:'rgba(239,68,68,0.15)', alignItems:'center', justifyContent:'center', minWidth:'28px' }},
                h('span', { style: { fontSize:'18px', fontWeight:800, color: C.red }}, '—')
              ),
              h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted, lineHeight:'1.3' }}, item.text)
            ))
          ),
        ),
        // Rechts: Realität
        h('div', { style: {
          display:'flex', flex:'1', flexDirection:'column', gap:'16px',
          backgroundColor:'rgba(16,185,129,0.1)', borderRadius:'24px', padding:'32px',
          border:'2px solid rgba(16,185,129,0.3)',
        }},
          h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color: C.green }}, 'DIE REALITÄT'),
          h('div', { style: { display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(16,185,129,0.3)', borderRadius:'2px' }}),
          h('span', { style: { fontSize:'28px', fontWeight:600, color: C.textSoft, lineHeight:'1.5' }}, 'Tagesgeld als Puffer — ETF für echten Aufbau'),
          h('div', { style: { display:'flex', flexDirection:'column', gap:'10px', marginTop:'8px' }},
            ...[
              'Tagesgeld: Notgroschen (3 Monate)',
              'ETF-Sparplan: 7 % p.a. langfristig',
              'Altersvorsorge-Depot ab 2027',
            ].map(text => h('div', { style: { display:'flex', alignItems:'center', gap:'12px' }},
              h('div', { style: { display:'flex', width:'28px', height:'28px', borderRadius:'8px', backgroundColor:'rgba(16,185,129,0.2)', alignItems:'center', justifyContent:'center', minWidth:'28px' }},
                h('span', { style: { fontSize:'18px', fontWeight:800, color: C.green }}, '+')
              ),
              h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textSoft, lineHeight:'1.3' }}, text)
            ))
          ),
        ),
      ),
    ]),
    keyLearning('Tagesgeld ist kein Investment — es ist ein Puffer für Notfälle'),
    igHandle(),
  ]);

  // === SLIDE 5: 3-TÖPFE-STRATEGIE ===
  const slide5 = slideRoot(C.bg, [
    logo(),
    badge('DIE STRATEGIE'),
    headline('So teilst du dein\nGeld jetzt auf', 60),
    subline('Das 3-Töpfe-Modell bei fallender Inflation'),
    visualFlex([
      h('div', { style: { display:'flex', flexDirection:'column', gap:'18px' }},
        ...[
          {
            num: '1', label: 'GIROKONTO', title: 'Laufende Kosten', desc: 'Miete, Lebensmittel, Rechnungen', pct: 100, barW: '100%', col: C.textMuted,
          },
          {
            num: '2', label: 'TAGESGELD', title: 'Notgroschen: 3 Monate', desc: '2,8 % p.a. — sicher & verfügbar', pct: 25, barW: '25%', col: '#FBBF24',
          },
          {
            num: '3', label: 'ETF-DEPOT', title: 'Langfristiger Aufbau', desc: '~7 % p.a. — für 10+ Jahre', pct: 20, barW: '20%', col: C.green,
          },
        ].map(item =>
          h('div', { style: {
            display:'flex', flexDirection:'column', gap:'10px',
            backgroundColor: C.cardBg, borderRadius:'20px', padding:'24px 28px',
          }},
            h('div', { style: { display:'flex', alignItems:'center', gap:'18px' }},
              h('div', { style: {
                display:'flex', width:'52px', height:'52px', borderRadius:'14px',
                backgroundColor:'rgba(255,255,255,0.12)', alignItems:'center', justifyContent:'center', minWidth:'52px',
              }},
                h('span', { style: { fontSize:'28px', fontWeight:800, color: item.col }}, item.num)
              ),
              h('div', { style: { display:'flex', flexDirection:'column', gap:'2px' }},
                h('span', { style: { fontSize:'22px', fontWeight:700, letterSpacing:'2px', color: item.col }}, item.label),
                h('span', { style: { fontSize:'28px', fontWeight:700, color: C.text }}, item.title),
                h('span', { style: { fontSize:'22px', fontWeight:500, color: C.textMuted }}, item.desc),
              ),
            ),
            h('div', { style: { display:'flex', height:'6px', backgroundColor: C.border, borderRadius:'3px', overflow:'hidden' }},
              h('div', { style: { display:'flex', width: item.barW, height:'6px', backgroundColor: item.col, borderRadius:'3px' }})
            ),
          )
        ),
      ),
    ]),
    keyLearning('Töpfe trennen: Sicherheit trennen von Rendite — beides hat seinen Platz'),
    igHandle(),
  ]);

  // === SLIDE 6: RECHENBEISPIEL — 10-JAHRES-VERGLEICH ===
  const compSvgW = 860, compSvgH = 320;
  const bars = [
    { label: 'Tagesgeld\n2,8 %', val: 13107, maxVal_: 20000, col:'rgba(255,255,255,0.4)' },
    { label: 'ETF-Sparplan\n~7 % p.a.', val: 20972, maxVal_: 20000, col: C.green },
    { label: 'Altersvorsorge-\nDepot ab 2027', val: 23132, maxVal_: 20000, col:'#FBBF24' },
  ];
  const maxBar = 25000;
  const barW2 = 220;
  const barGap = (compSvgW - bars.length * barW2) / (bars.length + 1);

  const compSvg = `<svg width="${compSvgW}" height="${compSvgH}" viewBox="0 0 ${compSvgW} ${compSvgH}" xmlns="http://www.w3.org/2000/svg">
    ${bars.map((b,i) => {
      const x = barGap + i*(barW2 + barGap);
      const barHeight = (b.val / maxBar) * (compSvgH - 40);
      const y = compSvgH - 10 - barHeight;
      return `<rect x="${x}" y="${y}" width="${barW2}" height="${barHeight}" rx="12" fill="${b.col}" opacity="0.9"/>`;
    }).join('')}
  </svg>`;
  const compSrc = `data:image/svg+xml;base64,${Buffer.from(compSvg).toString('base64')}`;

  const slide6 = slideRoot(C.bg, [
    logo(),
    badge('DAS RECHNET SICH'),
    headline('100 EUR/Monat\nüber 10 Jahre', 60),
    subline('Was aus deinem Geld wirklich wird'),
    visualFlex([
      h('div', { style: { display:'flex', flexDirection:'column', gap:'0px' }},
        h('div', { style: { display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'flex-end', paddingBottom:'0px' }},
          ...bars.map((b,i) => {
            const barHeight = Math.round((b.val / maxBar) * 300);
            return h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'8px' }},
              h('span', { style: { fontSize:'30px', fontWeight:800, color: b.col }},
                `${(b.val/1000).toFixed(1)} T`
              ),
              h('div', { style: {
                display:'flex', width:'200px', height:`${barHeight}px`,
                backgroundColor: b.col, borderRadius:'14px 14px 0 0',
              }}),
            );
          })
        ),
        h('div', { style: { display:'flex', height:'3px', backgroundColor: C.border, borderRadius:'2px', marginBottom:'12px' }}),
        h('div', { style: { display:'flex', flexDirection:'row', justifyContent:'space-around' }},
          ...bars.map(b => h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', maxWidth:'200px' }},
            h('span', { style: { fontSize:'22px', fontWeight:700, color: b.col, textAlign:'center' }}, b.label.replace('\n', ' ')),
          ))
        ),
      ),
    ]),
    keyLearning('ETF schlägt Tagesgeld nach 10 Jahren um rund 7.865 EUR — mit gleichem Einsatz'),
    igHandle(),
  ]);

  // === SLIDE 7: 4 LEARNINGS ===
  const slide7 = slideRoot(C.bg, [
    logo(),
    badge('DEINE TAKEAWAYS'),
    headline('Was du jetzt\nwissen musst', 60),
    visualFlex([
      h('div', { style: { display:'flex', flexDirection:'column', gap:'16px' }},
        ...[
          { num:'01', text:'Tagesgeld ist für den Notgroschen — nicht für Vermögensaufbau', pct:25, col: C.text },
          { num:'02', text:'ETF-Sparplan läuft automatisch weiter — auch wenn Zinsen fallen', pct:50, col: C.text },
          { num:'03', text:'Altersvorsorge-Depot ab 01.01.2027: bis zu 540 EUR staatliche Förderung', pct:75, col: C.text },
          { num:'04', text:'Jetzt handeln: Sparplan einrichten dauert 10 Minuten', pct:100, col: C.green },
        ].map(l =>
          h('div', { style: {
            display:'flex', flexDirection:'column', gap:'10px',
            padding:'20px 24px', backgroundColor: C.cardBg, borderRadius:'18px',
          }},
            h('div', { style: { display:'flex', alignItems:'center', gap:'18px' }},
              h('span', { style: { fontSize:'36px', fontWeight:800, color: l.pct===100 ? C.green : C.text, minWidth:'56px' }}, l.num),
              h('span', { style: { fontSize:'26px', fontWeight:600, color: C.textSoft, lineHeight:'1.3' }}, l.text),
            ),
            h('div', { style: { display:'flex', height:'6px', backgroundColor: C.border, borderRadius:'3px', overflow:'hidden' }},
              h('div', { style: { display:'flex', width:`${l.pct}%`, height:'6px', backgroundColor: l.pct===100 ? C.green : C.text, borderRadius:'3px' }})
            ),
          )
        ),
      ),
    ]),
    keyLearning('Fallende Inflation ist eine Chance — wenn du richtig reagierst'),
    igHandle(),
  ]);

  // === SLIDE 8: CTA ===
  const slide8 = slideRoot(C.bg, [
    logo(),
    badge('DEIN NÄCHSTER SCHRITT'),
    visualFlex([
      h('div', { style: { display:'flex', flexDirection:'column', alignItems:'center', gap:'32px' }},
        h('div', { style: {
          display:'flex', width:'160px', height:'160px',
          backgroundColor: C.cardBg, borderRadius:'28px',
          alignItems:'center', justifyContent:'center',
        }},
          h('img', { src: logoB64, width:120, height:120, style:{ borderRadius:'12px', objectFit:'cover' }}),
        ),
        h('span', { style: {
          fontSize:'52px', fontWeight:800, color: C.text,
          textAlign:'center', lineHeight:'1.2', letterSpacing:'-1px',
        }}, 'Hast du dein Geld\nnoch richtig aufgeteilt?'),
        h('span', { style: {
          fontSize:'30px', fontWeight:500, color: C.textMuted,
          textAlign:'center', lineHeight:'1.5',
        }}, 'Schreib uns, wenn du Fragen hast — wir helfen dir beim nächsten Schritt.'),
        h('div', { style: {
          display:'flex', flexDirection:'column', alignItems:'center', gap:'12px',
          backgroundColor: C.cardBg, borderRadius:'20px', padding:'24px 40px',
        }},
          h('span', { style: { fontSize:'28px', fontWeight:700, color: C.green }}, 'Speichern, damit du es nicht vergisst'),
          h('span', { style: { fontSize:'24px', fontWeight:500, color: C.textMuted }}, 'Folge @benarofinanzen für mehr'),
        ),
      ),
    ]),
    igHandle(),
  ]);

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  const outputDir = path.join(__dirname, 'output', `carousel_2026-11-15`, 'slides');

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outputDir, `slide-${String(i+1).padStart(2,'0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i+1}/${slides.length} generiert: ${pngPath}`);
  }
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
