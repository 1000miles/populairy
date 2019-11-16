require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pug = require('pug');

const indexRoutes = require('./routes/index-routes');
const eventRoutes = require('./routes/event-routes');
const popupRoutes = require('./routes/popup-routes');

const app = express();

// Views
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Static folders
app.use(express.static(path.join(__dirname, 'public')));

// MiddleWare Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes mounting
app.use('/', indexRoutes);
app.use('/event', eventRoutes);
app.use('/popup', popupRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at ${process.env.PORT}`);
});

module.exports = app;
