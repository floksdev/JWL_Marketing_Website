import { NextResponse } from 'next/server';
import { buildAdminSessionCookies, getAdminCredentials } from '@/lib/auth/admin';

export async function POST(request) {
  const url = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');
  const { email: adminEmail, password: adminPassword } = getAdminCredentials();

  if (email !== adminEmail.toLowerCase() || password !== adminPassword) {
    const errorUrl = new URL('/admin', url.origin);
    errorUrl.searchParams.set('error', 'invalid');
    return NextResponse.redirect(errorUrl);
  }

  const response = NextResponse.redirect(new URL('/admin', url.origin));
  buildAdminSessionCookies(response);
  return response;
}
