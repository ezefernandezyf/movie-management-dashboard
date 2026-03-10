import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';
import userEvent from '@testing-library/user-event';
import { EmptyState } from '../EmptyState';
import { ErrorMessage } from '../ErrorMessage';

describe('LoadingSpinner', () => {
    it('renders with default label', () => {
        render(<LoadingSpinner />);
        expect(screen.getByRole('status')).toBeDefined();
        expect(screen.getByText('Cargando...')).toBeDefined();
    });

    it('renders with custom label and size', () => {
        render(<LoadingSpinner size="lg" label="Loading movies" />);
        expect(screen.getByText('Loading movies')).toBeDefined();
    });
});

describe('EmptyState', () => {
    it('renders title and description', () => {
        render(<EmptyState title="Nada" description="No hay nada" />);
        expect(screen.getByText('Nada')).toBeDefined();
        expect(screen.getByText('No hay nada')).toBeDefined();
    });

    it('calls onCta when CTA button clicked', async () => {
        const user = userEvent.setup();
        const onCta = vi.fn();
        render(<EmptyState ctaLabel="Crear" onCta={onCta} />);
        const btn = screen.getByRole('button', { name: /Crear/i });
        await user.click(btn);
        expect(onCta).toHaveBeenCalledTimes(1);
    });
});


describe('ErrorMessage', () => {
    it('renders error message string', () => {
        render(<ErrorMessage error="Falló" />);
        expect(screen.getByText('Falló')).toBeDefined();
    });

    it('calls onRetry when retry clicked', async () => {
        const user = userEvent.setup();
        const onRetry = vi.fn();
        render(<ErrorMessage error={new Error('Boom')} onRetry={onRetry} />);
        const btn = screen.getByRole('button', { name: /Reintentar/i });
        await user.click(btn);
        expect(onRetry).toHaveBeenCalledTimes(1);
    });
});