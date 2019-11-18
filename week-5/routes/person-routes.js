const express = require('express')
const router = express.Router()

const PersonService = require('../services/person-service')
const PopupService = require('../services/popup-service')

router.get('/all', async (req, res) => {
	const people = await PersonService.findAll()
  res.render('list', { items: people })
})

router.get('/:id', async (req, res) => {
  console.log(`[:/]`, req.params.id)
	const person = await PersonService.find(req.params.id)
  console.log(`person id:`, person)
  await console.log(PersonService.getPersonInfo());

  res.render('data', { data: person })
})

router.post('/', async (req, res) => {
  const person = await PersonService.add(req.body)
  res.send(person)
})

router.delete('/:id', async (req, res) => {
  const person = await PersonService.del(req.params.id)
  res.send(person)
})

router.post('/:id/popups', async (req, res) => {
  const person = await PersonService.find(req.params.id)
  const popup = await PopupService.find(req.body.popup)

  await PersonService.attendPopup(person, popup)

  res.send(person)
})

module.exports = router
