import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { upsertProductReview } from '@/lib/supabase/products';

function sanitizeRating(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return null;
  const rounded = Math.round(num);
  if (rounded < 1 || rounded > 5) return null;
  return rounded;
}

export async function POST(request) {
  try {
    const { orderId, productSlug, rating, comment } = await request.json();

    const safeRating = sanitizeRating(rating);
    if (!orderId || !productSlug || !safeRating) {
      return NextResponse.json({ error: 'Données invalides.' }, { status: 422 });
    }

    const supabase = getSupabaseAdmin();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, items')
      .eq('id', orderId)
      .maybeSingle();

    if (orderError) {
      console.error('Supabase order lookup failed:', orderError);
      return NextResponse.json({ error: 'Impossible de vérifier la commande.' }, { status: 500 });
    }

    if (!order) {
      return NextResponse.json({ error: 'Commande introuvable.' }, { status: 404 });
    }

    const items = Array.isArray(order.items) ? order.items : [];
    const hasProduct = items.some((item) => {
      if (!item) return false;
      if (item.id && String(item.id) === productSlug) return true;
      if (item.slug && String(item.slug) === productSlug) return true;
      if (typeof item.href === 'string' && item.href.includes(productSlug)) return true;
      return false;
    });

    if (!hasProduct) {
      return NextResponse.json({ error: 'Ce produit ne fait pas partie de la commande.' }, { status: 400 });
    }

    const stats = await upsertProductReview({
      orderId,
      productSlug,
      rating: safeRating,
      comment: typeof comment === 'string' && comment.trim().length ? comment.trim() : null,
    });

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Review POST error:', error);
    return NextResponse.json({ error: 'Impossible d’enregistrer la note.' }, { status: 500 });
  }
}
