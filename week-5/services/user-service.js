const Chalk = require('chalk');
const BaseService = require('./base-service');
const User = require('../models/with-mongoose/UserNEW');

class UserService extends BaseService {
  model = User;

  async attendEvent(user, event) {
    console.log(`DEBUG [user-service.js] event 1:`, event);
    // console.log(`DEBUG [user-service.js] user 1:`, user);

    // FIXME: UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'push' of undefined
    user = `${user.firstName} ${user.lastName}`;
    console.log(`[user-service.js] user`, user);

    user.events.push(event);
    event.guests.push(user);

    await user.save();
    await event.save();
  }

  async getUserInfo(user) {
    const message1 = `The ${user.role} ${user.firstName} ${user.lastName} can be contacted via ${user.email} and ${user.phoneNumber}.`;

    const message2 = `The ${user.role} ${user.firstName} ${user.lastName} can be contacted via ${user.email}.`;

    if (user.role === 'host' || user.role === 'organizer') return message1;
    else return message2;
  }
}

module.exports = new UserService();
