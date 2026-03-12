import type { Movie } from "../../models";
import { EmptyState, ErrorMessage, LoadingSpinner } from "../helpers";
import { MovieCard } from "../MovieCard/MovieCard";


type Props = {
    movies?: Movie[] | null;
    isLoading?: boolean;
    isError?: boolean | string | Error | null;
    onEdit?: (movie: Movie) => void;
    onDelete?: (id: number | string) => void;
    onRetry?: () => void;
    onCreate?: () => void;
};

export const MovieList = ({
    movies,
    isLoading = false,
    isError = false,
    onEdit,
    onDelete,
    onRetry,
    onCreate,
}: Props): React.JSX.Element => {
    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center py-12">
                <LoadingSpinner size="lg" label="Cargando películas..." />
            </div>
        );
    }

    if (isError) {
        const errorMessage = typeof isError === 'string' ? isError : (isError as Error | null)?.message ?? undefined;
        return (
            <div className="w-full py-8">
                <ErrorMessage error={errorMessage} onRetry={onRetry} />
            </div>
        );
    }

    const list = movies ?? [];

    if (list.length === 0) {
        return (
            <div className="w-full py-8">
                <EmptyState
                    title="No hay películas"
                    description="Agregar nuevas películas para verlas listadas aquí."
                    ctaLabel="Agregar película"
                    onCta={onCreate}
                />
            </div>
        );
    }

    return (
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {list.map((m) => (
                    <MovieCard key={String(m.id)} movie={m} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </div>
        </section>
    );
}
