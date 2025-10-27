'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

function StarButton({ value, current, onChange, disabled }) {
  const filled = value <= current;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      disabled={disabled}
      className={`flex h-8 w-8 items-center justify-center text-xl transition ${
        filled ? 'text-amber-500' : 'text-neutral-300 hover:text-amber-400'
      } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      aria-label={`Attribuer ${value} étoile${value > 1 ? 's' : ''}`}
    >
      {filled ? '★' : '☆'}
    </button>
  );
}

export default function OrderReviewSection({ orderId, orderNumber, items }) {
  const initialState = useMemo(() => {
    const map = new Map();
    for (const item of items) {
      map.set(item.slug, {
        rating: item.existingReview?.rating ?? 0,
        status: 'idle',
        error: null,
        stats: item.stats,
      });
    }
    return map;
  }, [items]);

  const [state, setState] = useState(initialState);

  const updateEntry = (slug, updater) => {
    setState((prev) => {
      const next = new Map(prev);
      const current = next.get(slug) ?? {
        rating: 0,
        status: 'idle',
        error: null,
        stats: items.find((item) => item.slug === slug)?.stats ?? {},
      };
      next.set(slug, updater(current));
      return next;
    });
  };

  const handleSubmit = async (slug) => {
    updateEntry(slug, (entry) => ({ ...entry, status: 'loading', error: null }));

    try {
      const entry = state.get(slug) || { rating: 0 };
      if (!Number.isFinite(entry.rating) || entry.rating < 1) {
        throw new Error('Sélectionnez une note entre 1 et 5.');
      }

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          productSlug: slug,
          rating: entry.rating,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || 'Impossible d’enregistrer la note.');
      }

      const data = await response.json();
      updateEntry(slug, (entryState) => ({
        ...entryState,
        status: 'success',
        stats: {
          average_rating: data?.stats?.average_rating ?? entryState.stats?.average_rating,
          total_reviews_count: data?.stats?.total_reviews_count ?? entryState.stats?.total_reviews_count,
        },
      }));
    } catch (error) {
      updateEntry(slug, (entryState) => ({
        ...entryState,
        status: 'error',
        error: error.message ?? 'Impossible d’enregistrer la note.',
      }));
    }
  };

  return (
    <div className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="border-b border-black/10 pb-4">
        <h2 className="text-xl font-semibold text-neutral-900">Noter les packs reçus</h2>
        {orderNumber ? (
          <p className="mt-1 text-sm text-neutral-500">Commande #{orderNumber}</p>
        ) : null}
      </div>

      <div className="mt-4 space-y-3">
        {items.map((item) => {
          const entry = state.get(item.slug) ?? {
            rating: 0,
            status: 'idle',
            error: null,
            stats: item.stats,
          };
          const average = entry.stats?.average_rating;
          const totalReviews = entry.stats?.total_reviews_count;
          const status = entry.status;
          const isLoading = status === 'loading';

          return (
            <div
              key={item.slug}
              className="flex flex-col gap-3 rounded-lg border border-black/10 bg-neutral-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-black/10 bg-white">
                  {item.image ? (
                    <Image src={item.image} alt={item.title} fill sizes="56px" className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                      Visuel
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{item.title}</p>
                  <p className="text-xs text-neutral-500">
                    Moyenne : {Number.isFinite(average) ? average.toFixed(1).replace('.', ',') : '—'} ({totalReviews ?? 0} avis)
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <StarButton
                      key={value}
                      value={value}
                      current={entry.rating}
                      onChange={(rating) => updateEntry(item.slug, (prev) => ({ ...prev, rating, error: null }))}
                      disabled={isLoading}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <button
                    type="button"
                    onClick={() => handleSubmit(item.slug)}
                    disabled={isLoading || entry.rating < 1}
                    className={`inline-flex items-center justify-center rounded-full px-4 py-1.5 font-medium text-white transition ${
                      status === 'success' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-neutral-900 hover:bg-neutral-800'
                    } disabled:cursor-not-allowed disabled:bg-neutral-300`}
                  >
                    {status === 'success' ? 'Enregistré' : isLoading ? 'Envoi…' : 'Envoyer'}
                  </button>
                  {status === 'error' && entry.error ? (
                    <span className="text-xs text-red-600">{entry.error}</span>
                  ) : null}
                  {status === 'success' ? (
                    <span className="text-xs text-emerald-600">Merci !</span>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
