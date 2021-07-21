// import { useSelector } from 'react-redux';
// import { useRoutes } from 'react-router-dom';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';

// ----------------------------------------------------------------------

export default function App() {
  // const token = useSelector((state) => state.auth.token);
  // const isLoggedIn = !!token;
  // const routing = useRoutes(routes());
  return (
    <ThemeConfig>
      <ScrollToTop />
      <Router />
      {/* {routing} */}
    </ThemeConfig>
  );
}
