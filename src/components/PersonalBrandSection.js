// src/components/PersonalBrandSection.jsx
'use client';

import PolaroidImage from '@/components/reusable/PolaroidImage';

const GOLD = '#E8C88F';

export default function PersonalBrandSection({
  frameImg = 'https://www.dropbox.com/scl/fi/tu6s8jaok3st5wjnpt6b8/5-referencement-naturel-jodie-lapaillerie-jwl-marketing.jpg?rlkey=k1mnqjrpo13dgu9pk3ear5n5a&st=9cbh7s7s&raw=1',
  doodle = '/assets/doodle_heart.png',
}) {
  return (
    <section className="w-full py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-12">
        {/* Visuel gauche */}
        <div className="relative mx-auto w-full max-w-[360px] md:max-w-[420px]">
          <PolaroidImage src={frameImg} alt="Exemple de présence de marque personnelle" className="w-full" />
        </div>

        {/* Texte droite */}
        <div>
          <h2 className="text-[26px] font-extrabold leading-tight md:text-[30px]">
            Créez une marque personnelle qui vous aidera à atteindre vos objectifs de carrière
          </h2>

          <div className="mt-4 h-1 w-full rounded" style={{ backgroundColor: GOLD }} />

          <p className="mt-5 text-[15.5px] leading-7 text-neutral-800">
            JWL Marketing propose de concevoir votre logo pour aider les professionnels créatifs
            comme vous à établir une marque personnelle claire et puissante. Il vous aidera à oser
            l’autopromotion et à vous forger une réputation qui vous ouvrira des portes et
            propulsera votre carrière.
          </p>
        </div>
      </div>

      {/* doodle décor bas droite (desktop only) */}
      {doodle && (
        <div className="pointer-events-none relative mt-6 hidden select-none md:block">
          <img
            src={doodle}
            alt=""
            className="absolute right-10 -bottom-4 h-40 w-auto opacity-90"
            draggable={false}
          />
        </div>
      )}
    </section>
  );
}
