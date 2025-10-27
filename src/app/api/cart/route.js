import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSupabaseAdmin } from '@/lib/supabase/server';

const CART_COOKIE_NAME = 'jwl_cart_id';
const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function normalizeCartItems(items) {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      if (!item || typeof item !== 'object' || !item.id) return null;

      const quantity = Number.isFinite(item.quantity) ? Math.max(1, Math.trunc(item.quantity)) : 1;
      const price = Number(item.price);

      return {
        id: String(item.id),
        title: typeof item.title === 'string' ? item.title : '',
        quantity,
        price: Number.isFinite(price) ? price : null,
        priceDisplay: typeof item.priceDisplay === 'string' ? item.priceDisplay : null,
        image: typeof item.image === 'string' ? item.image : null,
        href: typeof item.href === 'string' ? item.href : null,
      };
    })
    .filter(Boolean);
}

function computeTotalCents(items) {
  return items.reduce((acc, item) => {
    if (Number.isFinite(item.price)) {
      const unitCents = Math.round(item.price * 100);
      if (Number.isFinite(unitCents) && unitCents > 0) {
        acc += unitCents * (item.quantity ?? 1);
      }
    }
    return acc;
  }, 0);
}

async function fetchCartRow(supabase, cartId) {
  const { data, error } = await supabase
    .from('carts')
    .select('id, items, total_cents')
    .eq('id', cartId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

async function createCartRow(supabase) {
  const { data, error } = await supabase
    .from('carts')
    .insert({ items: [], total_cents: 0 })
    .select('id, items, total_cents')
    .single();

  if (error) throw error;
  return data;
}

function withCartCookie(response, cartId) {
  response.cookies.set({
    name: CART_COOKIE_NAME,
    value: cartId,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: CART_COOKIE_MAX_AGE,
  });
  return response;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = getSupabaseAdmin();

    let cartId = cookieStore.get(CART_COOKIE_NAME)?.value ?? null;
    let cart = null;

    if (cartId) {
      cart = await fetchCartRow(supabase, cartId);
    }

    if (!cart) {
      cart = await createCartRow(supabase);
      cartId = cart.id;
    }

    const response = NextResponse.json({
      id: cart.id,
      items: Array.isArray(cart.items) ? cart.items : [],
      total: Number.isFinite(cart.total_cents) ? cart.total_cents / 100 : 0,
    });

    return withCartCookie(response, cartId);
  } catch (error) {
    console.error('Cart GET error:', error);
    return NextResponse.json({ error: 'Impossible de récupérer le panier.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const supabase = getSupabaseAdmin();

    let cartId = cookieStore.get(CART_COOKIE_NAME)?.value ?? null;
    let cart = null;

    if (cartId) {
      cart = await fetchCartRow(supabase, cartId);
    }

    if (!cart) {
      cart = await createCartRow(supabase);
      cartId = cart.id;
    }

    const { items = [] } = await request.json();
    const normalizedItems = normalizeCartItems(items);
    const totalCents = computeTotalCents(normalizedItems);

    const { data, error } = await supabase
      .from('carts')
      .update({
        items: normalizedItems,
        total_cents: totalCents,
        updated_at: new Date().toISOString(),
      })
      .eq('id', cartId)
      .select('id, items, total_cents')
      .single();

    if (error) throw error;

    const response = NextResponse.json({
      id: data.id,
      items: Array.isArray(data.items) ? data.items : [],
      total: Number.isFinite(data.total_cents) ? data.total_cents / 100 : 0,
    });

    return withCartCookie(response, cartId);
  } catch (error) {
    console.error('Cart POST error:', error);
    return NextResponse.json({ error: 'Impossible de mettre à jour le panier.' }, { status: 500 });
  }
}
