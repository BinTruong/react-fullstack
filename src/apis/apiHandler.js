const axios = require("axios");
const store = require("../store").default;
const router = require("../router").default;

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "https://nodejs-auth-restapi-crud.herokuapp.com/",
});

store.subscribe((mutation) => {
  if (mutation.type === "SET_USER_INFO") {
    instance.defaults.headers.common["auth-token"] = mutation.payload.token;
  }
});

// Alter defaults after instance has been created
instance.defaults.headers.common["auth-token"] = store.getters.GET_TOKEN;

instance.interceptors.request.use((config) => {
  console.log("Redirect to", config.url);
  return config;
});

instance.interceptors.response.use((response) => {
  switch (response.data.code) {
    case 400:
      return response; // handle show toask alert message error
    case 401: {
      store.commit("RESET_USER_INFO");
      return router.push("auth/login");
    }
    case 403:
      return; // handle redirect forbiden page
    default:
      break;
  }
  return response;
});

module.exports = instance;
