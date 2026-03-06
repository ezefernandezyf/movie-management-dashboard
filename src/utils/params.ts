import type { MovieQueryParams } from "../models";

export const mapToServerParams = (p?: MovieQueryParams): Record<string, string | number> | undefined => {
  if (!p) return undefined;
  const out: Record<string, string | number> = {};
  if (p.page !== undefined) out._page = p.page;
  if (p.limit !== undefined) out._limit = p.limit;
  if (p.q) out.q = p.q;
  if (p.genre) out.genre = p.genre;
  if (p.year !== undefined) out.year = p.year;
  if (p.status) out.status = p.status;
  if (p.sortBy) {
    out._sort = p.sortBy;
    out._order = p.order ?? 'asc';
  }
  return out;
};
