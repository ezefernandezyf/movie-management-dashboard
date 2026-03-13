import { useNavigate } from 'react-router-dom';

export function NotFoundPage(): React.JSX.Element {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 p-6" aria-labelledby="notfound-title">
            <div className="max-w-2xl text-center">
                <h1 id="notfound-title" className="text-4xl sm:text-5xl font-bold mb-4">
                    404 — Página no encontrada
                </h1>

                <p className="text-gray-400 mb-6">
                    Lo sentimos, la página que buscas no existe o ha sido movida. Puedes volver al catálogo de películas o al inicio de la aplicación.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/movies')}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        Ir al catálogo
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-100 rounded shadow focus:outline-none focus:ring-2 focus:ring-gray-600"
                    >
                        Ir al inicio
                    </button>
                </div>

                <p className="text-sm text-gray-500 mt-6">
                    Si crees que esto es un error, puedes volver a intentarlo o contactar al equipo.
                </p>
            </div>
        </main>
    );
}