import './App.css';

import { useScrollThreshold } from './hooks/useScrollThreshold';

import ProtectedLayout from './Layouts/ProtectedLayout';

import HomePage from './Layouts/HomeLayout';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import MyPage from './pages/MyPage';
import MoviePage from './pages/MoviePage';
import MovieDetailPage from './pages/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage';

import ScrollToTopButton from './components/Buttons';

import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import { AuthProvider } from './contexts/authContext';

function App() {
  //console.log(import.meta.env.VITE_TMDB_KEY);
  const isScrolling = useScrollThreshold();

  const publicRoutes: RouteObject[] = [
    {
      path: "/",
      element: <HomePage />,
      errorElement: <NotFoundPage />,
      children: [
        { path: "join", element: <JoinPage />},
        { path: "join/:step", element: <JoinPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "movies/:category", element: <MoviePage /> },
        { path: "movie/:movieId", element: <MovieDetailPage />,},
        { path: "/v1/auth/google/callback", element: <GoogleLoginRedirectPage />,},
      ],  
    }
  ];

  const protectedRoutes: RouteObject[] = [
    {
      path: "/",
      element: (
        <ProtectedLayout>
          <HomePage />
        </ProtectedLayout>
      ),
      children: [{ path: "mypage", element: <MyPage /> }],
    }
  ];
 
  const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
  return (
    <AuthProvider>
      <div className="min-h-screen w-full bg-black/90">
        <RouterProvider router={router} />
        <div className="fixed bottom-16 right-16"> {isScrolling && <ScrollToTopButton /> } </div>
      </div>
    </AuthProvider>
  );
}
 
export default App;
