export const metadata = {
  title: "Conditions Générales de Vente — JWL Marketing",
  description: "Consultez les conditions générales de vente applicables aux prestations et packs commercialisés par JWL Marketing.",
};

export default function CgvPage() {
  const sections = [
    {
      title: "1. Objet",
      body:
        "Les présentes Conditions Générales de Vente s’appliquent à toutes les prestations de services proposées par JWL Marketing : conseil en communication, développement commercial, webmarketing, création de contenus, identité visuelle, formation et coaching.",
    },
    {
      title: "2. Prestations et formules",
      body:
        "JWL Marketing propose des prestations sur mesure ou en packs : Pack Starter (initiation et accompagnement ponctuel), Pack Booster (développement commercial et marketing plus complet) et Pack Premium (suivi complet, stratégie et mise en œuvre sur plusieurs canaux). Chaque offre peut être ajustée selon les besoins du client.",
    },
    {
      title: "3. Tarifs et paiement",
      body:
        "Les prix des prestations sont indiqués hors taxes. Les paiements s’effectuent par virement, chèque ou tout autre moyen convenu. Un acompte peut être demandé pour certaines prestations.",
    },
    {
      title: "4. Durée et résiliation",
      body:
        "La durée de la mission est précisée dans le contrat ou le devis. Toute résiliation doit être formulée par écrit, en respectant le préavis mentionné dans le contrat. En cas de non-paiement, JWL Marketing se réserve le droit de suspendre les prestations.",
    },
    {
      title: "5. Responsabilités",
      body:
        "JWL Marketing met tout en œuvre pour délivrer des prestations de qualité mais ne peut garantir l’atteinte des résultats commerciaux ou marketing, ceux-ci dépendant également du client et de facteurs externes.",
    },
    {
      title: "6. Données personnelles et confidentialité",
      body:
        "Conformément au RGPD, seules les données nécessaires à l’exécution de la mission et à la facturation sont collectées. Elles sont conservées pendant la durée légale et ne sont jamais transmises à des tiers sans accord. Le client dispose d’un droit d’accès, de rectification et de suppression de ses données.",
    },
  ];

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">JWL Marketing</p>
          <h1 className="mt-2 text-3xl font-semibold text-neutral-900">
            Conditions Générales de Vente
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            Les présentes Conditions Générales de Vente définissent les modalités de collaboration entre JWL Marketing et ses clients, en complément des devis ou contrats établis avant le démarrage des missions.
          </p>
        </div>

        <div className="space-y-4 text-sm text-neutral-700">
          {sections.map((section) => (
            <article key={section.title} className="rounded-2xl bg-neutral-50 p-5">
              <h2 className="text-lg font-semibold text-neutral-900">{section.title}</h2>
              <p className="mt-2 leading-relaxed">{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
