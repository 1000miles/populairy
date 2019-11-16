const Host = require('./models/Host');
const Guest = require('./models/Guest');
const Event = require('./models/Event');
const Popup = require('./models/Popup');
const EventService = require('./services/event-service');
const HostService = require('./services/host-service');
const GuestService = require('./services/guest-service');
const PopupService = require('./services/popup-service');

async function main() {
  const event1 = new Event(
    'haircraft',
    'OnHair Night',
    'Neukoelln Kunterbunt',
    '2019-02-21T20:00 (CET)',
    'X Event Collective',
    ['Barber Shop Vol. 11']
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

  await EventService.add(event1);
  await HostService.add(host);
  await GuestService.add(guest1);
  await GuestService.add(guest2);
  await GuestService.add(guest3);
  await GuestService.add(guest4);
  await PopupService.add(barberShop);
  await PopupService.add(barberShop2);

  host.getHostInfo();
  event1.getEventInfo();

  barberShop.belongsTo(event1);
  barberShop.getPopupInfo();

  barberShop2.belongsTo(event1);
  barberShop2.getPopupInfo();

  const guests = await GuestService.findAll();
  console.log(`Number of guests`, guests.length);
  // console.log(guests.map((guest) => [guest.firstName, guest.email]));

  const hosts = await HostService.findAll();
  console.log(`Number of hosts`, hosts.length);

  const events = await EventService.findAll();
  console.log(`Number of events:`, events.length);

  const popups = await PopupService.findAll();
  console.log(`Number of popups BEFORE:`, popups.length);
}

main();
