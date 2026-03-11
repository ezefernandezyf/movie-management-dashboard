import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';

describe('ConfirmDialog', () => {
    it('muestra título y descripción, llama onConfirm y onCancel (sin duplicar diálogos)', async () => {
        const user = userEvent.setup();
        const onConfirm = vi.fn(() => Promise.resolve());
        const onCancel = vi.fn();

        const { rerender } = render(
            <ConfirmDialog
                open={true}
                title="¿Eliminar?"
                description="Esta acción no se puede deshacer."
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        );

        expect(screen.getByText('¿Eliminar?')).toBeDefined();
        expect(screen.getByText('Esta acción no se puede deshacer.')).toBeDefined();

        const dialog = screen.getByRole('alertdialog');
        const cancelBtn = within(dialog).getByRole('button', { name: /Cancelar/i });
        await user.click(cancelBtn);
        expect(onCancel).toHaveBeenCalledTimes(1);

        rerender(
            <ConfirmDialog
                open={true}
                title="¿Eliminar?"
                description="Esta acción no se puede deshacer."
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        );

        const dialogAfter = screen.getByRole('alertdialog');
        const confirmBtn = within(dialogAfter).getByRole('button', { name: /Confirmar/i });
        await user.click(confirmBtn);

        await waitFor(() => {
            expect(onConfirm).toHaveBeenCalledTimes(1);
        });
    });

    it('deshabilita el botón confirmar cuando isLoading es true (scoped query)', async () => {
        const user = userEvent.setup();
        const onConfirm = vi.fn();
        const onCancel = vi.fn();

        render(
            <ConfirmDialog
                open={true}
                onConfirm={onConfirm}
                onCancel={onCancel}
                isLoading={true}
            />
        );

        const dialog = screen.getByRole('alertdialog');
        const confirmBtn = within(dialog).getByRole('button', { name: /Confirmar/i });
        expect(confirmBtn).toBeDisabled();

        await user.click(confirmBtn);
        expect(onConfirm).toHaveBeenCalledTimes(0);
    });
});