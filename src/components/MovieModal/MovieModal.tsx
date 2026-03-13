import { useEffect, useRef, useState } from 'react';
import { MovieForm } from '../Forms/MovieForm';
import type { Movie } from '../Forms/movie.schema';
import type { CreateMovieDto } from '../Forms/movie.schema';

type Props = {
    open: boolean;
    onClose: () => void;
    movie?: Movie;
    onSaved?: (data: CreateMovieDto) => Promise<void> | void;
};

export function MovieModal({ open, onClose, movie, onSaved }: Props): React.JSX.Element | null {
    const [isSaving, setIsSaving] = useState(false);
    const dialogRef = useRef<HTMLDivElement | null>(null);
    const firstInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                firstInputRef.current?.focus();
            }, 50);
        }
    }, [open]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) {
                onClose();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open) return null;

    const defaultValues: Partial<CreateMovieDto> | undefined = movie
        ? {
            title: movie.title,
            description: movie.description ?? undefined,
            posterPath: movie.posterPath ?? undefined,
            genre: movie.genre ?? undefined,
            rating: typeof movie.rating === 'number' ? movie.rating : undefined,
            year: movie.year ?? undefined,
        }
        : undefined;

    const handleSubmit = async (data: CreateMovieDto) => {
        try {
            setIsSaving(true);
            await onSaved?.(data);
            onClose();
        } finally {
            setIsSaving(false);
        }
    };

    const onOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="movie-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={onOverlayClick}
        >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

            <div
                ref={dialogRef}
                className="relative z-10 w-full max-w-2xl mx-4 bg-gray-950 border border-gray-800 rounded-lg shadow-lg"
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                    <h3 id="movie-modal-title" className="text-lg font-semibold text-gray-100">
                        {movie ? 'Editar película' : 'Nueva película'}
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Cerrar"
                        className="p-2 rounded-md text-gray-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <div className="px-6 py-6">
                    <MovieForm
                        defaultValues={defaultValues}
                        onSubmit={handleSubmit}
                        isSubmitting={isSaving}
                        submitLabel={isSaving ? 'Guardando...' : 'Guardar'}
                        onCancel={onClose}
                    />
                </div>
            </div>
        </div>
    );
}
