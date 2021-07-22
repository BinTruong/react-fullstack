import apiHandler from './apiHandler';

export const usersApi = {
  paging: (payload) => apiHandler.post('/apis/users/paging', { condition: payload }),
  createUser: (payload) => apiHandler.post('/apis/users/', payload),
  updateUser: (id, payload) => apiHandler.put(`/apis/users/${id}`, payload),
  deleteUser: (id) => apiHandler.delete(`/apis/users/${id}`)
};
