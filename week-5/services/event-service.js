const BaseService = require('./base-service')
const Event = require('../models/with-mongoose/EventNEW')

class EventService extends BaseService {
    model = Event
}

module.exports = new EventService()
