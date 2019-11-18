const mongoose = require('mongoose');

// This is to generate objectId when inserting items
let ObjectId = mongoose.Types.ObjectId;

const Event = require('../models/with-mongoose/EventNEW');
const Popup = require('../models/with-mongoose/PopupNew');
const Person = require('../models/with-mongoose/PersonNew');

const EventService = require('../services/event-service');
const PopupService = require('../services/popup-service');
const PersonService = require('../services/popup-service');

let events = [];
let popups = [];
let persons = [];

const seedPersons = async () => {
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
			location: 'Neukoelln Kunterbunt',
			date: '2019-02-21T20:00',
			host: 'X Event Collective',
		});

		const event2 = new Event({
			_id: ObjectId(),
			eventType: 'food',
			name: 'Soup & Music',
			location: 'Neukoelln Kunterbunt',
			date: '2019-02-21T20:00',
			host: 'Food Coop Berlin',
		});

		await events.push(event1, event2);

		await Event.create(events);

		await events.map(event =>
			console.log(
				`CREATED Id: ${event._id} - Event name: ${event.name}`,
			),
		);

		// Popups

		// Using await ensures the previous records are deleted
		await Popup.deleteMany();

		const barberShop = new Popup({
			_id: ObjectId(),
			category: 'barber',
			title: 'Barber Shop Vol. 11',
			joinedEvent: 'OnHair Night',
			date: '2019-02-21T20:00',
			host: 'RooArr Pop-up Collective',
			space: 'Neukoelln Kunterbunt',
		});

		const barberShop2 = new Popup({
			_id: ObjectId(),
			category: 'barber',
			title: 'Pony and Clyde #23',
			joinedEvent: 'OnHair Night',
			date: '2019-02-21T20:00',
			host: 'Bored Panda',
			space: 'Neukoelln Kunterbunt',
		});

		const foodCorner = new Popup({
			_id: ObjectId(),
			category: 'food',
			title: 'Food Corner',
			joinedEvent: 'Soup & Music',
			date: '2019-03-15T20:00:00',
			host: 'KreuzKoelln Collective',
			space: 'Astra Stuben',
		});

		await popups.push(barberShop, barberShop2, foodCorner);

		await Popup.create(popups);

		await popups.map(popup =>
			console.log(
				`CREATED Id: ${popup._id} - Popup title: ${popup.title}`,
			),
		);

		// Persons

		await Person.deleteMany();

		const person1 = new Person({
			_id: ObjectId(),
			firstName: 'Riley',
			lastName: 'Deyin',
			email: 'rileyd@example.org',
		});
		const person2 = new Person({
			_id: ObjectId(),
			firstName: 'Jami',
			lastName: 'Watson',
			email: 'jamiw@example.org',
			role: 'guest',
		});
		const person3 = new Person({
			_id: ObjectId(),
			firstName: 'Jenny',
			lastName: 'Morgan',
			email: 'jenw@example.org',
		});
		const person4 = new Person({
			_id: ObjectId(),
			firstName: 'Chris',
			lastName: 'Stuff',
			email: 'chris@example.org',
		});

		const host1 = new Person({
			_id: ObjectId(),
			firstName: 'Mhisa',
			lastName: 'Yourg',
			email: 'mhisaw@example.org',
			role: 'host',
			phoneNumber: '+44 8484 34 22 55',
		});
		const host2 = new Person({
			_id: ObjectId(),
			firstName: 'Nana',
			lastName: 'Nooo',
			email: 'nanoo@example.org',
			role: 'host',
			phoneNumber: '+44 12 54 87 33',
		});

		const organizer1 = new Person({
			_id: ObjectId(),
			firstName: 'Xaya',
			lastName: 'Hey',
			email: 'Xaya@example.org',
			role: 'organizer',
			phoneNumber: '+49 056 78 34 21',
		});
		const organizer2 = new Person({
			_id: ObjectId(),
			firstName: 'Fabienne',
			lastName: 'Lala',
			email: 'fabienne@example.org',
			role: 'organizer',
			phoneNumbeer: '+49 123 456 78 90',
		});

		await persons.push(
			person1,
			person2,
			person3,
			person4,
			host1,
			host2,
			organizer1,
			organizer2,
		);

		await Person.create(persons);

		await persons.map(person =>
			console.log(
				`CREATED Id: ${person._id} - person name: ${person.firstName} ${person.lastName} = ${person.role}`,
			),
		);

		await mongoose.disconnect();
	} catch(err) {
			mongoose.disconnect();
			console.log(`ERROR while seeding DB with persons`, err);
  }
}

seedPersons();




