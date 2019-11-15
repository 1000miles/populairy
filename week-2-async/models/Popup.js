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
    // this.attendees.push(printHost, printGuest)
    console.log(`[printAttendeesNames]`, this.attendees)
  }

  getPopupInfo() {
    console.log(
      `The pop-up event`,
      Chalk.bgMagenta.white(this.title),
      `is hosted by`,
      Chalk.blue(this.host),
      `and will take place on`,
      Chalk.green(this.date),
      `at`,
      Chalk.red(this.space),
      `.`,
      `It currently has ${this.attendees.length} people attending.`
    )
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
