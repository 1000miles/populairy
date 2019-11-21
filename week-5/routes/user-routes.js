const express = require('express');
const router = express.Router();

const EventService = require('../services/event-service');
const PopupService = require('../services/popup-service');
const UserService = require('../services/user-service');

// GET http://localhost:3000/user/all
router.get('/all', async (req, res) => {
  const people = await UserService.findAll();
  res.render('users', { items: people });
});

// GET http://localhost:3000/user/list
router.get('/list', async (req, res) => {
  const users = await UserService.findAll();

  res.render('userlistJSON', { items: users });
});

// GET http://localhost:3000/user/objectId
router.get('/:id', async (req, res) => {
  const user = await UserService.findById(req.params.id);
  await console.log(UserService.getUserInfo());

  res.render('data', { data: user });
});

router.post('/', async (req, res) => {
  const user = await UserService.add(req.body);
  res.send(user);
});

router.delete('/:id', async (req, res) => {
  const user = await UserService.del(req.params.id);
  res.send(user);
});

router.post('/:id/events', async (req, res) => {
  const user = await UserService.findById(req.params.id);

  console.log(`[user-routs] user`, user);
  const event = await EventService.findById(req.body.event);

  console.log(`[user-routs] event`, event);

  await UserService.attendEvent(user, event);

  res.send(user);
});

module.exports = router;
