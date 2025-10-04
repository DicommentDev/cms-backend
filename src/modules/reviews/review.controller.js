// src/modules/reviews/review.controller.js

const ReviewService = require('./review.service');
const { logger } = require('../../utils/logger');
const { success } = require('../../utils/response'); // Hanya butuh success

const ReviewController = {
  // GET /api/reviews
  async getAllReviews(req, res) {
    logger.debug('Fetching all reviews');
    const reviews = await ReviewService.getAll();
    logger.info({ count: reviews.length }, '✅ Successfully fetched all reviews');
    return success(res, reviews); // 200
  },

  // GET /api/reviews/:id
  async getReviewById(req, res) {
    const { id } = req.params;
    logger.debug({ id }, 'Fetching review by ID');
    const review = await ReviewService.getById(id);
    logger.info({ id }, '✅ Review found');
    return success(res, review); // 200
  },

  // POST /api/reviews
  async createReview(req, res) {
    const { name, rating, message } = req.body;
    logger.debug({ name, rating, message }, '📥 Attempting to create new review');
    const review = await ReviewService.create(req.body);
    logger.info({ id: review.id, name, rating }, '✅ Review created successfully');
    return success(res, review, 201); // Created
  },

  // PUT /api/reviews/:id
  async updateReview(req, res) {
    const { id } = req.params;
    const { name, rating, message } = req.body;
    logger.debug({ id, name, rating, message }, '✏️ Attempting to update review');
    const review = await ReviewService.update(id, req.body);
    logger.info({ id }, '✅ Review updated successfully');
    return success(res, review); // 200
  },

  // DELETE /api/reviews/:id
  async deleteReview(req, res) {
    const { id } = req.params;
    logger.debug({ id }, '🗑️ Attempting to delete review');
    const review = await ReviewService.delete(id);
    logger.info({ id }, '✅ Review deleted successfully');
    return success(res, { message: 'Review deleted', review }); // 200
  },
};

module.exports = ReviewController;