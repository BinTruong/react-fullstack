import axios from 'axios';
import { store } from '../store';
// import { getToken } from '../store/reducers/authSlice';

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'http://localhost:3001/'
});

store.subscribe(() => {
  const { token } = store.getState().auth;
  instance.defaults.headers.common['auth-token'] = token;
});

// Alter defaults after instance has been created
instance.defaults.headers.common['auth-token'] = store.getState().auth.token;

instance.interceptors.request.use((config) => {
  console.log('Redirect to', config.url);
  return config;
});

instance.interceptors.response.use((response) => {
  switch (response.data.code) {
    case 400:
      return response; // handle show toask alert message error
    case 401: {
      // store.commit("RESET_USER_INFO");
      // return router.push("auth/login");
      return response;
    }
    case 403:
      return response; // handle redirect forbiden page
    default:
      break;
  }
  return response;
});

export default instance;
