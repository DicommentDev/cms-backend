// src/modules/services/service.routes.js
const express = require('express')
const router = express.Router()
const ServiceController = require('./service.controller')
const { validateCreate, validateUpdate } = require('./service.validation')

router.get('/', ServiceController.getAllServices)
router.get('/:id', ServiceController.getServiceById)
router.post('/', validateCreate, ServiceController.createService)
router.put('/:id', validateUpdate, ServiceController.updateService)
router.delete('/:id', ServiceController.deleteService)

module.exports = router