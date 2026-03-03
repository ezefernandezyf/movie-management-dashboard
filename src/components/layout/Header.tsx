import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Header = (): React.JSX.Element => {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => drawerRef.current?.focus(), 150);
    }
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

  const onLinkClick = () => {
    close();
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] ${
      isActive
        ? 'bg-[rgb(var(--primary))] text-white'
        : 'text-[rgb(var(--text))] hover:bg-[rgba(var(--primary),0.06)]'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-[rgb(var(--surface))] border-b border-[rgb(var(--border))]">
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
                <rect width="24" height="24" rx="6" fill="rgb(var(--primary))" />
                <path d="M7 12h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="font-semibold text-lg" style={{ color: 'rgb(var(--text))' }}>
                MovieDash
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex md:items-center md:gap-2" aria-label="Primary">
            <NavLink to="/home" className={navLinkClass}>
              Inicio
            </NavLink>
            <NavLink to="/catalog" className={navLinkClass}>
              Catálogo
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/nuevo"
              className="hidden sm:inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-[rgb(var(--primary))] text-white hover:brightness-95 transition"
            >
              Nuevo
            </Link>

            <button
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={open}
              onClick={toggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-[rgb(var(--text))] hover:bg-[rgba(var(--primary),0.06)] md:hidden focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
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
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={close}
      />

      <aside
        id="mobile-menu"
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 h-full w-[85vw] max-w-xs bg-[rgb(var(--surface))] shadow-lg border-l border-[rgb(var(--border))] transition-transform duration-200 focus:outline-none ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4">
          <Link to="/" className="inline-flex items-center gap-2" onClick={onLinkClick}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect width="24" height="24" rx="6" fill="rgb(var(--primary))" />
              <path d="M7 12h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-semibold">MovieDash</span>
          </Link>
          <button
            aria-label="Cerrar menú"
            onClick={close}
            className="p-2 rounded-md hover:bg-[rgba(var(--primary),0.06)] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
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

        <nav className="px-4 py-2 flex flex-col gap-1" aria-label="Mobile Primary">
          <NavLink to="/Buscar" onClick={onLinkClick} className={navLinkClass}>
            Inicio
          </NavLink>
          <NavLink to="/Catálogo" onClick={onLinkClick} className={navLinkClass}>
            Catálogo
          </NavLink>
          <Link
            to="/nuevo"
            onClick={onLinkClick}
            className="px-3 py-2 rounded-md text-sm font-medium bg-[rgb(var(--primary))] text-white"
          >
            Nuevo
          </Link>
        </nav>
      </aside>
    </header>
  );
};
