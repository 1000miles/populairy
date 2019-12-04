require("dotenv").config();
const mongoose = require("mongoose");

async function main() {
  await mongoose
    .connect(process.env.MONGODB_URI || `mongodb://localhost/populairy`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(x => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`,
      );
    })
    .catch(err => {
      console.error("Error connecting to mongo", err);
    });
}

main();
