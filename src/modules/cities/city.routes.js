// src/modules/reviews/review.routes.js
const express = require('express');
const router = express.Router();
const CityController = require('./city.controller');

router.get('/', CityController.getAllCities);
router.get('/:id', CityController.getByIdCity);
router.post('/', CityController.createCity);
router.put('/:id', CityController.updateCity);
router.delete('/:id', CityController.deleteCity);

module.exports = router;