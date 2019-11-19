const Chalk = require('chalk');

module.exports = class Popup {
  constructor(
    category,
    title,
    joinedEvent,
    host,
    date,
    space,
    hosts = [],
    guests = [],
    organizers = [],
    id,
  ) {
    this.category = category;
    this.title = title;
    this.joinedEvent = joinedEvent;
    this.host = host;
    this.space = space;
    this.date = date;
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
      `and is organized by`,
      Chalk.blue(this.host),
      `. It has ${this.attendees.length} attendee(s).`,
    );
  }

  static create({
    category,
    title,
    joinedEvent,
    host,
    date,
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
      host,
      date,
      space,
      hosts,
      organizers,
      guests,
      id,
    );
  }
};
