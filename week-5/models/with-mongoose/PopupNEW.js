const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const popupSchema = new Schema(
	{
		_id: mongoose.Types.ObjectId,
		category: {
			type: String,
			// required: true
		},
		title: {
			type: String,
			// required: true
		},
		joinedEvent: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'Event',
			autopopulate: {
				maxDepth: 1,
			},
			// required: true
		},
		date: {
			type: String,
			// startDateTime: Date,
			// endDateTime: Date
		},
		host: {
			type: String,
			// required: true
		},
		space: {
			type: String,
			// required: true
		},
		hosts: [
			{
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'Person',
				autopopulate: {
					maxDepth: 1,
				},
			},
		],
		organizers: [
			{
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'Person',
				autopopulate: {
					maxDepth: 1,
				},
			},
		],
		guests: [
			{
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'Person',
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

popupSchema.plugin(require('mongoose-autopopulate'));

// const Popup = mongoose.model('Popup', popupSchema);

// module.exports = Popup;

// Fix overwriting error: 'Cannot overwrite `Popup` model once compiled.'
module.exports = (mongoose.models && mongoose.models.Popup
  ? mongoose.models.Popup
  : mongoose.model('Popup', popupSchema));