// components/SectionPourquoiIndependant.jsx

const GOLD = '#E8C88F';

export default function SectionPourquoiIndependant() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {/* Titre */}
      <h2 className="text-center text-3xl sm:text-4xl font-extrabold">
        Pourquoi choisir un consultant indépendant
        <br className="hidden sm:block" />
        dans le marketing digital?
      </h2>
      <div className="mx-auto mt-3 h-[3px] w-full rounded"  style={{ backgroundColor: GOLD }}/>

      {/* Encart histoire */}
      <div className="mx-auto mt-8 max-w-5xl rounded-md bg-[rgb(186,151,134)]/80 shadow-sm ring-1 ring-black/10">
        <blockquote className="px-6 sm:px-10 py-10 text-center font-serif text-[18px] sm:text-[19px] leading-8 sm:leading-9 text-neutral-900">
          <p>
         “Quand Claire, gérante d’
            une boutique déco, m
            ’
            a appelée, elle revenait d’
            un rendez-vous d’
            agence.
            <br/>
            Devis salé, réunions à rallonge, trois interlocuteurs différents.
            <br/>
            Elle voulait de la visibilité, pas un organigramme.
            <br/>
            Ensemble, on a fait simple : un audit express, un plan social media, quelques optimisations SEO.
            <br/>
            Résultat : +40 % de trafic en 6 mois, sans passer par la case
            ‘
            comité stratégique
            ’
            .
            <br/>
            Un seul contact, des actions rapides, zéro bla-bla.
            <br/>
            C’
            est ça, l’
            avantage d’
            un freelance marketing.
            ”
          </p>
        </blockquote>
      </div>
    </section>
  );
}
