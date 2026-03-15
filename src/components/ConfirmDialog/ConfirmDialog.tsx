import { useEffect, useRef } from 'react';

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
  isLoading?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
};

export const ConfirmDialog = ({
  open,
  title = 'Confirmar acción',
  description,
  onConfirm,
  onCancel,
  isLoading = false,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
}: Props): React.JSX.Element | null => {
  const confirmBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => confirmBtnRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onCancel();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!open) return null;

  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby={description ? 'confirm-dialog-desc' : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onOverlayClick}
    >
      <div className="fixed inset-0 bg-black/50" />

      <div className="relative z-10 w-full max-w-md mx-4 bg-gray-950 border border-gray-800 rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 id="confirm-dialog-title" className="text-lg font-semibold text-gray-100">
            {title}
          </h3>
        </div>

        <div className="px-6 py-4">
          {description && (
            <p id="confirm-dialog-desc" className="text-sm text-gray-300">
              {description}
            </p>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-2 rounded-md bg-gray-700 text-gray-100 hover:bg-gray-600 transition"
            >
              {cancelLabel}
            </button>

            <button
              ref={confirmBtnRef}
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={`px-4 py-2 rounded-md text-white ${isLoading ? 'bg-red-700 opacity-80 cursor-wait' : 'bg-red-600 hover:bg-red-500'} transition`}
            >
              {isLoading ? `${confirmLabel}...` : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
