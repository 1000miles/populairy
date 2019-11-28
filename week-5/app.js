require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

require("pug");
require("./mongo-connection");
require("./package.json").name;

const indexRoutes = require("./routes/index-routes");
const eventRoutes = require("./routes/event-routes");
const popupRoutes = require("./routes/popup-routes");
const userRoutes = require("./routes/user-routes");

const app = express();

// FIXME: TypeError: expressValidator is not a function => √
// downgrade express-validator to @5.3.1 (workaround)
app.use(expressValidator());

// Views
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Static folders
app.use(express.static(path.join(__dirname, "public")));

// MiddleWare Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes mounting
app.use("/", indexRoutes);
app.use("/event", eventRoutes);
app.use("/popup", popupRoutes);
app.use("/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at ${process.env.PORT}`);
});

module.exports = app;
