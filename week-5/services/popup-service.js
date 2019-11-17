const BaseService = require('./base-service');
const PopupModel = require('../models/Popup');

class PopupService extends BaseService {
  constructor() {
    super(PopupModel, `${__dirname}/../database/popup-database.json`);
  }
}

module.exports = new PopupService();
