const express = require('express');
const router = express.Router();

const EventService = require('../services/event-service');
const PopupService = require('../services/popup-service');
const UserService = require('../services/user-service');

// GET `/event/all`
router.get('/all', async (req, res) => {
  const events = await EventService.findAll();
  console.log(`[event-routes.js] events`, events);

  const popups = await PopupService.findAll();
  console.log(`[event-routes.js] popups`, popups);

  const users = await UserService.findAll();
  console.log(`[event-routes.js] users`, users);

  const popup = await PopupService.findById(req.params.id);

  res.render('event', { events, popups, users, popup });
});

// // GET http://localhost:3000/event/list
// router.get('/list', async (req, res) => {
//   const events = await EventService.findAll();

//   res.render('eventlistJSON', { items: events });
// });

// GET `/event/:id`
router.get('/:id', async (req, res) => {
  const event = await EventService.findById(req.params.id);
  res.send(event);
});

// // POST `/event` w/ req.body
// router.post('/', async (req, res) => {
//   const event = await EventService.add(req.body);

//   console.log(`[event-routes] /post`, event);
//   res.send(event);
// });

// router.post('/:id/invitation', async (req, res) => {
// 	const event = await EventService.findById(req.params.id);
// 	const popup = await PopupService.find(req.body.popup);

// 	console.log(`[event-routes.js]: Popup`, popup);

// 	await EventService.sendInvitation(popup);
// 	res.send(event);
// });

// // DELETE `/event/:id`
// router.delete('/:id', async (req, res) => {
//   const event = await EventService.del(req.params.id);
//   res.send(event);
// });

module.exports = router;
