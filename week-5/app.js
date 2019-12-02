require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

require("pug");
require("./mongo-connection");
require("./package.json").name;

const indexRoutes = require("./routes/index-routes");
const eventRoutes = require("./routes/event-routes");
const popupRoutes = require("./routes/popup-routes");
const userRoutes = require("./routes/user-routes");

const app = express();

/********************
 * Views
 *********************/
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

/********************
 * Static Folders
 *********************/
app.use(express.static(path.join(__dirname, "public")));

/********************
 * MiddleWare Config
 *********************/

// Parse application/json
app.use(bodyParser.json());
// Parse application/x-www-form-urlencoded - extended: true =>
// values can be of any type - https://www.npmjs.com/package/body-parser#bodyparserurlencodedoptions
app.use(bodyParser.urlencoded({ extended: true }));

/********************
 * Routes Mounting
 *********************/
app.use("/", indexRoutes);
app.use("/event", eventRoutes);
app.use("/popup", popupRoutes);
app.use("/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at ${process.env.PORT}`);
});

module.exports = app;
