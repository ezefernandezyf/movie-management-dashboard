import React from 'react';
import type { Movie } from '../../models';

interface Props {
    movie: Movie;
    onEdit?: (movie: Movie) => void;
    onDelete?: (id: number | string) => void;
    isDeleting?: boolean;
}

export const MovieCard = ({ movie, onEdit, onDelete, isDeleting }: Props): React.JSX.Element => {
    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit?.(movie);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete?.(movie.id);
    };

    const genreText = movie.genre ?? '—';

    return (
        <article className="h-full flex flex-col rounded-xl border border-gray-800 bg-gray-900 p-4 shadow-sm transition-transform hover:-translate-y-0.5">
            <div className="w-full rounded-md overflow-hidden bg-gray-800 flex items-center justify-center h-64">
                {movie.poster_path ? (
                    <img
                        src={String(movie.poster_path)}
                        alt={`${movie.title} poster`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="text-gray-500">Sin imagen</div>
                )}
            </div>

            <div className="flex-1 flex flex-col mt-4 min-h-0">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-gray-100 truncate">{movie.title}</h3>
                        <div className="text-xs text-gray-400 mt-1">
                            {genreText} • {movie.year ?? '—'}
                        </div>
                    </div>

                    {typeof movie.rating === 'number' && (
                        <div className="shrink-0 ml-2">
                            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-800 border border-gray-700 text-indigo-300 text-sm font-medium shadow-sm">
                                {movie.rating.toFixed(1)}
                            </span>
                        </div>
                    )}
                </div>

                <p className="mt-3 text-sm text-gray-300 line-clamp-3 overflow-hidden">
                    {movie.description}
                </p>

                <div className="mt-4 flex gap-2">
                    <button
                        type="button"
                        onClick={handleEdit}
                        aria-label={`Editar ${movie.title}`}
                        className="flex-1 px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 border border-indigo-500 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:scale-95 transition cursor-pointer"
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        aria-label={`Eliminar ${movie.title}`}
                        disabled={isDeleting}
                        className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition ${isDeleting
                                ? 'bg-red-700 text-white border border-red-700 opacity-70 cursor-wait'
                                : 'bg-transparent text-red-300 border border-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-95 cursor-pointer'
                            }`}
                    >
                        {isDeleting ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            </div>
        </article>
    );
};
