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

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')
  ).toString('base64');

  const C = {
    bg: '#1B2D87',
    bgDark: '#12207A',
    bgDeep: '#0D1A60',
    text: '#FFFFFF',
    textSoft: 'rgba(255,255,255,0.80)',
    textMuted: 'rgba(255,255,255,0.50)',
    cardBg: 'rgba(255,255,255,0.10)',
    cardBgLight: 'rgba(255,255,255,0.18)',
    border: 'rgba(255,255,255,0.15)',
    accent: '#5BC8F5',
    red: '#E63030',
    white: '#FFFFFF',
  };

  const W = 1080, H = 1350;

  const h = (type, props, ...ch) => ({
    type,
    props: {
      ...props,
      children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch,
    },
  });

  function logo() {
    return h('img', {
      src: logoB64,
      width: 120,
      height: 120,
      style: { borderRadius: '12px', flexShrink: '0', marginLeft: '20px' },
    });
  }

  function badge(text) {
    return h(
      'span',
      {
        style: {
          display: 'flex',
          fontSize: '22px',
          fontWeight: 700,
          letterSpacing: '3px',
          color: C.accent,
          backgroundColor: 'rgba(91,200,245,0.15)',
          padding: '10px 22px',
          borderRadius: '12px',
          textTransform: 'uppercase',
          alignSelf: 'flex-start',
        },
      },
      text,
    );
  }

  function headline(text, size = 64) {
    return h(
      'span',
      {
        style: {
          fontSize: `${size}px`,
          fontWeight: 800,
          color: C.text,
          lineHeight: '1.05',
          letterSpacing: '-0.5px',
          textTransform: 'uppercase',
        },
      },
      text,
    );
  }

  function subline(text) {
    return h(
      'span',
      {
        style: {
          fontSize: '28px',
          fontWeight: 500,
          color: C.textSoft,
          lineHeight: '1.5',
          marginTop: '8px',
        },
      },
      text,
    );
  }

  function keyLearning(text) {
    return h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          backgroundColor: 'rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '22px 28px',
          marginTop: 'auto',
        },
      },
      h('div', {
        style: {
          display: 'flex',
          width: '6px',
          minHeight: '40px',
          backgroundColor: C.red,
          borderRadius: '3px',
          flexShrink: '0',
        },
      }),
      h(
        'span',
        {
          style: {
            fontSize: '27px',
            fontWeight: 600,
            color: C.text,
            lineHeight: '1.4',
          },
        },
        text,
      ),
    );
  }

  function brushStrokeItem(num, text) {
    return h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '18px',
        },
      },
      h(
        'span',
        {
          style: {
            fontSize: '52px',
            fontWeight: 800,
            color: '#FFFFFF',
            minWidth: '60px',
            lineHeight: '1',
          },
        },
        `${num}.`,
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            flex: '1',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: '6px',
            padding: '16px 24px',
          },
        },
        h(
          'span',
          {
            style: {
              fontSize: '28px',
              fontWeight: 800,
              color: '#1B2D87',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              lineHeight: '1.15',
            },
          },
          text,
        ),
      ),
    );
  }

  // Slide root: header row (badge + logo) on top, rest below
  function slideRoot(badgeText, headlineNodes, visualNode, keyText) {
    return h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: W,
          height: H,
          padding: '70px',
          backgroundColor: C.bg,
          fontFamily: 'Outfit',
        },
      },
      // Top row: badge + logo
      h(
        'div',
        {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '18px',
          },
        },
        badge(badgeText),
        logo(),
      ),
      // Headlines
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' } },
        ...headlineNodes,
      ),
      // Visual (flex:1)
      h(
        'div',
        {
          style: {
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            justifyContent: 'center',
          },
        },
        visualNode,
      ),
      // Key learning bar
      keyLearning(keyText),
    );
  }

  const TODAY = new Date().toISOString().slice(0, 10);
  const outDir = path.join(__dirname, `output/carousel_${TODAY}/slides`);
  fs.mkdirSync(outDir, { recursive: true });

  // ===== SLIDE 1: HOOK =====
  const s1Visual = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      },
    },
    // Red downward arrows
    h(
      'div',
      { style: { display: 'flex', gap: '10px', marginBottom: '4px' } },
      ...[0, 1, 2].map(() =>
        h('div', {
          style: {
            display: 'flex',
            width: '0',
            height: '0',
            borderLeft: '14px solid transparent',
            borderRight: '14px solid transparent',
            borderTop: `20px solid ${C.red}`,
          },
        }),
      ),
    ),
    h(
      'span',
      { style: { fontSize: '156px', fontWeight: 800, color: C.accent, lineHeight: '1' } },
      '480',
    ),
    h(
      'span',
      { style: { fontSize: '52px', fontWeight: 800, color: C.accent, lineHeight: '1' } },
      'EURO PRO JAHR',
    ),
    h('div', {
      style: {
        display: 'flex',
        width: '220px',
        height: '6px',
        backgroundColor: C.red,
        borderRadius: '3px',
        marginTop: '4px',
      },
    }),
    h(
      'span',
      {
        style: {
          fontSize: '29px',
          fontWeight: 500,
          color: C.textSoft,
          lineHeight: '1.5',
          textAlign: 'center',
          maxWidth: '780px',
          marginTop: '8px',
        },
      },
      'gratis vom Arbeitgeber — du musst nur einmal fragen',
    ),
    h(
      'div',
      { style: { display: 'flex', gap: '14px', marginTop: '20px' } },
      h(
        'div',
        {
          style: {
            display: 'flex',
            padding: '14px 24px',
            backgroundColor: 'rgba(91,200,245,0.15)',
            borderRadius: '14px',
            border: '1px solid rgba(91,200,245,0.4)',
          },
        },
        h(
          'span',
          { style: { fontSize: '24px', fontWeight: 700, color: C.accent } },
          'Vermögenswirksame Leistungen',
        ),
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            padding: '14px 24px',
            backgroundColor: 'rgba(230,48,48,0.12)',
            borderRadius: '14px',
            border: `1px solid ${C.red}`,
          },
        },
        h(
          'span',
          { style: { fontSize: '24px', fontWeight: 700, color: C.red } },
          '70 % nutzen es nicht',
        ),
      ),
    ),
  );

  const slide1 = slideRoot(
    'GRATIS GELD',
    [headline('480 EUR VOM CHEF —', 68), headline('KAUM JEMAND HOLT ES AB', 60)],
    s1Visual,
    'Dein Arbeitgeber kann dir extra Geld zahlen — das nennt sich VL.',
  );

  // ===== SLIDE 2: WAS SIND VL? =====
  const s2Visual = h(
    'div',
    { style: { display: 'flex', flexDirection: 'column', gap: '14px' } },
    // Box 1: Arbeitgeber
    h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '22px',
          backgroundColor: C.bgDark,
          borderRadius: '20px',
          padding: '26px 28px',
          border: `2px solid ${C.accent}`,
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            width: '60px',
            height: '60px',
            borderRadius: '14px',
            backgroundColor: 'rgba(91,200,245,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: '0',
          },
        },
        h(
          'span',
          { style: { fontSize: '30px', fontWeight: 800, color: C.accent } },
          '01',
        ),
      ),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
        h(
          'span',
          { style: { fontSize: '30px', fontWeight: 800, color: C.white, textTransform: 'uppercase' } },
          'Arbeitgeber',
        ),
        h(
          'span',
          { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft } },
          'zahlt bis zu 40 EUR pro Monat — direkt ins Depot',
        ),
      ),
    ),
    // Arrow
    h(
      'div',
      { style: { display: 'flex', justifyContent: 'center', paddingLeft: '30px' } },
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
        h('div', {
          style: { display: 'flex', width: '3px', height: '20px', backgroundColor: C.accent },
        }),
        h('div', {
          style: {
            display: 'flex',
            width: '0',
            height: '0',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: `13px solid ${C.accent}`,
          },
        }),
      ),
    ),
    // Box 2: Staat
    h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '22px',
          backgroundColor: C.bgDark,
          borderRadius: '20px',
          padding: '26px 28px',
          border: `1px solid ${C.border}`,
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            width: '60px',
            height: '60px',
            borderRadius: '14px',
            backgroundColor: 'rgba(230,48,48,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: '0',
          },
        },
        h(
          'span',
          { style: { fontSize: '30px', fontWeight: 800, color: C.red } },
          '02',
        ),
      ),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
        h(
          'span',
          { style: { fontSize: '30px', fontWeight: 800, color: C.white, textTransform: 'uppercase' } },
          'Staat',
        ),
        h(
          'span',
          { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft } },
          '20 % Arbeitnehmersparzulage — bis zu 80 EUR/Jahr',
        ),
      ),
    ),
    // Arrow
    h(
      'div',
      { style: { display: 'flex', justifyContent: 'center', paddingLeft: '30px' } },
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
        h('div', {
          style: { display: 'flex', width: '3px', height: '20px', backgroundColor: C.accent },
        }),
        h('div', {
          style: {
            display: 'flex',
            width: '0',
            height: '0',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: `13px solid ${C.accent}`,
          },
        }),
      ),
    ),
    // Box 3: ETF-Depot
    h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '22px',
          backgroundColor: 'rgba(91,200,245,0.12)',
          borderRadius: '20px',
          padding: '26px 28px',
          border: '2px solid rgba(91,200,245,0.45)',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            width: '60px',
            height: '60px',
            borderRadius: '14px',
            backgroundColor: 'rgba(91,200,245,0.3)',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: '0',
          },
        },
        h(
          'span',
          { style: { fontSize: '30px', fontWeight: 800, color: C.accent } },
          '03',
        ),
      ),
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
        h(
          'span',
          { style: { fontSize: '30px', fontWeight: 800, color: C.white, textTransform: 'uppercase' } },
          'Dein ETF-Depot',
        ),
        h(
          'span',
          { style: { fontSize: '24px', fontWeight: 500, color: C.textSoft } },
          'wächst automatisch — ohne eigenen Cent Einsatz',
        ),
      ),
    ),
  );

  const slide2 = slideRoot(
    'VL ERKLÄRT',
    [
      headline('WAS SIND VERMÖGENS-', 58),
      headline('WIRKSAME LEISTUNGEN?', 58),
      subline('Gratis-Geld das direkt in deine Geldanlage fließt'),
    ],
    s2Visual,
    'VL = Arbeitgeber-Geld + Staatszuschuss — beides geht direkt ins Depot.',
  );

  // ===== SLIDE 3: DAS PROBLEM (70 %) =====
  // 10 person figures: first 3 highlighted (used), 7 grayed (not used)
  const personFigures = [...Array(10)].map((_, i) => {
    const used = i < 3;
    return h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' } },
      h('div', {
        style: {
          display: 'flex',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: used ? C.accent : 'rgba(255,255,255,0.12)',
        },
      }),
      h('div', {
        style: {
          display: 'flex',
          width: '64px',
          height: '46px',
          borderRadius: '12px 12px 0 0',
          backgroundColor: used ? 'rgba(91,200,245,0.35)' : 'rgba(255,255,255,0.07)',
        },
      }),
    );
  });

  const s3Visual = h(
    'div',
    { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' } },
    h(
      'div',
      {
        style: {
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: '740px',
        },
      },
      ...personFigures,
    ),
    h(
      'div',
      { style: { display: 'flex', gap: '36px' } },
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
        h('div', {
          style: {
            display: 'flex',
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            backgroundColor: C.accent,
          },
        }),
        h(
          'span',
          { style: { fontSize: '26px', fontWeight: 600, color: C.textSoft } },
          '30 % nutzen VL',
        ),
      ),
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
        h('div', {
          style: {
            display: 'flex',
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.15)',
          },
        }),
        h(
          'span',
          { style: { fontSize: '26px', fontWeight: 600, color: C.textMuted } },
          '70 % verschenken es',
        ),
      ),
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          padding: '24px 32px',
          backgroundColor: 'rgba(230,48,48,0.12)',
          borderRadius: '18px',
          border: `1px solid ${C.red}`,
          maxWidth: '820px',
        },
      },
      h(
        'span',
        {
          style: {
            fontSize: '28px',
            fontWeight: 600,
            color: C.text,
            lineHeight: '1.4',
            textAlign: 'center',
          },
        },
        'Von 10 anspruchsberechtigten Arbeitnehmern lassen 7 dieses Gratis-Geld einfach liegen',
      ),
    ),
  );

  const slide3 = slideRoot(
    'DAS PROBLEM',
    [headline('NUR 30 % NUTZEN', 72), headline('IHREN VL-ANSPRUCH', 72)],
    s3Visual,
    '70 % der Deutschen lassen kostenloses Geld vom Chef auf dem Tisch.',
  );

  // ===== SLIDE 4: WENDEPUNKT — DOPPELTES GRATISGELD =====
  const s4Visual = h(
    'div',
    { style: { display: 'flex', flexDirection: 'column', gap: '18px' } },
    // Two contrast cards
    h(
      'div',
      { style: { display: 'flex', gap: '14px' } },
      // Left: Arbeitgeber
      h(
        'div',
        {
          style: {
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            backgroundColor: C.bgDark,
            borderRadius: '20px',
            padding: '28px',
            gap: '12px',
            border: `2px solid ${C.accent}`,
          },
        },
        h(
          'span',
          {
            style: {
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '2px',
              color: C.accent,
              textTransform: 'uppercase',
            },
          },
          'ARBEITGEBER',
        ),
        h('div', {
          style: {
            display: 'flex',
            width: '100%',
            height: '3px',
            backgroundColor: C.accent,
            borderRadius: '2px',
          },
        }),
        h(
          'span',
          { style: { fontSize: '62px', fontWeight: 800, color: C.accent, lineHeight: '1' } },
          '480 EUR',
        ),
        h(
          'span',
          { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } },
          'pro Jahr',
        ),
        h(
          'span',
          { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } },
          'Bis zu 40 EUR/Monat — direkt vom Gehaltszettel',
        ),
      ),
      // Right: Staat
      h(
        'div',
        {
          style: {
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            backgroundColor: 'rgba(91,200,245,0.10)',
            borderRadius: '20px',
            padding: '28px',
            gap: '12px',
            border: '2px solid rgba(91,200,245,0.45)',
          },
        },
        h(
          'span',
          {
            style: {
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '2px',
              color: C.white,
              textTransform: 'uppercase',
            },
          },
          'STAAT',
        ),
        h('div', {
          style: {
            display: 'flex',
            width: '100%',
            height: '3px',
            backgroundColor: C.white,
            borderRadius: '2px',
          },
        }),
        h(
          'span',
          { style: { fontSize: '62px', fontWeight: 800, color: C.white, lineHeight: '1' } },
          '80 EUR',
        ),
        h(
          'span',
          { style: { fontSize: '22px', fontWeight: 500, color: C.textMuted } },
          'pro Jahr',
        ),
        h(
          'span',
          { style: { fontSize: '23px', fontWeight: 600, color: C.textSoft, lineHeight: '1.4' } },
          '20 % Arbeitnehmer-sparzulage vom Finanzamt',
        ),
      ),
    ),
    // Total bar
    h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '18px',
          backgroundColor: 'rgba(91,200,245,0.10)',
          borderRadius: '18px',
          padding: '24px 32px',
          border: '2px solid rgba(91,200,245,0.3)',
        },
      },
      h(
        'span',
        { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft } },
        'Zusammen:',
      ),
      h(
        'span',
        { style: { fontSize: '54px', fontWeight: 800, color: C.accent } },
        '560 EUR',
      ),
      h(
        'span',
        { style: { fontSize: '28px', fontWeight: 600, color: C.textSoft } },
        'pro Jahr',
      ),
    ),
  );

  const slide4 = slideRoot(
    'DER WENDEPUNKT',
    [headline('ARBEITGEBER + STAAT =', 56), headline('DOPPELTES GRATISGELD', 56)],
    s4Visual,
    'Bis zu 560 EUR pro Jahr — ohne einen einzigen eigenen Euro Einsatz.',
  );

  // ===== SLIDE 5: WACHSTUM ÜBER 30 JAHRE =====
  // FV annual annuity at 7%: 560 EUR/Jahr
  // 10 Jahre: 560 * ((1.07^10-1)/0.07) = 560 * 13.816 = ~7.737 EUR
  // 20 Jahre: 560 * ((1.07^20-1)/0.07) = 560 * 40.995 = ~22.957 EUR
  // 30 Jahre: 560 * ((1.07^30-1)/0.07) = 560 * 94.461 = ~52.898 EUR

  const chartSvg = `<svg width="940" height="360" viewBox="0 0 940 360" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#5BC8F5" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="#5BC8F5" stop-opacity="0.02"/>
      </linearGradient>
    </defs>
    <line x1="70" y1="30" x2="920" y2="30" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
    <line x1="70" y1="110" x2="920" y2="110" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
    <line x1="70" y1="190" x2="920" y2="190" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
    <line x1="70" y1="270" x2="920" y2="270" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
    <line x1="70" y1="330" x2="920" y2="330" stroke="rgba(255,255,255,0.20)" stroke-width="2"/>
    <line x1="70" y1="20" x2="70" y2="340" stroke="rgba(255,255,255,0.20)" stroke-width="2"/>
    <path d="M70,330 C230,328 310,315 420,295 C530,275 620,190 740,140 C820,108 880,55 920,32 L920,330 Z" fill="url(#fillGrad)"/>
    <path d="M70,330 C230,328 310,315 420,295 C530,275 620,190 740,140 C820,108 880,55 920,32" fill="none" stroke="#5BC8F5" stroke-width="4" stroke-linecap="round"/>
    <circle cx="70" cy="330" r="6" fill="#5BC8F5"/>
    <circle cx="420" cy="295" r="9" fill="#5BC8F5"/>
    <circle cx="740" cy="140" r="9" fill="#5BC8F5"/>
    <circle cx="920" cy="32" r="13" fill="#E63030"/>
    <line x1="420" y1="295" x2="420" y2="330" stroke="rgba(91,200,245,0.4)" stroke-width="2" stroke-dasharray="6,4"/>
    <line x1="740" y1="140" x2="740" y2="330" stroke="rgba(91,200,245,0.4)" stroke-width="2" stroke-dasharray="6,4"/>
    <line x1="920" y1="32" x2="920" y2="330" stroke="rgba(230,48,48,0.5)" stroke-width="2" stroke-dasharray="6,4"/>
  </svg>`;

  const chartSrc = `data:image/svg+xml;base64,${Buffer.from(chartSvg).toString('base64')}`;

  const s5Visual = h(
    'div',
    { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
    h('img', { src: chartSrc, width: 940, height: 360, style: { objectFit: 'contain' } }),
    h(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: '70px',
          paddingRight: '0px',
          marginTop: '-6px',
        },
      },
      h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted } }, 'Start'),
      h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted } }, '10 Jahre'),
      h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.textMuted } }, '20 Jahre'),
      h('span', { style: { fontSize: '22px', fontWeight: 600, color: C.red } }, '30 Jahre'),
    ),
    h(
      'div',
      { style: { display: 'flex', gap: '12px', marginTop: '10px' } },
      ...[
        { val: '7.700 EUR', label: 'nach 10 Jahren', highlight: false },
        { val: '22.900 EUR', label: 'nach 20 Jahren', highlight: false },
        { val: '52.900 EUR', label: 'nach 30 Jahren', highlight: true },
      ].map(item =>
        h(
          'div',
          {
            style: {
              display: 'flex',
              flex: '1',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: item.highlight ? 'rgba(230,48,48,0.12)' : C.bgDark,
              borderRadius: '16px',
              padding: '18px 10px',
              border: item.highlight ? `2px solid ${C.red}` : `1px solid ${C.border}`,
              gap: '4px',
            },
          },
          h(
            'span',
            {
              style: {
                fontSize: '32px',
                fontWeight: 800,
                color: item.highlight ? C.red : C.accent,
              },
            },
            item.val,
          ),
          h(
            'span',
            { style: { fontSize: '20px', fontWeight: 500, color: C.textMuted } },
            item.label,
          ),
        ),
      ),
    ),
  );

  const slide5 = slideRoot(
    'DER BEWEIS',
    [
      headline('SO WÄCHST DEIN VL-DEPOT', 60),
      subline('Nur aus VL + Staatszulage, 7 % p. a. — kein eigener Cent'),
    ],
    s5Visual,
    'Ohne eigenes Geld — nur durch Zinseszins auf Arbeitgeber-VL + Staatszulage.',
  );

  // ===== SLIDE 6: IN 3 SCHRITTEN =====
  const s6Visual = h(
    'div',
    { style: { display: 'flex', flexDirection: 'column', gap: '0px' } },
    brushStrokeItem('1', 'HR fragen: VL-Anspruch im Arbeitsvertrag prüfen'),
    brushStrokeItem('2', 'ETF-Depot bei DKB, Flatex oder Comdirect eröffnen'),
    brushStrokeItem('3', 'VL-Antrag ausfüllen — Arbeitgeber überweist direkt'),
  );

  const slide6 = slideRoot(
    "SO GEHT'S",
    [headline('IN 3 SCHRITTEN', 72), headline('ZUM VL-DEPOT', 72)],
    s6Visual,
    'Der gesamte Prozess dauert maximal 30 Minuten.',
  );

  // ===== SLIDE 7: TAKEAWAYS =====
  const learnings = [
    { num: '01', text: 'VL = Gratis-Geld des Arbeitgebers für Vermögensaufbau', pct: 25 },
    { num: '02', text: 'Bis zu 480 EUR pro Jahr Arbeitgeberbeitrag möglich', pct: 50 },
    { num: '03', text: 'Staat zahlt 20 % Bonus — bis zu 80 EUR/Jahr extra', pct: 75 },
    { num: '04', text: 'Einkommensgrenze: 40.000 EUR (Singles), 80.000 EUR (Paare)', pct: 100 },
  ];

  const s7Visual = h(
    'div',
    { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
    ...learnings.map(l =>
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '20px 26px',
            backgroundColor: C.bgDark,
            borderRadius: '18px',
            border: l.pct === 100 ? `2px solid ${C.accent}` : `1px solid ${C.border}`,
          },
        },
        h(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
          h(
            'span',
            {
              style: {
                fontSize: '36px',
                fontWeight: 800,
                color: l.pct === 100 ? C.accent : C.white,
                minWidth: '56px',
              },
            },
            l.num,
          ),
          h(
            'span',
            { style: { fontSize: '25px', fontWeight: 600, color: C.text, lineHeight: '1.3' } },
            l.text,
          ),
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              height: '6px',
              backgroundColor: C.border,
              borderRadius: '3px',
              overflow: 'hidden',
            },
          },
          h('div', {
            style: {
              display: 'flex',
              width: `${l.pct}%`,
              height: '6px',
              backgroundColor: l.pct === 100 ? C.accent : C.red,
              borderRadius: '3px',
            },
          }),
        ),
      ),
    ),
  );

  const slide7 = slideRoot(
    'TAKEAWAYS',
    [headline('DIE 4 WICHTIGSTEN', 64), headline('ERKENNTNISSE', 64)],
    s7Visual,
    'Prüfe noch heute deinen VL-Anspruch — es dauert nur 5 Minuten.',
  );

  // ===== SLIDE 8: CTA =====
  const s8Visual = h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '26px',
      },
    },
    h(
      'span',
      {
        style: {
          fontSize: '74px',
          fontWeight: 800,
          color: C.white,
          textAlign: 'center',
          lineHeight: '1.05',
          textTransform: 'uppercase',
        },
      },
      'BIST DU EINER DER 70 %?',
    ),
    h('div', {
      style: {
        display: 'flex',
        width: '110px',
        height: '6px',
        backgroundColor: C.red,
        borderRadius: '3px',
      },
    }),
    h(
      'span',
      {
        style: {
          fontSize: '30px',
          fontWeight: 500,
          color: C.textSoft,
          textAlign: 'center',
          lineHeight: '1.5',
          maxWidth: '820px',
        },
      },
      'Frag morgen früh deine HR-Abteilung nach deinem VL-Anspruch. Es ist kostenlos und dauert 5 Minuten.',
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          padding: '20px 36px',
          backgroundColor: 'rgba(91,200,245,0.15)',
          borderRadius: '16px',
          border: '1px solid rgba(91,200,245,0.35)',
        },
      },
      h(
        'span',
        { style: { fontSize: '30px', fontWeight: 700, color: C.accent } },
        'Speichern nicht vergessen',
      ),
    ),
    h(
      'span',
      { style: { fontSize: '26px', fontWeight: 500, color: C.textMuted } },
      'Folge @benarofinanzen für mehr Finanz-Tipps',
    ),
  );

  const slide8 = slideRoot(
    'JETZT DU',
    [headline('GRATIS GELD VOM CHEF —', 58), headline('NUTZE DEINEN ANSPRUCH', 58)],
    s8Visual,
    'Prüfe deinen VL-Anspruch — und lass dieses Geld nicht mehr liegen.',
  );

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length}: OK`);
  }
  console.log(`Alle ${slides.length} Slides generiert!`);
  console.log(`Output: ${outDir}`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
