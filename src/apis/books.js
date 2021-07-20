const axios = require("./apiHandler");

const booksApi = {
  pageHome: (payload) => axios.post("/apis/books/home", { condition: payload }),
  paging: (payload) => axios.post("/apis/books/paging", { condition: payload }),
  createBook: (payload) => {
    var bodyFormData = new FormData();
    Object.keys(payload).forEach((key) => {
      const value = payload[key];
      bodyFormData.append(key, value);
    });
    return axios.post("/apis/books/", bodyFormData);
  },
  updateBook: (id, payload) => {
    var bodyFormData = new FormData();
    Object.keys(payload).forEach((key) => {
      const value = payload[key];
      bodyFormData.append(key, value);
    });
    return axios.put("/apis/books/" + id, bodyFormData);
  },
  deleteBook: (payload) => axios.delete("/apis/books/" + payload),
};

module.exports = booksApi;
