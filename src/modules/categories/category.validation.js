// src/modules/categories/category.validation.js

const Joi = require('joi');

// Schema untuk membuat kategori
const createCategorySchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required()
    .messages({
      'string.empty': 'Category name is required',
      'string.min': 'Category name must be at least 1 character',
      'string.max': 'Category name cannot exceed 100 characters',
      'any.required': 'Category name is required',
    }),
  slug: Joi.string().trim().min(1).max(120).optional()
    .messages({
      'string.min': 'Slug must be at least 1 character',
      'string.max': 'Slug cannot exceed 120 characters',
    }),
});

// Schema untuk memperbarui kategori (semua field opsional)
const updateCategorySchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).optional()
    .messages({
      'string.min': 'Category name must be at least 1 character',
      'string.max': 'Category name cannot exceed 100 characters',
    }),
  slug: Joi.string().trim().min(1).max(120).optional()
    .messages({
      'string.min': 'Slug must be at least 1 character',
      'string.max': 'Slug cannot exceed 120 characters',
    }),
})
// Pastikan setidaknya salah satu field dikirim
.custom((value, helpers) => {
  if (Object.keys(value).length === 0) {
    return helpers.message('At least one field (name or slug) is required to update');
  }
  return value;
});

// Middleware pembungkus
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      // Format pesan error agar lebih user-friendly
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      
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
  validateCreate: validate(createCategorySchema),
  validateUpdate: validate(updateCategorySchema),
};