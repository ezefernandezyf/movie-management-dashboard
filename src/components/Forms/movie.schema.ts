import { z } from 'zod';

export const movieBaseSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  description: z.string().optional(),
  posterPath: z.url().optional(),
  genres: z.array(z.string()).optional(),
  rating: z.number().min(0, 'Rating mínimo 0').max(10, 'Rating máximo 10').optional(),
  releaseDate: z.string().optional(),
});

export const createMovieSchema = movieBaseSchema;
export type CreateMovieDto = z.infer<typeof createMovieSchema>;

export const updateMovieSchema = movieBaseSchema.partial();
export type UpdateMovieDto = z.infer<typeof updateMovieSchema>;

export const movieSchema = movieBaseSchema.extend({
  id: z.union([z.string(), z.number()]),
});
export type Movie = z.infer<typeof movieSchema>;
