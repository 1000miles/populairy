const BaseService = require("./base-service");
const HostModel = require("./../../models/archived-old/Host");

class HostService extends BaseService {
  constructor() {
    super(HostModel, `${__dirname}/../../database/archived/host-database.json`);
  }
}

module.exports = new HostService();
