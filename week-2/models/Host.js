module.exports = class Host {
  constructor(firstName, lastName, email, phoneNumber) {
    this.hostName = `${firstName} ${lastName}`;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  getHostInfo() {
    console.log(
      `The host '${this.hostName}' can be contacted via email (${this.email}) or phone number (${this.phoneNumber}).`
    );
  }

  attend(popup) {
    this.popup = popup.hostName;
    popup.hosts.push(this);
  }
};
