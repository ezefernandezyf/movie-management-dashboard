import { API_ENDPOINTS, get, post, put, del } from './';
import type { Movie, CreateMovieDto, UpdateMovieDto, MovieQueryParams } from '../models/';
import { mapToServerParams } from '../utils';

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;

const hasDataArray = (v: unknown): v is { data: unknown } =>
  isObject(v) && 'data' in v && Array.isArray((v as Record<string, unknown>).data);


export const getMovies = async (uiParams?: MovieQueryParams, signal?: AbortSignal) => {
  const serverParams = mapToServerParams(uiParams);

  const res = await get<unknown>(API_ENDPOINTS.MOVIES, { params: serverParams, signal });

  if (Array.isArray(res)) {
    return res as Movie[];
  }

  if (hasDataArray(res)) {
    const data = (res as Record<string, unknown>).data as unknown;
    if (Array.isArray(data)) {
      if (data.length > 0) {
        return data as Movie[];
      }

      const hadQueryParams = serverParams && Object.keys(serverParams).length > 0;
      if (hadQueryParams) {
        const fallback = await get<unknown>(API_ENDPOINTS.MOVIES, { signal });
        if (Array.isArray(fallback)) {
          return fallback as Movie[];
        }
        if (hasDataArray(fallback)) {
          return (fallback as Record<string, unknown>).data as Movie[];
        }
      }

      return [] as Movie[];
    }
  }

  throw new Error('getMovies: unexpected response shape from server');
};

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
