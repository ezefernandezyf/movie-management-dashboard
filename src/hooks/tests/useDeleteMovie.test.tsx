import { render, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '../../queries/queryClient';
import * as movieService from '../../services/movie.service';
import { movieKeys } from '../../queries/movie.keys';
import { useEffect } from 'react';
import { useDeleteMovie } from '../useDeleteMovie';

const TestComp = ({ id }: { id: number }) => {
  const mutation = useDeleteMovie();
  useEffect(() => {
    mutation.mutate(id);
  }, [id, mutation]);
  return null;
};

describe('useDeleteMovie', () => {
  it('calls deleteMovie with id and invalidates queries', async () => {
    const spy = vi.spyOn(movieService, 'deleteMovie').mockResolvedValueOnce(undefined);

    const qc = createQueryClient();
    const invalidateSpy = vi.spyOn(qc, 'invalidateQueries');

    render(
      <QueryClientProvider client={qc}>
        <TestComp id={7} />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
      const firstCallArg = spy.mock.calls[0][0];
      expect(firstCallArg).toBe(7);

      expect(invalidateSpy).toHaveBeenCalled();
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: movieKeys.detail(7) });
    });
  });
});
