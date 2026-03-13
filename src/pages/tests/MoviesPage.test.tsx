import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as hooks from '../../hooks';
import type { Movie } from '../../models';
import { MoviesPage } from '../MoviesPage';

const movies: Movie[] = [
    {
        id: 1,
        title: 'Fight Club',
        description: 'Fight description',
        posterPath: '',
        genre: 'Drama',
        rating: 8.8,
        year: 1999,
        status: 'active',
    },
    {
        id: 2,
        title: 'The Matrix',
        description: 'Matrix description',
        posterPath: '',
        genre: 'Sci-Fi',
        rating: 8.7,
        year: 1999,
        status: 'active',
    },
];

describe('MoviesPage', () => {
    it('filtra por q param y muestra sólo la coincidencia', () => {
        const useMoviesMockReturn: Partial<ReturnType<typeof hooks.useMovies>> = {
            data: movies,
            isLoading: false,
            isError: false,
            refetch: vi.fn(),
        };
        vi.spyOn(hooks, 'useMovies').mockReturnValue(useMoviesMockReturn as ReturnType<typeof hooks.useMovies>);

        const useDeleteMovieMockReturn: Partial<ReturnType<typeof hooks.useDeleteMovie>> = {
            mutateAsync: vi.fn(),
        };
        vi.spyOn(hooks, 'useDeleteMovie').mockReturnValue(
            useDeleteMovieMockReturn as ReturnType<typeof hooks.useDeleteMovie>,
        );

        render(
            <MemoryRouter initialEntries={['/movies?q=Fight']}>
                <MoviesPage />
            </MemoryRouter>,
        );

        expect(screen.getByText(/Fight Club/i)).toBeInTheDocument();
        expect(screen.queryByText(/The Matrix/i)).toBeNull();
    });
});