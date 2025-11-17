import 'server-only';

import { sendMail } from './mailer';

const salonFont = '"Playfair Display", "Georgia", serif';
const bodyFont = '"SF Pro Display", "Helvetica Neue", Arial, sans-serif';
const calendlyUrl = process.env.CALENDLY_URL || 'https://calendly.com/contact-jwlmarketing/test';
const brandColor = '#a0604c';

function resolveSiteOrigin() {
  const fallback = process.env.SITE_BASE_URL
    || process.env.MERCI_PAGE_URL
    || process.env.STRIPE_SUCCESS_URL
    || 'http://localhost:3000';

  try {
    const parsed = new URL(fallback);
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return 'http://localhost:3000';
  }
}

const siteOrigin = resolveSiteOrigin();
const logoUrl = process.env.EMAIL_LOGO_URL || `${siteOrigin}/assets/logo_medium.png`;
const heroImageUrl = process.env.EMAIL_HERO_IMAGE_URL
  || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80';

function formatCurrency(amountInCents, currency = 'EUR') {
  if (!Number.isFinite(amountInCents)) {
    return '—';
  }

  try {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amountInCents / 100);
  } catch {
    return `${(amountInCents / 100).toFixed(2)} ${currency.toUpperCase()}`;
  }
}

function buildItemsSummary(items, currency) {
  return items
    .map((item) => {
      const label = item.name ?? item.description ?? item.slug ?? 'Produit';
      const quantity = item.quantity ?? 1;
      const lineTotal = Number.isFinite(item.amount_total) ? item.amount_total : (item.amount_subtotal ?? 0);
      return {
        label,
        quantity,
        total: formatCurrency(lineTotal, currency),
      };
    });
}

function buildTextBody({ salutation, subjectOrderLabel, summaryLines, formattedTotal, orderLink }) {
  return `${salutation}

Votre commande est bien enregistrée${subjectOrderLabel}. Merci pour votre confiance et bienvenue dans l’univers de JWL Marketing.

Récapitulatif :
${summaryLines}

Total : ${formattedTotal}
${orderLink ? `Votre reçu en ligne : ${orderLink}` : ''}

1. Remplir et renvoyer les documents :
- Téléchargez le cahier des charges joint, complétez-le avec précision puis renvoyez-le à service@jwl-marketing.fr dans un délai de 30 jours ouvrés.

2. Réserver votre visioconférence :
- Dès que le cahier des charges est envoyé, réservez votre échange via notre calendrier en ligne : ${calendlyUrl}

Chez JWL Marketing, nous prenons le temps de comprendre vos enjeux afin de préparer un audit et une prestation sur-mesure. Pour toute question : service@jwl-marketing.fr.

Merci encore pour votre confiance.

Cordialement,
Jodie Lapaillerie`;
}

function buildHeroBlock() {
  if (!heroImageUrl) {
    return `
      <div style="padding:48px 32px;text-align:center;background:linear-gradient(120deg,#f7ece4,#fff);">
        <p style="font-size:44px;font-family:${salonFont};margin:0;color:${brandColor};">Merci pour votre confiance</p>
      </div>
    `;
  }

  return `
    <div style="position:relative;">
      <img src="${heroImageUrl}" alt="JWL Marketing hero" style="width:100%;display:block;object-fit:cover;max-height:320px;" />
      <div style="position:absolute;inset:0;background:linear-gradient(120deg,rgba(0,0,0,0.55),rgba(0,0,0,0));display:flex;align-items:center;padding:48px;">
        <div style="color:#fff;">
          <p style="font-size:44px;font-family:${salonFont};margin:0;">Merci pour votre confiance</p>
          <p style="margin:12px 0 0;font-size:17px;">Votre commande est confirmée, nous lançons votre analyse stratégique sur-mesure.</p>
        </div>
      </div>
    </div>
  `;
}

