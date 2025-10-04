// src/api/index.js
const createApp = require('../src/app');
const serverless = require('serverless-http');
console.log('✅ Serverless function initialized');
const app = createApp();

app.disable('x-powered-by');

module.exports = serverless(app);