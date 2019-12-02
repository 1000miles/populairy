const mongoose = require("mongoose").set("debug", true);

// Validations happen in the /controllers/eventController
const eventSchema = new mongoose.Schema(
  {
    eventType: String,
    eventName: {
      type: String,
    },
    location: {
      name: {
        type: String,
      },
      address: {
        additionalInfo: String,
        streetName: {
          type: String,
        },
        houseNumber: {
          type: String,
        },
        postCode: {
          type: Number,
        },
        city: {
          type: String,
        },
        country: {
          type: String,
        },
      },
    },
    date: {
			from: Date,
			to: Date
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
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        autopopulate: {
          maxDepth: 1,
        },
      },
    ],
    popups: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Popup",
        autopopulate: {
          maxDepth: 1,
        },
      },
    ],
    guests: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        autopopulate: {
          maxDepth: 1,
        },
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

eventSchema.plugin(require("mongoose-autopopulate"));

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
