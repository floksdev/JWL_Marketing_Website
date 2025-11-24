import 'server-only';

import { sendMail } from './mailer';

const salonFont = '"Playfair Display", "Georgia", serif';
const bodyFont = '"SF Pro Display", "Helvetica Neue", Arial, sans-serif';
const calendlyUrl = process.env.CALENDLY_URL || 'https://calendly.com/contact-jwlmarketing/test';
const brandColor = '#ffffff';

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
const heroImageUrl = process.env.EMAIL_HERO_IMAGE_URL
  || 'https://www.dropbox.com/scl/fi/gdl7bsujf2f15250vyfyb/hero_wallpaper_5.png?rlkey=nhos2xxaoip63qs2u36njrpi9&st=4i2ne6sw&raw=1';

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

function buildTextBody({ salutation, subjectOrderLabel, summaryLines, formattedTotal, orderLink, formLink, serviceName }) {
  const serviceLine = serviceName
    ? `Votre prestation ${serviceName} est maintenant lancée et nous démarrons ensemble la prochaine étape.`
    : 'Votre prestation est maintenant lancée et nous démarrons ensemble la prochaine étape.';
  return `${salutation}

Merci pour votre commande et bienvenue dans l’univers JWL Marketing.
${serviceLine}

Récapitulatif :
${summaryLines}

Total : ${formattedTotal}
${orderLink ? `Votre reçu en ligne : ${orderLink}` : ''}

Étape 1 – Remplir le cahier des charges :
Il nous permet de comprendre vos attentes, votre marché et vos priorités.
${formLink ? `Complétez-le dès maintenant : ${formLink}` : 'Complétez le cahier des charges via votre espace client.'}

Étape 2 – Réserver votre visio :
Une fois le cahier des charges terminé, choisissez votre créneau pour notre échange personnalisé.
Calendrier : ${calendlyUrl}

Ce que vous pouvez attendre de JWL Marketing : une organisation moderne, des outils qui simplifient tout et surtout un accompagnement humain, stratégique et authentique.

La technologie simplifie. L’humain transforme.

À très vite,
Jodie Lapaillerie — JWL Marketing`;
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

function buildHtmlBody({
  salutation,
  subjectOrderLabel,
  itemSummaries,
  formattedTotal,
  orderLink,
  formLink,
  serviceName,
}) {
  const serviceLine = serviceName
    ? `Votre prestation ${serviceName} est maintenant lancée et je suis ravie de vous accompagner dans cette nouvelle étape !`
    : 'Votre prestation est maintenant lancée et je suis ravie de vous accompagner dans cette nouvelle étape !';
  const orderNumberLabel = subjectOrderLabel ? subjectOrderLabel.trim() : '—';

  const summaryItemsHtml = itemSummaries
    .map(
      (item) => `
        <tr>
          <td style="padding:12px 0;">
            <p style="margin:0;font-size:16px;color:#818388;">${item.label}</p>
            <p style="margin:4px 0 0;font-size:22px;color:#131312;">${item.total}</p>
          </td>
          <td style="padding:12px 0;text-align:right;">
            <p style="margin:0;font-size:16px;color:#818388;">Quantité</p>
            <p style="margin:4px 0 0;font-size:18px;color:#131312;">× ${item.quantity}</p>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="border-bottom:1px solid #e4e4e4;height:1px;"></td>
        </tr>
      `
    )
    .join('');

  return `
    <div style="background:#ededed;padding:24px;font-family:${bodyFont};color:#131312;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;">
        <tr>
          <td style="padding:32px 40px 60px;background-image:url('${heroImageUrl}');background-size:cover;background-position:center;background-repeat:no-repeat;">
            <div style="height:48px;"></div>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 48px 32px;">
            <p style="margin:0 0 12px;font-size:20px;color:#818388;">${salutation}</p>
            <p style="margin:0;font-size:44px;line-height:54px;letter-spacing:-1px;color:#131312;">Votre commande${subjectOrderLabel ? ` ${subjectOrderLabel}` : ''} est confirmée !</p>
            <p style="margin:18px 0 28px;font-size:20px;line-height:30px;color:#616269;">Merci pour votre confiance et bienvenue dans l’univers JWL Marketing. ${serviceLine}</p>

            <div style="background:#fafafa;border-radius:24px;padding:32px;">
              <p style="margin:0 0 24px;font-size:30px;font-weight:600;">Récapitulatif</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:20px;">
                <tr>
                  <td style="padding:0 0 20px;color:#818388;">Numéro de commande</td>
                  <td style="padding:0 0 20px;color:#131312;text-align:right;">${orderNumberLabel}</td>
                </tr>
                <tr>
                  <td style="padding:0 0 20px;border-bottom:1px solid #dadada;color:#818388;">Total réglé</td>
                  <td style="padding:0 0 20px;border-bottom:1px solid #dadada;color:#131312;text-align:right;">${formattedTotal}</td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:28px;">
                ${summaryItemsHtml}
              </table>

              ${
                orderLink
                  ? `<p style="margin:24px 0 0;text-align:right;">
                      <a href="${orderLink}" style="font-size:14px;color:#363636;text-decoration:none;font-weight:600;">Consulter votre reçu en ligne →</a>
                    </p>`
                  : ''
              }
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:0 16px 16px;">
            <div style="border-radius:24px;background:#131312;color:#ffffff;padding:40px 32px;">
              <p style="margin:0 0 16px;font-size:32px;line-height:40px;letter-spacing:-1px;font-weight:600;text-align:left;">On passe à l’action ?</p>
              <p style="margin:0 0 28px;font-size:16px;line-height:24px;color:#c3c3c3;text-align:left;">
                Complétez votre cahier des charges puis choisissez un créneau pour lancer notre échange personnalisé.
              </p>
              <div style="text-align:left;">
                ${
                  formLink
                    ? `<p style="margin:0 0 8px 0;font-weight:600;">1. Compléter le cahier des charges</p>
                        <a href="${formLink}" style="display:inline-block;margin-bottom:20px;padding:16px 28px;border-radius:999px;background:${brandColor};color:#131312;font-weight:600;text-decoration:none;">Accéder au cahier des charges</a>`
                    : ''
                }
                <p style="margin:0 0 8px 0;font-weight:600;">${formLink ? '2.' : '1.'} Réserver votre visio</p>
                <a href="${calendlyUrl}" style="display:inline-block;padding:16px 28px;border-radius:999px;background:#d9a4b3;color:#131312;font-weight:600;text-decoration:none;">Prendre Rendez-vous</a>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 48px 32px;">
            <p style="margin:0 0 16px;color:#6d6e73;font-size:16px;line-height:26px;">
              Une organisation moderne, des outils qui simplifient tout… Mais surtout : un accompagnement humain, stratégique et authentique. Chaque prestation est conçue pour vous apporter un résultat concret, adapté et efficace.
            </p>
            <p style="margin:0;font-size:18px;color:#131312;font-weight:600;">La technologie simplifie. L’humain transforme.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;background:#f5f2f3;text-align:center;color:#777;font-size:13px;border-top:1px solid #ececec;">
            <p style="margin:0 0 6px;font-size:15px;font-weight:600;color:#333;">JWL Marketing</p>
            <p style="margin:0 0 10px;color:#555;">Jodie Lapaillerie | Aix-en-Provence</p>
            <p style="margin:0;font-size:13px;">📞 07 83 79 28 14 &nbsp;•&nbsp; ✉️ service@jwl-marketing.fr</p>
            <p style="margin:10px 0 0;font-size:11px;color:#999;">SIRET 893 154 389 00012 — Conditions Générales sur www.jwl-marketing.fr</p>
          </td>
        </tr>
      </table>
    </div>
  `;
}

export async function sendOrderConfirmationEmail({
  to,
  customerName,
  orderNumber,
  orderLink,
  formLink,
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
  const primaryServiceName = itemSummaries[0]?.label ?? '';

  const textBody = buildTextBody({
    salutation,
    subjectOrderLabel,
    summaryLines,
    formattedTotal,
    orderLink,
    formLink: formLink || orderLink,
    serviceName: primaryServiceName,
  });

  const htmlBody = buildHtmlBody({
    salutation,
    subjectOrderLabel,
    itemSummaries,
    formattedTotal,
    orderLink,
    formLink: formLink || orderLink,
    serviceName: primaryServiceName,
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
