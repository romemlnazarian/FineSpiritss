export type CatalogSortType =
  | 'newest'
  | 'oldest'
  | 'title_asc'
  | 'title_desc'
  | 'price_asc'
  | 'price_desc';

export const DEFAULT_SORT: CatalogSortType = 'newest';

export function isCatalogSortType(value: string): value is CatalogSortType {
  return (
    value === 'newest' ||
    value === 'oldest' ||
    value === 'title_asc' ||
    value === 'title_desc' ||
    value === 'price_asc' ||
    value === 'price_desc'
  );
}

function parseProductPrice(product: any): number {
  const candidates = [
    product?.sale_price,
    product?.price,
    product?.regular_price,
    product?.originalPrice,
  ];

  for (const value of candidates) {
    if (value === null || value === undefined || value === '') {
      continue;
    }
    const parsed = Number(
      String(value).replace(/[^\d.,-]/g, '').replace(',', '.'),
    );
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return 0;
}

function parseProductDate(product: any): number {
  const candidates = [product?.created_at, product?.updated_at, product?.id];

  for (const value of candidates) {
    if (value === null || value === undefined || value === '') {
      continue;
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
    const parsed = Date.parse(String(value));
    if (Number.isFinite(parsed)) {
      return parsed;
    }
    const asNumber = Number(value);
    if (Number.isFinite(asNumber)) {
      return asNumber;
    }
  }

  return 0;
}

function getProductName(product: any): string {
  return String(product?.title ?? product?.name ?? '').trim().toLowerCase();
}

export function applySort(products: any[], sortBy: CatalogSortType): any[] {
  const list = [...products];

  switch (sortBy) {
    case 'newest':
      return list.sort((a, b) => parseProductDate(b) - parseProductDate(a));
    case 'oldest':
      return list.sort((a, b) => parseProductDate(a) - parseProductDate(b));
    case 'title_asc':
      return list.sort((a, b) =>
        getProductName(a).localeCompare(getProductName(b)),
      );
    case 'title_desc':
      return list.sort((a, b) =>
        getProductName(b).localeCompare(getProductName(a)),
      );
    case 'price_asc':
      return list.sort((a, b) => parseProductPrice(a) - parseProductPrice(b));
    case 'price_desc':
      return list.sort((a, b) => parseProductPrice(b) - parseProductPrice(a));
    default:
      return list;
  }
}
