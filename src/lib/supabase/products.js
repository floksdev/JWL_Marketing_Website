import 'server-only';

import { PRODUCTS } from '@/lib/catalogue';
import { getSupabaseAdmin } from './server';

let isCatalogueSynced = false;

function normalizeStatsRow(row) {
  if (!row) return row;
  return {
    ...row,
    average_rating: row.average_rating != null ? Number(row.average_rating) : null,
    review_sum: row.review_sum != null ? Number(row.review_sum) : null,
    review_count: row.review_count != null ? Number(row.review_count) : null,
    default_rating: row.default_rating != null ? Number(row.default_rating) : null,
    default_reviews: row.default_reviews != null ? Number(row.default_reviews) : null,
    total_reviews_count: row.total_reviews_count != null ? Number(row.total_reviews_count) : 0,
  };
}

function buildCataloguePayload() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
    title: product.title,
    image: product.image,
    category: product.category ?? null,
    default_rating: Number.isFinite(product.rating) ? product.rating : 5,
    default_reviews: Number.isFinite(product.reviewsCount) ? product.reviewsCount : 0,
    updated_at: new Date().toISOString(),
  }));
}

async function ensureCatalogueSynced() {
  if (isCatalogueSynced) return;
  const supabase = getSupabaseAdmin();
  const payload = buildCataloguePayload();
  const { error } = await supabase.from('products').upsert(payload, {
    onConflict: 'slug',
  });

  if (error) {
    const code = error?.code || error?.details || error?.message;
    if (code && String(code).includes('42P01')) {
      console.warn('Supabase product sync skipped: products table missing. Run SQL migration to enable live ratings.');
      isCatalogueSynced = true;
      return;
    }
    console.error('Supabase product sync failed:', error);
    throw error;
  }

  isCatalogueSynced = true;
}

export async function getProductStatsMap(slugs = []) {
  try {
    await ensureCatalogueSynced();
  } catch (error) {
    console.error('Supabase product sync failed:', error);
    return new Map();
  }

  const supabase = getSupabaseAdmin();

  let query = supabase.from('product_rating_stats').select('*');
  if (Array.isArray(slugs) && slugs.length > 0) {
    query = query.in('slug', slugs);
  }

  const { data, error } = await query;
  if (error) {
    if (error?.code && String(error.code).includes('42P01')) {
      console.warn('Supabase stats view missing. Returning fallback ratings.');
      return new Map();
    }
    console.error('Supabase product stats load failed:', error);
    return new Map();
  }

  const map = new Map();
  for (const row of data || []) {
    map.set(row.slug, normalizeStatsRow(row));
  }
  return map;
}

export async function getAllProductStats() {
  try {
    await ensureCatalogueSynced();
  } catch (error) {
    console.error('Supabase product sync failed:', error);
    return [];
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('product_rating_stats')
    .select('*');

  if (error) {
    if (error?.code && String(error.code).includes('42P01')) {
      console.warn('Supabase stats view missing. Returning fallback ratings.');
      return [];
    }
    console.error('Supabase product stats load failed:', error);
    return [];
  }

  return (data ?? []).map(normalizeStatsRow);
}

export async function getTopRatedProducts(limit = 3) {
  const stats = await getAllProductStats();
  return stats
    .sort((a, b) => {
      const ratingDiff = (b.average_rating ?? 0) - (a.average_rating ?? 0);
      if (Math.abs(ratingDiff) > 0.0001) return ratingDiff;
      return (b.total_reviews_count ?? 0) - (a.total_reviews_count ?? 0);
    })
    .slice(0, limit);
}

export async function getReviewsForOrder(orderId) {
  if (!orderId) return [];
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('product_reviews')
    .select('product_slug, rating, comment')
    .eq('order_id', orderId);

  if (error) {
    console.error('Supabase order reviews load failed:', error);
    throw error;
  }

  return (data ?? []).map((row) => ({
    ...row,
    rating: row.rating != null ? Number(row.rating) : null,
  }));
}

export async function upsertProductReview({ orderId, productSlug, rating, comment }) {
  if (!orderId || !productSlug || !Number.isFinite(rating)) {
    throw new Error('Invalid review payload.');
  }

  await ensureCatalogueSynced();
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('product_reviews')
    .upsert(
      {
        order_id: orderId,
        product_slug: productSlug,
        rating,
        comment: comment || null,
      },
      { onConflict: 'order_id,product_slug' },
    );

  if (error) {
    console.error('Supabase review upsert failed:', error);
    throw error;
  }

  const statsMap = await getProductStatsMap([productSlug]);
  return statsMap.get(productSlug);
}
