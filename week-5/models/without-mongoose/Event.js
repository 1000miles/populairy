const Chalk = require('chalk');

module.exports = class Event {
  constructor(eventType, name, location, date, host, popups = [], id) {
    this.eventType = eventType;
    this.name = name;
    this.location = location;
    this.date = date;
    this.host = host;
    this.popups = popups;
    this.id = id;
  }

  hasPopups(popup) {
    let count = 0;

    if (popup) {
      this.popups.push(popup);
      count = count + 1;
      return;
    }
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
      `It currently has ${count} pop-up(s) listed.`,
    );
  }

  static create({ eventType, name, location, date, host, popups, id }) {
    return new Event(eventType, name, location, date, host, popups, id);
  }
};
