const mongoose = require("mongoose");
const moment = require("moment");

// This is to generate ObjectId() when inserting items
const ObjectId = mongoose.Types.ObjectId;

const Event = require("../models/with-mongoose/EventNEW");
const Popup = require("../models/with-mongoose/PopupNEW");
const User = require("../models/with-mongoose/UserNEW");

const EventService = require("../services/event-service");
const PopupService = require("../services/popup-service");
const UserService = require("../services/user-service");

let events = [];
let popups = [];
let users = [];

const seedUsers = async () => {
  mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost/populairy", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(x => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`,
      );
    })
    .catch(err => {
      console.error("Error connecting to mongo", err);
    });

  try {
    // Events

    // Using await ensures the previous records are deleted
    await Event.deleteMany();

    const event1 = new Event({
      eventType: "haircraft",
      eventName: "OnHair Night 2",
      location: {
        name: "Neukoelln Kunterbunt",
        address: {
          additionalInfo: "3rd floor left",
          streetName: "Weserstr.",
          houseNumber: "234",
          postCode: "12345",
          city: "Berlin",
          country: "Germany",
        },
      },
      date: {
        week_day: {
          from: "Friday",
          to: "Friday",
        },
        start_datetime: "Dec 29, 2019, 11:00 AM",
        end_datetime: "Dec 29, 2019, 11:00 PM",
      },
      eventHost: {
        user: {
          name: {
            firstName: "Jaunita",
            lastName: "Hicks",
          },
          email: "jaunita@example.org",
        },
      },
      joinedHosts: [],
      popups: [],
      guests: [],
    });

    const event2 = new Event({
      eventType: "food",
      eventName: "Soup & Music",
      location: {
        name: "Astra Stuben",
        address: {
          additionalInfo: "2nd floor next to Cocktailbar",
          streetName: "Rigaer Str.",
          houseNumber: "643",
          postCode: "12321",
          city: "Berlin",
          country: "Germany",
        },
      },
      date: {
        week_day: {
          from: "Thursday",
          to: "Thursday",
        },
        start_datetime: "May 28, 2020, 10:00 AM",
        end_datetime: "May 28, 2020, 10:00 PM",
      },
      eventHost: {
        group: {
          name: "Food Coop Berlin",
          websiteUrl: "https://www.fooodcoopsers.org",
          email: "foodcoopsers@example.org",
        },
      },
      joinedHosts: [],
      popups: [],
      guests: [],
    });

    await events.push(event1, event2);

    await Event.create(events);

    await events.map(event =>
      console.log(`CREATED Id: ${event._id} - Event name: ${event.eventName}`),
    );

    // Popups

    // Using await ensures the previous records are deleted
    await Popup.deleteMany();

    const barberShop1 = new Popup({
      category: "barber",
      popupTitle: "Barber Shop Vol. 11",
      slots: {
        week_day: "Friday",
        from: "Dec 29, 2019, 11:00 AM",
        to: "Dec 29, 2019, 6:00 PM",
      },
      popupOrganizer: {
        name: {
          group: {
            name: "RooArr Pop-up Collective",
          },
        },
      },
      joinedOrganizers: [
        {
          user: {
            firstName: "Jakob",
            lastName: "Grenzwertig",
            status: "pending",
          },
          user: {
            firstName: "Bertie",
            lastName: "Bollwerk",
            status: "accepted",
          },
        },
      ],
    });

    const barberShop2 = new Popup({
      category: "barber",
      popupTitle: "Pony and Clyde #23",
      slots: {
        day: {
          from: "Friday",
          to: "Friday",
        },
        time: {
          from: "May 29, 2019, 11:00 AM",
          to: "May 29, 2019, 7:00 PM",
        },
      },
      popupOrganizer: {
        name: {
          group: {
            name: "Board Panda",
          },
        },
      },
      joinedOrganizers: [],
    });

    const foodCorner1 = new Popup({
      category: "food",
      popupTitle: "Food around the clock",
      slots: {
        day: {
          from: "Thursday",
          to: "Thursday",
        },
        time: {
          from: "May 28, 2020, 12:00 PM",
          to: "May 28, 2020, 10:00 PM",
        },
      },
      popupOrganizer: {
        name: {
          user: {
            firstName: "Colin",
            lastName: "Brenston",
          },
        },
      },
      joinedOrganizers: [],
    });

    await popups.push(barberShop1, barberShop2, foodCorner1);

    await Popup.create(popups);

    await popups.map(popup =>
      console.log(
        `CREATED Id: ${popup._id} - Popup title: ${popup.popupTitle}`,
      ),
    );

    // Users

    await User.deleteMany();

    const user1 = new User({
      firstName: "Riley",
      lastName: "Deyin",
      email: "rileyd@example.org",
      events: [],
    });

    const user2 = new User({
      firstName: "Jami",
      lastName: "Watson",
      email: "jamiw@example.org",
      role: "guest",
    });
    const user3 = new User({
      firstName: "Jenny",
      lastName: "Morgan",
      email: "jenw@example.org",
    });
    const user4 = new User({
      firstName: "Chris",
      lastName: "Stuff",
      email: "chris@example.org",
    });

    const host1 = new User({
      firstName: "Mhisa",
      lastName: "Yourg",
      email: "mhisaw@example.org",
      role: "host",
      phoneNumber: "+44 8484 34 22 55",
      events: [],
    });
    const host2 = new User({
      firstName: "Nana",
      lastName: "Nooo",
      email: "nanoo@example.org",
      role: "host",
      phoneNumber: "+44 12 54 87 33",
    });

    const organizer1 = new User({
      firstName: "Xaya",
      lastName: "Hey",
      email: "Xaya@example.org",
      role: "organizer",
      phoneNumber: "+49 056 78 34 21",
      events: [],
    });
    const organizer2 = new User({
      firstName: "Fabienne",
      lastName: "Lala",
      email: "fabienne@example.org",
      role: "organizer",
      phoneNumbeer: "+49 123 456 78 90",
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

    // console.log(`364:`, `${user1.firstName} ${user1.lastName}`);
    // console.log(`365:`, event1.eventName)

    // const addUserToEvent = await UserService.attendEvent(user1, event1);
    // const addHostToEvent = await UserService.attendEvent(host1, event2);

    // console.log(`addUserToEvent`, addUserToEvent)
    // console.log(`addHostToEvent`, addHostToEvent);

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
