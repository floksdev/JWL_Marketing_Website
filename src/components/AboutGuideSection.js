// src/components/AboutGuideSection.jsx
'use client';

const GOLD = '#E8C88F';

export default function AboutGuideSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-14 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
        {/* Colonne gauche : visuel rond + décor */}
        <div className="relative mx-auto h-[320px] w-[320px] sm:h-[360px] sm:w-[360px]">
          {/* Cercle photo */}
          <div className="absolute inset-0 rounded-full bg-white shadow-sm" />
          <img
            src="/assets/jodie2.jpeg"
            alt="Jodie — JWL Marketing"
            className="absolute inset-0 h-full w-full rounded-full object-cover"
          />

          {/* Anneaux (double liseré) */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ boxShadow: `inset 0 0 0 6px ${GOLD}` }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-2 rounded-full ring-2 ring-white/90"
          />

          {/* Signature (optionnel) : place ton logo si tu veux */}
          <img
            src="/assets/signature.png"
            alt=""
            className="pointer-events-none absolute top-60 md:top-70 left-1/2 -translate-x-1/2 h-40 w-auto opacity-70"
          />
        </div>

        {/* Colonne droite : titre + filet + texte */}
        <div>
          <h2 className="text-center text-2xl font-extrabold leading-snug sm:text-3xl md:text-left">
            Votre guide de référence pour le marketing
          </h2>

          {/* Filet doré */}
          <div
            className="mx-auto mt-3 h-1 w-full rounded md:mx-0"
            style={{ backgroundColor: GOLD }}
          />

          <div className="mt-5 space-y-3 text-[15.5px] leading-relaxed text-neutral-700">
            <p>
              Après plusieurs années à piloter la communication et le développement de PME
              industrielles, j’ai compris que les entreprises n’avaient pas seulement besoin de jolis
              visuels ou de chiffres : elles avaient besoin d’une voix, d’une stratégie qui relie le
              terrain au digital.
            </p>
            <p>
              C’est ce qui m’a poussée à créer JWL Marketing. Aujourd’hui, j’accompagne les dirigeants
              et leurs équipes comme une partenaire business et une coach digitale. Je les aide à
              trouver leurs clients, à structurer leur communication et à faire rayonner leur marque,
              en mêlant développement commercial, SEO et création de contenu.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
