import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { createMovie } from '../services/movie.service';
import { movieKeys } from '../queries';
import type { Movie, CreateMovieDto } from '../models';

export const useCreateMovie = (options?: UseMutationOptions<Movie, Error, CreateMovieDto>) => {
  const queryClient = useQueryClient();

  return useMutation<Movie, Error, CreateMovieDto>({
    mutationFn: createMovie,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: movieKeys.all });
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};
