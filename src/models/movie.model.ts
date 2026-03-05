export interface Movie {
  id: number;
  title: string;
  description?: string;
  genre?: string;
  year?: number;
  rating?: number;
  status?: string;
}

export type CreateMovieDto = Omit<Movie, 'id'>;
export type UpdateMovieDto = Partial<CreateMovieDto>;
