// src/components/AlliesSection.jsx
'use client';

import Link from 'next/link';

const GOLD = '#E8C88F';      // cadre doré léger
const STAR = '#F6C84E';      // étoiles

export default function AlliesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">Vos alliés stratégiques</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AllyCard
          title="SEO LOCAL"
          img="/assets/allies_1.png"
          quote="“Dominez votre quartier.”"
          href="/services/seo-local"
        />

        <AllyCard
          title="PACK VISIBLE"
          img="/assets/allies_2.png"
          quote="“Rédigez, optimisez, brillez en ligne.”"
          href="/services/pack-visible"
        />

        <AllyCard
          title="LOGO ESSENTIEL"
          img="/assets/allies_3.png"
          quote="“Votre identité en toute simplicité.”"
          href="/services/logo-essentiel"
        />
      </div>
    </section>
  );
}

/* ——— Carte réutilisable ——— */
function AllyCard({ title, img, quote, href }) {
  return (
    <article className="relative rounded-md border border-neutral-200 bg-white shadow-sm">
      {/* cadre doré fin autour de la carte */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-2 rounded-sm"
        style={{ boxShadow: `inset 0 0 0 2px ${GOLD}` }}
      />

      {/* barre dorée décorative au-dessus du header */}
      <div
        aria-hidden
        className="absolute -top-2 left-2 right-2 h-[6px] rounded-sm"
        style={{ backgroundColor: GOLD }}
      />

      {/* header */}
      <header className="px-5 pt-5 pb-3 text-center">
        <h3 className="text-lg font-semibold tracking-[0.06em] text-neutral-800">
          {title}
        </h3>
      </header>

      {/* image */}
      <div className="px-5">
        <Link href={href ?? '#'} className="group block overflow-hidden rounded-sm">
          <img
            src={img}
            alt={title}
            className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>
      </div>

      {/* étoiles */}
      <div className="flex items-center justify-center gap-1 py-3">
        <Star color={STAR} /><Star color={STAR} /><Star color={STAR} /><Star color={STAR} /><Star color={STAR} />
      </div>

      {/* baseline */}
      <p className="px-6 pb-5 text-center text-sm italic text-neutral-600">
        {quote}
      </p>
    </article>
  );
}

/* ——— Icône étoile ——— */
function Star({ color = '#F6C84E' }) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden fill={color}>
      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.7 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  );
}
