// src/modules/reviews/review.routes.js
const express = require('express')
const router = express.Router()
const ReviewController = require('./review.controller')
const { validateCreate, validateUpdate } = require('./review.validation')

router.get('/', ReviewController.getAllReviews)
router.get('/:id', ReviewController.getReviewById)
router.post('/', validateCreate, ReviewController.createReview)
router.put('/:id', validateUpdate, ReviewController.updateReview)
router.delete('/:id', ReviewController.deleteReview)

module.exports = router