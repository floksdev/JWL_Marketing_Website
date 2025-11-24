'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CahierDesChargesForm from './CahierDesChargesForm';

export default function CahierDesChargesModal({
  orderId,
  canManage = false,
  isAdmin = false,
  accessToken = null,
  initialResponses = {},
  initialStatuses = {},
  status = 'progress',
  lastUpdate = null,
}) {
  const [open, setOpen] = useState(false);
  const [formStatus, setFormStatus] = useState(status ?? 'progress');
  const validated = formStatus === 'done';
  const router = useRouter();

  useEffect(() => {
    if (!open) return undefined;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const handleAfterSave = (nextStatus) => {
    if (nextStatus) {
      setFormStatus(nextStatus);
    }
    router.refresh();
    if (nextStatus === 'done') {
      setOpen(false);
    }
  };

  if (!orderId) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-dashed border-amber-500/60 bg-amber-50/60 px-6 py-8">
      {!validated ? (
        <div className="text-center">
          {canManage || isAdmin ? (
            <>
              <div className="flex items-center justify-center">
                <span className="rounded-full bg-red-100 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-red-700">Obligatoire</span>
              </div>
              <p className="mt-3 text-lg font-semibold text-neutral-900">Nous avons besoin de quelques informations pour continuer</p>
              <button
                type="button"
                onClick={() => setOpen(true)}
                disabled={!accessToken}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
              >
                Remplir le formulaire* →
              </button>
            </>
          ) : (
            <p className="text-sm text-neutral-700">Le formulaire est réservé au client ayant passé commande.</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Documents</p>
            <h3 className="mt-2 text-xl font-semibold text-neutral-900">Cahier des charges — JWL Marketing</h3>
            <p className="mt-1 text-sm text-neutral-600">Validé. Dernière mise à jour : {lastUpdate ? new Date(lastUpdate).toLocaleString('fr-FR') : '—'}.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              disabled={!accessToken}
              className="inline-flex items-center justify-center rounded-full border border-neutral-900 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:border-neutral-200 disabled:text-neutral-400"
            >
              Voir & modifier →
            </button>
            {isAdmin ? (
              <a
                href={`/api/orders/${orderId}/form/download`}
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Télécharger le formulaire
              </a>
            ) : null}
          </div>
        </div>
      )}

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8">
          <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
            <button
              type="button"
              aria-label="Fermer le formulaire"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white transition hover:bg-neutral-800"
            >
              ✕
            </button>
            <CahierDesChargesForm
              orderId={orderId}
              accessToken={accessToken}
              canEdit={canManage || isAdmin}
              initialResponses={initialResponses}
              initialStatuses={initialStatuses}
              status={formStatus}
              onAfterSave={handleAfterSave}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
