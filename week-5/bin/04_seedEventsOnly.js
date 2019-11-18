const mongoose = require('mongoose');
const Event = require('../models/with-mongoose/EventNEW');
// const EventService = require('../services/event-service');

let events = [];

const seedEvents = async () => {
  mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost/populairy', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(x => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`,
      );
    })
    .catch(err => {
      console.error('Error connecting to mongo', err);
    });

  try {
			// Using await ensures the previous records are deleted
			await Event.deleteMany();

			const event1 = new Event({
				eventType: 'haircraft',
				name: 'OnHair Night',
				location: 'Neukoelln Kunterbunt',
				date: '2019-02-21T20:00',
				host: 'X Event Collective',
			});

			const event2 = new Event({
				eventType: 'food',
				name: 'Soup & Music',
				location: 'Neukoelln Kunterbunt',
				date: '2019-02-21T20:00',
				host: 'Food Coop Berlin',
			});

			await events.push(event1, event2);

			await Event.create(events);

			events.map(event =>
				console.log(
					`CREATED Id: ${event._id} - Event name: ${event.name}`,
				),
			);

			await mongoose.disconnect();
		} catch (err) {
		console.log(`ERROR while seeding DB`, err);
		mongoose.disconnect();
  }
}

seedEvents();


