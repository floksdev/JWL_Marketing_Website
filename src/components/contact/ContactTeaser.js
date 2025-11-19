// components/ContactTeaser.jsx
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

const GOLD = "#E8C88F";

export default function ContactTeaser({
  title = "On travaille ensemble ?",
  // phrase d’accroche; le lien est rendu à part via linkLabel/linkHref
  lead = "Si vous voulez bosser avec quelqu’un d’authentique, efficace et complice, qui comprend votre business avant même votre pitch…",
  linkLabel = "écrivez-moi !",
  linkHref = "/contact",

  ctaLabel = "Prendre un premier contact",
  ctaHref = "/contact",
  ctaTarget = "_self",

  imageSrc = "/assets/notfound.jpg", // tu remplaceras
  imageAlt = "Aperçu",
  imageSide = "right",               // 'right' | 'left'
  showSeparator = true,
  taupe = false,                     // fond taupe optionnel
}) {
  const reverse = imageSide === "left";

  return (
    <section className={clsx("mx-auto max-w-7xl px-6 py-12", taupe && "rounded-md bg-[rgb(186,151,134)]/80")}>
      <div
        className={clsx(
          "grid items-center gap-10 lg:gap-14",
          "grid-cols-1 lg:grid-cols-2",
          reverse && "lg:[&>div:first-child]:order-2"
        )}
      >
        {/* Texte */}
        <div>
          {title && (
            <>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                {title}
              </h2>
              {showSeparator && (
                <div className="mt-2 h-[3px] w-full rounded" style={{ backgroundColor: GOLD }} />
              )}
            </>
          )}

          <p className="mt-6 text-[17px] leading-7 text-neutral-900">
            {lead}{" "}
            {linkHref && (
              <Link href={linkHref} className="underline underline-offset-4">
                {linkLabel}
              </Link>
            )}
          </p>

          {ctaLabel && ctaHref && (
            <div className="mt-6">
              <Link
                href={ctaHref}
                target={ctaTarget}
                className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-white shadow-sm transition hover:translate-x-[1px] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60"
              >
                <span className="text-sm sm:text-base font-medium">{ctaLabel}</span>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* Visuel – iPad mockup + signature */}
        <div className={clsx("flex justify-center", reverse ? "lg:justify-start" : "lg:justify-end")}>
          <DeviceFrame>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 420px"
              className="object-cover"
            />
          </DeviceFrame>

          {/* Signature chevauchée */}
          <div className="relative -mt-4 h-0 w-0">
            <Image
              src="/assets/signature.png"
              alt=""
              width={220}
              height={60}
              className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2"
              style={{ top: 12, filter: "drop-shadow(0 2px 6px rgba(0,0,0,.25))" }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- sous-composant : cadre iPad ---------- */
function DeviceFrame({ children }) {
  return (
    <div
      className="
        relative
        w-[320px] sm:w-[360px] md:w-[420px]
        aspect-[3/4]
        rounded-[28px]
        bg-black
        shadow-[0_12px_30px_rgba(0,0,0,0.25)]
        ring-1 ring-black/20
        overflow-hidden
      "
      aria-label="Aperçu sur tablette"
    >
      {/* bord interne */}
      <div className="absolute inset-[10px] rounded-[22px] bg-neutral-900" />

      {/* écran */}
      <div className="absolute inset-[14px] rounded-[18px] bg-black overflow-hidden">
        <div className="absolute inset-0">{children}</div>
      </div>

      {/* capteurs haut */}
      <div className="pointer-events-none absolute left-1/2 top-2 z-10 flex -translate-x-1/2 items-center gap-1.5">
        <span className="h-[6px] w-[6px] rounded-full bg-neutral-700" />
        <span className="h-[6px] w-[6px] rounded-full bg-neutral-700" />
      </div>
    </div>
  );
}
