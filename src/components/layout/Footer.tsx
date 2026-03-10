import { Link } from 'react-router-dom';

export function Footer(): React.JSX.Element {
  const year = new Date().getFullYear();
  const repoUrl = 'https://github.com/ezefernandezyf/movie-management-dashboard';

  return (
    <footer role="contentinfo" className="w-full bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-3">
          <div className="text-sm text-gray-400">
            &copy; {year} MovieDash. Todos los derechos reservados.
          </div>

          <nav aria-label="Footer links" className="flex items-center gap-4">
            <Link
              to="/privacy"
              className="text-sm text-gray-300 hover:text-indigo-300 transition-colors"
              aria-label="Política de privacidad"
            >
              Privacy
            </Link>

            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-indigo-300 transition-colors"
              aria-label="Ver código en GitHub (se abre en nueva pestaña)"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="text-gray-300"
              >
                <path
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.428 2.865 8.185 6.839 9.51.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.605-3.369-1.343-3.369-1.343-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.07 1.532 1.033 1.532 1.033.892 1.53 2.341 1.088 2.91.833.091-.648.35-1.088.637-1.339-2.22-.253-4.555-1.112-4.555-4.948 0-1.092.39-1.986 1.03-2.686-.104-.254-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.296 2.75-1.025 2.75-1.025.546 1.378.203 2.396.1 2.65.64.7 1.03 1.594 1.03 2.686 0 3.847-2.338 4.692-4.566 4.941.36.31.68.92.68 1.855 0 1.338-.012 2.418-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  fill="currentColor"
                />
              </svg>
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
