import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '../../queries/queryClient';
import * as movieService from '../../services/movie.service';
import type { Movie, MovieQueryParams } from '../../models';
import { useMovies } from '../useMovies';

const TestComp = ({ params }: { params?: MovieQueryParams }) => {
  const { data, isLoading, isError } = useMovies(params);
  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  return (
    <div>
      {(data ?? []).map((m: Movie) => (
        <div key={m.id} data-testid={`movie-${m.id}`}>
          {m.title}
        </div>
      ))}
    </div>
  );
};

describe('useMovies hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it('fetches and renders movies with params', async () => {
    const movies: Movie[] = [
      {
        id: 1,
        title: 'A',
        description: '',
        genre: 'Drama',
        year: 2000,
        rating: 8,
        status: 'active',
      },
      {
        id: 2,
        title: 'B',
        description: '',
        genre: 'Crime',
        year: 1999,
        rating: 7,
        status: 'archived',
      },
    ];

    const spy = vi.spyOn(movieService, 'getMovies').mockResolvedValueOnce(movies);

    const qc = createQueryClient();
    render(
      <QueryClientProvider client={qc}>
        <TestComp params={{ page: 1, limit: 2 }} />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('movie-1')).toHaveTextContent('A');
      expect(screen.getByTestId('movie-2')).toHaveTextContent('B');
    });

    expect(spy).toHaveBeenCalledTimes(1);
    const callArgs = spy.mock.calls[0];
    expect(callArgs[0]).toEqual({ page: 1, limit: 2 });
  });

  it('renders empty list when service returns empty array', async () => {
    const spy = vi.spyOn(movieService, 'getMovies').mockResolvedValueOnce([]);

    const qc = createQueryClient();
    render(
      <QueryClientProvider client={qc}>
        <TestComp params={{ page: 1, limit: 5 }} />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('movie-1')).toBeNull();
    });

    expect(spy).toHaveBeenCalled();
  });
});