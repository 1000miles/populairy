const Chalk = require('chalk');

module.exports = class Service {
  async findAll() {
    console.log(`[base-service findAll()] DEBUG this.model`, this.model);
    return this.model.find();
  }

  async findById(itemId) {
    console.log(`[base-service findById()] DEBUG itemId`, Chalk.green(itemId));
    return this.model.findById(itemId);
  }

  async findOneAndUpdate(query) {
    console.log(`DEBUG query`, Chalk.blue(query));
    return this.model.findOneAndUpdate(query);
  }

  async add(item) {
    console.log(`[base-service DEBUG item`, Chalk.green(item));
    return this.model.create(item);
  }

  /* Faster than .create() and validates before inserting */
  async insertMany(items) {
    console.log(`DEBUG items`, Chalk.green(items));
    return this.model.insertMany(items);
  }

  /** Updates all documents that match filter */
  async upateMany(query) {
    console.log(`DEBUG query`, Chalk.blue(query));
    return this.model.updateMany(query);
  }

  /* Shorthand for findOneAndDelete({ _id: id }) */
  async findByIdAndDelete(itemId) {
    console.log(`DEBUG item`, Chalk.green(itemId));
    return this.model.findByIdAndDelete(itemId._id);
  }

  async findOneAndDelete(query) {
    console.log(`DEBUG query`, Chalk.blue(query));
    return this.model.findOneAndDelete(query);
  }

  /* Delete one item */
  async deleteOne(item) {
    console.log(`DEBUG item`, Chalk.green(item));
    return this.model.deleteOne(item);
  }

  /* Deletes all documents that match conditions from collection */
  async deleteMany() {
    return this.model.deleteMany();
  }
};
