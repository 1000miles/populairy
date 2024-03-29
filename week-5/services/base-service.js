const Chalk = require("chalk");

module.exports = class Service {
  async add(item) {
    console.log(`[base-service.js add(item)`, Chalk.green(item));
    return this.model.create(item);
  }

  /* Faster than .create() and validates before inserting */
  async insertMany(items) {
    console.log(`[base-service.js] insertMany(items)`, Chalk.green(items));
    return this.model.insertMany(items);
  }

  async findAll() {
    console.log(`[base-service.js] findAll() this.model`, this.model);
    return this.model.find();
  }

  async findById(itemId) {
    console.log(`[base-service.js] findById(itemId):`, Chalk.green(itemId));
    return this.model.findById(itemId);
  }

  // Finds a matching document, updates it according to the update arg, passing any options,
  // and returns the found document (if any) to the callback.
  // findByIdAndUpdate(id, update, options)
  async findByIdAndUpdate(itemId, query, options) {
    console.log`[base-service.js] findByIdAndUpdate(query):`, Chalk.blue(query);
    return this.model.findByIdAndUpdate(itemId, query, options);
  }

  async findOneAndUpdate(itemId, query, options) {
    console.log(
      `[base-service.js] findOneAndUpdate(query):`,
      Chalk.blue(query),
    );
    return this.model.findOneAndUpdate({ _id: itemId }, query, options);
  }

  /** Updates all documents that match filter */
  async upateMany(query) {
    console.log(`[base-service.js] updateMany(query):`, Chalk.blue(query));
    return this.model.updateMany(query);
  }

  /* Shorthand for findOneAndDelete({ _id: id }) */
  async findByIdAndDelete(itemId) {
    console.log(
      `[base-service.js] findByIdAndDelete(itemId):`,
      Chalk.green(itemId),
    );
    return this.model.findByIdAndDelete(itemId._id);
  }

  /* Returns the document after deletion */
  async findOneAndDelete(item) {
    console.log(`[base-service.js] findOneAndDelete(item):`, Chalk.green(item));
    return this.model.findOneAndDelete({ _id: item });
  }

  // BE CAREFUL HERE!
  /* Deletes all documents that match conditions from collection */
  async deleteMany() {
    console.log(`[base-service.js deleteMany()`);
    return this.model.deleteMany();
  }
};
