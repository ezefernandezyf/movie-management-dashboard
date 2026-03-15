import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { showError } from '../lib/toast';

export function SignupPage(): React.JSX.Element {
  const { signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate('/movies');
    } catch (err) {
      showError((err as Error)?.message ?? 'Error al crear cuenta');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-gray-950 border border-gray-800 rounded-md mt-20">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Crear cuenta</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label htmlFor="email" className="block text-gray-200">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          autoComplete="username"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100"
          required
        />
        <label htmlFor="password" className="block text-gray-200">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded transition"
          disabled={loading}
        >
          {loading ? 'Creando...' : 'Crear cuenta'}
        </button>
        <div className="text-center mt-3">
          <span className="text-gray-400">¿Ya tienes cuenta?</span>{' '}
          <button
            type="button"
            className="text-indigo-400 underline"
            onClick={() => navigate('/login')}
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
