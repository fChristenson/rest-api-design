const UserModel = require("./user/UserModel");
const UserService = require("./user/UserService");

module.exports = {
  userService: new UserService(UserModel)
};
