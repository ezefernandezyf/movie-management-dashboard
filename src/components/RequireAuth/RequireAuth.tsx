import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function RequireAuth({ children }: { children: React.ReactElement }) {
    const { user } = useAuth();
    const location = useLocation();

    if (user === undefined) return <div>Loading...</div>;

    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
    return children;
}