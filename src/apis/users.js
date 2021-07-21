import axios from './apiHandler';

export const usersApi = {
  paging: (payload) => axios.post('/apis/users/paging', { condition: payload }),
  createUser: (payload) => axios.post('/apis/users/', payload),
  updateUser: (id, payload) => axios.put(`/apis/users/${id}`, payload),
  deleteUser: (id) => axios.delete(`/apis/users/${id}`)
};
