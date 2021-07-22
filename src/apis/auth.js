import apiHandler from './apiHandler';

export const authApi = {
  register: (payload) => apiHandler.post('/apis/auth/register', payload),
  login: (payload) => apiHandler.post('/apis/auth/login', payload),
  logout: (payload) => apiHandler.post('/apis/auth/logout', payload),
  changePassword: (payload) => apiHandler.post('/apis/auth/changePassword', payload)
};
