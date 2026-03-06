export const ALL = ['movies'] as const;

export const movieKeys = {
  all: ALL,

  list: (params?: Record<string, unknown>) => [...ALL, 'list', params] as const,

  listByPage: (page: number, limit?: number) => [...ALL, 'page', page, limit] as const,

  detail: (id: number | string) => [...ALL, 'detail', id] as const,

  listsInvalidate: () => [...ALL, 'list'] as const,
};
export type MovieKey = ReturnType<(typeof movieKeys)['list']>;
