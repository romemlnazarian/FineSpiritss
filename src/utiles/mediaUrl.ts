import {Route} from '../api/Route';

const apiBaseUrl = Route.root.replace(/\/api\/?$/, '').replace(/\/$/, '');
const mediaBaseUrl = apiBaseUrl;

function pickString(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function collectImageCandidates(product?: any): string[] {
  if (!product) {
    return [];
  }

  const candidates: string[] = [];

  const push = (value: unknown) => {
    const normalized = pickString(value);
    if (normalized) {
      candidates.push(normalized);
    }
  };

  push(product.image_url);
  push(product.icon_url);
  push(product.icon);
  push(product.cat_image);
  push(product.category_image);
  push(product.image);
  push(product.main_image);
  push(product.product_image);
  push(product.thumbnail);
  push(product.cover_image);
  push(product.primary_image);
  push(product.photo);

  if (typeof product.image === 'object' && product.image) {
    push(product.image.url);
    push(product.image.src);
    push(product.image.image_url);
  }

  const collections = [
    product.images,
    product.gallery,
    product.product_images,
    product.media,
  ];

  for (const collection of collections) {
    if (!Array.isArray(collection)) {
      continue;
    }
    for (const entry of collection) {
      if (typeof entry === 'string') {
        push(entry);
      } else if (entry && typeof entry === 'object') {
        push(entry.url);
        push(entry.src);
        push(entry.image_url);
        push(entry.image);
      }
    }
  }

  return candidates;
}

export function resolveMediaUrl(path?: string | null): string | undefined {
  const normalized = pickString(path);
  if (!normalized) {
    return undefined;
  }

  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }

  const normalizedPath = normalized.startsWith('/')
    ? normalized
    : `/${normalized}`;
  return `${mediaBaseUrl}${normalizedPath}`;
}

export function resolveProductImageUrl(product?: any): string | undefined {
  const candidates = collectImageCandidates(product);

  const absolute = candidates.find(candidate => /^https?:\/\//i.test(candidate));
  if (absolute) {
    return absolute;
  }

  for (const candidate of candidates) {
    const resolved = resolveMediaUrl(candidate);
    if (resolved) {
      return resolved;
    }
  }

  return undefined;
}

export function mergeProductDetail(detail: any, routeProduct?: any) {
  const merged = {
    ...(routeProduct ?? {}),
    ...(detail ?? {}),
  };

  const imageUrl =
    resolveProductImageUrl(routeProduct) ??
    resolveProductImageUrl(detail) ??
    resolveMediaUrl(pickString(routeProduct?.image_url)) ??
    resolveMediaUrl(pickString(detail?.image_url)) ??
    resolveMediaUrl(pickString(routeProduct?.cat_image)) ??
    resolveMediaUrl(pickString(detail?.cat_image));

  if (imageUrl) {
    merged.image_url = imageUrl;
  }

  return merged;
}
