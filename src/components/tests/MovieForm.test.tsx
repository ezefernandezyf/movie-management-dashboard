import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MovieForm } from '../Forms/MovieForm';

describe('MovieForm', () => {
    it('valida título requerido y transforma genres y rating en submit', async () => {
        const onSubmit = vi.fn();
        const user = userEvent.setup();

        render(<MovieForm onSubmit={onSubmit} />);

        const submitBtn = screen.getByRole('button', { name: /Guardar/i });

        await user.click(submitBtn);
        expect(await screen.findByText(/El título es obligatorio/i)).toBeDefined();

        const titleInput = screen.getByLabelText(/Título/i);
        await user.type(titleInput, 'Matrix');

        const genresInput = screen.getByLabelText(/Géneros/i);
        await user.type(genresInput, 'Ciencia ficción, Acción');

        const ratingInput = screen.getByLabelText(/Puntuación/i);
        await user.clear(ratingInput);
        await user.type(ratingInput, '8.2');

        await user.click(submitBtn);

        expect(onSubmit).toHaveBeenCalledTimes(1);
        const payload = onSubmit.mock.calls[0][0];

        screen.debug();

        expect(payload.title).toBe('Matrix');
        expect(payload.genres).toEqual(['Ciencia ficción', 'Acción']);
        expect(payload.rating).toBe(8.2);
    });
});