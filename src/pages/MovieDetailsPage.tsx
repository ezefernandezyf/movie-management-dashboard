import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMovie, useDeleteMovie } from '../hooks';
import { ConfirmDialog } from '../components/ConfirmDialog/ConfirmDialog';
import { showSuccess, showError } from '../lib/toast';

export const MovieDetailsPage = (): React.JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const movieId = id ?? '';

    const { data: movie, isLoading, isError, error, refetch } = useMovie(movieId);
    const deleteMutation = useDeleteMovie({
        onSuccess: () => {
            showSuccess('Película eliminada');
            void refetch?.();
            navigate('/movies');
        },
        onError: (err: unknown) => {
            const message = (err as Error)?.message ?? 'Error eliminando';
            showError(message);
        },
    });

    useEffect(() => {
        if (!id) {
            navigate('/movies');
        }
    }, [id, navigate]);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const openConfirm = () => setConfirmOpen(true);
    const closeConfirm = () => setConfirmOpen(false);

    const handleConfirmDelete = async () => {
        if (!movie?.id) return;
        try {
            setConfirmLoading(true);
            await deleteMutation.mutateAsync(movie.id);
        } catch (err) {
            console.error('delete error', err);
        } finally {
            setConfirmLoading(false);
            closeConfirm();
        }
    };

    const genresText = useMemo(() => {
        if (!movie) return '';
        const maybeGenres = (movie as unknown as { genres?: string[] }).genres;
        if (Array.isArray(maybeGenres)) {
            return (maybeGenres ?? []).join(', ');
        }
        return (movie.genre ?? '') as string;
    }, [movie]);

    if (!id) return <></>;

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-100">Detalle de película</h1>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/movies')}
                        className="px-3 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-700 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Volver
                    </button>
                    <button
                        onClick={() => navigate(`/movies/${id}/edit`)}
                        className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Editar
                    </button>
                    <button
                        onClick={openConfirm}
                        className="px-3 py-2 rounded-md bg-transparent border border-red-600 text-red-300 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Eliminar
                    </button>
                </div>
            </header>

            <main>
                {isLoading && <div className="text-gray-300">Cargando...</div>}
                {isError && <div className="text-red-400">Error: {(error as Error)?.message ?? 'Unknown'}</div>}

                {!isLoading && movie && (
                    <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
                        <div>
                            <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
                                <div className="w-full rounded-md overflow-hidden bg-gray-800 mb-4 h-105">
                                    {movie.posterPath ? (
                                        <img src={String(movie.posterPath)} alt={`${movie.title} poster`} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500">No image</div>
                                    )}
                                </div>

                                <div className="text-sm text-gray-400 mt-2">
                                    <div className="font-semibold text-gray-100 text-lg">{movie.title}</div>
                                    <div className="mt-1">
                                        {genresText} • {movie.year ?? (movie as unknown as { releaseDate?: string }).releaseDate ?? '—'}
                                    </div>
                                    {typeof movie.rating === 'number' && (
                                        <div className="mt-3">
                                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 border border-gray-700 text-indigo-300 text-sm font-medium shadow-sm">
                                                {movie.rating.toFixed(1)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <section className="rounded-lg border border-gray-800 bg-gray-900 p-6">
                                <h2 className="text-lg font-semibold text-gray-100 mb-2">{movie.title}</h2>
                                <p className="text-sm text-gray-300 mb-4">{movie.description}</p>

                                <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-400">
                                    <div>
                                        <dt className="font-medium text-gray-200">Género</dt>
                                        <dd>{genresText || '—'}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium text-gray-200">Año</dt>
                                        <dd>{movie.year ?? '—'}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium text-gray-200">Rating</dt>
                                        <dd>{typeof movie.rating === 'number' ? movie.rating.toFixed(1) : '—'}</dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium text-gray-200">Estado</dt>
                                        <dd>{movie.status ?? '—'}</dd>
                                    </div>
                                </dl>
                            </section>
                        </div>
                    </div>
                )}
            </main>

            <ConfirmDialog
                open={confirmOpen}
                title="Eliminar película"
                description="¿Estás seguro? Esta acción no se puede deshacer."
                onConfirm={handleConfirmDelete}
                onCancel={closeConfirm}
                isLoading={confirmLoading}
                confirmLabel="Eliminar"
                cancelLabel="Cancelar"
            />
        </div>
    );
};
