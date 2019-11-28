const mongoose = require("mongoose");

const Event = require("../../models/archived-old/Event");
const Popup = require("../../models/archived-old/Popup");
const Host = require("../../models/archived-old/Host");
const Guest = require("../../models/archived-old/Guest");

const EventService = require("../../services/archived/popup-service");
const PopupService = require("../../services/archived/popup-service");
const HostService = require("../../services/archived/host-service");
const GuestService = require("../../services/archived/guest-service");

// ATTENTION: This does not work anymore since the models and paths have changed.

async function seed() {
  mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost/populairy", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
    const event1 = new Event(
      "haircraft",
      "OnHair Night",
      "Neukoelln Kunterbunt",
      "2019-02-21T20:00",
      "X Event Collective",
    );

    const event2 = new Event(
      "food",
      "Soup & Music",
      "Neukoelln Kunterbunt",
      "2019-02-21T20:00",
      "Food Coop Berlin",
    );

    const barberShop = new Popup(
      "barber",
      "Barber Shop Vol. 11",
      "OnHair Night",
      "RooArr Pop-up Collective",
      "2019-02-21T20:00",
      "Neukoelln Kunterbunt",
    );

    const barberShop2 = new Popup(
      "barber",
      "Pony and Clyde #23",
      "OnHair Night",
      "Bored Panda",
      "2019-02-21T20:00",
      "Neukoelln Kunterbunt",
    );

    const host = new Host(
      "Georgia",
      "Toggendorf",
      "georgia@example.org",
      "+33 124 566 63 64",
    );

    const host2 = new Host(
      "Tamy",
      "Nexus",
      "tamy@example.org",
      "+33 857 97 33 94",
    );

    const foodCorner = new Popup(
      "food",
      "Food Corner",
      "Soup & Music",
      "KreuzKoelln Collective",
      "2019-03-15T20:00:00",
      "Astra Stuben",
    );

    const guest1 = new Guest("Riley", "Deyin", "rileyd@example.org");
    const guest2 = new Guest("Jami", "Watson", "jamiw@example.org");
    const guest3 = new Guest("Mhisa", "Yourg", "mhisaw@example.org");
    const guest4 = new Guest("Fabienne", "Lala", "fabienne@example.org");

    host.attend(barberShop);
    host.attend(barberShop2);

    host2.attend(foodCorner);

    guest1.attend(barberShop);
    guest2.attend(barberShop);
    guest3.attend(barberShop2);
    guest4.attend(foodCorner);

    event1.hasPopups(barberShop);
    event1.hasPopups(barberShop2);
    event2.hasPopups(foodCorner);

    await EventService.create(event1);
    await EventService.create(event2);

    await HostService.create(host);
    await HostService.create(host);

    await GuestService.create(guest1);
    await GuestService.create(guest2);
    await GuestService.create(guest3);
    await GuestService.create(guest4);

    await PopupService.create(barberShop);
    await PopupService.create(barberShop2);
    await PopupService.create(foodCorner);

    host.getHostInfo();
    host2.getHostInfo();

    event1.getEventInfo();
    event2.getEventInfo();

    barberShop.belongsTo(event1);
    barberShop.getPopupInfo();

    barberShop2.belongsTo(event1);
    barberShop2.getPopupInfo();

    foodCorner.belongsTo(event2);
    foodCorner.getPopupInfo();

    // const eventsAll = await EventService.findAll();
    // console.log(`Number of events:`, eventsAll.length);

    // const popupsAll = await PopupService.findAll();
    // console.log(`Number of events:`, popupsAll.length);
  } catch (err) {
    console.log(`ERROR while seeding DB`, err);
  }
}

seed();
