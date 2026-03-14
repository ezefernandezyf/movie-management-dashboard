import { useEffect } from 'react';
import { render, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '../../queries/queryClient';
import * as movieService from '../../services/movie.service';
import type { CreateMovieDto, Movie } from '../../models';
import { useCreateMovie } from '../useCreateMovie';
import * as authHook from '../useAuth';
import type { AuthState } from '../useAuth';
import type { User } from '@supabase/supabase-js';

const TestComp = ({ payload }: { payload: CreateMovieDto }) => {
  const mutation = useCreateMovie();
  useEffect(() => {
    mutation.mutate(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);
  return null;
};

describe('useCreateMovie', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls createMovie with payload and ownerId then invalidates queries', async () => {
    const mockMovie: Movie = { id: 42, title: 'Nueva peli' } as Movie;
    const ownerId = 'user-xyz';

    const mockAuth: AuthState = {
      user: { id: ownerId } as User,
      session: null,
      loading: false,
      signIn: vi.fn() as AuthState['signIn'],
      signUp: vi.fn() as AuthState['signUp'],
      signOut: vi.fn() as AuthState['signOut'],
    };

    vi.spyOn(authHook, 'useAuth').mockReturnValue(mockAuth);

    const createSpy = vi.spyOn(movieService, 'createMovie').mockResolvedValueOnce(mockMovie);

    const queryClient = createQueryClient();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    render(
      <QueryClientProvider client={queryClient}>
        <TestComp payload={{ title: 'Nueva peli' }} />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(createSpy).toHaveBeenCalledTimes(1);

      const call = createSpy.mock.calls[0];
      expect(call[0]).toEqual({ title: 'Nueva peli' });
      expect(call[1]).toBe(ownerId);

      expect(invalidateSpy).toHaveBeenCalled();
    });
  });
});