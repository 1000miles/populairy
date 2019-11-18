const mongoose = require('mongoose');
const Popup = require('../models/with-mongoose/PopupNew');
const Person = require('../models/with-mongoose/PersonNew');
// const PopupService = require('../services/popup-service');

let popups = [];

const seedPopups = async () => {
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
    Popup.deleteMany();

    const barberShop = await new Popup({
      category: 'barber',
      title: 'Barber Shop Vol. 11',
      joinedEvent: 'OnHair Night',
      date: '2019-02-21T20:00',
      host: 'RooArr Pop-up Collective',
      space: 'Neukoelln Kunterbunt',
    });

    const barberShop2 = await new Popup({
      category: 'barber',
      title: 'Pony and Clyde #23',
      joinedEvent: 'OnHair Night',
      date: '2019-02-21T20:00',
      host: 'Bored Panda',
      space: 'Neukoelln Kunterbunt',
    });

    const foodCorner = await new Popup({
      category: 'food',
      title: 'Food Corner',
      joinedEvent: 'Soup & Music',
      date: '2019-03-15T20:00:00',
      host: 'KreuzKoelln Collective',
      space: 'Astra Stuben',
    });

    await popups.push(barberShop, barberShop2, foodCorner);

    await Popup.create(popups);

    console.log(popups.map(popup => popup._id));

    await mongoose.disconnect();

  } catch(err) {
      console.log(`ERROR while seeding DB with popups`, err);
      mongoose.disconnect();
  }
}

seedPopups();




