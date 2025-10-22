// components/SectionAlterne.jsx
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

const AMBER = "#EAB308"; // amber-500

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

/** Presets d'étoiles (positions relatives autour de l'image) */
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
  level = 2,
  children,
  imageSrc,
  imageAlt = "",
  imageSide = "right",
  starPreset = "rightHero",
  stars = null,
  ring = true,              // cercle doré autour de l'image (héritage)
  Circle = true,            // si false => pas de cercle ni ring + image non rognée
  // CTA optionnel
  ctaLabel = "",
  ctaHref = "",
  ctaTarget = "_self",
}) {
  const starsToRender = stars ?? (STAR_PRESETS?.[starPreset] ?? []);
  const showRing = ring && Circle;

  return (
    <section
      id={id}
      className="relative mx-auto max-w-7xl px-10 py-12"
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <div
        className={clsx(
          "grid items-center gap-8 lg:gap-12",
          "grid-cols-1 lg:grid-cols-2",
          imageSide === "right" ? "" : "lg:[&>div:first-child]:order-2"
        )}
      >
        {/* Colonne texte */}
        <div>
          <Heading id={id ? `${id}-title` : undefined} level={level} className="text-3xl sm:text-4xl">
            {title}
          </Heading>
          <div className="mt-2 h-[3px] w-full rounded" style={{ backgroundColor: AMBER }} />
          <div className="prose prose-neutral max-w-none prose-p:leading-7 prose-p:md:leading-8 mt-6">
            {children}
          </div>

          {/* CTA optionnel */}
          {ctaLabel && (
            <div className="mt-6">
              {ctaHref ? (
                <Link
                  href={ctaHref}
                  target={ctaTarget}
                  className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-white shadow-sm transition hover:translate-x-[1px] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60"
                >
                  <span className="text-sm sm:text-base font-medium">{ctaLabel}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-white shadow-sm transition hover:translate-x-[1px] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60"
                >
                  <span className="text-sm sm:text-base font-medium">{ctaLabel}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Colonne image + étoiles */}
        <div className="relative flex items-center justify-center">
          {/* Étoiles décoratives */}
          {starsToRender.map((s, i) => (
            <Star key={i} {...s} />
          ))}

          {/* Conteneur visuel + signature */}
          <div className="relative">
            {showRing && (
              <span
                aria-hidden
                className={clsx("absolute inset-0", Circle && "rounded-full")}
                style={{
                  boxShadow: `inset 0 0 0 8px ${AMBER}`,
                  filter: "drop-shadow(0 2px 10px rgba(0,0,0,.15))",
                }}
              />
            )}

            {/* Image principale */}
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={560}
              height={560}
              className={clsx(
                Circle
                  // avatar rond = on garde le carré + cover
                  ? "h-[300px] w-[300px] sm:h-[360px] sm:w-[360px] lg:h-[420px] lg:w-[420px] rounded-full object-cover"
                  // image libre = PAS de carré: largeur max, hauteur auto, ratio respecté
                  : "w-full max-w-[620px] h-auto rounded-md object-contain"
              )}
              priority
            />

            {/* Signature (absolute, centrée, à cheval sur le bas de l'image) */}
            <Image
              src="/assets/signature.png"
              alt=""
              width={220}
              height={60}
              className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: "-120px", // chevauche le bas de l'image (ajuste à ton goût)
                filter: "drop-shadow(0 2px 6px rgba(0,0,0,.25))",
              }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
