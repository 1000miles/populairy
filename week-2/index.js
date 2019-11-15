const Host = require("./models/Host");
const Guest = require("./models/Guest");
const Popup = require("./models/Popup");
const Database = require("./database");

const host = new Host(
  "Nilhan",
  "Oezdemir",
  "nilhan@example.org",
  "+42 123456789"
);
const guest1 = new Guest("Kim", "Nolan", "kim@example.org", "+49 123456789");
const guest2 = new Guest(
  "Johnny",
  "Crash",
  "johnny@example.org",
  "+49 9876543"
);
const barberShop = new Popup(
  "barber",
  "Barber Shop Vol. 10",
  "Bobby Collective",
  "X Space",
  new Date("2019-12-30T19:00:00")
);

host.attend(barberShop);
guest1.attend(barberShop);
guest2.attend(barberShop);
let guests = [];

guests.push(guest1, guest2);

/*
 * Database
 */

// Database.save(filename, data)
Database.save("./database/host-data.json", host);
Database.save("./database/guests-data.json", guests);
Database.save("./database/popup-data.json", barberShop);

const loadedFile1 = Database.load("./database/host-data.json");
const loadedFile2 = Database.load("./database/popup-data.json");
const loadedFile3 = Database.load("./database/guests-data.json");

console.log(loadedFile1.name);
console.log(loadedFile2.name);
console.log(loadedFile3.name);
