const Host = require('./models/Host');
const Guest = require('./models/Guest');
const Popup = require('./models/Popup');

const Chalk = require('chalk')
const Database = require('./syncing')

/*
	Host
*/

const host = new Host("Jamy", "Doe", "jamy@example.org", "+49123456789");

host.getHostInfo();
// The host 'Jamy Doe' can be contacted via email (jamy@example.org) or phone number (+491234567892)

/*
	Guests
*/

const guest1 = new Guest('Kim', 'Doe', 'kim@example.org');
const guest2 = new Guest('Freddy', 'Whatever', 'freddy@example.org');

/*
	Pop-up Events
*/

const barberShop = new Popup("barber", "Barber Shop Vol. 10", "X Space", "Cray", new Date("2019-12-30T19:00:00"));
// The event 'Barber Shop Vol. 10' will take place on Mon Dec 30 2019 19:00:00 GMT+0100 (Central European Standard Time) at 'X Space' and has currently 2 guests attending.

guest1.attend(barberShop);
guest2.attend(barberShop);

barberShop.printGuestNames();

barberShop.getPopupInfo();

guest1.getGuestInfo(); // The guest 'Kim Doe' can be contacted via email (kim@example.org).
guest2.getGuestInfo(); // The guest 'Freddy Whatever' can be contacted via email (freddy@example.org).

/*
	Database
*/

// Database.save(filename, data)
Database.save('./database/host-data.json', host);
Database.save('./database/popup-data.json', barberShop);

const loadedFile1 = Database.load('./database/host-data.json');
const loadedFile2 = Database.load('./database/popup-data.json');

console.log(loadedFile1.name);
console.log(loadedFile2.name);