const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    eventType: String,
    eventName: {
      type: String,
      required: [true, "Event name can't be blank."],
    },
    location: {
      name: {
        type: String,
        required: [true, "Location can't be blank."],
      },
      address: {
        additionalInfo: String,
        streetName: {
          type: String,
          required: [true, "Street name can't be blank."],
        },
        houseNumber: {
          type: String,
          required: [true, "House number can't be blank."],
        },
        postCode: {
          type: String,
          required: [true, "Postcode can't be blank."],
        },
        city: {
          type: String,
          required: [true, "City can't be blank."],
        },
        country: {
          type: String,
          required: [true, "Country can't be blank."],
        },
      },
    },
    date: {
      type: {
        week_day: String,
        start_time: Date,
        end_time: Date,
      },
      required: [true, "Event date can't be blank."],
    },
    // Host can be a group or a single user w/ first and last name
    eventHost: {
      group: {
        name: String,
        websiteUrl: String,
        email: String,
      },
      user: {
        name: {
          firstName: String,
          lastName: String,
        },
        email: String,
      },
    },
    joinedHosts: [
      {
        user: {
          name: {
            firstName: String,
            lastName: String,
          },
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
