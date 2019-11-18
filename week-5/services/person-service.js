const BaseService = require('./base-service')

// New
const Person = require('../models/with-mongoose/PersonNEW');

class PersonService extends BaseService {
	model = Person

	async attendPopup(person, popup) {
		person.popups.push(popup)
		popup.guests.push(person)
		await person.save()
		await popup.save()
	}

	async getPersonInfo(person, popup) {
		console.log(`Person: ${person}`)
		console.log(`Person: ${popup}`);
		// if (person.role === "host" || person.role === "organizer") {
		// 	console.log(
		// 		`The ${person.role} ${person.firstName} ${person.lastName} organizes ${popup.title} and can be contacted via ${person.email} or ${person.phoneNumber}.`,
		// 	);
		// } else {
		// 	console.log(
		// 		`The ${person.role} ${person.firstName} ${person.lastName} organizes ${popup.title} and can be contacted via ${person.email}.`,
		// 	);
		// }
	}
}

module.exports = new PersonService()
