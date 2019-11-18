const mongoose = require('mongoose');

const Person = require('../models/with-mongoose/PersonNew');

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
			// Using await ensures the previous records are deleted
			await Person.deleteMany();

			const person1 = new Person({
				firstName: 'Riley',
				lastName: 'Deyin',
				email: 'rileyd@example.org',
			});
			const person2 = new Person({
				firstName: 'Jami',
				lastName: 'Watson',
				email: 'jamiw@example.org',
				role: 'guest',
			});
			const person3 = new Person({
				firstName: 'Jenny',
				lastName: 'Morgan',
				email: 'jenw@example.org',
			});
			const person4 = new Person({
				firstName: 'Chris',
				lastName: 'Stuff',
				email: 'chris@example.org',
			});

			const host1 = new Person({
				firstName: 'Mhisa',
				lastName: 'Yourg',
				email: 'mhisaw@example.org',
				role: 'host',
				phoneNumber: '+44 8484 34 22 55',
			});
			const host2 = new Person({
				firstName: 'Nana',
				lastName: 'Nooo',
				email: 'nanoo@example.org',
				role: 'host',
				phoneNumber: '+44 12 54 87 33',
			});

			const organizer1 = new Person({
				firstName: 'Xaya',
				lastName: 'Hey',
				email: 'Xaya@example.org',
				role: 'organizer',
				phoneNumber: '+49 056 78 34 21',
			});
			const organizer2 = new Person({
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

			persons.map(person =>
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




