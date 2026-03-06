import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { getMovies } from '../services/movie.service';
import type { Movie, MovieQueryParams } from '../models';
import { movieKeys } from '../queries';

export const useMovies = (params?: MovieQueryParams, options?: UseQueryOptions<Movie[], Error>) =>
  useQuery({
    queryKey: movieKeys.list(params),
    queryFn: ({ signal }) => getMovies(params, signal),
    staleTime: 30_000,
    keepPreviousData: true,
    ...options,
  } as UseQueryOptions<Movie[], Error>);
