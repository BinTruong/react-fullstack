const axios = require("./apiHandler");

const authApi = {
  register: (payload) => axios.post("/apis/auth/register", payload),
  login: (payload) => axios.post("/apis/auth/login", payload),
  logout: (payload) => axios.post("/apis/auth/logout", payload),
  changePassword: (payload) => axios.post("/apis/auth/changePassword", payload),
};

module.exports = authApi;
