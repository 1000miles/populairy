const BaseService = require('./base-service');
const GuestModel = require('./../../models/archived-old/Guest');

class GuestService extends BaseService {
  constructor() {
    super(
      GuestModel,
      `${__dirname}/../../database/archived/guest-database.json`,
    );
  }
}

module.exports = new GuestService();
