const axios = require("./apiHandler");

const usersApi = {
  paging: (payload) => axios.post("/apis/users/paging", { condition: payload }),
  createUser: (payload) => axios.post("/apis/users/", payload),
  updateUser: (id, payload) => axios.put("/apis/users/" + id, payload),
  deleteUser: (payload) => axios.delete("/apis/users/" + payload),
};

module.exports = usersApi;
