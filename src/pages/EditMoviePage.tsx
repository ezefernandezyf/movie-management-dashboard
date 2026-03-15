import { useNavigate, useParams } from 'react-router-dom';
import { useMovie, useUpdateMovie } from '../hooks';
import { showError } from '../lib/toast';
import { MovieForm, type CreateMovieDto } from '../components';

export function EditMoviePage(): React.JSX.Element | null {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = params.id ? Number(params.id) : NaN;

  const { data: movie, isLoading, isError, error } = useMovie(id);

  const updateMutation = useUpdateMovie();

  const handleSubmit = async (payload: CreateMovieDto) => {
    try {
      await updateMutation.mutateAsync({ id, data: payload });
      navigate('/movies?updated=1');
    } catch (err) {
      const message = (err as Error)?.message ?? 'Error al actualizar película';
      showError(message);
    }
  };

  if (isLoading) {
    return <div className="text-gray-300">Cargando película...</div>;
  }

  if (isError || !movie) {
    return (
      <div className="text-red-400">
        Error: {(error as Error)?.message ?? 'No se pudo cargar la película'}
      </div>
    );
  }

  const defaultValues: Partial<CreateMovieDto> = {
    title: movie.title,
    description: movie.description ?? undefined,
    poster_path: movie.poster_path ?? undefined,
    genre: movie.genre ?? undefined,
    rating: typeof movie.rating === 'number' ? movie.rating : undefined,
    year: movie.year ?? undefined,
  };

  const isSubmitting = updateMutation.status === 'pending';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-100">Editar película</h1>
          <p className="text-sm text-gray-400">Modifica los datos y guarda los cambios</p>
        </div>
      </header>

      <main>
        <section className="bg-gray-950 border border-gray-800 rounded-lg p-6">
          <MovieForm
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/movies')}
            isSubmitting={isSubmitting}
            submitLabel="Guardar cambios"
          />
        </section>
      </main>
    </div>
  );
}
