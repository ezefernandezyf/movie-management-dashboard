import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Movie } from '../Forms/movie.schema';
import { MovieList } from '..';

const sampleMovies: Movie[] = [
    {
        id: 1,
        title: 'Peli Uno',
        description: 'Desc 1',
        posterPath: undefined,
        genres: ['Drama'],
        rating: 8,
        releaseDate: '2022-01-01',
    },
    {
        id: 2,
        title: 'Peli Dos',
        description: 'Desc 2',
        posterPath: undefined,
        genres: ['Comedia'],
        rating: 7,
        releaseDate: '2021-01-01',
    },
];

describe('MovieList', () => {
    it('muestra spinner cuando está cargando', () => {
        render(<MovieList isLoading />);
        expect(screen.getByRole('status')).toBeDefined();
    });

    it('muestra error y llama onRetry', async () => {
        const user = userEvent.setup();
        const onRetry = vi.fn();
        render(<MovieList isError="Fallo cargando" onRetry={onRetry} />);

        expect(screen.getByText('Fallo cargando')).toBeDefined();

        const btn = screen.getByRole('button', { name: /Reintentar/i });
        await user.click(btn);
        expect(onRetry).toHaveBeenCalledTimes(1);
    });

    it('muestra empty state y llama onCreate cuando se pulsa CTA', async () => {
        const user = userEvent.setup();
        const onCreate = vi.fn();
        render(<MovieList movies={[]} onCreate={onCreate} />);

        expect(screen.getByText(/No hay películas/i)).toBeDefined();
        const cta = screen.getByRole('button', { name: /Agregar película/i });
        await user.click(cta);
        expect(onCreate).toHaveBeenCalledTimes(1);
    });

    it('muestra MovieCard items y delega onEdit/onDelete', async () => {
        const user = userEvent.setup();
        const onEdit = vi.fn();
        const onDelete = vi.fn();

        render(<MovieList movies={sampleMovies} onEdit={onEdit} onDelete={onDelete} />);

        expect(screen.getByText('Peli Uno')).toBeDefined();
        expect(screen.getByText('Peli Dos')).toBeDefined();

        const editBtn = screen.getByRole('button', { name: /Editar Peli Uno/i });
        const deleteBtn = screen.getByRole('button', { name: /Eliminar Peli Uno/i });

        await user.click(editBtn);
        await user.click(deleteBtn);

        expect(onEdit).toHaveBeenCalledTimes(1);
        expect(onEdit).toHaveBeenCalledWith(sampleMovies[0]);

        expect(onDelete).toHaveBeenCalledTimes(1);
        expect(onDelete).toHaveBeenCalledWith(1);
    });
});