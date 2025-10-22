// components/PacksPolaroidSection.jsx
import Link from "next/link";
import Image from "next/image";

const GOLD = "#E8C88F";

/** Sécurise les liens Dropbox pour next/image */
function normalizeDropbox(src = "/assets/notfound.jpg") {
  if (!src) return "/assets/notfound.jpg";
  try {
    const u = new URL(src);
    if (u.hostname.includes("dropbox.com")) {
      u.hostname = "dl.dropboxusercontent.com";
      u.searchParams.set("raw", "1");
    }
    return u.toString();
  } catch {
    return src;
  }
}

function Polaroid({ alt, src }) {
  const safeSrc = normalizeDropbox(src);
  return (
    <div className="relative inline-block -rotate-1 md:-rotate-2 transition-transform duration-300 group-hover:rotate-0 group-hover:-translate-y-0.5">
      <span aria-hidden className="absolute -top-3 -left-3 h-6 w-16 rotate-[-8deg] rounded-[2px] bg-amber-200/70 shadow-sm" />
      <span aria-hidden className="absolute -top-2 -right-4 h-6 w-14 rotate-[10deg] rounded-[2px] bg-amber-200/70 shadow-sm" />
      <div className="relative overflow-hidden rounded-sm bg-white shadow-[0_10px_24px_rgba(0,0,0,0.18)] ring-1 ring-black/10 transition-shadow duration-300 group-hover:shadow-[0_14px_30px_rgba(0,0,0,0.22)] w-[240px] sm:w-[280px] md:w-[320px]">
        <div className="m-4 overflow-hidden rounded-[3px] bg-neutral-50">
          <div className="relative w-full" style={{ aspectRatio: "4 / 5" }}>
            <Image
              src={safeSrc || "/assets/notfound.jpg"}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, 320px"
              priority
            />
          </div>
        </div>
        <div className="px-4 pb-5 pt-1">
          <div className="h-5" />
        </div>
      </div>
    </div>
  );
}

/**
 * Props:
 * - title?: string (si absent → pas d’entête ni séparateur)
 * - iconSrc?: string (chemin/URL de l’icône gauche du titre)
 * - iconAlt?: string (alt de l’icône)
 * - packs: Array<{ title, href, quote?, src }>
 * - taupe?: boolean
 */
export default function PacksPolaroidSection({
  title,
  iconSrc,                  // <-- maintenant vraiment optionnel et passé tel quel
  iconAlt = "",
  packs = [],
  taupe = true,
}) {
  const isSingle = packs.length === 1;
  const k = Math.min(Math.max(packs.length, 1), 3);
  const cols = k === 1 ? "md:grid-cols-1" : k === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      {/* Entête seulement si `title` est fourni */}
      {title && (
        <>
          <div className="flex items-center gap-3">
            {iconSrc ? (
              <Image
                src={normalizeDropbox(iconSrc)}
                alt={iconAlt}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
                priority
              />
            ) : null}
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight underline underline-offset-4">
              {title}
            </h2>
          </div>
          <div className="mt-2 h-[3px] w-full rounded" style={{ backgroundColor: GOLD }} />
        </>
      )}

      {/* Conteneur */}
      <div className={`mt-8 rounded-md ${taupe ? "bg-[rgb(186,151,134)]/80" : ""} px-4 py-10`}>
        <div className={`mx-auto grid max-w-6xl grid-cols-1 gap-10 ${cols}`}>
          {packs.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="group block text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 rounded-lg"
              aria-label={p.title}
            >
              <h3 className={`font-semibold ${isSingle ? "text-2xl sm:text-3xl md:text-4xl" : "text-xl sm:text-2xl"}`}>
                {p.title}
              </h3>
              <div className="mt-6 flex justify-center">
                <Polaroid alt={p.title} src={p.src} />
              </div>
              {p.quote ? (
                <p className={`mt-5 text-neutral-900 leading-7 ${isSingle ? "text-lg sm:text-xl" : "text-base sm:text-lg"}`}>
                  {p.quote}
                </p>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
