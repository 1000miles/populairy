const express = require('express')
const router = express.Router()

const PersonService = require('../services/person-service')
const PopupService = require('../services/popup-service')

router.get('/all', async (req, res) => {
	const people = await PersonService.findAll()
	const person = await PersonService.find(req.params.id)
  res.render('person', { people, person })
})

router.get('/:id', async (req, res) => {
  const user = await PersonService.find(req.params.id)
  res.render('data', { data: user })
})

router.post('/', async (req, res) => {
  const user = await PersonService.add(req.body)
  res.send(user)
})

router.delete('/:id', async (req, res) => {
  const user = await PersonService.del(req.params.id)
  res.send(user)
})

router.post('/:id/popups', async (req, res) => {
  const person = await PersonService.find(req.params.id)
  const popup = await PopupService.find(req.body.popup)
  await PersonService.attend(person, popup)

  res.send(person)
})

module.exports = router
