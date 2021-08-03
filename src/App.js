// routes
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import Router from './routes/routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
// import routesPermission from './routes/validRoute';
// ----------------------------------------------------------------------

export default function App() {
  // const navigate = useNavigate();
  // const role = useSelector((state) => state.auth.role);
  // const isPermission = routesPermission(location.pathname, role);
  // useEffect(() => {
  //   if (!isPermission) {
  //     navigate('/404', { replace: true });
  //   }
  // }, [isPermission]);
  return (
    <ToastProvider autoDismiss autoDismissTimeout={4000} placement="bottom-right">
      <ThemeConfig>
        <ScrollToTop />
        <Router />
        {/* {routing} */}
      </ThemeConfig>
    </ToastProvider>
  );
}
