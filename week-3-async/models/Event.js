const Chalk = require('chalk');

module.exports = class Event {
  constructor(type, name, location, date, host, popups = [], id) {
    this.type = type;
    this.name = name;
    this.location = location;
    this.date = date;
    this.host = host;
    this.popups = popups;
    this.id = id;
  }

  hasPopups(popup) {
    this.popups.push(popup.title);
    popup.popups.push(this.title);
  }

  getEventInfo() {
    console.log(
      `The event`,
      Chalk.bgMagenta.white(this.name),
      `is hosted by`,
      Chalk.blue(this.host),
      `and will take place on`,
      Chalk.green(this.date),
      `at`,
      Chalk.red(this.location),
      `.`,
      `It currently has ${this.popups.length} pop-up(s) listed.`
    );
  }

  static create({ type, name, location, date, host, popups, id }) {
    return new Event(type, name, location, date, host, popups, id);
  }
};
