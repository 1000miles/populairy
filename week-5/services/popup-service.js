const BaseService = require("./base-service");
const Popup = require("../models/Popup");

class PopupService extends BaseService {
  model = Popup;
}

module.exports = new PopupService();
