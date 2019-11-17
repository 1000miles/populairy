const BaseService = require('./base-service');
const EventModel = require('../models/Event');

class EventService extends BaseService {
  constructor() {
    super(EventModel, `${__dirname}/../database/event-database.json`);
  }
}

module.exports = new EventService();
