import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import * as hooks from '../../hooks';
import * as toast from '../../lib/toast';
import { EditMoviePage } from '../EditMoviePage';

describe('EditMoviePage', () => {

    it('carga movie, edita y navega a movies', async () => {
        const sample = {
            id: 1,
            title: 'Old Title',
            description: 'Old desc',
            posterPath: '',
            genre: 'Drama',
            rating: 6.5,
            year: 2020,
            status: 'active',
        };

        const useMovieMock: Partial<ReturnType<typeof hooks.useMovie>> = {
            data: sample,
            isLoading: false,
            isError: false,
            refetch: vi.fn(),
        };
        vi.spyOn(hooks, 'useMovie').mockReturnValue(useMovieMock as ReturnType<typeof hooks.useMovie>);

        const mutateAsync = vi.fn().mockResolvedValue({
            ...sample,
            title: 'New Title',
        });
        vi.spyOn(hooks, 'useUpdateMovie').mockReturnValue({
            mutateAsync,
            status: 'idle',
        } as unknown as ReturnType<typeof hooks.useUpdateMovie>);

        vi.spyOn(toast, 'showError').mockImplementation(() => 'ok');
        vi.spyOn(toast, 'showSuccess').mockImplementation(() => 'ok');

        render(
            <MemoryRouter initialEntries={['/movies/1/edit']}>
                <Routes>
                    <Route path="/movies/:id/edit" element={<EditMoviePage />} />
                    <Route path="/movies" element={<div>Movies Page</div>} />
                </Routes>
            </MemoryRouter>,
        );

        const user = userEvent.setup();

        const titleInput = screen.getByLabelText(/Título/i);
        await user.clear(titleInput);
        await user.type(titleInput, 'New Title');

        const ratingInput = screen.getByLabelText(/Puntuación/i);
        await user.clear(ratingInput);
        await user.type(ratingInput, '7.5');

        await user.click(screen.getByRole('button', { name: /Guardar cambios/i }));

        await waitFor(() => {
            expect(mutateAsync).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: 1,
                    data: expect.objectContaining({
                        title: 'New Title',
                        rating: 7.5,
                    }),
                }),
            );

            expect(screen.getByText(/Movies Page/i)).toBeInTheDocument();
        });
    });
});