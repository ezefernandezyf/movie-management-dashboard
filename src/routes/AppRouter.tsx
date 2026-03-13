import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

export default function AppRouter(): React.JSX.Element {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}