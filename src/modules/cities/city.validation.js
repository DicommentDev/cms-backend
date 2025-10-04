// src/modules/cities/city.validation.js

const Joi = require('joi');

// Schema untuk membuat kota
const createCitySchema = Joi.object({
  city_name: Joi.string().trim().min(1).max(100).required()
    .messages({
      'string.empty': 'City name is required',
      'string.min': 'City name must be at least 1 character',
      'string.max': 'City name cannot exceed 100 characters',
      'any.required': 'City name is required',
    }),
  province: Joi.string().trim().min(1).max(100).required()
    .messages({
      'string.empty': 'Province is required',
      'string.min': 'Province must be at least 1 character',
      'string.max': 'Province cannot exceed 100 characters',
      'any.required': 'Province is required',
    }),
  slug: Joi.string().trim().min(1).max(120).optional()
    .messages({
      'string.min': 'Slug must be at least 1 character',
      'string.max': 'Slug cannot exceed 120 characters',
    }),
});

// Schema untuk memperbarui kota (semua field opsional)
const updateCitySchema = Joi.object({
  city_name: Joi.string().trim().min(1).max(100).optional()
    .messages({
      'string.min': 'City name must be at least 1 character',
      'string.max': 'City name cannot exceed 100 characters',
    }),
  province: Joi.string().trim().min(1).max(100).optional()
    .messages({
      'string.min': 'Province must be at least 1 character',
      'string.max': 'Province cannot exceed 100 characters',
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
    return helpers.message('At least one field (city_name, province, or slug) is required to update');
  }
  return value;
});

// Middleware pembungkus (sama persis seperti category)
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
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
  validateCreate: validate(createCitySchema),
  validateUpdate: validate(updateCitySchema),
};