module.exports = class Guest {
  constructor(firstName, lastName, email, popups = [], id) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.name = `${firstName} ${lastName}`;
    this.email = email;
    this.popups = popups;
    this.role = 'guest';
    this.id = id;
  }

  attend(popup) {
    this.popups.push(popup.title);
    popup.attendees.push(this);
  }

  getGuestInfo() {
    console.log(
      `The ${this.role} ${this.name} attends ${this.popups} and can be contacted via ${this.email}.`
    );
  }

  static create({ firstName, lastName, email, popups, id }) {
    return new Guest(firstName, lastName, email, popups, id);
  }
};
