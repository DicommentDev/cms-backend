// src/modules/articles/article.validation.js

const Joi = require('joi')

// Schema untuk membuat artikel
const createArticleSchema = Joi.object({
  title: Joi.string().trim().min(1).max(200).required()
    .messages({
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 1 character',
      'string.max': 'Title cannot exceed 200 characters',
      'any.required': 'Title is required',
    }),
  slug: Joi.string().trim().min(1).max(255).optional()
    .messages({
      'string.min': 'Slug must be at least 1 character',
      'string.max': 'Slug cannot exceed 255 characters',
    }),
  thumbnail: Joi.string().uri().optional().allow('')
    .messages({
      'string.uri': 'Thumbnail must be a valid URL',
    }),
  content: Joi.string().max(50000).optional().allow('')
    .messages({
      'string.max': 'Content cannot exceed 50,000 characters',
    }),
  service_id: Joi.string().uuid().optional()
    .messages({
      'string.uuid': 'Service ID must be a valid UUID',
    }),
  category_id: Joi.string().uuid().optional()
    .messages({
      'string.uuid': 'Category ID must be a valid UUID',
    }),
})

// Schema untuk memperbarui artikel (semua field opsional)
const updateArticleSchema = Joi.object({
  title: Joi.string().trim().min(1).max(200).optional()
    .messages({
      'string.min': 'Title must be at least 1 character',
      'string.max': 'Title cannot exceed 200 characters',
    }),
  slug: Joi.string().trim().min(1).max(255).optional()
    .messages({
      'string.min': 'Slug must be at least 1 character',
      'string.max': 'Slug cannot exceed 255 characters',
    }),
  thumbnail: Joi.string().uri().optional().allow('')
    .messages({
      'string.uri': 'Thumbnail must be a valid URL',
    }),
  content: Joi.string().max(50000).optional().allow('')
    .messages({
      'string.max': 'Content cannot exceed 50,000 characters',
    }),
  service_id: Joi.string().uuid().optional()
    .messages({
      'string.uuid': 'Service ID must be a valid UUID',
    }),
  category_id: Joi.string().uuid().optional()
    .messages({
      'string.uuid': 'Category ID must be a valid UUID',
    }),
})
// Pastikan setidaknya satu field dikirim
.custom((value, helpers) => {
  if (Object.keys(value).length === 0) {
    return helpers.message('At least one field is required to update')
  }
  return value
})

// Middleware pembungkus (sama persis seperti category & review)
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false })

    if (error) {
      // Logging: ini error klien, bukan bug → level WARN
      const { logger } = require('../../utils/logger')
      logger.warn({
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        errors: error.details,
        payload: req.body,
      }, 'Validation failed')

      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map((d) => ({
          field: d.path.join('.'),
          message: d.message,
        })),
      })
    }

    next()
  }
}

module.exports = {
  validateCreate: validate(createArticleSchema),
  validateUpdate: validate(updateArticleSchema),
}