const mongoose = require('mongoose');

const guestSchema = mongoose.Schema(
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
    popups: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Popup',
        autopopulate: {
          maxDepth: 1,
        },
      },
    ],
    role: String,
    attendees: [
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

guestSchema.plugin(require('mongoose-autopopulate'));

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;
