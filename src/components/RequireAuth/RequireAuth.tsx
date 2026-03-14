import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface RequireAuthProps {
    children: React.ReactElement;
}

export function RequireAuth({ children }: RequireAuthProps): React.ReactElement {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;
    return children;
}
