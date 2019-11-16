const BaseService = require('./base-service');
const HostModel = require('../models/Host');

class HostService extends BaseService {
  constructor() {
    super(HostModel, `${__dirname}/../database/host-database.json`);
  }
}

module.exports = new HostService();
