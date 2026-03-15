import { render, screen, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '../../queries/queryClient';
import * as movieService from '../../services/movie.service';
import type { Movie } from '../../models';
import { useMovie } from '../useMovie';

const TestComp = ({ id }: { id?: number | string }) => {
  const { data, isLoading, isError } = useMovie(id);
  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  return <div>{data ? data.title : 'no-data'}</div>;
};

describe('useMovie hook', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows title when getMovieById resolves', async () => {
    const sample: Movie = {
      id: 1,
      title: 'The Shawshank Redemption',
      description: 'Dos hombres encarcelados forjan una amistad a lo largo de décadas.',
      genre: 'Drama',
      year: 1994,
      rating: 9.3,
      status: 'active',
    };

    const spy = vi.spyOn(movieService, 'getMovieById').mockResolvedValueOnce(sample);

    const qc = createQueryClient();

    render(
      <QueryClientProvider client={qc}>
        <TestComp id={1} />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/The Shawshank Redemption/)).toBeTruthy();
    });

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('does not execute query if id is undefined', async () => {
    const spy = vi.spyOn(movieService, 'getMovieById');

    const qc = createQueryClient();

    render(
      <QueryClientProvider client={qc}>
        <TestComp id={undefined} />
      </QueryClientProvider>,
    );

    await new Promise((r) => setTimeout(r, 50));
    expect(spy).not.toHaveBeenCalled();
  });
});
