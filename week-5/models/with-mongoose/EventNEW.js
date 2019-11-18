const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
	{
		_id: mongoose.Types.ObjectId,
		eventType: String,
		name: {
			type: String,
			required: true,
		},
		// TODO: Add address later
		location: {
			type: String,
			required: true,
		},
		// TODO: Change to date range later
		date: {
			type: Date,
			required: true,
		},
		// Host can be a group or a single person w/ first and last name
		host: {
			name: String,
			firstName: String,
			lastName: String,
		},
		joinedHosts: [{
			person: {
				firstName: String,
        lastName: String,
        status: {
          type: String,
          enum: ['pending', 'accepted', 'declined'],
          default: 'none',
	      }
			},
      group: {
        name: String,
        status: {
          type: String,
          enum: ['pending', 'accepted', 'declined'],
          default: 'none',
        }
      }
    }],
		// required: true
		popups: [
			{
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'Popup',
				autopopulate: {
					maxDepth: 1,
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

eventSchema.plugin(require('mongoose-autopopulate'));

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
