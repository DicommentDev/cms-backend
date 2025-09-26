// api/index.js
const createApp = require('../src/app');
const serverless = require('serverless-http');

const app = createApp();

// Nonaktifkan x-powered-by & pastikan tidak listen
app.disable('x-powered-by');

// Export sebagai handler serverless
module.exports = serverless(app);