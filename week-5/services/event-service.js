const BaseService = require('./base-service')
const Event = require('../models/with-mongoose/EventNEW');

class EventService extends BaseService {
	model = Event;

	async hasPopups(popup) {
		return this.popups.push(popup);
	}

	async sendCoHostingRequest(person) {
		if(person.role === "host") {
		 	person.hosts.push(this);
			person.hosts.status = "pending";

			person.save();

			return `Hi ${person.name}, thanks for your interest to join us as a ${person.role}. We'll get back to you as soon as possible.`;
		}
	}
}

module.exports = new EventService()
