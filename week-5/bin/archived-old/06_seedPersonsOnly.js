const mongoose = require("mongoose");

const User = require("../models/with-mongoose/UserNew");

let users = [];

const seedUsers = async () => {
  mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost/populairy", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(x => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`,
      );
    })
    .catch(err => {
      console.error("Error connecting to mongo", err);
    });

  try {
    // Using await ensures the previous records are deleted
    await User.deleteMany();

    const user1 = new User({
      firstName: "Riley",
      lastName: "Deyin",
      email: "rileyd@example.org",
    });
    const user2 = new User({
      firstName: "Jami",
      lastName: "Watson",
      email: "jamiw@example.org",
      role: "guest",
    });
    const user3 = new User({
      firstName: "Jenny",
      lastName: "Morgan",
      email: "jenw@example.org",
    });
    const user4 = new User({
      firstName: "Chris",
      lastName: "Stuff",
      email: "chris@example.org",
    });

    const host1 = new User({
      firstName: "Mhisa",
      lastName: "Yourg",
      email: "mhisaw@example.org",
      role: "host",
      phoneNumber: "+44 8484 34 22 55",
    });
    const host2 = new User({
      firstName: "Nana",
      lastName: "Nooo",
      email: "nanoo@example.org",
      role: "host",
      phoneNumber: "+44 12 54 87 33",
    });

    const organizer1 = new User({
      firstName: "Xaya",
      lastName: "Hey",
      email: "Xaya@example.org",
      role: "organizer",
      phoneNumber: "+49 056 78 34 21",
    });
    const organizer2 = new User({
      firstName: "Fabienne",
      lastName: "Lala",
      email: "fabienne@example.org",
      role: "organizer",
      phoneNumbeer: "+49 123 456 78 90",
    });

    await users.push(
      user1,
      user2,
      user3,
      user4,
      host1,
      host2,
      organizer1,
      organizer2,
    );

    await User.create(users);

    users.map(user =>
      console.log(
        `CREATED Id: ${user._id} - user name: ${user.firstName} ${user.lastName} = ${user.role}`,
      ),
    );

    await mongoose.disconnect();
  } catch (err) {
    mongoose.disconnect();
    console.log(`ERROR while seeding DB with users`, err);
  }
};

seedUsers();
