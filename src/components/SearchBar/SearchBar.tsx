import { useEffect, useRef, useState } from 'react';

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void; 
  placeholder?: string;
  debounceMs?: number;
  ariaLabel?: string;
};

export const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Buscar...',
  debounceMs = 400,
  ariaLabel = 'Buscar',
}: Props): React.JSX.Element => {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string>(value ?? '');

  const mountedRef = useRef(true);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const inputValue = isControlled ? (value ?? '') : internal;

  useEffect(() => {
    if (!onSearch) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      if (mountedRef.current) onSearch(inputValue);
    }, debounceMs);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [inputValue, onSearch, debounceMs]);

  const handleChange = (v: string) => {
    if (!isControlled) {
      setInternal(v);
    }
    onChange?.(v);
  };

  return (
    <div className="w-full">
      <label htmlFor="search-input" className="sr-only">
        {ariaLabel}
      </label>
      <input
        id="search-input"
        type="search"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>
  );
}
