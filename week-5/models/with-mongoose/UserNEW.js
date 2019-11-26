const mongoose = require('mongoose').set('debug', true);
const Schema = mongoose.Schema;

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
      required: [true, "Email can't be blank."],
    },
    role: {
      type: String,
      default: 'guest',
    },
    phoneNumber: String,
    events: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Event',
        autopopulate: {
          maxDepth: 1,
        },
      },
    ],
    popups: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Popup',
        autopopulate: {
          maxDepth: 1,
        },
      },
    ],
    eventCohosting: [{
			status: {
        type: String,
        enum: ['pending', 'accepted', 'declined', null],
        default: null,
      },
		}],
		popupCoorganizing: [{
			status: {
        type: String,
        enum: ['pending', 'accepted', 'declined', null],
        default: null,
      },
		}],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

userSchema.plugin(require('mongoose-autopopulate'));

const User = mongoose.model('User', userSchema);

module.exports = User;
