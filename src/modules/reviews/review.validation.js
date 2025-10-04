// src/modules/reviews/review.validation.js

const Joi = require('joi');

// Schema untuk membuat ulasan
const createReviewSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 1 character',
      'string.max': 'Name cannot exceed 100 characters',
      'any.required': 'Name is required',
    }),
  rating: Joi.number().integer().min(1).max(5).required()
    .messages({
      'number.base': 'Rating must be a number',
      'number.integer': 'Rating must be an integer',
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating must be at most 5',
      'any.required': 'Rating is required',
    }),
  message: Joi.string().max(1000).optional().allow('')
    .messages({
      'string.max': 'Message cannot exceed 1000 characters',
    }),
});

// Schema untuk memperbarui ulasan (semua field opsional)
const updateReviewSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).optional()
    .messages({
      'string.min': 'Name must be at least 1 character',
      'string.max': 'Name cannot exceed 100 characters',
    }),
  rating: Joi.number().integer().min(1).max(5).optional()
    .messages({
      'number.base': 'Rating must be a number',
      'number.integer': 'Rating must be an integer',
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating must be at most 5',
    }),
  message: Joi.string().max(1000).optional().allow('')
    .messages({
      'string.max': 'Message cannot exceed 1000 characters',
    }),
})
// Pastikan setidaknya salah satu field dikirim
.custom((value, helpers) => {
  if (Object.keys(value).length === 0) {
    return helpers.message('At least one field (name, rating, or message) is required to update');
  }
  return value;
});

// Middleware pembungkus (sama persis seperti category)
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      // Logging: ini error klien, bukan bug → level WARN
      const { logger } = require('../../utils/logger');
      logger.warn({
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        errors: error.details,
        payload: req.body,
      }, 'Validation failed');

      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map((d) => ({
          field: d.path.join('.'),
          message: d.message,
        })),
      });
    }

    next();
  };
};

module.exports = {
  validateCreate: validate(createReviewSchema),
  validateUpdate: validate(updateReviewSchema),
};