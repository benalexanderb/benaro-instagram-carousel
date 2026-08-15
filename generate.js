'use strict';
const fs   = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default;
  const { Resvg } = require('@resvg/resvg-js');

  // Fonts: latin + latin-ext fuer Umlaut-Rendering
  const fontDir = '/tmp/workspace/node_modules/@fontsource/outfit/files';
  const fonts = [400,500,600,700,800].flatMap(w => [
    { name:'Outfit', weight:w, style:'normal',
      data: fs.readFileSync(`${fontDir}/outfit-latin-${w}-normal.woff`) },
    { name:'Outfit', weight:w, style:'normal',
      data: fs.readFileSync(`${fontDir}/outfit-latin-ext-${w}-normal.woff`) },
  ]);

  // Benaro Logo als Base64
  const logoB64 = 'data:image/jpeg;base64,' +
    fs.readFileSync('/tmp/workspace/skills/instagram-carousel-skill/templates/benaro-logo.jpg')
      .toString('base64');

  // Benaro Finanzen Farbpalette — ALLE Slides einheitlich
  const C = {
    bg:       '#001F61',
    text:     '#FFFFFF',
    textSoft: '#E5E7EB',
    textMuted:'#9CA3AF',
    cardBg:   'rgba(255,255,255,0.10)',
    border:   'rgba(255,255,255,0.20)',
    green:    '#10B981',
    red:      '#EF4444',
  };

  const W = 1080, H = 1350;

  const h = (type, props, ...ch) => ({
    type,
    props: {
      ...props,
      children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch,
    },
  });

  const outDir = '/tmp/workspace/output/carousel_2026-08-15/slides';
  fs.mkdirSync(outDir, { recursive: true });

  // ── WIEDERVERWENDBARE KOMPONENTEN ─────────────────────────────────────────

  function mkHeader(badgeText) {
    return h('div', {
      style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px' },
    },
      h('span', {
        style: { display:'flex', fontSize:'21px', fontWeight:700, letterSpacing:'3px',
          color: C.text, backgroundColor: C.cardBg, padding:'10px 22px', borderRadius:'12px' },
      }, badgeText),
      h('img', { src: logoB64, width:110, height:110, style:{ objectFit:'cover', borderRadius:'12px' } })
    );
  }

  function mkHeadline(text, size) {
    return h('span', {
      style: { display:'flex', fontSize:`${size||64}px`, fontWeight:800, color: C.text,
        lineHeight:'1.08', letterSpacing:'-1.5px', marginBottom:'4px', marginTop:'14px' },
    }, text);
  }

  function mkSubline(text) {
    return h('span', {
      style: { display:'flex', fontSize:'27px', fontWeight:500, color: C.textMuted,
        lineHeight:'1.5', marginTop:'8px' },
    }, text);
  }

  function mkKeyLearning(text, accent) {
    return h('div', {
      style: { display:'flex', alignItems:'center', gap:'14px', backgroundColor: C.cardBg,
        borderRadius:'16px', padding:'20px 28px', marginTop:'10px' },
    },
      h('div', { style:{ display:'flex', width:'6px', minHeight:'38px',
        backgroundColor: accent || C.text, borderRadius:'3px' }}),
      h('span', { style:{ display:'flex', fontSize:'25px', fontWeight:600, color: C.text, lineHeight:'1.4' }}, text)
    );
  }

  function mkHandle() {
    return h('div', { style:{ display:'flex', alignItems:'center', marginTop:'8px' }},
      h('span', { style:{ display:'flex', fontSize:'23px', fontWeight:500, color: C.textMuted }}, '@benarofinanzen')
    );
  }

  // ── SLIDE 1: HOOK — Stat Hero ────────────────────────────────────────────
  // 73% der Deutschen haben kein Wertpapierdepot
  const slide1 = h('div', {
    style:{ display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit' },
  },
    mkHeader('ACHTUNG'),
    mkHeadline('Du wartest auf den', 60),
    mkHeadline('perfekten Einstieg.', 60),
    mkSubline('Das kostet dich Tausende Euro Rendite.'),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'18px' }},
      h('span', { style:{ display:'flex', fontSize:'158px', fontWeight:800, color: C.green, lineHeight:'1.0', letterSpacing:'-4px' }}, '73%'),
      h('div', { style:{ display:'flex', backgroundColor: C.cardBg, borderRadius:'18px', padding:'20px 36px' }},
        h('span', { style:{ display:'flex', fontSize:'28px', fontWeight:600, color: C.textSoft, textAlign:'center', lineHeight:'1.4' }},
          'der Deutschen haben kein Depot und warten auf den "richtigen Zeitpunkt"')
      ),
      h('div', { style:{ display:'flex', gap:'14px', marginTop:'6px' }},
        h('div', { style:{ display:'flex', backgroundColor:'rgba(239,68,68,0.12)', borderRadius:'14px', padding:'14px 22px', alignItems:'center', gap:'10px' }},
          h('div', { style:{ display:'flex', width:'12px', height:'12px', borderRadius:'6px', backgroundColor: C.red }}),
          h('span', { style:{ display:'flex', fontSize:'24px', fontWeight:600, color: C.red }}, 'Warten = Rendite verlieren')
        ),
        h('div', { style:{ display:'flex', backgroundColor:'rgba(16,185,129,0.12)', borderRadius:'14px', padding:'14px 22px', alignItems:'center', gap:'10px' }},
          h('div', { style:{ display:'flex', width:'12px', height:'12px', borderRadius:'6px', backgroundColor: C.green }}),
          h('span', { style:{ display:'flex', fontSize:'24px', fontWeight:600, color: C.green }}, 'Jetzt starten = Vorsprung')
        )
      )
    ),
    mkKeyLearning('Der perfekte Einstiegszeitpunkt existiert nicht. Der richtige Zeitpunkt ist immer jetzt.'),
    mkHandle()
  );

  // ── SLIDE 2: KONTEXT — Trendlinie Marktentwicklung ───────────────────────
  const trendSvg = `<svg width="880" height="330" viewBox="0 0 880 330" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fillG" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#10B981;stop-opacity:0.28"/>
      <stop offset="100%" style="stop-color:#10B981;stop-opacity:0.02"/>
    </linearGradient>
  </defs>
  <path d="M 40 295 C 80 288, 110 282, 145 265 C 175 248, 180 268, 215 242 C 248 216, 255 228, 290 192 C 325 156, 318 170, 358 138 C 398 106, 392 120, 435 90 C 478 60, 485 78, 528 52 C 571 26, 580 38, 622 22 C 664 6, 695 14, 840 4"
    fill="none" stroke="#10B981" stroke-width="5.5" stroke-linecap="round"/>
  <path d="M 40 295 C 80 288, 110 282, 145 265 C 175 248, 180 268, 215 242 C 248 216, 255 228, 290 192 C 325 156, 318 170, 358 138 C 398 106, 392 120, 435 90 C 478 60, 485 78, 528 52 C 571 26, 580 38, 622 22 C 664 6, 695 14, 840 4 L 840 320 L 40 320 Z"
    fill="url(#fillG)"/>
  <circle cx="215" cy="242" r="9" fill="#EF4444"/>
  <circle cx="358" cy="138" r="9" fill="#EF4444"/>
  <circle cx="528" cy="52" r="9" fill="#EF4444"/>
  <circle cx="840" cy="4" r="11" fill="#10B981"/>
  <line x1="40" y1="320" x2="840" y2="320" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
  <line x1="40" y1="4" x2="40" y2="320" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
  </svg>`;
  const trendSrc = `data:image/svg+xml;base64,${Buffer.from(trendSvg).toString('base64')}`;

  const slide2 = h('div', {
    style:{ display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit' },
  },
    mkHeader('DER MARKT'),
    mkHeadline('Korrekturen kommen.', 56),
    mkHeadline('Danach geht es hoch.', 56),
    mkSubline('Historisches Muster: Der Markt steigt langfristig immer.'),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'10px' }},
      h('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:'4px' }},
        h('span', { style:{ display:'flex', fontSize:'20px', fontWeight:600, color: C.textMuted }}, '2006'),
        h('span', { style:{ display:'flex', fontSize:'20px', fontWeight:600, color: C.textMuted }}, '2016'),
        h('span', { style:{ display:'flex', fontSize:'20px', fontWeight:700, color: C.green }}, '2026')
      ),
      h('img', { src: trendSrc, width:880, height:290, style:{ objectFit:'contain', maxWidth:'100%' }}),
      h('div', { style:{ display:'flex', gap:'22px', marginTop:'10px' }},
        h('div', { style:{ display:'flex', alignItems:'center', gap:'8px' }},
          h('div', { style:{ display:'flex', width:'28px', height:'4px', backgroundColor: C.green, borderRadius:'2px' }}),
          h('span', { style:{ display:'flex', fontSize:'22px', fontWeight:500, color: C.textSoft }}, 'Marktentwicklung')
        ),
        h('div', { style:{ display:'flex', alignItems:'center', gap:'8px' }},
          h('div', { style:{ display:'flex', width:'12px', height:'12px', borderRadius:'6px', backgroundColor: C.red }}),
          h('span', { style:{ display:'flex', fontSize:'22px', fontWeight:500, color: C.textSoft }}, 'Korrekturen')
        ),
        h('div', { style:{ display:'flex', alignItems:'center', gap:'8px' }},
          h('div', { style:{ display:'flex', width:'12px', height:'12px', borderRadius:'6px', backgroundColor: C.green }}),
          h('span', { style:{ display:'flex', fontSize:'22px', fontWeight:500, color: C.textSoft }}, 'Allzeithoch')
        )
      )
    ),
    mkKeyLearning('Jede Korrektur, die nach "falschem Einstieg" aussah, war im Rückblick eine Chance.', C.green),
    mkHandle()
  );

  // ── SLIDE 3: PROBLEM — Was kostet 12 Monate Warten? ──────────────────────
  const slide3 = h('div', {
    style:{ display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit' },
  },
    mkHeader('DAS PROBLEM'),
    mkHeadline('1 Jahr Zögern:', 60),
    mkHeadline('Was kostet dich das?', 60),
    mkSubline('Annahme: 300 EUR/Monat, 7 % p.a. Durchschnittsrendite, 20 Jahre'),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' }},
      h('div', { style:{ display:'flex', gap:'16px' }},
        h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', gap:'12px',
          backgroundColor:'rgba(16,185,129,0.12)', borderRadius:'20px', padding:'28px',
          border:'2px solid rgba(16,185,129,0.30)' }},
          h('span', { style:{ display:'flex', fontSize:'20px', fontWeight:700, letterSpacing:'2px', color: C.green }}, 'SOFORT GESTARTET'),
          h('div', { style:{ display:'flex', height:'2px', backgroundColor:'rgba(16,185,129,0.30)', borderRadius:'1px' }}),
          h('span', { style:{ display:'flex', fontSize:'52px', fontWeight:800, color: C.green, lineHeight:'1.0' }}, '156.000'),
          h('span', { style:{ display:'flex', fontSize:'26px', fontWeight:500, color: C.textSoft }}, 'EUR nach 20 Jahren'),
          h('span', { style:{ display:'flex', fontSize:'22px', fontWeight:400, color: C.textMuted }}, '300 EUR x 240 Monate')
        ),
        h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', gap:'12px',
          backgroundColor:'rgba(239,68,68,0.10)', borderRadius:'20px', padding:'28px',
          border:'2px solid rgba(239,68,68,0.25)' }},
          h('span', { style:{ display:'flex', fontSize:'20px', fontWeight:700, letterSpacing:'2px', color: C.red }}, '12 MONATE GEWARTET'),
          h('div', { style:{ display:'flex', height:'2px', backgroundColor:'rgba(239,68,68,0.25)', borderRadius:'1px' }}),
          h('span', { style:{ display:'flex', fontSize:'52px', fontWeight:800, color: C.red, lineHeight:'1.0' }}, '144.000'),
          h('span', { style:{ display:'flex', fontSize:'26px', fontWeight:500, color: C.textSoft }}, 'EUR nach 20 Jahren'),
          h('span', { style:{ display:'flex', fontSize:'22px', fontWeight:400, color: C.textMuted }}, '300 EUR x 228 Monate')
        )
      ),
      h('div', { style:{ display:'flex', justifyContent:'center', alignItems:'center', gap:'16px',
        backgroundColor: C.cardBg, borderRadius:'18px', padding:'22px 28px' }},
        h('span', { style:{ display:'flex', fontSize:'34px', fontWeight:800, color: C.red }}, '-12.000 EUR'),
        h('span', { style:{ display:'flex', fontSize:'28px', fontWeight:500, color: C.textSoft }}, 'durch 1 Jahr Warten')
      )
    ),
    mkKeyLearning('Nur 12 Monate Zögern kosten bei 300 EUR/Monat rund 12.000 EUR entgangene Rendite.', C.red),
    mkHandle()
  );

  // ── SLIDE 4: WENDEPUNKT — Erwartung vs. Realität ──────────────────────────
  const slide4 = h('div', {
    style:{ display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit' },
  },
    mkHeader('WENDEPUNKT'),
    mkHeadline('Was Anleger glauben —', 52),
    mkHeadline('und was wirklich zählt', 52),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' }},
      h('div', { style:{ display:'flex', gap:'14px' }},
        h('div', { style:{ display:'flex', flex:'1', flexDirection:'column',
          backgroundColor: C.cardBg, borderRadius:'20px', padding:'26px', gap:'14px',
          border:'1px solid rgba(255,255,255,0.15)' }},
          h('span', { style:{ display:'flex', fontSize:'19px', fontWeight:700, letterSpacing:'3px', color: C.textMuted }}, 'ERWARTUNG'),
          h('div', { style:{ display:'flex', width:'100%', height:'3px', backgroundColor: C.border, borderRadius:'2px' }}),
          h('span', { style:{ display:'flex', fontSize:'25px', fontWeight:600, color: C.textSoft, lineHeight:'1.5' }},
            '"Ich warte auf einen Kursrückgang und steige dann günstiger ein."'),
          h('div', { style:{ display:'flex', backgroundColor:'rgba(239,68,68,0.10)', borderRadius:'12px', padding:'12px 16px' }},
            h('span', { style:{ display:'flex', fontSize:'22px', fontWeight:500, color: C.red }}, 'Ergebnis: Jahrelanges Warten')
          )
        ),
        h('div', { style:{ display:'flex', flex:'1', flexDirection:'column',
          backgroundColor:'rgba(255,255,255,0.96)', borderRadius:'20px', padding:'26px', gap:'14px' }},
          h('span', { style:{ display:'flex', fontSize:'19px', fontWeight:700, letterSpacing:'3px', color:'rgba(0,31,97,0.50)' }}, 'REALITÄT'),
          h('div', { style:{ display:'flex', width:'100%', height:'3px', backgroundColor:'rgba(0,31,97,0.12)', borderRadius:'2px' }}),
          h('span', { style:{ display:'flex', fontSize:'25px', fontWeight:600, color:'#001F61', lineHeight:'1.5' }},
            'Wer monatlich investiert, schlägt Markttimer in 80-90 % aller Zeiträume.'),
          h('div', { style:{ display:'flex', backgroundColor:'rgba(16,185,129,0.15)', borderRadius:'12px', padding:'12px 16px' }},
            h('span', { style:{ display:'flex', fontSize:'22px', fontWeight:600, color:'#059669' }}, 'Sparplan gewinnt')
          )
        )
      ),
      h('div', { style:{ display:'flex', flexDirection:'column', alignItems:'center', gap:'8px',
        backgroundColor:'rgba(16,185,129,0.10)', borderRadius:'16px', padding:'22px 28px',
        border:'1px solid rgba(16,185,129,0.25)' }},
        h('span', { style:{ display:'flex', fontSize:'26px', fontWeight:700, color: C.green }}, 'Faustregel der Profis'),
        h('span', { style:{ display:'flex', fontSize:'24px', fontWeight:500, color: C.textSoft, textAlign:'center', lineHeight:'1.4' }},
          'Regelmäßiges Investieren schlägt manuelles Timing in fast allen Szenarien.')
      )
    ),
    mkKeyLearning('Studie Vanguard: "Time in the Market" schlägt "Timing the Market" bei 92 % der Fälle.', C.green),
    mkHandle()
  );

  // ── SLIDE 5: BEWEIS — 3 Szenarien, 20 Jahre ──────────────────────────────
  const slide5 = h('div', {
    style:{ display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit' },
  },
    mkHeader('DER BEWEIS'),
    mkHeadline('3 Anleger. 20 Jahre.', 58),
    mkHeadline('200 EUR/Monat.', 58),
    mkSubline('Wer hatte nach 20 Jahren am meisten?'),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'16px' }},
      h('div', { style:{ display:'flex', flexDirection:'column', gap:'16px',
        backgroundColor: C.cardBg, borderRadius:'20px', padding:'22px 26px' }},
        h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' }},
          h('div', { style:{ display:'flex', flexDirection:'column', gap:'4px' }},
            h('span', { style:{ display:'flex', fontSize:'21px', fontWeight:700, letterSpacing:'2px', color: C.green }}, 'ANNA — SOFORTIGER START'),
            h('span', { style:{ display:'flex', fontSize:'22px', fontWeight:400, color: C.textMuted }}, 'Begann ohne zu zögern')
          ),
          h('span', { style:{ display:'flex', fontSize:'42px', fontWeight:800, color: C.green }}, '104.000 EUR')
        ),
        h('div', { style:{ display:'flex', height:'10px', backgroundColor: C.border, borderRadius:'5px', overflow:'hidden' }},
          h('div', { style:{ display:'flex', width:'100%', height:'10px', backgroundColor: C.green, borderRadius:'5px' }})
        )
      ),
      h('div', { style:{ display:'flex', flexDirection:'column', gap:'16px',
        backgroundColor: C.cardBg, borderRadius:'20px', padding:'22px 26px' }},
        h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' }},
          h('div', { style:{ display:'flex', flexDirection:'column', gap:'4px' }},
            h('span', { style:{ display:'flex', fontSize:'21px', fontWeight:700, letterSpacing:'2px', color: C.textSoft }}, 'BERND — 2 JAHRE GEWARTET'),
            h('span', { style:{ display:'flex', fontSize:'22px', fontWeight:400, color: C.textMuted }}, 'Wollte günstigeren Einstieg')
          ),
          h('span', { style:{ display:'flex', fontSize:'42px', fontWeight:800, color: C.textSoft }}, '88.000 EUR')
        ),
        h('div', { style:{ display:'flex', height:'10px', backgroundColor: C.border, borderRadius:'5px', overflow:'hidden' }},
          h('div', { style:{ display:'flex', width:'85%', height:'10px', backgroundColor: C.textSoft, borderRadius:'5px' }})
        )
      ),
      h('div', { style:{ display:'flex', flexDirection:'column', gap:'16px',
        backgroundColor:'rgba(239,68,68,0.10)', borderRadius:'20px', padding:'22px 26px',
        border:'1px solid rgba(239,68,68,0.20)' }},
        h('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' }},
          h('div', { style:{ display:'flex', flexDirection:'column', gap:'4px' }},
            h('span', { style:{ display:'flex', fontSize:'21px', fontWeight:700, letterSpacing:'2px', color: C.red }}, 'CLEMENS — TIMING-VERSUCH'),
            h('span', { style:{ display:'flex', fontSize:'22px', fontWeight:400, color: C.textMuted }}, 'Kaufte nur "bei Korrekturen"')
          ),
          h('span', { style:{ display:'flex', fontSize:'42px', fontWeight:800, color: C.red }}, '71.000 EUR')
        ),
        h('div', { style:{ display:'flex', height:'10px', backgroundColor:'rgba(239,68,68,0.20)', borderRadius:'5px', overflow:'hidden' }},
          h('div', { style:{ display:'flex', width:'68%', height:'10px', backgroundColor: C.red, borderRadius:'5px' }})
        )
      )
    ),
    mkKeyLearning('Annas Vorteil: +33.000 EUR mehr als Clemens — allein durch konsequentes monatliches Investieren.', C.green),
    mkHandle()
  );

  // ── SLIDE 6: PRINZIP — Zeit im Markt ─────────────────────────────────────
  const calSvg = `<svg width="880" height="300" viewBox="0 0 880 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="barG" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color:#10B981;stop-opacity:0.35"/>
      <stop offset="100%" style="stop-color:#10B981;stop-opacity:1"/>
    </linearGradient>
  </defs>
  <rect x="38" y="38" width="90" height="90" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
  <rect x="148" y="38" width="90" height="90" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
  <rect x="258" y="38" width="90" height="90" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
  <rect x="368" y="38" width="90" height="90" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
  <rect x="478" y="38" width="90" height="90" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
  <rect x="588" y="38" width="90" height="90" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
  <rect x="698" y="38" width="90" height="90" rx="14" fill="rgba(16,185,129,0.22)" stroke="rgba(16,185,129,0.45)" stroke-width="2"/>
  <rect x="58" y="228" width="56" height="46" rx="8" fill="url(#barG)"/>
  <rect x="168" y="208" width="56" height="66" rx="8" fill="url(#barG)"/>
  <rect x="278" y="182" width="56" height="92" rx="8" fill="url(#barG)"/>
  <rect x="388" y="155" width="56" height="119" rx="8" fill="url(#barG)"/>
  <rect x="498" y="124" width="56" height="150" rx="8" fill="url(#barG)"/>
  <rect x="608" y="90" width="56" height="184" rx="8" fill="url(#barG)"/>
  <rect x="718" y="50" width="56" height="224" rx="8" fill="#10B981"/>
  <line x1="38" y1="280" x2="842" y2="280" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
  </svg>`;
  const calSrc = `data:image/svg+xml;base64,${Buffer.from(calSvg).toString('base64')}`;

  const slide6 = h('div', {
    style:{ display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit' },
  },
    mkHeader('DAS PRINZIP'),
    mkHeadline('"Time in the Market"', 56),
    mkHeadline('schlaegt "Timing the Market"', 48),
    mkSubline('Jeder investierte Monat laesst den Zinseszins arbeiten.'),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'10px' }},
      h('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:'4px' }},
        h('span', { style:{ display:'flex', fontSize:'19px', fontWeight:600, color: C.textMuted }}, 'Monat 1'),
        h('span', { style:{ display:'flex', fontSize:'19px', fontWeight:600, color: C.textMuted }}, 'Monat 120'),
        h('span', { style:{ display:'flex', fontSize:'19px', fontWeight:700, color: C.green }}, 'Monat 240')
      ),
      h('img', { src: calSrc, width:880, height:265, style:{ objectFit:'contain', maxWidth:'100%' }}),
      h('div', { style:{ display:'flex', gap:'14px', marginTop:'10px' }},
        h('div', { style:{ display:'flex', flex:'1', backgroundColor: C.cardBg, borderRadius:'16px',
          padding:'16px 20px', flexDirection:'column', gap:'4px' }},
          h('span', { style:{ display:'flex', fontSize:'19px', fontWeight:700, color: C.textMuted }}, 'EINGEZAHLT'),
          h('span', { style:{ display:'flex', fontSize:'34px', fontWeight:800, color: C.text }}, '72.000 EUR')
        ),
        h('div', { style:{ display:'flex', flex:'1', backgroundColor:'rgba(16,185,129,0.12)', borderRadius:'16px',
          padding:'16px 20px', flexDirection:'column', gap:'4px',
          border:'1px solid rgba(16,185,129,0.25)' }},
          h('span', { style:{ display:'flex', fontSize:'19px', fontWeight:700, color: C.green }}, 'DURCH ZINSESZINS'),
          h('span', { style:{ display:'flex', fontSize:'34px', fontWeight:800, color: C.green }}, '+32.000 EUR')
        )
      )
    ),
    mkKeyLearning('Zinseszins ist Einsteins "8. Weltwunder" — er funktioniert nur, wenn du heute beginnst.', C.green),
    mkHandle()
  );

  // ── SLIDE 7: LEARNINGS ───────────────────────────────────────────────────
  const learnings = [
    { num:'01', text:'Fang heute an — nicht wenn der Markt "günstiger" erscheint', pct:25 },
    { num:'02', text:'Richte einen automatischen Sparplan ein (ab 25 EUR/Monat)', pct:50 },
    { num:'03', text:'Korrekturen sind Kaufgelegenheiten, keine Warnsignale', pct:75 },
    { num:'04', text:'Zeit IM Markt ist wichtiger als der Einstiegszeitpunkt', pct:100 },
  ];

  const slide7 = h('div', {
    style:{ display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit' },
  },
    mkHeader('DEINE LEARNINGS'),
    mkHeadline('4 Regeln für', 60),
    mkHeadline('kluge Anleger', 60),
    mkSubline('Was sofort hilft — ohne auf den Markt zu warten'),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', gap:'12px' }},
      ...learnings.map(l =>
        h('div', { style:{ display:'flex', flexDirection:'column', gap:'10px',
          padding:'18px 22px', backgroundColor: C.cardBg, borderRadius:'18px' }},
          h('div', { style:{ display:'flex', alignItems:'center', gap:'16px' }},
            h('span', { style:{ display:'flex', fontSize:'36px', fontWeight:800,
              color: l.pct === 100 ? C.green : C.text, minWidth:'54px' }}, l.num),
            h('span', { style:{ display:'flex', fontSize:'24px', fontWeight:600, color: C.text, lineHeight:'1.3' }}, l.text)
          ),
          h('div', { style:{ display:'flex', height:'5px', backgroundColor: C.border, borderRadius:'3px', overflow:'hidden' }},
            h('div', { style:{ display:'flex', width:`${l.pct}%`, height:'5px',
              backgroundColor: l.pct === 100 ? C.green : C.text, borderRadius:'3px' }})
          )
        )
      )
    ),
    mkKeyLearning('Wer einen Sparplan hat, muss nie mehr auf den "richtigen Zeitpunkt" warten.', C.green),
    mkHandle()
  );

  // ── SLIDE 8: CTA ─────────────────────────────────────────────────────────
  const slide8 = h('div', {
    style:{ display:'flex', flexDirection:'column', width:W, height:H,
      padding:'70px', backgroundColor: C.bg, fontFamily:'Outfit' },
  },
    mkHeader('JETZT DU'),
    mkHeadline('Was hält dich noch', 62),
    mkHeadline('vom Start zurück?', 62),
    h('div', { style:{ display:'flex', flex:'1', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'24px' }},
      h('span', { style:{ display:'flex', fontSize:'28px', fontWeight:500, color: C.textMuted,
        lineHeight:'1.5', textAlign:'center' }},
        'Schreib es in die Kommentare — wir helfen dir, den ersten Schritt zu machen.'),
      h('div', { style:{ display:'flex', flexDirection:'column', gap:'14px', width:'100%' }},
        h('div', { style:{ display:'flex', backgroundColor: C.cardBg, borderRadius:'18px', padding:'22px 28px',
          alignItems:'center', gap:'16px' }},
          h('div', { style:{ display:'flex', width:'44px', height:'44px', borderRadius:'12px',
            backgroundColor:'rgba(255,255,255,0.15)', alignItems:'center', justifyContent:'center' }},
            h('span', { style:{ display:'flex', fontSize:'24px', fontWeight:700, color: C.text }}, '+')
          ),
          h('span', { style:{ display:'flex', fontSize:'27px', fontWeight:600, color: C.text }},
            'Speichere diesen Post als Erinnerung')
        ),
        h('div', { style:{ display:'flex', backgroundColor:'rgba(16,185,129,0.12)', borderRadius:'18px', padding:'22px 28px',
          alignItems:'center', gap:'16px', border:'1px solid rgba(16,185,129,0.25)' }},
          h('div', { style:{ display:'flex', width:'44px', height:'44px', borderRadius:'12px',
            backgroundColor:'rgba(16,185,129,0.25)', alignItems:'center', justifyContent:'center' }},
            h('span', { style:{ display:'flex', fontSize:'24px', fontWeight:700, color: C.green }}, 'OK')
          ),
          h('span', { style:{ display:'flex', fontSize:'27px', fontWeight:600, color: C.green }},
            'Folge @benarofinanzen fuer mehr Finanzwissen')
        )
      ),
      h('img', { src: logoB64, width:150, height:150, style:{ objectFit:'cover', borderRadius:'18px', marginTop:'4px' }})
    ),
    mkHandle()
  );

  // ── ALLE SLIDES RENDERN ───────────────────────────────────────────────────
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo:{ mode:'width', value: W }});
    const pngData = resvg.render();
    const pngPath = `${outDir}/slide-${String(i+1).padStart(2,'0')}.png`;
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i+1}/${slides.length} fertig: ${pngPath}`);
  }
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
