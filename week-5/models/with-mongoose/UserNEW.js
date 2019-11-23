const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      // required: true
    },
    lastName: {
      type: String,
      // required: true
    },
    email: String,
    role: {
      type: String,
      default: 'guest',
    },
    phoneNumber: String,
    events: [],
    popups: [
      {
        popupTitle: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'Popup',
          autopopulate: {
            maxDepth: 1,
          },
        },
      },
    ],
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
