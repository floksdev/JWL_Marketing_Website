import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/catalogue';
import { getTopRatedProducts } from '@/lib/supabase/products';

const GOLD = '#E8C88F';
const STAR = '#F6C84E';

function renderStars(value = 5) {
  const rounded = Math.round(value);
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    stars.push(
      <Star key={i} color={i <= rounded ? STAR : '#E5E5E5'} />
    );
  }
  return stars;
}

export default async function AlliesSection() {
  const topStats = await getTopRatedProducts(3);
  if (!topStats.length) return null;

  const catalogueMap = new Map(PRODUCTS.map((product) => [product.slug, product]));

  const cards = topStats.map((stat) => {
    const base = catalogueMap.get(stat.slug);
    const quote = base?.highlights?.[0] ?? base?.excerpt ?? 'Pack incontournable de la boutique.';

    return {
      slug: stat.slug,
      href: `/boutique/${stat.slug}`,
      title: base?.title ?? stat.title ?? stat.slug,
      image: base?.image ?? stat.image ?? '/assets/notfound.jpg',
      quote,
      rating: stat.average_rating ?? base?.rating ?? 5,
      reviewsCount: stat.total_reviews_count ?? base?.reviewsCount ?? 0,
    };
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">Vos alliés stratégiques</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <AllyCard key={card.slug} card={card} />
        ))}
      </div>
    </section>
  );
}

function AllyCard({ card }) {
  return (
    <article className="relative rounded-md border border-neutral-200 bg-white shadow-sm">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-2 rounded-sm"
        style={{ boxShadow: `inset 0 0 0 2px ${GOLD}` }}
      />

      <div
        aria-hidden
        className="absolute -top-2 left-2 right-2 h-[6px] rounded-sm"
        style={{ backgroundColor: GOLD }}
      />

      <header className="px-5 pt-5 pb-3 text-center">
        <h3 className="text-lg font-semibold tracking-[0.06em] text-neutral-800">
          {card.title}
        </h3>
      </header>

      <div className="px-5">
        <Link href={card.href} className="group block overflow-hidden rounded-sm">
          <Image
            src={card.image}
            alt={card.title}
            width={480}
            height={360}
            className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>
      </div>

      <div className="flex flex-col items-center gap-1 py-3">
        <div className="flex items-center justify-center gap-1">
          {renderStars(card.rating)}
        </div>
        <p className="text-xs text-neutral-500">
          {card.reviewsCount} avis vérifiés
        </p>
      </div>

      <p className="px-6 pb-5 text-center text-sm italic text-neutral-600">
        {card.quote}
      </p>
    </article>
  );
}

function Star({ color = '#F6C84E' }) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden fill={color}>
      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.7 4.8 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
    </svg>
  );
}
