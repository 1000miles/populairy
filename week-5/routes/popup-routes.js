const express = require('express');
const router = express.Router();

const EventService = require('../services/event-service');
const PopupService = require('../services/popup-service');
const UserService = require('../services/user-service');

// GET http://localhost:3000/popup/all
router.get('/all', async (req, res) => {
  const event = await EventService.findById();
  const events = await EventService.findAll();
  const popups = await PopupService.findAll();
  const users = await UserService.findAll();

  res.render('popup', { popups, users, event, events });
});

// GET http://localhost:3000/popup/list (JSON)
router.get('/list', async (req, res) => {
  const popups = await PopupService.findAll();

  res.render('popuplistJSON', { items: popups });
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
