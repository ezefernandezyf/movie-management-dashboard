import { render, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '../../queries/queryClient';
import * as movieService from '../../services/movie.service';
import type { CreateMovieDto, Movie } from '../../models';
import { useCreateMovie } from '../useCreateMovie';
import { useEffect } from 'react';

const TestComp = ({ payload }: { payload: CreateMovieDto }) => {
  const mutation = useCreateMovie();
  useEffect(() => {
    mutation.mutate(payload);
  }, [payload, mutation]);
  return null;
};

describe('useCreateMovie', () => {
  it('calls createMovie and invalidates queries', async () => {
    const mockMovie: Movie = { id: 42, title: 'Nueva peli' };
    const spy = vi.spyOn(movieService, 'createMovie').mockResolvedValueOnce(mockMovie);

    const queryClient = createQueryClient();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    render(
      <QueryClientProvider client={queryClient}>
        <TestComp payload={{ title: 'Nueva peli' }} />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const args = spy.mock.calls[0][0];
      expect(args).toEqual({ title: 'Nueva peli' });

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['movies'] });
    });
  });
});
