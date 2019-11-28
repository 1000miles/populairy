const BaseService = require("./base-service");
const PopupModel = require("./../../models/archived-old/Popup");

class PopupService extends BaseService {
  constructor() {
    super(
      PopupModel,
      `${__dirname}/../../database/archived/popup-database.json`,
    );
  }
}

module.exports = new PopupService();
