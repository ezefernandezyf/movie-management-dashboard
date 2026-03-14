import type { MovieDbRow } from '../../models/movie.model';
import { getMovieById, mapDbRowToMovie } from '../movie.service';

const fromMock = vi.fn();

vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: (...args: unknown[]) => fromMock(...(args as [])),
  },
}));

import { supabase } from '../../lib/supabase';

describe('movie.service - simple Supabase mock tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getMovieById llama supabase.from y retorna la movie mapeada', async () => {
    const dbRow: MovieDbRow = {
      id: 22,
      title: 'Matrix',
      description: 'sci-fi',
      poster_path: '/img/matrix.png',
      genre: 'Sci-Fi',
      year: 1999,
      rating: 8.7,
      status: 'active',
      owner_id: 'ownerX',
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-02T00:00:00Z',
    };

    const queryMock = {
      select: vi.fn(() => queryMock),
      eq: vi.fn(() => queryMock),
      single: vi.fn(() => ({ data: dbRow, error: null })),
    };

    fromMock.mockReturnValue(queryMock);

    const res = await getMovieById(22);

    expect(supabase.from).toBeDefined();
    expect(fromMock).toHaveBeenCalledWith('movies');
    expect(queryMock.select).toHaveBeenCalled();
    expect(queryMock.eq).toHaveBeenCalledWith('id', 22);
    expect(queryMock.single).toHaveBeenCalled();
    expect(res).toEqual(mapDbRowToMovie(dbRow));
  });

  it('getMovieById lanza si id es inválido', async () => {
    await expect(getMovieById(null as unknown as number)).rejects.toThrow();
  });
});
