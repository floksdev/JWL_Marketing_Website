'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const SUGGESTIONS = [
  {
    slug: '/boutique/logo-pro',
    title: 'Pack Logo Pro',
    price: 'À partir de 360 €',
    image: 'https://www.dropbox.com/scl/fi/aaw9ncadrota3nb8pd9b4/2.png?rlkey=3vlmamvjc7hz1frv91azf2n3l&st=7teiqp4y&raw=1',
  },
  {
    slug: '/boutique/seo-local',
    title: 'Pack SEO Local',
    price: 'À partir de 390 €',
    image: 'https://www.dropbox.com/scl/fi/jzc4sljb09pctrwqx0bxn/3-referencement-seo-local-jwl-marketing.png?rlkey=7ofl3rw1f47ghmvs3czvzbfjl&st=jjv3le7n&raw=1',
  },
  {
    slug: '/boutique/pack-salon',
    title: 'Pack Salon',
    price: '450 € / jour',
    image: 'https://www.dropbox.com/scl/fi/0jb1mw1pfrlaeyxd4r0ny/developpement-commercial-b2b-salon-aix-marseille.png?rlkey=lou022c3z3x16606atpn4oa06&st=dwji9foe&raw=1',
  },
];

function formatPrice(value) {
  if (!Number.isFinite(value)) return null;
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
}

function getLineTotal(item) {
  const price = Number.isFinite(item.price) ? item.price : null;
  const qty = item.quantity ?? 1;
  return price != null ? formatPrice(price * qty) : item.priceDisplay ?? '—';
}

export default function CartPageClient() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [acceptedCGV, setAcceptedCGV] = useState(false);
  const [termsError, setTermsError] = useState('');

  const hasItems = Array.isArray(items) && items.length > 0;

  const handleCheckout = async () => {
    if (!hasItems || isProcessing) return;
    if (!acceptedCGV) {
      setTermsError('Merci de confirmer avoir lu et accepté les CGV.');
      return;
    }
    setTermsError('');
    setIsProcessing(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error('Stripe session creation failed');
      }

      const data = await response.json();
      if (!data?.url) {
        throw new Error('Stripe session URL missing');
      }

      try {
        await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: [] }),
        });
      } catch (error) {
        console.error('Cart reset failed:', error);
      }

      clearCart();
      setIsProcessing(false);
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-neutral-500">Boutique</p>
          <h1 className="text-3xl font-extrabold text-neutral-900 sm:text-4xl">Votre panier</h1>
        </div>
        <Link
          href="/boutique"
          className="inline-flex items-center justify-center rounded-full border border-neutral-900 px-5 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
        >
          Continuer mes achats
        </Link>
      </div>

      {!hasItems ? (
        <div className="mt-12 space-y-10">
          <div className="rounded-2xl border border-dashed border-black/15 bg-white px-6 py-12 text-center shadow-sm">
            <p className="text-lg font-semibold text-neutral-900">Votre panier est vide.</p>
            <p className="mt-2 text-sm text-neutral-600">
              Ajoutez un pack depuis la boutique pour le retrouver ici et finaliser votre commande.
            </p>
            <Link
              href="/boutique"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Explorer la boutique
            </Link>
          </div>

          <section className="rounded-2xl border border-black/10 bg-white px-6 py-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-wide text-neutral-500">Besoin d’inspiration ?</p>
                <h2 className="text-2xl font-semibold text-neutral-900">Nos best-sellers</h2>
              </div>
              <Link
                href="/boutique"
                className="inline-flex items-center justify-center rounded-full border border-neutral-900 px-5 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
              >
                Parcourir tous les packs
              </Link>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SUGGESTIONS.map((product) => (
                <article
                  key={product.slug}
                  className="flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-neutral-50 shadow-sm transition hover:-translate-y-[2px] hover:shadow-md"
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(min-width: 1024px) 240px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 px-4 py-5">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900">{product.title}</h3>
                      <p className="text-sm text-neutral-600">{product.price}</p>
                    </div>
                    <Link
                      href={product.slug}
                      className="mt-auto inline-flex items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                      Découvrir le pack
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
          <section className="space-y-6">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-6"
              >
                <div className="relative h-28 w-full overflow-hidden rounded-xl sm:h-24 sm:w-24">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-xl border border-dashed border-black/20 text-xs text-neutral-400">
                      Visuel
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-neutral-900">{item.title}</h2>
                    {item.priceDisplay ? (
                      <p className="text-sm text-neutral-600">{item.priceDisplay}</p>
                    ) : null}
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="mt-1 inline-block text-sm font-medium text-neutral-600 underline underline-offset-4"
                      >
                        Voir le détail du pack
                      </Link>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-700">
                    <div className="inline-flex items-center rounded-full border border-black/10 bg-white">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-l-full hover:bg-neutral-100"
                        aria-label={`Diminuer la quantité de ${item.title}`}
                        onClick={() => updateQuantity(item.id, (item.quantity ?? 1) - 1)}
                      >
                        −
                      </button>
                      <span className="px-4 text-base font-semibold text-neutral-900">
                        {item.quantity ?? 1}
                      </span>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-r-full hover:bg-neutral-100"
                        aria-label={`Augmenter la quantité de ${item.title}`}
                        onClick={() => updateQuantity(item.id, (item.quantity ?? 1) + 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="font-semibold text-neutral-900">{getLineTotal(item)}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-xs font-medium uppercase tracking-wide text-neutral-400 hover:text-neutral-700"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900">Récapitulatif</h2>
            <div className="mt-4 space-y-3 text-sm text-neutral-700">
              <div className="flex items-center justify-between">
                <span>Sous-total</span>
                <span className="text-base font-semibold text-neutral-900">{formatPrice(total) ?? '—'}</span>
              </div>
              <p className="text-xs text-neutral-500">
                Les taxes éventuelles seront précisées lors du paiement. Livraison numérique immédiate quand applicable.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleCheckout}
                disabled={!hasItems || isProcessing || !acceptedCGV}
                className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
              >
                {isProcessing ? 'Redirection…' : 'Procéder au paiement'}
              </button>
              <label className="flex items-start gap-3 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={acceptedCGV}
                  onChange={(event) => setAcceptedCGV(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                />
                <span>
                  J’ai lu et j’accepte les{' '}
                  <Link href="/cgv" className="font-semibold underline">
                    Conditions Générales de Vente
                  </Link>.
                </span>
              </label>
              {termsError ? (
                <p className="text-xs text-red-600">{termsError}</p>
              ) : null}
              <button
                type="button"
                onClick={clearCart}
                className="inline-flex items-center justify-center rounded-full border border-neutral-900 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
              >
                Vider le panier
              </button>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
