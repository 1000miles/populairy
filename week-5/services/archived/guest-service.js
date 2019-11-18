const BaseService = require('./base-service');
const GuestModel = require('../models/Guest');

class GuestService extends BaseService {
  constructor() {
    super(GuestModel, `${__dirname}/../database/guest-database.json`);
  }
}

module.exports = new GuestService();
