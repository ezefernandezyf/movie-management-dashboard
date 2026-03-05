import { API_ENDPOINTS, get, post, put, del } from './';
import type { Movie, CreateMovieDto, UpdateMovieDto } from '../models/';

export const getMovies = (params?: Record<string, unknown>, signal?: AbortSignal) =>
  get<Movie[]>(API_ENDPOINTS.MOVIES, { params, signal });

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
