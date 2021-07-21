import axios from './apiHandler';

export const categoriesApi = {
  paging: (payload) => axios.post('/apis/categories/paging', { condition: payload }),
  getCategory: () => axios.get('/apis/categories/'),
  createCategory: (payload) => axios.post('/apis/categories/', payload),
  updateCategory: (id, payload) => axios.put(`/apis/categories/${id}`, payload),
  deleteCategory: (id) => axios.delete(`/apis/categories/${id}`)
};
