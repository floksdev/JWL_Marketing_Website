'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const SUGGESTIONS = [
  {
    href: '/boutique/logo-pro',
    title: 'Pack Logo Pro',
    price: 'À partir de 360 €',
    image: 'https://www.dropbox.com/scl/fi/aaw9ncadrota3nb8pd9b4/2.png?rlkey=3vlmamvjc7hz1frv91azf2n3l&st=7teiqp4y&raw=1',
  },
  {
    href: '/boutique/seo-local',
    title: 'Pack SEO Local',
    price: 'À partir de 390 €',
    image: 'https://www.dropbox.com/scl/fi/jzc4sljb09pctrwqx0bxn/3-referencement-seo-local-jwl-marketing.png?rlkey=7ofl3rw1f47ghmvs3czvzbfjl&st=jjv3le7n&raw=1',
  },
  {
    href: '/boutique/pack-salon',
    title: 'Pack Salon',
    price: '450 € / jour',
    image: 'https://www.dropbox.com/scl/fi/0jb1mw1pfrlaeyxd4r0ny/developpement-commercial-b2b-salon-aix-marseille.png?rlkey=lou022c3z3x16606atpn4oa06&st=dwji9foe&raw=1',
  },
];

function formatPrice(value) {
  if (!Number.isFinite(value)) return null;
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, total, count, removeItem, updateQuantity, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [acceptedCGV, setAcceptedCGV] = useState(false);
  const [termsError, setTermsError] = useState('');

  const handleCheckout = async () => {
    if (!items.length || isProcessing) return;
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
      closeCart();
      setIsProcessing(false);
      window.location.href = data.url;
      return;
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[98] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          <motion.aside
            className="fixed right-0 top-0 z-[99] flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <header className="flex items-center justify-between border-b border-black/10 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">Votre panier</h2>
                <p className="text-sm text-neutral-500">{count} article{count > 1 ? 's' : ''}</p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 hover:bg-neutral-100"
                aria-label="Fermer le panier"
              >
                ×
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="space-y-5">
                  <div className="rounded-2xl border border-dashed border-black/15 bg-neutral-50 px-4 py-5">
                    <p className="text-sm font-semibold text-neutral-900">Votre panier est vide.</p>
                    <p className="mt-1 text-sm text-neutral-600">
                      Ajoutez un pack pour le retrouver ici et finaliser votre commande.
                    </p>
                    <Link
                      href="/boutique"
                      onClick={closeCart}
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                      Explorer la boutique
                    </Link>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">Nos best-sellers</p>
                    <ul className="mt-3 space-y-3">
                      {SUGGESTIONS.map((suggestion) => (
                        <li
                          key={suggestion.href}
                          className="rounded-xl border border-black/10 bg-white px-4 py-3 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md"
                        >
                          <Link
                            href={suggestion.href}
                            onClick={closeCart}
                            className="flex items-center gap-3 text-sm"
                          >
                            <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-black/10 bg-neutral-100">
                              {suggestion.image ? (
                                <Image
                                  src={suggestion.image}
                                  alt={suggestion.title}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-[11px] text-neutral-400">
                                  Visuel
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <span className="block font-semibold text-neutral-900">{suggestion.title}</span>
                              <span className="block text-neutral-600">{suggestion.price}</span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map(item => (
                    <li key={item.id} className="flex gap-3 border-b border-black/5 pb-4 last:border-b-0 last:pb-0">
                      {item.image ? (
                        <div className="relative h-16 w-16 overflow-hidden rounded-md border border-black/10 bg-neutral-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                        </div>
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-md border border-dashed border-black/20 text-xs text-neutral-400">
                          Visuel
                        </div>
                      )}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-neutral-900">{item.title}</h3>
                          {item.priceDisplay ? (
                            <p className="text-sm text-neutral-600">{item.priceDisplay}</p>
                          ) : null}
                        </div>
                        <div className="flex items-center justify-between text-sm text-neutral-600">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="flex h-6 w-6 items-center justify-center rounded-full border border-black/10 text-neutral-700 hover:bg-neutral-100"
                              aria-label={`Diminuer la quantité de ${item.title}`}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              −
                            </button>
                            <span className="min-w-[1.5rem] text-center font-medium text-neutral-900">{item.quantity}</span>
                            <button
                              type="button"
                              className="flex h-6 w-6 items-center justify-center rounded-full border border-black/10 text-neutral-700 hover:bg-neutral-100"
                              aria-label={`Augmenter la quantité de ${item.title}`}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            className="text-xs font-medium uppercase text-neutral-400 hover:text-neutral-700"
                            onClick={() => removeItem(item.id)}
                          >
                            Retirer
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <footer className="border-t border-black/10 px-6 py-5">
              <div className="flex items-center justify-between text-sm text-neutral-700">
                <span>Total estimé</span>
                <span className="text-base font-semibold text-neutral-900">
                  {formatPrice(total) ?? '—'}
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={!items.length || isProcessing || !acceptedCGV}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
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
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  Voir mon panier
                </Link>
                <Link
                  href="/contact"
                  onClick={closeCart}
                  className="inline-flex items-center justify-center rounded-full border border-neutral-900 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
                >
                  Prendre rendez-vous
                </Link>
              </div>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
