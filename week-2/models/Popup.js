const Chalk = require("chalk")

module.exports = class Popup {
  constructor(category, title, host, space, date) {
    this.category = category
    this.title = title
    this.host = host
    this.space = space
    this.date = date
    this.attendees = []
  }

  printAttendeesNames() {
    this.attendees.push(printHost, printGuest)
    console.log(`[printAttendeesNames]`, this.attendees)
	}

	static create({
		category,
		title,
		host,
		space,
		date
	}) {
		return new Popup(category, title, host, space, date)
	}
}

const printGuest = (guest) => console.log(guest.name, guest.email)
const printHost = (host) => console.log(host.name, host.email, host.phoneNumber)
