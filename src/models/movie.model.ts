export interface Movie {
  id: number;
  title: string;
  description?: string;
  poster_path?: string;
  genre?: string;
  year?: number;
  rating?: number;
  status?: string;
}

export interface MovieDbRow {
  id: number;
  title: string;
  description?: string;
  poster_path?: string;
  genre?: string;
  year?: number;
  rating?: number;
  status?: string;
  owner_id?: string;
  created_at?: string;
  updated_at?: string;
}

export type CreateMovieDto = Omit<Movie, 'id'>;
export type UpdateMovieDto = Partial<CreateMovieDto>;

export interface MovieQueryParams {
  page?: number;
  limit?: number;
  q?: string;
  genre?: string;
  year?: number;
  status?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export type Paginated<T> = { data: T; total: number };
