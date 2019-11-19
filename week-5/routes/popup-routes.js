const express = require('express');
const router = express.Router();

const EventService = require('../services/event-service');
const PopupService = require('../services/popup-service');
const UserService = require('../services/user-service');

// GET http://localhost:3000/popup/all
router.get('/all', async (req, res) => {
  const events = await EventService.findAll();
  const popups = await PopupService.findAll();
  const persons = await UserService.findAll();

  res.render('popup', { events, popups, persons });
});

// GET http://localhost:3000/popup/list (JSON)
router.get('/list', async (req, res) => {
  const events = await EventService.findAll();
  const popups = await PopupService.findAll();
  const persons = await UserService.findAll();

  const options = [events, popups, persons];

  res.render('popuplistJSON', { items: options });
});

// GET http://localhost:3000/popup/ObjectId
router.get('/:id', async (req, res) => {
  const popup = await PopupService.findbyId(req.params.id);
  res.render('data', { data: popup });
});

// POST http://localhost:3000/popup w/ req.body
router.post('/', async (req, res) => {
  const popup = await PopupService.add(req.body);
  res.send(popup);
});

// DELETE http://localhost:3000/popup/ObjectId
router.delete('/:id', async (req, res) => {
  const popup = await PopupService.del(req.params.id);
  res.send(popup);
});

module.exports = router;
