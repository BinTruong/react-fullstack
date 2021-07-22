import apiHandler from './apiHandler';

export const booksApi = {
  pageHome: (payload) => apiHandler.post('/apis/books/home', { condition: payload }),
  paging: (payload) => apiHandler.post('/apis/books/paging', { condition: payload }),
  createBook: (payload) => {
    const bodyFormData = new FormData();
    Object.keys(payload).forEach((key) => {
      const value = payload[key];
      bodyFormData.append(key, value);
    });
    return apiHandler.post('/apis/books/', bodyFormData);
  },
  updateBook: (id, payload) => {
    const bodyFormData = new FormData();
    Object.keys(payload).forEach((key) => {
      const value = payload[key];
      bodyFormData.append(key, value);
    });
    return apiHandler.put(`/apis/books/${id}`, bodyFormData);
  },
  deleteBook: (id) => apiHandler.delete(`/apis/books/${id}`)
};
