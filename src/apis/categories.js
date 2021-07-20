const axios = require("./apiHandler");

const categoriesApi = {
  paging: (payload) =>
    axios.post("/apis/categories/paging", { condition: payload }),
  getCategory: () => axios.get("/apis/categories/"),
  createCategory: (payload) => axios.post("/apis/categories/", payload),
  updateCategory: (id, payload) => axios.put("/apis/categories/" + id, payload),
  deleteCategory: (payload) => axios.delete("/apis/categories/" + payload),
};

module.exports = categoriesApi;
