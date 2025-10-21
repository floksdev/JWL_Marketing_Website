// src/components/ServicesHubSection.jsx
'use client';

import Link from 'next/link';

const GOLD = '#E8C88F';

// ===== Réglages globaux =====
const CANVAS_W = 1160;
const CANVAS_H = 820;

const CENTER   = { x: CANVAS_W / 2, y: 330 };
const ROW_Y    = { top: 150, mid: 330, bot: 520 };

// Largeur/hauteur pilules
const PILL_W   = 380;
const PILL_H   = 90;

// Avatar (desktop)
const AVA      = 108;
const GAP      = 0;
const TEXT_GAP = 12;

// Espacement horizontal par ligne
const ROW_GAP_X = { top: 190, mid: 210, bot: 230 };

// helpers X
const xLeft  = (gap) => CENTER.x - (gap + PILL_W);
const xRight = (gap) => CENTER.x + gap;

export default function ServicesHubSection() {
  // Ancrages desktop
  const ORIGIN_LEFT  = xLeft(ROW_GAP_X.top);
  const ORIGIN_RIGHT = xRight(ROW_GAP_X.top);

  // Éloignement supplémentaire pour la ligne du milieu
  const EXTRA_MID   = 90;
  const MID_LEFT_X  = xLeft(ROW_GAP_X.mid + EXTRA_MID);
  const MID_RIGHT_X = xRight(ROW_GAP_X.mid + EXTRA_MID);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <header className="text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
          Les Prestations de Service de JWL Marketing
        </h2>
        <div className="mx-auto mt-2 h-1 w-[85%] md:w-[70%] rounded" style={{ backgroundColor: GOLD }} />
      </header>

      {/* Desktop */}
      <div
        className="relative mx-auto mt-10 hidden overflow-visible lg:block"
        style={{ height: CANVAS_H, maxWidth: CANVAS_W }}
      >
        <CenterAbsolute x={CENTER.x} y={CENTER.y} />

        {/* Ligne 1 */}
        <PillAbs
          side="left"
          x={ORIGIN_LEFT}
          y={ROW_Y.top}
          title="Audit SEO"
          caption="Stratégies • Optimisation • Référencement"
          gradient="from-[#386CC7] to-[#2F5AAC]"
          src="/assets/auditseo.png"
        />
        <PillAbs
          side="right"
          x={ORIGIN_RIGHT}
          y={ROW_Y.top}
          title="Refonte Web"
          caption="Arborescence • Avec ou sans SEO"
          gradient="from-[#8C6AD5] to-[#6D53B1]"
          src="/assets/refonteweb.png"
        />

        {/* Ligne 2 (plus loin sur X) */}
        <PillAbs
          side="left"
          x={MID_LEFT_X}
          y={ROW_Y.mid}
          title="Branding et Logo"
          caption="Identité visuelle • Logo • Valeurs"
          gradient="from-[#3BB7C5] to-[#2A95A1]"
          src="/assets/brandinglogo.png"
        />
        <PillAbs
          side="right"
          x={MID_RIGHT_X}
          y={ROW_Y.mid}
          title="Social Média"
          caption="Contenu • Mots clés • Conversion"
          gradient="from-[#5B58CC] to-[#4744A3]"
          src="/assets/notfound.jpg"
        />

        {/* Ligne 3 (alignée comme la 1) */}
        <PillAbs
          side="left"
          x={ORIGIN_LEFT}
          y={ROW_Y.bot}
          title="Développement commercial"
          caption="Prospection • Argumentaire • Closing"
          gradient="from-[#58B162] to-[#469251]"
          src="/assets/devcommercial.png"
        />
        <PillAbs
          side="right"
          x={ORIGIN_RIGHT}
          y={ROW_Y.bot}
          title="Formations"
          caption="Méthode • Confiance • Autonomie"
          gradient="from-[#F08E4A] to-[#D47430]"
          src="/assets/formations.png"
        />
      </div>

      {/* Mobile (≤ lg) — SANS le rond + texte ; le petit rectangle est déplacé à la fin */}
     <div className="mt-8 space-y-5 lg:hidden">
        {[
          ['Audit SEO', 'Stratégies • Optimisation • Référencement', 'from-[#386CC7] to-[#2F5AAC]', '/assets/auditseo.png'],
          ['Refonte Web', 'Arborescence • Avec ou sans SEO', 'from-[#8C6AD5] to-[#6D53B1]', '/assets/refonteweb.png'],
          ['Branding et Logo', 'Identité visuelle • Logo • Valeurs', 'from-[#3BB7C5] to-[#2A95A1]', '/assets/brandinglogo.png'],
          ['Social Média', 'Contenu • Mots clés • Conversion', 'from-[#5B58CC] to-[#4744A3]', '/assets/notfound.jpg'],
          ['Développement commercial', 'Prospection • Argumentaire • Closing', 'from-[#58B162] to-[#469251]', '/assets/devcommercial.png'],
          ['Formations', 'Méthode • Confiance • Autonomie', 'from-[#F08E4A] to-[#D47430]', '/assets/formations.png'],
        ].map(([t, c, g, s]) => (
          <PillRow key={t} title={t} caption={c} gradient={g} src={s} />
        ))}

        <MobilePortraitAtEnd />
      </div>
    </section>
  );
}

