// components/SectionBrandingPacks.jsx
import Link from "next/link";
import Image from "next/image";

const GOLD = "#E8C88F";

const items = [
  {
    title: "LOGO ESSENTIEL",
    href: "/produits/logo-essentiel",
    img: "/assets/notfound.jpg",
    alt: "Création de logo essentiel",
    quote: "“Votre identité en toute simplicité”",
  },
  {
    title: "LOGO IMPACT",
    href: "/produits/logo-impact",
    img: "/assets/notfound.jpg",
    alt: "Création de logo impact",
    quote: "“Pour marquer les esprits”",
  },
  {
    title: "LOGO EXCELLENCE",
    href: "/produits/logo-excellence",
    img: "/assets/notfound.jpg",
    alt: "Création de logo excellence",
    // Un seul <p> : on force juste un retour visuel
    quote: "“Votre image sublimée avec élégance”",
  },
];

export default function SectionBrandingPacks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      {/* En-tête */}
      <div className="flex items-center gap-3">
        <Image
          src="/assets/notfound.jpg" // optionnel : ton icône
          alt=""
          width={40}
          height={40}
          className="h-10 w-10"
          priority
        />
        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
          Identité visuelle et Branding
        </h2>
      </div>
      {/* Séparateur or w-full */}
      <div className="mt-2 h-[3px] w-full rounded" style={{ backgroundColor: GOLD }} />

      {/* Grille des packs */}
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
        {items.map((it) => (
          <Link
            key={it.title}
            href={it.href}
            className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 rounded-lg"
          >
            <h3 className="text-center text-2xl font-semibold tracking-wide">
              {it.title}
            </h3>

            {/* “iMac” simple : cadre noir + pied */}
            <div className="mx-auto mt-4 w-[88%] max-w-[440px]">
              <div className="rounded-xl bg-black px-2 pb-2 pt-2  shadow-md">
                <div className="overflow-hidden rounded-lg bg-white">
                  <Image
                    src={it.img}
                    alt={it.alt}
                    width={880}
                    height={540}
                    className="h-56 w-full object-cover transition duration-200 group-hover:scale-[1.01]"
                  />
                </div>
              </div>
              <div className="mx-auto h-4 w-3/4 rounded-b-xl bg-neutral-200" />
              <div className="mx-auto mt-1 h-1.5 w-1/2 rounded-full bg-neutral-300" />
            </div>

            {/* Un seul paragraphe (citation) */}
            <p className="mt-5 text-center text-lg leading-7 text-neutral-800">
              {it.quote}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
