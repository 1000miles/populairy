const BaseService = require('./base-service')
const Person = require('../models/with-mongoose/PersonNEW');

class PersonService extends BaseService {
	model = Person

	async attend(person, popup) {
			this.popups.push(popup);

			if (person.role === "host") {
				console.log(`This:`, this)
				popup.hosts.push(person);
			} else if (person.role === "organizer") {
				popup.organizers.push(person);
			} else {
				person.role = "guest";
				popup.guests.push(person)
			}

			await person.save();
			await popup.save();
		}

	getPersonInfo(person, popup) {
		switch (role) {
			case "host":
			case "organizer":
				console.log(
					`The ${person.role} ${person.name} organizes ${popup} and can be contacted via ${person.email} or ${person.phoneNumber}.`
				);
			case "guest":
				console.log(
					`The ${person.role} ${person.name} organizes ${popup} and can be contacted via ${person.email}.`
				);
		}
	}
}

module.exports = new PersonService()
