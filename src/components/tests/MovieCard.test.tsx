import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Movie } from '../Forms/movie.schema';
import { MovieCard } from '..';


const sample: Movie = {
    id: 1,
    title: 'Mi Película',
    description: 'Descripción',
    posterPath: undefined,
    genres: ['Drama', 'Acción'],
    rating: 7.5,
    releaseDate: '2023-01-01',
};

describe('MovieCard', () => {
    it('renderiza título, géneros y botones y llama callbacks', async () => {
        const user = userEvent.setup();
        const onEdit = vi.fn();
        const onDelete = vi.fn();

        render(<MovieCard movie={sample} onEdit={onEdit} onDelete={onDelete} />);

        expect(screen.getByText('Mi Película')).toBeDefined();

        expect(screen.getByText('Drama')).toBeDefined();
        expect(screen.getByText('Acción')).toBeDefined();

        const editBtn = screen.getByRole('button', { name: /Editar Mi Película/i });
        const deleteBtn = screen.getByRole('button', { name: /Eliminar Mi Película/i });

        await user.click(editBtn);
        await user.click(deleteBtn);

        expect(onEdit).toHaveBeenCalledTimes(1);
        expect(onEdit).toHaveBeenCalledWith(sample);

        expect(onDelete).toHaveBeenCalledTimes(1);
        expect(onDelete).toHaveBeenCalledWith(1);
    });
});