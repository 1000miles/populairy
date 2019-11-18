const mongoose = require('mongoose');

const personSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      // required: true
    },
    lastName: {
      type: String,
      // required: true
    },
		email: String,
		role: String,
		phoneNumber: String,
    popups: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Popup',
        autopopulate: {
          maxDepth: 1,
        },
      },
    ],
		hosts: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Popup',
        autopopulate: {
          maxDepth: 1,
        },
      },
    ],
		organizers: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Popup',
        autopopulate: {
          maxDepth: 1,
        },
      },
    ],
    guests: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Popup',
        autopopulate: {
          maxDepth: 1,
        },
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);


personSchema.plugin(require('mongoose-autopopulate'));

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
