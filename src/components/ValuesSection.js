// src/components/ValuesSection.jsx
'use client';

const GOLD = '#E8C88F';
const BAND = '#D9B8AC'; // fond rosé de la bande (ajuste si besoin)

export default function ValuesSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
      {/* Titre */}
      <header className="mb-6">
        <h2 className="text-2xl font-extrabold md:text-[28px]">Mes valeurs</h2>
        <div
          className="mt-3 h-1 w- rounded"
          style={{ backgroundColor: GOLD }}
        />
      </header>

      {/* Bande valeurs */}
      <div
        className="rounded-md"
        style={{ backgroundColor: BAND }}
      >
        {/* filets dorés haut/bas */}
        <div
          className="h-[6px] w-full rounded-t-md"
          style={{ backgroundColor: GOLD }}
        />
        <div className="grid grid-cols-1 gap-8 px-6 py-8 sm:px-8 md:grid-cols-4 md:gap-10 md:py-10">
          <Value
            num="01"
            title="Proximité"
            text={`Je place l’humain au cœur de chaque projet. Comprendre vos besoins et ceux de vos clients me permet de créer des stratégies sur mesure, pertinentes et impactantes.`}
          />
          <Value
            num="02"
            title="Intégrité"
            text={`Je suis fiable et transparente, et j’agis toujours dans votre intérêt. Chaque action est claire, chaque engagement tenu, pour bâtir une relation durable et confiante.`}
          />
          <Value
            num="03"
            title="Créativité"
            text={`Je cherche constamment à innover pour apporter des solutions uniques et modernes. Chaque projet bénéficie d’idées originales et d’un design réfléchi, adapté à vos objectifs.`}
          />
          <Value
            num="04"
            title="Performance"
            text={`Tout ce que j’entreprends vise un objectif concret : plus de visibilité, de prospects qualifiés et une fidélisation renforcée. Des actions mesurables pour un impact réel.`}
          />
        </div>
        <div
          className="h-[6px] w-full rounded-b-md"
          style={{ backgroundColor: GOLD }}
        />
      </div>
    </section>
  );
}

function Value({ num, title, text }) {
  return (
    <article className="text-neutral-900">
      <div className="mb-2 text-2xl font-extrabold tracking-tight md:text-3xl">
        {num}
      </div>
      <h3 className="mb-2 font-serif text-xl italic md:text-[22px]">
        {title}
      </h3>
      <p className="text-[15.5px] leading-relaxed text-neutral-800/90">
        {text}
      </p>
    </article>
  );
}
