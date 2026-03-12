import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { Movie } from '../models';
import { useMovies, useDeleteMovie } from '../hooks';
import { showSuccess, showError } from '../lib/toast';
import { MovieCard } from '../components';

export function MoviesPage(): React.JSX.Element {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Query params
    const qParam = searchParams.get('q') ?? undefined;
    const pageParam = Number(searchParams.get('page') ?? 1);
    const limitParam = Number(searchParams.get('limit') ?? 12);

    const [searchInput, setSearchInput] = useState<string>(qParam ?? '');
    const [deletingId, setDeletingId] = useState<number | string | null>(null);

    // Fetch movies with your hook
    const { data: movies, isLoading, isError, error, refetch } = useMovies({
        q: qParam,
        page: pageParam,
        limit: limitParam,
    });

    // Delete mutation: centraliza toasts y refetch
    const deleteMutation = useDeleteMovie({
        onSuccess: () => {
            showSuccess('Película eliminada');
            void refetch();
        },
        onError: (err: unknown) => {
            const message = (err as Error)?.message ?? 'Error eliminando';
            showError(message);
        },
    });

    const handleSearchSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        const q = searchInput.trim();
        const params: Record<string, string> = {};
        if (q) params.q = q;
        params.page = '1';
        setSearchParams(params);
    };

    const handleClearSearch = () => {
        setSearchInput('');
        setSearchParams({ page: '1' });
    };

    const handleDelete = async (id: number | string) => {
        const ok = window.confirm('¿Eliminar esta película? Esta acción no se puede deshacer.');
        if (!ok) return;
        try {
            setDeletingId(id);
            await deleteMutation.mutateAsync(id);
        } catch (err) {
            // onError del hook ya muestra toast; dejamos debug mínimo
            // console.debug('[delete error]', err);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div>
            {/* Header */}
            <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-semibold text-gray-100">Películas</h1>

                <div className="w-full sm:w-auto flex flex-col sm:flex-row sm:items-center gap-3">
                    <form onSubmit={handleSearchSubmit} className="flex w-full sm:w-auto items-center gap-2">
                        <input
                            aria-label="Buscar películas"
                            className="w-full sm:w-64 px-3 py-2 rounded bg-gray-800 placeholder-gray-400 text-sm text-gray-100"
                            placeholder="Buscar por título..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="px-3 py-2 bg-indigo-600 rounded text-sm text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        >
                            Buscar
                        </button>
                        <button
                            type="button"
                            onClick={handleClearSearch}
                            className="px-3 py-2 bg-gray-700 rounded text-sm text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                        >
                            Limpiar
                        </button>
                    </form>

                    <button
                        onClick={() => navigate('/movies/new')}
                        className="w-full sm:w-auto px-4 py-2 bg-green-600 rounded text-sm text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        aria-label="Crear nueva película"
                    >
                        Nueva película
                    </button>
                </div>
            </header>

            {/* Content */}
            <section>
                {isLoading && <div className="text-gray-300">Cargando películas...</div>}
                {isError && <div className="text-red-400">Error: {(error as Error)?.message ?? 'Unknown'}</div>}

                {/* Si movies es undefined o no es un array, mostramos mensaje */}
                {!isLoading && (!movies || !Array.isArray(movies) || movies.length === 0) && (
                    <div className="text-gray-300">No hay películas.</div>
                )}

                {/* Grid: auto-rows-fr + li.h-full => cards de igual altura */}
                {Array.isArray(movies) && movies.length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
                        {movies.map((m: Movie) => {
                            const idStr = String(m.id);
                            return (
                                <li key={idStr} className="h-full">
                                    <MovieCard
                                        movie={m}
                                        onEdit={() => navigate(`/movies/${idStr}/edit`)}
                                        onDelete={(id) => void handleDelete(id)}
                                        isDeleting={deletingId !== null && String(deletingId) === idStr}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>
        </div>
    );
}
