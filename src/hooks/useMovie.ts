import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getMovieById } from '../services/movie.service';
import type { Movie } from '../models';
import { movieKeys } from '../queries';

export const useMovie = (id?: number | string, options?: UseQueryOptions<Movie, Error>) =>
  useQuery({
    queryKey: id !== undefined && id !== null ? movieKeys.detail(id) : movieKeys.detail('empty'),
    queryFn: ({ signal }) => {
      if (id === undefined || id === null) {
     
        return Promise.reject(new Error("useMovie: 'id' is required"));
      }
      return getMovieById(id, signal);
    },
    enabled: id !== undefined && id !== null,
    staleTime: 30_000,
    ...options,
  } as UseQueryOptions<Movie, Error>);

