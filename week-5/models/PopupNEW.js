const mongoose = require('mongoose');

const popupSchema = mongoose.Schema(
  {
    category: {
      type: String,
      // required: true
    },
    title: {
      type: String,
      // required: true
    },
    joinedEvent: {
      type: String,
      // required: true
    },
    host: {
      type: String,
      // required: true
    },
    date: {
      type: String,
      // startDateTime: Date,
      // endDateTime: Date
    },
    attendees: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Guest',
        autopopulate: {
          maxDepth: 1,
        },
      },
    ],
    organizers: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Host',
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

popupSchema.plugin(require('mongoose-autopopulate'));

const Popup = mongoose.model('Popup', popupSchema);

module.exports = Popup;
