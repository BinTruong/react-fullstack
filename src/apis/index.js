const auth = require("./auth");
const users = require("./users");
const books = require("./books");
const categories = require("./categories");

module.exports = {
  authApi: auth,
  usersApi: users,
  booksApi: books,
  categoriesApi: categories,
};
