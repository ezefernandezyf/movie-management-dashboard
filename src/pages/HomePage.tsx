import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../models';
import { useMovies } from '../hooks';

export const HomePage = (): React.JSX.Element => {
    const navigate = useNavigate();

    const { data: movies, isLoading, isError, error } = useMovies();

    const stats = useMemo(() => {
        const list = movies ?? ([] as Movie[]);
        const total = list.length;
        const active = list.filter((m) => m.status === 'active').length;
        const archived = list.filter((m) => m.status === 'archived').length;
        const avgRating =
            list.length === 0 ? 0 : Number((list.reduce((s, m) => s + (m.rating ?? 0), 0) / list.length).toFixed(2));
        return { total, active, archived, avgRating };
    }, [movies]);

    const topRated = useMemo(() => {
        const list = (movies ?? []).slice().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        return list.slice(0, 4);
    }, [movies]);

    const recent = useMemo(() => {
        const list = (movies ?? []).slice();
        list.sort((a, b) => {
            const aId = typeof a.id === 'number' ? a.id : Number(a.id);
            const bId = typeof b.id === 'number' ? b.id : Number(b.id);
            return bId - aId;
        });
        return list.slice(0, 4);
    }, [movies]);

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-100">Dashboard</h1>
                    <p className="text-sm text-gray-400">Resumen rápido de tu catálogo</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/movies')}
                        className="px-3 py-2 rounded-md bg-gray-800 text-gray-100 border border-gray-700 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Ver catálogo
                    </button>

                    <button
                        onClick={() => navigate('/movies/new')}
                        className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Nueva película
                    </button>
                </div>
            </header>

            <section>
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="p-4 rounded-lg bg-gray-900 h-20 animate-pulse" />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-red-400">Error: {(error as Error)?.message ?? 'Unknown'}</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
                            <div className="text-sm text-gray-400">Total</div>
                            <div className="mt-2 text-2xl font-semibold text-gray-100">{stats.total}</div>
                        </div>

                        <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
                            <div className="text-sm text-gray-400">Activas</div>
                            <div className="mt-2 text-2xl font-semibold text-gray-100">{stats.active}</div>
                        </div>

                        <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
                            <div className="text-sm text-gray-400">Archivadas</div>
                            <div className="mt-2 text-2xl font-semibold text-gray-100">{stats.archived}</div>
                        </div>

                        <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
                            <div className="text-sm text-gray-400">Promedio rating</div>
                            <div className="mt-2 text-2xl font-semibold text-gray-100">{stats.avgRating}</div>
                        </div>
                    </div>
                )}
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-lg font-medium text-gray-100 mb-3">Top rated</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {topRated.length === 0 ? (
                            <div className="text-gray-400">No hay películas.</div>
                        ) : (
                            topRated.map((m) => (
                                <div key={String(m.id)} className="p-3 rounded-lg bg-gray-900 border border-gray-800">
                                    <div className="flex items-start gap-3">
                                        <div className="w-20 h-28 rounded-md overflow-hidden bg-gray-800 shrink-0">
                                            {m.poster_path ? (
                                                <img src={String(m.poster_path)} alt={`${m.title} poster`} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-500">No image</div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="text-sm font-semibold text-gray-100 truncate">{m.title}</h3>
                                                {typeof m.rating === 'number' && (
                                                    <span className="text-indigo-300 text-sm font-medium">{m.rating.toFixed(1)}</span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1 line-clamp-2">{m.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-medium text-gray-100 mb-3">Recientes</h2>
                    <div className="space-y-4">
                        {recent.length === 0 ? (
                            <div className="text-gray-400">No hay películas.</div>
                        ) : (
                            recent.map((m) => (
                                <div key={String(m.id)} className="p-3 rounded-lg bg-gray-900 border border-gray-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-16 h-20 rounded-md overflow-hidden bg-gray-800 shrink-0">
                                            {m.poster_path ? (
                                                <img src={String(m.poster_path)} alt={`${m.title} poster`} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-500">No image</div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-semibold text-gray-100 truncate">{m.title}</h3>
                                            <p className="text-xs text-gray-400">{m.year ?? (m as unknown as { releaseDate?: string }).releaseDate}</p>
                                        </div>

                                        <div>
                                            <button
                                                onClick={() => navigate(`/movies/${String(m.id)}`)}
                                                className="px-3 py-1 rounded-md bg-transparent border border-gray-700 text-indigo-200 hover:bg-indigo-700/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            >
                                                Ver
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};
