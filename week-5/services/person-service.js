const BaseService = require('./base-service')

// New
const Person = require('../models/with-mongoose/PersonNEW');

class PersonService extends BaseService {
	model = Person

	async attendPopup(person, popup) {
		console.log(`DEBUG popup 1:`, popup)
		console.log(`DEBUG person 1:`, person);

		person.popups.push(popup)
		popup.guests.push(person)
		await person.save()
		await popup.save()

		console.log(`DEBUG popup 2:`, popup);
		console.log(`DEBUG person 2:`, person);
	}

	async getPersonInfo(person, popup) {
		console.log(`Person: ${person}`)
		console.log(`Popup: ${popup}`);
		
		if (person.role === "host" || person.role === "organizer") {
			console.log(
				`The ${person.role} ${person.firstName} ${person.lastName} organizes ${popup.title} and can be contacted via ${person.email} or ${person.phoneNumber}.`,
			);
		} else {
			console.log(
				`The ${person.role} ${person.firstName} ${person.lastName} organizes ${popup.title} and can be contacted via ${person.email}.`,
			);
		}
	}
}

module.exports = new PersonService()
