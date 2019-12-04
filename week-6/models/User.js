const mongoose = require("mongoose").set("debug", true);
const Schema = mongoose.Schema;

/**
 * @property {string} firstName - The first name of a user.
 * @property {string} lastName - The last name of a user.
 * @property {string} lastName - The email of the user.
 *
 * Enum for roles
 * @property {string} role.guest - The default user role.
 * @property {string} role.host - The host of an event.
 * @property {string} role.organizer - The organizer of a pop-up.
 *
 * @property {array}  [events] - A user can attend multiple events and is referenced to the model Event.
 * @property {array}  [popups] - A user can attend multiple popups and is referenced to the model Pop-up
 * @property {string} [joinedHosting] - A user can join as an event co-host and needs to approval
 * @property {string} [joinedOrganizing] - A user can join as a pop-up co-organizer and needs to approval.
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
    role: {
      type: String,
      enum: ["guest", "host", "organizer", "user"],
      default: "user",
      select: true,
    },
    phoneNumber: String,
    events: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Event",
        autopopulate: {
					maxDepth: 1,
					// Show only name, date and id
          select: "name date"
        },
      },
    ],
    popups: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Popup",
        autopopulate: {
					maxDepth: 1,
					// Show only name, date, slots and id
          select: "name date slots"
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

/**
 * https://mongoosejs.com/docs/guide.html#methods
 * Assign attendEvent() to the "methods" object of userSchema
 */
// Note: Fat arrow for async func does not work here
userSchema.methods.attend = async function(user, event) {
  try {
    console.log(`[User.js] attend()`);

    // console.log(`this`, this) => this = user
    this.events.push(event);

    // `.push(this)` = specific push recognized by mongoose
    event.guests.push(this);

    await user.save();
    await event.save();
  } catch (err) {
    console.log(`[User.js] attend() ERROR`, err);
  }
};

// Note: Fat arrow for async func does not work here
userSchema.methods.visit = async function(user, popup) {
  try {
    console.log(`[User.js] visit()`);

    // console.log(`this`, this) => this = user
    this.popups.push(popup);
    popup.guests.push(this);

    await user.save();
    await popup.save();
  } catch (err) {
    console.log(`[User.js] visit() ERROR`, err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
