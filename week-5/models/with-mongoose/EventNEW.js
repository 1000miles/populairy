const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    eventType: String,
    eventName: {
      type: String,
      required: true,
    },
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
      type: {
        group: {
          name: String,
          websiteUrl: String,
        },
        firstName: String,
        lastName: String,
      },
      required: true,
    },
    joinedHosts: [
      {
        user: {
          firstName: String,
          lastName: String,
          email: String,
          status: {
            type: String,
            enum: ['pending', 'accepted', 'declined', null],
            default: null,
          },
        },
        group: {
          name: String,
          email: String,
          status: {
            type: String,
            enum: ['pending', 'accepted', 'declined', null],
            default: null,
          },
        },
      },
    ],
    popups: [
      {
        title: String,
        slots: {
          day: {
            from: String,
            to: String,
          },
          time: {
            from: String,
            to: String,
          },
        },
      },
    ],
    guests: [
      {
        firstName: String,
        lastName: String,
        email: String,
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
