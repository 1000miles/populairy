module.exports = class Guest {
  constructor(firstName, lastName, email) {
    this.guestName = `${firstName} ${lastName}`;
    this.email = email;
  }

  getGuestInfo() {
    console.log(
      `The host '${this.guestName}' can be contacted via ${this.email}.`
    );
  }

  attend(popup) {
    this.popup = popup.guestName;
    popup.guests.push(this);
  }
};
