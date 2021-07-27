// routes
import { ToastProvider } from 'react-toast-notifications';
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
// ----------------------------------------------------------------------

export default function App() {
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
