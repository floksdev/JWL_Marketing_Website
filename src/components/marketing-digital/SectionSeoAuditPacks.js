// components/SectionSeoAuditPacks.jsx
import Link from "next/link";
import Image from "next/image";

const GOLD = "#E8C88F";

const packs = [
  {
    title: "STARTER SEO",
    href: "/produits/seo-starter",
    quote: "“Commencez à être vu.”",
  },
  {
    title: "BOOSTER SEO",
    href: "/produits/seo-booster",
    quote: "“Votre présence est plus vivante que jamais.”",
  },
  {
    title: "SEO LOCAL",
    href: "/produits/seo-local",
    quote: "“Dominez votre quartier.”",
  },
];

export default function SectionSeoAuditPacks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      {/* En-tête */}
      <div className="flex items-center gap-3">
        <Image
          src="/assets/notfound.jpg"   // icône temporaire (rocket)
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
          priority
        />
        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight underline underline-offset-4">
          Audit SEO et Rédaction Web
        </h2>
      </div>

      {/* Séparateur or w-full */}
      <div className="mt-2 h-[3px] w-full rounded" style={{ backgroundColor: GOLD }} />

      {/* Bandeau taupe + grille */}
      <div className="mt-8 rounded-md bg-[rgb(186,151,134)]/80 px-4 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
          {packs.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 rounded-lg"
            >
              <h3 className="text-center text-2xl font-semibold">{p.title}</h3>

              {/* Visuel placeholder */}
              <div className="mx-auto mt-5 w-[88%] max-w-[360px]">
                <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/10">
                  <Image
                    src="/assets/notfound.jpg"
                    alt={p.title}
                    width={720}
                    height={960}
                    className="h-72 w-full object-cover transition duration-200 group-hover:scale-[1.01]"
                  />
                </div>
              </div>

              {/* Un seul paragraphe pour la phrase */}
              <p className="mt-5 text-center text-lg leading-7 text-neutral-900">
                {p.quote}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
