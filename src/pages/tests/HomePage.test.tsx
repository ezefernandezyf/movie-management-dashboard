import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as hooks from '../../hooks';
import type { Movie } from '../../models';
import { HomePage } from '../HomePage';

afterEach(() => {
  vi.restoreAllMocks();
});

const movies: Movie[] = [
  {
    id: 1,
    title: 'A Movie',
    description: 'Desc A',
    poster_path: '',
    genre: 'Drama',
    rating: 9,
    year: 2020,
    status: 'active',
  },
  {
    id: 2,
    title: 'B Movie',
    description: 'Desc B',
    poster_path: '',
    genre: 'Action',
    rating: 8,
    year: 2019,
    status: 'archived',
  },
];

describe('HomePage', () => {
  it('muestra métricas y top rated', () => {
    const useMoviesMockReturn: Partial<ReturnType<typeof hooks.useMovies>> = {
      data: movies,
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    };
    vi.spyOn(hooks, 'useMovies').mockReturnValue(
      useMoviesMockReturn as ReturnType<typeof hooks.useMovies>,
    );

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const totalLabel = screen.getByText(/Total/i);
    const activeLabel = screen.getByText(/Activas/i);
    const archivedLabel = screen.getByText(/Archivadas/i);
    const avgLabel = screen.getByText(/Promedio rating/i);

    expect(totalLabel).toBeInTheDocument();
    expect(activeLabel).toBeInTheDocument();
    expect(archivedLabel).toBeInTheDocument();
    expect(avgLabel).toBeInTheDocument();

    const getNumberFromCard = (labelEl: HTMLElement) => {
      const card = labelEl.parentElement;
      if (!card) throw new Error('Card container not found for label: ' + labelEl.textContent);
      return within(card).getByText((content) => content.trim() === '2');
    };

    expect(getNumberFromCard(totalLabel)).toBeInTheDocument();

    const activeCardNumber = within(activeLabel.parentElement!).getByText((c) => c.trim() === '1');
    expect(activeCardNumber).toBeInTheDocument();

    const archivedCardNumber = within(archivedLabel.parentElement!).getByText(
      (c) => c.trim() === '1',
    );
    expect(archivedCardNumber).toBeInTheDocument();

    expect(screen.getByText(/Top rated/i)).toBeInTheDocument();
    expect(screen.getAllByText('A Movie')).toBeTruthy();
  });
});
