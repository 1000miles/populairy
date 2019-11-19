const BaseService = require('./base-service');
const EventModel = require('./../../models/archived-old/Event');

class EventService extends BaseService {
  constructor() {
    super(
      EventModel,
      `${__dirname}/../../database/archived/event-database.json`,
    );
  }
}

module.exports = new EventService();
