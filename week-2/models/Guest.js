module.exports = class Guest {
  constructor(firstName, lastName, email) {
    this.name = `${firstName} ${lastName}`
    this.email = email
    this.role = "guest"
  }

  attend(popup) {
    this.popup = popup.title
    popup.attendees.push(this)
  }

  getGuestInfo() {
    console.log(`The ${this.role} ${this.name} can be contacted via ${this.email}.`)
  }
}
