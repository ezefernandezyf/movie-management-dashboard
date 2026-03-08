import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getMovieById } from '../services/movie.service';
import type { Movie } from '../models';
import { movieKeys } from '../queries';

export const useMovie = (id?: number | string, options?: UseQueryOptions<Movie, Error>) => {
  const enabled = id !== undefined && id !== null;
  const queryKey = enabled ? movieKeys.detail(id) : movieKeys.detail('empty');

  const opts: UseQueryOptions<Movie, Error> = {
    queryKey,
    queryFn: async ({ signal }) => {
      if (!enabled) throw new Error("useMovie: 'id' is required");
      return getMovieById(id as number | string, signal);
    },
    enabled,
    staleTime: 30_000,
    ...options,
  };

  return useQuery(opts);
};
