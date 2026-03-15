import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      <Footer />

      <div
        id="toast-root"
        aria-hidden
        className="fixed bottom-6 right-6 z-50 pointer-events-none"
      />
    </div>
  );
}
