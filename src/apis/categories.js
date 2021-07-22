import apiHandler from './apiHandler';

export const categoriesApi = {
  paging: (payload) => apiHandler.post('/apis/categories/paging', { condition: payload }),
  getCategory: () => apiHandler.get('/apis/categories/'),
  createCategory: (payload) => apiHandler.post('/apis/categories/', payload),
  updateCategory: (id, payload) => apiHandler.put(`/apis/categories/${id}`, payload),
  deleteCategory: (id) => apiHandler.delete(`/apis/categories/${id}`)
};
