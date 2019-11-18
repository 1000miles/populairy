const express = require('express');
const router = express.Router();

const EventService = require('../services/event-service');
const PopupService = require('../services/popup-service');
const PersonService = require('../services/person-service');

// GET `/event/all`
router.get('/all', async (req, res) => {
  const events = await EventService.findAll();
  const popups = await PopupService.findAll();
	const persons = await PersonService.findAll();
	const popup = await PopupService.find(req.params.popup)
	await EventService.hasPopups(popup)

  res.render('event', { events, popups, persons });
});

// GET `/event/:id`
router.get('/:id', async (req, res) => {
	const event = await EventService.find(req.params.id);
  res.send(event);
});

// POST `/event` w/ req.body
router.post('/', async (req, res) => {
  const event = await EventService.add(req.body);
  res.send(event);
});

// DELETE `/event/:id`
router.delete('/:id', async (req, res) => {
  const event = await EventService.del(req.params.id);
  res.send(event);
});

module.exports = router;
