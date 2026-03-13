import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components';
import { EditMoviePage, HomePage, MovieDetailsPage, MoviesPage, NewMoviePage, NotFoundPage, PrivacyPage } from '../pages';

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
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}