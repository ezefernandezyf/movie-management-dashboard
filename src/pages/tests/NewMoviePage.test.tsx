import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import * as hooks from '../../hooks';
import * as toast from '../../lib/toast';
import { NewMoviePage } from '../NewMoviePage';

describe('NewMoviePage', () => {
    it('crea una película y navega', async () => {
        const mutateAsync = vi.fn().mockResolvedValue({
            id: 1,
            title: 'TestMovie',
        });

        vi.spyOn(hooks, 'useCreateMovie').mockReturnValue({
            mutateAsync,
            isLoading: false,
        } as unknown as ReturnType<typeof hooks.useCreateMovie>);

        vi.spyOn(toast, 'showSuccess').mockImplementation(() => 'ok');
        vi.spyOn(toast, 'showError').mockImplementation(() => 'ok');

        render(
            <MemoryRouter initialEntries={['/movies/new']}>
                <Routes>
                    <Route path="/movies/new" element={<NewMoviePage />} />
                    <Route path="/movies" element={<div>Movies Page</div>} />
                </Routes>
            </MemoryRouter>,
        );

        const user = userEvent.setup();

        await user.type(screen.getByLabelText(/Título/i), 'TestMovie');
        await user.type(screen.getByLabelText(/Género/i), 'Acción');
        await user.type(screen.getByLabelText(/Año/i), '2000');
        await user.type(screen.getByLabelText(/Puntuación/i), '7');

        await user.click(screen.getByRole('button', { name: /Crear película/i }));

        await waitFor(() => {
            expect(mutateAsync).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: 'TestMovie',
                    genre: 'Acción',
                    year: 2000,
                    rating: 7,
                    status: 'active',
                }),
            );
            expect(toast.showSuccess).toHaveBeenCalledWith('Película creada');
            expect(screen.getByText(/Movies Page/i)).toBeInTheDocument();
        });
    });
});