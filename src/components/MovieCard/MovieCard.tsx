import type { Movie } from '../Forms/movie.schema';

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

    return (
        <article className="card flex gap-4 items-start">
            <div className="w-24 h-36 shrink rounded-md overflow-hidden bg-gray-800 border border-gray-700">
                {movie.posterPath ? (
                    <img src={String(movie.posterPath)} alt={`${movie.title} poster`} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <rect width="24" height="24" rx="4" fill="#111827" />
                            <path d="M7 12h10" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-100 truncate">{movie.title}</h3>
                        {movie.releaseDate && (
                            <p className="text-xs text-gray-400 mt-1">Estreno: {movie.releaseDate}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {typeof movie.rating === 'number' && (
                            <span className="text-xs inline-flex items-center px-2 py-1 rounded-full bg-gray-800 border border-gray-700 text-indigo-300">
                                {movie.rating.toFixed(1)}
                            </span>
                        )}
                    </div>
                </div>

                {movie.genres && movie.genres.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {movie.genres.map((g) => (
                            <span key={g} className="text-xs text-gray-300 bg-gray-800 px-2 py-1 rounded">
                                {g}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-4 flex items-center gap-2">
                    <button
                        type="button"
                        aria-label={`Editar ${movie.title}`}
                        onClick={handleEdit}
                        className="px-3 py-1 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-500 transition"
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        aria-label={`Eliminar ${movie.title}`}
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className={`px-3 py-1 rounded-md text-sm text-white ${isDeleting ? 'bg-red-700 opacity-70 cursor-wait' : 'bg-red-600 hover:bg-red-500'} transition`}
                    >
                        {isDeleting ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </div>
            </div>
        </article>
    );
}
