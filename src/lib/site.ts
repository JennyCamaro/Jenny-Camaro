/** Always ends with a single trailing slash, e.g. `/Jenny-Camaro/` */
export function withBase(path = ''): string {
  const raw = import.meta.env.BASE_URL || '/';
  const root = raw.endsWith('/') ? raw : `${raw}/`;
  const cleaned = path.replace(/^\/+/, '');
  return cleaned ? `${root}${cleaned}` : root;
}

/** Format a content-collection date as a calendar day (no TZ day-shift). */
export function formatPostDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
