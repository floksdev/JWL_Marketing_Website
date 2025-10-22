// components/SectionSinglePack.jsx
import Link from "next/link";
import Image from "next/image";

const TAUPE_BG = "bg-[rgb(186,151,134)]/80";

export default function SectionSinglePack({
  title = "Pack Refonte Web",
  href = "/produits/refonte-web",
  imageSrc = "https://www.dropbox.com/scl/fi/1nk5fc2g85ayggmn62wy0/8-arborescence-web-seo-jwl-marketin.png?rlkey=q6i5l0828azec6po9awgywzo4&st=b7gjqmab&raw=1",         // tu remplaceras + (penser à next.config.js si domaine externe)
  caption = "",                              // optionnel : texte sous la photo dans le polaroid
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-0">
      {/* bande taupe comme sur tes maquettes */}
      <div className={`mt-8 rounded-md ${TAUPE_BG} px-4 py-12`}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>

          <Link
            href={href}
            aria-label={title}
            className="mx-auto mt-8 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70"
          >
            {/* ----- Polaroid ----- */}
            <div
              className="
                relative inline-block
                -rotate-1 md:-rotate-2
                transition-transform duration-300
                group hover:rotate-0 hover:-translate-y-0.5
              "
            >
              {/* “Scotchs” */}
              <span
                aria-hidden
                className="absolute -top-3 -left-3 h-6 w-16 rotate-[-8deg] rounded-[2px] bg-amber-200/70 shadow-sm"
              />
              <span
                aria-hidden
                className="absolute -top-2 -right-4 h-6 w-14 rotate-[10deg] rounded-[2px] bg-amber-200/70 shadow-sm"
              />

              {/* Carte polaroid */}
              <div
                className="
                  relative overflow-hidden
                  rounded-sm bg-white
                  shadow-[0_10px_24px_rgba(0,0,0,0.18)]
                  ring-1 ring-black/10
                  transition-shadow duration-300
                  group-hover:shadow-[0_14px_30px_rgba(0,0,0,0.22)]
                "
                style={{
                  width: 340,                 // largeur fixe pour garder le look “photo”
                }}
              >
                {/* zone photo (bord fin tout autour) */}
                <div className="m-4 overflow-hidden rounded-[3px] bg-neutral-50">
                  <div className="relative w-full" style={{ aspectRatio: "4 / 5" }}>
                    <Image
                      src={imageSrc}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 320px, 340px"
                      priority
                    />
                  </div>
                </div>

                {/* pied du polaroid, plus épais */}
                <div className="px-4 pb-5 pt-1">
                  {caption ? (
                    <p className="text-center text-[13px] leading-5 text-neutral-700">
                      {caption}
                    </p>
                  ) : (
                    <div className="h-5" />   
                  )}
                </div>
              </div>
            </div>
            {/* ----- fin Polaroid ----- */}
          </Link>
        </div>
      </div>
    </section>
  );
}
