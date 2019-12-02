const mongoose = require("mongoose").set("debug", true);

// Validations happen in the /controllers/eventController
const eventSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      required: [true, "Event type can't be blank."],
    },
    eventName: {
      type: String,
      required: [true, "Event name can't be blank."],
      minlength: [8, "Event name should be min. 8 characters long"],
      maxlength: [40, "Event name should be max. 40 characters long"],
    },
    location: {
      name: {
        type: String,
        required: [true, "Location name can't be blank."],
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
          type: Number,
          required: [true, "Post code can't be blank."],
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
      from: {
        type: Date,
        required: [true, "From date can't be blank."],
      },
      to: {
        type: Date,
        required: [true, "To date can't be blank."],
      },
    },
    // Host can be a group or a single user w/ first and last name
    eventHost: {
      name: {
        type: String,
        required: [true, "Host name can't be blank."],
      },
      websiteUrl: {
        type: String,
      },
      email: {
        type: String,
        required: [true, "Email can't be blank."],
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
