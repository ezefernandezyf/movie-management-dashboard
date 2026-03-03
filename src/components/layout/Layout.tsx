import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = (): React.JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[rgb(var(--surface))] focus:px-3 focus:py-2 focus:rounded-md focus:shadow-md focus:ring-2 focus:ring-[rgb(var(--ring))]"
      >
        Ir al contenido
      </a>

      <Header />

      <main id="main-content" role="main" className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};
