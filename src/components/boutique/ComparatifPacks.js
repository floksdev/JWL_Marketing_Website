// components/ComparatifPacks.jsx
export default function ComparatifPacks({ title, subtitle, rows }) {
  // rows: [{ pack: "Essentiel", price: 250, items: ["…","…"] }, …]
  const GOLD = "#E8C88F";
  return (
    <section className="mt-10">
      <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">{title}</h2>
      <div className="mt-2 h-[3px] w-full rounded" style={{ backgroundColor: GOLD }} />
      {subtitle && <p className="mt-3 text-neutral-700">{subtitle}</p>}

      <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-4 py-3 text-left">Pack</th>
              <th className="px-4 py-3 text-left">Prix de base</th>
              <th className="px-4 py-3 text-left">Ce qui est inclus</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.pack} className="align-top even:bg-neutral-50/40">
                <td className="px-4 py-4 font-semibold">{r.pack}</td>
                <td className="px-4 py-4 font-medium">{formatPrice(r.price)}</td>
                <td className="px-4 py-4">
                  <ul className="space-y-1">
                    {r.items.map((it, k) => <li key={k}>• {it}</li>)}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-neutral-500">
        * Vous choisissez votre pack et passez commande. Cahier des charges immédiat, puis visio de cadrage.
      </p>
    </section>
  );
}
