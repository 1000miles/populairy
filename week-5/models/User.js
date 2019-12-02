const mongoose = require("mongoose").set("debug", true);
const Schema = mongoose.Schema;

/**
 * @property {string} firstName - The first name of a user.
 * @property {string} lastName - The last name of a user.
 * @enum {string} role - The role of a user.
 * @property {string} role.guest - The default user role.
 * @property {string} role.host - The host of an event.
 * @property {string} role.organizer - The organizer of a pop-up.
 */

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name can't be blank."],
    },
    lastName: {
      type: String,
      required: [true, "Last name can't be blank."],
    },
    email: {
      type: String,
      required: [true, "Email can't be blank."],
    },
    isMain: {
      // Main event host
      host: {
        type: Boolean,
        default: false,
      },
      // Main pop-up organizer
      organizer: {
        type: Boolean,
        default: false,
      },
    },
    role: {
      type: String,
      enum: ["guest", "host", "organizer"],
      default: "guest",
      select: true,
    },
    phoneNumber: String,
    events: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Event",
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
    joinedHosting: {
      confirmed: {
        type: Boolean,
        default: false,
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected", null],
        default: null,
      },
      joinedDate: {
        type: Date,
        default: null,
      },
    },
    joinedOrganizing: {
      confirmed: {
        type: Boolean,
        default: false,
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected", null],
        default: null,
      },
      joinedDate: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

userSchema.plugin(require("mongoose-autopopulate"));

const User = mongoose.model("User", userSchema);

module.exports = User;
