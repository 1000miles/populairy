const Chalk = require("chalk");
const BaseService = require("./base-service");
const User = require("../models/User");

class UserService extends BaseService {
  model = User;
}

module.exports = new UserService();
