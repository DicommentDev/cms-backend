// src/middleware/errorHandler.js
const { logger } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  // Logging berdasarkan jenis error
  if (err.statusCode === 400 || err.statusCode === 404) {
    logger.warn({
      message: err.message,
      statusCode: err.statusCode,
      url: req.url,
      ip: req.ip,
    }, 'Client error');
  } else {
    logger.error({
      message: err.message,
      stack: err.stack,
      url: req.url,
      ip: req.ip,
    }, 'Server error');
  }

  // Respons
  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal server error',
  });
};

module.exports = errorHandler;