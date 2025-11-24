import 'server-only';

const merciPageBaseUrl = process.env.MERCI_PAGE_URL || process.env.STRIPE_SUCCESS_URL || 'http://localhost:3000/merci';

export function formatOrderNumber(value) {
  if (value == null) return null;
  const num = Number(value);
  if (Number.isNaN(num)) return null;
  return String(num).padStart(3, '0');
}

export function buildOrderLink(orderNumber, token) {
  if (!orderNumber) return null;
  if (!merciPageBaseUrl) return `/merci?order=${orderNumber}${token ? `&token=${token}` : ''}`;

  try {
    const url = new URL(merciPageBaseUrl);
    url.search = '';
    url.hash = '';
    url.searchParams.set('order', orderNumber);
    if (token) {
      url.searchParams.set('token', token);
    }
    return url.toString();
  } catch {
    let suffix = `/merci?order=${orderNumber}`;
    if (token) suffix += `&token=${token}`;
    return suffix;
  }
}
