const mongoose = require('mongoose');

// This is to generate objectId when inserting items
let ObjectId = mongoose.Types.ObjectId;

console.log(ObjectId);

const Event = require('../models/with-mongoose/EventNEW');
const Popup = require('../models/with-mongoose/PopupNew');
const User = require('../models/with-mongoose/UserNew');

const EventService = require('../services/event-service');
const PopupService = require('../services/popup-service');
const UserService = require('../services/popup-service');

let events = [];
let popups = [];
let users = [];

const seedUsers = async () => {
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
    // Events

    // Using await ensures the previous records are deleted
    await Event.deleteMany();

    const event1 = new Event({
      _id: ObjectId(),
      eventType: 'haircraft',
      name: 'OnHair Night',
      location: {
        name: 'Neukoelln Kunterbunt',
        address: {
          additionalInfo: '3rd floor left',
          streetName: 'Weserstr.',
          houseNumber: '234',
          postCode: '12345',
          city: 'Berlin',
          country: 'Germany',
        },
      },
      date: {
        week_day: 'Friday',
        start_time: new Date('2019-02-25T19:00:00'),
        end_time: new Date('2019-02-26T02:00:00'),
      },
      eventHost: {
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
        name: 'Astra Stuben',
        address: {
          additionalInfo: '2nd floor next to Cocktailbar',
          streetName: 'Rigaer Str.',
          houseNumber: '643',
          postCode: '12321',
          city: 'Berlin',
          country: 'Germany',
        },
      },
      date: {
        week_day: 'Friday',
        start_time: new Date('2019-03-10T19:00:00'),
        end_time: new Date('2019-03-13T05:00:00'),
      },
      eventHost: {
        name: 'Food Coop Berlin',
      },
    });

    await events.push(event1, event2);

    await Event.create(events);

    await events.map(event =>
      console.log(`CREATED Id: ${event._id} - Event name: ${event.name}`),
    );

    // Popups

    // Using await ensures the previous records are deleted
    await Popup.deleteMany();

    const barberShop = new Popup({
      _id: ObjectId(),
      category: 'barber',
      title: 'Barber Shop Vol. 11',
      joinedEvent: 'OnHair Night',
      date: {
        week_day: 'Friday',
        start_time: new Date('2019-02-25T19:00:00'),
        end_time: new Date('2019-02-26T02:00:00'),
      },
      popupOrganizer: {
        name: 'RooArr Pop-up Collective',
      },
      // FIXME: Ref to Event
      // location: {
      // 	name: 'Neukoelln Kunterbunt',
      // 	address: {
      // 		additionalInfo: '3rd floor left',
      // 		streetName: 'Weserstr.',
      // 		houseNumber: '234',
      // 		postCode: '12345',
      // 		city: 'Berlin',
      // 		country: 'Germany',
      // 	},
      // },
      joinedOrganizers: [
        {
          user: {
            firstName: 'Jakob',
            lastName: 'Grenzwertig',
            status: 'pending',
          },
          user: {
            firstName: 'Bertie',
            lastName: 'Bollwerk',
            status: 'accepted',
          },
        },
      ],
    });

    const barberShop2 = new Popup({
      _id: ObjectId(),
      category: 'barber',
      title: 'Pony and Clyde #23',
      joinedEvent: 'OnHair Night',
      date: {
        week_day: 'Friday',
        start_time: new Date('2019-02-25T19:00:00'),
        end_time: new Date('2019-02-26T02:00:00'),
      },
      popupOrganizer: {
        name: 'Bored Panda',
      },
      // FIXME: Ref to Event
      // location: {
      // 	name: 'Neukoelln Kunterbunt',
      // 	address: {
      // 		additionalInfo: '3rd floor left',
      // 		streetName: 'Weserstr.',
      // 		houseNumber: '234',
      // 		postCode: '12345',
      // 		city: 'Berlin',
      // 		country: 'Germany',
      // 	},
      // },
      joinedOrganizers: [
        {
          group: {
            name: 'Why not? & Co.',
            status: 'pending',
          },
        },
      ],
    });

    const foodCorner = new Popup({
      _id: ObjectId(),
      category: 'food',
      title: 'Food Corner',
      joinedEvent: 'Soup & Music',
      date: {
        week_day: 'Friday',
        start_time: new Date('2019-03-10T19:00:00'),
        end_time: new Date('2019-03-13T05:00:00'),
      },
      popupOrganizer: {
        name: 'KreuzKoelln Collective',
      },
      // FIXME: Ref to Event
      eventHost: {
        name: 'Food Coop Berlin',
      },
      // location: {
      // 	name: 'Astra Stuben',
      // 	address: {
      // 		additionalInfo: '2nd floor next to Cocktailbar',
      // 		streetName: 'Rigaer Str.',
      // 		houseNumber: '643',
      // 		postCode: '12321',
      // 		city: 'Berlin',
      // 		country: 'Germany',
      // 	},
      // },
      joinedOrganizers: [
        {
          group: {
            name: 'Glorious Fivee',
            status: 'accepted',
          },
        },
      ],
    });

    await popups.push(barberShop, barberShop2, foodCorner);

    await Popup.create(popups);

    await popups.map(popup =>
      console.log(`CREATED Id: ${popup._id} - Popup title: ${popup.title}`),
    );

    // Users

    await User.deleteMany();

    const user1 = new User({
      _id: ObjectId(),
      firstName: 'Riley',
      lastName: 'Deyin',
      email: 'rileyd@example.org',
    });
    const user2 = new User({
      _id: ObjectId(),
      firstName: 'Jami',
      lastName: 'Watson',
      email: 'jamiw@example.org',
      role: 'guest',
    });
    const user3 = new User({
      _id: ObjectId(),
      firstName: 'Jenny',
      lastName: 'Morgan',
      email: 'jenw@example.org',
    });
    const user4 = new User({
      _id: ObjectId(),
      firstName: 'Chris',
      lastName: 'Stuff',
      email: 'chris@example.org',
    });

    const host1 = new User({
      _id: ObjectId(),
      firstName: 'Mhisa',
      lastName: 'Yourg',
      email: 'mhisaw@example.org',
      role: 'host',
      phoneNumber: '+44 8484 34 22 55',
    });
    const host2 = new User({
      _id: ObjectId(),
      firstName: 'Nana',
      lastName: 'Nooo',
      email: 'nanoo@example.org',
      role: 'host',
      phoneNumber: '+44 12 54 87 33',
    });

    const organizer1 = new User({
      _id: ObjectId(),
      firstName: 'Xaya',
      lastName: 'Hey',
      email: 'Xaya@example.org',
      role: 'organizer',
      phoneNumber: '+49 056 78 34 21',
    });
    const organizer2 = new User({
      _id: ObjectId(),
      firstName: 'Fabienne',
      lastName: 'Lala',
      email: 'fabienne@example.org',
      role: 'organizer',
      phoneNumbeer: '+49 123 456 78 90',
    });

    await users.push(
      user1,
      user2,
      user3,
      user4,
      host1,
      host2,
      organizer1,
      organizer2,
    );

    await User.create(users);

    await users.map(user =>
      console.log(
        `CREATED Id: ${user._id} - user name: ${user.firstName} ${user.lastName} = ${user.role}`,
      ),
    );

    await mongoose.disconnect();
  } catch (err) {
    mongoose.disconnect();
    console.log(`ERROR while seeding DB with users`, err);
  }
};

seedUsers();
