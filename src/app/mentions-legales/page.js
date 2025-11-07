export default function MentionsLegalesPage() {
  const infos = [
    { label: "Raison sociale", value: "JWL Marketing – Auto-entrepreneur" },
    { label: "Adresse", value: "13290 Aix-en-Provence la Duranne" },
    { label: "Email", value: "service@jwl-marketing.fr" },
    { label: "Téléphone", value: "07.83.79.28.14" },
    { label: "SIRET", value: "98915438000012" },
    { label: "Hébergeur", value: "Vercel" },
  ];

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">JWL Marketing</p>
          <h1 className="mt-2 text-3xl font-semibold text-neutral-900">Mentions légales</h1>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            Conformément aux obligations légales, vous trouverez ci-dessous les informations relatives
            à l’éditeur du site et à son hébergeur.
          </p>
        </div>

        <dl className="space-y-4 text-sm text-neutral-700">
          {infos.map((item) => (
            <div key={item.label} className="flex flex-col gap-1 rounded-2xl bg-neutral-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <dt className="font-semibold text-neutral-900">{item.label}</dt>
              <dd className="text-neutral-700">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
