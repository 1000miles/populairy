const Chalk = require("chalk");

module.exports = class Popup {
  constructor(category, title, host, space, date) {
    this.category = category;
    this.title = title;
    this.space = space;
    this.host = host;
    this.date = date;
    this.guests = [];
    this.hosts = [];
  }

  getPopupInfo() {
    console.log(
      `The pop-up event`,
      Chalk.bgMagenta.white(this.title),
      `is hosted by`,
      Chalk.blue(this.host),
      `and will take place on`,
      Chalk.green(this.date),
      `at`,
      Chalk.red(this.space),
      `.`,
      `It currently has ${this.guests.length} guests attending.`
    );
  }

  printAttendeesNames() {
    this.guests.forEach(printGuest);
  }
};

printGuest = guest => console.log(guest.firstName, guest.lastName, guest.email);
