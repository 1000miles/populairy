const express = require('express');
const router = express.Router();

const EventService = require('../services/event-service');
const PopupService = require('../services/popup-service');
const UserService = require('../services/user-service');

// READ - GET http://localhost:3000/user/all
router.get('/all', async (req, res) => {
  // console.log(`Start user`)
  const users = await UserService.findAll();
  console.log(`[user-routes.js] users`, users);

  res.render('users', { users });
});

// READ - GET http://localhost:3000/user/list
router.get('/list', async (req, res) => {
  const users = await UserService.findAll();

  res.render('userlistJSON', { items: users });
});

// READ - GET http://localhost:3000/user/objectId
router.get('/:id', async (req, res) => {
  const user = await UserService.findById(req.params.id);

  res.render('user', { user });

  // Axios
  // res.send(user);
});

// CREATE a new user = POST http://localhost:3000/user/
router.post('/', async (req, res) => {
  const user = await UserService.add(req.body);
  res.send(user);
});

// UPDATE a single user - PATCH http://localhost:3000/user/objectId
router.patch('/:id', async (req, res) => {
  const user = await UserService.updateOne(req.params.id);
  res.send(user);
});

// DELETE a single user DELETE http://localhost:3000/user/objectId
router.delete('/:id', async (req, res) => {
  const user = await UserService.deleteOne(req.params.id);
  res.send(user);
});

// CREATE event for single user - CREATE http://localhost:3000/user/objectId/events
router.post('/:id/events', async (req, res) => {
  const user = await UserService.findById(req.params.id);
  const event = await EventService.findAll(req.body);

  await UserService.attendEvent(user, event);
  console.log(`[user-routes] event: Event: ${event}, User: ${user}`);

  res.send({
    user,
    event,
  });
});

module.exports = router;
