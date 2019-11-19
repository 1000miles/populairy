const express = require('express');
const router = express.Router();

const UserService = require('../services/user-service');
const PopupService = require('../services/popup-service');

// GET http://localhost:3000/user/all
router.get('/all', async (req, res) => {
  const people = await UserService.findAll();
  res.render('users', { items: people });
});

// GET http://localhost:3000/user/list
router.get('/list', async (req, res) => {
  const people = await UserService.findAll();
  res.render('userlistJSON', { items: people });
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

router.post('/:id/popups', async (req, res) => {
  const user = await UserService.findById(req.params.id);
  const popup = await PopupService.findById(req.body.popup);

  await UserService.attendPopup(user, popup);

  res.send(user);
});

module.exports = router;
