import { Link } from 'react-router-dom';

export const Footer = (): React.JSX.Element => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[rgb(var(--surface))] border-t border-[rgb(var(--border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 md:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start md:items-center gap-3">
            <Link to="/" aria-label="Ir al inicio" className="inline-flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect width="24" height="24" rx="6" fill="rgb(var(--primary))" />
                <path d="M7 12h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="font-semibold text-sm" style={{ color: 'rgb(var(--text))' }}>
                MovieDash
              </span>
            </Link>

            <div className="text-xs text-[rgb(var(--muted))]">
              <div>© {year} MovieDash</div>
              <div className="mt-0.5">Todos los derechos reservados</div>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-2">
            <Link
              to="/about"
              className="text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] px-2 py-1 rounded transition"
            >
              Acerca
            </Link>
            <Link
              to="/catalogo"
              className="text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] px-2 py-1 rounded transition"
            >
              Catálogo
            </Link>
            <Link
              to="/contacto"
              className="text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] px-2 py-1 rounded transition"
            >
              Contacto
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))] px-2 py-1 rounded transition"
            >
              Privacidad
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="GitHub (placeholder)"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded hover:bg-[rgba(var(--primary),0.06)] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.2.8-.5v-2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.1-1.6-1.1-1.6-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.4.1-2.9 0 0 1-.3 3.3 1.2a11.3 11.3 0 016 0C19 3 20 3.3 20 3.3c.6 1.5.2 2.6.1 2.9.7.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1 .8 2v3c0 .3.2.6.8.5A12 12 0 0012 .5z" />
              </svg>
            </a>

            <a
              href="#"
              aria-label="Twitter (placeholder)"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded hover:bg-[rgba(var(--primary),0.06)] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M22 5.9c-.6.3-1.2.5-1.9.6.7-.4 1.2-1.1 1.4-1.9-.7.4-1.5.6-2.3.8-.6-.7-1.5-1.1-2.5-1.1-1.9 0-3.4 1.7-2.9 3.5C8.2 8.3 5.4 6.7 3.4 4c-.8 1.3-.4 3 .9 3.9-.5 0-1-.2-1.4-.4 0 1.5 1 2.8 2.5 3.1-.5.2-1 .2-1.6.1.4 1.3 1.6 2.3 3 2.3C6 16 4.3 16.6 2.5 16.5c1.5 1 3.3 1.6 5.2 1.6 6.3 0 9.8-5.4 9.6-10.1.6-.4 1.2-1 1.6-1.6-.6.3-1.3.5-2 .6z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
