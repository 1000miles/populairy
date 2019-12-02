const Chalk = require("chalk");
const BaseService = require("./base-service");
const User = require("../models/with-mongoose/User");

class UserService extends BaseService {
  model = User;

  async attendEvent(user, event) {
    console.log(`DEBUG [user-service.js] event 1:`, event);

    user = `${user.firstName} ${user.lastName}`;
    console.log(`[user-service.js] user`, user);

    user.events.push(event);
    event.guests.push(user);

    await user.save();
    await event.save();
  }
}

module.exports = new UserService();
