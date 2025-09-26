// src/modules/reviews/review.routes.js
const express = require('express');
const router = express.Router();
const ReviewController = require('./review.controller');

router.get('/', ReviewController.getAllReviews);
router.get('/:id', ReviewController.getByIdReview);
router.post('/', ReviewController.createReview);
router.put('/:id', ReviewController.updateReview);
router.delete('/:id', ReviewController.deleteReview);

module.exports = router;