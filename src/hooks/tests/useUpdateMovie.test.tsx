import { useEffect } from 'react';
import { render, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '../../queries/queryClient';
import * as movieService from '../../services/movie.service';
import type { UpdateMovieDto, Movie } from '../../models';
import { movieKeys } from '../../queries/movie.keys';
import { useUpdateMovie } from '../useUpdateMovie';

type UpdateParams = { id: number; data: UpdateMovieDto };

const TestComp = ({ params }: { params: UpdateParams }) => {
  const mutation = useUpdateMovie();
  useEffect(() => {
    mutation.mutate(params);
  }, [params]);
  return null;
};

describe('useUpdateMovie', () => {
  it('calls updateMovie with id and payload and invalidates queries', async () => {
    const updated: Movie = { id: 5, title: 'Updated title' };
    const spy = vi.spyOn(movieService, 'updateMovie').mockResolvedValueOnce(updated as Movie);

    const qc = createQueryClient();
    const invalidateSpy = vi.spyOn(qc, 'invalidateQueries');

    render(
      <QueryClientProvider client={qc}>
        <TestComp params={{ id: 5, data: { title: 'Updated title 2' } }} />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
      const firstCall = spy.mock.calls[0];
      expect(firstCall[0]).toBe(5);
      expect(firstCall[1]).toEqual({ title: 'Updated title 2' });

      expect(invalidateSpy).toHaveBeenCalled();
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: movieKeys.detail(5) });
    });
  });
});
