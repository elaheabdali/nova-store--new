const CATEGORY_LABELS_FA: Record<string, string> = {
  electronics: 'لوازم الکترونیکی',
  jewelery: 'جواهرات و زیورآلات',
  "men's clothing": 'پوشاک مردانه',
  "women's clothing": 'پوشاک زنانه',
};

export function formatCategory(category: string, locale: string): string {
  const normalized = category.trim().toLowerCase();

  if (locale === 'fa' && CATEGORY_LABELS_FA[normalized]) {
    return CATEGORY_LABELS_FA[normalized];
  }

  return normalized.replace(/(^|\s)\w/g, (letter) => letter.toUpperCase());
}
