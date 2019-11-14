// Week 1 Homework

module.exports = class Host {
	constructor(firstName, lastName, email, phoneNumber) {
		this.firstName = firstName
		this.lastName = lastName
		this.email = email
		this.phoneNumber = phoneNumber
	}

	getHostInfo() {
		console.log(
			`The host '${this.firstName} ${this.lastName}' can be contacted via email (${this.email}) or phone number (${this.phoneNumber}).`
		)
	}

	attend(popup) {
		this.popup = popup.firstName
		popup.hosts.push(this);
  }
}
