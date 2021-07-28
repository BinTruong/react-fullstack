import { useSelector } from 'react-redux';

import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Blog from './pages/Blog';
import User from './pages/User';
import Category from './pages/Category';
import Book from './pages/Book';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = !!token;
  return useRoutes([
    {
      path: '/dashboard',
      element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'category', element: <Category /> },
        { path: 'book', element: <Book /> },
        { path: 'products', element: <Products /> },
        { path: 'products/:_id', element: <ProductDetails /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: !isLoggedIn ? <Login /> : <Navigate to="/dashboard" /> },
        { path: 'register', element: !isLoggedIn ? <Register /> : <Navigate to="/dashboard" /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