function buildHtmlBody({ salutation, subjectOrderLabel, itemSummaries, formattedTotal, orderLink }) {
  const itemsList = itemSummaries
    .map((item) => `<tr><td style="padding:6px 0;font-weight:500;">${item.label}</td><td style="padding:6px 0;color:#6d5e55;">× ${item.quantity}</td><td style="padding:6px 0;text-align:right;font-weight:600;">${item.total}</td></tr>`)
    .join('');

  return `
  <div style="background:#faf6f8;padding:32px;">
  <div style="max-width:820px;margin:0 auto;background:#ffffff;border-radius:28px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,0.06);font-family:${bodyFont};color:#333;">
    
    <!-- HEADER -->
    <div style="padding:24px 36px;border-bottom:1px solid #f0e8eb;text-align:center;">
      ${logoUrl 
        ? `<img src="${logoUrl}" alt="JWL Marketing" style="height:54px;width:auto;display:inline-block;" />`
        : `<p style="margin:0;font-size:20px;font-weight:600;color:#d9a4b3;">JWL Marketing</p>`
      }
    </div>

    <!-- HERO -->
    <div style="position:relative;">
      <img src="${heroImageUrl}" alt="Hero" style="width:100%;max-height:260px;object-fit:cover;display:block;" />
      <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,0.45),rgba(0,0,0,0.05));display:flex;align-items:flex-end;padding:36px;">
        <div style="color:#fff;">
          <p style="font-size:36px;margin:0;font-family:${salonFont};">Merci pour votre confiance</p>
          <p style="margin:10px 0 0;font-size:16px;opacity:0.92;">Votre commande est confirmée.</p>
        </div>
      </div>
    </div>

    <!-- CONTENT -->
    <div style="padding:40px 48px;">
      <p style="margin:0 0 12px;font-size:15px;color:#777;">${salutation}</p>
      <p style="margin:0;font-size:18px;font-weight:600;">Votre commande a bien été enregistrée${subjectOrderLabel}.</p>
      <p style="margin:16px 0 24px;font-size:16px;line-height:1.6;">
        Merci pour votre confiance et bienvenue dans l’univers de JWL Marketing. 
        Vous venez de valider le lancement d’une <strong>analyse stratégique sur mesure</strong>.
      </p>

      <!-- SECTIONS -->
      <div style="margin-bottom:24px;">
        <p style="margin:0 0 8px;font-size:13px;letter-spacing:0.08em;color:#d9a4b3;text-transform:uppercase;font-weight:600;">
          Dans ce mail, vous trouverez :
        </p>
        <ul style="margin:0;padding-left:20px;color:#555;line-height:1.6;">
          <li>Votre ticket d’achat</li>
          <li>Votre fiche client signée</li>
          <li>Votre cahier des charges à compléter</li>
        </ul>
      </div>

      <!-- RECAP BLOCK -->
      <div style="border:1px solid #f0e8eb;border-radius:18px;padding:20px 24px;background:#fff;">
        <p style="margin:0 0 10px;font-weight:600;font-size:15px;">Récapitulatif commande</p>

        <table style="width:100%;border-collapse:collapse;">
          ${itemSummaries.map(i => `
            <tr>
              <td style="padding:6px 0;font-weight:500;">${i.label}</td>
              <td style="padding:6px 0;color:#777;">× ${i.quantity}</td>
              <td style="padding:6px 0;text-align:right;font-weight:600;">${i.total}</td>
            </tr>
          `).join('')}
        </table>

        <p style="margin:18px 0 0;text-align:right;font-size:17px;font-weight:600;color:#333;">
          Total : ${formattedTotal}
        </p>

        ${orderLink ? `
        <p style="margin:6px 0 0;text-align:right;">
          <a href="${orderLink}" style="color:#d9a4b3;text-decoration:none;font-weight:500;">
            Consulter votre reçu en ligne ›
          </a>
        </p>` : ''}
      </div>

      <!-- STEP 1 -->
      <div style="margin-top:32px;">
        <p style="margin:0 0 6px;font-weight:600;font-size:16px;">1. Remplir et renvoyer les documents</p>
        <p style="margin:0;color:#555;">
          Téléchargez le cahier des charges joint puis envoyez-le à 
          <a href="mailto:service@jwl-marketing.fr" style="color:#d9a4b3;text-decoration:none;">service@jwl-marketing.fr</a>.
        </p>
      </div>

      <!-- STEP 2 -->
      <div style="margin-top:24px;">
        <p style="margin:0 0 6px;font-weight:600;font-size:16px;">2. Réserver votre visioconférence</p>
        <p style="margin:0;color:#555;">
          Une fois le cahier des charges transmis, choisissez votre créneau.
        </p>
        <p style="margin:12px 0 0;">
          <a href="${calendlyUrl}" style="padding:12px 24px;border-radius:999px;background:#d9a4b3;color:white;text-decoration:none;font-weight:600;">
            Prendre RDV
          </a>
        </p>
      </div>

      <p style="margin:28px 0 14px;color:#555;line-height:1.6;">
        Nous prenons le temps de comprendre vos enjeux afin de lancer un audit SEO efficace.
      </p>
      <p style="margin:0;color:#777;">
        Une question ? Répondez simplement à cet e-mail.
      </p>
    </div>

    <!-- FOOTER -->
    <div style="background:#f5f2f3;padding:24px;text-align:center;color:#777;">
      <p style="margin:0 0 4px;font-size:15px;font-weight:600;color:#333;">Merci encore pour votre confiance.</p>
      <p style="margin:0 0 16px;">À très vite pour donner vie à votre projet !</p>
      <p style="margin:0;font-weight:600;color:#333;">Cordialement,</p>
      <p style="margin:6px 0 12px;">Jodie Lapaillerie — JWL Marketing</p>

      <p style="margin:0;font-size:13px;">
        📞 07.83.79.28.14 &nbsp;•&nbsp; 📍 Aix-en-Provence &nbsp;•&nbsp; ✉️ service@jwl-marketing.fr
      </p>
      <p style="margin:8px 0 0;font-size:11px;color:#999;">
        SIRET 893 154 389 00012 — Conditions Générales sur www.jwl-marketing.fr
      </p>
    </div>

  </div>
</div>
  `;
}

export async function sendOrderConfirmationEmail({
  to,
  customerName,
  orderNumber,
  orderLink,
  items = [],
  totalCents,
  currency = 'EUR',
}) {
  if (!to) {
    return { ok: false, skipped: true };
  }

  const itemSummaries = buildItemsSummary(items, currency);
  const formattedTotal = formatCurrency(totalCents, currency);
  const subjectOrderLabel = orderNumber ? ` #${orderNumber}` : '';
  const subject = `Confirmation de commande${subjectOrderLabel}`;
  const salutation = customerName ? `Bonjour ${customerName},` : 'Bonjour,';
  const summaryLines = itemSummaries.map((item) => `- ${item.label} x${item.quantity} — ${item.total}`).join('\n');

  const textBody = buildTextBody({
    salutation,
    subjectOrderLabel,
    summaryLines,
    formattedTotal,
    orderLink,
  });

  const htmlBody = buildHtmlBody({
    salutation,
    subjectOrderLabel,
    itemSummaries,
    formattedTotal,
    orderLink,
  });

  const message = {
    to,
    subject,
    text: textBody,
    html: htmlBody,
  };

  const bcc = process.env.ORDERS_NOTIFICATION_EMAIL;
  if (bcc) {
    message.bcc = bcc;
  }

  return sendMail(message);
}
