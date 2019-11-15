const Host = require("./models/Host")
const Guest = require("./models/Guest")
const Popup = require("./models/Popup")
const Database = require("./database")

const host = new Host("Nilhan", "Oezdemir", "nilhan@example.org", "+42 123456789")
const guest1 = new Guest("Kim", "Nolan", "kim@example.org")
const guest2 = new Guest("Johnny", "Crash", "johnny@example.org")
const barberShop = new Popup(
  "barber",
  "Barber Shop Vol. 10",
  host.name,
  "co.up Community Space",
  new Date("2019-12-30T19:00:00")
)

host.attend(barberShop)
host.getHostInfo()

guest1.attend(barberShop)
guest1.getGuestInfo()

guest2.attend(barberShop)
guest2.getGuestInfo()

let guestList = []
guestList.push(guest1, guest2)

console.log(guestList)
barberShop.getPopupInfo()
barberShop.printAttendeesNames()

/*
 * Database
 */

Database.save(filename, data)
Database.save("./database/host-data.json", host)
Database.save("./database/guests-data.json", guestList)
Database.save("./database/popup-data.json", barberShop)

const loadedHost = Database.load("./database/host-data.json")
const loadedPopup = Database.load("./database/popup-data.json")
const loadedGuests = Database.load("./database/guests-data.json")

console.log(`Host Data:`, loadedHost)
console.log(`Popup Event Data`, loadedPopup)
console.log(`Guests Data`, loadedGuests)
