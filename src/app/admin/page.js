import Link from 'next/link';
import Image from 'next/image';
import { isAdminRequest } from '@/lib/auth/admin';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { buildOrderLink, formatOrderNumber } from '@/lib/orders';

function formatAmount(amount, currency = 'eur') {
  if (!Number.isFinite(amount)) return '—';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
  }).format(amount / 100);
}

function formatDate(value) {
  const date = value ? new Date(value) : null;
  if (!date) return '—';
  return date.toLocaleString('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default async function AdminPage({ searchParams }) {
  const params = await searchParams;
  const isAdmin = await isAdminRequest();
  const error = params?.error === 'invalid';

  if (!isAdmin) {
    return (
      <main className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-neutral-900">Connexion administrateur</h1>
          <p className="mt-2 text-sm text-neutral-600">Identifiez-vous pour accéder aux commandes et documents.</p>
          {error ? (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">Identifiants invalides.</p>
          ) : null}
          <form className="mt-6 space-y-4" method="POST" action="/api/admin/login">
            <label className="block text-sm">
              <span className="text-neutral-700">Email</span>
              <input
                type="email"
                name="email"
                required
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
              />
            </label>
            <label className="block text-sm">
              <span className="text-neutral-700">Mot de passe</span>
              <input
                type="password"
                name="password"
                required
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Se connecter
            </button>
          </form>
        </div>
      </main>
    );
  }

  const supabase = getSupabaseAdmin();
  const { data: orders } = await supabase
    .from('orders')
    .select('id, order_number, created_at, email, items, total_cents, currency, form_status, form_sections, form_access_token, form_updated_at')
    .order('created_at', { ascending: false });

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Tableau de bord</p>
          <h1 className="text-3xl font-semibold text-neutral-900">Commandes & formulaires</h1>
        </div>
        <form method="POST" action="/api/admin/logout">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full border border-neutral-900 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
          >
            Se déconnecter
          </button>
        </form>
      </div>

      <div className="grid gap-4">
        {(orders ?? []).map((order) => {
          const formattedNumber = formatOrderNumber(order?.order_number);
          const firstItem = Array.isArray(order?.items) ? order.items[0] : null;
          const image = firstItem?.image ?? null;
          const title = firstItem?.name ?? firstItem?.title ?? 'Pack';
          const summaryLink = buildOrderLink(formattedNumber, order?.form_access_token);
          const formStatus = order?.form_status ?? 'todo';
          const buttonDisabled = formStatus !== 'done';

          return (
            <article key={order.id} className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center gap-4">
                  {image ? (
                    <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-black/10 bg-neutral-50">
                      <Image src={image} alt={title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-dashed border-black/20 text-xs text-neutral-500">
                      Visuel
                    </div>
                  )}
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Commande #{formattedNumber ?? order.id}</p>
                    <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
                    <p className="text-sm text-neutral-600">{order.email ?? 'Email inconnu'}</p>
                    <p className="text-sm text-neutral-600">{formatDate(order.created_at)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-neutral-500">Montant</p>
                  <p className="text-lg font-semibold text-neutral-900">{formatAmount(order.total_cents, order.currency)}</p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Lien direct</p>
                  {summaryLink ? (
                    <Link href={summaryLink} className="text-sm font-semibold text-neutral-900 underline">
                      {summaryLink}
                    </Link>
                  ) : (
                    <p className="text-sm text-neutral-600">—</p>
                  )}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">État du formulaire</p>
                  <p className="text-sm font-semibold text-neutral-900">{statusLabel(formStatus)}</p>
                  {order.form_updated_at ? (
                    <p className="text-xs text-neutral-500">MAJ : {formatDate(order.form_updated_at)}</p>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={summaryLink || '/merci'}
                  className="inline-flex items-center justify-center rounded-full border border-neutral-900 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
                >
                  Voir la commande →
                </Link>
                {buttonDisabled ? (
                  <span className="inline-flex items-center justify-center rounded-full bg-neutral-300 px-4 py-2 text-sm font-semibold text-white">
                    Télécharger le formulaire
                  </span>
                ) : (
                  <a
                    href={`/api/orders/${order.id}/form/download`}
                    className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
                  >
                    Télécharger le formulaire
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

function statusLabel(value) {
  switch (value) {
    case 'done':
      return 'Terminé';
    case 'progress':
      return 'En cours';
    default:
      return 'À faire';
  }
}
