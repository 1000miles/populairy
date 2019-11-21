const BaseService = require('./base-service');
const Popup = require('../models/with-mongoose/PopupNEW');

class PopupService extends BaseService {
  model = Popup;
}

module.exports = new PopupService();
