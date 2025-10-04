// src/utils/response.js

/**
 * Mengirim respons sukses
 * @param {Object} res - Express response object
 * @param {Object|Array} data - Data yang dikirim
 * @param {number} [statusCode=200] - HTTP status code
 * @param {string} [message] - Pesan opsional
 */
const success = (res, data, statusCode = 200, message = null) => {
  const payload = message ? { message, data } : data;
  return res.status(statusCode).json(payload);
};

/**
 * Mengirim respons error
 * @param {Object} res - Express response object
 * @param {string} error - Pesan error
 * @param {number} [statusCode=500] - HTTP status code
 */
const error = (res, error, statusCode = 500) => {
  return res.status(statusCode).json({ error });
};

module.exports = {
  success,
  error,
};