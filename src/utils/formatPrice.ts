export function formatPrice(value: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 2,
  }).format(value);
}
