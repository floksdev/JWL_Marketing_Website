export const metadata = {
  title: "Politique de confidentialité — JWL Marketing",
  description: "Transparence sur la collecte, l’usage et la conservation des données personnelles traitées par JWL Marketing.",
};

export default function ConfidentialitePage() {
  const sections = [
    {
      title: "Données collectées",
      body: "Nom, prénom, email, téléphone et informations de facturation nécessaires au suivi des missions.",
    },
    {
      title: "Finalité du traitement",
      body: "Gestion des missions, communication commerciale, facturation et suivi client.",
    },
    {
      title: "Durée de conservation",
      body: "Les données sont conservées entre 3 et 5 ans selon les obligations légales et comptables applicables.",
    },
    {
      title: "Droits du client",
      body: "Vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant à service@jwl-marketing.fr.",
    },
  ];

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">JWL Marketing</p>
          <h1 className="mt-2 text-3xl font-semibold text-neutral-900">
            Politique de confidentialité
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            JWL Marketing s’engage à protéger vos données personnelles et à les utiliser uniquement
            dans le cadre de la relation commerciale définie avec vous.
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
