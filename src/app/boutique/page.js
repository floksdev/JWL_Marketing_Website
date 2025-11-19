// app/boutique/page.jsx
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS as _PRODUCTS, CATEGORIES as _CATEGORIES } from "@/lib/catalogue";
import { getProductStatsMap } from "@/lib/supabase/products";

export const metadata = {
  title: "Boutique — JWL Marketing",
  description: "Packs marketing digital, branding et SEO prêts à être achetés en ligne avec paiement sécurisé.",
};

const GOLD  = "#E8C88F";
const TAUPE = "rgb(186,151,134)";

/* ----------- helpers sûrs ----------- */
function safeArray(x) {
  return Array.isArray(x) ? x : [];
}

// Déduit des catégories si non fournies par le catalogue
function computeCategories(products, categoriesFromCatalogue) {
  const PRODUCTS = safeArray(products);

  // Si le catalogue exporte déjà CATEGORIES valides, on les garde
  if (Array.isArray(categoriesFromCatalogue) && categoriesFromCatalogue.length) {
    return categoriesFromCatalogue
      .filter(c => c && c.key) // hygiène
      .map(c => ({ icon: c.icon ?? "•", key: String(c.key), label: c.label ?? String(c.key) }));
  }

  // Sinon, on déduit à partir des produits (ordre d'apparition)
  const seen = new Set();
  const dedup = [];
  for (const p of PRODUCTS) {
    if (!p?.category) continue;
    const key = String(p.category);
    if (!seen.has(key)) {
      seen.add(key);
      dedup.push({ icon: "•", key, label: key });
    }
  }
  return dedup;
}

function formatPrice(n) {
  try {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
  } catch {
    return `${n}€`;
  }
}

/* ----------- Composants ----------- */

function Shelf({ icon, title, children }) {
  return (
    <section
      className="
        rounded-2xl px-4 py-6 sm:px-5 ring-1 ring-black/5
        shadow-[inset_0_1px_0_rgba(0,0,0,0.04)]
      "
      style={{ background: "linear-gradient(0deg, rgba(186,151,134,0.10), rgba(186,151,134,0.10))" }}
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          aria-hidden
          className="h-6 w-6 rounded-full shadow-sm ring-1 ring-black/10 flex items-center justify-center"
          style={{ backgroundColor: GOLD }}
          title={icon || ""}
        />
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}

function Stars({ value = 5 }) {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <span aria-label={`${value}/5`} className="leading-none">
      <span style={{ color: GOLD }}>{"★".repeat(full)}</span>
      <span className="text-neutral-300">{"★".repeat(5 - full)}</span>
    </span>
  );
}

function ProductCard({ p }) {
  if (!p) return null;
  const price = typeof p.price === "number" ? formatPrice(p.price) : p.price ?? "—";

  return (
    <Link
      href={`/boutique/${p.slug}`}
      className="
        group block overflow-hidden rounded-2xl bg-white
        shadow-sm ring-1 ring-black/10
        transition will-change-transform
        hover:-translate-y-[2px] hover:shadow-md
        focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/60
      "
      aria-label={p.title ?? "Voir le pack"}
    >
      {/* Media */}
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={p.image || "/assets/notfound.jpg"}
          alt={p.title || "Visuel de pack"}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[16.5px] font-semibold text-neutral-900 leading-snug">
            {p.title ?? "Pack"}
          </h3>
          <div className="shrink-0 text-right">
            <div className="text-[13px] text-neutral-500 leading-none">à partir de</div>
            <div className="text-[17px] font-bold text-neutral-900">{price}</div>
          </div>
        </div>

        {p.excerpt ? (
          <p className="mt-2 line-clamp-2 text-[14.5px] leading-6 text-neutral-700">
            {p.excerpt}
          </p>
        ) : null}

        {/* Preuves */}
        <div className="mt-3 flex items-center gap-1 text-[12.5px] text-neutral-600">
          <Stars value={p.rating} />
          <span>({p.reviewsCount ?? 0})</span>
        </div>

        {/* Badges */}
        {Array.isArray(p.badges) && p.badges.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {p.badges.map((b, i) => (
              <span
                key={`${b}-${i}`}
                className="rounded-full bg-neutral-100 px-2 py-1 text-[11.5px] text-neutral-700 ring-1 ring-black/5"
              >
                {b}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[11.5px] text-neutral-500">{p.tvaNote ?? ""}</span>
          <span
            className="
              inline-flex items-center gap-1 rounded-full bg-neutral-900 px-3 py-1.5
              text-[12px] font-medium text-white
              transition group-hover:translate-x-[1px]
            "
          >
            Voir le pack
            <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" />
              <path d="M13 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ----------- Page ----------- */

export default async function Boutique() {
  const baseProducts = safeArray(_PRODUCTS);
  const statsMap = await getProductStatsMap(baseProducts.map((p) => p.slug));
  const PRODUCTS = baseProducts.map((product) => {
    const stats = statsMap.get(product.slug);
    return {
      ...product,
      rating: stats?.average_rating ?? product.rating ?? 5,
      reviewsCount: stats?.total_reviews_count ?? product.reviewsCount ?? 0,
    };
  });

  const CATEGORIES = computeCategories(PRODUCTS, _CATEGORIES);

  // groupe par catégorie (respecte l'ordre de CATEGORIES calculées)
  const grouped = CATEGORIES
    .map(cat => ({
      cat,
      items: PRODUCTS.filter(p => p?.category === cat.key),
    }))
    .filter(g => g.items.length > 0);

  const hasAnything = grouped.length > 0;

  return (
    <main className="mx-auto max-w-full px-6 py-10">
      {/* Header local */}
      <header className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-neutral-900">
          Boutique
        </h1>
        <div className="mt-2 h-[3px] w-full rounded" style={{ backgroundColor: GOLD }} />
        <p className="mt-4 text-[15.5px] leading-7 text-neutral-700">
          Choisissez un pack, réglez en ligne, recevez votre cahier des charges immédiatement, puis on planifie la visio.
          Simple et rapide.
        </p>
      </header>

      {!hasAnything ? (
        <EmptyState />
      ) : (
        <div className="space-y-10">
          {grouped.map(({ cat, items }) => (
            <Shelf key={cat.key} icon={cat.icon} title={cat.label ?? cat.key}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <ProductCard key={p.slug ?? Math.random()} p={p} />
                ))}
              </div>
            </Shelf>
          ))}
        </div>
      )}
    </main>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center">
      <p className="text-neutral-700">
        Aucun produit à afficher pour le moment.
      </p>
      <p className="mt-1 text-sm text-neutral-500">
        Vérifie l’export <code className="font-mono">PRODUCTS</code> dans <code className="font-mono">lib/catalogue</code>.
      </p>
    </div>
  );
}
