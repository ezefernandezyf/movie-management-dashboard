import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../services/movie.service';
import { movieKeys } from '../queries';
import type { Movie } from '../models';

export const useMovies = (params?: Record<string, unknown>, options?: any) =>
  useQuery<Movie[], Error>({
    queryKey: movieKeys.list(params),
    queryFn: ({ signal }) => getMovies(params, signal),
    staleTime: 30_000,
    keepPreviousData: true,
    ...options,
  });
