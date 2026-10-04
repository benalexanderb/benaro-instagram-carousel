const fs = require('fs');
const path = require('path');

async function main() {
  const satori = (await import('satori')).default || require('satori');
  const { Resvg } = require('@resvg/resvg-js');

  const fontDir = path.join(__dirname, 'node_modules/@fontsource/outfit/files');
  const fonts = [400, 500, 600, 700, 800].flatMap(w => [
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-${w}-normal.woff`)) },
    { name: 'Outfit', weight: w, style: 'normal', data: fs.readFileSync(path.join(fontDir, `outfit-latin-ext-${w}-normal.woff`)) },
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

  const h = (type, props, ...ch) => ({
    type,
    props: {
      ...props,
      children: ch.length === 1 ? ch[0] : ch.length === 0 ? undefined : ch,
    },
  });

  const logoB64 = 'data:image/jpeg;base64,' + fs.readFileSync(
    path.join(__dirname, 'skills/instagram-carousel-skill/templates/benaro-logo.jpg')
  ).toString('base64');

  function logo() {
    return h('img', {
      src: logoB64,
      width: 120,
      height: 120,
      style: { borderRadius: '12px', objectFit: 'cover' },
    });
  }

  function badge(text) {
    return h('div', { style: { display: 'flex', marginBottom: '16px' } },
      h('span', {
        style: {
          display: 'flex', fontSize: '22px', fontWeight: 700,
          letterSpacing: '3px', color: C.text,
          backgroundColor: C.cardBg,
          padding: '10px 22px', borderRadius: '12px',
          fontFamily: 'Outfit',
        },
      }, text),
    );
  }

  function headline(text, size = 64) {
    return h('span', {
      style: {
        fontSize: `${size}px`, fontWeight: 800,
        color: C.text, lineHeight: '1.08',
        letterSpacing: '-1.5px', marginBottom: '6px',
        fontFamily: 'Outfit',
      },
    }, text);
  }

  function subline(text) {
    return h('span', {
      style: {
        fontSize: '28px', fontWeight: 500,
        color: C.textMuted, lineHeight: '1.5',
        marginTop: '8px', fontFamily: 'Outfit',
      },
    }, text);
  }

  function keyLearning(text, accent = C.text) {
    return h('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: '14px',
        backgroundColor: C.cardBg, borderRadius: '16px',
        padding: '22px 28px', marginTop: 'auto',
      },
    },
      h('div', {
        style: {
          display: 'flex', width: '6px', minHeight: '40px',
          backgroundColor: accent, borderRadius: '3px',
        },
      }),
      h('span', {
        style: {
          fontSize: '28px', fontWeight: 600,
          color: C.text, lineHeight: '1.4',
          fontFamily: 'Outfit',
        },
      }, text),
    );
  }

  function igHandle() {
    return h('div', { style: { display: 'flex', alignItems: 'center', marginTop: '16px' } },
      h('span', {
        style: {
          fontSize: '24px', fontWeight: 500,
          color: C.textMuted, fontFamily: 'Outfit',
        },
      }, '@benarofinanzen'),
    );
  }

  function slideRoot(children) {
    return h('div', {
      style: {
        display: 'flex', flexDirection: 'column',
        width: W, height: H, padding: '70px',
        backgroundColor: C.bg, fontFamily: 'Outfit',
      },
    }, ...children);
  }

  // ── SLIDE 1 — HOOK ────────────────────────────────────────────
  const slide1 = slideRoot([
    h('div', {
      style: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '16px',
      },
    },
      badge('ACHTUNG'),
      logo(),
    ),
    headline('67 % lassen Gratis-Geld vom Chef liegen', 68),
    subline('Betriebliche Altersvorsorge 2026'),
    // Big stat visual
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '20px',
      },
    },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: C.cardBg, borderRadius: '28px',
          padding: '56px 80px', gap: '12px',
        },
      },
        h('span', {
          style: {
            fontSize: '160px', fontWeight: 800,
            color: C.red, lineHeight: '1',
            letterSpacing: '-4px', fontFamily: 'Outfit',
          },
        }, '67 %'),
        h('span', {
          style: {
            fontSize: '32px', fontWeight: 600,
            color: C.textSoft, textAlign: 'center',
            lineHeight: '1.3', fontFamily: 'Outfit',
          },
        }, 'der Arbeitnehmer'),
        h('span', {
          style: {
            fontSize: '28px', fontWeight: 500,
            color: C.textMuted, textAlign: 'center',
            lineHeight: '1.3', fontFamily: 'Outfit',
          },
        }, 'nutzen keine betriebliche Altersvorsorge'),
      ),
    ),
    keyLearning('Dabei schreibt der Gesetzgeber seit 2019 einen Arbeitgeberzuschuss vor.'),
    igHandle(),
  ]);

  // ── SLIDE 2 — PROBLEM-FUNNEL ──────────────────────────────────────────
  const funnelSvg = `<svg width="860" height="360" viewBox="0 0 860 360" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#10B981" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#10B981" stop-opacity="0.5"/>
      </linearGradient>
      <linearGradient id="g2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#EF4444" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#EF4444" stop-opacity="0.5"/>
      </linearGradient>
    </defs>
    <!-- Top layer: 100% Arbeitnehmer -->
    <rect x="80" y="20" width="700" height="90" rx="14" fill="url(#g1)"/>
    <!-- Connector lines -->
    <line x1="80" y1="110" x2="220" y2="155" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    <line x1="780" y1="110" x2="640" y2="155" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    <!-- Middle layer: 33% mit bAV -->
    <rect x="220" y="155" width="420" height="85" rx="14" fill="url(#g1)"/>
    <!-- Connector lines 2 -->
    <line x1="220" y1="240" x2="340" y2="285" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    <line x1="640" y1="240" x2="520" y2="285" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    <!-- Bottom layer: 33% -->
    <rect x="340" y="285" width="180" height="55" rx="14" fill="url(#g1)"/>
  </svg>`;
  const funnelSrc = `data:image/svg+xml;base64,${Buffer.from(funnelSvg).toString('base64')}`;

  const slide2 = slideRoot([
    h('div', {
      style: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '16px',
      },
    },
      badge('DIE REALITÄT'),
      logo(),
    ),
    headline('2 von 3 verzichten — freiwillig', 62),
    subline('Warum nutzt kaum jemand diesen Anspruch?'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '16px',
      },
    },
      h('img', { src: funnelSrc, width: 860, height: 360, style: { objectFit: 'contain' } }),
      // Labels below funnel
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '8px',
        },
      },
        h('div', {
          style: {
            display: 'flex', justifyContent: 'space-between',
            width: '100%', paddingLeft: '80px', paddingRight: '80px',
          },
        },
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textMuted, fontFamily: 'Outfit' } }, '100 % Arbeitnehmer'),
          h('span', { style: { fontSize: '24px', fontWeight: 600, color: C.textMuted, fontFamily: 'Outfit' } }, 'haben Anspruch'),
        ),
        h('div', { style: { display: 'flex', justifyContent: 'center' } },
          h('span', { style: { fontSize: '24px', fontWeight: 700, color: C.green, fontFamily: 'Outfit' } }, 'nur 33 % nutzen die bAV aktiv'),
        ),
      ),
    ),
    keyLearning('Jeder Angestellte hat einen Rechtsanspruch auf Entgeltumwandlung.'),
    igHandle(),
  ]);

  // ── SLIDE 3 — KONTRAST (ohne vs. mit bAV) ──────────────────────────
  const slide3 = slideRoot([
    h('div', {
      style: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '16px',
      },
    },
      badge('DER UNTERSCHIED'),
      logo(),
    ),
    headline('200 € anlegen — was es wirklich kostet', 58),
    subline('Nettolohn vs. Entgeltumwandlung im Vergleich'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '18px',
      },
    },
      h('div', { style: { display: 'flex', gap: '16px' } },
        // Ohne bAV (red accent)
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(239,68,68,0.12)',
            borderRadius: '22px', padding: '32px', gap: '16px',
            border: '1px solid rgba(239,68,68,0.3)',
          },
        },
          h('span', {
            style: {
              fontSize: '22px', fontWeight: 700,
              letterSpacing: '2px', color: C.red,
              fontFamily: 'Outfit',
            },
          }, 'OHNE bAV'),
          h('div', {
            style: {
              display: 'flex', width: '100%', height: '3px',
              backgroundColor: 'rgba(239,68,68,0.4)', borderRadius: '2px',
            },
          }),
          h('span', {
            style: {
              fontSize: '54px', fontWeight: 800, color: C.text,
              lineHeight: '1', fontFamily: 'Outfit',
            },
          }, '200 €'),
          h('span', {
            style: {
              fontSize: '26px', fontWeight: 500, color: C.textSoft,
              lineHeight: '1.4', fontFamily: 'Outfit',
            },
          }, 'direkt aus dem Nettolohn'),
          h('span', {
            style: {
              fontSize: '24px', fontWeight: 500, color: C.textMuted,
              lineHeight: '1.4', fontFamily: 'Outfit',
            },
          }, 'Du zahlst den vollen Betrag nach Steuern und Sozialabgaben'),
        ),
        // Mit bAV (green accent)
        h('div', {
          style: {
            display: 'flex', flex: '1', flexDirection: 'column',
            backgroundColor: 'rgba(16,185,129,0.12)',
            borderRadius: '22px', padding: '32px', gap: '16px',
            border: '1px solid rgba(16,185,129,0.3)',
          },
        },
          h('span', {
            style: {
              fontSize: '22px', fontWeight: 700,
              letterSpacing: '2px', color: C.green,
              fontFamily: 'Outfit',
            },
          }, 'MIT bAV'),
          h('div', {
            style: {
              display: 'flex', width: '100%', height: '3px',
              backgroundColor: 'rgba(16,185,129,0.4)', borderRadius: '2px',
            },
          }),
          h('span', {
            style: {
              fontSize: '54px', fontWeight: 800, color: C.green,
              lineHeight: '1', fontFamily: 'Outfit',
            },
          }, '116 €'),
          h('span', {
            style: {
              fontSize: '26px', fontWeight: 500, color: C.textSoft,
              lineHeight: '1.4', fontFamily: 'Outfit',
            },
          }, 'effektiver Nettoeigenanteil'),
          h('span', {
            style: {
              fontSize: '24px', fontWeight: 500, color: C.textMuted,
              lineHeight: '1.4', fontFamily: 'Outfit',
            },
          }, 'Steuer + SV-Ersparnis reduzieren deinen echten Aufwand'),
        ),
      ),
      h('div', {
        style: {
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: '16px', backgroundColor: C.cardBg, borderRadius: '16px',
          padding: '18px 28px',
        },
      },
        h('span', {
          style: {
            fontSize: '30px', fontWeight: 700,
            color: C.green, fontFamily: 'Outfit',
          },
        }, '+ 84 € gespart'),
        h('span', {
          style: {
            fontSize: '26px', fontWeight: 500,
            color: C.textMuted, fontFamily: 'Outfit',
          },
        }, 'bei gleichem Beitrag in die Altersvorsorge'),
      ),
    ),
    keyLearning('Entgeltumwandlung spart Steuern und Sozialabgaben gleichzeitig.'),
    igHandle(),
  ]);

  // ── SLIDE 4 — WIE ES FUNKTIONIERT (Arrow Flow) ────────────────────────────
  const slide4 = slideRoot([
    h('div', {
      style: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '16px',
      },
    },
      badge('SO LÄUFT ES'),
      logo(),
    ),
    headline('Dein Bruttolohn wird umgewandelt', 60),
    subline('Entgeltumwandlung in 3 Schritten'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '12px',
      },
    },
      // Step 1
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '20px',
          backgroundColor: C.cardBg, borderRadius: '18px', padding: '24px 28px',
        },
      },
        h('div', {
          style: {
            display: 'flex', width: '56px', height: '56px',
            borderRadius: '14px', backgroundColor: 'rgba(255,255,255,0.15)',
            alignItems: 'center', justifyContent: 'center', flexShrink: '0',
          },
        },
          h('span', {
            style: {
              fontSize: '28px', fontWeight: 800,
              color: C.text, fontFamily: 'Outfit',
            },
          }, '01'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', {
            style: {
              fontSize: '30px', fontWeight: 700,
              color: C.text, fontFamily: 'Outfit',
            },
          }, 'Du bestimmst den Beitrag'),
          h('span', {
            style: {
              fontSize: '24px', fontWeight: 500,
              color: C.textMuted, fontFamily: 'Outfit',
            },
          }, 'Bis zu 294 EUR/Monat steuer- und SV-frei (4 % BBG 2026)'),
        ),
      ),
      // Arrow connector
      h('div', { style: { display: 'flex', justifyContent: 'center' } },
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px' } },
          h('div', {
            style: {
              display: 'flex', width: '4px', height: '24px',
              backgroundColor: C.border,
            },
          }),
          h('div', {
            style: {
              display: 'flex', width: '0px', height: '0px',
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: `12px solid ${C.border}`,
            },
          }),
        ),
      ),
      // Step 2
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '20px',
          backgroundColor: C.cardBg, borderRadius: '18px', padding: '24px 28px',
        },
      },
        h('div', {
          style: {
            display: 'flex', width: '56px', height: '56px',
            borderRadius: '14px', backgroundColor: 'rgba(255,255,255,0.15)',
            alignItems: 'center', justifyContent: 'center', flexShrink: '0',
          },
        },
          h('span', {
            style: {
              fontSize: '28px', fontWeight: 800,
              color: C.text, fontFamily: 'Outfit',
            },
          }, '02'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', {
            style: {
              fontSize: '30px', fontWeight: 700,
              color: C.text, fontFamily: 'Outfit',
            },
          }, 'Bruttolohn wird gekürzt'),
          h('span', {
            style: {
              fontSize: '24px', fontWeight: 500,
              color: C.textMuted, fontFamily: 'Outfit',
            },
          }, 'Weniger Bemessungsgrundlage: weniger Steuern und Sozialabgaben'),
        ),
      ),
      // Arrow connector
      h('div', { style: { display: 'flex', justifyContent: 'center' } },
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px' } },
          h('div', {
            style: {
              display: 'flex', width: '4px', height: '24px',
              backgroundColor: C.border,
            },
          }),
          h('div', {
            style: {
              display: 'flex', width: '0px', height: '0px',
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: `12px solid ${C.border}`,
            },
          }),
        ),
      ),
      // Step 3
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '20px',
          backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '18px', padding: '24px 28px',
          border: '1px solid rgba(16,185,129,0.3)',
        },
      },
        h('div', {
          style: {
            display: 'flex', width: '56px', height: '56px',
            borderRadius: '14px', backgroundColor: 'rgba(16,185,129,0.25)',
            alignItems: 'center', justifyContent: 'center', flexShrink: '0',
          },
        },
          h('span', {
            style: {
              fontSize: '28px', fontWeight: 800,
              color: C.green, fontFamily: 'Outfit',
            },
          }, '03'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', {
            style: {
              fontSize: '30px', fontWeight: 700,
              color: C.green, fontFamily: 'Outfit',
            },
          }, 'Beitrag landet in deiner bAV'),
          h('span', {
            style: {
              fontSize: '24px', fontWeight: 500,
              color: C.textMuted, fontFamily: 'Outfit',
            },
          }, 'Voller Bruttobeitrag wächst in deiner Altersvorsorge'),
        ),
      ),
    ),
    keyLearning('Weniger zu versteuerndes Einkommen bedeutet weniger Abzüge.'),
    igHandle(),
  ]);

  // ── SLIDE 5 — ARBEITGEBERZUSCHUSS ───────────────────────────────────────
  const slide5 = slideRoot([
    h('div', {
      style: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '16px',
      },
    },
      badge('BONUS VOM CHEF'),
      logo(),
    ),
    headline('Seit 2019: +15 % vom Arbeitgeber Pflicht', 58),
    subline('Das Betriebsrentstärkungsgesetz schreibt es vor'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '20px',
      },
    },
      // Main calculation visual
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column',
          gap: '14px',
        },
      },
        // Your contribution
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            backgroundColor: C.cardBg, borderRadius: '18px', padding: '26px 32px',
          },
        },
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
            h('span', {
              style: {
                fontSize: '22px', fontWeight: 700, color: C.textMuted,
                letterSpacing: '2px', fontFamily: 'Outfit',
              },
            }, 'DEIN BEITRAG'),
            h('span', {
              style: {
                fontSize: '26px', fontWeight: 500, color: C.textSoft,
                fontFamily: 'Outfit',
              },
            }, 'Entgeltumwandlung'),
          ),
          h('span', {
            style: {
              fontSize: '52px', fontWeight: 800, color: C.text,
              fontFamily: 'Outfit',
            },
          }, '200 €'),
        ),
        // Plus sign
        h('div', { style: { display: 'flex', justifyContent: 'center' } },
          h('div', {
            style: {
              display: 'flex', width: '44px', height: '44px',
              borderRadius: '12px', backgroundColor: C.cardBg,
              alignItems: 'center', justifyContent: 'center',
            },
          },
            h('span', {
              style: {
                fontSize: '28px', fontWeight: 800, color: C.textMuted,
                fontFamily: 'Outfit',
              },
            }, '+'),
          ),
        ),
        // Employer contribution
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            backgroundColor: 'rgba(16,185,129,0.15)', borderRadius: '18px', padding: '26px 32px',
            border: '1px solid rgba(16,185,129,0.4)',
          },
        },
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
            h('span', {
              style: {
                fontSize: '22px', fontWeight: 700, color: C.green,
                letterSpacing: '2px', fontFamily: 'Outfit',
              },
            }, 'ARBEITGEBERZUSCHUSS'),
            h('span', {
              style: {
                fontSize: '26px', fontWeight: 500, color: C.textSoft,
                fontFamily: 'Outfit',
              },
            }, 'mind. 15 % Pflicht'),
          ),
          h('span', {
            style: {
              fontSize: '52px', fontWeight: 800, color: C.green,
              fontFamily: 'Outfit',
            },
          }, '30 €'),
        ),
        // Equals + result
        h('div', { style: { display: 'flex', justifyContent: 'center' } },
          h('div', {
            style: {
              display: 'flex', width: '44px', height: '44px',
              borderRadius: '12px', backgroundColor: C.cardBg,
              alignItems: 'center', justifyContent: 'center',
            },
          },
            h('span', {
              style: {
                fontSize: '28px', fontWeight: 800, color: C.textMuted,
                fontFamily: 'Outfit',
              },
            }, '='),
          ),
        ),
        // Total
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: '18px', padding: '26px 32px',
            border: '1px solid rgba(255,255,255,0.3)',
          },
        },
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
            h('span', {
              style: {
                fontSize: '22px', fontWeight: 700, color: C.textMuted,
                letterSpacing: '2px', fontFamily: 'Outfit',
              },
            }, 'IN DEINER ALTERSVORSORGE'),
            h('span', {
              style: {
                fontSize: '26px', fontWeight: 500, color: C.textSoft,
                fontFamily: 'Outfit',
              },
            }, 'monatlich'),
          ),
          h('span', {
            style: {
              fontSize: '52px', fontWeight: 800, color: C.text,
              fontFamily: 'Outfit',
            },
          }, '230 €'),
        ),
      ),
    ),
    keyLearning('30 EUR Gratis pro Monat: 360 EUR kostenloser Aufbau pro Jahr.'),
    igHandle(),
  ]);

  // ── SLIDE 6 — 3 VORTEILE AUF EINMAL ────────────────────────────────────
  const slide6 = slideRoot([
    h('div', {
      style: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '16px',
      },
    },
      badge('3 VORTEILE AUF EINMAL'),
      logo(),
    ),
    headline('Warum die bAV unschlagbar ist', 62),
    subline('Kein anderes Produkt bietet alle drei gleichzeitig'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '16px',
      },
    },
      // Card 1
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '24px',
          backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px 32px',
        },
      },
        h('div', {
          style: {
            display: 'flex', width: '64px', height: '64px',
            borderRadius: '18px', backgroundColor: 'rgba(16,185,129,0.2)',
            alignItems: 'center', justifyContent: 'center', flexShrink: '0',
          },
        },
          h('span', {
            style: {
              fontSize: '32px', fontWeight: 800, color: C.green,
              fontFamily: 'Outfit',
            },
          }, '01'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', {
            style: {
              fontSize: '30px', fontWeight: 700, color: C.text,
              fontFamily: 'Outfit',
            },
          }, 'Steuerersparnis'),
          h('span', {
            style: {
              fontSize: '24px', fontWeight: 500, color: C.textMuted,
              fontFamily: 'Outfit', lineHeight: '1.4',
            },
          }, 'Beiträge mindern dein zu versteuerndes Einkommen direkt'),
        ),
      ),
      // Card 2
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '24px',
          backgroundColor: C.cardBg, borderRadius: '20px', padding: '28px 32px',
        },
      },
        h('div', {
          style: {
            display: 'flex', width: '64px', height: '64px',
            borderRadius: '18px', backgroundColor: 'rgba(16,185,129,0.2)',
            alignItems: 'center', justifyContent: 'center', flexShrink: '0',
          },
        },
          h('span', {
            style: {
              fontSize: '32px', fontWeight: 800, color: C.green,
              fontFamily: 'Outfit',
            },
          }, '02'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', {
            style: {
              fontSize: '30px', fontWeight: 700, color: C.text,
              fontFamily: 'Outfit',
            },
          }, 'Sozialabgaben-Ersparnis'),
          h('span', {
            style: {
              fontSize: '24px', fontWeight: 500, color: C.textMuted,
              fontFamily: 'Outfit', lineHeight: '1.4',
            },
          }, 'Bis 4 % der BBG sind auch kranken- und rentenversicherungsfrei'),
        ),
      ),
      // Card 3
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '24px',
          backgroundColor: 'rgba(16,185,129,0.12)', borderRadius: '20px', padding: '28px 32px',
          border: '1px solid rgba(16,185,129,0.3)',
        },
      },
        h('div', {
          style: {
            display: 'flex', width: '64px', height: '64px',
            borderRadius: '18px', backgroundColor: 'rgba(16,185,129,0.3)',
            alignItems: 'center', justifyContent: 'center', flexShrink: '0',
          },
        },
          h('span', {
            style: {
              fontSize: '32px', fontWeight: 800, color: C.green,
              fontFamily: 'Outfit',
            },
          }, '03'),
        ),
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } },
          h('span', {
            style: {
              fontSize: '30px', fontWeight: 700, color: C.green,
              fontFamily: 'Outfit',
            },
          }, 'Arbeitgeberzuschuss'),
          h('span', {
            style: {
              fontSize: '24px', fontWeight: 500, color: C.textMuted,
              fontFamily: 'Outfit', lineHeight: '1.4',
            },
          }, 'Mind. 15 % obendrauf — seit 2019 gesetzlich vorgeschrieben'),
        ),
      ),
    ),
    keyLearning('Steuer sparen, SV sparen UND Gratis-Geld kassieren — gleichzeitig.'),
    igHandle(),
  ]);

  // ── SLIDE 7 — LEARNINGS / 4 SCHRITTE ───────────────────────────────────
  const learnings = [
    { num: '01', text: 'Frage deinen Arbeitgeber nach der bAV-Option', pct: 25 },
    { num: '02', text: 'Lasse dir den Arbeitgeberzuschuss (15 %) schriftlich bestätigen', pct: 50 },
    { num: '03', text: 'Wähle die richtige Durchführungsart (z.B. Direktversicherung)', pct: 75 },
    { num: '04', text: 'Starte noch heute — jeder Monat ohne bAV kostet dich Rendite', pct: 100 },
  ];

  const slide7 = slideRoot([
    h('div', {
      style: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '16px',
      },
    },
      badge('DEIN FAHRPLAN'),
      logo(),
    ),
    headline('So startest du noch heute', 62),
    subline('4 Schritte zur betrieblichen Altersvorsorge'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', gap: '14px',
      },
    },
      ...learnings.map(l =>
        h('div', {
          style: {
            display: 'flex', flexDirection: 'column', gap: '10px',
            padding: '22px 28px', backgroundColor: C.cardBg,
            borderRadius: '18px',
          },
        },
          h('div', {
            style: {
              display: 'flex', alignItems: 'center', gap: '18px',
            },
          },
            h('span', {
              style: {
                fontSize: '38px', fontWeight: 800,
                color: l.pct === 100 ? C.green : C.text,
                minWidth: '56px', fontFamily: 'Outfit',
              },
            }, l.num),
            h('span', {
              style: {
                fontSize: '27px', fontWeight: 600,
                color: C.text, lineHeight: '1.3',
                fontFamily: 'Outfit',
              },
            }, l.text),
          ),
          h('div', {
            style: {
              display: 'flex', height: '6px',
              backgroundColor: C.border,
              borderRadius: '3px', overflow: 'hidden',
            },
          },
            h('div', {
              style: {
                display: 'flex', width: `${l.pct}%`, height: '6px',
                backgroundColor: l.pct === 100 ? C.green : C.text,
                borderRadius: '3px',
              },
            }),
          ),
        )
      ),
    ),
    keyLearning('Der Antrag dauert 10 Minuten — die Wirkung 30 Jahre.'),
    igHandle(),
  ]);

  // ── SLIDE 8 — CTA ──────────────────────────────────────────────────
  const slide8 = slideRoot([
    h('div', {
      style: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '16px',
      },
    },
      badge('DEIN NÄCHSTER SCHRITT'),
      logo(),
    ),
    headline('Nutzt du deine bAV schon?', 66),
    subline('Wenn nicht — dein Arbeitgeber schuldet dir Gratis-Geld'),
    h('div', {
      style: {
        display: 'flex', flex: '1', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: '28px',
      },
    },
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '12px',
          backgroundColor: C.cardBg, borderRadius: '24px',
          padding: '48px 56px',
        },
      },
        h('span', {
          style: {
            fontSize: '34px', fontWeight: 700, color: C.text,
            textAlign: 'center', lineHeight: '1.4', fontFamily: 'Outfit',
          },
        }, 'Schreib uns, wenn du wissen willst,'),
        h('span', {
          style: {
            fontSize: '34px', fontWeight: 700, color: C.green,
            textAlign: 'center', lineHeight: '1.4', fontFamily: 'Outfit',
          },
        }, 'wie viel dein Chef zahlen muss.'),
      ),
      h('div', {
        style: {
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '10px',
        },
      },
        h('span', {
          style: {
            fontSize: '28px', fontWeight: 600, color: C.textSoft,
            textAlign: 'center', fontFamily: 'Outfit',
          },
        }, 'Speichere diesen Post für später.'),
        h('span', {
          style: {
            fontSize: '26px', fontWeight: 500, color: C.textMuted,
            textAlign: 'center', fontFamily: 'Outfit', lineHeight: '1.5',
          },
        }, 'Folge @benarofinanzen für mehr kostenlose Finanztipps'),
      ),
    ),
    keyLearning('Jedes Jahr ohne bAV kostet dich im Schnitt 600 EUR Förderung.'),
    igHandle(),
  ]);

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8];
  const outDir = path.join(__dirname, 'output/carousel_2026-10-04/slides');
  fs.mkdirSync(outDir, { recursive: true });

  for (let i = 0; i < slides.length; i++) {
    const svg = await satori(slides[i], { width: W, height: H, fonts });
    const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: W } });
    const pngData = resvg.render();
    const pngPath = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    fs.writeFileSync(pngPath, pngData.asPng());
    console.log(`Slide ${i + 1}/${slides.length} done: ${pngPath}`);
  }
  console.log('Alle Slides erfolgreich generiert!');
}

main().catch(e => { console.error(e); process.exit(1); });
