const mongoose = require("mongoose").set("debug", true);
const Schema = mongoose.Schema;

const popupSchema = new Schema({
  category: {
    type: String,
    required: [true, "Category can't be blank."],
  },
  popupTitle: {
    type: String,
    required: [true, "Pop-up title can't be blank."],
    minlength: [8, "Pop-up title should be min. 8 characters."],
    maxlength: [40, "Pop-up title should be max. 40 characters."],
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
  popupOrganizer: {
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
  // Pop-up co-organizers
  joinedOrganizers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    autopopulate: {
      maxDepth: 1,
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
});

popupSchema.plugin(require("mongoose-autopopulate"));

// const Popup = mongoose.model('Popup', popupSchema);

// module.exports = Popup;

// FIXME: overwriting error: 'Cannot overwrite `Popup` model once compiled.'
module.exports =
  mongoose.models && mongoose.models.Popup
    ? mongoose.models.Popup
    : mongoose.model("Popup", popupSchema);
