import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components';
import { EditMoviePage, HomePage, MovieDetailsPage, MoviesPage, NewMoviePage } from '../pages';

export default function AppRoutes(): React.JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="home" element={<HomePage />} />
                <Route path="movies" element={<MoviesPage />} />
                <Route path="movies/new" element={<NewMoviePage />} />
                <Route path="movies/:id" element={<MovieDetailsPage />} />
                <Route path="movies/:id/edit" element={<EditMoviePage />} />

                <Route path="*" element={<h1>Not found</h1>} />
            </Route>
        </Routes>
    );
}