import { API_ENDPOINTS, get, post, put, del } from './';
import type { Movie, CreateMovieDto, UpdateMovieDto, MovieQueryParams } from '../models/';

const mapToServerParams = (p?: MovieQueryParams): Record<string, unknown> | undefined => {
  if (!p) return undefined;
  const out: Record<string, unknown> = {};
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

export const getMovies = (params?: MovieQueryParams, signal?: AbortSignal) =>
  get<Movie[]>(API_ENDPOINTS.MOVIES, { params: mapToServerParams(params), signal });

export const getMovieById = (id: number | string, signal?: AbortSignal) => {
  if (id == null) {
    throw new Error("getMovieById: 'id' is required");
  }
  return get<Movie>(`${API_ENDPOINTS.MOVIES}/${id}`, { signal });
};

export const createMovie = (payload: CreateMovieDto) => post<Movie>(API_ENDPOINTS.MOVIES, payload);

export const updateMovie = (id: number | string, payload: UpdateMovieDto) => {
  if (id === undefined || id === null) {
    throw new Error("updateMovie: 'id' is required");
  }
  return put<Movie>(`${API_ENDPOINTS.MOVIES}/${id}`, payload);
};

export const deleteMovie = (id: number | string) => {
  if (id === undefined || id === null) {
    throw new Error("deleteMovie: 'id' is required");
  }
  return del<void>(`${API_ENDPOINTS.MOVIES}/${id}`);
};
