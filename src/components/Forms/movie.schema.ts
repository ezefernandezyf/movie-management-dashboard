import { z } from 'zod';

export const movieBaseSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  description: z.string().optional(),
  poster_path: z.url().optional(),
  genre: z.string().optional(),
  year: z.number().int().optional(),
  rating: z.number().min(0, 'Rating mínimo 0').max(10, 'Rating máximo 10').optional(),
  status: z.enum(['active', 'archived']).optional(),
});

export const createMovieSchema = movieBaseSchema;
export type CreateMovieDto = z.infer<typeof createMovieSchema>;

export const updateMovieSchema = movieBaseSchema.partial();
export type UpdateMovieDto = z.infer<typeof updateMovieSchema>;

export const movieSchema = movieBaseSchema.extend({
  id: z.union([z.string(), z.number()]),
});
export type Movie = z.infer<typeof movieSchema>;
