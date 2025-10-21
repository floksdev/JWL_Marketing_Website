export const metadata = { title: 'Panier — JWL Marketing' };

export default function CartPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl font-bold">Votre panier</h1>
      <p className="mt-2 text-neutral-600">Aucun article pour le moment.</p>
      {/* TODO: afficher les items, total, et CTA vers checkout */}
    </main>
  );
}
