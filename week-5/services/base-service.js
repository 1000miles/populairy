const Chalk = require('chalk');

module.exports = class Service {
  async add(item) {
    console.log(`[base-service.js add()`, Chalk.green(item));
    return this.model.create(item);
  }

  /* Faster than .create() and validates before inserting */
  async insertMany(items) {
    console.log(`[base-service.js insertMany()`, Chalk.green(items));
    return this.model.insertMany(items);
  }

  async findAll() {
    console.log(`[base-service.js findAll()] this.model`, this.model);
    return this.model.find();
  }

  async findById(itemId) {
    console.log(`[base-service.js findById()]: itemId`, Chalk.green(itemId));
    return this.model.findById(itemId);
  }

  async updateOne(query) {
    console.log(`DEBUG query`, Chalk.blue(query));
    return this.model.updateOne(query);
  }

  /** Updates all documents that match filter */
  async upateMany(query) {
    console.log(`[base-service.js updateMany()`, Chalk.blue(query));
    return this.model.updateMany(query);
  }

  /* Shorthand for findOneAndDelete({ _id: id }) */
  async findByIdAndDelete(itemId) {
    console.log(`[base-service.js findAndDeleteMany()`, Chalk.green(itemId));
    return this.model.findByIdAndDelete(itemId._id);
  }

  /* Delete one item */
  async deleteOne(item) {
    console.log(`deleteOne():`, Chalk.green(item));
    return this.model.deleteOne({ _id: item });
  }

  // BE CAREFUL HERE!
  /* Deletes all documents that match conditions from collection */
  async deleteMany() {
    console.log(`[base-service.js deleteMany()`);
    return this.model.deleteMany();
  }
};
