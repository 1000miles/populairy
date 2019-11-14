const Chalk = require('chalk');

module.exports = class Popup {
	constructor(category, title, space, host, date) {
		this.category = category
		this.title = title
		this.space = space
		this.host = host
		this.date = date
		this.guests = []
	}

	getPopupInfo() {
		console.log(`The event`, Chalk.bgMagenta.white(this.title), `is hosted by ${this.host}`, `and will take place on`, Chalk.green(this.date), `at`, Chalk.red(this.space), `and has currently ${this.guests.length} guests attending.`);
	}

	printGuestNames() {
		this.guests.forEach(printName);
	}
}

printName = guest => console.log(guest.firstName, guest.lastName, guest.email);

