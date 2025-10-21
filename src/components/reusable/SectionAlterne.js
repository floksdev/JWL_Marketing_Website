// components/SectionAlterne.jsx
import Image from "next/image";
import clsx from "clsx";

const AMBER = "#EAB308"; // amber-500 (tu peux passer à 600 si tu veux #D97706)

/** Titrage SEO dynamique */
function Heading({ level = 2, className, children, id }) {
  const Tag = (`h${level}`) || "h2";
  return (
    <Tag id={id} className={clsx("font-extrabold leading-tight", className)}>
      {children}
    </Tag>
  );
}

/** Étoile simple */
function Star({ className, size = 90, color = AMBER, style }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={clsx("absolute pointer-events-none select-none opacity-90", className)}
      style={{ width: size, height: size, color, ...style }}
      aria-hidden
    >
      <path fill="currentColor" d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
    </svg>
  );
}

/** Presets de positions d'étoiles (dans un conteneur relatif) */
const STAR_PRESETS = {
  none: [],
  leftHero: [
    { style: { top: -30, left: -10 }, size: 120 },
    { style: { bottom: -20, left: -40 }, size: 70, color: "#D6B26E" },
  ],
  rightHero: [
    { style: { top: -20, right: -10 }, size: 120 },
    { style: { bottom: -30, right: -50 }, size: 70, color: "#D6B26E" },
  ],
};

export default function SectionAlterne({
  id,
  title,
  level = 2,                   // 1, 2 ou 3
  children,                     // contenu texte (paragraphes)
  imageSrc,
  imageAlt = "",
  imageSide = "right",          // 'left' | 'right'
  starPreset = "rightHero",     // 'none' | 'leftHero' | 'rightHero'
  stars = null,                 // tableau libre [{style, size, color}]
  ring = true,                  // cercle doré autour de l'image
}) {
  const starsToRender = stars ?? STAR_PRESETS[starPreset] ?? [];

  return (
    <section
      id={id}
      className="relative mx-auto max-w-7xl px-6 py-12"
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <div className={clsx(
        "grid items-center gap-8 lg:gap-12",
        "grid-cols-1 lg:grid-cols-2",
        imageSide === "right" ? "" : "lg:[&>div:first-child]:order-2"
      )}>
        {/* Colonne texte */}
        <div>
          <Heading id={id ? `${id}-title` : undefined} level={level} className="text-3xl sm:text-4xl">
            {title}
          </Heading>
          <div className="mt-2 h-[3px] w-40 rounded" style={{ backgroundColor: AMBER }} />
          <div className="prose prose-neutral max-w-none prose-p:leading-7 prose-p:md:leading-8 mt-6">
            {children}
          </div>
        </div>

        {/* Colonne image + étoiles */}
        <div className="relative flex items-center justify-center">
          {/* Étoiles décoratives (position absolue dans ce conteneur) */}
          {starsToRender.map((s, i) => (
            <Star key={i} {...s} />
          ))}

          <div className="relative">
            {ring && (
              <span
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: `inset 0 0 0 8px ${AMBER}`, filter: "drop-shadow(0 2px 10px rgba(0,0,0,.15))" }}
              />
            )}
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={560}
              height={560}
              className="h-[300px] w-[300px] sm:h-[360px] sm:w-[360px] lg:h-[420px] lg:w-[420px] rounded-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
