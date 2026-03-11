import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MovieModal } from '../MovieModal/MovieModal';

describe('MovieModal', () => {
    it('renderiza, permite crear y llama onSaved y onClose', async () => {
        const user = userEvent.setup();

        const onSaved = vi.fn(() => Promise.resolve());
        const onClose = vi.fn();


        render(<MovieModal open={true} onClose={onClose} onSaved={onSaved} />);

        // Modal title
        expect(screen.getByText(/Nueva película|Editar película/i)).toBeDefined();

        await user.type(screen.getByLabelText(/Título/i), 'Test Movie');
        await user.type(screen.getByLabelText(/Géneros/i), 'Drama');
        const ratingInput = screen.getByLabelText(/Puntuación/i);
        await user.clear(ratingInput);
        await user.type(ratingInput, '7.0');

        await user.click(screen.getByRole('button', { name: /Guardar|Guardando.../i }));

        await waitFor(() => {
            expect(onSaved).toHaveBeenCalledTimes(1);
            expect(onClose).toHaveBeenCalledTimes(1);
        });

        expect(onSaved).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Test Movie',
                genres: ['Drama'],
                rating: 7,
            })
        );
    });
});