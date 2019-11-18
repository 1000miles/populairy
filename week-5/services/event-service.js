const BaseService = require('./base-service')

// New
const Event = require('../models/with-mongoose/EventNEW');


class EventService extends BaseService {
	model = Event;

	async hasPopups(popup) {
		popups.push(popup);
		popup.organizers.push(host);
	}
}

module.exports = new EventService()
