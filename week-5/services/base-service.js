const Chalk = require('chalk');

module.exports = class Service {
	async findById(itemId) {
		console.log(`DEBUG itemId`, Chalk.green(itemId));
		return this.model.findById(itemId);
	}

	async findAll(item) {
		console.log(`DEBUG item`, Chalk.blue(item));
		return this.model.find(item);
	}

	async add(item) {
		console.log(`DEBUG item`, Chalk.green(item));
		return this.model.create(item);
	}

	/* Faster than .create() and validates before inserting */
	async insertMany(items) {
		console.log(`DEBUG items`, Chalk.green(items));
		this.model.insertMany(items);
	}

	async findOneAndUpdate(query) {
		console.log(`DEBUG query`, Chalk.blue(query));
		return this.model.findOneAndUpdate(query);
	}

	/** Updates all documents that match filter */
	async upateMany(query) {
		console.log(`DEBUG query`, Chalk.blue(query));
		this.model.updateMany(query);
	}

	/* Shorthand for findOneAndDelete({ _id: id }) */
	async findByIdAndDelete(itemId) {
		console.log(`DEBUG item`, Chalk.green(itemId));
		return this.model.findByIdAandDelete(itemId._id);
	}

	async findOneAndDelete(query) {
		console.log(`DEBUG query`, Chalk.blue(query));
		return this.model.findOneAndDelete(query);
	}

	/* Delete one item */
	async deleteOne(item) {
		console.log(`DEBUG item`, Chalk.green(item));
		this.model.deleteOne(item);
	}

	/* Deletes all documents that match conditions from collection */
	async deleteMany() {
		this.model.deleteMany();
	}
};
