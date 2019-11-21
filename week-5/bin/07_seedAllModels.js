const mongoose = require('mongoose');

// This is to generate ObjectId() when inserting items
const ObjectId = mongoose.Types.ObjectId;

const Event = require('../models/with-mongoose/EventNEW');
const Popup = require('../models/with-mongoose/PopupNEW');
const User = require('../models/with-mongoose/UserNEW');

// const EventService = require('../services/event-service');
// const PopupService = require('../services/popup-service');
// const UserService = require('../services/popup-service');

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
      eventName: 'OnHair Night',
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
        firstName: 'Jaunita',
        lastName: 'Hicks',
        email: 'jhicks@example.org',
      },
      joinedHosts: [
        {
          user: {
            firstName: 'Kelly',
            lastName: 'Hacky',
            email: 'khacky@example.org',
            status: 'accepted',
          },
        },
        {
          group: {
            name: 'Als gaebe es keinen Morgen',
            email: 'agekm@example.org',
            status: 'pending',
          },
        },
      ],
      popups: [
        {
          title: 'Barber Shop Vol. 11',
          slots: {
            day: {
              from: 'Friday',
              to: 'Friday',
            },
            time: {
              from: '10:00 AM',
              to: '6:00 PM',
            },
          },
        },
        {
          title: 'Pony annd Clyde #23',
          slots: {
            day: {
              from: 'Friday',
              to: 'Friday',
            },
            time: {
              from: '11:00 AM',
              to: '9:00 PM',
            },
          },
        },
        {
          title: 'Food around the clock',
          slots: {
            day: {
              from: 'Friday',
              to: 'Friday',
            },
            time: {
              from: '1:00 PM',
              to: '8:00 PM',
            },
          },
        },
      ],
      guests: [
        {
          firstName: 'Rami',
          lastName: 'Muller',
          email: 'rami@example.org',
        },
        {
          firstName: 'Henriette',
          lastName: 'Willms',
          email: 'henriette@example.org',
        },
        {
          firstName: 'Gordon',
          lastName: 'Subway',
          email: 'gordon@example.org',
        },
      ],
    });

    const event2 = new Event({
      _id: ObjectId(),
      eventType: 'food',
      eventName: 'Soup & Music',
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
        group: {
          name: 'Food Coop Berlin',
          email: 'foodcoopsers@example.org',
          websiteUrl: 'https://www.fooodcoopsers.org',
        },
      },
      joinedHosts: [
        {
          user: {
            firstName: 'Louisa',
            lastName: 'Wiza',
            email: 'louisa@example.org',
            status: 'accepted',
          },
        },
      ],
      popups: [
        {
          title: 'Barber Shop Vol. 11',
          slots: {
            day: {
              from: 'Friday',
              to: 'Friday',
            },
            time: {
              from: '12:00 AM',
              to: '6:00 PM',
            },
          },
        },
        {
          title: 'Food around the clock',
          slots: {
            day: {
              from: 'Friday',
              to: 'Friday',
            },
            time: {
              from: '9:00 AM',
              to: '10:00 PM',
            },
          },
        },
      ],
      guests: [
        {
          firstName: 'Wyatt',
          lastName: 'Thurman',
          email: 'Wyatt@example.org',
        },
        {
          firstName: 'Ruth',
          lastName: 'Kassulke',
          email: 'ruth@example.org',
        },
      ],
    });

    await events.push(event1, event2);

    await Event.create(events);

    await events.map(event =>
      console.log(`CREATED Id: ${event._id} - Event name: ${event.eventName}`),
    );

    // Popups

    // Using await ensures the previous records are deleted
    await Popup.deleteMany();

    const barberShop = new Popup({
      _id: ObjectId(),
      category: 'barber',
      popupTitle: 'Barber Shop Vol. 11',
      popupOrganizer: {
        group: {
          name: 'RooArr Pop-up Collective',
        },
      },
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
      popupTitle: 'Pony and Clyde #23',
      popupOrganizer: {
        group: {
          name: 'Board Panda',
        },
      },
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
      popupTitle: 'Food around the clock',
      popupOrganizer: {
        firstName: 'Colin',
        lastName: 'Brenston',
      },
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
      console.log(
        `CREATED Id: ${popup._id} - Popup title: ${popup.popupTitle}`,
      ),
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
        `CREATED Id: ${user._id} - user name: ${user.firstName} ${user.lastName} (${user.role})`,
      ),
    );

    await mongoose.disconnect();
  } catch (err) {
    mongoose.disconnect();
    console.log(`ERROR while seeding DB with users`, err);
  }
};

seedUsers();
