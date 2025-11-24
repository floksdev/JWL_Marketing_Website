import PDFDocument from 'pdfkit/js/pdfkit.standalone.js';
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { isAdminRequest } from '@/lib/auth/admin';
import { formatOrderNumber } from '@/lib/orders';
import { getFormFieldLabel } from '@/lib/formLabels';

function buildPdf(order) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('error', reject);
    doc.on('end', () => resolve(Buffer.concat(chunks)));

    doc.fontSize(18).text('Cahier des charges — JWL Marketing', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Commande #${formatOrderNumber(order.order_number) || order.order_number}`);
    doc.text(`Email client : ${order.email ?? '—'}`);
    doc.text(`Date : ${new Date(order.created_at).toLocaleString('fr-FR')}`);
    doc.text(`Statut : ${order.form_status ?? '—'}`);
    doc.moveDown();

    doc.fontSize(14).text('Réponses', { underline: true });
    doc.moveDown(0.5);

    const payload = order.form_payload || {};
    if (!Object.keys(payload).length) {
      doc.text('Aucune réponse enregistrée.');
    } else {
      for (const [key, value] of Object.entries(payload)) {
        const normalizedValue = Array.isArray(value)
          ? value.join(', ')
          : typeof value === 'object' && value !== null
            ? JSON.stringify(value)
            : value ?? '';
        doc.font('Helvetica-Bold').text(`${getFormFieldLabel(key)}`);
        doc.font('Helvetica').text(String(normalizedValue || '—'));
        doc.moveDown(0.5);
      }
    }

    doc.end();
  });
}

export async function GET(request, { params }) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: 'Accès non autorisé.' }, { status: 403 });
  }

  const resolvedParams = await params;
  const { orderId } = resolvedParams || {};
  if (!orderId) {
    return NextResponse.json({ error: 'Commande inconnue.' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data: order, error } = await supabase
    .from('orders')
    .select('id, order_number, email, created_at, form_status, form_payload')
    .eq('id', orderId)
    .maybeSingle();

  if (error) {
    console.error('Download lookup failed', error);
    return NextResponse.json({ error: 'Impossible de récupérer la commande.' }, { status: 500 });
  }

  if (!order) {
    return NextResponse.json({ error: 'Commande introuvable.' }, { status: 404 });
  }

  if (order.form_status !== 'done') {
    return NextResponse.json({ error: 'Formulaire non finalisé.' }, { status: 400 });
  }

  const buffer = await buildPdf(order);
  const response = new NextResponse(buffer, {
    status: 200,
  });
  response.headers.set('Content-Type', 'application/pdf');
  const filename = `cahier-des-charges-${formatOrderNumber(order.order_number) || order.order_number}.pdf`;
  response.headers.set('Content-Disposition', `attachment; filename="${filename}"`);
  return response;
}
