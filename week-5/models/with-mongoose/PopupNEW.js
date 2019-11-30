const mongoose = require("mongoose").set("debug", true);
const Schema = mongoose.Schema;

const popupSchema = new Schema(
  {
    category: {
      type: String,
    },
    popupTitle: {
      type: String,
    },
    description: String,
    slots: {
      date: {
        from: Date,
        to: Date,
      },
    },
    // Pop-up main organizer
    popupOrganizer: {
      name: String,
      email: String,
      websiteUrl: String,
    },
    // Pop-up co-organizers
    joinedOrganizers: [
      {
        name: String,
        email: String,
        status: {
          type: String,
          enum: ["pending", "accepted", "declined"],
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
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

popupSchema.plugin(require("mongoose-autopopulate"));

// const Popup = mongoose.model('Popup', popupSchema);

// module.exports = Popup;

// FIXME: overwriting error: 'Cannot overwrite `Popup` model once compiled.'
module.exports =
  mongoose.models && mongoose.models.Popup
    ? mongoose.models.Popup
    : mongoose.model("Popup", popupSchema);
