import { supabase } from '../lib/supabase';
import type {
  MovieDbRow,
  CreateMovieDto,
  UpdateMovieDto,
  MovieQueryParams,
  Movie,
} from '../models';

export function mapDbRowToMovie(row: MovieDbRow): Movie {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    poster_path: row.poster_path ?? '',
    genre: row.genre,
    rating:
      typeof row.rating === 'number' ? row.rating : row.rating ? Number(row.rating) : undefined,
    year: row.year,
    status: row.status ?? 'active',
    owner_id: row.owner_id ?? undefined,
    created_at: row.created_at,
    updated_at: row.updated_at,
  } as Movie;
}

export const getMovies = async (params?: MovieQueryParams) => {
  let query = supabase.from('movies').select('*');

  if (params?.q) {
    query = query.ilike('title', `%${params.q}%`);
  }
  if (params?.genre) {
    query = query.eq('genre', params.genre);
  }
  if (params?.status) {
    query = query.eq('status', params.status);
  }

  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(mapDbRowToMovie);
};

export const getMovieById = async (id: number | string) => {
  if (!id) throw new Error("getMovieById: 'id' is required");
  const { data, error } = await supabase.from('movies').select('*').eq('id', id).single();
  if (error) throw error;
  return mapDbRowToMovie(data);
};

export const createMovie = async (payload: CreateMovieDto, ownerId: string) => {
  const dbRow = { ...payload, owner_id: ownerId };
  const { data, error } = await supabase.from('movies').insert([dbRow]).select().single();
  if (error) throw error;
  return mapDbRowToMovie(data);
};

export const updateMovie = async (
  id: number | string,
  payload: UpdateMovieDto,
  ownerId: string,
) => {
  if (!id) throw new Error("updateMovie: 'id' is required");
  const { data, error } = await supabase
    .from('movies')
    .update({ ...payload })
    .eq('id', id)
    .eq('owner_id', ownerId)
    .select()
    .single();
  if (error) throw error;
  return mapDbRowToMovie(data);
};

export const deleteMovie = async (id: number | string, ownerId: string) => {
  if (!id) throw new Error("deleteMovie: 'id' is required");
  const { data, error } = await supabase
    .from('movies')
    .delete()
    .eq('id', id)
    .eq('owner_id', ownerId)
    .select()
    .single();
  if (error) throw error;
  return data;
};
