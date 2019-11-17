const express = require('express');
const router = express.Router();

const Event = require('./../models/Event');
const Popup = require('./../models/Popup');
const Host = require('./../models/Host');
const Guest = require('./../models/Guest');

const EventService = require('./../services/event-service');
const PopupService = require('./../services/popup-service');
const HostService = require('./../services/host-service');
const GuestService = require('./../services/guest-service');

// GET `/event/all`
router.get('/all', async (req, res) => {
  const events = await EventService.findAll();
  const popups = await PopupService.findAll();
  const guests = await GuestService.findAll();
	const hosts = await HostService.findAll();

	const event1 = new Event(
    'haircraft',
    'OnHair Night',
    'Neukoelln Kunterbunt',
    '2019-02-21T20:00 (CET)',
    'X Event Collective',
    ['Barber Shop Vol. 11']
	);

	const event2 = new Event(
    'food',
    'Soup & Music',
    'Neukoelln Kunterbunt',
    '2019-02-21T20:00 (CET)',
		'Food Coop Berlin',
		['Kitchen for all']
	);

	const barberShop = new Popup(
    'barber',
    'Barber Shop Vol. 11',
    event1.name,
    'RooArr Pop-up Collective',
    event1.date,
    event1.location
  );

  const barberShop2 = new Popup(
    'barber',
    'Pony and Clyde #23',
    event1.name,
    'Bored Panda',
    event1.date,
    event1.location
  );

  const host = new Host(
    'Georgia',
    'Toggendorf',
    'georgia@example.org',
    '+33 124 566 63 64'
  );

	const foodNight = new Popup(
    'food',
    'Food Corner',
    'Soup & Music',
    'KreuzKoelln Collective',
    new Date('2019-02-21T20:00:00'),
		'Neukoelln Kunterbunt',
		'Kitchen for all'
  );

	// const foodPopupList = [foodNight]
	// foodPopupList.map(popup => console.log(popup.title));

  const guest1 = new Guest('Riley', 'Deyin', 'rileyd@example.org');
  const guest2 = new Guest('Jami', 'Watson', 'jamiw@example.org');
  const guest3 = new Guest('Mhisa', 'Yourg', 'mhisaw@example.org');
	const guest4 = new Guest('Fabienne', 'Lala', 'fabienne@example.org');

	host.attend(barberShop);
  host.attend(barberShop2);
  guest1.attend(barberShop);
  guest2.attend(barberShop);
  guest3.attend(barberShop);
  guest4.attend(barberShop2);

  event1.hasPopups(barberShop);
  event1.hasPopups(barberShop2);
	event2.hasPopups(foodNight);

	await EventService.add(event1);
  await HostService.add(host);
  await GuestService.add(guest1);
  await GuestService.add(guest2);
  await GuestService.add(guest3);
  await GuestService.add(guest4);
  await PopupService.add(barberShop);
  await PopupService.add(barberShop2);
	await EventService.add(event2);
	await PopupService.add(foodNight);

	host.getHostInfo();
	event1.getEventInfo();
	event2.getEventInfo();

  barberShop.belongsTo(event1);
  barberShop.getPopupInfo();

  barberShop2.belongsTo(event1);
  barberShop2.getPopupInfo();

	foodNight.belongsTo(event2);
	foodNight.getPopupInfo();

	const eventsAll = await EventService.findAll();
  console.log(`Number of events:`, eventsAll.length);

  res.render('event', { events, popups, guests, hosts });
});

// GET `/event/:id`
router.get('/:id', async (req, res) => {
  const event = await EventService.find(req.params.id);
  res.send(event);
});

// POST `/event` w/ req.body
router.post('/', async (req, res) => {
  const event = await EventService.add(req.body);
  res.send(event);
});

// DELETE `/event/:id`
router.delete('/:id', async (req, res) => {
  const event = await EventService.del(req.params.id);
  res.send(event);
});

module.exports = router;
