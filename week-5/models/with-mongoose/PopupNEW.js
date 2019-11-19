const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const popupSchema = new Schema(
  {
    _id: mongoose.Types.ObjectId,
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    joinedEvent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      autopopulate: {
        maxDepth: 1,
      },
    },
    date: {
      type: {
        week_day: String,
        start_time: Date,
        end_time: Date,
      },
      required: true,
    },
    // Pop-up main organizer
    popupOrganizer: {
      type: {
        name: String,
        firstName: String,
        lastName: String,
      },
      required: true,
    },
    // Main event host
    eventHost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      autopopulate: {
        maxDepth: 1,
      },
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      name: String,
      ref: 'Event',
      autopopulate: {
        maxDepth: 1,
      },
    },
    // Pop-up co-organizers
    joinedOrganizers: [
      {
        user: {
          firstName: String,
          lastName: String,
          status: {
            type: String,
            enum: ['pending', 'accepted', 'declined', null],
            default: null,
          },
        },
        group: {
          name: String,
          status: {
            type: String,
            enum: ['pending', 'accepted', 'declined', null],
            default: null,
          },
        },
      },
    ],
    guests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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

// const Popup = mongoose.model('Popup', popupSchema);

// module.exports = Popup;

// FIXME: overwriting error: 'Cannot overwrite `Popup` model once compiled.'
module.exports =
  mongoose.models && mongoose.models.Popup
    ? mongoose.models.Popup
    : mongoose.model('Popup', popupSchema);
