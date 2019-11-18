const express = require('express');
const router = express.Router();

const PersonService = require('../services/person-service');
const PopupService = require('../services/popup-service');

// GET http://localhost:3000/person/all
router.get('/all', async (req, res) => {
	const people = await PersonService.findAll();
	res.render('persons', { items: people });
});

// GET http://localhost:3000/person/list
router.get('/list', async (req, res) => {
	const people = await PersonService.findAll();
	res.render('personlistJSON', { items: people });
});

// GET http://localhost:3000/person/objectId
router.get('/:id', async (req, res) => {
	const person = await PersonService.findById(req.params.id);
	await console.log(PersonService.getPersonInfo());

	res.render('data', { data: person });
});

router.post('/', async (req, res) => {
	const person = await PersonService.add(req.body);
	res.send(person);
});

router.delete('/:id', async (req, res) => {
	const person = await PersonService.del(req.params.id);
	res.send(person);
});

router.post('/:id/popups', async (req, res) => {
	const person = await PersonService.findById(req.params.id);
	const popup = await PopupService.findById(req.body.popup);

	await PersonService.attendPopup(person, popup);

	res.send(person);
});

module.exports = router;
