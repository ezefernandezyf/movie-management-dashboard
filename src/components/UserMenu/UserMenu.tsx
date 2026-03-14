import { useAuth } from "../../hooks/useAuth";

export function UserMenu(): React.JSX.Element | null {
    const { user, signOut, loading } = useAuth();

    if (!user) return null;

    return (
        <div className="flex items-center gap-2">
            <span className="text-gray-200 text-sm">{user.email}</span>
            <button
                type="button"
                className="px-2 py-1 bg-gray-800 rounded text-gray-100"
                disabled={loading}
                onClick={signOut}
            >
                Cerrar sesión
            </button>
        </div>
    );
}
