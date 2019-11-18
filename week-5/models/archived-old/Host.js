module.exports = class Person {
  constructor(firstName, lastName, email, phoneNumber, popups = [], role, id) {
    this.name = `${firstName} ${lastName}`;
    this.firstName = firstName;
    this.lastName = lastName;
		this.email = email;
		this.phoneNumber = phoneNumber;
    this.popups = popups;
		this.role = role;
    this.id = id;
	}

	setRole() {
		switch (role) {
			// host = event host
			case "host":
				this.role = "host";
				break;
			// organizer = popup organizer
			case "organizer":
				this.role = "organizer"
				break;
			case"guest":
				this.role = "guest"
				break;
			default:
				console.log(`ERROR, role can't be empty.`);
				break;
		}
	}

  attend(popup) {
		this.popups.push(popup.title);

		if (this.role === "host") {
			popup.hosts.push(this);
		} else if (this.role === "organizer") {
			popup.organizers.push(this);
		} else {
			this.role = "guest";
			popup.guests.push(this)
		}
  }

  getPersonInfo() {
		switch (role) {
			case "host":
			case "organizer":
				console.log(
					`The ${this.role} ${this.name} organizes ${this.popups} and can be contacted via ${this.email} or ${this.phoneNumber}.`
				);
			case "guest":
				console.log(
					`The ${this.role} ${this.name} organizes ${this.popups} and can be contacted via ${this.email}.`
				);
		}
  }

  static create({ firstName, lastName, email, phoneNumber, popups, role, id }) {
    return new Person(firstName, lastName, email, phoneNumber, popups, role, id);
  }
};
