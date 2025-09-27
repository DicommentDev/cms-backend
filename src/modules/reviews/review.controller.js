// src/modules/reviews/review.controller.js
const ReviewService = require('./review.service')
const { logger } = require('../../utils/logger')

const ReviewController = {

  // GET /api/reviews
  async getAllReviews(req, res) {
    logger.debug('Fetching all reviews')

    try {
      const reviews = await ReviewService.getAll()
      logger.info({ count: reviews.length }, '✅ Successfully fetched all reviews')
      res.status(200).json(reviews)
    } catch (err) {
      logger.error({ err: err.message, stack: err.stack }, '❌ Failed to fetch reviews')
      res.status(500).json({ error: err.message })
    }
  },

  // GET /api/reviews/:id
  async getByIdReview(req, res) {
    const { id } = req.params
    logger.debug({ id }, 'Fetching review by ID')

    try {
      const review = await ReviewService.getById(id)
      logger.info({ id }, '✅ Review found')
      res.status(200).json(review)
    } catch (err) {
      if (err.message === 'Review not found') {
        logger.warn({ id }, '⚠️ Review not found')
        return res.status(404).json({ error: err.message })
      }
      logger.error({ err: err.message, id }, '❌ Error fetching review by ID')
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  // POST /api/reviews
  async createReview(req, res) {
    const { name, rating, message } = req.body
    logger.info({ name, rating }, '📥 Attempting to create new review')

    try {
      const review = await ReviewService.create(req.body)
      logger.info({ id: review.id, name, rating }, '✅ Review created successfully')
      res.status(201).json(review)
    } catch (err) {
      logger.error(
        { err: err.message, payload: { name, rating } },
        '❌ Failed to create review'
      )
      res.status(400).json({ error: err.message })
    }
  },

  // PUT /api/reviews/:id
  async updateReview(req, res) {
    const { id } = req.params
    const { name, rating, message } = req.body
    logger.info({ id, name, rating }, '✏️ Attempting to update review')

    try {
      const review = await ReviewService.update(id, req.body)
      logger.info({ id }, '✅ Review updated successfully')
      res.status(200).json(review)
    } catch (err) {
      if (err.message === 'Review not found') {
        logger.warn({ id }, '⚠️ Review not found during update')
        return res.status(404).json({ error: err.message })
      }
      logger.error({ err: err.message, id }, '❌ Failed to update review')
      res.status(400).json({ error: err.message })
    }
  },

  // DELETE /api/reviews/:id
  async deleteReview(req, res) {
    const { id } = req.params
    logger.info({ id }, '🗑️ Attempting to delete review')

    try {
      const review = await ReviewService.delete(id)
      logger.info({ id }, '✅ Review deleted successfully')
      res.status(200).json({ message: 'Review deleted', review })
    } catch (err) {
      if (err.message === 'Review not found') {
        logger.warn({ id }, '⚠️ Review not found during deletion')
        return res.status(404).json({ error: err.message })
      }
      logger.error({ err: err.message, id }, '❌ Failed to delete review')
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

module.exports = ReviewController