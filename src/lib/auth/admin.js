import 'server-only';

import crypto from 'crypto';
import { cookies } from 'next/headers';

const ADMIN_SESSION_COOKIE = 'jwl_admin_session';

export function getAdminCredentials() {
  const email = process.env.ADMIN_EMAIL || 'admin@jwlmarketing.fr';
  const password = process.env.ADMIN_PASSWORD || 'change-me-now';
  return { email, password };
}

export function getAdminSessionToken() {
  if (process.env.ADMIN_SESSION_SECRET) {
    return process.env.ADMIN_SESSION_SECRET;
  }
  const { email, password } = getAdminCredentials();
  return crypto.createHash('sha256').update(`${email}:${password}`).digest('hex');
}

export async function isAdminRequest() {
  const jar = await cookies();
  const sessionValue = jar.get(ADMIN_SESSION_COOKIE)?.value;
  return Boolean(sessionValue && sessionValue === getAdminSessionToken());
}

export function buildAdminSessionCookies(response) {
  const token = getAdminSessionToken();
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
}

export function clearAdminSessionCookies(response) {
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}
