import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { deleteMovie } from '../services/movie.service';
import { movieKeys } from '../queries';

export const useDeleteMovie = (
  options?: UseMutationOptions<void, Error, number | string, unknown>,
) => {
  const queryClient = useQueryClient();

  const opts: UseMutationOptions<void, Error, number | string, unknown> = {
    mutationFn: (id: number | string) => deleteMovie(id),
    onSuccess: (data, id, context, mutation) => {
      queryClient.invalidateQueries({ queryKey: movieKeys.all });
      queryClient.invalidateQueries({ queryKey: movieKeys.detail(id) });
      options?.onSuccess?.(data, id, context, mutation);
    },
    ...options,
  };

  return useMutation<void, Error, number | string, unknown>(opts);
};
