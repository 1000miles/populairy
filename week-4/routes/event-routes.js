const express = require('express');
const router = express.Router();

const EventService = require('./../services/event-service');
const PopupService = require('./../services/popup-service');
const HostService = require('./../services/host-service');
const GuestService = require('./../services/guest-service');

router.get('/all', async (req, res) => {
  const events = await EventService.findAll();
  const popups = await PopupService.findAll();
  const guests = await GuestService.findAll();
  const hosts = await HostService.findAll();

  res.render('event', { events, popups, guests, hosts });
});

router.get('/:id', async (req, res) => {
  const event = await EventService.find(req.params.id);
  res.send(event);
});

router.post('/', async (req, res) => {
  const event = await EventService.find(req.params.id);
  res.send(event);
});

router.delete('/:id', async (req, res) => {
  const event = await EventService.find(req.params.id);
  res.send(event);
});

module.exports = router;
