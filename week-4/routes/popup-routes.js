const express = require('express');
const router = express.Router();

const EventService = require('./../services/event-service');
const PopupService = require('./../services/popup-service');
const HostService = require('./../services/host-service');
const GuestService = require('./../services/guest-service');

// GET `/popup/all`
router.get('/all', async (req, res) => {
  const events = await EventService.findAll();
  const popups = await PopupService.findAll();
  const guests = await GuestService.findAll();
  const hosts = await HostService.findAll();

  res.render('popup', { events, popups, guests, hosts });
});

// GET `/popup/:id`
router.get('/:id', async (req, res) => {
  const popup = await PopupService.find(req.params.id);
  res.send(popup);
});

// POST `/popup` w/ req.body
router.post('/', async (req, res) => {
  const popup = await PopupService.add(req.body);
  res.send(popup);
});

// DELETE `/popup/:id`
router.delete('/:id', async (req, res) => {
  const popup = await PopupService.del(req.params.id);
  res.send(popup);
});

module.exports = router;
