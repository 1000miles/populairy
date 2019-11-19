const Chalk = require('chalk');

module.exports = class Popup {
  constructor(
    category,
    title,
    joinedEvent,
    date,
    host,
    space,
    hosts = [],
    organizers = [],
    guests = [],
    id,
  ) {
    this.category = category;
    this.title = title;
    this.joinedEvent = joinedEvent;
    this.date = date;
    this.host = host;
    this.space = space;
    this.hosts = hosts;
    this.organizers = organizers;
    this.guests = guests;
    this.id = id;
  }

  belongsTo(event) {
    this.joinedEvent = event.name;
  }

  getPopupInfo() {
    console.log(
      `The pop-up`,
      Chalk.bgMagenta.white(this.title),
      `belongs to the satellite event`,
      Chalk.magenta(this.joinedEvent),
      `is hosted by`,
      Chalk.green(this.hosts),
      `and is organized by`,
      Chalk.blue(this.organizers),
      `. It has ${this.guests.length} guest(s).`,
    );
  }

  static create({
    category,
    title,
    joinedEvent,
    date,
    host,
    space,
    hosts,
    organizers,
    guests,
    id,
  }) {
    return new Popup(
      category,
      title,
      joinedEvent,
      date,
      host,
      space,
      hosts,
      organizers,
      guests,
      id,
    );
  }
};
