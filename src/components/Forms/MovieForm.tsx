import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CreateMovieDto } from './movie.schema';

function isValidUrl(value: string): boolean {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
}

const formSchema = z.object({
    title: z.string().min(1, 'El título es obligatorio'),
    description: z.string().optional(),
    posterPath: z
        .string()
        .optional()
        .refine((v) => !v || isValidUrl(v), 'Debe ser una URL válida'),
    genres: z.string().optional(), 
    rating: z
        .string()
        .optional()
        .refine((v) => !v || (!Number.isNaN(Number(v)) && Number(v) >= 0 && Number(v) <= 10), 'Puntuación debe ser un número entre 0 y 10'),
    releaseDate: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface MovieFormProps {
    defaultValues?: Partial<CreateMovieDto>;
    onSubmit: (data: CreateMovieDto) => Promise<void> | void;
    onCancel?: () => void;
    isSubmitting?: boolean;
    submitLabel?: string;
}

export function MovieForm({
    defaultValues,
    onSubmit,
    onCancel,
    isSubmitting = false,
    submitLabel = 'Guardar',
}: MovieFormProps): React.JSX.Element {
    const initialValues: FormValues = {
        title: defaultValues?.title ?? '',
        description: defaultValues?.description ?? '',
        posterPath: defaultValues?.posterPath ?? '',
        genres: defaultValues?.genres ? defaultValues.genres.join(', ') : '',
        rating: defaultValues?.rating !== undefined ? String(defaultValues.rating) : '',
        releaseDate: defaultValues?.releaseDate ?? '',
    };

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    });

    const submitHandler = (values: FormValues) => {
        const genresArray =
            values.genres && values.genres.trim().length > 0
                ? values.genres
                    .split(',')
                    .map((g) => g.trim())
                    .filter((g) => g.length > 0)
                : undefined;

        const ratingValue =
            values.rating && values.rating.toString().trim().length > 0 ? Number(values.rating) : undefined;

        const payload: CreateMovieDto = {
            title: values.title,
            description: values.description ? values.description : undefined,
            posterPath: values.posterPath ? values.posterPath : undefined,
            genres: genresArray,
            rating: ratingValue,
            releaseDate: values.releaseDate ? values.releaseDate : undefined,
        };

        return onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4" noValidate>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-200">
                    Título
                </label>
                <input
                    id="title"
                    {...register('title')}
                    className="mt-1 block w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-200">
                    Descripción
                </label>
                <textarea
                    id="description"
                    {...register('description')}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="posterPath" className="block text-sm font-medium text-gray-200">
                        Poster URL
                    </label>
                    <input
                        id="posterPath"
                        {...register('posterPath')}
                        placeholder="https://..."
                        className="mt-1 block w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    {errors.posterPath && <p className="mt-1 text-xs text-red-400">{errors.posterPath.message}</p>}
                </div>

                <div>
                    <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-200">
                        Fecha de estreno
                    </label>
                    <Controller
                        control={control}
                        name="releaseDate"
                        render={({ field }) => (
                            <input
                                {...field}
                                id="releaseDate"
                                type="date"
                                className="mt-1 block w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        )}
                    />
                    {errors.releaseDate && <p className="mt-1 text-xs text-red-400">{errors.releaseDate.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="genres" className="block text-sm font-medium text-gray-200">
                        Géneros (separados por coma)
                    </label>
                    <Controller
                        control={control}
                        name="genres"
                        render={({ field }) => (
                            <input
                                {...field}
                                id="genres"
                                placeholder="Drama, Acción"
                                className="mt-1 block w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        )}
                    />
                    {errors.genres && <p className="mt-1 text-xs text-red-400">Formato de géneros inválido</p>}
                </div>

                <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-200">
                        Puntuación (0-10)
                    </label>
                    <Controller
                        control={control}
                        name="rating"
                        render={({ field }) => (
                            <input
                                {...field}
                                id="rating"
                                type="number"
                                step="0.1"
                                min={0}
                                max={10}
                                placeholder="7.5"
                                className="mt-1 block w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        )}
                    />
                    {errors.rating && <p className="mt-1 text-xs text-red-400">{errors.rating.message}</p>}
                </div>
            </div>

            <div className="flex items-center justify-end gap-3">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-3 py-2 rounded-md text-sm bg-gray-700 text-gray-100 hover:bg-gray-600 transition"
                    >
                        Cancelar
                    </button>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-md text-sm text-white ${isSubmitting ? 'bg-indigo-700 opacity-80 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-500'} transition`}
                >
                    {isSubmitting ? 'Guardando...' : submitLabel}
                </button>
            </div>
        </form>
    );
}