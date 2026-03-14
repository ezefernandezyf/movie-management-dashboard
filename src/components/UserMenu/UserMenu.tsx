import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const UserMenu: React.FC = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return (
            <div>
                <button className="btn" onClick={() => navigate('/login')}>Login</button>
                <button className="btn" onClick={() => navigate('/signup')}>Signup</button>
            </div>
        );
    }

    return (
        <div>
            <span className="mr-2">{user.email}</span>
            <button className="btn" onClick={signOut}>Logout</button>
        </div>
    );
};
