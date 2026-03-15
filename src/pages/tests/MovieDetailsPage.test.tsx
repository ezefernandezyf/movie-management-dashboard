import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as hooks from '../../hooks';
import type { Movie } from '../../models';
import { MovieDetailsPage } from '..';

afterEach(() => {
  vi.restoreAllMocks();
});

const sample: Movie = {
  id: 1,
  title: 'MovieTest',
  description: 'About a',
  poster_path: '',
  genre: 'Drama',
  rating: 8.8,
  year: 1999,
  status: 'active',
};

describe('MovieDetailsPage', () => {
  it('muestra detalles cuando el hook devuelve datos', () => {
    const useMovieMock: Partial<ReturnType<typeof hooks.useMovie>> = {
      data: sample,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    };
    vi.spyOn(hooks, 'useMovie').mockReturnValue(useMovieMock as ReturnType<typeof hooks.useMovie>);

    vi.spyOn(hooks, 'useDeleteMovie').mockReturnValue({
      mutateAsync: vi.fn(),
      isLoading: false,
    } as Partial<ReturnType<typeof hooks.useDeleteMovie>> as ReturnType<
      typeof hooks.useDeleteMovie
    >);

    render(
      <MemoryRouter initialEntries={['/movies/1']}>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetailsPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getAllByText(/MovieTest/i)).toHaveLength(2);
    expect(screen.getByText(/About a/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Editar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Eliminar/i })).toBeInTheDocument();
  });
});
