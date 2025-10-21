// src/components/AboutSection.jsx
'use client';

import Link from 'next/link';

const BG   = '#D9B8AA';   // rose chaud du bloc
const GOLD = '#E8C88F';   // doré du cadre

export default function AboutSection() {
  return (
    <section
      className="relative"
      style={{ backgroundColor: BG }}
    >
      {/* liserés haut/bas façon maquette */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ backgroundColor: GOLD }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[3px]"
        style={{ backgroundColor: GOLD }}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-12 md:grid-cols-2 md:py-16">
        {/* Texte */}
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-neutral-900">
            Aider les entreprises ambitieuses à<br className="hidden md:block" />
            booster leur visibilité et leurs ventes
          </h2>

          <div className="my-4 h-[2px] w-[95%] overflow-hidden " style={{ backgroundColor: GOLD }} />

          <p className="text-[15px] leading-7 text-neutral-900">
            Je suis Jodie, consultante en marketing, développeuse commerciale et
            créatrice de contenu.
            <br />Mon rôle ? Être à la fois ta partenaire business, ta coach digitale et ton
            alliée commerciale pendant que tu développes ta marque, trouves de
            nouveaux clients et donnes un vrai coup d’accélérateur à tes ventes.
            <br />Je mixe donc le développement commercial avec le SEO et la création
            de contenu pour révéler tout le potentiel de ton entreprise et la
            mettre en pleine lumière sur son marché.
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {/* Bouton style champ mail */}
            <input
              type="text"
              className="rounded-2xl border border-black/20 bg-white/90 px-6 py-3 text-base font-medium text-neutral-800 shadow-sm w-[60%] md:w-[65%]"
              placeholder="Votre adresse e-mail"
            >
            </input>

            {/* Abonne-toi */}
            <Link
              href="#newsletter"
              className="rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-neutral-800"
            >
              Abonne toi
            </Link>
          </div>
        </div>

        {/* Visuel circulaire avec cadre doré + couronne */}
        <div className="flex justify-center">
          <div className="relative h-[340px] w-[340px] md:h-[420px] md:w-[420px]">
            {/* cadre doré */}
            <div
              className="absolute -inset-2 rounded-full"
              style={{ boxShadow: `inset 0 0 0 6px ${GOLD}` }}
              aria-hidden
            />
            {/* photo */}
            <img
              src="/assets/jodie2.jpeg"           // ➜ place l’image dans /public/assets/about/jodie.jpg
              alt="Jodie - JWL Marketing"
              className="h-full w-full rounded-full object-cover"
            />
            {/* signature en bas */}
            <img
              src="/assets/signature.png"
              alt=""
              className="pointer-events-none absolute top-66 md:top-82 left-1/2 w-40 -translate-x-1/2 md:w-48"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
