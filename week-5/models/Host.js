module.exports = class Host {
  constructor(firstName, lastName, email, phoneNumber, popups = [], id) {
    this.name = `${firstName} ${lastName}`;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.popups = popups;
    this.role = 'host';
    this.id = id;
  }

  attend(popup) {
    this.popups.push(popup.title);
    popup.organizers.push(this);
  }

  getHostInfo() {
    console.log(
      `The ${this.role} ${this.name} organizes ${this.popups} and can be contacted via ${this.email} or ${this.phoneNumber}.`,
    );
  }

  static create({ firstName, lastName, email, phoneNumber, popups, id }) {
    return new Host(firstName, lastName, email, phoneNumber, popups, id);
  }
};
