const express = require('express');
const router = express.Router();

const PopupService = require('./../services/popup-service');
const HostService = require('./../services/host-service');
const GuestService = require('./../services/guest-service');

router.get('/all', async (req, res) => {
  const popups = await PopupService.findAll();
  const guests = await GuestService.findAll();
  const hosts = await HostService.findAll();

  res.render('popup', { popups, guests, hosts });
});

router.get('/:id', async (req, res) => {
  const popup = await PopupService.find(req.params.id);
  res.send(popup);
});

router.post('/', async (req, res) => {
  const popup = await PopupService.find(req.params.id);
  res.send(popup);
});

router.delete('/:id', async (req, res) => {
  const popup = await PopupService.find(req.params.id);
  res.send(popup);
});

module.exports = router;
