// src/middleware/requestLogger.js
const { logger } = require('../utils/logger');

const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  logger.info(
    {
      method: req.method,
      url: req.originalUrl || req.url,
      ip: req.ip || req.connection?.remoteAddress || 'unknown',
      userAgent: req.get('User-Agent'),
    },
    '📥 Incoming request'
  );

  res.on('finish', () => {
    const durationMs = Date.now() - startTime;
    logger.info(
      {
        method: req.method,
        url: req.originalUrl || req.url,
        statusCode: res.statusCode,
        durationMs,
        ip: req.ip || 'unknown',
      },
      '📤 Request completed'
    );
  });

  res.on('close', () => {
    if (!res.writableEnded) {
      logger.warn(
        { method: req.method, url: req.url },
        'Request closed unexpectedly'
      );
    }
  });

  next();
};

module.exports = requestLogger;