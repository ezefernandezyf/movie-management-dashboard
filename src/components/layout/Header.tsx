import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export function Header(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);
  const onLinkClick = () => close();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
      setTimeout(() => drawerRef.current?.focus(), 120);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!open) return;
      const target = e.target as Node | null;
      if (drawerRef.current && target && !drawerRef.current.contains(target)) {
        close();
      }
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, [open]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'px-3 py-2 text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500',
      isActive
        ? 'text-indigo-300 border-b-2 border-indigo-500 pb-1 font-medium'
        : 'text-gray-200 hover:text-indigo-200',
    ].join(' ');

  const handleSearchSubmit = (e?: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e?.preventDefault();
    const q = query.trim();
    if (q) {
      navigate(`/movies?q=${encodeURIComponent(q)}`);
    } else {
      navigate('/movies');
    }
    close();
  };

  return (
    <header className="sticky top-0 z-40 bg-gray-950 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" aria-label="Inicio" className="inline-flex items-center gap-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="shrink-0"
              >
                <rect width="24" height="24" rx="6" fill="#4F46E5" />
                <path d="M7 12h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="font-semibold text-lg text-gray-100">MovieDash</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-6 ">
            <nav className="flex items-center gap-1" aria-label="Primary">
              <NavLink to="/home" className={navLinkClass}>
                Inicio
              </NavLink>
              <NavLink to="/movies" className={navLinkClass}>
                Catálogo
              </NavLink>
              <NavLink to="/nuevo" className={navLinkClass}>
                Nuevo
              </NavLink>
            </nav>

            <form onSubmit={handleSearchSubmit} className="ml-6 flex items-center gap-2">
              <label htmlFor="header-search" className="sr-only">
                Buscar películas
              </label>
              <input
                id="header-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por título..."
                className="w-80 px-3 py-2 rounded-md bg-gray-800 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none border border-gray-700"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition"
                aria-label="Buscar"
              >
                Buscar
              </button>
            </form>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={open}
              onClick={toggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:bg-gray-800 md:hidden focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Abrir menú</span>
              {!open ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 6l12 12M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      />

      <aside
        id="mobile-menu"
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 h-full w-[85vw] max-w-xs bg-gray-950 shadow-lg border-l border-gray-800 transition-transform duration-200 focus:outline-none ${open ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="h-16 flex items-center justify-between px-4">
          <Link to="/" className="inline-flex items-center gap-2" onClick={onLinkClick}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect width="24" height="24" rx="6" fill="#4F46E5" />
              <path d="M7 12h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-semibold text-gray-100">MovieDash</span>
          </Link>
          <button
            aria-label="Cerrar menú"
            onClick={close}
            className="p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M6 18L18 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="px-4 py-3 flex flex-col gap-2" aria-label="Mobile Primary">
          <NavLink to="/home" onClick={onLinkClick} className={navLinkClass}>
            Inicio
          </NavLink>
          <NavLink to="/movies" onClick={onLinkClick} className={navLinkClass}>
            Catálogo
          </NavLink>
          <NavLink to="/nuevo" onClick={onLinkClick} className={navLinkClass}>
            Nuevo
          </NavLink>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchSubmit();
            }}
            className="mt-4 flex gap-2"
          >
            <label htmlFor="mobile-search" className="sr-only">
              Buscar películas
            </label>
            <input
              id="mobile-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por título..."
              className="flex-1 px-3 py-2 rounded-md bg-gray-800 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none border border-gray-700"
            />
            <button
              type="button"
              onClick={() => handleSearchSubmit()}
              className="px-3 py-2 rounded-md bg-indigo-600 text-white"
            >
              Buscar
            </button>
          </form>
        </nav>
      </aside>
    </header>
  );
}
