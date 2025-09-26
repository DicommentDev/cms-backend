// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // untuk parsing body JSON

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});