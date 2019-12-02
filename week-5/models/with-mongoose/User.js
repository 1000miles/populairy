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
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    role: {
      type: String,
      enum: ["guest", "host", "organizer"],
      default: "guest",
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
