// components/QuiSuisJeTeaser.jsx
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

const GOLD = "#E8C88F";

export default function QuiSuisJeTeaser({
  title = "Qui suis-je ?",
  excerpt = "Je m’appelle Jodie, née en 1989, génération Y : oui, j’ai survécu aux tamagotchis, aux premiers textos, et aux CD qu’il fallait graver pour écouter sa musique. Je vis à Aix-en-Provence depuis plus de 20 ans, au milieu des calissons, des marchés colorés et des petites entreprises locales qui ...",
  href = "/qui-suis-je",
  ctaLabel = "Lire la suite",
  imageSrc = "/assets/notfound.jpg",  // tu remplaceras plus tard
  imageAlt = "Portrait",
  imageSide = "right",                // 'left' | 'right'
  showSeparator = true,               // affiche la ligne or w-full
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div
        className={clsx(
          "grid items-center",
          "grid-cols-1 lg:grid-cols-2",
          imageSide === "right" ? "" : "lg:[&>div:first-child]:order-2"
        )}
      >
        {/* Colonne texte */}
        <div>
          {title && (
            <>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                {title}
              </h2>
              {showSeparator && (
                <div
                  className="mt-2 h-[3px] w-full rounded"
                  style={{ backgroundColor: GOLD }}
                />
              )}
            </>
          )}

          {excerpt && (
            <p className="mt-6 text-[17px] leading-7 text-neutral-900">
              {excerpt}
            </p>
          )}

          {ctaLabel && href && (
            <div className="mt-6">
              <Link
                href={href}
                className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-white shadow-sm transition hover:translate-x-[1px] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60"
              >
                <span className="text-sm sm:text-base font-medium">
                  {ctaLabel}
                </span>
                {/* icône flèche */}
                <svg
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
            </div>
          )}
        </div>

        {/* Colonne image (polaroid léger) */}
        <div
          className={clsx(
            "flex justify-center mt-8 lg:mt-0",
            imageSide === "right" ? "lg:justify-end" : "lg:justify-start"
          )}
        >
          <div className="relative -rotate-1 md:-rotate-2 transition-transform duration-300 hover:rotate-0 hover:-translate-y-0.5">
            {/* “scotchs” */}
            <span
              aria-hidden
              className="absolute -top-3 -left-3 h-6 w-16 rotate-[-8deg] rounded-[2px] bg-amber-200/70 shadow-sm"
            />
            <span
              aria-hidden
              className="absolute -top-2 -right-4 h-6 w-14 rotate-[10deg] rounded-[2px] bg-amber-200/70 shadow-sm"
            />
            {/* carte polaroid */}
            <div className="relative w-[240px] sm:w-[300px] md:w-[340px] overflow-hidden rounded-sm bg-white shadow-[0_10px_24px_rgba(0,0,0,0.18)] ring-1 ring-black/10 transition-shadow duration-300 hover:shadow-[0_14px_30px_rgba(0,0,0,0.22)]">
              <div className="m-4 overflow-hidden rounded-[3px] bg-neutral-50">
                <div className="relative w-full" style={{ aspectRatio: "4 / 5" }}>
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 340px"
                    priority
                  />
                </div>
              </div>
              {/* pied blanc plus épais */}
              <div className="px-4 pb-5 pt-1">
                <div className="h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
