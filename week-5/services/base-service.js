const Chalk = require('chalk');

module.exports = class Service {
  async findAll() {
    return this.model.find()
  }

	async add(item) {
		console.log(`Item:`, Chalk.red(item))
		console.log(`this`, Chalk.blue(item))
    return this.model.create(item)
  }

  async del(itemId) {
    return this.model.remove({ _id: itemId })
  }

  async find(itemId) {
    return this.model.findById(itemId)
  }
}
