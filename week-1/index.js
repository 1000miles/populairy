// Week 1 Homework

Host = class {
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
}

host = new Host("Jamy", "Doe", "jamy@example.org", "+49123456789");

host.getHostInfo();
// The host 'Jamy Doe' can be contacted via email (jamy@example.org) or phone number (+49123456789).

Guest = class {
	constructor(firstName, lastName, email) {
		this.firstName = firstName
		this.lastName = lastName
		this.email = email
	}

	getGuestInfo() {
		console.log(`The guest '${this.firstName} ${this.lastName}' can be contacted via email (${this.email}).`)
	}

	attend(popup) {
		this.popup = popup
		popup.guests.push(this);
  }
}

guest1 = new Guest('Kim', 'Doe', 'kim@example.org');
guest2 = new Guest('Freddy', 'Whatever', 'freddy@example.org');

guest1.getGuestInfo(); // The guest 'Kim Doe' can be contacted via email (kim@example.org).
guest2.getGuestInfo(); // The guest 'Freddy Whatever' can be contacted via email (freddy@example.org).

Popup = class {
	constructor(category, title, space, date) {
		this.category = category
		this.title = title
		this.space = space
		this.date = date
		this.guests = []
	}

	getPopupInfo() {
		console.log(`The event '${this.title}' will take place on ${this.date} at '${this.space}' and has currently ${this.guests.length} guests attending.`)
	}

	printGuestNames() {
		this.guests.map(printName);
	}
}

printName = guest => console.log(guest.firstName, guest.lastName, guest.email);

barberShop = new Popup("barber", "Barber Shop Vol. 10", "X Space", new Date("2019-12-30T19:00:00"));
// The event 'Barber Shop Vol. 10' will take place on Mon Dec 30 2019 19:00:00 GMT+0100 (Central European Standard Time) at 'X Space' and has currently 2 guests attending.

guest1.attend(barberShop);
guest2.attend(barberShop);

barberShop.printGuestNames()
barberShop.getPopupInfo();