import { useEffect } from 'react';
import { render, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '../../queries/queryClient';
import { vi } from 'vitest';

import * as services from '../../services';
import * as movieService from '../../services/movie.service';
import type { CreateMovieDto, Movie } from '../../models';
import { useCreateMovie } from '../useCreateMovie';

const TestComp = ({ payload }: { payload: CreateMovieDto }) => {
  const mutation = useCreateMovie();
  useEffect(() => {
    mutation.mutate(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);
  return null;
};

describe('useCreateMovie', () => {

  it('calls createMovie and invalidates queries', async () => {
    const mockMovie: Movie = { id: 42, title: 'Nueva peli' } as Movie;

    const postSpy = vi.spyOn(services, 'post').mockResolvedValueOnce(mockMovie);

    const createSpy = vi.spyOn(movieService, 'createMovie').mockImplementation(async (payload: CreateMovieDto) => {
      return services.post('/movies', payload);
    });

    const queryClient = createQueryClient();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    render(
      <QueryClientProvider client={queryClient}>
        <TestComp payload={{ title: 'Nueva peli' }} />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      // createMovie fue llamado
      expect(createSpy).toHaveBeenCalledTimes(1);

      const firstArg = createSpy.mock.calls[0][0];
      expect(firstArg).toEqual({ title: 'Nueva peli' });

      expect(postSpy).toHaveBeenCalled();

      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['movies'] });
    });
  });
});