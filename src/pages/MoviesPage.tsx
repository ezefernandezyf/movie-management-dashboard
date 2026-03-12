import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { Movie } from '../models';
import { useMovies, useDeleteMovie } from '../hooks';
import { FiltersPanel, type Filters } from '../components/FiltersPanel/FiltersPanel';
import { showSuccess, showError } from '../lib/toast';
import { MovieCard, ConfirmDialog } from '../components';

export function MoviesPage(): React.JSX.Element {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const qParam = searchParams.get('q') ?? undefined;
    const pageParam = Number(searchParams.get('page') ?? 1);
    const limitParam = Number(searchParams.get('limit') ?? 12);

    const genresParam = searchParams.get('genres') ?? undefined;
    const ratingMinParam = searchParams.get('ratingMin') ?? undefined;
    const ratingMaxParam = searchParams.get('ratingMax') ?? undefined;
    const yearParam = searchParams.get('year') ?? undefined;

    const [searchInput, setSearchInput] = useState<string>(qParam ?? '');
    const [deletingId, setDeletingId] = useState<number | string | null>(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmTargetId, setConfirmTargetId] = useState<number | string | null>(null);
    const [confirmTitle, setConfirmTitle] = useState<string | undefined>(undefined);
    const [confirmLoading, setConfirmLoading] = useState(false);

    useEffect(() => {
        setSearchInput(qParam ?? '');
    }, [qParam]);

    const { data: movies, isLoading, isError, error, refetch } = useMovies({
        q: qParam,
        page: pageParam,
        limit: limitParam,
    });

    const availableGenres = useMemo(() => {
        const set = new Set<string>();
        (movies ?? []).forEach((m) => {
            if (m.genre) set.add(m.genre);
            const maybeGenres = (m as unknown as { genres?: string[] }).genres;
            if (Array.isArray(maybeGenres)) maybeGenres.forEach((g) => set.add(g));
        });
        return Array.from(set).sort();
    }, [movies]);

    const filtersInitial: Filters = useMemo(() => {
        const f: Filters = {};
        if (genresParam) {
            f.genres = genresParam.split(',').filter(Boolean);
        }
        if (ratingMinParam || ratingMaxParam) {
            f.rating = {
                min: ratingMinParam ? Number(ratingMinParam) : undefined,
                max: ratingMaxParam ? Number(ratingMaxParam) : undefined,
            };
        }
        if (yearParam) {
            f.year = yearParam;
        }
        return f;
    }, [genresParam, ratingMinParam, ratingMaxParam, yearParam]);

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
        const params = new URLSearchParams();
        if (q) params.set('q', q);
        params.set('page', '1');
        setSearchParams(params);
    };

    const handleClearSearch = () => {
        setSearchInput('');
        const params = new URLSearchParams();
        params.set('page', '1');
        setSearchParams(params);
    };

    const handleFiltersApply = (f: Filters) => {
        const params = new URLSearchParams();
        if (qParam) params.set('q', qParam);
        params.set('page', '1');

        if (f.genres && f.genres.length > 0) params.set('genres', f.genres.join(','));
        if (f.rating?.min !== undefined) params.set('ratingMin', String(f.rating.min));
        if (f.rating?.max !== undefined) params.set('ratingMax', String(f.rating.max));
        if (f.year) params.set('year', String(f.year));

        setSearchParams(params);
    };

    const handleFiltersReset = () => {
        const params = new URLSearchParams();
        if (qParam) params.set('q', qParam);
        params.set('page', '1');
        setSearchParams(params);
    };

    const openConfirm = (id: number | string, title?: string) => {
        setConfirmTargetId(id);
        setConfirmTitle(title);
        setConfirmOpen(true);
    };

    const closeConfirm = () => {
        setConfirmOpen(false);
        setConfirmTargetId(null);
        setConfirmTitle(undefined);
        setConfirmLoading(false);
    };

    const handleConfirmDelete = async () => {
        if (confirmTargetId == null) return;
        try {
            setConfirmLoading(true);
            setDeletingId(confirmTargetId);
            await deleteMutation.mutateAsync(confirmTargetId);
        } catch {
        } finally {
            setConfirmLoading(false);
            setDeletingId(null);
            closeConfirm();
        }
    };

    const displayedMovies = useMemo(() => {
        const all = movies ?? [];
        const genreFilter = genresParam ? genresParam.split(',').filter(Boolean) : undefined;
        const ratingMin = ratingMinParam ? Number(ratingMinParam) : undefined;
        const ratingMax = ratingMaxParam ? Number(ratingMaxParam) : undefined;
        const yearFilter = yearParam ? String(yearParam) : undefined;
        const qFilter = qParam ? qParam.trim().toLowerCase() : undefined;

        return all.filter((m) => {
            if (qFilter) {
                const title = (m.title ?? '').toLowerCase();
                const desc = (m.description ?? '').toLowerCase();
                const genre = (m.genre ?? '').toLowerCase();
                const genresArr = Array.isArray((m as unknown as { genres?: string[] }).genres)
                    ? ((m as unknown as { genres?: string[] }).genres ?? []).join(' ').toLowerCase()
                    : '';
                const foundInText =
                    title.includes(qFilter) || desc.includes(qFilter) || genre.includes(qFilter) || genresArr.includes(qFilter);
                if (!foundInText) return false;
            }

            if (genreFilter && genreFilter.length > 0) {
                const movieGenres = (m as unknown as { genres?: string[] }).genres;
                if (Array.isArray(movieGenres)) {
                    if (!movieGenres.some((g) => genreFilter.includes(g))) return false;
                } else {
                    if (!m.genre || !genreFilter.includes(m.genre)) return false;
                }
            }

            if (ratingMin !== undefined && (m.rating ?? 0) < ratingMin) return false;
            if (ratingMax !== undefined && (m.rating ?? 0) > ratingMax) return false;

            if (yearFilter) {
                const my = m.year ? String(m.year) : (m as unknown as { releaseDate?: string }).releaseDate ?? '';
                if (!my.startsWith(yearFilter)) return false;
            }

            return true;
        });
    }, [movies, genresParam, ratingMinParam, ratingMaxParam, yearParam, qParam]);

    return (
        <div>
            <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-semibold text-gray-100">Películas</h1>

                <div className="w-full sm:w-auto flex gap-3">
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
                        className="px-4 py-2 bg-green-600 rounded text-sm text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        aria-label="Crear nueva película"
                    >
                        Nueva película
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
                <div className="order-1 md:order-1">
                    <FiltersPanel
                        availableGenres={availableGenres}
                        initial={filtersInitial}
                        onApply={handleFiltersApply}
                        onReset={handleFiltersReset}
                    />
                </div>

                <div className="order-2 md:order-2">
                    {isLoading && <div className="text-gray-300">Cargando películas...</div>}
                    {isError && <div className="text-red-400">Error: {(error as Error)?.message ?? 'Unknown'}</div>}

                    {!isLoading && displayedMovies.length === 0 && (
                        <div className="text-gray-300">No hay películas que coincidan con los filtros.</div>
                    )}

                    {displayedMovies.length > 0 && (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
                            {displayedMovies.map((m: Movie) => {
                                const idStr = String(m.id);
                                return (
                                    <li key={idStr} className="h-full">
                                        <MovieCard
                                            movie={m}
                                            onEdit={() => navigate(`/movies/${idStr}/edit`)}
                                            onDelete={(id) => openConfirm(id, m.title)}
                                            isDeleting={deletingId !== null && String(deletingId) === idStr}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>

            <ConfirmDialog
                open={confirmOpen}
                title={confirmTitle ?? 'Eliminar película'}
                description="¿Estás seguro? Esta acción no se puede deshacer."
                onConfirm={handleConfirmDelete}
                onCancel={closeConfirm}
                isLoading={confirmLoading}
                confirmLabel="Eliminar"
                cancelLabel="Cancelar"
            />
        </div>
    );
}
