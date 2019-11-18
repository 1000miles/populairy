const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    eventType: String,
    name: {
      type: String,
      // required: true
    },
    // TODO: Add address latr
    location: {
      type: String,
      // required: true
    },
    date: String,
    host: {
      type: String,
      // required: true
    },
    popups: [
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

eventSchema.plugin(require('mongoose-autopopulate'));

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
