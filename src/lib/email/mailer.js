import 'server-only';

import nodemailer from 'nodemailer';

let cachedTransporter;
let transportAttempted = false;

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    if (!transportAttempted) {
      console.warn('SMTP transport is not configured. Set SMTP_HOST/SMTP_USER/SMTP_PASS to enable transactional emails.');
      transportAttempted = true;
    }
    return null;
  }

  const secureFromEnv = process.env.SMTP_SECURE?.toLowerCase() === 'true';
  const secure = secureFromEnv || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

export function getMailerTransport() {
  if (cachedTransporter ?? false) {
    return cachedTransporter;
  }

  if (cachedTransporter === null) {
    return null;
  }

  cachedTransporter = createTransporter();
  return cachedTransporter;
}

export async function sendMail(options) {
  const transporter = getMailerTransport();

  if (!transporter) {
    return { ok: false, skipped: true };
  }

  const from = options.from ?? process.env.SMTP_FROM ?? process.env.SMTP_USER;

  try {
    const info = await transporter.sendMail({
      ...options,
      from,
    });

    return { ok: true, info };
  } catch (error) {
    console.error('Email send failed:', error);
    return { ok: false, error };
  }
}
