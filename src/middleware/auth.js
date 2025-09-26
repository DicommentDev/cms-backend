// src/middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    // Verifikasi dengan public key Supabase (gunakan SUPABASE_JWT_SECRET)
    const payload = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
    req.user = payload; // simpan user info di request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = auth;