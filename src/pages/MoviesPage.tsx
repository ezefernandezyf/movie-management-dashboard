import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useMovies, useDeleteMovie } from '../hooks';
import { showSuccess, showError } from '../lib/toast';
import type { Movie } from '../models';

export function MoviesPage(): React.JSX.Element {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Query params
    const qParam = searchParams.get('q') ?? undefined;
    const pageParam = Number(searchParams.get('page') ?? 1);
    const limitParam = Number(searchParams.get('limit') ?? 10);

    const [searchInput, setSearchInput] = useState<string>(qParam ?? '');

    // Fetch movies with your hook
    const { data: movies, isLoading, isError, error, refetch } = useMovies({
        q: qParam,
        page: pageParam,
        limit: limitParam,
    });

    // Delete mutation
    const deleteMutation = useDeleteMovie({
        onSuccess: () => {
            showSuccess('Película eliminada');
            // refetch explícito por si hace falta
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
            await deleteMutation.mutateAsync(id);
        } catch (err) {
            console.debug('[delete error]', err);
        }
    };

    return (
        <div>
            <header className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Películas</h1>

                <div className="flex items-center gap-3">
                    <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                        <input
                            aria-label="Buscar películas"
                            className="px-3 py-1 rounded bg-gray-800"
                            placeholder="Buscar por título..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button type="submit" className="px-3 py-1 bg-indigo-600 rounded">
                            Buscar
                        </button>
                        <button type="button" onClick={handleClearSearch} className="px-3 py-1 bg-gray-700 rounded">
                            Limpiar
                        </button>
                    </form>

                    <button
                        onClick={() => navigate('/movies/new')}
                        className="px-4 py-2 bg-green-600 rounded text-sm"
                        aria-label="Crear nueva película"
                    >
                        Nueva película
                    </button>
                </div>
            </header>

            <section>
                {isLoading && <div>Loading...</div>}
                {isError && <div className="text-red-400">Error: {(error as Error)?.message ?? 'Unknown'}</div>}

                {/* Si movies es undefined o no es un array, mostramos mensaje */}
                {!isLoading && (!movies || !Array.isArray(movies) || movies.length === 0) && (
                    <div>No hay películas.</div>
                )}

                {/* Renderizar solo si movies es array */}
                {Array.isArray(movies) && movies.length > 0 && (
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {movies.map((m: Movie) => {
                            const idStr = String((m as unknown as { id: number | string }).id);
                            return (
                                <li key={idStr} className="card">
                                    <div className="flex items-start gap-4">
                                        {m.posterPath ? (
                                            <img src={m.posterPath} alt={m.title} className="w-24 h-32 object-cover rounded" />
                                        ) : (
                                            <div className="w-24 h-32 bg-gray-700 rounded flex items-center justify-center text-sm">
                                                no image
                                            </div>
                                        )}

                                        <div className="flex-1">
                                            <h2 className="font-semibold text-lg">{m.title}</h2>
                                            <p className="text-sm text-gray-400">
                                                {m.genre ?? '—'} • {m.year ?? '—'}
                                            </p>
                                            <p className="mt-2 text-sm text-gray-300 line-clamp-3">{m.description}</p>

                                            <div className="mt-4 flex items-center gap-2">
                                                <button
                                                    onClick={() => navigate(`/movies/${idStr}`)}
                                                    className="px-2 py-1 bg-indigo-600 rounded text-sm"
                                                >
                                                    Ver
                                                </button>

                                                <button
                                                    onClick={() => navigate(`/movies/${idStr}/edit`)}
                                                    className="px-2 py-1 bg-yellow-600 rounded text-sm"
                                                >
                                                    Editar
                                                </button>

                                                <button onClick={() => handleDelete(m.id)} className="px-2 py-1 bg-red-600 rounded text-sm">
                                                    Borrar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>
        </div>
    );
}

export default MoviesPage;