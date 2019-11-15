const Host = require("./models/Host")
const Guest = require("./models/Guest")
const Popup = require("./models/Popup")
const Database = require("./database")

const loadDatabase = (err, loadedFile) => {
	if (err) return console.log('An error occurred while loading DB data', err)
	else console.log(`Loading DB data now...`)

	const barberShop = Popup.create(loadedFile)
	const host = new Host('Georgia', 'Toggendorf', "georgia@example.org")
	const guest1 = new Guest('Riley', 'Deyin', "rileyd@example.org")
	const guest2 = new Guest('Jami', 'Watson', "jamiw@example.org")

	host.attend(barberShop)
	guest1.attend(barberShop)
	guest2.attend(barberShop)
	barberShop.printAttendeesNames()
	console.log(barberShop.title)
}

// Database.save('./database/database-new.json', loadDatabase)
Database.load('./database/database.json', loadDatabase)
