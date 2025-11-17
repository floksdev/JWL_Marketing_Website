'use server';
import 'server-only';

import { sendMail } from './mailer';

const brandColor = '#a0604c';

function formatLine(label, value) {
  if (!value) return '';
  return `<tr><td style="padding:6px 0;font-weight:600;width:160px;">${label}</td><td style="padding:6px 0;">${value}</td></tr>`;
}

function buildAdminHtml(payload) {
  const rows = [
    formatLine('Nom', `${payload.nom ?? ''} ${payload.prenom ?? ''}`.trim()),
    formatLine('Email', payload.email),
    formatLine('Fonction', payload.fonction),
    formatLine('Entreprise', payload.entreprise),
    formatLine('Objet', payload.objet),
    formatLine('Message', payload.message?.replace(/\n/g, '<br/>')),
  ].join('');

  return `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;color:#1f1f23;">
      <p style="font-size:16px;font-weight:600;">Nouvelle demande depuis le formulaire de contact</p>
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
    </div>
  `;
}

function buildUserHtml(payload) {
  return `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;color:#1f1f23;">
      <p>Bonjour ${payload.prenom ?? payload.nom ?? ''},</p>
      <p>Merci pour votre message ! Nous confirmons sa bonne réception et revenons vers vous rapidement pour organiser un échange.</p>
      <p>Rappel de votre demande :</p>
      <blockquote style="border-left:3px solid ${brandColor};margin:12px 0;padding-left:12px;color:#4a4a4f;">${payload.message?.replace(/\n/g, '<br/>') ?? ''}</blockquote>
      <p>Si vous avez besoin d’ajouter des précisions, répondez simplement à cet e-mail.</p>
      <p style="margin-top:24px;">À très vite,<br/>Jodie Lapaillerie — JWL Marketing</p>
    </div>
  `;
}

export async function sendContactEmails(payload) {
  const adminRecipient = process.env.CONTACT_NOTIFICATION_EMAIL
    || process.env.ORDERS_NOTIFICATION_EMAIL
    || process.env.SMTP_USER;

  if (adminRecipient) {
    await sendMail({
      to: adminRecipient,
      subject: `Nouveau message de ${payload.prenom ?? ''} ${payload.nom ?? ''}`.trim() || 'Nouveau message de contact',
      replyTo: payload.email ?? undefined,
      html: buildAdminHtml(payload),
      text: `Nom: ${payload.nom ?? ''} ${payload.prenom ?? ''}
Email: ${payload.email ?? ''}
Fonction: ${payload.fonction ?? ''}
Entreprise: ${payload.entreprise ?? ''}
Objet: ${payload.objet ?? ''}
Message:
${payload.message ?? ''}`,
    });
  }

  if (payload.email) {
    await sendMail({
      to: payload.email,
      subject: 'Nous avons bien reçu votre message',
      html: buildUserHtml(payload),
      text: `Bonjour ${payload.prenom ?? payload.nom ?? ''},

Merci pour votre message ! Nous revenons vers vous rapidement pour organiser un échange.

Votre demande :
${payload.message ?? ''}

À très vite,
Jodie Lapaillerie — JWL Marketing`,
    });
  }
}
