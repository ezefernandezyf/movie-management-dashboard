import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateMovie } from '../hooks';
import { showError } from '../lib/toast';
import { MovieForm, type CreateMovieDto } from '../components';

export const NewMoviePage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const createMutation = useCreateMovie();

  const handleSubmit = async (payload: CreateMovieDto) => {
    try {
      await createMutation.mutateAsync(payload);
      navigate('/movies?created=1');
    } catch (err) {
      const message = (err as Error)?.message ?? 'Error al crear película';
      showError(message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-100">Nueva película</h1>
          <p className="text-sm text-gray-400">
            Completa el formulario para agregar una película al catálogo
          </p>
        </div>
      </header>

      <main>
        <section className="bg-gray-950 border border-gray-800 rounded-lg p-6">
          <MovieForm
            defaultValues={undefined}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/movies')}
            isSubmitting={createMutation.isLoading}
            submitLabel="Crear película"
          />
        </section>
      </main>
    </div>
  );
};
