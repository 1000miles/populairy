module.exports = class Host {
  constructor(firstName, lastName, email, phoneNumber) {
    this.name = `${firstName} ${lastName}`
    this.email = email
    this.phoneNumber = phoneNumber
    this.role = "host"
  }

  attend(popup) {
    this.popup = popup.title
    popup.attendees.push(this)
  }

  getHostInfo() {
    console.log(
      `The ${this.role} ${this.name} can be contacted via ${this.email} or ${this.phoneNumber}.`
    )
  }
}
