// src/modules/cities/city.routes.js
const express = require('express')
const router = express.Router()
const CityController = require('./city.controller')
const { validateCreate, validateUpdate } = require('./city.validation')

router.get('/', CityController.getAllCities)
router.get('/:id', CityController.getCityById)
router.post('/', validateCreate, CityController.createCity)
router.put('/:id', validateUpdate, CityController.updateCity)
router.delete('/:id', CityController.deleteCity)

module.exports = router