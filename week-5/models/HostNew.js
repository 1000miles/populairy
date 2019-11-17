const mongoose = require('mongoose');

const hostSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    // name: {
    // 	firstName: String,
    // 	lastName: String
    // },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    organizers: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Popup',
        autopopulate: {
          maxDepth: 1,
        },
      },
    ],
    role: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

hostSchema.plugin(require('mongoose-autopopulate'));

const Host = mongoose.model('Host', hostSchema);

module.exports = Host;
