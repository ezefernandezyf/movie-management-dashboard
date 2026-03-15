import { useEffect, useState } from 'react';

export type Filters = {
  genres?: string[] | undefined;
  rating?: { min?: number; max?: number } | undefined;
  year?: string | undefined;
};

type Props = {
  availableGenres: string[];
  initial?: Filters;
  onChange?: (filters: Filters) => void;
  onApply?: (filters: Filters) => void;
  onReset?: () => void;
};

export const FiltersPanel = ({
  availableGenres,
  initial,
  onChange,
  onApply,
  onReset,
}: Props): React.JSX.Element => {
  const [genres, setGenres] = useState<string[]>(initial?.genres ?? []);
  const [minRating, setMinRating] = useState<number | ''>(initial?.rating?.min ?? '');
  const [maxRating, setMaxRating] = useState<number | ''>(initial?.rating?.max ?? '');
  const [year, setYear] = useState<string>(initial?.year ?? '');

  useEffect(() => {
    const filters: Filters = {
      genres: genres.length > 0 ? genres : undefined,
      rating:
        minRating !== '' || maxRating !== ''
          ? {
              min: minRating === '' ? undefined : Number(minRating),
              max: maxRating === '' ? undefined : Number(maxRating),
            }
          : undefined,
      year: year || undefined,
    };
    onChange?.(filters);
  }, [genres, minRating, maxRating, year, onChange]);

  const toggleGenre = (g: string) => {
    setGenres((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));
  };

  const handleReset = () => {
    setGenres([]);
    setMinRating('');
    setMaxRating('');
    setYear('');
    onReset?.();
  };

  const handleApply = () => {
    const filters: Filters = {
      genres: genres.length > 0 ? genres : undefined,
      rating:
        minRating !== '' || maxRating !== ''
          ? {
              min: minRating === '' ? undefined : Number(minRating),
              max: maxRating === '' ? undefined : Number(maxRating),
            }
          : undefined,
      year: year || undefined,
    };
    onApply?.(filters);
  };

  return (
    <aside className="p-4 bg-gray-900 border border-gray-800 rounded-md space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-100">Géneros</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {availableGenres.map((g) => {
            const checked = genres.includes(g);
            return (
              <label
                key={g}
                className={`inline-flex items-center px-2 py-1 rounded-md cursor-pointer ${checked ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-200'}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleGenre(g)}
                  className="mr-2"
                  aria-checked={checked}
                />
                <span className="text-sm">{g}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-100">Puntuación</h4>
        <div className="mt-2 flex items-center gap-2">
          <input
            aria-label="Rating mín"
            type="number"
            min={0}
            max={10}
            step={0.1}
            value={minRating}
            onChange={(e) => setMinRating(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="Min"
            className="w-24 px-2 py-1 rounded-md bg-gray-800 border border-gray-700 text-gray-100"
          />
          <span className="text-gray-400">—</span>
          <input
            aria-label="Rating máx"
            type="number"
            min={0}
            max={10}
            step={0.1}
            value={maxRating}
            onChange={(e) => setMaxRating(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="Max"
            className="w-24 px-2 py-1 rounded-md bg-gray-800 border border-gray-700 text-gray-100"
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-100">Año de estreno</h4>
        <input
          aria-label="Año"
          type="number"
          min={1900}
          max={2100}
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="2022"
          className="mt-2 w-32 px-2 py-1 rounded-md bg-gray-800 border border-gray-700 text-gray-100"
        />
      </div>

      <div className="flex items-center gap-2 justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-1 rounded-md bg-gray-700 text-gray-100 hover:bg-gray-600"
        >
          Reiniciar
        </button>
        <button
          type="button"
          onClick={handleApply}
          className="px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-500"
        >
          Aplicar
        </button>
      </div>
    </aside>
  );
};
