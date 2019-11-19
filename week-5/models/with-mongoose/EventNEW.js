const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    eventType: String,
    name: {
      type: String,
      required: true,
    },
    // TODO: Add address later
    location: {
      name: {
        type: String,
        required: true,
      },
      address: {
        additionalInfo: String,
        streetName: {
          type: String,
          required: true,
        },
        houseNumber: {
          type: String,
          required: true,
        },
        postCode: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
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
    // Host can be a group or a single user w/ first and last name
    eventHost: {
      name: String,
      firstName: String,
      lastName: String,
    },
    joinedHosts: [
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
    // required: true
    popups: [
      {
        type: mongoose.Schema.Types.ObjectId,
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
