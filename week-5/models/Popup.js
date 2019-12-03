const mongoose = require("mongoose").set("debug", true);
const Schema = mongoose.Schema;

/**
 * @property {String} event - An event is the main host of the current pop-up.
 * @property {String} events - A list of events that a pop-up has joined (history)
 * @property {String} slots - Slots are the available time ranges for a pop-up to be assigned to. A slot is always associated with the same date as an event that a pop-up joins.
 */

const popupSchema = new Schema({
  category: {
    type: String,
    required: [true, "Category can't be blank."],
  },
  name: {
    type: String,
    required: [true, "Pop-up name can't be blank."],
    minlength: [8, "Pop-up name should be min. 8 characters."],
    maxlength: [40, "Pop-up name should be max. 40 characters."],
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 250,
    required: [true, "Pop-up description can't be blank."],
  },
  slots: {
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
  },
  // Pop-up main organizer
  organizer: {
    name: {
      type: String,
      required: [true, "Pop-up organizer name can't be blank."],
    },
    email: {
      type: String,
      required: [true, "Email can't be blank."],
    },
    websiteUrl: {
      type: String,
    },
  },
  guests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
  // List of all events that this pop-up has joined
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
});

popupSchema.plugin(require("mongoose-autopopulate"));

popupSchema.methods.register = async function(event, popup) {
  try {
    console.log(`[Popup.js] register()`);

    this.events.push(event);
    event.popups.push(this);

    await popup.save();
    await event.save();
  } catch (err) {
    console.log(`[User.js] register() ERROR`, err);
  }
};

const Popup = mongoose.model("Popup", popupSchema);

module.exports = Popup;
