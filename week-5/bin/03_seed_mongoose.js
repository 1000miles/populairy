const mongoose = require('mongoose');

const Event = require('../models/with-mongoose/EventNEW');
const Popup = require('../models/with-mongoose/PopupNEW');
const Person = require('../models/with-mongoose/PersonNEW');

const EventService = require('../services/event-service');
const PopupService = require('../services/popup-service');
const PersonService = require('../services/person-service');

async function seed() {
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
		const event1 = new Event({
      eventType: 'haircraft',
      name: 'OnHair Night',
      location: 'Neukoelln Kunterbunt',
      date: '2019-02-21T20:00',
      host: 'X Event Collective'
		});

		const event2 = new Event({
			eventType: 'food',
      name: 'Soup & Music',
      location: 'Neukoelln Kunterbunt',
      date: '2019-02-21T20:00',
      host: 'Food Coop Berlin'
		});

		const barberShop = new Popup({
			category: 'barber',
      title: 'Barber Shop Vol. 11',
      joinedEvent: 'OnHair Night',
      date: '2019-02-21T20:00',
      host: 'RooArr Pop-up Collective',
      space: 'Neukoelln Kunterbunt'
		});

		const barberShop2 = new Popup({
			category: 'barber',
      title: 'Pony and Clyde #23',
      joinedEvent: 'OnHair Night',
      date: '2019-02-21T20:00',
      host: 'Bored Panda',
			space: 'Neukoelln Kunterbunt'
		});

		const foodCorner = new Popup({
      category: 'food',
      title: 'Food Corner',
      joinedEvent: 'Soup & Music',
      date: '2019-03-15T20:00:00',
      host: 'KreuzKoelln Collective',
      space: 'Astra Stuben'
		});

		const guest1 = new Person({ firstName: 'Riley', lastName: 'Deyin', email: 'rileyd@example.org'});
		const guest2 = new Person({ firstName: 'Jami', lastName: 'Watson', email: 'jamiw@example.org'});
		const guest3 = new Person({ firstName: 'Jenny', lastName: 'Morgan', email: 'jenw@example.org' });
		const guest4 = new Person({ firstName: 'Chris', lastName: 'Stuff', email: 'chris@example.org' });

		const host = new Person({ firstName: 'Mhisa', lastName: 'Yourg', email: 'mhisaw@example.org', role: "host", phoneNumber: '+44 8484 34 22 55' });
		const host2 = new Person({ firstName: 'Nana', lastName: 'Nooo', email: 'nanoo@example.org', role: "host", phoneNumber: '+44 12 54 87 33'});

		const organizer = new Person({ firstName: 'Xaya', lastName: 'Hey', email: 'Xaya@example.org', role: "organizer", phoneNumber: "+49 056 78 34 21" });
		const organizer2 = new Person({ firstName: 'Fabienne', lastName: 'Lala', email: 'fabienne@example.org', role: "organizer", phoneNumbeer: "+49 123 456 78 90" });

		// host.setRole();
		// host2.setRole();
		// organizer.setRole();
		// organizer2.setRole();

		console.log(`DEBUG host`, host)

    host.attend(barberShop);
    host.attend(barberShop2);

		host2.attend(foodCorner);

		organizer.attend(foodCorner);
		organizer.attend(barberShop);
		organizer.attend(barberShop2);
		organizer2.attend(barberShop);

    guest1.attend(barberShop);
    guest2.attend(barberShop);
    guest3.attend(barberShop2);
    guest4.attend(foodCorner);

    event1.hasPopups(barberShop);
    event1.hasPopups(barberShop2);
    event2.hasPopups(foodCorner);

    await EventService.add(event1);
    await EventService.add(event2);

    // await HostService.add(host);
    // await HostService.add(host);

    await PersonService.add(guest1);
    await PersonService.add(guest2);
    await PersonService.add(guest3);
    await PersonService.add(guest4);

    await PopupService.add(barberShop);
    await PopupService.add(barberShop2);
    await PopupService.add(foodCorner);

    // host.getHostInfo();
    // host2.getHostInfo();
    // host2.getHostInfo();

    event1.getEventInfo();
    event2.getEventInfo();

    barberShop.belongsTo(event1);
    barberShop.getPopupInfo();

    barberShop2.belongsTo(event1);
    barberShop2.getPopupInfo();

    foodCorner.belongsTo(event2);
		foodCorner.getPopupInfo();

		host.getPersonInfo();
		host2.getPersonInfo();
		organizer.getPersonInfo();
		organizer2.getPersonInfo();
		guest1.getPersonInfo();
		guest2.getPersonInfo();

    // const eventsAll = await EventService.findAll();
    // console.log(`Number of events:`, eventsAll.length);

    // const popupsAll = await PopupService.findAll();
    // console.log(`Number of events:`, popupsAll.length);
  } catch (err) {
    console.log(`ERROR while seeding DB`, err);
  }
}

seed();
