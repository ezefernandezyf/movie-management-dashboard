import { useNavigate } from 'react-router-dom';

export function PrivacyPage(): React.JSX.Element {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-gray-900 text-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">Política de Privacidad</h1>
                    <p className="text-gray-400">
                        Esta página describe cómo recopilamos, usamos y protegemos los datos en Movie Management Dashboard.
                        Fecha de entrada en vigor: 2026-03-13.
                    </p>
                </header>

                <section className="mb-6 bg-gray-950 border border-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-2">1. Información que recopilamos</h2>
                    <ul className="list-disc list-inside text-gray-300">
                        <li>Datos que proporcionas: título, descripción, género, año, puntuación, poster (URLs), etc.</li>
                        <li>Datos técnicos: direcciones IP, logs de uso y métricas de rendimiento (anónimos).</li>
                        <li>Datos derivados: preferencias de búsqueda y filtros que usas en la app.</li>
                    </ul>
                </section>

                <section className="mb-6 bg-gray-950 border border-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-2">2. Cómo usamos la información</h2>
                    <p className="text-gray-300">
                        Utilizamos los datos para proporcionar y mejorar la funcionalidad del panel (guardar y mostrar películas,
                        sincronizar catálogos, responder a acciones del usuario) y para diagnósticos y análisis internos.
                    </p>
                </section>

                <section className="mb-6 bg-gray-950 border border-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-2">3. Cookies y tecnologías similares</h2>
                    <p className="text-gray-300">
                        La aplicación puede usar cookies o almacenamiento local para mantener sesiones, preferencias de UI y
                        optimizar la experiencia. No almacenamos contraseñas en texto plano ni secretos en el cliente.
                    </p>
                </section>

                <section className="mb-6 bg-gray-950 border border-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-2">4. Compartir datos con terceros</h2>
                    <p className="text-gray-300">
                        Podemos usar servicios de terceros (por ejemplo, analytics, hosting o APIs externas). Antes de integrar
                        un servicio que procese datos personales, revisa su política y asegúrate de que cumple con tus requisitos
                        de seguridad y privacidad.
                    </p>
                </section>

                <section className="mb-6 bg-gray-950 border border-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-2">5. Seguridad</h2>
                    <p className="text-gray-300">
                        Aplicamos prácticas estándar (TLS en transporte, control de acceso en backend, manejo de secretos en servidores).
                        En desarrollo local usa .env y no subas claves al repositorio (.env.example en su lugar).
                    </p>
                </section>

                <section className="mb-6 bg-gray-950 border border-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-2">6. Tus derechos</h2>
                    <p className="text-gray-300">
                        Puedes solicitar acceso, rectificación o supresión de tus datos contactando al equipo. Responderemos según la legislación aplicable.
                    </p>
                </section>

                <section className="mb-8 bg-gray-950 border border-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-2">7. Contacto</h2>
                    <p className="text-gray-300">
                        Si tienes preguntas sobre esta política o quieres ejercer tus derechos, escríbenos a{' '}
                        <a
                            href="mailto:ezefernandezyf@gmail.com"
                            className="text-indigo-400 underline"
                        >
                            ezefernandezyf@gmail.com
                        </a>
                        .
                    </p>
                </section>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                    >
                        Ir al inicio
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/movies')}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        Ir al catálogo
                    </button>
                </div>
            </div>
        </main>
    );
}
