const mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema;

const popupSchema = new Schema(
  {
    category: {
      type: String,
      required: [true, "Category can't be blank."],
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      autopopulate: {
        maxDepth: 1,
      },
    },
    popupTitle: {
      type: String,
      required: [true, "Pop-up title can't be blank."],
    },
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
    // Pop-up main organizer
    popupOrganizer: {
      name: {
        group: {
          name: String,
        },
        user: {
          firstName: String,
          lastName: String,
        },
      },
    },
    // Pop-up co-organizers
    joinedOrganizers: [
      {
        user: {
          firstName: String,
          lastName: String,
          status: {
            type: String,
            enum: ['pending', 'accepted', 'declined', null],
            default: null,
          },
        },
        group: {
          name: String,
          status: {
            type: String,
            enum: ['pending', 'accepted', 'declined', null],
            default: null,
          },
        },
      },
    ],
    guests: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      autopopulate: {
        maxDepth: 1,
      },
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

popupSchema.plugin(require('mongoose-autopopulate'));

// const Popup = mongoose.model('Popup', popupSchema);

// module.exports = Popup;

// FIXME: overwriting error: 'Cannot overwrite `Popup` model once compiled.'
module.exports =
  mongoose.models && mongoose.models.Popup
    ? mongoose.models.Popup
    : mongoose.model('Popup', popupSchema);
