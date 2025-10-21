// src/components/StorytellingSection.jsx
'use client';

export default function StorytellingSection({ imgSrc = '/assets/notfound.jpg' }) {
  return (
    <section className="w-full py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Titre */}
        <h2 className="text-center text-[26px] font-extrabold leading-tight md:text-[32px]">
          Découvrez le pouvoir du storytelling sur vos réseaux sociaux avec
          <br />
          <span className="mt-1 inline-block">JWL Marketing !</span>
        </h2>

        {/* Cartes texte */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          <CardText>
            <p>La communication, c’est raconter des histoires&nbsp;!</p>
            <p className="font-semibold">Chez JWL Marketing, on raconte des contes.</p>
            <p>
              C’est pourquoi j’utilise les techniques de storytelling
              dans les stratégies que j’élabore pour mes clients.
            </p>
          </CardText>

          <CardText>
            <p>Donnez du sens à votre marque.</p>
            <p>Captez l’attention de votre audience.</p>
            <p className="font-semibold">
              Créez de l’émotion et renforcez le lien émotionnel
              <br />
              avec vos clients.
            </p>
          </CardText>
        </div>

        {/* Image centrée dessous */}
        <div className="mt-10 flex justify-center">
          <img
            src={imgSrc}
            alt="Storytelling visuel"
            className="h-auto w-[78%] max-w-[540px] rounded-md object-cover shadow-md md:w-[520px] md:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}

/* — Sous-composant — */
function CardText({ children }) {
  return (
    <div className="rounded-md bg-[#CEA99D]/95 p-7 text-center leading-7 text-neutral-900 md:p-8">
      <div className="space-y-3">{children}</div>
    </div>
  );
}
