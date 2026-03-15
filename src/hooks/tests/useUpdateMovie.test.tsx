import { useEffect } from 'react';
import { render, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '../../queries/queryClient';
import * as movieService from '../../services/movie.service';
import type { UpdateMovieDto, Movie } from '../../models';
import { movieKeys } from '../../queries/movie.keys';
import { useUpdateMovie } from '../useUpdateMovie';
import * as authHook from '../useAuth';
import type { AuthState } from '../useAuth';
import type { User } from '@supabase/supabase-js';
import { vi } from 'vitest';

type UpdateParams = { id: number; data: UpdateMovieDto };

const TestComp = ({ params }: { params: UpdateParams }) => {
  const mutation = useUpdateMovie();
  useEffect(() => {
    mutation.mutate(params);
  }, [params, mutation]);
  return null;
};

describe('useUpdateMovie', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls updateMovie with id, payload and ownerId, invalidates queries', async () => {
    const updated: Movie = { id: 5, title: 'Updated title' } as Movie;
    const ownerId = 'user-123';

    const mockAuth: AuthState = {
      user: { id: ownerId } as User,
      session: null,
      loading: false,
      signIn: vi.fn() as AuthState['signIn'],
      signUp: vi.fn() as AuthState['signUp'],
      signOut: vi.fn() as AuthState['signOut'],
    };
    vi.spyOn(authHook, 'useAuth').mockReturnValue(mockAuth);

    const spy = vi.spyOn(movieService, 'updateMovie').mockResolvedValueOnce(updated);

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
      expect(firstCall[2]).toBe(ownerId);

      expect(invalidateSpy).toHaveBeenCalled();
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: movieKeys.detail(5) });
    });
  });
});
