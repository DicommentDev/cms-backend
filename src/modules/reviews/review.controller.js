// src/modules/reviews/review.controller.js
const ReviewService = require('./review.service')

const ReviewController = {
  // GET /api/reviews
  async getAllReviews(req, res) {
    try {
      const reviews = await ReviewService.getAll()
      res.status(200).json(reviews)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
  // GET /api/reviews/:id
  async getByIdReview(req, res) {
    try {
      const review = await ReviewService.getById(req.params.id)
      res.status(200).json(review)
    } catch (err) {
      if (err.message === 'Review not found') {
        return res.status(404).json({ error: err.message })
      }
      res.status(500).json({ error: err.message })
    }
  },
  // POST /api/reviews
  async createReview(req, res) {
    try {
      const review = await ReviewService.create(req.body)
      res.status(201).json(review)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },
  // PUT /api/reviews/:id
  async updateReview(req, res) {
    try {
      const review = await ReviewService.update(req.params.id, req.body)
      res.status(200).json(review)
    } catch (err) {
      if (err.message === 'Review not found') {
        return res.status(404).json({ error: err.message })
      }
      res.status(400).json({ error: err.message })
    }
  },
  // DELETE /api/reviews/:id
  async deleteReview(req, res) {
    try {
      const review = await ReviewService.delete(req.params.id)
      res.status(200).json({ message: 'Review deleted', review })
    } catch (err) {
      if (err.message === 'Review not found') {
        return res.status(404).json({ error: err.message })
      }
      res.status(500).json({ error: err.message })
    }
  }
}

module.exports = ReviewController