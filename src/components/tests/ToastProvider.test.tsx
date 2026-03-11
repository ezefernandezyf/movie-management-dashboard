import { render, screen } from '@testing-library/react';
import { createElement } from 'react';

vi.mock('react-hot-toast', () => {
    return {
        __esModule: true,
        default: {
            success: vi.fn(),
            error: vi.fn(),
        },
        toast: {
            success: vi.fn(),
            error: vi.fn(),
        },
        Toaster: ({ children }: { children?: React.ReactNode }) => {
            return createElement('div', { 'data-testid': 'toaster' }, children);
        },
    };
});

import * as toastLib from '../../lib/toast';
import { ToastProvider } from '../ToastProvider/ToastProvider';


describe('ToastProvider & toast helpers', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders children and Toaster stub is present', () => {
        render(
            <ToastProvider>
                <div>App content</div>
            </ToastProvider>
        );

        expect(screen.getByText('App content')).toBeDefined();
        expect(screen.getByTestId('toaster')).toBeDefined();
    });

    it('calls underlying toast on showSuccess/showError', async () => {
        toastLib.showSuccess('OK');
        toastLib.showError('Fail');

        const mod = await import('react-hot-toast');

        expect(mod.default.success).toHaveBeenCalledWith('OK', undefined);
        expect(mod.default.error).toHaveBeenCalledWith('Fail', undefined);

    });
});