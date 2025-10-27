// app/boutique/[slug]/page.js
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';

// Données produits (slug, title, image, price, rating, reviewsCount, tvaNote, includes[], tableRows[] ...)
import { PRODUCTS } from '@/lib/catalogue';
import { getProductStatsMap } from '@/lib/supabase/products';

// Composants UI
import ProductBuyBoxClient from '@/components/boutique/ProductBuyBoxClient';
import NextLevelPackMatrix from '@/components/boutique/NextLevelPackMatrix';

const GOLD = '#E8C88F';

/* ---------- SSG helpers ---------- */
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const p = PRODUCTS.find((x) => x.slug === resolvedParams?.slug);
  if (!p) return {};
  return {
    title: `${p.title} – Boutique`,
    description: p.excerpt || p.includes?.[0] || 'Pack boutique JWL Marketing',
    openGraph: {
      title: p.title,
      description: p.excerpt || '',
      images: p.image ? [{ url: p.image }] : [],
    },
  };
}

/* ---------- Page ---------- */
export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const p = PRODUCTS.find((x) => x.slug === resolvedParams?.slug);
  if (!p) return notFound();

  const statsMap = await getProductStatsMap([p.slug]);
  const stats = statsMap.get(p.slug);

  const rating = stats?.average_rating ?? p.rating ?? 5;
  const reviewsCount = stats?.total_reviews_count ?? p.reviewsCount ?? 0;

  // Colonnes pour le tableau "NextLevelPackMatrix"
  // On autorise p.tableRows (rows) directement depuis le catalogue pour flexibilité.
  const hasMatrix = Array.isArray(p.tableRows) && p.tableRows.length > 0;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* Fil d’Ariane */}
      <nav className="mt-6 flex items-center gap-2 text-sm text-neutral-500">
        <FaChevronLeft aria-hidden className="h-3 w-3 text-neutral-400" />
        <Link href="/boutique" className="hover:underline">
          Boutique
        </Link>
        <span className="mx-1">/</span>
        <span className="text-neutral-900">{p.title}</span>
      </nav>

      {/* HERO : image à gauche, buybox à droite */}
      <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-center">
        {/* Colonne gauche : visuel */}
        <div className="flex items-center justify-center lg:justify-start lg:pl-16">
          <ProductPolaroid src={p.image} alt={p.title} className="lg:mt-0" />
        </div>

        {/* Colonne droite : buy box plus large */}
        <div className="w-full lg:pl-6">
          <ProductBuyBoxClient
            title={p.title}
            productSlug={p.slug}
            productImage={p.image}
            basePrice={p.price}
            rating={rating}
            reviewsCount={reviewsCount}
            tvaNote={p.tvaNote}
            checkoutHref={p.checkoutHref || `/checkout/${p.slug}`}
            pricingMode={p.pricingMode || p.options?.pricingMode || 'scale'}
            optionsConfig={p.options}
            advanced={p.advanced}
            highlights={p.highlights}
          />
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <div className={`grid gap-10 ${hasMatrix ? 'lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]' : ''}`}>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Ce que vous obtenez</h2>
              <div
                className="mt-3 h-[3px] w-full rounded"
                style={{ backgroundColor: GOLD }}
              />
            </div>

            {Array.isArray(p.includes) && p.includes.length > 0 ? (
              <ul className="space-y-2">
                {p.includes.map((it, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-[7px] inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: GOLD }}
                    />
                    <span className="text-[15.5px] leading-7 text-neutral-800">
                      {it}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            {p.richContent ? (
              <div
                className="space-y-6 text-[15.5px] leading-7 text-neutral-800"
                dangerouslySetInnerHTML={{ __html: p.richContent }}
              />
            ) : null}
          </div>

          {hasMatrix ? (
            <div className="hidden rounded-xl border border-black/10 bg-neutral-50 p-4 lg:block">
              <NextLevelPackMatrix
                title={p.matrixTitle || p.category || 'Comparatif des packs'}
                columns={{
                  pack: 'Pack',
                  price: 'Prix de base',
                  includes: 'Ce qui est inclus',
                }}
                rows={p.tableRows}
                note={
                  p.matrixNote ||
                  '⚡ À savoir : vous choisissez votre pack et passez commande. Vous recevez immédiatement un cahier des charges interactif à compléter avant la visio.'
                }
                accentColor={GOLD}
                className="mt-0"
              />
            </div>
          ) : null}
        </div>
      </section>

      {hasMatrix ? (
        <div className="mt-8 lg:hidden">
          <NextLevelPackMatrix
            title={p.matrixTitle || p.category || 'Comparatif des packs'}
            columns={{
              pack: 'Pack',
              price: 'Prix de base',
              includes: 'Ce qui est inclus',
            }}
            rows={p.tableRows}
            note={
              p.matrixNote ||
              '⚡ À savoir : vous choisissez votre pack et passez commande. Vous recevez immédiatement un cahier des charges interactif à compléter avant la visio.'
            }
            accentColor={GOLD}
          />
        </div>
      ) : null}

      <section className="mt-10">
        <Card title="Une question ?">
          <p className="text-sm text-neutral-700">
            Besoin d’un conseil ou d’un devis personnalisé ?{' '}
            <Link href="/contact" className="font-semibold text-neutral-900 underline">
              Contactez-moi
            </Link>
            .
          </p>
        </Card>
      </section>
    </main>
  );
}

/* ------- petits composants ------- */
function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function normalizeDropbox(src = '/assets/notfound.jpg') {
  if (!src) return '/assets/notfound.jpg';
  try {
    const url = new URL(src);
    if (url.hostname.includes('dropbox.com')) {
      url.hostname = 'dl.dropboxusercontent.com';
      url.searchParams.set('raw', '1');
    }
    return url.toString();
  } catch (error) {
    return src;
  }
}

function ProductPolaroid({ src, alt, className = '' }) {
  const safeSrc = normalizeDropbox(src);
  return (
    <div className={`relative inline-block -rotate-1 transition-transform duration-300 hover:rotate-0 hover:-translate-y-0.5 ${className}`}>
      <span aria-hidden className="absolute -top-3 -left-3 h-6 w-16 rotate-[-8deg] rounded-[2px] bg-amber-200/70 shadow-sm" />
      <span aria-hidden className="absolute -top-2 -right-4 h-6 w-14 rotate-[10deg] rounded-[2px] bg-amber-200/70 shadow-sm" />
      <div className="relative overflow-hidden rounded-sm bg-white shadow-[0_10px_24px_rgba(0,0,0,0.18)] ring-1 ring-black/10 w-[240px] sm:w-[280px] md:w-[320px]">
        <div className="m-4 overflow-hidden rounded-[3px] bg-neutral-50">
          <div className="relative w-full" style={{ aspectRatio: '4 / 5' }}>
            <Image
              src={safeSrc || '/assets/notfound.jpg'}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, 320px"
              priority
            />
          </div>
        </div>
        <div className="px-4 pb-5 pt-1">
          <div className="h-5" />
        </div>
      </div>
    </div>
  );
}
