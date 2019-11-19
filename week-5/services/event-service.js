const BaseService = require('./base-service');
const Event = require('../models/with-mongoose/EventNEW');

class EventService extends BaseService {
  model = Event;

  async hasPopups(popup) {
    return this.popups.push(popup);
  }

  async sendCoHostingRequest(user) {
    if (user.role === 'host') {
      user.hosts.push(this);
      user.hosts.status = 'pending';

      user.save();

      return `Hi ${user.name}, thanks for your interest to join us as a ${user.role}. We'll get back to you as soon as possible.`;
    }
  }
}

module.exports = new EventService();
