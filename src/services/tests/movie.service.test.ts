import type { Movie, CreateMovieDto, UpdateMovieDto } from '../../models';
import { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } from '../movie.service';
import { API_ENDPOINTS, get, post, put, del } from '../';

vi.mock('../', () => ({
  API_ENDPOINTS: { MOVIES: '/movies' },
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  del: vi.fn(),
}));

const mockedGet = vi.mocked(get);
const mockedPost = vi.mocked(post);
const mockedPut = vi.mocked(put);
const mockedDel = vi.mocked(del);

describe('movie.service', () => {
  it('getMovies calls get and returns movies', async () => {
    const movies: Movie[] = [{ id: 1, title: 'A' }];
    mockedGet.mockResolvedValue(movies);
    const res = await getMovies({ page: 1 });
    expect(mockedGet).toHaveBeenCalledTimes(1);
    expect(mockedGet).toHaveBeenCalledWith(
      API_ENDPOINTS.MOVIES,
      expect.objectContaining({ params: { _page: 1 }, signal: undefined }),
    );
    expect(res).toEqual(movies);
  });

  it('getMovies forwards AbortSignal when provided', async () => {
    const movies: Movie[] = [{ id: 9, title: 'Sig' }];
    const controller = new AbortController();
    mockedGet.mockResolvedValue(movies);
    const res = await getMovies(undefined, controller.signal);
    expect(mockedGet).toHaveBeenCalledWith(
      API_ENDPOINTS.MOVIES,
      expect.objectContaining({ params: undefined, signal: controller.signal }),
    );
    expect(res).toEqual(movies);
  });

  it('getMovieById throws when id is null', () => {
    expect(() => getMovieById(null as unknown as number)).toThrow();
  });

  it('getMovieById returns movie when id provided', async () => {
    const movie: Movie = { id: 2, title: 'B' };
    mockedGet.mockResolvedValue(movie);
    const res = await getMovieById(2);
    expect(mockedGet).toHaveBeenCalledWith(
      `${API_ENDPOINTS.MOVIES}/2`,
      expect.objectContaining({ signal: undefined }),
    );
    expect(res).toEqual(movie);
  });

  it('createMovie calls post and returns movie', async () => {
    const dto: CreateMovieDto = { title: 'C' };
    const created: Movie = { id: 3, title: 'C' };
    mockedPost.mockResolvedValue(created);
    const res = await createMovie(dto);
    expect(mockedPost).toHaveBeenCalledWith(API_ENDPOINTS.MOVIES, dto);
    expect(res).toEqual(created);
  });

  it('updateMovie throws when id missing', () => {
    expect(() => updateMovie(undefined as unknown as number, {} as UpdateMovieDto)).toThrow();
  });

  it('updateMovie calls put and returns movie', async () => {
    const dto: UpdateMovieDto = { title: 'D' };
    const updated: Movie = { id: 4, title: 'D' };
    mockedPut.mockResolvedValue(updated);
    const res = await updateMovie(4, dto);
    expect(mockedPut).toHaveBeenCalledWith(`${API_ENDPOINTS.MOVIES}/4`, dto);
    expect(res).toEqual(updated);
  });

  it('deleteMovie throws when id missing', () => {
    expect(() => deleteMovie(undefined as unknown as number)).toThrow();
  });

  it('deleteMovie calls del and returns void', async () => {
    mockedDel.mockResolvedValue(undefined);
    const res = await deleteMovie(5);
    expect(mockedDel).toHaveBeenCalledWith(`${API_ENDPOINTS.MOVIES}/5`);
    expect(res).toBeUndefined();
  });

  it('service propagates ApiError from underlying helper', async () => {
    const apiError = new Error('Not Found');
    mockedGet.mockRejectedValue(apiError);

    await expect(getMovies()).rejects.toThrow(apiError);
    expect(mockedGet).toHaveBeenCalled();
  });
});
