// src/modules/reviews/review.routes.js
const express = require('express')
const router = express.Router()
const CategoryController = require('./category.controller')
const { validateCreate, validateUpdate } = require('./category.validation')

router.get('/', CategoryController.getAllCategories)
router.get('/:id', CategoryController.getCategoryById)
router.post('/', validateCreate, CategoryController.createCategory)
router.put('/:id', validateUpdate, CategoryController.updateCategory)
router.delete('/:id', CategoryController.deleteCategory)

module.exports = router