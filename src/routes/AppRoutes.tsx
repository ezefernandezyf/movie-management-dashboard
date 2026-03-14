import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout, RequireAuth } from '../components';
import {
    EditMoviePage,
    HomePage,
    MovieDetailsPage,
    MoviesPage,
    NewMoviePage,
    NotFoundPage,
    PrivacyPage,
    LoginPage,
    SignupPage,
} from '../pages';

export default function AppRoutes(): React.JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/home" replace />} />

                <Route path="home" element={<HomePage />} />
                <Route path="movies" element={<MoviesPage />} />
                <Route path="movies/:id" element={<MovieDetailsPage />} />
                <Route path="privacy" element={<PrivacyPage />} />

                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />

                <Route
                    path="movies/new"
                    element={
                        <RequireAuth>
                            <NewMoviePage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="movies/:id/edit"
                    element={
                        <RequireAuth>
                            <EditMoviePage />
                        </RequireAuth>
                    }
                />

                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}