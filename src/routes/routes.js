import { useSelector } from 'react-redux';

import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import Home from '../layouts/HomeProducts';
//
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardApp from '../pages/DashboardApp';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Blog from '../pages/Blog';
import User from '../pages/User';
import Category from '../pages/Category';
import Book from '../pages/Book';
import NotFound from '../pages/Page404';
import ProtectedRoute from './ProtectedRoute';
import PrivateRoute from './PrivateRoute';
import ValidRoute from './ValidRoute';

// ----------------------------------------------------------------------

export default function Router() {
  // const token = useSelector((state) => state.auth.token);
  // const isLoggedIn = !!token;
  return useRoutes([
    {
      path: '/home',
      element: <ProtectedRoute component={Home} />,
      children: [
        { path: '/', element: <Navigate to="/home/products" replace /> },
        { path: 'products', element: <Products /> },
        { path: 'products/:_id', element: <ProductDetails /> }
      ]
    },
    {
      path: '/dashboard',
      element: <ProtectedRoute component={DashboardLayout} />,
      children: [
        // { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        {
          path: '/',
          element: <PrivateRoute component={DashboardApp} roles={['admin', 'contributor']} />
        },

        {
          path: 'app',
          element: <PrivateRoute component={DashboardApp} roles={['admin', 'contributor']} />
        },
        { path: 'user', element: <PrivateRoute component={User} roles={['admin']} /> },
        { path: 'category', element: <PrivateRoute component={Category} roles={['admin']} /> },
        {
          path: 'book',
          element: <PrivateRoute component={Book} roles={['admin', 'contributor']} />
        }
        // { path: 'products', element: <Products /> },
        // { path: 'products/:_id', element: <ProductDetails /> },
        // { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <ValidRoute component={LogoOnlyLayout} />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> },
    { path: '404', element: <NotFound /> },
    { path: '/', element: <Navigate to="/home" /> }
  ]);
}
