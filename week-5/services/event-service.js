const BaseService = require('./base-service');
const Event = require('../models/with-mongoose/EventNEW');

/**
 * @param {string} eventType - category of an event and can differ from pop-up's category
 * @param {string} eventName - name of the event and referenced to one or more pop-ups
 * @param {Object} location - place where one or multiple pop-ups happen and is referenced to them
 * @param {Object} date - day and time range and referenced to one or more pop-ups
 * @param {*} eventHost - main event host
 * @param {array{}} joinedHosts - co-hosts of the main host and can be a group or single persons
 * @param {array{}} popups - an event acts as a satellite and has one or more pop-ups joining
 * @param {array{}} guests - an event has one or more guests attending
 */

class EventService extends BaseService {
  model = Event;

  async sendInvitation(obj) {
    const messagePopup = `Hi ${obj}, we love what you are doing and would like to invite you to join our next event '${this.eventName}' along with other great pop-ups on ${this.date}.`;

    if (obj === popup) {
      console.log(`DEBUG [event-service]`, popup);

      switch (type) {
        case 'group':
          obj = popup.popupOrganizer.group.name;
          break;
        case 'single person':
          obj = `${popup.popupOrganizer.firstName} ${popup.popupOrganizer.lastName}`;
          break;
      }

      obj.save();

      await send(messagePopup);
    }
  }
}

module.exports = new EventService();
