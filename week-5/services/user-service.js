const BaseService = require('./base-service');

// New
const User = require('../models/with-mongoose/UserNEW');

class UserService extends BaseService {
  model = User;

  async attendEvent(user, event) {
    console.log(`DEBUG [user-service.js] event 1:`, event);
    console.log(`DEBUG [user-service.js] user 1:`, user);

    user.events.push(event);
    event.guests.push(user);
    await user.save();
    await event.save();

    console.log(`DEBUG popup 2:`, popup);
    console.log(`DEBUG user 2:`, user);
  }

  async getUserInfo(user, popup) {
    console.log(`User: ${user}`);
    console.log(`Popup: ${popup}`);

    if (user.role === 'host' || user.role === 'organizer') {
      console.log(
        `The ${user.role} ${user.firstName} ${user.lastName} organizes ${popup.title} and can be contacted via ${user.email} or ${user.phoneNumber}.`,
      );
    } else {
      console.log(
        `The ${user.role} ${user.firstName} ${user.lastName} organizes ${popup.title} and can be contacted via ${user.email}.`,
      );
    }
  }
}

module.exports = new UserService();
