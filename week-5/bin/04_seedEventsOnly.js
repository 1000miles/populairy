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
      _id: ObjectId(),
      eventType: 'haircraft',
      name: 'OnHair Night',
      location: {
        name: 'Neukoelln Kunterbunt',
        address: {
          streetName: 'Weserstr.',
          houseNumber: 234,
          postCode: 12345,
          city: 'Berlin',
          country: 'Germany',
        },
      },
      date: '2019-02-21T20:00',
      host: {
        name: 'X Event Collective',
      },
      joinedHosts: [
        {
          user: {
            firstName: 'Kelly',
            lastName: 'Hacky',
            status: 'accepted',
          },
        },
        {
          group: {
            name: 'Als gaebe es keinen Morgen',
            status: 'pending',
          },
        },
      ],
    });

    const event2 = new Event({
      _id: ObjectId(),
      eventType: 'food',
      name: 'Soup & Music',
      location: {
        name: 'Neukoelln Kunterbunt',
        address: {
          streetName: 'Weserstr.',
          houseNumber: 234,
          postCode: 12345,
          city: 'Berlin',
          country: 'Germany',
        },
      },
      date: '2019-02-21T20:00',
      host: {
        name: 'Food Coop Berlin',
      },
    });

    await events.push(event1, event2);

    await Event.create(events);

    events.map(event =>
      console.log(`CREATED Id: ${event._id} - Event name: ${event.name}`),
    );

    await mongoose.disconnect();
  } catch (err) {
    console.log(`ERROR while seeding DB`, err);
    mongoose.disconnect();
  }
};

seedEvents();
