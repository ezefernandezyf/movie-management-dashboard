import { render, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '../../queries/queryClient';
import * as movieService from '../../services/movie.service';
import { movieKeys } from '../../queries/movie.keys';
import { useEffect } from 'react';
import { useDeleteMovie } from '../useDeleteMovie';
import * as authHook from '../useAuth';
import type { AuthState } from '../useAuth';
import type { User } from '@supabase/supabase-js';

const TestComp = ({ id }: { id: number }) => {
  const mutation = useDeleteMovie();
  useEffect(() => {
    mutation.mutate(id);
  }, [id, mutation]);
  return null;
};

describe('useDeleteMovie', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls deleteMovie with id and ownerId and invalidates queries', async () => {
    const ownerId = 'user-id-test';

    const mockAuth: AuthState = {
      user: { id: ownerId } as User,
      session: null,
      loading: false,
      signIn: vi.fn() as AuthState['signIn'],
      signUp: vi.fn() as AuthState['signUp'],
      signOut: vi.fn() as AuthState['signOut'],
    };
    vi.spyOn(authHook, 'useAuth').mockReturnValue(mockAuth);

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
      const firstCall = spy.mock.calls[0];
      expect(firstCall[0]).toBe(7); // id
      expect(firstCall[1]).toBe(ownerId); // ownerId

      expect(invalidateSpy).toHaveBeenCalled();
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: movieKeys.detail(7) });
    });
  });
});