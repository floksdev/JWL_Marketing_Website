import { NextResponse } from 'next/server';
import { sendContactEmails } from '@/lib/email/contactForm';

function sanitizeString(value) {
  if (!value || typeof value !== 'string') return '';
  return value.trim();
}

export async function POST(request) {
  try {
    const payload = await request.json();

    if (payload?.website) {
      return NextResponse.json({ ok: true });
    }

    const nom = sanitizeString(payload.nom);
    const prenom = sanitizeString(payload.prenom);
    const email = sanitizeString(payload.email);
    const message = sanitizeString(payload.message);

    if (!nom || !prenom || !email || !message) {
      return NextResponse.json({ error: 'Merci de compléter les champs obligatoires.' }, { status: 400 });
    }

    const data = {
      nom,
      prenom,
      email,
      fonction: sanitizeString(payload.fonction),
      entreprise: sanitizeString(payload.entreprise),
      objet: sanitizeString(payload.objet),
      message,
    };

    await sendContactEmails(data);

    return NextResponse.json({ ok: true, message: 'Votre message a bien été envoyé.' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Impossible d’envoyer votre message pour le moment.' }, { status: 500 });
  }
}
