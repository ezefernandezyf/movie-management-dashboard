import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components';
import { MoviesPage } from '../pages/MoviesPage';

export default function AppRoutes(): React.JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="home" element={<h1>Home placeholder</h1>} />
                <Route path="movies" element={<MoviesPage />} />
                <Route path="movies/new" element={<h1>New movie placeholder</h1>} />
                <Route path="movies/:id" element={<h1>Movie details placeholder</h1>} />
                <Route path="movies/:id/edit" element={<h1>Edit movie placeholder</h1>} />

                <Route path="*" element={<h1>Not found</h1>} />
            </Route>
        </Routes>
    );
}