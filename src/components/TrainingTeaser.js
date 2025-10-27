// src/components/TrainingTeaser.jsx
'use client';

import PolaroidImage from '@/components/reusable/PolaroidImage';

export default function TrainingTeaser({
  photo = 'https://www.dropbox.com/scl/fi/8nslkkek1vi1lcrjqwf39/6-home-page-jwl-marketing-digital.jpeg?rlkey=ovddy29y3gtt0391qqk57p86l&st=gtj10zl2&raw=1',
  logo  = '/assets/signature.png',
  title = "Améliorez votre carrière en vous formant sur la prospection, les méthodes de vente…",
  subtitle = "Un atelier à la demande pour vous aider à atteindre vos objectifs de carrière",
  ctaText = "Obtenez la formation",
  ctaHref = "/formations"
}) {
  return (
    <section className="w-full py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-14">
        {/* Colonne Image */}
        <div className="flex flex-col items-center gap-4">
          <PolaroidImage src={photo} alt="Visuel formation" className="w-[260px] sm:w-[320px]" />
          {logo ? (
            <img src={logo} alt="JWL Marketing" className="h-12 w-auto" />
          ) : null}
        </div>

        {/* Colonne Texte */}
        <div className="text-center md:text-left">
          <h3 className="text-[20px] font-semibold leading-relaxed md:text-[22px]">
            {title}
          </h3>

          <div className="mt-4 h-[3px] w-full rounded bg-[#E8C88F] md:ml-0 md:mr-auto mx-auto" />

          <p className="mt-5 text-[15px] leading-7 text-neutral-800">
            {subtitle}
          </p>

          <div className="mt-7">
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
