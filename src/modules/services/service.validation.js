// src/modules/services/service.validation.js

const Joi = require('joi');

// Schema untuk membuat layanan
const createServiceSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required()
    .messages({
      'string.empty': 'Service name is required',
      'string.min': 'Service name must be at least 1 character',
      'string.max': 'Service name cannot exceed 100 characters',
      'any.required': 'Service name is required',
    }),
  slug: Joi.string().trim().min(1).max(120).optional()
    .messages({
      'string.min': 'Slug must be at least 1 character',
      'string.max': 'Slug cannot exceed 120 characters',
    }),
  description: Joi.string().max(1000).optional().allow('')
    .messages({
      'string.max': 'Description cannot exceed 1,000 characters',
    }),
});

// Schema untuk memperbarui layanan (semua field opsional)
const updateServiceSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).optional()
    .messages({
      'string.min': 'Service name must be at least 1 character',
      'string.max': 'Service name cannot exceed 100 characters',
    }),
  slug: Joi.string().trim().min(1).max(120).optional()
    .messages({
      'string.min': 'Slug must be at least 1 character',
      'string.max': 'Slug cannot exceed 120 characters',
    }),
  description: Joi.string().max(1000).optional().allow('')
    .messages({
      'string.max': 'Description cannot exceed 1,000 characters',
    }),
})
// Pastikan setidaknya satu field dikirim
.custom((value, helpers) => {
  if (Object.keys(value).length === 0) {
    return helpers.message('At least one field (name, slug, or description) is required to update');
  }
  return value;
});

// Middleware pembungkus (sama persis seperti category, review, article)
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
  validateCreate: validate(createServiceSchema),
  validateUpdate: validate(updateServiceSchema),
};