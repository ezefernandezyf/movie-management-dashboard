import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { createMovie } from '../services/movie.service';
import { movieKeys } from '../queries';
import type { Movie, CreateMovieDto } from '../models';

export const useCreateMovie = (options?: UseMutationOptions<Movie, Error, CreateMovieDto>) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Movie, Error, CreateMovieDto>({
    ...options,
    mutationFn: createMovie,
    onSuccess: (data, variables, context, mutationInfo) => {
      void queryClient.invalidateQueries({ queryKey: movieKeys.all });
      options?.onSuccess?.(data, variables, context, mutationInfo);
    },
  });

  return {
    ...mutation,
    isLoading: mutation.status === 'pending',
  } as typeof mutation & { isLoading: boolean };
};

