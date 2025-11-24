import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { isAdminRequest } from '@/lib/auth/admin';

function sanitizeStatusMap(input) {
  if (!input || typeof input !== 'object') return {};
  const result = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === 'done' || value === 'progress' || value === 'todo') {
      result[key] = value;
    }
  }
  return result;
}

export async function PUT(request, { params }) {
  try {
    const resolvedParams = await params;
    const { orderId } = resolvedParams || {};
    const body = await request.json();
    const accessToken = body?.accessToken ?? null;
    const payload = typeof body?.payload === 'object' && body.payload !== null ? body.payload : {};
    const sections = sanitizeStatusMap(body?.sections);
    const status = ['done', 'progress'].includes(body?.status) ? body.status : 'progress';

    if (!orderId) {
      return NextResponse.json({ error: 'Commande inconnue.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, form_access_token')
      .eq('id', orderId)
      .maybeSingle();

    if (orderError) {
      console.error('Supabase order lookup failed:', orderError);
      return NextResponse.json({ error: 'Impossible de vérifier la commande.' }, { status: 500 });
    }

    if (!order) {
      return NextResponse.json({ error: 'Commande introuvable.' }, { status: 404 });
    }

    const isAdmin = await isAdminRequest();
    const tokenMatches = Boolean(accessToken && order.form_access_token && accessToken === order.form_access_token);

    if (!isAdmin && !tokenMatches) {
      return NextResponse.json({ error: 'Accès non autorisé.' }, { status: 403 });
    }

    const { data, error } = await supabase
      .from('orders')
      .update({
        form_payload: payload,
        form_sections: sections,
        form_status: status,
        form_updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)
      .select('id, form_payload, form_sections, form_status, form_updated_at')
      .single();

    if (error) {
      console.error('Unable to update form', error);
      return NextResponse.json({ error: 'Impossible d’enregistrer le formulaire.' }, { status: 500 });
    }

    return NextResponse.json({ form: data });
  } catch (error) {
    console.error('Order form PUT error:', error);
    return NextResponse.json({ error: 'Erreur inattendue.' }, { status: 500 });
  }
}
