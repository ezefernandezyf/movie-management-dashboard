import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { updateMovie } from '../services/movie.service';
import { movieKeys } from '../queries';
import type { Movie, UpdateMovieDto } from '../models';

type UpdateMovieParams = { id: number | string; data: UpdateMovieDto };

export const useUpdateMovie = (options?: UseMutationOptions<Movie, Error, UpdateMovieParams>) => {
  const queryClient = useQueryClient();

  return useMutation<Movie, Error, UpdateMovieParams>({
    mutationFn: ({ id, data }) => updateMovie(id, data),
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: movieKeys.all });
      queryClient.invalidateQueries({ queryKey: movieKeys.detail(variables.id) });
      options?.onSuccess?.(data, variables, context, mutation);
    },
    ...options,
  });
};

