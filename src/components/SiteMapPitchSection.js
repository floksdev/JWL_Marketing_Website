// src/components/SiteMapPitchSection.jsx
'use client';

import Link from 'next/link';

const GOLD = '#E8C88F';        // liseré/décor doré
const PINK = '#E3D1C2';        // fond rosé de la section

export default function SiteMapPitchSection({
  img = '/assets/jodie2.jpeg',          // image circulaire à droite
  floralOverlay = '/assets/floral_overlay.png', // optionnel : décor floraux PNG (transparent)
  showFloral = false,                        // active/désactive l’overlay floral
}) {
  return (
    <section className="w-full py-14 md:py-20" style={{ backgroundColor: PINK }}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-12">
        {/* Colonne texte */}
        <div>
          <h2 className="text-2xl font-extrabold leading-tight md:text-[30px]">
            Construisez la carte de votre futur site.
          </h2>
          <div className="mt-3 h-1 w-full rounded" style={{ backgroundColor: GOLD }} />

          <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-neutral-900">
            <p>
              Imaginez que votre site web soit une maison : avant la déco et les finitions, il faut un plan solide.
              <strong> Je crée pour vous l’arborescence complète de votre site, avec ou sans stratégie SEO,</strong>
              {' '}pour que vos visiteurs trouvent naturellement ce qu’ils cherchent.
            </p>
            <p>
              <strong>Chaque plan est livré en PDF prêt à intégrer,</strong> que votre développeur ou votre équipe pourra
              utiliser immédiatement. Et parce que l’image compte,
              <strong> je peux aussi concevoir des visuels sur-mesure générés par IA,</strong>
              {' '}inspirés de votre marque et cédés avec tous les droits d’utilisation.
            </p>
            <p>
              Vous avez déjà un prestataire WordPress ? Parfait.
              <strong> Je propose de travailler en cohésion avec votre équipe</strong> afin de les aider à mettre en avant
              toute la prestation SEO en back-up.
            </p>
            <p>
              Pas encore de site ? <strong>Je peux vous mettre en relation avec un partenaire fiable</strong> pour la mise
              en ligne, sans que vous ayez à courir après le bon contact.
            </p>
            <p>
              Résultat : <strong>une architecture claire, des contenus optimisés</strong> si vous le souhaitez, et une
              identité visuelle qui vous ressemble… tout en vous laissant la liberté d’avancer à votre rythme.
            </p>
          </div>

          {/* CTA + mini aide */}
          <div className="relative mt-7 flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              Je veux en savoir plus
              <svg
                viewBox="0 0 24 24"
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14" />
                <path d="M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Colonne image ronde */}
        <div className="relative mx-auto h-[300px] w-[300px] sm:h-[340px] sm:w-[340px] md:h-[380px] md:w-[380px]">
          {/* Liseré or */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: `inset 0 0 0 8px ${GOLD}` }}
          />
          {/* Photo */}
          <img
            src={img}
            alt="Travail sur l’arborescence du site"
            className="h-full w-full rounded-full object-cover"
          />
          {/* Overlay floral optionnel */}
          {showFloral && (
            <img
              src={floralOverlay}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full rounded-full object-cover opacity-95"
            />
          )}
          {/* Signature/logo décor (optionnel) */}
          <div className="pointer-events-none absolute top-50 md:top-70 right-2 select-none opacity-80">
            <img src="/assets/signature.png" alt="" className="h-50 w-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
