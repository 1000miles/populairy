const mongoose = require("mongoose");
const moment = require("moment");

// This is to generate ObjectId() when inserting items
const ObjectId = mongoose.Types.ObjectId;

const Event = require("../models/Event");
const Popup = require("../models/Popup");
const User = require("../models/User");

const EventService = require("../services/event-service");
const PopupService = require("../services/popup-service");
const UserService = require("../services/user-service");

let events = [];
let popups = [];
let users = [];

const seedModels = async () => {
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
        from: new Date(2019, 12, 29, 11, 00, 00),
        to: new Date(2019, 12, 29, 23, 00, 00),
      },
      eventHost: {
        name: "Jaunita Hicks",
        email: "jaunita@example.org",
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
        from: new Date(2020, 05, 28, 10, 00, 00),
        to: new Date(2020, 05, 28, 22, 00, 00),
      },
      eventHost: {
        name: "Food Coop Berlin",
        websiteUrl: "https://www.fooodcoopsers.org",
        email: "foodcoopsers@example.org",
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
      description:
        "Barber Shop is located in Neukoelln and offers tarot reading during the hair cut sessions...",
      slots: {
        date: {
          from: new Date(2020, 02, 22, 10, 00, 00),
          to: new Date(2020, 02, 22, 21, 00, 00),
        },
      },
      popupOrganizer: {
        name: "RooArr Pop-up Collective",
        email: "roaar@example.org",
        websiteUrl: "https://rroaarr-example.org",
      },
      joinedOrganizers: [],
    });

    const barberShop2 = new Popup({
      category: "barber",
      popupTitle: "Pony and Clyde #23",
      description:
        "Pony and Clyde was founded in 2017 by 2 best friennds. They always wanted to...",
      slots: {
        date: {
          from: new Date(2020, 02, 22, 10, 00, 00),
          to: new Date(2020, 02, 22, 21, 00, 00),
        },
      },
      popupOrganizer: {
        name: "Bored Panda",
        email: "boredpan@example.org",
        websiteUrl: "https://boredpan-example.org",
      },
      joinedOrganizers: [],
    });

    const foodCorner1 = new Popup({
      category: "food",
      popupTitle: "Food around the clock",
      description: "Wonderful organic food all night long",
      slots: {
        date: {
          from: new Date(2019, 12, 29, 11, 00, 00),
          to: new Date(2019, 12, 29, 20, 00, 00),
        },
      },
      popupOrganizer: {
        name: "Colin Breston",
        email: "colin@example.org",
        websiteUrl: "https://colix-example.org",
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
      isMain: {
        host: false,
        organizer: false,
      },
      role: "organizer",
      events: [],
      popups: [],
      joinedHosting: {
        confirmed: false,
        status: null,
      },
      joinedOrganizing: {
        confirmed: true,
        status: "accepted",
      },
    });

    const user2 = new User({
      firstName: "Jami",
      lastName: "Watson",
      email: "jamiw@example.org",
      isMain: {
        host: false,
        organizer: false,
      },
      role: "guest",
      events: [],
      popups: [],
      joinedHosting: {
        confirmed: false,
        status: null,
      },
      joinedOrganizing: {
        confirmed: false,
        status: null,
      },
    });
    const user3 = new User({
      firstName: "Jenny",
      lastName: "Morgan",
      email: "jenw@example.org",
      isMain: {
        host: false,
        organizer: false,
      },
      role: "guest",
      events: [],
      popups: [],
      joinedHosting: {
        confirmed: false,
        status: null,
      },
      joinedOrganizing: {
        confirmed: false,
        status: "pending",
      },
    });
    const user4 = new User({
      firstName: "Chris",
      lastName: "Stuff",
      email: "chris@example.org",
      isMain: {
        host: false,
        organizer: false,
      },
      role: "guest",
      events: [],
      popups: [],
      joinedHosting: {
        confirmed: false,
        status: "pending",
      },
      joinedOrganizing: {
        confirmed: false,
        status: "rejected",
      },
    });

    const host1 = new User({
      firstName: "Mhisa",
      lastName: "Yourg",
      email: "mhisaw@example.org",
      isMain: {
        host: true,
        organizer: false,
      },
      role: "host",
      phoneNumber: "+44 8484 34 22 55",
      events: [],
      popups: [],
      joinedHosting: {
        confirmed: true,
        status: null,
        joinedDate: null,
      },
      joinedOrganizing: {
        confirmed: false,
        status: null,
        joinedDate: null,
      },
    });
    const host2 = new User({
      firstName: "Nana",
      lastName: "Nooo",
      email: "nanoo@example.org",
      isMain: {
        host: false,
        organizer: false,
      },
      role: "host",
      phoneNumber: "+44 12 54 87 33",
      events: [],
      popups: [],
      joinedHosting: {
        confirmed: true,
        status: "accepted",
        joinedDate: new Date("2018-11-28"),
      },
      joinedOrganizing: {
        confirmed: false,
        status: null,
      },
    });

    const organizer1 = new User({
      firstName: "Xaya",
      lastName: "Hey",
      email: "Xaya@example.org",
      isMain: {
        host: false,
        organizer: false,
      },
      role: "organizer",
      phoneNumber: "+49 056 78 34 21",
      events: [],
      popups: [],
      joinedHosting: {
        confirmed: false,
        status: null,
      },
      joinedOrganizing: {
        confirmed: true,
        status: "accepted",
        joinedDate: new Date("2017-10-12"),
      },
    });
    const organizer2 = new User({
      firstName: "Fabienne",
      lastName: "Lala",
      email: "fabienne@example.org",
      isMain: {
        host: false,
        organizer: true,
      },
      role: "organizer",
      phoneNumbeer: "+49 123 456 78 90",
      events: [],
      popups: [],
      joinedHosting: {
        confirmed: false,
        status: null,
      },
      joinedOrganizing: {
        confirmed: false,
        status: null,
      },
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

seedModels();
