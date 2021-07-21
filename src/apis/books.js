import axios from './apiHandler';

export const booksApi = {
  pageHome: (payload) => axios.post('/apis/books/home', { condition: payload }),
  paging: (payload) => axios.post('/apis/books/paging', { condition: payload }),
  createBook: (payload) => {
    const bodyFormData = new FormData();
    Object.keys(payload).forEach((key) => {
      const value = payload[key];
      bodyFormData.append(key, value);
    });
    return axios.post('/apis/books/', bodyFormData);
  },
  updateBook: (id, payload) => {
    const bodyFormData = new FormData();
    Object.keys(payload).forEach((key) => {
      const value = payload[key];
      bodyFormData.append(key, value);
    });
    return axios.put(`/apis/books/${id}`, bodyFormData);
  },
  deleteBook: (id) => axios.delete(`/apis/books/${id}`)
};