/* ---------- sous-composants ---------- */

function CenterAbsolute({ x, y }) {
  return (
    <div className="absolute z-10" style={{ left: x - 120, top: y - 120, width: 240, height: 240 }}>
      <span aria-hidden className="absolute inset-0 rounded-full" style={{ boxShadow: `inset 0 0 0 6px ${GOLD}` }} />
      <img src="/assets/personna_judie.png" alt="Jodie - Consultante" className="h-full w-full rounded-full object-cover" />
      <div className="absolute left-1/2 top-[260px] w-[260px] -translate-x-1/2 text-center">
        <p className="text-[18px] font-extrabold leading-5">Jodie LAPIALLERIE</p>
        <p className="text-[13px]" style={{ color: GOLD }}>Consultante</p>
      </div>
      {/* plus bas sur desktop */}
      <div className="absolute left-1/2 top-[380px] -translate-x-1/2">
          <img src='/assets/jodie_polaroid.png' alt="" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

function PillAbs({ side = 'left', x, y, title, caption, gradient, src }) {
  const padLeft  = side === 'right' ? AVA + GAP + TEXT_GAP : 20;
  const padRight = side === 'left'  ? AVA + GAP + TEXT_GAP : 20;

  const justify   = side === 'left' ? 'justify-end' : 'justify-start';
  const textAlign = side === 'left' ? 'text-right' : 'text-left';

  const hoverShift =
    side === 'left' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1';

  return (
    <Link
      href="#"
      className="group absolute z-20"
      style={{ left: x, top: y, width: PILL_W, height: PILL_H }}
      aria-label={title}
    >
      {/* Avatar côté centre */}
      <span
        className="absolute top-1/2 -translate-y-1/2 block h-[108px] w-[108px] overflow-hidden rounded-full border-2 border-white shadow-md"
        style={side === 'left' ? { right: -(AVA / 2 - 2) } : { left: -(AVA / 2 - 2) }}
      >
        <img src={src} alt="" className="h-full w-full object-cover" />
      </span>

      {/* Pilule */}
      <span
        className={`flex h-full items-center ${justify} rounded-full bg-gradient-to-r ${gradient} text-white shadow-md transition
                    duration-200 ease-out ${hoverShift} group-hover:shadow-lg group-hover:brightness-110`}
        style={{ paddingLeft: padLeft, paddingRight: padRight }}
      >
        <div className={`leading-tight ${textAlign}`}>
          <div className="text-[19px] font-semibold">{title}</div>
          <div className="text-[13px] opacity-90">{caption}</div>
        </div>
      </span>
    </Link>
  );
}

/* ===== Mobile only bits ===== */

function PillRow({ title, caption, gradient, src }) {
  return (
    <Link href="#" className="group relative inline-flex items-center mt-2">
      <span className="absolute left-5 z-10 h-[88px] w-[88px] overflow-hidden rounded-full border-2 border-white shadow-md">
        <img src={src} alt="" className="h-full w-full object-cover" />
      </span>
      <span
        className={`ml-[36px] w-full rounded-full bg-gradient-to-r ${gradient} px-6 py-4 text-white shadow-md
                    transition duration-200 group-hover:brightness-110 group-hover:shadow-lg`}
      >
        <span className="pl-14 block text-[18px] font-semibold leading-6">{title}</span>
        <span className="pl-14 block text-[13px] opacity-90">{caption}</span>
      </span>
    </Link>
  );
}

/* Petit rectangle photo, placé À LA FIN sur mobile */
function MobilePortraitAtEnd() {
  return (
    <div className="mt-4 flex justify-center">
        <img src="/assets/jodie_polaroid.png" alt="" className="h-full w-full object-cover" />
    </div>
  );
}
