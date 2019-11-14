module.exports = class Guest {
	constructor(firstName, lastName, email) {
		this.firstName = firstName
		this.lastName = lastName
		this.email = email
	}

	getGuestInfo() {
		console.log(`The guest '${this.firstName} ${this.lastName}' can be contacted via email (${this.email}).`)
	}

	attend(popup) {
		this.popup = popup.firstName
		popup.guests.push(this);
  }
}
