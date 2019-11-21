module.exports = class User {
  constructor(
    firstName,
    lastName,
    email,
    role = 'guest',
    phoneNumber = '',
    popups = [],
    id,
  ) {
    this.name = `${firstName} ${lastName}`;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.popups = popups;
    this.id = id;
  }

  attend(popup) {
    this.popups.push(popup);

    if (this.role === 'host') {
      console.log(`This:`, this);
      popup.hosts.push(this.name);
    } else if (this.role === 'organizer') {
      popup.organizers.push(this);
    } else {
      this.role = 'guest';
      popup.guests.push(this);
    }
  }

  getUserInfo() {
    switch (role) {
      case 'host':
      case 'organizer':
        console.log(
          `The ${this.role} ${this.name} organizes ${this.popups} and can be contacted via ${this.email} or ${this.phoneNumber}.`,
        );
      case 'guest':
        console.log(
          `The ${this.role} ${this.name} organizes ${this.popups} and can be contacted via ${this.email}.`,
        );
    }
  }

  static create({ firstName, lastName, email, role, phoneNumber, popups, id }) {
    return new User(firstName, lastName, email, role, phoneNumber, popups, id);
  }
};
