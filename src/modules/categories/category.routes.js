// src/modules/reviews/review.routes.js
const express = require('express');
const router = express.Router();
const CategoryController = require('./category.controller');

router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getByIdCategory);
router.post('/', CategoryController.createCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;