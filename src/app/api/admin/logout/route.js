import { NextResponse } from 'next/server';
import { clearAdminSessionCookies } from '@/lib/auth/admin';

export async function POST(request) {
  const url = new URL(request.url);
  const response = NextResponse.redirect(new URL('/admin', url.origin));
  clearAdminSessionCookies(response);
  return response;
}
